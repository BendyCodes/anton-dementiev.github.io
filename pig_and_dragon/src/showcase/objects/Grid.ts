module src {
    export class Grid extends Phaser.Group {
        public rows: number;
        public cols: number;
        public startX: number;
        public startY: number;
        public cellWidth: number;
        public cellHeight: number;
        public spacingHorizontal: number;
        public spacingVertical: number;

        protected cells: Array<Array<Cell>>;
        protected candies: Array<Element>;
        protected candiesContainer: Phaser.Group;
        fallingOutCandiesContainer: Phaser.Group;
        frosenIceContainer: Phaser.Group;

        gridData:number[][];
        allowedObjectIndexes:number[];

        gameArea:GameArea;

        constructor(gridData:number[][], startX: number, startY: number, cellWidth: number, allowedObjectIndexes:number[], gameArea:GameArea) {
            super(game, null, 'grid');
            this.gridData = gridData;
            this.rows = this.gridData.length;
            this.cols = this.gridData[0].length;
            this.startX = startX;
            this.startY = startY;
            this.cellWidth = cellWidth;
            this.cellHeight = cellWidth;
            this.spacingHorizontal = cellWidth;
            this.spacingVertical = this.cellHeight;
            this.inputEnableChildren = true;
            this.allowedObjectIndexes = allowedObjectIndexes.slice();

            this.gameArea = gameArea;

            this.frosenIceContainer = new Phaser.Group(game, null);

            this.buildCells();
            this.initNeighborhood();

            game.input.onDown.add(()=>{this.isInputDown = true;}, this);
            game.input.onUp.add(()=>{this.isInputDown = false;}, this);
        }
        private isInputDown:boolean = false;

        public randomFillUp(usingDelayBetweenCandies:boolean = true, isTotalBuilding:boolean = false, baseDelay:number = 50):number {
            let k:number = 0;
            let maxK:number = 0;
            let emptyCells:Array<Cell> = [];
            for (let i: number = 0; i < this.cells.length; i++) {
                for (let j: number = 0; j < this.cells[i].length; j++) {
                    let cell: Cell = this.getCellAt(i, j);

                    if (!cell) continue;
                    if (cell.isEmpty()) {
                        emptyCells.push(cell);
                    }
                    if (cell.frozenCount > 0) {
                        if (this.gameArea.level != 4) {
                            for (let k: number = j + 1; k < this.cells[i].length; k++) {
                                let cell: Cell = this.getCellAt(i, k);
                                if (cell && cell.isEmpty() && cell.frozenCount > 0) {
                                    emptyCells.push(cell);
                                }
                            }
                            break;
                        }
                    }
                }
            }
            if (emptyCells.length > 0) {
                let prevCellPos:PIXI.Point = null;
                let placeElement:(_cell:Cell, _element:Element)=>void = (_cell:Cell, _element:Element) => {
                    if (usingDelayBetweenCandies) {
                        if (!prevCellPos) {
                            prevCellPos = new Phaser.Point();
                        } else {
                            if (prevCellPos.x != _cell.posX) {
                                k = 0;
                            }
                        }
                        prevCellPos.set(_cell.posX, _cell.posY);
                        this.placeElementAt(_cell, _element, k++ * baseDelay);
                        if (k > maxK) maxK = k;
                    } else {
                        this.placeElementAt(_cell, _element, 0);
                    }
                }

                let generatedCandyKinds:Array<string> = [];

                for (let i:number = 0; i < emptyCells.length; i++) {
                    generatedCandyKinds.push(
                        Constants.KIND_MATCH_ELEMENTS +
                        (isTotalBuilding || Math.random() > 0.9 ? Phaser.ArrayUtils.getRandomItem(this.allowedObjectIndexes) :
                        this.allowedObjectIndexes[Math.floor(i / emptyCells.length * this.allowedObjectIndexes.length)])
                        + "_"
                    );
                }

                for (let i:number = 0; i < emptyCells.length && generatedCandyKinds.length > 0; i++) {
                    let cell:Cell = emptyCells[i];

                    let generatedKind:string = null;

                    let notEmptyNeighbors:Array<Cell> = cell.getNotEmptyNeighbors();
                    let notEmptyNeighborsKinds:Array<string> = [];
                    for (let nc of notEmptyNeighbors) notEmptyNeighborsKinds.push(nc.getCandy().kind);
                    for (let _kind of notEmptyNeighborsKinds) {
                        if (Math.random() < (isTotalBuilding ?
                                Constants.TOTAL_BUILDING_SIMILARITY_LEVEL_PROBABILITY : Constants.SIMILARITY_LEVEL_PROBABILITY)
                        ) {
                            let ind:number = generatedCandyKinds.indexOf(_kind);
                            if (ind >= 0) {
                                generatedKind = generatedCandyKinds[ind];
                                generatedCandyKinds.splice(ind, 1);
                                break;
                            }
                        }
                    }
                    if (!generatedKind) {
                        for (let kk = generatedCandyKinds.length - 1; kk >= 0; kk--) {
                            let ind:number = notEmptyNeighborsKinds.indexOf(generatedCandyKinds[kk]);
                            if (ind < 0) {
                                generatedKind = generatedCandyKinds[kk];
                                generatedCandyKinds.splice(ind, 1);
                                break;
                            }
                        }
                        if (!generatedKind) generatedKind = Phaser.ArrayUtils.removeRandomItem(generatedCandyKinds);
                    }
                    placeElement(cell, new Element(generatedKind));
                }
            }

            // if (isTotalBuilding) {
                CommonUtils.createTimer(maxK*baseDelay + 1000/60, this.matchAllGrid, this);
            // }

            return maxK*baseDelay;
        }

        public getRandomMatchableElements():Element[] {
            let elements:Element[][] = [];

            for (let i: number = 0; i < this.rows; i++) {
                for (let j: number = 0; j < this.cols; j++) {
                    let c:Cell = this.getCellAt(i, j);
                    if (!c || c.frozenCount > 0) continue;

                    let e:Element = c.getCandy();
                    if (!e || !e.isAlive) continue;
                    if (Constants.MATCHING_ELEMENTS.indexOf(e.kind) < 0) continue;

                    let nen:Cell[] = c.getNotEmptyNeighbors();
                    for (let n of nen) {
                        if (n.frozenCount > 0) continue;
                        let e2:Element = n.element;
                        if (!e2 || !e2.isAlive) continue;
                        if (Constants.MATCHING_ELEMENTS.indexOf(e2.kind) < 0) continue;

                        this.swapTwoElements(e, e2, true);
                        if (this.getMatchChain(e)) {
                            elements.push([e, e2]);
                        }
                        this.swapTwoElements(e, e2, true);
                    }
                }
            }

            if (elements.length == 0) return null;

            return Phaser.ArrayUtils.getRandomItem(elements);
        }

        private isCandiesInputEnabled:boolean = true;
        public setCandiesInputEnabled(enabled:boolean):void {
            // this.isCandiesInputEnabled = enabled;/*console.log(enabled);*/
        }

        protected buildCells(): void {
            this.cells = [];
            for (let i: number = 0; i < this.rows; i++) {
                this.cells[i] = [];
                for (let j: number = 0; j < this.cols; j++) {
                    if (this.gridData[i][j] == 0) {
                        this.cells[i][j] = null;
                        continue;
                    }

                    this.cells[i][j] = new Cell(this, i, j, this.gridData[i][j] == 2 || this.gridData[i][j] == 7 || this.gridData[i][j] == 6 || this.gridData[i][j] == 5, this.gridData[i][j] == 3 || this.gridData[i][j] == 5 ? 1 : this.gridData[i][j] == 6 ? 2 : 0);
                    this.add(this.cells[i][j]);
                }
            }
            // console.log(this.cells)
        }


        protected initNeighborhood(): void {
            for (let i: number = 0; i < this.rows; i++) {
                for (let j: number = 0; j < this.cols; j++) {
                    if (this.existsCellAt(i, j)) {
                        this.cells[i][j].findNeighbors();
                    }
                }
            }
        }

        public buildCandies(usingDelayBetweenCandies:boolean): number {
            this.candiesContainer = new Phaser.Group(this.game, this, 'candiesContainer', false);
            this.fallingOutCandiesContainer = new Phaser.Group(this.game, this, 'fallingOutCandiesContainer', false);
            this.add(this.fallingOutCandiesContainer);
            this.add(this.candiesContainer);
            this.add(this.frosenIceContainer);
            this.candies = [];

            let dur:number = this.randomFillUp(usingDelayBetweenCandies, true);

            CommonUtils.createTimer(dur, this.startHintTimerCountdown, this);

            return dur;
        }


        /**
         * GETTERS & SETTERS
         */

        public getCellAt(i: number, j: number): Cell {
            if (!this.existsCellAt(i, j)) {
                return null;
            }
            return this.cells[i][j];
        }

        public getCellRelatively(targetCell: Cell, displaced: boolean, dx: number, dy: number): Cell {
            if (!targetCell) return null;
            return this.getCellAt(targetCell.posX + dx, targetCell.posY + dy);
        }

        public existsCellAt(i: number, j: number): boolean {
            return !(i < 0 || j < 0 || i >= this.rows || !this.cells[i] || j >= this.cols || !this.cells[i][j]);
        }

        protected getCellUnderMouse(): Cell {
            return this.getCellUnderPoint(this.game.input.activePointer.x, this.game.input.activePointer.y);
        }

        public getCellUnderPoint(pX: number, pY: number): Cell {
            let minDistance: number = 100000;
            let foundCell: Cell = null;
            for (let i: number = 0; i < this.rows; i++) {
                for (let j: number = 0; j < this.cols; j++) {
                    let cell: Cell = this.getCellAt(i, j);
                    if (cell) {
                        let p:PIXI.Point = this.toLocal(new PIXI.Point(pX, pY), game.world);
                        let distance: number = Phaser.Math.distance(cell.position.x, cell.position.y, p.x, p.y);
                        if (distance < minDistance && distance < Math.max(this.cellWidth, this.cellHeight)) {
                            minDistance = distance;
                            foundCell = cell;
                        }
                    }
                }
            }

            return foundCell;
        }

        public getElementAt(i: number, j: number): Element {
            let cell: Cell = this.getCellAt(i, j);
            return cell ? cell.element : null;
        }

        public placeElementAt(cell: Cell, candy: Element, delayedShow:number): void {
            if (this.getElementAt(cell.posX, cell.posY)) {
                if (candy.kind==Constants.KIND_GOLD) console.log('candy.kind==Constants.KIND_GOLD')
                return;
            }
            cell.setElement(candy);
            this.candies.push(candy);
            this.candiesContainer.add(candy);
            candy.placeAt(this, cell.posX, cell.posY, delayedShow);
        }


        public removeCandy(element: Element): Element {
            if (this.candies.indexOf(element) > -1) {
                this.candies.splice(this.candies.indexOf(element), 1);
            }
            let c:Cell = this.getCellAt(element.posX, element.posY);
            if (!c) return;
            c.removeElement();
            this.candiesContainer.remove(element, false);
            // candy.isAlive = false;

            return element;
        }

        public dropCandyDown(fromCell:Cell, toCell:Cell):number {
            var candy:Element = fromCell.element;
            fromCell.removeElement();
            toCell.setElement(candy);

            return candy.fallDownTo(this, toCell.posY);
        }

        score:number = 0;
        matchedOnlyScore:number = 0;

        public tryRemoveElementAnimating(e:Element, delayMultipler:number, match:Element[] = null, givingScores:boolean = true):void {

            let c:Cell = this.getCellAt(e.posX, e.posY);
            let res:number = c.tryToUnfreaze();
            if (res == Cell.WAS_ALREADY_UNFROZEN) {
                c.tryToUnsetTarget();
                this.checkTargetCellsLeft();

                this.removeCandy(e);
                this.fallingOutCandiesContainer.add(e);
                e.playDisappearingAnimation(delayMultipler);

                this.startHintTimerCountdown();

                if (givingScores) {
                    if (Constants.MATCHING_ELEMENTS.indexOf(e.kind) >= 0) {
                        let matchedOnlyScore:number = this.matchedOnlyScore;
                        this.matchedOnlyScore += 5;
                        let goldGenerTrashold:number = 350;
                        if (Math.floor(this.matchedOnlyScore / goldGenerTrashold) > Math.floor(matchedOnlyScore / goldGenerTrashold)) {
                            this.placeElementAt(this.getCellAt(e.posX, e.posY), new Element(Constants.KIND_GOLD), 0/*75*/);
                        }

                        this.score += 5;
                        // this.gameArea.setScore(this.score);
                    } else if (e.kind == Constants.KIND_COIN) {
                        this.score += 50;
                        // this.gameArea.setScore(this.score);
                    }
                }
            }

            if (this.selectedElement1 == e) this.selectedElement1 = null;
            if (this.selectedElement2 == e) this.selectedElement2 = null;
        }

        private takeCoin(coin:Element):void {
            game.tweens.removeFrom(coin);
            this.tryRemoveElementAnimating(coin, 0);
            this.updateGravityAndFillUp(50);
            // this.gameArea.onCoinTaken();
        }

        private generateCoins(defPosX:number, defPosY:number):void {
            let placeCoinAt:(cell:Cell)=>void = (cell:Cell)=>{
                if(cell.getCandy()) {
                    this.tryRemoveElementAnimating(cell.getCandy(), 0,null, false);
                }
                let coin:Element = new Element(Constants.KIND_COIN);
                this.placeElementAt(cell, coin, 0);
                game.add.tween(coin).to({alpha:0.85},150,Phaser.Easing.Linear.None,true,5000,5,true)
                    .onComplete.addOnce(()=>{
                        game.add.tween(coin).to({alpha:0},300,Phaser.Easing.Linear.None,true)
                            .onComplete.addOnce(()=>{
                                coin['readyToBeRemoved'] = true;
                        }, this);
                }, this);
            };
            placeCoinAt(this.getCellAt(defPosX, defPosY));
            let applicableCells:Cell[] = [];
            for (let i: number = 0; i < this.rows; i++) {
                for (let j: number = 0; j < this.cols; j++) {
                    let cell: Cell = this.getCellAt(i, j);
                    if (cell && !cell.isTarget && cell.frozenCount == 0 &&
                        (!cell.getCandy() || Constants.MATCHING_ELEMENTS.indexOf(cell.getCandy().kind) >= 0)) {
                        applicableCells.push(cell);
                    }
                }
            }
            for (let i:number = 0; i < 4 && applicableCells.length > 0; i++) {
                placeCoinAt(Phaser.ArrayUtils.removeRandomItem(applicableCells));
            }

            CommonUtils.createTimer(200, ()=>{this.setCandiesInputEnabled(true);}, this);
            CommonUtils.createTimer(7500, ()=>{
                let b:boolean = false;
                for (let i:number = 0; i < this.rows; i++) {
                    for (let j: number = 0; j < this.cols; j++) {
                        let c: Cell = this.getCellAt(i, j);
                        if (c && c.element && c.element.isAlive && c.element.kind == Constants.KIND_COIN && c.element['readyToBeRemoved']) {
                            c.element['readyToBeRemoved'] = false;
                            this.tryRemoveElementAnimating(c.element, 0, null, false);
                            b = true;
                        }
                    }
                }
                if (b) this.updateGravityAndFillUp(50);
                }, this);
        }

        protected selectedElement1:Element = null;
        protected selectedElement2:Element = null;
        public onTryingToSelectElement1(targetElement:Element):void {
            if (!this.isCandiesInputEnabled) return;
            if (this.getCellAt(targetElement.posX, targetElement.posY).frozenCount > 0) return;

            if (targetElement.kind.indexOf(Constants.KIND_MATCH_ELEMENTS) == 0) {
                if (!this.selectedElement1) {
                    this.selectedElement1 = targetElement;
                    this.selectedElement1.setHighlighted(true);
                } else {
                    this.onTryingToSelectElement2(targetElement);
                }
            } else {
                let successful:boolean = this.tryToChoose(targetElement);
                if (successful) {
                    // this.hideHint();
                    // SoundController.instance.playPlayerSelClickSound();
                    this.setCandiesInputEnabled(false);
                }
            }
        }
        public onTryingToSelectElement2(targetElement:Element):void {
            if (!this.isCandiesInputEnabled) return;

            if (this.getCellAt(targetElement.posX, targetElement.posY).frozenCount > 0) return;
            if (!this.isInputDown) return;
            if (!this.selectedElement1) return;
            if (targetElement == this.selectedElement1) return;
            if (this.selectedElement2) return;

            if (this.getCellAt(this.selectedElement1.posX, this.selectedElement1.posY).getNeighbors().indexOf(
                this.getCellAt(targetElement.posX, targetElement.posY)) < 0) {
                this.selectedElement1.setHighlighted(false);
                this.selectedElement1 = targetElement;
                this.selectedElement1.setHighlighted(true);
                return;
            }


            if (targetElement.kind.indexOf(Constants.KIND_MATCH_ELEMENTS) == 0) {
                this.selectedElement2 = targetElement;
                this.selectedElement2.setHighlighted(true);

                this.swapElements();
                let successful1:boolean = this.tryToChoose(this.selectedElement1);
                let successful2:boolean = this.tryToChoose(this.selectedElement2);


                if (successful1 || successful2) {
                    this.setCandiesInputEnabled(false);

                    CommonUtils.createTimer(this.swappingElementsDuration, ()=>{
                        if (this.selectedElement1) {
                            this.selectedElement1.setHighlighted(false);
                            this.selectedElement1 = null;
                        }
                        if (this.selectedElement2) {
                            this.selectedElement2.setHighlighted(false);
                            this.selectedElement2 = null;
                        }
                    }, this);
                } else {
                    CommonUtils.createTimer(this.swappingElementsDuration, ()=>{
                        this.swapElements();

                        CommonUtils.createTimer(this.swappingElementsDuration, ()=>{
                            if (this.selectedElement1) this.selectedElement1.setHighlighted(false);
                            if (this.selectedElement2) this.selectedElement2.setHighlighted(false);
                            this.selectedElement1 = this.selectedElement2 = null;
                        }, this);
                    }, this);
                }
            }
        }

        private swappingElementsDuration:number = 145;
        public swapElements(immediate:boolean = false):void {
            this.startHintTimerCountdown();
            this.swapTwoElements(this.selectedElement1, this.selectedElement2, immediate);
        }

        public swapTwoElements(e1:Element, e2:Element, immediate:boolean = false):void {
            if (!e1 || !e2) return;

            let cell1:Cell = this.getCellAt(e1.posX, e1.posY);
            let cell2:Cell = this.getCellAt(e2.posX, e2.posY);
            cell2.setElement(e1);
            cell1.setElement(e2);

            let f:(c:Cell)=>void = (c:Cell)=>{
                c.element.posX = c.posX;
                c.element.posY = c.posY;

                if (immediate) {
                    c.element.x = this.startX + c.element.posX * this.spacingHorizontal;
                    c.element.y = this.startY + c.element.posY * this.spacingVertical;
                } else {
                    game.add.tween(c.element).to({
                        x:this.startX + c.element.posX * this.spacingHorizontal, y:this.startY + c.element.posY * this.spacingVertical
                    }, this.swappingElementsDuration, Phaser.Easing.Default, true);
                }
            };
            f(cell1);
            f(cell2);

        }

        private minChainLengthToGetABonus:number = 3;
        protected matchAllGrid():void {
            if (!this.parent || !this.parent.parent || !this.parent.parent.parent) {
                console.log('!this.parent || !this.parent.parent || !this.parent.parent.parent');
                return;
            }

            let b:boolean = false;

            let generateBonusesAtCells:Cell[][] = null;

            for (let i:number = 0; i < this.rows; i++) {
                for (let j:number = 0; j < this.cols; j++) {
                    let c:Cell = this.getCellAt(i, j);
                    if (c && c.element && c.element.isAlive) {
                        if (Constants.MATCHING_ELEMENTS.indexOf(c.element.kind) >= 0) {

                            let f:(chain:Element[])=>void = (chain:Element[])=>{
                                if (!c.element) return;

                                if (chain.length >= this.minChainLengthToGetABonus) {
                                    if (!generateBonusesAtCells) generateBonusesAtCells = [];
                                    generateBonusesAtCells.push(this.getCellsOf(chain));
                                }
                                let match:Element[] = chain.slice().concat(c.element);
                                this.tryRemoveElementAnimating (c.element, 0);
                                for (let i:number = 0; i < chain.length; i++) this.tryRemoveElementAnimating(chain[i], i + 1, match);
                            };

                            let hm:Element[] = this.getMatchChainHorizontal(c.element);
                            let vm:Element[] =  this.getMatchChainVertical(c.element);
                            if (hm) f(hm);
                            if (vm) f(vm);

                            if (hm || vm) {
                                if (!b) {
                                    this.setCandiesInputEnabled(false);
                                    b = true;
                                }
                            }
                        }
                    }
                }
            }
            if (b) {
                this.playElemRemoveSnd();
                this.updateGravityAndFillUp(50, generateBonusesAtCells);
            } else {
                if (!this.getRandomMatchableElements()) {
                    let elements:Element[] = [];
                    for (let i: number = 0; i < this.rows; i++) {
                        for (let j: number = 0; j < this.cols; j++) {
                            let c:Cell = this.getCellAt(i, j);
                            if (c && !c.isTarget && c.frozenCount == 0) {
                                let e: Element = c.getCandy();
                                if (e) {
                                    elements.push(e);
                                }
                            }
                        }
                    }
                    let rndEl:Element = Phaser.ArrayUtils.getRandomItem(elements);
                    this.removeCandy(rndEl);
                    this.placeElementAt(this.getCellAt(rndEl.posX, rndEl.posY), new Element(Constants.KIND_GOLD), 0);
                    // console.log(rndEl.posX, rndEl.posY)
                }
            }
        }

        public tryToChoose(targetCandy:Element):boolean {
            if (!targetCandy || !targetCandy.isAlive) return;

            let successful:boolean = false;
            switch (targetCandy.kind) {
                case Constants.KIND_CLEAN_COLUMN:
                    this.cleanColumn(targetCandy);
                    successful = true;
                    break;
                case Constants.KIND_CLEAN_ROW:
                    this.cleanRow(targetCandy);
                    successful = true;
                    break;
                case Constants.KIND_CLEAN_COLUMN_AND_ROW:
                    this.cleanColumnAndRow(targetCandy);
                    successful = true;
                    break;
                case Constants.KIND_GOLD:
                    this.generateCoins(targetCandy.posX, targetCandy.posY);
                    // successful = true;
                    break;
                case Constants.KIND_COIN:
                    this.takeCoin(targetCandy);
                    // successful = true;
                    break;
                default://Constants.KIND_MATCH_ELEMENTS:
                    successful = this.tryToMatch(targetCandy);
                    break;
            }
            return successful;
        }

        private getMatchChainVertical(element: Element):Element[] {
            let chain:Element[] = null;

            for (let j:number = element.posY - 1; j >= 0; j--) {
                let neighborElement:Element = this.getElementAt(element.posX, j);
                if (element.matchableWith(neighborElement)) {
                    if (!chain) chain = [];
                    chain.push(neighborElement);
                } else {
                    break;
                }
            }

            for (let j:number = element.posY + 1; j < this.cols; j++) {
                let neighborElement:Element = this.getElementAt(element.posX, j);
                if (element.matchableWith(neighborElement)) {
                    if (!chain) chain = [];
                    chain.push(neighborElement);
                } else {
                    break;
                }
            }

            return chain && chain.length >= 2 ? chain : null;
        }

        private getMatchChainHorizontal(element: Element):Element[] {
            let chain:Element[] = null;

            for (let i:number = element.posX - 1; i >= 0; i--) {
                let neighborElement:Element = this.getElementAt(i, element.posY);
                if (element.matchableWith(neighborElement)) {
                    if (!chain) chain = [];
                    chain.push(neighborElement);
                } else {
                    break;
                }
            }

            for (let i:number = element.posX + 1; i < this.rows; i++) {
                let neighborElement:Element = this.getElementAt(i, element.posY);
                if (element.matchableWith(neighborElement)) {
                    if (!chain) chain = [];
                    chain.push(neighborElement);
                } else {
                    break;
                }
            }

            return chain && chain.length >= 2 ? chain : null;
        }

        public getMatchChain(element: Element):Element[] {
            let hm:Element[] = this.getMatchChainHorizontal(element);
            if (hm) return hm;
            return this.getMatchChainVertical(element);
        }

        private getCellsOf(elements:Element[]): Cell[] {
            let cells:Cell[] = [];
            for (let e of elements) cells.push(this.getCellAt(e.posX, e.posY));
            return cells;
        }

        /**
         * Private menthods
         */
        private tryToMatch(element: Element, updateGravityAndFillUp:boolean = true): boolean {
            let f:(chain:Element[])=>void = (chain:Element[])=>{
                let match:Element[] = chain.slice().concat(element);
                let generateBonusesAtCells:Cell[][] = chain.length >= this.minChainLengthToGetABonus ? [this.getCellsOf(chain)] : null;//doesn't gnerate bonuses mathing all grid
                this.tryRemoveElementAnimating (element, 0);
                for (let i:number = 0; i < chain.length; i++) this.tryRemoveElementAnimating(chain[i], i + 1, match);
                if (updateGravityAndFillUp) {
                    this.updateGravityAndFillUp(100, generateBonusesAtCells);
                }
            };

            let hm:Element[] = this.getMatchChainHorizontal(element);
            let vm:Element[] =  this.getMatchChainVertical(element);
            if (hm) f(hm);
            if (vm) f(vm);

            if (hm != null || vm != null) {
                this.playElemRemoveSnd();
                return true;
            }

            return false;
        }

        public isLevelCompleted:boolean = false;
        private checkTargetCellsLeft():void {
            if (this.isLevelCompleted) return;

            this.setCandiesInputEnabled(false);

            for (let i: number = 0; i < this.cells.length; i++) {
                for (let j: number = this.cells[i].length - 1; j >= 0; j--) {
                    let c:Cell = this.getCellAt(i, j);
                    if (c && c.isTarget) return;
                }
            }

            this.isLevelCompleted = true;

            this.destroyHitTimer();
            console.log('level completed');

        }


        private playElemRemoveSnd():void {
            CommonUtils.createTimer(Constants.CANDY_ANIMATION_BASE_DELAY, ()=>{
            }, this)
        }

        private onCleanColumnOrRowElement(posX:number, posY:number, targetElement:Element):void {
            if (this.getCellAt(posX, posY)) {
                let e:Element = this.getElementAt(posX, posY);
                if (e) {
                    if (e.kind == Constants.KIND_GOLD) {
                        this.generateCoins(e.posX, e.posY);
                    } else if (e.kind == Constants.KIND_COIN) {
                        this.takeCoin(e);
                    } else if (e.kind == Constants.KIND_CLEAN_COLUMN || e.kind == Constants.KIND_CLEAN_ROW || e.kind == Constants.KIND_CLEAN_COLUMN_AND_ROW) {
                        if (e != targetElement) this.tryToChoose(e);
                        this.tryRemoveElementAnimating(e, 0);
                    } else {
                        this.tryRemoveElementAnimating(e, 0);
                    }

                }
            }
        }
        private cleanRow(targetElement:Element):void {
            this.playElemRemoveSnd();
            for (let i:number = 0; i < this.rows; i++) this.onCleanColumnOrRowElement(i, targetElement.posY, targetElement);
            this.updateGravityAndFillUp(Constants.CANDY_ANIMATION_BASE_DELAY);
        }
        private cleanColumn(targetElement:Element):void {
            this.playElemRemoveSnd();
            for (let i:number = 0; i < this.cols; i++) this.onCleanColumnOrRowElement(targetElement.posX, i, targetElement);
            this.updateGravityAndFillUp(Constants.CANDY_ANIMATION_BASE_DELAY);
        }
        private cleanColumnAndRow(targetElement:Element):void {
            this.playElemRemoveSnd();
            let posY:number = targetElement.posY;
            for (let i:number = 0; i < this.cols; i++) this.onCleanColumnOrRowElement(targetElement.posX, i, targetElement);
            for (let i:number = 0; i < this.rows; i++) this.onCleanColumnOrRowElement(i, posY, targetElement);
            this.updateGravityAndFillUp(Constants.CANDY_ANIMATION_BASE_DELAY);
        }

        private updateGravityAndFillUp(baseDelay:number = 50, generateBonusesAtCells:Cell[][] = null):void {
            CommonUtils.createTimer(baseDelay, ()=> {
                if (!this.parent || !this.parent.parent || !this.parent.parent.parent) return;

                let cellsForBonuses:Cell[] = null;
                if (generateBonusesAtCells) {
                    cellsForBonuses = [];
                    for (let k:number = 0; k < generateBonusesAtCells.length; k++) {
                        cellsForBonuses.push(Phaser.ArrayUtils.getRandomItem(generateBonusesAtCells[k]));
                    }
                }
                if (cellsForBonuses) {
                    let kinds:string[] = [
                        Constants.KIND_CLEAN_COLUMN, Constants.KIND_CLEAN_ROW, Constants.KIND_CLEAN_COLUMN_AND_ROW
                    ];
                    for (let k:number = 0; k < cellsForBonuses.length; k++) {
                        this.placeElementAt(cellsForBonuses[k], new Element(Phaser.ArrayUtils.getRandomItem(kinds)), 0);
                    }
                }

                let duration:number = this.updateGravity();

                CommonUtils.createTimer(duration/* + Constants.CANDY_ANIMATION_BASE_DURATION*/, ()=>{
                    let dur:number = this.randomFillUp(true, false, baseDelay);
                    CommonUtils.createTimer(dur, ()=> {this.setCandiesInputEnabled(true);}, this);
                }, this);
            }, this);


        }

        private updateGravity(): number {
            let duration:number = 0;

            /*let kindsToSkip:string[] = [
                Constants.KIND_CLEAN_COLUMN, Constants.KIND_CLEAN_ROW, Constants.KIND_CLEAN_COLUMN_AND_ROW
            ];*/
            for (let i: number = 0; i < this.cells.length; i++) {
                for (let j: number = this.cells[i].length - 1; j >= 0; j--) {
                    let cell:Cell = this.getCellAt(i, j);
                    if (!cell || !cell.isEmpty()) continue;

                    for (let k: number = j - 1; k >= 0; k--) {
                        let _cell:Cell = this.getCellAt(i, k);

                        // if (_cell && _cell.getCandy() && kindsToSkip.indexOf(_cell.getCandy().kind) >= 0) break;
                        if (!_cell) break;
                        if (_cell.frozenCount > 0) break;

                        if (!_cell.isEmpty()) {
                            let _duration:number = this.dropCandyDown(_cell, cell);
                            if (_duration > duration) duration =_duration;

                            break;
                        }
                    }
                }
            }

            return duration + Constants.CANDY_ANIMATION_BASE_DELAY;
        }

        //--------------------HINTs HELPER-------------------------
        private hintTimer:Phaser.Timer = null;

        private destroyHitTimer():void {
            if (this.highlightedForHintElements) {
                for (let e of this.highlightedForHintElements) {
                    e.setHighlighted(false);
                    if (e['hintTween']) {
                        game.tweens.remove((<Phaser.Tween>e['hintTween']));
                        e['hintTween'] = null;
                    }
                }
                this.highlightedForHintElements = null;
            }
            if (this.hintTimer) {
                CommonUtils.destroyTimer(this.hintTimer);
                this.hintTimer = null;
            }

        }

        private startHintTimerCountdown():void {
            this.destroyHitTimer();

            if (this.isLevelCompleted || !this.gameArea) return;

            this.hintTimer = CommonUtils.createTimer(6000, this.showHint, this);
        }

        private highlightedForHintElements:Element[] = null;
        private showHint():void {
            if (this.isLevelCompleted || !this.parent || !this.gameArea) return;
            // this.destroyHitTimer();

            let rme:Element[] = this.getRandomMatchableElements();
            if (!rme) return;

            this.highlightedForHintElements = rme;

            let f:(e:Element)=>void = (e:Element)=>{
                if (!this.highlightedForHintElements) return;

                e.setHighlighted(true);
                e['hintTween'] = game.add.tween(e)
                    .to({angle:20},145)
                    .to({angle:-20},125)
                    .to({angle:15},155)
                    .to({angle:-15},140)
                    .to({angle:18},135)
                    .to({angle:-18},160)
                    .to({angle:20},145)
                    .to({angle:-20},135)
                    .to({angle:0},120);
                (<Phaser.Tween>e['hintTween']).onComplete.addOnce(()=>{
                    e.setHighlighted(false);

                    CommonUtils.createTimer(1750, ()=>{f(e);}, this);
                }, this);
                e['hintTween'].start();
            };

            f (rme[0]);
            f (rme[1]);
        }
    }
}
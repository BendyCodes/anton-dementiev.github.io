///<reference path="Grid.ts"/>
module src {
    export class Cell extends Phaser.Group {
        public static readonly TOP: number = 0;
        public static readonly DOWN: number = 1;
        public static readonly LEFT: number = 3;
        public static readonly RIGHT: number = 4;

        public posX: number;
        public posY: number;
        public element: Element = null;

        private grid: Grid;
        private neighborsMap: Array<Cell>;
        private neighbors: Array<Cell>;

        // isLocked
        isTarget:boolean;
        private targetSpriteBG:Phaser.Sprite = null;

        frozenCount:number;
        private frozenSprite:Phaser.Sprite = null;

        constructor(grid: Grid, posX: number, posY: number, isTarget:boolean = false, frozenCount:number = 0) {
            super(game, null);

            this.grid = grid;
            this.posX = posX;
            this.posY = posY;
            this.position = new Phaser.Point(
                this.grid.startX + this.posX * this.grid.spacingHorizontal,
                this.grid.startY + this.posY * this.grid.spacingVertical
            );

            let spr:Phaser.Sprite = new Phaser.Sprite(game, 0, 0, 'gameTexture', 'cellBG1_0000');
            spr.anchor.set(0.5, 0.5);
            this.add(spr);
            spr = new Phaser.Sprite(game, 0, 0, 'gameTexture', 'cellBG2_0000');
            spr.anchor.set(0.5, 0.5);
            this.add(spr);

            this.isTarget = isTarget;
            if (this.isTarget) {
                this.targetSpriteBG = new Phaser.Sprite(game, 0, 0, 'gameTexture', 'cellTargetBG_0000');
                this.targetSpriteBG.anchor.set(0.5, 0.5);
                this.add(this.targetSpriteBG);
            }
            this.frozenCount = frozenCount;
            if (this.frozenCount > 0) {
                this.frozenSprite = new Phaser.Sprite(game, this.x, this.y, 'gameTexture', 'frozen_0000');
                this.frozenSprite.animations.add('1', Phaser.Animation.generateFrameNames('frozen_', 0, 0, '', 4), 30, false);
                this.frozenSprite.animations.add('2', Phaser.Animation.generateFrameNames('frozen_', 1, 1, '', 4), 30, false);
                this.frozenSprite.anchor.set(0.5, 0.5);
                this.frozenSprite.play(''+this.frozenCount);
                this.grid.frosenIceContainer.addAt(this.frozenSprite, 0);
            }
        }

        public static WAS_ALREADY_UNFROZEN:number = 0;
        public static IS_UNFROZEN:number = 1;
        public static IS_STILL_FROZEN:number = 2;
        public tryToUnfreaze():number {
            if (this.frozenCount == 0) return Cell.WAS_ALREADY_UNFROZEN;

            this.frozenCount--;

            let p:PIXI.Point = this.grid.frosenIceContainer.toLocal(this.frozenSprite.position, this.frozenSprite.parent);
            for (let i:number = 0; i < 8; i++) {
                let s:Phaser.Sprite = new Phaser.Sprite(game, p.x, p.y, 'gameTexture', 'iceCrash_0000');
                // s.scale.x = s.scale.y = Math.random() + 1;
                let scl:number = Math.random() * 1 + 0.35;
                game.add.tween(s).to({alpha:0},1000+Math.random()*500).start()
                    .onComplete.addOnce(()=>{if (s.parent) s.parent.removeChild(s);}, this);
                game.add.tween(s).to({x:s.x+(Math.random()-0.5)*150,y:s.y+(Math.random()-0.5)*150},500+Math.random()*500).start();
                game.add.tween(s.scale).to({x:scl, y:scl},500+Math.random()*500).start();
                this.grid.frosenIceContainer.add(s);
            }

            if (this.frozenCount == 1) {
                game.add.tween(this.frozenSprite.scale).to({x:0.95, y:0.95},250, Phaser.Easing.Default, true, 0, 0, true);
                this.frozenSprite.play('1');
            } else if (this.frozenCount == 0) {
                game.add.tween(this.frozenSprite).to({alpha:0},250).start()
                    .onComplete.addOnce(()=>{if (this.frozenSprite.parent) this.frozenSprite.parent.removeChild(this.frozenSprite);}, this);
            }


            return this.frozenCount == 0 ? Cell.IS_UNFROZEN : Cell.IS_STILL_FROZEN;
        }

        public findNeighbors(): void {
            this.neighbors = [];
            this.neighborsMap = [];
            this.addNeighborAt(this.grid, 0, -1, Cell.TOP);
            this.addNeighborAt(this.grid, 0, 1, Cell.DOWN);
            this.addNeighborAt(this.grid, -1, 0, Cell.LEFT);
            this.addNeighborAt(this.grid, 1, 0, Cell.RIGHT);
        }

        public getNeighbors(): Array<Cell> {
            return this.neighbors;
        }

        public getNeighbor(position:number): Cell {
            return this.neighborsMap[position];
        }

        public setElement(element:Element) {
            this.element = element;
            this.element.inputEnabled = true;
            this.element.input.useHandCursor = true;
            this.element.events.onInputDown.add(this.grid.onTryingToSelectElement1, this.grid, 0, this.element);
            this.element.events.onInputOver.add(this.grid.onTryingToSelectElement2, this.grid, 0, this.element);
        }

        public getCandy(): Element{
            return this.element;
        }

        public tryToUnsetTarget():void {
            if (!this.isTarget) return;

            this.isTarget = false;

            // game.add.tween(this.targetSpriteBG).to({alpha:0}, 250).start()
            game.add.tween(this.targetSpriteBG.scale).to({x:0.5, y:0.5}, 250, Phaser.Easing.Back.In).start()
                .onComplete.addOnce(()=>{if (this.targetSpriteBG.parent) this.targetSpriteBG.parent.removeChild(this.targetSpriteBG);}, this);
            let p:PIXI.Point = this.grid.fallingOutCandiesContainer.toLocal(this.targetSpriteBG.position, this.targetSpriteBG.parent);

            for (let i:number = 0; i < 12; i++) {
                let s:Phaser.Sprite = new Phaser.Sprite(game, p.x, p.y/*this.targetSpriteBG.width*(Math.random() - 0.5), this.targetSpriteBG.height*(Math.random() - 0.5)*/, 'gameTexture', 'cellTargetBG_0000');
                s.anchor.set(0.5, 0.5);
                // s.scale.set(1);
                let rndsc:number = 0.2 + Math.random()*0.35;
                this.grid.fallingOutCandiesContainer.add(s);
                this.game.add.tween(s.scale)
                    .to({
                        x: rndsc,
                        y: rndsc
                    }, 250, Phaser.Easing.Back.In, true);
                this.game.add.tween(s)
                    .to({
                        x: this.x + (Math.random() * 200 + 60) * (Math.random() < 0.5 ? -1 : 1),
                        y: game.height,
                        angle:360
                    }, (game.height - s.y) / 525 * 1000, Phaser.Easing.Default, true, 250+Math.random()*100).start()
                    .onComplete.addOnce(()=>{if (s.parent) s.parent.removeChild(s);}, this);
            }
        }

        public removeElement(): void {
            if(this.element){
                this.element.inputEnabled = false;
                this.element.events.onInputDown.remove(this.grid.onTryingToSelectElement1, this.grid);
                this.element.events.onInputOver.remove(this.grid.onTryingToSelectElement2, this.grid);
                this.element = null;
            }
        }

        public isEmpty(): boolean {
            return this.element ? false : true;
        }

        public getNotEmptyNeighbors(): Array<Cell> {
            let arr:Array<Cell> = [];
            for(let neighbor of this.neighbors) {
                if(!neighbor.isEmpty()) {
                    arr.push(neighbor);
                }
            }
            return arr;
        }

        /**
         *  Helpers
         */

        private addNeighborAt(grid, dx:number, dy:number, mapPosition:number): void {
            if(grid.existsCellAt(this.posX + dx, this.posY + dy)) {
               this.neighbors.push(grid.getCellAt(this.posX + dx, this.posY + dy));
               this.neighborsMap[mapPosition] = grid.getCellAt(this.posX + dx, this.posY + dy);
            } else {
                this.neighborsMap[mapPosition] = null;
            }
        }


    }
}

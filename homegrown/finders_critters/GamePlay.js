PR.GamePlay = function(soul) {

    GodStep.volumeSound('theme', PR.MUSIC);
    GodStep.playSound('theme', -1, PR.MUSIC);
    GodStep.playSound('start', 0, PR.SOUND);

    GodStep.LFrame.call(this, soul, 'GamePlay');
    GodStep.IDownUp.call(this, this.W, this.H);

    this.addChild(this.back = new PR.Background(this, 'back_game'));
    this.addChild(this.fieldContainer = new PIXI.DisplayObjectContainer());

    this.addChild(this.footer = new PIXI.DisplayObjectContainer());
    this.addChild(this.topSprite = new PIXI.DisplayObjectContainer());
    this.topSprite.addChild(this.field_up = new Games.Img('field_up', this.s, this.W *.5, 0, new PIXI.Point(0.5, 0)));
    this.footer.addChild(this.field_down = new Games.Img('field_down', this.s, this.W *.5, 0, new PIXI.Point(0.5, 1)));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());
    this.topSprite.addChild(this.lineLeft = new Games.Img('line_left', this.s, 0, this.field_up.height, new PIXI.Point(1, 0)));
    this.topSprite.addChild(this.lineRight = new Games.Img('line_right', this.s, 0, this.field_up.height , new PIXI.Point(0, 0)));
    this.topSprite.addChild(this.icon_save = new Games.Img('icon_save', this.s, this.W *.08, -this.H *.00 , new PIXI.Point(0, 0)));
    this.topSprite.addChild(this.star = new Games.Img('star', this.s, this.W *.72, this.H *.06 , new PIXI.Point(0.5, 0.5)));
    this.fieldContainer.addChild(this.field = new PR.Field(soul, 9 ,9,.9, this));
    this.addChild(this.maska = new PIXI.Graphics());

    this.star.startS = this.star.scale.x;
    this.oS = this.lineRight.scale.x;
    this.footer.addChild(this.stepLabel = new PR.Text('124214', 110 * this.s, this.W *.5, -this.H *.14, 'left', 0xcbeffa)); this.stepLabel.posY = this.stepLabel.y;
    this.topSprite.addChild(this.pointLabel = new PR.Text('0', 100 * this.s, this.W *.8, this.H *.01, 'left', 0xcbeffa));
    this.topSprite.addChild(this.heroLabel = new PR.Text('0', 100 * this.s, this.W *.46, this.H *.01, 'left', 0xcbeffa));
    this.heroLabel.startS = this.heroLabel.scale.x;
    this.heroLabel.pos = new PIXI.Point(this.heroLabel.x, this.heroLabel.y);
    this.points = 0;
    var fw = this.field.W * PR.CELLW_SCALE * this.field.scale.x;
    var fd = -this.W * .005;
    this.maska.beginFill(0, 1);
    this.maska.drawRect(fd, fd + 2, fw-fd*2, fw-fd*2 - 4);
    this.maska.endFill();
    this.field.mask = this.maska;

    this.killed = [];
    this.container.addChild(this.b_back = new Games.TextButton('back', 30 * this.s, 0x562466, soul.W *.9, soul.H *.05));
    this.footer.addChild(this.b_pause = new Games.ImgButton('b_pause', this, this.W *.86, -this.H *.06));
    this.footer.addChild(this.b_down = new Games.ImgButton('b_down', this, this.W *.14, -this.H *.06)); this.b_down.scaleble = false;
    this.b_down.addChild(this.row_label = new PR.Text('0', 80 * this.s , -this.W *.017, -this.H *.060, 'left', 0xffffff));

    this.addFrame(this.pause = new PR.Pause(soul));
    addEvent(this.b_pause, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);

    this.topSprite.addChild(this.field_start = new Games.Img('field_start', this.s, this.W *.5, this.H *.5,.5));
    this.topSprite.addChild(this.field_fin = new Games.Img('field_fin', this.s, this.W *.5, this.H *.5,.5));
    this.field_start.addChild(this.start_label = new PR.Text('12525\nfgjfgjh0', 100 / GodStep.SCALE, -this.W *.15/this.s, this.H *.037/this.s/ GodStep.SCALE, 'center', 0xffffff));
    this.field_fin.addChild(this.fin_label = new PR.Text('12525\nfgjfgjh0', 100 / GodStep.SCALE, -this.W *.15/this.s, this.H *.09/this.s/ GodStep.SCALE, 'center', 0xffffff));
    this.fin_label.pos = new PIXI.Point(this.fin_label.x,this.fin_label.y);
    this.field_start.pos = new PIXI.Point(this.W *.5, this.H *.5);
    this.field_fin.pos = new PIXI.Point(this.W *.5, this.H *.5);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    addEvent(this.field, Games.CELL_UP, this.h_cells);
    addEvent(this.field, Games.CELL_DOWN, this.h_cells);
    addEvent(this.field, GodStep.FRAME_UP, this.h_field);

    this.canMoveTimer = 0;

};
extend(PR.GamePlay, GodStep.LFrame);
PR.CANMOVEDELAY = 10;
PR.BOMB_DROP = 50;
PR.BONUS_DROP = 90;
PR.MOVEWAITTIMER = 10;
PR.GamePlay.HERO_RANDOMS = [0, 1, 2, 3, 4];

pro.init = function() {
    GodStep.volumeSound('theme', PR.MUSIC);
    GodStep.playSound('theme', -1, PR.MUSIC);
    GodStep.playSound('start', 0, PR.SOUND);
    this.heroRandom = [0, 1, 2];
    if(PR.LAST_LEVEL_SELECTED > 9) this.heroRandom.push(3);
    if(PR.LAST_LEVEL_SELECTED > 19) this.heroRandom.push(4);

    var hrc = this.heroRandom.length;
    var hra = [];
    for(var h = 0; h<hrc; h++) {
        var hid = parseInt(Math.random() * this.heroRandom.length);
        hra.push(this.heroRandom[hid]);
        this.heroRandom.splice(hid, 1);
    }
    PR.GamePlay.HERO_RANDOMS = hra;
    this.lastPoints = 0;
    this.field_start.vis = true;
    this.field_fin.vis = false;
    this.field_fin.y = this.H * 2;
    this.isNewRecord = false;

    this.field_start.y = -this.H * .2;
    this.isFirstClick = true;
    this.initTimer = 130;
    this.fin_label.setText(PR.S('game over'));

    this.fin_label.updateText();
    this.fin_label.x = -this.W * .0 / this.s - this.fin_label.width/2;
    this.fin_label.y = this.fin_label.pos.y - this.fin_label.height/2;
    this.field_fin.visible = true;
    this.field_start.visible = true;
    this.killed = [];
    this.isGameStarted = true;
    this.topCell = 0;
    GodStep.ISEDITMODE = false;
    this.isFinished = false;
    this.moveDownTimer = PR.MOVEWAITTIMER;
    this.visible = true;
    this.isOver = false;
    this.isWin = false;
    this.winTimer = -1;
    this.overTimer = -1;
    this.pause.visible = false;
    var level;
    this.selected = [];
    this.points = 0;

    this.b_back.visible = GodStep.DEVMODE;
    if(GodStep.DEVMODE) {
        this.field.setData(level = GodStep.TEST_DATA);
    } else {
        level = PR.PetResque.instance.SETTINGS.levels[PR.LAST_LEVEL_SELECTED];
        this.field.initTutorial(PR.TUTORIAL);
        this.field.setData(level);
        this.field.completeCell = null;
    }
    this.steps = level.params.steps;
    this.noSteps = this.steps == 0;

    this.bombDrop = 30;
    this.bonusDrop = 70;

    this.heroesCount = this.field.heroes.length;

    this.pointLabel.setText(0 + '');
    this.stepLabel.setText(level.params.steps + ' ' + (level.params.steps == 1 ? PR.S('move'): PR.S('moves')));
    this.stepLabel.visible = (this.steps != 0);

    this.heroLabel.setText(0 + '/' + this.heroesCount);
    this.heroLabel.scale.x = this.heroLabel.scale.y *= 1.3;
    this.colors = this.field.colors;
    this.stepLabel.updateText();
    this.stepLabel.x = (this.W - this.stepLabel.width)/2;
    this.generateInstant();
    this.updateRowLabel();

    this.start_label.setText(PR.S('save') + ' '+ this.heroesCount + ' ' + ((this.heroesCount == 1) ? PR.S('critter') : PR.S('critters')) + '!' + (this.steps == 0 ? '' : '\n' + PR.S('in') + ' ' + this.steps + " " + PR.S('moves')));
    this.start_label.updateText();
    this.start_label.x = -this.W * .0 / this.s - this.start_label.width/2;
    this.start_label.y = this.fin_label.pos.y - this.start_label.height/2;


    this.b_down.visible = (this.field.cellCountY - 9 > 0);
    this.Scale = this.scale.x;

};

pro.moveCellsLeft = function(cell, cells) {
    var c = cell;
    var leftCell;
    if(c.xi != 0) {
        var y = c.yi;
        while(1) {
            if(!cells[y]){
                return;
            } else {
                c = cells[y][cell.xi];
            }
            var obj = c.getObject();
            if(obj) {
                if(!obj.isBlock) {
                    leftCell = cells[y][cell.xi-1];
                    if(!leftCell.isBusy()) {
                        obj.setCell(leftCell);
                    } else {
                        return;
                    }
                } else {
                    return;
                }
                y--;
            } else {
                return;
            }

        }
    }
};
pro.update = function() {
    if(this.visible) {
        this.pause.update();
        this.field.update();
        this.field_start.y += ((this.field_start.vis ? this.field_start.pos.y : this.H * 2) - this.field_start.y) * .06;
        this.field_fin.y += ((this.field_fin.vis ? this.field_fin.pos.y : this.H * 2) - this.field_fin.y) * .06;
        this.heroLabel.scale.x = this.heroLabel.scale.y += (this.heroLabel.startS - this.heroLabel.scale.x) * .1;
        this.heroLabel.x = this.heroLabel.pos.x + this.heroLabel.width/2 * (this.heroLabel.startS - this.heroLabel.scale.x);
        this.heroLabel.y = this.heroLabel.pos.y + this.heroLabel.height/2 * (this.heroLabel.startS - this.heroLabel.scale.x);
        this.stepLabel.y += (this.stepLabel.posY - this.stepLabel.y) * .1;
        this.star.scale.x = this.star.scale.y += (this.star.startS - this.star.scale.x) * .05;
        var j, i, o;
        var fcx = this.field.cellCountX;
        var fcy = this.field.cellCountY;
        var cells = this.field.cellsXY;
        var cell, cellRow, guests, obj, dy, downCellRow, downCell, isMovedDown;
        var t = this.W * .020;
        var d = this.W * .020;
        var dddy = 0;

        var justDroped = this.justDroped = false;
        var isAllNotInPlace = false;
        var countEmpty = 0;
        for(j = 0; j<fcx; j++) {
            for (i = fcy - 1; i >= 0; i--) {

                cellRow = cells[i];
                cell = cellRow[j];
                cell.animate();
                guests = cell.guests;
                if(i == this.topCell) {
                    if(guests.length == 0) {
                        countEmpty++;
                    } else {
                        if(guests[0].isGround) {
                            countEmpty++;
                        }
                    }
                }
                if (i == 0) {
                    if (!cell.isBusy()) {
                        this.generate(cell);
                    }
                }
                for (o = 0; o < guests.length; o++) {
                    obj = guests[o];
                    obj.update();

                    if (obj.isDynamic) {

                        dy = obj.nextPlace.y - obj.y - obj.deltaXY;
                        if(dy < -1) {
                            obj.sy += .17;
                            downCellRow = cells[cell.yi + 1];
                            if(downCellRow) {
                                downCell = downCellRow[cell.xi];
                                if(!downCell.isBusy()) {
                                    obj.cell.delGuest(obj);
                                    obj.cell = downCell;
                                    downCell.pushGuest(obj);
                                    obj.applyCellPostion();
                                    this.isCanMove = false;
                                    this.canMoveTimer = PR.CANMOVEDELAY;
                                }
                            }
                        } else
                        if (dy < t ) {
                            downCellRow = cells[cell.yi + 1];
                            if (downCellRow) {
                                downCell = downCellRow[cell.xi];
                                if(!downCell.isBusy()) {
                                    obj.setCell(downCell);
                                    isMovedDown = true;
                                    justDroped = true;
                                    this.moveDownTimer = PR.MOVEWAITTIMER;
                                    this.isCanMove = false;
                                    this.canMoveTimer = PR.CANMOVEDELAY;
                                }
                            }
                            obj.sy *= .8;

                        } else {
                            this.moveDownTimer = PR.MOVEWAITTIMER;
                            isAllNotInPlace = true;
                            this.isCanMove = false;
                            this.canMoveTimer = PR.CANMOVEDELAY;
                            dy += obj.sy;
                            obj.sy += .17;
                        }
                        var ddy = 0;
                        obj.x += Math.min(Math.max(-d, (obj.nextPlace.x - obj.deltaXY - obj.x) * .5), d);
                        obj.y += ddy = Math.min(Math.max(-d * 1.7, (dy * obj.sy)*.5 ), d * 1.7);
                        dddy = Math.max(ddy, dddy);
                    }
                }
            }
        }

        if(countEmpty == fcx && fcy > 9) {
            this.topCell++;
            this.topCell = Math.min(this.topCell, fcy - 9);
            this.updateRowLabel();

        }

        this.fieldContainer.y += (-this.topCell * this.field.cellW * this.field.scale.x - this.fieldContainer.y) * .1;

       // if(this.isWaitAnimations) {
            for(var k = 0; k<this.killed.length; k++) {
                var killed = this.killed[k];
                    killed.move();
            }
      //  }
        if(this.moveDownTimer > 0) {
            this.moveDownTimer--;
            var gObj, leftCell;
            if(this.moveDownTimer < 5) {
                for(i = 0; i<fcx; i++) {
                    for(j = 0; j<fcy; j++) {
                        cell = cells[j][i];
                        obj = cell.getObject();
                        if(obj) {
                            if(obj.isDynamic) {
                                leftCell = cells[j][i-1];
                                if(leftCell) {
                                    if(!leftCell.isBusy()) {
                                        var canMoveLeft = false;
                                        if(j == fcy - 1) {
                                            canMoveLeft = true;
                                        } else {
                                            downCellRow = cells[j + 1];
                                            if(downCellRow) {
                                                downCell = downCellRow[i];
                                                gObj = downCell.getObject();
                                                if(gObj) {
                                                    if(gObj.isGround) {
                                                        canMoveLeft = true;
                                                    }
                                                }
                                            }
                                        }

                                        if(canMoveLeft) {
                                            this.canMoveTimer += 5;
                                            this.isCanMove = false;
                                            this.moveDownTimer = PR.MOVEWAITTIMER;
                                            this.moveCellsLeft(cell, cells);
                                        }
                                    }
                                }

                            }
                        }

                    }
                }
            }
        }
        if(!this.isCanMove) {
            if(this.canMoveTimer == 0) {
                this.isCanMove = true;
                if(!this.findCombo()) {
                    this.over();
                    trace('OVER');
                } else {
                    trace('NO COMBO');
                }
            }
            this.canMoveTimer--;
        }

        for(var h = 0; h<fcx; h++) {
            cell = cells[fcy-1][h];
            obj = cell.getObject();
            if(obj){
                if(obj.isHero) {
                    if(!obj.isKilled) {
                        this.destroyCell(obj.cell);
                        obj.cell.setCost(1000);
                        this.isCanMove = false;
                        this.canMoveTimer = this.moveDownTimer = PR.MOVEWAITTIMER * 10;
                        this.points += 1000;
                        this.updatePoints();

                    }
                }
            }
        }
        if(this.initTimer > -1) {
            if(this.initTimer-- == 0) {
                this.field_start.vis = false;
                this.isFirstClick = false;
            }
        }

        if(this.winTimer > -1) {
            if(this.winTimer-- == 0) {
                this.soul.screenTo([this.soul.victory], this);
            }
        }
        if(this.overTimer > -1) {
            if(this.overTimer == 80) {
                this.field_fin.y = -this.H * 2;
                this.field_fin.vis = true;
            }
            if(this.overTimer-- == 0) {
                this.soul.screenTo([this.soul.fail], this);
            }
        }

    }
};
pro.updateRowLabel = function() {
    this.row_label.setText((this.field.cellCountY - 9 - this.topCell) + '');
    this.row_label.updateText();
    this.row_label.x =  -this.W *.003 - this.row_label.width/2;
};
pro.findCombo = function() {
    var cells = this.field.cellsXY;
    var i, j, cell;
    var fcx = this.field.cellCountX;
    var fcy = Math.min(cells.length, 9) + this.topCell;
    var left, right, top, bot;
    var isHaveColored = false;
    var bonus = false;
    for(i = 0; i<fcx; i++) {
        for (j = this.topCell; j < fcy; j++) {
            cell = cells[j][i].getColored();
            bonus = cells[j][i].getBonus();
            if(bonus) return true;
            if(cell) {
                isHaveColored = true;
                if(cells[j-1]) {
                    top = cells[j-1][i].getColored();
                    if(top) {
                        if(top.t == cell.t) {
                            return true;
                        }
                    }
                }
                if(cells[j+1]) {
                    bot = cells[j+1][i].getColored();
                    if(bot) {
                        if(bot.t == cell.t) {
                            return true;
                        }
                    }
                }
                left = cells[j][i-1];
                right = cells[j][i+1];

                if(left) {
                    left = left.getColored();
                    if(left) {
                        if(left.t == cell.t) {
                            return true;
                        }
                    }
                }
                if(right) {
                    right = right.getColored();
                    if(right) {
                        if(right.t == cell.t) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    if(isHaveColored) return false;
    return true;
};

pro.win = function() {
    this.isWin = true;
    this.winTimer = 100;
    this.overTimer = -1;
    this.isOver = false;
    var level = this.soul.PLAYER.levels[PR.LAST_LEVEL_SELECTED];
    level[0] = 1;
    if(level[1] < this.points) {
        level[1] = this.points;
        this.isNewRecord = true;
    }
    this.fin_label.setText(PR.S('you win'));
    this.fin_label.updateText();
    this.fin_label.x = -this.W * .0 / this.s - this.fin_label.width/2;
    this.fin_label.y = this.fin_label.pos.y - this.fin_label.height/2;
    this.field_fin.vis = true;
    this.field_fin.y = -this.H * 2;

};
pro.over = function(text) {
    if(!this.isWin) {
        this.isOver = true;
        this.fin_label.setText(text ? text : PR.S('no moves'));
        this.fin_label.updateText();
        this.fin_label.x = -this.W * .0 / this.s - this.fin_label.width/2;
        this.fin_label.y = this.fin_label.pos.y - this.fin_label.height/2;
        this.overTimer = 170;

        var level = this.soul.PLAYER.levels[PR.LAST_LEVEL_SELECTED];
        if(level[1] < this.points) {
            level[1] = this.points;
            this.isNewRecord = true;
        }
    }
};
pro.generateInstant = function() {
    var cells = this.field.cellsXY;
    var cell;
    for(var i = 0; i<this.field.cellCountX; i++) {
        for(var j = 0; j<this.field.cellCountY; j++) {
            cell = cells[j][i];
            if(cell.guests.length == 0) {
                var cid = this.colors[parseInt(Math.random() * this.colors.length)];
                var type = PR.Cell.STANDART[cid];
                this.field.addCellObject(new PR.CellObject(type, this.s, cell, this.colors));
                this.emptyCount++;
            }
        }
   }
};
pro.generate = function(cell) {
    if(this.hero) {
        if(cell.xi == this.hero.targetCell.xi) {
            this.hero.cell.delGuest(this.hero);
            cell.pushGuest(this.hero);
            this.hero.cell = cell;
            this.hero.applyCellPostion();
            this.hero = null;

            return;
        }
    }
    if(this.noSteps) {

    } else {
        var cid = this.colors[parseInt(Math.random() * this.colors.length)];
        var type = PR.Cell.STANDART[cid];

        var obj;

        if(!this.noSteps){

            if(this.field.isBomb) {
                if(this.bombDrop-- == 0 ) {
                    obj = new PR.CellObject('bomb', this.s, cell, this.colors, this.field.getRandomColors());
                    this.bombDrop = PR.BOMB_DROP - parseInt(Math.random() * 10);
                }
            }

            if(this.field.isBonus) {
                if(!obj) {
                    if(this.bonusDrop-- == 0) {
                        obj = new PR.CellObject('s_bonus', this.s, cell, this.colors,  this.field.getRandomColors());
                        this.bonusDrop = PR.BONUS_DROP - parseInt(Math.random() * 20);
                    }
                }
            }
        }
        if(!obj) {
            obj = new PR.CellObject(type, this.s, cell, this.colors, this.field.getRandomColors());
        }
        this.field.addCellObject(obj);

        obj.y -= cell.H;
        this.emptyCount++;
    }
};

pro.selectCell = function(cell) {
    if(cell.yi - this.topCell > 8) {
        return;
    }
    var obj = cell.getObject();
    var object;
    cell.Selected = true;

    this.selected.push(cell);
    var cells = this.field.cellsXY;
    var arr = [];

    if(cell.yi < this.field.cellCountY - 1) {
        arr.push(cells[cell.yi + 1][cell.xi]);
    }
    if(cell.yi > 0) {
        arr.push(cells[cell.yi - 1][cell.xi]);
    }
    if(cell.xi < this.field.cellCountX - 1) {
        arr.push(cells[cell.yi][cell.xi + 1]);
    }
    if(cell.xi > 0) {
        arr.push(cells[cell.yi][cell.xi - 1]);
    }
    var a;
    for(var i = 0; i<arr.length; i++) {
        a = arr[i];
        if(!a.isSelected) {
            object = a.getObject();
            if(object) {
                if (object.isColored) {
                    if(object.t == obj.t) {
                        this.selectCell(a);
                    }
                }
            }
        }
    }
};
pro.updatePoints = function() {
    this.pointLabel.setText(this.points + '');
    this.pointLabel.updateText();
    if(this.points % 100 == 0 || this.points % 1000 == 0) {
        this.star.scale.x = this.star.scale.y *= 1.3;
    }
    this.lastPoints = this.points;
    // this.pointLabel.x = this.W * .45 - this.pointLabel.width;
};
pro.selectCells = function(cell) {


    var selected = this.selected;
    while(selected.length) {
        selected[0].Selected = false;
        selected.splice(0, 1);
    }

    if(cell) {
        this.selectCell(cell);

        if(this.selected.length == 1) {
            cell.Selected = false;
            this.selected = [];
            GodStep.playSound('miss_tap', 0, PR.SOUND);
        } else {
            GodStep.playSound('tap', 0, PR.SOUND);
        }
    }
};
pro.destroyBonuses = function(cell) {
    var cells = this.field.cells;
    var obj = cell.getObject();
    var type = obj.ctype;
    this.field.delCellObject(obj.destroy());

    GodStep.playSound('petard', 0, PR.SOUND);

    var arr = [];
    for(var i = 0; i<cells.length; i++) {
        obj = cells[i].getObject();
        if(obj) {
            if(obj.isColored) {
                if(obj.ctype == type){
                    arr.push(cells[i]);
                }
            }
        }
    }
    var cost = arr.length * 10;
    var points = arr.length * 10 * arr.length;
    this.points += points;
    this.updatePoints();
    for (var c in arr) {
        this.destroyCell(arr[c]);
        arr[c].setCost(cost);
    }

};
pro.destroyBomb = function(cell) {
    var cells = this.field.cellsXY;
    var obj = cell.getObject();
    var arr = [];
    var p = obj.parent;
    p.removeChild(obj);
    p.addChild(obj);

    GodStep.playSound('bomb', 0, PR.SOUND);

    obj.isDestroyed = true;
    if(cell.xi < this.field.cellCountX - 1) {
        arr.push(cells[cell.yi][cell.xi + 1]);
        if(cells[cell.yi-1]) {
            arr.push(cells[cell.yi-1][cell.xi + 1]);
        }
        if(cells[cell.yi + 1]) {
            arr.push(cells[cell.yi+1][cell.xi + 1]);
        }
    }
    if(cell.xi > 0) {
        arr.push(cells[cell.yi][cell.xi - 1]);
        if(cells[cell.yi-1]) {
            arr.push(cells[cell.yi-1][cell.xi - 1]);
        }
        if(cells[cell.yi + 1]) {
            arr.push(cells[cell.yi+1][cell.xi - 1]);
        }
    }
    if(cell.yi < this.field.cellCountY - 1) {
        arr.push(cells[cell.yi + 1][cell.xi]);
    }
    if(cell.yi > 0) {
        arr.push(cells[cell.yi - 1][cell.xi]);
    }

    var points = 0;
    var count = 0;
    for(var o = 0; o<arr.length; o++) {
        obj = arr[o].getObject();

        if(obj) {
            if(obj.isColored) {
                count++;
            }
        }
    }
    var cost = count * 10;
    for(var i = 0; i<arr.length; i++) {
        obj = arr[i].getObject();
        if(obj) {
            if(obj.isBomb) {
                if(!obj.isDestroyed) {
                    this.destroyBomb(obj.cell);
                }
            } else
            if(obj.isHero || obj.isGround || obj.isBonus) {
            } else {
                this.destroyCell(arr[i]);
                arr[i].setCost(cost);
            }
        }
    }
    points += cost * count;
    this.destroyCell(cell);
    cell.setCost(300);
    this.points += 300 +points;
    this.updatePoints();


};
pro.destroyCell = function(cell) {
    var obj = cell.getObject();

    if(obj) {
        cell.Selected = false;
        this.killed.push(obj); obj.isKilled = true; obj.cell.Selected = false;

       // this.field.delCellObject(obj.destroy());
        if(obj.typeName == 'dirt') {
            obj.dirt.nextFrame();
        } else
        if(obj.typeName == 'hero') {

        }
        else {
            obj.img.nextFrame();
        }
    }
};
pro.destroyCells = function() {
 //   this.isWaitAnimations = true;
 //   this.field.initTutorial(false);
    var cost = this.selected.length * 10;
    var points = cost * this.selected.length;
    this.points += points;
    GodStep.playSound('pop', 0, PR.SOUND);
    this.updatePoints();
    var isCageSound = true;
    while(this.selected.length) {
        var cell = this.selected[0];
        this.destroyCell(cell);
        this.selected.splice(0, 1);
        cell.setCost(cost);
        cell.isKilled = true;

        var object = (cell.guests.length > 0) ? cell.guests[0] : null;
        if(object) {
            if(object.isHeroTrap && isCageSound) {
                isCageSound = false;
                GodStep.playSound('cage', 0, PR.SOUND);
            }
        }
   }
    this.isCanMove = false;
    this.canMoveTimer = PR.CANMOVEDELAY * 6;
    this.moveDownTimer = PR.MOVEWAITTIMER * 6;

};

// listeners
pro.step = function() {
    if(!this.noSteps) {
        this.steps--;
        this.stepLabel.setText(this.steps + ' ' + (this.steps == 1 ? 'move' : 'moves'));
        this.stepLabel.updateText();
        this.stepLabel.x = (this.W - this.stepLabel.width)/2;
        if(this.steps%10 == 0) {
            this.stepLabel.y = this.stepLabel.posY - this.H * .01;
        }
        if(this.steps == 0) {
            this.over(PR.S('no moves'));
        }
    }
};
pro.mouseUp = function(cell) {
    var p = this;
    var object = (cell) ? cell.getObject() : null;
    var type = -1;

    if(this.isCanMove && this.field.isTutorial && !this.isFirstClick && (this.selected.length > 0 || object.isBonus || object.isBomb)) {
        if(this.field.completeCell) {
            var ccell = this.field.cellsXY[this.field.completeCell.y][this.field.completeCell.x];
            var color = ccell.getColored();
            var cellColor = cell.getColored();
            if(cell == ccell) {
                this.field.animPhase++;
            } else {
                if ((!color || !cellColor)) return;

                if (color.t == cellColor.t) {
                    this.field.animPhase++;
                } else {
                    return;
                }
            }

        }
    }


    if (object) {
        type = object.t;
    }
    if(cell) {
        if(cell.yi - p.topCell > 8) {
            p.selectCells(null);
            return;
        }
    }
    var isFound = false;
    if (p.selected.length > 0) {
        for(var s = 0; s<p.selected.length; s++) {
            if(p.selected[s] == cell) {
                isFound = true;
            }
        }
        var obj = p.selected[0].getObject();

        if(obj && isFound) {
            if (obj.t == type) {
                p.step();
                p.destroyCells();
            } else {
                p.selectCells(null);
            }
        } else {
            p.selectCells(null);
        }
    } else {
        if (object) {
            if (p.bonusCell == object.cell) {
                p.bonusCell.Selected = false;
                if (object.isBonus) {
                    p.step();
                    p.destroyBonuses(p.bonusCell);
                } else if (object.isBomb) {
                    if(p.isCanMove) {
                        p.step();
                        p.destroyBomb(p.bonusCell);
                    }
                }
            } else {
                if (p.bonusCell) {
                    p.bonusCell.Selected = false;
                }
            }
            p.bonusCell = null;
        } else {
            if (p.bonusCell) {
                p.bonusCell.Selected = false;
                p.bonusCell = null;
            }
        }
    }
};
pro.h_field = function(e) {
   var t = e.target;
    if(e.content.getLocalPosition) {
        var p = e.content.getLocalPosition(t);
        var cell = t.getCellByCoord(p.x, p.y);
        t.parent.parent.mouseUp(cell);
    }

};
pro.h_cells = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var cell = e.content.data;
    var object;

    if(!p.isOver && !p.pause.visible && p.isCanMove && !p.isWaitAnimations && !p.isFirstClick && !p.isWin) {
        switch (e.type) {
            case Games.CELL_UP:
              //  p.mouseUp(cell);
                break;
            case Games.CELL_DOWN:

                object = cell.getObject();
                if(object) {
                    if(object.isColored && !object.isDirt) {
                        p.selectCells(cell);
                    } else {
                        if(object.isBonus || object.isBomb) {
                            p.bonusCell = cell;
                            cell.Selected = true;
                        }
                    }
                }
                break;
        }
    }
    p.isFirstClick = false;

};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, PR.SOUND);

    switch (t) {
        case p.b_back:
            GodStep.ISEDITMODE = true;
            s.screenTo([s.dev], p);
            break;
        case p.b_pause:
            p.pause.init();
            break;
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;

    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(t.isGameStarted && !t.isFail) {

                t.field_start.vis = false;
            }
            break;
        case GodStep.FRAME_UP:
         //   t.mouseUp(null);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var s = this.soul;
        this.scale.x = this.scale.y = value;
        this.pause.Scale = value;
        this.pause.y = -(this.soul.DOH/2)/value;
        this.container.y = -(this.soul.DOH/2)/value;
        this.back.rescale(value);
        var fx = (this.W - this.field.W * PR.CELLW_SCALE * this.field.scale.x) * .5;
        this.lineLeft.x = fx;
        //this.lineLeft.scale.y = this.lineRight.scale.y = (s.H)  / this.lineRight.texture.height * 0.75/value * (s.OH )/s.H;
        this.lineRight.x = this.W  - fx;
        this.maska.x = this.field.x = fx;
        this.maska.y = this.field.y = (s.OH - s.DOH/2 - s.H *.13)/value -  Math.min(9, this.field.cellCountY) * this.field.cellW * this.field.scale.x ;//(this.soul.H *.14 - this.soul.DOH/2)/value;
        this.topSprite.y = -s.DOH/2/value;
        this.footer.y = (s.DOH/2 + s.H)/value ;

       // this.lineRight.height = this.lineLeft.height = this.footer.y + (s.DOH/2)/value * .5;
        //this.lineLeft.scale.y = this.lineRight.scale.y = 1 * ((s.OH - this.lineLeft.y) / (s.H)) * s.startS;
        var dy = (this.lineLeft.y + this.field_down.height) * value;
        this.lineLeft.scale.y = this.lineRight.scale.y = .75 * this.oS * ((s.OH - this.lineLeft.y - this.field_down.height) / (s.H - this.lineLeft.y - this.field_down.height));// * s.startS;
        this.lineLeft.scale.y = this.lineRight.scale.y = 1 * this.oS  * ((s.OH - dy) / (s.H - dy));// * this.oS * ((s.OH) / (s.H));// * s.startS;

        //this.fieldContainer.y = (s.OH - s.DOH/2)/value (-this.topCell * this.field.cellW * this.field.scale.x - this.fieldContainer.y) * .1;

    }
});
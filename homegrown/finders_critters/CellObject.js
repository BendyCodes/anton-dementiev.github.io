PR.CellObject = function(name, S, cell, colors, randomColors, selector) {
    var type = name;
    GodStep.Frame.call(this, type);
    this.typeName = name;
    this.S = S ;
    this.startS = S * PR.CELL_SCALE;
    this.sy = 0;
    var id;

    this.deltaXY = 0;
    var cid, ctype, t;
    switch (name) {
        case 's_bonus':
            this.phase = Math.random();

            this.isObject = true;
            this.animTimer = 0;
            this.isDynamic = true;
            this.isBonus = true;
            this.selector = selector;
            if(isNaN(selector) || selector == undefined) {
                this.selector = 1;
            }
            switch (this.selector) {
                case 1: t = 1; ctype = 'red'; break;
                case 2: t = 5; ctype = 'yellow'; break;
                case 3: t = 4; ctype = 'blue';break;
                case 4: t = 3; ctype = 'purple';break;
                case 5: t = 2;ctype = 'green'; break;
            }
            if(!GodStep.ISEDITMODE) {
                if (colors) {
                    switch (ctype) {
                        case 'red':  t = 0;  break;
                        case 'yellow':   t = 1;  break;
                        case 'blue':  t = 2;  break;
                        case 'purple':    t = 3;  break;
                        case 'green':   t = 4;   break;
                    }
                    id = colors.indexOf(t);
                    if(!randomColors) {
                        trace(1);
                    }
                    if (id == -1) id = 0;
                    switch (randomColors[id]) {
                        case 0:
                            this.ctype = 'red';
                            break;
                        case 1:
                            this.ctype = 'yellow';
                            break;
                        case 2:
                            this.ctype = 'blue';
                            break;
                        case 3:
                            this.ctype = 'purple';
                            break;
                        case 4:
                            this.ctype = 'green';
                            break;
                    }
                    switch (this.ctype) {
                        case 'red':
                            t = 1;
                            break;
                        case 'yellow':
                            t = 5;
                            break;
                        case 'blue':
                            t = 4;
                            break;
                        case 'purple':
                            t = 3;
                            break;
                        case 'green':
                            t = 2;
                            break;
                    }
                }
            }
            this.addFrame(this.img = new Games.Img('b_' + t, this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.67, cell.W/2, cell.H/2, new PIXI.Point(.5,.44)));
            this.startS = this.img.scale.x;
            break;
        case 'bomb':
            this.phase = Math.random();
            this.isDynamic = true;
            this.isObject = true;
            this.animTimer = 0;
            this.isBomb = true;
            this.addFrame(this.img = new GodStep.MovieClip(['bomb', 'boom_1', 'boom_2', 'boom_3', 'boom_4', 'boom_5'],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
            this.startS = this.img.scale.x;

            break;
        case 'hero2':
            this.isDynamic = true;
            this.isObject = true;
            this.animTimer = 0;
            this.isColored = true;
            this.isHeroTrap = true;
            this.selector = selector;
            if(isNaN(selector) || selector == undefined) {
                this.selector = 1;
            }
            switch (this.selector) {
                case 1: t = 1; ctype = 'red'; break;
                case 2: t = 5; ctype = 'yellow'; break;
                case 3: t = 4; ctype = 'blue';break;
                case 4: t = 3; ctype = 'purple';break;
                case 5: t = 2;ctype = 'green'; break;
            }
            this.ctype = ctype;

            if(!GodStep.ISEDITMODE) {
                if (colors) {
                    switch (ctype) {
                        case 'red':  t = 0;  break;
                        case 'yellow':   t = 1;  break;
                        case 'blue':  t = 2;  break;
                        case 'purple':    t = 3;  break;
                        case 'green':   t = 4;   break;
                    }
                    id = colors.indexOf(t);
                    if (id == -1) id = 0;
                    switch (randomColors[id]) {
                        case 0:
                            this.ctype = 'red';
                            break;
                        case 1:
                            this.ctype = 'yellow';
                            break;
                        case 2:
                            this.ctype = 'blue';
                            break;
                        case 3:
                            this.ctype = 'purple';
                            break;
                        case 4:
                            this.ctype = 'green';
                            break;
                    }
                    switch (this.ctype) {
                        case 'red':
                            t = 1;
                            break;
                        case 'yellow':
                            t = 5;
                            break;
                        case 'blue':
                            t = 4;
                            break;
                        case 'purple':
                            t = 3;
                            break;
                        case 'green':
                            t = 2;
                            break;
                    }
                    this.t = t;

                }
            }
            this.addFrame(this.img = new GodStep.MovieClip(['cage_' + t,'cage_' + t + '_1','cage_' + t + '_2','cage_' + t + '_2','cage_' + t + '_3','cage_' + t + '_4','cage_' + t + '_5'],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));

            break;
        case 'hero':
            this.phaseAnim = 0;
            this.isDynamic = true;
            this.isObject = true;
            this.animTimer = 0;
            this.isHero = true;
            var pt = selector;
            if(isNaN(selector) || selector == undefined) {
                pt = 1;
            }
            pt = PR.GamePlay.HERO_RANDOMS[PR.CellObject.HERO_LAST_TYPE] + 1;
            PR.CellObject.HERO_LAST_TYPE++;
            if(PR.CellObject.HERO_LAST_TYPE == PR.GamePlay.HERO_RANDOMS.length) {
                PR.CellObject.HERO_LAST_TYPE = 0;
            }//

            //pt =  parseInt(Math.random() * (3 + (PR.LAST_LEVEL_SELECTED > 9 ? 1 : 0) + (PR.LAST_LEVEL_SELECTED > 19 ? 1 : 0))) + 1;
            this.selector = pt;
            this.addFrame(this.img = new GodStep.MovieClip(['pers_' + pt + '_1', 'pers_' + pt + '_3', 'pers_' + pt + '_1', 'pers_' + pt + '_3', 'pers_' + pt + '_2', 'pers_' + pt + '_2', 'pers_win_' + pt],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
            this.addFrame(this.dis = new GodStep.MovieClip(['disappear_1', 'disappear_2', 'disappear_3', 'disappear_4', 'disappear_5'],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
            this.dis.visible = false;
            this.img.animTime = 50;
            this.img.animTimer = parseInt(Math.random() * 40);
            this.img.setToFrame(parseInt(Math.random() * this.img.totalFrames));
            break;
        case 'dirt':
            this.isDynamic = true;
            this.animTimer = 0;
            this.isObject = true;
            this.isColored = true;
            this.isDirt = true;
            if(GodStep.ISEDITMODE) {
                this.addFrame(this.img = new Games.Img(name, this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK*.7, cell.W/2, cell.H/2, new PIXI.Point(.5,.44)));

            } else {
                cid = colors[parseInt(Math.random() * colors.length)];
                ctype = PR.Cell.STANDART[cid];
                this.ctype = ctype;
                switch (ctype) {
                    case 'red': t = 1; break;
                    case 'green': t = 2; break;
                    case 'purple': t = 3; break;
                    case 'blue': t = 4; break;
                    case 'yellow': t = 5; break;
                }
                this.t = t;
                this.addFrame(this.img = new GodStep.MovieClip(['cube_' + t,'cube_' + t + '_1','cube_' + t + '_2','cube_' + t + '_3','cube_' + t + '_4','cube_' + t + '_5'],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
                this.addFrame(this.dirt = new GodStep.MovieClip(['net_1', 'net_2', 'net_3', 'net_4', 'net_5'],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
            }
            break;
        case 'block':
            this.isGround = true;
            this.isBlock = true;
            this.isObject = true;
            this.addFrame(this.img = new Games.Img(name, this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK, cell.W/2, cell.H/2, new PIXI.Point(.5,.44)));
            break;
        case 'delete':
            this.isBlock = true;
            this.isGround = true;
            this.isObject = true;
            var texID = (((cell.yi * 9 + cell.xi) % 2 == 0) ? '2' : '1');
            this.addFrame(this.img = new Games.Img('cube_lock_' + texID, this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK , cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
            break;
        case 'red':
        case 'green':
        case 'purple':
        case 'blue':
        case 'yellow':
            if(PR.Field.IS_FILL_DATA) {
                switch (name) {
                    case 'red': t = 0; break;
                    case 'yellow': t = 1; break;
                    case 'blue': t = 2; break;
                    case 'purple': t = 3; break;
                    case 'green': t = 4; break;
                }
                id = colors.indexOf(t);
                if(id == -1) id = 0;
                switch (randomColors[id]) {
                    case 0: this.ctype = 'red'; break;
                    case 1: this.ctype = 'yellow'; break;
                    case 2: this.ctype = 'blue'; break;
                    case 3: this.ctype = 'purple'; break;
                    case 4: this.ctype = 'green'; break;
                }
            } else {
                this.ctype = name;
            }

            switch (this.ctype) {
                case 'red': t = 1; break;
                case 'green': t = 2; break;
                case 'purple': t = 3; break;
                case 'blue': t = 4; break;
                case 'yellow': t = 5; break;
            }

            this.animTimer = parseInt(Math.random() * 55);
            this.isColored = true;
            this.isObject = true;
            this.isDynamic = true;
            this.t = t;
            this.addFrame(this.img = new GodStep.MovieClip(['cube_' + t,'cube_' + t + '_1','cube_' + t + '_2','cube_' + t + '_2','cube_' + t + '_3','cube_' + t + '_4','cube_' + t + '_5'],  this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.95, cell.W/2, cell.H/2, new PIXI.Point(.5,.5)));
            this.img.animTime =4;

            //this.addFrame(this.img = new Games.Img(this.ctype, this.S/PR.CELL_SCALE * PR.CELL_SCALE_BACK *.8, cell.W/2, cell.H/2, new PIXI.Point(.5,.44)));

            break;
    }

    this.startS = this.img.scale.x;
    this.cell = cell;

    this.applyCellPostion(true);

};
extend(PR.CellObject, GodStep.Frame);
PR.CellObject.HERO_LAST_TYPE = 0;
PR.CellObject.COLORS = [0x0000ff, 0xff0000, 0x00ff00, 0xffff88, 0xff00ff];

pro.move = function() {
    if(this.img) {
        var container = this.img.parent.parent;
        var field = container.parent;
        var gameplay = field.parent.parent;
        var killArray = gameplay.killed;
        if(this.isKilled) {
            gameplay.moveDownTimer = 10;

            if(this.isHero) {
                if(this.phaseAnim++ == 30) {
                    this.phaseAnim--;
                    this.dis.visible = true;
                    this.dis.animate();
                    this.img.setToFrame(this.img.totalFrames - 1);
                    if(this.dis.currentFrame == 2 && this.dis.cycle == 0) {
                        this.img.visible = false;
                    }
                    if(this.dis.currentFrame == 0 && this.dis.cycle > 0) {
                        field.delCellObject(this.destroy());
                        killArray.splice(killArray.indexOf(this), 1);
                        gameplay.heroLabel.setText((gameplay.heroesCount - field.heroes.length) + '/' + gameplay.heroesCount);
                        if(field.heroes.length == 0) {
                            gameplay.win();
                        }
                        gameplay.heroLabel.scale.x = gameplay.heroLabel.scale.y *= 1.2;

                    }
                } else {
                    if(!this.isSounded) {
                        this.isSounded = true;
                        GodStep.playSound('rescue', 0, PR.SOUND);
                    }
                    this.img.setToFrame(this.img.totalFrames - 1);
                }

            } else
            if(this.isHeroTrap) {
                this.img.animate();
                if(this.img.currentFrame == 0) {
                    field.delCellObject(this.destroy());
                    killArray.splice(killArray.indexOf(this), 1);
                    GodStep.playSound('cageout', 0, PR.SOUND);

                    var cell = this.cell;
                    var cells = field.cellsXY;
                    field.addCellObject(gameplay.hero = new PR.CellObject('hero', gameplay.s, cell, gameplay.colors, null, this.selector));
                    cell.delGuest(gameplay.hero);
                    gameplay.hero.cell = null;
                    gameplay.field.heroes.push(gameplay.hero);
                    for (var hy = cell.yi; hy >= 0; hy--) {
                        var o = cells[hy][cell.xi].getObject();
                        if (o) {
                            if (o.isGround) {
                                gameplay.hero.targetCell = cells[hy + 1][cell.xi];
                                gameplay.hero.setCell(cells[hy + 1][cell.xi]);
                                gameplay.hero = null;
                                return;
                            }
                        }
                    }
                    if (!gameplay.hero.targetCell) {
                        gameplay.hero.targetCell = cells[0][cell.xi];
                        gameplay.hero.setCell(cells[0][cell.xi]);
                    }
                }
            } else
            if(this.dirt) {
                this.dirt.animate();
                if(this.dirt.currentFrame == 0) {
                    this.removeChild(this.dirt);
                    this.dirt = null;
                    this.isDirt = false;
                    this.isKilled = false;
                    this.typeName = this.ctype;
                    killArray.splice(killArray.indexOf(this), 1);
                }
            } else
            if(this.img) {
                this.img.animate();
                if(this.img.currentFrame == 0) {
                    field.delCellObject(this.destroy());
                    killArray.splice(killArray.indexOf(this), 1);
                }
            }
        }
    }
};
pro.update = function() {
    if(this.isBomb || this.isBonus) {
        this.phase += 0.075;
        this.img.scale.x = this.img.scale.y += (this.startS + Math.sin(this.phase)*.05 - this.img.scale.y) * .1;
    } else
    if(this.isHero) {
        this.img.animate();
        if(this.img.currentFrame == this.img.totalFrames - 1) {
            this.img.setToFrame(0);
        }
    }
};
pro.setAsBonus = function() {
    this.isBonus = true;
    this.bonusanim = 0;
    this.isVertical = Math.random() > .5;
    //this.addChild(this.bonus = new PR.Img((this.isVertical ? 'bonusVert' : 'bonusGor'), this.startS, this.cell.W/2, this.cell.H/2,.5));
    if(this.isVertical) {
        this.addChildAt(this.bonus = new PR.MovieClip(['bonus_2_1', 'bonus_2_2','bonus_2_3','bonus_2_4','bonus_2_5','bonus_2_6'], this.startS * GodStep.IMAGE_RESOLUTION, this.cell.W/2, this.cell.H/2,.5), 0);
    } else {
        this.addChildAt(this.bonus = new PR.MovieClip(['bonus_1_1', 'bonus_1_2','bonus_1_3','bonus_1_4','bonus_1_5','bonus_1_6'], this.startS * GodStep.IMAGE_RESOLUTION, this.cell.W/2, this.cell.H/2,.5), 0);
    }
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
};
pro.removeBonus = function() {
    if(this.bonus) {
        this.removeChild(this.bonus); this.bonus = null;
    }
};
pro.setCell = function(cell) {
    if(this.cell) {
        this.cell.delGuest(this);
    }
    this.cell = cell;
    cell.pushGuest(this);
    this.applyCellPostion(false);
};
pro.applyCellPostion = function(now) {
    this.nextPlace = new PIXI.Point(this.cell.x, this.cell.y);
    if(now) {
        this.Place = this.nextPlace;
    }
};
pro.destroy = function() {
    this.cell.guests.splice(this.cell.guests.indexOf(this), 1);
    this.removeChild(this.img);
    if(this.label) {
        this.removeChild(this.label);
    }
    if(this.bonus) {
        this.removeChild(this.bonus);
    }
    if(this.dirt) {
        this.removeChild(this.dirt);
    }
    if(this.dis) {
        this.removeChild(this.dis);
    }
    if(this.img1) {
        this.removeChild(this.img1);
        this.img1 = null;
    }
    this.img = null;
    return this;
};

pro.setAsSelected = function(ok) {
    this.animTimer = 0;
    this.isColorSelected = ok;
    this.img.setToFrame(ok ? 3 : 0);
  //  this.img.scale.x = this.img.scale.y = (ok) ?  this.startS * 1.2 :  this.startS;
};


M3.GamePlay = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'GamePlay', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    this.visible = false;
    this.OW = soul.OW;
    this.OH = soul.OH;
    this.selected = [];

    var S = this.startS = soul.startS;
    this.addChild(this.background = new M3.Background(this, 'back_1'));

    this.addFrame(this.field = new M3.Field(soul, 7, 9)); this.field.gameplay = this;
    this.addChild(this.hud = new PIXI.DisplayObjectContainer());
    this.hud.addChild(this.field_game = new M3.Img('field_game', S, this.W *.5, 0, new PIXI.Point(0.5, 0)));
    this.hud.addChild(this.moveField = new M3.Img('move', S, this.W *.5, this.H *.045,.5));
    this.hud.addChild(this.scoreField = new M3.Img('score', S, this.W *.8, this.H *.045,.5));
    this.hud.addChild(this.slider_1 = new M3.Img('slider_1', S, this.W *.15, this.H *.045,.5));
    this.hud.addChild(this.slider_2 = new M3.Img('slider_2', S, this.W *.15, this.H *.045,.5));
    this.hud.addChild(this.sliderMask = this.createGraphics('sliderMask'));
    this.hud.addChild(this.targetIcon = new M3.Img('i_1_1', S, this.W *.171, this.H *.047,.5));

    this.slider_2.mask = this.sliderMask;
    this.sliderMask.x = - this.W * .2;
    this.sliderMask.beginFill(0, 1); this.sliderMask.y = this.H * .023;
    this.sliderMask.drawRect(0, 0, this.W *.3, this.H *.05);
    this.sliderMask.endFill();


    this.hud.addChild(this.stepText = new M3.Text('', S * 100, this.W *.5, this.H *.0, 'center'));
    this.hud.addChild(this.pointText = new M3.Text('', S * 67, this.W *.81, this.H *.015, 'right'));
    this.hud.addChild(this.needPointText = new M3.Text('', S * 58, this.W *.1, this.H *.01, 'left'));

    this.addChild(this.b_pause = new M3.ImgButton('b_pause', null, 1, this, S *.9, this.W *.5, this.H *.5));
    this.addChild(this.tutorialOne = new M3.TutorialOne(soul, this));
    this.addChild(this.tutorial = new M3.Tutorial(soul));
    this.addChild(this.pause = new M3.Pause(soul, this));
    addEvent(this.b_pause, Games.ImgButton.CLICK, this.h_buttons);

    addEvent(this.field, Games.CELL_DOWN, this.h_cells);
    addEvent(this.field, Games.CELL_UP, this.h_cells);
    addEvent(this.field, GodStep.FRAME_UP, this.h_cells);
    this.field.setHitArea(-soul.OW, -soul.OH, soul.OW * 2, soul.OH * 2);

    this.addChild(this.console = new M3.Text('', S * 80, this.W *.01, this.H *.0, 'center'));

    addEvent(this.field, GodStep.FRAME_MOVE, this.h_cells);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.GamePlay, GodStep.Frame);

M3.FRAME_RATE = 1/60;

pro.update = function() {
    if(this.visible) {
        if(M3.JUST_BONUS_PWNED > 0) {
            M3.JUST_BONUS_PWNED--;
        }
        if(M3.JUST_BONUS_GENERATED > 0) {
            M3.JUST_BONUS_GENERATED--;
        }
        if(M3.JUST_BLOCK_DELETE > 0) {
            M3.JUST_BLOCK_DELETE--;
        }
        if(M3.JUST_DIRT_DELETE > 0) {
            M3.JUST_DIRT_DELETE--;
        }

        this.field.update();
        this.tutorialOne.update();
        if(this.tutorial.isDead) {
            this.tutorial.alpha += (0 - this.tutorial.alpha) * .1;
            if(this.tutorial.alpha < 0.05) {
                this.tutorial.visible = false;
            }
        } else {
            this.tutorial.alpha += (1 - this.tutorial.alpha) * .1;
            this.tutorialOne.alpha = 0;
        }
        var fcx = this.field.cellCountX;
        var fcy = this.field.cellCountY;
        var cells = this.field.cellsXY;
        var cell, cellRow, guests, obj, dy, downCellRow, downCell, downLeft, downRight, isMoved, isMovedDown;
        var d = this.W * .015;
        var t = this.W * .04;
        var j, i, o;
        var isAllNotInPlace = false;
        this.isCanMove = true;
        var dddy = 0;
        var justDroped = this.justDroped =  false;
        for(j = 0; j<fcx; j++) {
            for (i = fcy - 1; i >= 0; i--) {
                cellRow = cells[i];
                cell = cellRow[j];
                guests = cell.guests;
                if (i == 0) {
                    if (!cell.isBusy()) {
                        this.generate(cell);
                    }
                }
                for (o = 0; o < guests.length; o++) {
                    obj = guests[o];
                    obj.update();
                    if (obj.isDynamic) {
                        dy = obj.nextPlace.y - obj.y;
                        obj.sy *= .8;
                        if (dy < t) {
                            downCellRow = cells[cell.yi + 1];
                            if (downCellRow) {
                                downCell = downCellRow[cell.xi];
                                if(!downCell.isBusy()) {
                                    obj.setCell(downCell);
                                    isMovedDown = true;
                                    justDroped = true;
                                    this.stepEndTimer = 290;
                                    this.isCanMove = false;
                                    this.isCanFindMatchThree = true;
                                }
                            }
                            if(obj.isItem) {
                                if(obj.isItemDead) {
                                    if(obj.itemTimer-- == 0) {
                                        obj.isDead = true;
                                        this.bonusWaitTimer = 100;
                                        //obj.scale.x = obj.scale.y += (1.1 - obj.scale.y) * .1;
                                    }
                                }
                            }
                            if(obj.isDead) {
                                this.field.delCellObject(obj);
                                this.isCanMove = false;
                                this.isCanFindMatchThree = true;
                                obj.cell.delGuest(obj);
                                if(obj.isItem) {
                                    GodStep.playSound('crystal', 0, M3.SOUND);

                                    this.itemCountFinished--;
                                    if(this.itemCountFinished <= 0) {
                                        this.levelEnd();
                                    }
                                }
                                this.updateTarget();
                            }
                        } else {
                            isAllNotInPlace = true;
                            dy += obj.sy;
                            obj.sy += .17;
                        }
                        var ddy = 0;
                        obj.x += Math.min(Math.max(-d, (obj.nextPlace.x - obj.x) * .5), d);
                        obj.y += ddy = Math.min(Math.max(-d * 1.7, (dy * obj.sy)*.5), d * 1.7);
                        dddy = Math.max(ddy, dddy);
                    }
                }
            }
        }

        if(!justDroped)
        if(!isAllNotInPlace) {
            for(i = fcy-1; i>=0;i--) {
                cellRow = cells[i];
                isMovedDown = false;
                for(j = 0; j<fcx; j++) {

                    cell = cellRow[j];
                    guests = cell.guests;

                    if(i == 0) {
                        if(guests.length == 0) {
                            this.bonusWaitTimer = 40;
                            this.generate(cell);
                        }
                    }
                    for(o = 0; o<guests.length; o++) {
                        isMoved = false;

                        obj = guests[o];
                        if(obj.isDynamic) {
                            dy = obj.nextPlace.y - obj.y;
                            if(dy < t) {
                                downCellRow = cells[cell.yi + 1];
                                if(downCellRow) {
                                    downCell = downCellRow[cell.xi];
                                    if(!downCell.isBusy()) {
                                        obj.setCell(downCell);
                                        isMovedDown = true;
                                        this.isCanMove = false;
                                        this.isCanFindMatchThree = true;
                                    } else {
                                        if(!isMovedDown) {
                                            downLeft = downCellRow[cell.xi-1];
                                            downRight = downCellRow[cell.xi+1];
                                            if(downLeft) {
                                                if(!downLeft.isBusy()) {
                                                    obj.setCell(downLeft);
                                                    isMoved = true;
                                                    this.isCanMove = false;
                                                    this.isCanFindMatchThree = true;
                                                }
                                            }
                                            if(!isMoved) {
                                                if(downRight) {
                                                    if(!downRight.isBusy()) {
                                                        obj.setCell(downRight);
                                                        this.isCanMove = false;
                                                        this.isCanFindMatchThree = true;
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }

                    }
                }
            }
        }

        if(this.isCanMove) {
            if(this.isCanFindMatchThree) {
                this.isCanFindMatchThree = false;
                this.field.findMatchThree();
                if(this.isHaveDirt) {
                    if(this.field.dirts.length == 0) {
                        this.levelEnd();
                    }
                }
            }
            if(this.bonusWaitTimer-- == 0) {
                if(this.bonusWaitTimer < -100) {
                    this.bonusWaitTimer = -100;
                }
                this.generateBonuses();
            }
        }
        if(this.isStepsEnded) {
            if(this.stepEndTimer-- == 170) {
                this.tutorial.initEnd(false);
            }
            if(this.stepEndTimer-- < 0) {
                this.isStepsEnded = false;
                this.soul.screenTo([this.soul.replay], this);
            }
        }
        if(this.isFinishLevel) {
            if(this.bonusFinalTimer-- == 0) {
                 this.tutorial.initEnd(true);
                 this.isBonusFinalEnd = true;
                 this.stepText.setText('0');
            }
            if(this.bonusFinalTimer == 100) {
                for(var bi = 0; bi<this.field.cells.length; bi++) {
                    var bcell = this.field.cells[bi];
                    if(bcell.getBonus()) {
                        this.destroyBonusFromCell(bcell, bcell.getBonus()); bcell.cost =50;
                        bcell.removeDynamic(true);
                    }

                    this.pointText.setText(this.points + '');
                    this.pointText.updateText(); this.pointText.x = this.W * .827 - this.pointText.width/2;
                }
                this.isBonuses = false;

                this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][0] = 1;
                M3.NEW_RECORD = (this.points > this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1]);
                this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1] = Math.max(this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1], this.points);
            }
            if(this.isBonusFinalEnd) {
                if(this.levelEndTimer-- == 0) {
                    this.soul.screenTo([this.soul.victory], this);
                    this.soul.savePlayer();
                }
            }
        }
    }

};
pro.updateTarget = function() {
    switch (this.gameType) {
        case 'points':
            this.needPointText.setText(this.params.points + '');
            this.sliderMask.x = -this.W * .2 * Math.min(1, (1 - Math.min(1, this.points/this.params.points)));
            break;
        case 'items':
            this.needPointText.setText((this.params.items - this.itemCountFinished) + '/' + this.params.items);
            this.sliderMask.x = -this.W * .2 * (1 - (this.params.items - this.itemCountFinished)/this.params.items);
            break;
        case 'dirts':
            this.needPointText.setText((this.dirtCount - this.field.dirts.length) + '/' + this.dirtCount);
            this.sliderMask.x = -this.W * .2 * (1 - (this.dirtCount - this.field.dirts.length)/this.dirtCount);
            break;
    }
    this.needPointText.updateText();
    this.needPointText.x = this.W * .19 - this.needPointText.width/2;
    this.needPointText.y = this.H * .019;
};
pro.init = function() {
    this.isEndGenerateBonuses = false;
    M3.JUST_DIRT_DELETE =0;
    M3.JUST_BLOCK_DELETE =0;
    M3.JUST_BONUS_GENERATED = 0;
    M3.JUST_BONUS_PWNED = 0;
    GodStep.volumeSound('theme', M3.MUSIC);
    GodStep.playSound('theme', -1, M3.MUSIC);
    GodStep.playSound('start', 0, M3.SOUND);
    M3.SKIN = Math.min(3, parseInt((M3.LAST_LEVEL_SELECTED-1)/10) + 1);
    this.bonusFinalTimer = 0;
    this.pause.visible = false;
    this.background.img.setTexture('back_' + M3.SKIN);
    this.field.reskin(M3.SKIN);
    this.sliderMask.x = -this.W * .2;

    this.pointText.setText('0'); this.pointText.updateText();  this.pointText.x = this.W * .827 - this.pointText.width/2;

    this.isFinishLevel = false;
    this.isStepsEnded = false;
    this.points = 0;
    this.bonusWaitTimer = 40;
    this.isJustInit = true;
    this.itemRandomCount = parseInt(Math.random() * (this.field.cellCountX - 2) + 1);
    this.isCanMove = false;
    for(var s = 0; s < this.selected.length; s++) {
        this.selected[s].setAsSelected(false);
    }
    this.selected = [];

    this.visible = true;
    this.isFinished = false;
    this.playerDATA = GodStep.LoadLocal(this.soul.PLAYER_SLOT);
    if(this.playerDATA) {
    } else {
        this.playerDATA = {};
        trace('default save');
    }

    var leveldata = M3.LAST_LEVEL_DATA;
    this.emptyCount = 0;//this.field.getEmptyCount();

    if(leveldata) {
        this.field.setData(leveldata);
        this.params = leveldata[leveldata.length - 1];
        this.colors = this.params.colors;
        this.steps = this.params.steps;
        this.isBonuses = this.params.isBonus;
        this.bonusCount = this.params.bonuses || 0;
        this.stepText.setText(this.steps + ''); this.stepText.updateText();  this.stepText.x = this.W * .5 - this.stepText.width/2;
        this.needPointText.setText(this.params.points + '');
        this.itemCountFinished = this.itemCount = this.params.items;
        this.emptyCount = 0;
        this.field.isNowFilled = true;
        this.field.fill();
        this.field.findMatchThree();
        this.dirtCount = this.field.dirts.length;
        if(this.params.points > 0) {
            this.gameType = 'points'; this.targetIcon.setTexture('star_game');
        } else
        if(this.field.dirts.length > 0) {
            this.gameType = 'dirts'; this.targetIcon.setTexture('i_1_' + M3.SKIN);
        } else
        if(this.itemCountFinished > 0) {
            this.gameType = 'items'; this.targetIcon.setTexture('i_2_1');
        }
        this.field.isNowFilled = false;
    }

    this.updateTarget();
    this.tutorial.init();
    this.tutorialOne.init(M3.LAST_LEVEL_SELECTED);
  //  this.tutorial.visible = !this.tutorialOne.visible;
    this.isHaveDirt = this.field.dirts.length > 0;

    switch (M3.LAST_LEVEL_SELECTED) {
        case 13:
            this.itemCounter = 4;
            break;
    }
};
pro.generate = function(cell) {
    var cid = this.colors[parseInt(Math.random() * this.colors.length)];
    var type = M3.Cell.STANDART[cid];
    if(this.isJustInit) {
        if(this.emptyCount == this.itemRandomCount) {
            if(this.itemCount > 0) {
                this.itemCount--;
                this.itemCounter = 20 + this.itemRandomCount;
                type = 'item';
            }
            this.isJustInit = false;
        }
    } else {
        if(this.itemCount > 0 && !this.field.isNowFilled) {
            this.itemCounter--;
            if(this.itemCounter == 0) {
                this.itemCounter = 18;
                this.itemCount--;
                type = 'item';
            }
        }
    }
    var obj;
    this.field.addCellObject(obj = new M3.CellObject(type, this.startS, cell));
    obj.y -= cell.H;
    this.emptyCount++;
};
pro.generateBonuses = function() {
    if(this.isBonuses) {
        if(this.isEndGenerateBonuses) {
            if(this.steps > 0) {
                this.steps--;
                this.bonusWaitTimer = 50;
                this.bonusCount += 1;
                this.bonusFinalTimer = 160;
                this.stepText.setText(this.steps + '');
            }
        }
        var c = parseInt(Math.random() * (this.field.cells.length - 1));
        while(this.bonusCount > 0) {
            if(M3.JUST_BONUS_GENERATED == 0){
                M3.JUST_BONUS_GENERATED = 5;
                GodStep.playSound('bonus_appear', 0, M3.SOUND);
            }
            var obj = this.field.cells[c].getColored();
            if(this.tutorialOne.bonus) {
                obj = this.tutorialOne.bonus.getColored();
                this.tutorialOne.bonus = null;
            }
            if(obj) {
                if(!obj.isBonus) {
                    obj.setAsBonus();
                    c = parseInt(Math.random() * (this.field.cells.length - 1));
                    this.bonusCount--;
                } else {
                    c++;
                }
            } else {
                c++;
            }
            if(c == this.field.cells.length) {
                c = 0;
            }
        }
    }
};

// listeners
pro.h_mouse = function(e) {
    var t = e.content.target;
    if(t) {
        switch (e.type) {
            case GodStep.FRAME_UP:
                t.b_pause.isDown = false;
                t.b_pause.Scale = 1;
                break;
        }
    }

};
pro.h_cells = function(e) {
    var cell = e.content.data;
    var t = e.target;
    var p = t.parent;
    var point, overCell2;
    var overCell, dx, dy, s, count, selected;
    var cells = t.cellsXY;
    if(!p.isCanMove || p.isStepsEnded || p.isFinishLevel || p.justDroped || p.pause.visible ) return;
    switch (e.type) {
          case GodStep.FRAME_MOVE:
              if(p.cellDown) {
                  if(e.content) {
                      if(e.content.getLocalPosition) {
                          point = e.content.getLocalPosition(t);
                          point = e.content.getLocalPosition(t);
                          overCell = t.getCellByPoint(point, true);
                          overCell2 = t.getCellByPoint(point, false);

                          if(overCell) {
                              dx = Math.abs(overCell.xi - p.cellLast.xi);
                              dy = Math.abs(overCell.yi - p.cellLast.yi);
                              if(dy <= 1 && dx <= 1) {
                                  if(!overCell.isSelected) {
                                      if(overCell.isEqual(p.cellDown)) {
                                          if(overCell.setAsSelected(true)) {
                                              GodStep.playSound('select', 0, M3.SOUND);

                                              p.selected.push(overCell);
                                              count = parseInt((p.selected.length - 1)/3);
                                              overCell.cost = 200 + count * 50;
                                              overCell.setCost(overCell.cost);
                                              p.field.addLine(p.cellLast, overCell);
                                              p.cellLast = overCell;
                                          }
                                      }
                                  }
                              }
                          }
                          if(overCell2) {
                              if(p.selected.length > 1) {
                                  var prev = p.selected[p.selected.length - 2];
                                  if(prev == overCell2) {
                                      p.cellLast.setAsSelected(false);
                                      GodStep.playSound('select', 0, M3.SOUND);

                                      p.selected.splice(p.selected.length-1, 1);
                                      p.cellLast = p.selected[p.selected.length - 1];
                                      p.field.removeLastLine();

                                  }
                              }
                          }
                      }

                  }
              }
             break;
          case Games.CELL_DOWN:
              if(p.selected.length == 0) {
                  p.selected = [];
                  if(cell.setAsSelected(true))  {
                      GodStep.playSound('select', 0, M3.SOUND);

                      p.cellDown = cell;
                      p.cellLast = cell;
                      cell.cost = 200;
                      cell.setCost(cell.cost);

                     // var tt = cell.guests[0].img.texture.baseTexture.imageUrl;
                      //p.console.setText(cell.guests[0].typeName + ' ' + cell.guests[0].alpha + " " + cell.guests[0].visible + ' ' +
                      //    cell.guests[0].scale.x + ' ' + cell.guests[0].scale.y + ' ' + cell.guests[0].img.alpha + ' ' + cell.guests[0].img.visible + '\n' +
                      //    + tt + ' ' + cell.guests[0].x + " " + + cell.guests[0].y + '\n' + cell.guests[0].img.x + ' ' + cell.guests[0].img.y);
                     // p.console.setText(tt);
                      p.selected.push(cell);
                  }
              }
              break;
          case GodStep.FRAME_UP:
          case Games.CELL_UP:
              p.bonusWaitTimer = 40;

              if(p.cellDown) {
                  p.cellDown.setAsSelected(false);
                  p.cellDown = null;
              }
              var points = 0;
              var skip = false;
              if(p.selected.length > 2) {

                  if(p.tutorialOne.visible) {
                      if(p.tutorialOne.isComplete(p.selected)) {
                          p.tutorialOne.finish();
                          if(M3.LAST_LEVEL_SELECTED != 1 && M3.LAST_LEVEL_SELECTED != 4 && M3.LAST_LEVEL_SELECTED != 6 && M3.LAST_LEVEL_SELECTED != 13 && M3.LAST_LEVEL_SELECTED != 21) {
                              p.tutorial.visible = true;
                              p.tutorial.alpha = 0;
                          }
                      } else {

                          for(s = 0; s < p.selected.length; s++) {
                              p.selected[s].setAsSelected(false);
                          }
                          p.field.removeAllLines();
                          skip = true;
                      }
                  }
                  if(!skip) {
                      GodStep.playSound('match', 0, M3.SOUND);

                      var isBonus = false;
                      var bonuses = [];
                      if(p.isBonuses) {
                          p.bonusCount += parseInt(p.selected.length / 7);
                      }
                      for(s = 0; s < p.selected.length; s++) {
                          selected = p.selected[s];
                          points += selected.cost;
                          selected.setAsSelected(false);
                          if(selected.getBonus()) {
                              bonuses.push(selected.getBonus());
                              isBonus = true;
                              selected.getBonus().removeBonus();
                          }
                          p.points += t.removeBlocksAndDirt(selected, (s == p.selected.length-1 && isBonus));
                      }
                      p.steps--;

                      if(isBonus) {
                          for(var b = 0; b<bonuses.length; b++) {
                              p.destroyBonusFromCell(p.selected[p.selected.length - bonuses.length + b], bonuses[b]);
                          }
                      }

                      p.stepText.setText(p.steps + ''); p.stepText.updateText(); p.stepText.x = p.W * .5 - p.stepText.width/2;
                  }

              } else {
                  GodStep.playSound('select', 0, M3.SOUND);

                  for(s = 0; s < p.selected.length; s++) {
                      p.selected[s].setAsSelected(false);
                  }
              }
              p.field.removeAllLines();

              p.selected = [];
              p.points += points;
              p.pointText.setText(p.points + '');
              p.pointText.updateText();  p.pointText.x = p.W * .827 - p.pointText.width/2;
              if(p.points >= p.params.points && p.params.points != 0) {
                  p.levelEnd();
              } else
              if(p.isHaveDirt) {
                  if(p.steps == 0) {
                      p.gameOver();
                  }
              } else {
                  if(p.steps == 0) {
                      p.gameOver();
                  }
              }

              p.isCanFindMatchThree = true;
              break;
    }
};
pro.gameOver = function() {

    this.isStepsEnded = true;
    this.stepEndTimer = 290;
    M3.NEW_RECORD = (this.points > this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1]);

    this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1] = Math.max(this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1], this.points);

};
pro.levelEnd = function() {
    if(!this.isFinishLevel) {
        this.isFinishLevel = true;
        this.isStepsEnded = false;
        this.isBonuses = true;
        if(this.steps == 0) {
            this.bonusFinalTimer = 100;
        } else {
            this.bonusFinalTimer = 230;
        }
        this.isBonusFinalEnd = false;
        this.stepEndTimer = 290;
        this.levelEndTimer = 90;
        this.isEndGenerateBonuses = true;
        //this.bonusCount = this.steps;

    }
};
pro.destroyBonusFromCell = function(c, bonus, isDestroy) {
    var pp;
    if(!bonus) {
        return;
    }
    if( !bonus.isKilled ){
        if(M3.JUST_BONUS_PWNED == 0) {
            M3.JUST_BONUS_PWNED = 5;
            GodStep.playSound('bonus_row', 0, M3.SOUND);
        }
        bonus.isKilled = true;
        var field = this.field;
        var cells = this.field.cellsXY;
        this.points += 700;
        var bonusCell = c;
        if(bonusCell == null) {
            bonusCell = bonus.cell;
        }
        var cell;

        if(bonus.isVertical) {
            for(var i = 0; i< field.cellCountY; i++) {
                cell = cells[i][bonusCell.xi];
                if(i != bonusCell.yi) {
                    if(cell.getColored()) {
                        this.destroyBonusFromCell(null, cell.getBonus());
                        pp = field.removeBlocksAndDirt(cell, true) + 50;
                        this.points += pp;
                        cell.setCost(pp);
                    }
                }
            }
        } else {
            for(var j = 0; j< field.cellCountX; j++) {
                cell = cells[bonusCell.yi][j];
                if(j != bonusCell.xi) {
                    if(cell.getColored()) {
                        this.destroyBonusFromCell(null, cell.getBonus());
                        pp = field.removeBlocksAndDirt(cell, true) + 50;
                        this.points += pp;
                        cell.setCost(pp);

                    }
                }
            }
        }
    }

};
pro.destroyBonus = function(bonus) {
    var field = this.field;
    var cells = this.field.cellsXY;
    var cell;
    if(bonus) {
        this.points += 700;
        var bonusCell = bonus.cell;
        if(bonus.isVertical) {
            for(var i = 0; i< field.cellCountY; i++) {
                cell = cells[i][bonusCell.xi];
                if(i != bonusCell.yi) {
                    if(cell.getColored()) {
                       // this.destroyBonus(cell.getBonus());
                        this.points += field.removeBlocksAndDirt(cell);
                        this.points += 50;
                    }
                }
            }
        } else {
            for(var j = 0; j< field.cellCountX; j++) {
                cell = cells[bonusCell.yi][j];
                if(j != bonusCell.xi) {
                    if(cell.getColored()) {
                     //   this.destroyBonus(cell.getBonus());
                        this.points += field.removeBlocksAndDirt(cell);
                        this.points += 50;

                    }
                }
            }
        }
    }
};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_pause:
            GodStep.playSound('button', 0, M3.SOUND);

            if(M3.DEVMODE) {
                s.screenTo([s.dev], p);
            } else {
                p.pause.init();
            }
            break;

    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {

        this.tutorial.Scale = value;
        this.tutorialOne.Scale = value;
        this.pause.Scale = value;
        this.scale.x = this.scale.y = value;
        this.background.rescale(value);
        var dy = this.soul.OH - this.soul.H;
        this.b_pause.y = (this.soul.H * .962 + dy/2)/value;
        this.hud.y = (-dy/2)/value;

        this.console.y = (this.soul.H * .85 + dy/2)/value;
        this.field.scale.x = this.field.scale.y = Math.min(1.25, 1 + (this.soul.OH-this.soul.H)/this.soul.H*1.13);
        this.field.x = (this.W - this.field.W* M3.CELLW_SCALE * this.field.scale.x) * .5;
        this.field.y = this.H - this.field.x*1.05 - this.field.H * .989 * this.field.scale.x;

    }
});
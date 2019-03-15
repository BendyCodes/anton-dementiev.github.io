M3.CellObject = function(name, S, cell) {
    var type = name;
    GodStep.Frame.call(this, type);
    this.typeName = name;
    this.S = S;
    this.startS = S * M3.CELL_SCALE;
    this.sy = 0;
    switch (name) {
        case 'item':
            this.isDynamic = true;
            this.isItem = true;
            this.isObject = true;
            this.itemTimer = 20;
            this.addFrame(this.img = new M3.Img('cristal', this.startS/M3.CELL_SCALE * M3.CELL_SCALE_BACK, cell.W/2, cell.H/2,.5));
            //this.addFrame(this.img = new M3.Img((Math.random() > 0.5) ? 'cristal' : 'egg', this.startS/M3.CELL_SCALE * M3.CELL_SCALE_BACK, cell.W/2, cell.H/2,.5));
            break;
        case 'dirt':
            this.animTimer = 0;
            this.isDirt = true;
           // this.addFrame(this.img = new M3.Img('dirt', this.startS * 1.1, cell.W/2, cell.H/2,.5));
            this.addFrame(this.img = new M3.MovieClip([cell.v + '_'+ M3.SKIN +'mud_1', M3.SKIN + 'mud_2', M3.SKIN + 'mud_3', M3.SKIN + 'mud_4'], this.startS /M3.CELL_SCALE * 1.03 , cell.W/2, cell.H/2, new PIXI.Point(.515,.515)));
            break;
        case 'block':
            this.isBlock = true;
            this.isObject = true;
            this.addFrame(this.img = new M3.Img('o_1', this.startS/M3.CELL_SCALE * M3.CELL_SCALE_BACK, cell.W/2, cell.H/2,.5));
            break;
        case 'delete':
            this.isObject = true;
            this.addFrame(this.img = new M3.Img(M3.SKIN + "_new", this.startS/M3.CELL_SCALE * M3.CELL_SCALE_BACK, cell.W/2, cell.H/2, new PIXI.Point(.51,.51)));
            break;
        case 'red':
        case 'green':
        case 'purple':
        case 'blue':
        case 'yellow':
            var t;
            switch (name) {
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
            this.addFrame(this.img = new M3.MovieClip([t + 'p_1', t + 'p_2', t + 'p_3', t + 'p_4', t+'a1', t+'a2', t+'a3', t+'a4', t+'a5', t+'d1', t+'d2', t+'d3', t+'d4', t+'d5'], this.startS /M3.CELL_SCALE * 1.03 , cell.W/2, cell.H/2, new PIXI.Point(.515,.515)));
          //  this.img.setToFrame(parseInt(Math.random() * 3));
          //  this.addFrame(this.img1 = new M3.Img('o_1', this.startS/M3.CELL_SCALE * M3.CELL_SCALE_BACK *.5, cell.W/2, cell.H/2,.5));

            break;
    }

    this.startS = this.img.scale.x;
    this.cell = cell;

    this.applyCellPostion(true);

};
extend(M3.CellObject, GodStep.Frame);

M3.CellObject.COLORS = [0x0000ff, 0xff0000, 0x00ff00, 0xffff88, 0xff00ff];

pro.update = function() {
   if(this.isBonus) {
       this.bonusanim++;
       if(this.bonusanim == 6) {
           this.bonusanim = 0;

           if(this.bonus) {
               if(this.isBonusKill) {
               //    if(this.bonus.currentFrame == this.bonus.frames.length - 1) {
                       this.bonus.alpha = 0;
               //    }
               }
               this.bonus.nextFrame();
           }
       }
   }
   if(this.isDirt) {
        if(this.isKill) {
            this.animTimer++;
            if(this.animTimer == 5) {
                this.animTimer = 0;
                if(this.img.nextFrame() == 0) {
                    this.isDead = true;
                    this.cell.delGuest(this);
                    this.cell.parent.parent.delCellObject(this);
                }
            }
        }
       return;
   }
    if(this.isColored) {
        if(this.isColorSelected) {

        } else {
            if(this.isBonusKill) {
                this.animTimer++;
                if(this.animTimer == 6) {
                    this.animTimer = 0;
                    if(this.img.nextFrame() == 0) {
                        this.isDead = true;
                    }
                }
            } else
            if(this.isKill) {
                this.animTimer++;
                if(this.animTimer == 5) {
                    this.animTimer = 0;

                    if(this.img.nextFrame() == 8) {
                        this.isDead = true;
                     //   this.cell.delGuest(this);
                      //  this.cell.parent.parent.delCellObject(this);
                    }
                }
            } else {
                this.animTimer++;
                if(this.animTimer == 55) {
                    this.animTimer = 0;
                    if(this.img.nextFrame() == 3) {
                        this.img.setToFrame(0);
                    }
                }
            }

        }
    }
};
pro.setAsBonus = function() {
    this.isBonus = true;
    this.bonusanim = 0;
    this.isVertical = Math.random() > .5;
    //this.addChild(this.bonus = new M3.Img((this.isVertical ? 'bonusVert' : 'bonusGor'), this.startS, this.cell.W/2, this.cell.H/2,.5));
    if(this.isVertical) {
        this.addChildAt(this.bonus = new M3.MovieClip(['bonus_2_1', 'bonus_2_2','bonus_2_3','bonus_2_4','bonus_2_5','bonus_2_6'], this.startS * GodStep.IMAGE_RESOLUTION, this.cell.W/2, this.cell.H/2,.5), 0);
    } else {
        this.addChildAt(this.bonus = new M3.MovieClip(['bonus_1_1', 'bonus_1_2','bonus_1_3','bonus_1_4','bonus_1_5','bonus_1_6'], this.startS * GodStep.IMAGE_RESOLUTION, this.cell.W/2, this.cell.H/2,.5), 0);
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
    this.cell.delGuest(this);
    this.cell = cell;
    cell.pushGuest(this);
    this.applyCellPostion(false);

    if(this.typeName == 'item') {
        if (cell.yi == 8) {
            this.isItemDead = true;
        }
    }
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
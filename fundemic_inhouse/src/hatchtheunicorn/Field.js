HTU.Field = function(gameplay) {
    this.gameplay = gameplay;
    this.soul = gameplay.soul;
    var s = this.startS = this.gameplay.startS* 1.7;
    GodStep.Frame.call(this, 'Field', this.soul.SW, this.soul.SH);
    PIXI.EventTarget.call(this);

    this.waitTimer = 0;
    this.x = this.W * .12;
    this.y = this.H * .26;
    this.cellW = this.W * .19;
    this.cells = [];
    this.addChild(this.container = new PIXI.DisplayObjectContainer());
    this.addChild(this.shine = new Games.Img('shine', s, 0, 0,.5));

    for(var i = 0; i<4; i++) {
        var row = [];
        this.cells.push(row);
        for(var j = 0; j<4; j++) {
            var c = new Games.Img('substrate_0' + parseInt(Math.random() * 4 + 1), s , i * this.cellW, j  * this.cellW, null);
            row.push(c);
            this.container.addChild(c);
        }
    }
    this.elements = [];
    this.container.cacheAsBitmap = true;
};
extend(HTU.Field, GodStep.Frame);
HTU.FieldCellComplete = 'FCC';
HTU.FieldNoVariants = 'FNV';
HTU.FieldUnicornFinded = 'FUF';
pro.init = function() {
    this.shine.visible = false;

    this.free = [];
    this.died = [];
    this.winPos = new PIXI.Point();
    while(this.elements.length) {
        while(this.elements[0].length) {
            this.removeChild(this.elements[0][0]);
            this.elements[0].splice(0, 1);
        }
        this.elements.splice(0, 1);
    }
    for(var i = 0; i<4; i++) {
        var row = [];
        this.elements.push(row);
        for(var j = 0; j<4; j++) {
            var c = null;
            row.push(c);
            this.free.push({x:j, y:i, empty:true});
        }
    }
    this.waitTimer = -1;
    this.generate();
    this.generate();
};

pro.replaceFree = function(cx, cy, ncx, ncy) {
    var isNotFound = true;
    for(var i = 0; i<this.free.length; i++) {
        if(this.free[i].x == cx && this.free[i].y == cy) {
            if(ncx == null || ncy == null) {
                this.free.push({x:cx, y:cy, empty:true});
            } else {
                this.free[i].x = ncx;
                this.free[i].y = ncy;
                isNotFound = false;
            }
            return;
        }
    }
    if(isNotFound) {
        this.free.push({x:cx, y:cy, empty:true});
    }
};
pro.moveCell = function(cx, cy, dx, dy) {
    var elems = this.elements;
    if(cx > 3 || cx < 0 || cy > 3 || cy < 0) return;

    var cell = elems[cy][cx];
    var nextRow = elems[cy + dy];
    var count = 0;
    if(nextRow) {
        var nextCell = nextRow[cx + dx];
        if(nextCell) {
            if(nextCell.level == cell.level) {
                if(!cell.justUpdate) {
                    nextCell.upgrade();
                    var cost = nextCell.getCost();
                    count += cost;
                    if(cost == 2048) {
                        dispatch(this, HTU.FieldUnicornFinded);
                        this.shine.visible = true;
                        this.shine.scale.x = this.shine.scale.y = 0;
                        this.winPos = nextCell;
                    }
                    cell.justDie = true;
                    this.died.push(cell);
                    cell.gradeCell = nextCell;
                    elems[cy][cx] = null;
                    this.replaceFree(cx, cy, null, null);
                    this.waitTimer = 20;
                }
            }
        } else {
            this.waitTimer = 20;

            if(cx + dx > 3 || cx + dx < 0 || cy + dy > 3 || cy + dy < 0) return count;
            elems[cy + dy][cx + dx] = cell;
            elems[cy][cx] = null;
            this.replaceFree(cx + dx, cy + dy, cx, cy);
            count += this.moveCell(cx + dx, cy + dy, dx, dy);
        }
    }
    return count;
};
pro.swipeRow = function(r, dx) {
    var row = this.elements[r];
    var i;
    var count = 0;
    if(dx > 0) {
        for(i = row.length-2; i>=0; i--) {
            if(row[i]) {
                count += this.moveCell(i, r, dx, 0);
            }
        }
    } else {
        for(i = 1; i<row.length; i++) {
            if(row[i]) {
                count += this.moveCell(i, r, dx, 0);
            }
        }
    }
    return count;
};
pro.swipeColumn = function(c, dy) {
    var i, elems = this.elements;
    var count = 0;
    if(dy > 0) {
        for(i = 2; i>=0; i--) {
            if(elems[i][c]) {
                count += this.moveCell(c, i, 0, dy);
            }
        }
    } else {
        for(i = 1; i<4; i++) {
            if(elems[i][c]) {
                count += this.moveCell(c, i, 0, dy);
            }
        }
    }
    return count;
};
pro.swipe = function(side) {
   // if(this.swiped) return;
    if(this.waitTimer >= 0) return;
    var dx = 0;
    var dy = 0;
    var i;
    var count = 0;
    switch (side) {
        case 'left':
            dx = -1;
            break;
        case 'right':
            dx = +1;
            break;
        case 'top':
            dy = -1;
            break;
        case 'bot':
            dy = 1;
            break;
    }
    for(i = 0; i<4; i++) {
        if(Math.abs(dy) > 0)  {
            count += this.swipeColumn(i, dy);
        } else
        if(Math.abs(dx) > 0)  {
            count += this.swipeRow(i, dx);
        }
    }

    if(count > 0) {
        GodStep.playSound('match', 0, HTU.SOUND);
    }
    dispatch(this, HTU.FieldCellComplete, count);
    if(!this.findCombinations()) {
        dispatch(this, HTU.FieldNoVariants, count);
    }
    GodStep.playSound('slide', 0, HTU.SOUND);
  //  this.swiped = true;
};
pro.generate = function() {
    if(this.free.length > 0) {
        var c = Math.min(1, this.free.length);
        for(var i = 0; i<c; i++) {
            var id = parseInt(Math.random() * this.free.length);
            var p = this.free[id];
            var cell = this.elements[p.y][p.x] = new HTU.Cell((Math.random() >.9) ? 1 : 0, this.startS, p.x * (this.cellW) + this.cellW *.05, p.y *  (this.cellW)+ this.cellW *.05);
            this.addChild(cell);

            this.free.splice(id, 1);
        }
    }
};
pro.findCombinations = function() {
      var left, right, top, bot, elems = this.elements;
      for(var i = 0; i<4; i++) {
          for(var j = 0; j<4; j++) {
              left = right = top = bot = null;
              var cell = elems[i][j];
              if(cell) {
                  if(elems[i-1]) left = elems[i-1][j];
                  if(elems[i+1]) right = elems[i+1][j];
                  top = elems[i][j-1];
                  bot = elems[i][j+1];

                  if(left) if(cell.level == left.level) {
                      return true;
                  }
                  if(right) if(cell.level == right.level) {
                      return true;
                  }
                  if(top) if(cell.level == top.level) {
                      return true;
                  }
                  if(bot) if(cell.level == bot.level) {
                      return true;
                  }
              } else {
                  return true;
              }
           }
        }
        return false;
};

pro.update = function() {
    if(this.waitTimer-- == 0) {
        this.waitTimer = -1;
        this.generate();
    }
    if(this.shine.visible) {
        this.shine.scale.x = this.shine.scale.y += (1 - this.shine.scale.x) * .01;
        this.shine.rotation += .01;
        this.shine.x = this.winPos.x;
        this.shine.y = this.winPos.y;
    }

    var cw = this.cellW;
    var w = this.W * .03;
    var p, i, j;
    for(j = 0; j<this.died.length; j++) {
        var died = this.died[j];
        p = new PIXI.Point(died.gradeCell.x, died.gradeCell.y);
        died.x += Math.max(-w, Math.min(w, (p.x - died.x) * .4));
        died.y += Math.max(-w, Math.min(w, (p.y - died.y) * .4));
        died.alpha += (0 - died.alpha) * .1;
        if(died.alpha < 0) {
            this.died.splice(j);
            this.removeChild(died.destroy());
        }
    }
    for(i = 0; i<4; i++) {
        for(j = 0; j<4; j++) {
            var cell = this.elements[i][j];
            p = new PIXI.Point(j * cw , i * cw);
            if(cell) {
                cell.move();
                cell.justUpdate = false;
                cell.x += Math.max(-w, Math.min(w, (p.x + this.cellW/2 - cell.x) * .4));
                cell.y += Math.max(-w, Math.min(w, (p.y + this.cellW/2 - cell.y) * .4));
            }
        }
    }
};
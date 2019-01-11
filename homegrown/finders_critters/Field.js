PR.Field = function(soul, xc, yc, s, p) {
    Games.CellField.call(this, xc, yc, soul.W *.95, soul.W *.95, PR.Cell, soul.startS);
    this.cellObjects = [];
    this.soul = soul;
    this.lines = [];
    this.heroes = [];
    this.scale.x = this.scale.y = s;
    this.SH = this.H;

    this.addChild(this.heroContainer = new PIXI.DisplayObjectContainer());

    this.isTutorial = false;

    if(p) {
        p.topSprite.addChild(this.arm = new GodStep.MovieClip(['arm_1', 'arm_2'], soul.startS, this.W *.51, -this.H *.5, new PIXI.Point(0, 0)));
        this.arm.sy = this.H *.045;
        this.arm.sx = this.W *.51;
        this.arm.animTime = 20;
    }

    this.colors = [0, 1, 2, 3, 4];
}; extend(PR.Field, Games.CellField);

pro.delLine = function() {
    if(this.cellCountY > 3) {
        for(var i = 0; i<this.cellCountX; i++) {
            var cell = this.cells[(this.cellCountY - 1) * this.cellCountX + i];
            this.clearCell(cell);
            this.cellContainer.removeChild(cell);
            delEvent(cell, Games.CELL_UP, this.h_cells);
            delEvent(cell, Games.CELL_DOWN, this.h_cells);
        }
        this.cells.splice((this.cellCountY - 1) * this.cellCountX, this.cellCountX);
        this.cellsXY.splice(this.cellCountY - 1, 1);
        this.cellCountY--;
    }
    this.H = cell.y;

    this.setHitArea(0, 0, this.W, this.H);

};
pro.addLine = function() {
    var cellW = this.W / this.cellCountX * PR.CELLW_SCALE;
    var cellH = this.W / this.cellCountX * PR.CELLW_SCALE;

    this.cellsXY[this.cellCountY] = [];
    var maxW = 0, maxH = 0;
    for(var i = 0; i<this.cellCountX; i++) {
        var cell = new this.cellClass(i, this.cellCountY, cellW, cellH, this.startS);
        this.addCell(cell, cellW, cellH);
        maxW = Math.max(cell.x, maxW);
        maxH = Math.max(cell.y, maxH);
        addEvent(cell, Games.CELL_UP, this.h_cells);
        addEvent(cell, Games.CELL_DOWN, this.h_cells);
    }
    this.cellCountY++;

    this.H = maxH + cellW ;
    this.setHitArea(0, 0, this.W, this.H);
};

pro.initTutorial = function(v) {
    var p = this.arm.parent;
    p.removeChild(this.arm);
    p.addChildAt(this.arm, p.children.length - 2);
    this.animPhase = 0;
    this.arm.visible =  this.isTutorial = (v && (PR.LAST_LEVEL_SELECTED == 0 | PR.LAST_LEVEL_SELECTED == 4 || PR.LAST_LEVEL_SELECTED == 11));
};
pro.update = function() {
    if(this.isTutorial) {
        this.arm.animate();
        var s = 1;//this.scale.x;
        var y = this.y + this.soul.DOH/2/this.soul.gameplay.scale.x;

        switch (PR.LAST_LEVEL_SELECTED) {
            case 0:
                this.arm.x += ((this.cellW * 0 * this.scale.x + this.arm.sx) * s - this.arm.x) * .3;

                switch (this.animPhase) {
                    case 0:
                        this.completeCell = new PIXI.Point(4, 2);
                        this.arm.y += ((y + this.cellW * 2 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 1:
                        this.completeCell = new PIXI.Point(4, 5);

                        this.arm.y += ((y + this.cellW * 5 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 2:
                        this.completeCell = new PIXI.Point(4, 8);
                        this.arm.y += ((y + this.cellW * 8 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 3:
                        this.arm.visible = false;
                        this.completeCell = null;
                        break;
                }
                break;
            case 4:
                switch (this.animPhase) {
                    case 0:
                        this.arm.x += ((this.cellW * 0 * this.scale.x + this.arm.sx) * s - this.arm.x) * .3;
                        this.completeCell = new PIXI.Point(0, 4);
                        this.arm.y += ((y + this.cellW * 6 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 1:
                        this.arm.x += ((this.cellW * -4 * this.scale.x + this.arm.sx) * s - this.arm.x) * .3;
                        this.completeCell = new PIXI.Point(0, 8);
                        this.arm.y += ((y + this.cellW * 8 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 2:
                        this.arm.visible = false;
                        this.completeCell = null;
                        break;
                }
                break;
            case 11:
                switch (this.animPhase) {
                    case 0:
                        this.arm.x += ((this.cellW * -3 * this.scale.x + this.arm.sx) * s - this.arm.x) * .3;
                        this.completeCell = new PIXI.Point(1, 0);
                        this.arm.y += ((y + this.cellW * 0 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 1:
                        this.arm.x += ((this.cellW * 3 * this.scale.x + this.arm.sx) * s - this.arm.x) * .3;
                        this.completeCell = new PIXI.Point(7, 3);
                        this.arm.y += ((y + this.cellW * 3 * this.scale.x + this.arm.sy) * s - this.arm.y) * .3;
                        break;
                    case 2:
                        this.arm.visible = false;
                        this.completeCell = null;
                        break;
                }
                break;
        }
    }
   //for(var i = 0; i<this.cells.length; i++) {
     //  this.cells[i].animate();
   //}
};
pro.reskin = function(skin) {
    var v = 1;
    for(var i = 0; i<this.cells.length; i++) {
        this.cells[i].img.setTexture('sq' + skin + '_' + v);
        this.cells[i].v = v;
        v = (v == 1) ? 2 : 1;
    }
};
pro.initField = function(countX, countY, cW, cH) {
    var cellW = this.cellW = this.W / this.cellCountX * PR.CELLW_SCALE;
    Games.CellField.prototype.initField.call(this, countX, countY, cellW, cellW);
};
pro.fill = function() {
    var cells = this.cells;
};
pro.clear = function() {
    while(this.cellObjects.length) {
       this.delFrame(this.cellObjects[0].destroy());
       this.cellObjects.splice(0, 1);
    }
    for(var i = 0;i<this.cells.length; i++) {
        this.cells[i].clear();
        this.cells[i].Selected = false;
    }
};
pro.getRandomColors = function() {
    var randomColors = [];
    var colors = [];
    for(var j = 0; j<this.colors.length; j++) {
        colors.push(this.colors[j]);
    }
    while(colors.length) {
        var id = parseInt(Math.random() * colors.length);
        randomColors.push(colors[id]);
        colors.splice(id, 1);
    }

    return randomColors;
};
pro.setData = function(d) {
    this.clear();
    this.heroes = [];

    while(!(this.cellCountY == d.cellCountY)) {
        if(this.cellCountY > d.cellCountY) {
            this.delLine();
        } else {
            this.addLine();
        }
    }
    var objeccts = d.objects;
    var params = d.params;
    this.colors = params.colors;
    this.isBonus = params.isBonus;
    this.isBomb = params.isBomb;
    var object;
    if(objeccts) {
        if(!GodStep.ISEDITMODE) {
            PR.Field.IS_FILL_DATA = true;
        }
        var randomColors = this.getRandomColors();
        for(var i = 0; i< objeccts.length;i++) {
            var o = objeccts[i];
            if(o.id) {

            } else {

                this.addCellObject(object = new PR.CellObject(o.n, this.soul.startS, this.cells[o.xi + o.yi * this.cellCountX], this.colors, randomColors, o.s));
                if(object.isHero || object.isHeroTrap) {
                    this.heroes.push(object);
                }
            }
        }

        PR.Field.IS_FILL_DATA = false;
    }
};
pro.getData = function() {
    var data = {};
    data.cellCountX = this.cellCountX;
    data.cellCountY = this.cellCountY;
    var objects = data.objects = [];
    for(var i = 0; i<this.cellObjects.length; i++) {
        var o = this.cellObjects[i];
        var od = {n: o.typeName, xi: o.cell.xi, yi: o.cell.yi};
        if(o.selector) {
            od.s = o.selector;
        }
        objects.push(od);
    }
    return data;
};
pro.getCellByCoord = function(x, y) {
    var xi = parseInt(x/this.cellW);
    var yi = parseInt(y/this.cellW);
    trace(xi + " " + yi);
    var cellRow = this.cellsXY[yi];
    var cell;
    if(cellRow) {
        cell = cellRow = cellRow[xi];
    }
    return cell;

};
pro.delCellObject = function(obj) {
    if(obj) {
        this.delFrame(obj);
        this.cellObjects.splice(this.cellObjects.indexOf(obj), 1);

        if(obj.isHero || obj.isHeroTrap) {
            this.heroes.splice(this.heroes.indexOf(obj),1);
        }
        return true;
    }

    return false;
};
pro.addCellObject = function(ob) {
    var o;
    var isFound = false;

    for(var i = 0; i<this.cellObjects.length; i++) {
        o = this.cellObjects[i];
        if(o.isObject) {
            if(!o.cell || !ob.cell) {
                trace(1);
            }
            if(o.cell.name == ob.cell.name) {
                isFound = true;
            }
        }
    }
    if(!isFound) {
          ob.cell.pushGuest(ob);
          this.cellObjects.push(ob);
        if(ob.typeName == 'hero') {
            this.addFrameAt(ob, this.heroContainer, this.heroContainer.children.length);
        } else {
            this.addFrameAt(ob, this.objectContainer, this.objectContainer.children.length);
        }
    }

};
pro.getCellByPoint = function(p, isOver) {
    var w = this.cellW;
    var dw = w * (isOver ? .125 : 0) ;
    var i = Math.max(0, Math.min(this.cellCountX - 1, parseInt((p.x - dw * 2)/w)));
    var j = Math.max(0, Math.min(this.cellCountY - 1, parseInt((p.y - dw)/w)));

    var cell = this.cellsXY[j][i];
    if(GodStep.Point.distance(new PIXI.Point(cell.x, cell.y), new PIXI.Point(p.x, p.y )) < w * (isOver ?1:1)) {
        return cell;
    }
    return null;

};
pro.clearCell = function(cell) {
   // cell
};
pro.getEmptyCount = function() {
    var c = 0;
    for(var i =0; i<this.cells.length; i++) {
        if(this.cells[i].isEmpty()) {
            c++;
        }
    }
    return c;
};
pro.getDynamicCount = function() {
    var c = 0;
    for(var i =0; i<this.cells.length; i++) {
        if(this.cells[i].isDynamic()) {
            c++;
        }
    }
    return c;
};

pro.randomizeArea = function(colors, x, y, w, h, deleteColor) {
    var trueColors = [];
    for(var c = 0; c<colors.length; c++) {
        if(deleteColor != null) {
            if(colors[c] != deleteColor) trueColors.push(colors[c]);
        } else {
            trueColors.push(colors[c]);
        }
    }

    var cells = this.cellsXY;
    var line = [];
    for(var i= x; i<x + w; i++) {
        for(var j = y; j<y + h; j++) {
            line.push(cells[j][i]);
            cells[j][i].replaceColored(PR.Cell.STANDART[trueColors[parseInt(Math.random() * trueColors.length)]]);
        }
    }
    return line;
};

pro.replaceCells = function(cell1, cell2) {
   var g1 = cell1.guests[0];
   var g2 = cell2.guests[0];
    cell1.guests[0] = g2;
    cell2.guests[0] = g1;
    g1.cell = cell2;
    g2.cell = cell1;
    g1.applyCellPostion(true);
    g2.applyCellPostion(true);

};

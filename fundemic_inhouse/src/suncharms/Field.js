M3.Field = function(soul, xc, yc) {
    Games.CellField.call(this, xc, yc, soul.W *.95, soul.W *.95, M3.Cell, soul.startS);
    this.cellObjects = [];
    this.soul = soul;
    this.dirts = [];
    this.blocks = [];
    this.deletes = [];
    this.lastSameColor = null;
    this.gameplay = soul.gameplay;
    this.lines = [];
    this.addChildAt(this.dirtField = new PIXI.DisplayObjectContainer(), this.children.length - 1);
    this.addChildAt(this.lineField = new PIXI.DisplayObjectContainer(), this.children.length - 1);
}; extend(M3.Field, Games.CellField);

pro.update = function() {
   for(var i = 0; i<this.cells.length; i++) {
       this.cells[i].animate();
   }
};
pro.reskin = function(skin) {
    var v = 1;
   // this.cellContainer.cacheAsBitmap = false;
    for(var i = 0; i<this.cells.length; i++) {
        this.cells[i].img.setTexture('sq' + skin + '_' + v);
        this.cells[i].v = v;
        v = (v == 1) ? 2 : 1;
    }
  //  this.cellContainer.cacheAsBitmap = true;
};
pro.initField = function(countX, countY, cW, cH) {
    var cellW = this.W / this.cellCountX * M3.CELLW_SCALE;
    Games.CellField.prototype.initField.call(this, countX, countY, cellW, cellW);
};
pro.fill = function() {
    var cells = this.cells;

    for(var i = 0; i<cells.length; i++) {
        if(!cells[i].isBusy()) {
            this.gameplay.generate(cells[i]);
        }
    }
};
pro.clear = function() {

    this.dirts = [];
    this.blocks = [];
    this.deletes = [];

    while(this.cellObjects.length) {
       this.delFrame(this.cellObjects[0].destroy());
       this.cellObjects.splice(0, 1);
    }

    for(var i = 0;i<this.cells.length; i++) {
        this.cells[i].clear();
    }
    trace('objects' + this.cellObjects.length);
};
pro.setData = function(d) {
    this.clear();

    if(d) {
        var S = this.soul.startS;
        for(var i = 0; i< d.length;i++) {
            var o = d[i];
            if(o.id) {

            } else {
                this.addCellObject(new M3.CellObject(o.name, this.soul.startS, this.cells[o.xi + o.yi * this.cellCountX]));
            }
        }
    }
};
pro.getData = function() {
    var objects = [];
    for(var i = 0; i<this.cellObjects.length; i++) {
        var o = this.cellObjects[i];
        var od = {name: o.typeName, xi: o.cell.xi, yi: o.cell.yi};
        objects.push(od);
    }
    return objects;
};
pro.delCellObject = function(obj) {
    if(obj) {
        this.delFrame(obj);
        this.cellObjects.splice(this.cellObjects.indexOf(obj), 1);
        if(obj.name == 'delete') {
            this.deletes.splice(this.deletes.indexOf(obj), 1);
        }
        if(obj.name == 'block') {
            this.blocks.splice(this.blocks.indexOf(obj), 1);
        }
        if(obj.name == 'dirt') {
            this.dirts.splice(this.dirts.indexOf(obj), 1);
        }
        return true;
    }

    return false;
};
pro.addCellObject = function(ob) {
    var o;
    var isFound = false;
    var isDirt = false;
    switch(ob.name) {
        case 'dirt':
            isDirt = true;
            this.dirts.push(ob);
            break;
        case 'block':
            this.blocks.push(ob);
            break;
        case 'delete':
            this.deletes.push(ob);
            break;
    }

    for(var i = 0; i<this.cellObjects.length; i++) {
        o = this.cellObjects[i];
        if(o.isObject) {
            if(o.cell.name == ob.cell.name) {
                isFound = true;
            }
        }
    }
      if(!isFound) {
          ob.cell.pushGuest(ob);
          this.cellObjects.push(ob);
          if(isDirt) {
              this.addFrameAt(ob, this.dirtField, this.dirtField.children.length);
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
pro.removeBlocksAndDirt = function(cell, bonusKill) {
    var xi = cell.xi;
    var yi = cell.yi;
    var cells = this.cellsXY;
    var row;
    var points = 0;

    cell.removeDynamic(bonusKill);
    if(cell.removeDirt()) {
        points += 500;
    }
    if(row = cells[yi-1]) {
        if(row[xi]) {
            if(this.delCellObject(row[xi].removeBlock())) {
                points += 50;
            }
        }
    }
    if(row = cells[yi+1]) {
        if (row[xi]) {
            if(this.delCellObject(row[xi].removeBlock())) {
                points += 50;
            }
        }
    }
    if(cells[yi][xi-1]) {
        if(this.delCellObject(cells[yi][xi-1].removeBlock())) {
            points += 50;
        }
    }
    if(cells[yi][xi+1]) {
        if(this.delCellObject(cells[yi][xi+1].removeBlock())) {
            points += 50;
        }
    }
    return points;
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
            cells[j][i].replaceColored(M3.Cell.STANDART[trueColors[parseInt(Math.random() * trueColors.length)]]);
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
pro.removeAllLines = function() {
    while(this.lines.length) {
        this.lineField.removeChild(this.lines[0]);
        this.lines.splice(0, 1);
    }
};
pro.removeLastLine = function() {
   this.lineField.removeChild(this.lines[this.lines.length - 1]);
    this.lines.splice(this.lines.length -1 , 1);
};
pro.addLine = function(cell1, cell2) {
    var s = this.soul.startS;
    var colored = cell1.getColored();
    var p = GodStep.Point.middlePoint(cell1.Place, cell2.Place,.5);
    var type;
    var dx = cell1.xi - cell2.xi;
    var dy = cell1.yi - cell2.yi;
    var isRotate = 0;
    if(Math.abs(dx) + Math.abs(dy) == 1) {
        type = colored.t + '_3';
        if(Math.abs(dy) > 0) {
            isRotate = 1;
        }
    } else {
        if(cell1.xi < cell2.xi) {
            if(cell1.yi > cell2.yi) {
                type = colored.t + '_2';
            } else {
                type = colored.t + '_1';
            }
        } else {
            if(cell1.yi < cell2.yi) {
                type = colored.t + '_2';
            } else {
                type = colored.t + '_1';
            }
        }
    }

    var line = new M3.Img(type, s, p.x + cell2.W/2 , p.y + cell2.H/2  ,.5);
    if(isRotate == 1) {
        line.rotation = Math.PI/2;
    }
    this.lineField.addChild(line);
    this.lines.push(line);
};

pro.findSame = function(cell) {
    var x = cell.xi, y = cell.yi;
    var count = 0;
    var cellsXY = this.cellsXY;
    var mainType = cell.getColored().typeName;

    var colored;
    var cellRow;
    if(cellRow = cellsXY[y-1]) {
        if(cellRow[x-1]) {
            colored = cellRow[x - 1].getColored();
            if(colored) {
                if(colored.typeName == mainType) count++;
            }
        }
        if(cellRow[x + 1]) {
            colored = cellRow[x + 1].getColored();
            if(colored) {
                if(colored.typeName == mainType) count++;
            }
        }
        colored = cellRow[x].getColored();
        if(colored) {
            if(colored.typeName == mainType) count++;
        }
        if(count > 1) return true;
    }

    if(cellRow = cellsXY[y+1]) {
        if(cellRow[x-1]) {
            colored = cellRow[x - 1].getColored();
            if(colored) {
                if(colored.typeName == mainType) count++;
            }
        }
        if(cellRow[x + 1]) {
            colored = cellRow[x + 1].getColored();
            if(colored) {
                if(colored.typeName == mainType) count++;
            }
        }
        colored = cellRow[x].getColored();
        if(colored) {
            if(colored.typeName == mainType) count++;
        }
        if(count > 1) return true;
    }

    cellRow = cellsXY[y];
    if(cellRow[x-1]) {
        colored = cellRow[x - 1].getColored();
        if(colored) {
            if(colored.typeName == mainType) count++;
        }
    }
    if(cellRow[x + 1]) {
        colored = cellRow[x + 1].getColored();
        if(colored) {
            if(colored.typeName == mainType) count++;
        }
    }

    if(count > 1) return true;

    return false;
};
pro.shuffle = function(cells) {
    var rand1;
    var rand2;
    trace("перемешали");

    for(var i = 0; i<cells.length; i++) {
       rand1 = parseInt(Math.random() * cells.length);
       rand2 = parseInt(Math.random() * cells.length);
       cells[rand1].replaceCellObjects(cells[rand2]);
   }
};
pro.addSameColors = function(cells) {
    var count = 1;
    trace("добавили цвет");

    for(var i = 0; i < count; i++) {
        var colored = cells[i].getColored();
        if(colored.typeName == this.lastSameColor) {
            count++;
        } else {
            cells[i].replaceColored(this.lastSameColor);
        }

    }
};
pro.findMatchThree = function() {
    var cells = [];
    var cell;
    for(var i = 0; i<this.cells.length; i++) {
        cell = this.cells[i];
        if(cell.getColored()) {
            cells.push(cell);
        }
    }

    if(cells) {
        if(!this.lastSameColor) {
            this.lastSameColor = cells[0].getColored().typeName;
        }

        for(var c = 0; c<cells.length; c++) {
            if(this.findSame(cells[c])) {
                this.lastSameColor = null;
                return;
            }
        }

        // Перемешать
        this.shuffle(cells);
        this.addSameColors(cells);
        this.findMatchThree();
    }

};

pro.findItem = function() {
    var row;
   for(var i = 0; i<this.cellsXY.length; i++) {
       row = this.cellsXY[i];
       for(var j = 0; j<row.length; j++) {
           var cell = row[j];
           for(var g = 0; g<cell.guests.length; g++) {
               if(cell.guests[g].isItem) {
                   return cell.guests[g];
               }
           }
       }
   }
};
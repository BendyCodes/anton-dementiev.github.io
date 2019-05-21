Games.CellField = function(xc, yc, w, h, cellClass, startS) {
    GodStep.Frame.call(this, 'CellField', w, h);
    GodStep.IDownUp.call(this, w, h);
    this.startS = startS;
    this.cellCountX = xc;
    this.cellCountY = yc;
    this.cellClass = cellClass;
    this.addChild(this.cellContainer = new PIXI.DisplayObjectContainer());
    this.addChild(this.objectContainer = new PIXI.DisplayObjectContainer());
    this.initField();

}; extend(Games.CellField, GodStep.Frame);

pro.initField = function(countX, countY, cW, cH) {
    var row;
    this.cells = [];
    this.cellsXY = [];

    var cellW = this.cellW = cW || this.W / this.cellCountX;
    var cellH = this.cellH = cH || this.H / this.cellCountY;
    this.cellCountX = countX || this.cellCountX;
    this.cellCountY = countY || this.cellCountY;
    var maxW = 0, maxH = 0;
    for(var i = 0; i<this.cellCountY; i++) {
        this.cellsXY.push(row = []);
        for(var j = 0; j<this.cellCountX; j++) {
            if(this.cellClass) {
                var cell = new this.cellClass(j, i, cellW, cellH, this.startS);
                this.addCell(cell, cellW, cellH);
                maxW = Math.max(cell.x, maxW);
                maxH = Math.max(cell.y, maxH);
                addEvent(cell, Games.CELL_UP, this.h_cells);
                addEvent(cell, Games.CELL_DOWN, this.h_cells);
            }
        }
    }
};
pro.addCell = function(cell, cellW, cellH) {
    this.cells.push(cell);  this.cellsXY[cell.yi][cell.xi] = cell;
    this.addFrame(cell, this.cellContainer);
    cell.x =  cell.xi * cellW;
    cell.y =  cell.yi * cellH;
};
pro.getCell = function(xi, yi) {
    return this.cells[xi + yi * this.cellCountX];
};
pro.h_cells = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    switch (e.type) {
        case Games.CELL_DOWN:
            dispatch(p, Games.CELL_DOWN, t);
            break;
        case Games.CELL_UP:
            dispatch(p, Games.CELL_UP, t);
            break;
    }
};



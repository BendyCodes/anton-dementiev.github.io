Games.CellField = function(soul, xc, yc, w, h, cellClass, startS, cw, ch, layersCount) {
    GodStep.Frame.call(this, 'CellField', w, h);
    GodStep.IDownUp.call(this, w, h);
    this.startS = startS;
    this.cellW = cw || soul.W/xc;
    this.cellH = ch || soul.W/yc;
    this.S = this.soul = soul;
    this.countX = xc;
    this.countY = xc;
    this.cellCountX = xc;
    this.cellCountY = yc;
    this.cellClass = cellClass;
    this.addChild(this.cellContainer = new PIXI.DisplayObjectContainer());
    this.addChild(this.objectContainer = new PIXI.DisplayObjectContainer());

    this.layers = [];
    for(var i = 0; i<layersCount; i++) {
        this.layers.push(this.objectContainer.addChild(new PIXI.Container()));
    }

    this.initField();
    this.visible = true;
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

    this.cellScale = cell.img.scale.x;
};
pro.initEvents = function() {
    for(var ci in this.cells) {
        var cell = this.cells[ci];
        delEvent(cell, Games.CELL_UP, this.h_cells);
        delEvent(cell, Games.CELL_DOWN, this.h_cells);
        addEvent(cell, Games.CELL_UP, this.h_cells);
        addEvent(cell, Games.CELL_DOWN, this.h_cells);
    }
};
pro.clear = function() {
    var object;
    var layer;
    for(var l = 0; l<this.layers.length; l++) {
        layer = this.layers[l];
        while(layer.children.length) {
            object = layer.getChildAt(0);
            if(object.isCellObject) {
                (object).destroy();
            }
            layer.removeChild(object);
        }
    }
    for(var i = 0; i<this.cells.length; i++) {
        this.cells[i].clear();
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
    var t = e.t;
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
pro.addObject = function(t, cell, params) {
    return null;
};
pro.delObject = function(co) {
    if(co){
        var cell = co.getCell();
        if(cell) cell.delObject(co);
        if(co.parent) {
            co.parent.removeChild(co.destroy());
        }
        return co.destroy();
    }
    return null;
};
pro.getElement = function(t, arr) {
    var cell;
    for (var ci in this.cells) {
        cell = this.cells[ci];
        var guests = cell.getGuests();
        if(arr) {
            for (var gg in guests) {
                if(arr.indexOf(guests[gg].Type) >= 0) return guests[gg];
            }
        } else {
            for (var g in guests) {
                if(guests[g].Type == t) return guests[g];
            }
        }
    }
};
Object.defineProperty(pro, 'CellH', {
    get:function() {
        return this.cellH;
    },
    set:function(v) {
    }
});
Object.defineProperty(pro, 'CellW', {
    get:function() {
        return this.cellW;
    },
    set:function(v) {
    }
});
Object.defineProperty(pro, 'CountX', {
    get:function() {
        return this.countX;
    },
    set:function(v) {
    }
});
Object.defineProperty(pro, 'CellScale', {
    get:function() {
        return this.cellScale;
    },
    set:function(v) {
    }
});
Object.defineProperty(pro, 'CountY', {
    get:function() {
        return this.countY;
    },
    set:function(v) {
    }
});
Object.defineProperty(pro, 'W', {
    get:function() {
        return this.countY * this.cellH;
    },
    set:function(v) {
    }
});Object.defineProperty(pro, 'H', {
    get:function() {
        return this.countY * this.cellH;
    },
    set:function(v) {
    }
});

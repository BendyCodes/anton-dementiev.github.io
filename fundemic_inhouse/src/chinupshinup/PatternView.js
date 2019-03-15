SS.PatternView = function(soul, x, y) {
    GodStep.Frame.call(this, 'PatternView', 1, 1);
    this.x = x;
    this.y = y;
    this.s = soul.startS;
    this.cells = [];
    for(var i =0; i<8; i++) {
        for(var j=0; j<2; j++) {
            var c = new SS.Cell(soul.W *.12, soul.W *.12);
            this.cells.push(c);
            this.addChild(c);
            c.y = c.W * i;
            c.x = c.H * j;
            addEvent(c, GodStep.FRAME_DOWN, this.h_cells);
        }
    }
};
extend(SS.PatternView, GodStep.Frame);
SS.PatternView.TYPES = ['disabled', 'enabled', 'coin', 'crest'];
SS.PatternView.EMPTY = {cells:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};

pro.setData = function(d) {
    var cells = d.cells;
    for(var i =0; i<this.cells.length; i++) {
        this.cells[i].setCell(SS.PatternView.TYPES[cells[i]]);
    }
};
pro.getData = function() {
    var pattern = {cells:[]};
    for(var i = 0; i<this.cells.length; i++) {
        pattern.cells.push(this.cells[i].t);
    }
    return d;
};
pro.h_cells = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var id = t.parent.cells.indexOf(t);
    if(t.parent.currentPattern) {
        t.setCell(p.instrument);
        t.parent.currentPattern.cells[id] = t.t;
    }

};
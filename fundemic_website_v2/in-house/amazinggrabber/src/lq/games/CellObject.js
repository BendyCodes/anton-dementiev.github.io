Games.CellObject = function(soul, t){
    GS.LFrame.call(this, soul, "co");
    this.cell = null;
    this.cell_type = t;
    this.img = null;
    this.alias = null;
    this.visible = true;
    this.isCellObject = true;

};
extend(Games.CellObject, GS.LFrame);

pro.applyPosition = function() {
    this.x = this.cell.x + this.cell.width/2;
    this.y = this.cell.y + this.cell.height/2;
};
pro.setCell = function(c) {
    this.cell = c;
};
pro.getCell = function() {
    return this.cell;
};
pro.destroy = function() {
    this.cell = null;
    this.cell_type = null;
    return this;
};



Object.defineProperty(pro, 'Alias', {
    get:function() {
        return this.alias;
    },
    set:function(v) {
        this.alias = v;
    }
});
Object.defineProperty(pro, 'Type', {
    get:function() {
        return this.cell_type;
    },
    set:function(v) {
        this.cell_type = v;
    }
});

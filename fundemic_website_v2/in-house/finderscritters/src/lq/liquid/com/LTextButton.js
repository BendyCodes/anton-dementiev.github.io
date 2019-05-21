LQ.TextButton = function(object, name, w) {
    this.object = object;
    this.objectName = name;
    GodStep.Frame.call(this, 'TextButton', w);
    GodStep.IDownUp.call(this, w, this.H = 24);
    this.addChild(this.back = this.createGraphics('back'));
    this.addChild(this.label = new LQ.Text(name, this.H, 0, 0, 'left', 0xa0a0a0));
    this.DH = this.H;

    this.redrawBack();
    this.label.x = 6;
    this.label.y = -2;

    this.cacheAsBitmap = true;

}; extend(LQ.TextButton, GodStep.Frame);

pro.destroy = function() {
    this.removeChild(this.back);
    this.removeChild(this.label);
    this.cacheAsBitmap = false;
    return this;
};
pro.redrawBack = function() {
    var g = this.back;
    g.clear();
    g.beginFill(this.isSelected ? LQ.COLORS[0] : LQ.COLORS[1], 1);
    g.drawRoundedRect(3, 3, this.W - 6, this.H - 2, 5);
    g.endFill();
};
override(LQ.TextButton, 'Selected', {
    get: function() {
        return this.isSelected;
    },
    set: function(value) {
        this.cacheAsBitmap = false;
        this.isSelected = value;
        this.redrawBack();
        this.cacheAsBitmap = true;
    }
});
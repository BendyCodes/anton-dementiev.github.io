LQ.Color = function(color) {
    GodStep.Frame.call(this, 'LColor');
    this.W = this.H = 15 * 2;

    GodStep.IDownUp.call(this, this.W, this.H);
    this.isSelected = false;
    this.color = color;
    this.addChild(this.back = this.createGraphics('back'));
    this.redrawBack();

}; extend(LQ.Color, GodStep.Frame);

pro.redrawBack = function() {
    this.cacheAsBitmap = false;
    var g = this.back;
    g.clear();
    g.beginFill((this.isSelected ? LQ.COLORS[5] : LQ.COLORS[1]) , (this.isSelected ? 1 :.5));
    g.drawRoundedRect(1, 1, this.W - 2, this.W - 2, 5);
    g.beginFill(this.color.hex, 1);
    g.drawRoundedRect(3, 3, this.W - 6, this.W -6, 5);
    g.endFill();
    this.cacheAsBitmap = true;
};
pro.destroy = function() {
    this.removeChild(this.back);
    this.cacheAsBitmap = false;
    return this;
};
pro.applyRGB = function(r, g, b) {
   var color = this.color;
    color.r = r * 255;
    color.g = g * 255;
    color.b = b * 255;
    color.calcHex();
    this.redrawBack();
};
override(LQ.Color, 'Selected', {
    get: function() {
        return this.isSelected;
    },
    set: function(value) {
        this.isSelected = value;
        this.redrawBack();
    }
});

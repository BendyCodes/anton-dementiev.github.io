GodStep.DotView = function (point){
    GodStep.Frame.call(this, 'DotView');
    GodStep.IOverOut.call(this);
    GodStep.IDownUp.call(this);

    this.point = point;
    this.x = point.x;
    this.y = point.y;
    this.createGraphics();
    this.W = this.H = 10;
    this.lvl = point.ctype == 'c' ? 1 : 0;
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);

    this.redraw();
};
GodStep.DotView.colors = [0x00ff00, 0x0000ff, 0xf0f0f0];
GodStep.DotView.colors2 = [0xaaffaa, 0xaaaaff, 0xfafafa];

extend(GodStep.DotView, GodStep.Frame);

pro.redraw = function() {
    this.graphics.clear();
    this.graphics.lineStyle(1, (this.isSelected) ? 0xff0000 : 0, (this.isDown) ?.5 : 1);
    this.graphics.beginFill((this.isOver) ? GodStep.DotView.colors2[this.lvl] : GodStep.DotView.colors[this.lvl]);
    this.graphics.drawCircle(0, 0, this.W/2);
};
pro.selfPlace = function() {
    this.x = this.point.x;
    this.y = this.point.y;
};
pro.place = function(p) {
   this.point.x = this.x = p.x;
   this.point.y = this.y = p.y;
};

Object.defineProperty(GodStep.DotView.prototype, 'IsDown', {
    get: function() {
        return this.isDown;
    },
    set: function(value) {
        this.isDown = value;
        if(GodStep.DotView.selected) {
            GodStep.DotView.selected.isSelected = false;
            GodStep.DotView.selected.redraw();
            GodStep.DotView.selected = null;
        }
        if(value) {
            GodStep.DotView.selected = this;
            this.isSelected = true;
            this.redraw();
        }
    }
});


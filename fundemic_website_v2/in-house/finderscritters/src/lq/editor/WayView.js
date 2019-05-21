GodStep.WayView = function (way){
    GodStep.Frame.call(this, 'WayView');
    GodStep.IOverOut.call(this);
    GodStep.IDownUp.call(this);

    GodStep.WayView.count = (GodStep.WayView.count + 1) || 1;
    this.way = way;
    this.createGraphics();

    this.label = this.createText('Way' + GodStep.WayView.count, 12, 'Arial', 'center');
    this.label.updateText();
    this.W = this.label.width;
    this.H = this.label.height;

    this.setHitArea(-2, -2, this.W+4, this.H+4);

    this.redraw();
};
pro = GodStep.WayView.prototype = Object.create( GodStep.Frame.prototype);
pro.redraw = function() {
    this.graphics.clear();
    if(this.isSelected) {
        this.graphics.lineStyle(2, 0xffffff, (this.isDown) ?.5 : 1);
    }
    this.rect(this.W+4, this.H+4, (this.isOver) ? 0x34281A : 0x4F3E24, 1, -2, -2);
};


Object.defineProperty(GodStep.WayView.prototype, 'IsDown', {
    get: function() {
        return this.isDown;
    },
    set: function(value) {
        this.isDown = value;
        if(GodStep.WayView.selected) {
            GodStep.WayView.selected.isSelected = false;
            GodStep.WayView.selected.redraw();
        }
        GodStep.WayView.selected = this;
        this.isSelected = true;
        this.redraw();
    }
});


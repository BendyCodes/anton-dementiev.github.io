GodStep.FrameView = function (frame){
    GodStep.Frame.call(this, 'FrameView');
    GodStep.IOverOut.call(this);
    GodStep.IDownUp.call(this);

    this.frame = frame;
    this.createGraphics();

    this.label = this.createText((frame) ? frame.name : 'soul', 12, 'Arial', 'center');
    this.label.updateText();
    this.W = this.label.width;
    this.H = this.label.height;

    this.setHitArea(-2, -2, this.W+4, this.H+4);


    this.childs = [];
    this.redraw();
};
pro = GodStep.FrameView.prototype = Object.create( GodStep.Frame.prototype);
pro.redraw = function() {
    this.graphics.clear();
    if(this.isSelected) {
        this.graphics.lineStyle(2, 0xffffff, (this.isDown) ?.5 : 1);
    }
    this.rect(this.W+4, this.H+4, (this.isOver) ? 0x34281A : 0x294f36, 1, -2, -2);
};

pro.getChildCountR = function() {
    var count = this.childs.length;
    for(var i = 0; i<this.childs.length; i++) {
        count += Math.max(0, this.childs[i].getChildCountR() - 1);
    }
    return count;
};
pro.drawLines = function(g) {
    g.lineStyle(5, 0,.2);
    for(var i = 0; i<this.childs.length; i++) {
        g.moveTo(this.x + this.W/2, this.y + this.H);
        g.lineTo(this.x + this.W/2, this.childs[i].y + this.H/2);
        g.lineTo(this.childs[i].x, this.childs[i].y + this.H/2);
    }
};
pro.place = function() {
    if(this.parentFrame) {
        this.x = this.parentFrame.x + this.parentFrame.W + 7;
    }
    var dy = 0;

    for(var i = 0; i<this.childs.length; i++) {
        this.childs[i].y = this.y + dy;
        dy += Math.max(1, (this.childs[i].getChildCountR())) * (this.H + 7);
        this.childs[i].place();
    }

};
pro.pushChild = function(child) {
    this.childs.push(child);
};

Object.defineProperty(GodStep.FrameView.prototype, 'IsDown', {
    get: function() {
        return this.isDown;
    },
    set: function(value) {
        this.isDown = value;
        if(GodStep.FrameView.selected) {
            GodStep.FrameView.selected.isSelected = false;
            GodStep.FrameView.selected.redraw();
        }
        GodStep.FrameView.selected = this;
        this.isSelected = true;
        this.redraw();
    }
});


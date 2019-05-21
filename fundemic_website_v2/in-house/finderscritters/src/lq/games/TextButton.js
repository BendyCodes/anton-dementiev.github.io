Games.TextButton = function(text, size, color, px, py) {
    GodStep.Frame.call(this, null, 0, 0);

    this.color = color;
    this.size = size;
    this.addChild(this.back = new PIXI.Graphics());
    this.addChild(this.text = new GodStep.Text(text, size * 2, 'Arial', 'left', 0xffffff));
    this.text.x = -this.text.width/2;
    this.text.y = -this.text.height/2;
    this.W = this.text.width * 1.5;
    this.H = this.text.height* 1.5;

    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);

    this.isSelected = false;
    this.redraw();
    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUTSIDE, this.h_mouse);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(Games.TextButton, GodStep.Frame);

pro.destroy = function() {
    this.removeChild(this.back);
    this.removeChild(this.text);
    return this;
};
pro.redraw = function() {
    var g = this.back;
    g.clear();
    g.beginFill(this.color, 1);
    if(this.isSelected) {
        g.lineStyle(2, 0xffffff, 1);
    }
    g.drawRect(-this.W/2, -this.H/2, this.W, this.H, parseInt(this.size*.5), parseInt(this.size *.5));
   // g.drawRoundedRect(-this.W/2, -this.H/2, this.W, this.H, parseInt(this.size*.5), parseInt(this.size *.5));
    g.endFill();
};

pro.rescale = function(s) {
    this.Scale = s;
};

pro.h_mouse = function(e) {
    var t = e.content.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(t.text){
                this.rescale(1.1);
                this.isClicked = true;
                this.isOvered = true;
                var p = e.content.getLocalPosition(this);
            }

            break;
        case GodStep.FRAME_OUTSIDE:
            this.rescale(1);
            this.isClicked = false;
            this.isOvered = false;
            break;
        case GodStep.FRAME_UP:
            this.isClicked = false;
            this.rescale(1);
            dispatch(t, Games.ImgButton.CLICK);
            break;
        case GodStep.FRAME_OUT:
            this.isOvered = false;
            this.rescale(1);
            break;
        case GodStep.FRAME_OVER:
            if(this.isClicked) {
                this.isOvered = true;
                this.rescale(1.1);
            }
            break;
    }
};


Object.defineProperty(pro, 'Text', {
    get: function() {
        return this.text.text;
    },
    set: function(value) {
        this.text.setText(value);
        this.text.updateText();
        this.text.x = -this.text.width/2;
    }
});
Object.defineProperty(pro, 'Selected', {
    get: function() {
        return this.isSelected;
    },
    set: function(value) {
        this.isSelected = value;
        this.redraw();
    }
});
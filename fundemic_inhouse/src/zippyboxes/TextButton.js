PS.TextButton = function(text, size, color, parent, scaleS, px, py) {
    var startS = scaleS;
    GodStep.Frame.call(this, null, 0, 0);

    this.color = color;
    this.addChild(this.back = new PIXI.Graphics());// this.back.scale = this.back.scale = startS;
    this.addChild(this.text = new GodStep.Text(text, size * scaleS * 2, 'Arial', 'left', 0xffffff)); //this.text.Scale = startS;
    this.text.x = -this.text.width/2;
    this.text.y = -this.text.height/2;
    this.W = this.text.width * 1.5;
    this.H = this.text.height* 1.5;

    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);


    this.redraw();
    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PS.TextButton, GodStep.Frame);

pro.destroy = function() {
    this.removeChild(this.back);
    this.removeChild(this.text);
    return this;
}
pro.redraw = function() {
    var g = this.back;
    g.clear();
    g.beginFill(this.color, 1);
    g.drawRect(-this.W/2, - this.H/2, this.W, this.H);
    g.endFill();
};
pro.h_mouse = function(e) {
    var t = e.content.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            this.Scale = .9;
            this.isClicked = true;
            break;
        case GodStep.FRAME_UP:
            if(this.isClicked) {
                dispatch(t, PS.ImgButton.CLICK);
            }
            this.isClicked = false;
            break;
        case GodStep.FRAME_OUT:
            this.Scale = 1;
            break;
        case GodStep.FRAME_OVER:
            if(this.isDown) {
                this.Scale = .9;
            }
            break;
    }
};
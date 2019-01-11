AZ.ImgButton = function(img, parent, scaleS, px, py) {
    var tex = GodStep.textures[img];
    var startS = scaleS;
    GodStep.Frame.call(this, null, tex.width * startS, tex.height * startS);
    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);

    this.addChild(this.img = new GodStep.Image(tex)); this.img.Scale = startS;
    this.img.anchor = new PIXI.Point(0.5, 0.5);
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);

    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(AZ.ImgButton, GodStep.Frame);
AZ.ImgButton.CLICK = 'clickImg';

pro.h_mouse = function(e) {
    var t = e.content.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            this.Scale = .9;
            this.isClicked = true;
            break;
        case GodStep.FRAME_UP:
            if(this.isClicked) {
                dispatch(t, AZ.ImgButton.CLICK);
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
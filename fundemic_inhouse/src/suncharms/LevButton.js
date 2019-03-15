M3.LevButton = function(img, scaleS, px, py, text, textSize, tdx, tdy, tint) {
    var tex = GodStep.textures[img];
    var startS = scaleS;
    GodStep.Frame.call(this, null, tex.width * startS /GodStep.IMAGE_RESOLUTION, tex.height * startS /GodStep.IMAGE_RESOLUTION);
    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);

    this.addChild(this.img = new GodStep.Image(tex)); this.img.Scale = startS /GodStep.IMAGE_RESOLUTION;
    this.img.anchor = new PIXI.Point(0.5, 0.5);
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);

    if(text) {
        this.addChild(this.label = new M3.Text(text, (textSize || 100), 0, 0, 'center', tint));
        this.label.x -= this.label.width/2 + (tdx || 0);
        this.label.y -= this.label.height/2 + (tdy || 0);
        this.label.tdx = tdx || 0;
        this.label.tdy = tdy || 0;
        this.label.HW = -this.label.width/2;
        this.label.HH = -this.label.height/2;

    }

    this.downScale = .95;
    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.LevButton, GodStep.Frame);
M3.LevButton.COLORS = [0xe77719, 0xb1321e, 0x608b28, 0xc22929, 0xc1282c];

pro.setAsComplete = function() {
    var id = this.ID - parseInt(this.ID/5) * 5 + 1;
    this.img.setTexture(GodStep.textures['unlock']);
    this.label.tint = 0;
    this.isDisabled = false;
    this.label.tint = 0x36cffb;
    this.label.updateText();
};
pro.setAsActive = function() {
    var id = this.ID - parseInt(this.ID/5) * 5 + 1;

    this.img.setTexture(GodStep.textures['lock']);
    this.label.tint = 0xFF4079;
    this.label.updateText();
    this.isDisabled = false;

};
pro.destroy = function() {
    this.removeChild(this.img);
    delEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    delEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    delEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    delEvent(this, GodStep.FRAME_UP, this.h_mouse);
    if(this.label) this.removeChild(this.label);
    return this;
};
pro.h_mouse = function(e) {
    var t = e.content.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            this.Scale = this.downScale;
            this.isClicked = true;
            break;
        case GodStep.FRAME_UP:
            if(this.isClicked) {
                dispatch(t, M3.ImgButton.CLICK);
            }
            this.isClicked = false;
            break;
        case GodStep.FRAME_OUT:
            this.Scale = 1;
            break;
        case GodStep.FRAME_OVER:
            if(this.isDown) {
                this.Scale = this.downScale;
            }
            break;
    }
};
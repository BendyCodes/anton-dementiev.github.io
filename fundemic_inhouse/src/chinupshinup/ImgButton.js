SS.ImgButton = function(img, parent, px, py, text, textSize, tdx, tdy) {
    var tex = GodStep.textures[img];
    if(tex == undefined || tex == null) trace('TEXTURE NOT FOUND - ' + img);
    var startS = this.startS =  parent.s * SS.SCALE;
    GodStep.Frame.call(this, null, tex.width * startS /GodStep.IMAGE_RESOLUTION, tex.height * startS /GodStep.IMAGE_RESOLUTION);
    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);

    this.p = parent;
    this.scaleble = true;
    this.addChild(this.img = new GodStep.Image(tex)); this.img.Scale = startS /GodStep.IMAGE_RESOLUTION;

    if(text) {
        this.addChild(this.label = new SS.Text(text, (textSize || 100) * startS/ SS.SCALE, 0, 0, 'center'));
        this.label.x -= this.label.width/2 + (tdx || 0);
        this.label.y -= this.label.height/2 + (tdy || 0);
        this.label.tdx = tdx || 0;
        this.label.tdy = tdy || 0;
        this.label.HW = -this.label.width/2;
        this.label.HH = -this.label.height/2;
    }

    this.img.anchor = new PIXI.Point(0.5, 0.5);
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);
    this.addChild(this.over = new GodStep.Frame('over')); this.over.p = this;

    GodStep.IDownUp.call(this.over, this.W, this.H);

   // this.over.visible = false;
    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this.over, GodStep.FRAME_UP, this.h_mouse);

};
extend(SS.ImgButton, GodStep.Frame);
SS.ImgButton.CLICK = 'clickImg';

pro.rescale = function(s) {
    if(this.no_scale) return;
    if(this.label) {
        this.label.scale.y = this.label.scale.x = s;
        this.label.x = (this.label.HW - (this.label.tdx || 0))* this.label.scale.y;
        this.label.y = (this.label.HH  - (this.label.tdy || 0))* this.label.scale.y;
    }
    this.img.scale.y = this.img.scale.x = s * this.startS;
};
pro.h_mouse = function(e) {
    var t = e.content.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(this.scaleble) {
                this.rescale(1.1 /GodStep.IMAGE_RESOLUTION);
            }
            this.over.visible = true;
            this.over.interactive = true;
            this.over.hitArea = new PIXI.Rectangle(-this.p.W *.2, -this.p.W *.2, this.p.W *.4, this.p.W *.4);
            this.isClicked = true;
            this.isOvered = true;

            addEvent(this, GodStep.FRAME_MOVE, this.h_move);
            break;
        case GodStep.FRAME_UP:
            if(this.p.isClicked && this.p.isOvered) {
                dispatch(t.parent, SS.ImgButton.CLICK);
            }
            this.visible = false;
            this.p.isOvered = false;
            this.p.rescale(1 /GodStep.IMAGE_RESOLUTION);
            this.p.isDown = false;
            delEvent(this.p, GodStep.FRAME_MOVE, this.h_move);
            this.p.isClicked = false;
            break;
        case GodStep.FRAME_OUT:
            this.isOvered = false;
            this.rescale(1 /GodStep.IMAGE_RESOLUTION);
            break;
        case GodStep.FRAME_OVER:
            if(this.isClicked) {
                this.isOvered = true;
                if(this.scaleble) {
                    this.rescale(1.1 /GodStep.IMAGE_RESOLUTION);
                }
            }
            break;
    }
};
pro.h_move = function(e) {
    var p = e.content.getLocalPosition(this);
    this.over.x = p.x;
    this.over.y = p.y;
};
Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x =
            this.scale.y = value;
             this.rescale(1 /GodStep.IMAGE_RESOLUTION);

    }
});
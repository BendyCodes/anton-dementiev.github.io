M3.ImgButton = function(img, s_img, s_scale, parent, scaleS, px, py, text, textSize, tdx, tdy) {
    var tex = GodStep.textures[img];
    if(tex == undefined || tex == null) trace('TEXTURE NOT FOUND - ' + img);
    var startS = this.startS =  scaleS * M3.SCALE;
    GodStep.Frame.call(this, null, tex.width * startS /GodStep.IMAGE_RESOLUTION, tex.height * startS /GodStep.IMAGE_RESOLUTION);
    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);

    this.scaleble = true;
    if(s_img) {
        var shadow = GodStep.textures[s_img];
        this.addChild(this.shadow = new GodStep.Image(shadow)); this.shadow.Scale = startS * s_scale  /GodStep.IMAGE_RESOLUTION;
        this.shadow.anchor = new PIXI.Point(0.5, 0.5);
        this.shadow.y = tex.height/2 * scaleS * 1.3 /GodStep.IMAGE_RESOLUTION;
    }
    this.addChild(this.img = new GodStep.Image(tex)); this.img.Scale = startS /GodStep.IMAGE_RESOLUTION;

    if(text) {
        this.addChild(this.label = new M3.Text(text, (textSize || 100) * startS/ M3.SCALE, 0, 0, 'center'));
        this.label.x -= this.label.width/2 + (tdx || 0);
        this.label.y -= this.label.height/2 + (tdy || 0);
        this.label.tdx = tdx || 0;
        this.label.tdy = tdy || 0;
        this.label.HW = -this.label.width/2;
        this.label.HH = -this.label.height/2;
    }
    this.img.anchor = new PIXI.Point(0.5, 0.5);
    this.setHitArea(-this.W/2, -this.H/2, this.W, this.H);

    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.ImgButton, GodStep.Frame);
M3.ImgButton.CLICK = 'clickImg';

pro.rescale = function(s) {
    if(this.no_scale) return;
    if(this.label) {
        this.label.scale.y = this.label.scale.x = s;
        //this.label.x = -(this.label.width/2 + (this.label.tdx || 0));
        //this.label.y = -(this.label.height/2 + (this.label.tdy || 0));
        this.label.x = (this.label.HW - (this.label.tdx || 0))* this.label.scale.y ;
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
            this.isClicked = true;
            break;
        case GodStep.FRAME_UP:
            if(this.isClicked) {
                dispatch(t, M3.ImgButton.CLICK);
            }
            this.isClicked = false;
            break;
        case GodStep.FRAME_OUT:
            this.rescale(1 /GodStep.IMAGE_RESOLUTION);
            break;
        case GodStep.FRAME_OVER:
            if(this.isDown) {
                if(this.scaleble) {
                    this.rescale(1.1 /GodStep.IMAGE_RESOLUTION);
                }
            }
            break;
    }
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
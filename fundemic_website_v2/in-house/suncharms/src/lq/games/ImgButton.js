Games.ImgButton = function(img, parent, px, py, text, textSize, tdx, tdy,font) {
    var tex = GodStep.textures[img];
    if(!tex) {
        tex = PIXI.Texture.fromFrame(img + '.png');
    }
    var startS = this.startS =  parent.s * Games.SCALE;
    GodStep.Frame.call(this, null, tex.width * startS /GodStep.IMAGE_RESOLUTION, tex.height * startS /GodStep.IMAGE_RESOLUTION);
    GodStep.IOverOut.call(this, this.W, this.H);
    GodStep.IDownUp.call(this, this.W, this.H);

    this.imgName = img;
    this.p = parent;
    this.addChild(this.img = new GodStep.Image(tex)); this.img.Scale = startS /GodStep.IMAGE_RESOLUTION;

    this.scaleble = true;
    if(text) {
        this.addChild(this.label = new GodStep.BitmapText(text, (textSize || 100) * startS/ Games.SCALE, 0, 0, 'center', font));
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
   // this.over.rect(20, 20, 0, 1, -10, -10);
    GodStep.IDownUp.call(this.over, this.W, this.H);
    this.place(px, py);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_OUT, this.h_mouse);
    addEvent(this, GodStep.FRAME_OVER, this.h_mouse);
    addEvent(this.over, GodStep.FRAME_UP, this.h_mouse);
    this.phase = new PIXI.Point();
    this.sp = new PIXI.Point(px, py);
};
extend(Games.ImgButton, GodStep.Frame);
Games.ImgButton.CLICK = 'clickImg';

pro.setTexture = function(name){
    var tex = GodStep.textures[name];
    if(!tex) {
        tex = PIXI.Texture.fromFrame(name);
    }
    this.img.setTexture(tex);
};
pro.rescale = function(s) {
    if(this.no_scale) return;
    if(this.label) {
        this.label.scale.y = this.label.scale.x = s;
        this.label.x = (this.label.HW - (this.label.tdx || 0))* this.label.scale.y;
        this.label.y = (this.label.HH  - (this.label.tdy || 0))* this.label.scale.y;
    }
    this.img.scale.y = this.img.scale.x = s * this.startS;
};
pro.clear = function() {
    this.isClicked = true;
    this.isOvered = true;
    this.over.visible = false;
};
pro.setPosition = function(px, py) {
    this.sp = new PIXI.Point(isNaN(px) ? this.sp.x : px, isNaN(py) ? this.sp.y : py);
    this.x = this.sp.x;
    this.y = this.sp.y;
};
pro.move = function(ax, ay) {
    if(!this.isDown) {
        this.scale.x = this.scale.y += (1 - this.scale.x) * .1 / Games.SCALE;
        this.x += (this.sp.x + Math.sin(this.phase.x) * ax - this.x) * .1;
        this.y += (this.sp.y + Math.sin(this.phase.y) * ay - this.y) * .1;

        this.phase.x += 0.1;
        this.phase.y += 0.1;
    }
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
            var p = e.content.getLocalPosition(this);
            this.over.x = p.x;
            this.over.y = p.y;
            addEvent(this, GodStep.FRAME_MOVE, this.h_move);
            break;
        case GodStep.FRAME_UP:
            if(this.p.isClicked && this.p.isOvered) {
                dispatch(t.parent, Games.ImgButton.CLICK);
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
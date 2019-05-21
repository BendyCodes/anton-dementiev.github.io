Games.ImgButton = function(img, parent, px, py, text, textSize, tdx, tdy,font, ss) {
    var tex = GodStep.textures[img];
    if(!tex) {
        tex = PIXI.Texture.fromFrame(img + '.png');
    }
    var supS = ss || 1;
    var startS = this.startS =  parent.s * Games.SCALE * supS;
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
    var t = e.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(t.scaleble) {
                t.rescale(1.1 /GodStep.IMAGE_RESOLUTION);
            }
            t.over.visible = true;
            t.over.interactive = true;
            t.over.hitArea = new PIXI.Rectangle(-t.p.W *.2, -t.p.W *.2, t.p.W *.4, t.p.W *.4);
            t.isClicked = true;
            t.isOvered = true;
            t.dragData = e.data;
            var p = e.data.getLocalPosition(t);
            t.over.x = p.x;
            t.over.y = p.y;
            addEvent(t, GodStep.FRAME_MOVE, t.h_move);
            break;
        case GodStep.FRAME_UP:
            if(t.p.isClicked && t.p.isOvered) {
                dispatch(t.parent, Games.ImgButton.CLICK);
            }
            t.visible = false;
            t.p.isOvered = false;
            t.p.rescale(1 /GodStep.IMAGE_RESOLUTION);
            t.p.isDown = false;
            delEvent(t.p, GodStep.FRAME_MOVE, t.h_move);
            t.p.isClicked = false;
            break;
        case GodStep.FRAME_OUT:
            t.isOvered = false;
            t.rescale(1 /GodStep.IMAGE_RESOLUTION);
            break;
        case GodStep.FRAME_OVER:
            if(t.isClicked) {
                t.isOvered = true;
                if(t.scaleble) {
                    t.rescale(1.1 /GodStep.IMAGE_RESOLUTION);
                }
            }
            break;
    }
};
pro.h_move = function(e) {
    var t = e.t;
    var p = t.dragData.getLocalPosition(t);
    t.over.x = p.x;
    t.over.y = p.y;
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
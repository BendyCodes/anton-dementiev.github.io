 GodStep.MovieClip = function(frames, scale, px, py, anchor) {
    this.frames = frames;
    this.animTime = 6;
    this.animTimer = 6;
    this.cycle = 0;
    var tex = GodStep.textures[ this.frames[0] ];
    GodStep.Image.call(this, tex);
    this.Scale = this.startS = scale/GodStep.IMAGE_RESOLUTION  * GodStep.SCALE;
    this.currentFrame = 0;
    this.totalFrames = frames.length;

    if(anchor == 0.5) {
        this.anchor = new PIXI.Point(.5, .5);
    } else {
        if(anchor) {
            this.anchor = anchor;
        }
    }
    this.place(px, py);
};
extend(GodStep.MovieClip, GodStep.Image);

pro.animate = function() {
    if(this.isAnimate()) this.nextFrame();
};
pro.isAnimate = function() {
    if(this.animTimer > 0) {
        if(--this.animTimer == 0) {
            this.animTimer = this.animTime;
            return true;
        }
    }
    return false;
};
pro.setToFrame = function(frame) {
    this.currentFrame = frame;
    this.setTexture(GodStep.textures[this.frames[frame]]);
};
pro.nextFrame = function() {
    this.currentFrame++;
    if(this.currentFrame == this.frames.length) {
        this.currentFrame = 0;
        this.cycle++;
    }
    this.setTexture(GodStep.textures[this.frames[this.currentFrame]]);
    return this.currentFrame;
};
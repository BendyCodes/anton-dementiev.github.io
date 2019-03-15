M3.MovieClip = function(frames, scale, px, py, anchor) {
    this.frames = frames;

    var tex = GodStep.textures[ this.frames[0] ];
    GodStep.Image.call(this, tex);
    this.Scale = this.startS = scale/GodStep.IMAGE_RESOLUTION;
    this.currentFrame = 0;
    if(anchor == 0.5) {
        this.anchor = new PIXI.Point(.5, .5);
    } else {
        if(anchor) {
            this.anchor = anchor;
        }
    }
    this.place(px, py);
};
extend(M3.MovieClip, GodStep.Image);

pro.setToFrame = function(frame) {
    this.currentFrame = frame;
    this.setTexture(GodStep.textures[this.frames[frame]]);
};
pro.nextFrame = function() {
    this.currentFrame++;
    if(this.currentFrame == this.frames.length) {
        this.currentFrame = 0;
    }
    this.setTexture(GodStep.textures[this.frames[this.currentFrame]]);
    return this.currentFrame;
};
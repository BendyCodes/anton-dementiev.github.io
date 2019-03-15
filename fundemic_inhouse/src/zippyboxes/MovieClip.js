PS.MovieClip = function(alias, scale, px, py, anchor) {
    if(alias == 'end_level' || alias == 'end') {
        this.frames = [alias + '_1', alias + '_2', alias + '_3', alias + '_4'];
    } else {
        this.frames = ['b' + alias + '_1', 'b' + alias + '_2', 'b' + alias + '_3', 'b' + alias + '_4'];
    }

    var tex = GodStep.textures[ this.frames[0] ];
    GodStep.Image.call(this, tex);
    this.Scale = this.startS = scale * 1;//AG.SCALE;
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
extend(PS.MovieClip, GodStep.Image);

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
};
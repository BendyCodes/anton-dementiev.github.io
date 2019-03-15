HTU.MovieClip = function(name, scale, framesCount, framesOnLine, framesOnColumn, px, py, anchor) {
    var tex = GodStep.textures[name];
    GodStep.Image.call(this, this.cloneTexture(tex));
    this.fcx = framesOnLine;
    this.fcy = framesOnColumn;
    this.framesCount = framesCount;
    this.Scale = this.startS = scale * 2;
    this.rect = new PIXI.Rectangle(0, 0, this.texture.width/framesOnLine, this.texture.height/framesOnColumn);
    this.texture.setFrame(this.rect);
    this.speed = .5;
    this.framePhase = 0;
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
extend(HTU.MovieClip, GodStep.Image);

pro.cloneTexture = function(tex) {
    var rt = new PIXI.RenderTexture(tex.width, tex.height);
    var s = new PIXI.Sprite(tex);
    HTU.HatchTheUnicorn.instance.stage.addChild(s);
    rt.render(s);
    HTU.HatchTheUnicorn.instance.stage.removeChild(s);
    return rt;
};
pro.setToFrame = function(frame) {
    this.currentFrame = frame;
    var fy = parseInt(this.currentFrame/this.fcx);
    var fx = this.currentFrame - fy * this.fcx;
    this.rect.x = fx * this.rect.width;
    this.rect.y = fy * this.rect.height;
    this.texture.setFrame(this.rect);
};
pro.play = function() {
    this.framePhase += this.speed;
    if(this.framePhase > 1) {
        this.framePhase = 0;
        this.currentFrame++;
        if(this.currentFrame == this.framesCount) {
            this.currentFrame = 0;
        }
        this.setToFrame(this.currentFrame);

    }
};
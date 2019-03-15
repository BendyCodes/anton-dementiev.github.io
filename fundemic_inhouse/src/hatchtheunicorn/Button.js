HTU.Button = function(name, scale, framesCount, framesOnLine, framesOnColumn, px, py, anchor) {
    HTU.MovieClip.call(this, name, scale, framesCount, framesOnLine, framesOnColumn, px, py, anchor);
    GodStep.IDownUp.call(this, this.rect.width, this.rect.height);

    this.hitArea = new PIXI.Rectangle( - this.rect.width/2, -this.rect.height/2, this.rect.width, this.rect.height)
};
extend(HTU.Button, HTU.MovieClip);


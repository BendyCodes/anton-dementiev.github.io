SS.Img = function(name, scale, px, py, anchor) {
    GodStep.Image.call(this, GodStep.textures[name]);
    this.name=name;
    this.Scale = scale /GodStep.IMAGE_RESOLUTION;
    if(anchor == 0.5) {
        this.anchor = new PIXI.Point(.5, .5);
    } else {
        if(anchor) {
            this.anchor = anchor;
        }
    }
    this.place(px, py);
};
extend(SS.Img, GodStep.Image);

pro.setTexture = function(name) {
     PIXI.Sprite.prototype.setTexture.call(this, GodStep.textures[name]);
};
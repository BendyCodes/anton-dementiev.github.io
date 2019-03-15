AG.Img = function(name, scale, px, py, anchor) {
    GodStep.Image.call(this, GodStep.textures[name]);
    this.Scale = scale * AG.SCALE;
    if(anchor == 0.5) {
        this.anchor = new PIXI.Point(.5, .5);
    } else {
        if(anchor) {
            this.anchor = anchor;
        }
    }
    this.place(px, py);
};
extend(AG.Img, GodStep.Image);

pro.setImg = function(texNam) {
     this.setTexture(GodStep.textures[texNam]);
};
AZ.Text = function() {
    GodStep.Frame.call(this, 'Text', 0, 0);

};

extend(AZ.Text, GodStep.Frame);
pro.init = function(length, S, tint) {
    this.Scale = S;
    this.tint = tint;
    this.addChild(this.sprite = new PIXI.Sprite(new PIXI.RenderTexture(length * 30, 100)));
    this.addChild(this.letter = new AZ.Img('cifry', S, 0, 0));
    this.sprite.tint = tint;
    this.sprite.x = -this.sprite.texture.width;
};
pro.setText = function(value) {
    var tex = this.letter.texture;
    var w = parseInt(tex.baseTexture.width/10) - 4;
    var h = tex.height;
    var s = value.toString();
    this.removeChild(this.sprite);
    this.addChild(this.sprite = new PIXI.Sprite(new PIXI.RenderTexture(this.sprite.texture.width, 100))); this.sprite.tint = this.tint;


    this.sprite.x = -this.sprite.texture.width;

    this.sprite.texture.clear();
    this.letter.visible = true;

    for(var i = s.length - 1; i>= 0; i--) {
        var cifra = parseInt(s[i]);
        this.letter.texture.setFrame(new PIXI.Rectangle(cifra * w, 0, w, h));
        var mat = new PIXI.Matrix(); mat.tx = this.sprite.texture.width - s.length * (w - 7) + i * (w - 7);
        this.sprite.texture.render(this.letter, mat);

    }
    this.letter.visible = false;

};
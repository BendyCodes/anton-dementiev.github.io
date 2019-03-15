HTU.Text = function(type,  w,s, x, y) {
    GodStep.Frame.call(this, 'Text', 0, 0);
    this.textureType = type;
    this.cW = w;
    this.x = x;
    this.y = y;
    this.init(11, s,  null);
};

extend(HTU.Text, GodStep.Frame);
pro.init = function(length, S, tint) {
    this.Scale = S;

    this.addChild(this.sprite = new PIXI.Sprite(new PIXI.RenderTexture(length *  this.cW, 100)));
    this.addChild(this.letter = new Games.Img(this.textureType, S, 0, 0));
    if(tint) {
        this.tint = tint;
        this.sprite.tint = tint;
    }
    this.sprite.x = -this.sprite.texture.width;
};
pro.setText = function(value) {
    var tex = this.letter.texture;
    var w =  this.cW;
    var h = tex.height;
    var s = value.toString();
    this.removeChild(this.sprite);
    this.addChild(this.sprite = new PIXI.Sprite(new PIXI.RenderTexture(this.sprite.texture.width, 100)));
    var ss = .65;
    this.sprite.x = - this.sprite.texture.width ;// - s.length * (w*ss) ;

    this.sprite.texture.clear();
    this.letter.visible = true;

    for(var i = s.length - 1; i>= 0; i--) {
        var cifra = parseInt(s[i]);
        cifra -= 1;
        if(cifra == -1) cifra = 9;
        this.letter.texture.setFrame(new PIXI.Rectangle(cifra * w, 0, w , h));

        var mat = new PIXI.Matrix(); mat.tx = this.sprite.texture.width - s.length * (w*ss) + i * (w *ss) - w * .4;
        this.sprite.texture.render(this.letter, mat);

    }
    this.letter.visible = false;
 //   this.removeChild(this.letter);

};
HTU.Background = function(soul) {
    this.soul = soul;
    var s = this.startS = this.soul.startS * HTU.SCALE;;
    GodStep.Frame.call(this, 'Background', soul.SW, soul.SH);
    this.addChild(this.ts = new PIXI.TilingSprite(GodStep.textures['sky'], soul.SW, soul.SH));
    this.ts.tileScale.x = this.W/this.ts.texture.width;
    this.ts.tileScale.y = this.H/this.ts.texture.height;
    this.addChild(this.hills = new Games.Img('backgound_bottom', s * 2, this.W *.5, 0, new PIXI.Point(.5, 1)));
    this.addChild(this.hillsBlur = new Games.Img('backgound_bottom_blur', s * 2, this.W *.5, 0, new PIXI.Point(.5, 1)));
    this.addChild(this.rainbow = new Games.Img('rainbow_2', s * 2, this.W *.5, 0, new PIXI.Point(.5, 0)));
    this.addChild(this.rainbowBlur = new Games.Img('rainbow_blur', s * 2, this.W *.5, 0, new PIXI.Point(.5, 0)));
    this.addChild(this.substrate = new Games.Img('substrate_interface', s * 2, this.W *.5, this.H *.5, new PIXI.Point(.5, 0)));
    this.addChild(this.substrate1 = new Games.Img('substrate_interface_top', s * 2, this.W *.5, this.H *.0, new PIXI.Point(.5,0)));

    this.visible = false;
    this.hills.y = this.hillsBlur.y = this.soul.OH;
    this.cacheAsBitmap = true;

};
extend(HTU.Background, GodStep.Frame);

pro.update = function() {
    if (this.visible) {
        if (this.timerCache-- == 0) {
            this.timerCache = -1;
            this.cacheAsBitmap = true;
        }
    }
};

pro.init = function() {
    this.visible = true;
};
pro.setState = function(v) {
    this.hills.visible = this.hillsBlur.visible = this.rainbow.visible = this.rainbowBlur.visible = this.substrate.visible = this.substrate1.visible = true;

    switch (v) {
        case 1:
            this.hillsBlur.visible = this.rainbowBlur.visible = this.substrate.visible = this.substrate1.visible = false;
            break;
        case 0:
          //  this.hills.visible = this.hillsBlur.visible = this.rainbow.visible = this.rainbowBlur.visible = this.substrate.visible = this.substrate1.visible = true;
            break;
    }
    this.cacheAsBitmap = false;
    this.timerCache = 33;
};
Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.cacheAsBitmap = false;
        this.timerCache = 30;

        if(this.soul.H < this.soul.OH) {
             this.ts.y = -this.y/value;
        }
        else {
            this.ts.y = 0;
        }
        this.substrate.y = this.substrate1.y = this.rainbow.y = this.rainbowBlur.y =  - (this.soul.OH - this.soul.H) * .5  / value;
            this.hills.y = this.hillsBlur.y = this.soul.OH / value - (this.soul.OH - this.soul.H) * .5  / value;

        this.ts.tileScale.y = this.soul.OH/this.ts.texture.height/  value;
        this.ts.height = this.soul.OH/  value;///this.soul.startS;
        this.substrate.scale.y = this.soul.OH/ this.substrate.texture.height/value * 1.2;
        this.substrate.y +=  (this.soul.H) * .22/value ;

    }
});
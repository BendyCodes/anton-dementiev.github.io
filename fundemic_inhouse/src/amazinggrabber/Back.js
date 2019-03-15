AG.Back = function(soul, name, color, parent) {
    GodStep.Frame.call(this, 'Back');
    this.soul = soul;


    this.pp = parent;
    if(color != null) {
        this.createGraphics();
        this.color = color;
        this.addChild(this.ts = new PIXI.TilingSprite(GodStep.textures['back_tile'], soul.W, soul.H));
        this.ts.tileScale.x = soul.startS;
        this.ts.tileScale.y = soul.startS;
        this.ts.tint = color;
        this.ts.alpha = .5;
        this.graphics.clear();
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawRect(0, 0, soul.W, soul.H);
        this.graphics.endFill();

    }
    this.addChild(this.top = new AG.Img(name, soul.startS, 0, 0, new PIXI.Point(0, 0)));
    if(color != null) {
       // this.top.tint = color;
    }
};
extend(AG.Back, GodStep.Frame);

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.cacheAsBitmap = false;

        if(this.soul.H < this.soul.OH) {
            if(this.pp) {
                this.top.y = -this.pp.y/value;

            } else {
                this.top.y = -this.parent.y/value;
            }
            this.top.scale.x = this.soul.startS * AG.SCALE;
            this.top.scale.y = this.soul.OH/this.soul.H * this.soul.startS * AG.SCALE;
        }
        else {
            this.top.y = 0;
            this.top.scale.y = this.soul.startS* AG.SCALE;
            this.top.scale.x = this.soul.OW/this.soul.W * this.soul.startS* AG.SCALE;
            this.top.scale.x = this.soul.OH/this.soul.H * this.soul.startS* AG.SCALE;
        }
      //  this.cacheAsBitmap = true;
        if(this.ts) {
           // this.ts.width = this.soul.W;///this.soul.startS;
            this.ts.height = this.soul.OH/this.soul.startS;
            this.graphics.scale.y = this.soul.OH/this.soul.H;
            this.graphics.y =this.ts.y =this.top.y
        }


    }
});
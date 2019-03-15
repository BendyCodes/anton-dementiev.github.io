AZ.Background = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'Background', soul.W, soul.H);
    this.addChild(this.b = new PIXI.Graphics());
    this.b.beginFill(0, 1);
    this.b.drawRect(0, 0, this.W, soul.H);
    this.b.endFill();
    this.addChild(this.back = new GodStep.Image(GodStep.textures['background']));
    this.back.Scale = soul.startS;
    this.visible = false;
};
extend(AZ.Background, GodStep.Frame);

pro.init = function() {
    this.visible = true;
};


Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.b.scale.y = (this.OH - this.H);
        //this.b.scale.x = value;
        this.b.clear();
        this.b.beginFill(0x071240, 1);
        this.b.drawRect( (this.soul.OW - this.W* value)/2 , 0, this.W * value, this.soul.OH);
        this.b.endFill();

    }
});


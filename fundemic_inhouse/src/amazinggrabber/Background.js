AG.Background = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'Background', soul.W, soul.H);
    //this.addChild(this.back = new GodStep.Image(GodStep.textures['background']));
    //this.back.Scale = soul.startS;
    this.visible = false;
};
extend(AG.Background, GodStep.Frame);

pro.init = function() {
    this.visible = true;
};

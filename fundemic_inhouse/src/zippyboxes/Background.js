PS.Background = function(parent, name) {
    this.soul = parent.soul;
    this.p = parent;
    GodStep.Frame.call(this, 'Background', parent.W, parent.H);
    this.addChild(this.img = new PS.Img(name, parent.startS, this.W *.5, this.H *.5,.5));
};
extend(PS.Background, GodStep.Frame);

pro.rescale = function(s) {
    this.scale.x = this.scale.y = this.soul.OH / this.soul.H;
    this.x = +(this.soul.W - this.soul.W * this.scale.x)/2;
    this.y = -(this.soul.OH - this.soul.H)*.5/s;
};
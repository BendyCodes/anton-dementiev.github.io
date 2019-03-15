M3.Background = function(parent, name) {
    this.soul = parent.soul;
    this.p = parent;
    GodStep.Frame.call(this, 'Background', parent.W, parent.H);
    this.addChild(this.img = new M3.Img(name, parent.startS, this.W *.5, this.H *.5,.5));
};
extend(M3.Background, GodStep.Frame);

pro.rescale = function(s) {
    this.scale.x = this.scale.y = this.soul.OH / this.soul.H;
    this.x = +(this.soul.W - this.soul.W * this.scale.x)/2;
    this.y = -(this.soul.OH - this.soul.H)*.5/s;
};
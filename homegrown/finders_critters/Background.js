PR.Background = function(parent, name) {
    this.soul = parent.soul;
    this.p = parent;
    GodStep.Frame.call(this, 'Background', parent.W, parent.H);
    this.addChild(this.img = new Games.Img(name || 'back_menu', parent.s, this.W *.5, this.H *.5,.5));
};
extend(PR.Background, GodStep.Frame);

pro.rescale = function(s) {
    this.scale.x = this.scale.y = this.soul.OH / this.soul.H;
    this.x = +(this.soul.W - this.soul.W * this.scale.x)/2;
    this.y = -(this.soul.DOH)*.5/s;
};


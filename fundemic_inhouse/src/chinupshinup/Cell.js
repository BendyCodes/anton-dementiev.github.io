SS.Cell = function(w, h) {
    GodStep.Frame.call(this, 'Cell', w, h);
    GodStep.IDownUp.call(this, w, h);
    var g = this.g = this.createGraphics();
    g.beginFill(0xffffff, 1);
    g.lineStyle(2, 0x00aa00, 1);
    g.drawRect(0, 0, w, h);
    g.endFill();

    this.t = 0;
    this.isEnabled = false;
    this.redraw();
};
extend(SS.Cell, GodStep.Frame);

pro.redraw = function() {
    var g = this.g;
    g.clear();
    g.beginFill(this.isEnabled ? 0xffffff : 0x888888, 1);
    g.lineStyle(2, 0x00aa00, 1);
    g.drawRect(0, 0, this.W, this.H);
    g.endFill();
};
pro.setCell = function(instrument) {
    var s = this.parent.s;
   if(this.img) {
       this.removeChild(this.img);
   }
    if(instrument == 'coin') {
        this.t = 2;
        this.addChild(this.img = new Games.Img('coin', s, this.W *.5, this.H *.5,.5));
        this.isEnabled = true;
    } else
    if(instrument == 'crest') {
        this.t = 3;
        this.addChild(this.img = new Games.Img('crest', s, this.W *.5, this.H *.5,.5));
        this.isEnabled = true;
    } else {
        if(instrument == 'disabled') this.isEnabled = false;
        else  if(instrument == 'enabled') this.isEnabled = true;
        else this.isEnabled = !this.isEnabled;

        if(this.isEnabled) this.t = 1;
        else this.t = 0;
    }
    this.redraw();

};
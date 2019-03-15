AG.ProgressBar = function(parent) {
    GodStep.Frame.call(this, 'Shop', parent.W *.5, 50 * parent.startS );
    this.createGraphics();

};


extend(AG.ProgressBar, GodStep.Frame);

pro.drawProgress = function(percent) {
    var g = this.graphics;
    g.clear();
    g.lineStyle(1, 0xffffff, 1);
    g.drawRect(0, 0, this.W, this.H);
    g.beginFill(0xffffff, 1);
    g.drawRect(0, 0, this.W * percent, this.H);
    g.endFill();

};
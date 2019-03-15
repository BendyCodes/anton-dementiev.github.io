AG.TopSprite = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'TOP', soul.SW, soul.SH);

    var g = this.createGraphics();
    g.beginFill(0, 1);
    g.drawRect(-this.W*1.5, 0, this.W*1.5, this.H);
    g.drawRect(this.W, 0, this.W, this.H);
    g.endFill();
    this.cacheAsBitmap = true;
};

extend(AG.TopSprite, GodStep.Frame);

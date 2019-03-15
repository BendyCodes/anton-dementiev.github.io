
GodStep.EInstruments = function(soul, w, h) {
    this.soul = soul;
    GodStep.Container.call(this, 'EInstruments', w, h);
   // this.dragCoef1 =
    //this.dragCoef2 = 0.5;

    this.build();
};
extend(GodStep.EInstruments, GodStep.Container);


pro.build = function() {
    var g = this.createGraphics();
    g.beginFill(0x888888, 0.6);
    g.drawRect(0, 0, this.W, this.H);
    g.endFill();
};
pro.update = function() {
    GodStep.Frame.prototype.update.call(this);
};
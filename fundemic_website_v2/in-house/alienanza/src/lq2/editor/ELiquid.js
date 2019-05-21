include('lq/editor/DotView');
include('lq/editor/EInstruments');


GodStep.ELiquid = function(soul, w, h) {
    this.soul = soul;
    GodStep.Container.call(this, 'ELiquid', w, h);
    //this.dragCoef2 = 0.3;

    this.addChild(this.points = new PIXI.DisplayObjectContainer());
    this.points = [];
    this.build();
};
extend(GodStep.ELiquid, GodStep.Container);

pro.setLiquid = function(lq) {
    while(this.points.children.length) {
        var p = this.points.children[0];
        this.removeChild(p);
    }
    this.object = lq;
    if(lq.points) {
        for(var i = 0; i < lq.points.length; i++) {
            this.addChild(new GodStep.DotView(lq.points[i]));
        }
    }
};
pro.getLiquid = function() {
    return this.object;
};
pro.build = function() {
    var g = this.createGraphics();
    g.beginFill(0x888888, 0.5);
    g.drawRect(0, 0, this.W, this.H);
    g.endFill();
};
pro.update = function() {
    GodStep.Frame.prototype.update.call(this);
};
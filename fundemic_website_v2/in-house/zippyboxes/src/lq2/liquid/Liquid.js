var LQ = LQ || {};
LQ.Liquid = function(soul) {
    if(!LQ.instance) {
        this.soul = soul;
        this.soul.stage.addChild(this.g = new PIXI.Graphics());
        this.m = new PIXI.Matrix();

        this.g.visible = false;
        LQ.instance = this;
    }
}; extend(LQ.Liquid, Object);

include('lq/liquid/LPass');
include('lq/liquid/LEditor');
include('lq/liquid/LServer');


// passes


LQ.Liquid.passAll = function(object, ps) {
    var pass, pass_p;
    var passes = ps;
    var point;
    var instance = LQ.instance;
    if(ps == null) {
        passes = object.passes;
    }
    var g = instance.g;
        g.visible = true;
    var points = object.points;
    var colors = object.colors;
    var params = object.params;
    var w = object.w;
    var h = object.h;
    var min = Math.min(w, h);
    var source = object.source;

    if(!ps) {
        source.isClear = true;
        object.applyState(object.states[0]);
    }

    for(var p = 0; p<passes.length; p++) {
        pass = passes[p];
        ps = pass.params;
        switch (pass.n) {
            case LQ.PASS_CLEAR:
                source.clear();
                source.isClear = true;
                break;
            case LQ.PASS_FILL:
                g.beginFill(colors[ps[0]].hex, params[ps[1]]);
                break;
            case LQ.PASS_CIRCLE:
                point = points[ps[0]];
                g.drawCircle(point.x, point.y, min *.5 * params[ps[1]]);
                break;
            case LQ.PASS_DRAW:
                source.render(g, instance.m, source.isClear);
                source.isClear = false;
                break;
            case LQ.PASS_LOOP:
                for(var i = 0; i<pass.loops; i++) {
                    LQ.Liquid.passAll(object, pass.passes);
                }
                break;
        }
    }
    g.visible = false;

    this.object = null;
};

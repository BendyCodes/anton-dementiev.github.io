GodStep.LFrame = function(soul, name) {
    GodStep.Frame.call(this, name || ('LFrame ' + GodStep.Frame.frameCount++), soul.W, soul.H);
    this.OH = soul.OH;
    this.OW = soul.OW;
    this.S = soul;
    this.s = soul.startS;
    this.soul = soul;
    this.visible = false;
}; extend(GodStep.LFrame, GodStep.Frame);

pro.init = function() {
   this.visible = true;
};
pro.initLiquid = function(w, h, d) {
    this.isLiquid = true;
    if(!GodStep.lqobjects) {
        GodStep.lqobjects = [];
        GodStep.lqobjects[0] = [];
    }
    if(!GodStep.lqobjects[this.name]) {
        GodStep.lqobjects[0].push(this);
        this.isTemplate = true;
        this.addChild(this.view = new PIXI.Sprite(this.source = new PIXI.RenderTexture(w, h)));
        GodStep.lqobjects[this.name] = this;
        this.template = this;
        this.brothers = [];
        this.passes = [new LQ.Pass(LQ.PASS_LOOP, [1], [new LQ.Pass(LQ.PASS_FILL, [0, 0]), new LQ.Pass(LQ.PASS_CIRCLE, [0, 0]), new LQ.Pass(LQ.PASS_DRAW, [0])])];
        this.states = [new GodStep.State()];
        this.colors = [];
        this.points = [];
        this.params = [];
    } else {
        GodStep.lqobjects[this.name].brothers.push(this);
        this.template = GodStep.lqobjects[this.name];
        this.addChild(this.view = new PIXI.Sprite(this.source = this.template.source));
    }
    this.view.anchor = new PIXI.Point(.5, .5);

    this.w = w;
    this.h = h;
    this.d = d || 0;
};

pro.applyToState = function(s) {

};
pro.applyState = function(s) {
    var cur = 0;
    var i;
    var points = this.points;
    var colors = this.colors;
    var params = this.params;
    var values = s.values;
    var w = this.w;
    var h = this.h;
    var d = this.d;
    for(i = 0; i<points.length; i++) {
        var p = points[i];
        p.x = w * values[cur];
        p.y = h * values[cur+1];
        p.z = d * values[cur+2];
        cur += 3;
    }
    for(i = 0; i<colors.length; i++) {
        var c = colors[i];
        c.r = parseInt(255 * values[cur]);
        c.g = parseInt(255 * values[cur+1]);
        c.b = parseInt(255 * values[cur+2]);
        c.calcHex();
        cur += 3;
    }
    for(i = 0; i<params.length; i++) {
        params[i] = values[cur];
        cur++;
    }
};
pro.pushParam = function() {
    var states = this.states;
    var sl = states.length;
    var cur = this.points.length * 3 + this.colors.length * 3 + this.params.length;
    for(var s = 0; s<sl; s++) {
        states[s].values.splice(cur, 0, 0);
    }
    this.params.push(0);
};
pro.pushColor = function(c) {
    var states = this.states;
    var sl = states.length;
    var cur = this.points.length * 3 + this.colors.length * 3;
    var values;
    for(var s = 0; s<sl; s++) {
        values = states[s].values;
        if(c) {
            values.splice(cur, 0, c.r/255);
            values.splice(cur + 1, c.g/255);
            values.splice(cur + 2, 0, c.b/255);
        } else {
            values.splice(cur, 0, 0);
            values.splice(cur + 1, 0, 0);
            values.splice(cur + 2, 0, 0);
        }
    }
    if(c) {
        this.colors.push(c);
    } else {
        this.colors.push(new GodStep.Color());
    }
};
pro.removeColor = function(c) {
    var id = this.colors.indexOf(c);
    var states = this.states;
    var sl = states.length;
    var values;
    var cur = this.points.length * 3 ;

    for(var s = 0; s<sl; s++) {
        values = states[s].values;
        values.splice(cur + id * 3, 3);
    }
    this.colors.splice(id, 1);
};
pro.removeParam = function() {
    if(this.params.length > 0) {
        this.params.splice(this.params.length - 1, 1);
    }
    var states = this.states;
    var sl = states.length;
    var cur = this.points.length * 3 + this.colors.length * 3 + this.params.length - 1;

    for(var s = 0; s<sl; s++) {
        states[s].values.splice(cur, 1);
    }
};
pro.pushPoint = function() {
    var states = this.states;
    var sl = states.length;
    var cur = this.points.length * 3;
    var values;
    for(var s = 0; s<sl; s++) {
        values = states[s].values;
        values.splice(cur, 0, 0);
        values.splice(cur + 1, 0, 0);
        values.splice(cur + 2, 0, 0);
    }
    this.points.push(new GodStep.Point());
};
pro.pushState = function(s) {
    if(s) {
        this.states.push(s);
    }
    else {
        this.states.push(this.states[0].clone());
    }

};
pro.passAll = function() {
    LQ.Liquid.passAll(this);
};
pro.getAllValues = function() {
    var states = this.states;
    var sl = states.length;
    var values = [];
    for(var i = 0; i<sl; i++) {
        values = values.concat(states[i].values);
    }
    return values;
};
pro.setData = function(d) {
    if(this.isTemplate) {
        this.name = d.name;
        this.passes = [];
        for(var i = 0; i< d.passes.length; i++) {
            this.passes.push(LQ.Pass.parse(d.passes[i]));
        }
        this.states = [];
        this.colors = [];
        this.params = [];
        this.points = [];
        var state;
        var values = d.values;
        var sl = values.length / d.sc;
        for(var id = 0; id< d.dc; id++) {
            this.points.push(new GodStep.Point());
        }
        for(var ic = 0; ic< d.cc; ic++) {
            this.colors.push(new GodStep.Color());
        }
        for(var p = 0; p< d.pc; p++) {
            this.params.push(0);
        }
        for(var s = 0; s < d.sc; s++) {
            this.states.push(state = new GodStep.State());
            state.pushValues(values, sl);
            values.splice(0, sl);
        }
    }
};
pro.getData = function() {
    var d = {};
    d.name = this.name;
    d.passes = [];
    d.values = this.getAllValues();
    d.sc = this.states.length;
    d.cc = this.colors.length;
    d.dc = this.points.length;
    d.pc = this.params.length;
    for(var i = 0; i<this.passes.length; i++) {
        var passData = this.passes[i].getData();
        d.passes.push(passData);
    }

    return d;
};
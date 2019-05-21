LQ.Pass = function(n, params, passes) {
    this.n = n;
    this.params = params;
    switch (n) {
        case LQ.PASS_LOOP:
            this.loops = params[0];
            this.passes = passes;
            break;
    }
}; extend(LQ.Pass, Object);

LQ.PASS_CLEAR = 'c';
LQ.PASS_LOOP = 'l';
LQ.PASS_DRAW = 'dr';
LQ.PASS_CIRCLE = 'cr';
LQ.PASS_FILL = 'f';

LQ.Pass.parse = function(d) {
    var passes = [];
    if(d.ps) {
        for(var i = 0; i< d.ps.length; i++) {
            passes.push(LQ.Pass.parse(d.ps[i]));
        }
    }
    return new LQ.Pass(d.n, d.p, passes.length > 0 ? passes : null);
};
pro.getData = function() {
    var passData = {};
        passData.n = this.n;
        passData.p = this.params;

    if(this.passes) {
        passData.ps = [];
        for(var i = 0; i<this.passes.length; i++) {
            passData.ps.push(this.passes[i].getData());
        }
    }
    return passData;
};
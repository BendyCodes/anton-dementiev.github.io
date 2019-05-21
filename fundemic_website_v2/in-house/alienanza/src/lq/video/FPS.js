GodStep.FPS = function(soul, color, alpha, x, y) {
    GodStep.Frame.call(this, 'FPS', soul.W, soul.H);
    this.size = 20;// * soul.startS;
    this.addChild(this.text = new GodStep.Text('0', this.size, 'Arial', 'left', color || 0x000000));
    this.startTime = Date.now();
    this.addString((soul.CANVAS) ? 'C' : 'W');
    this.alpha = alpha;
    this.soul = soul;
    this.prevTime = this.startTime;
    this.msMin = Infinity;
    this.msMax = 0;
    this.fpsMin = Infinity;
    this.fpsMax = 0;
    this.frames = 0;
    this.lastValue = 0;
    this.dx = x || 0;
    this.dy = y || 0;
    if(alpha == 0) this.visible = false;
};
extend(GodStep.FPS, GodStep.Frame);
pro.addString = function(v) {
   this.plusString = v;
};
pro.end = function() {
    var time = Date.now();

    var ms = time - this.startTime;
    this.msMin = Math.min( this.msMin, ms );
    this.msMax = Math.max( this.msMax, ms );

    if ( time > this.prevTime + 100) {

        var fps = Math.round( ( this.frames * 1000 ) / ( time - this.prevTime ) );
        this.lastValue += (fps - this.lastValue) *.5;
        this.fpsMin = Math.min( this.fpsMin, this.lastValue );
        this.fpsMax = Math.max( this.fpsMax, this.lastValue );

        this.text.setText(Math.round(this.lastValue) + " " + this.plusString);// + ' FPS (' + this.fpsMin + '-' + this.fpsMax + ')');

        this.prevTime = time;
        this.frames = 0;
    }
    this.frames++;

};
pro.begin = function() {
    this.startTime = Date.now();
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = 1;
        this.text.updateText();
        this.y = this.soul.H - this.text.height + (this.soul.OH - this.soul.H) + this.soul.H * .015 * this.soul.startS + this.dy;
        this.x = this.soul.W * .02 * this.soul.startS + this.dx;
    }
});
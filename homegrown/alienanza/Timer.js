AZ.Timer = function(S,x ,y) {
    GodStep.Frame.call(this, 'timer');

    this.addChild(this.back = new AZ.Img('timer_back', S, 0, 0,.5));
    this.createGraphics();

    this.maska = this.createGraphics('maska');
    this.graphics.mask = this.maska;
        this.addChild(this.arrow = new AZ.Img('timer_arrow', S, 0, 0, new PIXI.Point(0,.5)));
    this.arrow.rotation = - Math.PI/2;
    this.time = 0;

    var radius = this.back.width*.25;
    this.maska.beginFill(0);
    this.maska.drawCircle(this.arrow.x, this.arrow.y, radius *.9);
    this.maska.endFill();
    this.x = x;
    this.y = y;
};

extend(AZ.Timer, GodStep.Frame);

pro.update = function() {
    if(this.isStarted) {
        this.time += 0.005;

        var g = this.graphics;
        g.clear();
        g.beginFill(0x00ff00, 1);

        var radius = this.back.width*.4;

        g.moveTo(this.arrow.x, this.arrow.y);
        g.lineTo(this.arrow.x, this.arrow.y - radius);
        var c = 15;
        for(var i =0; i<=c; i++) {
            var a = -this.time/c * i * Math.PI*2 + Math.PI;
            g.lineTo(this.arrow.x + radius * Math.sin(a), this.arrow.y + radius * Math.cos(a));

        }
        if(this.time > 1) {
            this.isStarted = false;
            this.isFinished = true;
        }
        this.arrow.rotation = this.time * Math.PI*2 - Math.PI/2;
    }
};
pro.start = function() {
    this.isFinished = false;
    this.isStarted = true;
    this.graphics.clear();
    this.time = 0;
    this.arrow.rotation = - Math.PI/2;
};
pro.init = function() {
    this.time = 0;
    this.isFinished = false;
    this.isStarted = false;
    this.graphics.clear();
    this.arrow.rotation = - Math.PI/2;
};
Games.Transmission = function(soul, speed, color) {
    this.soul = soul;
    this.color = color || GodStep.COLOR_STAGE;
    GodStep.Frame.call(this, 'Transmission', soul.SW, soul.SH);
    this.startS = this.soul.startS;
    this.create();
    this.timerCache = -1;
    this.speed = speed || 0.1;
    this.cacheAsBitmap = true;
    this.visible = false;
    this.graphics.scale.y = this.graphics.oS = this.soul.SH/this.graphics.height * soul.assets.Scale;

};
extend(Games.Transmission, GodStep.Frame);

pro.create = function() {
    this.createGraphics();
    this.rect(this.W, this.H, this.color, 1, 0, 0);
};
pro.start = function(screenArr, outScreen) {
    if(!this.isStarted) {
        this.screens = screenArr;
        this.outScreen = outScreen;
        this.isStarted = true;
        this.isGoesUp = true;
        this.alpha = 0;
        this.visible = true;
    }
};
pro.update = function() {
    if(this.timerCache-- == 0) {
        this.timerCache = -1;
        var vis = this.visible;
        var a = this.alpha;
        this.cacheAsBitmap = false;
        this.visible = true;
        this.alpha = 1;
        this.cacheAsBitmap = true;
        this.visible = vis;
        this.alpha = a;
    }
    if(this.isStarted) {
        if(this.isGoesUp) {
            this.alpha += this.speed ;
            if(this.alpha > 1) {
                this.alpha = 1;
                this.isGoesUp = false;
                if(this.outScreen.isOnlyOneView) {
                    this.outScreen.destrukt();
                }
                this.outScreen.visible = false;
                for(var s in this.screens) {
                    this.screens[s].init();
                }
            }
        } else {
            this.alpha -= this.speed ;
            if(this.alpha <= 0) {
                this.alpha = 0;
                this.visible = false;
                this.isStarted = false;
            }
        }

    }
};
pro.reskin = function(c) {
    this.cacheAsBitmap = false;
    var vis = this.visible;
    this.visible = true;
    var a = this.alpha;
    this.alpha = 1;
    this.graphics.clear();
    this.rect(this.W, this.H, c, 1, 0, 0);
    this.cacheAsBitmap = true;
    this.visible = vis;
    this.alpha = a;
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.cacheAsBitmap = false;
        this.graphics.y = -(this.soul.OH - this.soul.H)/2 / value;

        if(this.soul.FULLRESIZE) {
           this.graphics.y = this.graphics.x = 0;
        }
        this.graphics.scale.y = this.graphics.oS * this.soul.OH/this.soul.H;
        this.graphics.scale.x = this.graphics.oS * (this.soul.FULLRESIZE ?(this.soul.OW/this.soul.W) : 1);
    }
});
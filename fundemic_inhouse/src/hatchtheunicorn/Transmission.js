HTU.Transmission = function(soul) {
    this.soul = soul;
    Games.Transmission.call(this, soul,.02);

};

extend(HTU.Transmission, Games.Transmission);
pro.create = function() {
    this.addChild(this.graphics = new Games.Img('rainbow', this.soul.startS, this.W *.5, 0 ,new PIXI.Point(0.5,.0)));
    this.graphics.scale.x = this.W/ this.graphics.texture.width;
};
pro.start = function(screenArr, outScreen) {
    if(!this.isStarted) {
        this.screens = screenArr;
        this.outScreen = outScreen;
        this.isStarted = true;
        this.isGoesUp = true;
        this.graphics.y = - (this.soul.OH - this.soul.H) * .5 - this.soul.OH * 1.3;
        this.visible = true;
    }
};
pro.update = function() {
    if(this.timerCache-- == 0) {
        this.timerCache = -1;
      //`  this.reCache();
    }
    if(this.isStarted) {
        this.graphics.y+=100 * this.startS;

        if(this.isGoesUp) {
            if( this.graphics.y > -(this.soul.OH - this.soul.H) - this.soul.H * .1) {
                this.alpha = 1;
                this.isGoesUp = false;
                this.outScreen.visible = false;
                if(this.outScreen.isDelete) {
                    this.soul.delFrame(this.outScreen);
                }
                for(var s in this.screens) {
                    this.screens[s].init();
                }
            }
        } else {
          //  this.alpha -= this.speed ;
            if(this.graphics.y > this.soul.OH * 1) {
                this.visible = false;
                this.isStarted = false;


            }
        }


    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = value;
        this.cacheAsBitmap = false;
        this.timerCache = 25;
        this.graphics.scale.y = this.soul.OH/this.graphics.texture.height * 1.3;
    }
});
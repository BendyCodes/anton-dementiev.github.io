AG.Transmission = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'Transmission', soul.W, soul.H);
    this.addChild(this.back = new AG.Back(soul, 'menu_3', 0xaaaaaa));
    this.cacheAsBitmap = true;
    this.back.timerCache = -1;
};
extend(AG.Transmission, GodStep.Frame);

pro.start = function(screenArr, outScreen) {
    if(!this.isStarted) {
        this.screens = screenArr;
        this.outScreen = outScreen;
        for(var i = 0; i<screenArr.length; i++) {
            screenArr[i].visible = true;
           // screenArr[i].cacheAsBitmap = true;
            screenArr[i].visible = false;
        }
       // outScreen.cacheAsBitmap = true;
        this.isStarted = true;
        this.isGoesUp = true;
        this.alpha = 0;
        this.visible = true;
    }
};
pro.update = function() {
    if(this.back.timerCache-- == 0) {
        this.back.timerCache = -1;
        var vis = this.visible;
        var a = this.alpha;
        this.cacheAsBitmap = false;
        this.alpha = 1;
        this.visible = true;
        this.cacheAsBitmap = true;
        this.visible = vis;
        this.alpha = a;
    } else {
        if(this.back.timerCache < -10) {
            this.back.timerCache = -10;
        }
    }
    if(this.isStarted) {
        if(this.isGoesUp) {
            this.alpha += 0.1;
            if(this.alpha > 1) {
                this.alpha = 1;
                this.isGoesUp = false;
                this.outScreen.visible = false;
                for(var s in this.screens) {
                    this.screens[s].cacheAsBitmap = false;
                    this.screens[s].init();
                 //   this.screens[s].cacheAsBitmap = true;
                }

            }
        } else {
            this.alpha -= 0.1;
            if(this.alpha <= 0) {
                this.alpha = 0;
                for(var ss in this.screens) {
                    this.screens[ss].cacheAsBitmap = false;
                }
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
        this.scale.x = this.scale.y = value;
        this.cacheAsBitmap = false;
        this.back.Scale = value;
        this.back.timerCache = 37;
    }
});
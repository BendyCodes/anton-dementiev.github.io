AZ.Transmission = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'Transmission', soul.W, soul.H);
    this.createGraphics();
    this.rect(soul.W, soul.H, GodStep.COLOR_STAGE , 1, 0, 0);
};
extend(AZ.Transmission, GodStep.Frame);

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
    if(this.isStarted) {
        if(this.isGoesUp) {
            this.alpha += 0.1;
            if(this.alpha > 1) {
                this.alpha = 1;
                this.isGoesUp = false;
                for(var s in this.screens) {
                    this.screens[s].init();
                }
                this.outScreen.visible = false;
            }
        } else {
            this.alpha -= 0.1;
            if(this.alpha <= 0) {
                this.alpha = 0;
                this.visible = false;
                this.isStarted = false;
            }
        }

    }
};
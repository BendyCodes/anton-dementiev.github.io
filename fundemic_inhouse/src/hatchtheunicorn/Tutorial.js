HTU.Tutorial = function(soul) {
    this.soul = soul;
    this.isNotSlided = true;
    GodStep.Frame.call(this, 'Tutorial', soul.SW, soul.SH);
    GodStep.IDownUp.call(this, this.W, this.H);

    var s = this.startS = soul.startS * HTU.SCALE;
   this.timerCache = -1; //this.cacheAsBitmap = true;

    this.addChild(this.slide1 = new Games.Img('slide1', s * 2, this.W *.5, this.H *.5, new PIXI.Point(0.5,.65)));
    this.addChild(this.slide2 = new Games.Img('slide2', s * 2, this.W *.5, this.H *.5, new PIXI.Point(0.5,.65)));

    this.addChild(this.b_continue = new HTU.Button('button_01', s, 18, 4, 5, this.W *.5, this.H*.83,.5));

    this.slide1vis = true;
    this.slide2.alpha = 0;
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    addEvent(this.b_continue, GodStep.FRAME_DOWN, this.h_button);
    this.visible = false;
};
extend(HTU.Tutorial, GodStep.Frame);

pro.init = function() {
    this.visible = true;
    this.soul.background.setState(0);

};

pro.update = function() {
    if(this.visible) {
        if(this.slide1vis) {
            this.slide1.alpha +=(1 - this.slide1.alpha) * .1;
            this.slide2.alpha +=(0 - this.slide2.alpha) * .15;
            this.slide1.x += (this.W *.5 - this.slide1.x) * .051;
            this.slide2.x += (this.W *.35 - this.slide2.x) * .1;
        } else {
            this.slide2.alpha +=(1 - this.slide2.alpha) * .1;
            this.slide1.alpha +=(0 - this.slide1.alpha) * .15;
            this.slide2.x += (this.W *.5 - this.slide2.x) * .051;
            this.slide1.x += (this.W *.35 - this.slide1.x) * .1;

        }

        this.b_continue.play();
        if(this.b_continue.isPushed) {
            if(this.b_continue.currentFrame == 1) {
                this.b_continue.isPushed = false;
                this.soul.screenTo([this.soul.startmenu], this);
            }
        } else {
            if(this.b_continue.currentFrame == 9) {
                this.b_continue.currentFrame =-1;
            }
        }

        if( this.timerCache-- == 0) {
            this.timerCache = -1;
        }
    }

};

pro.h_button = function(e) {
    var t = e.target;
    var p = t.parent;
    var s = p.soul;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            switch (t) {
                case p.b_continue:

                    if(t.parent.isNotSlided) {
                        t.parent.isNotSlided = false;
                        GodStep.playSound('slide', 0, HTU.SOUND);
                        GodStep.playSound('button', 0, HTU.SOUND);

                        if(t.parent.slide1vis) {
                            t.parent.slide2.alpha = 0;
                            t.parent.slide2.x = t.parent.W * .65;
                            t.parent.slide1vis = false;
                        } else {
                            t.parent.slide1.alpha = 0;
                            t.parent.slide1.x = t.parent.W *.65;
                            t.parent.slide1vis = true;
                        }
                        return;
                    }
                    GodStep.playSound('button', 0, HTU.SOUND);

                    t.isPushed = true;
                    t.setToFrame(11);
                    break;
            }
            break;
    }
};
pro.h_mouse = function(e) {
    if(e.content.target) {
        if(e.content.target.soul) {
            var t = e.content.target;
            var p = e.content.getLocalPosition(t.parent);
            if(p.y < t.H * .7) {
                GodStep.playSound('slide', 0, HTU.SOUND);

                if(t.slide1vis) {
                    t.slide2.alpha = 0;
                    t.slide2.x = t.W * .65;
                    t.slide1vis = false;
                    t.isNotSlided = false;
                } else {
                    t.slide1.alpha = 0;
                    t.slide1.x = t.W *.65;
                    t.slide1vis = true;
                }
            }
        }
    }
};
pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};


Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.cacheAsBitmap = false;
        //this.timerCache = 25;
    }
});
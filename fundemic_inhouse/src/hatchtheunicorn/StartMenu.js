HTU.StartMenu = function(soul) {
    this.soul = soul;
    this.firstStart = true;
    GodStep.Frame.call(this, 'StartMenu', soul.SW, soul.SH);
    GodStep.IDownUp.call(this, soul.SW, soul.SH);
    var s = this.startS = soul.startS * HTU.SCALE;

    this.addChild(this.logo = new Games.Img('logo', s * 2, this.W *.5, this.H *.272,.5));
    this.addChild(this.b_play = new HTU.Button('button_01', s, 18, 4, 5, this.W *.5, this.H*.67,.5));

    this.addChild(this.b_more = new HTU.Button('button_03', s, 8, 4, 2, this.W *.26, this.H*.84,.5));
    this.addChild(this.b_settings = new HTU.Button('button_04', s, 8, 4, 2, this.W *.74, this.H*.84,.5));

    addEvent(this.b_more, GodStep.FRAME_DOWN, this.h_button);
    addEvent(this.b_settings, GodStep.FRAME_DOWN, this.h_button);
    addEvent(this.b_play, GodStep.FRAME_DOWN, this.h_button);

    //   this.cacheAsBitmap = true;
    this.visible = false;

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(HTU.StartMenu, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
        if(this.timerCache-- == 0) {
            this.timerCache = -1;
          //  this.cacheAsBitmap = true;
        }
        if(this.b_settings.isPushed) {
            this.b_settings.play();
            if(this.b_settings.currentFrame == 7) {
                this.soul.screenTo([this.soul.settings], this);
                this.b_settings.isPushed = false;  this.b_settings.setToFrame(0);
            }
        }
        if(this.b_more.isPushed) {
            this.b_more.play();
            if(this.b_more.currentFrame == 7) {
                this.b_more.isPushed = false;  this.b_more.setToFrame(0);
            }
        }
        this.b_play.play();
        if(this.b_play.isPushed) {
            if(this.b_play.currentFrame == 1) {
                this.soul.screenTo([this.soul.gameplay], this);
                this.b_play.isPushed = false;
            }
        } else {
            if(this.b_play.currentFrame == 9) {
                this.b_play.currentFrame =-1;
            }
        }
    }
};

pro.init = function() {
    this.visible = true;
    this.soul.background.setState(1);
};

// listeners
pro.h_mouse = function(e) {
    if(e.content.target) {
        var t = e.content.target;
        if(HTU.MUSIC && t.firstStart) {
            t.firstStart = false;
            createjs.Sound.stop();
            GodStep.playSound('1', null, HTU.MUSIC);
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
                case p.b_settings:
                    GodStep.playSound('button', 0, HTU.SOUND);

                    t.isPushed = true;
                    t.setToFrame(0);
                    break;
                case p.b_more:
                    GodStep.playSound('button', 0, HTU.SOUND);

                    t.isPushed = true;
                    t.setToFrame(0);
                    break;
                case p.b_play:
                    GodStep.playSound('button', 0, HTU.SOUND);

                    t.isPushed = true;
                    t.setToFrame(11);
                    break;
            }
            break;
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
        this.cacheAsBitmap = false;
        this.scale.x = this.scale.y = value;
        this.timerCache = 30;
    }
});
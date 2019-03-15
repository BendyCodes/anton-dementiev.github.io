HTU.Settings = function(soul) {
    this.soul = soul;

    GodStep.LFrame.call(this, soul, 'Settings');
    GodStep.IDownUp.call(this, this.W, this.H);

    var s = this.startS = soul.startS * HTU.SCALE;
    this.timerCache = -1;

    this.addChild(this.b_back = new HTU.Button('button_06', s, 8, 4, 2, this.W *.15, this.H*.13,.5));
    addEvent(this.b_back, GodStep.FRAME_DOWN, this.h_buttons);
    this.addChild(this.developed = new Games.Img('developed_by_fundemic', s * 1.5, this.W *.5, this.H *.7,.5));
    this.addChild(this.unicorn = new Games.Img('Unicorn_01', s * 1.5, this.W *.8, this.H , new PIXI.Point(.5, 1)));
    this.addChild(this.music = new Games.Img('Music', s * 1.3, this.W *.4, this.H *.35,.5));
    this.addChild(this.sound = new Games.Img('Sound', s * 1.3, this.W *.4, this.H *.5,.5));
    var ss = 1.3;
    this.addChild(this.musicb = new Games.Img('settings_03', s * ss, this.W *.7, this.H *.35,.5));
    this.addChild(this.soundb = new Games.Img('settings_03', s * ss, this.W *.7, this.H *.5,.5));
    this.s *= ss;
    this.addFrame(this.b_music_on = new Games.ImgButton('settings_02', this,  this.W *.7, this.H *.35));
    this.addFrame(this.b_music_off = new Games.ImgButton('settings_01', this, this.W *.7, this.H *.35));
    this.addFrame(this.b_sound_on = new Games.ImgButton('settings_02',  this,  this.W *.7, this.H *.5));
    this.addFrame(this.b_sound_off = new Games.ImgButton('settings_01',this,  this.W *.7, this.H *.5));
    this.s /= ss;

    addEvent(this.b_sound_off, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_on, Games.ImgButton.CLICK, this.h_buttons);

    this.b_music_off.visible =  this.b_sound_off.visible = false;
    this.visible = false;


    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(HTU.Settings, GodStep.Frame);
pro.update = function() {
    if(this.visible) {
        if( this.timerCache-- == 0) {
            this.timerCache = -1;
          //  this.cacheAsBitmap = true;
        }

        if(this.b_back.isPushed) {
            this.b_back.play();
            if(this.b_back.currentFrame == 7) {
                this.soul.screenTo([this.soul.startmenu], this);
                this.b_back.isPushed = false;  this.b_back.setToFrame(0);
            }
        }
    }

};

pro.init = function() {
    this.visible = true;
    this.soul.background.setState(0);
    this.b_music_on.visible = HTU.MUSIC;
    this.b_music_off.visible = !HTU.MUSIC;
    this.b_sound_on.visible = HTU.SOUND;
    this.b_sound_off.visible = !HTU.SOUND;
};


pro.h_mouse = function(e) {
    if(e.content.target) {
        if(e.content.target.soul) {
            var t = e.content.target;
            t.b_music_on.isDown = t.b_music_off.isDown = t.b_sound_on.isDown = t.b_sound_off.isDown = false;
            t.b_music_on.Scale = t.b_music_off.Scale =t.b_sound_on.Scale = t.b_sound_off.Scale = 1;
        }
    }
};
pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};

pro.h_buttons = function(e) {
    var t = e.target;
    var p = t.parent;
    switch (e.type) {
        case Games.ImgButton.CLICK:
            switch (t) {
                case p.b_music_on:
                    HTU.MUSIC = false;
                    GodStep.playSound('button', 0, HTU.SOUND);
                    if(createjs) {
                        if(createjs.Sound) createjs.Sound.stop();
                    }
                  //  GodStep.muteSound('1', 0);
                    p.b_music_on.visible = false;
                    p.b_music_off.visible = true;
                    break;
                case p.b_music_off:
                    HTU.MUSIC = true;
                    GodStep.playSound('button', 0, HTU.SOUND);
                  //  GodStep.muteSound('1', 1);
                    GodStep.playSound('1', null, HTU.MUSIC);

                    p.b_music_on.visible = true;
                    p.b_music_off.visible = false;
                    break;
                case p.b_sound_on:
                    HTU.SOUND = false;
                    GodStep.playSound('button', 0, HTU.SOUND);
                    p.b_sound_on.visible = false;
                    p.b_sound_off.visible = true;
                    break;
                case p.b_sound_off:
                    HTU.SOUND = true;
                    GodStep.playSound('button', 0, HTU.SOUND);
                    p.b_sound_on.visible = true;
                    p.b_sound_off.visible = false;
                    break;
            }
            break;

        case GodStep.FRAME_DOWN:
            switch (t) {
                case p.b_back:
                    t.isPushed = true;
                    GodStep.playSound('button', 0, HTU.SOUND);
                    t.setToFrame(0);
                    break;
            }
            break;
    }
    p.soul.savePlayer();
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.b_back.y = (this.soul.H - this.soul.OH)*.5/value + this.soul.H * .14/value;
        this.scale.x = this.scale.y = value;
        this.cacheAsBitmap = false;
        this.timerCache = 36;

        this.unicorn.y = this.soul.OH / value + (this.soul.H - this.soul.OH)*.5/value ;
    }
});
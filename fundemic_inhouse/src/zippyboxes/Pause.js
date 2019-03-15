PS.Pause = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Pause', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addChild(this.back = new PS.Background(this, 'options_background'));
    this.addChild(this.field = new PS.Img('field', S, this.W *.5, this.H *.5,.5));
    this.addChild(this.header = new PS.Img('field_pause', S, this.W *.5, this.H *.12, new PIXI.Point(.5,.5)));
    this.addChild(this.musicLabel = new PS.Img('music', S, this.W *.25, this.H *.555,.5));
    this.addChild(this.soundLabel = new PS.Img('sound', S, this.W *.25, this.H *.34,.5));
    var oText = PS.S('Pause'); var c = Math.min(1, 7/oText.length);
    this.addChild(this.optLabel = new PS.Text(oText, 250 * S * c, this.W *.36, this.H *.2 + this.H *.15 * (1-c), 'left', 0xffffff));
    var on = PS.S('on'); c = Math.min(1, 3/on.length);
    this.addChild(this.musicLabel = new PS.Text(on,250 * S * c, this.W *.44, this.H *.58 - this.musicLabel.height/2, 'left', 0xffffff));
    this.addChild(this.soundLabel = new PS.Text(on,250 * S * c, this.W *.44, this.H *.36 - this.soundLabel.height/2, 'left', 0xffffff));

    this.soundLabel.updateText();
    this.musicLabel.updateText();
    this.soundLabel.x = (this.W - this.soundLabel.width)/2;
    this.musicLabel.x = (this.W - this.musicLabel.width)/2;

    this.addChild(this.b_music_on = new PS.ImgButton('button_on', S, this.W *.74, this.H *.555));
    this.addChild(this.b_music_off = new PS.ImgButton('button_off', S, this.W *.74, this.H *.555));
    this.addChild(this.b_sound_on = new PS.ImgButton('button_on', S, this.W *.74, this.H *.34));
    this.addChild(this.b_sound_off = new PS.ImgButton('button_off', S, this.W *.74, this.H *.34));

    this.b_music_off.downScale =
        this.b_sound_on.downScale =
            this.b_music_on.downScale =
                this.b_sound_off.downScale = 1;

    var dev = PS.S('developed'); c = Math.min(1, 21/dev.length);

    this.addChild(this.b_back = new PS.ImgButton('back', S, this.W *.13, this.H *.12));
    this.addChild(this.b_menu = new PS.ImgButton('b_menu', S, this.W *.87, this.H *.12));
    this.addChild(this.b_developer = new PS.ImgButton('button_developed', S, this.W *.5, this.H *.8, dev, 109 * S * c, 0, this.H *.01));

    this.addFrame(this.b_clear = new PS.TextButton('clear data', 35, 0x562466, this, S, soul.W *.5, soul.H *.1));
    this.b_clear.visible = false;
    this.visible = false;

    this.b_sound_off.visible = this.b_music_off.visible = false;
    addEvent(this.b_sound_on, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_on, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_menu, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_clear, PS.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PS.Pause, GodStep.Frame);

pro.init = function() {
    this.visible = true;
    this.b_music_off.visible = !PS.MUSIC;
    this.b_music_on.visible = PS.MUSIC;
    this.b_sound_off.visible = !PS.SOUND;
    this.b_sound_on.visible = PS.SOUND;

    if(PS.MUSIC) {
        this.musicLabel.setText(PS.S('on'));this.musicLabel.updateText();
    } else {
        this.musicLabel.setText(PS.S('off'));this.musicLabel.updateText();
    }
    if(PS.SOUND) {
        this.soundLabel.setText(PS.S('on'));this.soundLabel.updateText();
    } else {
        this.soundLabel.setText(PS.S('off'));this.soundLabel.updateText();
    }
};

pro.h_mouse = function(e) {
    if(e.target.soul) {
        var t = e.target;
        t.b_back.isDown = t.b_developer.isDown = t.b_clear.isDown = t.b_back.isDown = false;
        t.b_back.Scale = t.b_developer.Scale = t.b_clear.Scale = t.b_back.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_developer:
            break;
        case p.b_music_on:

            PS.MUSIC = false;
            GodStep.playSound('button', 0, PS.SOUND);
            //    GodStep.muteSound('theme2', 0);
            if(createjs) {
                if(createjs.Sound) createjs.Sound.stop();
            }

            p.b_music_on.visible = false;
            p.b_music_off.visible = true;
            p.musicLabel.setText(PS.S('off'));p.musicLabel.updateText();
            p.musicLabel.x = (p.W - p.musicLabel.width)/2;

            break;
        case p.b_music_off:
            PS.MUSIC = true;
            GodStep.playSound('button', 0, PS.SOUND);
            //GodStep.muteSound('theme2', 1);
            GodStep.playSound('theme2', null, PS.MUSIC);


            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            p.musicLabel.setText(PS.S('on')); p.musicLabel.updateText();
            p.musicLabel.x = (p.W - p.musicLabel.width)/2;

            break;
        case p.b_sound_on:
            PS.SOUND = false;

            GodStep.playSound('button', 0, PS.SOUND);
            p.b_sound_on.visible = false;
            p.b_sound_off.visible = true;
            p.soundLabel.setText(PS.S('off')); p.soundLabel.updateText();
            p.soundLabel.x = (p.W - p.soundLabel.width)/2;
            break;
        case p.b_sound_off:
            PS.SOUND = true;
            GodStep.playSound('button', 0, PS.SOUND);

            p.b_sound_on.visible = true;
            p.b_sound_off.visible = false;
            p.soundLabel.setText(PS.S('on')); p.soundLabel.updateText();
            p.soundLabel.x = (p.W - p.soundLabel.width)/2;

            break;
        case p.b_clear:
            GodStep.Clear(p.soul.playerDATA);
            break;
        case p.b_menu:
            GodStep.playSound('button', 0, PS.SOUND);
            s.screenTo([s.levelselect], p.parent);

            break;
        case p.b_back:
            GodStep.playSound('button', 0, PS.SOUND);
            p.visible = false;
            break;
    }
    p.soul.savePlayer();
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = 1;
        this.header.y = this.optLabel.y = this.b_menu.y = this.b_back.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .1 / value;
        this.optLabel.y += -this.soul.H * .015 / value - this.optLabel.height/2;
        this.back.rescale(value);
    }
});
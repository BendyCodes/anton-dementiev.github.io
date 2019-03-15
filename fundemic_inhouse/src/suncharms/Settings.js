M3.Settings = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Settings', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addChild(this.back = new M3.Background(this, 'back_o'));
    this.addChild(this.musicLabel = new M3.Img('icon_music', S, this.W *.23, this.H *.565,.5));
    this.addChild(this.soundLabel = new M3.Img('icon_sound', S, this.W *.23, this.H *.37,.5));
    this.addChild(this.pers = new M3.Img('pers_o', S, this.W *.23, this.H *.1,.5));
    this.addChild(this.optLabel = new M3.Text('OPTIONS',200 * S, this.W *.5, this.H *.2, 'left', 0xffffff));
    this.addChild(this.musicLabel = new M3.Text('ON',160 * S, this.W *.4, this.H *.48, 'left', 0xffffff));
    this.addChild(this.soundLabel = new M3.Text('ON',160 * S, this.W *.4, this.H *.29, 'left', 0xffffff));

    this.addChild(this.b_music_on = new M3.ImgButton('on', null, null, this, S, this.W *.72, this.H *.56));
    this.addChild(this.b_music_off = new M3.ImgButton('off', null, null, this, S, this.W *.72, this.H *.56));
    this.addChild(this.b_sound_on = new M3.ImgButton('on', null, null, this, S, this.W *.72, this.H *.37));
    this.addChild(this.b_sound_off = new M3.ImgButton('off',  null, null, this,S, this.W *.72, this.H *.37));
    this.addChild(this.b_back = new M3.ImgButton('b_back', 'b_shadow', 1, this, S, this.W *.85, this.H *.12));

    this.addChild(this.b_tutor_on = new M3.ImgButton('tutorial_on', null, null, this, S, this.W *.23, this.H *.75));
    this.addChild(this.b_tutor_off = new M3.ImgButton('tutorial_off', null, null, this, S, this.W *.23, this.H *.75));
    this.addChild(this.tutorLabel = new M3.Text('TUTORIAL ON', 120 * S, this.W *.35, this.H *.69, 'left', 0xffffff));

    this.b_tutor_on.scaleble = this.b_tutor_off.scaleble = this.b_music_off.scaleble =
    this.b_sound_on.scaleble =
    this.b_music_on.scaleble =
    this.b_sound_off.scaleble = false;

    this.visible = false;

    this.b_tutor_off.visible = this.b_sound_off.visible = this.b_music_off.visible = false;
    addEvent(this.b_tutor_on, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_tutor_off, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_on, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, M3.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.Settings, GodStep.Frame);

pro.init = function() {
    this.visible = true;
    this.b_music_off.visible = !M3.MUSIC;
    this.b_music_on.visible = M3.MUSIC;
    this.b_sound_off.visible = !M3.SOUND;
    this.b_sound_on.visible = M3.SOUND;

    if(M3.MUSIC) {
        this.musicLabel.setText('ON');this.musicLabel.updateText();
    } else {
        this.musicLabel.setText('OFF');this.musicLabel.updateText();
    }
    if(M3.SOUND) {
        this.soundLabel.setText('ON');this.soundLabel.updateText();
    } else {
        this.soundLabel.setText('OFF');this.soundLabel.updateText();
    }
    if(M3.TUTORIAL) {
        this.b_tutor_off.visible = false;
        this.b_tutor_on.visible = true;
        this.tutorLabel.setText('TUTORIAL ON');
    } else {
        this.b_tutor_on.visible = false;
        this.b_tutor_off.visible = true;
        this.tutorLabel.setText('TUTORIAL OFF');
    }
};

pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        t.b_back.isDown = false;
        t.b_back.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_tutor_off:
            p.b_tutor_off.visible = false;
            p.b_tutor_on.visible = true;
            p.tutorLabel.setText('TUTORIAL ON');
            M3.TUTORIAL = true;
            GodStep.playSound('button', 0, M3.SOUND);

            p.soul.savePlayer();
            break;
        case p.b_tutor_on:
            p.b_tutor_on.visible = false;
            p.b_tutor_off.visible = true;
            p.tutorLabel.setText('TUTORIAL OFF');
            M3.TUTORIAL = false;
            GodStep.playSound('button', 0, M3.SOUND);
            p.soul.savePlayer();
            break;
        case p.b_music_on:
            M3.MUSIC = false;
            GodStep.playSound('button', 0, M3.SOUND);

            GodStep.volumeSound('theme', M3.MUSIC);
            p.b_music_on.visible = false;
            p.b_music_off.visible = true;
            p.musicLabel.setText('OFF');
            p.soul.savePlayer();
            break;
        case p.b_music_off:
            M3.MUSIC = true;
            GodStep.volumeSound('theme', M3.MUSIC);

            GodStep.playSound('button', 0, M3.SOUND);
            GodStep.playSound('theme', null, M3.MUSIC);

            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            p.musicLabel.setText('ON');
            p.soul.savePlayer();
            break;
        case p.b_sound_on:
            M3.SOUND = false;
            GodStep.playSound('button', 0, M3.SOUND);

            GodStep.playSound('button', 0, M3.SOUND);
            p.b_sound_on.visible = false;
            p.b_sound_off.visible = true;
            p.soundLabel.setText('OFF');
            p.soul.savePlayer();
            break;
        case p.b_sound_off:
            M3.SOUND = true;
            GodStep.playSound('button', 0, M3.SOUND);

            p.b_sound_on.visible = true;
            p.b_sound_off.visible = false;
            p.soundLabel.setText('ON');
            p.soul.savePlayer();
            break;
        case p.b_back:
            GodStep.playSound('button', 0, M3.SOUND);
            s.screenTo([s.startmenu], p);
            p.soul.savePlayer();
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var dy = this.soul.OH - this.soul.H;
        this.scale.x = this.scale.y = value;
        this.optLabel.y = this.b_back.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .1 / value;
        this.optLabel.y -= this.soul.H * .07 / value;
        this.b_back.y = (this.soul.H * .88 + dy/2) / value;
        this.pers.y = (-dy/2 + this.soul.H *.12)/value;
        this.back.rescale(value);
    }
});
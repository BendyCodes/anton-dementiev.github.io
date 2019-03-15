AZ.Settings = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Settings', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = soul.startS;
    this.addChild(this.background = new AZ.Img('settings_back', S, 0, 0));
    this.addChild(this.background1 = new AZ.Img('back_pod', S, soul.W/2, soul.H *.32, 0.5));
    this.addChild(this.background2 = new AZ.Img('back_pod', S, soul.W/2, soul.H *.43, 0.5));
    this.addChild(this.background3 = new AZ.Img('back_pod', S, soul.W/2, soul.H *.58, 0.5));
    this.addChild(this.credits = new AZ.Img('credits', S, soul.W/2, soul.H *.625, 0.5));
    this.addChild(this.note = new AZ.Img('note', S, soul.W *.3, soul.H *.32, 0.5));
    this.addChild(this.rupor = new AZ.Img('rupor', S, soul.W*.29, soul.H *.43, 0.5));
    this.addChild(this.sound_off = new AZ.Img('sound_off', S, soul.W*.47, soul.H *.43, 0.5));
    this.addChild(this.sound_on = new AZ.Img('sound_on', S, soul.W*.47, soul.H *.43, 0.5));
    this.addChild(this.music_off = new AZ.Img('music_off', S, soul.W*.47, soul.H *.32, 0.5));
    this.addChild(this.music_on = new AZ.Img('music_on', S, soul.W*.47, soul.H  *.32, 0.5));


    this.addFrame(this.b_back = new AZ.ImgButton('back', this, S, soul.W/2, soul.H *.76));
    this.addFrame(this.b_music_off = new AZ.ImgButton('off', this, S, soul.W *.67, soul.H  *.32));
    this.addFrame(this.b_sound_off = new AZ.ImgButton('off', this, S, soul.W *.67, soul.H *.43));
    this.addFrame(this.b_music_on = new AZ.ImgButton('on', this, S, soul.W *.67, soul.H  *.32));
    this.addFrame(this.b_sound_on = new AZ.ImgButton('on', this, S, soul.W *.67, soul.H *.43));
    this.visible = false;


    addEvent(this.b_music_off, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_on, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, AZ.ImgButton.CLICK, this.h_buttons);


    addEvent(this, GodStep.FRAME_UP, this.h_mouse);

    this.loadSettings();

};
extend(AZ.Settings, GodStep.Frame);

pro.loadSettings = function() {
    this.b_sound_off.visible = false;
    this.b_music_off.visible = false;
};
pro.init = function() {
    this.visible = true;
    this.b_sound_on.visible = AZ.SOUND;
    this.b_sound_off.visible = !AZ.SOUND;
    this.sound_on.visible = AZ.SOUND;

    this.b_music_on.visible = AZ.MUSIC;
    this.b_music_off.visible = !AZ.MUSIC;
    this.music_on.visible = AZ.MUSIC;
};


pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        t.b_back.isDown =
        t.b_music_on.isDown =
            t.b_music_off.isDown =
            t.b_sound_off.isDown =
                t.b_sound_on.isDown = false;

        t.b_back.Scale =
        t.b_sound_off.Scale =
            t.b_music_on.Scale =
            t.b_sound_on.Scale =
                t.b_music_off.Scale = 1;
    }
};


pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_music_on:
            AZ.MUSIC = false;
            if(createjs) {
                if(createjs.Sound) createjs.Sound.stop();
            }

            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            p.b_music_on.visible = false;
            p.b_music_off.visible = true;
            p.music_on.visible = false;
            break;
        case p.b_music_off:
            AZ.MUSIC = true;
            GodStep.playSound('alienanza_main', -1, AZ.MUSIC);
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            p.music_on.visible = true;
            break;
        case p.b_sound_on:
            AZ.SOUND = false;
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            p.b_sound_on.visible = false;
            p.b_sound_off.visible = true;
            p.sound_on.visible = false;
            break;
        case p.b_sound_off:
            AZ.SOUND = true;
            createjs.Sound.setMute(!AZ.SOUND);
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            p.b_sound_on.visible = true;
            p.b_sound_off.visible = false;
            p.sound_on.visible = true;
            break;
        case p.b_back:
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            s.screenTo([s.startmenu], p);
            break;
    }
    p.soul.savePlayer();
};
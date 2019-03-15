M3.Pause = function(soul, gameplay) {
    this.soul = soul;

    this.gameplay = gameplay;
    GodStep.Frame.call(this, 'Pause', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addChild(this.back = new M3.Background(this, 'back_pause'));

 //   this.addChild(this.field = new M3.Img('field_end', S, this.W *.5, this.H *.6,.5));

    this.addChild(this.field1 = new M3.Img('field_pause', S, this.W *.5, this.H *.2,.5));
    this.addChild(this.field2 = new M3.Img('field_pause_2', S, this.W *.5, this.H *.76,.5));
    this.addChild(this.pers = new M3.Img('pers_p_1', S, this.W *.2, this.H *.1,.5));
    this.addChild(this.pers2 = new M3.Img('pers_p_2', S, this.W *.8, this.H *.1,.5));

    this.addChild(this.b_back = new M3.ImgButton('b_back_p', 'b_shadow_p', 1, this, S, this.W *.25, this.H *.38));
    this.addChild(this.b_menu = new M3.ImgButton('b_menu_p', 'b_shadow_p', 1, this, S, this.W *.5, this.H *.38));
    this.addChild(this.b_replay = new M3.ImgButton('b_replay_p', 'b_shadow_p', 1, this, S, this.W *.75, this.H *.38));

    var dy = this.H * .31;
    this.addChild(this.musicLabel = new M3.Img('icon_music_p', S, this.W *.23, this.H *.525 + dy,.5));
    this.addChild(this.soundLabel = new M3.Img('icon_sound_p', S, this.W *.23, this.H *.37 + dy,.5));
    this.addChild(this.musicLabel = new M3.Text('ON',160 * S, this.W *.4, this.H *.44 + dy, 'left', 0xffffff));
    this.addChild(this.soundLabel = new M3.Text('ON',160 * S, this.W *.4, this.H *.29 + dy, 'left', 0xffffff));
    this.addChild(this.b_music_on = new M3.ImgButton('on_p', null, null, this, S, this.W *.72, this.H *.52 + dy));
    this.addChild(this.b_music_off = new M3.ImgButton('off_p', null, null, this, S, this.W *.72, this.H *.52 + dy));
    this.addChild(this.b_sound_on = new M3.ImgButton('on_p', null, null, this, S, this.W *.72, this.H *.37 + dy));
    this.addChild(this.b_sound_off = new M3.ImgButton('off_p',  null, null, this,S, this.W *.72, this.H *.37 + dy));

    this.addChild(this.pauseLabel = new M3.Text('PAUSE', 200 * S, this.W *.33, this.H *.2, 'left', 0xffffff));


    this.b_music_off.scaleble =
        this.b_sound_on.scaleble =
            this.b_music_on.scaleble =
                this.b_sound_off.scaleble = false;
     this.b_music_off.visible = false;
     this.b_sound_off.visible = false;

    addEvent(this.b_back, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_menu, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_replay, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_on, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.Pause, GodStep.Frame);

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

};

pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        t.b_replay.isDown = false;
        t.b_menu.isDown = false;
        t.b_back.isDown = false;
        t.b_menu.Scale = 1;
        t.b_replay.Scale = 1;
        t.b_back.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_back:
            p.visible = false;
            GodStep.playSound('button', 0, M3.SOUND);
            p.soul.savePlayer();
            break;
        case p.b_menu:
            s.screenTo([s.levelselect], p.gameplay);
            GodStep.volumeSound('theme',  0);
            GodStep.playSound('button', 0, M3.SOUND);
            p.soul.savePlayer();
            break;
        case p.b_replay:
            GodStep.playSound('button', 0, M3.SOUND);

            s.screenTo([s.gameplay], p.gameplay);
            p.soul.savePlayer();
            break;
        case p.b_music_on:
            M3.MUSIC = false;
            //    GodStep.playSound('button', 0, M3.SOUND);
            //    GodStep.muteSound('theme2', 0);
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
            //GodStep.muteSound('theme2', 1);
            GodStep.playSound('theme', null, M3.MUSIC);
            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            p.musicLabel.setText('ON');
            p.soul.savePlayer();
            break;
        case p.b_sound_on:
            M3.SOUND = false;
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
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var dy = this.soul.OH - this.soul.H;
        this.back.rescale(value);
        this.pers2.y = this.pers.y = (-dy/2 + this.soul.H *.13)/value;
        this.pauseLabel.y =  (-dy/2 + this.soul.H *.03)/value;
        this.field1.y =  (-dy/2 + this.soul.H *.13)/value;
    }
});
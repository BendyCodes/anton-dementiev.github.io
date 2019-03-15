SS.Settings = function(soul) {
    GodStep.LFrame.call(this, soul, 'Settings');
    GodStep.IDownUp.call(this, this.W, this.H);

    this.addChild(this.back = new SS.Background(this, 'back'));
    this.addChild(this.top = new SS.Background(this, 'back_up'));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());

    this.container.addChild(this.field = new SS.Img('field', this.s, this.W *.5, this.H *.5,.5));
    this.container.addChild(this.b_back = new SS.ImgButton('button_back', this, this.W *.5, this.H *.87));
    this.container.addChild(this.b_sound = new SS.ImgButton('button_sound', this, this.W *.28, this.H *.36));
    this.container.addChild(this.b_music = new SS.ImgButton('button_music', this, this.W *.28, this.H *.54));

    this.container.addChild(this.b_progress = new SS.ImgButton('button_progress', this, this.W *.5, this.H *.74, 'Reset progress', 100, 0, this.H *.02));

    this.container.addChild(this.options = new SS.Text('OPTIONS', (230) * this.s/ SS.SCALE, this.W *.243, this.H *.03, 'center', 0xFFCC66));this.options.alpha = .7;
    this.container.addChild(this.sound_label = new SS.Text('ON', (140) * this.s/ SS.SCALE, this.W *.402, this.H *.29, 'center', 0xA35200));
    this.container.addChild(this.music_label = new SS.Text('ON', (140) * this.s/ SS.SCALE, this.W *.402, this.H *.471, 'center', 0xA35200));

    this.sound_label.alpha = this.music_label.alpha = .6;

    this.container.addChild(this.b_music_off = new SS.ImgButton('slider_off', this, this.W *.7, this.H *.54));
    this.container.addChild(this.b_music_on = new SS.ImgButton('slider_on', this, this.W *.7, this.H *.54));
    this.container.addChild(this.b_sound_off = new SS.ImgButton('slider_off', this, this.W *.7, this.H *.36));
    this.container.addChild(this.b_sound_on = new SS.ImgButton('slider_on', this, this.W *.7, this.H *.36));

    this.b_music_off.visible = this.b_sound_off.visible = false;
    this.b_sound.scaleble = this.b_music.scaleble = this.b_sound_off.scaleble = this.b_sound_on.scaleble = this.b_music_off.scaleble = this.b_music_on.scaleble = false;

    this.addFrame(this.dialog = new SS.Dialog(this, 35));

    addEvent(this.b_music_on, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, Games.ImgButton.CLICK, this.h_buttons);

    addEvent(this.b_progress, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
};
extend(SS.Settings, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {

    }
};

pro.init = function() {
    this.visible = true;
    this.b_sound_on.visible = SS.SOUND;
    this.b_sound_off.visible = !SS.SOUND;
    this.b_music_on.visible = SS.MUSIC;
    this.b_music_off.visible = !SS.MUSIC;
};



pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;

    switch (t) {
        case p.b_progress:
            p.dialog.show('Delete save data?', p.h_dialog, p.h_dialog);
            break;
        case p.b_music_off:
            SS.MUSIC = true;
            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            p.music_label.setText('ON');
            break;
        case p.b_sound_off:
            SS.SOUND = true;
            p.b_sound_on.visible = true;
            p.b_sound_off.visible = false;
            p.sound_label.setText('ON');

            break;
        case p.b_music_on:
            SS.MUSIC = false;
            p.music_label.setText('OFF');

            p.b_music_on.visible = false;
            p.b_music_off.visible = true;
            if(createjs) {
                if(createjs.Sound) createjs.Sound.stop();
            }
            break;
        case p.b_sound_on:
            SS.SOUND = false;
            p.sound_label.setText('OFF');

            p.b_sound_on.visible = false;
            p.b_sound_off.visible = true;
            break;
        case p.b_back:
            s.screenTo([s.startmenu], p);
            break;
    }
    p.soul.savePlayer();
    GodStep.playSound('button', 0, SS.SOUND);
};

pro.h_dialog = function(e) {
    dialog.visible = false;
    GodStep.playSound('button', 0, SS.SOUND);

    if(this.isYes) {
        GodStep.Clear(SS.ChinUpShinUp.instance.PLAYER_SLOT);
        GodStep.Clear(SS.ChinUpShinUp.instance.SHOP_SLOT);
    }

};


Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.field.y = this.soul.H *.5/value;
        this.back.rescale(value);
        this.top.rescale(value);
    }
});
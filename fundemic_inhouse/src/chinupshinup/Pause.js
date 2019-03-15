SS.Pause = function(parent) {
    this.p = parent;
    this.soul = parent.soul;
    GodStep.LFrame.call(this, this.soul, 'Pause');
    GodStep.IDownUp.call(this, this.W, this.H);

    this.addChild(this.back = new SS.Background(this, 'back')); this.back.alpha = .5;
    this.addChild(this.top = new SS.Background(this, 'back_up'));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());

    this.container.addChild(this.field = new SS.Img('field', this.s, this.W *.5, this.H *.5,.5));
    this.container.addChild(this.b_back = new SS.ImgButton('button_back', this, this.W *.25, this.H *.8));
    this.container.addChild(this.b_menu = new SS.ImgButton('button_menu', this, this.W *.5, this.H *.8));
    this.container.addChild(this.b_replay = new SS.ImgButton('button_replay', this, this.W *.75, this.H *.8));
    this.container.addChild(this.b_sound = new SS.ImgButton('button_sound', this, this.W *.28, this.H *.36));
    this.container.addChild(this.b_music = new SS.ImgButton('button_music', this, this.W *.28, this.H *.54));

    this.container.addChild(this.options = new SS.Text('PAUSE', (230) * this.s/ SS.SCALE, this.W *.32, this.H *.03, 'center', 0xFFCC66));this.options.alpha = .7;
    this.container.addChild(this.sound_label = new SS.Text('ON', (140) * this.s/ SS.SCALE, this.W *.402, this.H *.29, 'center', 0xA35200));
    this.container.addChild(this.music_label = new SS.Text('ON', (140) * this.s/ SS.SCALE, this.W *.402, this.H *.471, 'center', 0xA35200));

    this.sound_label.alpha = this.music_label.alpha = .6;


    GodStep.IDownUp.call(this.back, parent.W, parent.H);
    this.back.hitArea = new PIXI.Rectangle(-parent.W/2 / parent.s, 0, parent.W / parent.s, parent.H / parent.s);

    this.container.addChild(this.b_music_off = new SS.ImgButton('slider_off', this, this.W *.7, this.H *.54));
    this.container.addChild(this.b_music_on = new SS.ImgButton('slider_on', this, this.W *.7, this.H *.54));
    this.container.addChild(this.b_sound_off = new SS.ImgButton('slider_off', this, this.W *.7, this.H *.36));
    this.container.addChild(this.b_sound_on = new SS.ImgButton('slider_on', this, this.W *.7, this.H *.36));
    this.b_music_off.visible = this.b_sound_off.visible = false;

    this.b_sound.scaleble = this.b_music.scaleble = this.b_sound_off.scaleble = this.b_sound_on.scaleble = this.b_music_off.scaleble = this.b_music_on.scaleble = false;

    addEvent(this.b_music_on, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, Games.ImgButton.CLICK, this.h_buttons);

    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_menu, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_replay, Games.ImgButton.CLICK, this.h_buttons);
};
extend(SS.Pause, GodStep.LFrame);

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

        case p.b_music_off:
            SS.MUSIC = true;
            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            p.music_label.setText('ON');
            GodStep.playSound('theme', -1, SS.MUSIC);
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
            if(createjs) {
                if(createjs.Sound) createjs.Sound.stop();
            }
            p.b_music_on.visible = false;
            p.b_music_off.visible = true;
            break;
        case p.b_sound_on:
            SS.SOUND = false;
            p.sound_label.setText('OFF');

            p.b_sound_on.visible = false;
            p.b_sound_off.visible = true;
            break;
        case p.b_replay:
            s.screenTo([s.gameplay], p.parent);
            break;
        case p.b_menu:
            s.screenTo([s.startmenu], p.parent);
            break;
        case p.b_back:
            p.visible = false;
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
        this.back.rescale(value);
        this.top.rescale(value);
    }
});
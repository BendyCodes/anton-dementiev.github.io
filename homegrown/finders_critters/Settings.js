PR.Settings = function(soul) {
    PR.TUTORIAL = true;
    GodStep.LFrame.call(this, soul, 'Settings');
    GodStep.IDownUp.call(this, this.W, this.H);
    this.addChild(this.back = new PR.Background(this, 'back_options'));

    this.addChild(this.top = new PIXI.DisplayObjectContainer());
    this.addChild(this.center = new PIXI.DisplayObjectContainer());
    this.top.addChild(this.b_back = new Games.ImgButton('b_back', this, this.W *.15, this.H *.1));
    this.top.addChild(this.label = new PR.Text(PR.S('options'), 170 * this.s, this.W *.3, this.H *.01, 'center', 0xffffff));
    this.center.addChild(this.b_music = new Games.ImgButton('slider_on', this, this.W *.6, this.H *.3));
    this.center.addChild(this.b_sound = new Games.ImgButton('slider_on', this, this.W *.6, this.H *.48));
    this.center.addChild(this.b_tutorial = new Games.ImgButton('tutorial_on', this, this.W *.36, this.H *.70));
    this.b_music.addChild(this.b_music.lab = new PR.Text(PR.S('on'), 140 * this.s,- this.W *.08, -this.H *.075, 'center', 0x0092e0));
    this.b_sound.addChild(this.b_sound.lab = new PR.Text(PR.S('on'), 140 * this.s,- this.W *.08, -this.H *.075, 'center', 0x0092e0));
    this.b_tutorial.addChild(this.b_tutorial.lab = new PR.Text(PR.S('tutorial'), 140 * this.s,- this.W *.12, -this.H *.075, 'center', 0x0092e0));
    this.center.addChild(this.b_music_img = new Games.Img('b_music', this.s, this.W *.25, this.H *.3,.5));
    this.center.addChild(this.b_sound_img = new Games.Img('b_sound', this.s, this.W *.25, this.H *.48,.5));
    this.center.addChild(this.b_tutor_pers = new Games.Img('pers_2o', this.s, this.W *.73, this.H *.81,.5));
    this.b_tutorial.phase = 0;
    this.b_tutorial.scaleble = this.b_music.scaleble = this.b_sound.scaleble = false;
    addEvent(this.b_music, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_tutorial, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse_up);
};
extend(PR.Settings, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {
        var s = this.soul;
        this.b_tutorial.phase += 0.025;
        this.b_tutorial.y += (this.H *.70 + Math.sin(this.b_tutorial.phase) *s.H * .01 - this.b_tutorial.y) * .3;

    }
};

pro.updateLabels = function() {
    this.b_music.lab.updateText();
    this.b_sound.lab.updateText();
    this.b_tutorial.lab.updateText();

    this.b_music.lab.x = -this.b_music.lab.width/2;
    this.b_sound.lab.x = -this.b_sound.lab.width/2;
    this.b_tutorial.lab.x = -this.b_tutorial.lab.width/2 + this.W *.05;
};
pro.init = function() {
    this.visible = true;
    this.b_tutorial.phase = 9;

    var p = this;

    if(!PR.MUSIC) {
        p.b_music.setTexture('slider_off');
        p.b_music.lab.tint = 0x2b6578;
        p.b_music.lab.setText(PR.S('off'));
    } else {
        p.b_music.setTexture('slider_on');
        p.b_music.lab.tint = 0x0092e0;
        p.b_music.lab.setText(PR.S('on'));
    }

    if(!PR.TUTORIAL) {
        p.b_tutorial.setTexture('tutorial_off');
        p.b_tutorial.lab.tint = 0x2b6578;
        p.b_tutor_pers.setTexture('pers_1o');
        p.b_tutorial.lab.updateText();
    } else {
        p.b_tutorial.setTexture('tutorial_on');
        p.b_tutorial.lab.tint = 0x0092e0;
        p.b_tutor_pers.setTexture('pers_2o');
        p.b_tutorial.lab.updateText();
    }

    if(!PR.SOUND) {
        p.b_sound.setTexture('slider_off');
        p.b_sound.lab.tint = 0x2b6578;
        p.b_sound.lab.setText(PR.S('off'));
    } else {
        p.b_sound.setTexture('slider_on');
        p.b_sound.lab.tint = 0x0092e0;
        p.b_sound.lab.setText(PR.S('on'));
    }
    this.updateLabels();
};


pro.h_mouse_up = function(e) {
    var t = e.content.target;
    t.b_back.isDown = false;
    t.b_back.Scale = 1;
};


pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, PR.SOUND);

    switch (t) {
        case p.b_tutorial:
            if(PR.TUTORIAL) {
                p.b_tutorial.setTexture('tutorial_off');
                p.b_tutorial.lab.tint = 0x2b6578;
                p.b_tutor_pers.setTexture('pers_1o');
            } else {
                p.b_tutorial.setTexture('tutorial_on');
                p.b_tutorial.lab.tint = 0x0092e0;
                p.b_tutor_pers.setTexture('pers_2o');
            }
            p.b_tutorial.lab.updateText();
            PR.TUTORIAL = !PR.TUTORIAL;
            p.soul.savePlayer();
            break;
        case p.b_music:
            if(PR.MUSIC) {
                p.b_music.setTexture('slider_off');
                p.b_music.lab.tint = 0x2b6578;
                p.b_music.lab.setText(PR.S('off'));
                GodStep.volumeSound('theme', !PR.MUSIC);

            } else {
                p.b_music.setTexture('slider_on');
                p.b_music.lab.tint = 0x0092e0;
                p.b_music.lab.setText(PR.S('on'));
                GodStep.volumeSound('theme', !PR.MUSIC);

            }
            p.b_music.lab.updateText();
            PR.MUSIC = !PR.MUSIC;
            p.soul.savePlayer();
            break;
        case p.b_sound:
            if(PR.SOUND) {
                p.b_sound.setTexture('slider_off');
                p.b_sound.lab.tint = 0x2b6578;
                p.b_sound.lab.setText(PR.S('off'));
            } else {
                p.b_sound.setTexture('slider_on');
                p.b_sound.lab.tint = 0x0092e0;
                p.b_sound.lab.setText(PR.S('on'));
            }
            p.b_sound.lab.updateText();
            PR.SOUND = !PR.SOUND;
            p.soul.savePlayer();
            break;
        case p.b_back:
            s.screenTo([s.startmenu], p);
            break;
    }

    p.updateLabels();
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var s = this.soul;
        this.back.rescale(value);
        this.scale.x = this.scale.y = value;
        this.top.y = -s.DOH/2/value;
    }
});
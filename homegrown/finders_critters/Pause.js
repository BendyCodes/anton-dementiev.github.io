PR.Pause = function(soul) {
    GodStep.LFrame.call(this, soul, 'Pause');
    this.addChild(this.back = new PR.Background(this, 'back_pause'));
    this.addChild(this.top = new PIXI.DisplayObjectContainer());

    this.top.addChild(this.field_button = new Games.Img('field_button', this.s, this.W *.5, this.H *.4,.5));
    this.top.addChild(this.label = new PR.Text(PR.S('pause'), 170 * this.s, this.W *.33, this.H *.01, 'center', 0xffffff));

    this.top.addChild(this.b_menu = new Games.ImgButton('b_menu', this, this.W *.5, this.H *.4,.5));
    this.top.addChild(this.b_back = new Games.ImgButton('b_back', this, this.W *.25, this.H *.4,.5));
    this.top.addChild(this.b_replay = new Games.ImgButton('b_replay', this, this.W *.75, this.H *.4,.5));
    this.top.addChild(this.pers1 = new GodStep.MovieClip(['pers_1', 'pers_1_0'], this.s, this.W *.15, this.H *.15,.5));
    this.top.addChild(this.pers2 = new GodStep.MovieClip(['pers_2', 'pers_2_0'], this.s, this.W *.85, this.H *.15,.5));
    this.top.addChild(this.b_music = new Games.ImgButton('slider_on_pause', this, this.W *.6, this.H *.66));
    this.top.addChild(this.b_sound = new Games.ImgButton('slider_on_pause', this, this.W *.6, this.H *.84));
    this.top.addChild(this.b_music_img = new Games.Img('b_music', this.s, this.W *.25, this.H *.66,.5));
    this.top.addChild(this.b_sound_img = new Games.Img('b_sound', this.s, this.W *.25, this.H *.84,.5));
    this.b_music.scaleble = this.b_sound.scaleble = false;
    this.b_music.addChild(this.b_music.lab = new PR.Text('ON', 140 * this.s,- this.W *.08, -this.H *.075, 'center', 0x007ec2));
    this.b_sound.addChild(this.b_sound.lab = new PR.Text('ON', 140 * this.s,- this.W *.08, -this.H *.075, 'center', 0x007ec2));


    this.pers1.animTime =  100;
    this.pers2.animTime = 111;
    this.pers2.animTimer = 66;

    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_menu, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_replay, Games.ImgButton.CLICK, this.h_buttons);

    addEvent(this.b_music, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound, Games.ImgButton.CLICK, this.h_buttons);
};
extend(PR.Pause, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {
        this.pers1.animate();
        this.pers2.animate();
    }
};

pro.updateLabels = function() {
    this.b_music.lab.updateText();
    this.b_sound.lab.updateText();

    this.b_music.lab.x = -this.b_music.lab.width/2;
    this.b_sound.lab.x = -this.b_sound.lab.width/2;
};
pro.init = function() {
    this.visible = true;
    var p = this;
    if(!PR.SOUND) {
        p.b_sound.setTexture('slider_off_pause');
        p.b_sound.lab.tint = 0x122b33;
        p.b_sound.lab.setText(PR.S('off'));
    } else {
        p.b_sound.setTexture('slider_on_pause');
        p.b_sound.lab.tint = 0x0092e0;
        p.b_sound.lab.setText(PR.S('on'));
    }

    if(!PR.MUSIC) {
        p.b_music.setTexture('slider_off_pause');
        p.b_music.lab.tint = 0x122b33;
        p.b_music.lab.setText(PR.S('off'));
    } else {
        p.b_music.setTexture('slider_on_pause');
        p.b_music.lab.tint = 0x0092e0;
        p.b_music.lab.setText(PR.S('on'));
    }

    p.updateLabels();
};

pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    GodStep.playSound('button', 0, PR.SOUND);

    switch (t) {
        case p.b_sound:
            if(PR.SOUND) {
                p.b_sound.setTexture('slider_off_pause');
                p.b_sound.lab.tint = 0x122b33;
                p.b_sound.lab.setText(PR.S('off'));
            } else {
                p.b_sound.setTexture('slider_on_pause');
                p.b_sound.lab.tint = 0x0092e0;
                p.b_sound.lab.setText(PR.S('on'));
            }
            p.b_sound.lab.updateText();
            PR.SOUND = !PR.SOUND;
            p.soul.savePlayer();
            break;
        case p.b_music:
            if(PR.MUSIC) {
                p.b_music.setTexture('slider_off_pause');
                p.b_music.lab.tint = 0x122b33;
                p.b_music.lab.setText(PR.S('off'));
                GodStep.volumeSound('theme', !PR.MUSIC);

            } else {
                p.b_music.setTexture('slider_on_pause');
                p.b_music.lab.tint = 0x0092e0;
                p.b_music.lab.setText(PR.S('on'));
                GodStep.volumeSound('theme', !PR.MUSIC);
                GodStep.playSound('theme', -1, !PR.MUSIC);

            }
            p.b_music.lab.updateText();
            PR.MUSIC = !PR.MUSIC;
            p.soul.savePlayer();
            break;
        case p.b_menu:
            p.parent.soul.screenTo([p.parent.soul.levelselect], p.parent);
            break;
        case p.b_replay:
            p.parent.soul.screenTo([p.parent.soul.gameplay], p.parent);
            break;
        case p.b_back:
            p.visible = false;
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
        this.back.y = 0;

        this.scale.x = this.scale.y = 1;
    }
});
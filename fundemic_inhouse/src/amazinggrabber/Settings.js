AG.Settings = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Settings', soul.W, soul.H);
    GodStep.IDownUp.call(this, this.W, this.H);

    var S = this.startS = soul.startS;
    this.addChild(this.back = new AG.Back(soul, 'options_3', 0x97b949));
    this.back.timerCache = -1; this.back.cacheAsBitmap = true;
    this.addFrame(this.b_back = new AG.ImgButton('b_back', 'b_shadow', 1.1, this, S, this.W *.15, this.W *.15));
    var soundDY = .35;
    this.addFrame(this.b_sound_on = new AG.ImgButton('b_sound', 'b_shadow', 1.1, this, S, this.W *.3, this.H *soundDY));
    this.addFrame(this.b_sound_off = new AG.ImgButton('b_sound_off', 'b_shadow', 1.1, this, S, this.W *.3, this.H *soundDY));
    this.addFrame(this.b_music_on = new AG.ImgButton('b_music', 'b_shadow', 1.1, this, S, this.W *.7, this.H *soundDY));
    this.addFrame(this.b_music_off = new AG.ImgButton('b_music_off', 'b_shadow', 1.1, this, S, this.W *.7, this.H *soundDY));
    this.addFrame(this.b_tutorial = new AG.ImgButton('box_1', null, 1.1, this, S, this.W *.25, this.H *.56)); this.b_tutorial.no_scale = true;
    this.addFrame(this.b_tutorial_marker = new AG.Img('box_2', S, this.W *.25, this.H *.56, .5));
    this.addChild(this.label = new AG.Text(AG.S('options'), 230 * S, this.W *.3, this.H *.05));
    this.addChild(this.label = new AG.Text(AG.S('tutor'), 110 * S, this.W *.31, this.H *.515));
    this.addFrame(this.b_clear = new AG.ImgButton('b_ep', 'b_ep_shadow',.99, this, S, this.W *.5, this.H *.76, AG.S('erase'), 100,0, this.H *.02));
    this.visible = false;

    this.addFrame(this.dialog = new AG.Dialog(this, 'window_options', 'back_popup_options', 95));

    addEvent(this.b_tutorial, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_off, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_sound_on, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_off, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_music_on, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_clear, AG.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    this.loadSettings();
};
extend(AG.Settings, GodStep.Frame);
pro.update = function() {
    if(this.visible) {
        if( this.back.timerCache-- == 0) {
            this.back.timerCache = -1;
          //  this.back.cacheAsBitmap = true;
        }  else {
            if(this.back.timerCache < -10) {
                this.back.timerCache = -10;
            }
        }
    }

};
pro.loadSettings = function() {
    this.b_sound_off.visible = false;
    this.b_music_off.visible = false;
    this.b_tutorial_marker.visible = true;
};
pro.init = function() {
    setBackgroundColor('#6b8737');
    this.visible = true;
    this.b_music_off.visible = !AG.MUSIC;
    this.b_music_on.visible = AG.MUSIC;
    this.b_sound_off.visible = !AG.SOUND;
    this.b_sound_on.visible = AG.SOUND;
    this.b_tutorial_marker.visible =  AG.TUTOR;
};


pro.h_mouse = function(e) {
    if(e.content.target) {
        if(e.content.target.soul) {
            var t = e.content.target;
            t.b_clear.isDown = t.b_back.isDown = false;
            t.b_clear.Scale = t.b_back.Scale = 1;
        }
    }
};
pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};
pro.h_no = function(dialog) {
    GodStep.playSound('button', 0, AG.SOUND);

    dialog.visible = false;
};
pro.h_yes = function(dialog) {
    dialog.visible = false;
    GodStep.playSound('button', 0, AG.SOUND);

    GodStep.Clear(AG.AmazingGrabber.instance.PLAYER_SLOT);
    GodStep.Clear(AG.AmazingGrabber.instance.SHOP_SLOT);
    var items = AG.AmazingGrabber.ITEMS;
    var lastItem;
    for(var j = 0; j<items.length; j++) {
        lastItem = items[j];
        lastItem.locked();
    }

    dialog.parent.soul.clearProgress();
};

pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_tutorial:
            GodStep.playSound('button', 0, AG.SOUND);
            AG.TUTOR = p.b_tutorial_marker.visible = !p.b_tutorial_marker.visible ;
            break;
        case p.b_music_on:
            AG.MUSIC = false;
            GodStep.playSound('button', 0, AG.SOUND);
            if(createjs) {
                if(createjs.Sound) createjs.Sound.stop();
            }
            p.b_music_on.visible = false;
            p.b_music_off.visible = true;
            break;
        case p.b_music_off:
            AG.MUSIC = true;
            GodStep.playSound('button', 0, AG.SOUND);
            GodStep.playSound('theme_1');
            p.b_music_on.visible = true;
            p.b_music_off.visible = false;
            break;
        case p.b_sound_on:
            AG.SOUND = false;
            GodStep.playSound('button', 0, AG.SOUND);
            p.b_sound_on.visible = false;
            p.b_sound_off.visible = true;
            break;
        case p.b_sound_off:
            AG.SOUND = true;
            GodStep.playSound('button', 0, AG.SOUND);
            p.b_sound_on.visible = true;
            p.b_sound_off.visible = false;
            break;
        case p.b_clear:
            GodStep.playSound('button', 0, AG.SOUND);
            p.dialog.show(AG.S('warning'), AG.S('doyouwantclear'), p.h_yes, p.h_no);
            break;
        case p.b_back:
            GodStep.playSound('button', 0, AG.SOUND);

            s.screenTo([s.startmenu], p);
            break;
    }
    p.soul.savePlayer();
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.back.cacheAsBitmap = false;
        this.back.Scale = value;
        this.back.timerCache = 36;

        this.dialog.popUp.scale.x = this.back.top.scale.x;
        this.dialog.popUp.scale.y = this.back.top.scale.y;
    }
});
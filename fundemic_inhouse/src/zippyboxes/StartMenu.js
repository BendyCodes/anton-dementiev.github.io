PS.StartMenu = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'StartMenu', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    var S = this.startS = soul.startS;

    this.isFirstTime = true;
    this.addChild(this.back = new PS.Background(this, 'menu_background'));
    this.addChild(this.logo = new PS.Img('logo', S, this.W *.5, this.H *.32,.5));
    this.addChild(this.b_play = new PS.ImgButton('play', S, this.W *.5, this.H *.78));
    this.addChild(this.b_more = new PS.ImgButton('button_more_games', S, this.W *.21, this.H *.87));
    this.addChild(this.b_settings = new PS.ImgButton('button_options', S, this.W *.79, this.H *.87));

    this.addChild(this.b_dev = new PS.TextButton('dev', 33 * S, 0xfa66466, soul.W *.9, soul.H *.05));
    this.b_dev.visible = false;
    addEvent(this.b_dev, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_settings, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_more, PS.ImgButton.CLICK, this.h_buttons);

    this.visible = false;

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PS.StartMenu, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
    }
};

pro.init = function() {
    if(this.isFirstTime) {
        this.isFirstTime = false;
    }
    this.visible = true;
};

// listeners
pro.h_mouse = function(e) {
    if(e.target.soul) {
        var t = e.target;
        t.b_play.isDown =
            t.b_settings.isDown =
            t.b_dev.isDown =
                t.b_more.isDown = false;
        t.b_more.Scale =
            t.b_settings.Scale =
            t.b_dev.Scale =
                t.b_play.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_dev:
            GodStep.playSound('button', 0, PS.SOUND);

            PS.DEVMODE = true;
            s.screenTo([s.levelselect], p);
            break;
        case p.b_settings:
            GodStep.playSound('button', 0, PS.SOUND);

            s.screenTo([s.settings], p);
            break;
        case p.b_more:
            if(PS.SOFT_GAMES) {
                window.open('http://www.softgames.de','_blank');
            }
            break;
        case p.b_play:
            GodStep.playSound('button', 0, PS.SOUND);

            PS.DEVMODE = false;
            s.screenTo([s.levelselect], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.back.rescale(value);

    }
});
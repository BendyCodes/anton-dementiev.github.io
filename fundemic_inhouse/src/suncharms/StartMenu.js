M3.StartMenu = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'StartMenu', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    var S = this.startS = soul.startS;

    this.isFirstTime = true;

    this.addChild(this.back = new M3.Background(this, 'back_menu'));
    this.addChild(this.simbol = new M3.Img('simbol', S, 0, 0, new PIXI.Point(.5, 0)));

    this.addChild(this.pers1 = new M3.Img('pers_front', S, 0, 0, new PIXI.Point(.5,.5)));
    this.addChild(this.pers2 = new M3.Img('pers_back', S, 0, 0, new PIXI.Point(.5,.5)));
    this.addChild(this.pers3 = new M3.Img('sheriff', S, 0, 0, new PIXI.Point(.5,.5)));
    this.addChild(this.footer = new M3.Img('field_button', S, 0, 0, new PIXI.Point(.5, 1)));
    this.addChild(this.logo = new M3.Img('logo', S, 0, 0, new PIXI.Point(.5, 0)));


    this.addChild(this.b_play = new M3.ImgButton('b_play', 'play_shadow', 1.1, this, S, this.W *.5, this.H *.6, null, null, null, null));
    this.addChild(this.b_more = new M3.ImgButton('b_more', 'b_shadow', 1.1, this, S, this.W *.2, this.H *.7, null, null, null, null));
    this.addChild(this.b_settings = new M3.ImgButton('b_options', 'b_shadow', 1.1, this, S, this.W *.8, this.H *.7, null, null, null, null));

    this.addChild(this.b_dev = new Games.TextButton('dev', 33* S, 0xfa66466, soul.W *.9, soul.H *.05));

    addEvent(this.b_dev, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_settings, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_more, Games.ImgButton.CLICK, this.h_buttons);

    this.visible = false;
   // this.b_dev.visible = false;
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.StartMenu, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
    }
};

pro.init = function() {
    if(this.isFirstTime) {
        this.isFirstTime = false;
       // GodStep.playSound('theme', null, M3.MUSIC);
    }
    this.visible = true;
};

// listeners
pro.h_mouse = function(e) {

    if(e.content.target.soul) {
        var t = e.content.target;
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
            GodStep.playSound('button', 0, M3.SOUND);
            M3.DEVMODE = true;
            s.screenTo([s.levelselect], p);
            break;
        case p.b_settings:
            GodStep.playSound('button', 0, M3.SOUND);
            s.screenTo([s.settings], p);
            break;
        case p.b_more:
            //s.screenTo([s.shop], p);
            break;
        case p.b_play:
            GodStep.playSound('button', 0, M3.SOUND);

            M3.DEVMODE = false;
            s.screenTo([s.levelselect], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var sh = this.soul.H;
        var osh = this.soul.OH;
        var sw = this.soul.W;
        var dy = osh - sh;
        this.scale.x = this.scale.y = value;
        this.footer.y = (osh - dy/2)/ value;
        this.pers1.y = this.footer.y - sh * .33 / value;
        this.pers2.y = this.footer.y - sh * .54 / value;
        this.pers3.y = this.footer.y - sh * .45 / value;
        this.pers1.x = sw * .165 / value;
        this.pers2.x = sw * .38 / value;
        this.pers3.x = sw * .75 / value;
        this.logo.y = (-dy/2 + sh * .02) /value;
        this.logo.x = sw * .5 /value;
        this.simbol.y = (-dy/2 + sh * .02)/ value;
        this.simbol.x = this.footer.x = sw * .5 / value;

        this.b_play.y = this.b_more.y = this.b_settings.y = (dy/2 + sh * .8) /value;
        this.b_more.y = this.b_settings.y += sh * .063/value;
        this.back.rescale(value);
    }
});
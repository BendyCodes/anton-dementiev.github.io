SS.StartMenu = function(soul) {
    GodStep.LFrame.call(this, soul, 'StartMenu');
    GodStep.IDownUp.call(this, soul.SW, soul.SH);

    this.addChild(this.back = new SS.Background(this, 'back_menu'));
    this.addChild(this.logo = new SS.Img('logo', this.s, this.W *.5, 0, new PIXI.Point(.5, 0)));
    this.addChild(this.footer = new SS.Img('menu_field', this.s, this.W *.5, 0, new PIXI.Point(.5, 1)));

    this.addChild(this.b_dev = new Games.TextButton('dev', 33 * this.s, 0xfa66400, this.W *.9, this.H *.05));

    this.addChild(this.b_play = new SS.ImgButton('button_play', this, this.W *.5, this.H *.5));
    this.addChild(this.b_more = new SS.ImgButton('button_more', this, this.W *.24, this.H *.5));
    this.addChild(this.b_settings = new SS.ImgButton('button_options', this, this.W *.76, this.H *.5));

    this.b_dev.visible = false;
    addEvent(this.b_dev, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_settings, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_more, Games.ImgButton.CLICK, this.h_buttons);

};
extend(SS.StartMenu, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {

    }
};
pro.init = function() {
    if(this.soul.AUDIOTAG) {
        GodStep.muteSound('theme', 0);
    } else {
        if(createjs.Sound) createjs.Sound.stop();
    }
    this.visible = true;
};
// listeners
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, SS.SOUND);

    switch (t) {
        case p.b_dev:
            s.screenTo([s.dev], p);
            break;
        case p.b_settings:
            s.screenTo([s.settings], p);
            break;
        case p.b_shop:
            s.screenTo([s.shop], p);
            break;
        case p.b_play:
            s.screenTo([s.gameplay], p);
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
        var d = (this.soul.OH - this.soul.H)/2/value;
        this.logo.y = -d;
        this.b_play.y = -d + this.soul.OH/value * .83;
        this.b_more.y =
        this.b_settings.y = -d + this.soul.OH/value * .9;
        this.footer.y = (this.soul.OH)/value - d;
    }
});
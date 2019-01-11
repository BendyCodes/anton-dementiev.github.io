PR.StartMenu = function(soul) {
    GodStep.LFrame.call(this, soul, 'StartMenu');
    GodStep.IDownUp.call(this, soul.SW, soul.SH);
    this.addChild(this.back = new PR.Background(this, 'back_menu'));


    this.addChild(this.title = new Games.Img('logo', this.s, this.W *.5, this.H *.16, new PIXI.Point(.5, 0)));
    this.title.phase = 0;
    this.addChild(this.cube_2 = new Games.Img('cube_2s', this.s, this.W *.61, this.H *.41,.5));
    this.addChild(this.cube_1 = new Games.Img('cube_1s', this.s, this.W *.11, this.H *.35,.5));

    this.addChild(this.footer = new PIXI.DisplayObjectContainer());
    this.footer.addChild(this.down = new Games.Img('down', this.s, this.W *.5, 0, new PIXI.Point(.5, 1)));
    this.footer.addChild(this.pers_1 = new GodStep.MovieClip(['pers_m_1', 'pers_m_1_0'], this.s, this.W *.25, -this.H *.18, new PIXI.Point(.5, 1)));
    this.footer.addChild(this.pers_2 = new GodStep.MovieClip(['pers_m_2', 'pers_m_2_0'], this.s, this.W *.75, -this.H *.21, new PIXI.Point(.5, 1)));
    this.footer.addChild(this.field = new Games.Img('field_button_m', this.s, this.W *.5, -this.H *.03, new PIXI.Point(.5, 1)));

    this.footer.addChild(this.b_play = new Games.ImgButton('b_play', this, this.W *.5, -this.H *.19));
    this.b_play.phase = 0;
    this.footer.addChild(this.b_more = new Games.ImgButton('b_more', this, this.W *.24, -this.H *.11));
    this.footer.addChild(this.b_settings = new Games.ImgButton('b_options', this, this.W *.76, -this.H *.11));
    this.pers_1.animTime = 100;
    this.pers_2.animTime = 129;
    this.pers_2.animTimer = 55;
    this.footer.addChild(this.b_dev = new Games.TextButton('dev', 33 * this.s, 0xfa66400, this.W *.9, -this.H *.55));

    this.footer.addChild(this.maska = new PIXI.Graphics()); this.field.mask = this.maska;
    this.maska.y = this.field.y - this.field.height;
    this.maska.beginFill(0, 1);
    this.maska.drawRect(0, 0, this.field.width, this.field.height * 2);
    this.maska.endFill();

    this.b_dev.visible = false;
    addEvent(this.b_dev, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_settings, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_more, Games.ImgButton.CLICK, this.h_buttons);

};
extend(PR.StartMenu, GodStep.LFrame);

pro.init = function() {
    this.b_play.phase = 0;
    this.title.phase = 0;

    this.b_play.scale.x =  this.b_play.scale.y =
    this.b_settings.scale.x =  this.b_settings.scale.y = 0;
    this.b_more.scale.x =  this.b_more.scale.y = 0;

    this.visible = true;
    this.field.x = this.W * 2;
    this.b_play.y = this.soul.OH * 3.5;
    this.b_more.y = this.soul.OH * 2;
    this.b_more.y = this.soul.OH * 2;
    this.b_settings.y = this.soul.OH * 2.7;
};
pro.update = function() {
    if(this.visible) {
        this.pers_1.animate();
        this.pers_2.animate();

        var s = this.soul;
        var scale = this.scale.x;

        this.b_play.scale.x = this.b_play.scale.y += (1 - this.b_play.scale.x) * .03;
        this.b_settings.scale.x = this.b_settings.scale.y += (1 - this.b_settings.scale.x) * .07;
        this.b_more.scale.x = this.b_more.scale.y += (1 - this.b_more.scale.x) * .05;

        this.title.phase += 0.025;
        this.b_play.phase += 0.045;
        this.title.y += ((s.OH *.03 -s.DOH/2)/scale + Math.sin(this.title.phase) *s.H * .01 - this.title.y) * .3;
        this.b_play.y += Math.max(-this.W * .1, (-this.H *.19 + Math.sin(this.b_play.phase) *s.H * .01 - this.b_play.y) * .3);
        this.b_more.y += Math.max(-this.W * .1, (-this.H *.11 - this.b_more.y) * .3);
        this.b_settings.y += Math.max(-this.W * .1, (-this.H *.11 - this.b_settings.y) * .3);
        this.field.x += Math.max(-this.W *.1, (this.W *.5 - this.field.x) *.3);
    }
};

// listeners

pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, PR.SOUND);

    switch (t) {
        case p.b_dev:
            PR.DEVMODE = true;
            s.screenTo([s.levelselect], p);
            break;
        case p.b_settings:
            s.screenTo([s.settings], p);
            break;
        case p.b_more:
            break;
        case p.b_play:
            PR.DEVMODE = false;
            s.screenTo([s.levelselect], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var s = this.soul;
        this.scale.x = this.scale.y = value;
        this.back.rescale(value);
        this.footer.y = (s.OH - s.DOH/2)/value;
        this.title.y = (s.OH *.03 -s.DOH/2)/value;
    }
});
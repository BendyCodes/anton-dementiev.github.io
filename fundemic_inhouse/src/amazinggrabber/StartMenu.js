AG.StartMenu = function(soul) {
    this.soul = soul;
    this.firstStart = true;
    GodStep.Frame.call(this, 'StartMenu', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    var S = this.startS = soul.startS;

    this.addChild(this.cachedContainer = new PIXI.DisplayObjectContainer());
    this.cachedContainer.addChild(this.back = new AG.Back(soul, 'menu_3', 0x64c5f7, this));
    this.addChild(this.b_play = new AG.ImgButton('b_play', 'b_shadow', 1.7, this, S, this.W *.5, this.H *.64));
    this.addChild(this.b_more = new AG.ImgButton('50_b_more', 'b_shadow', 1.1, this, S, this.W *.5, this.H *.89));
    this.addChild(this.b_shop = new AG.ImgButton('b_inapp', 'b_shadow', 1.1, this, S, this.W *.25, this.H *.82));
    this.addChild(this.b_options = new AG.ImgButton('b_options', 'b_shadow', 1.1, this, S, this.W *.75, this.H *.82));
    this.addChild(this.b_dev = new AG.TextButton('dev', 33, 0xfa66466, this, S, this.W *.9, this.H *.05));
    this.back.timerCache = 0;
    this.b_dev.visible = false;
    this.cachedContainer.addChild(this.logo = new AG.Img('logo_2', S, this.W *.5, this.H *.28, 0.5));
   // this.b_dev.visible= false;
    addEvent(this.b_dev, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_more, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_options, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_shop, AG.ImgButton.CLICK, this.h_buttons);


    this.cachedContainer.cacheAsBitmap = true;
    this.visible = false;

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(AG.StartMenu, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
        if(this.back.timerCache-- == 0) {
            this.back.timerCache = -1;
         //   this.cachedContainer.cacheAsBitmap = true;
        } else {
            if(this.back.timerCache < -10) {
                this.back.timerCache = -10;
            }
        }
    }
};

pro.init = function() {
    setBackgroundColor('#3c88c4');
    this.visible = true;
};

// listeners
pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        if(AG.MUSIC && t.firstStart) {
            t.firstStart = false;
            createjs.Sound.stop();
     //       GodStep.playSound('theme_1');
        }

        t.b_play.isDown =
            t.b_options.isDown =
            t.b_dev.isDown =
                t.b_shop.isDown = false;
        t.b_shop.Scale =
            t.b_options.Scale =
            t.b_dev.Scale =
                t.b_play.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, AG.SOUND);

    switch (t) {
        case p.b_more:
            if(AG.SOFT_GAMES){window.open('http://m.softgames.de','_blank')};
           break;
        case p.b_dev:
            s.screenTo([s.dev], p);
            break;
        case p.b_options:
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
pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.cachedContainer.cacheAsBitmap = false;
        this.scale.x = this.scale.y = value;
        this.back.Scale = value;
        this.back.timerCache = 30;
    }
});
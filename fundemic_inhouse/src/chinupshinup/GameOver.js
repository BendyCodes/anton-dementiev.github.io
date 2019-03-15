SS.GameOver = function(soul) {
    GodStep.LFrame.call(this, soul, 'GameOver');
    GodStep.IDownUp.call(this, this.W, this.H);
    this.addChild(this.back = new SS.Background(this, 'back'));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());

    this.container.addChild(this.field = new SS.Img('field_game_over', this.s, this.W *.5, this.H *.5,.5));
    this.container.addChild(this.label = new SS.Text('GAME OVER', (170) * this.s/ SS.SCALE, this.W *.243, this.H *.062, 'center', 0xFFCC66));this.label.alpha = .7;
    this.container.addChild(this.icon1 = new SS.Img('icon_xp', this.s, this.W *.33, this.H *.32,.5));
    this.container.addChild(this.icon2 = new SS.Img('icon_score', this.s, this.W *.33, this.H *.44,.5));
    this.container.addChild(this.icon3 = new SS.Img('icon_record', this.s, this.W *.33, this.H *.565,.5));

    var d = this.H * .05;
    var c = 0xB06D00;
    this.addFrame(this.xp_text = new SS.Text('15125125', 120 * this.s, this.W *.5, this.H *.32 - d, 'left', c));
    this.addFrame(this.coin_text = new SS.Text('15125125', 120 * this.s, this.W *.5, this.H *.44 - d, 'left', c));
    this.addFrame(this.record_text = new SS.Text('15125125', 120 * this.s, this.W *.5, this.H *.565 - d, 'left', c));


    this.container.addChild(this.b_shop = new SS.ImgButton('button_shop', this, this.W *.25, this.H *.8));
    this.container.addChild(this.b_menu = new SS.ImgButton('button_menu', this, this.W *.5, this.H *.8));
    this.container.addChild(this.b_play = new SS.ImgButton('button_play', this, this.W *.75, this.H *.8));
    this.b_play.Scale *= .61;

    this.b_shop.phase = 0;
    addEvent(this.b_shop, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_menu, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, Games.ImgButton.CLICK, this.h_buttons);
};
extend(SS.GameOver, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {
        this.b_shop.phase += 0.1;
        this.b_shop.scale.x = this.b_shop.scale.y = Math.sin(this.b_shop.phase) * .1 + 1;
    }
};

pro.init = function() {
    this.visible = true;
    var dx = .74;
    var player = SS.ChinUpShinUp.instance.PLAYER;

    GodStep.playSound('final', 0, SS.SOUND);
    this.xp_text.setText(player.score + '');
    this.coin_text.setText(player.coins + '');
    this.record_text.setText(player.top + '');

    this.xp_text.updateText();
    this.coin_text.updateText();
    this.record_text.updateText();

    this.xp_text.x = this.W * dx - this.xp_text.width;
    this.coin_text.x = this.W * dx- this.coin_text.width;
    this.record_text.x = this.W * dx - this.record_text.width;
};


pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, SS.SOUND);

    switch (t) {
        case p.b_play:
            s.screenTo([s.gameplay], p);
            break;
        case p.b_menu:
            s.screenTo([s.startmenu], p);
            break;
        case p.b_shop:
            s.screenTo([s.shop], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.back.rescale(value);
        this.field.y = this.soul.H *.5/value;
        this.scale.x = this.scale.y = value;
    }
});
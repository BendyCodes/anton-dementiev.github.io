SS.Shop = function(soul) {
    GodStep.LFrame.call(this, soul, 'Shop');
    GodStep.IDownUp.call(this, this.W, this.H);

    this.addChild(this.back = new SS.Background(this, 'back'));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());

    this.container.addChild(this.field = new SS.Img('field_shop', this.s, this.W *.5, this.H *.5,.5));
    this.container.addChild(this.label = new SS.Text('SHOP', (250) * this.s/ SS.SCALE, this.W *.34, -this.H *.01, 'center', 0xFFCC66));this.label.alpha = .7;
    this.container.addChild(this.coin = new SS.Img('coinShop', this.s, this.W *.404, this.H *.041,.5));
    this.container.addChild(this.coinLabel = new SS.Text('123', (110) * this.s/ SS.SCALE, this.W *.45, -this.H *.015, 'left', 0xffe013));this.label.alpha = .7;

    var prices = this.prices = [100, 200, 1000, 3000, 8000];
    var dy =this.H *.126;
    var help, icon;
    for(var i = 1; i<6; i++) {
        this.container.addChild(icon = this['icon_' + i] = new SS.Img('icon_' + i, this.s, this.W *.28, dy * (i-1) + this.H *.276,.5));
        this.container.addChild(this['price_' + i] = new SS.Img('price', this.s, this.W *.48,dy * (i-1) + this.H *.276,.5));
        this.container.addChild(help = this['help_' + i] = new SS.Img('help', this.s, this.W *.73, dy * (i-1) + this.H *.276,.5));
        this.container.addChild(this['price_' + i] = new SS.Text(prices[i-1] + '',120 * this.s, this.W *.47,  dy * (i-1) + this.H *.215, 'left', 0xffffff));
        this.container.addChild(this['accept_off_' + i] = new SS.Img('accept_off', this.s, this.W *.205, dy* (i-1) + this.H *.236,.5));
        this.container.addChild(this['accept_on_' + i] = new SS.Img('accept_on', this.s, this.W *.205, dy* (i-1) + this.H *.236,.5));
        this['price_' + i].x = this.W * .6 - this['price_' + i].width;

        this['accept_on_' + i].visible = false;
        icon.id = help.id = i;
        GodStep.IDownUp.call(icon, icon.width, icon.height);
        GodStep.IDownUp.call(help, help.width, help.height);
        icon.hitArea = new PIXI.Rectangle(-icon.width/2/this.s, -icon.height/2/this.s, icon.width/this.s, icon.height/this.s);
        help.hitArea = new PIXI.Rectangle(-help.width/2/this.s, -help.height/2/this.s, help.width/this.s, help.height/this.s);
        addEvent(icon, GodStep.FRAME_DOWN, this.h_icons);
        addEvent(help, GodStep.FRAME_DOWN, this.h_helps);
    }
    this.container.addChild(this.helpUp = new SS.Img('shop_up_field', this.s, 0, 0,.5)); this.helpUp.visible = false;
    this.container.addChild(this.b_accept = new SS.ImgButton('button_accept', this, this.W *.51, this.H *.9));
    this.container.addChild(this.helpLabel = new SS.Text('Text \nTEXT TEXT\nasdasd', (110) * this.s , this.W *.3,this.H*.36 , 'center', 0xffffff)); this.helpLabel.visible = false;
    this.helpLabel.alpha = .8;
    this.helpUp.x = this.W * .6;
    this.helpLabel.x = this.helpUp.x - this.W * .2;
    this.addFrame(this.dialog = new SS.Dialog(this, 35));


    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this.b_accept, Games.ImgButton.CLICK, this.h_buttons);
};
extend(SS.Shop, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {

    }
};
pro.updateCoins = function() {
    this.coinLabel.setText('     ' + SS.ChinUpShinUp.instance.PLAYER.coins);
    this.coinLabel.updateText();
    this.coinLabel.x = (this.W - this.coinLabel.width)/2;
    this.coin.x = this.coinLabel.x + this.W * .05;
};
pro.init = function() {
    this.visible = true;
    this.updateCoins();

    var player = SS.ChinUpShinUp.instance.PLAYER;
    for(var i =0;i<5; i++) {
        this['icon_' + (i+1)].isBought = player.shop[i];
        this['accept_on_' + (i+1)].visible = player.items[i];
    }
};


pro.h_mouse = function(e) {
    this.helpLabel.visible = this.helpUp.visible = false;
};
pro.h_dialog = function(d) {
    d.visible = false;
    if(d.isYes) {
        d.item.isBought = true;
        SS.ChinUpShinUp.instance.PLAYER.coins -= d.parent.prices[d.item.id-1];
        GodStep.SaveLocal(SS.ChinUpShinUp.instance.PLAYER, SS.ChinUpShinUp.instance.PLAYER_SLOT);
        d.parent['accept_on_' + d.item.id].visible = true;
        d.parent.updateIcons(d.item, true);
        d.parent.updateCoins();
        GodStep.playSound('store_buy',0, SS.SOUND);
    } else {

    }
};
pro.updateIcons = function(t, isOk) {
    var p = t.parent.parent;
    var s = p.soul;
    p.helpLabel.visible = p.helpUp.visible = false;
    switch (t.id) {
        case 1:
            s.BONUS_FLY = isOk;
            break;
        case 2:
            s.BONUS_BIGCOIN = isOk;
            p['accept_on_' + 3].visible =  s.BONUS_CRYSTAL = false;
            break;
        case 3:
            s.BONUS_CRYSTAL = isOk;
            p['accept_on_' + 2].visible = s.BONUS_BIGCOIN = false;


            break;
        case 4:
            s.BONUS_COINMULT = isOk;
            p['accept_on_' + 5].visible =  s.BONUS_POINTMULT = false;

            break;
        case 5:
            s.BONUS_POINTMULT = isOk;
            p['accept_on_' + 4].visible =  s.BONUS_COINMULT = false;

            break;
    }

    var player = SS.ChinUpShinUp.instance.PLAYER;
    for(var i = 0; i<5; i++) {
        if(p['icon_' + (i + 1)].isBought) {
            player.shop[i] = 1;
        } else {
            player.shop[i] = 0;
        }
        if(p['accept_on_' + (i + 1)].visible) {
            player.items[i] = 1;
        } else {
            player.items[i] = 0;
        }
    }

};
pro.h_icons = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var isOk = false;
    if(t.isBought) {
        GodStep.playSound('button', 0, SS.SOUND);

        isOk = p['accept_on_' + t.id].visible = !p['accept_on_' + t.id].visible;
    } else {
        if(p.prices[t.id-1] < SS.ChinUpShinUp.instance.PLAYER.coins) {
            GodStep.playSound('button', 0,  SS.SOUND);

            p.dialog.show('Buy this item ' + t.id + '?', p.h_dialog,  p.h_dialog);
        } else {
            GodStep.playSound('button', 0,  SS.SOUND);
            p.helpLabel.visible = p.helpUp.visible = true;
            p.helpUp.y = t.y - p.W * .17;
            p.helpLabel.setText('\nnot enough money');
            p.helpLabel.updateText();
            p.helpLabel.x = p.W * .62 - p.helpLabel.width/2;
            p.helpLabel.y = p.helpUp.y - p.W * .17;


        }

        p.dialog.item = t;
        isOk = true;
        return;
    }
    p.updateIcons(t, isOk);
};
pro.h_helps = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    p.helpLabel.visible = p.helpUp.visible = true;
    p.helpUp.y = t.y - p.W * .17;
    p.helpLabel.y = p.helpUp.y - p.W * .15;
    GodStep.playSound('button', 0, SS.SOUND);
    switch (t.id) {
        case 1:
            p.helpLabel.setText('Eye Patch\n+\nCrazy Balloon');
            break;
        case 2:
            p.helpLabel.setText("Cowboy's Hat\n+\nHuge Coin");
            break;
        case 3:
            p.helpLabel.setText("Sailor Cap\n+\nDiamond");

            break;
        case 4:
            p.helpLabel.setText("Hypno Goggles\n+\nHigher Score");

            break;
        case 5:
            p.helpLabel.setText("Monocle\n+\nScore Upgrade");

            break;
    }
    p.helpLabel.updateText();
    p.helpLabel.x = p.W * .62 - p.helpLabel.width/2;
};

pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, SS.SOUND);

    switch (t) {
        case p.b_accept:
            GodStep.SaveLocal(SS.ChinUpShinUp.instance.PLAYER, SS.ChinUpShinUp.instance.PLAYER_SLOT);

            s.screenTo([s.gameplay], p);
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
        this.scale.x = this.scale.y = value;    }
});
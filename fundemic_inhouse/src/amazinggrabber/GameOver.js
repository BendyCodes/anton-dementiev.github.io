AG.GameOver = function(soul) {
    this.soul = soul;

    AG.NEW_RECORD = false;
    GodStep.Frame.call(this, 'GameOver', soul.W, soul.H);
    GodStep.IDownUp.call(this, this.W, this.H);
    var S = soul.startS;
    this.startS = soul.startS;
    this.addChild(this.static = new PIXI.DisplayObjectContainer());
    this.static.addChild(this.back = new AG.Back(soul, 'end_3', 0xfccd3a, this));

    this.static.timerCache = 0;

    var by = .85;
    this.static.addChild(this.field_cup = new AG.Img('field_cup', S, this.W *.72, this.H *.19, 0.5));
    this.static.addChild(this.field_coin = new AG.Img('field_coin', S, this.W *.28, this.H *.19, 0.5));
    this.static.addChild(this.b_shadow_lil1 = new AG.Img('b_shadow_lil', S *.55, this.W *.168, this.H *.2, 0.5));
    this.static.addChild(this.b_shadow_lil2 = new AG.Img('b_shadow_lil', S*.55, this.W *.605, this.H *.2, 0.5));
    this.static.addChild(this.coin = new AG.Img('coin', S, this.W *.168, this.H *.175, 0.5));
    this.static.addChild(this.cup = new AG.Img('cup', S, this.W *.605, this.H *.175, 0.5));
    this.addChild(this.maska = this.createGraphics());


    this.addChild(this.b_startmenu = new AG.ImgButton('b_menu', 'b_shadow', 1.1, this, S, this.W *.2, this.H *by));
    this.addChild(this.b_restart = new AG.ImgButton('b_replay', 'b_shadow', 1.1, this, S, this.W *.5, this.H *by));
    this.addChild(this.b_shop = new AG.ImgButton('b_inapp', 'b_shadow', 1.1, this, S, this.W *.8, this.H *by));

    this.static.addChild(this.fieldSlider = new AG.Img('field_slider', S, this.W *.5, this.H *.4, 0.5));
    this.addChild(this.sliderShadow = new AG.Img('slider_shadow', S, this.W *.5, this.H *.42, 0.5));
    this.addChild(this.sliderBack = new AG.Img('slider_1', S, this.W *.5, this.H *.4, 0.5));
    this.addChild(this.slider = new AG.Img('slider_2', S, this.W *.5, this.H *.4, 0.5));


    this.static.addChild(this.fieldRecord = new AG.Img('field_new_record', S, this.W *.73, this.H *.09,.5));
    this.static.addChild(this.textRecord = new AG.Text(AG.S('newrecord'), 77 * S, this.W *.618, this.H *.056, 'right'));

    this.maska.beginFill(0, 1);
    this.maska.drawRect(0, 0, this.slider.width, this.H *.2);
    this.maska.endFill();
    this.slider.mask = this.maska;
    this.maska.x = this.slider.x - this.slider.width/2;
    this.maska.y = this.slider.y - this.slider.height;

    this.static.addChild(this.roundMoney = new AG.Text('', 110 * S, this.W *.23, this.H *.15, 'right'));
    this.static.addChild(this.bestMoney = new AG.Text('', 110 * S, this.W *.67, this.H *.15, 'right'));
    this.static.addChild(this.totalMoney = new AG.Text('', 130 * S, this.W *.13, this.H *.27, 'right'));
    this.static.addChild(this.till = new AG.Text('', 92 * S, this.W *.13, this.H *.45, 'center', 0xfff04b)); this.till.alpha = .9;
    this.static.addChild(this.textReward = new AG.Text(AG.S('youunlocked'), 89 * S, this.W *.03, this.H *.5, 'center', 0xff3a5f));
     this.maska.x = - this.slider.width;


    if(this.W < this.textReward.width + this.textReward.x) {
        var words = this.textReward.text.split(' ');
        var finishText = ''; var isPerenos = false;
        for(var w = 0; w < words.length; w++) {
            finishText += words[w] + " ";
            if(w > words.length * .5) {
                if(!isPerenos) {
                    isPerenos = true;
                    finishText += '\n';
                }
            }
        }
        this.textReward.text = finishText;

    }
    this.textReward.updateText();
    this.textReward.x = this.W/2 - this.textReward.width/2;
    this.static.addChild(this.rewardSprite = new PIXI.DisplayObjectContainer());
    this.rewardSprite.y = this.H * .58;
    this.rewards = [];
    var i;
    for(i = 0; i<1; i++) {
        var rew = new AG.Img('field_icons_end', S, this.W *.5 + i * this.W *.24,  this.W *.11,.5);
        this.rewardSprite.addChild(rew); this.rewards.push(rew);
        this.rewardSprite.addChild(this.shadow = new AG.Img('icons_shadow', S, this.W *.5 + i * this.W *.24,  this.W *.11,.5));
        this.rewardSprite.addChild(this.icon = new AG.Img('empty', S, this.W *.5 + i * this.W *.24,  this.W *.11,.5));
    }

    addEvent(this.b_startmenu, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_restart, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_shop, AG.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);


    AG.AmazingGrabber.LEVELS = this.levels = [0, 60, 150, 500, 1000, 2000, 2500, 3600, 3700, 4800, 5000, 6000, 6200, 6700, 7000,
        8000, 10000, 12000, 15000,
    18000, 25000, 50000, 55000, 60000, 180000, 100000000, 1000000000000];
    this.visible = false;

};
extend(AG.GameOver, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
        if( this.static.timerCache-- == 0) {
            this.static.timerCache = -1;
           // this.static.cacheAsBitmap = true;
        } else {
            if(this.static.timerCache < -10) {
                this.static.timerCache = -10;
            }
        }
        if(--this.progressDelayTimer == 0) {
            this.progressDelayTimer = 1;
            if(this.justUnclocked.length > 0) {
                this.maska.x += Math.min(this.W * .009, ((this.slider.x - this.slider.width/2 + this.W *.01) - this.maska.x) * .2);
                if(this.maska.x > this.slider.x - this.slider.width/2) {
                    this.static.cacheAsBitmap = false;

                    this.maska.x = this.slider.x - this.slider.width/2 - this.slider.width;
                    this.icon.cacheAsBitmap = false;
                    this.icon.setImg(this.justUnclocked[0].data[1]);
                    this.rewardSprite.visible = this.textReward.visible = true;
                   // this.icon.cacheAsBitmap = true;
                    this.icon.visible = true;

                    this.justUnclocked.splice(0, 1);

                    if(this.justUnclocked.length == 0) {
                      //  this.static.cacheAsBitmap = true;
                    }
                }
            } else {
                if(this.progressDelayTimer < -10) {
                    this.progressDelayTimer = -10;
                }
                this.maska.x += Math.min(this.W * .004, (this.maska.ox - this.maska.x) * .2);
            }
        }
    }
};
pro.init = function() {
    setBackgroundColor('#e59b2e');
    this.rewardSprite.visible = this.textReward.visible = true;
    this.progressDelayTimer = 5;
    this.static.cacheAsBitmap = false;
    var player = GodStep.LoadLocal(this.soul.PLAYER_SLOT) || AG.PLAYER;
    var shop = GodStep.LoadLocal(this.soul.SHOP_SLOT) || AG.SHOP;
    this.fieldRecord.visible= this.textRecord.visible = AG.NEW_RECORD;
    this.totalMoney.setText(AG.S('total')+ ': ' + player.totalMoney);
    this.bestMoney.setText('' + player.bestScore);
    this.roundMoney.setText('' + (this.soul.gameplay.roundMoney || 0));
    this.justUnclocked = [];

    var levelID = 0;
    var totalLastID = 0;
    var totalLast = this.soul.gameplay.lastTotalMoney;
    for(var i =1; i<this.levels.length; i++) {
        if(this.levels[i] < totalLast) {
            totalLastID = i - 1;
        }
        if(this.levels[i] > player.totalScore) {
            levelID = i - 1;
            break;
        }
    }
    trace('level ' + levelID);

    var items = AG.AmazingGrabber.ITEMS;
    var lastItem;
    for(var j = 0; j<items.length; j++) {
        if(items[j].data[5] <= levelID && items[j].data[5] > totalLastID) {
            if(!items[j].isPurchased) {
                lastItem = items[j];
                if(lastItem.isLocked) {
                    lastItem.unlock();
                    this.justUnclocked.push(lastItem);
                }
            }
        }
    }

    if(this.justUnclocked.length > 0) {
        this.icon.cacheAsBitmap = false;
        this.icon.visible = false;
        this.icon.setImg(this.justUnclocked[0].data[1]);
        this.rewardSprite.visible = this.textReward.visible = true;
      //  this.icon.cacheAsBitmap = true;
    } else {
        this.rewardSprite.visible = this.textReward.visible = false;
    }

    this.till.setText(Math.floor(this.levels[levelID + 1] - player.totalMoney) + AG.S('toclaim'));
    this.till.updateText();
    this.till.x = this.W/2 - this.till.width/2;
    var percent = ((this.levels[levelID + 1] - player.totalMoney)/(this.levels[levelID + 1]));
    this.maska.ox = this.slider.x - this.slider.width/2 - this.slider.width * percent;
    if(this.maska.ox > this.maska.x) {
  //      this.maska.x = -this.slider.width;
    } else {
        //this.maska.x = - this.slider.width;
    }
    this.visible = true;
  //  this.static.cacheAsBitmap = true;



};

AG.AmazingGrabber.getCostByLevel = function(level) {
    return level;
  //  return AG.AmazingGrabber.LEVELS[level] || 1000000000;
};

pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    if(!p.isGameOver) {
        switch (t) {
            case p.b_startmenu:
                GodStep.playSound('button', 0, AG.SOUND);
                s.screenTo([s.startmenu], p);
                break;
            case p.b_shop:
                GodStep.playSound('button', 0, AG.SOUND);

                s.screenTo([s.shop], p);
                break;
            case p.b_restart:
                GodStep.playSound('button', 0, AG.SOUND);
                p.static.cacheAsBitmap = false;

                s.screenTo([s.gameplay], p);
                break;
        }
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.b_startmenu.isDown =
                    t.b_restart.isDown =
                            t.b_shop.isDown = false;
                t.b_shop.Scale =
                    t.b_startmenu.Scale =
                            t.b_restart.Scale = 1;
            }
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
        this.static.cacheAsBitmap = false;

        this.static.timerCache = 33;
        this.scale.x = this.scale.y = value;
        this.back.Scale = value;
        this.fieldSlider.scale.x = this.back.top.scale.x;
    }
});
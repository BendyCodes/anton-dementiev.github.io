AG.Shop = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Shop', soul.W, soul.H);
    GodStep.IDownUp.call(this, this.W, this.H);
    var S = this.startS = soul.startS;
    this.addChild(this.back = new AG.Back(soul, 'inapp_3', 0xf98331));

    this.addChild(this.container = new PIXI.DisplayObjectContainer());

    this.container.addChild(this.field_coin = new AG.Img('field_coin', S, this.W *.78, this.H *.12, 0.5));
    this.container.addChild(this.b_shadow_lil1 = new AG.Img('b_shadow_lil', S *.65, this.W *.668, this.H *.13, 0.5));
    this.container.addChild(this.coin = new AG.Img('coin', S, this.W *.668, this.H *.105, 0.5));
    this.container.addChild(this.totalMoney = new AG.Text('123123', 110 * S, this.W *.73, this.H *.09, 'right'));
    this.addChild(this.maska = new PIXI.Graphics());

    this.container.addChild(this.containerHead = new GodStep.Frame());
    this.container.addChild(this.containerArm = new GodStep.Frame());
    this.container.addChild(this.topContainer = new GodStep.Frame());
    this.addFrame(this.b_back = new AG.ImgButton('b_back', 'b_shadow', 1.1, this, S, this.W *.15, this.W *.15), this.container);

    var noNomeyText = AG.S('nocoins'); var c = 1;
    if(noNomeyText.length > 8) {
        c -= (noNomeyText.length - 8)/60;
    }
    this.addChild(this.fieldNoMoney = new AG.Img('field_no_money', S, this.W *.5, this.H *.5,.5));
    this.addChild(this.textNoMoney = new AG.Text(noNomeyText, 155 * S * c, this.W *.62, this.H *(.435 + (1 - c) *.05), 'left'));

    this.textNoMoney.x = (this.W - this.textNoMoney.width)/2;
    this.fieldNoMoney.visible = this.textNoMoney.visible = false;
    this.fieldNoMoney.timer = 0;

    var i, item, rowI = 0, w = this.W/4, h = this.H * .25, maxH = 1;
    AG.AmazingGrabber.DEFAULT_SLOTS = [];
    AG.AmazingGrabber.CURRENT_ARM_SLOTS = [['arm1'], ['arm2'], ['arm3'], ['arm4']];
    AG.AmazingGrabber.CURRENT_HEAD_SLOTS = [['head1'], ['head2'], ['head3'], ['head4'], ['head5'], ['head6'], ['head7'], ['head8']];
    var itemsArm = AG.AmazingGrabber.SHOP_ARM_SLOTS = [
                   [AG.S('smile'), 'i_a_1', 'arm1', ['d_a_1'], 150],
                    [AG.S('Arm Hair'), 'i_a_2', 'arm2', ['d_a_2'], 1000],
                    [AG.S('yoga'), 'i_a_3', 'arm3',['d_a_3_1', 'd_a_3_3'], 2500],
                    [AG.S('sticky'), 'i_a_4', 'arm4', ['d_a_4_1', 'd_a_4_2', 'd_a_4_3'], 3700],
                    [AG.S('slimy'), 'i_a_5', 'arm1', ['d_a_5'], 5000],
                    [AG.S('hair'), 'i_a_6', 'arm2', ['d_a_6'], 6200],
                    [AG.S('spike'), 'i_a_7', 'arm3', ['d_a_7_1',  'd_a_7_3'], 7000],
                    [AG.S('garden'), 'i_a_8', 'arm4', ['d_a_8_1', 'd_a_8_2', 'd_a_8_3'], 10000],
                    [AG.S('tailored'), 'i_a_9', 'arm1', ['d_a_9'], 15000],
                    [AG.S('critter'), 'i_a_10','arm2', ['d_a_10'], 25000],
                    [AG.S('lux'), 'i_a_11', 'arm3', ['d_a_11_1', 'd_a_11_3'], 55000],
                    [AG.S('glove'), 'i_a_12', 'arm4', ['d_a_12_1', 'd_a_12_2', 'd_a_12_3'], 180000]
    ];
    var itemsHead =  AG.AmazingGrabber.SHOP_HEAD_SLOTS = [
                    [AG.S('shifty'), 'i_h_1', 'head1', ['d_h_1_1', 'd_h_1_2', 'd_h_1_l', 'd_h_1_r'], 60],
                    [AG.S('gents'), 'i_h_2', 'head2', ['d_h_2'], 500],
                    [AG.S('Hachimaki'), 'i_h_3', 'head3', ['d_h_3'], 2000],
                    [AG.S('Chow Chow'), 'i_h_4', 'head4', ['d_h_4_1', 'd_h_4_2', 'd_h_4_3', 'd_h_4_4', 'mouth_5_1', 'mouth_5_1', 'd_h_4_5', 'mouth_5_1'], 3600],
                    [AG.S('hip'), 'i_h_5', 'head5', ['d_h_5'], 4800],
                    [AG.S('clown'), 'i_h_6', 'head6', ['d_h_6'], 6000],
                    [AG.S('brows'), 'i_h_7', 'head7', ['d_h_7'], 6700],
                    [AG.S('vamp'), 'i_h_8', 'head4', ['d_h_8_1', 'd_h_8_2', 'd_h_8_3', 'd_h_8_4', 'd_h_8_5_1', 'd_h_8_5_2', 'd_h_8_5_3', 'd_h_8_5_2'], 8000],
                    [AG.S('coolshades'), 'i_h_9', 'head5', ['d_h_9'], 12000],
                    [AG.S('Tall Hat'), 'i_h_10', 'head3', ['d_h_10'], 18000],
                    [AG.S('longe'), 'i_h_11', 'head8', ['d_h_11_1', 'd_h_11_2', 'd_h_11_3', 'd_h_11_4'], 50000],
                    [AG.S('gold'), 'i_h_12', 'head3', ['d_h_12'], 60000]
    ];

    for(i = 0; i<itemsArm.length; i++) {
        itemsHead[i][5] = 2 * (i) + 1;
        itemsArm[i][5] = 2 * (i) + 2;
    }
    this.container.addChild(this.tab_head = new AG.ImgButton('field_choose_on', null, S, this, S,  this.W *.3,this.H *.29, AG.S('head'), 150, 0, this.H *.04));
    this.container.addChild(this.tab_arm = new AG.ImgButton('field_choose_on', null, S, this, S,  this.W *.7,this.H *.29, AG.S('arm'), 150,0, this.H *.04));
    this.addFrame(this.dialog = new AG.Dialog(this, 'window_inapp', 'back_popup_inapp', null, 90, 100));

    this.tab_head.no_scale = this.tab_arm.no_scale = true; this.tab_head.isSelected = true;
    this.tab_arm.alpha = 0.3;
    this.items = AG.AmazingGrabber.ITEMS = [];
    this.containerArm.mask = this.maska;
    this.containerHead.mask = this.maska;
    for(i = 0; i<itemsArm.length; i++) {
        rowI = parseInt(i/3);
        item = new AG.ItemIcon(itemsArm[i], this, (i - rowI * 3) * w + w, rowI * h);
        maxH = Math.max(maxH, rowI * h + item.back.height);
        this.containerArm.addChild(item);
        item.data = itemsArm[i];
        addEvent(item, GodStep.FRAME_UP, this.h_items);
        item.gameplay = soul.gameplay;
        //item.unlock();
        this.items.push(item);
    }
    for(i = 0; i<itemsHead.length; i++) {
        rowI = parseInt(i/3);
        item = new AG.ItemIcon(itemsHead[i], this, (i - rowI * 3) * w+ w, rowI * h);
        maxH = Math.max(maxH, rowI * h + item.back.height);
        this.containerHead.addChild(item);
        item.data = itemsHead[i];
        addEvent(item, GodStep.FRAME_UP, this.h_items);
        item.gameplay = soul.gameplay;
        //item.unlock();
        this.items.push(item);

    }
    GodStep.IDownUp.call(this.containerHead, this.W, maxH); this.containerHead.setHitArea(0, -h/3, this.W, maxH+h/2);
    GodStep.IDownUp.call(this.containerArm, this.W, maxH);this.containerArm.setHitArea(0, -h/3, this.W, maxH+h/2);
    this.CH = maxH;

    this.currentTab = this.containerHead;
    this.containerArm.visible = false;
    this.containerHead.y = this.containerArm.y = this.CY = this.tab_arm.y + h * .6;

    GodStep.IDownUp.call(this.topContainer, this.W, this.CY - h);

    addEvent(this.b_back, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.tab_arm, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.tab_head, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);

    addEvent(this, GodStep.FRAME_MOVE, this.h_container);
    addEvent(this.containerHead, GodStep.FRAME_DOWN, this.h_container);
    addEvent(this.containerArm, GodStep.FRAME_DOWN, this.h_container);

    this.visible = false;

};
extend(AG.Shop, GodStep.Frame);

pro.h_items = function(e) {
    var t = e.content.t;
    var p = t.parent.parent.parent;
    var s = p.soul;

    switch (e.type) {
        case GodStep.FRAME_UP:
           if(p.isMoved == false) {
                if(t.isLocked) {

                } else {
                    GodStep.playSound('button', 0, AG.SOUND);
                    var player = GodStep.LoadLocal(p.soul.PLAYER_SLOT) || AG.PLAYER;
                    p.dialog.lastItem = t;
                    if(t.isPurchased) {
                        if(t.isEquip) {
                            t.equip();
                            p.shopData.equip.splice(p.shopData.equip.indexOf(t.data[5]), 1);
                            GodStep.SaveLocal(p.shopData, p.soul.SHOP_SLOT);

                        } else {
                            if(p.dialog.visible == false) {
                                p.dialog.okType = 'equip';
                                p.dialog.show(t.data[0], AG.S('equipthisitem'), p.h_ok, p.h_no);
                            }
                        }
                    } else {
                        if(p.dialog.visible == false) {
                            if (player.totalMoney > t.getCost()) {
                                p.dialog.okType = 'buing';
                                p.dialog.show(t.data[0], AG.S('buythisitem'), p.h_ok, p.h_no, t.data[4]);

                            } else {
                                p.fieldNoMoney.visible = p.textNoMoney.visible = true;
                                p.fieldNoMoney.timer = 100;
                                trace('need ' + p.player.totalMoney + " / " + t.getCost());
                            }
                        }
                    }
                }
            }
            break;
    }
};
pro.update = function() {
    if(this.visible) {
        if(this.fieldNoMoney.timer-- == 0) {
            this.fieldNoMoney.timer = -1;
            this.fieldNoMoney.visible = this.textNoMoney.visible = false;
        } else {
            if(this.fieldNoMoney.timer < -10) {
                this.fieldNoMoney.timer = -10;
            }
        }
    }
};
pro.equipAll = function(levelID) {
    this.shopData = GodStep.LoadLocal(this.soul.SHOP_SLOT) || AG.SHOP;
    if(!this.shopData.items) {
        this.shopData.items = [];
    }
    var k;
    var items = AG.AmazingGrabber.ITEMS;
    var lastItem;
    for(var j = 0; j<items.length; j++) {
        lastItem = items[j];
        if(lastItem.data[5] <= levelID) {
            lastItem.unlock();
        }
        if(!lastItem.isPurchased) {
            for(k = 0; k<this.shopData.items.length; k++) {
                if(this.shopData.items[k] == lastItem.data[5]) {
                    lastItem.purchase();
                }
            }
            for(k = 0; k<this.shopData.equip.length; k++) {
                if(this.shopData.equip[k] == lastItem.data[5]) {
                    lastItem.equip();
                }
            }
        }
    }
};
pro.init = function() {
    setBackgroundColor('#c76424');
    this.visible = true;
    this.fieldNoMoney.timer = 0;

    var player = this.player = GodStep.LoadLocal(this.soul.PLAYER_SLOT) || AG.PLAYER;

    var levelID = -1;
    if(!player.totalScore) {
        levelID = 0;
        player.totalScore = 0;
    }

    this.levels = AG.AmazingGrabber.LEVELS;
    for(var i = 1; i<this.levels.length; i++) {
        if(this.levels[i] > player.totalScore) {
            levelID = i - 1;
            break;
        }
    }
    if(levelID == -1) {
        levelID = 1000000;
    }

   this.equipAll(levelID);


    this.totalMoney.setText((player.totalMoney || 0) + '');
};

pro.h_no = function(dialog) {
    GodStep.playSound('button', 0, AG.SOUND);

    dialog.visible = false;
};
pro.h_ok = function(dialog) {
    GodStep.playSound('button', 0, AG.SOUND);

    var shop = dialog.parent, i, item;
    //if(shop.items)
    switch (dialog.okType) {
        case 'equip':

            var isEquiped = false;
            for(i = 0; i<shop.items.length; i++) {
                item = shop.items[i];
                if(item.isEquip) {
                    var id = dialog.lastItem.data[2];
                    var id2 = id;
                    if(id == 'head1') {
                        id2 = 'head8';
                    }
                    if(id == 'head8') {
                        id2 = 'head1';
                    }
                    if(item.data[2] == id || item.data[2] == id2) {
                        item.equip();
                        isEquiped = true;
                        shop.shopData.equip.push(item.data[5]);
                        GodStep.SaveLocal(shop.shopData, p.soul.SHOP_SLOT);
                    }
                }
            }
            if(!isEquiped) {
                shop.shopData.equip.push(dialog.lastItem.data[5]);
                GodStep.SaveLocal(shop.shopData, shop.soul.SHOP_SLOT);
                dialog.lastItem.equip();
            }
            break;
        case 'buing':
            var p = dialog.parent;
            var player = GodStep.LoadLocal(p.soul.PLAYER_SLOT) || AG.PLAYER;
            player.totalMoney -= dialog.lastItem.data[4];
            p.totalMoney.setText((player.totalMoney || 0) + '');
            dialog.lastItem.purchase();
            dialog.lastItem.equip();
            p.shopData.equip.push(dialog.lastItem.data[5]);
            p.shopData.items.push(dialog.lastItem.data[5]);
            GodStep.SaveLocal(player, p.soul.PLAYER_SLOT);
            GodStep.SaveLocal(p.shopData, p.soul.SHOP_SLOT);
            break;
    }
};
pro.h_container = function(e){
    var t = e.target;

    switch (e.type) {
        case GodStep.FRAME_MOVE:
            if(t.isDown) {
                if(e.content.getLocalPosition)  {
                    var p = e.content.getLocalPosition(t);
                    var oh = t.soul.OH/ t.scale.x - t.CY;
                    if(Math.abs(p.y - t.moveDownPoint.y) > t.W * .05) {
                        t.isMoved = true;
                   }
                    t.containerArm.y = t.containerHead.y =  Math.min(t.CY, Math.max(p.y - t.currentTab.downPoint.y + t.y, t.CY + oh - t.CH));
                }
            }
            break;
        case GodStep.FRAME_DOWN:

            break;
    }
};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    if(!p.isGameOver) {
        switch (t) {
            case p.tab_arm:
                GodStep.playSound('button', 0, AG.SOUND);

                if(p.tab_head.isSelected) {
                    p.currentTab = p.containerArm;
                    p.containerArm.visible = true;
                    p.containerHead.visible = false;
                    p.tab_arm.isSelected = true;
                    p.tab_arm.alpha = 1;
                    p.tab_head.alpha = .3;
                }
                break;
            case p.tab_head:
                GodStep.playSound('button', 0, AG.SOUND);

                if(p.tab_arm.isSelected) {
                    p.currentTab = p.containerHead;

                    p.containerArm.visible = false;
                    p.containerHead.visible = true;
                    p.tab_head.isSelected = true;
                    p.tab_head.alpha = 1;
                    p.tab_arm.alpha = .3;
                }
                break;
            case p.b_back:
                GodStep.playSound('button', 0, AG.SOUND);

                s.screenTo([s.startmenu], p);
                break;
        }
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    if(t) {
        switch (e.type) {
            case GodStep.FRAME_DOWN:
                var p = e.content.getLocalPosition(t);
                t.moveDownPoint = p;
                t.isMoved = false;
                break;
            case GodStep.FRAME_UP:
                if(e.content.target.soul) {
                    t.b_back.isDown = false;
                    t.b_back.Scale = 1;
                }
                break;
        }
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
        this.scale.x = this.scale.y = value;
        this.back.Scale = value;
        this.container.y = -this.y;

       // this.maska.y = this.currentTab.y;
        this.maska.clear();
        this.maska.beginFill(0, 1);
        this.maska.drawRect(0,this.CY - this.H *.1 - this.y , this.W, - this.CY + this.H *.1 +  (this.soul.OH) / this.scale.x);
        this.dialog.popUp.scale.x = this.back.top.scale.x;
        this.dialog.popUp.scale.y = this.back.top.scale.y;

    }
});
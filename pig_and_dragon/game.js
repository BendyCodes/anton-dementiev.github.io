class App extends Phaser.Game {
    constructor() {
        const gameConfig = {
            width: 760,
            height: 640,
            renderer: Phaser.AUTO,
            transparent: true
        };
        super(gameConfig);
        this.state.add('Boot', states.Boot, false);
        this.state.add('Preloader', states.Preloader, false);
        this.state.start('Boot');
    }
}
let TEXTURE_ATLAS = 'TEXTURE_ATLAS';
let game;
window.onload = () => {
    game = new App();
};
class ClipPopUpValentineRewardSelect extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'ClipPopUpValentineRewardSelect' + '0000'));
        let btn_get_rewardFrmBase = 'btn_get_rewardFrmBase';
        this.btn_get_reward = new Phaser.Button(game, 134, 417, TEXTURE_ATLAS, null, null, btn_get_rewardFrmBase + '0000', btn_get_rewardFrmBase + '0000', btn_get_rewardFrmBase + '0000', btn_get_rewardFrmBase + '0000');
        this.btn_get_reward.input.pixelPerfectClick = true;
        this.btn_get_reward.input.pixelPerfectAlpha = 1;
        this.btn_get_reward.input.useHandCursor = true;
        let btn_no_thanksFrmBase = 'btn_no_thanks';
        this.btn_no_thanks = new Phaser.Button(game, 156, 417, TEXTURE_ATLAS, null, null, btn_no_thanksFrmBase + '0000', btn_no_thanksFrmBase + '0000', btn_no_thanksFrmBase + '0000', btn_no_thanksFrmBase + '0000');
        this.btn_no_thanks.input.pixelPerfectClick = true;
        this.btn_no_thanks.input.pixelPerfectAlpha = 1;
        this.btn_no_thanks.input.useHandCursor = true;
        this.txt_again = new Phaser.Sprite(game, 24, 121, TEXTURE_ATLAS, 'txt_again' + '0000');
        this.add(this.txt_again);
        this.txt_choose = new Phaser.Sprite(game, 31, 121, TEXTURE_ATLAS, 'txt_choose' + '0000');
        this.add(this.txt_choose);
        //not added _mcPop["item_reward_" + i]
    }
}
class IconCoin extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'IconCoin' + '0000'));
    }
}
class Invite_friends_list_item extends Phaser.Group {
    constructor() {
        super(game);
        this.icon_check = new Phaser.Sprite(game, 2, 12, TEXTURE_ATLAS, 'icon_check' + '0000');
        this.add(this.icon_check);
        this.mc_user_pic = new Phaser.Sprite(game, 22, 8, TEXTURE_ATLAS, 'mc_user_pic' + '0000');
        this.mc_user_pic.addChild(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'mc_user_pictures' + '0000'));
        this.add(this.mc_user_pic);
    }
}
class Mc_x_mas_sale_icon extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'Mc_x_mas_sale_icon' + '0000'));
    }
}
class Popup_CrossPromotion extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, -11, 31, TEXTURE_ATLAS, 'Popup_CrossPromotion' + '0000'));
        let btnFrmBase = 'btn_play';
        this.btn_play = new Phaser.Button(game, 185, 456, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_play.input.pixelPerfectClick = true;
        this.btn_play.input.pixelPerfectAlpha = 1;
        this.btn_play.input.useHandCursor = true;
        this.add(this.btn_play);
        let btn_closeFrmBase = 'btn_close';
        this.btn_close = new Phaser.Button(game, 499, 108, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
    }
}
class Popup_HappyHoliday_sale extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'Popup_HappyHoliday_sale' + '0000'));
        let btnFrmBase = 'btn_shop';
        this.btn_shop = new Phaser.Button(game, 213, 443, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_shop.input.pixelPerfectClick = true;
        this.btn_shop.input.pixelPerfectAlpha = 1;
        this.btn_shop.input.useHandCursor = true;
        this.add(this.btn_shop);
        let btn_closeFrmBase = 'btn_close';
        this.btn_close = new Phaser.Button(game, 581, 75, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
    }
}
class Popup_valentine_event_alert extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 87, -19, TEXTURE_ATLAS, 'Popup_valentine_event_alert' + '0000'));
        let btnFrmBase = 'btn_gotit';
        this.btn_gotit = new Phaser.Button(game, 216, 443, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_gotit.input.pixelPerfectClick = true;
        this.btn_gotit.input.pixelPerfectAlpha = 1;
        this.btn_gotit.input.useHandCursor = true;
        this.add(this.btn_gotit);
    }
}
class clip_popup_new_request_key extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_new_request_key' + '0000'));
        let btn_askfriendsFrmBase = 'btn_askfriends';
        this.btn_askfriends = new Phaser.Button(game, 120, 477, TEXTURE_ATLAS, null, null, btn_askfriendsFrmBase + '0000', btn_askfriendsFrmBase + '0000', btn_askfriendsFrmBase + '0000', btn_askfriendsFrmBase + '0000');
        this.btn_askfriends.input.pixelPerfectClick = true;
        this.btn_askfriends.input.pixelPerfectAlpha = 1;
        this.btn_askfriends.input.useHandCursor = true;
        let btn_closeFrmBase = 'btn_close';
        this.btn_close = new Phaser.Button(game, 582, 79, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
        this.user_box_0 = new user_box();
        this.user_box_0.position.set(75, 161);
        this.add(this.user_box_0);
        this.user_box_1 = new user_box();
        this.user_box_1.position.set(175, 161);
        this.add(this.user_box_1);
        this.user_box_2 = new user_box();
        this.user_box_2.position.set(274, 161);
        this.add(this.user_box_2);
    }
}
class clip_popup_play extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_play' + '0000'));
        // this.txt_level = x:122, y:24
        let btn_playFrmBase = 'btn_play';
        this.btn_play = new Phaser.Button(game, 118, 487, TEXTURE_ATLAS, null, null, btn_playFrmBase + '0000', btn_playFrmBase + '0000', btn_playFrmBase + '0000', btn_playFrmBase + '0000');
        this.btn_play.input.pixelPerfectClick = true;
        this.btn_play.input.pixelPerfectAlpha = 1;
        this.btn_play.input.useHandCursor = true;
        this.add(this.btn_play);
        let btn_closeFrmBase = 'btn_close';
        this.btn_close = new Phaser.Button(game, 368, 64, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
        this.clip_goal_desc = new Phaser.Group(game, this);
        this.clip_goal_desc.position.set(34, 194);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_goal_desc' + '0000'));
        //this.clip_goal_desc.txt_goal_score = x:74, y:9
        this.clip_goal_desc["icon_goal_star"] = new Phaser.Sprite(game, 30, 9, TEXTURE_ATLAS, 'icon_goal_star' + '0000');
        this.clip_goal_desc.add(this.clip_goal_desc["icon_goal_star"]);
        this.add(this.clip_goal_desc);
        let _labels = ["s_0101", "s_0106", "s_0103", "s_0104", "s_0102", "s_0105"];
        for (let i = 0; i < _labels.length; i++)
            this.clip_goal_desc["icon_goal_star"].animations.add(_labels[i], Phaser.Animation.generateFrameNames('icon_goal_star', i, i, '', 4), 60, false);
        this.clip_goal_desc["icon_goal_star"]["gotoAndStop"] = (label) => {
            this.clip_goal_desc["icon_goal_star"].animations.stop(label);
        };
        this.mc_goal_blocks = new Phaser.Group(game, this);
        this.mc_goal_blocks.position.set(34, 246);
        this.clip_goal_desc["gotoAndStop"] = (lstGoalBlocks) => {
            this.mc_goal_blocks.removeAll();
            this.mc_goal_blocks.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'mc_goal_blocks' + '0000'));
            let _y = 4;
            let _x = [
                [126],
                [76, 205],
                [34, 136, 239],
                [24, 98, 172, 246],
                [13, 75, 137, 200, 262],
            ];
            for (let k = 0; k <= lstGoalBlocks; k++) {
                let b = new Phaser.Sprite(game, _x[lstGoalBlocks][k], _y, TEXTURE_ATLAS, 'mc_goal_block_' + '0000');
                this.mc_goal_blocks.add(b);
                this.mc_goal_blocks["mc_goal_block_" + k] = b;
                let _labels = ["b_0101", "b_0103", "b_0104", "b_0102", "b_0105", "b_0106", "b_0301", "b_0501", "b_0701", "b_0803", "b_1504", "b_7001", "b_7002", "b_6003", "b_6002", "b_6001", "b_1601"];
                for (var _i = 0; _i < _labels.length; _i++) {
                    b.animations.add(_labels[_i], Phaser.Animation.generateFrameNames('mc_goal_block_', _i, _i, '', 4), 60, false);
                }
                b["gotoAndStop"] = (label) => {
                    b.animations.stop(label);
                };
                // b["txt_count"] = x:41, y:13
            }
        };
    }
}
class clip_popup_shop_tooltip extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_shop_tooltip' + '0000'));
        // this.tooltip_item_name = x:3, y:2
        // this.tooltip_desc = x:2, y:32
    }
}
class clip_popup_success extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_success' + '0000'));
        // this.txt_level = x:122, y:24
        let btn_btn_continueFrmBase = 'btn_continue';
        this.btn_continue = new Phaser.Button(game, 120, 477, TEXTURE_ATLAS, null, null, btn_btn_continueFrmBase + '0000', btn_btn_continueFrmBase + '0000', btn_btn_continueFrmBase + '0000', btn_btn_continueFrmBase + '0000');
        this.btn_continue.input.pixelPerfectClick = true;
        this.btn_continue.input.pixelPerfectAlpha = 1;
        this.btn_continue.input.useHandCursor = true;
        let btn_closeFrmBase = 'btn_close';
        this.btn_close = new Phaser.Button(game, 367, 64, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
        this.clip_reward_gold = new Phaser.Group(game, this);
        this.clip_reward_gold.position.set(35, 390);
        this.clip_reward_gold.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_reward_gold' + '0000'));
        /*this.clip_reward_gold["clip_reward_gold"] =
        this.clip_reward_gold.add(this.clip_reward_gold["clip_reward_gold"]);*/
        this.check_share = new Phaser.Group(game, this);
        this.check_share.position.set(53, 439);
        // this.check_share.txt_share =
        this.check_share["icon_check"] = new Phaser.Sprite(game, 1, 2, TEXTURE_ATLAS, 'icon_check' + '0000');
        this.check_share.add(this.check_share["icon_check"]);
    }
}
class clip_popup_thanksGiving extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_thanksGiving' + '0000'));
        let btn_okFrmBase = 'btn_ok';
        this.btn_ok = new Phaser.Button(game, 225, 517, TEXTURE_ATLAS, null, null, btn_okFrmBase + '0000', btn_okFrmBase + '0000', btn_okFrmBase + '0000', btn_okFrmBase + '0000');
        this.btn_ok.input.pixelPerfectClick = true;
        this.btn_ok.input.pixelPerfectAlpha = 1;
        this.btn_ok.input.useHandCursor = true;
        this.add(this.btn_ok);
        let btn_closeFrmBase = 'btn_close';
        this.btn_close = new Phaser.Button(game, 583, 80, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
    }
}
class clip_rankingboard extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_rankingboard' + '0000'));
        let btn_sendtoallFrmBase = 'btn_sendtoall';
        this.btn_sendtoall = new Phaser.Button(game, 67, 350, TEXTURE_ATLAS, null, null, btn_sendtoallFrmBase + '0000', btn_sendtoallFrmBase + '0000', btn_sendtoallFrmBase + '0000', btn_sendtoallFrmBase + '0000');
        this.btn_sendtoall.input.pixelPerfectClick = true;
        this.btn_sendtoall.input.pixelPerfectAlpha = 1;
        this.btn_sendtoall.input.useHandCursor = true;
        this.mc_ranker_group = new Phaser.Group(game, this);
        this.mc_ranker_group.position.set(22, 65);
    }
}
class clip_scroll_bar_s extends Phaser.Group {
    constructor() {
        super(game);
        this.scroll_track = new Phaser.Sprite(game, -6, 0, TEXTURE_ATLAS, 'scroll_track' + '0000');
        this.add(this.scroll_track);
        this.scroll_thumb = new Phaser.Sprite(game, -8, 17, TEXTURE_ATLAS, 'scroll_thumb' + '0000');
        this.add(this.scroll_thumb);
        //txt_user_name
    }
}
class clip_tbox_commingsoon extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_tbox_commingsoon' + '0000'));
    }
}
class effect_landmark_stageunlock extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'effect_landmark_stageunlock' + '0000'));
        this.scale.set(3, 3);
        this.add(this.view);
        this.view.animations.add('playingAnimation', Phaser.Animation.generateFrameNames('t_box_unlock_effect', 0, 18, '', 4), 60, false);
    }
}
class mc_lobby_navi extends Phaser.Group {
    constructor() {
        super(game);
        let btn_scroll_upbtnFrmBase = 'btn_scroll_up';
        this.btn_scroll_up = new Phaser.Button(game, 41, 20, TEXTURE_ATLAS, null, null, btn_scroll_upbtnFrmBase + '0001', btn_scroll_upbtnFrmBase + '0003', btn_scroll_upbtnFrmBase + '0002', btn_scroll_upbtnFrmBase + '0000');
        this.btn_scroll_up.input.pixelPerfectClick = true;
        this.btn_scroll_up.input.pixelPerfectAlpha = 1;
        this.btn_scroll_up.input.useHandCursor = true;
        this.add(this.btn_scroll_up);
        let btn_scroll_down_btnFrmBase = 'btn_scroll_down';
        this.btn_scroll_down = new Phaser.Button(game, 41, 98, TEXTURE_ATLAS, null, null, btn_scroll_down_btnFrmBase + '0001', btn_scroll_down_btnFrmBase + '0003', btn_scroll_down_btnFrmBase + '0002', btn_scroll_down_btnFrmBase + '0000');
        this.btn_scroll_down.input.pixelPerfectClick = true;
        this.btn_scroll_down.input.pixelPerfectAlpha = 1;
        this.btn_scroll_down.input.useHandCursor = true;
        this.add(this.btn_scroll_down);
        let btn_home_btnFrmBase = 'btn_home_btnFrmBase';
        this.btn_home = new Phaser.Button(game, 0, 27, TEXTURE_ATLAS, null, null, btn_home_btnFrmBase + '0001', btn_home_btnFrmBase + '0003', btn_home_btnFrmBase + '0002', btn_home_btnFrmBase + '0000');
        this.btn_home.input.pixelPerfectClick = true;
        this.btn_home.input.pixelPerfectAlpha = 1;
        this.btn_home.input.useHandCursor = true;
        this.add(this.btn_home);
    }
}
class mc_popUpShopItem extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 87, -19, TEXTURE_ATLAS, 'Popup_valentine_event_alert' + '0000'));
        let btnFrmBase = 'btn_lock';
        this.btn_lock = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null, btnFrmBase + '0000', btnFrmBase + '0000', btnFrmBase + '0000', btnFrmBase + '0000');
        this.btn_lock.input.pixelPerfectClick = true;
        this.btn_lock.input.pixelPerfectAlpha = 1;
        this.btn_lock.input.useHandCursor = true;
        let btn_cancel_FrmBase = 'btn_cancel';
        this.btn_cancel = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null, btn_cancel_FrmBase + '0001', btn_cancel_FrmBase + '0003', btn_cancel_FrmBase + '0002', btn_cancel_FrmBase + '0000');
        this.btn_cancel.input.pixelPerfectClick = true;
        this.btn_cancel.input.pixelPerfectAlpha = 1;
        this.btn_cancel.input.useHandCursor = true;
        let btn_buy_jewel_FrmBase = 'btn_buy_jewel';
        this.btn_buy_jewel = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null, btn_buy_jewel_FrmBase + '0001', btn_buy_jewel_FrmBase + '0003', btn_buy_jewel_FrmBase + '0002', btn_buy_jewel_FrmBase + '0000');
        this.btn_buy_jewel.input.pixelPerfectClick = true;
        this.btn_buy_jewel.input.pixelPerfectAlpha = 1;
        this.btn_buy_jewel.input.useHandCursor = true;
        let btn_buy_btn_buy_coin = 'btn_buy_coin';
        this.btn_buy_coin = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null, btn_buy_btn_buy_coin + '0001', btn_buy_btn_buy_coin + '0003', btn_buy_btn_buy_coin + '0002', btn_buy_btn_buy_coin + '0000');
        this.btn_buy_coin.input.pixelPerfectClick = true;
        this.btn_buy_coin.input.pixelPerfectAlpha = 1;
        this.btn_buy_coin.input.useHandCursor = true;
        this.icon_using = new Phaser.Sprite(game, 6, 5, TEXTURE_ATLAS, 'icon_using' + '0000');
        this.item_icon_cover = new Phaser.Sprite(game, 7, 5, TEXTURE_ATLAS, 'item_icon_cover' + '0000');
        this.iid_ = new Phaser.Sprite(game, 7, 5, TEXTURE_ATLAS, 'iid_9' + '0000');
        this.add(this.iid_);
        this.add(this.item_icon_cover);
        this.add(this.icon_using);
        this.add(this.btn_buy_coin);
        this.add(this.btn_buy_jewel);
        this.add(this.btn_cancel);
        this.add(this.btn_lock);
    }
    gotoAndStop(label) {
        this.iid_.frameName = label;
    }
}
class selector extends Phaser.Group {
    constructor() {
        super(game);
        this.view = new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'selector' + '0000');
        this.add(this.view);
        game.add.tween(this.view.scale).to({ x: 0.9, y: 0.9 }, 1000, Phaser.Easing.Default, true, 0, -1, true);
    }
}
class t_box extends Phaser.Group {
    constructor() {
        super(game);
        this.box_1 = new Phaser.Sprite(game, 0, 7, TEXTURE_ATLAS, 'box_' + '0000');
        this.add(this.box_1);
        this.box_2 = new Phaser.Sprite(game, 43, 0, TEXTURE_ATLAS, 'box_' + '0000');
        this.add(this.box_2);
        this.box_3 = new Phaser.Sprite(game, 86, 7, TEXTURE_ATLAS, 'box_' + '0000');
        this.add(this.box_3);
    }
}
class t_box_unlock_effect extends Phaser.Group {
    constructor() {
        super(game);
        this.view = new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 't_box_unlock_effect' + '0000');
        this.scale.set(3, 3);
        this.add(this.view);
        this.view.animations.add('playingAnimation', Phaser.Animation.generateFrameNames('t_box_unlock_effect', 0, 38, '', 4), 60, false);
    }
    play() {
        this.view.animations.play('playingAnimation');
    }
    stop() {
        this.view.animations.stop();
    }
}
class user_box extends Phaser.Group {
    constructor() {
        super(game);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'user_box_' + '0000'));
        this.user_pic = new Phaser.Sprite(game, 5, 5, TEXTURE_ATLAS, 'user_box_' + '0000');
        this.add(this.user_pic);
        let btn_askFrmBase = 'btn_ask';
        this.btn_ask = new Phaser.Button(game, 0, 76, TEXTURE_ATLAS, null, null, btn_askFrmBase + '0000', btn_askFrmBase + '0000', btn_askFrmBase + '0000', btn_askFrmBase + '0000');
        this.btn_ask.input.pixelPerfectClick = true;
        this.btn_ask.input.pixelPerfectAlpha = 1;
        this.btn_ask.input.useHandCursor = true;
        //txt_user_name = x:-3, y:79
    }
}
var states;
(function (states) {
    class Boot extends Phaser.State {
        init() {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            if (this.game.device.android) {
                this.game.input.mouse.enabled = !this.game.device.mspointer;
            }
            this.game.stage.disableVisibilityChange = true;
        }
        create() {
            this.input.maxPointers = 1;
            if (this.game.device.desktop) {
                this.game.canvas.oncontextmenu = function (e) {
                    e.preventDefault();
                };
            }
            this.game.state.start('Preloader', true, false);
        }
    }
    states.Boot = Boot;
})(states || (states = {}));
var src;
(function (src) {
    class GameArea extends Phaser.Group {
        constructor(level) {
            super(game, null);
            this.level = level;
        }
        showThis() {
            let d = 350;
            game.add.tween(this.grid).to({ y: this.grid['centralizedY'] }, d).start();
            return d;
        }
        hideThis() {
            let d = 350;
            game.add.tween(this.grid).to({ y: '-' + game.height }, d).start();
            return d;
        }
        createThis() {
            GameArea.instance = this;
            this.add(new Phaser.Image(game, 0, 0, 'ingamebg'));
            this.globalContainer = new Phaser.Group(game, null);
            this.add(this.globalContainer);
            let line = src.Constants.LEVELS_DATA[this.level]['line'];
            let gridData = [];
            for (let l of line) {
                let spl = l.split('\t');
                spl = spl.filter(function (a) { return a !== ''; });
                let arrNum = [];
                for (let s of spl) {
                    arrNum.push(parseInt(s));
                }
                gridData.push(arrNum);
            }
            let _gridData = [];
            for (let i = 0; i < gridData.length; i++) {
                for (let j = 0; j < gridData[i].length; j++) {
                    if (_gridData.length <= j)
                        _gridData.push([]);
                    _gridData[j].push(gridData[i][j]);
                }
            }
            this.grid = new src.Grid(_gridData, 0, 0, 66, src.Constants.LEVELS_DATA[this.level]["-objects"], this);
            this.grid.x = -10;
            this.grid.y = -12;
            let dur = this.grid.buildCandies(false);
            this.globalContainer.add(this.grid);
            src.CommonUtils.centralize(this.grid);
            this.grid['centralizedY'] = this.grid.y;
            this.grid.setCandiesInputEnabled(false);
            src.CommonUtils.createTimer(dur, () => { this.grid.setCandiesInputEnabled(true); }, this);
            this.grid.y -= game.height;
        }
    }
    GameArea.instance = null;
    src.GameArea = GameArea;
})(src || (src = {}));
///<reference path="../showcase/window/GameArea.ts"/>
var states;
(function (states) {
    var GameArea = src.GameArea;
    class Preloader extends Phaser.State {
        preload() {
            super.preload(this.game);
            this.buildChildren();
            this.preloadContent();
        }
        buildChildren() {
            this.game.load.onFileComplete.add(this.onFileComplete, this);
            this.game.load.onLoadComplete.add(this.onLoadingComplete, this);
        }
        preloadContent() {
            this.game.load.atlasJSONArray(TEXTURE_ATLAS, 'img/' + TEXTURE_ATLAS + '.png', 'img/' + TEXTURE_ATLAS + '.json');
            this.game.load.atlasJSONArray('gameTexture', 'img/' + 'gameTexture' + '.png', 'img/' + 'gameTexture' + '.json');
            this.game.load.image('ingamebg', 'img/' + 'ingamebg' + '.png');
        }
        create() {
        }
        onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        }
        onLoadingComplete() {
            let gameArea = new GameArea(1);
            this.add.existing(gameArea);
            gameArea.createThis();
            gameArea.showThis();
        }
    }
    states.Preloader = Preloader;
})(states || (states = {}));
var src;
(function (src) {
    class Grid extends Phaser.Group {
        constructor(gridData, startX, startY, cellWidth, allowedObjectIndexes, gameArea) {
            super(game, null, 'grid');
            this.isInputDown = false;
            this.isCandiesInputEnabled = true;
            this.score = 0;
            this.matchedOnlyScore = 0;
            this.selectedElement1 = null;
            this.selectedElement2 = null;
            this.swappingElementsDuration = 145;
            this.minChainLengthToGetABonus = 3;
            this.isLevelCompleted = false;
            //--------------------HINTs HELPER-------------------------
            this.hintTimer = null;
            this.highlightedForHintElements = null;
            this.gridData = gridData;
            this.rows = this.gridData.length;
            this.cols = this.gridData[0].length;
            this.startX = startX;
            this.startY = startY;
            this.cellWidth = cellWidth;
            this.cellHeight = cellWidth;
            this.spacingHorizontal = cellWidth;
            this.spacingVertical = this.cellHeight;
            this.inputEnableChildren = true;
            this.allowedObjectIndexes = allowedObjectIndexes.slice();
            this.gameArea = gameArea;
            this.frosenIceContainer = new Phaser.Group(game, null);
            this.buildCells();
            this.initNeighborhood();
            game.input.onDown.add(() => { this.isInputDown = true; }, this);
            game.input.onUp.add(() => { this.isInputDown = false; }, this);
        }
        randomFillUp(usingDelayBetweenCandies = true, isTotalBuilding = false, baseDelay = 50) {
            let k = 0;
            let maxK = 0;
            let emptyCells = [];
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[i].length; j++) {
                    let cell = this.getCellAt(i, j);
                    if (!cell)
                        continue;
                    if (cell.isEmpty()) {
                        emptyCells.push(cell);
                    }
                    if (cell.frozenCount > 0) {
                        if (this.gameArea.level != 4) {
                            for (let k = j + 1; k < this.cells[i].length; k++) {
                                let cell = this.getCellAt(i, k);
                                if (cell && cell.isEmpty() && cell.frozenCount > 0) {
                                    emptyCells.push(cell);
                                }
                            }
                            break;
                        }
                    }
                }
            }
            if (emptyCells.length > 0) {
                let prevCellPos = null;
                let placeElement = (_cell, _element) => {
                    if (usingDelayBetweenCandies) {
                        if (!prevCellPos) {
                            prevCellPos = new Phaser.Point();
                        }
                        else {
                            if (prevCellPos.x != _cell.posX) {
                                k = 0;
                            }
                        }
                        prevCellPos.set(_cell.posX, _cell.posY);
                        this.placeElementAt(_cell, _element, k++ * baseDelay);
                        if (k > maxK)
                            maxK = k;
                    }
                    else {
                        this.placeElementAt(_cell, _element, 0);
                    }
                };
                let generatedCandyKinds = [];
                for (let i = 0; i < emptyCells.length; i++) {
                    generatedCandyKinds.push(src.Constants.KIND_MATCH_ELEMENTS +
                        (isTotalBuilding || Math.random() > 0.9 ? Phaser.ArrayUtils.getRandomItem(this.allowedObjectIndexes) :
                            this.allowedObjectIndexes[Math.floor(i / emptyCells.length * this.allowedObjectIndexes.length)])
                        + "_");
                }
                for (let i = 0; i < emptyCells.length && generatedCandyKinds.length > 0; i++) {
                    let cell = emptyCells[i];
                    let generatedKind = null;
                    let notEmptyNeighbors = cell.getNotEmptyNeighbors();
                    let notEmptyNeighborsKinds = [];
                    for (let nc of notEmptyNeighbors)
                        notEmptyNeighborsKinds.push(nc.getCandy().kind);
                    for (let _kind of notEmptyNeighborsKinds) {
                        if (Math.random() < (isTotalBuilding ?
                            src.Constants.TOTAL_BUILDING_SIMILARITY_LEVEL_PROBABILITY : src.Constants.SIMILARITY_LEVEL_PROBABILITY)) {
                            let ind = generatedCandyKinds.indexOf(_kind);
                            if (ind >= 0) {
                                generatedKind = generatedCandyKinds[ind];
                                generatedCandyKinds.splice(ind, 1);
                                break;
                            }
                        }
                    }
                    if (!generatedKind) {
                        for (let kk = generatedCandyKinds.length - 1; kk >= 0; kk--) {
                            let ind = notEmptyNeighborsKinds.indexOf(generatedCandyKinds[kk]);
                            if (ind < 0) {
                                generatedKind = generatedCandyKinds[kk];
                                generatedCandyKinds.splice(ind, 1);
                                break;
                            }
                        }
                        if (!generatedKind)
                            generatedKind = Phaser.ArrayUtils.removeRandomItem(generatedCandyKinds);
                    }
                    placeElement(cell, new src.Element(generatedKind));
                }
            }
            // if (isTotalBuilding) {
            src.CommonUtils.createTimer(maxK * baseDelay + 1000 / 60, this.matchAllGrid, this);
            // }
            return maxK * baseDelay;
        }
        getRandomMatchableElements() {
            let elements = [];
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    let c = this.getCellAt(i, j);
                    if (!c || c.frozenCount > 0)
                        continue;
                    let e = c.getCandy();
                    if (!e || !e.isAlive)
                        continue;
                    if (src.Constants.MATCHING_ELEMENTS.indexOf(e.kind) < 0)
                        continue;
                    let nen = c.getNotEmptyNeighbors();
                    for (let n of nen) {
                        if (n.frozenCount > 0)
                            continue;
                        let e2 = n.element;
                        if (!e2 || !e2.isAlive)
                            continue;
                        if (src.Constants.MATCHING_ELEMENTS.indexOf(e2.kind) < 0)
                            continue;
                        this.swapTwoElements(e, e2, true);
                        if (this.getMatchChain(e)) {
                            elements.push([e, e2]);
                        }
                        this.swapTwoElements(e, e2, true);
                    }
                }
            }
            if (elements.length == 0)
                return null;
            return Phaser.ArrayUtils.getRandomItem(elements);
        }
        setCandiesInputEnabled(enabled) {
            // this.isCandiesInputEnabled = enabled;/*console.log(enabled);*/
        }
        buildCells() {
            this.cells = [];
            for (let i = 0; i < this.rows; i++) {
                this.cells[i] = [];
                for (let j = 0; j < this.cols; j++) {
                    if (this.gridData[i][j] == 0) {
                        this.cells[i][j] = null;
                        continue;
                    }
                    this.cells[i][j] = new src.Cell(this, i, j, this.gridData[i][j] == 2 || this.gridData[i][j] == 7 || this.gridData[i][j] == 6 || this.gridData[i][j] == 5, this.gridData[i][j] == 3 || this.gridData[i][j] == 5 ? 1 : this.gridData[i][j] == 6 ? 2 : 0);
                    this.add(this.cells[i][j]);
                }
            }
            // console.log(this.cells)
        }
        initNeighborhood() {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if (this.existsCellAt(i, j)) {
                        this.cells[i][j].findNeighbors();
                    }
                }
            }
        }
        buildCandies(usingDelayBetweenCandies) {
            this.candiesContainer = new Phaser.Group(this.game, this, 'candiesContainer', false);
            this.fallingOutCandiesContainer = new Phaser.Group(this.game, this, 'fallingOutCandiesContainer', false);
            this.add(this.fallingOutCandiesContainer);
            this.add(this.candiesContainer);
            this.add(this.frosenIceContainer);
            this.candies = [];
            let dur = this.randomFillUp(usingDelayBetweenCandies, true);
            src.CommonUtils.createTimer(dur, this.startHintTimerCountdown, this);
            return dur;
        }
        /**
         * GETTERS & SETTERS
         */
        getCellAt(i, j) {
            if (!this.existsCellAt(i, j)) {
                return null;
            }
            return this.cells[i][j];
        }
        getCellRelatively(targetCell, displaced, dx, dy) {
            if (!targetCell)
                return null;
            return this.getCellAt(targetCell.posX + dx, targetCell.posY + dy);
        }
        existsCellAt(i, j) {
            return !(i < 0 || j < 0 || i >= this.rows || !this.cells[i] || j >= this.cols || !this.cells[i][j]);
        }
        getCellUnderMouse() {
            return this.getCellUnderPoint(this.game.input.activePointer.x, this.game.input.activePointer.y);
        }
        getCellUnderPoint(pX, pY) {
            let minDistance = 100000;
            let foundCell = null;
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    let cell = this.getCellAt(i, j);
                    if (cell) {
                        let p = this.toLocal(new PIXI.Point(pX, pY), game.world);
                        let distance = Phaser.Math.distance(cell.position.x, cell.position.y, p.x, p.y);
                        if (distance < minDistance && distance < Math.max(this.cellWidth, this.cellHeight)) {
                            minDistance = distance;
                            foundCell = cell;
                        }
                    }
                }
            }
            return foundCell;
        }
        getElementAt(i, j) {
            let cell = this.getCellAt(i, j);
            return cell ? cell.element : null;
        }
        placeElementAt(cell, candy, delayedShow) {
            if (this.getElementAt(cell.posX, cell.posY)) {
                if (candy.kind == src.Constants.KIND_GOLD)
                    console.log('candy.kind==Constants.KIND_GOLD');
                return;
            }
            cell.setElement(candy);
            this.candies.push(candy);
            this.candiesContainer.add(candy);
            candy.placeAt(this, cell.posX, cell.posY, delayedShow);
        }
        removeCandy(element) {
            if (this.candies.indexOf(element) > -1) {
                this.candies.splice(this.candies.indexOf(element), 1);
            }
            let c = this.getCellAt(element.posX, element.posY);
            if (!c)
                return;
            c.removeElement();
            this.candiesContainer.remove(element, false);
            // candy.isAlive = false;
            return element;
        }
        dropCandyDown(fromCell, toCell) {
            var candy = fromCell.element;
            fromCell.removeElement();
            toCell.setElement(candy);
            return candy.fallDownTo(this, toCell.posY);
        }
        tryRemoveElementAnimating(e, delayMultipler, match = null, givingScores = true) {
            let c = this.getCellAt(e.posX, e.posY);
            let res = c.tryToUnfreaze();
            if (res == src.Cell.WAS_ALREADY_UNFROZEN) {
                c.tryToUnsetTarget();
                this.checkTargetCellsLeft();
                this.removeCandy(e);
                this.fallingOutCandiesContainer.add(e);
                e.playDisappearingAnimation(delayMultipler);
                this.startHintTimerCountdown();
                if (givingScores) {
                    if (src.Constants.MATCHING_ELEMENTS.indexOf(e.kind) >= 0) {
                        let matchedOnlyScore = this.matchedOnlyScore;
                        this.matchedOnlyScore += 5;
                        let goldGenerTrashold = 350;
                        if (Math.floor(this.matchedOnlyScore / goldGenerTrashold) > Math.floor(matchedOnlyScore / goldGenerTrashold)) {
                            this.placeElementAt(this.getCellAt(e.posX, e.posY), new src.Element(src.Constants.KIND_GOLD), 0 /*75*/);
                        }
                        this.score += 5;
                        // this.gameArea.setScore(this.score);
                    }
                    else if (e.kind == src.Constants.KIND_COIN) {
                        this.score += 50;
                        // this.gameArea.setScore(this.score);
                    }
                }
            }
            if (this.selectedElement1 == e)
                this.selectedElement1 = null;
            if (this.selectedElement2 == e)
                this.selectedElement2 = null;
        }
        takeCoin(coin) {
            game.tweens.removeFrom(coin);
            this.tryRemoveElementAnimating(coin, 0);
            this.updateGravityAndFillUp(50);
            // this.gameArea.onCoinTaken();
        }
        generateCoins(defPosX, defPosY) {
            let placeCoinAt = (cell) => {
                if (cell.getCandy()) {
                    this.tryRemoveElementAnimating(cell.getCandy(), 0, null, false);
                }
                let coin = new src.Element(src.Constants.KIND_COIN);
                this.placeElementAt(cell, coin, 0);
                game.add.tween(coin).to({ alpha: 0.85 }, 150, Phaser.Easing.Linear.None, true, 5000, 5, true)
                    .onComplete.addOnce(() => {
                    game.add.tween(coin).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true)
                        .onComplete.addOnce(() => {
                        coin['readyToBeRemoved'] = true;
                    }, this);
                }, this);
            };
            placeCoinAt(this.getCellAt(defPosX, defPosY));
            let applicableCells = [];
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    let cell = this.getCellAt(i, j);
                    if (cell && !cell.isTarget && cell.frozenCount == 0 &&
                        (!cell.getCandy() || src.Constants.MATCHING_ELEMENTS.indexOf(cell.getCandy().kind) >= 0)) {
                        applicableCells.push(cell);
                    }
                }
            }
            for (let i = 0; i < 4 && applicableCells.length > 0; i++) {
                placeCoinAt(Phaser.ArrayUtils.removeRandomItem(applicableCells));
            }
            src.CommonUtils.createTimer(200, () => { this.setCandiesInputEnabled(true); }, this);
            src.CommonUtils.createTimer(7500, () => {
                let b = false;
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        let c = this.getCellAt(i, j);
                        if (c && c.element && c.element.isAlive && c.element.kind == src.Constants.KIND_COIN && c.element['readyToBeRemoved']) {
                            c.element['readyToBeRemoved'] = false;
                            this.tryRemoveElementAnimating(c.element, 0, null, false);
                            b = true;
                        }
                    }
                }
                if (b)
                    this.updateGravityAndFillUp(50);
            }, this);
        }
        onTryingToSelectElement1(targetElement) {
            if (!this.isCandiesInputEnabled)
                return;
            if (this.getCellAt(targetElement.posX, targetElement.posY).frozenCount > 0)
                return;
            if (targetElement.kind.indexOf(src.Constants.KIND_MATCH_ELEMENTS) == 0) {
                if (!this.selectedElement1) {
                    this.selectedElement1 = targetElement;
                    this.selectedElement1.setHighlighted(true);
                }
                else {
                    this.onTryingToSelectElement2(targetElement);
                }
            }
            else {
                let successful = this.tryToChoose(targetElement);
                if (successful) {
                    // this.hideHint();
                    // SoundController.instance.playPlayerSelClickSound();
                    this.setCandiesInputEnabled(false);
                }
            }
        }
        onTryingToSelectElement2(targetElement) {
            if (!this.isCandiesInputEnabled)
                return;
            if (this.getCellAt(targetElement.posX, targetElement.posY).frozenCount > 0)
                return;
            if (!this.isInputDown)
                return;
            if (!this.selectedElement1)
                return;
            if (targetElement == this.selectedElement1)
                return;
            if (this.selectedElement2)
                return;
            if (this.getCellAt(this.selectedElement1.posX, this.selectedElement1.posY).getNeighbors().indexOf(this.getCellAt(targetElement.posX, targetElement.posY)) < 0) {
                this.selectedElement1.setHighlighted(false);
                this.selectedElement1 = targetElement;
                this.selectedElement1.setHighlighted(true);
                return;
            }
            if (targetElement.kind.indexOf(src.Constants.KIND_MATCH_ELEMENTS) == 0) {
                this.selectedElement2 = targetElement;
                this.selectedElement2.setHighlighted(true);
                this.swapElements();
                let successful1 = this.tryToChoose(this.selectedElement1);
                let successful2 = this.tryToChoose(this.selectedElement2);
                if (successful1 || successful2) {
                    this.setCandiesInputEnabled(false);
                    src.CommonUtils.createTimer(this.swappingElementsDuration, () => {
                        if (this.selectedElement1) {
                            this.selectedElement1.setHighlighted(false);
                            this.selectedElement1 = null;
                        }
                        if (this.selectedElement2) {
                            this.selectedElement2.setHighlighted(false);
                            this.selectedElement2 = null;
                        }
                    }, this);
                }
                else {
                    src.CommonUtils.createTimer(this.swappingElementsDuration, () => {
                        this.swapElements();
                        src.CommonUtils.createTimer(this.swappingElementsDuration, () => {
                            if (this.selectedElement1)
                                this.selectedElement1.setHighlighted(false);
                            if (this.selectedElement2)
                                this.selectedElement2.setHighlighted(false);
                            this.selectedElement1 = this.selectedElement2 = null;
                        }, this);
                    }, this);
                }
            }
        }
        swapElements(immediate = false) {
            this.startHintTimerCountdown();
            this.swapTwoElements(this.selectedElement1, this.selectedElement2, immediate);
        }
        swapTwoElements(e1, e2, immediate = false) {
            if (!e1 || !e2)
                return;
            let cell1 = this.getCellAt(e1.posX, e1.posY);
            let cell2 = this.getCellAt(e2.posX, e2.posY);
            cell2.setElement(e1);
            cell1.setElement(e2);
            let f = (c) => {
                c.element.posX = c.posX;
                c.element.posY = c.posY;
                if (immediate) {
                    c.element.x = this.startX + c.element.posX * this.spacingHorizontal;
                    c.element.y = this.startY + c.element.posY * this.spacingVertical;
                }
                else {
                    game.add.tween(c.element).to({
                        x: this.startX + c.element.posX * this.spacingHorizontal, y: this.startY + c.element.posY * this.spacingVertical
                    }, this.swappingElementsDuration, Phaser.Easing.Default, true);
                }
            };
            f(cell1);
            f(cell2);
        }
        matchAllGrid() {
            if (!this.parent || !this.parent.parent || !this.parent.parent.parent) {
                console.log('!this.parent || !this.parent.parent || !this.parent.parent.parent');
                return;
            }
            let b = false;
            let generateBonusesAtCells = null;
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    let c = this.getCellAt(i, j);
                    if (c && c.element && c.element.isAlive) {
                        if (src.Constants.MATCHING_ELEMENTS.indexOf(c.element.kind) >= 0) {
                            let f = (chain) => {
                                if (!c.element)
                                    return;
                                if (chain.length >= this.minChainLengthToGetABonus) {
                                    if (!generateBonusesAtCells)
                                        generateBonusesAtCells = [];
                                    generateBonusesAtCells.push(this.getCellsOf(chain));
                                }
                                let match = chain.slice().concat(c.element);
                                this.tryRemoveElementAnimating(c.element, 0);
                                for (let i = 0; i < chain.length; i++)
                                    this.tryRemoveElementAnimating(chain[i], i + 1, match);
                            };
                            let hm = this.getMatchChainHorizontal(c.element);
                            let vm = this.getMatchChainVertical(c.element);
                            if (hm)
                                f(hm);
                            if (vm)
                                f(vm);
                            if (hm || vm) {
                                if (!b) {
                                    this.setCandiesInputEnabled(false);
                                    b = true;
                                }
                            }
                        }
                    }
                }
            }
            if (b) {
                this.playElemRemoveSnd();
                this.updateGravityAndFillUp(50, generateBonusesAtCells);
            }
            else {
                if (!this.getRandomMatchableElements()) {
                    let elements = [];
                    for (let i = 0; i < this.rows; i++) {
                        for (let j = 0; j < this.cols; j++) {
                            let c = this.getCellAt(i, j);
                            if (c && !c.isTarget && c.frozenCount == 0) {
                                let e = c.getCandy();
                                if (e) {
                                    elements.push(e);
                                }
                            }
                        }
                    }
                    let rndEl = Phaser.ArrayUtils.getRandomItem(elements);
                    this.removeCandy(rndEl);
                    this.placeElementAt(this.getCellAt(rndEl.posX, rndEl.posY), new src.Element(src.Constants.KIND_GOLD), 0);
                    // console.log(rndEl.posX, rndEl.posY)
                }
            }
        }
        tryToChoose(targetCandy) {
            if (!targetCandy || !targetCandy.isAlive)
                return;
            let successful = false;
            switch (targetCandy.kind) {
                case src.Constants.KIND_CLEAN_COLUMN:
                    this.cleanColumn(targetCandy);
                    successful = true;
                    break;
                case src.Constants.KIND_CLEAN_ROW:
                    this.cleanRow(targetCandy);
                    successful = true;
                    break;
                case src.Constants.KIND_CLEAN_COLUMN_AND_ROW:
                    this.cleanColumnAndRow(targetCandy);
                    successful = true;
                    break;
                case src.Constants.KIND_GOLD:
                    this.generateCoins(targetCandy.posX, targetCandy.posY);
                    // successful = true;
                    break;
                case src.Constants.KIND_COIN:
                    this.takeCoin(targetCandy);
                    // successful = true;
                    break;
                default: //Constants.KIND_MATCH_ELEMENTS:
                    successful = this.tryToMatch(targetCandy);
                    break;
            }
            return successful;
        }
        getMatchChainVertical(element) {
            let chain = null;
            for (let j = element.posY - 1; j >= 0; j--) {
                let neighborElement = this.getElementAt(element.posX, j);
                if (element.matchableWith(neighborElement)) {
                    if (!chain)
                        chain = [];
                    chain.push(neighborElement);
                }
                else {
                    break;
                }
            }
            for (let j = element.posY + 1; j < this.cols; j++) {
                let neighborElement = this.getElementAt(element.posX, j);
                if (element.matchableWith(neighborElement)) {
                    if (!chain)
                        chain = [];
                    chain.push(neighborElement);
                }
                else {
                    break;
                }
            }
            return chain && chain.length >= 2 ? chain : null;
        }
        getMatchChainHorizontal(element) {
            let chain = null;
            for (let i = element.posX - 1; i >= 0; i--) {
                let neighborElement = this.getElementAt(i, element.posY);
                if (element.matchableWith(neighborElement)) {
                    if (!chain)
                        chain = [];
                    chain.push(neighborElement);
                }
                else {
                    break;
                }
            }
            for (let i = element.posX + 1; i < this.rows; i++) {
                let neighborElement = this.getElementAt(i, element.posY);
                if (element.matchableWith(neighborElement)) {
                    if (!chain)
                        chain = [];
                    chain.push(neighborElement);
                }
                else {
                    break;
                }
            }
            return chain && chain.length >= 2 ? chain : null;
        }
        getMatchChain(element) {
            let hm = this.getMatchChainHorizontal(element);
            if (hm)
                return hm;
            return this.getMatchChainVertical(element);
        }
        getCellsOf(elements) {
            let cells = [];
            for (let e of elements)
                cells.push(this.getCellAt(e.posX, e.posY));
            return cells;
        }
        /**
         * Private menthods
         */
        tryToMatch(element, updateGravityAndFillUp = true) {
            let f = (chain) => {
                let match = chain.slice().concat(element);
                let generateBonusesAtCells = chain.length >= this.minChainLengthToGetABonus ? [this.getCellsOf(chain)] : null; //doesn't gnerate bonuses mathing all grid
                this.tryRemoveElementAnimating(element, 0);
                for (let i = 0; i < chain.length; i++)
                    this.tryRemoveElementAnimating(chain[i], i + 1, match);
                if (updateGravityAndFillUp) {
                    this.updateGravityAndFillUp(100, generateBonusesAtCells);
                }
            };
            let hm = this.getMatchChainHorizontal(element);
            let vm = this.getMatchChainVertical(element);
            if (hm)
                f(hm);
            if (vm)
                f(vm);
            if (hm != null || vm != null) {
                this.playElemRemoveSnd();
                return true;
            }
            return false;
        }
        checkTargetCellsLeft() {
            if (this.isLevelCompleted)
                return;
            this.setCandiesInputEnabled(false);
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = this.cells[i].length - 1; j >= 0; j--) {
                    let c = this.getCellAt(i, j);
                    if (c && c.isTarget)
                        return;
                }
            }
            this.isLevelCompleted = true;
            this.destroyHitTimer();
            console.log('level completed');
        }
        playElemRemoveSnd() {
            src.CommonUtils.createTimer(src.Constants.CANDY_ANIMATION_BASE_DELAY, () => {
            }, this);
        }
        onCleanColumnOrRowElement(posX, posY, targetElement) {
            if (this.getCellAt(posX, posY)) {
                let e = this.getElementAt(posX, posY);
                if (e) {
                    if (e.kind == src.Constants.KIND_GOLD) {
                        this.generateCoins(e.posX, e.posY);
                    }
                    else if (e.kind == src.Constants.KIND_COIN) {
                        this.takeCoin(e);
                    }
                    else if (e.kind == src.Constants.KIND_CLEAN_COLUMN || e.kind == src.Constants.KIND_CLEAN_ROW || e.kind == src.Constants.KIND_CLEAN_COLUMN_AND_ROW) {
                        if (e != targetElement)
                            this.tryToChoose(e);
                        this.tryRemoveElementAnimating(e, 0);
                    }
                    else {
                        this.tryRemoveElementAnimating(e, 0);
                    }
                }
            }
        }
        cleanRow(targetElement) {
            this.playElemRemoveSnd();
            for (let i = 0; i < this.rows; i++)
                this.onCleanColumnOrRowElement(i, targetElement.posY, targetElement);
            this.updateGravityAndFillUp(src.Constants.CANDY_ANIMATION_BASE_DELAY);
        }
        cleanColumn(targetElement) {
            this.playElemRemoveSnd();
            for (let i = 0; i < this.cols; i++)
                this.onCleanColumnOrRowElement(targetElement.posX, i, targetElement);
            this.updateGravityAndFillUp(src.Constants.CANDY_ANIMATION_BASE_DELAY);
        }
        cleanColumnAndRow(targetElement) {
            this.playElemRemoveSnd();
            let posY = targetElement.posY;
            for (let i = 0; i < this.cols; i++)
                this.onCleanColumnOrRowElement(targetElement.posX, i, targetElement);
            for (let i = 0; i < this.rows; i++)
                this.onCleanColumnOrRowElement(i, posY, targetElement);
            this.updateGravityAndFillUp(src.Constants.CANDY_ANIMATION_BASE_DELAY);
        }
        updateGravityAndFillUp(baseDelay = 50, generateBonusesAtCells = null) {
            src.CommonUtils.createTimer(baseDelay, () => {
                if (!this.parent || !this.parent.parent || !this.parent.parent.parent)
                    return;
                let cellsForBonuses = null;
                if (generateBonusesAtCells) {
                    cellsForBonuses = [];
                    for (let k = 0; k < generateBonusesAtCells.length; k++) {
                        cellsForBonuses.push(Phaser.ArrayUtils.getRandomItem(generateBonusesAtCells[k]));
                    }
                }
                if (cellsForBonuses) {
                    let kinds = [
                        src.Constants.KIND_CLEAN_COLUMN, src.Constants.KIND_CLEAN_ROW, src.Constants.KIND_CLEAN_COLUMN_AND_ROW
                    ];
                    for (let k = 0; k < cellsForBonuses.length; k++) {
                        this.placeElementAt(cellsForBonuses[k], new src.Element(Phaser.ArrayUtils.getRandomItem(kinds)), 0);
                    }
                }
                let duration = this.updateGravity();
                src.CommonUtils.createTimer(duration /* + Constants.CANDY_ANIMATION_BASE_DURATION*/, () => {
                    let dur = this.randomFillUp(true, false, baseDelay);
                    src.CommonUtils.createTimer(dur, () => { this.setCandiesInputEnabled(true); }, this);
                }, this);
            }, this);
        }
        updateGravity() {
            let duration = 0;
            /*let kindsToSkip:string[] = [
                Constants.KIND_CLEAN_COLUMN, Constants.KIND_CLEAN_ROW, Constants.KIND_CLEAN_COLUMN_AND_ROW
            ];*/
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = this.cells[i].length - 1; j >= 0; j--) {
                    let cell = this.getCellAt(i, j);
                    if (!cell || !cell.isEmpty())
                        continue;
                    for (let k = j - 1; k >= 0; k--) {
                        let _cell = this.getCellAt(i, k);
                        // if (_cell && _cell.getCandy() && kindsToSkip.indexOf(_cell.getCandy().kind) >= 0) break;
                        if (!_cell)
                            break;
                        if (_cell.frozenCount > 0)
                            break;
                        if (!_cell.isEmpty()) {
                            let _duration = this.dropCandyDown(_cell, cell);
                            if (_duration > duration)
                                duration = _duration;
                            break;
                        }
                    }
                }
            }
            return duration + src.Constants.CANDY_ANIMATION_BASE_DELAY;
        }
        destroyHitTimer() {
            if (this.highlightedForHintElements) {
                for (let e of this.highlightedForHintElements) {
                    e.setHighlighted(false);
                    if (e['hintTween']) {
                        game.tweens.remove(e['hintTween']);
                        e['hintTween'] = null;
                    }
                }
                this.highlightedForHintElements = null;
            }
            if (this.hintTimer) {
                src.CommonUtils.destroyTimer(this.hintTimer);
                this.hintTimer = null;
            }
        }
        startHintTimerCountdown() {
            this.destroyHitTimer();
            if (this.isLevelCompleted || !this.gameArea)
                return;
            this.hintTimer = src.CommonUtils.createTimer(6000, this.showHint, this);
        }
        showHint() {
            if (this.isLevelCompleted || !this.parent || !this.gameArea)
                return;
            // this.destroyHitTimer();
            let rme = this.getRandomMatchableElements();
            if (!rme)
                return;
            this.highlightedForHintElements = rme;
            let f = (e) => {
                if (!this.highlightedForHintElements)
                    return;
                e.setHighlighted(true);
                e['hintTween'] = game.add.tween(e)
                    .to({ angle: 20 }, 145)
                    .to({ angle: -20 }, 125)
                    .to({ angle: 15 }, 155)
                    .to({ angle: -15 }, 140)
                    .to({ angle: 18 }, 135)
                    .to({ angle: -18 }, 160)
                    .to({ angle: 20 }, 145)
                    .to({ angle: -20 }, 135)
                    .to({ angle: 0 }, 120);
                e['hintTween'].onComplete.addOnce(() => {
                    e.setHighlighted(false);
                    src.CommonUtils.createTimer(1750, () => { f(e); }, this);
                }, this);
                e['hintTween'].start();
            };
            f(rme[0]);
            f(rme[1]);
        }
    }
    src.Grid = Grid;
})(src || (src = {}));
///<reference path="Grid.ts"/>
var src;
(function (src) {
    class Cell extends Phaser.Group {
        constructor(grid, posX, posY, isTarget = false, frozenCount = 0) {
            super(game, null);
            this.element = null;
            this.targetSpriteBG = null;
            this.frozenSprite = null;
            this.grid = grid;
            this.posX = posX;
            this.posY = posY;
            this.position = new Phaser.Point(this.grid.startX + this.posX * this.grid.spacingHorizontal, this.grid.startY + this.posY * this.grid.spacingVertical);
            let spr = new Phaser.Sprite(game, 0, 0, 'gameTexture', 'cellBG1_0000');
            spr.anchor.set(0.5, 0.5);
            this.add(spr);
            spr = new Phaser.Sprite(game, 0, 0, 'gameTexture', 'cellBG2_0000');
            spr.anchor.set(0.5, 0.5);
            this.add(spr);
            this.isTarget = isTarget;
            if (this.isTarget) {
                this.targetSpriteBG = new Phaser.Sprite(game, 0, 0, 'gameTexture', 'cellTargetBG_0000');
                this.targetSpriteBG.anchor.set(0.5, 0.5);
                this.add(this.targetSpriteBG);
            }
            this.frozenCount = frozenCount;
            if (this.frozenCount > 0) {
                this.frozenSprite = new Phaser.Sprite(game, this.x, this.y, 'gameTexture', 'frozen_0000');
                this.frozenSprite.animations.add('1', Phaser.Animation.generateFrameNames('frozen_', 0, 0, '', 4), 30, false);
                this.frozenSprite.animations.add('2', Phaser.Animation.generateFrameNames('frozen_', 1, 1, '', 4), 30, false);
                this.frozenSprite.anchor.set(0.5, 0.5);
                this.frozenSprite.play('' + this.frozenCount);
                this.grid.frosenIceContainer.addAt(this.frozenSprite, 0);
            }
        }
        tryToUnfreaze() {
            if (this.frozenCount == 0)
                return Cell.WAS_ALREADY_UNFROZEN;
            this.frozenCount--;
            let p = this.grid.frosenIceContainer.toLocal(this.frozenSprite.position, this.frozenSprite.parent);
            for (let i = 0; i < 8; i++) {
                let s = new Phaser.Sprite(game, p.x, p.y, 'gameTexture', 'iceCrash_0000');
                // s.scale.x = s.scale.y = Math.random() + 1;
                let scl = Math.random() * 1 + 0.35;
                game.add.tween(s).to({ alpha: 0 }, 1000 + Math.random() * 500).start()
                    .onComplete.addOnce(() => { if (s.parent)
                    s.parent.removeChild(s); }, this);
                game.add.tween(s).to({ x: s.x + (Math.random() - 0.5) * 150, y: s.y + (Math.random() - 0.5) * 150 }, 500 + Math.random() * 500).start();
                game.add.tween(s.scale).to({ x: scl, y: scl }, 500 + Math.random() * 500).start();
                this.grid.frosenIceContainer.add(s);
            }
            if (this.frozenCount == 1) {
                game.add.tween(this.frozenSprite.scale).to({ x: 0.95, y: 0.95 }, 250, Phaser.Easing.Default, true, 0, 0, true);
                this.frozenSprite.play('1');
            }
            else if (this.frozenCount == 0) {
                game.add.tween(this.frozenSprite).to({ alpha: 0 }, 250).start()
                    .onComplete.addOnce(() => { if (this.frozenSprite.parent)
                    this.frozenSprite.parent.removeChild(this.frozenSprite); }, this);
            }
            return this.frozenCount == 0 ? Cell.IS_UNFROZEN : Cell.IS_STILL_FROZEN;
        }
        findNeighbors() {
            this.neighbors = [];
            this.neighborsMap = [];
            this.addNeighborAt(this.grid, 0, -1, Cell.TOP);
            this.addNeighborAt(this.grid, 0, 1, Cell.DOWN);
            this.addNeighborAt(this.grid, -1, 0, Cell.LEFT);
            this.addNeighborAt(this.grid, 1, 0, Cell.RIGHT);
        }
        getNeighbors() {
            return this.neighbors;
        }
        getNeighbor(position) {
            return this.neighborsMap[position];
        }
        setElement(element) {
            this.element = element;
            this.element.inputEnabled = true;
            this.element.input.useHandCursor = true;
            this.element.events.onInputDown.add(this.grid.onTryingToSelectElement1, this.grid, 0, this.element);
            this.element.events.onInputOver.add(this.grid.onTryingToSelectElement2, this.grid, 0, this.element);
        }
        getCandy() {
            return this.element;
        }
        tryToUnsetTarget() {
            if (!this.isTarget)
                return;
            this.isTarget = false;
            // game.add.tween(this.targetSpriteBG).to({alpha:0}, 250).start()
            game.add.tween(this.targetSpriteBG.scale).to({ x: 0.5, y: 0.5 }, 250, Phaser.Easing.Back.In).start()
                .onComplete.addOnce(() => { if (this.targetSpriteBG.parent)
                this.targetSpriteBG.parent.removeChild(this.targetSpriteBG); }, this);
            let p = this.grid.fallingOutCandiesContainer.toLocal(this.targetSpriteBG.position, this.targetSpriteBG.parent);
            for (let i = 0; i < 12; i++) {
                let s = new Phaser.Sprite(game, p.x, p.y /*this.targetSpriteBG.width*(Math.random() - 0.5), this.targetSpriteBG.height*(Math.random() - 0.5)*/, 'gameTexture', 'cellTargetBG_0000');
                s.anchor.set(0.5, 0.5);
                // s.scale.set(1);
                let rndsc = 0.2 + Math.random() * 0.35;
                this.grid.fallingOutCandiesContainer.add(s);
                this.game.add.tween(s.scale)
                    .to({
                    x: rndsc,
                    y: rndsc
                }, 250, Phaser.Easing.Back.In, true);
                this.game.add.tween(s)
                    .to({
                    x: this.x + (Math.random() * 200 + 60) * (Math.random() < 0.5 ? -1 : 1),
                    y: game.height,
                    angle: 360
                }, (game.height - s.y) / 525 * 1000, Phaser.Easing.Default, true, 250 + Math.random() * 100).start()
                    .onComplete.addOnce(() => { if (s.parent)
                    s.parent.removeChild(s); }, this);
            }
        }
        removeElement() {
            if (this.element) {
                this.element.inputEnabled = false;
                this.element.events.onInputDown.remove(this.grid.onTryingToSelectElement1, this.grid);
                this.element.events.onInputOver.remove(this.grid.onTryingToSelectElement2, this.grid);
                this.element = null;
            }
        }
        isEmpty() {
            return this.element ? false : true;
        }
        getNotEmptyNeighbors() {
            let arr = [];
            for (let neighbor of this.neighbors) {
                if (!neighbor.isEmpty()) {
                    arr.push(neighbor);
                }
            }
            return arr;
        }
        /**
         *  Helpers
         */
        addNeighborAt(grid, dx, dy, mapPosition) {
            if (grid.existsCellAt(this.posX + dx, this.posY + dy)) {
                this.neighbors.push(grid.getCellAt(this.posX + dx, this.posY + dy));
                this.neighborsMap[mapPosition] = grid.getCellAt(this.posX + dx, this.posY + dy);
            }
            else {
                this.neighborsMap[mapPosition] = null;
            }
        }
    }
    Cell.TOP = 0;
    Cell.DOWN = 1;
    Cell.LEFT = 3;
    Cell.RIGHT = 4;
    Cell.WAS_ALREADY_UNFROZEN = 0;
    Cell.IS_UNFROZEN = 1;
    Cell.IS_STILL_FROZEN = 2;
    src.Cell = Cell;
})(src || (src = {}));
var src;
(function (src) {
    class Element extends Phaser.Sprite {
        constructor(kind) {
            super(game, 0, 0, 'gameTexture', kind + '0000');
            this.kind = kind;
            this.anchor.setTo(0.46, 0.5);
            if (src.Constants.MATCHING_ELEMENTS.indexOf(this.kind) >= 0) {
                this.animations.add('default', Phaser.Animation.generateFrameNames(kind, 0, 0, '', 4), 30, false);
                this.animations.add('highlighted', Phaser.Animation.generateFrameNames(kind, 1, 1, '', 4), 30, false);
            }
            else if (this.kind == src.Constants.KIND_COIN) {
                this.animations.add('rotate', Phaser.Animation.generateFrameNames(kind, 0, 20, '', 4), 30, true);
                this.play('rotate');
            }
            else if (this.kind == src.Constants.KIND_GOLD) {
                this.animations.add('shine', Phaser.Animation.generateFrameNames(kind, 0, 54, '', 4), 30, true);
                this.play('shine');
                this.anchor.setTo(0.4, 0.6);
            }
            else {
                this.anchor.setTo(0.48, 0.52);
            }
            this.setHighlighted(false);
        }
        isHighlighted() {
            return this._isHighlighted;
        }
        setHighlighted(isHighlighted) {
            this._isHighlighted = isHighlighted;
            if (this._isHighlighted) {
                this.play('highlighted');
            }
            else {
                this.play('default');
            }
        }
        placeAt(grid, posX, posY, delayedShow) {
            this.isAlive = true;
            this.posX = posX;
            this.posY = posY;
            let destinationX = grid.startX + this.posX * grid.spacingHorizontal;
            let destinationY = grid.startY + this.posY * grid.spacingVertical;
            this.x = destinationX;
            this.y = destinationY - 10;
            this.alpha = 0;
            src.CommonUtils.createTimer(delayedShow, () => {
                this.alpha = 1;
                game.add.tween(this)
                    .to({ y: destinationY }, src.Constants.CANDY_ANIMATION_BASE_DURATION, Phaser.Easing.Back.Out)
                    .start();
                game.add.tween(this.scale)
                    .to({ x: 1.04, y: 0.92 }, 150, Phaser.Easing.Linear.None)
                    .to({ x: 1, y: 1 }, 130, Phaser.Easing.Linear.None)
                    .delay(src.Constants.CANDY_ANIMATION_BASE_DURATION)
                    .start();
            }, this);
        }
        fallDownTo(grid, posY) {
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.isAlive = true;
            let newY = grid.startY + posY * grid.spacingVertical;
            let duration = src.Constants.CANDY_FALLDOWN1CELL_BASE_DURATION * (Math.pow(posY - this.posY, 0.5));
            let delay = (grid.cols - this.posY) * 50;
            game.add.tween(this).to({ y: newY }, duration, Phaser.Easing.Cubic.InOut, true, delay);
            this.posY = posY;
            return duration + delay;
        }
        playDisappearingAnimation(delayMultipler) {
            if (this.isHighlighted()) {
                this.setHighlighted(false);
            }
            this.isAlive = false;
            // this.parent.setChildIndex(this, this.parent.children.length - 1);
            game.add.tween(this.scale)
                .to({
                x: 0.6,
                y: 0.6
            }, 500, Phaser.Easing.Back.In, true /*, Constants.CANDY_ANIMATION_BASE_DELAY * delayMultipler*/);
            game.add.tween(this)
                .to({
                x: this.x + (Math.random() * 100 + 40) * (Math.random() < 0.5 ? -1 : 1),
                y: game.height,
                angle: 360
            }, (game.height - this.y) / 450 * 1000, Phaser.Easing.Default, true, /*Constants.CANDY_ANIMATION_BASE_DELAY * delayMultipler +*/ 250).start()
                .onComplete.add(this.destroy, this);
        }
        matchableWith(otherElement) {
            return otherElement && otherElement.kind == this.kind;
        }
        /**
        *  Overridden methods
        */
        destroy(destroyChildren) {
            super.destroy(destroyChildren);
        }
    }
    src.Element = Element;
})(src || (src = {}));
var src;
(function (src) {
    class Constants {
    }
    Constants.CANDY_ANIMATION_BASE_DELAY = 100;
    Constants.CANDY_ANIMATION_BASE_DURATION = 200;
    Constants.CANDY_FALLDOWN1CELL_BASE_DURATION = 175;
    Constants.KIND_MATCH_ELEMENTS = 'element_matcher_';
    Constants.KIND_GOLD = 'element_gold_';
    Constants.KIND_COIN = 'element_coin_';
    Constants.KIND_CLEAN_COLUMN = 'element_cleanColumn_';
    Constants.KIND_CLEAN_ROW = 'element_cleanRow_';
    Constants.KIND_CLEAN_COLUMN_AND_ROW = 'element_cleanColumnAndRow_';
    //can change difficulty level
    Constants.MATCHING_ELEMENTS = ["element_matcher_0_", "element_matcher_1_", "element_matcher_2_", "element_matcher_3_", "element_matcher_4_", "element_matcher_5_", "element_matcher_6_"];
    Constants.SIMILARITY_LEVEL_PROBABILITY = 0.03;
    Constants.TOTAL_BUILDING_SIMILARITY_LEVEL_PROBABILITY = 0.06;
    Constants.LEVELS_DATA = [
        null,
        {
            "-objects": [0, 1, 2, 3, 4],
            "-time": "300",
            "line": [
                "	1	1	1	1	1	1	",
                "	1	1	1	1	1	1	",
                "	1	1	1	1	1	1	",
                "	1	1	1	1	1	1	",
                "	1	1	1	1	1	1	",
                "	1	1	1	1	1	1	"
            ]
        }
    ];
    src.Constants = Constants;
})(src || (src = {}));
var src;
(function (src) {
    class CommonUtils {
        static createTransScreenIfNotExist() {
            if (this.transScreen_ == null) {
                this.transScreen_ = new Phaser.Graphics(game);
                this.transScreen_.beginFill(0x000000, 1);
                this.transScreen_.drawRect(0, 0, game.width, game.height);
                this.transScreen_.endFill();
            }
        }
        static changeCurrentView(object) {
            this.createTransScreenIfNotExist();
            let g = () => {
                this.GAME_ART_GROUP.add(this.transScreen_);
                this.transScreen_.alpha = 0;
                let fn = (o1, o2) => {
                    return o1 instanceof src.GameArea && o2 instanceof src.GameArea ||
                        o1 instanceof src.GameArea;
                };
                let _alpha = fn(object, this.currentView) || fn(this.currentView, object) ? 0 : 1;
                game.add.tween(this.transScreen_).to({ alpha: _alpha }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                    .onComplete.addOnce(() => {
                    this.currentView.visible = false;
                    if (this.currentView['destroyThis'])
                        this.currentView['destroyThis']();
                    CommonUtils.GAME_ART_GROUP.remove(this.currentView, true, false);
                    this.currentView = object;
                    this.currentView.visible = true;
                    if (this.currentView['createThis'])
                        this.currentView['createThis']();
                    this.GAME_ART_GROUP.addAt(this.currentView, this.transScreen_.parent.getChildIndex(this.transScreen_));
                    game.add.tween(this.transScreen_).to({ alpha: 0 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                        .onComplete.addOnce(() => {
                        if (this.currentView['showThis']) {
                            let duration = this.currentView['showThis']();
                            CommonUtils.createTimer(duration, () => {
                                this.transScreen_.parent.removeChild(this.transScreen_);
                            });
                        }
                        else {
                            this.transScreen_.parent.removeChild(this.transScreen_);
                        }
                    }, this);
                }, this);
            };
            this.currentView['willBeReplacedWith'] = object;
            if (this.currentView['hideThis']) {
                let duration = this.currentView['hideThis']();
                CommonUtils.createTimer(duration, g);
            }
            else {
                g();
            }
        }
        static showTransScreen(overScreen, onMidComplete = null, onComplete = null) {
            this.createTransScreenIfNotExist();
            overScreen.parent.addChildAt(this.transScreen_, overScreen.parent.getChildIndex(overScreen) + 1);
            this.transScreen_.alpha = 0;
            game.add.tween(this.transScreen_).to({ alpha: 1 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                .onComplete.addOnce(() => {
                if (onMidComplete)
                    onMidComplete();
                game.add.tween(this.transScreen_).to({ alpha: 0 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                    .onComplete.addOnce(() => {
                    if (onComplete)
                        onComplete();
                    this.transScreen_.parent.removeChild(this.transScreen_);
                }, this);
            }, this);
        }
        static centralize(group) {
            if (group.parent) {
                let groupBounds = group.getBounds(group.parent);
                group.position.set(game.world.centerX - groupBounds.x - groupBounds.width / 2, game.world.centerY - groupBounds.y - groupBounds.height / 2);
            }
            return group;
        }
        static tweenScores(tf, targetScore, startScores = 0, onCompleteCallback = null, duration = 1500) {
            // let snd:Phaser.Sound = startScores != targetScore && tf.parent && tf.parent.parent ? SoundController.instance.playSound('sound922') : null;
            let mocObj;
            let i = 0;
            for (i = 0; i < this.mocObjArr.length; i++) {
                if (this.mocObjArr[i]["tf"] == tf) {
                    mocObj = this.mocObjArr[i];
                    game.tweens.removeFrom(mocObj);
                    mocObj["score"] = startScores;
                    break;
                }
            }
            if (i == this.mocObjArr.length) {
                mocObj = { 'score': startScores, 'tf': tf };
                this.mocObjArr.push(mocObj);
            }
            let tw = game.add.tween(mocObj)
                .to({ score: targetScore }, duration, Phaser.Easing.Linear.None /*Phaser.Easing.Exponential.In*/, true);
            tw.onUpdateCallback(() => {
                mocObj["tf"].text = "" + Math.round(mocObj["score"]);
            }, this);
            tw.onComplete.add(() => {
                mocObj["tf"].text = "" + Math.round(mocObj["score"]);
                this.mocObjArr.splice(this.mocObjArr.indexOf(mocObj), 1);
                if (onCompleteCallback) {
                    onCompleteCallback();
                }
                /*if (snd) {
                    snd.volume = 0;
                    if (tf.parent && tf.parent.parent) {
                    }

                }*/
            }, this);
        }
        static createTimer(delay, callback, callbackContext, ...args) {
            let timer = game.time.create(true);
            timer.add(delay, callback, callbackContext, ...args);
            timer.onComplete.add((_timer) => {
                let ind = CommonUtils.timers.indexOf(_timer);
                if (ind >= 0)
                    CommonUtils.timers.splice(ind, 1);
            }, this, 0, timer);
            CommonUtils.timers.push(timer);
            timer.start();
            return timer;
        }
        static destroyTimer(timer) {
            let ind = CommonUtils.timers.indexOf(timer);
            if (ind >= 0)
                CommonUtils.timers.splice(ind, 1);
            timer.destroy();
        }
        static createTimerRepeat(delay, repeatCount, callback, callbackContext, ...args) {
            let timer = game.time.create(true);
            timer.repeat(delay, repeatCount, callback, callbackContext, ...args);
            timer.onComplete.add((_timer) => {
                let ind = CommonUtils.timers.indexOf(_timer);
                if (ind >= 0)
                    CommonUtils.timers.splice(ind, 1);
            }, this, 0, timer);
            CommonUtils.timers.push(timer);
            timer.start();
            return timer;
        }
        static setPausedTimers(paused) {
            if (paused) {
                for (let t of CommonUtils.timers) {
                    t.pause();
                }
            }
            else {
                for (let t of CommonUtils.timers) {
                    t.resume();
                }
            }
        }
        static destroyAllTimers() {
            for (let t of CommonUtils.timers) {
                t.destroy();
            }
            this.removeAllTimers();
        }
        static removeAllTimers() {
            CommonUtils.timers.splice(0, CommonUtils.timers.length);
        }
        static addButtonTweens(targetButton, startScaleX = 1, startScaleY = 1, inputEnabled = true, playClickSound = true) {
            targetButton.inputEnabled = inputEnabled;
            targetButton.anchor.set(0.5, 0.5);
            targetButton.events.onInputOver.add(() => {
                game.add.tween(targetButton.scale).to({ x: 1.1 * startScaleX, y: 1.1 * startScaleY }, 100).start();
            }, this);
            targetButton.events.onInputOut.add(() => {
                game.add.tween(targetButton.scale).to({
                    x: startScaleX,
                    y: startScaleY
                }, 200, Phaser.Easing.Elastic.Out).start();
            }, this);
            targetButton['defY'] = targetButton.y;
            targetButton.events.onInputDown.add(() => {
                targetButton.y = targetButton['defY'];
                game.add.tween(targetButton).to({ y: targetButton['defY'] + 4 }, 50, Phaser.Easing.Default, true, 0, 0, true);
            }, this);
        }
        static removeButtonTweens(targetButton) {
            targetButton.events.onInputOver.removeAll(this);
            targetButton.events.onInputOut.removeAll(this);
            targetButton.events.onInputDown.removeAll(this);
            targetButton.events.onInputUp.removeAll(this);
        }
        static addButtonGroupTweens(targetButton, startScaleX = 1, startScaleY = 1) {
            targetButton.onChildInputOver.add(() => {
                game.add.tween(targetButton.scale).to({ x: 1.1 * startScaleX, y: 1.1 * startScaleY }, 250).start();
                // SoundController.instance.play_MouseOverSound();
            }, this);
            targetButton.onChildInputOut.add(() => {
                game.add.tween(targetButton.scale).to({
                    x: startScaleX,
                    y: startScaleY
                }, 500, Phaser.Easing.Elastic.Out).start();
            }, this);
        }
        static removeButtonGroupTweens(targetButton) {
            targetButton.onChildInputOver.removeAll(this);
            targetButton.onChildInputOut.removeAll(this);
        }
        static setAllChildrenInputEnabled(group, enabled) {
            for (let ch of group.children)
                ch['inputEnabled'] = enabled;
        }
        static detectBestRenderMode() {
            let isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0;
            let isMozilla = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            let bestRenderMode = isIE || isMozilla ? Phaser.CANVAS : Phaser.AUTO;
            return bestRenderMode;
        }
        static createTextField(x, y, textContent, size, color, font, lineSpacing = 0, stroke = null, strokeThickness = NaN, glow = null) {
            let tf = new Phaser.Text(game, x, y, textContent, {
                font: "" + size + "px " + font,
                boundsAlignH: "center",
                boundsAlignV: "middle",
                align: 'center'
            });
            tf.addColor(color, 0);
            tf.anchor.set(0.5, 0.5);
            tf.lineSpacing = lineSpacing;
            if (glow)
                tf.setShadow(0, 0, glow.color, glow.blur);
            if (stroke && !isNaN(strokeThickness)) {
                tf.stroke = stroke;
                tf.strokeThickness = strokeThickness;
            }
            return tf;
        }
        static createTextBtn(x, y, textContent, size, color, font, lineSpacing, stroke, strokeThickness, glow) {
            let tf = CommonUtils.createTextField(x, y, textContent, size, color, font, lineSpacing, stroke, strokeThickness, glow);
            CommonUtils.addButtonTweens(tf, 1, tf.scale.y, true, true);
            return tf;
        }
    }
    CommonUtils.currentView = null;
    CommonUtils.transScreen_ = null;
    CommonUtils.BETWEEN_WINDOW_ANIM_DURATION = 375;
    CommonUtils.mocObjArr = [];
    CommonUtils.timers = [];
    src.CommonUtils = CommonUtils;
})(src || (src = {}));
//# sourceMappingURL=game.js.map

SS.Assets = function(soul) {
    GodStep.DONT_RESIZE = ['Font2'];
    GodStep.Preloader.call(this, soul);
    this.fontLoaderClass = SS.Font;
};

extend(SS.Assets, GodStep.Preloader);

pro.load = function() {
    this.addChild(this.back = GodStep.Image.fromImage( SS.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload));
    this.addChild(this.logo = GodStep.Image.fromImage( SS.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( SS.IMAGE_PATH + 'loading.png', this.h_preload));

    var countLoaded = 0;
    if(this.back.texture.baseTexture.hasLoaded) {
        this.back.Scale = this.startS;
        this.back.anchor = new PIXI.Point(0.5, 0.5);
        this.back.place(this.W/2, this.H *.5);
        this.back.scale.y = this.soul.OH/ this.soul.H * this.startS;
        this.back.texture.baseTexture.isLoader = true;

        countLoaded++;
    }
    if(this.logo.texture.baseTexture.hasLoaded) {
        this.logo.Scale = this.startS;
        this.logo.anchor = new PIXI.Point(0.5, 0.5);
        this.logo.place(this.W/2, this.H *.3);
        this.logo.texture.baseTexture.isLoader = true;

        countLoaded++;
    }
    if(this.loading.texture.baseTexture.hasLoaded) {
        this.loading.Scale = this.startS;
        this.loading.anchor = new PIXI.Point(0.5, 0.5);
        this.loading.place(this.W/2, this.H *.7);
        this.loading.texture.baseTexture.isLoader = true;

        if(countLoaded == 2) {
            this.init();
        }
    }
};
pro.init = function() {
    var pngs = [
        'Font', 'crest', 'coin', 'bigCoin', 'crystal', 'fly', 'help', 'shop_up_field',
        'back_menu', 'button_more', 'button_play', 'button_options', 'logo', 'menu_field',
        'back', 'back_up', 'button_music', 'button_sound', 'button_up', 'button_progress', 'field', 'field_up', 'slider_on', 'slider_off',
        'button_accept', 'field_shop', 'icon_1', 'icon_2', 'icon_3', 'icon_4', 'icon_5', 'price',
        'button_back', 'button_replay', 'button_menu', 'sheriff_1', 'sheriff_2', 'accept_off', 'accept_on', 'coinShop', 'add_hammer',
        'field_game_over', 'icon_xp', 'icon_score', 'icon_record', 'button_shop', 'button_2_on', 'button_2_off',
        'button_pause', '2x_coins', '2x_score', 'back_0', 'back_1', 'back_3', 'bank_1', 'bank_2',
        'bubble_1', 'bubble_2', 'home_1_1', 'home_2_1',  'home_3_1', 'home_4_1',
        'field_ui', 'icon_1_bubble', 'icon_2_bubble', 'icon_3_bubble', 'icon_4_bubble', 'icon_5_bubble', 'icon_coin_game', 'icon_score_game', 'line_1', 'line_2', 'saloon_1', 'saloon_2', 'stone',
         '2coin_1', '2coin_2', '2coin_3', '2coin_4',  '2coin_5', '2coin_6',
        '2end_icon_1', '2end_icon_2', '2end_icon_3', '2end_icon_4', '2end_icon_5', '2run_icon_1', '2stay_icon_1', '2stay_run_icon_2', '2stay_run_icon_3', '2stay_run_icon_4', '2stay_run_icon_5',
        'back_arm_2',
        'coin_1', 'coin_2', 'coin_3', 'coin_4', 'coin_5', 'coin_6', 'end_1', 'end_2',
        'end_icon_1', 'end_icon_2' ,'end_icon_3', 'end_icon_4', 'end_icon_5', 'fail_1', 'fail_2', 'fail_3', 'fail_icon_1', 'fail_icon_2', 'fail_icon_3', 'fail_icon_4', 'fail_icon_5',
        'run_1_1', 'run_1_2',
        'start_1', 'start_2', 'start_3', 'start_4', 'start_5', 'start_6', 'start_7', 'start_8', 'start_9', 'stay_2',
        'button_1_off', 'button_1_on',
    ];
    var i, j;

    GodStep.Preloader.prototype.loadAll.call(this,
        SS.IMAGE_PATH, pngs, [],
        SS.SOUND_PATH,  ['button', 'balloon', 'catch', 'caught','fall', 'multiply', 'final', 'store_buy', ((this.soul.AUDIOTAG) ? 'loop_' : '')  + 'theme', 'diamond'], ['Font']);
};

pro.h_preload = function(e) {
    var img = this.image;
    var p = img.parent;
    img.Scale = p.startS;
    img.anchor = new PIXI.Point(0.5, 0.5);
    p.preloadState++;
    switch (img) {
        case p.back:
            p.back.scale.y = p.soul.OH/ p.soul.H * p.startS;
            p.back.place(p.W/2, p.H *.5);
            p.back.texture.baseTexture.isLoader = true;
            break;
        case p.logo:
            p.logo.place(p.W/2, p.H *.3);
            p.logo.texture.baseTexture.isLoader = true;

            break;
        case p.loading:
            p.loading.place(p.W/2,  p.H *.7);
            p.loading.texture.baseTexture.isLoader = true;

            break;
    }
    if(p.preloadState == 2) {
        p.init();
    }
};
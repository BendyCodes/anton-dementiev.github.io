
AG.Assets = function(soul) {
    GodStep.DONT_RESIZE = ['Font1', 'back_fundemic1', 'fundemic_logo', 'loading'];
    GodStep.Preloader.call(this, soul);
    this.createGraphics();
    this.addChild(this.text = new GodStep.Text('', '20', 'Arial', 'left', 0xffffff));
    this.text.y = soul.H * .06;
    this.text.x = soul.W * .02;
    this.graphics.alpha = .2;
    this.text.alpha = 1;
    this.text.visible = false;
    this.fontLoaderClass = AG.FontLoader;
};

extend(AG.Assets, GodStep.Preloader);

pro.trace = function(v) {
    this.text.setText(v);
    this.text.updateText();
    this.text.x = this.soul.W/2 - this.text.width/2;
};
pro.update = function() {
    GodStep.Preloader.prototype.update.call(this);

    if(this.visible) {
        var g = this.graphics;

        if(this.images) {
            if(0) {
                var w = this.soul.W;
                var h = this.soul.H;
                var wx = .2, wxl = .6;
                g.clear();
                g.lineStyle(3, 0x555555, 1);
                g.moveTo(w *wx, h *.05);
                g.lineTo(w *(wx + wxl), h*.05);
                g.moveTo(w *wx, h *.1);
                g.lineTo(w *(wx + wxl), h*.1);
                g.lineStyle(3, 0xffffff, 1);
                g.moveTo(w *wx, h *.05);
                g.lineTo(w *wx + w *wxl * (1 - this.images.length/this.imagesCount), h *.05);
                if((this.images.length > 0)) {
                //    this.trace(this.images.length + ' ' + (this.images.length >= 0) ? this.images[this.images.length - 1] : "");
                } else {
                    this.trace('No Images');
                }
                if(GodStep.Game.instance.sound) {
                    g.lineStyle(3, 0xffffff, 1);
                    g.moveTo(w *wx, h *.1);
                    g.lineTo(w *wx + w *wxl * (1 - Math.max(0, GodStep.Game.instance.sound.countLoaded)/this.soundsCount), h *.1);
                }
            }

        }
    }
};
pro.load = function() {
    this.addChildAt(this.back = GodStep.Image.fromImage( AG.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload), 0);
    this.addChild(this.logo = GodStep.Image.fromImage( AG.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( AG.IMAGE_PATH + ((AG.CLICK_JOGOS) ? 'loading_pt.png' : 'loading.png'), this.h_preload));

    this.maxCountLoaded = 2;
    if(AG.SOFT_GAMES) {
        this.maxCountLoaded++;
        this.addChild(this.logo_soft = GodStep.Image.fromImage( AG.IMAGE_PATH + 'logo_soft.png', this.h_preload)); //this.loading.visible = false;
    }
    var countLoaded = 0;
    if(this.logo.texture.baseTexture.hasLoaded) {
        this.logo.Scale = this.startS;
        this.logo.anchor = new PIXI.Point(0.5, 0.5);
        this.logo.place(this.W/2, this.H *.3);
        countLoaded++;
    }
    if(this.back.texture.baseTexture.hasLoaded) {
        this.back.Scale = this.startS;
        this.back.anchor = new PIXI.Point(0.5, 0.5);
        this.back.place(this.W/2, this.H *.5);
        this.back.scale.y = this.soul.OH/ this.soul.H * this.startS;

        countLoaded++;
    }
    if(this.loading.texture.baseTexture.hasLoaded) {
        this.loading.Scale = this.startS;
        this.loading.anchor = new PIXI.Point(0.5, 0.5);
        this.loading.place(this.W/2, this.H *.71);
        var d = parseInt(this.loading.texture.height/10);
        this.loading.texture.setFrame(new PIXI.Rectangle(0, d * (this.soul.lang.lang - 2), this.loading.texture.width, d));
        if(countLoaded == this.maxCountLoaded) {
            this.init();
        }
        countLoaded++;
    }
    if(AG.SOFT_GAMES) {
        if (this.logo_soft.texture.baseTexture.hasLoaded) {
            this.logo_soft.Scale = this.startS;
            this.logo_soft.anchor = new PIXI.Point(0.5, 0.5);
            this.logo_soft.place(this.W / 2, this.H *.58);

            if (countLoaded == this.maxCountLoaded) {
                this.init();
            }
        }
    }
};
pro.init = function() {
    var images = ['back_o1', 'logo_2', 'back_tile', 'menu_3', 'b_inapp', 'field_slider', 'slider_shadow', 'slider_1', 'slider_2', 'b_replay', 'back_end_down', 'back_end_up',
        'b_menu', 'inapp_3', 'coin', 'field_choose_on', 'cup', 'end_3', 'field_coin', 'b_shadow_lil', 'field_new_record',  'field_coin', 'character_2', 'field_cup', 'field_icons_end', 'b_options', 'b_play', 'b_shadow', 'b_music',
        'b_music_off', 'b_sound_off', 'b_sound', 'back_popup_options', 'b_y_n', 'window_options', 'window_inapp', 'back_popup_inapp', 'flash_1', 'jewel', 'safe_1', 'safe_2',
        'field_icons',  'field_icons_off',  'icons_lock', 'icons_shadow', 'x2', 'field_no_money',
        '1_damage_1', '1_damage_2', '1_damage_3', '1_damage_4', '1_damage_5',
        'tail_1', 'tail_2', 'tail_3', 'tail_4',
        'fall_1', 'fall_2', 'fall_3', 'fall_4', 'Font1',
        '2_damage_1', '2_damage_2', '2_damage_3', '2_damage_4', '2_damage_5', '2_damage_6',
        'b_back', 'b_ep', 'b_ep_shadow', 'head', 'mouth_1', 'mouth_2', 'mouth_3', 'mouth_4', 'mouth_5_1', 'mouth_5_2', 'mouth_5_3',
        'mouth_5_4', 'b_y_n_shadow', 'box_1', 'box_2', 'options_3', 'game_back', 'line', 'arm_1', 'arm_2', 'arm_3', 'eyes_1', 'eyes_2', 'eyes_3', 'eyes_1_1', 'eyes_4', 'eyes_4_1',
        'worm_1', 'worm_2', 'worm_3', 'worm_4', 'worm_5', 'worm_6', 'worm_7', 'worm_8', 'worm_grab',
        'candy_1', 'candy_2', 'candy_3', 'candy_4', 'candy_5', 'candy_6', 'candy_7', 'candy_8', 'candy_grab',
        'bear_1', 'bear_2', 'bear_3', 'bear_4', 'bear_5', 'bear_6', 'bear_grab',
        'fish_1', 'fish_2', 'fish_3', 'fish_4', 'fish_5', 'fish_6', 'fish_grab',
        'empty', 'tap_1', 'tap_2', 'tap_3', 'splash',
        'd_a_1', 'd_a_2', 'd_a_3_1', 'd_a_3_3', 'd_a_4_1', 'd_a_4_2', 'd_a_4_3', 'd_a_5', 'd_a_6', 'd_a_7_1', 'd_a_7_3', 'd_a_8_1', 'd_a_8_2', 'd_a_8_3', 'd_a_9', 'd_a_10', 'd_a_11_1', 'd_a_11_3', 'd_a_12_1', 'd_a_12_2', 'd_a_12_3',

        'd_h_1_1', 'd_h_1_2', 'd_h_1_l', 'd_h_1_r', 'd_h_2', 'd_h_3', 'd_h_4_1', 'd_h_4_2', 'd_h_4_3', 'd_h_4_4', 'd_h_4_5', 'd_h_5', 'd_h_6', 'd_h_7', 'd_h_8_1', 'd_h_8_2', 'd_h_8_3', 'd_h_8_3', 'd_h_8_4', 'd_h_8_5_3', 'd_h_8_5_2',
        'd_h_9', 'd_h_10', 'd_h_11_1', 'd_h_11_2', 'd_h_11_3', 'd_h_11_4', 'd_h_12', 'd_h_8_5_1',
        'device_1', 'device_2', 'face',
        '50_b_more', '50_b_pause', '50_back_pause'

    ];

    for(var i = 0; i<12; i++) {
        images.push('i_a_' + (i + 1));
        images.push('i_h_' + (i + 1));
    }
    GodStep.Preloader.prototype.loadAll.call(this,
        AG.IMAGE_PATH, images,  [],
        AG.SOUND_PATH,  ['button', 'catch', 'catch_1', 'catch_2', 'catch_3', 'daimond_fly', 'double_catch', 'theme_1', 'theme_2', 'voice_1', 'voice_2', 'voice_3', 'vault'],
        ['Font1.fnt']);

};
pro.loadSounds = function() {
    this.trace('StartLoadingSounds');
    GodStep.Preloader.prototype.loadSounds.call(this);
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
            break;
        case p.logo:
            p.logo.place(p.W/2, p.H *.3);
            break;
        case p.loading:
            var d = parseInt(p.loading.texture.height/10);
            p.loading.texture.setFrame(new PIXI.Rectangle(0, d * (p.soul.lang.lang - 2), p.loading.texture.width, d));
            p.loading.place(p.W/2,  p.H *.71);
            break;
        case p.logo_soft:
            p.logo_soft.place(p.W/2, p.H *.58);
            break;
    }
    if(p.preloadState == p.maxCountLoaded) {
        p.init();
    }
};
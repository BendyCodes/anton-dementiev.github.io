
M3.Assets = function(soul) {
    GodStep.DONT_RESIZE = ['Font2'];
    GodStep.Preloader.call(this, soul);
    this.isOnlyOneView = true;
    this.fontLoaderClass = M3.FontLoader;

};

extend(M3.Assets, GodStep.Preloader);

pro.load = function() {

    this.addChild(this.back = GodStep.Image.fromImage( M3.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload));
    this.addChild(this.logo = GodStep.Image.fromImage( M3.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( M3.IMAGE_PATH + 'loading.png', this.h_preload));

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
    var pngs = ['block', 'cell', 'dirt', 'blue', 'yellow', 'red', 'purple', 'green', 'cristal', 'delete', 'bonusVert', 'bonusGor',
        'Font2', 'back_menu', 'b_more', 'b_play', 'b_options', 'logo', 'field_button', 'b_more', 'sheriff', 'simbol', 'pers_back', 'pers_front', 'play_shadow', 'b_shadow',
        'back_o', 'b_back', 'tutorial_off', 'tutorial_on', 'pers_o', 'off', 'on', 'icon_music', 'icon_sound',
        'l_shadow', 'back_l', 'lock', 'unlock', 'pers_l', 'slider_1', 'slider_2', 'score', 'move', 'field_game',
        'back_1', 'back_2', 'back_3', 'sq1_2', 'sq3_2', 'sq3_1', 'sq2_2', 'sq1_1', 'sq2_1', 'e_1', 'e_2', 'e_3', 'egg', 'o_1', 'b_pause',
        '1_1mud_1', '1_2mud_1', '1_3mud_1',  '2_1mud_1', '2_2mud_1', '2_3mud_1', '1mud_2', '1mud_3', '1mud_4', '2mud_2', '2mud_3', '2mud_4','3mud_2', '3mud_3', '3mud_4',
        'star_game', 'i_1_1', 'i_1_2', 'i_1_3',  'i_2_1', 'b_rplay', 'field_record', 'field', 'pers_r', 'back_r', 'star_shadow', 'star2',
        'back_t1', 'back_t2', 'back_t3', 'pers_start_2', 'pers_start_1', 'pers_start_3', 'field_tutorial', 'bubble', 'star', 'icon_2_1', 'icon_1_2', 'icon_1_3', 'icon_1_1', 'b_shadow_p',
        'back_end', 'b_menu', 'b_next', 'b_replay', 'pers_e_3', 'pers_e_2', 'field_end', 'e_shadow', 'b_back_p', 'b_replay_p', 'b_menu_p', 'icon_sound_p', 'icon_music_p', 'pers_p_1', 'pers_p_2',
        'field_pause_2', 'field_pause', 'tutorial_sheriff', 'frame_tutorial', 'arm_1', 'arm_2', 'back_pause', 'off_p', 'on_p', 'pers_1_end_fail', 'pers_2_end_fail', 'win_1', 'win_2', 'field_win',
        'win_p', 'fail_p', 'b_end_fail', 'back_end_fail'
    ];
    var i, j;
    for(i = 1; i<4; i++) {
        pngs.push(i + '_new');
        pngs.push('effect_' + i);
        pngs.push('f_' + i);
        if(i < 3) {
            for(j = 1; j<7; j++) {
                pngs.push('bonus_'+ i + '_' + j);
            }
        }

    }
    for(i = 1; i<6; i++) {
        pngs.push(i + 'p_1');
        pngs.push(i + 'p_2');
        pngs.push(i + 'p_3');
        pngs.push(i + 'p_4');
        pngs.push(i + '_1');
        pngs.push(i + '_2');
        pngs.push(i + '_3');
        pngs.push(i + 'd1');
        pngs.push(i + 'd2');
        pngs.push(i + 'd3');
        pngs.push(i + 'd4');
        pngs.push(i + 'd5');
        pngs.push(i + 'a1');
        pngs.push(i + 'a2');
        pngs.push(i + 'a3');
        pngs.push(i + 'a4');
        pngs.push(i + 'a5');
    }

    GodStep.Preloader.prototype.loadAll.call(this,
        M3.IMAGE_PATH, pngs, [],
        M3.SOUND_PATH,  ['button', 'bamboo', 'bonus_appear', 'bonus_row', 'bonus_turn', 'crystal', 'dirt', 'loss', 'match', 'select', 'start', ((this.soul.AUDIOTAG) ? 'loop_' : '') + 'theme', 'victory'], ['Font2.fnt']);
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
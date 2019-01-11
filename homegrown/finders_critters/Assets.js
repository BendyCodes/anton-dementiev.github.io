
PR.Assets = function(soul) {
    GodStep.DONT_RESIZE = ['Font2'];
    GodStep.Preloader.call(this, soul);
    this.fontLoaderClass = PR.Font;
};

extend(PR.Assets, GodStep.Preloader);

pro.load = function() {
    this.addChild(this.back = GodStep.Image.fromImage( PR.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload));
    this.addChild(this.logo = GodStep.Image.fromImage( PR.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( PR.IMAGE_PATH + 'loading.png', this.h_preload));

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
        this.loading.place(this.W/2, this.H *.65);
        var d = parseInt(this.loading.texture.height/10);
        this.loading.texture.setFrame(new PIXI.Rectangle(0, d * (this.soul.lang.lang - 2), this.loading.texture.width, d));
        countLoaded++;
        
        if(countLoaded == 2) {
            this.init();
        }
    }
};
pro.init = function() {
    var pngs = [
        'Font', 'b_back', 'lock', 'lock', 'hero', 'hero2', 'back_menu', 'cube_lock_1', 'cube_lock_2', 'pers_win_1', 'pers_win_2', 'pers_win_3', 'pers_win_4', 'pers_win_5',
        'yellow', 'red', 'purple', 'green', 'blue', 'cellBack', 'back_up', 'block', 'delete', 'dirt', 's_blue', 's_red', 's_green', 's_purple', 's_yellow', 's_bonus', 'bomb',
        'd_green', 'd_red', 'd_yellow', 'd_purple', 'd_blue', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5',
        'h_green', 'h_red', 'h_yellow', 'h_purple', 'h_blue', 'cube_1s', 'cube_2s',
        'cube_1', 'down', 'field_button_m', 'logo', 'pers_m_1', 'pers_m_1_0', 'b_pause',
        'pers_m_2', 'pers_m_2_0', 'b_more', 'b_options', 'b_play', 'b_back', 'b_music', 'b_sound',
        'back_options', 'pers_1', 'pers_2', 'slider_on', 'slider_off', 'tutorial_on', 'tutorial_off',
        'slider_off_pause', 'slider_on_pause', 'pers_2o', 'pers_1o','pers_1_0', 'pers_2_0', 'back_pause', 'field_button',
        'b_replay', 'b_menu', 'pers_l', 'pers_l1', 'lock', 'unlock_1_1','unlock_1_2','unlock_2_1','unlock_2_2', 'back_levels',
        'arm_1', 'arm_2', 'b_down', 'back_game', 'block', 'bomb', 'bonus', 'cage_1', 'cage_2', 'cage_3', 'cage_4', 'cage_5',
        'cube_1', 'cube_2', 'cube_3', 'cube_4', 'cube_5', 'cube_back_1', 'cube_back_2','field_down', 'field_fin', 'field_start', 'field_up', 'icon_save', 'line_right','line_left', 'star',
        'b_next_1', 'b_next_2',  'back_fin_animation', 'back_fail', 'back_win', 'field_button2', 'field_score_fail', 'field_score_win', 'field_record',
        'fin_animation_1', 'fin_animation_2', 'fin_animation_3',
        'pers_f_1', 'pers_f_1_0', 'pers_f_2', 'pers_f_2_0', 'pers_fg_1', 'pers_fg_1_0', 'pers_fg_2', 'pers_fg_2_0', 'pers_v_1', 'pers_v_1_0',
        'boom_1',  'boom_2', 'boom_3', 'boom_4', 'boom_5',
    ];

    for(var i = 0; i<5; i++) {
        pngs.push('cage_1_' + (i+1));
        pngs.push('cage_2_' + (i+1));
        pngs.push('cage_3_' + (i+1));
        pngs.push('cage_4_' + (i+1));
        pngs.push('cage_5_' + (i+1));
        pngs.push('cube_1_' + (i+1));
        pngs.push('cube_2_' + (i+1));
        pngs.push('cube_3_' + (i+1));
        pngs.push('cube_4_' + (i+1));
        pngs.push('cube_5_' + (i+1));
        pngs.push('net_' + (i+1));
        pngs.push('pers_' + (i+1) + '_1');
        pngs.push('pers_' + (i+1) + '_2');
        pngs.push('pers_' + (i+1) + '_3');
        pngs.push('disappear_' + (i+1));
    }
    var  j;

    GodStep.Preloader.prototype.loadAll.call(this,
        PR.IMAGE_PATH, pngs, [],
        PR.SOUND_PATH,  ['button', 'miss_tap', 'bomb', 'cage', 'cageout', 'lose', 'petard', 'pop', 'rescue', 'start', 'tap', 'theme', 'win'], ['Font']);
};

pro.h_preload = function(e) {
    var img = this.image;
    var p = img.parent;
    img.Scale = p.startS;
    img.anchor = new PIXI.Point(0.5, 0.5);
    p.preloadState++;
    switch (img) {
        case p.back:
            p.back.scale.y = p.soul.OH/ p.soul.H * p.startS
            p.back.place(p.W/2, p.H *.5);
            p.back.texture.baseTexture.isLoader = true;
            break;
        case p.logo:
            p.logo.place(p.W/2, p.H *.3);
            p.logo.texture.baseTexture.isLoader = true;

            break;
        case p.loading:
            var d = parseInt(p.loading.texture.height/10);
            p.loading.texture.setFrame(new PIXI.Rectangle(0, d * (p.soul.lang.loadingPos - 2), p.loading.texture.width, d));
            p.loading.place(p.W/2,  p.H *.65);
            break;
    }
    if(p.preloadState == 2) {
        p.init();
    }
};

PS.Preloader = function(soul) {
    GodStep.Preloader.call(this, soul);
    this.fontLoaderClass = PS.FontLoader;

};

extend(PS.Preloader, GodStep.Preloader);

pro.load = function() {
    this.addChild(this.back = GodStep.Image.fromImage( PS.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload));
    this.addChild(this.logo = GodStep.Image.fromImage( PS.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( PS.IMAGE_PATH + 'loading.png', this.h_preload)); //this.loading.visible = false;

    this.maxCountLoaded = 3;
    if(PS.SOFT_GAMES) {
        this.maxCountLoaded++;
        this.addChild(this.logo_soft = GodStep.Image.fromImage( PS.IMAGE_PATH + 'logo_soft.png', this.h_preload)); //this.loading.visible = false;
    }

    var countLoaded = 0;
    if(this.back.texture.baseTexture.hasLoaded) {
        this.back.Scale = this.startS;
        this.back.anchor = new PIXI.Point(0.5, 0.5);
        this.back.place(this.W/2, this.H *.58);
        this.back.scale.y = this.soul.OH/ this.soul.H * this.startS;

        countLoaded++;
    }
    if(this.logo.texture.baseTexture.hasLoaded) {
        this.logo.Scale = this.startS;
        this.logo.anchor = new PIXI.Point(0.5, 0.5);
        this.logo.place(this.W/2, this.H *.3);
        countLoaded++;
    }
    if(this.loading.texture.baseTexture.hasLoaded) {
        this.loading.Scale = this.startS;
        this.loading.anchor = new PIXI.Point(0.5, 0.5);
        this.loading.place(this.W/2, this.H *.75);
        var d = parseInt(this.loading.texture.height/10);
        this.loading.texture.setFrame(new PIXI.Rectangle(0, d * this.soul.lang.lang, this.loading.texture.width, d));

        if(countLoaded == this.maxCountLoaded) {
            this.init();
        }
    }
    if(PS.SOFT_GAMES) {
        if (this.logo_soft.texture.baseTexture.hasLoaded) {
            this.logo_soft.Scale = this.startS;
            this.logo_soft.anchor = new PIXI.Point(0.5, 0.5);
            this.logo_soft.place(this.W / 2, this.H * .5);

            if (countLoaded == this.maxCountLoaded) {
                this.init();
            }
        }
    }
};
pro.init = function() {

    var pngs = ['Font2', 'galka', 'cell_arrow', 'cell_teleport', 'cell_player', 'cell_star', 'cell_color', 'cell_rotate', 'cell_playerR', 'cell_playerB', 'music', 'sound', 'header_level',
        'arrow_left', 'arrow_right', 'back', 'background_game', 'background_game_over', 'background_loading_1', 'background_loading_2', 'background_loading_3', 'level_background', 'star',
    'button_developed', 'button_more_games', 'button_off', 'header_tutorial', 'button_on', 'header', 'button_options', 'end_1', 'end_2', 'end_3', 'end_4', 'end_level_1', 'end_level_2', 'end_level_3', 'end_level_4',
    'field', 'field_off', 'key_tutorial', 'line', 'logo', 'menu_background', 'next', 'options_background', 'play', 'reaktiw_1', 'reaktiw_2', 'reaktiw_3', 'reaktiw_4', 'replay', 'score_field',
    'square_tutorial', 'squares_game', 'step_back', 'teleport', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'b_pause', 'field_pause', 'b_menu',
    'device_1', 'device_2', 'face', 'back_o'];

    for(var i = 1; i<6; i++) {
        pngs.push('arrow'+ i +'_1');
        pngs.push('arrow'+ i +'_2');
        pngs.push('arrow'+ i +'_3');
        pngs.push('arrow'+ i +'_4');
        pngs.push('b' + i +'_1');
        pngs.push('b' + i +'_2');
        pngs.push('b' + i +'_3');
        pngs.push('b' + i +'_4');
        pngs.push('box_' + i);
        pngs.push('field_' + i);
        pngs.push('field_' + i + '_ok');
        pngs.push('key_' + i);
        pngs.push('keyhole_' + i);
        pngs.push('turn' + i + '_1');
        pngs.push('turn' + i + '_2');
        pngs.push('turn' + i + '_3');
        pngs.push('turn' + i + '_4');
    }

    GodStep.Preloader.prototype.loadAll.call(this,
        PS.IMAGE_PATH, pngs, [],
        PS.SOUND_PATH,  ['button', 'win', 'fast','move', 'theme2','start_screen', 'open', 'portal'], ['Font2.fnt']);
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
        case p.logo_soft:
            p.logo_soft.place(p.W/2, p.H *.58);
            break;
        case p.loading:
            var d = parseInt(p.loading.texture.height/10);
            p.loading.texture.setFrame(new PIXI.Rectangle(0, d * p.soul.lang.lang, p.loading.texture.width, d));
            p.loading.place(p.W/2,  p.H *.75);
            break;
    }
    if(p.preloadState == p.maxCountLoaded) {
        p.init();
    }
};

HTU.Preloader = function(soul) {
    GodStep.Preloader.call(this, soul);
    this.fontLoaderClass = [];
};

extend(HTU.Preloader, GodStep.Preloader);

pro.load = function() {
    this.addChild(this.back = GodStep.Image.fromImage( HTU.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( HTU.IMAGE_PATH + 'loading.png', this.h_preload));
    this.addChild(this.logo = GodStep.Image.fromImage( HTU.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));

    var countLoaded = 0;
    if(this.logo.texture.baseTexture.hasLoaded) {
        this.logo.Scale = this.startS * HTU.SCALE;
        this.logo.anchor = new PIXI.Point(0.5, 0.5);
        this.logo.place(this.W/2, this.H *.3);
        countLoaded++;
    }
    if(this.back.texture.baseTexture.hasLoaded) {
        this.back.Scale = this.startS* HTU.SCALE;
        this.back.anchor = new PIXI.Point(0.5, 0.5);
        this.back.place(this.W/2, this.H *.5);
        this.back.scale.y = this.soul.OH/ this.soul.H * this.startS;

        countLoaded++;
    }
    if(this.loading.texture.baseTexture.hasLoaded) {
        this.loading.Scale = this.startS* HTU.SCALE;
        this.loading.anchor = new PIXI.Point(0.5, 0.5);
        this.loading.place(this.W/2, this.H *.7);
        var d = parseInt(this.loading.texture.height/10);
        this.loading.texture.setFrame(new PIXI.Rectangle(0, d * (this.soul.lang.lang - 2), this.loading.texture.width, d));
        if(countLoaded == 2) {
            this.init();
        }
    }
};
pro.init = function() {
    catched(function() {
        var t = HTU.HatchTheUnicorn.instance.assets;
        GodStep.Preloader.prototype.loadAll.call(t,
            HTU.IMAGE_PATH, ['1234567890_playfield', 'backgound_bottom', 'backgound_bottom_blur', 'best', 'best_playfield', 'button_01', 'button_02',
            'button_03', 'button_04', 'button_05', 'button_06', 'developed_by_fundemic', 'game_over', 'icon_01', 'icon_02', 'icon_03', 'icon_04', 'icon_05', 'icon_06', 'icon_07',
            'icon_08', 'icon_09', 'icon_10', 'icon_11', 'light', 'logo', 'match_to_find_a_Unicorn', 'Music', 'rainbow', 'rainbow_2', 'rainbow_blur', 'score', 'score_playfield',
            'settings_01', 'settings_02', 'settings_03', 'shine', 'sky', 'slide1', 'slide2', 'Sound', 'substrate_01', 'substrate_02', 'substrate_03', 'substrate_04',
            'substrate_interface', 'substrate_interface_top', 'Unicorn_01', 'Unicorn_01', 'victory_logo'], [],
            HTU.SOUND_PATH, ['loop_1', '2', '3', 'match', 'slide', 'button'], null);
    }, 'init');
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
            p.back.scale.x = p.back.scale.y *= HTU.SCALE;
            break;
        case p.logo:
            p.logo.place(p.W/2, p.H *.3);
            p.logo.scale.x = p.logo.scale.y *=  HTU.SCALE;

            break;
        case p.loading:
            var d = parseInt(p.loading.texture.height/10);
            p.loading.place(p.W/2,  p.H *.7);
            p.loading.scale.x = p.loading.scale.y *=  HTU.SCALE;

            break;
    }
    if(p.preloadState == 2) {
        p.init();
    }
};
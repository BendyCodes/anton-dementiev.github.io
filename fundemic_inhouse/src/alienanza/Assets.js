AZ.Assets = function(soul) {
    GodStep.DONT_RESIZE = ['Font1', 'back_fundemic1', 'fundemic_logo', 'loading'];
    GodStep.Preloader.call(this, soul);
    this.createGraphics();
    this.addChild(this.text = new GodStep.Text('', '20', 'Arial', 'left', 0xffffff));
    this.text.y = soul.H * .06;
    this.graphics.alpha = .2;
    this.text.alpha = 1;
    this.text.visible = false;
    this.fontLoaderClass = [];
};

extend(AZ.Assets, GodStep.Preloader);

pro.load = function() {
    this.addChildAt(this.back = GodStep.Image.fromImage( AZ.IMAGE_PATH + 'back_fundemic1.jpg', this.h_preload), 0);
    this.addChild(this.logo = GodStep.Image.fromImage( AZ.IMAGE_PATH + 'fundemic_logo.png', this.h_preload));
    this.addChild(this.loading = GodStep.Image.fromImage( AZ.IMAGE_PATH + ('loading.png'), this.h_preload));

    this.maxCountLoaded = 2;
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
};
pro.init = function() {
    var images = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'back', 'back_pod', 'best_score',
        'cifry', 'circle', 'credits', 'crest', 'galka', 'head_logo', 'does_match', 'more_icon', 'music_off', 'music_on',
        'new_record', 'no', 'yes', 'note', 'off', 'on', 'play', 'remember', 'restart', 'rupor', 'score', 'gameover_back',
        'settings_back', 'settings_icon', 'sound_off', 'sound_on', 'tablo', 'tap_to_begin', 'timer_arrow', 'timer_back'
    ];
    GodStep.Preloader.prototype.loadAll.call(this,
        AZ.IMAGE_PATH, images,  ['background'],
        AZ.SOUND_PATH,  ['alienanza_click', 'alienanza_main', 'alienanza_wrong', 'alienanza_right', 'alienanza_time', 'alienanza_end','alienanza_start'],
        null);

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
          //  p.loading.texture.setFrame(new PIXI.Rectangle(0, d * (p.soul.lang.lang - 2), p.loading.texture.width, d));
            p.loading.place(p.W/2,  p.H *.71);
            break;
    }
    if(p.preloadState == p.maxCountLoaded) {
        p.init();
    }
};
var AG = AG || {};
include('com/soundjs-NEXT.combined');

include('lq/video/Text');
include('lq/data/LocalStorage');
include('lq/video/FPS');

AG.AmazingGrabber = function (lang) {
    //this.CANVAS = true;
    AG.TUTOR = true;
    GodStep.IMAGE_RESOLUTION = 1;

    AG.SOUND = AG.MUSIC = true;
   // this.AUDIOTAG = true;
    GodStep.Game.TRANSPARENT = true;


    if(AG.CLICK_JOGOS) {
        this.lang = new AG.Lang('cj');
    } else
    if(AG.SOFT_GAMES) {
        this.lang = new AG.Lang(lang);
    } else {
        this.lang = new AG.Lang('EN');
    }
    GodStep.Game.call(this, 'AmazingGrabber', 0x1100ff, AG.Assets, 'ag_settings8', 'ag_player525', AG.DEFAULT_SETTINGS, 'auto');
    AG.AmazingGrabber.instance = this;
    this.SHOP_SLOT = 'ag_shop3';


}; extend(AG.AmazingGrabber, GodStep.Game);

AG.SOFT_GAMES = false;
AG.SCALE = 2;
AG.IMAGE_PATH = 'src/amazinggrabber/img5/';
AG.SOUND_PATH = 'src/amazinggrabber/sounds/';
AG.DEFAULT_SETTINGS = '{"s_handSpeed":541,"s_speedGrow":0.22,"s_handWait":0.19,"s_spawnTimeMin":0.5,"s_spawnTimeMax":2,"s_hitCountSafe":6,"s_spawnSafeTimeMin":5,"s_spawnSafeTimeMax":18,"s_spawnSafeLife":12,"s_spawnXTimeMin":20,"s_spawnXTimeMax":50,"s_handSpeedBack":400,"s_cristalGravity":69,"s_speedMultiplier":51,"s_spawnTimeIncreaseMax":190,"s_spawnTimeIncreaseMin":120,"s_prize1Chance":54,"s_prize2Chance":80,"s_prize3Chance":93,"s_prize4Chance":100}';

function setBackgroundColor(c) {
    if(AG.SOFT_GAMES) {
        var div = AG.AmazingGrabber.instance.div;
        div.style['background-color'] = c;
    }
}
pro.update = function() {
    this.beginFps();
    GodStep.Mejdu.prototype.update.call(this);
    this.endFps();
};
pro.run = function() {
    if(!this.isRunning) {
        trace('running');
        this.isRunning = true;

        this.delFrame(this.assets);

        this.stage.addChild(this.container = new PIXI.DisplayObjectContainer());
        this.addFrame(this.background = new AG.Background(this));
        this.addFrame(this.startmenu = new AG.StartMenu(this));
        this.addFrame(this.settings = new AG.Settings(this));
        this.addFrame(this.gameplay = new AG.GamePlay(this));
        this.addFrame(this.shop = new AG.Shop(this));
        this.addFrame(this.gameover = new AG.GameOver(this));
        this.addFrame(this.dev = new AG.Dev(this));
        this.addFrame(this.splash = new AG.Splash(this));
        this.addFrame(this.transmission = new AG.Transmission(this));
        this.addFrame(this.orientation = new AG.Orientation(this));


        this.clearProgress();

        if(AG.CLICK_JOGOS) {
            this.screenTo([this.splash], this.assets);
        } else {
            this.screenTo([this.startmenu, this.background], this.assets);
        }



        this.addFrame(this.topSprite = new AG.TopSprite(this));
        this.topSprite.visible = false;
        this.addFrame(this.fps = new GodStep.FPS(this, 0x22aa00, 0));

        this.resizeWindow(this.OW, this.OH);
        this.reposition();
    }
};
pro.resizeWindow = function(w, h) {
    GodStep.Game.prototype.resizeWindow.call(this, w, h);
    if(AG.LOGO) AG.LOGO.style.right = ((this.OW - this.W)/2 + 10) + 'px';
};
pro.clearProgress = function() {
    AG.PLAYER = GodStep.LoadLocal(this.PLAYER_SLOT) || {totalScore:0, bestScore:0, totalMoney:0, sound:true, music:true, tutorial:true};
    AG.SHOP = GodStep.LoadLocal(this.SHOP_SLOT) || {items:[], equip:[]};

    AG.SOUND = AG.PLAYER.sound;
    AG.MUSIC = AG.PLAYER.music;
    AG.TUTOR = AG.PLAYER.tutorial;
};

pro.savePlayer = function() {
    var instance = AG.AmazingGrabber.instance;
    AG.PLAYER.sound = AG.SOUND;
    AG.PLAYER.music = AG.MUSIC;
    AG.PLAYER.tutorial = AG.TUTOR;
    GodStep.SaveLocal(AG.PLAYER, instance.PLAYER_SLOT);
    GodStep.SaveLocal(AG.SHOP, instance.SHOP_SLOT);
};
include('src/amazinggrabber/GameOver');
include('src/amazinggrabber/ItemIcon');
include('src/amazinggrabber/Assets');
include('src/amazinggrabber/ImgButton');
include('src/amazinggrabber/TextButton');
include('src/amazinggrabber/Text');
include('src/amazinggrabber/Back');
include('src/amazinggrabber/Img');
include('src/amazinggrabber/Background');
include('src/amazinggrabber/Dialog');
include('src/amazinggrabber/ProgressBar');
include('src/amazinggrabber/Settings');
include('src/amazinggrabber/StartMenu');
include('src/amazinggrabber/Shop');
include('src/amazinggrabber/Face');
include('src/amazinggrabber/Hand');
include('src/amazinggrabber/Prize');
include('src/amazinggrabber/MovieClip');
include('src/amazinggrabber/Tutor');
include('src/amazinggrabber/Safe');
include('src/amazinggrabber/TopSprite');
include('src/amazinggrabber/GamePlay');
include('src/amazinggrabber/Dev');
include('src/amazinggrabber/Transmission');
include('src/amazinggrabber/Lang');
include('src/amazinggrabber/Splash');
include('src/amazinggrabber/FontLoader');
include('src/amazinggrabber/Pause');
include('src/amazinggrabber/Orientation');



////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////

/// starting
function startAmazingGrabber(lang) {
  // $('meta[name=viewport]').remove();
   //$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">');
    if(!AG.AmazingGrabber.instance) {
        var game = new AG.AmazingGrabber(lang);
            game.div.style.margin = '0 auto';
            game.div.style['vertical-align'] = 'middle';
            game.initResizeEvents();

    }
}

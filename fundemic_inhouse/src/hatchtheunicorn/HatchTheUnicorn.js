include('com/soundjs-NEXT.combined');

include('lq/video/Text');
include('lq/video/LFrame');
include('lq/video/FPS');
include('lq/data/LocalStorage');
include('lq/games/Img');
include('lq/games/ImgButton');
include('lq/games/Cell');
include('lq/data/Color');
include('lq/games/CellField');
include('lq/games/TextButton');
include('lq/input/Keyboard');
include('lq/games/ImgButton');
include('lq/games/Transmission');
var HTU = HTU || {};
include('src/hatchtheunicorn/Background');
include('src/hatchtheunicorn/StartMenu');
include('src/hatchtheunicorn/Tutorial');
include('src/hatchtheunicorn/Splash');
include('src/hatchtheunicorn/Settings');
include('src/hatchtheunicorn/GamePlay');
include('src/hatchtheunicorn/Preloader');
include('src/hatchtheunicorn/Transmission');
include('src/hatchtheunicorn/MovieClip');
include('src/hatchtheunicorn/Field');
include('src/hatchtheunicorn/GameOver');
include('src/hatchtheunicorn/Text');
include('src/hatchtheunicorn/Cell');
include('src/hatchtheunicorn/Button');

 HTU.HatchTheUnicorn = function (view) {
     GodStep.Game.TRANSPARENT = true;

    HTU.HatchTheUnicorn.instance = this;
    HTU.HatchTheUnicorn.instance.PLAYER = {};
    switch (view) {
        case 'webgl':
            this.WEBGL = true;
            break;
        case 'canvas':
            this.CANVAS = true;
            break;
        case 'auto':
            break;
    }
    HTU.SOUND = HTU.MUSIC = true;
  //  this.AUDIOTAG = true;
    HTU.VIEW_LOGO = HTU.Omniture || HTU.OmnitureAnalitics;
     catched(function() {
         GodStep.Game.call(HTU.HatchTheUnicorn.instance, 'HatchTheUnicorn', 0x101010, HTU.Preloader, 'htu_settings', 'htu_player', HTU.DEFAULT_SETTINGS, 'auto');
     }, 'init');
    this.MW = 1536;
    this.MH = 1854;

};

extend(HTU.HatchTheUnicorn, GodStep.Game);

HTU.SCALE = 1/.7;
HTU.Omniture = false;
HTU.OmnitureAnalitics = false;
//HTU.ClickJogos = true;
HTU.IMAGE_PATH = (HTU.ClickJogos) ? 'src/hatchtheunicorn/imgPT/' : 'src/hatchtheunicorn/img50/';
HTU.SOUND_PATH = 'src/hatchtheunicorn/sound/';
HTU.DEFAULT_SETTINGS = '{}';

pro.update = function() {
    this.beginFps();
    GodStep.Mejdu.prototype.update.call(this);
    this.endFps();
};
// main
pro.run = function() {
    catched(function() {
        var t = HTU.HatchTheUnicorn.instance;
        if (!t.isRunning) {
            trace('running');
            t.isRunning = true;
            t.keyboard = new GodStep.Keyboard(t);
            t.addFrame(t.background = new HTU.Background(t));
            t.addFrame(t.settings = new HTU.Settings(t));
            t.addFrame(t.tutorial = new HTU.Tutorial(t));
            t.addFrame(t.startmenu = new HTU.StartMenu(t));
            t.addFrame(t.gameplay = new HTU.GamePlay(t));
            t.addFrame(t.gameover = new HTU.GameOver(t));


            t.addFrame(t.transmission = new HTU.Transmission(t));
            t.addFrame(t.fps = new GodStep.FPS(t, 0x22aa00)); t.fps.addString((t.CANVAS) ? 'C' : 'W');
            t.fps.visible = false;
            t.assets.isDelete = true;
            t.screenTo([t.tutorial, t.background], t.assets);
            t.reposition();
            t.loadSettings();
            t.loadPlayer();
        }
    }, 'RUN');

};

pro.saveSettings = function() {
    var instance = HTU.HatchTheUnicorn.instance;
    instance.SETTINGS.skin = (instance.settings.b_night.isNight) ? 2 : 1;
  //  instance.SETTINGS.tutorial = instance.tutorial.getData();
    GodStep.SaveLocal(instance.SETTINGS, instance.SETTINGS_SLOT);
};
pro.loadSettings = function() {
    var instance = HTU.HatchTheUnicorn.instance;
    instance.SETTINGS = GodStep.LoadLocal(instance.SETTINGS_SLOT) || {tutorial:null};
    //instance.tutorial.setData(instance.SETTINGS.tutorial);
};

pro.loadPlayer = function() {
    var instance = HTU.HatchTheUnicorn.instance;
    instance.PLAYER = GodStep.LoadLocal(this.PLAYER_SLOT) || {pointsBest:0, sound:true, music:true};
    HTU.MUSIC = instance.PLAYER.music;
    HTU.SOUND = instance.PLAYER.sound;
};


pro.savePlayer = function() {
    var instance = HTU.HatchTheUnicorn.instance;
    instance.PLAYER.sound = HTU.SOUND;
    instance.PLAYER.music = HTU.MUSIC;
    GodStep.SaveLocal(instance.PLAYER, instance.PLAYER_SLOT);
};

////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////

/// starting
function startHatchTheUnicorn(view) {
    if(!HTU.HatchTheUnicorn.instance) {
        var game = new HTU.HatchTheUnicorn('canvas');
            game.div.style.margin = '0 auto';
            game.div.style['vertical-align'] = 'middle';
        game.initResizeEvents();

    }
}


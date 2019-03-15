var SS = SS || {};
include('com/soundjs-NEXT.combined');

include('lq/data/LocalStorage');
include('lq/video/LFrame');
include('lq/video/Text');
include('lq/games/Img');
include('lq/games/ImgButton');
include('lq/games/TextButton');
include('lq/games/Transmission');
include('lq/video/BitmapText');
include('lq/video/FPS');
include('lq/input/Keyboard');

include('src/chinupshinup/Assets');
include('src/chinupshinup/Font');
include('src/chinupshinup/Text');
include('src/chinupshinup/Img');
include('src/chinupshinup/ImgButton');

include('src/chinupshinup/Pattern');

include('src/chinupshinup/Dev');
include('src/chinupshinup/Shop');
include('src/chinupshinup/Pause');
include('src/chinupshinup/GameOver');
include('src/chinupshinup/StartMenu');
include('src/chinupshinup/Settings');
include('src/chinupshinup/GamePlay');
include('src/chinupshinup/Background');
include('src/chinupshinup/Transmission');
include('src/chinupshinup/Element');
include('src/chinupshinup/Enemy');
include('src/chinupshinup/MovieClip');
include('src/chinupshinup/Player');
include('src/chinupshinup/Dialog');
include('src/chinupshinup/Tutorial');
include('src/chinupshinup/Cell');
include('src/chinupshinup/PatternView');
SS.ChinUpShinUp = function () {
    GodStep.Game.TRANSPARENT = true;

    SS.ChinUpShinUp.instance = this;
    SS.ChinUpShinUp.instance.PLAYER = {};

    GodStep.Game.call(this, 'ChinUpShinUp', 0x101010, SS.Assets, 'ss_settings3', 'ss_player33', SS.DEFAULT_SETTINGS, 'auto');

    SS.SOUND = SS.MUSIC = true;
    this.MW = 1536;
    this.MH = 1854;
};

extend(SS.ChinUpShinUp, GodStep.Game);

SS.SCALE = 1;
SS.IMAGE_PATH = 'src/ChinUpShinUp/img/';
SS.SOUND_PATH = 'src/ChinUpShinUp/sound/';
//SS.DEFAULT_SETTINGS = '{"easy":[[0,0,0,0,1,1,2,1,1,1,1,2,1,1,0,0],[0,0,0,0,0,0,2,0,0,2,2,0,0,0,0,0],[1,1,2,0,0,0,0,2,0,0,2,0,0,0,0,0]],"average":[[0,0,0,0,0,0,1,1,3,2,2,3,1,1,0,0],[0,0,0,0,3,2,0,0,2,3,0,0,3,2,0,0]],"hard":[[3,0,3,0,2,3,3,0,3,0,0,0,0,0,0,0],[3,0,2,3,3,2,2,3,3,0,0,0,0,0,0,0]],"s_multPointsStart":50,"s_multCoinStart":10,"s_patternSpeed":10,"s_enemyGrowSpeed":29,"s_enemyTime":7,"s_enemySpeed":39,"s_enemyPeriod":2}';
SS.DEFAULT_SETTINGS = '{"easy":[[0,0,0,0,0,0,2,1,1,1,1,2,0,0,0,0],[0,0,0,0,0,0,2,0,0,2,2,0,0,0,0,0],[1,1,2,1,1,1,1,2,1,1,2,1,1,1,0,0],[0,0,0,0,0,0,1,2,1,2,2,1,2,1,0,0]],"average":[[0,0,0,0,0,0,1,1,3,2,2,3,1,1,0,0],[0,0,0,0,3,2,1,1,2,3,1,1,3,2,0,0],[0,0,0,0,1,1,3,2,2,3,3,2,1,1,0,0],[0,0,0,0,0,0,2,3,3,2,2,3,0,0,0,0],[0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],[0,0,3,1,1,1,1,2,1,3,1,2,1,1,3,1]],"hard":[[3,0,3,0,2,3,3,0,3,0,0,0,0,0,0,0],[3,0,2,3,3,2,2,3,3,0,0,0,0,0,0,0],[0,0,0,0,0,0,3,2,2,3,2,3,3,2,0,0],[0,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0],[0,0,0,0,3,1,3,2,3,2,3,1,0,0,0,0],[0,0,0,0,2,3,1,3,1,3,2,3,0,0,0,0],[0,0,0,0,2,3,2,3,3,2,3,2,0,0,0,0]],"s_multPointsStart":50,"s_multCoinStart":10,"s_patternSpeed":10,"s_enemyGrowSpeed":60,"s_enemyTime":14,"s_enemySpeed":70,"s_enemyPeriod":4}';
pro.run = function() {
    catched(function() {
        var t = SS.ChinUpShinUp.instance;
        if (!t.isRunning) {
            trace('running');
            t.isRunning = true;
            t.keyboard = new GodStep.Keyboard();

            t.addFrame(t.dev = new SS.Dev(t));
            t.addFrame(t.shop = new SS.Shop(t));
            t.addFrame(t.settings = new SS.Settings(t));
            t.addFrame(t.gameplay = new SS.GamePlay(t));
            t.addFrame(t.shop = new SS.Shop(t));
            t.addFrame(t.startmenu = new SS.StartMenu(t));
            t.addFrame(t.gameover = new SS.GameOver(t));
            t.addFrame(t.transmission = new SS.Transmission(t));
            t.addFrame(t.fps = new GodStep.FPS(t, 0xff0000,.0));

            t.keyboard = new GodStep.Keyboard(t);
            t.loadSettings();
            t.loadPlayer();

            t.screenTo([t.startmenu], t.assets);


            t.resizeWindow(t.OW, t.OH);
            t.reposition();

        }
    }, 'RUN');
};
pro.saveSettings = function() {
    var instance = SS.ChinUpShinUp.instance;
    GodStep.SaveLocal(instance.SETTINGS, instance.SETTINGS_SLOT);
};
pro.loadSettings = function() {
    var instance = SS.ChinUpShinUp.instance;


    var sett = instance.SETTINGS = GodStep.LoadLocal(instance.SETTINGS_SLOT) || GodStep.LoadText(SS.DEFAULT_SETTINGS);
    var patt = instance.PATTERNS = [[],[],[]];
    var i;
    for(i = 0; i<sett.easy.length; i++) {
        patt[0].push(new SS.Pattern(sett.easy[i], true));
    }
    for(i = 0; i<sett.average.length; i++) {
        patt[1].push(new SS.Pattern(sett.average[i], true));
    }
    for(i = 0; i<sett.hard.length; i++) {
        patt[2].push(new SS.Pattern(sett.hard[i], true));
    }
};

pro.savePlayer = function() {
    var instance = SS.ChinUpShinUp.instance;
    instance.PLAYER.sound = SS.SOUND;
    instance.PLAYER.music = SS.MUSIC;
    GodStep.SaveLocal(instance.PLAYER, instance.PLAYER_SLOT);
};
pro.loadPlayer = function() {
    var instance = SS.ChinUpShinUp.instance;
    instance.PLAYER = GodStep.LoadLocal(instance.PLAYER_SLOT) || {coins:0, top:0, score:0, items:[0, 0, 0, 0, 0], shop:[0, 0, 0, 0, 0], sound:true, music:true};

    SS.SOUND = instance.PLAYER.sound;
    SS.MUSIC = instance.PLAYER.music;
};
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////

/// starting
function startChinUpShinUp(view) {
    if(!SS.ChinUpShinUp.instance) {
        var game = new SS.ChinUpShinUp(view);
            game.div.style.margin = '0 auto';
            game.div.style['vertical-align'] = 'middle';
            game.initResizeEvents();
    }
}


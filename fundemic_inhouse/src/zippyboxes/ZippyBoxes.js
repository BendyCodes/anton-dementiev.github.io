var PS = PS || {};
include('com/soundjs-NEXT.combined');

include('lq/video/FPS');
include('lq/video/Text');
include('lq/data/LocalStorage');
include('lq/games/Cell');
include('lq/games/CellField');
include('lq/games/Transmission');

include('src/zippyboxes/Cell');
include('src/zippyboxes/CellObject');
include('src/zippyboxes/Field');
include('src/zippyboxes/Preloader');
include('src/zippyboxes/ImgButton');
include('src/zippyboxes/TextButton');
include('src/zippyboxes/Text');
include('src/zippyboxes/MovieClip');
include('src/zippyboxes/Img');
include('src/zippyboxes/Background');
include('src/zippyboxes/Settings');
include('src/zippyboxes/StartMenu');
include('src/zippyboxes/GamePlay');
include('src/zippyboxes/Dev');
include('src/zippyboxes/GameOver');
include('src/zippyboxes/Transmission');
include('src/zippyboxes/LevelSelect');
include('src/zippyboxes/LevelOutro');
include('src/zippyboxes/LevelIntro');
include('src/zippyboxes/Lang');
include('src/zippyboxes/FontLoader');
include('src/zippyboxes/Pause');
include('src/zippyboxes/Orientation');

PS.ZippyBoxes = function (lang) {
    if(PS.SOFT_GAMES) {
        this.lang = new PS.Lang(lang);
    } else {
        this.lang = new PS.Lang('EN');
    }
    GodStep.Game.TRANSPARENT = true;
    GodStep.Game.call(this, 'ZippyBoxes', 0xff00ff, PS.Preloader, 'ps_settings12', 'ps_player282', PS.DEFAULT_SETTINGS);
    PS.ZippyBoxes.instance = this;
    PS.SOUND = PS.MUSIC = true;
    this.MW = 1536;
    this.MH = 1854;
};


extend(PS.ZippyBoxes, GodStep.Game);
PS.SOFT_GAMES = false;
PS.CELL_SCALE = 1.115;
PS.IMAGE_PATH = 'src/zippyboxes/img123456/';
PS.SOUND_PATH = 'src/zippyboxes/sounds/';
PS.DEFAULT_SETTINGS = '{"levels":[[{"name":"star","xi":4,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":4,"yi":0,"rotate":0,"alias":0},{"name":"player","xi":1,"yi":0,"rotate":0,"alias":0},{"name":"player","xi":1,"yi":1,"rotate":0,"alias":2},{"id":1}],[{"name":"star","xi":1,"yi":4,"rotate":0,"alias":0},{"name":"star","xi":3,"yi":0,"rotate":0,"alias":2},{"name":"player","xi":0,"yi":0,"rotate":0,"alias":2},{"name":"player","xi":4,"yi":4,"rotate":2,"alias":0},{"id":2}],[{"name":"star","xi":2,"yi":4,"rotate":0,"alias":2},{"name":"star","xi":2,"yi":3,"rotate":0,"alias":0},{"name":"player","xi":2,"yi":0,"rotate":1,"alias":0},{"name":"player","xi":2,"yi":2,"rotate":1,"alias":2},{"id":3}],[{"name":"star","xi":4,"yi":0,"rotate":0,"alias":2},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":1},{"name":"player","xi":2,"yi":2,"rotate":0,"alias":1},{"name":"player","xi":3,"yi":3,"rotate":3,"alias":2},{"id":4}],[{"name":"star","xi":3,"yi":0,"rotate":0,"alias":2},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":1},{"name":"player","xi":1,"yi":2,"rotate":0,"alias":0},{"name":"player","xi":2,"yi":3,"rotate":3,"alias":1},{"name":"player","xi":3,"yi":3,"rotate":3,"alias":2},{"id":5}],[{"name":"star","xi":4,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":3,"yi":0,"rotate":0,"alias":0},{"name":"player","xi":0,"yi":1,"rotate":0,"alias":2},{"name":"player","xi":2,"yi":4,"rotate":3,"alias":0},{"id":6}],[{"name":"star","xi":1,"yi":0,"rotate":0,"alias":1},{"name":"star","xi":2,"yi":1,"rotate":0,"alias":0},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":2},{"name":"player","xi":4,"yi":2,"rotate":2,"alias":2},{"name":"player","xi":3,"yi":3,"rotate":3,"alias":0},{"name":"player","xi":3,"yi":1,"rotate":2,"alias":1},{"id":7}],[{"name":"star","xi":2,"yi":0,"rotate":0,"alias":2},{"name":"star","xi":2,"yi":1,"rotate":0,"alias":0},{"name":"player","xi":2,"yi":4,"rotate":3,"alias":0},{"name":"playerB","xi":2,"yi":2,"rotate":0,"alias":2},{"id":8}],[{"name":"star","xi":4,"yi":3,"rotate":0,"alias":2},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":2,"yi":3,"rotate":0,"alias":3},{"name":"star","xi":2,"yi":0,"rotate":0,"alias":1},{"name":"player","xi":0,"yi":2,"rotate":0,"alias":0},{"name":"player","xi":1,"yi":3,"rotate":3,"alias":1},{"name":"playerB","xi":2,"yi":2,"rotate":0,"alias":3},{"name":"player","xi":2,"yi":1,"rotate":1,"alias":2},{"id":9}],[{"name":"star","xi":2,"yi":4,"rotate":0,"alias":1},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":2},{"name":"star","xi":3,"yi":3,"rotate":0,"alias":0},{"name":"star","xi":4,"yi":3,"rotate":0,"alias":3},{"name":"player","xi":2,"yi":0,"rotate":1,"alias":1},{"name":"player","xi":0,"yi":3,"rotate":0,"alias":0},{"name":"player","xi":4,"yi":2,"rotate":2,"alias":2},{"name":"playerB","xi":3,"yi":2,"rotate":0,"alias":3},{"id":10}], [{"name":"star","xi":4,"yi":3,"rotate":0,"alias":2},{"name":"star","xi":4,"yi":0,"rotate":0,"alias":0},{"name":"playerR","xi":0,"yi":3,"rotate":0,"alias":2},{"name":"playerR","xi":3,"yi":3,"rotate":3,"alias":0},{"id":11}],[{"name":"star","xi":2,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":1,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":1,"yi":2,"rotate":0,"alias":1},{"name":"playerR","xi":1,"yi":4,"rotate":3,"alias":1},{"name":"player","xi":2,"yi":1,"rotate":1,"alias":2},{"name":"playerR","xi":4,"yi":2,"rotate":2,"alias":0},{"id":12}],[{"name":"star","xi":0,"yi":0,"rotate":0,"alias":1},{"name":"star","xi":0,"yi":2,"rotate":0,"alias":3},{"name":"star","xi":1,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":2,"yi":0,"rotate":0,"alias":0},{"name":"playerR","xi":2,"yi":4,"rotate":3,"alias":0},{"name":"playerR","xi":4,"yi":1,"rotate":2,"alias":1},{"name":"playerB","xi":2,"yi":1,"rotate":0,"alias":2},{"name":"player","xi":1,"yi":0,"rotate":1,"alias":3},{"id":13}],[{"name":"star","xi":4,"yi":0,"rotate":0,"alias":1},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":0},{"name":"star","xi":4,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":3},{"name":"playerR","xi":3,"yi":4,"rotate":3,"alias":3},{"name":"playerR","xi":3,"yi":3,"rotate":3,"alias":1},{"name":"playerR","xi":4,"yi":2,"rotate":2,"alias":0},{"name":"playerR","xi":0,"yi":2,"rotate":0,"alias":2},{"id":14}],[{"name":"star","xi":4,"yi":0,"rotate":0,"alias":2},{"name":"arrow","xi":2,"yi":0,"rotate":0,"alias":-1},{"name":"playerR","xi":2,"yi":3,"rotate":3,"alias":2},{"id":15}],[{"name":"arrow","xi":3,"yi":3,"rotate":3,"alias":-1},{"name":"arrow","xi":3,"yi":1,"rotate":2,"alias":-1},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":0,"yi":0,"rotate":0,"alias":0},{"name":"playerR","xi":0,"yi":3,"rotate":0,"alias":2},{"name":"playerR","xi":3,"yi":2,"rotate":2,"alias":0},{"id":16}],[{"name":"arrow","xi":2,"yi":3,"rotate":3,"alias":-1},{"name":"arrow","xi":2,"yi":1,"rotate":2,"alias":-1},{"name":"arrow","xi":1,"yi":1,"rotate":1,"alias":-1},{"name":"star","xi":1,"yi":2,"rotate":0,"alias":1},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":0},{"name":"player","xi":0,"yi":2,"rotate":0,"alias":0},{"name":"player","xi":1,"yi":0,"rotate":1,"alias":1},{"id":17}],[{"name":"arrow","xi":1,"yi":0,"rotate":1,"alias":-1},{"name":"arrow","xi":2,"yi":0,"rotate":2,"alias":-1},{"name":"arrow","xi":1,"yi":3,"rotate":0,"alias":-1},{"name":"arrow","xi":2,"yi":3,"rotate":3,"alias":-1},{"name":"arrow","xi":2,"yi":4,"rotate":3,"alias":-1},{"name":"star","xi":1,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":2,"yi":1,"rotate":0,"alias":2},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":1},{"name":"player","xi":1,"yi":4,"rotate":3,"alias":0},{"name":"player","xi":1,"yi":1,"rotate":1,"alias":1},{"name":"player","xi":3,"yi":0,"rotate":2,"alias":2},{"id":18}],[{"name":"star","xi":1,"yi":3,"rotate":0,"alias":3},{"name":"arrow","xi":0,"yi":2,"rotate":0,"alias":-1},{"name":"arrow","xi":4,"yi":2,"rotate":2,"alias":-1},{"name":"star","xi":2,"yi":3,"rotate":0,"alias":2},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":1},{"name":"star","xi":2,"yi":1,"rotate":0,"alias":0},{"name":"arrow","xi":2,"yi":4,"rotate":3,"alias":-1},{"name":"player","xi":3,"yi":4,"rotate":3,"alias":0},{"name":"player","xi":4,"yi":1,"rotate":2,"alias":1},{"name":"player","xi":1,"yi":0,"rotate":1,"alias":2},{"name":"playerB","xi":1,"yi":2,"rotate":0,"alias":3},{"id":19}],[{"name":"star","xi":2,"yi":4,"rotate":0,"alias":2},{"name":"star","xi":0,"yi":2,"rotate":0,"alias":0},{"name":"arrow","xi":2,"yi":0,"rotate":1,"alias":-1},{"name":"arrow","xi":4,"yi":2,"rotate":2,"alias":-1},{"name":"arrow","xi":4,"yi":1,"rotate":2,"alias":-1},{"name":"star","xi":1,"yi":4,"rotate":0,"alias":1},{"name":"arrow","xi":0,"yi":1,"rotate":3,"alias":-1},{"name":"arrow","xi":0,"yi":0,"rotate":0,"alias":-1},{"name":"arrow","xi":1,"yi":0,"rotate":1,"alias":-1},{"name":"arrow","xi":3,"yi":0,"rotate":1,"alias":-1},{"name":"player","xi":3,"yi":3,"rotate":3,"alias":2},{"name":"player","xi":2,"yi":2,"rotate":0,"alias":0},{"name":"playerR","xi":3,"yi":2,"rotate":0,"alias":1},{"id":20}], ' +
    '[{"name":"star","xi":4,"yi":2,"rotate":0,"alias":2},{"name":"teleport","xi":0,"yi":2,"rotate":0,"alias":-1},{"name":"teleport","xi":4,"yi":0,"rotate":0,"alias":-1},{"name":"playerR","xi":0,"yi":0,"rotate":0,"alias":2},{"id":21}],[{"name":"star","xi":3,"yi":0,"rotate":0,"alias":1},{"name":"arrow","xi":0,"yi":1,"rotate":3,"alias":-1},{"name":"arrow","xi":4,"yi":0,"rotate":2,"alias":-1},{"name":"star","xi":4,"yi":1,"rotate":0,"alias":2},{"name":"teleport","xi":2,"yi":0,"rotate":0,"alias":-1},{"name":"star","xi":0,"yi":0,"rotate":0,"alias":0},{"name":"teleport","xi":2,"yi":1,"rotate":0,"alias":-1},{"name":"player","xi":1,"yi":0,"rotate":0,"alias":0},{"name":"player","xi":3,"yi":2,"rotate":3,"alias":1},{"name":"player","xi":3,"yi":1,"rotate":2,"alias":2},{"id":22}],[{"name":"arrow","xi":4,"yi":1,"rotate":2,"alias":-1},{"name":"arrow","xi":0,"yi":1,"rotate":0,"alias":-1},{"name":"teleport","xi":2,"yi":4,"rotate":0,"alias":-1},{"name":"teleport","xi":1,"yi":0,"rotate":0,"alias":-1},{"name":"star","xi":1,"yi":2,"rotate":0,"alias":2},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":1},{"name":"player","xi":1,"yi":4,"rotate":3,"alias":0},{"name":"player","xi":3,"yi":3,"rotate":2,"alias":2},{"name":"player","xi":2,"yi":1,"rotate":0,"alias":1},{"id":23}],[{"name":"star","xi":3,"yi":2,"rotate":0,"alias":1},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":2},{"name":"teleport","xi":1,"yi":1,"rotate":0,"alias":-1},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":1},{"name":"teleport","xi":1,"yi":3,"rotate":0,"alias":-1},{"name":"star","xi":0,"yi":3,"rotate":0,"alias":0},{"name":"player","xi":4,"yi":1,"rotate":2,"alias":2},{"name":"player","xi":4,"yi":3,"rotate":2,"alias":0},{"name":"player","xi":2,"yi":4,"rotate":3,"alias":1},{"name":"player","xi":3,"yi":0,"rotate":1,"alias":1},{"id":24}],[{"name":"star","xi":0,"yi":1,"rotate":0,"alias":3},{"name":"arrow","xi":2,"yi":4,"rotate":3,"alias":-1},{"name":"star","xi":3,"yi":2,"rotate":0,"alias":2},{"name":"star","xi":1,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":1},{"name":"player","xi":1,"yi":4,"rotate":0,"alias":1},{"name":"player","xi":3,"yi":4,"rotate":2,"alias":2},{"name":"player","xi":2,"yi":3,"rotate":1,"alias":0},{"name":"player","xi":3,"yi":3,"rotate":2,"alias":3},{"id":25}],[{"name":"star","xi":4,"yi":4,"rotate":0,"alias":3},{"name":"teleport","xi":1,"yi":4,"rotate":0,"alias":-1},{"name":"star","xi":1,"yi":2,"rotate":0,"alias":1},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":2},{"name":"teleport","xi":2,"yi":0,"rotate":0,"alias":-1},{"name":"player","xi":2,"yi":4,"rotate":3,"alias":0},{"name":"player","xi":0,"yi":3,"rotate":0,"alias":1},{"name":"player","xi":3,"yi":2,"rotate":2,"alias":2},{"name":"playerR","xi":0,"yi":0,"rotate":0,"alias":3},{"id":26}],[{"name":"star","xi":4,"yi":2,"rotate":0,"alias":0},{"name":"teleport","xi":1,"yi":3,"rotate":0,"alias":-1},{"name":"teleport","xi":3,"yi":1,"rotate":0,"alias":-1},{"name":"arrow","xi":3,"yi":3,"rotate":3,"alias":-1},{"name":"arrow","xi":2,"yi":2,"rotate":0,"alias":-1},{"name":"star","xi":1,"yi":1,"rotate":0,"alias":1},{"name":"star","xi":1,"yi":0,"rotate":0,"alias":3},{"name":"player","xi":2,"yi":4,"rotate":3,"alias":0},{"name":"player","xi":2,"yi":0,"rotate":1,"alias":1},{"name":"player","xi":2,"yi":3,"rotate":3,"alias":3},{"id":27}],[{"name":"arrow","xi":1,"yi":0,"rotate":1,"alias":-1},{"name":"arrow","xi":2,"yi":1,"rotate":2,"alias":-1},{"name":"teleport","xi":2,"yi":2,"rotate":0,"alias":-1},{"name":"teleport","xi":1,"yi":3,"rotate":0,"alias":-1},{"name":"star","xi":0,"yi":3,"rotate":0,"alias":0},{"name":"star","xi":0,"yi":2,"rotate":0,"alias":2},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":1},{"name":"arrow","xi":2,"yi":4,"rotate":3,"alias":-1},{"name":"arrow","xi":3,"yi":4,"rotate":2,"alias":-1},{"name":"player","xi":4,"yi":3,"rotate":2,"alias":2},{"name":"player","xi":3,"yi":2,"rotate":1,"alias":0},{"name":"player","xi":2,"yi":3,"rotate":0,"alias":1},{"id":28}],[{"name":"arrow","xi":0,"yi":2,"rotate":1,"alias":-1},{"name":"star","xi":0,"yi":4,"rotate":0,"alias":1},{"name":"star","xi":2,"yi":2,"rotate":0,"alias":0},{"name":"star","xi":2,"yi":3,"rotate":0,"alias":1},{"name":"star","xi":2,"yi":4,"rotate":0,"alias":3},{"name":"arrow","xi":1,"yi":2,"rotate":0,"alias":-1},{"name":"arrow","xi":3,"yi":2,"rotate":2,"alias":-1},{"name":"arrow","xi":2,"yi":1,"rotate":1,"alias":-1},{"name":"arrow","xi":4,"yi":2,"rotate":1,"alias":-1},{"name":"star","xi":4,"yi":3,"rotate":0,"alias":2},{"name":"player","xi":1,"yi":1,"rotate":1,"alias":0},{"name":"player","xi":3,"yi":1,"rotate":1,"alias":1},{"name":"player","xi":1,"yi":3,"rotate":3,"alias":2},{"name":"player","xi":3,"yi":3,"rotate":3,"alias":3},{"name":"player","xi":0,"yi":3,"rotate":3,"alias":1},{"id":29}],[{"name":"arrow","xi":4,"yi":1,"rotate":2,"alias":-1},{"name":"arrow","xi":3,"yi":0,"rotate":1,"alias":-1},{"name":"arrow","xi":0,"yi":2,"rotate":0,"alias":-1},{"name":"arrow","xi":3,"yi":4,"rotate":3,"alias":-1},{"name":"star","xi":1,"yi":3,"rotate":0,"alias":0},{"name":"star","xi":2,"yi":3,"rotate":0,"alias":1},{"name":"star","xi":3,"yi":3,"rotate":0,"alias":2},{"name":"star","xi":0,"yi":1,"rotate":0,"alias":3},{"name":"player","xi":4,"yi":2,"rotate":3,"alias":1},{"name":"player","xi":1,"yi":0,"rotate":1,"alias":2},{"name":"player","xi":0,"yi":0,"rotate":1,"alias":0},{"name":"playerB","xi":3,"yi":1,"rotate":0,"alias":3},{"id":30}]]}';
PS.TUTOR_LEVEL = '[{"name":"star","xi":2,"yi":3,"rotate":0,"alias":2},{"name":"player","xi":2,"yi":1,"rotate":1,"alias":2},{"id":1}]';
// main

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

        this.addFrame(this.startmenu = new PS.StartMenu(this));
        this.addFrame(this.settings = new PS.Settings(this));
        this.addFrame(this.gameplay = new PS.GamePlay(this));
        this.addFrame(this.levelselect = new PS.LevelSelect(this));
        this.addFrame(this.intro = new PS.LevelIntro(this));
        this.addFrame(this.outro = new PS.LevelOutro(this));
        this.addFrame(this.dev = new PS.Dev(this));
        this.addFrame(this.fps = new GodStep.FPS(this, 0x22aa00,.0));
        this.addFrame(this.transmission = new PS.Transmission(this));
        this.addFrame(this.orientation = new PS.Orientation(this));

        var p = this.loadPlayer();
        if(!p.tutorial) {
            this.gameplay.initTutor(false);
            this.screenTo([this.startmenu], this.assets);

        } else {
            this.gameplay.initTutor(true);
            this.screenTo([this.gameplay], this.assets);
            PS.TUTORIAL = false;
        }


        this.resizeWindow(this.OW, this.OH);
        this.reposition();
    }

};
pro.loadPlayer = function() {
    var instance = PS.ZippyBoxes.instance;
    instance.PLAYER = GodStep.LoadLocal(instance.PLAYER_SLOT) || {count:PS.LAST_LEVEL_SELECTED-1 || 0, sound:true, music:true, tutorial:true};
    PS.SOUND = instance.PLAYER.sound;
    PS.MUSIC = instance.PLAYER.music;
    PS.TUTORIAL = instance.PLAYER.tutorial;
    return instance.PLAYER;
};
pro.savePlayer = function() {
    var instance = PS.ZippyBoxes.instance;
    instance.PLAYER.sound = PS.SOUND;
    instance.PLAYER.music = PS.MUSIC;
    instance.PLAYER.tutorial = PS.TUTORIAL;
    GodStep.SaveLocal(instance.PLAYER, instance.PLAYER_SLOT);
};
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////

/// starting
function startZippyBoxes(lang) {
    //$('meta[name=viewport]').remove();
   // $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">');
    if(!PS.ZippyBoxes.instance) {
        var game = new PS.ZippyBoxes(lang);
            game.div.style.margin = '0 auto';
            game.div.style['vertical-align'] = 'middle';
            game.initResizeEvents();
    }
}


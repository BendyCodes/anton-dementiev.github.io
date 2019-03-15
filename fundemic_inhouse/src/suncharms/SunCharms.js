var M3 = M3 || {};

include('com/soundjs-NEXT.combined');
include('lq/video/FPS');
include('lq/video/Text');
include('lq/data/LocalStorage');
include('lq/games/Cell');
include('lq/games/CellField');
include('lq/games/Transmission');
include('lq/video/BitmapText');
include('lq/games/TextButton');
include('lq/games/ImgButton');
include('lq/video/LFrame');

include('src/suncharms/Assets');
include('src/suncharms/StartMenu');
include('src/suncharms/Transmission');
include('src/suncharms/Img');
include('src/suncharms/Dev');
include('src/suncharms/Cell');
include('src/suncharms/Field');
include('src/suncharms/ImgButton');
include('src/suncharms/LevelSelect');
include('src/suncharms/CellObject');
include('src/suncharms/Text');
include('src/suncharms/GamePlay');
include('src/suncharms/FontLoader');
include('src/suncharms/Background');
include('src/suncharms/Settings');
include('src/suncharms/LevButton');
include('src/suncharms/Replay');
include('src/suncharms/MovieClip');
include('src/suncharms/Tutorial');
include('src/suncharms/TutorialOne');
include('src/suncharms/Victory');
include('src/suncharms/Pause');


M3.SunCharms = function () {
    GodStep.Game.TRANSPARENT = true;
  //  GodStep.IMAGE_RESOLUTION = 1;
    //this.AUDIOTAG = true;
    GodStep.Game.call(this, 'SunCharms', 0x888888, M3.Assets, 'M3_settings1021', 'M3_player561', M3.DEFAULT_SETTINGS);
    M3.SunCharms.instance = this;
    M3.SOUND = M3.MUSIC = true;
    this.MW = 1536;
    this.MH = 1854;
};

extend(M3.SunCharms, GodStep.Game);
M3.SCALE = 1;
M3.CELL_SCALE = .85;
M3.CELL_SCALE_BACK = 1.06;
M3.CELLW_SCALE = .8;
M3.IMAGE_PATH = 'src/SunCharms/img/';
M3.SOUND_PATH = 'src/SunCharms/sounds/';
{M3.DEFAULT_SETTINGS = '{"levels":[[{"name":"delete","xi":6,"yi":8},{"name":"delete","xi":6,"yi":7},{"name":"delete","xi":6,"yi":6},{"name":"delete","xi":6,"yi":5},{"name":"delete","xi":6,"yi":4},{"name":"delete","xi":6,"yi":3},{"name":"delete","xi":6,"yi":2},{"name":"delete","xi":6,"yi":0},{"name":"delete","xi":6,"yi":1},{"name":"delete","xi":0,"yi":0},{"name":"delete","xi":0,"yi":1},{"name":"delete","xi":0,"yi":2},{"name":"delete","xi":0,"yi":3},{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":0,"yi":5},{"name":"delete","xi":0,"yi":6},{"name":"delete","xi":0,"yi":7},{"name":"delete","xi":0,"yi":8},{"name":"delete","xi":1,"yi":7},{"name":"delete","xi":1,"yi":8},{"name":"delete","xi":2,"yi":8},{"name":"delete","xi":2,"yi":7},{"name":"delete","xi":3,"yi":7},{"name":"delete","xi":3,"yi":8},{"name":"delete","xi":4,"yi":8},{"name":"delete","xi":4,"yi":7},{"name":"delete","xi":5,"yi":7},{"name":"delete","xi":5,"yi":8},{"points":5000,"items":0,"colors":[0,1,2],"steps":7,"bonuses":0,"isBonus":false,"id":1}],[{"name":"delete","xi":0,"yi":8},{"name":"delete","xi":1,"yi":8},{"name":"delete","xi":2,"yi":8},{"name":"delete","xi":4,"yi":8},{"name":"delete","xi":3,"yi":8},{"name":"delete","xi":5,"yi":8},{"name":"delete","xi":6,"yi":8},{"name":"delete","xi":3,"yi":7},{"name":"delete","xi":3,"yi":6},{"name":"delete","xi":2,"yi":5},{"name":"delete","xi":3,"yi":5},{"name":"delete","xi":4,"yi":5},{"points":10000,"items":0,"colors":[0,1,2],"steps":8,"bonuses":0,"isBonus":false,"id":2}],[{"name":"delete","xi":0,"yi":0},{"name":"delete","xi":0,"yi":1},{"name":"delete","xi":6,"yi":0},{"name":"delete","xi":6,"yi":1},{"name":"delete","xi":6,"yi":7},{"name":"delete","xi":6,"yi":8},{"name":"delete","xi":0,"yi":7},{"name":"delete","xi":0,"yi":8},{"points":20000,"items":0,"colors":[0,1,2,3],"steps":12,"bonuses":0,"isBonus":false,"id":3}],[{"name":"delete","xi":3,"yi":2},{"name":"delete","xi":3,"yi":3},{"name":"delete","xi":1,"yi":5},{"name":"delete","xi":5,"yi":5},{"points":24000,"items":0,"colors":[0,1,2,3],"steps":13,"bonuses":0,"isBonus":true,"id":4}],[{"name":"delete","xi":3,"yi":2},{"name":"delete","xi":2,"yi":3},{"name":"delete","xi":4,"yi":3},{"name":"delete","xi":3,"yi":5},{"name":"delete","xi":1,"yi":6},{"name":"delete","xi":5,"yi":6},{"points":28000,"items":0,"colors":[0,1,2,3],"steps":19,"bonuses":0,"isBonus":true,"id":5}],[{"name":"dirt","xi":2,"yi":6},{"name":"dirt","xi":3,"yi":6},{"name":"dirt","xi":4,"yi":6},{"name":"dirt","xi":2,"yi":3},{"name":"dirt","xi":3,"yi":3},{"name":"dirt","xi":4,"yi":3},{"points":0,"items":0,"colors":[0,1,2,3],"steps":10,"bonuses":0,"isBonus":true,"id":6}],[{"name":"dirt","xi":2,"yi":3},{"name":"dirt","xi":3,"yi":3},{"name":"dirt","xi":4,"yi":3},{"name":"dirt","xi":4,"yi":4},{"name":"dirt","xi":3,"yi":4},{"name":"dirt","xi":2,"yi":4},{"name":"dirt","xi":2,"yi":5},{"name":"dirt","xi":3,"yi":5},{"name":"dirt","xi":4,"yi":5},{"points":0,"items":0,"colors":[0,1,2,3],"steps":14,"bonuses":0,"isBonus":true,"id":7}],[{"name":"dirt","xi":1,"yi":7},{"name":"dirt","xi":2,"yi":7},{"name":"dirt","xi":3,"yi":7},{"name":"dirt","xi":4,"yi":7},{"name":"dirt","xi":5,"yi":7},{"name":"dirt","xi":2,"yi":6},{"name":"dirt","xi":3,"yi":6},{"name":"dirt","xi":4,"yi":6},{"name":"dirt","xi":1,"yi":5},{"name":"dirt","xi":2,"yi":5},{"name":"dirt","xi":3,"yi":5},{"name":"dirt","xi":4,"yi":5},{"name":"dirt","xi":5,"yi":5},{"points":0,"items":0,"colors":[0,1,2,3],"steps":12,"bonuses":0,"isBonus":true,"id":8}],[{"name":"delete","xi":1,"yi":0},{"name":"delete","xi":1,"yi":1},{"name":"delete","xi":5,"yi":0},{"name":"delete","xi":5,"yi":1},{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":6,"yi":4},{"name":"delete","xi":1,"yi":7},{"name":"delete","xi":1,"yi":8},{"name":"delete","xi":5,"yi":7},{"name":"delete","xi":5,"yi":8},{"name":"dirt","xi":3,"yi":0},{"name":"dirt","xi":3,"yi":1},{"name":"dirt","xi":3,"yi":2},{"name":"dirt","xi":3,"yi":3},{"name":"dirt","xi":3,"yi":4},{"name":"dirt","xi":3,"yi":5},{"name":"dirt","xi":3,"yi":6},{"name":"dirt","xi":3,"yi":7},{"name":"dirt","xi":3,"yi":8},{"name":"dirt","xi":1,"yi":4},{"name":"dirt","xi":2,"yi":4},{"name":"dirt","xi":4,"yi":4},{"name":"dirt","xi":5,"yi":4},{"points":0,"items":0,"colors":[0,1,2,3],"steps":12,"bonuses":0,"isBonus":true,"id":9}],[{"name":"delete","xi":3,"yi":8},{"name":"delete","xi":3,"yi":7},{"name":"dirt","xi":2,"yi":8},{"name":"dirt","xi":2,"yi":7},{"name":"dirt","xi":2,"yi":6},{"name":"dirt","xi":3,"yi":6},{"name":"dirt","xi":4,"yi":6},{"name":"dirt","xi":4,"yi":7},{"name":"dirt","xi":4,"yi":8},{"name":"dirt","xi":3,"yi":5},{"name":"dirt","xi":3,"yi":4},{"name":"dirt","xi":3,"yi":3},{"name":"dirt","xi":4,"yi":3},{"name":"dirt","xi":2,"yi":3},{"name":"dirt","xi":0,"yi":6},{"name":"dirt","xi":6,"yi":6},{"name":"dirt","xi":0,"yi":4},{"name":"dirt","xi":6,"yi":4},{"name":"dirt","xi":0,"yi":1},{"name":"dirt","xi":6,"yi":1},{"points":0,"items":0,"colors":[0,1,2,3],"steps":10,"bonuses":0,"isBonus":true,"id":10}],[{"points":25000,"items":0,"colors":[0,1,2,3,4],"steps":12,"bonuses":0,"isBonus":true,"id":11}],[{"points":30000,"items":0,"colors":[0,1,2,3,4],"steps":16,"bonuses":0,"isBonus":true,"id":12}],[{"points":0,"items":2,"colors":[0,1,2,3,4],"steps":15,"bonuses":0,"isBonus":true,"id":13}],[{"name":"delete","xi":0,"yi":1},{"name":"delete","xi":6,"yi":1},{"name":"delete","xi":5,"yi":1},{"name":"delete","xi":1,"yi":1},{"name":"delete","xi":3,"yi":3},{"name":"delete","xi":0,"yi":5},{"name":"delete","xi":1,"yi":5},{"name":"delete","xi":5,"yi":5},{"name":"delete","xi":6,"yi":5},{"points":0,"items":3,"colors":[0,1,2,3,4],"steps":15,"bonuses":0,"isBonus":true,"id":14}],[{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":3,"yi":4},{"name":"delete","xi":6,"yi":4},{"name":"delete","xi":0,"yi":3},{"name":"delete","xi":3,"yi":3},{"name":"delete","xi":6,"yi":3},{"points":0,"items":3,"colors":[0,1,2,3,4],"steps":15,"bonuses":0,"isBonus":true,"id":15}],[{"name":"delete","xi":0,"yi":8},{"name":"delete","xi":0,"yi":7},{"name":"delete","xi":0,"yi":6},{"name":"delete","xi":0,"yi":5},{"name":"delete","xi":6,"yi":5},{"name":"delete","xi":6,"yi":6},{"name":"delete","xi":6,"yi":7},{"name":"delete","xi":6,"yi":8},{"name":"delete","xi":5,"yi":7},{"name":"delete","xi":5,"yi":8},{"name":"delete","xi":1,"yi":7},{"name":"delete","xi":1,"yi":8},{"name":"delete","xi":2,"yi":2},{"name":"delete","xi":3,"yi":2},{"name":"delete","xi":4,"yi":2},{"points":0,"items":3,"colors":[0,1,2,3,4],"steps":26,"bonuses":0,"isBonus":true,"id":16}],[{"name":"delete","xi":1,"yi":2},{"name":"delete","xi":5,"yi":5},{"name":"delete","xi":0,"yi":8},{"name":"delete","xi":1,"yi":8},{"name":"dirt","xi":0,"yi":3},{"name":"dirt","xi":1,"yi":3},{"name":"dirt","xi":5,"yi":6},{"name":"dirt","xi":6,"yi":6},{"name":"dirt","xi":1,"yi":7},{"name":"dirt","xi":0,"yi":7},{"name":"dirt","xi":6,"yi":1},{"name":"dirt","xi":6,"yi":2},{"points":0,"items":0,"colors":[0,1,2,3,4],"steps":11,"bonuses":0,"isBonus":true,"id":17}],[{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":2,"yi":4},{"name":"delete","xi":4,"yi":4},{"name":"delete","xi":6,"yi":4},{"name":"delete","xi":1,"yi":2},{"name":"delete","xi":5,"yi":2},{"name":"delete","xi":1,"yi":6},{"name":"delete","xi":5,"yi":6},{"points":0,"items":4,"colors":[0,1,2,3,4],"steps":24,"bonuses":0,"isBonus":true,"id":18}],[{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":1,"yi":4},{"name":"delete","xi":1,"yi":3},{"name":"delete","xi":0,"yi":3},{"name":"delete","xi":5,"yi":1},{"name":"delete","xi":5,"yi":0},{"name":"delete","xi":6,"yi":0},{"name":"delete","xi":6,"yi":1},{"name":"delete","xi":5,"yi":8},{"name":"delete","xi":5,"yi":7},{"name":"delete","xi":6,"yi":7},{"name":"delete","xi":6,"yi":8},{"points":35000,"items":0,"colors":[0,1,2,3,4],"steps":25,"bonuses":0,"isBonus":true,"id":19}],[{"name":"delete","xi":1,"yi":7},{"name":"delete","xi":5,"yi":7},{"name":"delete","xi":5,"yi":3},{"name":"delete","xi":1,"yi":3},{"points":0,"items":4,"colors":[0,1,2,3,4],"steps":29,"bonuses":0,"isBonus":true,"id":20}],[{"name":"block","xi":0,"yi":4},{"name":"block","xi":1,"yi":4},{"name":"block","xi":2,"yi":4},{"name":"block","xi":3,"yi":4},{"name":"block","xi":4,"yi":4},{"name":"block","xi":5,"yi":4},{"name":"block","xi":6,"yi":4},{"points":17000,"items":0,"colors":[0,1,2,3,4],"steps":10,"bonuses":0,"isBonus":true,"id":21}],[{"name":"block","xi":3,"yi":0},{"name":"block","xi":3,"yi":1},{"name":"block","xi":3,"yi":2},{"name":"block","xi":3,"yi":3},{"name":"block","xi":3,"yi":4},{"name":"block","xi":3,"yi":5},{"name":"block","xi":3,"yi":6},{"name":"block","xi":3,"yi":7},{"name":"block","xi":3,"yi":8},{"name":"block","xi":2,"yi":4},{"name":"block","xi":1,"yi":4},{"name":"block","xi":0,"yi":4},{"name":"block","xi":4,"yi":4},{"name":"block","xi":5,"yi":4},{"name":"block","xi":6,"yi":4},{"points":20000,"items":0,"colors":[0,1,2,3,4],"steps":14,"bonuses":0,"isBonus":true,"id":22}],[{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":0,"yi":5},{"name":"delete","xi":6,"yi":4},{"name":"delete","xi":6,"yi":5},{"name":"delete","xi":2,"yi":0},{"name":"delete","xi":3,"yi":0},{"name":"delete","xi":4,"yi":0},{"name":"delete","xi":2,"yi":8},{"name":"delete","xi":3,"yi":8},{"name":"delete","xi":4,"yi":8},{"name":"delete","xi":6,"yi":3},{"name":"delete","xi":0,"yi":3},{"name":"block","xi":5,"yi":5},{"name":"block","xi":4,"yi":5},{"name":"block","xi":4,"yi":4},{"name":"block","xi":4,"yi":3},{"name":"block","xi":3,"yi":3},{"name":"block","xi":3,"yi":2},{"name":"block","xi":2,"yi":2},{"name":"block","xi":2,"yi":1},{"name":"dirt","xi":1,"yi":6},{"name":"dirt","xi":1,"yi":7},{"name":"dirt","xi":2,"yi":7},{"name":"dirt","xi":2,"yi":6},{"name":"dirt","xi":5,"yi":2},{"name":"dirt","xi":5,"yi":1},{"name":"dirt","xi":6,"yi":1},{"name":"dirt","xi":6,"yi":2},{"points":0,"items":0,"colors":[0,1,2,3,4],"steps":9,"bonuses":0,"isBonus":true,"id":23}],[{"name":"block","xi":0,"yi":4},{"name":"block","xi":2,"yi":4},{"name":"block","xi":3,"yi":4},{"name":"block","xi":3,"yi":3},{"name":"block","xi":3,"yi":2},{"name":"block","xi":4,"yi":4},{"name":"block","xi":6,"yi":4},{"name":"block","xi":3,"yi":0},{"name":"block","xi":3,"yi":1},{"name":"block","xi":5,"yi":5},{"name":"block","xi":1,"yi":5},{"points":0,"items":3,"colors":[0,1,2,3,4],"steps":15,"bonuses":0,"isBonus":true,"id":24}],[{"name":"block","xi":6,"yi":0},{"name":"block","xi":6,"yi":1},{"name":"block","xi":5,"yi":2},{"name":"block","xi":5,"yi":3},{"name":"block","xi":4,"yi":4},{"name":"block","xi":4,"yi":5},{"name":"block","xi":3,"yi":6},{"name":"block","xi":3,"yi":7},{"name":"block","xi":2,"yi":7},{"name":"block","xi":2,"yi":8},{"name":"block","xi":3,"yi":5},{"name":"block","xi":1,"yi":8},{"name":"block","xi":0,"yi":8},{"name":"block","xi":4,"yi":3},{"name":"block","xi":5,"yi":1},{"points":0,"items":4,"colors":[0,1,2,3,4],"steps":18,"bonuses":0,"isBonus":true,"id":25}],[{"name":"block","xi":1,"yi":1},{"name":"block","xi":3,"yi":2},{"name":"block","xi":5,"yi":1},{"name":"block","xi":1,"yi":4},{"name":"block","xi":5,"yi":4},{"name":"block","xi":3,"yi":3},{"name":"block","xi":1,"yi":3},{"name":"block","xi":5,"yi":3},{"name":"block","xi":1,"yi":0},{"name":"block","xi":5,"yi":0},{"name":"block","xi":1,"yi":6},{"name":"block","xi":1,"yi":7},{"name":"block","xi":1,"yi":8},{"name":"block","xi":5,"yi":6},{"name":"block","xi":5,"yi":7},{"name":"block","xi":5,"yi":8},{"name":"block","xi":3,"yi":7},{"name":"block","xi":3,"yi":6},{"points":50000,"items":0,"colors":[0,1,2,3,4],"steps":28,"bonuses":0,"isBonus":true,"id":26}],[{"name":"dirt","xi":0,"yi":8},{"name":"dirt","xi":1,"yi":8},{"name":"dirt","xi":2,"yi":8},{"name":"dirt","xi":3,"yi":8},{"name":"dirt","xi":4,"yi":8},{"name":"dirt","xi":5,"yi":8},{"name":"dirt","xi":6,"yi":8},{"name":"dirt","xi":6,"yi":7},{"name":"dirt","xi":6,"yi":6},{"name":"dirt","xi":6,"yi":5},{"name":"dirt","xi":6,"yi":4},{"name":"dirt","xi":6,"yi":2},{"name":"dirt","xi":6,"yi":3},{"name":"dirt","xi":6,"yi":1},{"name":"dirt","xi":6,"yi":0},{"name":"dirt","xi":5,"yi":0},{"name":"dirt","xi":4,"yi":0},{"name":"dirt","xi":3,"yi":0},{"name":"dirt","xi":2,"yi":0},{"name":"dirt","xi":1,"yi":0},{"name":"dirt","xi":0,"yi":0},{"name":"dirt","xi":0,"yi":1},{"name":"dirt","xi":0,"yi":2},{"name":"dirt","xi":0,"yi":3},{"name":"dirt","xi":0,"yi":4},{"name":"dirt","xi":0,"yi":5},{"name":"dirt","xi":0,"yi":6},{"name":"dirt","xi":0,"yi":7},{"name":"delete","xi":3,"yi":3},{"name":"delete","xi":3,"yi":4},{"name":"delete","xi":3,"yi":5},{"points":0,"items":0,"colors":[0,1,2,3,4],"steps":15,"bonuses":0,"isBonus":true,"id":27}],[{"name":"block","xi":3,"yi":8},{"name":"block","xi":0,"yi":8},{"name":"block","xi":1,"yi":8},{"name":"block","xi":2,"yi":8},{"name":"block","xi":4,"yi":8},{"name":"block","xi":5,"yi":8},{"name":"block","xi":6,"yi":8},{"name":"block","xi":0,"yi":7},{"name":"block","xi":1,"yi":7},{"name":"block","xi":2,"yi":7},{"name":"block","xi":3,"yi":7},{"name":"block","xi":4,"yi":7},{"name":"block","xi":5,"yi":7},{"name":"block","xi":6,"yi":7},{"name":"block","xi":6,"yi":6},{"name":"block","xi":5,"yi":6},{"name":"block","xi":4,"yi":6},{"name":"block","xi":3,"yi":6},{"name":"block","xi":2,"yi":6},{"name":"block","xi":1,"yi":6},{"name":"block","xi":0,"yi":6},{"points":0,"items":3,"colors":[0,1,2,3,4],"steps":15,"bonuses":0,"isBonus":true,"id":28}],[{"name":"delete","xi":0,"yi":4},{"name":"delete","xi":1,"yi":4},{"name":"delete","xi":2,"yi":4},{"name":"delete","xi":5,"yi":4},{"name":"delete","xi":6,"yi":4},{"name":"delete","xi":4,"yi":4},{"name":"dirt","xi":0,"yi":8},{"name":"dirt","xi":1,"yi":8},{"name":"dirt","xi":2,"yi":8},{"name":"dirt","xi":3,"yi":8},{"name":"dirt","xi":4,"yi":8},{"name":"dirt","xi":5,"yi":8},{"name":"dirt","xi":6,"yi":8},{"name":"dirt","xi":5,"yi":7},{"name":"dirt","xi":4,"yi":7},{"name":"dirt","xi":3,"yi":7},{"name":"dirt","xi":2,"yi":7},{"name":"dirt","xi":1,"yi":7},{"name":"dirt","xi":2,"yi":6},{"name":"dirt","xi":3,"yi":6},{"name":"dirt","xi":4,"yi":6},{"name":"dirt","xi":3,"yi":5},{"points":0,"items":0,"colors":[0,1,2,3,4],"steps":11,"bonuses":0,"isBonus":true,"id":29}],[{"name":"block","xi":6,"yi":0},{"name":"block","xi":6,"yi":1},{"name":"block","xi":6,"yi":2},{"name":"block","xi":6,"yi":3},{"name":"block","xi":6,"yi":4},{"name":"block","xi":6,"yi":5},{"name":"block","xi":6,"yi":6},{"name":"block","xi":6,"yi":7},{"name":"block","xi":6,"yi":8},{"name":"block","xi":0,"yi":0},{"name":"block","xi":0,"yi":1},{"name":"block","xi":0,"yi":3},{"name":"block","xi":0,"yi":2},{"name":"block","xi":0,"yi":4},{"name":"block","xi":0,"yi":5},{"name":"block","xi":0,"yi":6},{"name":"block","xi":0,"yi":7},{"name":"block","xi":0,"yi":8},{"name":"block","xi":1,"yi":8},{"name":"block","xi":2,"yi":8},{"name":"block","xi":3,"yi":8},{"name":"block","xi":5,"yi":8},{"name":"block","xi":4,"yi":8},{"name":"block","xi":5,"yi":7},{"name":"block","xi":5,"yi":6},{"name":"block","xi":5,"yi":5},{"name":"block","xi":5,"yi":3},{"name":"block","xi":5,"yi":4},{"name":"block","xi":5,"yi":2},{"name":"block","xi":5,"yi":1},{"name":"block","xi":5,"yi":0},{"name":"block","xi":1,"yi":0},{"name":"block","xi":1,"yi":1},{"name":"block","xi":1,"yi":3},{"name":"block","xi":1,"yi":2},{"name":"block","xi":1,"yi":4},{"name":"block","xi":1,"yi":5},{"name":"block","xi":1,"yi":6},{"name":"block","xi":1,"yi":7},{"name":"block","xi":2,"yi":7},{"name":"block","xi":3,"yi":7},{"name":"block","xi":4,"yi":7},{"points":27000,"items":0,"colors":[0,1,2,3,4],"steps":14,"bonuses":0,"isBonus":true,"id":30}]]}';// main
}
pro.update = function() {
    this.beginFps();
    GodStep.Mejdu.prototype.update.call(this);
    this.endFps();
};
pro.run = function() {
    catched(function() {
        if (!this.isRunning) {
            var t = M3.SunCharms.instance;
            trace('running');
            t.isRunning = true;
            t.addFrame(t.startmenu = new M3.StartMenu(t));
            t.addFrame(t.levelselect = new M3.LevelSelect(t));
            t.addFrame(t.gameplay = new M3.GamePlay(t));
            t.addFrame(t.settings = new M3.Settings(t));
            t.addFrame(t.replay = new M3.Replay(t));
            t.addFrame(t.victory = new M3.Victory(t));
            t.addFrame(t.dev = new M3.Dev(t));

            t.addFrame(t.fps = new GodStep.FPS(t, 0x22aa00));
            t.fps.addString((t.CANVAS) ? 'C' : 'W');
            t.fps.visible = false;
            t.addFrame(t.transmission = new M3.Transmission(t));
            // M3.DEVMODE = true;
            t.settingsDATA = GodStep.LoadLocal(t.SETTINGS_SLOT);
            if(!t.settingsDATA) {
                t.settingsDATA = GodStep.LoadText(M3.DEFAULT_SETTINGS);
            }
            t.playerDATA = t.loadPlayer();
            for (var i = 0; i < t.settingsDATA.levels.length; i++) {
                t.playerDATA.levels.push([0, 0]);
            }
            //  M3.LAST_LEVEL_SELECTED = 14;
           //  M3.LAST_LEVEL_DATA = t.settingsDATA.levels[M3.LAST_LEVEL_SELECTED - 1];
          //  t.screenTo([t.gameplay], t.assets);

            t.screenTo([t.startmenu], t.assets);
            t.resizeWindow(t.OW, t.OH);
            t.reposition();
        }

    }, 'RUN');
};
pro.loadPlayer = function() {
    var instance = M3.SunCharms.instance;
    instance.PLAYER = GodStep.LoadLocal(instance.PLAYER_SLOT) || {levels:[], sound:true, music:true, tutorial:true};
    if(instance.PLAYER.levels.length == 0) {
        for(var i = 0; i<30; i++) {
            instance.PLAYER.levels.push([0, 0]);
        }
    }
    M3.SOUND = instance.PLAYER.sound;
    M3.MUSIC = instance.PLAYER.music;
    M3.TUTORIAL = instance.PLAYER.tutorial;
    return instance.PLAYER;
};
pro.savePlayer = function() {
    var instance = M3.SunCharms.instance;
    instance.PLAYER.sound = M3.SOUND;
    instance.PLAYER.music = M3.MUSIC;
    instance.PLAYER.tutorial = M3.TUTORIAL;
    GodStep.SaveLocal(instance.PLAYER, instance.PLAYER_SLOT);
};
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
M3.Format = function(v) {
    if(v.length <= 3) return v;
    return v.substr(0, v.length - 3) + ',' + v.substr(v.length - 3, 3);
};
/// starting
function startSunCharms() {
    if(!M3.SunCharms.instance) {
        var game = new M3.SunCharms();
            game.div.style.margin = '0 auto';
            game.div.style['vertical-align'] = 'middle';
            game.initResizeEvents();
    }
}


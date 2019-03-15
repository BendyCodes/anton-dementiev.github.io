var AZ = AZ || {};
include('com/soundjs-NEXT.combined');

include('lq/video/Text');
include('lq/data/LocalStorage');
include('lq/video/FPS');

include('src/alienanza/Assets');
include('src/alienanza/Text');
include('src/alienanza/Img');
include('src/alienanza/Background');
include('src/alienanza/ImgButton');
include('src/alienanza/Settings');
include('src/alienanza/StartMenu');
include('src/alienanza/GamePlay');
include('src/alienanza/GameOver');
include('src/alienanza/Timer');
include('src/alienanza/Transmission');
include('lq/games/Transmission');

 AZ.Alienanza = function () {
     //this.CANVAS = true;
     GodStep.IMAGE_RESOLUTION = 1;

     AZ.SOUND = AZ.MUSIC = true;
     // this.AUDIOTAG = true;
     GodStep.Game.TRANSPARENT = true;


     GodStep.Game.call(this, 'Alienanza', 0x071240, AZ.Assets, 'az_settings8', 'az_player3', AZ.DEFAULT_SETTINGS, 'auto');
     AZ.Alienanza.instance = this;

 }; extend(AZ.Alienanza, GodStep.Game);


AZ.E_LOADED = 'event loaded';
AZ.IMAGE_PATH = 'src/alienanza/img/';
AZ.SOUND_PATH = 'src/alienanza/sounds/';
AZ.DEFAULT_SETTINGS = '{}';
// main
pro.update = function() {
    this.beginFps();
    GodStep.Mejdu.prototype.update.call(this);
    this.endFps();
};


pro.run = function() {
    trace('running');
    this.isRunning = true;

    this.addFrame(this.background = new AZ.Background(this));
    this.addFrame(this.startmenu = new AZ.StartMenu(this));
    this.addFrame(this.settings = new AZ.Settings(this));
    this.addFrame(this.gameplay = new AZ.GamePlay(this));
    this.addFrame(this.gameover = new AZ.GameOver(this));
    this.addFrame(this.transmission = new AZ.Transmission(this));

    this.screenTo([this.startmenu, this.background], this.assets);
    GodStep.playSound('alienanza_main', -1, AZ.MUSIC);
    this.loadPlayer();
    this.reposition();

};
pro.loadPlayer = function() {
    var instance = AZ.Alienanza.instance;
    instance.PLAYER = GodStep.LoadLocal(this.PLAYER_SLOT) || {pointsBest:0, sound:true, music:true};
    AZ.MUSIC = instance.PLAYER.music;
    AZ.SOUND = instance.PLAYER.sound;
};


pro.savePlayer = function() {
    var instance = AZ.Alienanza.instance;
    instance.PLAYER.sound = AZ.SOUND;
    instance.PLAYER.music = AZ.MUSIC;
    GodStep.SaveLocal(instance.PLAYER, instance.PLAYER_SLOT);
};
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////
////////////////////////////////////////// global ///////////////////////

/// starting
function startAlienanza(lang) {
    // $('meta[name=viewport]').remove();
    //$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">');
    if(!AZ.Alienanza.instance) {
        var game = new AZ.Alienanza(lang);
        game.div.style.margin = '0 auto';
        game.div.style['vertical-align'] = 'middle';
        game.initResizeEvents();

    }
}

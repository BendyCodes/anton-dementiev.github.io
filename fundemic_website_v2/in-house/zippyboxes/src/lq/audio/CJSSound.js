include('com/soundjs-NEXT.combined');

GodStep.CJSSound = function() {
    this.sounds = [];
    PIXI.EventTarget.call(this);
    GodStep.CJSSound.instance = this;
};

extend(GodStep.CJSSound, Object);

GodStep.SOUNDS_LOADED = 'sounds loaded';

pro.init = function(soundPath, arr) {
    var sounds = [];
    for(var i = 0; i<arr.length; i++) {
        sounds.push({src:arr[i] + '.ogg', id:[arr[i]]});
    }
    this.soundPath = soundPath;
    this.sounds = sounds;
};
pro.load = function() {
    this.AVAILABLE = true;

    if (!createjs.Sound.initializeDefaultPlugins()) {
        this.AVAILABLE = false;
        alert('not available sound on this device');
        dispatch(this, AZ.E_LOADED);
        return;
    }
    if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
        this.ISMOBILE = true;
    }
    createjs.Sound.alternateExtensions = ["mp3"];

    createjs.Sound.addEventListener("fileload", this.h_loaded);

    this.countLoaded = this.sounds.length;

    createjs.Sound.addEventListener("fileload", createjs.proxy(this.h_loaded, this));
    createjs.Sound.registerSounds(this.sounds, GodPath + this.soundPath);


};
GodStep.playSound = function(name, repeat) {
    if(GodStep.CJSSound.instance.AVAILABLE){
        var repeatCount = -1;
        if(repeat != null) {
            repeatCount = repeat;
        }
        createjs.Sound.play(name, createjs.Sound.INTERRUPT_NONE, 0, 0, repeatCount);
    }
};

pro.h_loaded = function(e) {
    var sound = GodStep.CJSSound.instance;
    sound.countLoaded--;
    if(sound.countLoaded == 0) {
        dispatch(sound, GodStep.SOUNDS_LOADED);
    }
};
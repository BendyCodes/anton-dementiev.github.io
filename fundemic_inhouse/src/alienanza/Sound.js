include('com/soundjs-NEXT.combined');

AZ.Sound = function() {
    GodStep.Frame.call(this, 'Sound');
    PIXI.EventTarget.call(this);
    AZ.Sound.instance = this;

};

extend(AZ.Sound, GodStep.Frame);
pro.load = function() {
    this.AVAILABLE = true;
   // alert('loading sounds');

    if (!createjs.Sound.initializeDefaultPlugins()) {
        this.AVAILABLE = false;
        alert('not available sound on this device');
        dispatch(this, AZ.E_LOADED);
        return;
    }
    // check if we are on a mobile device, as these currently require us to launch sound inside of a user event
    if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
        this.ISMOBILE = true;
    }
    createjs.Sound.alternateExtensions = ["mp3"];
    // Create a single item to load.
    createjs.Sound.addEventListener("fileload", this.h_loaded);
    var sounds = [
        {src: "alienanza_click.ogg", id: 'alienanza_click'},
        {src: "alienanza_main.ogg", id: 'alienanza_main'},
        {src: "alienanza_wrong.ogg", id: 'alienanza_wrong'},
        {src: "alienanza_right.ogg", id: 'alienanza_right'},
        {src: "alienanza_time.ogg", id: 'alienanza_time'},
        {src: "alienanza_end.ogg", id: 'alienanza_end'},
        {src: "alienanza_start.ogg", id: 'alienanza_start'},
    ];
    this.countLoaded = sounds.length;

    createjs.Sound.addEventListener("fileload", createjs.proxy(this.h_loaded, this)); // add an event listener for when load is completed
    createjs.Sound.registerSounds(sounds, GodPath + AZ.SOUND_PATH);


};
AZ.playSound = function(name, repeat) {
    if(AZ.Sound.instance.AVAILABLE){
        var repeatCount = -1;
        if(repeat != null) {
            repeatCount = repeat;
        }
        createjs.Sound.play(name, createjs.Sound.INTERRUPT_NONE, 0, 0, repeatCount);
    }

};

pro.h_loaded = function(e) {
    var sound = AZ.Sound.instance;
    sound.countLoaded--;
    if(sound.countLoaded == 0) {
        dispatch(sound, AZ.E_LOADED);
    }
};
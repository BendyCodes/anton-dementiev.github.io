
AG.Sound = function() {
    GodStep.CJSSound.call(this);
    this.init(AG.SOUND_PATH, ['click']);
};

extend(AG.Sound, GodStep.CJSSound);
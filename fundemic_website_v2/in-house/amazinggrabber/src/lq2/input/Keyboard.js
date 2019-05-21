GodStep.Keyboard = function(soul) {
    this.soul = soul;
    if(!GodStep.Keyboard.instance) {
        GodStep.Keyboard.instance = this;
        PIXI.EventTarget.call(this);
        document.addEventListener('keydown', this.h_keydown);
        document.addEventListener('keyup', this.h_keyup);
        this.keys = [];

        GodStep.KEY_CONSOLE = 192;
        GodStep.KEY_1 = 49;
        GodStep.KEY_2 = 50;
        GodStep.KEY_3 = 51;
        GodStep.KEY_4 = 52;
        GodStep.KEY_SHIFT = 16;
        GodStep.KEY_CTRL = 17;
        GodStep.KEY_ALT = 18;
        GodStep.KEY_F3 = 114;
        GodStep.KEY_W = 87;
        GodStep.KEY_A = 65;
        GodStep.KEY_S = 83;
        GodStep.KEY_D = 68;
        GodStep.KEY_LEFT = 37;
        GodStep.KEY_RIGHT = 39;
        GodStep.KEY_TOP = 38;
        GodStep.KEY_BOT = 40;
    }
};
pro = GodStep.Keyboard.prototype = Object.create( Object.prototype );

pro.h_keyup = function(e) {
    var inst = GodStep.Keyboard.instance;
    inst.keys[e.keyCode] = 0;
    GodStep.dispatch(inst, GodStep.KEYUP, e.keyCode);
};
pro.h_keydown = function(e) {
    var inst = GodStep.Keyboard.instance;
    if(!inst.keys[e.keyCode]) {
        inst.keys[e.keyCode] = 1;
        dispatch(inst, GodStep.KEYPRESS, e.keyCode);
    }
    else {
        inst.keys[e.keyCode]++;
        GodStep.dispatch(inst, GodStep.KEYDOWN, e.keyCode);
    }
};
pro.focus = function() {
    trace('canvas focused');
    this.soul.soulview.setAttribute('tabindex','0');
    this.soul.soulview.focus();
};
GodStep.IsKeyPressed = function(key) {
    var old = GodStep.Keyboard.instance.keys[key];
    if(old==1) {
        GodStep.Keyboard.instance.keys[key] = 2;
    }
    return old == 1;
};


var Games = Games || {};
    Games.SCALE = 1;
    Games.FRAME_RATE = 1/60;

GodStep.Game = function(n, color, preloaderClass, setting_slot, player_slot, defaultSettings, type, w, h) {
    this.ANTIALIAS = false;
    GodStep.PAUSE = false;
    GodStep.Game.AUDIOEVENT = false;
    GodStep.IMAGE_RESOLUTION = GodStep.IMAGE_RESOLUTION || 1;
    this.TRANSPARENT = GodStep.Game.TRANSPARENT;
    this.FULLPAGE = GodStep.Game.FULLPAGE;
    GodStep.Game.MUTED = false;
    switch (type) {
        case 'auto':
            break;
        case 'canvas':
            this.CANVAS = true;
            break;
        case 'webgl':
            this.WEBGL = true;
            break;
    }
    this.MW = w || 1536;
    this.MH = h || 1854;

    this.align = 'centerG';
    this.isRunning = false;
    this.PLAYER_SLOT = player_slot;
    this.SETTINGS_SLOT = setting_slot;
    this.preloaderClass = preloaderClass;
    this.defaultSettings = defaultSettings;

    Games.SOUND = true;
    GodStep.Game.instance = this;

    this.stageColor = GodStep.COLOR_STAGE = color;
    if(window.navigator) {
        var useragent = window.navigator.userAgent;
        if(useragent.search('NOKIA') != -1 && useragent.search('635') != -1) {
            this.isNokia635 = true;
        }
        function isStock() {
            var matches = useragent.match(/Android.*AppleWebKit\/([\d.]+)/);
            return matches && matches[1] < 537;
        }
        var ua = useragent.toLowerCase();
        this.isSharpMiniStock = ((/SHL24/i).test(ua)) && isStock();
        this.isXperiaAStock = ((/SO-04E/i).test(ua)) && isStock();
        this.isFujitsu = ((/F-01F/i).test(ua)) && isStock();
        this.isSharp = ((/SH-01F/i).test(ua)) && isStock();
        this.isS4 = ((/GT-I9505/i).test(ua)) || ((/GT-I9502/i).test(ua)) || ((/GT-I9500/i).test(ua)) || ((/T530/i).test(ua));
        this.isAndroid = useragent.indexOf('Android') >= 0;
        var webkitVer = parseInt((/WebKit\/([0-9]+)/.exec(navigator.appVersion) || 0)[1],10) || void 0; // also match AppleWebKit
        this.isNativeAndroid = this.isAndroid && webkitVer <= 534 && navigator.vendor.indexOf('Google') == 0;

        trace('useragent' + " " + useragent + " " + this.isS4);
    }

    if(this.isS4) {
        this.DISABLE_SOUND = true;
    }
    GodStep.Mejdu.call(this, n);


    this.SW = this.W;
    this.SH = this.H;


    if(this.RIGHTCLICK) {
        if(this.canvas) {
            this.canvas.view.oncontextmenu = function (e) {
                e.preventDefault();
            };
        }
        if(this.webgl) {
            this.webgl.view.oncontextmenu = function (e) {
                e.preventDefault();
            };
        }
    }
};
extend(GodStep.Game, GodStep.Mejdu);
GodStep.Game.FULLPAGE = true;

pro.update = function() {
    if(!GodStep.PAUSE) {
        this.beginFps();
        GodStep.Mejdu.prototype.update.call(this);
        this.endFps();
    }
};

pro.start = function() {
    this.storage = new GodStep.LocalStorage();
    this.settingsDATA = GodStep.LoadLocal(this.SETTINGS_SLOT);
    if(this.settingsDATA) {
    } else {
        GodStep.SaveLocal(GodStep.LoadText(this.defaultSettings), this.SETTINGS_SLOT);
        this.settingsDATA = GodStep.LoadLocal(this.SETTINGS_SLOT);
        trace('default settings');
    }
    this.resizeWindow(this.W, this.H);
    this.addFrame(this.assets = new this.preloaderClass(this));
    //  this.resizeWindow(this.W, this.H);

    addEvent(this.assets, GodStep.ASSETS_LOADED, this.h_asssets);
    h_resize();
    this.reposition();

    this.assets.load();
    this.assets.Place = new PIXI.Point((this.OW - this.W)/2, (this.OH - this.H)/2);

    this.initSleepDetector();

};
pro.initSleepDetector = function() {
    var isIE = false;
    if(navigator) {
        if (navigator.appName.indexOf("Internet Explorer") != -1) {
            isIE = true
        }  else if (navigator.appName == 'Netscape')  {
            var ua = navigator.userAgent;
            var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                if(parseFloat( RegExp.$1 )) {
                    isIE = true;
                }
        }
    }
    window.onpageshow = function () {
        trace('UNMUTED');
        GodStep.muteSound(null, 1);
        GodStep.Game.SOUND_MUTE = false;
    };
    window.onpagehide = function () {
        trace('MUTED');
        GodStep.muteSound(null, 0);
        GodStep.Game.SOUND_MUTE = true;
    };

    if(!isIE) {
        if(!GodStep.Game.sleepLoop) {
            GodStep.Game.lastSeen = Date.now();
            GodStep.Game.sleepLoop = function (){
                var d = Date.now() - GodStep.Game.lastSeen;
                GodStep.Game.lastSeen = Date.now();
                setTimeout(GodStep.Game.sleepLoop, 50);
                if(d > 350 && !GodStep.Game.MUTED) {
                    if(!GodStep.Game.SOUND_MUTE) {
                        trace('MUTED');
                        GodStep.muteSound(null, 0);
                        GodStep.Game.SOUND_MUTE = true;
                    }
                } else {
                    if(GodStep.Game.SOUND_MUTE) {
                        trace('UNMUTED');
                         GodStep.muteSound(null, 1);
                         GodStep.Game.SOUND_MUTE = false;
                    }
                }
            };
            GodStep.Game.sleepLoop();
        }
    } else {
        var hidden = "hidden";

        // Standards:
        if (hidden in document)
            document.addEventListener("visibilitychange", onchange);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onchange);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onchange);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onchange);
        else if ("onfocusin" in document)
            document.onfocusin = document.onfocusout = onchange;
        else
            window.onpageshow = window.onpagehide
                = window.onfocus = window.onblur = onchange;

        function onchange (evt) {
            var v = "visible", h = "hidden",
                evtMap = {  focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h };
            evt = evt || window.event;
            var isHidden = false;
            if (evt.type in evtMap)
                isHidden = evtMap[evt.type];
            else {
                isHidden = this[hidden];
            }
            if(!GodStep.PAUSE) {
                if(isHidden) {
                    GodStep.Game.SOUND_MUTE = true;
                    trace('MUTED');
                    GodStep.muteSound(null, 0);
                } else {
                    GodStep.Game.SOUND_MUTE = false;
                    trace('UNMUTED');
                    GodStep.muteSound(null, 1);
                }
            }
        }
    }
};
pro.reposition = function() {
    var p;
    switch (this.align) {
        case 'centerG':
            p = new PIXI.Point((this.OW - this.W)/2, (this.OH - this.H)/2);
            p.y = Math.max(0, p.y);
            break;
        case 'left':
            p = new PIXI.Point();
            break;
    }
    for(var i = 0; i<this.frames.length; i++) {
        this.frames[i].Place = p;
        this.frames[i].Scale = this.assets.Scale;
    }
};
pro.screenTo = function(arr, last) {
    this.transmission.start(arr, last)
};
pro.resizeWindow = function(w, h) {

    if(this.FULLRESIZE) {
        if(this.MW/this.MH > w / h) {
            if(this.FULLPAGE) this.div.style.position = 'relative';
            this.resize(w, w * this.MH/this.MW, w, h);
        } else {
            if(this.FULLPAGE) this.div.style.position = 'relative';
            this.resize(h *  this.MW/this.MH, h, w, h);
        }

        this.S = this.W/this.MW;
        if(this.startS == null) {
            if(this.assets) {
                this.assets.Scale = this.S/this.startS;
            }else {
                this.startS = this.S;
            }
        } else {
            this.assets.Scale = this.S/this.startS;
            this.reposition();
        }
    } else {
        if(this.MW/this.MH > w / h) {
            if(this.FULLPAGE)  this.div.style.position = 'relative';
            this.resize(w, w * this.MH/this.MW, w, h);
        } else {
            if(this.FULLPAGE) this.div.style.position = 'relative';
            this.resize(h *  this.MW/this.MH, h, w, h);
        }

        this.S = this.W/this.MW;
        if(!this.isRunning) {
            if(this.assets) {
                this.assets.Scale = this.S/this.startS;
            } else {
                this.startS = this.S;
            }
            this.reposition();
        } else {
            if(this.assets)  this.assets.Scale = this.S/this.startS;
            this.reposition();
        }
    }
};

// listeners
function h_resize() {
    GodStep.RESIZE_REQUEST = false;
    var game = GodStep.Game.instance;
    if(!game.FULLPAGE) return;

    var height;
    if (typeof (window.innerWidth) == 'number') {
        height = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            height = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                height = document.body.clientHeight;
            }
        }
    }
    game.resizeWindow(document.body.clientWidth, height);

}
pro.initResizeEvents = function(){
    var supportsOrientationChange = false;
    var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener("resize", function() {
        setTimeout(h_resize, 50);
    }, false);
    window.addEventListener(orientationEvent, function() {
        setTimeout(function() {
            h_resize();
            var orientation = window.orientation;
            if(GodStep.Game.instance.orientation) {
                if(orientation != undefined) {
                    if(orientation == 90 || orientation == -90) {
                        GodStep.Game.instance.orientation.visible = GodStep.ORIENTATION_PORTRAIT;
                    } else {
                        GodStep.Game.instance.orientation.visible = !GodStep.ORIENTATION_PORTRAIT;
                    }
                }
            }
        }, 50);

    }, false);
};
pro.run = function() {
   trace('running');
};
// listeners
pro.h_asssets = function(e) {
    switch (e.type) {
        case GodStep.ASSETS_LOADED:
            this.soul.run();
            break;
    }
};


GodStep.volumeSound = function(name, isVol) {
    if(GodStep.Game.instance.DISABLE_SOUND) return;

    var sound = GodStep.Game.instance.sound;
    if(!sound) return;
    if(sound.AVAILABLE) {
        if(GodStep.Game.instance.AUDIOTAG) {
            for (var i = 0; i < sound.needLoaded.length; i++) {
                if(name) {
                    if (sound.needLoaded[i].src == name) {
                        sound.sounds[i].oldVol = sound.sounds[i].volume = isVol ? 1 : 0;
                    }
                } else {
                    sound.sounds[i].oldVol =  sound.sounds[i].volume = isVol ? 1 : 0;
                }
            }
        } else {
            if(createjs) {
                if(createjs.Sound) createjs.Sound.stop();
            }
        }
    }
};
GodStep.muteSound = function(name, v) {
    if(GodStep.Game.instance.DISABLE_SOUND) return;

    var sound = GodStep.Game.instance.sound;
    if(!sound) return;
    if(sound.AVAILABLE) {
        if(GodStep.Game.instance.AUDIOTAG) {
            for (var i = 0; i < sound.needLoaded.length; i++) {
                if(name) {
                    if (sound.needLoaded[i].src == name) {
                        sound.sounds[i].volume = (sound.sounds[i].oldVol == 0) ? 0 : v;
                    }
                } else {
                    if(sound.sounds[i]) {
                        sound.sounds[i].volume = (sound.sounds[i].oldVol == 0) ? 0 : v;
                    }
                }
            }
        } else {
            createjs.Sound.setMute(v == 0);
        }
    }
};
GodStep.playSound = function(name, repeat, isOk) {
    if(GodStep.Game.instance.DISABLE_SOUND) return;
    var sound = GodStep.Game.instance.sound;
    if (sound.AVAILABLE) {
        if (GodStep.Game.instance.AUDIOTAG) {
            if (isOk) {
                for (var i = 0; i < sound.needLoaded.length; i++) {
                    if (sound.needLoaded[i].src == name) {
                        sound.sounds[i].currentTime = 0;
                        sound.sounds[i].play();
                        sound.sounds[i].loop = repeat == -1;
                        //trace('sound started');
                    }
                }
            }
        } else {
            var repeatCount = -1;
            if (repeat != null) {
                repeatCount = repeat;
            }
            if (isOk) {
                var s = createjs.Sound.play(name, createjs.Sound.PLAY_INTERRUPTED, 0, 0, repeatCount, null ,.5);
                s.superName = name;
                s.superRepeat = repeatCount;
                if(GodStep.Game.AUDIOEVENT) {
                    addEvent(s, 'loop', GodStep.loopEvent);
                }
            }
        }
    } else {
        trace('not available');
    }
};

GodStep.loopEvent = function(e) {
    var WS = e.target;
    createjs.Sound.stop();
    delEvent(WS, 'loop', GodStep.loopEvent);
    GodStep.playSound(WS.superName, WS.superRepeat, true);
};
GodStep.PIXIEvent = PIXI.Event;

PIXI.Event = function(target, name, data) {
    GodStep.PIXIEvent.call(this, target, name, data);
    this.stopped = true;
};
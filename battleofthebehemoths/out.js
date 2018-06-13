var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var src;
(function (src) {
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super.call(this, 850, 550, src.CommonUtils.detectBestRenderMode(), "", null, true) || this;
            _this.state.add('Boot', src.Boot, false);
            _this.state.add('Preloader', src.Preloader, false);
            _this.state.start('Boot');
            return _this;
        }
        App.prototype.getLocaleText = function (key) {
            var textData = game.cache.getJSON('text');
            return textData && textData.hasOwnProperty(key) ? textData[key] : "";
        };
        return App;
    }(Phaser.Game));
    src.App = App;
})(src || (src = {}));
var inGameFontFamilies;
var game;
window.onload = function () {
    game = new src.App();
};
var src;
(function (src) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            //start filter code
            var fn = function (game) {
                Phaser.Filter.call(this, game);
                this.uniforms.gray = { type: '1f', value: 1.0 };
                this.fragmentSrc = [
                    "precision mediump float;",
                    "varying vec2       vTextureCoord;",
                    "varying vec4       vColor;",
                    "uniform sampler2D  uSampler;",
                    "uniform float      gray;",
                    "void main(void) {",
                    "gl_FragColor = texture2D(uSampler, vTextureCoord);",
                    "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), gray);",
                    "}"
                ];
            };
            Phaser.Filter.Gray = fn;
            Phaser.Filter.Gray.prototype = Object.create(Phaser.Filter.prototype);
            Phaser.Filter.Gray.prototype.constructor = Phaser.Filter.Gray;
            Object.defineProperty(Phaser.Filter.Gray.prototype, 'gray', {
                get: function () {
                    return this.uniforms.gray.value;
                },
                set: function (value) {
                    this.uniforms.gray.value = value;
                }
            });
            fn = function (game) {
                Phaser.Filter.call(this, game);
                this.uniforms.blur = { type: '1f', value: 1 / 512 };
                this.fragmentSrc = [
                    "precision mediump float;",
                    "varying vec2 vTextureCoord;",
                    "varying vec4 vColor;",
                    "uniform float blur;",
                    "uniform sampler2D uSampler;",
                    "void main(void) {",
                    "vec4 sum = vec4(0.0);",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;",
                    "gl_FragColor = sum;",
                    "}"
                ];
            };
            Phaser.Filter.BlurX = fn;
            Phaser.Filter.BlurX.prototype = Object.create(Phaser.Filter.prototype);
            Phaser.Filter.BlurX.prototype.constructor = Phaser.Filter.BlurX;
            Object.defineProperty(Phaser.Filter.BlurX.prototype, 'blur', {
                get: function () {
                    return this.uniforms.blur.value / (1 / 7000);
                },
                set: function (value) {
                    this.dirty = true;
                    this.uniforms.blur.value = (1 / 7000) * value;
                }
            });
            fn = function (game) {
                Phaser.Filter.call(this, game);
                this.uniforms.blur = { type: '1f', value: 1 / 512 };
                this.fragmentSrc = [
                    "precision mediump float;",
                    "varying vec2 vTextureCoord;",
                    "varying vec4 vColor;",
                    "uniform float blur;",
                    "uniform sampler2D uSampler;",
                    "void main(void) {",
                    "vec4 sum = vec4(0.0);",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;",
                    "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;",
                    "gl_FragColor = sum;",
                    "}"
                ];
            };
            Phaser.Filter.BlurY = fn;
            Phaser.Filter.BlurY.prototype = Object.create(Phaser.Filter.prototype);
            Phaser.Filter.BlurY.prototype.constructor = Phaser.Filter.BlurY;
            Object.defineProperty(Phaser.Filter.BlurY.prototype, 'blur', {
                get: function () {
                    return this.uniforms.blur.value / (1 / 7000);
                },
                set: function (value) {
                    this.dirty = true;
                    this.uniforms.blur.value = (1 / 7000) * value;
                }
            });
            //end filter code
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            if (this.game.device.android) {
                console.log("android device detected");
                this.game.input.mouse.enabled = !this.game.device.mspointer;
            }
            game.scale.forceOrientation(true, false);
            game.scale.enterIncorrectOrientation.add(function () {
                if (!game.device.desktop) {
                    game.paused = true;
                    document.getElementById("orientationDiv").style.display = "block";
                    game.canvas.style.display = "none";
                }
            }, this);
            game.scale.leaveIncorrectOrientation.add(function () {
                if (!game.device.desktop) {
                    game.paused = false;
                    document.getElementById("orientationDiv").style.display = "none";
                    game.canvas.style.display = "block";
                }
            }, this);
            this.game.stage.disableVisibilityChange = true;
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = -1;
            this.game.state.start('Preloader', true, false);
            // game.renderer.renderSession.roundPixels = true;
            // this.game.time.fps = 60;
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.world.enableBody = true;
        };
        return Boot;
    }(Phaser.State));
    src.Boot = Boot;
})(src || (src = {}));
/**
 * Created by Roman.
 */
var src;
(function (src) {
    var CommonUtils = /** @class */ (function () {
        function CommonUtils() {
        }
        CommonUtils.createTransScreenIfNotExist = function () {
            if (this.transScreen_ == null) {
                this.transScreen_ = new Phaser.Graphics(game);
                this.transScreen_.beginFill(/*0xFF6706*/ 0xFFE8BF, 1);
                this.transScreen_.drawRect(0, 0, game.width, game.height);
                this.transScreen_.endFill();
                this.transScreen_.inputEnabled = true;
            }
        };
        CommonUtils.changeCurrentView = function (object) {
            var _this = this;
            this.createTransScreenIfNotExist();
            this.GAME_ART_GROUP.add(this.transScreen_);
            this.transScreen_.alpha = 0;
            game.add.tween(this.transScreen_).to({ alpha: 1 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                .onComplete.addOnce(function () {
                _this.currentView.visible = false;
                CommonUtils.GAME_ART_GROUP.remove(_this.currentView, true, false);
                _this.currentView = object;
                _this.currentView.visible = true;
                if (_this.currentView['prepare'])
                    _this.currentView['prepare']();
                _this.GAME_ART_GROUP.addAt(_this.currentView, _this.transScreen_.parent.getChildIndex(_this.transScreen_));
                game.add.tween(_this.transScreen_).to({ alpha: 0 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                    .onComplete.addOnce(function () {
                    _this.transScreen_.parent.removeChild(_this.transScreen_);
                }, _this);
            }, this);
        };
        CommonUtils.showTransScreen = function (overScreen, onMidComplete, onComplete) {
            var _this = this;
            if (onMidComplete === void 0) { onMidComplete = null; }
            if (onComplete === void 0) { onComplete = null; }
            this.createTransScreenIfNotExist();
            overScreen.parent.addChildAt(this.transScreen_, overScreen.parent.getChildIndex(overScreen) + 1);
            this.transScreen_.alpha = 0;
            game.add.tween(this.transScreen_).to({ alpha: 1 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                .onComplete.addOnce(function () {
                if (onMidComplete)
                    onMidComplete();
                game.add.tween(_this.transScreen_).to({ alpha: 0 }, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                    .onComplete.addOnce(function () {
                    if (onComplete)
                        onComplete();
                    _this.transScreen_.parent.removeChild(_this.transScreen_);
                }, _this);
            }, this);
        };
        CommonUtils.createTimer = function (delay, callback, callbackContext) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var timer = game.time.create(true);
            timer.add.apply(timer, [delay, callback, callbackContext].concat(args));
            timer.onComplete.add(function (_timer) {
                var ind = CommonUtils.timers.indexOf(_timer);
                if (ind >= 0)
                    CommonUtils.timers.splice(ind, 1);
            }, this, 0, timer);
            CommonUtils.timers.push(timer);
            timer.start();
            return timer;
        };
        CommonUtils.destroyTimer = function (timer) {
            var ind = CommonUtils.timers.indexOf(timer);
            if (ind >= 0)
                CommonUtils.timers.splice(ind, 1);
            timer.destroy();
        };
        CommonUtils.createTimerRepeat = function (delay, repeatCount, callback, callbackContext) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var timer = game.time.create(true);
            timer.repeat.apply(timer, [delay, repeatCount, callback, callbackContext].concat(args));
            timer.onComplete.add(function (_timer) {
                var ind = CommonUtils.timers.indexOf(_timer);
                if (ind >= 0)
                    CommonUtils.timers.splice(ind, 1);
            }, this, 0, timer);
            CommonUtils.timers.push(timer);
            timer.start();
            return timer;
        };
        CommonUtils.setPausedTimers = function (paused) {
            if (paused) {
                for (var _i = 0, _a = CommonUtils.timers; _i < _a.length; _i++) {
                    var t = _a[_i];
                    t.pause();
                }
            }
            else {
                for (var _b = 0, _c = CommonUtils.timers; _b < _c.length; _b++) {
                    var t = _c[_b];
                    t.resume();
                }
            }
        };
        CommonUtils.destroyAllTimers = function () {
            for (var _i = 0, _a = CommonUtils.timers; _i < _a.length; _i++) {
                var t = _a[_i];
                t.destroy();
            }
            this.removeAllTimers();
        };
        CommonUtils.removeAllTimers = function () {
            CommonUtils.timers.splice(0, CommonUtils.timers.length);
        };
        CommonUtils.setAllChildrenInputEnabled = function (group, enabled) {
            for (var _i = 0, _a = group.children; _i < _a.length; _i++) {
                var ch = _a[_i];
                ch['inputEnabled'] = enabled;
            }
        };
        CommonUtils.detectBestRenderMode = function () {
            var isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0;
            var isMozilla = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            var bestRenderMode = isIE || isMozilla ? Phaser.CANVAS : Phaser.AUTO;
            return bestRenderMode;
        };
        CommonUtils.createTextField = function (x, y, textContent, size, color, font, lineSpacing, stroke, strokeThickness, glow, anchorX) {
            if (lineSpacing === void 0) { lineSpacing = 0; }
            if (stroke === void 0) { stroke = null; }
            if (strokeThickness === void 0) { strokeThickness = NaN; }
            if (glow === void 0) { glow = null; }
            if (anchorX === void 0) { anchorX = 0.5; }
            var tf = new Phaser.Text(game, x, y, textContent, {
                font: "" + size + "px " + font,
                boundsAlignH: "center",
                boundsAlignV: "middle",
                align: 'center'
            });
            tf.addColor(color, 0);
            tf.anchor.set(anchorX, 0.5);
            tf.lineSpacing = lineSpacing;
            if (glow)
                tf.setShadow(0, 0, glow.color, glow.blur);
            if (stroke && !isNaN(strokeThickness)) {
                tf.stroke = stroke;
                tf.strokeThickness = strokeThickness;
            }
            return tf;
        };
        CommonUtils.ticksToMilisec = function (ticks) {
            return Math.ceil(ticks / game.time.desiredFps * 1000);
        };
        CommonUtils.tweenBlur = function (from, to, target, duration) {
            var blurX = game.add.filter('BlurX');
            var blurY = game.add.filter('BlurY');
            blurX['blur'] = from;
            blurY['blur'] = from;
            var arr = [blurX, blurY];
            var f = function () {
                blurY['blur'] = blurX['blur'];
                target.filters = arr;
            };
            var t = game.add.tween(blurX).to({ blur: to }, duration).start().onUpdateCallback(f, this);
            t.onComplete.addOnce(f, this);
        };
        CommonUtils.currentView = null;
        CommonUtils.transScreen_ = null;
        CommonUtils.BETWEEN_WINDOW_ANIM_DURATION = 200;
        CommonUtils.timers = [];
        return CommonUtils;
    }());
    src.CommonUtils = CommonUtils;
})(src || (src = {}));
var src;
(function (src) {
    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.MAX_ALLOWED_DISTANCE_BETWEEN_HEROES = 650;
        Config.HERO_NAMES_SEQUENCE = ['babyducks', 'VHS', 'geese', 'guardian', 'snowball', 'warlock'];
        Config.INNER_MC_PLAYING = {
            'babyducks': {
                'start': 0,
                'stop': 84
            },
            'geese': {
                'start': 0,
                'stop': 29
            },
            'VHS': {
                'start': 0,
                'stop': 37
            },
            'snowball': {
                'start': 0,
                'stop': 84
            },
            'guardian': {
                'start': 0,
                'stop': 84
            },
            'warlock': {
                'start': 0,
                'stop': 84
            }
        };
        Config.DESTRUCTABLE_DECOR = {
            'CasaRodante_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 41 },
                    'hit2': { 'start': 42, 'stop': 51 }
                },
                'inst': [
                    { 'x': 154, 'y': -64, 'z': -1, /*or 1*/ 'parent': 'bg_1_' }
                ]
            },
            'Casa_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 35 },
                    'hit2': { 'start': 36, 'stop': 45 }
                },
                'inst': [
                    { 'x': 875, 'y': -85, 'z': -1, /*or 1*/ 'parent': 'bg_1_' }
                ]
            },
            'Casita_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 35 },
                    'hit2': { 'start': 36, 'stop': 45 }
                },
                'inst': [
                    { 'x': 1520, 'y': -85, 'z': -1, /*or 1*/ 'parent': 'bg_1_' }
                ]
            },
            'Carrito_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 50 },
                    'hit2': { 'start': 51, 'stop': 59 }
                },
                'inst': [
                    { 'x': 1385, 'y': -75, 'z': -1, /*or 1*/ 'parent': 'bg_1_' }
                ]
            },
            'Statue_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 16 },
                    'hit2': { 'start': 17, 'stop': 33 }
                },
                'inst': [
                    { 'x': 886, 'y': 15, 'z': -1, /*or 1*/ 'parent': 'bg_1_' }
                ]
            },
            'Arbol3_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 14 },
                    'hit2': { 'start': 15, 'stop': 24 },
                    'hit3': { 'start': 25, 'stop': 34 }
                },
                'inst': [
                    // {'x':98,'y':-90,'z':-1,/*or 1*/'parent':'bg_1_','scale':1.25},
                    { 'x': 440, 'y': -80, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.75 },
                    { 'x': 540, 'y': -40, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.95 },
                    { 'x': 795, 'y': -55, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.75 },
                    { 'x': 1465, 'y': -110, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.75 },
                    { 'x': 1325, 'y': -70, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.85 },
                    { 'x': 1490, 'y': -25, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.85 },
                ]
            },
            'Arbol1_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 14 },
                    'hit2': { 'start': 15, 'stop': 25 },
                    'hit3': { 'start': 26, 'stop': 34 }
                },
                'inst': [
                    { 'x': 30, 'y': -20, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 1 },
                    { 'x': 240, 'y': -55, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.95 },
                    { 'x': 550, 'y': -58, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.95 },
                    { 'x': 20, 'y': 15, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scale': 1.2 },
                    { 'x': 770, 'y': 15, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scale': 1.2 },
                ]
            },
            'Arbol2_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 14 },
                    'hit2': { 'start': 15, 'stop': 25 },
                    'hit3': { 'start': 26, 'stop': 34 }
                },
                'inst': [
                    { 'x': 178, 'y': -95, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 1.2 },
                    { 'x': 905, 'y': -45, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 1.2 },
                    { 'x': 996, 'y': -80, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.75 },
                    { 'x': 1100, 'y': -70, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 1 },
                    { 'x': 1220, 'y': -34, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 1 },
                    { 'x': 1597, 'y': -62, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 1.1 },
                    { 'x': 520, 'y': 25, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scale': 1.25, 'scaleX': -1.25 },
                    { 'x': 1490, 'y': 25, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scale': 1.25, 'scaleX': -1.25 },
                    { 'x': 1080, 'y': 5, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scale': 1.25 },
                    { 'x': 80, 'y': 30, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scale': 1.25, 'scaleX': -1.25 },
                ]
            },
            'Banco_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 9 },
                    'hit2': { 'start': 10, 'stop': 19 }
                },
                'inst': [
                    { 'x': 310, 'y': -58, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scaleX': -1 },
                    { 'x': 665, 'y': -100, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scaleX': -1 },
                    { 'x': 1328, 'y': -80, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scaleX': 1 },
                    { 'x': 1228, 'y': -40, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scaleX': 1 },
                ]
            },
            'Banquito_': {
                'anim': {
                    'def': { 'start': 0, 'stop': 0 },
                    'hit1': { 'start': 1, 'stop': 9 },
                    'hit2': { 'start': 10, 'stop': 19 }
                },
                'inst': [
                    { 'x': 310, 'y': -28, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scaleX': -1 },
                    { 'x': 643, 'y': -83, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.8 },
                    { 'x': 985, 'y': -55, 'z': -1, /*or 1*/ 'parent': 'bg_1_', 'scale': 0.7 },
                    { 'x': 920, 'y': -12, 'z': -1, /*or 1*/ 'parent': 'GameComplex_gameForeground_', 'scaleX': -0.8, 'scale': 0.8 },
                ]
            },
        };
        Config.MAX_ATTACK_POWER = 4; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Config.HERO_PROP = {
            'babyducks': {
                'speedXModule': 275,
                'jumpSpeedYModule': 825,
                'bodyHeight': 275,
                'bodyWidht': 75,
                'scale': 1.2,
                'fullHP': 150,
                'attackHand': (Config.MAX_ATTACK_POWER * 0.9) * 0.9,
                'attackFoot': (Config.MAX_ATTACK_POWER * 0.9),
                'attackSpeedCoef': 0.85,
                'footSmokeDxModule': 25
            },
            'warlock': {
                'speedXModule': 285,
                'jumpSpeedYModule': 825,
                'bodyHeight': 315,
                'bodyWidht': 75,
                'scale': 1.2,
                'fullHP': 150,
                'attackHand': (Config.MAX_ATTACK_POWER * 0.8) * 0.9,
                'attackFoot': (Config.MAX_ATTACK_POWER * 0.8),
                'attackSpeedCoef': 0.95,
                'footSmokeDxModule': 25
            },
            'VHS': {
                'speedXModule': 290,
                'jumpSpeedYModule': 825,
                'bodyHeight': 245,
                'bodyWidht': 75,
                'scale': 1.2,
                'fullHP': 150,
                'attackHand': (Config.MAX_ATTACK_POWER * 0.75) * 0.9,
                'attackFoot': (Config.MAX_ATTACK_POWER * 0.75),
                'attackSpeedCoef': 1,
                'footSmokeDxModule': 45
            },
            'guardian': {
                'speedXModule': 270,
                'jumpSpeedYModule': 825,
                'bodyHeight': 270,
                'bodyWidht': 75,
                'scale': 1.2,
                'fullHP': 150,
                'attackHand': (Config.MAX_ATTACK_POWER * 0.85) * 0.9,
                'attackFoot': (Config.MAX_ATTACK_POWER * 0.85),
                'attackSpeedCoef': 0.9,
                'footSmokeDxModule': 30
            },
            'geese': {
                'speedXModule': 255,
                'jumpSpeedYModule': 825,
                'bodyHeight': 295,
                'bodyWidht': 75,
                'scale': 1.2,
                'fullHP': 150,
                'attackHand': (Config.MAX_ATTACK_POWER * 1) * 0.9,
                'attackFoot': (Config.MAX_ATTACK_POWER * 1),
                'attackSpeedCoef': 0.75,
                'footSmokeDxModule': 60
            },
            'snowball': {
                'speedXModule': 260,
                'jumpSpeedYModule': 825,
                'bodyHeight': 265,
                'bodyWidht': 150,
                'scale': 1.2,
                'fullHP': 150,
                'attackHand': (Config.MAX_ATTACK_POWER * 0.95) * 0.9,
                'attackFoot': (Config.MAX_ATTACK_POWER * 0.95),
                'attackSpeedCoef': 0.8,
                'footSmokeDxModule': 40
            }
        };
        Config.HERO_ANIMS = {
            'babyducks': {
                'idle_': {
                    'prefix': 'idle_', start: 0, stop: 44, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'walk_': {
                    'prefix': 'walk_', start: 0, stop: 28, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'walk_backwards_': {
                    'prefix': 'walk_backwards_', start: 0, stop: 26, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'jumpUp_': {
                    'prefix': 'jumpUp_', start: 0, stop: 11, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'fallDown_': {
                    'prefix': 'fallDown_', start: 0, stop: 5, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'fallenOnFloor_': {
                    'prefix': 'fallenOnFloor_', start: 0, stop: 4, loop: false, 'key': 'babyducks', 'anchorX': 0.35
                },
                'run_stop_': {
                    'prefix': 'run_stop_', start: 0, stop: 5, loop: false, 'key': 'babyducks', 'anchorX': 0.45
                },
                'crouch_': {
                    'prefix': 'crouch_', start: 0, stop: 3, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'uncrouch_': {
                    'prefix': 'crouch_', start: 4, stop: 6, loop: false, 'key': 'babyducks', 'anchorX': 0.5
                },
                'attack_crouch_1_': {
                    'prefix': 'attack_crouch_1_', start: 0, stop: 13, loop: false, 'key': 'babyducks_1', 'naamc': 13, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -100, 'w': 160, 'h': 100 }
                },
                'attack_jump_1_': {
                    'prefix': 'attack_jump_1_', start: 0, stop: 15, loop: false, 'key': 'babyducks_1', 'naamc': 15, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -150, 'w': 140, 'h': 100 }
                },
                'attack_jump_2_': {
                    'prefix': 'attack_jump_2_', start: 0, stop: 19, loop: false, 'key': 'babyducks_1', 'naamc': 19, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -140, 'w': 170, 'h': 80 }
                },
                'attack_1_': {
                    'prefix': 'attack_1_', start: 0, stop: 11, loop: false, 'key': 'babyducks_1', 'naamc': 6, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 245, 'h': 60 }
                },
                'attack_2_': {
                    'prefix': 'attack_2_', start: 0, stop: 25, loop: false, 'key': 'babyducks_1', 'naamc': 3, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 245, 'h': 60 }
                },
                'attack_3_': {
                    'prefix': 'attack_3_', start: 0, stop: 25, loop: false, 'key': 'babyducks_1', 'naamc': 21, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -220, 'w': 215, 'h': 80 }
                },
                'attack_4_': {
                    'prefix': 'attack_4_', start: 0, stop: 13, loop: false, 'key': 'babyducks_1', 'naamc': 13 /*9*/, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -185, 'w': 215, 'h': 50 }
                },
                'attack_5_': {
                    'prefix': 'attack_5_', start: 0, stop: 30, loop: false, 'key': 'babyducks_2', 'naamc': Math.ceil(30 * 60 / 35), 'anchorX': 0.23, frameRate: 35,
                    'superAttack': { 'sx': 50, 'sy': -200, 'speedX': 775, 'speedY': 775 * 0.8, 'hitTest': { 'w': 200, 'h': 60, x: -100, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(16 * 60 / 35) }
                },
                'attack_6_': {
                    'prefix': 'attack_6_', start: 0, stop: 51, loop: false, 'key': 'babyducks_2', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.7, frameRate: 35,
                    'superAttack': { 'sx': -30 - 25, 'sy': -232 + 28, 'speedX': 775, 'speedY': -775 * 0.42, 'hitTest': { 'w': 60, 'h': 60, x: -30, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(18 * 60 / 35) }
                },
                'attack_7_': {
                    'prefix': 'attack_7_', start: 0, stop: 51, loop: false, 'key': 'babyducks_1', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.65, frameRate: 35,
                    'superAttack': { 'sx': 25, 'sy': -215, 'speedX': 500, 'speedY': 0, 'hitTest': { 'w': 140, 'h': 140, x: -70, y: -70 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(17 * 60 / 35) }
                },
                'block_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'babyducks_1', 'anchorX': 0.5, frameRate: 30,
                    'hitBlocked': { start: 4, stop: 8, frameRate: 30 }
                },
                'unblock_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'babyducks_1', 'anchorX': 0.5, frameRate: 30
                },
                'hit1_': {
                    'prefix': 'hit1_', start: 0, stop: 13, loop: false, 'key': 'babyducks_2', 'anchorX': 0.5
                },
                'hit2_': {
                    'prefix': 'hit2_', start: 0, stop: 13, loop: false, 'key': 'babyducks_2', 'anchorX': 0.5
                },
                'hit_air_': {
                    'prefix': 'hit_air_', start: 0, stop: 5, loop: false, 'key': 'babyducks_2', 'anchorX': 0.5
                },
                'knock_down_': {
                    'prefix': 'fall_down_', start: 0, stop: 28, loop: false, 'key': 'babyducks_2', 'anchorX': 0.5, frameRate: 45
                },
                'knock_down_and_get_up_': {
                    'prefix': 'fall_down_', start: 0, stop: 44, loop: false, 'key': 'babyducks_2', 'anchorX': 0.5, frameRate: 45
                },
                'die_': {
                    'prefix': 'fall_down_', start: [0, 45], stop: [28, 101], loop: false, 'key': 'babyducks_2', 'anchorX': 0.5, frameRate: 45
                },
            },
            'warlock': {
                'idle_': {
                    'prefix': 'idle_', start: 0, stop: 31, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'walk_': {
                    'prefix': 'walk_', start: 0, stop: 32, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'walk_backwards_': {
                    'prefix': 'walk_backwards_', start: 0, stop: 26, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'jumpUp_': {
                    'prefix': 'jumpUp_', start: 0, stop: 11, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'fallDown_': {
                    'prefix': 'fallDown_', start: 0, stop: 5, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'fallenOnFloor_': {
                    'prefix': 'fallenOnFloor_', start: 0, stop: 4, loop: false, 'key': 'warlock', 'anchorX': 0.35
                },
                'run_stop_': {
                    'prefix': 'run_stop_', start: 0, stop: 5, loop: false, 'key': 'warlock', 'anchorX': 0.45
                },
                'crouch_': {
                    'prefix': 'crouch_', start: 0, stop: 3, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'uncrouch_': {
                    'prefix': 'crouch_', start: 4, stop: 6, loop: false, 'key': 'warlock', 'anchorX': 0.5
                },
                'attack_crouch_1_': {
                    'prefix': 'attack_crouch_1_', start: 0, stop: 13, loop: false, 'key': 'warlock_1', 'naamc': 13, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -205, 'w': 160, 'h': 60 }
                },
                'attack_jump_1_': {
                    'prefix': 'attack_jump_1_', start: 0, stop: 15, loop: false, 'key': 'warlock_1', 'naamc': 15, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -150, 'w': 165, 'h': 100 }
                },
                'attack_jump_2_': {
                    'prefix': 'attack_jump_2_', start: 0, stop: 15, loop: false, 'key': 'warlock_1', 'naamc': 19, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -140, 'w': 165, 'h': 80 }
                },
                'attack_1_': {
                    'prefix': 'attack_1_', start: 0, stop: 12, loop: false, 'key': 'warlock_1', 'naamc': 6, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 245, 'h': 60 }
                },
                'attack_2_': {
                    'prefix': 'attack_2_', start: 0, stop: 13, loop: false, 'key': 'warlock_1', 'naamc': 3, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -280, 'w': 200, 'h': 60 }
                },
                'attack_3_': {
                    'prefix': 'attack_3_', start: 0, stop: 25, loop: false, 'key': 'warlock_1', 'naamc': 21, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -260, 'w': 205, 'h': 80 }
                },
                'attack_4_': {
                    'prefix': 'attack_4_', start: 0, stop: 17, loop: false, 'key': 'warlock_1', 'naamc': 13 /*9*/, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -265, 'w': 190, 'h': 50 }
                },
                'attack_5_': {
                    'prefix': 'attack_5_', start: 0, stop: 30, loop: false, 'key': 'warlock_2', 'naamc': Math.ceil(30 * 60 / 35), 'anchorX': 0.3, frameRate: 35,
                    'superAttack': { 'sx': 50, 'sy': -200, 'speedX': 775, 'speedY': 775 * 0.8, 'hitTest': { 'w': 80, 'h': 60, x: -40, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(16 * 60 / 35) }
                },
                'attack_6_': {
                    'prefix': 'attack_6_', start: 0, stop: 49, loop: false, 'key': 'warlock_2', 'naamc': Math.ceil(49 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': -30 - 25, 'sy': -232 + 28, 'speedX': 600, 'speedY': -600 * 0.42, 'hitTest': { 'w': 60, 'h': 60, x: -30, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(26 * 60 / 35) }
                },
                'attack_7_': {
                    'prefix': 'attack_7_', start: 0, stop: 46, loop: false, 'key': 'warlock_1', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.65, frameRate: 35,
                    'superAttack': { 'sx': 25, 'sy': -215, 'speedX': 500, 'speedY': 0, 'hitTest': { 'w': 100, 'h': 100, x: -50, y: -50 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(17 * 60 / 35) }
                },
                'block_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'warlock_1', 'anchorX': 0.5, frameRate: 30,
                    'hitBlocked': { start: 4, stop: 8, frameRate: 30 }
                },
                'unblock_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'warlock_1', 'anchorX': 0.5, frameRate: 30
                },
                'hit1_': {
                    'prefix': 'hit1_', start: 0, stop: 13, loop: false, 'key': 'warlock_2', 'anchorX': 0.5
                },
                'hit_air_': {
                    'prefix': 'hit_air_', start: 0, stop: 5, loop: false, 'key': 'warlock_2', 'anchorX': 0.5
                },
                'knock_down_': {
                    'prefix': 'fall_down_', start: 0, stop: 24, loop: false, 'key': 'warlock_2', 'anchorX': 0.5, frameRate: 45
                },
                'knock_down_and_get_up_': {
                    'prefix': 'fall_down_', start: 0, stop: 44, loop: false, 'key': 'warlock_2', 'anchorX': 0.5, frameRate: 45
                },
                'die_': {
                    'prefix': 'fall_down_', start: [0, 45], stop: [24, 66], loop: false, 'key': 'warlock_2', 'anchorX': 0.5, frameRate: 45
                },
            },
            'VHS': {
                'idle_': {
                    'prefix': 'idle_', start: 0, stop: 44, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'walk_': {
                    'prefix': 'walk_', start: 0, stop: 32, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'walk_backwards_': {
                    'prefix': 'walk_backwards_', start: 0, stop: 26, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'jumpUp_': {
                    'prefix': 'jumpUp_', start: 0, stop: 10, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'fallDown_': {
                    'prefix': 'fallDown_', start: 0, stop: 5, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'fallenOnFloor_': {
                    'prefix': 'fallenOnFloor_', start: 0, stop: 4, loop: false, 'key': 'VHS', 'anchorX': 0.35
                },
                'run_stop_': {
                    'prefix': 'run_stop_', start: 0, stop: 5, loop: false, 'key': 'VHS', 'anchorX': 0.45
                },
                'crouch_': {
                    'prefix': 'crouch_', start: 0, stop: 3, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'uncrouch_': {
                    'prefix': 'crouch_', start: 4, stop: 6, loop: false, 'key': 'VHS', 'anchorX': 0.5
                },
                'attack_crouch_1_': {
                    'prefix': 'attack_crouch_1_', start: 0, stop: 13, loop: false, 'key': 'VHS_1', 'naamc': 13, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -60, 'w': 145, 'h': 60 }
                },
                'attack_jump_1_': {
                    'prefix': 'attack_jump_1_', start: 0, stop: 15, loop: false, 'key': 'VHS_1', 'naamc': 15, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -115, 'w': 175, 'h': 100 }
                },
                'attack_jump_2_': {
                    'prefix': 'attack_jump_2_', start: 0, stop: 15, loop: false, 'key': 'VHS_1', 'naamc': 19, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -120, 'w': 135, 'h': 80 }
                },
                'attack_1_': {
                    'prefix': 'attack_1_', start: 0, stop: 11, loop: false, 'key': 'VHS_1', 'naamc': 6, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 245, 'h': 60 }
                },
                'attack_2_': {
                    'prefix': 'attack_2_', start: 0, stop: 17, loop: false, 'key': 'VHS_1', 'naamc': 3, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -180, 'w': 200, 'h': 60 }
                },
                'attack_3_': {
                    'prefix': 'attack_3_', start: 0, stop: 25, loop: false, 'key': 'VHS_1', 'naamc': 21, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -185, 'w': 105, 'h': 90 }
                },
                'attack_4_': {
                    'prefix': 'attack_4_', start: 0, stop: 13, loop: false, 'key': 'VHS_1', 'naamc': 13 /*9*/, 'anchorX': 0.3,
                    'attackHitter': { 'x': 0, 'y': -150, 'w': 220, 'h': 50 }
                },
                'attack_5_': {
                    'prefix': 'attack_5_', start: 0, stop: 36, loop: false, 'key': 'VHS_2', 'naamc': Math.ceil(30 * 60 / 35), 'anchorX': 0.27, frameRate: 35,
                    'superAttack': { 'sx': 50, 'sy': -200, 'speedX': 775, 'speedY': 775 * 1.65, 'hitTest': { 'w': 80, 'h': 60, x: -40, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(16 * 60 / 35) }
                },
                'attack_6_': {
                    'prefix': 'attack_6_', start: 0, stop: 51, loop: false, 'key': 'VHS_2', 'naamc': Math.ceil(49 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': 0, 'sy': -310, 'speedX': 1250, 'speedY': -1250 * 0.42, 'hitTest': { 'w': 40, 'h': 40, x: -20, y: -20 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(22 * 60 / 35) }
                },
                'attack_7_': {
                    'prefix': 'attack_7_', start: 0, stop: 50, loop: false, 'key': 'VHS_1', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': 120, 'sy': -255, 'speedX': 1450, 'speedY': 0, 'hitTest': { 'w': 100, 'h': 100, x: -50, y: -50 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(23 * 60 / 35) }
                },
                'block_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'VHS_1', 'anchorX': 0.5, frameRate: 30,
                    'hitBlocked': { start: 4, stop: 8, frameRate: 30 }
                },
                'unblock_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'VHS_1', 'anchorX': 0.5, frameRate: 30
                },
                'hit1_': {
                    'prefix': 'hit1_', start: 0, stop: 13, loop: false, 'key': 'VHS_2', 'anchorX': 0.5
                },
                'hit_air_': {
                    'prefix': 'hit_air_', start: 0, stop: 5, loop: false, 'key': 'VHS_2', 'anchorX': 0.5
                },
                'knock_down_': {
                    'prefix': 'fall_down_', start: 0, stop: 24, loop: false, 'key': 'VHS_2', 'anchorX': 0.5, frameRate: 45
                },
                'knock_down_and_get_up_': {
                    'prefix': 'fall_down_', start: 0, stop: 44, loop: false, 'key': 'VHS_2', 'anchorX': 0.5, frameRate: 45
                },
                'die_': {
                    'prefix': 'fall_down_', start: [0, 45], stop: [24, 66], loop: false, 'key': 'VHS_2', 'anchorX': 0.5, frameRate: 45
                },
            },
            'guardian': {
                'idle_': {
                    'prefix': 'idle_', start: 0, stop: 44, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'walk_': {
                    'prefix': 'walk_', start: 0, stop: 28, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'walk_backwards_': {
                    'prefix': 'walk_backwards_', start: 0, stop: 26, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'jumpUp_': {
                    'prefix': 'jumpUp_', start: 0, stop: 12, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'fallDown_': {
                    'prefix': 'fallDown_', start: 0, stop: 5, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'fallenOnFloor_': {
                    'prefix': 'fallenOnFloor_', start: 0, stop: 4, loop: false, 'key': 'guardian', 'anchorX': 0.35
                },
                'run_stop_': {
                    'prefix': 'run_stop_', start: 0, stop: 5, loop: false, 'key': 'guardian', 'anchorX': 0.45
                },
                'crouch_': {
                    'prefix': 'crouch_', start: 0, stop: 3, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'uncrouch_': {
                    'prefix': 'crouch_', start: 4, stop: 6, loop: false, 'key': 'guardian', 'anchorX': 0.5
                },
                'attack_crouch_1_': {
                    'prefix': 'attack_crouch_1_', start: 0, stop: 13, loop: false, 'key': 'guardian_1', 'naamc': 13, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -60, 'w': 145, 'h': 60 }
                },
                'attack_jump_1_': {
                    'prefix': 'attack_jump_1_', start: 0, stop: 15, loop: false, 'key': 'guardian_1', 'naamc': 15, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -130, 'w': 135, 'h': 50 }
                },
                'attack_jump_2_': {
                    'prefix': 'attack_jump_2_', start: 0, stop: 15, loop: false, 'key': 'guardian_1', 'naamc': 19, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -145, 'w': 100, 'h': 70 }
                },
                'attack_1_': {
                    'prefix': 'attack_1_', start: 0, stop: 11, loop: false, 'key': 'guardian_1', 'naamc': 6, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 225, 'h': 60 }
                },
                'attack_2_': {
                    'prefix': 'attack_2_', start: 0, stop: 17, loop: false, 'key': 'guardian_1', 'naamc': 3, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -245, 'w': 235, 'h': 50 }
                },
                'attack_3_': {
                    'prefix': 'attack_3_', start: 0, stop: 25, loop: false, 'key': 'guardian_1', 'naamc': 21, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -255, 'w': 135, 'h': 175 }
                },
                'attack_4_': {
                    'prefix': 'attack_4_', start: 0, stop: 13, loop: false, 'key': 'guardian_1', 'naamc': 13 /*9*/, 'anchorX': 0.3,
                    'attackHitter': { 'x': 0, 'y': -190, 'w': 225, 'h': 50 }
                },
                'attack_5_': {
                    'prefix': 'attack_5_', start: 0, stop: 41, loop: false, 'key': 'guardian_2', 'naamc': Math.ceil(30 * 60 / 35), 'anchorX': 0.45, frameRate: 35,
                    'superAttack': { 'sx': 50, 'sy': -200, 'speedX': 775, 'speedY': 775 * 0.78, 'hitTest': { 'w': 100, 'h': 60, x: -50, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(12 * 60 / 35) }
                },
                'attack_6_': {
                    'prefix': 'attack_6_', start: 0, stop: 51, loop: false, 'key': 'guardian_2', 'naamc': Math.ceil(49 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': 0, 'sy': -295, 'speedX': 900, 'speedY': -900 * 0.55, 'hitTest': { 'w': 40, 'h': 40, x: -20, y: -20 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(19 * 60 / 35) }
                },
                'attack_7_': {
                    'prefix': 'attack_7_', start: 0, stop: 46, loop: false, 'key': 'guardian_1', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': 25, 'sy': -300, 'speedX': 1450, 'speedY': 0, 'hitTest': { 'w': 100, 'h': 100, x: -50, y: -50 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(23 * 60 / 35) }
                },
                'block_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'guardian_1', 'anchorX': 0.5, frameRate: 30,
                    'hitBlocked': { start: 4, stop: 8, frameRate: 30 }
                },
                'unblock_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'guardian_1', 'anchorX': 0.5, frameRate: 30
                },
                'hit1_': {
                    'prefix': 'hit1_', start: 0, stop: 13, loop: false, 'key': 'guardian_2', 'anchorX': 0.5
                },
                'hit_air_': {
                    'prefix': 'hit_air_', start: 0, stop: 6, loop: false, 'key': 'guardian_2', 'anchorX': 0.5
                },
                'knock_down_': {
                    'prefix': 'fall_down_', start: 0, stop: 24, loop: false, 'key': 'guardian_2', 'anchorX': 0.5, frameRate: 45
                },
                'knock_down_and_get_up_': {
                    'prefix': 'fall_down_', start: 0, stop: 44, loop: false, 'key': 'guardian_2', 'anchorX': 0.5, frameRate: 45
                },
                'die_': {
                    'prefix': 'fall_down_', start: [0, 45], stop: [24, 66], loop: false, 'key': 'guardian_2', 'anchorX': 0.5, frameRate: 45
                }
            },
            'geese': {
                'idle_': {
                    'prefix': 'idle_', start: 0, stop: 31, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'walk_': {
                    'prefix': 'walk_', start: 0, stop: 32, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'walk_backwards_': {
                    'prefix': 'walk_backwards_', start: 0, stop: 26, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'jumpUp_': {
                    'prefix': 'jumpUp_', start: 0, stop: 11, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'fallDown_': {
                    'prefix': 'fallDown_', start: 0, stop: 5, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'fallenOnFloor_': {
                    'prefix': 'fallenOnFloor_', start: 0, stop: 4, loop: false, 'key': 'geese', 'anchorX': 0.35
                },
                'run_stop_': {
                    'prefix': 'run_stop_', start: 0, stop: 5, loop: false, 'key': 'geese', 'anchorX': 0.45
                },
                'crouch_': {
                    'prefix': 'crouch_', start: 0, stop: 3, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'uncrouch_': {
                    'prefix': 'crouch_', start: 4, stop: 6, loop: false, 'key': 'geese', 'anchorX': 0.5
                },
                'attack_crouch_1_': {
                    'prefix': 'attack_crouch_1_', start: 0, stop: 13, loop: false, 'key': 'geese_1', 'naamc': 13, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -65, 'w': 190, 'h': 60 }
                },
                'attack_jump_1_': {
                    'prefix': 'attack_jump_1_', start: 0, stop: 15, loop: false, 'key': 'geese_1', 'naamc': 15, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -150, 'w': 185, 'h': 100 }
                },
                'attack_jump_2_': {
                    'prefix': 'attack_jump_2_', start: 0, stop: 15, loop: false, 'key': 'geese_1', 'naamc': 19, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -110, 'w': 160, 'h': 80 }
                },
                'attack_1_': {
                    'prefix': 'attack_1_', start: 0, stop: 12, loop: false, 'key': 'geese_1', 'naamc': 6, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -180, 'w': 255, 'h': 60 }
                },
                'attack_2_': {
                    'prefix': 'attack_2_', start: 0, stop: 17, loop: false, 'key': 'geese_1', 'naamc': 3, 'anchorX': 0.28,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 255, 'h': 60 }
                },
                'attack_3_': {
                    'prefix': 'attack_3_', start: 0, stop: 25, loop: false, 'key': 'geese_1', 'naamc': 21, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -260, 'w': 175, 'h': 80 }
                },
                'attack_4_': {
                    'prefix': 'attack_4_', start: 0, stop: 13, loop: false, 'key': 'geese_1', 'naamc': 13 /*9*/, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -160, 'w': 190, 'h': 50 }
                },
                'attack_5_': {
                    'prefix': 'attack_5_', start: 0, stop: 30, loop: false, 'key': 'geese_2', 'naamc': Math.ceil(30 * 60 / 35), 'anchorX': 0.26, frameRate: 35,
                    'superAttack': { 'sx': 0, 'sy': -200, 'speedX': 775, 'speedY': 775 * 0.8, 'hitTest': { 'w': 80, 'h': 60, x: -40, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(14 * 60 / 35) }
                },
                'attack_6_': {
                    'prefix': 'attack_6_', start: 0, stop: 49, loop: false, 'key': 'geese_2', 'naamc': Math.ceil(49 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': 0, 'sy': -170, 'speedX': 600, 'speedY': -600 * 0.42, 'hitTest': { 'w': 60, 'h': 60, x: -30, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(26 * 60 / 35) }
                },
                'attack_7_': {
                    'prefix': 'attack_7_', start: 0, stop: 46, loop: false, 'key': 'geese_1', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.35, frameRate: 35,
                    'superAttack': { 'sx': 100, 'sy': -225, 'speedX': 500, 'speedY': 0, 'hitTest': { 'w': 100, 'h': 100, x: -50, y: -50 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(17 * 60 / 35) }
                },
                'block_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'geese_1', 'anchorX': 0.5, frameRate: 30,
                    'hitBlocked': { start: 4, stop: 8, frameRate: 30 }
                },
                'unblock_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'geese_1', 'anchorX': 0.5, frameRate: 30
                },
                'hit1_': {
                    'prefix': 'hit1_', start: 0, stop: 13, loop: false, 'key': 'geese_2', 'anchorX': 0.5
                },
                'hit_air_': {
                    'prefix': 'hit_air_', start: 0, stop: 5, loop: false, 'key': 'geese_2', 'anchorX': 0.5
                },
                'knock_down_': {
                    'prefix': 'fall_down_', start: 0, stop: 24, loop: false, 'key': 'geese_2', 'anchorX': 0.5, frameRate: 45
                },
                'knock_down_and_get_up_': {
                    'prefix': 'fall_down_', start: 0, stop: 44, loop: false, 'key': 'geese_2', 'anchorX': 0.5, frameRate: 45
                },
                'die_': {
                    'prefix': 'fall_down_', start: [0, 45], stop: [24, 66], loop: false, 'key': 'geese_2', 'anchorX': 0.5, frameRate: 45
                },
            },
            'snowball': {
                'idle_': {
                    'prefix': 'idle_', start: 0, stop: 44, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'walk_': {
                    'prefix': 'walk_', start: 0, stop: 28, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'walk_backwards_': {
                    'prefix': 'walk_backwards_', start: 0, stop: 24, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'jumpUp_': {
                    'prefix': 'jumpUp_', start: 0, stop: 11, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'fallDown_': {
                    'prefix': 'fallDown_', start: 0, stop: 5, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'fallenOnFloor_': {
                    'prefix': 'fallenOnFloor_', start: 0, stop: 4, loop: false, 'key': 'snowball', 'anchorX': 0.35
                },
                'run_stop_': {
                    'prefix': 'run_stop_', start: 0, stop: 5, loop: false, 'key': 'snowball', 'anchorX': 0.35,
                },
                'crouch_': {
                    'prefix': 'crouch_', start: 0, stop: 3, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'uncrouch_': {
                    'prefix': 'crouch_', start: 4, stop: 6, loop: false, 'key': 'snowball', 'anchorX': 0.5
                },
                'attack_crouch_1_': {
                    'prefix': 'attack_crouch_1_', start: 0, stop: 13, loop: false, 'key': 'snowball_1', 'naamc': 13, 'anchorX': 0.4,
                    'attackHitter': { 'x': 0, 'y': -70, 'w': 225, 'h': 60 }
                },
                'attack_jump_1_': {
                    'prefix': 'attack_jump_1_', start: 0, stop: 15, loop: false, 'key': 'snowball_1', 'naamc': 15, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -100, 'w': 230, 'h': 80 }
                },
                'attack_jump_2_': {
                    'prefix': 'attack_jump_2_', start: 0, stop: 15, loop: false, 'key': 'snowball_1', 'naamc': 19, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -140, 'w': 210, 'h': 80 }
                },
                'attack_1_': {
                    'prefix': 'attack_1_', start: 0, stop: 11, loop: false, 'key': 'snowball_1', 'naamc': 6, 'anchorX': 0.45,
                    'attackHitter': { 'x': 0, 'y': -230, 'w': 285, 'h': 60 }
                },
                'attack_2_': {
                    'prefix': 'attack_2_', start: 0, stop: 17, loop: false, 'key': 'snowball_1', 'naamc': 3, 'anchorX': 0.45,
                    'attackHitter': { 'x': 0, 'y': -125, 'w': 230, 'h': 105 }
                },
                'attack_3_': {
                    'prefix': 'attack_3_', start: 0, stop: 25, loop: false, 'key': 'snowball_1', 'naamc': 21, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -215, 'w': 270, 'h': 60 }
                },
                'attack_4_': {
                    'prefix': 'attack_4_', start: 0, stop: 13, loop: false, 'key': 'snowball_1', 'naamc': 13 /*9*/, 'anchorX': 0.5,
                    'attackHitter': { 'x': 0, 'y': -75, 'w': 250, 'h': 50 }
                },
                'attack_5_': {
                    'prefix': 'attack_5_', start: 0, stop: 30, loop: false, 'key': 'snowball_2', 'naamc': Math.ceil(30 * 60 / 35), 'anchorX': 0.39, frameRate: 35,
                    'superAttack': { 'sx': 80, 'sy': -270, 'speedX': 775, 'speedY': 775 * 1, 'hitTest': { 'w': 80, 'h': 60, x: -40, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(16 * 60 / 35) }
                },
                'attack_6_': {
                    'prefix': 'attack_6_', start: 0, stop: 51, loop: false, 'key': 'snowball_2', 'naamc': Math.ceil(49 * 60 / 35), 'anchorX': 0.5, frameRate: 35,
                    'superAttack': { 'sx': 120, 'sy': -285, 'speedX': 750, 'speedY': -750 * 0.42, 'hitTest': { 'w': 60, 'h': 60, x: -30, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(22 * 60 / 35) }
                },
                'attack_7_': {
                    'prefix': 'attack_7_', start: 0, stop: 46, loop: false, 'key': 'snowball_1', 'naamc': Math.ceil(51 * 60 / 35), 'anchorX': 0.42, frameRate: 35,
                    'superAttack': { 'sx': 180, 'sy': -225, 'speedX': 650, 'speedY': 0, 'hitTest': { 'w': 60, 'h': 60, x: -30, y: -30 }, 'damageValue': 15, 'shotTicksDelay': Math.ceil(19 * 60 / 35) }
                },
                'block_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'snowball_1', 'anchorX': 0.5, frameRate: 30,
                    'hitBlocked': { start: 4, stop: 8, frameRate: 30 }
                },
                'unblock_': {
                    'prefix': 'block_', start: 0, stop: 3, loop: false, 'key': 'snowball_1', 'anchorX': 0.5, frameRate: 30
                },
                'hit1_': {
                    'prefix': 'hit1_', start: 0, stop: 13, loop: false, 'key': 'snowball_2', 'anchorX': 0.5
                },
                'hit2_': {
                    'prefix': 'hit2_', start: 0, stop: 13, loop: false, 'key': 'snowball_2', 'anchorX': 0.5
                },
                'hit_air_': {
                    'prefix': 'hit_air_', start: 0, stop: 5, loop: false, 'key': 'snowball_2', 'anchorX': 0.5
                },
                'knock_down_': {
                    'prefix': 'fall_down_', start: 0, stop: 28, loop: false, 'key': 'snowball_2', 'anchorX': 0.5, frameRate: 45
                },
                'knock_down_and_get_up_': {
                    'prefix': 'fall_down_', start: 0, stop: 44, loop: false, 'key': 'snowball_2', 'anchorX': 0.5, frameRate: 45
                },
                'die_': {
                    'prefix': 'fall_down_', start: [0, 45], stop: [28, 66], loop: false, 'key': 'snowball_2', 'anchorX': 0.5, frameRate: 45
                },
            },
        };
        return Config;
    }());
    src.Config = Config;
})(src || (src = {}));
var src;
(function (src) {
    var FightProgressModel = /** @class */ (function () {
        function FightProgressModel(playerHeroName) {
            this.botHeroName = null;
            this.playerHeroName = playerHeroName;
            this.enemies = src.Config.HERO_NAMES_SEQUENCE.slice();
            this.enemies.splice(this.enemies.indexOf(this.playerHeroName), 1);
            this.nextBot();
        }
        FightProgressModel.prototype.isAllEnemiesDefeated = function () {
            return this.enemies.length == 0;
        };
        FightProgressModel.prototype.replayThisFight = function () {
            this.playerRoundWinsNum = 0;
            this.botAIRoundWinsNum = 0;
        };
        FightProgressModel.prototype.nextBot = function () {
            if (this.isAllEnemiesDefeated())
                return null;
            this.playerRoundWinsNum = 0;
            this.botAIRoundWinsNum = 0;
            if (this.botHeroName) {
                this.enemies.splice(this.enemies.indexOf(this.botHeroName), 1);
            }
            this.botHeroName = this.enemies[Math.floor(Math.random() * this.enemies.length)];
            return this.botHeroName;
        };
        return FightProgressModel;
    }());
    src.FightProgressModel = FightProgressModel;
})(src || (src = {}));
var src;
(function (src) {
    var HeroActionSignalManager = /** @class */ (function () {
        function HeroActionSignalManager() {
            this.isDowButton = {
                'LEFT': false,
                'UP': false,
                'DOWN': false,
                'RIGHT': false,
                'Z': false,
                'X': false,
                'C': false,
            };
            this.isInteractionDisabled = false;
        }
        HeroActionSignalManager.prototype.isDown = function (key) {
            if (this.isInteractionDisabled)
                return false;
            return this.isDowButton[key];
        };
        HeroActionSignalManager.prototype.setOnDownListeners = function (onZDown, onXDown, listenerContext) {
            this.onZDown = onZDown;
            this.onXDown = onXDown;
            this.listenerContext = listenerContext;
        };
        return HeroActionSignalManager;
    }());
    src.HeroActionSignalManager = HeroActionSignalManager;
})(src || (src = {}));
///<reference path="HeroActionSignalManager.ts"/>
var src;
(function (src) {
    var InputManager = /** @class */ (function (_super) {
        __extends(InputManager, _super);
        function InputManager() {
            var _this = _super.call(this) || this;
            _this.inputElementsContainer = null;
            _this.isKeyboardInputType = true; //otherwise touch
            return _this;
            // this.isKeyboardInputType = game.device.desktop;
            // game.input.addPointer();
            // game.input.addPointer();
            // game.input.addPointer();
            // game.input.addPointer();
        }
        Object.defineProperty(InputManager, "instance", {
            get: function () {
                return this._instance ? InputManager._instance : InputManager._instance = new InputManager();
            },
            enumerable: true,
            configurable: true
        });
        InputManager.prototype.isDown = function (key) {
            if (this.isInteractionDisabled)
                return false;
            if (this.isKeyboardInputType) {
                var map = {
                    'LEFT': [Phaser.Keyboard.LEFT],
                    'UP': [Phaser.Keyboard.UP],
                    'DOWN': [Phaser.Keyboard.DOWN],
                    'RIGHT': [Phaser.Keyboard.RIGHT],
                    'Z': [Phaser.Keyboard.Z],
                    'X': [Phaser.Keyboard.X],
                    'C': [Phaser.Keyboard.C],
                };
                this.isDowButton[key] = false;
                for (var _i = 0, _a = map[key]; _i < _a.length; _i++) {
                    var m = _a[_i];
                    if (game.input.keyboard.isDown(m)) {
                        this.isDowButton[key] = true;
                        break;
                    }
                }
            }
            return this.isDowButton[key];
        };
        InputManager.prototype.create = function (parent) {
            if (this.isKeyboardInputType) {
                this.createKeyboardInput();
            }
            else {
                this.createTouchInputUI(parent);
            }
        };
        InputManager.prototype.destroy = function () {
            if (this.isKeyboardInputType) {
                this.destroyKeyboardInput();
            }
            else {
                this.destroyTouchInputUI();
            }
        };
        InputManager.prototype.createTouchInputUI = function (parent) {
            var _this = this;
            if (!this.inputElementsContainer) {
                this.inputElementsContainer = new Phaser.Group(game, null);
                this.JOYSTICK_UP_ = new Phaser.Sprite(game, -5.3, -54, 'hud', 'JOYSTICK_UP_0000');
                this.JOYSTICK_RIGHT_UP_ = new Phaser.Sprite(game, 51, -53, 'hud', 'JOYSTICK_RIGHT_UP_0000');
                this.JOYSTICK_RIGHT_ = new Phaser.Sprite(game, 57, 2, 'hud', 'JOYSTICK_RIGHT_0000');
                this.JOYSTICK_RIGHT_DOWN_ = new Phaser.Sprite(game, 55, 54, 'hud', 'JOYSTICK_RIGHT_DOWN_0000');
                this.JOYSTICK_DOWN_ = new Phaser.Sprite(game, 0, 57, 'hud', 'JOYSTICK_DOWN_0000');
                this.JOYSTICK_LEFT_DOWN_ = new Phaser.Sprite(game, -55, 55, 'hud', 'JOYSTICK_LEFT_DOWN_0000');
                this.JOYSTICK_LEFT_ = new Phaser.Sprite(game, -57, 3, 'hud', 'JOYSTICK_LEFT_0000');
                this.JOYSTICK_LEFT_UP_ = new Phaser.Sprite(game, -58, -51, 'hud', 'JOYSTICK_LEFT_UP_0000');
                this.JOYSTICK_CENTER_ = new Phaser.Sprite(game, 0.51, 2.1, 'hud', 'JOYSTICK_CENTER_0000');
                this.screenJoystick = new Phaser.Sprite(game, 780, 505, 'hud', 'screenJoystick_0000');
                this.screenJoystick.anchor.set(0.5, 0.5);
                this.screenJoystick.addChild(this.JOYSTICK_UP_);
                this.screenJoystick.addChild(this.JOYSTICK_RIGHT_UP_);
                this.screenJoystick.addChild(this.JOYSTICK_RIGHT_);
                this.screenJoystick.addChild(this.JOYSTICK_RIGHT_DOWN_);
                this.screenJoystick.addChild(this.JOYSTICK_DOWN_);
                this.screenJoystick.addChild(this.JOYSTICK_LEFT_DOWN_);
                this.screenJoystick.addChild(this.JOYSTICK_LEFT_);
                this.screenJoystick.addChild(this.JOYSTICK_LEFT_UP_);
                this.screenJoystick.addChild(this.JOYSTICK_CENTER_);
                for (var _i = 0, _a = this.screenJoystick.children; _i < _a.length; _i++) {
                    var c = _a[_i];
                    c['anchor'].set(0.5, 0.5);
                    c.scale.set(0.96, 0.96);
                    c.alpha = 0;
                }
                this.screenJoystick.scale.set(1.45, 1.45);
                this.screenJoystick.position.x -= 20;
                this.screenJoystick.position.y += 35;
                this.screenJoystick.alpha = 0.5;
                this.inputElementsContainer.add(this.screenJoystick);
                this.screenJoystick.inputEnabled = true;
                var resetControlButtons = function () {
                    _this.isDowButton['UP'] = _this.isDowButton['RIGHT'] = _this.isDowButton['DOWN'] = _this.isDowButton['LEFT'] = false;
                };
                this.JOYSTICK_UP_.inputEnabled = true;
                this.JOYSTICK_UP_.events.onInputDown.add(function () { _this.isDowButton['UP'] = true; }, this);
                this.JOYSTICK_UP_.events.onInputOver.add(function () { _this.isDowButton['UP'] = true; }, this);
                this.JOYSTICK_UP_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_UP_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_RIGHT_.inputEnabled = true;
                this.JOYSTICK_RIGHT_.events.onInputDown.add(function () { _this.isDowButton['RIGHT'] = true; }, this);
                this.JOYSTICK_RIGHT_.events.onInputOver.add(function () { _this.isDowButton['RIGHT'] = true; }, this);
                this.JOYSTICK_RIGHT_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_RIGHT_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_DOWN_.inputEnabled = true;
                this.JOYSTICK_DOWN_.events.onInputDown.add(function () { _this.isDowButton['DOWN'] = true; }, this);
                this.JOYSTICK_DOWN_.events.onInputOver.add(function () { _this.isDowButton['DOWN'] = true; }, this);
                this.JOYSTICK_DOWN_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_DOWN_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_LEFT_.inputEnabled = true;
                this.JOYSTICK_LEFT_.events.onInputDown.add(function () { _this.isDowButton['LEFT'] = true; }, this);
                this.JOYSTICK_LEFT_.events.onInputOver.add(function () { _this.isDowButton['LEFT'] = true; }, this);
                this.JOYSTICK_LEFT_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_LEFT_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_RIGHT_UP_.inputEnabled = true;
                this.JOYSTICK_RIGHT_UP_.events.onInputDown.add(function () { _this.isDowButton['RIGHT'] = _this.isDowButton['UP'] = true; }, this);
                this.JOYSTICK_RIGHT_UP_.events.onInputOver.add(function () { _this.isDowButton['RIGHT'] = _this.isDowButton['UP'] = true; }, this);
                this.JOYSTICK_RIGHT_UP_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_RIGHT_UP_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_RIGHT_DOWN_.inputEnabled = true;
                this.JOYSTICK_RIGHT_DOWN_.events.onInputDown.add(function () { _this.isDowButton['RIGHT'] = _this.isDowButton['DOWN'] = true; }, this);
                this.JOYSTICK_RIGHT_DOWN_.events.onInputOver.add(function () { _this.isDowButton['RIGHT'] = _this.isDowButton['DOWN'] = true; }, this);
                this.JOYSTICK_RIGHT_DOWN_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_RIGHT_DOWN_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_LEFT_DOWN_.inputEnabled = true;
                this.JOYSTICK_LEFT_DOWN_.events.onInputDown.add(function () { _this.isDowButton['LEFT'] = _this.isDowButton['DOWN'] = true; }, this);
                this.JOYSTICK_LEFT_DOWN_.events.onInputOver.add(function () { _this.isDowButton['LEFT'] = _this.isDowButton['DOWN'] = true; }, this);
                this.JOYSTICK_LEFT_DOWN_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_LEFT_DOWN_.events.onInputOut.add(resetControlButtons, this);
                this.JOYSTICK_LEFT_UP_.inputEnabled = true;
                this.JOYSTICK_LEFT_UP_.events.onInputDown.add(function () { _this.isDowButton['LEFT'] = _this.isDowButton['UP'] = true; }, this);
                this.JOYSTICK_LEFT_UP_.events.onInputOver.add(function () { _this.isDowButton['LEFT'] = _this.isDowButton['UP'] = true; }, this);
                this.JOYSTICK_LEFT_UP_.events.onInputUp.add(resetControlButtons, this);
                this.JOYSTICK_LEFT_UP_.events.onInputOut.add(resetControlButtons, this);
            }
            this.touchInputOnKeyZdown = this.onZDown;
            this.touchInputOnOnKeyDownListenerContext = this.listenerContext;
            this.touchInputOnKeyXdown = this.onXDown;
            this.screenButtonZ_.events.onInputDown.add(this.touchInputOnKeyZdown, this.touchInputOnOnKeyDownListenerContext);
            this.screenButtonX_.events.onInputDown.add(this.touchInputOnKeyXdown, this.touchInputOnOnKeyDownListenerContext);
            parent.addChild(this.inputElementsContainer);
        };
        InputManager.prototype.destroyTouchInputUI = function () {
            this.inputElementsContainer.parent.removeChild(this.inputElementsContainer);
        };
        InputManager.prototype.createKeyboardInput = function () {
            game.input.keyboard.addKey(Phaser.Keyboard.UP);
            game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            game.input.keyboard.addKey(Phaser.Keyboard.Z);
            game.input.keyboard.addKey(Phaser.Keyboard.X);
            game.input.keyboard.addKey(Phaser.Keyboard.C);
            this.keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
            this.keyZ.onDown.add(this.onZDown, this.listenerContext);
            this.keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.keyX.onDown.add(this.onXDown, this.listenerContext);
        };
        InputManager.prototype.destroyKeyboardInput = function () {
            game.input.keyboard.removeKey(Phaser.Keyboard.UP);
            game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
            game.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
            game.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
            game.input.keyboard.removeKey(Phaser.Keyboard.Z);
            game.input.keyboard.removeKey(Phaser.Keyboard.X);
            this.keyZ.onUp.removeAll();
            this.keyX.onUp.removeAll();
            this.onXDown = this.onZDown = null;
            this.listenerContext = null;
        };
        InputManager._instance = null;
        return InputManager;
    }(src.HeroActionSignalManager));
    src.InputManager = InputManager;
})(src || (src = {}));
var src;
(function (src) {
    var LocalStorageController = /** @class */ (function () {
        function LocalStorageController() {
            this.isLocalStorageSupported = false;
            this.data = null;
            //init
            this.data = {};
            this.name = 'BotB_v0.1';
            this.checkLocalStorageSupported();
            this.createOrLoad();
        }
        Object.defineProperty(LocalStorageController, "instance", {
            get: function () {
                return LocalStorageController._instance ? LocalStorageController._instance
                    : LocalStorageController._instance = new LocalStorageController();
            },
            enumerable: true,
            configurable: true
        });
        LocalStorageController.prototype.createOrLoad = function () {
            if (!this.isLocalStorageSupported)
                return;
            if (localStorage[this.name]) {
                this.data = JSON.parse(localStorage[this.name]);
            }
            else {
                localStorage[this.name] = JSON.stringify(this.data);
            }
        };
        LocalStorageController.prototype.checkLocalStorageSupported = function () {
            try {
                this.isLocalStorageSupported = "localStorage" in window && window["localStorage"] !== null;
            }
            catch (e) {
                this.isLocalStorageSupported = false;
            }
        };
        return LocalStorageController;
    }());
    src.LocalStorageController = LocalStorageController;
})(src || (src = {}));
var src;
(function (src) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            game.load.atlasJSONHash("preloader", "img/preloader.png", "img/preloader.json");
        };
        Preloader.prototype.create = function () {
            src.CommonUtils.GAME_ART_GROUP = new Phaser.Group(game, null);
            src.CommonUtils.GAME_ART_GROUP.add(src.CommonUtils.currentView = this.preloaderWindow = new src.PreloaderWindow());
            this.add.existing(src.CommonUtils.GAME_ART_GROUP);
            game.load.onFileComplete.add(this.fileComplete, this);
            game.load.atlasJSONHash("babyducks", "img/babyducks.png", "img/babyducks.json");
            game.load.atlasJSONHash("babyducks_1", "img/babyducks_1.png", "img/babyducks_1.json");
            game.load.atlasJSONHash("babyducks_2", "img/babyducks_2.png", "img/babyducks_2.json");
            game.load.atlasJSONHash("warlock", "img/warlock.png", "img/warlock.json");
            game.load.atlasJSONHash("warlock_1", "img/warlock_1.png", "img/warlock_1.json");
            game.load.atlasJSONHash("warlock_2", "img/warlock_2.png", "img/warlock_2.json");
            game.load.atlasJSONHash("VHS", "img/VHS.png", "img/VHS.json");
            game.load.atlasJSONHash("VHS_1", "img/VHS_1.png", "img/VHS_1.json");
            game.load.atlasJSONHash("VHS_2", "img/VHS_2.png", "img/VHS_2.json");
            game.load.atlasJSONHash("guardian", "img/guardian.png", "img/guardian.json");
            game.load.atlasJSONHash("guardian_1", "img/guardian_1.png", "img/guardian_1.json");
            game.load.atlasJSONHash("guardian_2", "img/guardian_2.png", "img/guardian_2.json");
            game.load.atlasJSONHash("geese", "img/geese.png", "img/geese.json");
            game.load.atlasJSONHash("geese_1", "img/geese_1.png", "img/geese_1.json");
            game.load.atlasJSONHash("geese_2", "img/geese_2.png", "img/geese_2.json");
            game.load.atlasJSONHash("snowball", "img/snowball.png", "img/snowball.json");
            game.load.atlasJSONHash("snowball_1", "img/snowball_1.png", "img/snowball_1.json");
            game.load.atlasJSONHash("snowball_2", "img/snowball_2.png", "img/snowball_2.json");
            game.load.atlasJSONHash("fxTexture", "img/fxTexture.png", "img/fxTexture.json");
            game.load.atlasJSONHash("gameAreaTexture", "img/gameAreaTexture.png", "img/gameAreaTexture.json");
            game.load.atlasJSONHash("hud", "img/hud.png", "img/hud.json");
            game.load.atlasJSONHash("heroSelect", "img/heroSelect.png", "img/heroSelect.json");
            game.load.atlasJSONHash("mainMenu", "img/mainMenu.jpg", "img/mainMenu.json");
            game.load.atlasJSONHash("intro", "img/intro.jpg", "img/intro.json");
            game.load.atlasJSONHash("introAssetsPng", "img/introAssetsPng.png", "img/introAssetsPng.json");
            game.load.json('text', 'lang/text.json');
            /*for (let soundName of SoundController.instance.soundNames) {
                game.load.audio(soundName, ['sound/mp3/' + soundName + '.mp3', 'sound/ogg/' + soundName + '.ogg', 'sound/m4a/' + soundName + '.m4a']);
            }*/
            game.load.start();
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.preloaderWindow.updateProgres(progress);
        };
        return Preloader;
    }(Phaser.State));
    src.Preloader = Preloader;
})(src || (src = {}));
/**
 * Created by roman on 14.08.2017.
 */
var src;
(function (src) {
    var SoundController = /** @class */ (function () {
        function SoundController() {
            this.btnOff = null;
            this.btnOn = null;
            this.soundNames = [];
            this.isSoundON = true;
            this.soundInstances = {};
            // this.setMute(true);
        }
        Object.defineProperty(SoundController, "instance", {
            get: function () {
                return SoundController._instance ? SoundController._instance :
                    SoundController._instance = new SoundController();
            },
            enumerable: true,
            configurable: true
        });
        SoundController.prototype.isBtnOnVisible = function () {
            return this.btnOn && this.btnOn.visible;
        };
        SoundController.prototype.getButtonsContainer = function (x, y) {
            var _this = this;
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            var createArt = function () {
                _this.btnOff = new Phaser.Sprite(game, 0, 0, 'hud', 'OFF_0000');
                _this.btnOff.events.onInputUp.add(function () {
                    _this.btnOff.visible = _this.btnOff.inputEnabled = false;
                    _this.btnOn.visible = _this.btnOn.inputEnabled = true;
                    _this.setMute(false);
                    _this.isSoundON = true;
                    // SoundController.instance.playClickSound();
                }, _this);
                _this.buttonsContainer.add(_this.btnOff);
                _this.btnOn = new Phaser.Sprite(game, 0, 0, 'hud', 'ON_0000');
                _this.btnOn.events.onInputUp.add(function () {
                    _this.btnOn.visible = _this.btnOn.inputEnabled = false;
                    _this.btnOff.visible = _this.btnOff.inputEnabled = true;
                    _this.setMute(true);
                    _this.isSoundON = false;
                }, _this);
                _this.buttonsContainer.add(_this.btnOn);
                _this.btnOff.inputEnabled = true;
                _this.btnOff.input.useHandCursor = true;
                _this.btnOff.events.onInputOver.add(function () {
                    _this.btnOff.tint = 0xFF6706;
                }, _this);
                _this.btnOff.events.onInputOut.add(function () {
                    _this.btnOff.tint = 0xFFFFFF;
                }, _this);
                _this.btnOn.inputEnabled = true;
                _this.btnOn.input.useHandCursor = true;
                _this.btnOn.events.onInputOver.add(function () {
                    _this.btnOn.tint = 0xFF6706;
                }, _this);
                _this.btnOn.events.onInputOut.add(function () {
                    _this.btnOn.tint = 0xFFFFFF;
                }, _this);
                _this.btnOff.anchor.set(0.5, 0.5);
                _this.btnOn.anchor.set(0.5, 0.5);
                _this.btnOff.input.useHandCursor = _this.btnOn.input.useHandCursor = true;
                if (!_this.isSoundON) {
                    _this.btnOn.visible = _this.btnOn.inputEnabled = false;
                    _this.btnOff.visible = _this.btnOff.inputEnabled = true;
                }
                else {
                    _this.btnOn.visible = _this.btnOn.inputEnabled = true;
                    _this.btnOff.visible = _this.btnOff.inputEnabled = false;
                }
            };
            this.buttonsContainer = new Phaser.Group(game, null);
            createArt();
            if (!isNaN(x))
                this.buttonsContainer.x = x;
            if (!isNaN(y))
                this.buttonsContainer.y = y;
            return this.buttonsContainer;
        };
        SoundController.prototype.playSound = function (key) {
            if (!this.soundInstances.hasOwnProperty(key))
                this.soundInstances[key] = [];
            if (SoundController.DATA[key]['single'] && this.soundInstances[key].length == 0 || !SoundController.DATA[key]['single']) {
                var snd = game.sound.play(key, SoundController.DATA[key]['volume'], SoundController.DATA[key]['loop']);
                this.soundInstances[key].push(snd);
                return snd;
            }
            return null;
        };
        SoundController.prototype.destroySound = function (key) {
            if (!this.soundInstances.hasOwnProperty(key))
                return;
            for (var _i = 0, _a = this.soundInstances[key]; _i < _a.length; _i++) {
                var snd = _a[_i];
                snd.destroy();
            }
            delete this.soundInstances[key];
        };
        SoundController.prototype.setMute = function (flag) {
            game.sound.mute = flag;
        };
        //@param enabled true == sound ON, false == sound OFF
        SoundController.prototype.setEnabled = function (enabled) {
            if (this.isBtnOnVisible())
                game.sound.mute = !enabled;
        };
        SoundController.DATA = {};
        SoundController._instance = null;
        return SoundController;
    }());
    src.SoundController = SoundController;
})(src || (src = {}));
var src;
(function (src) {
    var Hero = /** @class */ (function (_super) {
        __extends(Hero, _super);
        function Hero(heroName) {
            var _this = _super.call(this, game, null) || this;
            _this.isBeingHit = false;
            _this.blockingAttack = false;
            _this.jumpingUp = false;
            _this.fallingDown = false;
            _this.crouchingDown = false;
            _this.dead = false;
            _this.targetPosXToMoveTo = NaN;
            _this.currAnimName = null;
            _this.currAnim = null;
            _this.onCompleteCallback = null;
            _this.comboPreviousAttackSucceedsNum = 0;
            _this.previousAttackSucceed = false;
            _this.previousAttackSucceedCounter = 0;
            _this.previousAttackSucceedMaxCounter = 40;
            _this.attackCounter = 0;
            // nextAttackAllowedMinCounter:number = 0;//if can hit again
            _this.attacking = false;
            _this.isOneKickInThisAirTimeAlreadyMade = false;
            _this.superAttackTypeChoosingCounter = 0;
            _this.wasCPressedDown = false;
            _this.moveForwardAttackingComboCounter = 0;
            _this.attackHitter = null;
            _this.superAttackHitters = [];
            _this.movingTicks = 0;
            _this.touchingDownFloor = false;
            _this.isKnockedDown = false;
            _this.beingKnockedDownTimes = 0;
            _this.deathNum = 0;
            _this.spdXImpulseTicker = -1;
            _this.heroName = heroName;
            _this.speedXModule = src.Config.HERO_PROP[_this.heroName]['speedXModule'];
            _this.jumpSpeedYModule = src.Config.HERO_PROP[_this.heroName]['jumpSpeedYModule'];
            _this.deathNum = src.GameArea._instance.player == _this ? src.GameArea._instance.gameWindow.fightProgressModel.botAIRoundWinsNum : src.GameArea._instance.gameWindow.fightProgressModel.playerRoundWinsNum;
            _this.spritesMap = {};
            var animsData = src.Config.HERO_ANIMS[_this.heroName];
            for (var animName in animsData) {
                var ad = animsData[animName];
                var s = new Phaser.Sprite(game, 0, 0, ad['key']);
                var frames_1 = void 0;
                if (ad['start'] instanceof Array) {
                    frames_1 = [];
                    for (var k = 0; k < ad['start'].length; k++) {
                        frames_1 = frames_1.concat(Phaser.Animation.generateFrameNames(ad['prefix'], ad['start'][k], ad['stop'][k], '', 4));
                    }
                }
                else {
                    frames_1 = Phaser.Animation.generateFrameNames(ad['prefix'], ad['start'], ad['stop'], '', 4);
                }
                /*if (animName == 'hit_air_') {
                    frames = frames.concat(frames.reverse());
                }*/
                var _framerate = 60;
                if (ad.hasOwnProperty('frameRate')) {
                    _framerate = ad['frameRate'];
                }
                if (animName == 'attack_1_' || animName == 'attack_2_' || animName == 'attack_3_' || animName == 'attack_4_'
                    || animName == 'attack_crouch_1_' || animName == 'attack_jump_1_' || animName == 'attack_jump_2_') {
                    _framerate = Math.ceil(_framerate * src.Config.HERO_PROP[_this.heroName]['attackSpeedCoef']);
                }
                s.animations.add(animName, frames_1, _framerate, ad['loop']);
                s.anchor.set(ad['anchorX'], ad['anchorY'] ? ad['anchorY'] : 1);
                game.physics.enable(s);
                s.body.enable = false;
                s.body.allowGravity = true;
                s.body.gravity.y = 1200;
                s.scale.x = s.scale.y = _this.defScale = src.Config.HERO_PROP[_this.heroName]['scale'];
                _this.spritesMap[animName] = s;
                if (animName == 'block_') {
                    s.animations.add('hitBlocked', Phaser.Animation.generateFrameNames('block_', ad['hitBlocked']['start'], ad['hitBlocked']['stop'], '', 4), ad['hitBlocked']['frameRate'], false);
                }
            }
            _this.playSprite('idle_');
            _this.setFacingRight(true);
            _this.fullHP = src.Config.HERO_PROP[_this.heroName]['fullHP'];
            _this.hp = _this.fullHP;
            _this.heroShadow = new Phaser.Sprite(game, 0, 480 + 50, 'gameAreaTexture', 'heroShadow_0000');
            _this.heroShadow.anchor.set(0.5, 0.5);
            var data = [
                { 'key': 'floorSmoke1_', 'start': 0, 'stop': 11 },
                { 'key': 'floorSmoke2_', 'start': 0, 'stop': 19 }
            ];
            var floorData = data[0];
            _this.floorSmoke1 = new Phaser.Sprite(game, _this.sprite.x, _this.sprite.y, 'fxTexture', floorData['key'] + '0000');
            _this.floorSmoke1.anchor.set(0.5, 1);
            // this.floorSmoke1.scale.x = this.floorSmoke1.scale.y = 1+ Math.random() * 0.25;
            _this.floorSmoke1.scale.x = _this.facingRight ? 1 : -1;
            _this.floorSmoke1.animations.add('playing', Phaser.Animation.generateFrameNames(floorData['key'], floorData['start'], floorData['stop'], '', 4), 30, false)
                .onComplete.add(function () {
                if (_this.contains(_this.floorSmoke1))
                    _this.remove(_this.floorSmoke1, false, false);
            }, _this);
            floorData = data[1];
            _this.floorSmoke2 = new Phaser.Sprite(game, _this.sprite.x, _this.sprite.y, 'fxTexture', floorData['key'] + '0000');
            _this.floorSmoke2.anchor.set(0.5, 1);
            // this.floorSmoke2.scale.x = this.floorSmoke2.scale.y = 1+ Math.random() * 0.25;
            _this.floorSmoke2.scale.x = _this.facingRight ? 1 : -1;
            _this.floorSmoke2.animations.add('playing', Phaser.Animation.generateFrameNames(floorData['key'], floorData['start'], floorData['stop'], '', 4), 30, false)
                .onComplete.add(function () {
                if (_this.contains(_this.floorSmoke2))
                    _this.remove(_this.floorSmoke2, false, false);
            }, _this);
            return _this;
        }
        Hero.prototype.setHeroActionSignalManager = function (heroActionSignalManager) {
            this.heroActionSignalManager = heroActionSignalManager;
            this.heroActionSignalManager.setOnDownListeners(this.tryToHandAttack, this.tryToFootAttack, this);
        };
        Hero.prototype.moveToXPos = function (xPos) {
            this.targetPosXToMoveTo = xPos;
            // this.heroActionSignalManager.isInteractionDisabled = true;
        };
        Hero.prototype.getAlivePercentage = function () {
            return this.hp / this.fullHP;
        };
        Hero.prototype.setEnemy = function (enemy) {
            this.enemy = enemy;
        };
        Hero.prototype.playSprite = function (animName, onCompleteCallback) {
            var _this = this;
            if (onCompleteCallback === void 0) { onCompleteCallback = null; }
            if (this.dead)
                return null;
            if (animName != 'die_' && animName != 'knock_down_' && animName != 'knock_down_and_get_up_') {
                if (this.attacking)
                    return null;
                if (this.blockingAttack)
                    return null;
                if (this.isBeingHit)
                    return null;
                if (this.isKnockedDown)
                    return null;
            }
            if (this.onCompleteCallback) {
                var _onc = this.onCompleteCallback;
                this.onCompleteCallback = null;
                _onc();
            }
            if (this.currAnimName == animName) {
                this.currAnim.onComplete.removeAll(this);
                // this.currAnim.restart();
                this.currAnim = this.sprite.play(animName);
            }
            else {
                var prevSpr = this.sprite;
                if (this.sprite && this.sprite.parent) {
                    this.sprite.body.enable = false;
                    this.remove(this.sprite, false);
                    this.currAnim.onComplete.removeAll(this);
                }
                this.currAnimName = animName;
                this.sprite = this.spritesMap[animName];
                this.sprite.body.enable = true;
                if (prevSpr) {
                    this.setPosition(prevSpr.x, prevSpr.y);
                    this.sprite.body.velocity.y = prevSpr.body.velocity.y;
                    this.sprite.body.velocity.x = prevSpr.body.velocity.x;
                    this.sprite.scale.x = prevSpr.scale.x;
                    this.sprite.scale.y = prevSpr.scale.y;
                    // this.sprite.tint = prevSpr.tint;
                }
                this.currAnim = this.sprite.play(animName);
                var _h = Math.floor(this.sprite.height / this.sprite.scale.y);
                var __h = src.Config.HERO_PROP[this.heroName]['bodyHeight'];
                this.sprite.body.setSize(src.Config.HERO_PROP[this.heroName]['bodyWidht'], __h, Math.floor(this.sprite.width * this.sprite.anchor.x * (this.sprite.scale.x > 0 ? 1 : -1)) - 50, _h - __h);
                this.sprite.body.checkCollision.up = false;
                this.add(this.sprite);
            }
            this.onCompleteCallback = onCompleteCallback;
            if (this.onCompleteCallback) {
                this.currAnim.onComplete.addOnce(function () {
                    if (_this.onCompleteCallback) {
                        var _onc = _this.onCompleteCallback;
                        _this.onCompleteCallback = null;
                        _onc();
                    }
                }, this);
            }
            if (this.currAnimName == 'knock_down_' || this.currAnimName == 'knock_down_and_get_up_' || this.currAnimName == 'die_') {
                src.CommonUtils.createTimer(500, function () {
                    src.GameArea._instance.crashDestructableElements(_this);
                }, this);
            }
            return this.currAnim;
        };
        Hero.prototype.setFacingRight = function (right) {
            if (this.facingRight === right)
                return;
            this.facingRight = right;
            if (this.facingRight) {
                this.sprite.scale.x = this.defScale * 1;
                if (this.attackHitter)
                    this.attackHitter.scale.x = 1;
            }
            else {
                this.sprite.scale.x = this.defScale * -1;
                if (this.attackHitter)
                    this.attackHitter.scale.x = -1;
            }
            // this.sprite.body.velocity.x = 0;
        };
        Hero.prototype.setPosition = function (x, y) {
            this.sprite.x = x;
            this.sprite.y = y;
        };
        Hero.prototype.tryToHandAttack = function () {
            this.tryKickAttack('attack_1_', 'attack_2_', 'attack_jump_1_');
        };
        Hero.prototype.tryToFootAttack = function () {
            this.tryKickAttack('attack_4_', 'attack_3_', 'attack_jump_2_');
        };
        Hero.prototype.tryKickAttack = function (baseAttack1, baseAttack2, jumpAttack) {
            var _this = this;
            if (this.attacking)
                return;
            /*if (this.attackCounter < this.nextAttackAllowedMinCounter) return;console.log(this.nextAttackAllowedMinCounter)
            if (this.attacking/!*this.currAnimName.indexOf('attack_') >= 0*!/) this.resetAttackingData();*/
            var animName = null;
            if (this.crouchingDown) {
                animName = 'attack_crouch_1_';
            }
            else if (this.isInAir()) {
                if (!this.isOneKickInThisAirTimeAlreadyMade) {
                    animName = jumpAttack;
                    this.isOneKickInThisAirTimeAlreadyMade = true;
                }
            }
            else {
                animName = baseAttack1;
                if (this.previousAttackSucceed) {
                    if (Math.random() < 0.8) {
                        animName = this.currAnimName == baseAttack2 ? baseAttack1 : baseAttack2;
                    }
                    else {
                        animName = Math.random() > 0.5 ? baseAttack1 : baseAttack2;
                    }
                }
            }
            if (animName) {
                if (this.playSprite(animName, function () { _this.resetAttackingData(); })) {
                    this.attacking = true;
                    var ad = src.Config.HERO_ANIMS[this.heroName][this.currAnimName]['attackHitter'];
                    if (ad) {
                        this.attackHitter = game.add.sprite(ad['x'], ad['y']);
                        this.attackHitter.body.setSize(ad['w'], ad['h'], 0, 0);
                        this.attackHitter.scale.x = this.facingRight ? 1 : -1;
                        this.sprite.addChild(this.attackHitter);
                        // this.attackCounter = 0;
                        // this.nextAttackAllowedMinCounter = Config.HERO_ANIMS[this.heroName][this.currAnimName]['naamc'];
                    }
                }
            }
        };
        Hero.prototype.resetAttackingData = function () {
            this.attacking = false;
            if (this.attackHitter) {
                if (this.attackHitter.parent)
                    this.attackHitter.parent.removeChild(this.attackHitter);
                this.attackHitter = null;
            }
            this.attackCounter = 0;
            // this.nextAttackAllowedMinCounter = 0;
        };
        Hero.prototype.updateHero = function () {
            if (this.sprite.x < src.GameArea._instance.leftMinXPos)
                this.sprite.x = src.GameArea._instance.leftMinXPos;
            if (this.sprite.x > src.GameArea._instance.rightMaxXPos)
                this.sprite.x = src.GameArea._instance.rightMaxXPos;
            this.touchingDownFloor = false;
            if (this.sprite.y >= src.GameArea._instance.floorYPos) {
                this.sprite.y = src.GameArea._instance.floorYPos;
                this.sprite.body.velocity.y = 0;
                this.touchingDownFloor = true;
            }
            if (this.dead)
                return;
            if (Math.abs(this.enemy.sprite.x - this.sprite.x) > 5) {
                this.setFacingRight(this.enemy.sprite.x > this.sprite.x);
            }
            if (!isNaN(this.targetPosXToMoveTo)) {
                if (Math.abs(this.targetPosXToMoveTo - this.sprite.x) < 15) {
                    this.targetPosXToMoveTo = NaN;
                    this.moveLeft = this.moveRight = false;
                    // this.heroActionSignalManager.isInteractionDisabled = false;
                }
                else {
                    if (this.targetPosXToMoveTo > this.sprite.x) {
                        this.moveLeft = false;
                        this.moveRight = true;
                    }
                    else {
                        this.moveLeft = true;
                        this.moveRight = false;
                    }
                }
            }
            else {
                if (!this.dead && !this.heroActionSignalManager.isInteractionDisabled) {
                    this.moveLeft = this.heroActionSignalManager.isDown('LEFT');
                    this.moveRight = this.heroActionSignalManager.isDown('RIGHT');
                }
                else {
                    this.moveLeft = this.moveRight = false;
                }
            }
            if (this.heroActionSignalManager.isDown('C')) {
                if (this.wasCPressedDown) {
                    this.trySuperAttack();
                }
                else if (this.superAttackTypeChoosingCounter++ > game.time.desiredFps / 10) {
                    this.trySuperAttack();
                    this.superAttackTypeChoosingCounter = 0;
                    this.wasCPressedDown = true;
                }
            }
            else {
                if (this.superAttackTypeChoosingCounter > 0) {
                    this.superAttackTypeChoosingCounter = 0;
                    this.trySuperAttack();
                }
                this.wasCPressedDown = false;
            }
            /*if (!this.isInteractionDisabled) */ this.updateSimpleMovingAndJumping();
            if (this.attacking)
                this.attackCounter++;
            if (this.previousAttackSucceedCounter < this.previousAttackSucceedMaxCounter) {
                this.previousAttackSucceedCounter++;
                if (this.previousAttackSucceedCounter >= this.previousAttackSucceedMaxCounter) {
                    // this.previousAttackSucceedCounter = 0;
                    this.previousAttackSucceed = false;
                    this.comboPreviousAttackSucceedsNum = 0;
                    if (this.comboPreviousAttackSucceedsNum > 1) {
                        this.sprite.body.velocity.x = 0;
                    }
                }
            }
            if (this.attackCounter > 2)
                this.checkAttackHitSucceed();
            l: for (var i = this.superAttackHitters.length - 1; i >= 0; i--) {
                if (this.superAttackHitters[i].x < src.GameArea._instance.leftMinXPos
                    || this.superAttackHitters[i].x > src.GameArea._instance.rightMaxXPos
                    || this.superAttackHitters[i].y > src.GameArea._instance.floorYPos
                    || this.superAttackHitters[i].y < src.GameArea._instance.skyYPos) {
                    this.parent.remove(this.superAttackHitters[i], true);
                    this.superAttackHitters.splice(i, 1);
                }
                else {
                    if (!this.enemy.dead) {
                        if (this.superAttackHitters[i]['_type'] != 'attack_5_') {
                            for (var k = this.enemy.superAttackHitters.length - 1; k >= 0; k--) {
                                if (this.enemy.superAttackHitters[k]['_type'] == 'attack_5_')
                                    continue;
                                if (game.physics.arcade.overlap(this.superAttackHitters[i], this.enemy.superAttackHitters[k])) {
                                    if (this.enemy.superAttackHitters[k]['onHitViewEffect'])
                                        this.enemy.superAttackHitters[k]['onHitViewEffect']();
                                    if (this.enemy.superAttackHitters[k]['_type'] != 'attack_6_') {
                                        this.enemy.superAttackHitters[k].parent.remove(this.enemy.superAttackHitters[k], true);
                                    }
                                    this.enemy.superAttackHitters.splice(k, 1);
                                    if (this.superAttackHitters[i]['onHitViewEffect'])
                                        this.superAttackHitters[i]['onHitViewEffect']();
                                    if (this.superAttackHitters[i]['_type'] != 'attack_6_') {
                                        this.superAttackHitters[i].parent.remove(this.superAttackHitters[i], true);
                                    }
                                    this.superAttackHitters.splice(i, 1);
                                    continue l;
                                }
                            }
                        }
                        if (game.physics.arcade.overlap(this.superAttackHitters[i], this.enemy.sprite)) {
                            this.enemy.applyDamage(this.superAttackHitters[i]['damageValue'], this.superAttackHitters[i]['_type'] != 'attack_7_');
                            if (this.superAttackHitters[i]['onHitViewEffect'])
                                this.superAttackHitters[i]['onHitViewEffect']();
                            if (this.superAttackHitters[i]['_type'] != 'attack_6_') {
                                this.superAttackHitters[i].parent.remove(this.superAttackHitters[i], true);
                            }
                            this.superAttackHitters.splice(i, 1);
                        }
                    }
                }
            }
            var wantsToBlock = this.moveLeft && this.facingRight || this.moveRight && !this.facingRight;
            if (wantsToBlock && !this.blockingAttack && !this.isInAir() && this.enemy.attacking) {
                if (this.playSprite('block_')) {
                    this.blockingAttack = true;
                    this.sprite.body.velocity.x = 0;
                }
            }
            else if (this.blockingAttack && (!wantsToBlock || !this.enemy.attacking)) {
                this.blockingAttack = false;
                this.playSprite('unblock_');
            }
            if (this.spdXImpulseTicker != -1 && this.spdXImpulseTicker++ > 25) {
                this.spdXImpulseTicker = -1;
                this.sprite.body.velocity.x = 0;
            }
            this.heroShadow.x = this.sprite.x;
            this.heroShadow.scale.x = this.heroShadow.scale.y = 1 + 0.5 * /*Math.min(*/ (src.GameArea._instance.floorYPos - this.sprite.y) / 150 /*, 1)*/;
        };
        Hero.prototype.checkAttackHitSucceed = function () {
            if (!this.attackHitter)
                return;
            if (game.physics.arcade.overlap(this.attackHitter, this.enemy.sprite)) {
                if (this.attackHitter.parent)
                    this.attackHitter.parent.removeChild(this.attackHitter);
                this.attackHitter = null;
                var damageValue = 0;
                switch (this.currAnimName) {
                    case 'attack_crouch_1_':
                    case 'attack_jump_2_':
                    case 'attack_3_':
                    case 'attack_4_':
                        damageValue = src.Config.HERO_PROP[this.heroName]['attackFoot'];
                        break;
                    default: damageValue = src.Config.HERO_PROP[this.heroName]['attackHand'];
                }
                var res = this.enemy.applyDamage(damageValue, this.currAnimName == 'attack_crouch_1_' || this.comboPreviousAttackSucceedsNum > (Math.random() > 0.75 ? 1 : 2));
                if (res != null && res != Hero.ALL_DAMAGE_BLOCKED) {
                    this.previousAttackSucceed = true;
                    this.previousAttackSucceedCounter = 0;
                    this.comboPreviousAttackSucceedsNum++;
                    if (this.comboPreviousAttackSucceedsNum > 1) {
                        // console.log('comboPreviousAttackSucceedsNum: ' + this.comboPreviousAttackSucceedsNum);
                        this.applySpeedX(275);
                        this.moveForwardAttackingComboCounter = 0;
                        //show combo ui
                        if (src.GameArea._instance.player == this)
                            src.GameArea._instance.gameWindow.showComboView(this.comboPreviousAttackSucceedsNum);
                    }
                    if (res == Hero.KNOCKED_DOWN) {
                        this.comboPreviousAttackSucceedsNum = 0;
                    }
                }
                // console.log('hit');
            }
        };
        Hero.prototype.trySuperAttack = function () {
            var type = null;
            if (this.facingRight && this.heroActionSignalManager.isDown('RIGHT') ||
                !this.facingRight && this.heroActionSignalManager.isDown('LEFT')) {
                type = 'attack_7_';
            }
            else if (this.heroActionSignalManager.isDown('UP')) {
                type = 'attack_6_';
            }
            else {
                type = 'attack_5_';
            }
            if (type) {
                this.doSuperAttack(type);
            }
        };
        Hero.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            if (type == 'attack_5_') {
                this.tryToShowFloorHole(this.facingRight ? 200 : -200, 3);
            }
        };
        Hero.prototype.doSuperAttack = function (type) {
            var _this = this;
            if (this.attacking)
                return;
            if (this.crouchingDown || this.fallingDown || this.jumpingUp)
                return false;
            /*if (this.attackCounter < this.nextAttackAllowedMinCounter) return false;
            if (this.attacking/!*this.currAnimName.indexOf('attack_') >= 0*!/) this.resetAttackingData();*/
            if (this.playSprite(type, function () { _this.resetAttackingData(); })) {
                this.attacking = true;
                // this.attackCounter = 0;
                // this.nextAttackAllowedMinCounter = Config.HERO_ANIMS[this.heroName][this.currAnimName]['naamc'];
                var ad_1 = src.Config.HERO_ANIMS[this.heroName][type]['superAttack'];
                src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(ad_1['shotTicksDelay']), function () {
                    if (_this.currAnimName == type) {
                        var hitter = game.add.sprite(_this.sprite.x + (_this.facingRight ? 1 : -1) * ad_1['sx'], _this.sprite.y + ad_1['sy']);
                        hitter.body.setSize(ad_1['hitTest']['w'], ad_1['hitTest']['h'], ad_1['hitTest']['x'], ad_1['hitTest']['y']);
                        _this.parent.add(hitter);
                        hitter.body.velocity.set((_this.facingRight ? 1 : -1) * ad_1['speedX'], ad_1['speedY']);
                        hitter['damageValue'] = src.Config.HERO_ANIMS[_this.heroName][type]['superAttack']['damageValue'];
                        hitter['_type'] = type;
                        _this.superAttackHitters.push(hitter);
                        _this.attachSuperAttackViewToHitterSprite(hitter, type);
                    }
                }, this);
            }
            return true;
        };
        Hero.prototype.updateSimpleMovingAndJumping = function () {
            var _this = this;
            this.jumpUp = this.heroActionSignalManager.isDown('UP');
            this.crouchDown = this.heroActionSignalManager.isDown('DOWN');
            this.crouchingDown = this.currAnimName == 'crouch_';
            if (this.superAttackTypeChoosingCounter == 0) {
                var _existsSomethingUnderFoots = !this.jumpingUp && !this.fallingDown;
                if (_existsSomethingUnderFoots && !this.dead && !this.isKnockedDown && !this.blockingAttack && !this.isBeingHit) {
                    if (this.crouchDown && !this.attacking) {
                        if (!this.crouchingDown) {
                            this.crouchingDown = true;
                            this.playSprite('crouch_');
                        }
                        this.sprite.body.velocity.x = 0;
                    }
                    else {
                        if (this.crouchingDown) {
                            this.crouchingDown = false;
                            this.playSprite('uncrouch_', function () {
                                if (_this.currAnimName == 'uncrouch_')
                                    _this.playSprite('idle_');
                            });
                        }
                        if (this.currAnimName != 'uncrouch_' && !this.attacking) {
                            if (!this.moveLeft && !this.moveRight) {
                                if (this.currAnimName == 'walk_backwards_' || this.currAnimName == 'walk_') {
                                    this.playSprite('run_stop_', function () {
                                        if (_this.currAnimName == 'run_stop_')
                                            _this.playSprite('idle_');
                                    });
                                }
                                else if (this.currAnimName != 'run_stop_' && this.currAnimName != 'fallenOnFloor_') {
                                    this.playSprite('idle_');
                                }
                                if (this.moveForwardAttackingComboCounter++ > 10) {
                                    this.sprite.body.velocity.x = 0;
                                }
                            }
                            else {
                                this.movingTicks = ++this.movingTicks % 30;
                                if (this.movingTicks == 0) {
                                    var smoke1 = Math.random() > 0.5;
                                    this.tryToShowFootSmoke(smoke1, smoke1 ? Math.random() > 0.5 : true);
                                }
                                if (this.moveLeft) {
                                    if (this.facingRight) {
                                        this.playSprite('walk_backwards_');
                                        this.sprite.body.velocity.x = -this.speedXModule * 0.65;
                                    }
                                    else {
                                        this.playSprite('walk_');
                                        this.sprite.body.velocity.x = -this.speedXModule;
                                    }
                                }
                                else if (this.moveRight) {
                                    if (this.facingRight) {
                                        this.playSprite('walk_');
                                        this.sprite.body.velocity.x = this.speedXModule;
                                    }
                                    else {
                                        this.playSprite('walk_backwards_');
                                        this.sprite.body.velocity.x = this.speedXModule * 0.65;
                                    }
                                }
                            }
                            if (this.jumpUp) {
                                this.playSprite('jumpUp_');
                                this.jumpingUp = true;
                                if (this.sprite.body.touching.down || this.touchingDownFloor) {
                                    this.sprite.body.velocity.y = -this.jumpSpeedYModule;
                                    this.sprite.y = src.GameArea._instance.floorYPos - 1;
                                    if (this.moveLeft) {
                                        this.sprite.body.velocity.x = this.facingRight ? -this.speedXModule / 2 : -this.speedXModule;
                                    }
                                    else if (this.moveRight) {
                                        this.sprite.body.velocity.x = this.facingRight ? this.speedXModule : this.speedXModule / 2;
                                    }
                                    else {
                                        this.sprite.body.velocity.x = 0;
                                    }
                                }
                                this.isOneKickInThisAirTimeAlreadyMade = false;
                                this.tryToShowFootSmoke();
                            }
                        }
                        else {
                            if (this.moveForwardAttackingComboCounter++ > 10) {
                                this.sprite.body.velocity.x = 0;
                            }
                        }
                    }
                }
            }
            else {
                // this.currAnim.stop();
                this.sprite.body.velocity.x = 0;
            }
            if (this.jumpingUp && this.sprite.body.velocity.y > 0) {
                if (!this.fallingDown) {
                    this.playSprite('fallDown_');
                }
                this.fallingDown = true;
                this.jumpingUp = false;
            }
            if (this.sprite.body.velocity.y == 0 && (this.sprite.body.touching.down || this.touchingDownFloor)) {
                if (this.fallingDown) {
                    /*this.playSprite('fallenOnFloor_',()=>{
                            if (this.currAnimName == 'fallenOnFloor_') this.playSprite('idle_');
                            });*/
                    this.fallingDown = false;
                    if (this.attacking) {
                        this.resetAttackingData();
                    }
                    this.tryToShowFootSmoke();
                    this.tryToShowFloorHole(0, Math.random() > 0.5 ? 3 : 2);
                }
                this.jumpingUp = false;
            }
            // if(Math.random()>0.99){console.log('aaaaaaaaaaaaaaaaaaa');this.applyDamage(1);}
        };
        Hero.prototype.tryToShowFloorHole = function (dx, num, delay) {
            var _this = this;
            if (dx === void 0) { dx = 0; }
            if (num === void 0) { num = 2; }
            if (delay === void 0) { delay = 150; }
            game.camera.shake(0.01, 300 + Math.random() * 100); // src.CommonUtils.createTimer(delay, () => { game.camera.shake(0.01, 300 + Math.random() * 100); }, this);
            if (dx == 0)
                dx = (Math.random() - 0.5) * 20;
            var _loop_1 = function (i) {
                var floorHole_ = new Phaser.Sprite(game, this_1.sprite.x + dx + i * dx * 0.35, this_1.sprite.y - 30 * (Math.random() - 0.5), 'fxTexture', 'floorHole_0000');
                floorHole_.anchor.set(0.5, 1);
                floorHole_.scale.x = this_1.facingRight ? 1 : -1;
                floorHole_.scale.set(0.75, 0.75);
                floorHole_.alpha = 0;
                var _scale = 1 - (this_1.sprite.y - floorHole_.y) / 50;
                delay += Math.random() * 100;
                game.add.tween(floorHole_.scale).to({ x: _scale, y: _scale }, 200, Phaser.Easing.Back.Out, true, delay);
                game.add.tween(floorHole_).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true, delay);
                game.add.tween(floorHole_).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 2500 + Math.random() * 750 + delay)
                    .onComplete.add(function () {
                    if (_this.contains(floorHole_))
                        _this.remove(floorHole_, true, false);
                }, this_1);
                floorHole_.play('playing');
                floorHole_.scale.x = this_1.facingRight && this_1.moveRight ? 1 : -1;
                src.GameArea._instance.addUnderHeroes(floorHole_);
            };
            var this_1 = this;
            for (var i = 0; i < num; i++) {
                _loop_1(i);
            }
        };
        Hero.prototype.tryToShowFootSmoke = function (smoke1, smoke2) {
            if (smoke1 === void 0) { smoke1 = true; }
            if (smoke2 === void 0) { smoke2 = true; }
            if (smoke1 && !this.floorSmoke1.parent) {
                this.floorSmoke1.position.set(this.sprite.x - src.Config.HERO_PROP[this.heroName]['footSmokeDxModule'], this.sprite.y - 10);
                this.floorSmoke1.play('playing');
                this.floorSmoke1.scale.x = this.facingRight && this.moveRight ? 1 : -1;
                this.add(this.floorSmoke1);
            }
            if (smoke2 && !this.floorSmoke2.parent) {
                this.floorSmoke2.position.set(this.sprite.x + src.Config.HERO_PROP[this.heroName]['footSmokeDxModule'], this.sprite.y - 10);
                this.floorSmoke2.play('playing');
                this.floorSmoke2.scale.x = this.facingRight && this.moveRight ? 1 : -1;
                this.add(this.floorSmoke2);
            }
        };
        Hero.prototype.showHitBlockedFX = function () {
            var data = [
                { 'key': 'blockedHitEffect1_', 'start': 0, 'stop': 6 },
                { 'key': 'blockedHitEffect2_', 'start': 0, 'stop': 6 },
                { 'key': 'blockedHitEffect3_', 'start': 0, 'stop': 7 },
            ];
            var rdnData = data[Math.floor(data.length * Math.random())];
            var fx = new Phaser.Sprite(game, this.sprite.x + (Math.random() - 0.5) * 50, this.sprite.y - 200 - Math.random() * 50, 'fxTexture', rdnData['key'] + '0000');
            fx.anchor.set(0.5, 0.5);
            fx.scale.x = fx.scale.y = 1 + Math.random() * 0.5;
            fx.scale.x = this.facingRight ? 1 : -1;
            fx.animations.add('playing', Phaser.Animation.generateFrameNames(rdnData['key'], rdnData['start'], rdnData['stop'], '', 4), 30, false);
            fx.play('playing', 20 + Math.ceil(Math.random() * 10), false, true);
            this.parent.add(fx);
        };
        Hero.prototype.applyDamage = function (damageValue, knockDownIfNotBlocked) {
            var _this = this;
            if (knockDownIfNotBlocked === void 0) { knockDownIfNotBlocked = false; }
            if (this.dead)
                return null;
            if (this.blockingAttack) {
                if (Math.random() < 0.66) {
                    this.applyReverseSpeedX(225);
                    if (this.currAnimName == 'block_') {
                        this.sprite.play('hitBlocked');
                        this.showHitBlockedFX();
                    }
                    return Hero.ALL_DAMAGE_BLOCKED;
                }
                this.hp -= damageValue / 3;
                this.refreshHPIndicatorView();
                if (this.hp <= 0) {
                    this.onDie();
                    return Hero.DEAD;
                }
                this.applyReverseSpeedX(100);
                if (this.currAnimName == 'block_') {
                    this.sprite.play('hitBlocked');
                    this.showHitBlockedFX();
                }
                return Hero.SOME_DAMAGE_BLOCKED;
            }
            this.hp -= damageValue; //console.log('damageValue: ',damageValue)
            this.refreshHPIndicatorView();
            if (this.hp <= 0) {
                this.onDie();
                return Hero.DEAD;
            }
            if (knockDownIfNotBlocked && !this.jumpingUp) {
                if (this.playSprite('knock_down_and_get_up_', function () {
                    _this.isKnockedDown = false;
                })) {
                    this.applyReverseSpeedX(225 + Math.random() * 50); // this.sprite.body.velocity.x = 0;
                    this.beingKnockedDownTimes++;
                    this.isKnockedDown = true;
                    if (!this.fallingDown)
                        this.tryToShowFloorHole(this.facingRight ? -50 : 50, Math.random() > 0.5 ? 4 : 3, 350);
                    return Hero.KNOCKED_DOWN;
                }
            }
            this.onHitApplied();
            return Hero.DAMAGE_APPLIED;
        };
        Hero.prototype.refreshHPIndicatorView = function () {
            if (src.GameArea._instance.player == this) {
                src.GameArea._instance.gameWindow.refreshPlayerEnergyIndicator(this.getAlivePercentage());
            }
            else {
                src.GameArea._instance.gameWindow.refreshBotAIEnergyIndicator(this.getAlivePercentage());
            }
        };
        Hero.prototype.onDie = function () {
            this.sprite.body.velocity.x = 0;
            this.deathNum++;
            this.hp = 0;
            if (this.deathNum == 2) {
                this.playSprite('die_');
            }
            else {
                this.playSprite('knock_down_');
            }
            this.dead = true;
            src.GameArea._instance.onRoundEnded('K.O.');
        };
        Hero.prototype.applyReverseSpeedX = function (speedXModule) {
            this.sprite.body.velocity.x = speedXModule * (this.facingRight ? -1 : 1);
            this.spdXImpulseTicker = 0;
            if (!this.isInAir()) {
                this.tryToShowFootSmoke(Math.random() > 0.5, Math.random() > 0.5);
            }
        };
        Hero.prototype.applySpeedX = function (speedXModule) {
            this.sprite.body.velocity.x = speedXModule * (this.facingRight ? 1 : -1);
            this.spdXImpulseTicker = 0;
            if (!this.isInAir()) {
                this.tryToShowFootSmoke(Math.random() > 0.5, Math.random() > 0.5);
            }
        };
        Hero.prototype.onHitApplied = function () {
            var _this = this;
            if (this.attacking) {
                this.resetAttackingData();
            }
            if (this.playSprite(this.isInAir() ? 'hit_air_' :
                (src.Config.HERO_ANIMS[this.heroName].hasOwnProperty('hit2_') ? (Math.random() < 0.65 ? 'hit1_' : 'hit2_') : 'hit1_'), function () {
                _this.isBeingHit = false;
                // this.sprite.body.velocity.x = 0;
            })) {
                this.isBeingHit = true;
                this.applyReverseSpeedX(150 + Math.random() * 25);
                // return Hero.DAMAGE_APPLIED;
            }
            var data = [
                { 'key': 'hitEffect1_', 'start': 0, 'stop': 6 },
                { 'key': 'hitEffect2_', 'start': 0, 'stop': 5 },
                { 'key': 'hitEffect3_', 'start': 0, 'stop': 7 },
            ];
            var rdnData = data[Math.floor(data.length * Math.random())];
            var fx = new Phaser.Sprite(game, this.sprite.x + (Math.random() - 0.5) * 50, this.sprite.y - 200 - Math.random() * 50, 'fxTexture', rdnData['key'] + '0000');
            fx.anchor.set(0.5, 0.5);
            fx.scale.x = fx.scale.y = 1 + Math.random() * 0.5;
            fx.scale.x *= this.facingRight ? 1 : -1;
            fx.animations.add('playing', Phaser.Animation.generateFrameNames(rdnData['key'], rdnData['start'], rdnData['stop'], '', 4), 30, false);
            fx.play('playing', 15 + Math.ceil(Math.random() * 15), false, true);
            this.parent.add(fx);
            // return Hero.NOTHING_HAPPENED;
        };
        Hero.prototype.isInAir = function () {
            return this.jumpingUp || this.fallingDown;
        };
        Hero.prototype.onLevelPassed = function () {
            this.sprite.body.enable = false;
            this.visible = false;
        };
        // public static NOTHING_HAPPENED:string = 'NOTHING_HAPPENED';
        Hero.KNOCKED_DOWN = 'KNOCKED_DOWN';
        Hero.DEAD = 'DEAD';
        Hero.DAMAGE_APPLIED = 'DAMAGE_APPLIED';
        Hero.ALL_DAMAGE_BLOCKED = 'ALL_DAMAGE_BLOCKED';
        Hero.SOME_DAMAGE_BLOCKED = 'SOME_DAMAGE_BLOCKED';
        return Hero;
    }(Phaser.Group));
    src.Hero = Hero;
})(src || (src = {}));
///<reference path="Hero.ts"/>
var src;
(function (src) {
    var Babyduck = /** @class */ (function (_super) {
        __extends(Babyduck, _super);
        function Babyduck() {
            return _super.call(this, 'babyducks') || this;
        }
        Babyduck.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            var _this = this;
            _super.prototype.attachSuperAttackViewToHitterSprite.call(this, hiter, type);
            switch (type) {
                case 'attack_5_':
                    break;
                case 'attack_6_':
                    var shot6Effect_ = new Phaser.Sprite(game, hiter.x, hiter.y, 'babyducks_2', 'shot6Effect_0000');
                    shot6Effect_.anchor.set(0.1, 0.4);
                    shot6Effect_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? 0 : -Math.PI);
                    shot6Effect_.scale.y = 3 + Math.random() * 0.5;
                    shot6Effect_.scale.x = shot6Effect_.scale.y * (this.facingRight ? 1 : -1);
                    shot6Effect_.animations.add('explose', Phaser.Animation.generateFrameNames('shot6Effect_', 0, 29, '', 4), 50, false);
                    shot6Effect_.play('explose', 50, false, true);
                    hiter.parent.addChildAt(shot6Effect_, hiter.parent.getChildIndex(hiter));
                    var attack6HandFire_ = new Phaser.Sprite(game, this.facingRight ? -70 : 45, this.facingRight ? 28 : 15, 'babyducks_2', 'attack6HandFire_0000');
                    attack6HandFire_.anchor.set(0.5, 0.5);
                    attack6HandFire_.scale.x = this.facingRight ? 1 : -1;
                    attack6HandFire_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? Math.PI / 2 : -Math.PI / 2);
                    attack6HandFire_.animations.add('flying', Phaser.Animation.generateFrameNames('attack6HandFire_', 0, 11, '', 4), 30, true);
                    attack6HandFire_.play('flying');
                    hiter.addChild(attack6HandFire_);
                    var attack6Hand_ = new Phaser.Sprite(game, 0, 0, 'babyducks_2', 'attack6Hand_0000');
                    attack6Hand_.anchor.set(0.5, 0.5);
                    attack6Hand_.scale.x = this.facingRight ? 1 : -1;
                    attack6Hand_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? Math.PI / 2 : -3 / 2 * Math.PI);
                    hiter.addChild(attack6Hand_);
                    break;
                case 'attack_7_':
                    var bulletProp_1 = [{ x: -29, y: -20, kf: 1 }, { x: -20, y: 20, kf: 2 }, { x: 44, y: 0, kf: 3 }];
                    for (var i = 0; i < bulletProp_1.length; i++) {
                        var shotEffect_ = new Phaser.Sprite(game, hiter.x + bulletProp_1[i]['x'], hiter.y + bulletProp_1[i]['y'], 'babyducks_1', 'shotEffect_0000');
                        shotEffect_.anchor.set(0.1, 0.4);
                        shotEffect_.scale.y = 3 + Math.random() * 0.5;
                        shotEffect_.scale.x = shotEffect_.scale.y * (this.facingRight ? 1 : -1);
                        shotEffect_.animations.add('explose', Phaser.Animation.generateFrameNames('shotEffect_', 0, 29, '', 4), 30, false);
                        shotEffect_.play('explose', 30, false, true);
                        hiter.parent.addChildAt(shotEffect_, hiter.parent.getChildIndex(hiter));
                    }
                    for (var i = 0; i < bulletProp_1.length; i++) {
                        var bullet_ = new Phaser.Sprite(game, bulletProp_1[i]['x'], bulletProp_1[i]['y'], 'babyducks_1', 'bullet' + bulletProp_1[i]['kf'] + '_0000');
                        bullet_.anchor.set(0.75, 0.5);
                        bullet_.animations.add('flying', Phaser.Animation.generateFrameNames('bullet' + bulletProp_1[i]['kf'] + '_', 0, 3, '', 4), 24, true);
                        bullet_.play('flying');
                        hiter.addChild(bullet_);
                        bullet_.scale.set(0, 0.5);
                        game.add.tween(bullet_.scale).to({ x: this.facingRight ? 1 : -1, y: 1 }, 400).start();
                    }
                    hiter['onHitViewEffect'] = function () {
                        for (var i = 0; i < bulletProp_1.length; i++) {
                            var bulletExplose_ = new Phaser.Sprite(game, hiter.x + bulletProp_1[i]['x'], hiter.y + bulletProp_1[i]['y'], 'babyducks_1', 'bullet' + bulletProp_1[i]['kf'] + 'Explose_0000');
                            bulletExplose_.anchor.set(0, 0.5);
                            bulletExplose_.scale.x = _this.facingRight ? 1 : -1; //this.facingRight
                            bulletExplose_.animations.add('playing', Phaser.Animation.generateFrameNames('bullet' + bulletProp_1[i]['kf'] + 'Explose_', 0, 5, '', 4), 15, false);
                            bulletExplose_.play('playing', 15, false, true);
                            hiter.parent.addChildAt(bulletExplose_, hiter.parent.getChildIndex(hiter) + 1);
                        }
                    };
                    break;
            }
        };
        return Babyduck;
    }(src.Hero));
    src.Babyduck = Babyduck;
})(src || (src = {}));
var src;
(function (src) {
    var BotAI = /** @class */ (function (_super) {
        __extends(BotAI, _super);
        function BotAI(hero) {
            var _this = _super.call(this) || this;
            _this.performAttackAction = null;
            _this.tick = 0;
            _this.hero = hero;
            _this.hero.setHeroActionSignalManager(_this);
            return _this;
        }
        BotAI.prototype.preUpdateAI = function () {
            this.tick++;
            var hap = this.hero.getAlivePercentage();
            var _d = this.hero.enemy.sprite.x - this.hero.sprite.x;
            var _minAllowedDist = 125;
            var _isTooCloseToEnemy = false;
            var _maxAllowedDist = src.Config.MAX_ALLOWED_DISTANCE_BETWEEN_HEROES;
            if (_d > _maxAllowedDist) {
                this.isDowButton['RIGHT'] = true;
                this.isDowButton['LEFT'] = false;
            }
            else if (_d < -_maxAllowedDist) {
                this.isDowButton['RIGHT'] = false;
                this.isDowButton['LEFT'] = true;
            }
            else {
                var _attackRange = 225;
                _isTooCloseToEnemy = Math.abs(_d) < _minAllowedDist;
                if (_isTooCloseToEnemy) {
                    if (_d > 0) {
                        this.isDowButton['RIGHT'] = false;
                        this.isDowButton['LEFT'] = true;
                    }
                    else if (_d < 0) {
                        this.isDowButton['RIGHT'] = true;
                        this.isDowButton['LEFT'] = false;
                    }
                }
                else if (Math.abs(_d) < _attackRange) {
                    if (this.tick % 60 == 0 && Math.random() > 0.5) {
                        this.isDowButton['RIGHT'] = this.isDowButton['LEFT'] = false;
                    }
                    if (this.tick % 6 == 0 && Math.random() > (0.35 + 0.45 * hap) && !this.hero.enemy.dead && !this.hero.enemy.isKnockedDown) {
                        if (Math.random() > (0.55 + 0.3 * hap)) {
                            this.hero.wasCPressedDown = this.isDowButton['C'] = true;
                            this.isDowButton[this.hero.facingRight ? 'RIGHT' : 'LEFT'] = false;
                        }
                        else {
                            if (Math.random() > (0.4 + 0.25 * hap)) {
                                this.isDowButton['DOWN'] = true;
                            }
                            this.performAttackAction = Math.random() > 0.5 ? this.onXDown : this.onZDown;
                        }
                    }
                }
                else {
                    if (this.tick % 50 == 0 && Math.random() > (0.6 + 0.2 * hap) && !this.hero.enemy.dead && !this.hero.enemy.isKnockedDown) {
                        this.hero.wasCPressedDown = this.isDowButton['C'] = true;
                        if (this.hero.enemy.isInAir() || Math.random() > 0.75) {
                            this.isDowButton['UP'] = true;
                        }
                        else {
                            if (this.hero.facingRight) {
                                this.isDowButton['RIGHT'] = true;
                            }
                            else {
                                this.isDowButton['LEFT'] = true;
                            }
                        }
                    }
                    else {
                        if (this.tick % 30 == 0 && Math.random() > 0.25) {
                            if (this.isDowButton['RIGHT'] || this.isDowButton['LEFT']) {
                                if (Math.random() > 0.8) {
                                    this.isDowButton['RIGHT'] = this.isDowButton['LEFT'] = false;
                                }
                            }
                            else {
                                if (Math.random() > 0.5 - hap * 0.35) {
                                    if (_d > 0) {
                                        this.isDowButton['RIGHT'] = true;
                                        this.isDowButton['LEFT'] = false;
                                    }
                                    else if (_d < 0) {
                                        this.isDowButton['RIGHT'] = false;
                                        this.isDowButton['LEFT'] = true;
                                    }
                                }
                                else {
                                    if (_d > 0) {
                                        this.isDowButton['RIGHT'] = false;
                                        this.isDowButton['LEFT'] = true;
                                    }
                                    else if (_d < 0) {
                                        this.isDowButton['RIGHT'] = true;
                                        this.isDowButton['LEFT'] = false;
                                    }
                                }
                            }
                        }
                    }
                }
                if (!this.isDowButton['C']) {
                    if (this.tick % 60 == 0 && this.hero.enemy.superAttackHitters.length == 0 &&
                        (_isTooCloseToEnemy && Math.random() > 0.25
                            || Math.random() > (1 / Math.pow(this.hero.beingKnockedDownTimes + 1, 0.25)) || Math.random() > 0.9)) {
                        var r = Math.random();
                        if (r > 0.9 && !(Math.abs(_d) < _minAllowedDist)) {
                            this.isDowButton['RIGHT'] = this.isDowButton['LEFT'] = false;
                        }
                        else if (r > 0.25) {
                            if (this.hero.facingRight) {
                                this.isDowButton['RIGHT'] = true;
                                this.isDowButton['LEFT'] = false;
                            }
                            else {
                                this.isDowButton['RIGHT'] = false;
                                this.isDowButton['LEFT'] = true;
                            }
                        }
                        else {
                            if (this.hero.facingRight) {
                                this.isDowButton['RIGHT'] = false;
                                this.isDowButton['LEFT'] = true;
                            }
                            else {
                                this.isDowButton['RIGHT'] = true;
                                this.isDowButton['LEFT'] = false;
                            }
                        }
                        this.isDowButton['UP'] = true;
                    }
                }
            }
        };
        BotAI.prototype.postUpdateAI = function () {
            if (this.isDowButton['UP']) {
                this.isDowButton['UP'] = false;
            }
            if (this.isDowButton['C']) {
                this.isDowButton['C'] = false;
            }
            if (this.isDowButton['DOWN']) {
                this.isDowButton['DOWN'] = false;
            }
            if (this.performAttackAction != null) {
                this.performAttackAction.call(this.listenerContext);
                this.performAttackAction = null;
            }
        };
        BotAI.prototype.update = function () {
            if (!this.hero.heroActionSignalManager.isInteractionDisabled && isNaN(this.hero.targetPosXToMoveTo) && !this.hero.enemy.dead) {
                this.preUpdateAI();
            }
            else {
                this.isDowButton['RIGHT'] = this.isDowButton['LEFT'] = false;
            }
            this.hero.updateHero();
            this.postUpdateAI();
        };
        return BotAI;
    }(src.HeroActionSignalManager));
    src.BotAI = BotAI;
})(src || (src = {}));
///<reference path="Hero.ts"/>
var src;
(function (src) {
    var Geese = /** @class */ (function (_super) {
        __extends(Geese, _super);
        function Geese() {
            return _super.call(this, 'geese') || this;
        }
        Geese.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            _super.prototype.attachSuperAttackViewToHitterSprite.call(this, hiter, type);
            switch (type) {
                case 'attack_5_':
                    break;
                case 'attack_6_':
                    for (var k = 0; k < 5; k++) {
                        var dx = (this.facingRight ? (k - 5 / 2) * 10 : (5 / 2 - k) * 10) + Math.random() * 40;
                        var dy = (k - 5 / 2) * 10 + Math.random() * 10;
                        var shot6Effect_ = new Phaser.Sprite(game, hiter.x + dx, hiter.y + dy, 'geese_2', 'shot6Effect_0000');
                        shot6Effect_.anchor.set(0.1, 0.4);
                        shot6Effect_.scale.set(1.5, 1.5);
                        shot6Effect_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? 0 : -Math.PI);
                        // shot6Effect_.scale.y = 3 + Math.random() * 0.5;
                        shot6Effect_.scale.x *= shot6Effect_.scale.y * (this.facingRight ? 1 : -1);
                        shot6Effect_.animations.add('explose', Phaser.Animation.generateFrameNames('shot6Effect_', 0, 29, '', 4), 50, false);
                        shot6Effect_.play('explose', 60, false, true);
                        hiter.parent.addChildAt(shot6Effect_, hiter.parent.getChildIndex(hiter));
                        var minirocket_ = new Phaser.Sprite(game, /*this.facingRight?-70:45 + */ dx, /*this.facingRight?28:15  + */ dy, 'warlock_2', 'minirocket_0000');
                        minirocket_.anchor.set(0.5, 0.5);
                        minirocket_.scale.set(1.5, 1.5);
                        minirocket_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + Math.PI / 4;
                        minirocket_.animations.add('flying', Phaser.Animation.generateFrameNames('minirocket_', 0, 11, '', 4), 30, true);
                        minirocket_.play('flying');
                        hiter.addChild(minirocket_);
                    }
                    break;
                case 'attack_7_':
                    var bullet_1 = new Phaser.Sprite(game, 0, 0, 'geese_1', 'bullet_0000');
                    bullet_1.anchor.set(0.5, 0.5);
                    // bullet_.scale.x *= this.facingRight ? 1 : -1;
                    bullet_1.animations.add('playing', Phaser.Animation.generateFrameNames('bullet_', 0, 7, '', 4), 15, true);
                    bullet_1.play('playing');
                    bullet_1.scale.set(0, 0);
                    game.add.tween(bullet_1.scale).to({ x: 2.5, y: 2.5 }, 100).start();
                    hiter.addChild(bullet_1);
                    hiter['onHitViewEffect'] = function () {
                        var bulletExplose_ = new Phaser.Sprite(game, hiter.x, hiter.y, 'geese_1', 'bulletExplose_0000');
                        bulletExplose_.anchor.set(0.5, 0.5);
                        bulletExplose_.scale.x = bulletExplose_.scale.y = bullet_1.scale.x;
                        bulletExplose_.animations.add('playing', Phaser.Animation.generateFrameNames('bulletExplose_', 0, 5, '', 4), 15, false);
                        bulletExplose_.play('playing', 15, false, true);
                        hiter.parent.addChildAt(bulletExplose_, hiter.parent.getChildIndex(hiter) + 1);
                    };
                    break;
            }
        };
        return Geese;
    }(src.Hero));
    src.Geese = Geese;
})(src || (src = {}));
///<reference path="Hero.ts"/>
var src;
(function (src) {
    var Guardian = /** @class */ (function (_super) {
        __extends(Guardian, _super);
        function Guardian() {
            return _super.call(this, 'guardian') || this;
        }
        Guardian.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            _super.prototype.attachSuperAttackViewToHitterSprite.call(this, hiter, type);
            switch (type) {
                case 'attack_5_':
                    break;
                case 'attack_6_':
                    var shot6Effect_ = new Phaser.Sprite(game, hiter.x, hiter.y, 'guardian_2', 'shot6Effect_0000');
                    shot6Effect_.anchor.set(0.1, 0.4);
                    shot6Effect_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? Math.PI / 12 : -Math.PI / 12);
                    shot6Effect_.scale.y = 2;
                    shot6Effect_.scale.x = shot6Effect_.scale.y * (this.facingRight ? 1 : 1);
                    shot6Effect_.animations.add('explose', Phaser.Animation.generateFrameNames('shot6Effect_', 0, 29, '', 4), 50, false);
                    shot6Effect_.play('explose', 50, false, true);
                    hiter.parent.addChildAt(shot6Effect_, hiter.parent.getChildIndex(hiter));
                    var shot6Bus_ = new Phaser.Sprite(game, 0 + (this.facingRight ? 50 : -100), this.facingRight ? -50 : -50, 'guardian_2', 'shot6Bus_0000');
                    shot6Bus_.anchor.set(0.5, 0.5);
                    shot6Bus_.scale.x = this.facingRight ? 1 : -1;
                    shot6Bus_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? Math.PI / 4 : -Math.PI - Math.PI / 4);
                    hiter.addChild(shot6Bus_);
                    hiter.body.allowGravity = true;
                    hiter.body.gravity.set(0, 1200);
                    break;
                case 'attack_7_':
                    var theAttack_7_ = new Phaser.Sprite(game, hiter.x + (this.facingRight ? 55 : -55), hiter.y, 'guardian_1', 'theAttack_7_0000');
                    theAttack_7_.anchor.set(0, 0.5);
                    theAttack_7_.scale.x = this.facingRight ? 1.25 : -1.25;
                    theAttack_7_.animations.add('playing', Phaser.Animation.generateFrameNames('theAttack_7_', 0, 28, '', 4), 60, false);
                    theAttack_7_.play('playing', 60, false, true);
                    hiter.parent.addChildAt(theAttack_7_, hiter.parent.getChildIndex(hiter));
                    break;
            }
        };
        return Guardian;
    }(src.Hero));
    src.Guardian = Guardian;
})(src || (src = {}));
///<reference path="Hero.ts"/>
var src;
(function (src) {
    var Snowball = /** @class */ (function (_super) {
        __extends(Snowball, _super);
        function Snowball() {
            return _super.call(this, 'snowball') || this;
        }
        Snowball.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            _super.prototype.attachSuperAttackViewToHitterSprite.call(this, hiter, type);
            switch (type) {
                case 'attack_5_':
                    break;
                case 'attack_6_':
                    var minirocket_ = void 0;
                    for (var k = 0; k < 2; k++) {
                        var dx = (this.facingRight ? (k - 5 / 2) * 10 : (5 / 2 - k) * 10) + Math.random() * 50;
                        var dy = (k - 5 / 2) * 10;
                        var shot6Effect_ = new Phaser.Sprite(game, hiter.x + dx, hiter.y + dy, 'snowball_2', 'shot6Effect_0000');
                        shot6Effect_.anchor.set(0.1, 0.4);
                        shot6Effect_.scale.set(2, 2);
                        shot6Effect_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? 0 : -Math.PI);
                        // shot6Effect_.scale.y = 3 + Math.random() * 0.5;
                        shot6Effect_.scale.x *= shot6Effect_.scale.y * (this.facingRight ? 1 : -1);
                        shot6Effect_.animations.add('explose', Phaser.Animation.generateFrameNames('shot6Effect_', 0, 29, '', 4), 50, false);
                        shot6Effect_.play('explose', 60, false, true);
                        hiter.parent.addChildAt(shot6Effect_, hiter.parent.getChildIndex(hiter));
                        minirocket_ = new Phaser.Sprite(game, /*this.facingRight?-70:45 + */ dx, /*this.facingRight?28:15  + */ dy, 'snowball_2', 'bullet_0000');
                        minirocket_.anchor.set(0.5, 0.5);
                        minirocket_.scale.x = minirocket_.scale.y = 1.25 + Math.random() * 0.25;
                        minirocket_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + Math.PI / 4;
                        minirocket_.animations.add('flying', Phaser.Animation.generateFrameNames('bullet_', 0, 4, '', 4), 10, true);
                        minirocket_.play('flying');
                        hiter.addChild(minirocket_);
                    }
                    break;
                case 'attack_7_':
                    var bullet_2 = new Phaser.Sprite(game, 0, 0, 'snowball_1', 'bullet_0000');
                    bullet_2.anchor.set(0.5, 0.5);
                    bullet_2.scale.x = bullet_2.scale.y = this.facingRight ? 1 : -1;
                    bullet_2.animations.add('playing', Phaser.Animation.generateFrameNames('bullet_', 0, 4, '', 4), 15, true);
                    bullet_2.play('playing');
                    hiter.addChild(bullet_2);
                    hiter['onHitViewEffect'] = function () {
                        var bulletExplose_ = new Phaser.Sprite(game, hiter.x, hiter.y, 'snowball_1', 'bulletExplose_0000');
                        bulletExplose_.anchor.set(0.5, 0.5);
                        bulletExplose_.scale.x = bulletExplose_.scale.y = bullet_2.scale.x;
                        bulletExplose_.animations.add('playing', Phaser.Animation.generateFrameNames('bulletExplose_', 0, 5, '', 4), 15, false);
                        bulletExplose_.play('playing', 15, false, true);
                        hiter.parent.addChildAt(bulletExplose_, hiter.parent.getChildIndex(hiter) + 1);
                    };
                    break;
            }
        };
        return Snowball;
    }(src.Hero));
    src.Snowball = Snowball;
})(src || (src = {}));
///<reference path="Hero.ts"/>
var src;
(function (src) {
    var VHS = /** @class */ (function (_super) {
        __extends(VHS, _super);
        function VHS() {
            return _super.call(this, 'VHS') || this;
        }
        VHS.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            _super.prototype.attachSuperAttackViewToHitterSprite.call(this, hiter, type);
            switch (type) {
                case 'attack_5_':
                    break;
                case 'attack_6_':
                    var theAttack_6_ = new Phaser.Sprite(game, hiter.x + (this.facingRight ? 50 : -50), hiter.y, 'VHS_1', 'theAttack_7_0000');
                    theAttack_6_.anchor.set(0, 0.5);
                    theAttack_6_.scale.x = this.facingRight ? 1.25 : -1.25;
                    theAttack_6_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? 0 : -Math.PI);
                    theAttack_6_.animations.add('playing', Phaser.Animation.generateFrameNames('theAttack_7_', 0, 28, '', 4), 60, false);
                    theAttack_6_.play('playing', 60, false, true);
                    hiter.parent.addChildAt(theAttack_6_, hiter.parent.getChildIndex(hiter));
                    break;
                case 'attack_7_':
                    var theAttack_7_ = new Phaser.Sprite(game, hiter.x + (this.facingRight ? -40 : 40), hiter.y, 'VHS_1', 'theAttack_7_0000');
                    theAttack_7_.anchor.set(0, 0.5);
                    theAttack_7_.scale.x = this.facingRight ? 1.25 : -1.25;
                    theAttack_7_.animations.add('playing', Phaser.Animation.generateFrameNames('theAttack_7_', 0, 28, '', 4), 60, false);
                    theAttack_7_.play('playing', 60, false, true);
                    hiter.parent.addChildAt(theAttack_7_, hiter.parent.getChildIndex(hiter));
                    break;
            }
        };
        return VHS;
    }(src.Hero));
    src.VHS = VHS;
})(src || (src = {}));
///<reference path="Hero.ts"/>
var src;
(function (src) {
    var Warlock = /** @class */ (function (_super) {
        __extends(Warlock, _super);
        function Warlock() {
            return _super.call(this, 'warlock') || this;
        }
        Warlock.prototype.attachSuperAttackViewToHitterSprite = function (hiter, type) {
            _super.prototype.attachSuperAttackViewToHitterSprite.call(this, hiter, type);
            switch (type) {
                case 'attack_5_':
                    break;
                case 'attack_6_':
                    var minirocket_ = void 0;
                    for (var k = 0; k < 5; k++) {
                        var dx = (this.facingRight ? (k - 5 / 2) * 10 : (5 / 2 - k) * 10) + Math.random() * 40;
                        var dy = (k - 5 / 2) * 10;
                        var shot6Effect_ = new Phaser.Sprite(game, hiter.x + dx, hiter.y + dy, 'warlock_2', 'shot6Effect_0000');
                        shot6Effect_.anchor.set(0.1, 0.4);
                        shot6Effect_.scale.set(1.5, 1.5);
                        shot6Effect_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + (this.facingRight ? 0 : -Math.PI);
                        // shot6Effect_.scale.y = 3 + Math.random() * 0.5;
                        shot6Effect_.scale.x *= shot6Effect_.scale.y * (this.facingRight ? 1 : -1);
                        shot6Effect_.animations.add('explose', Phaser.Animation.generateFrameNames('shot6Effect_', 0, 29, '', 4), 50, false);
                        shot6Effect_.play('explose', 60, false, true);
                        hiter.parent.addChildAt(shot6Effect_, hiter.parent.getChildIndex(hiter));
                        minirocket_ = new Phaser.Sprite(game, /*this.facingRight?-70:45 + */ dx, /*this.facingRight?28:15  + */ dy, 'warlock_2', 'minirocket_0000');
                        minirocket_.anchor.set(0.5, 0.5);
                        minirocket_.scale.x = minirocket_.scale.y = 0.75 + Math.random() * 0.75;
                        minirocket_.rotation = Math.atan2(hiter.body.velocity.y, hiter.body.velocity.x) + Math.PI / 4;
                        minirocket_.animations.add('flying', Phaser.Animation.generateFrameNames('minirocket_', 0, 4, '', 4), 10, true);
                        minirocket_.play('flying');
                        hiter.addChild(minirocket_);
                    }
                    break;
                case 'attack_7_':
                    var bullet_3 = new Phaser.Sprite(game, 0, 0, 'warlock_1', 'bullet_0000');
                    bullet_3.anchor.set(0.5, 0.5);
                    bullet_3.scale.x = bullet_3.scale.y = this.facingRight ? 2.5 : -2.5;
                    bullet_3.animations.add('playing', Phaser.Animation.generateFrameNames('bullet_', 0, 4, '', 4), 15, true);
                    bullet_3.play('playing');
                    hiter.addChild(bullet_3);
                    hiter['onHitViewEffect'] = function () {
                        var bulletExplose_ = new Phaser.Sprite(game, hiter.x, hiter.y, 'warlock_1', 'bulletExplose_0000');
                        bulletExplose_.anchor.set(0.5, 0.5);
                        bulletExplose_.scale.x = bulletExplose_.scale.y = bullet_3.scale.x;
                        bulletExplose_.animations.add('playing', Phaser.Animation.generateFrameNames('bulletExplose_', 0, 5, '', 4), 15, false);
                        bulletExplose_.play('playing', 15, false, true);
                        hiter.parent.addChildAt(bulletExplose_, hiter.parent.getChildIndex(hiter) + 1);
                    };
                    break;
            }
        };
        return Warlock;
    }(src.Hero));
    src.Warlock = Warlock;
})(src || (src = {}));
var src;
(function (src) {
    var FightPromo = /** @class */ (function (_super) {
        __extends(FightPromo, _super);
        function FightPromo(fightProgressModel) {
            var _this = _super.call(this, game, null) || this;
            _this.fightProgressModel = fightProgressModel;
            _this.playerHeroName = _this.fightProgressModel.playerHeroName;
            _this.botHeroName = _this.fightProgressModel.botHeroName;
            FightPromo._instance = _this;
            return _this;
        }
        FightPromo.prototype.prepare = function () {
            var _this = this;
            this.bg = new Phaser.Graphics(game);
            this.bg.inputEnabled = true;
            this.bg.beginFill(0xFFE9C0, 1);
            this.bg.drawRect(0, 0, game.width, game.height);
            this.bg.endFill();
            this.add(this.bg);
            var slides = [];
            var ds = [
                { x: 76, y: 275, sx: 76 - 500, bk: 'trans_slide_0_blue_0000' },
                { x: 175, y: 269, sx: 175 - 500, bk: 'trans_slide_1_blue_0000' },
                { x: 294, y: 273, sx: 294 - 600, bk: 'trans_slide_2_blue_0000' }
            ];
            for (var i = 0; i < ds.length; i++) {
                var sb_ = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', ds[i]['bk']);
                sb_.anchor.set(0.5, 0.5);
                var s = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', 'trans_slide_' + i + '_orange_0000');
                s.anchor.set(0.5, 0.5);
                s['sb_'] = sb_;
                slides.push(s);
                this.add(sb_);
                this.add(s);
                s['sx'] = sb_['sx'] = ds[i]['sx'];
                game.add.tween(s['sb_']).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, 175 + i * 100);
                game.add.tween(s).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, i * 100);
            }
            ds = [
                { x: game.width - 76, y: 275, sx: game.width - 76 + 500, bk: 'trans_slide_0_orange_0000' },
                { x: game.width - 175, y: 269, sx: game.width - 175 + 500, bk: 'trans_slide_1_orange_0000' },
                { x: game.width - 294, y: 273, sx: game.width - 294 + 600, bk: 'trans_slide_2_orange_0000' }
            ];
            for (var i = 0; i < ds.length; i++) {
                var sb_ = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', ds[i]['bk']);
                sb_.anchor.set(0.5, 0.5);
                var s = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', 'trans_slide_' + i + '_blue_0000');
                sb_.scale.x = s.scale.x = -1;
                s.anchor.set(0.5, 0.5);
                s['sb_'] = sb_;
                slides.push(s);
                this.add(sb_);
                this.add(s);
                s['sx'] = sb_['sx'] = ds[i]['sx'];
                game.add.tween(s['sb_']).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, 175 + i * 100);
                game.add.tween(s).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, i * 100);
            }
            var player_characterPanel_ = new Phaser.Sprite(game, -700, 0, 'hud', 'characterPanel_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.playerHeroName));
            var txtCntr = src.CommonUtils.createTextField(20, 30, game.getLocaleText(this.playerHeroName + '_controller'), 27, '#000000', 'Calgary Script OT', 0);
            txtCntr.anchor.set(0, 0);
            player_characterPanel_.addChild(txtCntr);
            var txtName = src.CommonUtils.createTextField(15, 65, game.getLocaleText(this.playerHeroName + '_RepresentName'), 60, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0);
            txtName.anchor.set(0, 0);
            player_characterPanel_.addChild(txtName);
            this.add(player_characterPanel_);
            game.add.tween(player_characterPanel_).to({ x: 0 }, 750, Phaser.Easing.Back.Out, true, 500);
            var bot_characterPanel_ = new Phaser.Sprite(game, game.width + 700, 0, 'hud', 'right_characterPanel_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.botHeroName));
            bot_characterPanel_.anchor.set(1, 0);
            txtCntr = src.CommonUtils.createTextField(-20, 30, game.getLocaleText(this.botHeroName + '_controller'), 27, '#000000', 'Calgary Script OT', 0);
            txtCntr.anchor.set(1, 0);
            // txtCntr.scale.x = -1;
            bot_characterPanel_.addChild(txtCntr);
            txtName = src.CommonUtils.createTextField(-15, 65, game.getLocaleText(this.botHeroName + '_RepresentName'), 60, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0);
            txtName.anchor.set(1, 0);
            // txtName.scale.x = -1;
            bot_characterPanel_.addChild(txtName);
            this.add(bot_characterPanel_);
            // bot_characterPanel_.scale.x = -1;
            game.add.tween(bot_characterPanel_).to({ x: game.width }, 750, Phaser.Easing.Back.Out, true, 500);
            var trans_mid_ = new Phaser.Sprite(game, game.width / 2, -550, 'hud', 'trans_mid_0000');
            trans_mid_.anchor.set(0.5, 0.5);
            this.add(trans_mid_);
            game.add.tween(trans_mid_).to({ y: 180 }, 750, Phaser.Easing.Back.Out, true, 500)
                .onComplete.addOnce(function () {
                game.add.tween(trans_mid_).to({ y: 260 }, 2000, Phaser.Easing.Back.Out, true)
                    .onComplete.addOnce(function () {
                    src.CommonUtils.createTimer(500, function () {
                        src.CommonUtils.changeCurrentView(new src.GameWindow(_this.fightProgressModel));
                    }, _this);
                    //hide all
                    game.add.tween(trans_mid_).to({ y: -550 }, 500, Phaser.Easing.Back.In, true);
                    game.add.tween(loading_).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                    game.add.tween(player_characterPanel_).to({ x: -700 }, 750, Phaser.Easing.Back.In, true, 500);
                    game.add.tween(bot_characterPanel_).to({ x: game.width + 700 }, 750, Phaser.Easing.Back.In, true, 500);
                    for (var i = 0; i < slides.length; i++) {
                        game.add.tween(slides[i]['sb_']).to({ x: slides[i]['sx'] }, 500, Phaser.Easing.Back.In, true, 175 + i * 100);
                        game.add.tween(slides[i]).to({ x: slides[i]['sx'] }, 500, Phaser.Easing.Back.In, true, i * 100);
                    }
                    game.add.tween(txtPrk).to({ alpha: 0 }, 500, Phaser.Easing.Default, true);
                    game.add.tween(txtVS).to({ alpha: 0 }, 500, Phaser.Easing.Default, true);
                    game.add.tween(player_character_mc_blue_).to({ x: game.width / 2 - 700 }, 600, Phaser.Easing.Back.In, false, 150)
                        .to({ alpha: 0 }, 50).start();
                    game.add.tween(player_character_mc_white_).to({ x: game.width / 2 - 700 }, 600, Phaser.Easing.Back.In, false, 75)
                        .to({ alpha: 0 }, 50).start();
                    game.add.tween(player_character_mc_).to({ x: game.width / 2 - 700 }, 600, Phaser.Easing.Back.In, true);
                    game.add.tween(bot_character_mc_blue_).to({ x: game.width / 2 + 700 }, 600, Phaser.Easing.Back.In, false, 150)
                        .to({ alpha: 0 }, 50).start();
                    game.add.tween(bot_character_mc_white_).to({ x: game.width / 2 + 700 }, 600, Phaser.Easing.Back.In, false, 75)
                        .to({ alpha: 0 }, 50).start();
                    game.add.tween(bot_character_mc_).to({ x: game.width / 2 + 700 }, 600, Phaser.Easing.Back.In, true);
                    game.add.tween(player_heroShadow).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
                    game.add.tween(bot_heroShadow).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
                    game.tweens.removeFrom(loading_);
                    game.add.tween(loading_).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                    game.add.tween(ltf).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                }, _this);
            }, this);
            var txtVS = src.CommonUtils.createTextField(game.width / 2, game.height / 2 + 150, game.getLocaleText('VS'), 150, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0, '#000000', 4);
            this.add(txtVS);
            txtVS.alpha = 0;
            game.add.tween(txtVS).to({ alpha: 1, y: game.height / 2 - 50 }, 750, Phaser.Easing.Default, true, 500);
            var txtPrk = src.CommonUtils.createTextField(game.width / 2, game.height / 2 + 150, game.getLocaleText('THE PARK'), 45, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0);
            this.add(txtPrk);
            txtPrk.alpha = 0;
            game.add.tween(txtPrk).to({ alpha: 1, y: game.height / 2 - 165 }, 750, Phaser.Easing.Default, true, 500);
            var loading_ = new Phaser.Sprite(game, game.width / 2, 420, 'hud', 'loading_0000');
            loading_.anchor.set(0.5, 0.5);
            loading_.alpha = 0;
            game.add.tween(loading_).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            game.add.tween(loading_).to({ angle: 360 }, 500, Phaser.Easing.Back.Out, true, 0, -1);
            this.add(loading_);
            var ltf = src.CommonUtils.createTextField(game.width / 2, 455, game.getLocaleText('loading'), 33, '#FF4600', 'Calgary Script OT', 0, '#FFE9C0', 4);
            ltf.alpha = 0;
            game.add.tween(ltf).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.add(ltf);
            var player_heroShadow = new Phaser.Sprite(game, game.width / 2 - 165, game.height / 2 + 217 + 40, 'gameAreaTexture', 'heroShadow_0000');
            player_heroShadow.anchor.set(0.5, 0.5);
            player_heroShadow.alpha = 0;
            game.add.tween(player_heroShadow).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            this.add(player_heroShadow);
            var ad = src.Config.HERO_ANIMS[this.playerHeroName]['idle_'];
            var player_character_mc_blue_ = new Phaser.Sprite(game, game.width / 2 - 700, game.height / 2 + 230 + 40, 'hud', 'hShadowWhite_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.playerHeroName));
            player_character_mc_blue_.tint = 0x27A9DB;
            player_character_mc_blue_.anchor.set(0.5, 1);
            var player_character_mc_white_ = new Phaser.Sprite(game, game.width / 2 - 700, game.height / 2 + 230 + 40, 'hud', 'hShadowWhite_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.playerHeroName));
            player_character_mc_white_.tint = 0xFF4600;
            player_character_mc_white_.anchor.set(0.5, 1);
            var player_character_mc_ = new Phaser.Sprite(game, game.width / 2 - 700, game.height / 2 + 230 + 40, ad['key'], 'idle_0000');
            player_character_mc_.animations.add('idle_', Phaser.Animation.generateFrameNames(ad['prefix'], ad['start'], ad['stop'], '', 4), 60, true);
            player_character_mc_.play('idle_');
            player_character_mc_.anchor.set(0.5, 1);
            this.add(player_character_mc_blue_);
            this.add(player_character_mc_white_);
            this.add(player_character_mc_);
            game.add.tween(player_character_mc_blue_).to({ x: game.width / 2 - 165 }, 600, Phaser.Easing.Back.Out, false, 150)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(player_character_mc_white_).to({ x: game.width / 2 - 165 }, 600, Phaser.Easing.Back.Out, false, 75)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(player_character_mc_).to({ x: game.width / 2 - 165 }, 600, Phaser.Easing.Back.Out, true);
            var bot_heroShadow = new Phaser.Sprite(game, game.width / 2 + 165, game.height / 2 + 217 + 40, 'gameAreaTexture', 'heroShadow_0000');
            bot_heroShadow.anchor.set(0.5, 0.5);
            bot_heroShadow.alpha = 0;
            game.add.tween(bot_heroShadow).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            this.add(bot_heroShadow);
            ad = src.Config.HERO_ANIMS[this.botHeroName]['idle_'];
            var bot_character_mc_blue_ = new Phaser.Sprite(game, game.width / 2 + 700, game.height / 2 + 230 + 40, 'hud', 'hShadowWhite_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.botHeroName));
            bot_character_mc_blue_.tint = 0x27A9DB;
            bot_character_mc_blue_.scale.x = -1;
            bot_character_mc_blue_.anchor.set(0.5, 1);
            var bot_character_mc_white_ = new Phaser.Sprite(game, game.width / 2 + 700, game.height / 2 + 230 + 40, 'hud', 'hShadowWhite_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.botHeroName));
            bot_character_mc_white_.tint = 0xFF4600;
            bot_character_mc_white_.scale.x = -1;
            bot_character_mc_white_.anchor.set(0.5, 1);
            var bot_character_mc_ = new Phaser.Sprite(game, game.width / 2 + 700, game.height / 2 + 230 + 40, ad['key'], 'idle_0000');
            bot_character_mc_.animations.add('idle_', Phaser.Animation.generateFrameNames(ad['prefix'], ad['start'], ad['stop'], '', 4), 60, true);
            bot_character_mc_.play('idle_');
            bot_character_mc_.scale.x = -1;
            bot_character_mc_.anchor.set(0.5, 1);
            this.add(bot_character_mc_blue_);
            this.add(bot_character_mc_white_);
            this.add(bot_character_mc_);
            game.add.tween(bot_character_mc_blue_).to({ x: game.width / 2 + 165 }, 600, Phaser.Easing.Back.Out, false, 150)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(bot_character_mc_white_).to({ x: game.width / 2 + 165 }, 600, Phaser.Easing.Back.Out, false, 75)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(bot_character_mc_).to({ x: game.width / 2 + 165 }, 600, Phaser.Easing.Back.Out, true);
        };
        return FightPromo;
    }(Phaser.Group));
    src.FightPromo = FightPromo;
})(src || (src = {}));
var src;
(function (src) {
    var GameArea = /** @class */ (function (_super) {
        __extends(GameArea, _super);
        function GameArea(gameWindow) {
            var _this = _super.call(this, game, null) || this;
            _this.areaHeight = 700;
            _this.areaWidth = 1700;
            _this.skyYPos = -200;
            _this.floorYPos = 495 + 50;
            _this.isPaused = false;
            _this.playerMovingBackLocked = false;
            _this.defCamMovDiv = 10;
            _this.camMovDiv = _this.defCamMovDiv;
            _this.debugPoint = new Phaser.Point();
            _this.isTimeLeft = false;
            _this.isRoundAlreadyEnded = false;
            GameArea._instance = _this;
            _this.gameWindow = gameWindow;
            return _this;
        }
        GameArea.prototype.setMonochromeFilter = function () {
            var sprts = [this.bg0, this.bg1, this.GameComplex_gameForeground_, this.fg,
                this.player.sprite, this.botAI.hero.sprite, this.leftInnerMC, this.rightInnerMC];
            sprts = sprts.concat(this.destructableElements);
            if (game.renderType == Phaser.WEBGL) {
                var gray = game.add.filter('Gray');
                for (var _i = 0, sprts_1 = sprts; _i < sprts_1.length; _i++) {
                    var s = sprts_1[_i];
                    s.filters = [gray];
                }
            }
            else {
                for (var _a = 0, sprts_2 = sprts; _a < sprts_2.length; _a++) {
                    var s = sprts_2[_a];
                    s.tint = 0x0FC71;
                }
            }
        };
        GameArea.prototype.createInnerMC = function (x, y, playerName) {
            var imc = new Phaser.Sprite(game, x, y, 'gameAreaTexture', 'inner_mc_' + playerName + '_0000');
            imc.anchor.set(0.5, 1);
            this.bg1.addChild(imc);
            imc.animations.add('playing', Phaser.Animation.generateFrameNames('inner_mc_' + playerName + '_', src.Config.INNER_MC_PLAYING[playerName]['start'], src.Config.INNER_MC_PLAYING[playerName]['stop'], '', 4), 30, true);
            imc.play('playing');
            return imc;
        };
        // public tmp:Phaser.Sprite;
        GameArea.prototype.createDestructableDecor = function () {
            this.destructableElements = [];
            for (var kind in src.Config.DESTRUCTABLE_DECOR) {
                var data = src.Config.DESTRUCTABLE_DECOR[kind];
                for (var _i = 0, _a = data['inst']; _i < _a.length; _i++) {
                    var inst = _a[_i];
                    var dd = new Phaser.Sprite(game, inst['x'], inst['y'], 'gameAreaTexture', kind + '0000');
                    dd['destructableAnimsNameLeft'] = [];
                    for (var aKey in src.Config.DESTRUCTABLE_DECOR[kind]['anim']) {
                        dd.animations.add(aKey, Phaser.Animation.generateFrameNames(kind, data['anim'][aKey]['start'], data['anim'][aKey]['stop'], '', 4), 30, false);
                        if (aKey.indexOf('hit') >= 0)
                            dd['destructableAnimsNameLeft'].push(aKey);
                    }
                    if (inst.hasOwnProperty('scale')) {
                        dd.scale.set(inst['scale'], inst['scale']);
                    }
                    if (inst.hasOwnProperty('scaleX')) {
                        dd.scale.x = inst['scaleX'];
                    }
                    dd.play('def');
                    switch (inst['parent']) {
                        case 'bg_1_':
                            this.bg1.addChild(dd);
                            break;
                        case 'GameComplex_gameForeground_':
                            this.GameComplex_gameForeground_.addChild(dd);
                            break;
                    }
                    dd.anchor.set(0.5, 1);
                    //this.tmp = dd;
                    this.destructableElements.push(dd);
                }
            }
            var srtFn = function (sc) {
                var _chldr = sc.children.slice();
                _chldr = _chldr.sort(function (a, b) { return a.y - b.y; });
                sc.removeChildren();
                for (var _i = 0, _chldr_1 = _chldr; _i < _chldr_1.length; _i++) {
                    var _c = _chldr_1[_i];
                    sc.addChild(_c);
                }
            };
            srtFn(this.bg1);
            srtFn(this.GameComplex_gameForeground_);
        };
        GameArea.prototype.switchPausedState = function () {
            this.setPaused(!this.isPaused);
        };
        GameArea.prototype.setPaused = function (paused) {
            game.physics.arcade['isPaused'] = paused;
            if (paused) {
                for (var _i = 0, _a = game.tweens.getAll(); _i < _a.length; _i++) {
                    var tw = _a[_i];
                    if (!tw['ignorePause']) {
                        tw.pause();
                    }
                }
                src.CommonUtils.setPausedTimers(true);
            }
            else {
                for (var _b = 0, _e = game.tweens.getAll(); _b < _e.length; _b++) {
                    var tw = _e[_b];
                    if (tw.isPaused) {
                        tw.resume();
                    }
                }
                src.CommonUtils.setPausedTimers(false);
            }
            this.isPaused = paused;
            this.setSpritesPaused(this.isPaused);
            this.gameWindow.onGamePaused(this.isPaused);
        };
        GameArea.prototype.setSpritesPaused = function (paused) {
            this.leftInnerMC.animations.paused = this.rightInnerMC.animations.paused
                = this.player.sprite.animations.paused = this.botAI.hero.sprite.animations.paused = paused;
        };
        GameArea.prototype.prepare = function () {
            game.physics.arcade['isPaused'] = false;
            this.bg0 = new Phaser.Sprite(game, -50, this.skyYPos + 50, 'gameAreaTexture', 'bg_0_0000');
            this.add(this.bg0);
            this.bg1 = new Phaser.Sprite(game, -50, game.height, 'gameAreaTexture', 'bg_1_0000');
            this.bg1.anchor.set(0, 0.98);
            this.add(this.bg1);
            this.leftMinXPos = 100;
            this.rightMaxXPos = this.areaWidth - this.leftMinXPos;
            this.levelBoundariesHiters = [];
            var h = game.add.sprite(0, this.floorYPos);
            h.body.setSize(this.areaWidth, 100, 0, 0);
            h.body.allowGravity = false;
            h.body.immovable = true;
            this.levelBoundariesHiters.push(h);
            this.add(h);
            h = game.add.sprite(0, this.skyYPos - 100);
            h.body.setSize(this.areaWidth, 100, 0, 0);
            h.body.allowGravity = false;
            h.body.immovable = true;
            this.levelBoundariesHiters.push(h);
            this.add(h);
            h = game.add.sprite(0, 0);
            h.body.setSize(this.leftMinXPos, this.game.height, 0, 0);
            h.body.allowGravity = false;
            h.body.immovable = true;
            this.levelBoundariesHiters.push(h);
            this.add(h);
            h = game.add.sprite(this.rightMaxXPos, 0);
            h.body.setSize(100, this.game.height, 0, 0);
            h.body.allowGravity = false;
            h.body.immovable = true;
            this.levelBoundariesHiters.push(h);
            this.add(h);
            this.botAI = new src.BotAI(this.createHeroByClassName(this.gameWindow.fightProgressModel.botHeroName));
            this.botAI.hero.setPosition(1000 + 600, 420 + 50);
            this.botAI.hero.deathNum = this.gameWindow.fightProgressModel.playerRoundWinsNum;
            this.add(this.botAI.hero);
            this.player = this.createHeroByClassName(this.gameWindow.fightProgressModel.playerHeroName);
            this.player.setPosition(675 - 600, 420 + 50);
            this.player.deathNum = this.gameWindow.fightProgressModel.botAIRoundWinsNum;
            this.player.setHeroActionSignalManager(src.InputManager.instance);
            this.add(this.player);
            this.player.setEnemy(this.botAI.hero);
            this.botAI.hero.setEnemy(this.player);
            this.player.moveToXPos(575);
            this.botAI.hero.moveToXPos(1100);
            this.addUnderHeroes(this.player.heroShadow);
            this.addUnderHeroes(this.botAI.hero.heroShadow);
            this.GameComplex_gameForeground_ = new Phaser.Sprite(game, 180, this.bg1.y /*, 'gameAreaTexture', 'GameComplex_gameForeground_0000'*/);
            this.GameComplex_gameForeground_['dy'] = 9;
            this.GameComplex_gameForeground_.y += this.GameComplex_gameForeground_['dy'];
            this.GameComplex_gameForeground_.anchor.set(0, 1);
            this.add(this.GameComplex_gameForeground_);
            this.fg = new Phaser.Sprite(game, -50, game.height, 'gameAreaTexture', 'fg_0000');
            this.fg.anchor.set(0, 0.98);
            this.add(this.fg);
            // this.fg.visible = false;
            this.createDestructableDecor();
            this.leftInnerMC = this.createInnerMC(800, -90, this.player.heroName);
            this.rightInnerMC = this.createInnerMC(900, -90, this.botAI.hero.heroName);
            this.timeLeftSec = 90;
            this.gameWindow.refreshTimeLeftTimerTxt(this.timeLeftSec);
        };
        GameArea.prototype.startTimerCountdown = function () {
            var _this = this;
            this.timeLeftTimer = src.CommonUtils.createTimerRepeat(1000, this.timeLeftSec, function () {
                _this.timeLeftSec--;
                _this.gameWindow.refreshTimeLeftTimerTxt(_this.timeLeftSec);
            }, this);
            this.timeLeftTimer.onComplete.add(this.onTimeLeft, this);
        };
        GameArea.prototype.addUnderHeroes = function (child) {
            this.addAt(child, this.getIndex(this.botAI.hero));
        };
        GameArea.prototype.createHeroByClassName = function (className) {
            switch (className) {
                case 'babyducks': return new src.Babyduck();
                case 'geese': return new src.Geese();
                case 'VHS': return new src.VHS();
                case 'snowball': return new src.Snowball();
                case 'guardian': return new src.Guardian();
                case 'warlock': return new src.Warlock();
            }
            return null;
        };
        GameArea.prototype.crashDestructableElements = function (aroundHero) {
            var hpos = aroundHero.sprite.position.clone();
            for (var k = this.destructableElements.length - 1; k >= 0; k--) {
                var de = this.destructableElements[k];
                var pos = de.position.clone();
                if (Math.abs(hpos.x - pos.x) < 135) {
                    if (de['destructableAnimsNameLeft'].length > 0) {
                        de.play(de['destructableAnimsNameLeft'].shift());
                    }
                }
            }
        };
        GameArea.prototype.update = function () {
            if (this.isPaused)
                return;
            if (!this.botAI.hero.isInAir() && !this.player.isInAir()
                && !this.botAI.hero.dead && !this.player.dead
                && !this.botAI.hero.isKnockedDown && !this.player.isKnockedDown) {
                game.physics.arcade.collide(this.botAI.hero.sprite, this.player.sprite);
            }
            for (var _i = 0, _a = this.levelBoundariesHiters; _i < _a.length; _i++) {
                var b = _a[_i];
                game.physics.arcade.collide(this.botAI.hero.sprite, b);
            }
            this.botAI.update();
            this.rightInnerMC.scale.x = this.botAI.hero.sprite.x > 897 ? 1 : -1;
            for (var _b = 0, _e = this.levelBoundariesHiters; _b < _e.length; _b++) {
                var b = _e[_b];
                game.physics.arcade.collide(this.player.sprite, b);
            }
            this.player.updateHero();
            if (Math.abs(this.player.sprite.x - this.botAI.hero.sprite.x) > src.Config.MAX_ALLOWED_DISTANCE_BETWEEN_HEROES) {
                if (this.player.facingRight) {
                    if (this.player.sprite.body.velocity.x < 0) {
                        this.player.sprite.body.velocity.x = 0;
                    }
                }
                else {
                    if (this.player.sprite.body.velocity.x > 0) {
                        this.player.sprite.body.velocity.x = 0;
                    }
                }
                if (!this.playerMovingBackLocked) {
                    this.camMovDiv = this.defCamMovDiv * 4;
                }
                this.playerMovingBackLocked = true;
            }
            else {
                this.playerMovingBackLocked = false;
                // this.camMovDiv = this.defCamMovDiv;
            }
            this.leftInnerMC.scale.x = this.player.sprite.x > 803 ? 1 : -1;
            if (isNaN(this.player.targetPosXToMoveTo) && isNaN(this.botAI.hero.targetPosXToMoveTo)) {
                this.updateCamera();
            }
            else {
                this.x = -415;
                this.GameComplex_gameForeground_.x = this.x * 0.08 + 48;
                this.fg.x = this.x * 0.59;
            }
            // this.debug();
        };
        GameArea.prototype.updateCamera = function () {
            var enemyCoef = 0.5;
            var _d = Math.abs(this.player.sprite.x - this.botAI.hero.sprite.x);
            if (_d != 0) {
                enemyCoef = 0.5 * 650 / _d;
                enemyCoef = Math.pow(enemyCoef, 3);
                if (enemyCoef < 0)
                    enemyCoef = 0;
                if (enemyCoef > 0.5)
                    enemyCoef = 0.5;
            }
            // console.log(enemyCoef)
            var _x = (this.player.sprite.x * (1 - enemyCoef) + this.botAI.hero.sprite.x * enemyCoef) / this.areaWidth * game.width;
            if (this.playerMovingBackLocked) {
                _x = this.player.facingRight ? this.player.sprite.x - this.leftMinXPos : this.player.sprite.x - game.width + (this.areaWidth - this.rightMaxXPos);
            }
            if (this.camMovDiv != this.defCamMovDiv)
                this.camMovDiv += (this.defCamMovDiv - this.camMovDiv) / this.defCamMovDiv;
            if (_x < 0)
                _x = 0;
            if (_x > this.rightMaxXPos - game.width)
                _x = this.rightMaxXPos - game.width;
            _x = -_x;
            this.x += (_x - this.x) / this.camMovDiv;
            this.GameComplex_gameForeground_.x = this.x * 0.08 + 48;
            this.fg.x = this.x * 0.59;
            enemyCoef = 0.5;
            var _y = (this.floorYPos - (this.player.sprite.y * (1 - enemyCoef) + this.botAI.hero.sprite.y * enemyCoef)) / this.areaHeight * 0.75 * game.height;
            if (_y < this.skyYPos)
                _y = this.skyYPos;
            if (_y > -this.skyYPos)
                _y = -this.skyYPos;
            this.y += (_y - this.y) / 10;
            this.bg0.y = (this.skyYPos + 50 - this.y * 0.2);
            this.GameComplex_gameForeground_.y = (game.height + this.y * 0.2) + this.GameComplex_gameForeground_['dy'];
            this.fg.y = game.height + this.y * 0.6;
        };
        GameArea.prototype.debug = function () {
            for (var _i = 0, _a = this.levelBoundariesHiters; _i < _a.length; _i++) {
                var b = _a[_i];
                game.debug.body(b);
            }
            game.debug.body(this.player.sprite);
            if (this.player.attackHitter)
                game.debug.body(this.player.attackHitter);
            this.debugPoint.set(this.player.sprite.x, this.player.sprite.y);
            game.debug.geom(this.debugPoint, 'rgb(255,00,0)');
            for (var _b = 0, _e = this.player.superAttackHitters; _b < _e.length; _b++) {
                var h = _e[_b];
                game.debug.body(h);
            }
            game.debug.body(this.botAI.hero.sprite);
        };
        GameArea.prototype.onTimeLeft = function () {
            this.isTimeLeft = true;
            // SoundController.instance.destroySound('sound918');
            // SoundController.instance.playSound('sound929');
            console.log('tiem left');
            this.onRoundEnded('TIME UP');
        };
        /**
         * @param {string} status 'K.O.' or 'TIME UP'
         */
        GameArea.prototype.onRoundEnded = function (status) {
            var _this = this;
            if (this.isRoundAlreadyEnded)
                return;
            this.isRoundAlreadyEnded = true;
            if (this.botAI.hero.getAlivePercentage() > this.player.getAlivePercentage()) {
                this.gameWindow.fightProgressModel.botAIRoundWinsNum++;
                var d = this.gameWindow.showRoundStartEndView(game.getLocaleText(status), game.getLocaleText('YOU LOSE'), false, false);
                if (this.gameWindow.fightProgressModel.botAIRoundWinsNum >= 2) {
                    src.CommonUtils.createTimer(d, function () {
                        _this.setSpritesPaused(true);
                        _this.gameWindow.showYouLose(_this.botAI.hero.heroName);
                    }, this);
                    console.log('game loose');
                }
                else {
                    src.CommonUtils.createTimer(d, function () {
                        _this.gameWindow.nextRound();
                    }, this);
                    console.log('round loose');
                }
            }
            else {
                this.gameWindow.fightProgressModel.playerRoundWinsNum++;
                var d = this.gameWindow.showRoundStartEndView(game.getLocaleText(status), game.getLocaleText('YOU WIN!'), false, false);
                if (this.gameWindow.fightProgressModel.playerRoundWinsNum >= 2) {
                    console.log('you win game using' + this.botAI.hero.heroName);
                    src.CommonUtils.createTimer(d, function () {
                        _this.setSpritesPaused(true);
                        if (_this.gameWindow.fightProgressModel.isAllEnemiesDefeated()) {
                            _this.gameWindow.showYouWonGame(_this.player.heroName);
                        }
                        else {
                            _this.gameWindow.showYouAreWinner(_this.player.heroName);
                        }
                    }, this);
                }
                else {
                    src.CommonUtils.createTimer(d, function () {
                        _this.gameWindow.nextRound();
                    }, this);
                    console.log('your win this round');
                }
            }
            if (this.isTimeLeft) {
                this.timeLeftTimer.onComplete.removeAll(this);
                src.CommonUtils.destroyTimer(this.timeLeftTimer);
            }
            this.setHeroesActionSignalManagerInteractionDisabled(true);
        };
        GameArea.prototype.setHeroesActionSignalManagerInteractionDisabled = function (disabled) {
            this.player.heroActionSignalManager.isInteractionDisabled = disabled;
            this.botAI.hero.heroActionSignalManager.isInteractionDisabled = disabled;
        };
        GameArea.prototype.destroy = function () {
            src.InputManager.instance.destroy();
            for (var _i = 0, _a = game.tweens.getAll(); _i < _a.length; _i++) {
                var tw = _a[_i];
                if (!tw['ignorePause']) {
                    game.tweens.remove(tw);
                }
            }
            src.CommonUtils.removeAllTimers();
            // GameArea._instance = null;
            _super.prototype.destroy.call(this);
        };
        return GameArea;
    }(Phaser.Group));
    src.GameArea = GameArea;
})(src || (src = {}));
var src;
(function (src) {
    var GameWindow = /** @class */ (function (_super) {
        __extends(GameWindow, _super);
        function GameWindow(/*playerHeroName:string, botHeroName:string, playerRoundWinsNum:number, botAIRoundWinsNum:number, */ fightProgressModel) {
            var _this = _super.call(this, game, null) || this;
            _this.pausedTF = null;
            _this.comboView = null;
            _this.roundStartEndView = null;
            _this.fightProgressModel = fightProgressModel;
            // this.playerHeroName = playerHeroName;
            // this.botHeroName = botHeroName;
            // this.playerRoundWinsNum = playerRoundWinsNum;
            // this.botAIRoundWinsNum = botAIRoundWinsNum;
            _this.gameArea = new src.GameArea(_this);
            GameWindow._instance = _this;
            return _this;
        }
        GameWindow.prototype.prepare = function () {
            var _this = this;
            this.add(this.gameArea);
            this.createUI();
            this.gameArea.prepare();
            src.InputManager.instance.create(this.uiLayer);
            this.refreshPlayerEnergyIndicator(this.gameArea.player.getAlivePercentage());
            this.refreshBotAIEnergyIndicator(this.gameArea.botAI.hero.getAlivePercentage());
            this.gameArea.setHeroesActionSignalManagerInteractionDisabled(true);
            this.add(this.sndBtn = src.SoundController.instance.getButtonsContainer(game.width - 30, this.pause_btn_.y));
            this.uiLayer.alpha = 0;
            src.CommonUtils.createTimer(src.CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, function () {
                var f = function () {
                    var d = _this.showRoundStartEndView(game.getLocaleText('ROUND') + ' ' + (_this.fightProgressModel.playerRoundWinsNum + _this.fightProgressModel.botAIRoundWinsNum + 1), game.getLocaleText('FIGHT!'), true, true);
                    src.CommonUtils.createTimer(d, function () {
                        _this.gameArea.setHeroesActionSignalManagerInteractionDisabled(false);
                        _this.gameArea.startTimerCountdown();
                    }, _this);
                    game.add.tween(_this.uiLayer).to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
                };
                if (src.Tutorial.instance.playShowing(function () {
                    _this.remove(src.Tutorial.instance, true);
                    f();
                }, _this)) {
                    _this.addAt(src.Tutorial.instance, _this.getIndex(_this.sndBtn));
                }
                else {
                    f();
                }
            }, this);
        };
        GameWindow.prototype.createUI = function () {
            var _this = this;
            this.uiLayer = new Phaser.Group(game, null);
            this.add(this.uiLayer);
            this.energyBG_ = new Phaser.Sprite(game, game.width / 2, 55, 'hud', 'energyBG_0000');
            this.energyBG_.anchor.set(0.5, 0.5);
            this.uiLayer.add(this.energyBG_);
            this.hero_energyIndicator_ = new Phaser.Sprite(game, 71, this.energyBG_.y - 20, 'hud', 'energyIndicator_0000');
            this.hero_energyIndicator_.anchor.set(0, 0);
            this.uiLayer.add(this.hero_energyIndicator_);
            this.hero_energyIndicator_['maskObj'] = new Phaser.Graphics(game);
            this.hero_energyIndicator_['maskObj'].beginFill();
            this.hero_energyIndicator_['maskObj'].drawRect(this.hero_energyIndicator_.x, this.hero_energyIndicator_.y, this.hero_energyIndicator_.width, this.hero_energyIndicator_.height);
            this.hero_energyIndicator_['maskObj'].endFill();
            this.hero_energyIndicator_.mask = this.hero_energyIndicator_['maskObj'];
            // this.uiLayer.add((<Phaser.Graphics>this.hero_energyIndicator_['maskObj']));
            this.hero_energyIndicator_['maskObj']['percentage'] = 1;
            this.enemy_energyIndicator_ = new Phaser.Sprite(game, game.width - this.hero_energyIndicator_.x, this.hero_energyIndicator_.y, 'hud', 'enemy_energyIndicator_0000');
            this.enemy_energyIndicator_.anchor.set(0, 0);
            this.enemy_energyIndicator_.scale.x = -1;
            this.uiLayer.add(this.enemy_energyIndicator_);
            this.enemy_energyIndicator_['maskObj'] = new Phaser.Graphics(game);
            this.enemy_energyIndicator_['maskObj'].beginFill();
            this.enemy_energyIndicator_['maskObj'].drawRect(this.enemy_energyIndicator_.x, this.enemy_energyIndicator_.y, this.enemy_energyIndicator_.width, this.enemy_energyIndicator_.height);
            this.enemy_energyIndicator_['maskObj'].endFill();
            this.enemy_energyIndicator_.mask = this.enemy_energyIndicator_['maskObj'];
            // this.uiLayer.add((<Phaser.Graphics>this.enemy_energyIndicator_['maskObj']));
            this.enemy_energyIndicator_['maskObj']['percentage'] = 1;
            this.hero_heroHeadInd_ = new Phaser.Sprite(game, 40, this.energyBG_.y, 'hud', 'heroHeadInd_000' +
                +src.Config.HERO_NAMES_SEQUENCE.indexOf(this.fightProgressModel.playerHeroName));
            this.hero_heroHeadInd_.anchor.set(0.5, 0.5);
            this.uiLayer.add(this.hero_heroHeadInd_);
            this.enemy_heroHeadInd_ = new Phaser.Sprite(game, game.width - 40, this.energyBG_.y, 'hud', 'heroHeadInd_000'
                + src.Config.HERO_NAMES_SEQUENCE.indexOf(this.fightProgressModel.botHeroName));
            this.enemy_heroHeadInd_.anchor.set(0.5, 0.5);
            this.enemy_heroHeadInd_.scale.x = -1;
            this.uiLayer.add(this.enemy_heroHeadInd_);
            this.uiLayer.add(src.CommonUtils.createTextField(72, 30, game.getLocaleText(this.fightProgressModel.playerHeroName).toUpperCase(), 18, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#B25F46', 3, null, 0));
            this.uiLayer.add(src.CommonUtils.createTextField(777, 30, game.getLocaleText(this.fightProgressModel.botHeroName).toUpperCase(), 18, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#B25F46', 3, null, 1));
            this.pause_btn_ = new Phaser.Sprite(game, game.width - 85, 480 + 50, 'hud', 'pause_btn_0000');
            this.pause_btn_.anchor.set(0, 0.5);
            this.pause_btn_.inputEnabled = true;
            this.pause_btn_.input.useHandCursor = true;
            this.pause_btn_.events.onInputOver.add(function () {
                _this.pause_btn_.tint = 0xFF6706;
            }, this);
            this.pause_btn_.events.onInputOut.add(function () {
                _this.pause_btn_.tint = 0xFFFFFF;
            }, this);
            this.pause_btn_.events.onInputUp.add(function () {
                _this.gameArea.switchPausedState();
            }, this);
            this.uiLayer.add(this.pause_btn_);
            this.hero_roundWinInd_arr = [];
            for (var i = 0; i < 2; i++) {
                var rw = new Phaser.Sprite(game, 0, 0, 'hud', 'roundWinInd_0000');
                rw.anchor.set(0.5, 0.5);
                this.uiLayer.add(rw);
                this.hero_roundWinInd_arr.push(rw);
            }
            this.hero_roundWinInd_arr[0].position.set(361, 61.5);
            this.hero_roundWinInd_arr[1].position.set(343, 61.5);
            this.enemy_roundWinInd_arr = [];
            for (var i = 0; i < 2; i++) {
                var rw = new Phaser.Sprite(game, 0, 0, 'hud', 'enemy_roundWinInd_0000');
                rw.anchor.set(0.5, 0.5);
                this.uiLayer.add(rw);
                this.enemy_roundWinInd_arr.push(rw);
            }
            this.enemy_roundWinInd_arr[0].position.set(487, 61.75);
            this.enemy_roundWinInd_arr[1].position.set(505.5, 61.75);
            this.refreshWinsNumIndicator();
            this.timeLeftTxt = src.CommonUtils.createTextField(game.width / 2, 76, '', 78, '#FFE8BE', 'DINNextLTPro-BoldCondensed', 0, '#67808C', 5);
            this.uiLayer.add(this.timeLeftTxt);
            this.uiLayer.add(src.CommonUtils.createTextField(game.width / 2, 31, game.getLocaleText('time'), 23, '#FFE8C0', 'Calgary Script OT', 0, '#66848E', 4));
        };
        GameWindow.prototype.onGamePaused = function (isPaused) {
            if (!this.pausedTF) {
                this.pausedTF = src.CommonUtils.createTextField(game.width / 2, game.height / 2, game.getLocaleText('PAUSE'), 150, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#637171', 6);
            }
            if (isPaused) {
                this.setTopUIElementsVisible(false);
                this.uiLayer.add(this.pausedTF);
            }
            else {
                this.setTopUIElementsVisible(true);
                if (this.uiLayer.contains(this.pausedTF))
                    this.uiLayer.remove(this.pausedTF, false);
            }
        };
        GameWindow.prototype.showComboView = function (comboNum) {
            var _this = this;
            if (!this.comboView) {
                this.comboView = new Phaser.Group(game, null);
                var comboBG1_ = new Phaser.Sprite(game, 0, 0, 'hud', 'comboBG1_0000');
                comboBG1_.anchor.set(0.5, 0.5);
                this.comboView['comboBG1_'] = comboBG1_;
                this.comboView.add(comboBG1_);
                var comboBG2_ = new Phaser.Sprite(game, 0, 0, 'hud', 'comboBG2_0000');
                comboBG2_.anchor.set(0.5, 0.5);
                this.comboView['comboBG2_'] = comboBG2_;
                this.comboView.add(comboBG2_);
                var numTF = src.CommonUtils.createTextField(0, 0, '', 110, '#FFE8BE', 'DINNextLTPro-BoldCondensed', 0, '#FF6706', 5);
                this.comboView['numTF'] = numTF;
                this.comboView.add(numTF);
                var textTF = src.CommonUtils.createTextField(47, 0, game.getLocaleText('hits!'), 28, '#FFE8BF', 'Calgary Script OT', 0, '#FF6706', 3, null, 0.5);
                this.comboView['textTF'] = textTF;
                this.comboView.add(textTF);
            }
            this.comboView['numTF'].text = comboNum + '';
            this.comboView['numTF'].x = -150;
            this.comboView['comboBG1_'].x = -150;
            this.comboView['comboBG2_'].x = -150;
            this.comboView['textTF'].x = -150;
            game.add.tween(this.comboView['numTF']).to({ x: 0 }, 500, Phaser.Easing.Back.Out, true, 150);
            game.add.tween(this.comboView['textTF']).to({ x: 45 }, 400, Phaser.Easing.Back.Out, true, 125);
            game.add.tween(this.comboView['comboBG1_']).to({ x: 15 }, 350, Phaser.Easing.Back.Out, true, 100);
            game.add.tween(this.comboView['comboBG2_']).to({ x: 60 }, 300, Phaser.Easing.Back.Out, true, 0);
            game.tweens.removeFrom(this.comboView, false);
            game.add.tween(this.comboView).to({}, 1250).start().onComplete.addOnce(function () {
                game.add.tween(_this.comboView).to({ x: -150 }, 350).start().onComplete.addOnce(function () {
                    if (_this.uiLayer.contains(_this.comboView))
                        _this.uiLayer.remove(_this.comboView, false);
                }, _this);
            }, this);
            this.comboView.position.set(35, 175);
            this.uiLayer.add(this.comboView);
        };
        GameWindow.prototype.showRoundStartEndView = function (txt1, txt2, hide, showWhiteBG) {
            var _this = this;
            if (showWhiteBG === void 0) { showWhiteBG = false; }
            if (!this.roundStartEndView) {
                this.roundStartEndView = new Phaser.Group(game, null);
                this.roundStartEndView['rend_black_'] = new Phaser.Sprite(game, 0, 0, 'hud', 'rend_black_0000');
                this.roundStartEndView['rend_black_'].anchor.set(0.5, 0.5);
                this.roundStartEndView.add(this.roundStartEndView['rend_black_']);
                this.roundStartEndView['rend_white_'] = new Phaser.Sprite(game, 0, 0, 'hud', 'rend_white_0000');
                this.roundStartEndView['rend_white_'].anchor.set(0.5, 0.5);
                this.roundStartEndView.add(this.roundStartEndView['rend_white_']);
                this.roundStartEndView['rend_1_'] = new Phaser.Sprite(game, 0, 0, 'hud', 'rend_1_0000');
                this.roundStartEndView['rend_1_'].anchor.set(0.5, 0.5);
                this.roundStartEndView.add(this.roundStartEndView['rend_1_']);
                this.roundStartEndView['rend_2_'] = new Phaser.Sprite(game, 0, 5, 'hud', 'rend_2_0000');
                this.roundStartEndView['rend_2_'].anchor.set(0.5, 0.5);
                this.roundStartEndView.add(this.roundStartEndView['rend_2_']);
                this.roundStartEndView['rend_3_'] = new Phaser.Sprite(game, 0, -2, 'hud', 'rend_3_0000');
                this.roundStartEndView['rend_3_'].anchor.set(0.5, 0.5);
                this.roundStartEndView.add(this.roundStartEndView['rend_3_']);
                this.roundStartEndView['tf1'] = src.CommonUtils.createTextField(0, 0, txt1, 225, '#FFE8BE', 'DINNextLTPro-BoldCondensed', -100, '#FF6706', 8);
                this.roundStartEndView['tf1'].wordWrap = true;
                this.roundStartEndView['tf1'].wordWrapWidth = 850;
                this.roundStartEndView.add(this.roundStartEndView['tf1']);
                this.roundStartEndView['tf2'] = src.CommonUtils.createTextField(0, 0, txt2, 190, '#FFE8BE', 'DINNextLTPro-BoldCondensed', -75, '#FF6706', 8);
                this.roundStartEndView['tf2'].wordWrap = true;
                this.roundStartEndView['tf2'].wordWrapWidth = 850;
                this.roundStartEndView.add(this.roundStartEndView['tf2']);
            }
            if (showWhiteBG) {
                this.roundStartEndView['rend_white_'].alpha = 1;
                this.roundStartEndView['rend_white_'].scale.y = 0;
                game.add.tween(this.roundStartEndView['rend_white_'].scale).to({ y: 1 }, 750 - 350, Phaser.Easing.Back.Out, true);
            }
            else {
                this.roundStartEndView['rend_white_'].alpha = 0;
            }
            this.roundStartEndView['tf1'].text = txt1;
            this.roundStartEndView['tf2'].text = txt2;
            this.roundStartEndView['tf1'].alpha = 0;
            this.roundStartEndView['tf2'].alpha = 0;
            this.roundStartEndView['rend_black_'].scale.y = 0;
            game.add.tween(this.roundStartEndView['rend_black_'].scale).to({ y: 1 }, 750 - 350, Phaser.Easing.Back.Out, true);
            this.roundStartEndView['rend_1_'].x = 0;
            game.add.tween(this.roundStartEndView['rend_1_']).to({ x: 12 + 30 }, 500 - 150, Phaser.Easing.Back.Out, true);
            this.roundStartEndView['rend_2_'].x = 0;
            game.add.tween(this.roundStartEndView['rend_2_']).to({ x: 85 + 30 }, 450 - 150, Phaser.Easing.Back.Out, true);
            this.roundStartEndView['rend_3_'].x = 0;
            game.add.tween(this.roundStartEndView['rend_3_']).to({ x: 175 + 30 }, 750 - 150, Phaser.Easing.Back.Out, true);
            this.roundStartEndView['tf1'].scale.set(0, 0);
            game.add.tween(this.roundStartEndView['tf1'].scale).to({ x: 0.9, y: 1 }, 750 - 350, Phaser.Easing.Back.Out, true);
            this.roundStartEndView['tf1'].alpha = 0;
            game.add.tween(this.roundStartEndView['tf1']).to({ alpha: 1 }, 750 - 350, Phaser.Easing.Linear.None, true);
            src.CommonUtils.createTimer(1250 - 350, function () {
                if (showWhiteBG) {
                    game.add.tween(_this.roundStartEndView['rend_white_'].scale).to({ y: 0.5 }, 500 - 150, Phaser.Easing.Back.Out, true);
                    game.add.tween(_this.roundStartEndView['rend_white_']).to({ alpha: 0 }, 500 - 150, Phaser.Easing.Back.Out, true);
                }
                game.add.tween(_this.roundStartEndView['rend_black_'].scale).to({ y: 0.5 }, 750 - 150, Phaser.Easing.Back.Out, true, 0, 0, true);
                game.add.tween(_this.roundStartEndView['rend_1_']).to({ x: 12 + 30 - 10 }, 500 - 150, Phaser.Easing.Back.Out, true, 0, 0, true);
                game.add.tween(_this.roundStartEndView['rend_1_'].scale).to({ x: 0.5, y: 0.75 }, 800 - 350, Phaser.Easing.Back.Out, true, 0, 0, true);
                game.add.tween(_this.roundStartEndView['rend_2_']).to({ x: 85 + 30 - 25 }, 450 - 150, Phaser.Easing.Back.Out, true, 0, 0, true);
                game.add.tween(_this.roundStartEndView['rend_2_'].scale).to({ x: 0.5, y: 0.75 }, 900 - 350, Phaser.Easing.Back.Out, true, 0, 0, true);
                2;
                game.add.tween(_this.roundStartEndView['rend_3_']).to({ x: 175 + 30 - 20 }, 650 - 150, Phaser.Easing.Back.Out, true, 0, 0, true);
                game.add.tween(_this.roundStartEndView['rend_3_'].scale).to({ x: 0.5, y: 0.75 }, 750 - 350, Phaser.Easing.Back.Out, true, 0, 0, true);
                game.add.tween(_this.roundStartEndView['tf1']).to({ alpha: 0 }, 400 - 350, Phaser.Easing.Linear.None, true, 500);
                _this.roundStartEndView['tf2'].scale.set(0, 0.75);
                game.add.tween(_this.roundStartEndView['tf2'].scale).to({ x: 0.9, y: 1 }, 750 - 350, Phaser.Easing.Back.Out, true, 500);
                game.add.tween(_this.roundStartEndView['tf2']).to({ alpha: 1 }, 500 - 350, Phaser.Easing.Linear.None, true, 500);
                if (hide) {
                    src.CommonUtils.createTimer(2000 - 350, function () {
                        game.add.tween(_this.roundStartEndView.scale).to({ y: 0.75 }, 450 - 150, Phaser.Easing.Linear.None, true);
                        game.add.tween(_this.roundStartEndView).to({ alpha: 0 }, 450 - 150, Phaser.Easing.Linear.None, true)
                            .onComplete.addOnce(function () {
                            if (_this.uiLayer.contains(_this.roundStartEndView))
                                _this.uiLayer.remove(_this.roundStartEndView, false);
                        }, _this);
                    }, _this);
                }
            }, this);
            game.tweens.removeFrom(this.roundStartEndView, false);
            this.roundStartEndView.position.set(game.width / 2, this.game.height / 2);
            this.roundStartEndView.alpha = 1;
            this.uiLayer.add(this.roundStartEndView);
            return 1250 - 350 + 2000 - 350 + (hide ? 450 - 150 : 0);
        };
        GameWindow.prototype.refreshTimeLeftTimerTxt = function (timeLeftSec) {
            this.timeLeftTxt.text = timeLeftSec + "";
            if (timeLeftSec <= 10) {
                this.timeLeftTxt.addColor('#FF4E00', 0);
            }
        };
        GameWindow.prototype.refreshWinsNumIndicator = function () {
            for (var i = 0; i < this.hero_roundWinInd_arr.length; i++)
                this.hero_roundWinInd_arr[i].alpha = 0;
            for (var i = 0; i < this.fightProgressModel.playerRoundWinsNum; i++)
                this.hero_roundWinInd_arr[i].alpha = 1;
            for (var i = 0; i < this.enemy_roundWinInd_arr.length; i++)
                this.enemy_roundWinInd_arr[i].alpha = 0;
            for (var i = 0; i < this.fightProgressModel.botAIRoundWinsNum; i++)
                this.enemy_roundWinInd_arr[i].alpha = 1;
        };
        GameWindow.prototype.refreshPlayerEnergyIndicator = function (percent /*0..1*/) {
            var _this = this;
            var f = function () {
                _this.hero_energyIndicator_['maskObj'].clear();
                _this.hero_energyIndicator_['maskObj'].beginFill();
                _this.hero_energyIndicator_['maskObj'].drawRect(_this.hero_energyIndicator_.x, _this.hero_energyIndicator_.y, _this.hero_energyIndicator_.width * _this.hero_energyIndicator_['maskObj']['percentage'], _this.hero_energyIndicator_.height);
                _this.hero_energyIndicator_['maskObj'].endFill();
            };
            game.tweens.removeFrom(this.hero_energyIndicator_['maskObj']);
            var t = game.add.tween(this.hero_energyIndicator_['maskObj']).to({ 'percentage': percent }, 250, Phaser.Easing.Linear.None, true);
            t.onUpdateCallback(f, this);
            t.onComplete.addOnce(f, this);
        };
        GameWindow.prototype.refreshBotAIEnergyIndicator = function (percent /*0..1*/) {
            var _this = this;
            var f = function () {
                _this.enemy_energyIndicator_['maskObj'].clear();
                _this.enemy_energyIndicator_['maskObj'].beginFill();
                _this.enemy_energyIndicator_['maskObj'].drawRect(_this.enemy_energyIndicator_.x, _this.enemy_energyIndicator_.y, _this.enemy_energyIndicator_.width * _this.enemy_energyIndicator_['maskObj']['percentage'], _this.enemy_energyIndicator_.height);
                _this.enemy_energyIndicator_['maskObj'].endFill();
            };
            game.tweens.removeFrom(this.enemy_energyIndicator_['maskObj']);
            var t = game.add.tween(this.enemy_energyIndicator_['maskObj']).to({ 'percentage': percent }, 250, Phaser.Easing.Linear.None, true);
            t.onUpdateCallback(f, this);
            t.onComplete.addOnce(f, this);
        };
        GameWindow.prototype.nextRound = function () {
            src.CommonUtils.changeCurrentView(new GameWindow(this.fightProgressModel));
        };
        GameWindow.prototype.nextEnemyBotAI = function () {
            this.fightProgressModel.nextBot();
            src.CommonUtils.changeCurrentView(new src.FightPromo(this.fightProgressModel));
        };
        GameWindow.prototype.replayThisFight = function () {
            this.fightProgressModel.replayThisFight();
            src.CommonUtils.changeCurrentView(new src.FightPromo(this.fightProgressModel));
        };
        GameWindow.prototype.setTopUIElementsVisible = function (visible) {
            for (var _i = 0, _a = this.uiLayer.children; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c != this.pause_btn_)
                    c.visible = visible;
            }
            this.sndBtn.visible = visible;
        };
        GameWindow.prototype.showYouAreWinner = function (winnerHeroName) {
            var _this = this;
            this.setTopUIElementsVisible(false);
            this.gameArea.setMonochromeFilter();
            var ytw = new Phaser.Group(game, null);
            var slides = [];
            var ds = [
                { x: 111, y: 468 - 40 + 50, sx: 111 - 950, bk: 'slidewin_0_back_0000' },
                { x: 340, y: 447 - 40 + 50, sx: 340 - 950, bk: 'slidewin_1_back_0000' },
                { x: 644, y: 421 - 40 + 50, sx: 644 - 950, bk: 'slidewin_2_0000' }
            ];
            for (var i = 0; i < ds.length; i++) {
                var sb_ = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', ds[i]['bk']);
                sb_.anchor.set(0.5, 0.5);
                var s = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', 'slidewin_' + i + '_0000');
                s.anchor.set(0.5, 0.5);
                s['sb_'] = sb_;
                slides.push(s);
                ytw.add(sb_);
                ytw.add(s);
                game.add.tween(s['sb_']).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, 175 + i * 100);
                game.add.tween(s).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, i * 100);
            }
            var btnNext = new Phaser.Sprite(game, 705, 486 + 350 + 50, 'hud', 'btnContine_0000');
            btnNext.anchor.set(0.5, 0.5);
            btnNext.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            btnNext.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            btnNext.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            btnNext.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            btnNext.inputEnabled = true;
            btnNext.input.useHandCursor = true;
            btnNext.events.onInputOver.add(function () { btnNext.play('over'); }, this);
            btnNext.events.onInputOut.add(function () { btnNext.play('out'); }, this);
            btnNext.events.onInputDown.add(function () { btnNext.play('down'); }, this);
            btnNext.events.onInputUp.add(function () { btnNext.play('up'); }, this);
            btnNext.events.onInputUp.addOnce(function () {
                _this.nextEnemyBotAI();
            }, this);
            btnNext['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Next'), 30, '#FEE7C1', 'Lighthouse Personal Use');
            btnNext.addChild(btnNext['txtLabel']);
            this.add(btnNext);
            game.add.tween(btnNext).to({ y: 460 + 50 }, 750, Phaser.Easing.Back.Out, true);
            var winner_mc_red = new Phaser.Sprite(game, -650, 0, 'hud', 'winner_mc_red_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_red.anchor.set(0.5, 0.5);
            winner_mc_red.scale.set(4, 4);
            var winner_mc_blue = new Phaser.Sprite(game, -650, 0, 'hud', 'winner_mc_blue_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_blue.anchor.set(0.5, 0.5);
            winner_mc_blue.scale.set(4, 4);
            var winner_mc_ = new Phaser.Sprite(game, -650, 0, 'hud', 'winner_mc_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_.anchor.set(0.5, 0.5);
            ytw.add(winner_mc_red);
            ytw.add(winner_mc_blue);
            ytw.add(winner_mc_);
            game.add.tween(winner_mc_red).to({ x: 305, y: 275 + 50 }, 600, Phaser.Easing.Back.Out, false, 300)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(winner_mc_blue).to({ x: 305, y: 275 + 50 }, 600, Phaser.Easing.Back.Out, false, 150)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(winner_mc_).to({ x: 305, y: 275 + 50 }, 600, Phaser.Easing.Back.Out, true);
            var tfytw = src.CommonUtils.createTextField(game.width + 150, game.height + 100 + 50, game.getLocaleText('you are the'), 50, '#FFE7BE', 'Calgary Script OT', 0, '#666666', 8);
            ytw.add(tfytw);
            var tftw = src.CommonUtils.createTextField(game.width + 150, game.height + 100 + 50, game.getLocaleText('WINNER!'), 140, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#FE4E00', 8);
            ytw.add(tftw);
            game.add.tween(tfytw).to({ x: 450, y: 290 + 50 }, 600, Phaser.Easing.Back.Out, true);
            game.add.tween(tftw).to({ x: 580, y: 370 + 50 }, 600, Phaser.Easing.Back.Out, true);
            this.uiLayer.add(ytw);
        };
        GameWindow.prototype.showYouLose = function (winnerHeroName) {
            var _this = this;
            this.setTopUIElementsVisible(false);
            this.gameArea.setMonochromeFilter();
            var ytw = new Phaser.Group(game, null);
            var slides = [];
            var ds = [
                { x: 111, y: 468 - 40 + 50, sx: 111 - 950, bk: 'slide_lose_0_back_0000' },
                { x: 340, y: 447 - 40 + 50, sx: 340 - 950, bk: 'slide_lose_1_back_0000' },
                { x: 644, y: 421 - 40 + 50, sx: 644 - 950, bk: 'slide_lose_2_back_0000' }
            ];
            for (var i = 0; i < ds.length; i++) {
                var sb_ = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', ds[i]['bk']);
                sb_.anchor.set(0.5, 0.5);
                var s = new Phaser.Sprite(game, ds[i]['sx'], ds[i]['y'], 'hud', 'slide_lose_' + i + '_0000');
                s.anchor.set(0.5, 0.5);
                s['sb_'] = sb_;
                slides.push(s);
                ytw.add(sb_);
                ytw.add(s);
                game.add.tween(s['sb_']).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, 175 + i * 100);
                game.add.tween(s).to({ x: ds[i]['x'] }, 500, Phaser.Easing.Back.Out, true, i * 100);
            }
            var btnNext = new Phaser.Sprite(game, 740, 486 + 350, 'hud', 'btnContine_0000');
            btnNext.anchor.set(0.5, 0.5);
            btnNext.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            btnNext.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            btnNext.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            btnNext.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            btnNext.inputEnabled = true;
            btnNext.input.useHandCursor = true;
            btnNext.events.onInputOver.add(function () { btnNext.play('over'); }, this);
            btnNext.events.onInputOut.add(function () { btnNext.play('out'); }, this);
            btnNext.events.onInputDown.add(function () { btnNext.play('down'); }, this);
            btnNext.events.onInputUp.add(function () { btnNext.play('up'); }, this);
            btnNext.events.onInputUp.addOnce(function () {
                timeLeftTimer.onComplete.removeAll(_this);
                src.CommonUtils.destroyTimer(timeLeftTimer);
                _this.replayThisFight();
            }, this);
            btnNext['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Next'), 30, '#FEE7C1', 'Lighthouse Personal Use');
            btnNext.addChild(btnNext['txtLabel']);
            this.add(btnNext);
            game.add.tween(btnNext).to({ y: 405 + 50 }, 750, Phaser.Easing.Back.Out, true);
            var winner_mc_red = new Phaser.Sprite(game, -650, 0, 'hud', 'winner_mc_red_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_red.anchor.set(0.5, 0.5);
            winner_mc_red.scale.set(4, 4);
            var winner_mc_blue = new Phaser.Sprite(game, -650, 0, 'hud', 'winner_mc_blue_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_blue.anchor.set(0.5, 0.5);
            winner_mc_blue.scale.set(4, 4);
            var winner_mc_ = new Phaser.Sprite(game, -650, 0, 'hud', 'winner_mc_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_.anchor.set(0.5, 0.5);
            ytw.add(winner_mc_red);
            ytw.add(winner_mc_blue);
            ytw.add(winner_mc_);
            game.add.tween(winner_mc_red).to({ x: 305, y: 275 + 50 }, 600, Phaser.Easing.Back.Out, false, 300)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(winner_mc_blue).to({ x: 305, y: 275 + 50 }, 600, Phaser.Easing.Back.Out, false, 150)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(winner_mc_).to({ x: 305, y: 275 + 50 }, 600, Phaser.Easing.Back.Out, true);
            var cnt = src.CommonUtils.createTextField(game.width + 150, game.height + 100 + 50, game.getLocaleText('CONTINUE?'), 125, '#FF4D00', 'DINNextLTPro-BoldCondensed', 0, '#FFFFFF', 8);
            ytw.add(cnt);
            var timerTF = src.CommonUtils.createTextField(game.width + 150, game.height + 100 + 50, game.getLocaleText('CONTINUE?'), 170, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#FF4D00', 8);
            ytw.add(timerTF);
            game.add.tween(cnt).to({ x: 550, y: 240 + 50 }, 600, Phaser.Easing.Back.Out, true);
            game.add.tween(timerTF).to({ x: 550, y: 400 + 50 }, 600, Phaser.Easing.Back.Out, true, 350);
            var timeLeftSec = 10;
            var timeLeftTimer = src.CommonUtils.createTimerRepeat(1000, timeLeftSec, function () {
                timeLeftSec--;
                timerTF.text = timeLeftSec + '';
            }, this);
            timerTF.text = timeLeftSec + '';
            timeLeftTimer.onComplete.add(function () {
                src.CommonUtils.changeCurrentView(new src.MainMenu());
            }, this);
            this.uiLayer.add(ytw);
        };
        GameWindow.prototype.showYouWonGame = function (winnerHeroName) {
            var _this = this;
            this.setTopUIElementsVisible(false);
            this.gameArea.setMonochromeFilter();
            var ytw = new Phaser.Group(game, null);
            var wonBG_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'hud', 'wonBG_0000');
            wonBG_.anchor.set(0.515, 0.515);
            wonBG_.scale.set(2.1, 2.1);
            ytw.add(wonBG_);
            var s = new Phaser.Sprite(game, game.width / 2, game.height + 350, 'hud', 'wonslides_0000');
            s.anchor.set(0.5, 0.5);
            s.scale.set(2, 2);
            ytw.add(s);
            game.add.tween(s).to({ y: game.height - 95 }, 450, Phaser.Easing.Back.Out, true, 225);
            var wonShine_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'hud', 'wonShine_0000');
            wonShine_.animations.add('playing', Phaser.Animation.generateFrameNames('wonShine_', 0, 5, '', 4), 60, true);
            wonShine_.play('playing');
            wonShine_.anchor.set(0.5, 0.5);
            wonShine_.scale.set(2, 2);
            ytw.add(wonShine_);
            var winner_mc_blue = new Phaser.Sprite(game, game.width / 2 + 15, game.height + 700, 'hud', 'won_winner_mc_bg_000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_blue.anchor.set(0.5, 0.5);
            winner_mc_blue.scale.set(4, 4);
            var winner_mc_ = new Phaser.Sprite(game, game.width / 2 - 15, game.height + 700, 'hud', 'won_winner_mc000' + src.Config.HERO_NAMES_SEQUENCE.indexOf(winnerHeroName));
            winner_mc_.anchor.set(0.5, 0.5);
            ytw.add(winner_mc_blue);
            ytw.add(winner_mc_);
            game.add.tween(winner_mc_blue).to({ x: game.width / 2, y: game.height / 2 + 10 }, 600, Phaser.Easing.Back.Out, false, 75)
                .to({ alpha: 0 }, 50).start();
            game.add.tween(winner_mc_).to({ x: game.width / 2, y: game.height / 2 + 10 }, 600, Phaser.Easing.Back.Out, true);
            var cnt = src.CommonUtils.createTextField(game.width / 2, game.height + 200, game.getLocaleText('CONGRATULATIONS!'), 110, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#FA5000', 8);
            ytw.add(cnt);
            game.add.tween(cnt).to({ y: game.height - 75 }, 600, Phaser.Easing.Back.Out, true, 250);
            src.CommonUtils.createTimer(3500, function () {
                game.add.tween(cnt).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
                var ydae = src.CommonUtils.createTextField(game.width / 2, game.height + 250, game.getLocaleText('YOU DEFEATED ALL YOUR ENEMIES!'), 90, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#FA5000', 8);
                ytw.add(ydae);
                ydae.wordWrap = true;
                ydae.lineSpacing = -35;
                ydae.wordWrapWidth = 700;
                game.add.tween(ydae).to({ y: game.height - 85 }, 600, Phaser.Easing.Back.Out, true);
                src.CommonUtils.createTimer(3500, function () {
                    src.CommonUtils.changeCurrentView(new src.MainMenu());
                }, _this);
            }, this);
            this.uiLayer.add(ytw);
        };
        return GameWindow;
    }(Phaser.Group));
    src.GameWindow = GameWindow;
})(src || (src = {}));
var src;
(function (src) {
    var HeroSelectWindow = /** @class */ (function (_super) {
        __extends(HeroSelectWindow, _super);
        function HeroSelectWindow() {
            var _this = _super.call(this, game, null) || this;
            _this.selectedHeroIndex = 0;
            HeroSelectWindow._instance = _this;
            return _this;
        }
        HeroSelectWindow.prototype.prepare = function () {
            var _this = this;
            this.bg = new Phaser.Graphics(game);
            this.bg.inputEnabled = true;
            this.bg.beginFill(0x000000, 1);
            this.bg.drawRect(0, 0, game.width, game.height);
            this.bg.endFill();
            this.add(this.bg);
            var sycTxt = src.CommonUtils.createTextField(game.width - 95, 48 + 25, game.getLocaleText('SELECT YOUR CHARACTER'), 30, '#FFE8BF', 'DINNextLTPro-BoldCondensed', -20);
            this.add(sycTxt);
            sycTxt.wordWrap = true;
            sycTxt.lineSpacing = -15;
            sycTxt.wordWrapWidth = 200;
            sycTxt.align = "right";
            //Config.HERO_NAMES_SEQUENCE
            var hs = [];
            var _loop_2 = function (i) {
                var hsBackBlue_ = new Phaser.Sprite(game, 730, 105 + i * 58 + 25, 'heroSelect', 'hsBackBlue_0000');
                hsBackBlue_.anchor.set(0.5, 0.5);
                this_2.add(hsBackBlue_);
                var hsBackOrange_ = new Phaser.Sprite(game, 730, 105 + i * 58 + 25, 'heroSelect', 'hsBackOrange_0000');
                hsBackOrange_.anchor.set(0.5, 0.5);
                this_2.add(hsBackOrange_);
                var heroSelect_ = new Phaser.Sprite(game, 730, 105 + i * 58 + 25, 'heroSelect', 'heroSelect_000' + i);
                heroSelect_.anchor.set(0.5, 0.5);
                hs.push(heroSelect_);
                this_2.add(heroSelect_);
                heroSelect_.inputEnabled = true;
                heroSelect_.input.useHandCursor = true;
                heroSelect_.events.onInputOver.add(function () {
                    if (_this.selectedHeroIndex == i)
                        return;
                    over_mc_.visible = true;
                    over_mc_.play('over');
                }, this_2);
                heroSelect_.events.onInputOut.add(function () {
                    over_mc_.visible = false;
                }, this_2);
                heroSelect_.events.onInputUp.add(function () {
                    if (_this.selectedHeroIndex == i)
                        return;
                    over_mc_.visible = false;
                    pointers_.visible = true;
                    pltxt.visible = true;
                    hs[_this.selectedHeroIndex]['pointers_'].visible = false;
                    hs[_this.selectedHeroIndex]['pltxt'].visible = false;
                    hideCurrHv();
                    _this.selectedHeroIndex = i;
                    showCurrHv();
                }, this_2);
                var over_mc_ = new Phaser.Sprite(game, heroSelect_.x, heroSelect_.y, 'heroSelect', 'over_mc_0000');
                over_mc_.anchor.set(0.5, 0.5);
                over_mc_.animations.add('over', Phaser.Animation.generateFrameNames('over_mc_', 0, 16, '', 4), 60, false);
                this_2.add(over_mc_);
                over_mc_.visible = false;
                var pointers_ = new Phaser.Sprite(game, heroSelect_.x, heroSelect_.y, 'heroSelect', 'pointers_0000');
                pointers_.anchor.set(0.5, 0.5);
                pointers_.visible = this_2.selectedHeroIndex == i;
                game.add.tween(pointers_.scale).to({ x: 1.1, y: 1.1 }, 500, Phaser.Easing.Default, true, 0, -1, true);
                this_2.add(pointers_);
                var pltxt = src.CommonUtils.createTextField(-50, 5, game.getLocaleText('Player'), 29, '#FF4600', 'Calgary Script OT', 0, '#FFF4DF', 4);
                heroSelect_.addChild(pltxt);
                pltxt.visible = this_2.selectedHeroIndex == i;
                heroSelect_['over_mc_'] = over_mc_;
                heroSelect_['pointers_'] = pointers_;
                heroSelect_['pltxt'] = pltxt;
                heroSelect_.x += 400;
                hsBackBlue_.x = hsBackOrange_.x = heroSelect_.x;
                game.add.tween(heroSelect_).to({ x: 730 }, 650, Phaser.Easing.Back.Out, true, i * 75);
                game.add.tween(hsBackBlue_).to({ x: 730 }, 650, Phaser.Easing.Back.Out, true, i * 75 + 150);
                game.add.tween(hsBackOrange_).to({ x: 730 }, 650, Phaser.Easing.Back.Out, true, i * 75 + 250);
            };
            var this_2 = this;
            for (var i = 0; i < 6; i++) {
                _loop_2(i);
            }
            var babyducks_bgW_blue_ = new Phaser.Sprite(game, game.width / 2 - 140, game.height / 2, 'heroSelect', 'babyducks_bgW_blue_0000');
            babyducks_bgW_blue_.anchor.set(0.5, 0.5);
            babyducks_bgW_blue_.scale.set(1.95, 1.95);
            this.add(babyducks_bgW_blue_);
            var babyducks_bgW_ = new Phaser.Sprite(game, game.width / 2 - 140, game.height / 2, 'heroSelect', 'babyducks_bgW_0000');
            babyducks_bgW_.anchor.set(0.5, 0.5);
            babyducks_bgW_.scale.set(1.95, 1.95);
            this.add(babyducks_bgW_);
            var hview = [];
            for (var _i = 0, _a = src.Config.HERO_NAMES_SEQUENCE; _i < _a.length; _i++) {
                var cn = _a[_i];
                var hbg_ = new Phaser.Sprite(game, game.width / 2 - 140, game.height / 2, 'heroSelect', cn + '_bg_0000');
                hbg_.anchor.set(0.5, 0.5);
                this.add(hbg_);
                var controller_ = new Phaser.Sprite(game, game.width / 2 - 25, game.height / 2 + 235, 'heroSelect', cn + '_controller_0000');
                controller_.anchor.set(0.5, 1);
                this.add(controller_);
                hbg_.visible = controller_.visible = false;
                hview.push({
                    'hbg_': hbg_,
                    'controller_': controller_
                });
                var txtCntr = src.CommonUtils.createTextField(-260, -235 + 25, game.getLocaleText(cn + '_controller'), 27, '#000000', 'Calgary Script OT', 0);
                txtCntr.anchor.set(0, 0);
                hbg_.addChild(txtCntr);
                var txtName = src.CommonUtils.createTextField(-264, -210 + 25, game.getLocaleText(cn + '_RepresentName'), 60, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0, '#FF4600', 8);
                txtName.anchor.set(0, 0);
                hbg_.addChild(txtName);
                var txtLabelPOWER = src.CommonUtils.createTextField(-270, 110 + 25, game.getLocaleText('POWER'), 18, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0, '#FF4600', 2);
                txtLabelPOWER.anchor.set(0, 0);
                hbg_.addChild(txtLabelPOWER);
                var txtLabelSPEED = src.CommonUtils.createTextField(-270, 160 + 25, game.getLocaleText('SPEED'), 18, '#FFE9C0', 'DINNextLTPro-BoldCondensed', 0, '#FF4600', 2);
                txtLabelSPEED.anchor.set(0, 0);
                hbg_.addChild(txtLabelSPEED);
                var indicBG_POWER = new Phaser.Sprite(game, -270, 135 + 25, 'heroSelect', 'indicBG_0000');
                indicBG_POWER.anchor.set(0, 0);
                hbg_.addChild(indicBG_POWER);
                var indic_POWER = new Phaser.Sprite(game, -270, 135 + 25, 'heroSelect', 'indic_0000');
                indic_POWER.anchor.set(0, 0);
                indic_POWER.scale.x = src.Config.HERO_PROP[cn]['attackFoot'] / src.Config.MAX_ATTACK_POWER;
                hbg_.addChild(indic_POWER);
                var indicBG_SPEED = new Phaser.Sprite(game, -270, 185 + 25, 'heroSelect', 'indicBG_0000');
                indicBG_SPEED.anchor.set(0, 0);
                hbg_.addChild(indicBG_SPEED);
                var indic_SPEED = new Phaser.Sprite(game, -270, 185 + 25, 'heroSelect', 'indic_0000');
                indic_SPEED.anchor.set(0, 0);
                indic_SPEED.scale.x = src.Config.HERO_PROP[cn]['attackSpeedCoef'];
                hbg_.addChild(indic_SPEED);
            }
            var hideCurrHv = function () {
                hview[_this.selectedHeroIndex]['hbg_'].visible = false;
                hview[_this.selectedHeroIndex]['controller_'].visible = false;
            };
            var showCurrHv = function () {
                hview[_this.selectedHeroIndex]['hbg_'].visible = true;
                hview[_this.selectedHeroIndex]['controller_'].visible = true;
                babyducks_bgW_.y = game.height / 2;
                game.add.tween(babyducks_bgW_).to({ y: game.height / 2 - 15 }, 200, Phaser.Easing.Bounce.Out, true, 0, 0, true);
                game.add.tween(babyducks_bgW_blue_).to({ y: game.height / 2 + 35 }, 200, Phaser.Easing.Bounce.Out, true, 0, 0, true);
                game.add.tween(hview[_this.selectedHeroIndex]['hbg_']).to({ y: game.height / 2 + 15 }, 200, Phaser.Easing.Bounce.Out, true, 0, 0, true);
                game.add.tween(hview[_this.selectedHeroIndex]['controller_']).to({ y: game.height / 2 + 235 - 20 }, 350, Phaser.Easing.Bounce.Out, true, 0, 0, true);
            };
            showCurrHv();
            var fightBtn = new Phaser.Sprite(game, game.width + 300, 105 + 6 * 58 + 8 + 25, 'hud', 'btnContine_0000');
            fightBtn.anchor.set(0.5, 0.5);
            fightBtn.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            fightBtn.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            fightBtn.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            fightBtn.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            fightBtn.inputEnabled = true;
            fightBtn.input.useHandCursor = true;
            fightBtn.events.onInputOver.add(function () { fightBtn.play('over'); }, this);
            fightBtn.events.onInputOut.add(function () { fightBtn.play('out'); }, this);
            fightBtn.events.onInputDown.add(function () { fightBtn.play('down'); }, this);
            fightBtn.events.onInputUp.add(function () { fightBtn.play('up'); }, this);
            fightBtn.events.onInputUp.addOnce(function () {
                src.CommonUtils.changeCurrentView(new src.FightPromo(new src.FightProgressModel(src.Config.HERO_NAMES_SEQUENCE[_this.selectedHeroIndex])));
            }, this);
            fightBtn['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Fight!'), 26, '#FEE7C1', 'Lighthouse Personal Use');
            fightBtn.addChild(fightBtn['txtLabel']);
            this.add(fightBtn);
            game.add.tween(fightBtn).to({ x: 740 }, 650, Phaser.Easing.Back.Out, true, 6 * 75);
            var fg = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'heroSelect', 'fg_0000');
            fg.anchor.set(0.5, 0.5);
            fg.scale.set(2, 2);
            this.add(fg);
            this.bg = new Phaser.Graphics(game);
            this.bg.beginFill(0xFF4600, 1);
            this.bg.drawRect(0, 0, game.width, game.height);
            this.bg.endFill();
            this.add(this.bg);
            game.add.tween(this.bg).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        };
        return HeroSelectWindow;
    }(Phaser.Group));
    src.HeroSelectWindow = HeroSelectWindow;
})(src || (src = {}));
var src;
(function (src) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super.call(this, game, null) || this;
            MainMenu._instance = _this;
            return _this;
        }
        MainMenu.prototype.prepare = function () {
            var _this = this;
            var bg = new Phaser.Sprite(game, game.width, -5, 'mainMenu', 'mainMenu_0000');
            bg.anchor.set(1, 0);
            bg.animations.add('show', Phaser.Animation.generateFrameNames('mainMenu_', 0, 27, '', 4), 50, false);
            bg.play('show');
            this.add(bg);
            this.add(this.tmpTxt = src.CommonUtils.createTextField(800, 65, game.getLocaleText('VHS'), 16, '#FEE7BC', 'DINNextLTPro-BoldCondensed'));
            this.add(this.tmpTxt = src.CommonUtils.createTextField(795, 35, game.getLocaleText('FEATURING'), 14, '#000000', 'DINNextLTPro-BoldCondensed'));
            this.add(this.tmpTxt = src.CommonUtils.createTextField(670, 43, game.getLocaleText('mainMenu_guardian'), 14, '#FEE7BC', 'DINNextLTPro-BoldCondensed'));
            this.add(this.tmpTxt = src.CommonUtils.createTextField(468, 44, game.getLocaleText('mainMenu_GEESE'), 14, '#FEE7BC', 'DINNextLTPro-BoldCondensed'));
            this.add(this.tmpTxt = src.CommonUtils.createTextField(220, 44, game.getLocaleText('mainMenu_BABY DUCKS'), 14, '#FEE7BC', 'DINNextLTPro-BoldCondensed'));
            this.add(this.tmpTxt = src.CommonUtils.createTextField(670, 95, game.getLocaleText('REGULAR SHOW'), 18, '#FF9770', 'Calgary Script OT'));
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 230, game.getLocaleText('BATTLE'), 120, '#28AADB', 'DINNextLTPro-BoldCondensed'));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 150);
            this.tmpTxt.anchor.y = 1;
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 230, game.getLocaleText('BATTLE'), 120, '#FF4600', 'DINNextLTPro-BoldCondensed'));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 300);
            this.tmpTxt.anchor.y = 1;
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 234, game.getLocaleText('BEHEMOTHS'), 80, '#28AADB', 'DINNextLTPro-BoldCondensed', 0));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 150);
            this.tmpTxt.anchor.y = 0;
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 234, game.getLocaleText('BEHEMOTHS'), 80, '#FF4600', 'DINNextLTPro-BoldCondensed', 0));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 300);
            this.tmpTxt.anchor.y = 0;
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 230, game.getLocaleText('BATTLE'), 120, '#FFE8BE', 'DINNextLTPro-BoldCondensed', 0, '#391708', 4));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 0);
            this.tmpTxt.anchor.y = 1;
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 234, game.getLocaleText('BEHEMOTHS'), 80, '#FFE8BE', 'DINNextLTPro-BoldCondensed', 0, '#391708', 4));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 0);
            this.tmpTxt.anchor.y = 0;
            this.add(this.tmpTxt = src.CommonUtils.createTextField(665, 224, game.getLocaleText('OF THE'), 20, '#FFE8BE', 'DINNextLTPro-BoldCondensed'));
            this.tmpTxt.scale.y = 0;
            game.add.tween(this.tmpTxt.scale).to({ y: 1 }, 750, Phaser.Easing.Back.Out, true, 0);
            this.playBtn = new Phaser.Sprite(game, 740, 450 + 300, 'hud', 'btnContine_0000');
            this.playBtn.anchor.set(0.5, 0.5);
            this.playBtn.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            this.playBtn.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            this.playBtn.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            this.playBtn.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            this.playBtn.inputEnabled = true;
            this.playBtn.input.useHandCursor = true;
            this.playBtn.events.onInputOver.add(function () { _this.playBtn.play('over'); }, this);
            this.playBtn.events.onInputOut.add(function () { _this.playBtn.play('out'); }, this);
            this.playBtn.events.onInputDown.add(function () { _this.playBtn.play('down'); }, this);
            this.playBtn.events.onInputUp.add(function () { _this.playBtn.play('up'); }, this);
            this.playBtn.events.onInputUp.addOnce(function () {
                src.CommonUtils.changeCurrentView(new src.HeroSelectWindow());
            }, this);
            this.playBtn['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Play'), 28, '#FEE7C1', 'Lighthouse Personal Use');
            this.playBtn.addChild(this.playBtn['txtLabel']);
            this.add(this.playBtn);
            game.add.tween(this.playBtn).to({ y: 460 + 25 }, 650, Phaser.Easing.Back.Out, true, 6 * 75);
            this.creditsBtn = new Phaser.Sprite(game, 575, 450 + 300, 'hud', 'btnContine_0000');
            this.creditsBtn.anchor.set(0.5, 0.5);
            this.creditsBtn.scale.set(0.8, 0.8);
            this.creditsBtn.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            this.creditsBtn.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            this.creditsBtn.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            this.creditsBtn.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            this.creditsBtn.inputEnabled = true;
            this.creditsBtn.input.useHandCursor = true;
            this.creditsBtn.events.onInputOver.add(function () { _this.creditsBtn.play('over'); }, this);
            this.creditsBtn.events.onInputOut.add(function () { _this.creditsBtn.play('out'); }, this);
            this.creditsBtn.events.onInputDown.add(function () { _this.creditsBtn.play('down'); }, this);
            this.creditsBtn.events.onInputUp.add(function () { _this.creditsBtn.play('up'); }, this);
            this.creditsBtn.events.onInputUp.addOnce(function () {
                var creditsWindow = new Phaser.Group(game, null);
                var creditsBG_ = new Phaser.Sprite(game, 0, 0, 'mainMenu', 'creditsBG_0000');
                var creditsPlayBtn = new Phaser.Sprite(game, game.width / 2, 525 + 200, 'hud', 'btnContine_0000');
                creditsPlayBtn.anchor.set(0.5, 0.5);
                creditsPlayBtn.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
                creditsPlayBtn.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
                creditsPlayBtn.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
                creditsPlayBtn.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
                creditsPlayBtn.inputEnabled = true;
                creditsPlayBtn.input.useHandCursor = true;
                creditsPlayBtn.events.onInputOver.add(function () { creditsPlayBtn.play('over'); }, _this);
                creditsPlayBtn.events.onInputOut.add(function () { creditsPlayBtn.play('out'); }, _this);
                creditsPlayBtn.events.onInputDown.add(function () { creditsPlayBtn.play('down'); }, _this);
                creditsPlayBtn.events.onInputUp.add(function () { creditsPlayBtn.play('up'); }, _this);
                creditsPlayBtn.events.onInputUp.addOnce(function () {
                    src.CommonUtils.changeCurrentView(new src.HeroSelectWindow());
                }, _this);
                creditsBG_.inputEnabled = true;
                creditsPlayBtn['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Play'), 28, '#FEE7C1', 'Lighthouse Personal Use');
                creditsPlayBtn.addChild(creditsPlayBtn['txtLabel']);
                game.add.tween(creditsPlayBtn).to({ y: 505 }, 650, Phaser.Easing.Back.Out, true, 750);
                creditsBG_.addChild(creditsPlayBtn);
                creditsWindow.add(creditsBG_);
                src.CommonUtils.changeCurrentView(creditsWindow);
            }, this);
            this.creditsBtn['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Credits'), 26, '#FEE7C1', 'Lighthouse Personal Use');
            this.creditsBtn.addChild(this.creditsBtn['txtLabel']);
            this.add(this.creditsBtn);
            game.add.tween(this.creditsBtn).to({ y: 460 + 25 }, 650, Phaser.Easing.Back.Out, true, 8 * 75);
        };
        MainMenu._instance = null;
        return MainMenu;
    }(Phaser.Group));
    src.MainMenu = MainMenu;
})(src || (src = {}));
var src;
(function (src) {
    var PreloaderWindow = /** @class */ (function (_super) {
        __extends(PreloaderWindow, _super);
        function PreloaderWindow() {
            var _this = _super.call(this, game, null) || this;
            _this.num = 0;
            _this.tween = null;
            _this.alreadyCompleted = false;
            _this.skiped = false;
            PreloaderWindow._instance = _this;
            _this.add(_this.bg_ = new Phaser.Sprite(game, 0, 0, 'preloader', 'preloaderBG_0000'));
            _this.indicator_ = new Phaser.Sprite(game, game.width / 2 + 10, game.height / 2 + 185, 'preloader', 'indicator_0000');
            _this.indicator_.anchor.set(0.5, 0.5);
            _this.indicator_.animations.add('loading_', Phaser.Animation.generateFrameNames('indicator_', 0, 19, '', 4), 30, true);
            _this.add(_this.indicator_);
            _this.indicator_.play('loading_');
            _this.indMask = new Phaser.Graphics(game, _this.indicator_.x - 410 / 2, _this.indicator_.y - 54 / 2);
            _this.indMask.beginFill(0xFFFFFF);
            _this.indMask.drawRect(0, 0, 410, 54);
            _this.indMask.endFill();
            _this.indMask.scale.x = 0;
            _this.add(_this.indMask);
            _this.indicator_.mask = _this.indMask;
            return _this;
        }
        PreloaderWindow.prototype.mockFontsInitialization = function () {
            for (var _i = 0, inGameFontFamilies_1 = inGameFontFamilies; _i < inGameFontFamilies_1.length; _i++) {
                var ff = inGameFontFamilies_1[_i];
                this.add(src.CommonUtils.createTextField(100, 100, 'preload', 1, '#FFFFFF', ff));
            }
        };
        PreloaderWindow.prototype.updateProgres = function (progress) {
            var _this = this;
            if (this.tween != null) {
                this.tween.onUpdateCallback(null, null);
                game.tweens.remove(this.tween);
            }
            game.tweens.removeFrom(this);
            var d = 500;
            this.tween = game.add.tween(this).to({ 'num': progress }, d, Phaser.Easing.Linear.None, true);
            this.tween.onUpdateCallback(function () {
                _this.indMask.scale.x = _this.num / 100;
            }, this);
            this.tween.onComplete.add(function () {
                _this.indMask.scale.x = _this.num / 100;
            });
            if (!this.alreadyCompleted && progress == 100) {
                this.alreadyCompleted = true;
                //only in this game big texture 4kx4k prerender
                var keys = [
                    'babyducks', 'babyducks_1', 'babyducks_2',
                    'warlock', 'warlock_1', 'warlock_2',
                    'VHS', 'VHS_1', 'VHS_2',
                    'guardian', 'guardian_1', 'guardian_2',
                    'geese', 'geese_1', 'geese_2',
                    'snowball', 'snowball_1', 'snowball_2',
                    'hud', 'heroSelect', 'mainMenu'
                ];
                this.bigTextureSpritesPrepender = [];
                var i = 0;
                var _loop_3 = function (k) {
                    src.CommonUtils.createTimer(/*d+*/ i++ * 100, function () {
                        var s = new Phaser.Sprite(game, 2 * game.width, 2 * game.height, k);
                        _this.add(s);
                        _this.bigTextureSpritesPrepender.push(s);
                    }, this_3);
                };
                var this_3 = this;
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var k = keys_1[_i];
                    _loop_3(k);
                }
                //
                src.CommonUtils.createTimer(/*d+*/ i * 100 + 500, function () {
                    game.add.tween(_this.indicator_).to({ alpha: 0 }, 250).start();
                    game.add.tween(_this.bg_).to({ alpha: 0 }, 250).start()
                        .onComplete.addOnce(function () {
                        var cn = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'preloader', 'CN_0000');
                        cn.scale.set(2, 2);
                        cn.anchor.set(0.5, 0.5);
                        game.add.tween(cn.scale).to({ x: 3, y: 3.5 }, 400, Phaser.Easing.Default, true, 800).start();
                        cn.animations.add('playing', Phaser.Animation.generateFrameNames('CN_', 0, 34, '', 4), 30, false)
                            .onComplete.addOnce(_this.onPreloadComplete, _this);
                        _this.add(cn);
                        cn.play('playing');
                    }, _this);
                }, this);
            }
        };
        PreloaderWindow.prototype.onPreloadComplete = function () {
            var _this = this;
            //only in this game big texture 4kx4k prerender
            for (var _i = 0, _a = this.bigTextureSpritesPrepender; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (this.contains(obj))
                    this.remove(obj, true);
            }
            /*CommonUtils.GAME_ART_GROUP.removeAll();
            CommonUtils.GAME_ART_GROUP.add(CommonUtils.currentView = new GameWindow('snowball', 'babyducks', 0, 0), false);
            GameWindow._instance.prepare();*/
            /*CommonUtils.GAME_ART_GROUP.removeAll();
            CommonUtils.GAME_ART_GROUP.add(CommonUtils.currentView = new FightPromo('snowball', 'babyducks'), false);*/
            /*CommonUtils.GAME_ART_GROUP.removeAll();
            CommonUtils.GAME_ART_GROUP.add(CommonUtils.currentView = new HeroSelectWindow(), false);*/
            /*CommonUtils.GAME_ART_GROUP.removeAll();
            CommonUtils.GAME_ART_GROUP.add(CommonUtils.currentView = new MainMenu(), false);
            CommonUtils.currentView['prepare']();*/
            this.intro = new Phaser.Group(game, null);
            this.add(this.intro);
            var bg = new Phaser.Graphics(game);
            bg.inputEnabled = true;
            bg.beginFill(0x000000, 1);
            bg.drawRect(0, 0, game.width, game.height);
            bg.endFill();
            this.intro.add(bg);
            game.add.tween(bg).to({ alpha: 0 }, src.CommonUtils.ticksToMilisec(12), Phaser.Easing.Default, true);
            var _1_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'intro', '_1_0000');
            _1_.animations.add('play', Phaser.Animation.generateFrameNames('_1_', 0, 7, '', 4), 60, true);
            _1_.anchor.set(0.5, 0.5);
            _1_.play('play');
            _1_.scale.set(1.5, 1.5);
            this.intro.add(_1_);
            game.add.tween(_1_.scale).to({ x: 1, y: 1 }, src.CommonUtils.ticksToMilisec(12), Phaser.Easing.Default, true);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(76), function () {
                var _2_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'intro', '_2_0000');
                _2_.animations.add('play', Phaser.Animation.generateFrameNames('_2_', 0, 84, '', 4), 60, true);
                _2_.anchor.set(0.5, 0.5);
                _2_.play('play');
                _2_.scale.set(1.17);
                _this.intro.add(_2_);
            }, this);
            var _bh1_;
            var _bh2_;
            var _h1_;
            var _h2_;
            var _h3_;
            var _h4_;
            var txt;
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(132), function () {
                _bh1_ = new Phaser.Sprite(game, 578 + 500, 473, 'introAssetsPng', '_bh1_0000');
                _bh1_.anchor.set(0.5, 0.5);
                _this.intro.add(_bh1_);
                game.add.tween(_bh1_).to({ x: 578, y: 473 }, src.CommonUtils.ticksToMilisec(154 - 131), Phaser.Easing.Back.Out, true);
                _h1_ = new Phaser.Sprite(game, 644, 397 + 500, 'introAssetsPng', '_h1_0000');
                _h1_.anchor.set(0.5, 0.5);
                _this.intro.add(_h1_);
                game.add.tween(_h1_).to({ x: 644, y: 397 }, src.CommonUtils.ticksToMilisec(154 - 131), Phaser.Easing.Back.Out, true, 100);
                txt = src.CommonUtils.createTextField(590, 490 + 300, game.getLocaleText('MONSTER MOVIE MARATHON!'), 55, '#FFE8BF', 'DINNextLTPro-BoldCondensed', -25, '#00A6E7', 4, null, 1);
                txt.alpha = 0;
                txt.wordWrap = true;
                txt.wordWrapWidth = 450;
                game.add.tween(txt).to({ y: 490, alpha: 1 }, 500, Phaser.Easing.Default, true);
                _this.intro.add(txt);
            }, this);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(228), function () {
                game.add.tween(_h1_).to({ alpha: 0, y: '+500' }, 350).start();
                game.add.tween(_bh1_).to({ alpha: 0, x: '+500' }, 350).start();
                game.add.tween(txt).to({ y: '+300', alpha: 0 }, 500).start();
                _bh2_ = new Phaser.Sprite(game, 271 - 500, 473, 'introAssetsPng', '_bh2_0000');
                _bh2_.anchor.set(0.5, 0.5);
                _this.intro.add(_bh2_);
                game.add.tween(_bh2_).to({ x: 271, y: 473 }, src.CommonUtils.ticksToMilisec(154 - 131), Phaser.Easing.Back.Out, true);
                _h2_ = new Phaser.Sprite(game, 206, 390 + 500, 'introAssetsPng', '_h2_0000');
                _h2_.anchor.set(0.5, 0.5);
                _this.intro.add(_h2_);
                game.add.tween(_h2_).to({ x: 206, y: 390 }, src.CommonUtils.ticksToMilisec(154 - 131), Phaser.Easing.Back.Out, true, 100);
                txt = src.CommonUtils.createTextField(164, 478 + 300, game.getLocaleText('WOW! THESE OLD 3-D GLASSES REALLY WORK.'), 55, '#FFE8BF', 'DINNextLTPro-BoldCondensed', -25, '#FA5000', 4, null, 0);
                txt.alpha = 0;
                txt.wordWrap = true;
                txt.wordWrapWidth = 450;
                game.add.tween(txt).to({ y: 488, alpha: 1 }, 500, Phaser.Easing.Default, true);
                _this.intro.add(txt);
            }, this);
            var _laserEyes_;
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(345), function () {
                _this.intro.setChildIndex(_1_, _this.intro.children.length - 1);
                _1_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'intro', '_1_0000');
                _1_.animations.add('play', Phaser.Animation.generateFrameNames('_1_', 0, 7, '', 4), 60, true);
                _1_.anchor.set(0.5, 0.5);
                _1_.play('play');
                _this.intro.add(_1_);
                _laserEyes_ = new Phaser.Sprite(game, 635, 265, 'introAssetsPng', '_laserEyes_0000');
                _laserEyes_.animations.add('play', Phaser.Animation.generateFrameNames('_laserEyes_', 0, 8, '', 4), 60, true);
                _laserEyes_.anchor.set(0.5, 0.5);
                _laserEyes_.play('play');
                _laserEyes_.angle = 200;
                _laserEyes_.scale.set(0.5);
                _this.intro.add(_laserEyes_);
                _laserEyes_ = new Phaser.Sprite(game, 595, 212, 'introAssetsPng', '_laserEyes_0000');
                _laserEyes_.animations.add('play', Phaser.Animation.generateFrameNames('_laserEyes_', 0, 8, '', 4), 60, true);
                _laserEyes_.anchor.set(0.5, 0.5);
                _laserEyes_.play('play');
                _laserEyes_.angle = 200;
                _laserEyes_.scale.set(0.5);
                _this.intro.add(_laserEyes_);
                _this.tmp = _laserEyes_;
            }, this);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(388), function () {
                _h3_ = new Phaser.Sprite(game, 716 + 500, 432, 'introAssetsPng', '_h3_0000');
                _h3_.anchor.set(0.5, 0.5);
                _this.intro.add(_h3_);
                game.add.tween(_h3_).to({ x: 716, y: 473 }, src.CommonUtils.ticksToMilisec(407 - 388), Phaser.Easing.Back.Out, true);
                _h4_ = new Phaser.Sprite(game, 167 - 500, 442, 'introAssetsPng', '_h4_0000');
                _h4_.anchor.set(0.5, 0.5);
                _this.intro.add(_h4_);
                game.add.tween(_h4_).to({ x: 167, y: 473 }, src.CommonUtils.ticksToMilisec(407 - 388), Phaser.Easing.Back.Out, true);
                var _laserEyes_ = new Phaser.Sprite(game, 150, 435, 'introAssetsPng', '_laserEyes_0000');
                _laserEyes_.animations.add('play', Phaser.Animation.generateFrameNames('_laserEyes_', 0, 8, '', 4), 60, true);
                _laserEyes_.anchor.set(0.5, 0.5);
                _laserEyes_.play('play');
                _this.intro.add(_laserEyes_);
                _this.tmp = _laserEyes_;
                _laserEyes_ = new Phaser.Sprite(game, 742, 470, 'introAssetsPng', '_laserEyes_0000');
                _laserEyes_.animations.add('play', Phaser.Animation.generateFrameNames('_laserEyes_', 0, 8, '', 4), 60, true);
                _laserEyes_.anchor.set(0.5, 0.5);
                _laserEyes_.scale.x = -1;
                _laserEyes_.play('play');
                _this.intro.add(_laserEyes_);
                _this.tmp = _laserEyes_;
                src.CommonUtils.tweenBlur(0, 10, _1_, 750);
            }, this);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(442), function () {
                var _laserBlue_ = new Phaser.Sprite(game, 87, 470, 'introAssetsPng', '_laserBlue_0000');
                _laserBlue_.anchor.set(0.5, 1);
                _this.intro.addAt(_laserBlue_, _this.intro.getIndex(_h4_) + 1);
                _this.tmp = _laserBlue_;
                var _laserOrange_ = new Phaser.Sprite(game, 195, 440, 'introAssetsPng', '_laserOrange_0000');
                _laserOrange_.anchor.set(0.5, 1);
                _this.intro.addAt(_laserOrange_, _this.intro.getIndex(_h4_) + 1);
                _this.tmp = _laserOrange_;
                _laserBlue_ = new Phaser.Sprite(game, 820, 499, 'introAssetsPng', '_laserBlue_0000');
                _laserBlue_.anchor.set(0.5, 1);
                _this.intro.addAt(_laserBlue_, _this.intro.getIndex(_h3_) + 1);
                _laserBlue_.scale.x = -1;
                _this.tmp = _laserBlue_;
                _laserOrange_ = new Phaser.Sprite(game, 700, 490, 'introAssetsPng', '_laserOrange_0000');
                _laserOrange_.anchor.set(0.5, 1);
                _this.intro.addAt(_laserOrange_, _this.intro.getIndex(_h3_) + 1);
                _laserOrange_.scale.x = -1;
                // this.tmp = _laserOrange_
                _laserOrange_ = new Phaser.Sprite(game, 608, 245, 'introAssetsPng', '_laserOrange_0000');
                _laserOrange_.anchor.set(0.5, 1);
                _laserOrange_.scale.set(0.4, 1.3);
                _laserOrange_.angle = -40;
                _this.intro.addAt(_laserOrange_, _this.intro.getIndex(_1_) + 1);
                _this.tmp = _laserOrange_;
                _laserBlue_ = new Phaser.Sprite(game, 620, 245, 'introAssetsPng', '_laserBlue_0000');
                _laserBlue_.anchor.set(0.5, 1);
                _laserBlue_.scale.set(0.4, 1.3);
                _laserBlue_.angle = -40;
                _this.intro.addAt(_laserBlue_, _this.intro.getIndex(_1_) + 1);
                _this.tmp = _laserBlue_;
                _laserOrange_ = new Phaser.Sprite(game, 644, 293, 'introAssetsPng', '_laserOrange_0000');
                _laserOrange_.anchor.set(0.5, 1);
                _laserOrange_.scale.set(0.4, 1.3);
                _laserOrange_.angle = -40;
                _this.intro.addAt(_laserOrange_, _this.intro.getIndex(_1_) + 1);
                _this.tmp = _laserOrange_;
                _laserBlue_ = new Phaser.Sprite(game, 661, 298, 'introAssetsPng', '_laserBlue_0000');
                _laserBlue_.anchor.set(0.5, 1);
                _laserBlue_.scale.set(0.4, 1.3);
                _laserBlue_.angle = -40;
                _this.intro.addAt(_laserBlue_, _this.intro.getIndex(_1_) + 1);
                _this.tmp = _laserBlue_;
            }, this);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(465), function () {
                var _3_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'intro', '_3_0000');
                _3_.animations.add('play', Phaser.Animation.generateFrameNames('_3_', 0, 46, '', 4), 60, false);
                _3_.anchor.set(0.5, 0.5);
                _3_.play('play');
                // _3_.scale.set(1.41);
                _this.intro.add(_3_);
                var _shine_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'introAssetsPng', '_shine_0000');
                _shine_.animations.add('play', Phaser.Animation.generateFrameNames('_shine_', 0, 5, '', 4), 60, true);
                _shine_.anchor.set(0.5, 0.5);
                _shine_.scale.set(1.5, 1.5);
                src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(15), function () {
                    _this.intro.add(_shine_);
                    _shine_.play('play');
                }, _this);
            }, this);
            var _4_;
            var _5_;
            var _player_character_mc_;
            var bot_character_mc_;
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(539), function () {
                _4_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'intro', '_4_0000');
                _4_.anchor.set(0.5, 0.5);
                _this.intro.add(_4_);
                _this.tmp = _4_;
                _5_ = new Phaser.Sprite(game, game.width / 2, game.height / 2, 'intro', '_5_0000');
                _5_.anchor.set(0.5, 0.5);
                _this.intro.add(_4_);
                _5_.alpha = 0;
                _this.tmp = _5_;
                _this.intro.add(_5_);
                game.add.tween(_5_).to({ alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 1000);
                var _shine_ = new Phaser.Sprite(game, 250, 0, 'introAssetsPng', '_shine_0000');
                _shine_.animations.add('play', Phaser.Animation.generateFrameNames('_shine_', 0, 5, '', 4), 15, false);
                _shine_.anchor.set(0.5, 0.5);
                _this.intro.add(_shine_);
                _shine_.play('play', 15, false, true);
                var ad = src.Config.HERO_ANIMS['babyducks']['idle_'];
                _player_character_mc_ = new Phaser.Sprite(game, 250, 510 - 600, ad['key'], 'idle_0000');
                _player_character_mc_.animations.add('idle_', Phaser.Animation.generateFrameNames(ad['prefix'], ad['start'], ad['stop'], '', 4), 60, true);
                _player_character_mc_.scale.set(1.6);
                _player_character_mc_.anchor.set(0.5, 1);
                // this.tmp = _player_character_mc_;
                // CommonUtils.createTimer(CommonUtils.ticksToMilisec(6), ()=>{
                _this.intro.add(_player_character_mc_);
                // }, this);
                game.add.tween(_player_character_mc_).to({ y: 510 }, 350).start()
                    .onComplete.addOnce(function () {
                    _player_character_mc_.play('idle_');
                    _1_.filters = null;
                    game.camera.shake(0.01, 250);
                }, _this);
                ad = src.Config.HERO_ANIMS['geese']['idle_'];
                bot_character_mc_ = new Phaser.Sprite(game, 645, 510 - 600, ad['key'], 'idle_0000');
                bot_character_mc_.animations.add('idle_', Phaser.Animation.generateFrameNames(ad['prefix'], ad['start'], ad['stop'], '', 4), 60, true);
                bot_character_mc_.scale.set(-1.6, 1.6);
                bot_character_mc_.anchor.set(0.5, 1);
                // this.tmp = bot_character_mc_;
                // CommonUtils.createTimer(CommonUtils.ticksToMilisec(14), ()=>{
                _this.intro.add(bot_character_mc_);
                // }, this);
                game.add.tween(bot_character_mc_).to({ y: 510 }, 350, Phaser.Easing.Default, true, 350)
                    .onComplete.addOnce(function () {
                    bot_character_mc_.play('idle_');
                    _1_.filters = null;
                    game.camera.shake(0.01, 250);
                }, _this);
                src.CommonUtils.createTimer(350, function () {
                    _shine_ = new Phaser.Sprite(game, 645, 0, 'introAssetsPng', '_shine_0000');
                    _shine_.animations.add('play', Phaser.Animation.generateFrameNames('_shine_', 0, 5, '', 4), 15, false);
                    _shine_.anchor.set(0.5, 0.5);
                    _this.intro.add(_shine_);
                    _shine_.play('play', 15, false, true);
                }, _this);
            }, this);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(656), function () {
                src.CommonUtils.tweenBlur(0, 10, _5_, 500);
                src.CommonUtils.tweenBlur(0, 10, _player_character_mc_, 500);
                src.CommonUtils.tweenBlur(0, 10, bot_character_mc_, 500);
                _h1_ = new Phaser.Sprite(game, 644, 397 + 500, 'introAssetsPng', '_h1_0000');
                _h1_.anchor.set(0.5, 0.5);
                _this.intro.add(_h1_);
                game.add.tween(_h1_).to({ x: 644, y: 397 }, src.CommonUtils.ticksToMilisec(154 - 131), Phaser.Easing.Back.Out, true, 100);
                _h2_ = new Phaser.Sprite(game, 206, 390 + 500, 'introAssetsPng', '_h2_0000');
                _h2_.anchor.set(0.5, 0.5);
                _this.intro.add(_h2_);
                game.add.tween(_h2_).to({ x: 206, y: 390 }, src.CommonUtils.ticksToMilisec(154 - 131), Phaser.Easing.Back.Out, true, 100);
                txt = src.CommonUtils.createTextField(game.width / 2, 490 + 300, game.getLocaleText('OOOOHHHH!!!!'), 75, '#FFE8BF', 'DINNextLTPro-BoldCondensed', 0, '#FA5000', 4);
                txt.alpha = 0;
                game.add.tween(txt).to({ y: 480, alpha: 1 }, 500, Phaser.Easing.Default, true);
                _this.intro.add(txt);
            }, this);
            src.CommonUtils.createTimer(src.CommonUtils.ticksToMilisec(765), function () {
                var bg = new Phaser.Graphics(game);
                bg.inputEnabled = true;
                bg.beginFill(0x000000, 1);
                bg.drawRect(0, 0, game.width, game.height);
                bg.endFill();
                _this.intro.add(bg);
                bg.alpha = 0;
                game.add.tween(bg).to({ alpha: 1 }, 500, Phaser.Easing.Default, true)
                    .onComplete.addOnce(function () {
                    //show main menu
                    if (!_this.skiped) {
                        src.CommonUtils.changeCurrentView(new src.MainMenu());
                    }
                    _this.skipIntroBtn.events.onInputUp.removeAll(_this);
                    //
                }, _this);
            }, this);
            this.skipIntroBtn = new Phaser.Sprite(game, game.width - 90, game.height - 35 + 300, 'hud', 'btnContine_0000');
            this.skipIntroBtn.anchor.set(0.5, 0.5);
            this.skipIntroBtn.scale.set(0.8, 0.8);
            this.skipIntroBtn.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            this.skipIntroBtn.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            this.skipIntroBtn.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            this.skipIntroBtn.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            this.skipIntroBtn.inputEnabled = true;
            this.skipIntroBtn.input.useHandCursor = true;
            this.skipIntroBtn.events.onInputOver.add(function () { _this.skipIntroBtn.play('over'); }, this);
            this.skipIntroBtn.events.onInputOut.add(function () { _this.skipIntroBtn.play('out'); }, this);
            this.skipIntroBtn.events.onInputDown.add(function () { _this.skipIntroBtn.play('down'); }, this);
            this.skipIntroBtn.events.onInputUp.add(function () { _this.skipIntroBtn.play('up'); }, this);
            this.skipIntroBtn.events.onInputUp.addOnce(function () {
                _this.skiped = true;
                src.CommonUtils.destroyAllTimers();
                src.CommonUtils.changeCurrentView(new src.MainMenu());
            }, this);
            this.skipIntroBtn['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Skip'), 26, '#FEE7C1', 'Lighthouse Personal Use');
            this.skipIntroBtn.addChild(this.skipIntroBtn['txtLabel']);
            this.add(this.skipIntroBtn);
            game.add.tween(this.skipIntroBtn).to({ y: game.height - 35 }, 650, Phaser.Easing.Back.Out, true, 750);
        };
        return PreloaderWindow;
    }(Phaser.Group));
    src.PreloaderWindow = PreloaderWindow;
})(src || (src = {}));
var src;
(function (src) {
    var Tutorial = /** @class */ (function (_super) {
        __extends(Tutorial, _super);
        function Tutorial() {
            var _this = _super.call(this, game, null) || this;
            _this.wasShown = false;
            return _this;
            // this.wasShown = LocalStorageController.instance.wasTutorialShown();
        }
        Object.defineProperty(Tutorial, "instance", {
            get: function () {
                return Tutorial._instance ? Tutorial._instance : Tutorial._instance = new Tutorial();
            },
            enumerable: true,
            configurable: true
        });
        Tutorial.prototype.playShowing = function (onContinue, onContinueContext) {
            var _this = this;
            if (this.wasShown)
                return false;
            this.wasShown = true;
            this.bg = new Phaser.Graphics(game);
            this.bg.inputEnabled = true;
            this.bg.beginFill(0x000000, 0.35);
            this.bg.drawRect(0, 0, game.width, game.height);
            this.bg.endFill();
            this.add(this.bg);
            this.bg.alpha = 0;
            game.add.tween(this.bg).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.slides = [];
            var ds = [
                { x: 79, y: 160 - 40, sy: 27 - 500, 'txtlbl': { x: 95, y: 39, txt: game.getLocaleText('MOVE') } },
                { x: 248, y: 151 - 40, sy: 263 + 800, 'txtlbl': { x: 85, y: 35, txt: game.getLocaleText('KICK') } },
                { x: 412, y: 158 - 40, sy: 22 - 500, 'txtlbl': { x: 79, y: 37, txt: game.getLocaleText('PUNCH') } },
                { x: 570, y: 152 - 40, sy: 273 + 800, 'txtlbl': { x: 86, y: 34, txt: game.getLocaleText('SPECIAL POWER') } }
            ];
            for (var i = 0; i < ds.length; i++) {
                var sb_ = new Phaser.Sprite(game, ds[i]['x'], ds[i]['sy'], 'hud', 'slide_' + i + '_blue_0000');
                sb_.scale.set(4, 4);
                var sr_ = new Phaser.Sprite(game, ds[i]['x'], ds[i]['sy'], 'hud', 'slide_' + i + '_red_0000');
                sr_.scale.set(4, 4);
                var s = new Phaser.Sprite(game, ds[i]['x'], ds[i]['sy'], 'hud', 'slide_' + i + '_0000');
                s['sb_'] = sb_;
                s['sr_'] = sr_;
                this.slides.push(s);
                this.add(sb_);
                this.add(sr_);
                this.add(s);
                s.addChild(src.CommonUtils.createTextField(ds[i]['txtlbl']['x'], ds[i]['txtlbl']['y'], ds[i]['txtlbl']['txt'], 22, '#FFE8BF', 'DINNextLTPro-BoldCondensed'));
                game.add.tween(s['sb_']).to({ y: ds[i]['y'] }, 500, Phaser.Easing.Back.Out, true, 175);
                game.add.tween(s['sr_']).to({ y: ds[i]['y'] }, 500, Phaser.Easing.Back.Out, true, 125);
                game.add.tween(s).to({ y: ds[i]['y'] }, 500, Phaser.Easing.Back.Out, true);
            }
            this.txtHW = src.CommonUtils.createTextField(game.width / 2 - 5, -150, game.getLocaleText('How to'), 50, '#FFE8BF', 'Calgary Script OT', 0, '#FF4700', 8);
            this.add(this.txtHW);
            this.txtPlay = src.CommonUtils.createTextField(game.width / 2 + 5, -150, game.getLocaleText('PLAY'), 70, '#FF4700', 'DINNextLTPro-BoldCondensed', 0, '#FFE8BF', 8);
            this.add(this.txtPlay);
            game.add.tween(this.txtHW).to({ y: 36 }, 600, Phaser.Easing.Back.Out, true);
            game.add.tween(this.txtPlay).to({ y: 75 }, 500, Phaser.Easing.Back.Out, true);
            this.btnContinue = new Phaser.Sprite(game, game.width / 2, game.height + 150, 'hud', 'btnContine_0000');
            this.btnContinue.anchor.set(0.5, 0.5);
            this.btnContinue.animations.add('over', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4), 60, false);
            this.btnContinue.animations.add('out', Phaser.Animation.generateFrameNames('btnContine_', 0, 10, '', 4).reverse(), 60, false);
            this.btnContinue.animations.add('down', Phaser.Animation.generateFrameNames('btnContine_', 11, 11, '', 4).reverse(), 60, false);
            this.btnContinue.animations.add('up', Phaser.Animation.generateFrameNames('btnContine_', 0, 0, '', 4).reverse(), 60, false);
            this.btnContinue.inputEnabled = true;
            this.btnContinue.input.useHandCursor = true;
            this.btnContinue.events.onInputOver.add(function () { _this.btnContinue.play('over'); }, this);
            this.btnContinue.events.onInputOut.add(function () { _this.btnContinue.play('out'); }, this);
            this.btnContinue.events.onInputDown.add(function () { _this.btnContinue.play('down'); }, this);
            this.btnContinue.events.onInputUp.add(function () { _this.btnContinue.play('up'); }, this);
            this.btnContinue.events.onInputUp.addOnce(function () {
                for (var i = 0; i < _this.slides.length; i++) {
                    var s = _this.slides[i];
                    game.add.tween(s['sb_']).to({ y: ds[i]['sy'] }, 500, Phaser.Easing.Back.In, true);
                    game.add.tween(s['sr_']).to({ y: ds[i]['sy'] }, 500, Phaser.Easing.Back.In, true);
                    game.add.tween(s).to({ y: ds[i]['sy'] }, 500, Phaser.Easing.Back.In, true);
                }
                game.add.tween(_this.txtHW).to({ y: -150 }, 600, Phaser.Easing.Back.In, true);
                game.add.tween(_this.txtPlay).to({ y: -150 }, 500, Phaser.Easing.Back.In, true);
                game.add.tween(_this.bg).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                game.add.tween(_this.btnContinue).to({ y: game.height + 150 }, 500, Phaser.Easing.Back.In, true)
                    .onComplete.addOnce(onContinue, onContinueContext);
            }, this);
            this.btnContinue['txtLabel'] = src.CommonUtils.createTextField(0 - 28, 0, game.getLocaleText('Continue'), 26, '#FEE7C1', 'Lighthouse Personal Use');
            this.btnContinue.addChild(this.btnContinue['txtLabel']);
            this.add(this.btnContinue);
            game.add.tween(this.btnContinue).to({ y: game.height - 53 }, 500, Phaser.Easing.Back.In, true);
            return true;
        };
        Tutorial._instance = null;
        return Tutorial;
    }(Phaser.Group));
    src.Tutorial = Tutorial;
})(src || (src = {}));
//# sourceMappingURL=out.js.map
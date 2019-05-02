"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var src;

(function (src) {
  var CustomScaleManager =
  /*#__PURE__*/
  function () {
    function CustomScaleManager() {
      _classCallCheck(this, CustomScaleManager);
    }

    _createClass(CustomScaleManager, null, [{
      key: "update",
      value: function update(newWidth, newHeight) {
        CustomScaleManager.WIDTH = newWidth;
        CustomScaleManager.HEIGHT = newHeight;
        var newRatio = newWidth / newHeight;
        this.MOBILE_UPSCALE_FACTOR = src.Settings.IS_MOBILE ? newRatio < this.ORIGINAL_RATIO ? Phaser.Math.clamp(1 / newRatio, 1, 1 / this.ORIGINAL_GAME_RATIO * 0.98) : 1 : 1;

        if (newRatio >= CustomScaleManager.ORIGINAL_RATIO) {
          CustomScaleManager.SCALE_X = CustomScaleManager.SCALE_Y = newHeight / CustomScaleManager.ORIGINAL_HEIGHT * CustomScaleManager.MOBILE_UPSCALE_FACTOR;
        } else {
          CustomScaleManager.SCALE_X = CustomScaleManager.SCALE_Y = newWidth / CustomScaleManager.ORIGINAL_WIDTH * CustomScaleManager.MOBILE_UPSCALE_FACTOR;
        }

        if (src.App.instance.scale.scaleMode != Phaser.ScaleManager.RESIZE) {
          src.App.instance.state.getCurrentState().resize(src.App.instance.width, src.App.instance.height);
        }

        src.WindowManager.instance.resize();
        src.TransitionScreen.instance.resize();
        src.SoundButtonsController.instance.resize();
      }
    }, {
      key: "getScaleMode",
      value: function getScaleMode() {
        return src.Settings.IS_MOBILE ? Phaser.ScaleManager.USER_SCALE : Phaser.ScaleManager.SHOW_ALL;
      }
    }, {
      key: "getPixelRatio",
      value: function getPixelRatio() {
        return src.App.instance.device.desktop || !src.Settings.USE_HIGH_RESOLUTION_SCALING ? 1 : Math.min(src.App.instance.device.pixelRatio, src.Settings.PIXEL_RATIO_MAX_THRESHOLD);
      }
    }, {
      key: "minX",
      value: function minX() {
        return 0;
      }
    }, {
      key: "maxX",
      value: function maxX() {
        return 1;
      }
    }, {
      key: "centerX",
      value: function centerX() {
        return 0.5;
      }
    }, {
      key: "minY",
      value: function minY() {
        return 0;
      }
    }, {
      key: "maxY",
      value: function maxY() {
        return 1;
      }
    }, {
      key: "centerY",
      value: function centerY() {
        return 0.5;
      }
    }]);

    return CustomScaleManager;
  }();

  CustomScaleManager.ORIGINAL_WIDTH = 480;
  CustomScaleManager.ORIGINAL_HEIGHT = 480;
  CustomScaleManager.GAME_WIDTH = 320;
  CustomScaleManager.GAME_HEIGHT = 480;
  CustomScaleManager.WIDTH = 480;
  CustomScaleManager.HEIGHT = 480;
  CustomScaleManager.SCALE_X = 1;
  CustomScaleManager.SCALE_Y = 1;
  CustomScaleManager.MOBILE_UPSCALE_FACTOR = 1;
  CustomScaleManager.ORIGINAL_RATIO = CustomScaleManager.ORIGINAL_WIDTH / CustomScaleManager.ORIGINAL_HEIGHT;
  CustomScaleManager.ORIGINAL_GAME_RATIO = CustomScaleManager.GAME_WIDTH / CustomScaleManager.GAME_HEIGHT;
  src.CustomScaleManager = CustomScaleManager;
})(src || (src = {}));

var src;

(function (src) {
  var RenderUtils =
  /*#__PURE__*/
  function () {
    function RenderUtils() {
      _classCallCheck(this, RenderUtils);
    }

    _createClass(RenderUtils, null, [{
      key: "detectRenderMode",
      value: function detectRenderMode() {
        var isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var isOldIPhone = window.navigator.userAgent.indexOf('iPhone ') > -1 && window.screen.width <= 414 && window.screen.height <= 736;
        var isIPad = window.navigator.userAgent.indexOf('iPad') != -1 && !window["MSStream"];
        return isIE || isFirefox || isOldIPhone || isIPad ? Phaser.CANVAS : Phaser.AUTO;
      }
    }]);

    return RenderUtils;
  }();

  src.RenderUtils = RenderUtils;
})(src || (src = {})); ///<reference path="scale/CustomScaleManager.ts"/>
///<reference path="utils/RenderUtils.ts"/>


var src;

(function (src) {
  var App =
  /*#__PURE__*/
  function (_Phaser$Game) {
    _inherits(App, _Phaser$Game);

    function App() {
      var _this;

      _classCallCheck(this, App);

      var isMobile = window.devicePixelRatio >= 2;
      var gameParentElement = isMobile ? undefined : 'content';
      var container = document.querySelector('.container');

      if (isMobile && container && container.parentElement) {
        container.parentElement.removeChild(container);
      }

      src.Settings.IS_MOBILE = isMobile;
      var gameConfig = {
        width: src.CustomScaleManager.ORIGINAL_WIDTH,
        height: src.CustomScaleManager.ORIGINAL_HEIGHT,
        renderer: src.RenderUtils.detectRenderMode(),
        transparent: true,
        enableDebug: false,
        parent: gameParentElement
      };
      _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, gameConfig));
      App.instance = _assertThisInitialized(_this);

      _this.state.add('Boot', src.Boot, false);

      _this.state.add('Preloader', src.Preloader, false);

      _this.state.add('MainMenu', src.MainMenu, false);

      _this.state.add('Level', src.Level, false);

      _this.state.start('Boot');

      return _this;
    }

    _createClass(App, [{
      key: "navigateToSponsor",
      value: function navigateToSponsor() {
        window.open("https://fundemic.com", "_blank");
      }
    }]);

    return App;
  }(Phaser.Game);

  src.App = App;
})(src || (src = {}));

var game;

window.onload = function () {
  game = new src.App();
};

var src;

(function (src) {
  var Settings = function Settings() {
    _classCallCheck(this, Settings);
  }; //SCALING


  Settings.USE_HIGH_RESOLUTION_SCALING = true;
  Settings.PIXEL_RATIO_MAX_THRESHOLD = 3;
  Settings.IS_MOBILE = false; //FONTS

  Settings.DEFAULT_FONT_FAMILY = 'cheeseFR';
  Settings.THIN_SPACE = ' ';
  Settings.NARROW_SPACE = ' '; //WINDOWS

  Settings.WINDOW_BACKGROUND_ALPHA = 0.8; //ATLASES

  Settings.PRELOADER_ATLAS = 'preloader';
  Settings.GAME_ATLAS = 'assets'; //SETTINGS

  Settings.GAME_VERSION = "v1.0a";
  Settings.DISPLAY_FPS = false;
  Settings.MUSIC_ENABLED_BY_DEFAULT = true;
  Settings.LOCAL_STORAGE_KEY = 'PommePomme_v1.0';
  src.Settings = Settings;
})(src || (src = {}));

var src;

(function (src) {
  var Confetti =
  /*#__PURE__*/
  function (_Phaser$Sprite) {
    _inherits(Confetti, _Phaser$Sprite);

    function Confetti() {
      var _this2;

      _classCallCheck(this, Confetti);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Confetti).call(this, src.App.instance, 0, -25, 'confetti'));

      _this2.anchor.set(0.5, 0);

      _this2.scale.set(2);

      _this2.anim = _this2.animations.add('confetti', Phaser.Animation.generateFrameNames('confetti', 0, 53, '', 4), 60, false);
      _this2.visible = false;
      return _this2;
    }

    _createClass(Confetti, [{
      key: "playAnim",
      value: function playAnim(tint) {
        this.game.tweens.removeFrom(this);
        this.tint = tint;
        this.visible = true;
        this.alpha = 0;
        this.anim.restart();
        this.game.add.tween(this).to({
          alpha: 1
        }, 100, Phaser.Easing.Linear.None, false).to({
          alpha: 1
        }, 1460, Phaser.Easing.Linear.None, false).to({
          alpha: 0
        }, 100, Phaser.Easing.Linear.None, false).start().onComplete.add(this.stopAnim, this);
      }
    }, {
      key: "stopAnim",
      value: function stopAnim() {
        this.visible = false;
        this.alpha = 0;
        this.game.tweens.removeFrom(this);
      }
    }]);

    return Confetti;
  }(Phaser.Sprite);

  src.Confetti = Confetti;
})(src || (src = {}));

var src;

(function (src) {
  var MedalEffect =
  /*#__PURE__*/
  function (_Phaser$Group) {
    _inherits(MedalEffect, _Phaser$Group);

    function MedalEffect(plateX, plateY) {
      var _this3;

      _classCallCheck(this, MedalEffect);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(MedalEffect).call(this, src.App.instance));
      _this3.medal = _this3.add(_this3.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'badge1' + '0000'));

      _this3.medal.anchor.set(0.5);

      return _this3;
    }

    return MedalEffect;
  }(Phaser.Group);

  src.MedalEffect = MedalEffect;
})(src || (src = {}));

var src;

(function (src) {
  var Constants = function Constants() {
    _classCallCheck(this, Constants);
  };

  Constants.MUSIC_BUTTON_SCALE = .97;
  Constants.ACCELEROMETER_LIMIT = .1;
  Constants.ACCELEROMETER_MULT = .15;
  Constants.PLAYER_STARS_Y = .8;
  Constants.PLAYER_BATUTE_W = .3;
  Constants.MUSIC_BUTTON_DY = 1.1;
  Constants.PLAYER_BATUTE_H = .53;
  Constants.PLAYER_BROCK_W = .17;
  Constants.MACHINE_FRUIT_SPEED = 4.7;
  Constants.MACHINE_WHEELS_Y = .83;
  Constants.MACHINE_WHEELS_X = .01;
  Constants.MACHINE_WHEEL_X = .5;
  Constants.MACHINE_WHEEL_Y = 1.03;
  Constants.MACHINE_CUP_Y = .75;
  Constants.MACHINE_CUP_X = .05;
  Constants.MACHINE_CUPS_Y = .6;
  Constants.MACHINE_CUPS_X = .63;
  Constants.MACHINE_IDOL_H = .8;
  Constants.MACHINE_WHEEL_PIVOT = .52;
  Constants.INTERFACE_STARS_DW = .24;
  Constants.INTERFACE_STARS_DH = .34;
  Constants.INTERFACE_COMBO_DH = .02;
  Constants.INTERFACE_COMBO_DW = .04;
  Constants.INTERFACE_REMAINS_D = .02;
  Constants.INTERFACE_START_SLIDER_SCALE = .1;
  Constants.INTERFACE_COMBO_ROT = .05;
  Constants.INTERFACE_COMBO_Y2 = .05;
  Constants.INTERFACE_COMBO_X2 = .35;
  Constants.INTERFACE_TIME_X = .47;
  Constants.INTERFACE_TKINZ_X = .18;
  Constants.INTERFACE_TKINZ_Y = .58;
  Constants.INTERFACE_KINZ_Y = .02;
  Constants.INTERFACE_KINZ_X = .39;
  Constants.INTERFACE_FIELD_POINT_Y = .02;
  Constants.INTERFACE_FIELD_POINT_X = .02;
  Constants.INTERFACE_EXTRA_Y = .7;
  Constants.INTERFACE_SHIELD_Y = .65;
  Constants.INTERFACE_BAD_GOOD_Y = .7;
  Constants.INTERFACE_WORD_GOOD_Y = .62;
  Constants.INTERFACE_TIMER_REFIIL_Y = .35;
  Constants.INTERFACE_WORDB_GOOD_DX = .09;
  Constants.INTERFACE_WORDB_BAD_DX = .125;
  Constants.INTERFACE_WORDB_BAD_X = .25;
  Constants.INTERFACE_WORD_UPDATE_X = .82;
  Constants.INTERFACE_WORD_UPDATE_Y = .45;
  Constants.INTERFACE_COMBO_ANIM_X = .23;
  Constants.INTERFACE_COMBO_ANIM_Y = .15;
  Constants.INTERFACE_BACKREMAINS_X = .72;
  Constants.INTERFACE_BACKREMAINS_Y = .49;
  Constants.INTERFACE_BACKTIME2_Y = .27;
  Constants.INTERFACE_BACKTIME2_X = .7;
  Constants.INTERFACE_BACKTIME_X = .64;
  Constants.INTERFACE_BACKTIME_Y = .205;
  Constants.INTERFACE_SLIDER_X = .8;
  Constants.INTERFACE_SLIDER_Y = .6;
  Constants.INTERFACE_MULT_Y = .66;
  Constants.INTERFACE_MULT_X = .67;
  Constants.INTERFACE_COMBO_Y = .45;
  Constants.INTERFACE_COMBO_X = .6;
  Constants.INTERFACE_SDX = .08;
  Constants.INTERFACE_SUPERFLASH_X = .9;
  Constants.INTERFACE_SCORE_X = .275;
  Constants.INTERFACE_DD = .059;
  Constants.INTERFACE_FIELD_SCALE = .35;
  Constants.KINZ_SCALE = .27;
  Constants.INTERFACE_PAUSE_BDY = .96;
  Constants.INTERFACE_BDY = .065;
  Constants.INTERFACE_BDX = .143;
  Constants.INTERFACE_BDDX = .073;
  Constants.INTERFACE_D = .025;
  Constants.HELP_START_CLOSE_Y = .19;
  Constants.HELP_START_CLOSE_X = .84;
  Constants.HELP_BACK_DX = .55;
  Constants.HELP_START_BERRY_Y = .34;
  Constants.HELP_START_BERRY_X = .34;
  Constants.HELP_START_INFO_Y = .26;
  Constants.HELP_START_HERO_Y = .6;
  Constants.HELP_START_HERO_X = .3;
  Constants.HELP_START_ARM_Y = .76;
  Constants.HELP_START_ARM_X = .45;
  Constants.HELP_DELTA_PHASE = .15;
  Constants.HELP_BLACKBERRY_SCALE = 1.3;
  Constants.HELP_TEXT_SCALE = 5.5;
  Constants.FRUIT_DH = .2;
  Constants.STARTED_ANIMATION_Y_LIMIT = .9;
  Constants.STARTED_ANIMATION_Y_LIMIT2 = .8;
  Constants.STARTED_ANIMATION_W = .2;
  Constants.STARTED_ANIMATION_DY = .43;
  Constants.STARTED_ANIMATION_SCALE_WATERMELON = 1.12;
  Constants.STARTED_ANIMATION_PHASE_WATERMELON = .58;
  Constants.STARTED_ANIMATION_PHASE_PINEAPPLE = 1.95;
  Constants.STARTED_ANIMATION_SCALE_PINEAPPLE = .6;
  Constants.STARTED_ANIMATION_DDDY = .7;
  Constants.BOMB_PHASE_START2 = .25;
  Constants.BOMB_AMP_START2 = .02;
  Constants.BOMB_AMP_START = .001;
  Constants.FRUIT_ROTATION_SPEED_M = 3;
  Constants.FRUIT_ROTATION_SPEED = .035;
  Constants.FRUIT_PINEAPPLE_SPPED_Y = .6;
  Constants.FRUIT_PINEAPPLE_SPPED_X = .39;
  Constants.JUMP_FRUIT_MULT = 1.5;
  Constants.JUMP_BONUS_RAND = .6;
  Constants.PINEAPPLE_COST = 150;
  Constants.BANANA_COST = 300;
  Constants.WATERMELON_COST = 200;
  Constants.TIME_COST = 500;
  Constants.FRUIT_WATER_COSTS = [0, 0, 0, 0, 0, 0, 11, 13, 10, 7, 14, 10, 5, 45, 0, 6, 8, 10, 0, 0, 4, 17, 0, 4, 2, 7, 6, 14, 0, 20, 6, 0, 16, 4, 9, 6, 8];
  Constants.FRUIT_PINE_COSTS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10, 6, 6, 4, 0, 0, 6, 17, 0, 3, 1, 7, 5, 6, 0, 6, 5, 9, 4, 4, 6, 3, 4];
  Constants.FRUIT_BANANA_COSTS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 13, 5, 10, 0, 4, 18, 10, 4, 2, 9, 4, 10, 0, 6, 6, 11, 6, 4, 12, 5, 2];
  Constants.FRUIT_RED_COSTS = [0, 0, 0, 0, 0, 0, 0, 0, 20, 13, 15, 23, 50, 0, 30, 20, 21, 20, 45, 31, 0, 12, 30, 0, 25, 21, 23, 19, 25, 0, 25, 20, 30, 25, 14, 14, 22];
  Constants.FRUIT_GREEN_COSTS = [0, 0, 0, 25, 30, 30, 19, 27, 20, 10, 20, 23, 50, 0, 30, 21, 13, 25, 0, 39, 45, 13, 0, 33, 22, 6, 16, 33, 25, 0, 19, 20, 30, 17, 40, 20, 7];
  Constants.FRUIT_STRAW_COSTS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 16, 24, 0, 0, 20, 20, 21, 19, 0, 30, 0, 11, 30, 31, 26, 24, 23, 18, 25, 68, 20, 20, 14, 0, 10, 16, 29];
  Constants.FRUIT_BLACK_COSTS = [100, 100, 100, 75, 70, 70, 70, 60, 50, 40, 35, 10, 0, 55, 0, 20, 18, 17, 45, 0, 41, 12, 30, 25, 22, 26, 23, 0, 25, 0, 19, 20, 0, 46, 9, 36, 28]; // public static const FRUIT_COSTS:Array = [FRUIT_BLACK_COSTS, FRUIT_STRAW_COSTS, FRUIT_RED_COSTS, FRUIT_GREEN_COSTS, FRUIT_BANANA_COSTS, FRUIT_WATER_COSTS, FRUIT_PINE_COSTS];

  Constants.FRUIT_COSTS_2 = [50, 80, 65, 55];
  Constants.START_MENU_BACK_SCALE_M = .94;
  Constants.START_MENU_BACK_SCALE = 1.06;
  Constants.START_MENU_B_PLAY_Y = .84;
  Constants.START_MENU_B_PLAYE_S = .25;
  Constants.SHELF_DELTA_Y = .012;
  Constants.LOSE_TIMER = 20;
  Constants.PLAYER_DELTA_Y = .3;
  Constants.BONUS_START_Y = .05;
  Constants.POINTS_START_SCALE = 1.3;
  Constants.POINTS_RAND_START_X = .05;
  Constants.POINTS_START_X = .09;
  Constants.GOOD_WORDS_CHANCE = .7;
  Constants.START_CAMERA_SPEED = .097;
  Constants.PLAYER_MOVE_LIMIT_X = .02;
  Constants.SHAKE_POWER = .1;
  Constants.FRUIT_KICK_DELTA_X = .2;
  Constants.FRUIT_KICK_DELTA_Y = .65;
  Constants.STARFALL_ALPHA_SMOOTH = .15;
  Constants.SHAKE_SMOOTH = .1;
  Constants.POINTS_ALPHA_SPEED = .02;
  Constants.POINTS_Y_SPEED = .0025;
  Constants.POINTS_SCALE_SMOOTH = .17;
  Constants.CONTAINER_START_X = .7;
  Constants.START_X = .9;
  Constants.MAX_FRUIT_TEXTS = 4;
  Constants.MACHINE_DY = .28;
  Constants.MACHINE_DX = 1.3;
  Constants.GROW_LEVEL_1 = 9;
  Constants.GROW_LEVEL_2 = 18;
  Constants.GROW_LEVEL_3 = 27;
  Constants.FRAME_RATE = 60;
  Constants.START_WAIT_TIMER = 45;
  Constants.MAX_WAIT_TIMER = -120;
  Constants.GOOD_WORD_TIMER = Constants.FRAME_RATE * 3;
  Constants.KEYBOARD_DELTA_X = .05;
  Constants.START_MENU = 1;
  Constants.RATE = 1 / Constants.FRAME_RATE;
  Constants.RATE_S = 30 / Constants.FRAME_RATE;
  Constants.I_RATE_S = 1 / Constants.RATE_S;
  Constants.FRUIT_SCALE_SMOOTH = .2;
  Constants.START_ANIM_PHASE_R_AMP = .2;
  Constants.START_ANIM_PHASE_R_AMP_PINE = .1;
  Constants.START_ANIM_PHASE_SPEED = .2;
  Constants.START_ANIM_PHASE_SPEED_PINE = .9;
  Constants.START_ANIM_FRUITS_SCALE = .4;
  Constants.BATUT_ASPEED = .02;
  Constants.PLAYER_LOSE_SPEED = .03;
  Constants.PLAYER_LOSE_TIMER = 18;
  Constants.PLAYER_WAIT_LOSE_TIMER = 100;
  Constants.LEVEL_GROW_DELAY = 20;
  Constants.WORD_ALPHA_OUT_LIMIT = 0.01;
  Constants.WORD_ALPHA_PRE_LIMIT = 0.89;
  Constants.WORD_ALPHA_PRE_SPEED = 0.004;
  Constants.WORD_SPEED_Y = .001;
  Constants.WORD_SCALE_SPEED = .1;
  Constants.WORD_ALPHA_OUT_SPEED = .1;
  Constants.STAR_FALL_STAR_TIMER = Constants.FRAME_RATE * .34;
  Constants.STAR_FALL_TIMER = Constants.FRAME_RATE * 5;
  Constants.FRUIT_SCALE_2 = 1.1;
  Constants.PLAYER_STARS_DX = .34;
  Constants.PINEAPPLE_TIMER = 22;
  Constants.START_POSITION = .62;
  Constants.BOMB_AREA_DX = .1;
  Constants.BOMB_AREA_W = .82;
  Constants.BOMB_START_Y = .05;
  Constants.SECOND_JUMP = 1.3;
  Constants.BOMB_TIME_DISTANCE = 20;
  Constants.BONUS_START_X = 1.15;
  Constants.WAIT_BONUS_TIMER = 4 * Constants.I_RATE_S;
  Constants.MAX_FRUIT_COUNT_TO_STARFALL = 60;
  Constants.AREAS_COUNT = 5;
  Constants.WAIT_RESPAWN = 9 * Constants.I_RATE_S;
  Constants.SPAWN_SPEED_MULT = 2;
  Constants.SPEED_COLLECT_MULT = 2;
  Constants.COMBO_MAX = 10;
  Constants.START_WAIT_TIME = 5;
  Constants.PLAYER_H = .025;
  Constants.PLAYER_W = .17;
  Constants.PLAYER_BROCK_DY = .65;
  Constants.SPEED_COLLECT_ANTIMULT = .25;
  Constants.RIGHT_FRUIT_LIMIT_X = 1.15;
  Constants.GRAVITY = .013 * Constants.RATE_S;
  Constants.SPEED_Y = -.09;
  Constants.SPEED_MIN = .03;
  Constants.SPEED_MAX = .22;
  Constants.SPEED_COLLECT = Constants.SPEED_MAX;
  Constants.SPEED_X_MULT = .65;
  Constants.ACCEL_BONUS_X = .976;
  Constants.ACCEL_X = .98;
  Constants.FRUIT_MOVE_SPEED = .02 * Constants.RATE_S;
  Constants.JUMP_START_X_LIMIT = .22;
  Constants.FRUIT_SCALE = .9;
  Constants.FLOOR_H = .338;
  Constants.FLOOR_DY = .18;
  Constants.FRUIT_START_X = -.08;
  Constants.FRUIT_DISTANCE = .08;
  Constants.RAND_BASE = .5;
  Constants.RAND_MULT = .5;
  Constants.MAX_CHANCE = 100;
  Constants.MAX_SPEED = 100;
  Constants.GROW_MULT = 1 / 100;
  Constants.LEVELS_COUNT = 36;
  Constants.DELTA_CAMERA = .09;
  Constants.PARALAX_CAMERA = .065;
  Constants.PARALAX_CAMERA_2 = .5;
  Constants.PLAYER_SPEED = .15 * Constants.RATE_S;
  Constants.PLAYER_DY = .93;
  Constants.CAMERA_SMOOTH = .03;
  Constants.MOVE_LIMIT_X = .92;
  Constants.MOVE_LIMIT_DX = 3.3;
  Constants.PLAYER_MOVE_SMOOTH = .25;
  Constants.PLAYER_HERO_GIRL_DY = .28;
  Constants.PLAYER_HERO_BOY_DY = .38;
  Constants.PLAYER_HERO1_DX = .38;
  Constants.PLAYER_HERO2_DX = .84;
  Constants.PLAYER_HAND1_DX = .23;
  Constants.PLAYER_HAND2_DX = .81;
  Constants.PLAYER_HAND_DY = .85;
  Constants.FINISH_DELTA = [36, 5, 78, 60, 40];
  Constants.INTERFACE_SCALE2 = 1.1;
  Constants.INTERFACE_SCALE = .95;
  Constants.HELP_SCALE = .7;
  Constants.INSTRUCTION_PREV_X = .3;
  Constants.INSTRUCTION_NEXT_X = .7;
  Constants.INSTRUCTION_INSTR_1 = .3;
  Constants.INSTRUCTION_INSTR_2 = .6;
  Constants.INSTRUCTION_BUTTON_Y = .93;
  Constants.INSTRUCTION_BUTTON_CLOSE_X = .95;
  Constants.INSTRUCTION_LOGO_Y = .025;
  Constants.INSTRUCTION_BUTTON_CLOSE_Y = 0.06;
  Constants.DELTA_FINISH_SIZE = 50;
  Constants.FINISH_SIZE_Y = .8;
  Constants.MUSH_SIZE_Y = .8;
  Constants.LOG_SIZE_X = .3;
  Constants.LOG_SIZE_Y = .9;
  Constants.LOG_IMG_DELTA_X = .12;
  Constants.LOG_IMG_DELTA_Y = .13;
  Constants.MUSH_DELTA_IMG_Y1 = .37;
  Constants.MUSH_DELTA_IMG_Y2 = .57;
  Constants.MUSH_DELTA_IMG_Y3 = .77;
  Constants.MUSH_DELTA_IMG_X = .35;
  Constants.ROCK_DELTA_IMG_X = 1.1;
  Constants.ROCK_DELTA_IMG_Y = 2;
  Constants.LILI_DELTA_IMG_X = .12;
  Constants.LILI_DELTA_IMG_Y = .23;
  Constants.LILI_DELTA_SIZE_X = .17;
  Constants.LILI_DELTA_SIZE_Y = 1.2;
  Constants.COUNT_OF_LEVELS = 36;
  Constants.LILY_SINK_TIME = [7, 6, 5, 5, 5, 5, 5, 5, 5, 5];
  Constants.LOG_SINK_TIME = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
  Constants.MUSHROOM_BREAK_TIME = [6, 5, 4, 4, 4, 4, 4, 4, 4, 4];
  Constants.STARTMENU_BUTTONS_SCALE = .4;
  Constants.INSTRUCTION_SCALE = .7;
  Constants.STARTMENU_TUTORIAL_Y = .87;
  Constants.STARTMENU_BUTTONS_Y = .73;
  Constants.GAME_SPEED = .95;
  Constants.JUMP_POWER = 30 * 2 * Constants.GAME_SPEED;
  Constants.COUNT_OF_LIVES = 6;
  Constants.SETTINGS = '{"levels":[{"bcmin":0,"speed":22,"time":20,"bcmax":0,"id":0,"barmor":0,"btime":0,"bonus_period":10,"target":10,"grow":10,"fruits_percent":100,"fruits":[100,0,0,0,0,0,0],"bdc":0},{"bcmin":0,"speed":43,"time":20,"bcmax":0,"id":1,"barmor":0,"btime":0,"bonus_period":10,"target":15,"grow":100,"fruits_percent":100,"fruits":[100,0,0,0,0,0,0],"bdc":0},{"bcmin":0,"speed":45,"time":20,"bcmax":0,"target":20,"barmor":0,"btime":6,"bonus_period":10,"id":2,"grow":100,"fruits_percent":100,"fruits":[100,0,0,0,0,0,0],"bdc":0},{"bcmin":0,"speed":46,"time":20,"bcmax":0,"id":3,"barmor":0,"btime":7,"bonus_period":10,"target":24,"grow":100,"fruits_percent":100,"fruits":[75,0,0,25,0,0,0],"bdc":0},{"bcmin":1,"speed":47,"time":20,"bcmax":1,"target":25,"barmor":1,"btime":10,"bonus_period":10,"id":4,"grow":100,"fruits_percent":100,"fruits":[70,0,0,30,0,0,0],"bdc":1},{"bcmin":1,"speed":48,"time":20,"bcmax":1,"id":5,"barmor":2,"btime":7,"bonus_period":10,"target":26,"grow":76,"fruits_percent":100,"fruits":[70,0,0,30,0,0,0],"bdc":1},{"bcmin":1,"speed":51,"time":20,"bcmax":1,"id":6,"barmor":2,"btime":7,"bonus_period":10,"target":27,"grow":75,"fruits_percent":100,"fruits":[70,0,0,19,0,11,0],"bdc":1},{"bcmin":1,"speed":52,"time":25,"bcmax":2,"id":7,"barmor":4,"btime":6,"bonus_period":10,"target":30,"grow":75,"fruits_percent":100,"fruits":[60,0,0,27,0,13,0],"bdc":2},{"bcmin":2,"speed":55,"time":25,"bcmax":2,"id":8,"barmor":5,"btime":5,"bonus_period":10,"target":27,"grow":36,"fruits_percent":100,"fruits":[50,0,20,20,0,10,0],"bdc":2},{"bcmin":1,"speed":60,"time":25,"bcmax":4,"id":9,"barmor":3,"btime":6,"bonus_period":10,"target":28,"grow":36,"fruits_percent":100,"fruits":[40,30,13,10,0,7,0],"bdc":2},{"bcmin":1,"speed":70,"time":25,"bcmax":4,"id":10,"barmor":2,"btime":5,"bonus_period":10,"target":27,"grow":38,"fruits_percent":100,"fruits":[35,16,15,20,0,14,0],"bdc":2},{"bcmin":1,"speed":80,"time":25,"bcmax":4,"id":11,"barmor":1,"btime":5,"bonus_period":10,"target":27,"grow":30,"fruits_percent":100,"fruits":[10,24,23,23,0,10,10],"bdc":2},{"bcmin":1,"speed":85,"time":25,"bcmax":4,"id":12,"barmor":5,"btime":5,"bonus_period":10,"target":30,"grow":35,"fruits_percent":110,"fruits":[0,0,45,45,0,5,5],"bdc":3},{"bcmin":1,"speed":70,"time":25,"bcmax":4,"id":13,"barmor":7,"btime":7,"bonus_period":10,"target":26,"grow":40,"fruits_percent":100,"fruits":[55,0,0,0,0,45,0],"bdc":3},{"bcmin":1,"speed":85,"time":25,"bcmax":3,"id":14,"barmor":16,"btime":16,"bonus_period":10,"target":30,"grow":35,"fruits_percent":100,"fruits":[0,20,30,30,10,0,10],"bdc":4},{"bcmin":1,"speed":85,"time":25,"bcmax":3,"id":15,"barmor":16,"btime":16,"bonus_period":10,"target":35,"grow":40,"fruits_percent":100,"fruits":[20,20,20,21,7,6,6],"bdc":4},{"bcmin":1,"speed":80,"time":27,"bcmax":3,"id":16,"barmor":12,"btime":12,"bonus_period":8,"target":45,"grow":35,"fruits_percent":100,"fruits":[25,10,13,25,13,8,6],"bdc":4},{"bcmin":1,"speed":80,"time":27,"bcmax":3,"id":17,"barmor":11,"btime":12,"bonus_period":8,"target":47,"grow":37,"fruits_percent":100,"fruits":[17,19,20,25,5,10,4],"bdc":4},{"bcmin":1,"speed":80,"time":28,"bcmax":3,"id":18,"barmor":3,"btime":3,"bonus_period":10,"target":47,"grow":30,"fruits_percent":100,"fruits":[45,0,45,0,10,0,0],"bdc":5},{"bcmin":1,"speed":80,"time":30,"bcmax":3,"id":19,"barmor":7,"btime":8,"bonus_period":5,"target":60,"grow":40,"fruits_percent":100,"fruits":[0,30,31,39,0,0,0],"bdc":4},{"bcmin":1,"speed":80,"time":30,"bcmax":4,"id":20,"barmor":8,"btime":7,"bonus_period":5,"target":60,"grow":40,"fruits_percent":100,"fruits":[41,0,20,25,4,4,6],"bdc":5},{"bcmin":1,"speed":80,"time":30,"bcmax":4,"id":21,"barmor":8,"btime":9,"bonus_period":5,"target":60,"grow":51,"fruits_percent":100,"fruits":[25,11,18,24,8,6,8],"bdc":5},{"bcmin":1,"speed":83,"time":30,"bcmax":3,"id":22,"barmor":10,"btime":11,"bonus_period":30,"target":60,"grow":45,"fruits_percent":100,"fruits":[30,30,30,0,10,0,0],"bdc":5},{"bcmin":1,"speed":80,"time":35,"bcmax":4,"id":23,"barmor":11,"btime":11,"bonus_period":9,"target":80,"grow":40,"fruits_percent":100,"fruits":[25,31,8,25,4,4,3],"bdc":5},{"bcmin":1,"speed":80,"time":30,"bcmax":3,"id":24,"barmor":10,"btime":10,"bonus_period":5,"target":80,"grow":40,"fruits_percent":100,"fruits":[22,26,25,22,2,2,1],"bdc":4},{"bcmin":2,"speed":65,"time":39,"bcmax":3,"id":25,"barmor":7,"btime":14,"bonus_period":8,"target":88,"grow":38,"fruits_percent":100,"fruits":[26,19,21,11,9,7,7],"bdc":3},{"bcmin":2,"speed":75,"time":40,"bcmax":3,"id":26,"barmor":9,"btime":8,"bonus_period":5,"target":100,"grow":42,"fruits_percent":100,"fruits":[23,23,23,16,4,6,5],"bdc":2},{"bcmin":1,"speed":86,"time":40,"bcmax":3,"id":27,"barmor":10,"btime":12,"bonus_period":10,"target":120,"grow":36,"fruits_percent":100,"fruits":[10,18,19,33,5,9,6],"bdc":2},{"bcmin":1,"speed":80,"time":40,"bcmax":3,"id":28,"barmor":12,"btime":15,"bonus_period":12,"target":120,"grow":40,"fruits_percent":100,"fruits":[5,40,20,10,5,5,10],"bdc":3},{"bcmin":1,"speed":80,"time":40,"bcmax":3,"id":29,"barmor":14,"btime":15,"bonus_period":20,"target":115,"grow":36,"fruits_percent":100,"fruits":[0,68,0,0,6,20,6],"bdc":3},{"bcmin":1,"speed":79,"time":45,"bcmax":3,"id":30,"barmor":11,"btime":12,"bonus_period":20,"target":120,"grow":19,"fruits_percent":100,"fruits":[8,40,20,10,9,8,5],"bdc":3},{"bcmin":1,"speed":80,"time":40,"bcmax":3,"id":31,"barmor":15,"btime":12,"bonus_period":16,"target":125,"grow":23,"fruits_percent":100,"fruits":[18,20,20,18,13,0,11],"bdc":3},{"bcmin":1,"speed":80,"time":47,"bcmax":3,"id":32,"barmor":12,"btime":12,"bonus_period":13,"target":130,"grow":21,"fruits_percent":100,"fruits":[0,14,30,30,6,16,4],"bdc":3},{"bcmin":1,"speed":80,"time":47,"bcmax":3,"id":33,"barmor":12,"btime":12,"bonus_period":10,"target":130,"grow":21,"fruits_percent":100,"fruits":[15,20,20,12,9,9,15],"bdc":4},{"bcmin":1,"speed":80,"time":47,"bcmax":3,"id":34,"barmor":12,"btime":13,"bonus_period":9,"target":140,"grow":17,"fruits_percent":100,"fruits":[9,10,14,40,12,9,6],"bdc":4},{"bcmin":1,"speed":80,"time":50,"bcmax":3,"id":35,"barmor":16,"btime":16,"bonus_period":12,"target":150,"grow":18,"fruits_percent":100,"fruits":[11,36,20,10,9,11,3],"bdc":4},{"bcmin":1,"speed":80,"time":52,"bcmax":3,"id":36,"barmor":11,"btime":10,"bonus_period":10,"target":200,"grow":45,"fruits_percent":100,"fruits":[28,29,22,7,2,8,4],"bdc":5}]}';
  src.Constants = Constants;
})(src || (src = {}));

var src;

(function (src) {
  var AbstractManager =
  /*#__PURE__*/
  function (_Phaser$Group2) {
    _inherits(AbstractManager, _Phaser$Group2);

    function AbstractManager(level) {
      var _this4;

      _classCallCheck(this, AbstractManager);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractManager).call(this, level.game));
      _this4.level = level;
      return _this4;
    }

    return AbstractManager;
  }(Phaser.Group);

  src.AbstractManager = AbstractManager;
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var MyGame =
    /*#__PURE__*/
    function (_Phaser$Group3) {
      _inherits(MyGame, _Phaser$Group3);

      function MyGame(level, n) {
        var _this5;

        var gd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var pd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var ot = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : MyGame.PORTRAIT_ORIENTATION;
        var isClip = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

        _classCallCheck(this, MyGame);

        _this5 = _possibleConstructorReturn(this, _getPrototypeOf(MyGame).call(this, level.game, null));
        _this5.MUSIC = true;
        _this5.SOUND = true;
        _this5.DEV = false;
        _this5.level = level;
        _this5.isClipped = isClip;
        _this5.lastOrientation = _this5.orientationType = ot;
        _this5.loops = [];
        _this5.channels = [];
        _this5.memory = new lqs.Memory(gd, pd);
        _this5.visible = true;
        _this5.SETTINGS = JSON.parse(src.Constants.SETTINGS);

        _this5.start(320, 480, 480, 480);

        return _this5;
      }

      _createClass(MyGame, [{
        key: "start",
        value: function start(w, h, mw, mh) {
          this.RW = this.W = w;
          this.RH = this.H = h;
          this.MW = mw;
          this.MH = mh;
          this.startS = 1;
        }
      }, {
        key: "load",
        value: function load(slot) {
          var obj = this.memory.load(slot);

          if (obj) {
            return obj;
          }

          if (this.PARAMETES_SLOT == slot) {
            obj = this.memory.getParamData();
          }

          if (this.SETTINGS_SLOT == slot) {
            obj = this.memory.getGameData();
          }

          return obj;
        }
      }, {
        key: "save",
        value: function save(slot, obj) {
          this.memory.save(slot, obj);
        }
      }]);

      return MyGame;
    }(Phaser.Group);

    MyGame.CHANGED = 'CHANGED';
    MyGame.PORTRAIT_ORIENTATION = 0;
    MyGame.LANDSCAPE_ORIENTATION = 1;
    MyGame.BOTH_ORIENTATION = 2;
    lqs.MyGame = MyGame;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Point = Phaser.Point;

    var LImage =
    /*#__PURE__*/
    function (_Phaser$Image) {
      _inherits(LImage, _Phaser$Image);

      function LImage(g, tn, px, py, s) {
        var _this6;

        var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

        _classCallCheck(this, LImage);

        _this6 = _possibleConstructorReturn(this, _getPrototypeOf(LImage).call(this, src.App.instance, px, py, tn));
        _this6.myGame = g;

        if (s < 0) {
          switch (s) {
            case LImage.ORIGIN_Y:
              _this6.scale.set(g.RH / g.H);

              break;

            case LImage.ORIGIN:
              _this6.scale.set(g.RW / g.W);

              break;

            case LImage.FIT_HEIGHT:
              _this6.scale.set(g.RH / _this6.height);

              break;

            case LImage.FIT_TO_RECT:
              _this6.scale.y = g.RH / _this6.height;
              _this6.scale.x = g.RW / _this6.width;
              break;

            case LImage.FIT_WIDTH:
              _this6.scale.set(g.RW / _this6.width);

              break;

            case LImage.FIT_TO_MAX_SIZE:
              _this6.scale.set(Math.max(g.RW / _this6.width, g.RH / _this6.height));

              break;
          }
        } else {
          _this6.scale.set(s);
        }

        if (anchor) {
          _this6.anchor.set(anchor.x, anchor.y);
        } else {
          _this6.anchor.set(0, 0);
        }

        _this6.point = new Point(_this6.x, _this6.y);
        return _this6;
      }

      _createClass(LImage, [{
        key: "changeTexture",
        value: function changeTexture(t) {
          this.loadTexture(t);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          _get(_getPrototypeOf(LImage.prototype), "destroy", this).call(this);

          this.myGame = null;
          this.point = null;
        }
      }, {
        key: "Start",
        set: function set(v) {
          this.point = v;
        },
        get: function get() {
          return this.point;
        }
      }, {
        key: "Scale",
        get: function get() {
          return this.scale.x;
        },
        set: function set(v) {
          this.scale.set(v);
        }
      }]);

      return LImage;
    }(Phaser.Image);

    LImage.FIT_WIDTH = -1;
    LImage.FIT_HEIGHT = -2;
    LImage.FIT_TO_MAX_SIZE = -3;
    LImage.FIT_TO_RECT = -4;
    LImage.ORIGIN = -5;
    LImage.ORIGIN_Y = -6;
    lqs.LImage = LImage;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Variable =
    /*#__PURE__*/
    function () {
      function Variable(v) {
        _classCallCheck(this, Variable);

        this.Value = v;
      }

      _createClass(Variable, [{
        key: "encrypt",
        value: function encrypt(v) {
          var vs = v.toString();
          var summ = 0;
          var s = '';
          var i;

          for (i = 0; i < vs.length; i++) {
            if (vs.charAt(i) == '.') {
              s += 'S';
            } else {
              summ += parseInt(vs.charAt(i));
              s += Variable.table[parseInt(vs.charAt(i))];
            }
          }

          s += 'M';
          var summS = summ.toString();

          for (i = 0; i < summS.length; i++) {
            if (summS.charAt(i) == '.') {
              s += 'S';
            } else {
              s += Variable.table[parseInt(summS.charAt(i))];
            }
          }

          return s;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.valueString = null;
        }
      }, {
        key: "Hash",
        get: function get() {
          return this.valueString;
        }
      }, {
        key: "Value",
        get: function get() {
          return Variable.decrypt(this.valueString);
        },
        set: function set(v) {
          this.valueString = this.encrypt(v);
        }
      }], [{
        key: "decrypt",
        value: function decrypt(vs) {
          var vvs = vs;
          var old;
          var i = 0;

          while (true) {
            old = vvs;
            vvs = vvs.replace('S', '.');
            if (vvs == old) break;
          }

          var arr = vvs.split('M');

          if (arr.length == 2) {
            var value = arr[0];

            for (i = 0; i < Variable.table.length; i++) {
              old = value;
              value = value.replace(Variable.table[i], i.toString());
              if (old != value) i--;
            }

            var summ = arr[1];

            for (i = 0; i < Variable.table.length; i++) {
              old = summ;
              summ = summ.replace(Variable.table[i], i.toString());
              if (old != summ) i--;
            }

            var summInt = 0;

            for (i = 0; i < value.length; i++) {
              if (value.charAt(i) == '.') {} else {
                summInt += parseInt(value.charAt(i));
              }
            }

            if (summInt.toString() != summ) {
              return null;
            } else {
              return parseInt(value);
            }
          } else {
            return null;
          }
        }
      }, {
        key: "parse",
        value: function parse(vs) {
          var variable = new Variable(Variable.decrypt(vs));
          return variable;
        }
      }]);

      return Variable;
    }();

    Variable.table = ['a', 'b', 'G', 'gT', 'sO', 'Dp', 'l>', 'c', 'fn', 'pK'];
    lqs.Variable = Variable;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Loop =
    /*#__PURE__*/
    function (_Phaser$Group4) {
      _inherits(Loop, _Phaser$Group4);

      function Loop(g, n) {
        var _this7;

        _classCallCheck(this, Loop);

        _this7 = _possibleConstructorReturn(this, _getPrototypeOf(Loop).call(this, src.App.instance, null));
        _this7.name = n;
        _this7.positions = [];
        _this7.myGame = g;
        _this7.visible = false;
        return _this7;
      }

      _createClass(Loop, [{
        key: "removeAllChildrenFrom",
        value: function removeAllChildrenFrom(container) {
          container.destroy();
          return this;
        }
      }, {
        key: "hide",
        value: function hide() {
          this.visible = false;
        }
      }, {
        key: "init",
        value: function init() {
          this.visible = true;
        }
      }, {
        key: "update",
        value: function update() {}
      }, {
        key: "go_back",
        value: function go_back() {}
      }, {
        key: "applyNewOrientation",
        value: function applyNewOrientation(o) {}
      }, {
        key: "addPositions",
        value: function addPositions(ac, p) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = ac[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var c = _step.value;
              this.addPosition(c, p);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }, {
        key: "addPosition",
        value: function addPosition(c, p) {
          this.positions.push({
            object: c,
            parent: p,
            point: new Phaser.Point()
          });
        }
      }, {
        key: "applyPositions",
        value: function applyPositions() {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.positions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var pos = _step2.value;
              pos.object.x = pos.parent.x + pos.parent.width * pos.point.x;
              pos.object.y = pos.parent.y + pos.parent.height * pos.point.y;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: "dispatch",
        value: function dispatch(t) {
          var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          dispatchEvent(new lqs.LEvent(t, data));
        }
      }, {
        key: "Name",
        get: function get() {
          return this.name;
        }
      }, {
        key: "Scale",
        get: function get() {
          return this.scale.x;
        },
        set: function set(v) {
          this.scale.set(v);

          if (this.back) {
            if (this.myGame.scaleType == 1) {
              this.back.scale.y = this.myGame.MH / this.myGame.H / v;
            } else {
              this.back.scale.y = this.myGame.MW / this.myGame.W / v;
            }
          }
        }
      }, {
        key: "PositionsData",
        set: function set(v) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.positions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var pos = _step3.value;
              var id = this.positions.indexOf(pos);

              if (v[id]) {
                pos.point = new Phaser.Point(v[id][0], v[id][1]);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        },
        get: function get() {
          var arr = [];
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this.positions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var pos = _step4.value;
              arr.push([pos.point.x, pos.point.y]);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          return arr;
        }
      }, {
        key: "Positions",
        get: function get() {
          return this.positions;
        }
      }]);

      return Loop;
    }(Phaser.Group);

    lqs.Loop = Loop;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var LEvent =
    /*#__PURE__*/
    function (_Event) {
      _inherits(LEvent, _Event);

      function LEvent(t) {
        var _this8;

        var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, LEvent);

        _this8 = _possibleConstructorReturn(this, _getPrototypeOf(LEvent).call(this, t));
        _this8.transfer = d;
        return _this8;
      }

      _createClass(LEvent, [{
        key: "Data",
        get: function get() {
          return this.transfer;
        }
      }]);

      return LEvent;
    }(_wrapNativeSuper(Event));

    LEvent.GO_SCREEN = 'GO_SCREEN';
    LEvent.DEV_BUTTON_CLICK = 'DEV_BUTTON_CLICK';
    LEvent.DEV_BUTTON_DOWN = 'DEV_BUTTON_DOWN';
    LEvent.DEV_BUTTON = 'DEV_BUTTON';
    LEvent.BUTTON_DOWN = 'BUTTON_DOWN';
    LEvent.BUTTON_UP = 'BUTTON_UP';
    LEvent.SLIDER_CHANGE = 'SLIDER_CHANGE';
    LEvent.CELL_UP = 'CELL_UP';
    LEvent.CELL_DOWN = 'CELL_DOWN';
    lqs.LEvent = LEvent;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {})); ///<reference path="../lqs/LImage.ts"/>
///<reference path="../lqs/Variable.ts"/>
///<reference path="../lqs/Loop.ts"/>
///<reference path="../../gameplay/Constants.ts"/>
///<reference path="../lqs/LEvent.ts"/>


var src;

(function (src) {
  var loops;

  (function (loops) {
    var Variable = src.lqs.Variable;
    var LImage = src.lqs.LImage;
    var Loop = src.lqs.Loop;

    var GamePlay =
    /*#__PURE__*/
    function (_Loop) {
      _inherits(GamePlay, _Loop);

      function GamePlay(g) {
        var _this9;

        _classCallCheck(this, GamePlay);

        _this9 = _possibleConstructorReturn(this, _getPrototypeOf(GamePlay).call(this, g, 'GamePlay'));
        _this9.levelID = 0;
        _this9.transitionEndTimer = 14;
        _this9.fruits = [];
        _this9.best = new Variable(0);
        _this9.fruitManager = new loops.FruitManager(g);

        _this9.addChild(_this9.backgroundContainer = _this9.game.make.group());

        _this9.backgroundContainer.add(_this9.background = new LImage(g, 'bg1', 0, 0, LImage.FIT_HEIGHT));

        _this9.backgroundContainer.add(_this9.background_next = new LImage(g, 'bg1', 0, 0, LImage.FIT_HEIGHT));

        _this9.backgroundContainer.add(_this9.background2 = new LImage(g, 'bg1_super', 0, 0, LImage.FIT_HEIGHT));

        _this9.addChild(_this9.container = _this9.game.make.group());

        _this9.container.addChild(_this9.shelf = _this9.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'shelf0000'));

        _this9.container.addChild(_this9.shelf2 = _this9.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'shelf_super0000'));

        _this9.container.addChild(_this9.ground = _this9.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'ground0000'));

        _this9.container.addChild(_this9.ground2 = _this9.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'ground_super0000'));

        _this9.container.addChildAt(_this9.machine = new loops.Machine(g, _this9.myGame.RW * src.Constants.MACHINE_DX, _this9.myGame.RW * src.Constants.MACHINE_DY, _this9.container), _this9.container.children.length - 5);

        _this9.container.addChild(_this9.backgroundEffectsContainer = _this9.game.make.group());

        _this9.container.addChild(_this9.player = new loops.Player(_this9.myGame, 0, 0));

        _this9.container.addChild(_this9.fruitsContainer = _this9.game.make.group());

        _this9.container.addChild(_this9.effectsContainer = _this9.game.make.group());

        _this9.myGame.level.eventManager.onPlayerKilled.add(_this9.dispatchPlayerDead, _assertThisInitialized(_this9));

        _this9.bonuses = [];
        _this9.fruitPoints = [];
        _this9.fruitKicks = [];
        _this9.lastBonusKick = 0;
        _this9.lastFruitPoint = 0;
        _this9.lastFruitKick = 0;
        var s = g.RW / g.W;

        for (var i = 0; i < src.Constants.MAX_FRUIT_TEXTS; i++) {
          _this9.fruitPoints.push(src.TextUtils.getStyledText('', 0, 0, 26, '#ffffff', 'rgba(0,0,0,0.15)', 5));

          _this9.effectsContainer.add(_this9.fruitPoints[i]);

          _this9.fruitPoints[i].alpha = 0;
          _this9.fruitPointScale = _this9.fruitPoints[i].scale.x;

          _this9.fruitKicks.push(new src.AnimatedEffect('effects', 'fruit_kick', 30, false));

          _this9.effectsContainer.add(_this9.fruitKicks[i]);

          _this9.fruitKicks[i].visible = false;

          _this9.bonuses.push(new src.AnimatedEffect('effects', 'bonus_kick_effect', 39, false));

          _this9.effectsContainer.add(_this9.bonuses[i]);

          _this9.bonuses[i].visible = false;
        }

        _this9.container.add(_this9.shading = _this9.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'shading20000'));

        _this9.shading.scale.set(2);

        _this9.addChild(_this9.gui = new loops.Interface(g));

        _this9.addListeners();

        _this9.init();

        return _this9;
      }

      _createClass(GamePlay, [{
        key: "addListeners",
        value: function addListeners() {
          this.game.input.addMoveCallback(this.handlePointerMove, this);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.game.input.deleteMoveCallback(this.handlePointerMove, this);
          this.bonuses = null;
          this.fruitKicks = null;
          this.fruitPoints = null;
          this.combo = null;
          this.best = null;
          this.points = null;
          this.comboPoints = null;
          this.background = null;
          this.background2 = null;
          this.background_next = null;
          this.shading = null;
          this.container = null;
          this.shelf = null;
          this.shelf2 = null;
          this.ground = null;
          this.ground2 = null;
          this.player = null;
          this.LEVEL = null;
          this.fruits = null;
          this.fruitsContainer = null;
          this.fruitManager = null;
          this.bombTiming = null;
          this.machine = null;

          _get(_getPrototypeOf(GamePlay.prototype), "destroy", this).call(this);
        }
      }, {
        key: "init",
        value: function init() {
          _get(_getPrototypeOf(GamePlay.prototype), "init", this).call(this);

          this.isStarted = false;
          src.SoundController.instance.playMusic('MusicGamePlay', false);
          src.SoundController.instance.chokeMusicVolume();
          src.SoundController.instance.playSound('SoundIntro');
          this.loseTimer = -1;
          this.nextLevelID = 2;
          this.background.changeTexture('bg1');
          this.background2.changeTexture('bg1_super');
          this.background_next.visible = false;
          this.nextLevelTimer = -1;
          this.ground2.visible = this.shelf2.visible = this.background2.visible = false;
          this.shake = 0;
          this.waitTimer = src.Constants.START_WAIT_TIMER;
          this.comboPoints = new Variable(0);
          this.speedStartX = 0;
          this.startX = -this.myGame.RW * src.Constants.START_X;
          this.combo = new Variable(0);
          this.points = new Variable(0);
          this.machine.init();
          this.startTimer = src.Constants.START_WAIT_TIME;
          this.starTimer = 0;
          this.starFallTimer = 0;
          this.player.IsArmored = false;
          this.waitRespawnTimer = 0;
          this.isLose = false;
          this.isStarfall = false;
          this.isWin = false;

          while (this.fruits.length) {
            this.fruitsContainer.removeChild(this.fruits[0].destroy());
            this.fruits.splice(0, 1);
          }

          this.player.init();
          this.player.idle();
          this.container.x = this.startX * src.Constants.CONTAINER_START_X;
          this.lastX = this.myGame.RW * src.Constants.START_POSITION * 1.25;
          this.player.x = this.myGame.RW * src.Constants.START_POSITION;
          this.initLevel(this.levelID);
          this.Scale = 1;
        }
      }, {
        key: "update",
        value: function update() {
          _get(_getPrototypeOf(GamePlay.prototype), "update", this).call(this);

          if (this.myGame.level.gameStateManager.isPaused()) {
            return;
          }

          if (this.transitionEndTimer-- > 0) {
            this.shading.x = -this.container.x;
            return;
          }

          if (this.visible && !this.isWin) {
            src.MedalManager.instance.addValue(src.MedalType.JUICY_HOUR, this.game.time.elapsedMS / 1000 / 60, false);
            var pointT;

            for (var fk = 0; fk < this.fruitKicks.length; fk++) {
              pointT = this.fruitPoints[fk];

              if (pointT.visible) {
                if (pointT.scale.x > this.fruitPointScale * 1.02) {
                  pointT.scale.set(pointT.scale.x + (this.fruitPointScale - pointT.scale.x) * src.Constants.POINTS_SCALE_SMOOTH);
                } else {
                  pointT.y -= this.myGame.RW * src.Constants.POINTS_Y_SPEED;
                  pointT.alpha -= src.Constants.POINTS_ALPHA_SPEED;
                }

                if (pointT.alpha < 0.01) {
                  pointT.visible = false;
                }
              }
            }

            var shakeW = this.myGame.RW * src.Constants.SHAKE_POWER;
            this.container.x += (-(this.lastX - this.myGame.RW / 2) * src.Constants.PARALAX_CAMERA + this.shake * (Math.random() - .5) * shakeW + this.startX - this.myGame.RW * src.Constants.DELTA_CAMERA - this.container.x) * src.Constants.CAMERA_SMOOTH;
            this.startX -= this.speedStartX;

            if (this.speedStartX > -10) {
              this.speedStartX -= src.Constants.START_CAMERA_SPEED;
            }

            this.startX = Math.min(0, this.startX);
            this.shading.x = -this.container.x;
            this.container.y += (this.shake * (Math.random() - .5) * shakeW - this.container.y) * .1;
            this.backgroundContainer.y = this.container.y * 0.7;
            this.background.x = this.container.x * src.Constants.PARALAX_CAMERA_2;
            this.shake += (0 - this.shake) * src.Constants.SHAKE_SMOOTH;
            this.machine.update();

            if (this.background_next.visible && this.nextLevelTimer < 0) {
              this.background.y += (this.background.height - this.background.y) * .037;
              this.background_next.y = this.background.y - this.background.height;
              this.background_next.x = this.background.x;

              if (this.background.y > this.background.height * .99) {
                this.background.changeTexture('bg' + this.nextLevelID);
                this.background2.changeTexture('bg' + this.nextLevelID + '_super');
                this.background_next.visible = false;
                this.background.y = 0;
              }
            }

            if (this.waitTimer > 0) {
              this.waitTimer--;
            } else {
              if (this.waitTimer > src.Constants.MAX_WAIT_TIMER) {
                this.waitTimer--;
              }

              if (this.waitTimer == src.Constants.MAX_WAIT_TIMER && !this.isStarted) {
                this.isStarted = true;

                if (GamePlay.isFirstTime) {
                  GamePlay.isFirstTime = false;
                  src.WindowManager.instance.showHelp(true);
                } else {
                  // SoundController.instance.restoreMusicVolume();
                  src.SoundController.instance.playMusic('MusicGamePlay');
                }
              }

              if (!this.player.IsDead && this.waitTimer == src.Constants.MAX_WAIT_TIMER && this.nextLevelTimer < 0) {
                this.time -= this.isStarfall ? 0 : src.Constants.RATE;
              }

              this.gui.Time = this.time;

              if (this.time < 0) {
                if (!this.player.IsDead) {
                  this.gui.out_of_time();
                  this.player.dieTime();
                }
              }

              this.gui.updateLogic();
              this.player.updateLogic();
              var fruit;
              var playerW = this.myGame.RW * src.Constants.PLAYER_W;
              var playerY = this.player.y - this.myGame.RW * src.Constants.PLAYER_H;
              var right = this.myGame.RW * src.Constants.RIGHT_FRUIT_LIMIT_X;
              /* fruit */

              for (var f = 0; f < this.fruits.length; f++) {
                fruit = this.fruits[f];
                fruit.move();

                if (fruit.x > right) {
                  fruit.killFruit(1);
                  this.target--;
                  this.gui.Remains = this.target;
                  this.bonusPeriod--;

                  if (this.target == 0) {
                    this.initLevel(this.levelID + 1);
                  }
                }

                if (fruit.y > playerY && !fruit.IsCollected) {
                  if (fruit.y > this.ground.y) {
                    fruit.killFruit(0);
                    fruit.y = this.ground.y;
                    this.lostFruit(fruit);
                  } else {
                    if (!this.player.IsDead && !fruit.IsKilled && !fruit.IsDead && fruit.x < this.player.x + playerW && fruit.x > this.player.x - playerW) {
                      fruit.collected();

                      if (fruit.Type == loops.Fruit.FRUIT_WATERMELON) {
                        this.shakeWorld(1.5);
                      } else if ([loops.Fruit.FRUIT_1, loops.Fruit.FRUIT_2, loops.Fruit.FRUIT_3, loops.Fruit.FRUIT_4].indexOf(fruit.Type) != -1) {
                        this.shakeWorld(0.7);
                      }

                      var fruitKick = this.fruitKicks[this.lastFruitKick];
                      fruitKick.visible = true;
                      fruitKick.restart();
                      fruitKick.x = fruit.x - playerW * src.Constants.FRUIT_KICK_DELTA_X;
                      fruitKick.y = this.player.y - playerW * src.Constants.FRUIT_KICK_DELTA_Y;
                      this.lastFruitKick++;

                      if (this.lastFruitKick > this.fruitKicks.length - 1) {
                        this.lastFruitKick = 0;
                      }

                      if ([loops.Fruit.TIME, loops.Fruit.STAR, loops.Fruit.ARMOR].indexOf(fruit.Type) >= 0) {
                        this.lastBonusKick++;

                        if (this.lastBonusKick > this.fruitKicks.length - 1) {
                          this.lastBonusKick = 0;
                        }

                        var bonusKick = this.bonuses[this.lastBonusKick];
                        bonusKick.visible = true;
                        bonusKick.restart();
                        bonusKick.x = fruit.x - playerW * src.Constants.FRUIT_KICK_DELTA_X - bonusKick.width / 2;
                        bonusKick.y = this.player.y - playerW * src.Constants.FRUIT_KICK_DELTA_Y - bonusKick.height / 2;

                        switch (fruit.Type) {
                          case loops.Fruit.STAR:
                            src.SoundController.instance.playSound('SoundBonusScore' + Math.floor(1 + Math.random() * 3));
                            break;

                          case loops.Fruit.TIME:
                            src.SoundController.instance.playSound('SoundBonusTime');
                            break;

                          case loops.Fruit.ARMOR:
                            src.SoundController.instance.playSound('SoundBonusSafe');
                            break;
                        }
                      }

                      if (fruit.Type == loops.Fruit.BOMB) {
                        if (this.player.IsArmored) {
                          this.player.IsArmored = false;
                          fruit.bombArmored();
                          this.shakeWorld(1);
                        } else {
                          this.player.dieBomb();
                          this.shakeWorld(3);
                          fruit.bombArmored();
                        }
                      }

                      if (fruit.Type == loops.Fruit.TIME) {
                        this.time += 5;
                        this.gui.Time = this.time;
                        this.gui.extra_time();
                        src.MedalManager.instance.addValue(src.MedalType.TOO_EARLY_TO_FAIL, 1);
                      }

                      if (fruit.Type == loops.Fruit.ARMOR) {
                        this.player.IsArmored = true;
                        this.gui.shield();
                        src.MedalManager.instance.addValue(src.MedalType.ARMORED_BOUNCE, 1);
                      }

                      if (fruit.Type < loops.Fruit.TIME) {
                        this.player.batuted();
                      }

                      this.addPoints(fruit);
                    }
                  }
                }

                if (fruit.IsDead) {
                  this.fruits.splice(f, 1);
                  f--;
                  this.fruitsContainer.removeChild(fruit);
                }
              }
              /* end fruit */
              // generate


              if (this.nextLevelTimer >= 0) {
                if (this.isStarfall) this.nextLevelTimer++;

                if (--this.nextLevelTimer == 0) {
                  if (this.nextLevelID == 1) {
                    this.gui.watermelonGrow();
                  }

                  if (this.nextLevelID == 2) {
                    this.gui.tropicalGrow();
                  }

                  if (this.nextLevelID == 3) {
                    this.gui.orchardGrow();
                  }
                }
              }

              if (!this.isLose && !this.player.IsDead && this.nextLevelTimer < 0) {
                if (this.bombTiming.length > 0) {
                  if (this.time < this.bombTiming[this.bombTiming.length - 1]) {
                    var bombCount = this.levelPower + this.LEVEL.bcmin + (this.LEVEL.bcmax - this.LEVEL.bcmin + 1) * Math.random();
                    this.spawn(bombCount, loops.Fruit.BOMB);
                    this.bombTiming.splice(this.bombTiming.length - 1, 1);
                    if (bombCount > 0) src.SoundController.instance.playSound('SoundBombAlert');
                  }
                }

                if (this.isStarfall) {
                  this.shelf2.alpha = this.ground2.alpha = this.background2.alpha += (1 - this.background2.alpha) * src.Constants.STARFALL_ALPHA_SMOOTH;

                  if (this.starTimer-- < 0) {
                    this.gui.startFlash();
                    this.starTimer = src.Constants.STAR_FALL_STAR_TIMER;
                    this.spawn(1, loops.Fruit.STAR);
                  }

                  if (this.starFallTimer-- < 0) {
                    this.isStarfall = false;
                    src.SoundController.instance.playMusic('MusicGamePlay');
                    this.gui.Combo = 0;
                    this.combo.Value = 0;
                    this.addComboPoints();
                  }
                } else {
                  if (this.background2.visible) {
                    this.shelf2.alpha = this.ground2.alpha = this.background2.alpha += (0 - this.background2.alpha) * src.Constants.STARFALL_ALPHA_SMOOTH;

                    if (this.background2.alpha < 0.01) {
                      this.ground2.visible = this.shelf2.visible = this.background2.visible = false;
                    }
                  }

                  if (this.bonusPeriod < 0) {
                    this.gui.startFlash();
                    this.bonusPeriod = this.LEVEL.bonus_period;
                    this.spawn(Math.random() * 5, loops.Fruit.STAR);

                    if (Math.random() * src.Constants.MAX_CHANCE < this.LEVEL.barmor) {
                      this.spawn(1, loops.Fruit.ARMOR);
                    }

                    if (Math.random() * src.Constants.MAX_CHANCE < this.LEVEL.btime) {
                      this.spawn(1, loops.Fruit.TIME);
                    }
                  }

                  if (this.waitRespawnTimer-- < 0) {
                    if (this.timer1-- < 0) {
                      this.timer1 = this.getNextTimer();
                      this.spawn(0, this.getFruitID());
                    }

                    if (this.timer2-- < 0) {
                      this.timer2 = this.getNextTimer();
                      this.spawn(1, this.getFruitID());
                    }

                    if (this.timer3-- < 0) {
                      this.timer3 = this.getNextTimer();
                      this.spawn(2, this.getFruitID());
                    }
                  }
                }
              }

              if (!this.player.IsDead) {
                if (this.startTimer > 0) {
                  if (--this.startTimer == 0) {
                    this.player.happy();
                  }
                } else {
                  if (!this.player.IsHappy) {
                    var playerSpeed = this.myGame.RW * src.Constants.PLAYER_SPEED;
                    var dpx = this.lastX - this.player.x;

                    if (dpx > this.myGame.RW * src.Constants.PLAYER_MOVE_LIMIT_X && this.player.x <= 294) {
                      this.player.go_right();
                    } else {
                      if (dpx < -this.myGame.RW * src.Constants.PLAYER_MOVE_LIMIT_X && this.player.x >= 85) {
                        this.player.go_left();
                      } else {
                        this.player.idle();
                      }
                    }

                    if (this.waitTimer == src.Constants.MAX_WAIT_TIMER) {
                      this.player.x += Math.min(playerSpeed, Math.max(-playerSpeed, dpx * src.Constants.PLAYER_MOVE_SMOOTH));
                      this.player.x = Math.max(this.myGame.RW * (1 - src.Constants.MOVE_LIMIT_X) * src.Constants.MOVE_LIMIT_DX, Math.min(this.myGame.RW * src.Constants.MOVE_LIMIT_X, this.player.x));
                    }
                  }
                }
              }

              if (this.loseTimer > 0) {
                this.loseTimer--;

                if (this.loseTimer == 0) {
                  this.best.Value = Math.max(this.best.Value, this.points.Value);
                  src.ScoreManager.instance.setCurrentScores(this.points.Value);
                  src.WindowManager.instance.showResults();
                }
              }
            }
          }
        }
      }, {
        key: "addComboPoints",
        value: function addComboPoints() {
          this.points.Value += this.comboPoints.Value;
          this.gui.Points = this.points.Value;
          this.gui.addComboPoints(this.comboPoints.Value);
          this.comboPoints.Value = 0;
        }
      }, {
        key: "shakeWorld",
        value: function shakeWorld(v) {
          this.shake = v;
        }
      }, {
        key: "lostFruit",
        value: function lostFruit(f) {
          if (f.Type < loops.Fruit.BOMB) {
            src.MedalManager.instance.addValue(src.MedalType.SPLASHY_SPLASH, 1, false);
            this.combo.Value = 0;
            this.gui.Combo = this.combo.Value;

            if (Math.random() > .5) {
              this.gui.fruitLost();
            }

            this.shakeWorld(.5);
          } else {
            this.shakeWorld(2);
          }
        }
      }, {
        key: "addPoints",
        value: function addPoints(f) {
          var _this10 = this;

          if (this.isStarfall) {
            this.points.Value += f.Cost;
            this.gui.Points = this.points.Value;
            this.comboPoints.Value += f.Cost;
          } else {
            if (Math.random() > src.Constants.GOOD_WORDS_CHANCE) {
              this.gui.fruitCollected(this.combo.Value);
            }

            if (f.Type == loops.Fruit.STAR) {
              this.points.Value += f.Cost;
            } else {
              this.combo.Value++;
              this.gui.Combo = this.combo.Value;
              this.points.Value += f.Cost * Math.floor(this.combo.Value / src.Constants.COMBO_MAX + 1);
            }

            this.gui.Points = this.points.Value;

            if (this.combo.Value >= src.Constants.MAX_FRUIT_COUNT_TO_STARFALL) {
              this.isStarfall = true;
              this.combo.Value = 0;
              this.gui.Combo = this.combo.Value;
              src.SoundController.instance.playSound('SoundStartSuperMode');
              src.SoundController.instance.playMusic('SoundBackgroundSuperMode');
              this.fruits.forEach(function (fruit) {
                _this10.game.add.tween(fruit).to({
                  alpha: 0
                }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                  return fruit.killFruit(1);
                });
              });
              this.gui.starfall();
              this.shelf2.alpha = this.ground2.alpha = this.background2.alpha = 0;
              this.shelf2.visible = this.ground2.visible = this.background2.visible = true;
              this.starFallTimer = src.Constants.STAR_FALL_TIMER;
            }
          }

          if (f.Cost > 0) {
            var point = this.fruitPoints[this.lastFruitPoint];
            point.alpha = 1;
            point.visible = true;
            point.text = "+" + (f.Type == loops.Fruit.STAR ? f.Cost : f.Cost * Math.floor(this.combo.Value / src.Constants.COMBO_MAX + 1));
            point.x = f.x;
            point.y = this.player.y - this.myGame.RW * src.Constants.POINTS_START_X - Math.random() * this.myGame.RW * src.Constants.POINTS_RAND_START_X;
            point.scale.set(this.fruitPointScale * src.Constants.POINTS_START_SCALE);
            this.lastFruitPoint++;

            if (this.lastFruitPoint > this.fruitPoints.length - 1) {
              this.lastFruitPoint = 0;
            }
          }

          return f.Cost;
        }
      }, {
        key: "initLevel",
        value: function initLevel(levID) {
          this.levelPower = Math.floor(levID / src.Constants.COUNT_OF_LEVELS);
          this.levelID = levID - this.levelPower * src.Constants.COUNT_OF_LEVELS;

          if (this.levelID == this.myGame.SETTINGS.levels.length) {
            this.isWin = true;
            return;
          }

          this.LEVEL = this.myGame.SETTINGS.levels[this.levelID];
          this.speed = this.LEVEL.speed || 0;
          this.grow = this.LEVEL.grow || 0;
          this.time = (this.LEVEL.time || 5) - this.levelPower;
          this.target = (this.LEVEL.target || 100) + this.levelPower * 2;
          this.timer1 = this.getNextTimer() / 2;
          this.timer2 = this.getNextTimer() / 2;
          this.timer3 = this.getNextTimer() / 2;
          this.bonusPeriod = this.LEVEL.bonus_period || 0;
          this.bombTiming = [];
          var dropDeltaTime = this.time / (this.LEVEL.bdc + this.levelPower);

          for (var b = 0; b < this.LEVEL.bdc; b++) {
            this.bombTiming.push(Math.floor(dropDeltaTime * b + dropDeltaTime / 2 * Math.random() + dropDeltaTime / 4));
          }

          this.totalPercent = 0;
          var percents = this.LEVEL.fruits;

          if (!percents) {
            percents = [0, 0, 0, 0, 0, 0, 0];
          }

          for (var i = 0; i < percents.length; i++) {
            this.totalPercent += percents[i];
          }

          if (levID > 0) {
            this.gui.timer_refill();
          }

          this.gui.Time = this.time;
          this.gui.Remains = this.target;
          this.gui.MaxRemains = this.target;

          if (levID == src.Constants.GROW_LEVEL_1) {
            this.nextLevelID = 2;
            this.nextLevelTimer = src.Constants.LEVEL_GROW_DELAY;
            this.background_next.changeTexture('bg2');
            this.background_next.visible = true;
            this.background_next.y = this.background.y - this.background.height;
            this.background_next.x = this.background.x;
            src.SoundController.instance.playSound('SoundFonChanging');
          }

          if (levID == src.Constants.GROW_LEVEL_2) {
            this.nextLevelID = 3;
            this.nextLevelTimer = src.Constants.LEVEL_GROW_DELAY;
            this.background_next.changeTexture('bg3');
            this.background_next.visible = true;
            this.background_next.y = this.background.y - this.background.height;
            this.background_next.x = this.background.x;
            src.SoundController.instance.playSound('SoundFonChanging');
          }

          if (levID == src.Constants.GROW_LEVEL_3) {
            this.nextLevelID = 1;
            this.nextLevelTimer = src.Constants.LEVEL_GROW_DELAY;
            this.background_next.changeTexture('bg1');
            this.background_next.visible = true;
            this.background_next.y = this.background.y - this.background.height;
            this.background_next.x = this.background.x;
            src.SoundController.instance.playSound('SoundFonChanging');
          }
        }
      }, {
        key: "getFruitID",
        value: function getFruitID() {
          var rand = Math.random() * this.totalPercent;
          var percents = this.LEVEL.fruits;
          var total = 0;

          if (percents) {
            for (var i = 0; i < percents.length; i++) {
              total += percents[i];

              if (rand < total) {
                return i;
              }
            }
          }

          return 0;
        }
      }, {
        key: "getNextTimer",
        value: function getNextTimer() {
          var r = src.Constants.RAND_MULT;
          var rd = src.Constants.RAND_BASE;
          return (src.Constants.MAX_SPEED - this.speed) * (rd + Math.random() * r) * src.Constants.SPAWN_SPEED_MULT * 2;
        }
      }, {
        key: "spawn",
        value: function spawn(mode, fid) {
          this.waitRespawnTimer = src.Constants.WAIT_RESPAWN * 2;
          this.speed = Math.min(this.speed + this.grow * src.Constants.GROW_MULT, src.Constants.MAX_SPEED);
          var count = 0;
          var fruit;
          var s = this.shelf.scale.x * src.Constants.FRUIT_SCALE_2;

          switch (fid) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 5:
            case 6:
              count = Math.random() * 3 + 1;
              var randomArea = Math.random() * src.Constants.AREAS_COUNT;

              for (var i = 0; i < count; i++) {
                fruit = this.fruitManager.getFruit(fid, s, this.levelID);
                fruit.setRandomJump(randomArea);
                this.fruitsContainer.addChild(fruit);
                fruit.Y = this.shelf.y + this.myGame.RW * src.Constants.FLOOR_H * mode + this.myGame.RW * src.Constants.FLOOR_DY;
                fruit.x = this.myGame.RW * src.Constants.FRUIT_START_X + this.myGame.RW * src.Constants.FRUIT_DISTANCE * i;
                this.fruits.push(fruit);
                fruit.scale.set(s);
              }

              break;

            case loops.Fruit.FRUIT_BANANA:
            case loops.Fruit.BOMB:
              count = fid == loops.Fruit.BOMB ? mode : Math.random() * 3 + 1;

              for (var b = 0; b < Math.random() * 3 + 1; b++) {
                fruit = this.fruitManager.getFruit(fid, s, this.levelID);
                fruit.x = this.myGame.RW * src.Constants.BOMB_AREA_DX + this.myGame.RW * (1 - src.Constants.BOMB_AREA_W) / 2 + this.myGame.RW * Math.random() * src.Constants.BOMB_AREA_W;
                fruit.y = this.myGame.RW * src.Constants.BOMB_START_Y;
                this.fruits.push(fruit);
                this.fruitsContainer.addChild(fruit);
                fruit.setWaitTimer(b);
              }

              break;

            case loops.Fruit.TIME:
            case loops.Fruit.ARMOR:
            case loops.Fruit.STAR:
              for (var m = 0; m < mode; m++) {
                fruit = this.fruitManager.getFruit(fid, s, this.levelID);
                fruit.x = this.myGame.RW * src.Constants.BONUS_START_X;
                fruit.y = -this.myGame.RW * src.Constants.BONUS_START_Y;
                this.fruits.push(fruit);
                this.fruitsContainer.addChild(fruit);
                fruit.setWaitTimer(m);
              }

              break;
          }
        }
      }, {
        key: "lose",
        value: function lose(type) {
          if (!this.isLose) {
            this.isLose = true;
            this.loseTimer = src.Constants.LOSE_TIMER;
          }
        }
      }, {
        key: "dispatchPlayerDead",
        // listeners
        value: function dispatchPlayerDead() {
          if (!this.isLose) {
            src.SoundController.instance.playSound('SoundGameOver');
            src.SoundController.instance.stopCountingSound();
            this.lose(1);
          }
        }
      }, {
        key: "handlePointerMove",
        value: function handlePointerMove(pointer, x, y, down) {
          if (this.isStarted) {
            if (pointer.targetObject && pointer.targetObject.sprite instanceof Phaser.Button) {//button over
            }

            this.lastX = this.container.toLocal(pointer.position, this.game.world).x;
          }
        }
        /*override*/

      }, {
        key: "Points",
        get: function get() {
          return this.points.Value;
        }
      }, {
        key: "Scale",
        set: function set(v) {
          this.shading.x = (this.myGame.RW - this.shading.width) / 2;
          this.shading.y = this.background.y = this.background2.y = 0;
          this.ground2.x = this.shelf2.x = this.ground.x = this.shelf.x = 0;
          this.player.scale.set(1);
          this.ground.scale.set(1);
          this.shelf.scale.set(1);
          this.ground2.y = this.ground.y = this.myGame.H - this.ground.height + 20;
          this.shelf2.y = this.shelf.y = this.ground.y - this.shelf.height + this.myGame.RH * src.Constants.SHELF_DELTA_Y;
          this.player.y = this.ground.y - this.ground.height * src.Constants.PLAYER_DELTA_Y;
          this.y = this.myGame.RH - this.myGame.H;
          this.background.scale.set(this.myGame.RH / this.background_next.texture.height);
          this.background2.scale.set(this.myGame.RH / this.background_next.texture.height);
          this.background_next.scale.set(this.myGame.RH / this.background_next.texture.height);
          this.background.y = this.background2.y = this.background_next.y = -(this.myGame.RH - this.myGame.H);
        }
      }]);

      return GamePlay;
    }(Loop);

    GamePlay.isFirstTime = true;
    loops.GamePlay = GamePlay;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {})); ///<reference path="../../origin/lqs/MyGame.ts"/>
///<reference path="../../origin/loops/GamePlay.ts"/>


var src;

(function (src) {
  var EventManager =
  /*#__PURE__*/
  function (_src$AbstractManager) {
    _inherits(EventManager, _src$AbstractManager);

    function EventManager(level) {
      var _this11;

      _classCallCheck(this, EventManager);

      _this11 = _possibleConstructorReturn(this, _getPrototypeOf(EventManager).call(this, level));

      _this11.buildSignals();

      return _this11;
    }

    _createClass(EventManager, [{
      key: "buildSignals",
      value: function buildSignals() {
        this.onPlayerKilled = new Phaser.Signal();
      }
      /**
       * INHERITED
       */

    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(EventManager.prototype), "destroy", this).call(this);

        this.onPlayerKilled.dispose();
      }
    }]);

    return EventManager;
  }(src.AbstractManager);

  src.EventManager = EventManager;
})(src || (src = {}));

var src;

(function (src) {
  var GameStateManager =
  /*#__PURE__*/
  function (_src$AbstractManager2) {
    _inherits(GameStateManager, _src$AbstractManager2);

    function GameStateManager(level) {
      var _this12;

      _classCallCheck(this, GameStateManager);

      _this12 = _possibleConstructorReturn(this, _getPrototypeOf(GameStateManager).call(this, level));
      _this12.gameActive = true;
      _this12.paused = false;
      return _this12;
    }

    _createClass(GameStateManager, [{
      key: "startLevel",
      value: function startLevel() {
        this.gameActive = true;
        this.paused = false;
      }
      /**
       * GETTERS
       */

    }, {
      key: "isPaused",
      value: function isPaused() {
        return this.paused;
      }
    }, {
      key: "setPaused",
      value: function setPaused(value) {
        if (value != this.paused) {
          this.paused = value;
        }
      }
    }, {
      key: "isActive",
      value: function isActive() {
        return this.gameActive;
      }
    }]);

    return GameStateManager;
  }(src.AbstractManager);

  src.GameStateManager = GameStateManager;
})(src || (src = {})); ///<reference path="../../origin/lqs/MyGame.ts"/>
///<reference path="../../origin/loops/GamePlay.ts"/>


var src;

(function (src) {
  var MyGame = src.lqs.MyGame;
  var GamePlay = src.loops.GamePlay;

  var GameplayManager =
  /*#__PURE__*/
  function (_src$AbstractManager3) {
    _inherits(GameplayManager, _src$AbstractManager3);

    function GameplayManager(level) {
      var _this13;

      _classCallCheck(this, GameplayManager);

      _this13 = _possibleConstructorReturn(this, _getPrototypeOf(GameplayManager).call(this, level));
      _this13.backgroundManager = _this13.add(new src.BackgroundManager(_assertThisInitialized(_this13)));
      _this13.myGame = _this13.add(new MyGame(_this13.level, ''));
      _this13.gameplay = _this13.add(new GamePlay(_this13.myGame));
      _this13.gameplay.visible = true;
      return _this13;
    }

    _createClass(GameplayManager, [{
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(GameplayManager.prototype), "update", this).call(this);
      }
    }]);

    return GameplayManager;
  }(src.AbstractManager);

  src.GameplayManager = GameplayManager;
})(src || (src = {}));

var src;

(function (src) {
  var UIManager =
  /*#__PURE__*/
  function (_src$AbstractManager4) {
    _inherits(UIManager, _src$AbstractManager4);

    function UIManager(level) {
      var _this14;

      _classCallCheck(this, UIManager);

      _this14 = _possibleConstructorReturn(this, _getPrototypeOf(UIManager).call(this, level));
      _this14.lastVisualScore = 0;
      _this14.frameCounter = 0;

      _this14.buildContent();

      return _this14;
    }

    _createClass(UIManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.comboText = this.add(src.TextUtils.getStyledText('0', 554, 406, 30, '#333333', '#FFFFFF', 6, false));
        this.comboText.anchor.set(1, 0.5);
        this.pauseButton = this.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPause', 295, 30, this.pauseClicked, this, 1, 0));
        this.medalPopup = this.add(new src.BadgePopup(this));
        this.medalPopup.position.set(0, 425);
        src.MedalManager.instance.medalUnlocked.add(this.displayBadge, this);
        src.SoundButtonsController.instance.setPosition(290, 30);
      }
    }, {
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(UIManager.prototype), "update", this).call(this);

        this.frameCounter++;
      }
    }, {
      key: "displayBadge",
      value: function displayBadge(medal) {
        this.medalPopup.showMedal(medal.key);
      }
      /**
       * EVENT LISTENERS
       */

    }, {
      key: "pauseClicked",
      value: function pauseClicked() {
        if (this.level.gameStateManager.isActive()) {
          src.WindowManager.instance.showPause();
        }
      }
    }]);

    return UIManager;
  }(src.AbstractManager);

  src.UIManager = UIManager;
})(src || (src = {}));

var src;

(function (src) {
  var AbstractGameManager =
  /*#__PURE__*/
  function (_Phaser$Group5) {
    _inherits(AbstractGameManager, _Phaser$Group5);

    function AbstractGameManager(gameplayManager) {
      var _this15;

      _classCallCheck(this, AbstractGameManager);

      _this15 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractGameManager).call(this, gameplayManager.game, null));
      _this15.gameplayManager = gameplayManager;
      _this15.level = _this15.gameplayManager.level;
      return _this15;
    }

    return AbstractGameManager;
  }(Phaser.Group);

  src.AbstractGameManager = AbstractGameManager;
})(src || (src = {})); ///<reference path="AbstractGameManager.ts"/>


var src;

(function (src) {
  var BackgroundManager =
  /*#__PURE__*/
  function (_src$AbstractGameMana) {
    _inherits(BackgroundManager, _src$AbstractGameMana);

    function BackgroundManager(gameplayManager) {
      var _this16;

      _classCallCheck(this, BackgroundManager);

      _this16 = _possibleConstructorReturn(this, _getPrototypeOf(BackgroundManager).call(this, gameplayManager));

      _this16.buildContent();

      return _this16;
    }

    _createClass(BackgroundManager, [{
      key: "buildContent",
      value: function buildContent() {}
    }]);

    return BackgroundManager;
  }(src.AbstractGameManager);

  src.BackgroundManager = BackgroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var MedalType;

  (function (MedalType) {
    MedalType[MedalType["FRUTARIAN"] = 1] = "FRUTARIAN";
    MedalType[MedalType["MOAR_JUICE"] = 2] = "MOAR_JUICE";
    MedalType[MedalType["HIPPIE_KI_YAY"] = 3] = "HIPPIE_KI_YAY";
    MedalType[MedalType["STARGAZER"] = 4] = "STARGAZER";
    MedalType[MedalType["ARMORED_BOUNCE"] = 5] = "ARMORED_BOUNCE";
    MedalType[MedalType["TOO_EARLY_TO_FAIL"] = 6] = "TOO_EARLY_TO_FAIL";
    MedalType[MedalType["JUICY_HOUR"] = 7] = "JUICY_HOUR";
    MedalType[MedalType["SPLASHY_SPLASH"] = 8] = "SPLASHY_SPLASH";
    MedalType[MedalType["THE_WRONG_FRUIT"] = 9] = "THE_WRONG_FRUIT";
    MedalType[MedalType["MASTER_JUGGLER"] = 10] = "MASTER_JUGGLER";
  })(MedalType = src.MedalType || (src.MedalType = {}));
})(src || (src = {})); ///<reference path="../scores/MedalType.ts"/>


var src;

(function (src) {
  var MedalManager =
  /*#__PURE__*/
  function () {
    function MedalManager() {
      _classCallCheck(this, MedalManager);

      this.medalUnlocked = new Phaser.Signal();
      this.medals = [{
        key: src.MedalType.FRUTARIAN,
        name: 'Frutarian',
        descriptionAchieved: 'Caught 250 fruit in one game',
        descriptionLocked: 'Catch ${value}/250 fruit in one game',
        currentValue: 0,
        targetValue: 250,
        achieved: false
      }, {
        key: src.MedalType.MOAR_JUICE,
        name: 'Moar Juice',
        descriptionAchieved: 'Caught 500 fruit in one game',
        descriptionLocked: 'Catch ${value}/500 fruit in one game',
        currentValue: 0,
        targetValue: 500,
        achieved: false
      }, {
        key: src.MedalType.HIPPIE_KI_YAY,
        name: 'Hippie Ki-Yay!',
        descriptionAchieved: 'Caught 1000 fruit in one game',
        descriptionLocked: 'Catch ${value}/1000 fruit in one game',
        currentValue: 0,
        targetValue: 1000,
        achieved: false
      }, {
        key: src.MedalType.STARGAZER,
        name: 'Stargazer',
        descriptionAchieved: 'Collected 500 stars in total',
        descriptionLocked: 'Collect ${value}/500 stars in total',
        currentValue: 0,
        targetValue: 500,
        achieved: false
      }, {
        key: src.MedalType.ARMORED_BOUNCE,
        name: 'Armored Bounce',
        descriptionAchieved: 'Activated 10 shields in total',
        descriptionLocked: 'Activate ${value}/10 shields in total',
        currentValue: 0,
        targetValue: 10,
        achieved: false
      }, {
        key: src.MedalType.TOO_EARLY_TO_FAIL,
        name: 'Too Early to Fail',
        descriptionAchieved: 'Collected 50 time bonuses in total',
        descriptionLocked: 'Collect ${value}/50 time bonuses in total',
        currentValue: 0,
        targetValue: 50,
        achieved: false
      }, {
        key: src.MedalType.JUICY_HOUR,
        name: 'Juicy Hour',
        descriptionAchieved: 'Played for 1 hour',
        descriptionLocked: 'Play for ${value}/60 minutes',
        currentValue: 0,
        targetValue: 60,
        achieved: false
      }, {
        key: src.MedalType.SPLASHY_SPLASH,
        name: 'Splashy splash',
        descriptionAchieved: 'Allowed 250 fruit to fall to their doom',
        descriptionLocked: 'Allow ${value}/250 fruit to fall to their doom',
        currentValue: 0,
        targetValue: 250,
        achieved: false
      }, {
        key: src.MedalType.THE_WRONG_FRUIT,
        name: 'The Wrong Fruit',
        descriptionAchieved: 'Got hit by a bomb 10 times',
        descriptionLocked: 'Get hit by a bomb ${value}/10 times',
        currentValue: 0,
        targetValue: 10,
        achieved: false
      }, {
        key: src.MedalType.MASTER_JUGGLER,
        name: 'Master Juggler',
        descriptionAchieved: 'Collected 100 fresh bananas',
        descriptionLocked: 'Collect ${value}/100 fresh bananas',
        currentValue: 0,
        targetValue: 100,
        achieved: false
      }];
    }

    _createClass(MedalManager, [{
      key: "loadMedalsState",
      value: function loadMedalsState(states) {
        var _this17 = this;

        states.forEach(function (state) {
          var medal = _this17.medals.find(function (m) {
            return m.key === state.key;
          });

          if (medal) {
            medal.currentValue = state.currentValue;
            medal.achieved = state.achieved;
          }
        });
      }
    }, {
      key: "getMedal",
      value: function getMedal(key) {
        return this.medals.find(function (medal) {
          return medal.key == key;
        });
      }
    }, {
      key: "getMedalsState",
      value: function getMedalsState() {
        return this.medals.map(function (medal) {
          return {
            key: medal.key,
            currentValue: medal.currentValue,
            achieved: medal.achieved
          };
        });
      }
    }, {
      key: "saveMedalsState",
      value: function saveMedalsState() {
        src.LocalStorageController.instance.save();
      }
    }, {
      key: "resetMedal",
      value: function resetMedal(key) {
        var medal = this.getMedal(key);

        if (medal && !medal.achieved) {
          medal.currentValue = 0;
          this.saveMedalsState();
        }
      }
    }, {
      key: "addValue",
      value: function addValue(key, value) {
        var save = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var medal = this.medals.find(function (m) {
          return m.key === key;
        });

        if (medal) {
          if (!medal.achieved) {
            medal.currentValue = Phaser.Math.clamp(Math.max(medal.currentValue + value, medal.currentValue), 0, medal.targetValue);

            if (medal.currentValue == medal.targetValue) {
              medal.achieved = true;
              this.medalUnlocked.dispatch(medal);
              console.log('achieved medal ' + medal.name);
            }

            if (save) {
              this.saveMedalsState();
            }
          }
        }
      }
    }, {
      key: "setValue",
      value: function setValue(key, value) {
        var medal = this.medals.find(function (m) {
          return m.key === key;
        });

        if (medal) {
          if (!medal.achieved) {
            medal.currentValue = Phaser.Math.clamp(Math.max(value, medal.currentValue), 0, medal.targetValue);

            if (medal.currentValue == medal.targetValue) {
              medal.achieved = true;
              this.medalUnlocked.dispatch(medal);
            }

            this.saveMedalsState();
          }
        }
      }
    }], [{
      key: "instance",
      get: function get() {
        return MedalManager._instance ? MedalManager._instance : MedalManager._instance = new MedalManager();
      }
    }]);

    return MedalManager;
  }();

  MedalManager._instance = null;
  src.MedalManager = MedalManager;
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Anim =
    /*#__PURE__*/
    function (_Phaser$Sprite2) {
      _inherits(Anim, _Phaser$Sprite2);

      function Anim(g, arr) {
        var _this18;

        var at = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var t_arr = arguments.length > 3 ? arguments[3] : undefined;

        _classCallCheck(this, Anim);

        _this18 = _possibleConstructorReturn(this, _getPrototypeOf(Anim).call(this, src.App.instance, 0, 0, t_arr.atlas));
        _this18.anim = _this18.animations.add(t_arr.atlas + '_', t_arr.frames, 60, false);

        _this18.anim.stop(true);

        return _this18;
      }

      return Anim;
    }(Phaser.Sprite);

    lqs.Anim = Anim;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {})); ///<reference path="../../origin/lqs/Anim.ts"/>


var src;

(function (src) {
  var loops;

  (function (loops) {
    var Point = Phaser.Point;
    var Anim = src.lqs.Anim;

    var Fruit =
    /*#__PURE__*/
    function (_Phaser$Group6) {
      _inherits(Fruit, _Phaser$Group6);

      function Fruit(t, splash, textureKey, s, w, g) {
        var _this19;

        var levelID = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

        _classCallCheck(this, Fruit);

        _this19 = _possibleConstructorReturn(this, _getPrototypeOf(Fruit).call(this, src.App.instance, null));
        _this19.level = g.level;
        _this19.fruitType = t;
        _this19.myGame = g;
        var lID = levelID > 35 ? 35 : levelID;
        _this19.isCanThrow = true;
        _this19.phase = Math.random() * Math.PI * 2;
        _this19.signY = 1;
        _this19.amp = 1;
        _this19.phase2 = Math.random() * Math.PI * 2;
        _this19.waitTimer = 0;
        _this19.isStarted = true;
        _this19.liveTimer = 5;
        _this19.lives = 0;
        _this19.cost = 0;
        var ss = s;
        _this19.container = _this19.add(_this19.game.make.group());
        var dx = 0,
            dy = 0;
        var day = 0;
        var animPosition = new Phaser.Point(0, 0);

        switch (t) {
          case Fruit.TIME:
            animPosition.set(-65, -105);
            _this19.cost = src.Constants.TIME_COST;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            break;

          case Fruit.ARMOR:
            animPosition.set(-63, -102);
            _this19.cost = src.Constants.TIME_COST;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            break;

          case Fruit.STAR:
            animPosition.set(-65, -105);
            _this19.cost = src.Constants.TIME_COST;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            break;

          case Fruit.BOMB:
            animPosition.set(-76, -145);
            dy = .01;
            day = .25;
            _this19.cost = 0;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            _this19.img.visible = false;

            _this19.container.add(_this19.anim = new Anim(null, null, 0, splash));

            if (g) _this19.container.add(_this19.anim2 = new Anim(null, null, 0, loops.FruitManager.getPack2(g, 'effects', 'effects', 'bomb_a2', 52)));
            break;

          case Fruit.FRUIT_WATERMELON:
            animPosition.set(-72, -117);
            _this19.cost = src.Constants.WATERMELON_COST;
            dy = .005;
            ss *= .95;
            _this19.maxSpeed = src.Constants.SPEED_COLLECT * src.Constants.SPEED_X_MULT;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            _this19.lives = 1;

            _this19.container.add(_this19.anim = new Anim(null, null, 0, splash));

            break;

          case Fruit.FRUIT_BANANA:
            animPosition.set(-65, -112);
            _this19.cost = src.Constants.BANANA_COST;
            ss *= .95;
            _this19.maxSpeed = src.Constants.SPEED_COLLECT * src.Constants.SPEED_X_MULT;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            _this19.lives = 1;
            _this19.img.visible = false;

            _this19.container.add(_this19.anim = new Anim(null, null, 0, splash));

            if (g) _this19.container.add(_this19.anim2 = new Anim(null, null, 0, loops.FruitManager.getPack2(g, 'effects', 'effects', 'fruit_sign_a2', 52)));
            break;

          case Fruit.FRUIT_PINEAPPLE:
            animPosition.set(-83, -128);
            dx = .025;
            dy = .005;
            _this19.cost = src.Constants.PINEAPPLE_COST;
            ss *= .95;

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            _this19.container.add(_this19.anim = new Anim(null, null, 0, splash));

            break;

          default:
            if (_this19.fruitType == Fruit.FRUIT_4) {
              animPosition.set(-65, -114);
            } else if (_this19.fruitType == Fruit.FRUIT_3) {
              animPosition.set(-65, -113);
            } else if (_this19.fruitType == Fruit.FRUIT_2) {
              animPosition.set(-62, -110);
            } else if (_this19.fruitType == Fruit.FRUIT_1) {
              animPosition.set(-60, -107);
            } else {
              animPosition.set(-65, -107);
            }

            _this19.cost = src.Constants.FRUIT_COSTS_2[_this19.fruitType];

            _this19.container.add(_this19.img = _this19.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, textureKey + '0000'));

            _this19.container.add(_this19.anim = new Anim(null, null, 0, splash));

            break;
        }

        _this19.W = w;
        _this19.pineappleTimer = src.Constants.PINEAPPLE_TIMER;

        _this19.img.scale.set(ss * src.Constants.FRUIT_SCALE);

        if (_this19.anim) {
          _this19.anim.scale.set(ss * src.Constants.FRUIT_SCALE);

          _this19.anim.position.copyFrom(animPosition);

          _this19.anim.anim.onComplete.add(_this19.h_anim, _assertThisInitialized(_this19));

          _this19.anim.visible = false;
        }

        if (_this19.anim2) {
          _this19.anim2.scale.set(ss * src.Constants.FRUIT_SCALE);

          _this19.anim2.anchor.set(0.5, 0.5);

          _this19.anim2.anim.onComplete.add(_this19.h_anim2, _assertThisInitialized(_this19));

          _this19.anim2StartX = _this19.anim2.x;
        }

        _this19.img.anchor.set(0.5);

        return _this19;
      }

      _createClass(Fruit, [{
        key: "setRandomJump",
        value: function setRandomJump(v) {
          this.randomAreaMin = v / src.Constants.AREAS_COUNT;
          this.randomAreaMax = this.randomAreaMin + 1 / src.Constants.AREAS_COUNT;
        }
      }, {
        key: "jumpBonus",
        value: function jumpBonus() {
          var sx = (src.Constants.SPEED_MIN + (src.Constants.SPEED_MAX - src.Constants.SPEED_MIN) * (this.randomAreaMin + (this.randomAreaMax - this.randomAreaMin) * Math.random())) * src.Constants.SPEED_X_MULT;
          this.speed = new Phaser.Point(-sx * (1 + src.Constants.JUMP_BONUS_RAND * Math.random()), 0);
        }
      }, {
        key: "jump",
        value: function jump() {
          switch (this.fruitType) {
            case Fruit.FRUIT_PINEAPPLE:
              src.SoundController.instance.playSound('SoundJumpPineapple' + Math.floor(1 + Math.random() * 3));
              break;

            case Fruit.FRUIT_WATERMELON:
              src.SoundController.instance.playSound('SoundJumpWatermelon' + Math.floor(1 + Math.random() * 3));
              break;

            case Fruit.FRUIT_1:
              src.SoundController.instance.playSound('SoundJumpBlackberry' + Math.floor(1 + Math.random() * 3));
              break;

            case Fruit.FRUIT_2:
              src.SoundController.instance.playSound('SoundJumpStrawberry' + Math.floor(1 + Math.random() * 3));
              break;

            case Fruit.FRUIT_3:
            case Fruit.FRUIT_4:
              src.SoundController.instance.playSound('SoundJumpApple' + Math.floor(1 + Math.random() * 3));
              break;
          }

          var pineappleMultX = this.fruitType == Fruit.FRUIT_PINEAPPLE ? src.Constants.JUMP_FRUIT_MULT + src.Constants.JUMP_FRUIT_MULT * Math.random() : 1;
          var pineappleMultY = this.fruitType == Fruit.FRUIT_PINEAPPLE ? src.Constants.JUMP_FRUIT_MULT : 1;
          var sx = (src.Constants.SPEED_MIN + (src.Constants.SPEED_MAX - src.Constants.SPEED_MIN) * (this.randomAreaMin + (this.randomAreaMax - this.randomAreaMin) * Math.random())) * src.Constants.SPEED_X_MULT;
          this.speed = new Point(sx * pineappleMultX, src.Constants.SPEED_Y * pineappleMultY);

          if (this.fruitType != Fruit.FRUIT_PINEAPPLE) {
            var tx = this.speed.x / .13 / 10;
            this.speed.x -= tx * src.Constants.FRUIT_PINEAPPLE_SPPED_X;
            this.speed.y -= tx * src.Constants.FRUIT_PINEAPPLE_SPPED_Y;
          }

          this.maxSpeed = src.Constants.SPEED_COLLECT * src.Constants.SPEED_X_MULT;
        }
      }, {
        key: "jumpBomb",
        value: function jumpBomb() {
          this.speed = new Point(0, 0);

          if (this.fruitType == Fruit.BOMB) {
            src.SoundController.instance.playSound('SoundBombStart');
          }
        }
      }, {
        key: "move",
        value: function move() {
          this.liveTimer -= 0.5;
          var rotSpeed = this.fruitType == Fruit.FRUIT_WATERMELON ? src.Constants.FRUIT_ROTATION_SPEED / 2 : .1 / 2 + this.game.rnd.realInRange(-0.01, 0.03);

          if (this.isKilled) {
            if (!this.anim) {
              this.isDead = true;
            }
          } else {
            if (this.isCollected) {
              this.x += this.speed.x * this.W / 2;
              this.y += this.speed.y * this.W / 2;
              this.speed.y += src.Constants.GRAVITY * 1.15;
              this.container.rotation += rotSpeed * src.Constants.FRUIT_ROTATION_SPEED_M;
            } else {
              switch (this.fruitType) {
                case Fruit.TIME:
                case Fruit.ARMOR:
                case Fruit.STAR:
                  if (this.isStarted) {
                    if (this.waitTimer-- == 0) {
                      this.isStarted = false;
                      this.setRandomJump(Math.random() * 2 + 3);
                      this.jumpBonus();
                    }
                  } else {
                    this.x += this.speed.x * this.W / 2;
                    this.y += this.speed.y * this.W / 2;

                    if (this.fruitType == Fruit.STAR) {
                      this.container.rotation += rotSpeed / 2;
                    }

                    this.speed.x *= src.Constants.ACCEL_BONUS_X;
                    this.speed.y += src.Constants.GRAVITY;
                  }

                  break;

                case Fruit.FRUIT_BANANA:
                case Fruit.BOMB:
                  if (this.isStarted) {
                    if (this.anim2) {
                      if (!this.anim2.anim.isPlaying) {
                        this.anim2.anim.play();
                      }

                      if (this.waitTimer > 0) {
                        this.amp -= src.Constants.BOMB_AMP_START;

                        if (this.anim2.anim.frame > 30) {
                          this.anim2.anim.setFrame(20);
                        }
                      }
                    }

                    if (this.waitTimer-- < 0) {
                      if (this.waitTimer == -3) {
                        this.anim2.anim.setFrame(7);
                      }

                      this.amp -= src.Constants.BOMB_AMP_START2;
                      this.amp = Math.max(0, this.amp);
                    }

                    this.phase2 += src.Constants.BOMB_PHASE_START2 / 2;
                    this.anim2.x = this.anim2StartX + Math.sin(this.phase2) * this.amp * this.anim2.width * .8;
                  } else {
                    if (this.fruitType == Fruit.FRUIT_BANANA) this.container.rotation += rotSpeed / 2;
                    this.x += this.speed.x * this.W / 2;
                    this.y += this.speed.y * this.W / 2;
                    this.speed.x *= src.Constants.ACCEL_X;
                    this.speed.y += src.Constants.GRAVITY;
                  }

                  break;

                default:
                  if (this.isStarted) {
                    this.x += this.W * src.Constants.FRUIT_MOVE_SPEED / 2;
                    this.startedAnimation();

                    if (this.x > this.W && this.isCanThrow) {
                      this.isStarted = false;
                      this.jump();
                    }
                  } else {
                    this.scale.y += (1 - this.scale.y) * src.Constants.FRUIT_SCALE_SMOOTH / 2;
                    this.x += this.speed.x * this.W / 2;
                    this.y += this.speed.y * this.W / 2;

                    if (this.fruitType == Fruit.FRUIT_PINEAPPLE) {
                      if (this.speed.y >= 0) {
                        this.speed.x = 0;

                        if (this.pineappleTimer-- < 0) {
                          this.speed.y += src.Constants.GRAVITY;
                          this.container.rotation += (0 - this.container.rotation) * src.Constants.FRUIT_SCALE_SMOOTH / 2;
                        } else {
                          this.speed.y = 0;
                          this.phase += src.Constants.START_ANIM_PHASE_SPEED_PINE / 2;
                          this.container.rotation = Math.sin(this.phase) * src.Constants.START_ANIM_PHASE_R_AMP_PINE / 2;
                        }
                      } else {
                        this.speed.x *= src.Constants.ACCEL_X;
                        this.speed.y += src.Constants.GRAVITY;
                      }
                    } else {
                      this.container.rotation += rotSpeed;
                      this.speed.x *= src.Constants.ACCEL_X;
                      this.speed.y += src.Constants.GRAVITY;
                    }
                  }

                  break;
              }
            }
          }
        }
      }, {
        key: "setWaitTimer",
        value: function setWaitTimer(m) {
          if (this.fruitType != Fruit.BOMB && this.fruitType != Fruit.FRUIT_BANANA) {
            this.waitTimer = Math.floor(m * src.Constants.WAIT_BONUS_TIMER + src.Constants.WAIT_BONUS_TIMER * Math.random());
          } else {
            this.waitTimer = Math.floor((1 + m) * src.Constants.BOMB_TIME_DISTANCE + src.Constants.BOMB_TIME_DISTANCE);
          }
        }
      }, {
        key: "bombArmored",
        value: function bombArmored() {
          this.isCollected = false;
          this.killFruit(0);
        }
      }, {
        key: "collected",
        value: function collected() {
          switch (this.fruitType) {
            case Fruit.FRUIT_WATERMELON:
            case Fruit.FRUIT_BANANA:
              if (this.liveTimer > 0) return;

              if (--this.lives < 0) {
                src.SoundController.instance.playSound('SoundTrampoline' + Math.floor(1 + Math.random() * 3));
                this.isCollected = true;
              } else {
                if (this.fruitType == Fruit.FRUIT_BANANA) {
                  src.SoundController.instance.playSound('SoundStartBanana');
                } else {
                  src.SoundController.instance.playSound('SoundJumpWatermelon3');
                }

                this.liveTimer = 5;
                this.speed.x = 0;
                this.speed.y = src.Constants.SPEED_Y * src.Constants.SPEED_COLLECT_MULT * src.Constants.SECOND_JUMP;
                return;
              }

              break;

            case Fruit.ARMOR:
            case Fruit.TIME:
              this.isCollected = true;
              this.isKilled = true;
              return;

            case Fruit.STAR:
              this.isCollected = true;
              this.isKilled = true;
              src.MedalManager.instance.addValue(src.MedalType.STARGAZER, 1);
              return;

            default:
              src.SoundController.instance.playSound('SoundTrampoline' + Math.floor(1 + Math.random() * 3));
              this.isCollected = true;
              break;
          }

          if (this.isCollected && [Fruit.FRUIT_1, Fruit.FRUIT_2, Fruit.FRUIT_3, Fruit.FRUIT_4, Fruit.FRUIT_BANANA, Fruit.FRUIT_WATERMELON, Fruit.FRUIT_PINEAPPLE].indexOf(this.fruitType) != -1) {
            src.MedalManager.instance.addValue(src.MedalType.FRUTARIAN, 1);
            src.MedalManager.instance.addValue(src.MedalType.MOAR_JUICE, 1);
            src.MedalManager.instance.addValue(src.MedalType.HIPPIE_KI_YAY, 1);
          }

          if (this.isCollected && this.fruitType == Fruit.FRUIT_BANANA) {
            src.MedalManager.instance.addValue(src.MedalType.MASTER_JUGGLER, 1);
          }

          this.speed.y = -this.speed.y * src.Constants.SPEED_COLLECT_ANTIMULT + src.Constants.SPEED_Y * src.Constants.SPEED_COLLECT_MULT;
          this.speed.x = this.maxSpeed;
        }
      }, {
        key: "killFruit",
        value: function killFruit(t) {
          this.isKilled = true;
          this.container.rotation = 0;

          if (t == 1) {
            this.isDead = true;
            this.img.visible = false;
          } else {
            if (this.parent) {
              this.level.gameplayManager.gameplay.backgroundEffectsContainer.add(this);
            }

            if (this.anim) {
              this.anim.visible = true;
              this.anim.anim.play();
            }

            this.img.visible = false;

            switch (this.fruitType) {
              case Fruit.FRUIT_PINEAPPLE:
                src.SoundController.instance.playSound('SoundSplashPineapple');
                break;

              case Fruit.FRUIT_WATERMELON:
                src.SoundController.instance.playSound('SoundSplashWatermelon');
                break;

              case Fruit.FRUIT_BANANA:
                src.SoundController.instance.playSound('SoundSplashBanana');
                break;

              case Fruit.FRUIT_1:
              case Fruit.FRUIT_2:
                src.SoundController.instance.playSound('SoundSplashBerry');
                break;

              case Fruit.FRUIT_3:
              case Fruit.FRUIT_4:
                src.SoundController.instance.playSound('SoundSplashApple');
                break;

              case Fruit.BOMB:
                src.SoundController.instance.playSound('SoundBombExplosion' + (1 + Math.floor(Math.random() * 3)));
                break;
            }
          }
        }
      }, {
        key: "startedAnimation",
        value: function startedAnimation() {
          var phaseSpeed;
          var animScale;
          var mult = 1;
          var dddy = src.Constants.STARTED_ANIMATION_DDDY;

          switch (this.fruitType) {
            case Fruit.FRUIT_1:
            case Fruit.FRUIT_4:
            case Fruit.FRUIT_3:
            case Fruit.FRUIT_2:
              animScale = src.Constants.START_ANIM_FRUITS_SCALE;
              phaseSpeed = src.Constants.START_ANIM_PHASE_SPEED;
              break;

            case Fruit.FRUIT_PINEAPPLE:
              mult = .4;
              animScale = src.Constants.START_ANIM_FRUITS_SCALE * src.Constants.STARTED_ANIMATION_SCALE_PINEAPPLE;
              phaseSpeed = src.Constants.START_ANIM_PHASE_SPEED * src.Constants.STARTED_ANIMATION_PHASE_PINEAPPLE;
              break;

            case Fruit.FRUIT_WATERMELON:
              mult = 1.9;
              dddy = .5;
              animScale = src.Constants.START_ANIM_FRUITS_SCALE * src.Constants.STARTED_ANIMATION_SCALE_WATERMELON;
              phaseSpeed = src.Constants.START_ANIM_PHASE_SPEED * src.Constants.STARTED_ANIMATION_PHASE_WATERMELON;
              break;
          }

          this.phase += phaseSpeed / 2;

          if (this.fruitType == Fruit.FRUIT_3 || this.fruitType == Fruit.FRUIT_4) {
            this.container.rotation = Math.sin(this.phase + Math.PI / 2) * src.Constants.START_ANIM_PHASE_R_AMP - Math.PI * .01;
          }

          var sdy = Math.sin(this.phase + Math.PI * src.Constants.STARTED_ANIMATION_DY);
          var dy = Math.sin(this.phase);
          if (sdy > 0) sdy = -sdy;
          if (dy > 0) dy = -dy;
          var DW = this.W * src.Constants.STARTED_ANIMATION_W * mult;
          this.y = this.startY + dy * DW + DW * dddy;

          if (sdy > -src.Constants.STARTED_ANIMATION_Y_LIMIT2) {
            sdy = 0;

            if (sdy > -src.Constants.STARTED_ANIMATION_Y_LIMIT) {
              this.isCanThrow = true;
            }
          }

          this.scale.y += (1 + sdy * animScale - this.scale.y) * src.Constants.FRUIT_SCALE_SMOOTH;
        }
      }, {
        key: "h_anim2",
        value: function h_anim2(e) {
          this.isStarted = false;
          this.jumpBomb();
          this.img.visible = true;
          this.anim2.visible = false;
        }
      }, {
        key: "h_anim",
        value: function h_anim(e) {
          this.isDead = true;
          this.anim.visible = false;
        }
      }, {
        key: "Y",
        set: function set(v) {
          this.y = this.startY = v;

          switch (this.fruitType) {
            case Fruit.FRUIT_WATERMELON:
              this.y = this.startY -= this.img.height * src.Constants.FRUIT_DH;
              break;

            case Fruit.FRUIT_PINEAPPLE:
              this.y = this.startY -= this.img.height * src.Constants.FRUIT_DH;
              break;
          }
        },
        get: function get() {
          return this.y;
        }
      }, {
        key: "Cost",
        get: function get() {
          return this.cost * (this.lives + 1);
        }
      }, {
        key: "Type",
        get: function get() {
          return this.fruitType;
        }
      }, {
        key: "IsCollected",
        get: function get() {
          return this.isCollected;
        }
      }, {
        key: "IsKilled",
        get: function get() {
          return this.isKilled;
        }
      }, {
        key: "IsDead",
        get: function get() {
          return this.isDead;
        }
      }]);

      return Fruit;
    }(Phaser.Group);

    Fruit.FRUIT_1 = 0;
    Fruit.FRUIT_2 = 1;
    Fruit.FRUIT_3 = 2; //  green

    Fruit.FRUIT_4 = 3; // red

    Fruit.FRUIT_BANANA = 4;
    Fruit.FRUIT_WATERMELON = 5;
    Fruit.FRUIT_PINEAPPLE = 6;
    Fruit.BOMB = 7;
    Fruit.TIME = 8;
    Fruit.ARMOR = 9;
    Fruit.STAR = 10;
    loops.Fruit = Fruit;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {}));

var src;

(function (src) {
  var loops;

  (function (loops) {
    var FruitManager =
    /*#__PURE__*/
    function () {
      function FruitManager(g) {
        _classCallCheck(this, FruitManager);

        this.myGame = g;
        this.splashes = [];
        this.textures = [];
        this.fruit1splash = FruitManager.getPack('fruits_splash', 'blackberry_splash2', 67);
        this.fruit2splash = FruitManager.getPack('fruits_splash', 'strawberry_splash', 67);
        this.fruit3splash = FruitManager.getPack('fruits_splash', 'apple_red_splash', 67);
        this.fruit4splash = FruitManager.getPack('fruits_splash', 'apple_green_splash', 67);
        this.fruit5splash = FruitManager.getPack('fruits_splash', 'banana_splash', 67);
        this.fruit6splash = FruitManager.getPack('watermelon_splash', 'watermelon_splash', 67);
        this.fruit7splash = FruitManager.getPack('pineapple_splash', 'pineapple_splash', 67);
        this.bombSplash = FruitManager.getPack('actors', 'bomb', 39);
        this.splashes.push(this.fruit1splash, this.fruit2splash, this.fruit3splash, this.fruit4splash, this.fruit5splash, this.fruit6splash, this.fruit7splash, this.bombSplash);
        this.textures = ['blackberry', 'strawberry', 'apple_red', 'apple_green', 'banana', 'watermelon', 'pineapple', 'bomb', 'bonus_time', 'bonus_shield', 'bonus_star'];
      }

      _createClass(FruitManager, [{
        key: "getFruit",
        value: function getFruit(t, s, levelID) {
          return new loops.Fruit(t, t <= loops.Fruit.BOMB ? this.splashes[t] : null, this.textures[t], s, this.myGame.RW * src.Constants.JUMP_START_X_LIMIT, this.myGame, levelID);
        }
      }], [{
        key: "getPack2",
        value: function getPack2(g, tex_name, xml_name, base, count) {
          return FruitManager.getPack(tex_name, base, count);
        }
      }, {
        key: "getPack",
        value: function getPack(atlas, base, count) {
          return {
            atlas: atlas,
            frames: Phaser.Animation.generateFrameNames(base, 0, count, '', 4)
          };
        }
      }]);

      return FruitManager;
    }();

    loops.FruitManager = FruitManager;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {}));

var src;

(function (src) {
  var loops;

  (function (loops) {
    var Point = Phaser.Point;

    var Interface =
    /*#__PURE__*/
    function (_Phaser$Group7) {
      _inherits(Interface, _Phaser$Group7);

      function Interface(g) {
        var _this20;

        _classCallCheck(this, Interface);

        _this20 = _possibleConstructorReturn(this, _getPrototypeOf(Interface).call(this, src.App.instance));
        _this20.lastMult = 0;
        _this20.startTimer = 60;
        _this20.colors = ['#7BC970', '#F5C72D', '#FF8627', '#F75151', '#E76BFF', '#FF4444', '#999999'];
        _this20.lastComboColor = '#7BC970';
        _this20.myGame = g;
        _this20.words_bad = [];
        _this20.words_good = [];
        src.SoundController.instance.stopCountingSound();
        var s = _this20.myGame.RW / _this20.myGame.W * src.Constants.INTERFACE_SCALE;
        var d = src.Constants.INTERFACE_D;
        var bddx = _this20.myGame.RW * src.Constants.INTERFACE_BDDX;
        var bdx = _this20.myGame.RW * src.Constants.INTERFACE_BDX;
        var bdy = _this20.myGame.RH * src.Constants.INTERFACE_BDY;
        var ss = src.Constants.INTERFACE_SCALE2;

        _this20.addChild(_this20.slider = new loops.Slider(g, 0, 0));

        _this20.addChild(_this20.backTimeTop = new src.AnimatedSprite(src.Settings.GAME_ATLAS, 'time_top', 1, true, 0));

        _this20.addChild(_this20.backTime = new src.AnimatedSprite(src.Settings.GAME_ATLAS, 'time_icon', 1, true, 0));

        _this20.addChild(_this20.backRemains = new src.AnimatedSprite(src.Settings.GAME_ATLAS, 'slider_combo', 0, true, 0));

        _this20.addChild(_this20.combo_anim = new src.AnimatedSprite('effects', 'combo_ray', 42));

        _this20.addChild(_this20.t_remains = src.TextUtils.getStyledText('25', g.RW * d, g.RW * d, 26, '#ffffff', 'rgba(0,0,0,0.1)', 4));

        _this20.addChild(_this20.t_time = src.TextUtils.getStyledText('25', g.RW * d, g.RW * d, 32, '#ffffff', 'rgba(0,0,0,0.1)', 5));

        var dd = src.Constants.INTERFACE_DD;

        _this20.addChild(_this20.t_points = src.TextUtils.getStyledText('+60000', g.RW * dd, g.RW * dd, 40, '#ffffff', 'rgba(0,0,0,0.1)', 5));

        _this20.addChild(_this20.t_combo = src.TextUtils.getStyledText('2\nCombo', g.RW * dd, g.RW * dd, 36, _this20.lastComboColor, '#FFFFFF', 4));

        _this20.addChild(_this20.t_mult = src.TextUtils.getStyledText('x2', g.RW * dd, g.RW * dd, 40, '#7BC970', '#FFFFFF', 4));

        _this20.addChild(_this20.t_comboPlus = src.TextUtils.getStyledText('x4', g.RW * dd, g.RW * dd, 40, '#E76BFF', '#FFFFFF', 6));

        _this20.pointsScale = _this20.t_points.scale.x;

        _this20.addChild(_this20.scoreEffect = new src.AnimatedSprite('score_effect', 'score_effect', 45, false, 0, true));

        _this20.addChild(_this20.super_flash = new src.AnimatedSprite('effects', 'super_flash', 39, false, 0, true));

        _this20.addChild(_this20.starsEffect = new src.AnimatedSprite('score_effect', 'score_effect', 45, false, 0, true));

        _this20.combo_anim.anchor.set(0.5);

        _this20.scoreEffect.alpha = 0.6;

        _this20.t_points.anchor.set(0);

        _this20.t_points.position.set(13, 7);

        _this20.t_combo.lineSpacing = -15;
        _this20.scoreEffect.x = -40; //-this.scoreEffect.width * Constants.INTERFACE_SCORE_X;

        _this20.scoreEffect.y = -70; //-this.scoreEffect.width * .5;

        _this20.super_flash.x = _this20.myGame.RW * src.Constants.INTERFACE_SUPERFLASH_X - _this20.super_flash.width / 2;
        _this20.super_flash.y = _this20.myGame.RW * .1 - _this20.super_flash.height / 2;
        var sdx = _this20.myGame.RW * src.Constants.INTERFACE_SDX;
        _this20.t_combo.x = _this20.myGame.RW * src.Constants.INTERFACE_COMBO_X;
        _this20.t_combo.y = _this20.myGame.RW * src.Constants.INTERFACE_COMBO_Y;
        _this20.t_mult.x = _this20.myGame.RW * src.Constants.INTERFACE_MULT_X;
        _this20.t_mult.y = _this20.myGame.RW * src.Constants.INTERFACE_MULT_Y;
        _this20.slider.x = _this20.myGame.RW * src.Constants.INTERFACE_SLIDER_X + sdx;
        _this20.slider.y = _this20.myGame.RW * src.Constants.INTERFACE_SLIDER_Y;
        _this20.backTimeTop.x = _this20.myGame.RW * src.Constants.INTERFACE_BACKTIME_X + sdx;
        _this20.backTimeTop.y = _this20.myGame.RW * src.Constants.INTERFACE_BACKTIME_Y;
        _this20.backTime.x = _this20.myGame.RW * src.Constants.INTERFACE_BACKTIME2_X + sdx;
        _this20.backTime.y = _this20.myGame.RW * src.Constants.INTERFACE_BACKTIME2_Y;
        _this20.backRemains.x = _this20.myGame.RW * src.Constants.INTERFACE_BACKREMAINS_X + sdx;
        _this20.backRemains.y = _this20.myGame.RW * src.Constants.INTERFACE_BACKREMAINS_Y;
        _this20.startSlider = new Point(_this20.slider.x, _this20.slider.y);
        _this20.startRemains = new Point(_this20.backRemains.x, _this20.backRemains.y);
        _this20.startTime = new Point(_this20.backTime.x, _this20.backTime.y);
        _this20.startTimeTop = new Point(_this20.backTimeTop.x, _this20.backTimeTop.y);
        _this20.startCombo = new Point(_this20.t_combo.x, _this20.t_combo.y);
        _this20.startMult = new Point(_this20.t_mult.x, _this20.t_mult.y);
        _this20.combo_anim.x = _this20.startCombo.x + _this20.combo_anim.width * src.Constants.INTERFACE_COMBO_ANIM_X;
        _this20.combo_anim.y = _this20.startCombo.y + _this20.combo_anim.width * src.Constants.INTERFACE_COMBO_ANIM_Y;
        _this20.startMultScale = _this20.t_mult.scale.x;
        var rw = _this20.myGame.RW * .5;
        var rh = _this20.myGame.H * .5;

        _this20.add(_this20.wordContainer = _this20.game.make.group());

        _this20.wordContainer.addChild(_this20.word_go = new src.AnimatedSprite('words', 'word_go4', 61));

        _this20.word_go.anchor.set(0.5);

        _this20.placeWord(_this20.word_go, rw * 0.6, rh * 0.8);

        _this20.wordContainer.addChild(_this20.word_starfall = new src.AnimatedSprite('words', 'word_star_shot', 30));

        _this20.word_starfall.x = rw - _this20.word_starfall.width / 2;
        _this20.word_starfall.y = rh - _this20.word_starfall.height / 2;

        _this20.wordContainer.addChild(_this20.word_update_time = new src.AnimatedSprite('words', 'word_timer_refilled', 0));

        _this20.placeWord(_this20.word_update_time, rw * src.Constants.INTERFACE_WORD_UPDATE_X, rh * src.Constants.INTERFACE_WORD_UPDATE_Y);

        _this20.wordContainer.addChild(_this20.word_tropical = new src.AnimatedSprite('words', 'word_bg_name', 12));

        _this20.placeWord(_this20.word_tropical, rw, rh);

        _this20.word_tropical.currentFrame = 11;

        _this20.wordContainer.addChild(_this20.word_orchard = new src.AnimatedSprite('words', 'word_apple_orchard', 0));

        _this20.placeWord(_this20.word_orchard, rw, rh);

        _this20.wordContainer.addChild(_this20.word_watermelon = new src.AnimatedSprite('words', 'word_watermelon_farm', 0));

        _this20.placeWord(_this20.word_watermelon, rw, rh);

        _this20.wordContainer.addChild(_this20.word_extra_time = new src.AnimatedSprite('words', 'word_extra_time', 0));

        _this20.placeWord(_this20.word_extra_time, rw, rh);

        _this20.wordContainer.addChild(_this20.word_bomb_attack = new src.AnimatedSprite('words', 'word_bomb_attack', 0));

        _this20.placeWord(_this20.word_bomb_attack, rw, rh);

        _this20.wordContainer.addChild(_this20.word_out_of_time = new src.AnimatedSprite('words', 'word_time_out', 30));

        _this20.placeWord(_this20.word_out_of_time, rw, rh);

        _this20.wordContainer.addChild(_this20.word_myGame_over = new src.AnimatedSprite('words', 'word_game_over_a', 30));

        _this20.placeWord(_this20.word_myGame_over, rw, rh);

        _this20.wordContainer.addChild(_this20.word_shield = new src.AnimatedSprite('words', 'word_shield', 0));

        _this20.placeWord(_this20.word_shield, rw, rh);

        _this20.words_good.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_well_done', 0)));

        _this20.words_good.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_keep_it_up', 0)));

        _this20.words_good.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_good', 0)));

        _this20.words_good.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_great', 0)));

        _this20.words_good.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_fantastic', 0)));

        _this20.words_good.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_incredible', 0)));

        _this20.words_good.push(_this20.wordContainer.addChild(_this20.word_good = new src.AnimatedSprite('words', 'word_awesome', 0)));

        _this20.words_bad.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_oops', 0)));

        _this20.words_bad.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_splash', 0)));

        _this20.words_bad.push(_this20.wordContainer.addChild(new src.AnimatedSprite('words', 'word_splat', 0)));

        _this20.words_bad.push(_this20.wordContainer.addChild(_this20.word_bad = new src.AnimatedSprite('words', 'word_missed', 0)));

        for (var i = 0; i < _this20.words_bad.length; i++) {
          _this20.placeWord(_this20.words_bad[i], rw - rw * src.Constants.INTERFACE_WORDB_BAD_X + rw * src.Constants.INTERFACE_WORDB_BAD_DX * i, rh * 1.2);

          _this20.words_bad[i].visible = false;
        }

        for (var j = 0; j < _this20.words_good.length; j++) {
          _this20.placeWord(_this20.words_good[j], rw - rw * src.Constants.INTERFACE_WORDB_BAD_X + rw * src.Constants.INTERFACE_WORDB_GOOD_DX * j, rh * 1.2);

          _this20.words_good[j].visible = false;
        }

        _this20.updateLabels();

        _this20.init();

        return _this20;
      }

      _createClass(Interface, [{
        key: "placeWord",
        value: function placeWord(word, px, py) {
          word.anchor.set(0.5);
          word.x = px;
          word.y = py;
        }
      }, {
        key: "watermelonGrow",
        value: function watermelonGrow() {
          this.word_watermelon.y = this.myGame.H * .5;
          this.word_watermelon.alpha = 1;
          this.word_watermelon.scale.set(0);
          this.word_watermelon.visible = true;
        }
      }, {
        key: "orchardGrow",
        value: function orchardGrow() {
          this.word_orchard.y = this.myGame.H * .5;
          this.word_orchard.alpha = 1;
          this.word_orchard.scale.set(0);
          this.word_orchard.visible = true;
        }
      }, {
        key: "tropicalGrow",
        value: function tropicalGrow() {
          this.word_tropical.y = this.myGame.H * .5;
          this.word_tropical.alpha = 1;
          this.word_tropical.scale.set(0);
          this.word_tropical.visible = true;
        }
      }, {
        key: "timer_refill",
        value: function timer_refill() {
          this.word_update_time.y = this.myGame.H * src.Constants.INTERFACE_TIMER_REFIIL_Y;
          this.word_update_time.alpha = 1;
          this.word_update_time.scale.set(0);
          this.word_update_time.visible = true;
        }
      }, {
        key: "starfall",
        value: function starfall() {
          this.word_starfall.visible = true;
          this.word_starfall.currentFrame = 0;
        }
      }, {
        key: "fruitCollected",
        value: function fruitCollected(combo) {
          if (!this.word_good.visible && this.word_good_timer <= 0) {
            var v;

            if (combo < src.Constants.MAX_FRUIT_COUNT_TO_STARFALL * .6) {
              v = Math.floor(Math.random() * 4);
            } else {
              v = Math.floor(3 + Math.random() * 4);
            }

            this.word_good = this.words_good[v];
            this.word_good.y = this.myGame.H * src.Constants.INTERFACE_WORD_GOOD_Y;
            this.word_good.alpha = 1;
            this.word_good.scale.set(0);
            this.word_good.visible = true;
            this.word_good_timer = src.Constants.GOOD_WORD_TIMER;
          }
        }
      }, {
        key: "fruitLost",
        value: function fruitLost() {
          if (!this.word_bad.visible) {
            this.word_bad = this.words_bad[Math.floor(Math.random() * this.words_bad.length)];
            this.word_bad.y = this.myGame.H * src.Constants.INTERFACE_BAD_GOOD_Y;
            this.word_bad.alpha = 1;
            this.word_bad.scale.set(0);
            this.word_bad.visible = true;
          }
        }
      }, {
        key: "out_of_time",
        value: function out_of_time() {
          if (!this.word_out_of_time.visible && !this.word_myGame_over.visible) {
            this.word_out_of_time.visible = true;
            this.word_out_of_time.currentFrame = 0;
          }
        }
      }, {
        key: "myGame_over",
        value: function myGame_over() {
          if (!this.word_myGame_over.visible && !this.word_out_of_time.visible) {
            this.word_myGame_over.visible = true;
            this.word_myGame_over.currentFrame = 0;
          }
        }
      }, {
        key: "shield",
        value: function shield() {
          this.word_shield.y = this.myGame.H * src.Constants.INTERFACE_SHIELD_Y;
          this.word_shield.alpha = 1;
          this.word_shield.scale.set(0);
          this.word_shield.visible = true;
        }
      }, {
        key: "extra_time",
        value: function extra_time() {
          this.word_extra_time.y = this.myGame.H * src.Constants.INTERFACE_EXTRA_Y;
          this.word_extra_time.alpha = 1;
          this.word_extra_time.scale.set(0);
          this.word_extra_time.visible = true;
        }
      }, {
        key: "init",
        value: function init() {
          this.word_myGame_over.alpha = this.word_out_of_time.alpha = 1;
          this.word_good_timer = 0;
          this.word_extra_time.visible = this.word_shield.visible = this.word_bomb_attack.visible = this.word_myGame_over.visible = this.word_out_of_time.visible = this.word_bad.visible = false;
          this.word_update_time.visible = false;
          this.word_starfall.visible = false;
          this.word_tropical.visible = this.word_orchard.visible = this.word_watermelon.visible = false;
          this.multPhase = 0;
          this.alpha = 0;
          this.super_flash.visible = false;
          this.word_go.visible = false;
          this.startTimer = 60;
          this.starsEffect.visible = false;
          this.scoreEffect.visible = false;
          this.comboPlusSpeed = new Point();
          this.t_comboPlus.x = -this.myGame.RW * .5;
          this.t_comboPlus.alpha = 0;
          this.combo_anim.alpha = 0;
          this.lastMult = -1;
          this.super_flash.visible = false;
          this.t_mult.alpha = 0;
          this.isMult = false;
          this.isCombo = false;
          this.t_combo.alpha = 0;
          this.isSoundTimeOut = false;
          this.remains = 0;
          this.points = 0;
          this.target_points = 0;
          this.max_remains = 0;
          this.max_remains = 0;
          this.slider.Value = 0;
          this.t_points.text = '' + this.points;
          this.setComboColor(this.colors[0]);
          this.updateLabels();
        }
      }, {
        key: "updateLabels",
        value: function updateLabels() {
          var ttx = src.Constants.INTERFACE_TIME_X;
          this.t_time.x = this.backTime.x + this.backTime.width * ttx;
          this.t_time.y = this.backTime.y + this.backTime.height * ttx;
          this.t_remains.x = this.backRemains.x + this.backRemains.width * ttx;
          this.t_remains.y = this.backRemains.y + this.backRemains.height * ttx;
        }
      }, {
        key: "addComboPoints",
        value: function addComboPoints(v) {
          var _this21 = this;

          if (v == 0) return;
          this.game.time.events.add(950, function () {
            _this21.comboPlusSpeed = new Point();
            _this21.t_comboPlus.visible = true;
            _this21.t_comboPlus.text = '+' + Math.floor(v);
            _this21.t_comboPlus.rotation = src.Constants.INTERFACE_COMBO_ROT;
            _this21.t_comboPlus.x = _this21.t_time.x - _this21.myGame.RW * src.Constants.INTERFACE_COMBO_X2;
            _this21.t_comboPlus.y = _this21.t_time.y + _this21.myGame.RW * src.Constants.INTERFACE_COMBO_Y2;
            _this21.t_comboPlus.alpha = 1;
          });
        }
      }, {
        key: "startFlash",
        value: function startFlash() {
          this.super_flash.visible = true;
          this.super_flash.currentFrame = 0;
        }
      }, {
        key: "wordAnimate",
        value: function wordAnimate(word) {
          if (this.word_bad) {
            if (word.visible) {
              word.y -= this.myGame.H * src.Constants.WORD_SPEED_Y;
              word.scale.set(word.scale.x + (1 - word.scale.x) * src.Constants.WORD_SCALE_SPEED);
              word.alpha += (0 - word.alpha) * (word.alpha > src.Constants.WORD_ALPHA_PRE_LIMIT ? src.Constants.WORD_ALPHA_PRE_SPEED : src.Constants.WORD_ALPHA_OUT_SPEED);

              if (word.alpha < src.Constants.WORD_ALPHA_OUT_LIMIT) {
                word.visible = false;
              }
            }
          }
        }
      }, {
        key: "setComboColor",
        value: function setComboColor(color) {
          if (this.lastComboColor != color) {
            this.lastComboColor = color;
            this.t_combo.addColor(color, 0);
            this.t_mult.addColor(color, 0); // this.starsEffect.tint = parseInt(color.slice().replace("#", '0x'));
          }
        }
      }, {
        key: "updateLogic",
        value: function updateLogic() {
          this.multPhase += 0.1;

          if (this.word_good_timer > 0) {
            this.word_good_timer--;
          }

          this.wordAnimate(this.word_extra_time);
          this.wordAnimate(this.word_shield);
          this.wordAnimate(this.word_bomb_attack);
          this.wordAnimate(this.word_update_time);
          this.wordAnimate(this.word_tropical);
          this.wordAnimate(this.word_watermelon);
          this.wordAnimate(this.word_orchard);
          this.wordAnimate(this.word_bad);
          this.wordAnimate(this.word_good);

          if (this.word_starfall.visible) {
            this.word_starfall.animate();
            this.h_words(this.word_starfall);
          }

          if (this.word_myGame_over.visible && this.word_myGame_over.alpha == 1) {
            this.word_myGame_over.animate();
            this.h_words(this.word_myGame_over);
          }

          if (this.word_out_of_time.visible && this.word_out_of_time.alpha == 1) {
            this.word_out_of_time.animate();
            this.h_words(this.word_out_of_time);
          }

          if (this.word_go.visible) {
            this.word_go.animate();
            this.h_words(this.word_go);
          }

          this.alpha += (1 - this.alpha) * .1;

          if (this.startTimer > 0) {
            if (--this.startTimer == 0) {
              this.word_go.visible = true;
              this.word_go.currentFrame = 0;
            }
          }

          if (this.starsEffect.visible) {
            this.starsEffect.animate();
          }

          this.t_mult.rotation = Math.sin(this.multPhase) * .03;

          if (this.super_flash.visible) {
            this.super_flash.animate();
          }

          if (this.scoreEffect.visible) {
            this.scoreEffect.animate();
          }

          if (this.t_comboPlus.x > -this.myGame.RW * .2) {
            if (this.t_comboPlus.rotation > 0) {
              this.t_comboPlus.rotation -= 0.005;
              this.comboPlusSpeed.x -= 0.0003;
              this.comboPlusSpeed.y -= 0.0002;
            } else {
              this.t_comboPlus.alpha -= 0.03;
              this.comboPlusSpeed.x -= 0.003;
              this.comboPlusSpeed.y -= 0.002;
              this.t_comboPlus.rotation -= 0.01;
            }

            this.t_comboPlus.x += this.comboPlusSpeed.x * this.myGame.RW;
            this.t_comboPlus.y += this.comboPlusSpeed.y * this.myGame.RW;

            if (this.t_comboPlus.x < 0 && this.t_comboPlus.visible) {
              this.t_comboPlus.visible = false;
              this.scoreEffect.visible = true;
              this.scoreEffect.currentFrame = 0;
              this.t_points.scale.set(this.t_points.scale.x + this.pointsScale * 0.75);
            }
          }

          if (this.isCombo) {
            if (this.combo_anim.currentFrame < 20) {
              this.combo_anim.animate();
            }

            this.combo_anim.rotation += .05;
          } else {
            this.combo_anim.alpha += (0 - this.combo_anim.alpha) * .2;
          }

          this.points += (this.target_points - this.points) * .2;
          this.t_points.text = Math.ceil(this.points) + '';
          this.t_points.scale.set(this.t_points.scale.x + (this.pointsScale - this.t_points.scale.x) * .15);
          this.slider.scale.y += (1 - this.slider.scale.y) * .2;
          this.slider.update();
          this.slider.Value += (1 - this.remains / this.max_remains - this.slider.Value) * .1;
          var smooth = .2;
          this.backRemains.x += (this.startRemains.x - this.backRemains.x) * smooth;
          this.backRemains.y += (this.startRemains.y - this.backRemains.y) * smooth;
          this.slider.x += (this.startSlider.x - this.slider.x) * smooth;
          this.slider.y += (this.startSlider.y - this.slider.y) * smooth;
          this.backTime.x += (this.startTime.x - this.backTime.x) * smooth;
          this.backTime.y += (this.startTime.y - this.backTime.y) * smooth;
          this.backTimeTop.x += (this.startTimeTop.x - this.backTimeTop.x) * smooth;
          this.backTimeTop.y += (this.startTimeTop.y - this.backTimeTop.y) * smooth;

          if (this.time < 10 && this.time > 0) {
            var d = this.myGame.RW * .005;
            this.backTime.x = this.startTime.x + Math.random() * d * 2 - d;
            this.backTime.y = this.startTime.y + Math.random() * d * 2 - d;
            this.backTimeTop.x = this.startTimeTop.x + Math.random() * d * 2 - d;
            this.backTimeTop.y = this.startTimeTop.y + Math.random() * d * 2 - d;
          }

          if (this.isCombo) {
            this.t_combo.alpha += (1 - this.t_combo.alpha) * .2;
          } else {
            this.t_combo.alpha += (0 - this.t_combo.alpha) * .2;
          }

          if (this.isMult) {
            this.t_mult.alpha += (1 - this.t_mult.alpha) * .2;
            this.t_mult.scale.set(this.t_mult.scale.x + (this.startMultScale - this.t_mult.scale.x) * .1);
          } else {
            this.t_mult.alpha += (0 - this.t_mult.alpha) * .2;
            this.t_mult.scale.set(this.t_mult.scale.x + (.8 * this.startMultScale - this.t_mult.scale.x) * .1);
          }

          this.t_mult.x += (this.startMult.x - this.t_mult.x - this.t_mult.width / 2) * smooth;
          this.t_mult.y += (this.startMult.y - this.t_mult.y - this.t_mult.height / 2) * smooth;
          this.t_combo.x += (this.startCombo.x - this.t_combo.x) * smooth;
          this.t_combo.y += (this.startCombo.y - this.t_combo.y) * smooth;
          this.updateLabels();
        } // listeners

      }, {
        key: "h_words",
        value: function h_words(word) {
          if (word.currentFrame == word.numFrames) {
            if (word != this.word_out_of_time && word != this.word_myGame_over) {
              word.visible = false;
            } else {
              word.alpha = .99;
              word.currentFrame = word.numFrames;
            }
          }
        }
      }, {
        key: "Points",
        set: function set(v) {
          this.target_points = v;
        }
      }, {
        key: "Time",
        set: function set(v) {
          if (v >= 0 && this.time != v) {
            this.time = v;

            if (this.time < 10) {
              this.backTime.currentFrame = this.backTimeTop.currentFrame = 1;

              if (!this.isSoundTimeOut) {
                this.isSoundTimeOut = true;
                src.SoundController.instance.startCountingSound();
              }
            } else {
              if (this.isSoundTimeOut) {
                src.SoundController.instance.stopCountingSound();
                this.isSoundTimeOut = false;
              }
            }

            this.t_time.text = '' + Math.floor(v);
            this.updateLabels();
          }
        }
      }, {
        key: "MaxRemains",
        set: function set(v) {
          this.max_remains = v;
          this.backTime.currentFrame = this.backTimeTop.currentFrame = 0;
          this.slider.scale.y = src.Constants.INTERFACE_START_SLIDER_SCALE;
        }
      }, {
        key: "Remains",
        set: function set(v) {
          this.remains = v;
          this.slider.active();
          var d = this.myGame.RW * src.Constants.INTERFACE_REMAINS_D;
          this.slider.x += Math.random() * d * 2 - d;
          this.slider.y += Math.random() * d * 2 - d;
          this.backRemains.x += Math.random() * d * 2 - d;
          this.backRemains.y += Math.random() * d * 2 - d;
          this.t_remains.text = v + '';
          this.updateLabels();
          src.SoundController.instance.playSound('SoundGetFruit' + Math.floor(1 + Math.random() * 3));
        }
      }, {
        key: "Combo",
        set: function set(v) {
          if (v == 0) {
            this.lastMult = -1;
            this.isCombo = false;
            this.setComboColor(this.colors[6]);
            this.t_combo.y = this.startCombo.y - this.myGame.RW * src.Constants.INTERFACE_COMBO_DW;
          } else {
            if (!this.isCombo) {
              this.combo_anim.alpha = 1;
              this.combo_anim.currentFrame = 0;
              this.setComboColor(this.colors[0]);
            }

            this.isCombo = true;
            this.t_combo.text = v + '\nCombo';
            this.t_combo.y = this.startCombo.y - this.myGame.RW * src.Constants.INTERFACE_COMBO_DH;
          }

          var m = v / src.Constants.COMBO_MAX;
          var m_rounded = Math.floor(m);

          if (m >= 1 && m < 7) {
            if (!this.isMult) {
              this.isMult = true;
              this.t_mult.alpha = 0;
            }

            if (this.lastMult != m) {
              if (Math.floor(this.lastMult) != m_rounded && m_rounded >= 1) {
                this.starsEffect.x = this.t_mult.x - this.myGame.RW * src.Constants.INTERFACE_STARS_DW;
                this.starsEffect.y = this.t_mult.y - this.myGame.RW * src.Constants.INTERFACE_STARS_DH;
                this.starsEffect.visible = true;
                this.starsEffect.currentFrame = 1;
                src.SoundController.instance.playSound('SoundComboX');
              }

              this.lastMult = m;
              this.t_mult.scale.set(2 * this.startMultScale);
              this.setComboColor(this.colors[Phaser.Math.clamp(Math.floor(m), 0, 5)]);
            }

            this.t_mult.text = 'x' + (m_rounded + 1);
          } else {
            this.isMult = false;
          }
        }
      }]);

      return Interface;
    }(Phaser.Group);

    loops.Interface = Interface;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {}));

var src;

(function (src) {
  var loops;

  (function (loops) {
    var Machine =
    /*#__PURE__*/
    function (_Phaser$Group8) {
      _inherits(Machine, _Phaser$Group8);

      function Machine(g, px, py, container) {
        var _this22;

        _classCallCheck(this, Machine);

        _this22 = _possibleConstructorReturn(this, _getPrototypeOf(Machine).call(this, src.App.instance, null));
        _this22.isStarted = false;
        _this22.myGame = g;
        var s = _this22.myGame.RW / _this22.myGame.W * src.Constants.INTERFACE_SCALE;
        _this22.fruits = [];

        _this22.fruits.push(_this22.addChild(_this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'apple_red0000')));

        _this22.fruits.push(_this22.addChild(_this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'blackberry0000')));

        _this22.fruits.push(_this22.addChild(_this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'blackberry0000')));

        _this22.fruits.push(_this22.addChild(_this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'banana0000')));

        _this22.fruits.forEach(function (fruit) {
          return fruit.scale.set(s);
        });

        _this22.addChild(_this22.idol = _this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'idol0000'));

        container.addChild(_this22.wheel_s = _this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'wheel_s0000'));
        container.addChild(_this22.wheel = _this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'wheel0000'));

        _this22.addChild(_this22.cup = _this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'cup0000'));

        _this22.addChild(_this22.cups = _this22.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'cups0000'));

        _this22.wheel.anchor.set(src.Constants.MACHINE_WHEEL_PIVOT);

        _this22.wheel_s.anchor.set(0.5);

        _this22.idol.x = _this22.idol.width / 2;
        _this22.idol.y = _this22.idol.height;

        _this22.idol.anchor.set(0.5, src.Constants.MACHINE_IDOL_H);

        _this22.phase = 0;
        _this22.x = px;
        _this22.y = py;
        [_this22.wheel, _this22.wheel_s, _this22.cup, _this22.cups, _this22.idol].forEach(function (sprite) {
          return sprite.scale.set(s);
        });
        _this22.startS = _this22.idol.scale.x = 1;

        _this22.cup.position.set(-16, 315);

        _this22.cups.position.set(215, 268);

        _this22.wheel.x = _this22.myGame.RW * src.Constants.MACHINE_WHEEL_X + px;
        _this22.wheel.y = _this22.myGame.RW * src.Constants.MACHINE_WHEEL_Y + py;

        _this22.wheel_s.position.copyFrom(_this22.wheel.position);

        return _this22;
      }

      _createClass(Machine, [{
        key: "init",
        value: function init() {
          var _this23 = this;

          this.speeds = [];
          this.game.time.events.add(50, function () {
            _this23.isStarted = true;
          });

          for (var i = 0; i < this.fruits.length; i++) {
            this.speeds.push(new Phaser.Point(8.5, -5 - i * src.Constants.MACHINE_FRUIT_SPEED));
            this.fruits[i].pivotX = this.fruits[i].width / 2;
            this.fruits[i].pivotY = this.fruits[i].height / 2;
            this.fruits[i].x = this.idol.x - this.idol.width - this.idol.width * .4 * i;
            this.fruits[i].y = this.idol.y + this.idol.width * .4 * i - this.idol.width * .8;
            this.fruits[i].visible = true;
          }
        }
      }, {
        key: "update",
        value: function update() {
          if (!this.isStarted) {
            return;
          }

          this.wheel.rotation -= 0.1 / 2;
          this.phase += (Math.random() * .2 + 0.1) / 2;
          this.idol.scale.y = this.startS * .98 + Math.sin(this.phase) * (this.startS * .04);
          this.idol.scale.x += (this.startS - this.idol.scale.x) * .3 / 2;

          for (var i = 0; i < this.fruits.length; i++) {
            if (this.fruits[i].visible) {
              this.fruits[i].rotation += 0.2 / 2;
              this.fruits[i].x += this.speeds[i].x * 1.5 / 2;
              this.fruits[i].y += this.speeds[i].y * 1.5 / 2;
              this.speeds[i].y += .6 * 1.5 / 2;

              if (this.fruits[i].x > this.idol.x) {
                this.fruits[i].visible = false;
                this.idol.scale.x += this.startS * .16;
              }
            }
          }
        }
      }]);

      return Machine;
    }(Phaser.Group);

    loops.Machine = Machine;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {}));

var src;

(function (src) {
  var loops;

  (function (loops) {
    var Player =
    /*#__PURE__*/
    function (_Phaser$Group9) {
      _inherits(Player, _Phaser$Group9);

      function Player(g, px, py) {
        var _this24;

        _classCallCheck(this, Player);

        _this24 = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, src.App.instance));
        _this24.isArmored = false;
        _this24.isLeft = false;
        _this24.isDead = false;
        _this24.isExplosionFinished = false;
        _this24.isRight = false;
        _this24.isBatutAnimSwap = false;
        _this24.isBatuted = false;
        _this24.isHappy = false;
        _this24.isIdle = false;
        _this24.frameIndex = 0;
        _this24.x = px;
        _this24.y = py;
        _this24.myGame = g;

        _this24.addChild(_this24.container1 = _this24.game.make.group());

        _this24.addChild(_this24.container2 = _this24.game.make.group());

        _this24.addChild(_this24.container3 = _this24.game.make.group());

        _this24.addChild(_this24.armor = new src.AnimatedSprite('effects', 'armor', 68));

        _this24.container1.addChild(_this24.girl = new src.AnimatedSprite('actors', 'girl', 67));

        _this24.container1.addChild(_this24.boy = new src.AnimatedSprite('actors', 'boy', 67));

        _this24.container1.addChild(_this24.batut = new src.AnimatedSprite('actors', 'batut', 72));

        _this24.container1.addChild(_this24.girlHand = new src.AnimatedSprite('actors', 'girl_hand', 67));

        _this24.container1.addChild(_this24.boyHand = new src.AnimatedSprite('actors', 'boy_hand', 67));

        _this24.container2.addChild(_this24.girlDead = new src.AnimatedSprite('actors', 'girl_dead', 39));

        _this24.container2.addChild(_this24.boyDead = new src.AnimatedSprite('actors', 'boy_dead', 39));

        _this24.container2.addChild(_this24.batut_dead = new src.AnimatedSprite('explosion4', 'explosion4', 110, false));

        _this24.container2.addChild(_this24.explosionGirl = new src.AnimatedSprite('actors', 'explosion', 59, false));

        _this24.container2.addChild(_this24.explosionBoy = new src.AnimatedSprite('actors', 'explosion', 59, false));

        _this24.explosionGirl.anchor.set(0.5);

        _this24.explosionGirl.position.set(-7, 80);

        _this24.explosionBoy.scale.x = -1;

        _this24.explosionBoy.anchor.set(0.5);

        _this24.explosionBoy.position.set(85, 80);

        _this24.container3.addChild(_this24.batut_sad = new src.AnimatedSprite('actors', 'batut', 33, false, 24));

        _this24.container3.addChild(_this24.girl_sad = new src.AnimatedSprite('actors', 'girl_sad', 54));

        _this24.container3.addChild(_this24.boy_sad = new src.AnimatedSprite('actors', 'boy_sad', 34));

        _this24.girlDead.currentFrame = 15;
        _this24.container3.x = _this24.container2.x = _this24.container1.x = -_this24.batut.width / 2;
        _this24.container3.y = _this24.container2.y = _this24.container1.y = -_this24.girl.height * src.Constants.PLAYER_DY;
        _this24.girl.x = -_this24.batut.width * src.Constants.PLAYER_HERO1_DX;
        _this24.girl.y = _this24.girl.height * src.Constants.PLAYER_HERO_GIRL_DY;
        _this24.boy.x = _this24.batut.width * src.Constants.PLAYER_HERO2_DX;
        _this24.boy.y = _this24.boy.height * src.Constants.PLAYER_HERO_BOY_DY;

        _this24.boyHand.position.set(70, 70);

        _this24.girlHand.position.set(-12, 68);

        _this24.armor.position.set(-38, -120);

        _this24.armor.visible = false;
        _this24.girlDead.x = _this24.girl.x - _this24.girl.width / 2;
        _this24.boyDead.x = _this24.boy.x - _this24.boy.width / 2;
        _this24.girlDead.anchor.y = 0.29;
        _this24.boyDead.anchor.y = 0.31;
        _this24.batut_dead.x = -120;
        _this24.batut_dead.y = -155;
        _this24.girlDead.y = _this24.boyDead.y = _this24.girlDead.height * src.Constants.PLAYER_STARS_Y;
        _this24.boy_sad.y = _this24.girl_sad.y = 50;
        _this24.deltaBatut = 0;
        _this24.startBatutY = _this24.batut.y;
        _this24.batutToGirlHandDy = _this24.girlHand.y - _this24.batut.y;
        _this24.batutToBoyHandDy = _this24.boyHand.y - _this24.batut.y;
        return _this24;
      }

      _createClass(Player, [{
        key: "batuted",
        value: function batuted() {
          this.deltaBatut = 0;
          this.isBatutAnimSwap = false;

          if (!this.isBatuted) {
            this.batut.currentFrame = this.girl.currentFrame = this.girlHand.currentFrame = this.boyHand.currentFrame = this.boy.currentFrame = 30;
            this.boyHand.currentFrame = 25;
          }

          this.isBatuted = true;
          this.isIdle = false;
          this.isRight = false;
          this.isLeft = false;
        }
      }, {
        key: "init",
        value: function init() {
          this.loseTimer = src.Constants.PLAYER_LOSE_TIMER;
          this.waitAfterLoseTimer = src.Constants.PLAYER_WAIT_LOSE_TIMER;
          this.girl_sad.x = this.girl.x;
          this.boy_sad.x = this.boy.x;
          this.bSpeed = 0;
          this.isArmored = this.isDead = this.isExplosionFinished = this.isRight = this.isBatutAnimSwap = this.isBatuted = this.isHappy = this.isIdle = this.isLeft = false;
          this.armor.visible = false;
          this.batut_sad.y = this.batut.y;
          this.container2.visible = false;
          this.container1.visible = true;
          this.container3.visible = false;
        }
      }, {
        key: "idle",
        value: function idle() {
          if (!this.isBatuted) {
            if (!this.isIdle) {
              this.batut.currentFrame = this.girl.currentFrame = this.girlHand.currentFrame = this.boyHand.currentFrame = this.boy.currentFrame = 1;
            }

            this.isRight = this.isLeft = false;
            this.isIdle = true;
            this.isHappy = false;
          }
        }
      }, {
        key: "go_left",
        value: function go_left() {
          if (!this.isBatuted) {
            if (!this.isLeft) {
              this.batut.currentFrame = this.girl.currentFrame = this.girlHand.currentFrame = this.boyHand.currentFrame = this.boy.currentFrame = 20;
            }

            this.isLeft = true;
          }
        }
      }, {
        key: "go_right",
        value: function go_right() {
          if (!this.isBatuted) {
            if (!this.isRight) {
              this.batut.currentFrame = this.girl.currentFrame = this.girlHand.currentFrame = this.boyHand.currentFrame = this.boy.currentFrame = 15;
            }

            this.isRight = true;
          }
        }
      }, {
        key: "happy",
        value: function happy() {
          var _this25 = this;

          this.game.time.events.add(1250, function () {
            if (_this25.isHappy) {
              _this25.idle();
            }
          });
          this.isHappy = true;
          this.isIdle = false;
          this.boy.currentFrame = this.girlHand.currentFrame = this.boyHand.currentFrame = this.girl.currentFrame = 30;
          src.SoundController.instance.playSound('SoundTrampUp');
        }
      }, {
        key: "dieTime",
        value: function dieTime() {
          if (!this.isDead) {
            this.isDead = true;
            this.container1.visible = false;
            this.container3.visible = true;
            this.girl_sad.currentFrame = this.boy_sad.currentFrame = 1;
            this.game.time.events.add(3200, this.gameFinished, this);
          }
        }
      }, {
        key: "dieBomb",
        value: function dieBomb() {
          if (!this.isDead) {
            this.isDead = true;
            this.batut_dead.currentFrame = 1;
            this.batut_dead.alpha = 1;
            this.container1.visible = false;
            this.container2.visible = true;
            this.explosionGirl.visible = true;
            this.explosionBoy.visible = true;
            src.MedalManager.instance.addValue(src.MedalType.THE_WRONG_FRUIT, 1);
            this.game.time.events.add(2300, this.gameFinished, this);
            src.SoundController.instance.playSound('SoundBombExplosion1');
            src.SoundController.instance.playSound('SoundBombExplosion3');
          }
        }
      }, {
        key: "gameFinished",
        value: function gameFinished() {
          this.myGame.level.eventManager.onPlayerKilled.dispatch();
        }
      }, {
        key: "updateLogic",
        value: function updateLogic() {
          if (this.frameIndex++ % 2 == 0) {
            return;
          }

          if (this.armor.visible) {
            if (this.isArmored) {
              if (this.armor.currentFrame > 45) {
                this.armor.currentFrame = 25;
              }
            }

            this.armor.animate();

            if (!this.isArmored && this.armor.currentFrame == this.armor.numFrames) {
              this.armor.visible = false;
            }
          }

          if (this.container3.visible) {
            if (this.girl_sad.currentFrame > 27) {
              if (this.loseTimer-- < 0) {
                this.girl_sad.nextFrame();
                this.boy_sad.nextFrame();
                this.girl_sad.x -= this.girl_sad.width * src.Constants.PLAYER_LOSE_SPEED;
                this.boy_sad.x -= this.girl_sad.width * src.Constants.PLAYER_LOSE_SPEED;
              }

              if (this.waitAfterLoseTimer-- < 0) {}

              if (this.girl_sad.currentFrame > 54 || this.girl_sad.currentFrame <= 27) {
                this.girl_sad.currentFrame = 28;
              }

              if (this.boy_sad.currentFrame > 34 || this.boy_sad.currentFrame < 7) {
                this.boy_sad.currentFrame = 7;
              }
            } else {
              this.girl_sad.nextFrame();

              if (this.girl_sad.currentFrame >= 27) {
                this.boy_sad.nextFrame();
              } else {
                if (this.boy_sad.currentFrame < 6) {
                  this.boy_sad.nextFrame();
                }
              }
            }

            if (this.batut_sad.y < 15) {
              this.batut_sad.y += this.bSpeed;
              this.bSpeed += this.girl.height * src.Constants.BATUT_ASPEED;
            }
          }

          if (this.container2.visible) {
            this.girlDead.nextFrame();
            this.boyDead.nextFrame();
            this.batut_dead.nextFrame();
            this.explosionGirl.nextFrame();
            this.explosionBoy.nextFrame();
          }

          if (this.container1.visible) {
            this.girl.nextFrame();
            this.boy.nextFrame();
            this.girlHand.nextFrame();
            this.boyHand.nextFrame();

            if (this.isRight) {
              if (this.frameIndex % 8 == 0) {
                src.SoundController.instance.playSound('SoundRun' + (1 + Math.floor(Math.random() * 3)));
              }

              if (this.girlHand.currentFrame >= 19) {
                this.girlHand.currentFrame = this.girl.currentFrame = 15;
              }

              this.boy.currentFrame = this.boyHand.currentFrame = this.girl.currentFrame + 5;
            } else if (this.isLeft) {
              if (this.frameIndex % 8 == 0) {
                src.SoundController.instance.playSound('SoundRun' + (1 + Math.floor(Math.random() * 3)));
              }

              if (this.girlHand.currentFrame >= 24) {
                this.girlHand.currentFrame = this.girl.currentFrame = 20;
              }

              this.boy.currentFrame = this.boyHand.currentFrame = this.girl.currentFrame - 5;
            } else if (this.isHappy) {} else if (this.isIdle) {
              if (this.girlHand.currentFrame > 13) {
                this.isIdle = false;
                this.idle();
              }
            } else if (this.isBatuted) {
              if (this.girl.currentFrame > 30) {
                this.isBatutAnimSwap = true;

                if (this.isBatutAnimSwap) {
                  this.girl.prevFrame();
                  this.boy.prevFrame();
                  this.girlHand.prevFrame();
                  this.boyHand.prevFrame();

                  if (this.batut.currentFrame < 26) {
                    this.isBatuted = false;
                    this.idle();
                  }

                  this.deltaBatut -= this.batut.height * .01;
                }
              } else {}

              if (this.isBatutAnimSwap) {
                this.batut.prevFrame();
              } else {
                this.batut.currentFrame = this.girl.currentFrame >= 31 ? this.girl.currentFrame + 5 : this.girl.currentFrame;
              }

              this.batut.y = this.startBatutY + this.deltaBatut;
              this.boyHand.currentFrame = this.batut.currentFrame - 3 + 2;
              this.girlHand.currentFrame = this.batut.currentFrame + 2 + 2;
              return;
            }

            this.deltaBatut *= .6;
            this.batut.y = this.startBatutY + this.deltaBatut;
            this.batut.currentFrame = this.girl.currentFrame >= 31 ? this.girl.currentFrame + 5 : this.girl.currentFrame;
          }
        }
      }, {
        key: "IsArmored",
        set: function set(v) {
          this.isArmored = v;
          this.armor.visible = true;

          if (v) {
            this.armor.currentFrame = 0;
          } else {
            this.armor.currentFrame = 53;
          }
        },
        get: function get() {
          return this.isArmored;
        }
      }, {
        key: "IsDead",
        get: function get() {
          return this.isDead;
        }
      }, {
        key: "IsHappy",
        get: function get() {
          return this.isHappy;
        }
      }]);

      return Player;
    }(Phaser.Group);

    Player.PLAYER_DEAD = 'PLAYER_DEAD';
    loops.Player = Player;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lq;

  (function (lq) {
    var Variable =
    /*#__PURE__*/
    function () {
      function Variable(v) {
        _classCallCheck(this, Variable);

        this.Value = v;
      }

      _createClass(Variable, [{
        key: "encrypt",
        value: function encrypt(v) {
          var vs = v.toString();
          var summ = 0;
          var s = '';
          var i;

          for (i = 0; i < vs.length; i++) {
            if (vs.charAt(i) == '.') {
              s += 'S';
            } else {
              summ += parseInt(vs.charAt(i));
              s += Variable.table[parseInt(vs.charAt(i))];
            }
          }

          s += 'M';
          var summS = summ.toString();

          for (i = 0; i < summS.length; i++) {
            if (summS.charAt(i) == '.') {
              s += 'S';
            } else {
              s += Variable.table[parseInt(summS.charAt(i))];
            }
          }

          return s;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.valueString = null;
        }
      }, {
        key: "Value",
        get: function get() {
          return Variable.decrypt(this.valueString);
        },
        set: function set(v) {
          this.valueString = this.encrypt(v);
        }
      }], [{
        key: "decrypt",
        value: function decrypt(vs) {
          var vvs = vs;
          var old;
          var i = 0;

          while (true) {
            old = vvs;
            vvs = vvs.replace('S', '.');
            if (vvs == old) break;
          }

          var arr = vvs.split('M');

          if (arr.length == 2) {
            var value = arr[0];

            for (i = 0; i < Variable.table.length; i++) {
              old = value;
              value = value.replace(Variable.table[i], i.toString());
              if (old != value) i--;
            }

            var summ = arr[1];

            for (i = 0; i < Variable.table.length; i++) {
              old = summ;
              summ = summ.replace(Variable.table[i], i.toString());
              if (old != summ) i--;
            }

            var summInt = 0;

            for (i = 0; i < value.length; i++) {
              if (value.charAt(i) == '.') {} else {
                summInt += parseInt(value.charAt(i));
              }
            }

            if (summInt.toString() != summ) {
              return null;
            } else {
              return parseInt(value);
            }
          } else {
            return null;
          }
        }
      }, {
        key: "parse",
        value: function parse(vs) {
          var variable = new Variable(Variable.decrypt(vs));
          return variable;
        }
      }]);

      return Variable;
    }();

    Variable.table = ['a', 'b', 'G', 'gT', 'sO', 'Dp', 'l>', 'c', 'fn', 'pK'];
    lq.Variable = Variable;
  })(lq = src.lq || (src.lq = {}));
})(src || (src = {}));

var src;

(function (src) {
  var AnimatedEffect =
  /*#__PURE__*/
  function (_Phaser$Sprite3) {
    _inherits(AnimatedEffect, _Phaser$Sprite3);

    function AnimatedEffect(atlas, base, numFrames) {
      var _this26;

      var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      _classCallCheck(this, AnimatedEffect);

      _this26 = _possibleConstructorReturn(this, _getPrototypeOf(AnimatedEffect).call(this, src.App.instance, 0, 0, atlas));
      _this26.currentFrameIndex = 0;
      _this26.numFrames = numFrames;
      _this26.startFrame = 0;
      _this26.loop = loop;
      _this26.frameNames = Phaser.Animation.generateFrameNames(base, 0, numFrames, '', 4);
      _this26.anim = _this26.animations.add('anim', _this26.frameNames, 60, _this26.loop);

      _this26.anim.onComplete.add(_this26.animCompleted, _assertThisInitialized(_this26));

      return _this26;
    }

    _createClass(AnimatedEffect, [{
      key: "animCompleted",
      value: function animCompleted() {
        if (!this.loop && this.hideAfterCompleted) {
          this.visible = false;
        }
      }
    }, {
      key: "restart",
      value: function restart() {
        this.anim.restart();
      }
    }]);

    return AnimatedEffect;
  }(Phaser.Sprite);

  src.AnimatedEffect = AnimatedEffect;
})(src || (src = {}));

var src;

(function (src) {
  var AnimatedSprite =
  /*#__PURE__*/
  function (_Phaser$Sprite4) {
    _inherits(AnimatedSprite, _Phaser$Sprite4);

    function AnimatedSprite(atlas, base, numFrames) {
      var _this27;

      var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var startFrame = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var hideAfterCompleted = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      _classCallCheck(this, AnimatedSprite);

      _this27 = _possibleConstructorReturn(this, _getPrototypeOf(AnimatedSprite).call(this, src.App.instance, 0, 0, atlas, base + '0000'));
      _this27.currentFrameIndex = 0;
      _this27.numFrames = numFrames;
      _this27.startFrame = startFrame;
      _this27.loop = loop;
      _this27.hideAfterCompleted = hideAfterCompleted;
      _this27.frameNames = Phaser.Animation.generateFrameNames(base, 0, numFrames, '', 4);
      return _this27;
    }

    _createClass(AnimatedSprite, [{
      key: "nextFrame",
      value: function nextFrame() {
        if (this.currentFrame >= this.numFrames) {
          if (this.loop) {
            this.currentFrame = this.startFrame;
          } else {
            if (this.hideAfterCompleted) {
              this.visible = false;
            }
          }
        } else {
          this.currentFrame = this.currentFrame + 1;
        }
      }
    }, {
      key: "prevFrame",
      value: function prevFrame() {
        if (this.currentFrame == this.startFrame) {
          if (this.loop) {
            this.currentFrame = this.numFrames;
          }
        } else {
          this.currentFrame = this.currentFrame - 1;
        }
      }
    }, {
      key: "animate",
      value: function animate() {
        this.nextFrame();
      }
    }, {
      key: "currentFrame",
      set: function set(index) {
        this.currentFrameIndex = Phaser.Math.clamp(index, 0, this.numFrames);
        this.frameName = this.frameNames[this.currentFrameIndex];
      },
      get: function get() {
        return this.currentFrameIndex; //parseInt(this.frameName.slice(-4));
      }
    }]);

    return AnimatedSprite;
  }(Phaser.Sprite);

  src.AnimatedSprite = AnimatedSprite;
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Color =
    /*#__PURE__*/
    function () {
      function Color(hex) {
        _classCallCheck(this, Color);

        this.r = hex >> 16 & 0xFF;
        this.g = hex >> 8 & 0xFF;
        this.b = hex & 0xFF;
      }

      _createClass(Color, [{
        key: "randomize",
        value: function randomize(rr, rg, rb) {
          this.r = Math.min(255, Math.max(this.r + Math.random() * 255 * rr, 0));
          this.g = Math.min(255, Math.max(this.g + Math.random() * 255 * rg, 0));
          this.b = Math.min(255, Math.max(this.b + Math.random() * 255 * rb, 0));
        }
      }, {
        key: "HEX",
        get: function get() {
          return this.r << 16 | this.g << 8 | this.b;
        }
      }]);

      return Color;
    }();

    lqs.Color = Color;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Memory =
    /*#__PURE__*/
    function () {
      function Memory(gd) {
        var pd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Memory);

        if (gd) {
          this.gameData = JSON.parse(gd);
        }

        if (pd) {
          this.paramData = JSON.parse(pd);
        }
      }

      _createClass(Memory, [{
        key: "getParamData",
        value: function getParamData() {
          return this.paramData;
        }
      }, {
        key: "getGameData",
        value: function getGameData() {
          return this.gameData;
        }
      }, {
        key: "load",
        value: function load(slot) {
          var data = JSON.parse(localStorage.getItem(slot));

          if (data) {
            if (data.SETTINGS) {
              return data.SETTINGS;
            } else {
              return null;
            }
          }

          return null;
        }
      }, {
        key: "save",
        value: function save(slot, obj) {
          var h_complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var data = {
            SETTING: obj
          };
          localStorage.setItem(slot, JSON.stringify(data));
          if (h_complete) h_complete();
        }
      }]);

      return Memory;
    }();

    lqs.Memory = Memory;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var Parameter =
    /*#__PURE__*/
    function () {
      function Parameter(v, n) {
        var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        _classCallCheck(this, Parameter);

        this.value = v;
        this.name = n;
        this.minValue = min;
        this.maxValue = max;
      }

      _createClass(Parameter, [{
        key: "Name",
        get: function get() {
          return this.name;
        }
      }, {
        key: "Value",
        set: function set(v) {
          this.value = v;
        },
        get: function get() {
          return this.value;
        }
      }, {
        key: "Min",
        get: function get() {
          return this.minValue;
        }
      }, {
        key: "Max",
        get: function get() {
          return this.maxValue;
        }
      }, {
        key: "Data",
        set: function set(v) {
          this.name = v["n"];
          this.value = v["v"]; //   minValue = v.mi;
          //  maxValue = v.ma;
        },
        get: function get() {
          return {
            n: this.Name,
            v: this.value,
            mi: this.Min,
            ma: this.Max
          };
        }
      }]);

      return Parameter;
    }();

    lqs.Parameter = Parameter;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var lqs;

  (function (lqs) {
    var ProgressBar =
    /*#__PURE__*/
    function (_Phaser$Group10) {
      _inherits(ProgressBar, _Phaser$Group10);

      function ProgressBar(width, height) {
        var _this28;

        _classCallCheck(this, ProgressBar);

        _this28 = _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).call(this, src.App.instance));

        _this28.init(width, height);

        return _this28;
      }

      _createClass(ProgressBar, [{
        key: "init",
        value: function init(width, height) {
          var padding = height * 0.2;
          var cornerRadius = padding * 2; // create black rounded box for background

          this.mBackground = this.add(this.game.make.graphics(0, 0));
          this.mBackground.beginFill(0x0, 0.5);
          this.mBackground.drawRoundedRect(0, 0, width, height, cornerRadius);
          this.mBackground.endFill(); // create progress bar shape

          var barWidth = width - 2 * padding;
          var barHeight = height - 2 * padding;
          this.mBar = this.add(this.game.make.graphics(0, 0));
          this.mBar.beginFill(0xFF00FF);
          this.mBar.drawRect(0, 0, barWidth, barHeight);
          this.mBar.x = padding;
          this.mBar.y = padding;
          this.mBar.scale.x = 0.0;
          this.addChild(this.mBar);
        }
      }, {
        key: "ratio",
        get: function get() {
          return this.mBar.scale.x;
        },
        set: function set(value) {
          this.mBar.scale.x = Math.max(0.0, Math.min(1.0, value));
        }
      }]);

      return ProgressBar;
    }(Phaser.Group);

    lqs.ProgressBar = ProgressBar;
  })(lqs = src.lqs || (src.lqs = {}));
})(src || (src = {}));

var src;

(function (src) {
  var loops;

  (function (loops) {
    var Slider =
    /*#__PURE__*/
    function (_Phaser$Group11) {
      _inherits(Slider, _Phaser$Group11);

      function Slider(g, px, py) {
        var _this29;

        _classCallCheck(this, Slider);

        _this29 = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, src.App.instance, null));
        _this29.myGame = g;
        _this29.x = px;
        _this29.y = py;
        _this29.value = 0;

        _this29.addChild(_this29.container = _this29.game.make.group());

        _this29.container.addChild(_this29.indicator = _this29.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'slider_center0000'));

        _this29.container.addChild(_this29.indicator2 = _this29.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'slider_center20000'));

        _this29.container.addChild(_this29.maska = _this29.game.make.graphics(0, 0).beginFill(0x00000, 0.5).drawRect(0, 0, 28, 148).endFill());

        _this29.container.addChild(_this29.sliderTop = _this29.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'slider_bottle0000'));

        _this29.indicator2.mask = _this29.maska;
        _this29.indicator.mask = _this29.maska;
        _this29.maska.scale.x *= 2;
        _this29.maska.x -= _this29.maska.width * .3;
        _this29.indicator2.alpha = 0;
        _this29.sliderTop.x = -_this29.myGame.RW * .02;
        _this29.sliderTop.y = -_this29.myGame.RW * .02;
        return _this29;
      }

      _createClass(Slider, [{
        key: "active",
        value: function active() {
          this.indicator2.alpha = 1;
        }
      }, {
        key: "update",
        value: function update() {
          if (this.indicator2.alpha > 0.01) {
            this.indicator2.alpha += (0 - this.indicator2.alpha) * .2;
          }
        }
      }, {
        key: "Value",
        set: function set(v) {
          this.value = v;
          this.maska.y = this.indicator.height * (1 - this.value);
        },
        get: function get() {
          return this.value;
        }
      }]);

      return Slider;
    }(Phaser.Group);

    loops.Slider = Slider;
  })(loops = src.loops || (src.loops = {}));
})(src || (src = {}));

var src;

(function (src) {
  var ScoreManager =
  /*#__PURE__*/
  function () {
    function ScoreManager() {
      _classCallCheck(this, ScoreManager);

      this.maxScores = 0;
      this.currentScore = 0;
    }

    _createClass(ScoreManager, [{
      key: "getCurrentScores",
      value: function getCurrentScores() {
        return ~~this.currentScore;
      }
    }, {
      key: "setCurrentScores",
      value: function setCurrentScores(value) {
        this.currentScore = Math.floor(value);
      }
    }, {
      key: "updateMaxScores",
      value: function updateMaxScores(newScore) {
        if (this.getMaxScores() < newScore) {
          this.setMaxScores(newScore);
          src.LocalStorageController.instance.save();
          return true;
        } else {
          return false;
        }
      }
      /**
       * MAX SCORES
       */

    }, {
      key: "getMaxScores",
      value: function getMaxScores() {
        return this.maxScores;
      }
    }, {
      key: "setMaxScores",
      value: function setMaxScores(value) {
        this.maxScores = Math.max(this.maxScores, value);
      }
    }], [{
      key: "instance",
      get: function get() {
        return ScoreManager._instance ? ScoreManager._instance : ScoreManager._instance = new ScoreManager();
      }
    }]);

    return ScoreManager;
  }();

  ScoreManager._instance = null;
  src.ScoreManager = ScoreManager;
})(src || (src = {}));

var src;

(function (src) {
  var SoundController =
  /*#__PURE__*/
  function () {
    function SoundController() {
      _classCallCheck(this, SoundController);

      this.currentMusicVolume = src.Settings.MUSIC_ENABLED_BY_DEFAULT ? 1 : 0;
      this.currentSFXVolume = 0.5;
      this.hadBeenMutedBeforePauseTriggered = false;
      this.defaultMusicVolume = 1;
      this.defaultSFXVolume = 1;
      this.debouncedSoundsTimestamps = new Map();
      this.soundNames = ["MusicGamePlay", "MusicPanelResult", "SoundBackground", "SoundBackgroundSuperMode", "SoundBadges", "SoundBombAlert", "SoundBombExplosion1", "SoundBombExplosion2", "SoundBombExplosion3", "SoundBombStart", "SoundBonusSafe", "SoundBonusScore1", "SoundBonusScore2", "SoundBonusScore3", "SoundBonusTime", "SoundButton", "SoundComboX", "SoundFonChanging", "SoundGameOver", "SoundGetFruit1", "SoundGetFruit2", "SoundGetFruit3", "SoundIntro", "SoundJumpApple1", "SoundJumpApple2", "SoundJumpApple3", "SoundJumpBlackberry1", "SoundJumpBlackberry2", "SoundJumpBlackberry3", "SoundJumpPineapple1", "SoundJumpPineapple2", "SoundJumpPineapple3", "SoundJumpStrawberry1", "SoundJumpStrawberry2", "SoundJumpStrawberry3", "SoundJumpWatermelon1", "SoundJumpWatermelon2", "SoundJumpWatermelon3", "SoundMenuChanging", "SoundPanelDrop", "SoundPanelResultNewRecord", "SoundPanelResultScore", "SoundRun1", "SoundRun2", "SoundRun3", "SoundSplashApple", "SoundSplashBanana", "SoundSplashBerry", "SoundSplashPineapple", "SoundSplashWatermelon", "SoundStartBanana", "SoundStartSuperMode", "SoundTimeOut", "SoundTrampoline1", "SoundTrampoline2", "SoundTrampoline3", "SoundTrampUp"];
    }

    _createClass(SoundController, [{
      key: "isDecodingSupported",
      value: function isDecodingSupported() {
        return src.App.instance.sound.usingWebAudio;
      }
    }, {
      key: "getSoundNames",
      value: function getSoundNames() {
        return this.soundNames;
      }
      /**
       * MUSIC
       */

    }, {
      key: "init",
      value: function init() {
        this.countingSound = src.App.instance.add.sound('SoundTimeOut', 1, true);
        this.countingSound.volume = 0;
      }
    }, {
      key: "startMusic",
      value: function startMusic() {
        this.mainTheme = src.App.instance.sound.play('SoundBackground', this.currentMusicVolume, true);

        if (src.App.instance.sound.usingWebAudio && src.App.instance.sound.context.state === 'suspended') {
          src.App.instance.input.onTap.addOnce(function () {
            if (src.App.instance.sound.context.state === 'suspended') {
              src.App.instance.sound.context.resume();
            }
          });
        }
      }
      /**
       * PAUSE/RESUME SOUND
       */

    }, {
      key: "pauseAudio",
      value: function pauseAudio() {
        this.hadBeenMutedBeforePauseTriggered = src.App.instance.sound.mute;
        src.App.instance.sound.mute = true;
      }
    }, {
      key: "resumeAudio",
      value: function resumeAudio() {
        src.App.instance.sound.mute = this.hadBeenMutedBeforePauseTriggered;

        if (src.App.instance.sound.usingWebAudio && src.App.instance.sound.context.state === 'suspended') {
          src.App.instance.input.onTap.addOnce(function () {
            if (src.App.instance.sound.context.state === 'suspended') {
              src.App.instance.sound.context.resume();
            }
          });
        }
      }
    }, {
      key: "getMusicVolume",
      value: function getMusicVolume() {
        return this.currentMusicVolume;
      }
    }, {
      key: "setMusicVolume",
      value: function setMusicVolume(value) {
        this.currentMusicVolume = Phaser.Math.clamp(value, 0, 1);

        if (this.mainTheme && this.mainTheme.isPlaying) {
          this.mainTheme.volume = this.currentMusicVolume;
        }
      }
    }, {
      key: "getSFXVolume",
      value: function getSFXVolume() {
        return this.currentSFXVolume;
      }
    }, {
      key: "setSFXVolume",
      value: function setSFXVolume(value) {
        this.currentSFXVolume = Phaser.Math.clamp(value, 0, 1);
      }
    }, {
      key: "isMusicMuted",
      value: function isMusicMuted() {
        return this.currentMusicVolume == 0;
      }
    }, {
      key: "isSFXMuted",
      value: function isSFXMuted() {
        return this.currentSFXVolume == 0;
      }
      /**
       * SOUNDS
       */

    }, {
      key: "playClickSound",
      value: function playClickSound() {
        this.playSound('SoundButton');
      }
    }, {
      key: "playSound",
      value: function playSound(key) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        this.startSound(key, volume, loop);
      }
    }, {
      key: "playMusic",
      value: function playMusic(key) {
        var fade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var forced = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (this.mainTheme) {
          if (this.mainTheme.key != key || forced) {
            this.mainTheme.stop();
          } else {
            return;
          }
        }

        this.mainTheme = src.App.instance.sound.play(key, fade ? 0 : this.currentMusicVolume, true);

        if (fade) {
          this.mainTheme.fadeTo(0.35, this.currentMusicVolume);
        }
      }
    }, {
      key: "startSound",
      value: function startSound(key) {
        var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
        var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (src.App.instance.sound.usingWebAudio && src.App.instance.sound.context.state === 'suspended') {
          //skip this sound
          return null;
        } else {
          return src.App.instance.sound.play(key, volume * this.currentSFXVolume, loop);
        }
      }
      /**
       * COUNTING
       */

    }, {
      key: "startCountingSound",
      value: function startCountingSound() {
        this.countingSound.play();
        this.countingSound.volume = this.isSFXMuted() ? 0 : 0.5;
      }
    }, {
      key: "stopCountingSound",
      value: function stopCountingSound() {
        if (this.countingSound.isPlaying) {
          this.countingSound.stop();
        }

        this.countingSound.volume = 0;
      }
      /**
       * PRIVATE
       */

    }, {
      key: "debounceSound",
      value: function debounceSound(key, volume, interval) {
        var currentTime = new Date().getTime();
        var lastTimestamp = this.debouncedSoundsTimestamps.get(key) || 0;

        if (currentTime - lastTimestamp >= interval) {
          this.startSound(key, volume, false);
          this.debouncedSoundsTimestamps.set(key, currentTime);
        }
      }
      /**
       * MUSIC
       */

    }, {
      key: "chokeMusicVolume",
      value: function chokeMusicVolume() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;

        if (this.mainTheme) {
          this.mainTheme.volume = 0;
        }
      }
    }, {
      key: "restoreMusicVolume",
      value: function restoreMusicVolume() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 150;

        if (this.mainTheme) {
          this.mainTheme.volume = 1;
        }
      }
    }], [{
      key: "instance",
      get: function get() {
        return SoundController._instance ? SoundController._instance : SoundController._instance = new SoundController();
      }
    }]);

    return SoundController;
  }();

  SoundController._instance = null;
  src.SoundController = SoundController;
})(src || (src = {}));

var src;

(function (src) {
  var AutoResizeableState =
  /*#__PURE__*/
  function (_Phaser$State) {
    _inherits(AutoResizeableState, _Phaser$State);

    function AutoResizeableState() {
      _classCallCheck(this, AutoResizeableState);

      return _possibleConstructorReturn(this, _getPrototypeOf(AutoResizeableState).apply(this, arguments));
    }

    _createClass(AutoResizeableState, [{
      key: "init",
      value: function init() {
        var useMask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var containerWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : src.CustomScaleManager.ORIGINAL_WIDTH;
        var containerHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : src.CustomScaleManager.ORIGINAL_HEIGHT;

        _get(_getPrototypeOf(AutoResizeableState.prototype), "init", this).call(this);

        this.useMask = useMask;
        this.isInitialized = false;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.container = this.add.existing(this.game.make.group(null));

        if (this.useMask) {
          this.containerMask = this.container.add(this.game.make.graphics(0, 0).beginFill(0x00000).drawRect(0, 0, src.CustomScaleManager.ORIGINAL_WIDTH, src.CustomScaleManager.ORIGINAL_HEIGHT).endFill());
          this.container.mask = this.containerMask;
        }

        this.originalBounds = new WindowBounds();
        this.originalBounds.set(0, src.CustomScaleManager.ORIGINAL_WIDTH, 0, src.CustomScaleManager.ORIGINAL_HEIGHT);
        this.resize();
      }
    }, {
      key: "create",
      value: function create() {
        this.isInitialized = true;
      }
    }, {
      key: "addChild",
      value: function addChild(child) {
        return this.container.add(child);
      }
    }, {
      key: "getInputPosition",
      value: function getInputPosition() {
        return new Phaser.Point((this.game.input.activePointer.x - this.container.x) / src.CustomScaleManager.SCALE_X, (this.game.input.activePointer.y - this.container.y) / src.CustomScaleManager.SCALE_Y);
      }
    }, {
      key: "translateInputPosition",
      value: function translateInputPosition(pointer) {
        return new Phaser.Point((pointer.x - this.container.x) / src.CustomScaleManager.SCALE_X, (pointer.y - this.container.y) / src.CustomScaleManager.SCALE_Y);
      }
    }, {
      key: "resize",
      value: function resize() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        this.container.scale.set(src.CustomScaleManager.SCALE_X, src.CustomScaleManager.SCALE_Y);
        this.container.position.set(src.CustomScaleManager.WIDTH / 2 - this.containerWidth * src.CustomScaleManager.SCALE_X / 2, src.CustomScaleManager.HEIGHT / 2 - this.containerHeight * src.CustomScaleManager.SCALE_Y / 2);
        this.windowBounds = this.windowBounds || new WindowBounds();
        this.windowBounds.set(-(src.CustomScaleManager.WIDTH / src.CustomScaleManager.SCALE_X - this.containerWidth) / 2, (src.CustomScaleManager.WIDTH / src.CustomScaleManager.SCALE_X - this.containerWidth) / 2 + this.containerWidth, -(src.CustomScaleManager.HEIGHT / src.CustomScaleManager.SCALE_Y - this.containerHeight) / 2, (src.CustomScaleManager.HEIGHT / src.CustomScaleManager.SCALE_Y - this.containerHeight) / 2 + this.containerHeight);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.container.destroy();
        this.container = null;
      }
    }]);

    return AutoResizeableState;
  }(Phaser.State);

  src.AutoResizeableState = AutoResizeableState;

  var WindowBounds =
  /*#__PURE__*/
  function () {
    function WindowBounds() {
      _classCallCheck(this, WindowBounds);

      this.set(0, 0, 0, 0);
    }

    _createClass(WindowBounds, [{
      key: "set",
      value: function set(left, right, top, down) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.down = down;
        this.x = left;
        this.y = top;
        this.width = right - left;
        this.height = down - top;
        this.centerX = (right + left) / 2;
        this.centerY = (down + top) / 2;
      }
    }, {
      key: "getRelative",
      value: function getRelative(rx, ry) {
        var dx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var dy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        return new Phaser.Point(this.left + rx * this.width + dx, this.top + ry * this.height + dy);
      }
    }]);

    return WindowBounds;
  }();

  src.WindowBounds = WindowBounds;
})(src || (src = {}));

var src;

(function (src) {
  var Boot =
  /*#__PURE__*/
  function (_Phaser$State2) {
    _inherits(Boot, _Phaser$State2);

    function Boot() {
      _classCallCheck(this, Boot);

      return _possibleConstructorReturn(this, _getPrototypeOf(Boot).apply(this, arguments));
    }

    _createClass(Boot, [{
      key: "init",
      value: function init() {
        this.game.scale.scaleMode = src.CustomScaleManager.getScaleMode();
        this.game.scale.fullScreenScaleMode = src.CustomScaleManager.getScaleMode();
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        if (this.game.device.android) {
          this.game.input.mouse.enabled = !this.game.device.mspointer;
        }

        if (src.Settings.IS_MOBILE) {
          this.game.scale.setResizeCallback(this.resizeCallback, this);
          this.game.scale.onSizeChange.add(this.sizeChanged, this);
        }

        if (src.Settings.DISPLAY_FPS) {
          this.game.plugins.add(Phaser.Plugin["AdvancedTiming"], {
            mode: "domText"
          });
        }
      }
    }, {
      key: "preload",
      value: function preload() {
        this.game.load.atlasJSONArray(src.Settings.PRELOADER_ATLAS, 'img/' + src.Settings.PRELOADER_ATLAS + '.png', 'img/' + src.Settings.PRELOADER_ATLAS + '.json');
        this.game.load.image('foreground', 'img/assets/foreground.png');
        this.game.load.image('transitionLeaf', 'img/assets/transitionLeaf.png');
        this.game.load.json('l10n', 'lang/texts.json');
      }
    }, {
      key: "create",
      value: function create() {
        this.input.maxPointers = 1;

        if (this.game.device.desktop) {
          this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
          };
        }

        src.LocalizationManager.init(this.game.cache.getJSON('l10n'));
        this.game.state.start('Preloader', true, false);
      }
    }, {
      key: "resizeCallback",
      value: function resizeCallback(scaleManager, parentBounds) {
        if (src.CustomScaleManager.getScaleMode() == Phaser.ScaleManager.USER_SCALE) {
          if (this.game.width != window.innerWidth * src.CustomScaleManager.getPixelRatio() || this.game.height != window.innerHeight * src.CustomScaleManager.getPixelRatio()) {
            scaleManager.setGameSize(window.innerWidth * src.CustomScaleManager.getPixelRatio(), window.innerHeight * src.CustomScaleManager.getPixelRatio());
            scaleManager.setUserScale(1 / src.CustomScaleManager.getPixelRatio(), 1 / src.CustomScaleManager.getPixelRatio());
          }
        }
      }
    }, {
      key: "sizeChanged",
      value: function sizeChanged(scaleManager, w, h) {
        var windowDimensions = this.game.device.android && window["visualViewport"] && window["visualViewport"].width && window["visualViewport"].height ? new Phaser.Rectangle(0, 0, Math.min(w, window["visualViewport"].width), Math.min(h, window["visualViewport"].height)) : new Phaser.Rectangle(0, 0, window.innerWidth, window.innerHeight);
        src.CustomScaleManager.update(windowDimensions.width * src.CustomScaleManager.getPixelRatio(), windowDimensions.height * src.CustomScaleManager.getPixelRatio());
      }
    }]);

    return Boot;
  }(Phaser.State);

  src.Boot = Boot;
})(src || (src = {})); ///<reference path="AutoResizeableState.ts"/>


var src;

(function (src) {
  var Level =
  /*#__PURE__*/
  function (_src$AutoResizeableSt) {
    _inherits(Level, _src$AutoResizeableSt);

    function Level() {
      _classCallCheck(this, Level);

      return _possibleConstructorReturn(this, _getPrototypeOf(Level).apply(this, arguments));
    }

    _createClass(Level, [{
      key: "init",
      value: function init() {
        _get(_getPrototypeOf(Level.prototype), "init", this).call(this, true);
      }
    }, {
      key: "create",
      value: function create() {
        _get(_getPrototypeOf(Level.prototype), "create", this).call(this);
        /* reset medals */


        src.MedalManager.instance.resetMedal(src.MedalType.FRUTARIAN);
        src.MedalManager.instance.resetMedal(src.MedalType.MOAR_JUICE);
        src.MedalManager.instance.resetMedal(src.MedalType.HIPPIE_KI_YAY);
        this.eventManager = this.addChild(new src.EventManager(this));
        this.gameStateManager = this.addChild(new src.GameStateManager(this));
        this.gameStateManager.startLevel();
        this.gameContainer = this.addChild(this.game.make.group());
        this.gameplayManager = this.gameContainer.add(new src.GameplayManager(this));
        this.uiManager = this.gameContainer.add(new src.UIManager(this));
        this.resize(this.game.width, this.game.height);
      }
    }, {
      key: "resize",
      value: function resize() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _get(_getPrototypeOf(Level.prototype), "resize", this).call(this, width, height);

        if (this.isInitialized) {
          this.gameContainer.position.set(80, 0);
        }
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.eventManager.destroy();
        this.eventManager = null;
        this.gameStateManager.destroy();
        this.gameStateManager = null;
        this.gameplayManager.destroy();
        this.gameplayManager = null;
        this.uiManager.destroy();
        this.uiManager = null;

        _get(_getPrototypeOf(Level.prototype), "shutdown", this).call(this);
      }
    }]);

    return Level;
  }(src.AutoResizeableState);

  Level.SHOW_HELP = true;
  src.Level = Level;
})(src || (src = {}));

var src;

(function (src) {
  var MainMenu =
  /*#__PURE__*/
  function (_src$AutoResizeableSt2) {
    _inherits(MainMenu, _src$AutoResizeableSt2);

    function MainMenu() {
      _classCallCheck(this, MainMenu);

      return _possibleConstructorReturn(this, _getPrototypeOf(MainMenu).apply(this, arguments));
    }

    _createClass(MainMenu, [{
      key: "create",
      value: function create() {
        _get(_getPrototypeOf(MainMenu.prototype), "create", this).call(this);

        this.buildContent();
        src.SoundController.instance.playMusic('SoundBackground');
        src.SoundButtonsController.instance.setPosition(335, 30);
        this.resize(this.game.width, this.game.height);
      }
    }, {
      key: "resize",
      value: function resize(w, h) {
        _get(_getPrototypeOf(MainMenu.prototype), "resize", this).call(this, w, h);

        if (this.isInitialized) {}
      }
      /**
       * BUILDERS
       */

    }, {
      key: "buildContent",
      value: function buildContent() {
        this.menuBackground = this.addChild(new src.MainMenuBackground());
        this.menuBackground.position.set(this.windowBounds.centerX, this.windowBounds.centerY);
        this.menuLogo = this.addChild(new src.MainMenuLogo());
        this.menuLogo.position.set(this.windowBounds.centerX, this.windowBounds.centerY - 34);
        this.buttonPlay = this.addChild(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPlay', this.originalBounds.centerX, 386, this.playClicked, this, 1, 2));
        this.buttonCredits = this.addChild(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonCredits', this.originalBounds.centerX - 100, 386, this.creditsClicked, this, 1, 2));
        this.buttonBadges = this.addChild(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonBadges', this.originalBounds.centerX + 100, 386, this.badgesClicked, this, 1, 2));
        this.buttonBadgesNew = this.addChild(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonBadgesNew', this.originalBounds.centerX + 100, 386, this.badgesClicked, this, 1, 2));
        this.buttonBadgesNew.visible = src.WindowManager.instance.badges.badgesContainer.hasNewBadges();
        this.buttonBadges.visible = !this.buttonBadgesNew.visible;
        this.buttonPlay.angle = -3;
        this.game.add.tween(this.buttonPlay).to({
          angle: 3
        }, 90, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
      }
      /**
       * HANDLERS
       */

    }, {
      key: "playClicked",
      value: function playClicked() {
        src.TransitionScreen.instance.changeState("Level");
      }
    }, {
      key: "moreClicked",
      value: function moreClicked() {
        src.App.instance.navigateToSponsor();
      }
    }, {
      key: "creditsClicked",
      value: function creditsClicked() {
        src.WindowManager.instance.showCredits();
      }
    }, {
      key: "badgesClicked",
      value: function badgesClicked() {
        src.WindowManager.instance.showBadges();
      }
    }]);

    return MainMenu;
  }(src.AutoResizeableState);

  src.MainMenu = MainMenu;
})(src || (src = {}));

var src;

(function (src) {
  var Preloader =
  /*#__PURE__*/
  function (_src$AutoResizeableSt3) {
    _inherits(Preloader, _src$AutoResizeableSt3);

    function Preloader() {
      _classCallCheck(this, Preloader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Preloader).apply(this, arguments));
    }

    _createClass(Preloader, [{
      key: "preload",
      value: function preload() {
        _get(_getPrototypeOf(Preloader.prototype), "preload", this).call(this, this.game);

        this.buildChildren();
        this.preloadContent();
        this.resize(this.game.width, this.game.height);
      }
    }, {
      key: "buildChildren",
      value: function buildChildren() {
        var _this30 = this;

        this.preloadContainer = this.addChild(this.game.make.group());
        this.preloadBackground = this.preloadContainer.add(this.game.make.sprite(0, 0, src.Settings.PRELOADER_ATLAS, 'preloaderBackground0000'));
        this.preloadBackground.anchor.setTo(0.5);
        this.preloadProgress = this.preloadContainer.add(this.game.make.sprite(-50, 41, src.Settings.PRELOADER_ATLAS, 'preloaderProgress0000'));
        this.preloadProgress.anchor.setTo(0, 0.5);
        this.versionText = this.addChild(src.TextUtils.getText(src.Settings.GAME_VERSION, 0, 0, 12, "#ffffff"));
        this.preloadText = this.preloadContainer.add(src.TextUtils.getText("Loading 0%", 0, 16, 30, "#5C8568"));
        this.game.time.events.add(300, function () {
          _this30.infoText = _this30.preloadContainer.add(src.TextUtils.getText(src.LocalizationManager.getText('txt_preloader_info'), 0, 196, 22, "#5C8568"));
        });
        this.logo = this.preloadContainer.add(this.game.make.sprite(0, -100, src.Settings.PRELOADER_ATLAS, 'logo0000'));
        this.logo.anchor.set(0.5);
        this.game.load.onFileComplete.add(this.onFileComplete, this);
        this.game.load.onLoadComplete.add(this.onLoadingComplete, this);
        src.TransitionScreen.instance.init();
        this.isInitialized = true;
      }
    }, {
      key: "preloadContent",
      value: function preloadContent() {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = src.SoundController.instance.getSoundNames()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var soundName = _step5.value;
            this.game.load.audio(soundName, ['sound/mp3/' + soundName + '.mp3', 'sound/m4a/' + soundName + '.m4a', 'sound/ogg/' + soundName + '.ogg']);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        this.game.load.atlasJSONArray(src.Settings.GAME_ATLAS, 'img/' + src.Settings.GAME_ATLAS + '.png', 'img/' + src.Settings.GAME_ATLAS + '.json');
        this.game.load.atlasJSONArray('confetti', 'img/confetti.png', 'img/confetti.json');
        this.loadImage('bg1');
        this.loadImage('bg1_super');
        this.loadImage('bg2');
        this.loadImage('bg2_super');
        this.loadImage('bg3');
        this.loadImage('bg3_super');
        this.loadAtlasXML('effects');
        this.loadAtlasXML('explosion4');
        this.loadAtlasXML('fruits_splash');
        this.loadAtlasXML('pineapple_splash');
        this.loadAtlasXML('watermelon_splash');
        this.loadAtlasXML('score_effect');
        this.loadAtlasXML('words');
        this.loadAtlasJSON('actors');
      }
    }, {
      key: "loadAtlasXML",
      value: function loadAtlasXML(key) {
        this.game.load.atlasXML(key, 'img/spritesheets/' + key + '.png', 'img/spritesheets/' + key + '.xml');
      }
    }, {
      key: "loadAtlasJSON",
      value: function loadAtlasJSON(key) {
        this.game.load.atlasJSONArray(key, 'img/spritesheets/' + key + '.png', 'img/spritesheets/' + key + '.json');
      }
    }, {
      key: "loadImage",
      value: function loadImage(key) {
        this.game.load.image(key, 'img/spritesheets/' + key + '.png');
      }
    }, {
      key: "create",
      value: function create() {
        _get(_getPrototypeOf(Preloader.prototype), "create", this).call(this);
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        _get(_getPrototypeOf(Preloader.prototype), "resize", this).call(this, width, height);

        if (this.isInitialized) {
          this.preloadContainer.position.set(this.windowBounds.centerX, this.windowBounds.centerY);
          this.versionText.position.set(this.windowBounds.right + 25, this.windowBounds.down + 16);
        }
      }
    }, {
      key: "onFileComplete",
      value: function onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        var progressKey = Phaser.Math.clamp(Math.round(progress * 50 / 100), 0, 49);
        this.preloadProgress.frameName = Phaser.Animation.generateFrameNames('preloaderProgress', progressKey, progressKey, '', 4)[0];
        this.preloadText.setText(src.LocalizationManager.getText('txt_preloader_loading') + " " + progress + "%");

        if (this.infoText) {
          this.infoText.setText(src.LocalizationManager.getText('txt_preloader_info') + '.');
        }
      }
    }, {
      key: "onLoadingComplete",
      value: function onLoadingComplete() {
        src.SoundController.instance.init();
        src.LocalStorageController.instance.loadSave();
        src.WindowManager.instance.init();
        this.preloadText.setText(src.LocalizationManager.getText('txt_preloader_decoding_sounds'));
        this.preloadProgress.alpha = 0;

        if (src.SoundController.instance.isDecodingSupported()) {
          this.game.sound.setDecodedCallback(src.SoundController.instance.getSoundNames(), this.onSoundsDecoded, this);
        } else {
          this.onSoundsDecoded();
        }
      }
    }, {
      key: "onSoundsDecoded",
      value: function onSoundsDecoded() {
        // SoundController.instance.startMusic();
        src.TransitionScreen.instance.changeState("MainMenu", function () {
          return src.SoundButtonsController.instance.start();
        });
      }
    }]);

    return Preloader;
  }(src.AutoResizeableState);

  src.Preloader = Preloader;
})(src || (src = {}));

var src;

(function (src) {
  var TransitionScreen =
  /*#__PURE__*/
  function (_Phaser$Group12) {
    _inherits(TransitionScreen, _Phaser$Group12);

    function TransitionScreen() {
      var _this31;

      _classCallCheck(this, TransitionScreen);

      _this31 = _possibleConstructorReturn(this, _getPrototypeOf(TransitionScreen).call(this, src.App.instance, null));
      _this31.isTransitionActive = false;
      _this31.isInitialized = false;

      _this31.game.stage.addChild(_assertThisInitialized(_this31));

      return _this31;
    }

    _createClass(TransitionScreen, [{
      key: "buildChildren",
      value: function buildChildren() {
        this.transitionContainer = this.add(this.game.make.group());
        this.background = this.transitionContainer.add(this.game.make.sprite(0, 0, src.Settings.PRELOADER_ATLAS, 'blackSquare0000'));
        this.background.anchor.set(0);
        this.background.alpha = 0.01;
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(function () {
          return console.log('Transition Screen: input locked');
        });
        this.leafsMask = this.add(this.game.make.graphics(0, 0).beginFill(0x00000).drawRect(0, 0, src.CustomScaleManager.ORIGINAL_WIDTH, src.CustomScaleManager.ORIGINAL_HEIGHT).endFill());
        this.leafs = [this.transitionContainer.add(this.game.make.image(0, 0, 'transitionLeaf')), this.transitionContainer.add(this.game.make.image(0, 0, 'transitionLeaf')), this.transitionContainer.add(this.game.make.image(0, 0, 'transitionLeaf'))];
        this.transitionContainer.mask = this.leafsMask;
        this.leafs.forEach(function (leaf) {
          return leaf.anchor.set(0.5, 0);
        });
        this.leafs[0].scale.set(-1.09, 1.09);
        this.leafs[1].scale.set(1.09);
        this.leafs[2].scale.set(1.09);
        this.transitionContainer.visible = false;
      }
    }, {
      key: "buildForeground",
      value: function buildForeground() {
        this.foreground = this.add(this.game.make.image(0, 0, 'foreground'));
      }
    }, {
      key: "init",
      value: function init() {
        this.isInitialized = true;
        this.buildChildren();
        this.buildForeground();
        this.resize();
      }
    }, {
      key: "getToTop",
      value: function getToTop() {
        src.App.instance.stage.setChildIndex(this, src.App.instance.stage.children.length - 1);
      }
    }, {
      key: "resize",
      value: function resize() {
        if (this.isInitialized) {
          this.scale.set(src.CustomScaleManager.SCALE_X, src.CustomScaleManager.SCALE_Y);
          this.position.set(src.CustomScaleManager.WIDTH / 2 - src.CustomScaleManager.ORIGINAL_WIDTH * src.CustomScaleManager.SCALE_X / 2, src.CustomScaleManager.HEIGHT / 2 - src.CustomScaleManager.ORIGINAL_HEIGHT * src.CustomScaleManager.SCALE_Y / 2);
          this.windowBounds = this.windowBounds || new src.WindowBounds();
          this.windowBounds.set(-(src.CustomScaleManager.WIDTH / src.CustomScaleManager.SCALE_X - src.CustomScaleManager.ORIGINAL_WIDTH) / 2, (src.CustomScaleManager.WIDTH / src.CustomScaleManager.SCALE_X - src.CustomScaleManager.ORIGINAL_WIDTH) / 2 + src.CustomScaleManager.ORIGINAL_WIDTH, -(src.CustomScaleManager.HEIGHT / src.CustomScaleManager.SCALE_Y - src.CustomScaleManager.ORIGINAL_HEIGHT) / 2, (src.CustomScaleManager.HEIGHT / src.CustomScaleManager.SCALE_Y - src.CustomScaleManager.ORIGINAL_HEIGHT) / 2 + src.CustomScaleManager.ORIGINAL_HEIGHT);
          this.background.position.set(-50, -50);
          this.background.width = this.game.width + 100;
          this.background.height = this.game.height + 100;
          this.foreground.position.set(0, 0);
          this.transitionContainer.position.set(0, 0);
        }
      }
    }, {
      key: "changeState",
      value: function changeState(newState) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        this.targetStateName = newState;
        this.callback = callback;
        this.show();
      }
    }, {
      key: "show",
      value: function show() {
        if (this.isTransitionActive) {
          console.log("TransitionScreen.show() : unable to start, transition is already active");
          return;
        }

        this.isTransitionActive = true;
        this.transitionContainer.visible = true;
        src.SoundController.instance.playSound('SoundMenuChanging');
        this.resize();
        this.leafs[0].position.set(578 + 80, 691);
        this.leafs[0].angle = 170;
        this.game.add.tween(this.leafs[0]).to({
          x: 406 + 80,
          y: 746,
          angle: 157.3
        }, 400, Phaser.Easing.Sinusoidal.Out, true, 90);
        this.leafs[1].position.set(-218 + 80, -258);
        this.leafs[1].angle = -1;
        this.game.add.tween(this.leafs[1]).to({
          x: -122 + 80,
          y: -256,
          angle: -12
        }, 400, Phaser.Easing.Sinusoidal.Out, true, 35);
        this.leafs[2].position.set(-47 + 80, -375);
        this.leafs[2].angle = -64;
        this.game.add.tween(this.leafs[2]).to({
          x: -87 + 80,
          y: -275,
          angle: -38
        }, 400, Phaser.Easing.Sinusoidal.Out, true, 0);
        this.game.add.tween(this.background).to({
          alpha: 0.5
        }, 400 + 90, Phaser.Easing.Sinusoidal.Out, true).onComplete.add(this.close, this);
      }
    }, {
      key: "close",
      value: function close() {
        if (this.targetStateName) {
          this.game.state.start(this.targetStateName, true, false);
          src.WindowManager.instance.hideAll();
        }

        if (this.callback) {
          this.callback();
          this.callback = null;
        }

        this.proceedClosing();
      }
    }, {
      key: "proceedClosing",
      value: function proceedClosing() {
        var _this32 = this;

        setTimeout(function () {
          _this32.leafs[0].position.set(406 + 80, 746);

          _this32.leafs[0].angle = 157.3;

          _this32.game.add.tween(_this32.leafs[0]).to({
            x: 578 + 80,
            y: 691,
            angle: 170
          }, 350, Phaser.Easing.Sinusoidal.In, true, 70);

          _this32.leafs[1].position.set(-122 + 80, -256);

          _this32.leafs[1].angle = -12;

          _this32.game.add.tween(_this32.leafs[1]).to({
            x: -218 + 80,
            y: -258,
            angle: -1
          }, 350, Phaser.Easing.Sinusoidal.In, true, 35);

          _this32.leafs[2].position.set(-87 + 80, -275);

          _this32.leafs[2].angle = -38;

          _this32.game.add.tween(_this32.leafs[2]).to({
            x: -47 + 80,
            y: -375,
            angle: -64
          }, 350, Phaser.Easing.Sinusoidal.In, true, 0);

          _this32.game.add.tween(_this32.background).to({
            alpha: 0
          }, 350 + 70, Phaser.Easing.Sinusoidal.In, true).onComplete.add(_this32.onTransitionFinished, _this32);

          setTimeout(function () {
            return _this32.onTransitionFinished();
          }, 500);
        }, 180);
      }
    }, {
      key: "onTransitionFinished",
      value: function onTransitionFinished() {
        this.isTransitionActive = false;
        this.hide();
      }
    }, {
      key: "hide",
      value: function hide() {
        this.transitionContainer.visible = false;
      }
    }], [{
      key: "instance",
      get: function get() {
        return TransitionScreen._instance ? TransitionScreen._instance : TransitionScreen._instance = new TransitionScreen();
      }
    }]);

    return TransitionScreen;
  }(Phaser.Group);

  TransitionScreen._instance = null;
  src.TransitionScreen = TransitionScreen;
})(src || (src = {}));

var src;

(function (src) {
  var MainMenuBackground =
  /*#__PURE__*/
  function (_Phaser$Group13) {
    _inherits(MainMenuBackground, _Phaser$Group13);

    function MainMenuBackground() {
      var _this33;

      _classCallCheck(this, MainMenuBackground);

      _this33 = _possibleConstructorReturn(this, _getPrototypeOf(MainMenuBackground).call(this, src.App.instance, null));
      _this33.background = _this33.add(_this33.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'menuBackground0000'));

      _this33.background.anchor.set(0.5);

      _this33.bottomSprite = _this33.add(_this33.game.make.sprite(0, 32, src.Settings.GAME_ATLAS, 'menuBottom0000'));

      _this33.bottomSprite.anchor.set(0.5, 0);

      _this33.game.add.tween(_this33.bottomSprite).to({
        x: 1,
        y: 32
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: -1,
        y: 31
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: -1,
        y: 32
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 0,
        y: 32
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 1,
        y: 31
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 0,
        y: 31
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 1,
        y: 32
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 0,
        y: 32
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).start().repeatAll(-1);

      return _this33;
    }

    return MainMenuBackground;
  }(Phaser.Group);

  src.MainMenuBackground = MainMenuBackground;
})(src || (src = {}));

var src;

(function (src) {
  var MainMenuLogo =
  /*#__PURE__*/
  function (_Phaser$Group14) {
    _inherits(MainMenuLogo, _Phaser$Group14);

    function MainMenuLogo() {
      var _this34;

      _classCallCheck(this, MainMenuLogo);

      _this34 = _possibleConstructorReturn(this, _getPrototypeOf(MainMenuLogo).call(this, src.App.instance, null));
      _this34.girl = _this34.add(_this34.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'menuGirl0000'));

      _this34.girl.anchor.set(23 / _this34.girl.width, 161 / _this34.girl.height);

      _this34.boy = _this34.add(_this34.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'menuBoy0000'));

      _this34.boy.anchor.set(102 / _this34.boy.width, 159 / _this34.boy.height);

      _this34.logo = _this34.add(_this34.game.make.sprite(0, 6, src.Settings.GAME_ATLAS, 'mainMenuLogo0000'));

      _this34.logo.anchor.set(0.5);

      _this34.boyHands = _this34.add(_this34.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'menuBoyHands0000'));

      _this34.boyHands.anchor.set(90 / _this34.boyHands.width, 78 / _this34.boyHands.height);
      /* appearing tweens */


      _this34.game.add.tween(_this34.logo).from({
        alpha: 0
      }, 120, Phaser.Easing.Linear.None, true).start();

      _this34.logo.scale.set(0.07, 1.02);

      _this34.game.add.tween(_this34.logo.scale).to({
        x: 1.4,
        y: 0.6
      }, 230, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 0.7,
        y: 1.3
      }, 230, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 1.1,
        y: 0.9
      }, 300, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 0.96,
        y: 1.04
      }, 330, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 1,
        y: 1
      }, 360, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 0.97,
        y: 1.03
      }, 400, Phaser.Easing.Sinusoidal.InOut, false).to({
        x: 1,
        y: 1
      }, 400, Phaser.Easing.Linear.None, false, 0, -1, true).start();

      _this34.girl.position.set(-20, 10);

      _this34.game.add.tween(_this34.girl).to({
        x: 0,
        y: 18
      }, 7 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 14 / 30 * 1000).to({
        x: 0,
        y: 1
      }, 9 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).start();

      _this34.girl.scale.set(0.9, 0.38);

      _this34.game.add.tween(_this34.girl.scale).to({
        x: 0.8,
        y: 1.2
      }, 7 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 14 / 30 * 1000).to({
        x: 1.1,
        y: 0.9
      }, 9 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 0.96,
        y: 1.04
      }, 10 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 1,
        y: 1
      }, 11 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 0.98,
        y: 1.02
      }, 12 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true).start();

      _this34.boy.position.set(13, 37);

      _this34.game.add.tween(_this34.boy).to({
        x: 0,
        y: -7
      }, 7 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 14 / 30 * 1000).to({
        x: 0,
        y: 1
      }, 9 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).start();

      _this34.boy.scale.set(0.9, 0.38);

      _this34.game.add.tween(_this34.boy.scale).to({
        x: 0.7,
        y: 1.3
      }, 7 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 10 / 30 * 1000).to({
        x: 1.1,
        y: 0.9
      }, 9 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 0.96,
        y: 1.04
      }, 10 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 1,
        y: 1
      }, 11 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 0.98,
        y: 1.02
      }, 12 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true).start();

      _this34.boyHands.scale.set(0.9, 0.68);

      _this34.game.add.tween(_this34.boyHands.scale).to({
        x: 0.7,
        y: 1.3
      }, 7 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 12 / 30 * 1000).to({
        x: 1.1,
        y: 0.9
      }, 9 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 0.96,
        y: 1.04
      }, 10 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 1,
        y: 1
      }, 11 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0).to({
        x: 0.98,
        y: 1.02
      }, 12 / 30 * 1000, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true).start();

      return _this34;
    }

    return MainMenuLogo;
  }(Phaser.Group);

  src.MainMenuLogo = MainMenuLogo;
})(src || (src = {}));

var src;

(function (src) {
  var BadgePanel =
  /*#__PURE__*/
  function (_Phaser$Group15) {
    _inherits(BadgePanel, _Phaser$Group15);

    function BadgePanel(key, x, y) {
      var _this35;

      _classCallCheck(this, BadgePanel);

      _this35 = _possibleConstructorReturn(this, _getPrototypeOf(BadgePanel).call(this, src.App.instance));
      _this35.recentlyUnlocked = false;
      _this35.barHeight = 55;
      _this35.key = key;

      _this35.position.set(x, y);

      var medal = src.MedalManager.instance.getMedal(_this35.key);
      _this35.panel = _this35.add(_this35.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'badgePanel0000'));
      _this35.icon = _this35.add(_this35.game.make.sprite(45, 46, src.Settings.GAME_ATLAS, 'badge' + medal.key + '0000'));

      _this35.icon.scale.set(0.75);

      _this35.icon.anchor.set(0.5);

      _this35.icon.angle = -5;
      _this35.labelNew = _this35.add(_this35.game.make.sprite(22, 22, src.Settings.GAME_ATLAS, 'badgeLabelNew0000'));

      _this35.labelNew.anchor.set(0.5);

      _this35.progressBar = _this35.add(_this35.game.make.sprite(243.5, 70.5, src.Settings.GAME_ATLAS, 'badgeProgressBar0000'));

      _this35.progressBar.anchor.set(0.5, 1);

      _this35.progressMask = _this35.add(_this35.game.make.graphics(_this35.progressBar.x, _this35.progressBar.y));

      _this35.progressMask.clear().beginFill(0x000000, 0.6).drawRect(-15, -_this35.barHeight, 30, _this35.barHeight).endFill();

      _this35.progressBar.mask = _this35.progressMask;
      _this35.nameText = _this35.add(src.TextUtils.getText(medal.name, 85, 27, 23, '#DFF5BF'));

      _this35.nameText.anchor.set(0, 0.5);

      _this35.descriptionText = _this35.add(_this35.game.make.text(85, 36, medal.descriptionAchieved, {
        font: "19px " + src.Settings.DEFAULT_FONT_FAMILY,
        fill: '#CEF0B1',
        align: "left",
        wordWrap: true,
        wordWrapWidth: 152
      }));
      _this35.descriptionText.lineSpacing = -7;

      _this35.descriptionText.anchor.set(0);

      _this35.updateView();

      return _this35;
    }

    _createClass(BadgePanel, [{
      key: "updateView",
      value: function updateView() {
        var medal = src.MedalManager.instance.getMedal(this.key);

        if (medal.achieved) {
          this.labelNew.visible = this.recentlyUnlocked;
          this.icon.visible = true;
          this.panel.frameName = 'badgePanel0001';
          this.nameText.addColor('#5C8568', 0);
          this.descriptionText.setText(medal.descriptionAchieved);
          this.descriptionText.addColor('#8CAD80', 0);
          this.setProgress(1);
        } else {
          this.labelNew.visible = false;
          this.icon.visible = false;
          this.panel.frameName = 'badgePanel0000';
          this.nameText.addColor('#DFF5BF', 0);
          this.descriptionText.setText(medal.descriptionLocked.replace('${value}', '' + Math.floor(medal.currentValue)));
          this.descriptionText.addColor('#CEF0B1', 0);
          this.setProgress(medal.currentValue / medal.targetValue);
        }
      }
    }, {
      key: "setProgress",
      value: function setProgress(value) {
        this.progressMask.y = this.progressBar.y + this.barHeight * (1 - value);
      }
    }]);

    return BadgePanel;
  }(Phaser.Group);

  src.BadgePanel = BadgePanel;
})(src || (src = {}));

var src;

(function (src) {
  var BadgePopup =
  /*#__PURE__*/
  function (_Phaser$Group16) {
    _inherits(BadgePopup, _Phaser$Group16);

    function BadgePopup(uiManager) {
      var _this36;

      _classCallCheck(this, BadgePopup);

      _this36 = _possibleConstructorReturn(this, _getPrototypeOf(BadgePopup).call(this, uiManager.game));
      _this36.uiManager = uiManager;
      _this36.level = uiManager.level;

      _this36.buildContent();

      _this36.visible = false;
      return _this36;
    }

    _createClass(BadgePopup, [{
      key: "buildContent",
      value: function buildContent() {
        this.medalContainer = this.add(this.game.make.group());
        this.medalContainer.y = 10;
        this.effect = this.medalContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS));
        this.effect.anchor.set(0.5);
        this.effect.scale.set(2);
        this.effect.animations.add('anim', Phaser.Animation.generateFrameNames('coinEffect', 0, 19, '', 4)).play(30, true);
        this.badge = this.medalContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'badge10000'));
        this.badge.anchor.set(0.5);
        this.badge.scale.set(0.8);
        this.badgeName = this.medalContainer.add(src.TextUtils.getStyledText('Badge Name', 10, 20, 28, '#FFFFFF', 'rgba(0,0,0,0.15)', 5, false));
        this.badgeName.anchor.set(0, 0.5);
      }
    }, {
      key: "showMedal",
      value: function showMedal(key) {
        this.visible = true;
        this.badge.frameName = 'badge' + key + '0000';
        this.badgeName.setText(src.MedalManager.instance.getMedal(key).name);
        src.SoundController.instance.playSound('SoundBadges');
        this.medalContainer.x = -75;
        this.game.add.tween(this.medalContainer).to({
          x: 50
        }, 400, Phaser.Easing.Back.Out, true);
        this.badgeName.x = -250;
        this.game.add.tween(this.badgeName).to({
          x: 35
        }, 600, Phaser.Easing.Back.Out, true, 100);
        this.game.time.events.add(3000, this.hideMedal, this);
      }
    }, {
      key: "hideMedal",
      value: function hideMedal() {
        var _this37 = this;

        this.game.add.tween(this.badgeName).to({
          x: -200
        }, 600, Phaser.Easing.Back.In, true);
        this.game.add.tween(this.medalContainer).to({
          x: -75
        }, 400, Phaser.Easing.Back.In, true, 300).onComplete.add(function () {
          return _this37.visible = false;
        });
      }
    }]);

    return BadgePopup;
  }(Phaser.Group);

  src.BadgePopup = BadgePopup;
})(src || (src = {}));

var src;

(function (src) {
  var BadgesScrollableContainer =
  /*#__PURE__*/
  function (_Phaser$Group17) {
    _inherits(BadgesScrollableContainer, _Phaser$Group17);

    function BadgesScrollableContainer(x, y) {
      var _this38;

      _classCallCheck(this, BadgesScrollableContainer);

      _this38 = _possibleConstructorReturn(this, _getPrototypeOf(BadgesScrollableContainer).call(this, src.App.instance));
      _this38.scrollableAreaHeight = 335;
      _this38.scrollableAreaY = 40;

      _this38.position.set(x, y);

      _this38.badgesConbtainer = _this38.add(_this38.game.make.group());
      _this38.containerMask = _this38.add(_this38.game.make.graphics(-5, 0).clear().beginFill(0x00000, 0.25).drawRoundedRect(0, 0, 320, 420, 25).endFill());
      _this38.badgesConbtainer.mask = _this38.containerMask;
      _this38.badges = [];
      src.MedalManager.instance.medals.forEach(function (medal, index) {
        _this38.badges.push(_this38.badgesConbtainer.add(new src.BadgePanel(medal.key, 0, index * 82 + 5)));
      });
      _this38.buttonUp = _this38.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'badgeScrollButton', 285, 25, _this38.upClicked, _assertThisInitialized(_this38), 1, 2));
      _this38.buttonDown = _this38.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'badgeScrollButton', 285, 390, _this38.downClicked, _assertThisInitialized(_this38), 1, 2));
      _this38.scroller = _this38.add(_this38.game.make.sprite(285, _this38.scrollableAreaY, src.Settings.GAME_ATLAS, 'badgeScroller0000'));

      _this38.scroller.anchor.set(0.5, 0.05);

      _this38.scroller.inputEnabled = true;
      _this38.scroller.input.allowVerticalDrag = true;
      _this38.scroller.input.allowHorizontalDrag = false;

      _this38.scroller.input.enableDrag(false, false, false, 0, new Phaser.Rectangle(_this38.scroller.x - _this38.scroller.width / 2, _this38.scrollableAreaY - 5, _this38.scroller.x + _this38.scroller.width / 2, _this38.scrollableAreaY + _this38.scrollableAreaHeight - 30));

      _this38.scroller.events.onDragUpdate.add(_this38.handleSliderDrag, _assertThisInitialized(_this38));

      _this38.scroller.events.onDragStop.add(_this38.handleSliderDrag, _assertThisInitialized(_this38));

      src.MedalManager.instance.medalUnlocked.add(_this38.dispatchMedalUnlocked, _assertThisInitialized(_this38));
      return _this38;
    }

    _createClass(BadgesScrollableContainer, [{
      key: "updateBadges",
      value: function updateBadges() {
        this.badges.forEach(function (badge) {
          return badge.updateView();
        });
      }
    }, {
      key: "hasNewBadges",
      value: function hasNewBadges() {
        return this.badges.reduce(function (prev, badge) {
          return prev || badge.recentlyUnlocked;
        }, false);
      }
    }, {
      key: "resetNewIcons",
      value: function resetNewIcons() {
        this.badges.forEach(function (badgePanel) {
          return badgePanel.recentlyUnlocked = false;
        });
      }
    }, {
      key: "handleSliderDrag",
      value: function handleSliderDrag() {
        this.scrollTo(Phaser.Math.clamp((this.scroller.y - 40.85) / 228, 0, 1));
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(value) {
        this.badgesConbtainer.y = value * -420;
      }
    }, {
      key: "upClicked",
      value: function upClicked() {
        var _this39 = this;

        var targetY = Phaser.Math.clamp(this.badgesConbtainer.y + 82, -420, 0);
        this.game.add.tween(this.badgesConbtainer).to({
          y: targetY
        }, 200, Phaser.Easing.Sinusoidal.InOut, true).onUpdateCallback(function () {
          return _this39.scroller.y = _this39.badgesConbtainer.y / -360 * 228 + 40.85;
        });
      }
    }, {
      key: "downClicked",
      value: function downClicked() {
        var _this40 = this;

        var targetY = Phaser.Math.clamp(this.badgesConbtainer.y - 82, -420, 0);
        this.game.add.tween(this.badgesConbtainer).to({
          y: targetY
        }, 200, Phaser.Easing.Sinusoidal.InOut, true).onUpdateCallback(function () {
          return _this40.scroller.y = _this40.badgesConbtainer.y / -360 * 228 + 40.85;
        });
      }
    }, {
      key: "dispatchMedalUnlocked",
      value: function dispatchMedalUnlocked(medal) {
        this.badges.forEach(function (badgePanel) {
          if (badgePanel.key === medal.key) {
            badgePanel.recentlyUnlocked = true;
          }
        });
      }
    }]);

    return BadgesScrollableContainer;
  }(Phaser.Group);

  src.BadgesScrollableContainer = BadgesScrollableContainer;
})(src || (src = {}));

var src;

(function (src) {
  var SoundButtonsController =
  /*#__PURE__*/
  function (_Phaser$Group18) {
    _inherits(SoundButtonsController, _Phaser$Group18);

    function SoundButtonsController() {
      var _this41;

      _classCallCheck(this, SoundButtonsController);

      _this41 = _possibleConstructorReturn(this, _getPrototypeOf(SoundButtonsController).call(this, src.App.instance));
      _this41.isInitialized = false;
      return _this41;
    }

    _createClass(SoundButtonsController, [{
      key: "setPosition",
      value: function setPosition(x, y) {
        this.buttonsContainer.position.set(x, y);
      }
    }, {
      key: "start",
      value: function start() {
        if (!this.isInitialized) {
          this.isInitialized = true;
          src.App.instance.stage.addChild(this);
          this.constructButtons();
          src.TransitionScreen.instance.getToTop();
          this.resize();
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        if (this.isInitialized) {
          this.scale.set(src.CustomScaleManager.SCALE_X, src.CustomScaleManager.SCALE_Y);
          this.position.set(src.CustomScaleManager.WIDTH / 2 - src.CustomScaleManager.ORIGINAL_WIDTH * src.CustomScaleManager.SCALE_X / 2, src.CustomScaleManager.HEIGHT / 2 - src.CustomScaleManager.ORIGINAL_HEIGHT * src.CustomScaleManager.SCALE_Y / 2);
        }
      }
    }, {
      key: "getToTop",
      value: function getToTop() {
        src.App.instance.stage.setChildIndex(this, src.App.instance.stage.children.length - 1);
      }
    }, {
      key: "constructButtons",
      value: function constructButtons() {
        this.buttonsContainer = this.add(src.App.instance.make.group());
        this.buttonSoundOn = this.buttonsContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonSoundOn', 0, 0, this.soundOnClicked, this, 1, 0));
        this.buttonSoundOff = this.buttonsContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonSoundOff', 0, 0, this.soundOffClicked, this, 1, 0));
        this.buttonMusicOn = this.buttonsContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonMusicOn', 42, 0, this.musicOnClicked, this, 1, 0));
        this.buttonMusicOff = this.buttonsContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonMusicOff', 42, 0, this.musicOffClicked, this, 1, 0));
        this.updateSoundButtons();
      }
    }, {
      key: "soundOnClicked",
      value: function soundOnClicked() {
        src.SoundController.instance.setSFXVolume(0);
        this.updateSoundButtons();
      }
    }, {
      key: "soundOffClicked",
      value: function soundOffClicked() {
        src.SoundController.instance.setSFXVolume(src.SoundController.instance.defaultSFXVolume);
        this.updateSoundButtons();
      }
    }, {
      key: "musicOnClicked",
      value: function musicOnClicked() {
        src.SoundController.instance.setMusicVolume(0);
        this.updateSoundButtons();
      }
    }, {
      key: "musicOffClicked",
      value: function musicOffClicked() {
        src.SoundController.instance.setMusicVolume(src.SoundController.instance.defaultMusicVolume);
        this.updateSoundButtons();
      }
    }, {
      key: "updateSoundButtons",
      value: function updateSoundButtons() {
        if (src.SoundController.instance.isMusicMuted()) {
          this.buttonMusicOn.visible = false;
          this.buttonMusicOff.visible = true;
        } else {
          this.buttonMusicOn.visible = true;
          this.buttonMusicOff.visible = false;
        }

        if (src.SoundController.instance.isSFXMuted()) {
          this.buttonSoundOn.visible = false;
          this.buttonSoundOff.visible = true;
        } else {
          this.buttonSoundOn.visible = true;
          this.buttonSoundOff.visible = false;
        }
      }
    }], [{
      key: "instance",
      get: function get() {
        return SoundButtonsController._instance ? SoundButtonsController._instance : SoundButtonsController._instance = new SoundButtonsController();
      }
    }]);

    return SoundButtonsController;
  }(Phaser.Group);

  SoundButtonsController._instance = null;
  src.SoundButtonsController = SoundButtonsController;
})(src || (src = {}));

var src;

(function (src) {
  var ButtonUtils =
  /*#__PURE__*/
  function () {
    function ButtonUtils() {
      _classCallCheck(this, ButtonUtils);
    }

    _createClass(ButtonUtils, null, [{
      key: "createButton",
      value: function createButton(atlasName, spriteName, x, y, callback, callbackContext) {
        var overFrame = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        var downFrame = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
        var button = new Phaser.Button(src.App.instance, x, y, atlasName, callback, callbackContext, spriteName + '000' + overFrame, spriteName + '0000', spriteName + '000' + downFrame, spriteName + '0000');
        button.anchor.setTo(0.5, 0.5);
        button.input.pixelPerfectClick = true;
        button.input.pixelPerfectAlpha = 1;
        button.input.useHandCursor = true;
        button.events.onInputDown.add(function () {
          return src.SoundController.instance.playClickSound();
        });
        return button;
      }
    }, {
      key: "createOneFrameButton",
      value: function createOneFrameButton(atlasName, spriteName, x, y, callback, callbackContext) {
        var button = new Phaser.Button(src.App.instance, x, y, atlasName, callback, callbackContext, spriteName + '0000', spriteName + '0000', spriteName + '0000', spriteName + '0000');
        button.anchor.setTo(0.5, 0.5);
        button.input.pixelPerfectClick = true;
        button.input.pixelPerfectAlpha = 1;
        button.input.useHandCursor = true;
        button.events.onInputDown.add(function () {
          return src.SoundController.instance.playClickSound();
        });
        return button;
      }
    }, {
      key: "createSimpleButton",
      value: function createSimpleButton(atlasName, spriteName, x, y, startScale, callback, callbackContext) {
        var button = new Phaser.Button(src.App.instance, x, y, atlasName, callback, callbackContext, spriteName + '0000', spriteName + '0000', spriteName + '0000', spriteName + '0000');
        button.anchor.setTo(0.5, 0.5);
        button.scale.set(startScale);
        button.input.pixelPerfectClick = true;
        button.input.pixelPerfectAlpha = 1;
        button.input.useHandCursor = false;
        button["overTween"] = src.App.instance.add.tween(button.scale).to({
          x: startScale * 1.05,
          y: startScale * 1.05
        }, 100);
        button["outTween"] = src.App.instance.add.tween(button.scale).to({
          x: startScale,
          y: startScale
        }, 100);
        button["downTween"] = src.App.instance.add.tween(button.scale).to({
          x: startScale * 0.95,
          y: startScale * 0.95
        }, 50).to({
          x: startScale,
          y: startScale
        }, 50);
        button.events.onInputOver.add(ButtonUtils.mouseOverHandler, this, 0);
        button.events.onInputOut.add(ButtonUtils.mouseOutHandler, this, 0);
        button.events.onInputDown.add(ButtonUtils.mouseDownHandler, this, 0);
        button.events.onInputDown.add(function () {
          return src.SoundController.instance.playClickSound();
        });
        return button;
      }
    }, {
      key: "mouseOverHandler",
      value: function mouseOverHandler(caller) {
        caller["overTween"].start();
      }
    }, {
      key: "mouseOutHandler",
      value: function mouseOutHandler(caller) {
        caller["outTween"].start();
      }
    }, {
      key: "mouseDownHandler",
      value: function mouseDownHandler(caller) {
        caller["downTween"].start();
      }
    }]);

    return ButtonUtils;
  }();

  src.ButtonUtils = ButtonUtils;
})(src || (src = {}));

var src;

(function (src) {
  var ColorUtils =
  /*#__PURE__*/
  function () {
    function ColorUtils() {
      _classCallCheck(this, ColorUtils);
    }

    _createClass(ColorUtils, null, [{
      key: "tweenTint",
      value: function tweenTint(spriteToTween, startColor, endColor, duration) {
        var colorBlend = {
          step: 0
        };
        src.App.instance.add.tween(colorBlend).to({
          step: 100
        }, duration, Phaser.Easing.Linear.None, true).onUpdateCallback(function () {
          spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);
        }).onComplete.add(function () {
          return spriteToTween.tint = endColor;
        });
      }
    }]);

    return ColorUtils;
  }();

  src.ColorUtils = ColorUtils;
})(src || (src = {}));

var src;

(function (src) {
  var LocalStorageController =
  /*#__PURE__*/
  function () {
    function LocalStorageController() {
      _classCallCheck(this, LocalStorageController);

      this.isLocalStorageSupported = false;
      this.data = null;
      this.data = {
        "maxScore": 0,
        "medals": []
      };
    }

    _createClass(LocalStorageController, [{
      key: "getMaxScores",
      value: function getMaxScores() {
        return this.data["maxScore"];
      }
    }, {
      key: "getMedals",
      value: function getMedals() {
        return this.data["medals"];
      }
    }, {
      key: "save",
      value: function save() {
        this.data["maxScore"] = src.ScoreManager.instance.getMaxScores();
        this.data["medals"] = src.MedalManager.instance.getMedalsState();

        if (this.isLocalStorageSupported) {
          localStorage[LocalStorageController.STORAGE_NAME] = JSON.stringify(this.data);
        }
      }
    }, {
      key: "checkLocalStorageSupported",
      value: function checkLocalStorageSupported() {
        try {
          this.isLocalStorageSupported = "localStorage" in window && window["localStorage"] !== null;
        } catch (e) {
          this.isLocalStorageSupported = false;
        }
      }
    }, {
      key: "loadSave",
      value: function loadSave() {
        this.checkLocalStorageSupported();

        if (this.isLocalStorageSupported) {
          if (localStorage[LocalStorageController.STORAGE_NAME]) {
            this.data = JSON.parse(localStorage[LocalStorageController.STORAGE_NAME]);
          } else {
            localStorage[LocalStorageController.STORAGE_NAME] = JSON.stringify(this.data);
          }
        }

        this.finalizeLoading();
      }
    }, {
      key: "finalizeLoading",
      value: function finalizeLoading() {
        src.ScoreManager.instance.setMaxScores(LocalStorageController.instance.getMaxScores());
        src.MedalManager.instance.loadMedalsState(LocalStorageController.instance.getMedals());
      }
    }], [{
      key: "instance",
      get: function get() {
        return LocalStorageController._instance ? LocalStorageController._instance : LocalStorageController._instance = new LocalStorageController();
      }
    }]);

    return LocalStorageController;
  }();

  LocalStorageController.STORAGE_NAME = src.Settings.LOCAL_STORAGE_KEY;
  src.LocalStorageController = LocalStorageController;
})(src || (src = {}));

var src;

(function (src) {
  var LocalizationManager =
  /*#__PURE__*/
  function () {
    function LocalizationManager() {
      _classCallCheck(this, LocalizationManager);
    }

    _createClass(LocalizationManager, null, [{
      key: "init",
      value: function init(jsonFile) {
        LocalizationManager.texts = jsonFile;
      }
    }, {
      key: "getText",
      value: function getText(key) {
        return LocalizationManager.texts[key] ? LocalizationManager.texts[key] : "NO_TEXT";
      }
    }]);

    return LocalizationManager;
  }();

  src.LocalizationManager = LocalizationManager;
})(src || (src = {}));

var src;

(function (src) {
  var TextUtils =
  /*#__PURE__*/
  function () {
    function TextUtils() {
      _classCallCheck(this, TextUtils);
    }

    _createClass(TextUtils, null, [{
      key: "getText",
      value: function getText(text, x, y, fontSize, color) {
        var fontFamily = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : src.Settings.DEFAULT_FONT_FAMILY;
        var fontWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
        var textField = new Phaser.Text(src.App.instance, x, y, text, {
          font: (fontWidth ? fontWidth + ' ' : '') + fontSize + "px " + fontFamily,
          fill: color,
          align: "center"
        });
        textField.anchor.setTo(0.5, 0.5);
        return textField;
      }
    }, {
      key: "getBitmapText",
      value: function getBitmapText(text, x, y, fontSize) {
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFFFFFF;
        var family = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : src.Settings.DEFAULT_FONT_FAMILY;
        var textField = new Phaser.BitmapText(src.App.instance, x, y, family, text, fontSize, "center");
        textField.anchor.setTo(0.5, 0.5);
        textField.tint = color;
        return textField;
      }
    }, {
      key: "getShadowText",
      value: function getShadowText(text, x, y, fontSize, color) {
        var shadowColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#000000";
        var shadowX = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        var shadowY = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 2;
        var anchorX = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.5;
        var anchorY = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0.5;
        var fontFamily = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : src.Settings.DEFAULT_FONT_FAMILY;
        var fontWidth = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : null;
        var textField = new Phaser.Text(src.App.instance, x, y, text, {
          font: (fontWidth ? fontWidth + ' ' : '') + fontSize + "px " + fontFamily,
          fill: color,
          align: "center"
        });
        textField.anchor.setTo(anchorX, anchorY);
        textField.setShadow(shadowX, shadowY, shadowColor, 0);
        return textField;
      }
    }, {
      key: "getStyledText",
      value: function getStyledText(text, x, y, fontSize, color, strokeColor) {
        var strokeThinkness = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 4;
        var enableShadow = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
        var textAlign = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "center";
        var textField = new Phaser.Text(src.App.instance, x, y, text, {
          font: '' + fontSize + "px " + src.Settings.DEFAULT_FONT_FAMILY,
          fill: color,
          stroke: strokeColor,
          strokeThickness: strokeThinkness,
          align: textAlign
        });

        if (enableShadow) {
          textField.setShadow(0, 2, strokeColor, 0);
        }

        textField.anchor.set(0.5, 0.5);
        return textField;
      }
    }, {
      key: "convertMSToHumanTime",
      value: function convertMSToHumanTime(milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var minutes = Math.floor(seconds / 60);
        var restSeconds = seconds - minutes * 60;
        return (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + restSeconds;
      }
    }, {
      key: "normalizeTime",
      value: function normalizeTime(seconds) {
        var restSeconds = seconds;
        var hours = Math.floor(restSeconds / 3600);
        restSeconds %= 3600;
        var minutes = Math.floor(restSeconds / 60);
        restSeconds %= 60;
        return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + restSeconds;
      }
    }, {
      key: "addSpaces",
      value: function addSpaces(textValue) {
        var bolder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return textValue.split('').join(bolder ? src.Settings.THIN_SPACE : src.Settings.NARROW_SPACE);
      }
    }, {
      key: "tweenText",
      value: function tweenText(textField, initialValue, targetValue, duration, delay) {
        var valueHolder = {
          value: initialValue
        };
        src.App.instance.add.tween(valueHolder).to({
          value: targetValue
        }, duration, Phaser.Easing.Linear.None, true, delay).onUpdateCallback(function () {
          return textField.setText(TextUtils.addSpaces('' + Math.floor(valueHolder.value)));
        }).onComplete.add(function () {
          return textField.setText(TextUtils.addSpaces('' + Math.floor(valueHolder.value)));
        });
      }
    }]);

    return TextUtils;
  }();

  src.TextUtils = TextUtils;
})(src || (src = {}));

var src;

(function (src) {
  var BaseWindow =
  /*#__PURE__*/
  function (_Phaser$Group19) {
    _inherits(BaseWindow, _Phaser$Group19);

    function BaseWindow(regX, regY) {
      var _this42;

      var backgroundAlpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : src.Settings.WINDOW_BACKGROUND_ALPHA;

      _classCallCheck(this, BaseWindow);

      _this42 = _possibleConstructorReturn(this, _getPrototypeOf(BaseWindow).call(this, src.App.instance, null));
      _this42.backgroundAlpha = src.Settings.WINDOW_BACKGROUND_ALPHA;
      _this42.registrationPoint = new Phaser.Point(regX, regY);
      _this42.backgroundAlpha = backgroundAlpha;
      _this42.visible = false;

      _this42.buildBackground();

      _this42.buildContent();

      return _this42;
    }

    _createClass(BaseWindow, [{
      key: "buildBackground",
      value: function buildBackground() {
        this.background = this.add(this.game.make.sprite(-50, -50, src.Settings.GAME_ATLAS, 'blackSquare0000'));
        this.background.width = this.game.world.width + 100;
        this.background.height = this.game.world.height + 100;
        this.background.alpha = this.backgroundAlpha;
        this.background.inputEnabled = true;
      }
    }, {
      key: "buildContent",
      value: function buildContent() {
        this.content = this.game.make.group(this);
        this.content.inputEnableChildren = true;
        this.contentMask = this.content.add(this.game.make.graphics(0, 0).beginFill(0x00000).drawRect(0, 0, src.CustomScaleManager.ORIGINAL_WIDTH, src.CustomScaleManager.ORIGINAL_HEIGHT).endFill());
        this.content.mask = this.contentMask;
        this.background.mask = this.contentMask;
      }
    }, {
      key: "resize",
      value: function resize() {
        this.background.width = this.game.world.width + 100;
        this.background.height = this.game.world.height + 100;
        this.content.scale.set(src.CustomScaleManager.SCALE_X, src.CustomScaleManager.SCALE_Y);
        this.content.position.set(src.CustomScaleManager.WIDTH / 2 - src.CustomScaleManager.ORIGINAL_WIDTH * src.CustomScaleManager.SCALE_X / 2, src.CustomScaleManager.HEIGHT / 2 - src.CustomScaleManager.ORIGINAL_HEIGHT * src.CustomScaleManager.SCALE_Y / 2);
      }
    }, {
      key: "show",
      value: function show() {
        this.visible = true;
        this.resize();
        this.game.stage.addChild(this);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.visible = false;

        if (this.parent) {
          this.parent.removeChild(this);
        }
      }
    }, {
      key: "lockUpButtons",
      value: function lockUpButtons() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        for (var i = 0; i < args.length; i++) {
          args[i]["inputEnabled"] = false;
        }
      }
    }, {
      key: "unlockButtons",
      value: function unlockButtons() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        for (var i = 0; i < args.length; i++) {
          args[i]["inputEnabled"] = true;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(BaseWindow.prototype), "destroy", this).call(this);

        this.background = null;
        this.content = null;
      }
    }]);

    return BaseWindow;
  }(Phaser.Group);

  src.BaseWindow = BaseWindow;
})(src || (src = {})); ///<reference path="BaseWindow.ts"/>


var src;

(function (src) {
  var BadgesWindow =
  /*#__PURE__*/
  function (_src$BaseWindow) {
    _inherits(BadgesWindow, _src$BaseWindow);

    function BadgesWindow() {
      _classCallCheck(this, BadgesWindow);

      return _possibleConstructorReturn(this, _getPrototypeOf(BadgesWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5));
    }

    _createClass(BadgesWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(BadgesWindow.prototype), "buildContent", this).call(this);

        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -240);
        this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'badgesPlate0000'));
        this.plate.anchor.set(0.5);
        this.badgesContainer = this.plateContainer.add(new src.BadgesScrollableContainer(-152, -180));
        this.buttonClose = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonClose', 132, -207, this.closeClicked, this, 1, 2));
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(BadgesWindow.prototype), "show", this).call(this);

        src.SoundController.instance.playSound('SoundPanelDrop');
        this.badgesContainer.updateBadges();
        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 350, Phaser.Easing.Circular.Out, true, 0);
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -320);
        this.game.add.tween(this.plateContainer).to({
          y: 240
        }, 1200, this.elasticOut, true, 100);
        this.plateContainer.scale.set(0.7, 1.25);
        this.game.add.tween(this.plateContainer.scale).to({
          x: 1,
          y: 1
        }, 1200, Phaser.Easing.Elastic.Out, true, 100);
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.clearTweens();

        _get(_getPrototypeOf(BadgesWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "closeClicked",
      value: function closeClicked() {
        this.badgesContainer.resetNewIcons();
        this.hide();
      }
    }]);

    return BadgesWindow;
  }(src.BaseWindow);

  src.BadgesWindow = BadgesWindow;
})(src || (src = {}));

var src;

(function (src) {
  var ConfirmRestartWindow =
  /*#__PURE__*/
  function (_src$BaseWindow2) {
    _inherits(ConfirmRestartWindow, _src$BaseWindow2);

    function ConfirmRestartWindow() {
      _classCallCheck(this, ConfirmRestartWindow);

      return _possibleConstructorReturn(this, _getPrototypeOf(ConfirmRestartWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5));
    }

    _createClass(ConfirmRestartWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(ConfirmRestartWindow.prototype), "buildContent", this).call(this);

        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -160);
        this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'confirmRestartPlate' + '0000'));
        this.plate.anchor.set(0.5);
        this.buttonYes = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonYes', -53, 92, this.yesClicked, this, 1, 2));
        this.buttonNo = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonNo', 52, 92, this.noClicked, this, 1, 2));
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(ConfirmRestartWindow.prototype), "show", this).call(this);

        src.SoundController.instance.playSound('SoundPanelDrop');
        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 350, Phaser.Easing.Circular.Out, true, 0);
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -280);
        this.game.add.tween(this.plateContainer).to({
          y: 230
        }, 1200, this.elasticOut, true, 100);
        this.plateContainer.scale.set(0.6, 1.4);
        this.game.add.tween(this.plateContainer.scale).to({
          x: 1,
          y: 1
        }, 1200, Phaser.Easing.Elastic.Out, true, 100);
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.clearTweens();

        _get(_getPrototypeOf(ConfirmRestartWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "yesClicked",
      value: function yesClicked() {
        src.TransitionScreen.instance.changeState("Level");
      }
    }, {
      key: "noClicked",
      value: function noClicked() {
        this.hide();
      }
    }]);

    return ConfirmRestartWindow;
  }(src.BaseWindow);

  src.ConfirmRestartWindow = ConfirmRestartWindow;
})(src || (src = {}));

var src;

(function (src) {
  var CreditsWindow =
  /*#__PURE__*/
  function (_src$BaseWindow3) {
    _inherits(CreditsWindow, _src$BaseWindow3);

    function CreditsWindow() {
      _classCallCheck(this, CreditsWindow);

      return _possibleConstructorReturn(this, _getPrototypeOf(CreditsWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5));
    }

    _createClass(CreditsWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(CreditsWindow.prototype), "buildContent", this).call(this);

        src.SoundController.instance.playSound('SoundPanelDrop');
        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -240);
        this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'creditsPlate' + '0000'));
        this.plate.anchor.set(0.5);
        this.buttonFundemic = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'blackSquare', 0, 30, this.fundemicClicked, this));
        this.buttonFundemic.width = 260;
        this.buttonFundemic.height = 120;
        this.buttonFundemic.alpha = 0.0;
        this.buttonFundemic.input.pixelPerfectAlpha = 0;
        this.buttonClose = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonClose', 107, -65, this.closeClicked, this, 1, 2));
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(CreditsWindow.prototype), "show", this).call(this);

        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 350, Phaser.Easing.Circular.Out, true, 0);
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -280);
        this.game.add.tween(this.plateContainer).to({
          y: 230
        }, 1200, this.elasticOut, true, 100);
        this.plateContainer.scale.set(0.6, 1.4);
        this.game.add.tween(this.plateContainer.scale).to({
          x: 1,
          y: 1
        }, 1200, Phaser.Easing.Elastic.Out, true, 100);
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.clearTweens();

        _get(_getPrototypeOf(CreditsWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "fundemicClicked",
      value: function fundemicClicked() {
        window.open("https://fundemic.com", "_blank");
      }
    }, {
      key: "closeClicked",
      value: function closeClicked() {
        this.hide();
      }
    }]);

    return CreditsWindow;
  }(src.BaseWindow);

  src.CreditsWindow = CreditsWindow;
})(src || (src = {}));

var src;

(function (src) {
  var HelpWindow =
  /*#__PURE__*/
  function (_src$BaseWindow4) {
    _inherits(HelpWindow, _src$BaseWindow4);

    function HelpWindow() {
      var _this43;

      _classCallCheck(this, HelpWindow);

      _this43 = _possibleConstructorReturn(this, _getPrototypeOf(HelpWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5));
      _this43.pausedState = false;
      _this43.startMusicOnComplete = false;
      return _this43;
    }

    _createClass(HelpWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(HelpWindow.prototype), "buildContent", this).call(this);

        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -240);
        this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'helpPlate' + '0000'));
        this.plate.anchor.set(0.5);
        this.buddies = this.plateContainer.add(this.game.make.sprite(0, 15, src.Settings.GAME_ATLAS, 'helpBuddies0000'));
        this.buddies.anchor.set(0.5);
        this.buddies.animations.add('buddies', Phaser.Animation.generateFrameNames('helpBuddies', 1, 28, '', 4)).play(45, true);
        this.mouseHelp = this.plateContainer.add(this.game.make.sprite(35, 100, src.Settings.GAME_ATLAS, 'helpMouse0000'));
        this.mouseHelp.anchor.set(0.5);
        this.mouseHelp.animations.add('help', Phaser.Animation.generateFrameNames(this.game.device.desktop ? 'helpMouse' : 'helpTouch', 0, 13, '', 4).concat(Phaser.Animation.generateFrameNames(this.game.device.desktop ? 'helpMouse' : 'helpTouch', 13, 0, '', 4))).play(45, true);
        this.buttonClose = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonClose', 107, -140, this.closeClicked, this, 1, 2));
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(HelpWindow.prototype), "show", this).call(this);

        src.SoundController.instance.playSound('SoundPanelDrop');

        if (src.App.instance.state.getCurrentState() instanceof src.Level) {
          this.pausedState = src.App.instance.state.getCurrentState().gameStateManager.isPaused();
          src.App.instance.state.getCurrentState().gameStateManager.setPaused(true);
        }

        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 350, Phaser.Easing.Circular.Out, true, 0);
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -280);
        this.game.add.tween(this.plateContainer).to({
          y: 240
        }, 1200, this.elasticOut, true, 100);
        this.plateContainer.scale.set(0.6, 1.4);
        this.game.add.tween(this.plateContainer.scale).to({
          x: 1,
          y: 1
        }, 1200, Phaser.Easing.Elastic.Out, true, 100);
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.clearTweens();

        _get(_getPrototypeOf(HelpWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "closeClicked",
      value: function closeClicked() {
        if (!this.pausedState) {
          if (src.App.instance.state.getCurrentState() instanceof src.Level) {
            src.App.instance.state.getCurrentState().gameStateManager.setPaused(false);

            if (this.startMusicOnComplete) {
              src.SoundController.instance.playMusic('MusicGamePlay');
            }
          }
        }

        this.hide();
      }
    }]);

    return HelpWindow;
  }(src.BaseWindow);

  src.HelpWindow = HelpWindow;
})(src || (src = {}));

var src;

(function (src) {
  var PauseWindow =
  /*#__PURE__*/
  function (_src$BaseWindow5) {
    _inherits(PauseWindow, _src$BaseWindow5);

    function PauseWindow() {
      _classCallCheck(this, PauseWindow);

      return _possibleConstructorReturn(this, _getPrototypeOf(PauseWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5));
    }

    _createClass(PauseWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(PauseWindow.prototype), "buildContent", this).call(this);

        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(0, 0);
        this.buttonResume = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseResume', src.CustomScaleManager.ORIGINAL_WIDTH / 2, 128, this.resumeClicked, this, 1, 2));
        this.buttonReplay = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseReplay', src.CustomScaleManager.ORIGINAL_WIDTH / 2, 200, this.replayClicked, this, 1, 2));
        this.buttonBadges = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseBadges', src.CustomScaleManager.ORIGINAL_WIDTH / 2, 264, this.badgesClicked, this, 1, 2));
        this.buttonBadgesNew = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseBadgesNew', src.CustomScaleManager.ORIGINAL_WIDTH / 2, 264, this.badgesClicked, this, 1, 2));
        this.buttonHelp = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseHelp', src.CustomScaleManager.ORIGINAL_WIDTH / 2, 327, this.helpClicked, this, 1, 2));
        this.buttonMenu = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseMenu', src.CustomScaleManager.ORIGINAL_WIDTH / 2, 390, this.menuClicked, this, 1, 2));
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(PauseWindow.prototype), "show", this).call(this);

        src.SoundController.instance.playSound('SoundPanelDrop');

        if (src.App.instance.state.getCurrentState() instanceof src.Level) {
          src.App.instance.state.getCurrentState().gameStateManager.setPaused(true);
          src.SoundController.instance.chokeMusicVolume();
        }

        this.buttonBadgesNew.visible = src.WindowManager.instance.badges.badgesContainer.hasNewBadges();
        this.buttonBadges.visible = !this.buttonBadgesNew.visible;
        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 200, Phaser.Easing.Circular.Out, true, 0);
        this.buttonMenu.y = -90;
        this.game.add.tween(this.buttonMenu).to({
          y: 390
        }, 900, this.elasticOut, true, 50);
        this.buttonHelp.y = -120;
        this.game.add.tween(this.buttonHelp).to({
          y: 327
        }, 900, this.elasticOut, true, 50 + 50);
        this.buttonBadges.y = -150;
        this.game.add.tween(this.buttonBadges).to({
          y: 260
        }, 900, this.elasticOut, true, 50 + 100);
        this.buttonBadgesNew.y = -150;
        this.game.add.tween(this.buttonBadgesNew).to({
          y: 260
        }, 900, this.elasticOut, true, 50 + 100);
        this.buttonReplay.y = -180;
        this.game.add.tween(this.buttonReplay).to({
          y: 200
        }, 900, this.elasticOut, true, 50 + 150);
        this.buttonResume.y = -210;
        this.game.add.tween(this.buttonResume).to({
          y: 128
        }, 900, this.elasticOut, true, 50 + 200);
        this.buttonMenu.scale.set(0.5, 1.5);
        this.game.add.tween(this.buttonMenu.scale).to({
          x: 1,
          y: 1
        }, 1500, Phaser.Easing.Elastic.Out, true, 50);
        this.buttonHelp.scale.set(0.5, 1.5);
        this.game.add.tween(this.buttonHelp.scale).to({
          x: 1,
          y: 1
        }, 1500, Phaser.Easing.Elastic.Out, true, 50 + 50);
        this.buttonBadges.scale.set(0.5, 1.5);
        this.game.add.tween(this.buttonBadges.scale).to({
          x: 1,
          y: 1
        }, 1500, Phaser.Easing.Elastic.Out, true, 50 + 100);
        this.buttonBadgesNew.scale.set(0.5, 1.5);
        this.game.add.tween(this.buttonBadgesNew.scale).to({
          x: 1,
          y: 1
        }, 1500, Phaser.Easing.Elastic.Out, true, 50 + 100);
        this.buttonReplay.scale.set(0.5, 1.5);
        this.game.add.tween(this.buttonReplay.scale).to({
          x: 1,
          y: 1
        }, 1500, Phaser.Easing.Elastic.Out, true, 50 + 150);
        this.buttonResume.scale.set(0.5, 1.5);
        this.game.add.tween(this.buttonResume.scale).to({
          x: 1,
          y: 1
        }, 1500, Phaser.Easing.Elastic.Out, true, 50 + 200);
        src.SoundButtonsController.instance.getToTop();
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
        this.game.tweens.removeFrom(this.buttonReplay, false);
        this.game.tweens.removeFrom(this.buttonMenu, false);
        this.game.tweens.removeFrom(this.buttonHelp, false);
        this.game.tweens.removeFrom(this.buttonBadges, false);
        this.game.tweens.removeFrom(this.buttonBadgesNew, false);
        this.game.tweens.removeFrom(this.buttonResume, false);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.clearTweens();

        _get(_getPrototypeOf(PauseWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "handleResumeKeyClicked",
      value: function handleResumeKeyClicked(e) {
        this.resumeClicked();
      }
    }, {
      key: "resumeClicked",
      value: function resumeClicked() {
        if (src.App.instance.state.getCurrentState() instanceof src.Level) {
          src.App.instance.state.getCurrentState().gameStateManager.setPaused(false);
        }

        this.hide();
        src.SoundController.instance.restoreMusicVolume();
      }
    }, {
      key: "menuClicked",
      value: function menuClicked() {
        src.WindowManager.instance.showQuitMenuWindow();
      }
    }, {
      key: "replayClicked",
      value: function replayClicked() {
        src.WindowManager.instance.showConfirmRestartWindow();
      }
    }, {
      key: "helpClicked",
      value: function helpClicked() {
        src.WindowManager.instance.showHelp(false);
      }
    }, {
      key: "badgesClicked",
      value: function badgesClicked() {
        src.WindowManager.instance.showBadges();
      }
    }]);

    return PauseWindow;
  }(src.BaseWindow);

  src.PauseWindow = PauseWindow;
})(src || (src = {}));

var src;

(function (src) {
  var QuitMenuWindow =
  /*#__PURE__*/
  function (_src$BaseWindow6) {
    _inherits(QuitMenuWindow, _src$BaseWindow6);

    function QuitMenuWindow() {
      _classCallCheck(this, QuitMenuWindow);

      return _possibleConstructorReturn(this, _getPrototypeOf(QuitMenuWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5));
    }

    _createClass(QuitMenuWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(QuitMenuWindow.prototype), "buildContent", this).call(this);

        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -160);
        this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'quitMenuPlate' + '0000'));
        this.plate.anchor.set(0.5);
        this.buttonYes = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonYes', -53, 92, this.yesClicked, this, 1, 2));
        this.buttonNo = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonNo', 52, 92, this.noClicked, this, 1, 2));
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(QuitMenuWindow.prototype), "show", this).call(this);

        src.SoundController.instance.playSound('SoundPanelDrop');
        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 350, Phaser.Easing.Circular.Out, true, 0);
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -280);
        this.game.add.tween(this.plateContainer).to({
          y: 230
        }, 1200, this.elasticOut, true, 100);
        this.plateContainer.scale.set(0.6, 1.4);
        this.game.add.tween(this.plateContainer.scale).to({
          x: 1,
          y: 1
        }, 1200, Phaser.Easing.Elastic.Out, true, 100);
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.clearTweens();

        _get(_getPrototypeOf(QuitMenuWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "yesClicked",
      value: function yesClicked() {
        src.TransitionScreen.instance.changeState("MainMenu");
      }
    }, {
      key: "noClicked",
      value: function noClicked() {
        this.hide();
      }
    }]);

    return QuitMenuWindow;
  }(src.BaseWindow);

  src.QuitMenuWindow = QuitMenuWindow;
})(src || (src = {}));

var src;

(function (src) {
  var ResultsWindow =
  /*#__PURE__*/
  function (_src$BaseWindow7) {
    _inherits(ResultsWindow, _src$BaseWindow7);

    function ResultsWindow() {
      _classCallCheck(this, ResultsWindow);

      return _possibleConstructorReturn(this, _getPrototypeOf(ResultsWindow).call(this, src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.3));
    }

    _createClass(ResultsWindow, [{
      key: "buildContent",
      value: function buildContent() {
        _get(_getPrototypeOf(ResultsWindow.prototype), "buildContent", this).call(this);
        /* MAIN PANEL */


        this.plateContainer = this.content.add(this.game.make.group());
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2 + 5, -240);
        this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.Settings.GAME_ATLAS, 'resultsPlate' + '0000'));
        this.plate.anchor.set(0.5);
        this.bestScoresText = this.plateContainer.add(src.TextUtils.getStyledText('Best score', 0, -180, 30, '#FFFED6', '#9FD275', 6, false));
        this.bestScoresValueText = this.plateContainer.add(src.TextUtils.getStyledText('30785', 0, -157, 36, '#FFFFFF', '#9FD275', 6, false));
        this.scoresText = this.plateContainer.add(src.TextUtils.getStyledText('Score', 0, -113, 30, '#FFFFFF', '#967878', 5, false));
        this.scoresValueText = this.plateContainer.add(src.TextUtils.getStyledText('1435', 0, -80, 54, '#FFFFFF', '#9c7f79', 7, false));
        this.buttonSubmit = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonSubmit', -40, 70, this.submitClicked, this, 1, 2));
        this.buttonSubmit.visible = window["enableSubmitButton"];
        this.stamp = this.plateContainer.add(this.game.make.sprite(115, -40, src.Settings.GAME_ATLAS, 'stamp' + '0000'));
        this.stamp.anchor.set(0.5);
        this.stamp.alpha = 0;
        this.scoreEffSmall = this.plateContainer.add(this.game.make.sprite(0, -160, src.Settings.GAME_ATLAS, 'scoreEffSmall0021'));
        this.scoreEffSmall.anchor.set(0.5);
        this.scoreEffSmallAnim = this.scoreEffSmall.animations.add('scoreEffSmall', Phaser.Animation.generateFrameNames('scoreEffSmall', 0, 21, '', 4), 60, false);
        this.scoreEffBig = this.plateContainer.add(this.game.make.sprite(0, -103, src.Settings.GAME_ATLAS, 'scoreEffBig0020'));
        this.scoreEffBig.anchor.set(0.5);
        this.scoreEffBigAnim = this.scoreEffBig.animations.add('scoreEffBig', Phaser.Animation.generateFrameNames('scoreEffBig', 0, 20, '', 4), 60, false);
        this.medal = this.plateContainer.add(new src.MedalEffect(-18, 68));
        this.medal.position.set(-110, -140);
        this.medal.visible = false;
        this.medal.angle = -8;
        /* BUTTONS */

        this.buttonMenu = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseMenu', -80, 178, this.menuClicked, this, 1, 2));
        this.buttonReplay = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseResume', 0, 170, this.replayClicked, this, 1, 2));
        this.buttonBadges = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseBadges', 80, 178, this.badgesClicked, this, 1, 2));
        this.buttonBadgesNew = this.plateContainer.add(src.ButtonUtils.createButton(src.Settings.GAME_ATLAS, 'buttonPauseBadgesNew', 80, 178, this.badgesClicked, this, 1, 2));
        /* HEROES */

        this.heroes = this.plateContainer.add(this.game.make.sprite(0, 55, src.Settings.GAME_ATLAS));
        this.heroes.anchor.set(0.5);
        this.heroes.animations.add('scoreHeroes', Phaser.Animation.generateFrameNames('scoreHeroes', 0, 16, '', 4)).play(45, true);
        this.confetti = this.add(new src.Confetti());
        this.confetti.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2, -15);
      }
    }, {
      key: "show",
      value: function show() {
        _get(_getPrototypeOf(ResultsWindow.prototype), "show", this).call(this);

        src.SoundController.instance.playMusic('MusicPanelResult');
        this.updateData();
        this.animateContent();
      }
    }, {
      key: "updateData",
      value: function updateData() {
        var newBestScoreReached = src.ScoreManager.instance.updateMaxScores(src.ScoreManager.instance.getCurrentScores());
        var newMedalAchieved = src.WindowManager.instance.badges.badgesContainer.hasNewBadges();
        this.scoresValueText.text = '' + src.ScoreManager.instance.getCurrentScores();
        this.bestScoresValueText.text = '' + src.ScoreManager.instance.getMaxScores();
        src.LocalStorageController.instance.save();
        this.buttonBadgesNew.visible = src.WindowManager.instance.badges.badgesContainer.hasNewBadges();
        this.buttonBadges.visible = !this.buttonBadgesNew.visible;

        if (newBestScoreReached) {
          this.game.time.events.add(1600, this.playStampTween, this);
        }

        if (newMedalAchieved) {
          if (newBestScoreReached) {
            this.game.time.events.add(2500, this.playMedalTween, this);
          } else {
            this.game.time.events.add(1800, this.playMedalTween, this);
          }
        }
      }
    }, {
      key: "animateContent",
      value: function animateContent() {
        var _this44 = this;

        this.clearTweens();
        this.plate.frameName = 'resultsPlate' + '0000';
        this.stamp.alpha = 0;
        this.medal.visible = false;
        this.clearTweens();
        this.background.alpha = 0;
        this.game.add.tween(this.background).to({
          alpha: this.backgroundAlpha
        }, 350, Phaser.Easing.Circular.Out, true, 0);
        this.plateContainer.position.set(src.CustomScaleManager.ORIGINAL_WIDTH / 2 + 5, -280);
        this.game.add.tween(this.plateContainer).to({
          y: 240
        }, 1200, this.elasticOut, true, 100);
        this.bestScoresText.scale.set(0);
        this.game.add.tween(this.bestScoresText.scale).to({
          x: 1,
          y: 1
        }, 800, Phaser.Easing.Back.Out, true, 500).onStart.add(function () {
          return _this44.game.time.events.add(70, function () {
            return _this44.scoreEffSmallAnim.restart();
          });
        });
        this.bestScoresValueText.scale.set(0);
        this.game.add.tween(this.bestScoresValueText.scale).to({
          x: 1,
          y: 1
        }, 800, Phaser.Easing.Back.Out, true, 500);
        this.scoresText.scale.set(0);
        this.game.add.tween(this.scoresText.scale).to({
          x: 1,
          y: 1
        }, 800, Phaser.Easing.Back.Out, true, 850);
        this.scoresValueText.scale.set(0);
        this.game.add.tween(this.scoresValueText.scale).to({
          x: 1,
          y: 1
        }, 800, Phaser.Easing.Back.Out, true, 850).onStart.add(function () {
          return _this44.game.time.events.add(70, function () {
            src.SoundController.instance.playSound('SoundPanelResultScore');

            _this44.scoreEffBigAnim.restart();
          });
        });
        this.plateContainer.scale.set(0.6, 1.4);
        this.game.add.tween(this.plateContainer.scale).to({
          x: 1,
          y: 1
        }, 1200, Phaser.Easing.Elastic.Out, true, 100);
      }
    }, {
      key: "clearTweens",
      value: function clearTweens() {
        this.game.tweens.removeFrom(this.background);
        this.game.tweens.removeFrom(this.plateContainer, false);
        this.game.tweens.removeFrom(this.heroes, false);
        this.game.tweens.removeFrom(this.buttonReplay, false);
        this.game.tweens.removeFrom(this.buttonMenu, false);
        this.game.tweens.removeFrom(this.plateContainer, false);
        this.game.tweens.removeFrom(this.stamp, false);
        this.game.tweens.removeFrom(this.stamp.scale, false);
        this.game.tweens.removeFrom(this.plateContainer.scale, false);
      }
    }, {
      key: "playStampTween",
      value: function playStampTween() {
        var _this45 = this;

        src.SoundController.instance.playSound('SoundPanelResultNewRecord');
        this.stamp.scale.set(2);
        this.stamp.alpha = 0.45;
        this.game.add.tween(this.stamp.scale).to({
          x: 1,
          y: 1
        }, 250, Phaser.Easing.Linear.None, true).onComplete.add(function () {
          _this45.confetti.playAnim(0xFFFFFF);

          _this45.plate.frameName = 'resultsPlate' + '0001';

          _this45.plateContainer.scale.set(0.87);

          _this45.game.add.tween(_this45.plateContainer.scale).to({
            x: 1,
            y: 1
          }, 320, Phaser.Easing.Back.Out, true);

          _this45.game.add.tween(_this45.stamp.scale).to({
            x: 1.1,
            y: 1.1
          }, 300, Phaser.Easing.Sinusoidal.Out, true);

          _this45.game.add.tween(_this45.stamp).to({
            alpha: 0
          }, 300, Phaser.Easing.Linear.None, true);
        });
      }
    }, {
      key: "playMedalTween",
      value: function playMedalTween() {
        var _this46 = this;

        var achievedBadgeKey = null;
        src.WindowManager.instance.badges.badgesContainer.badges.forEach(function (badgePanel) {
          var model = src.MedalManager.instance.getMedal(badgePanel.key);

          if (model && model.achieved && badgePanel.recentlyUnlocked) {
            achievedBadgeKey = model.key;
          }
        });

        if (achievedBadgeKey) {
          //     SoundController.instance.playSound('SoundMedalScore');
          //     SoundController.instance.playSound('SoundConfetti');
          this.medal.medal.frameName = 'badge' + achievedBadgeKey + '0000';
          this.medal.visible = true;
          this.game.tweens.removeFrom(this.medal, false);
          this.game.tweens.removeFrom(this.medal.scale, false);
          this.medal.alpha = 0;
          this.medal.scale.set(2.5);
          this.game.add.tween(this.medal).to({
            alpha: 1
          }, 250, Phaser.Easing.Sinusoidal.Out, true);
          this.game.add.tween(this.medal.scale).to({
            x: 0.8,
            y: 0.8
          }, 250, Phaser.Easing.Linear.None, true).onComplete.add(function () {
            _this46.plateContainer.scale.set(0.87);

            _this46.game.add.tween(_this46.plateContainer.scale).to({
              x: 1,
              y: 1
            }, 320, Phaser.Easing.Back.Out, true);

            _this46.game.add.tween(_this46.medal.scale).to({
              x: 0.9,
              y: 0.9
            }, 300, Phaser.Easing.Sinusoidal.Out, true);
          });
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        // SoundController.instance.stopCountingSound();
        this.clearTweens();

        _get(_getPrototypeOf(ResultsWindow.prototype), "hide", this).call(this);
      }
      /**
       * TWEENS
       */

    }, {
      key: "elasticOut",
      value: function elasticOut(k) {
        var s,
            a = 0.1,
            p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;

        if (!a || a < 1) {
          a = 1;
          s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);

        return a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
      }
      /**
       * BUTTON HANDLERS
       */

    }, {
      key: "menuClicked",
      value: function menuClicked() {
        src.TransitionScreen.instance.changeState("MainMenu");
      }
    }, {
      key: "replayClicked",
      value: function replayClicked() {
        src.TransitionScreen.instance.changeState("Level");
      }
    }, {
      key: "badgesClicked",
      value: function badgesClicked() {
        src.WindowManager.instance.showBadges();
      }
    }, {
      key: "submitClicked",
      value: function submitClicked() {// window["submitScoreHandler"](ScoreManager.instance.getMaxScores());
      }
    }]);

    return ResultsWindow;
  }(src.BaseWindow);

  src.ResultsWindow = ResultsWindow;
})(src || (src = {}));

var src;

(function (src) {
  var WindowManager =
  /*#__PURE__*/
  function () {
    function WindowManager() {
      _classCallCheck(this, WindowManager);

      this.isInitialized = false;
    }

    _createClass(WindowManager, [{
      key: "init",
      value: function init() {
        this.credits = new src.CreditsWindow();
        this.pause = new src.PauseWindow();
        this.quitMenu = new src.QuitMenuWindow();
        this.confirmRestart = new src.ConfirmRestartWindow();
        this.help = new src.HelpWindow();
        this.results = new src.ResultsWindow();
        this.badges = new src.BadgesWindow();
        this.isInitialized = true;
      }
    }, {
      key: "resize",
      value: function resize() {
        if (this.isInitialized) {
          this.credits.resize();
          this.pause.resize();
          this.quitMenu.resize();
          this.confirmRestart.resize();
          this.help.resize();
          this.results.resize();
          this.badges.resize();
        }
      }
    }, {
      key: "showCredits",
      value: function showCredits() {
        this.credits.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "showPause",
      value: function showPause() {
        this.pause.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "showQuitMenuWindow",
      value: function showQuitMenuWindow() {
        this.quitMenu.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "showConfirmRestartWindow",
      value: function showConfirmRestartWindow() {
        this.confirmRestart.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "showHelp",
      value: function showHelp(startMusicOnComplete) {
        this.help.startMusicOnComplete = startMusicOnComplete;
        this.help.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "showResults",
      value: function showResults() {
        this.results.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "showBadges",
      value: function showBadges() {
        this.badges.show();
        src.TransitionScreen.instance.getToTop();
      }
    }, {
      key: "hideAll",
      value: function hideAll() {
        this.credits.hide();
        this.pause.hide();
        this.quitMenu.hide();
        this.confirmRestart.hide();
        this.help.hide();
        this.results.hide();
        this.badges.hide();
      }
    }], [{
      key: "instance",
      get: function get() {
        return WindowManager._instance ? WindowManager._instance : WindowManager._instance = new WindowManager();
      }
    }]);

    return WindowManager;
  }();

  WindowManager._instance = null;
  src.WindowManager = WindowManager;
})(src || (src = {}));
//# sourceMappingURL=game.js.map

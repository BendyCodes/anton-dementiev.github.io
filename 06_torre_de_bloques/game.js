"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
      value: function update(newWidth, newHeight) {}
    }, {
      key: "getPixelRatio",
      value: function getPixelRatio() {
        return window.devicePixelRatio || 1;
      }
    }]);

    return CustomScaleManager;
  }();

  CustomScaleManager.ORIGINAL_WIDTH = 809;
  CustomScaleManager.ORIGINAL_HEIGHT = 566;
  CustomScaleManager.WIDTH = 809;
  CustomScaleManager.HEIGHT = 566;
  CustomScaleManager.SCALE_X = 1;
  CustomScaleManager.SCALE_Y = 1;
  CustomScaleManager.ORIGINAL_RATIO = CustomScaleManager.ORIGINAL_WIDTH / CustomScaleManager.ORIGINAL_HEIGHT;
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
        return isIE || isFirefox || isOldIPhone ? Phaser.CANVAS : Phaser.AUTO;
      }
    }]);

    return RenderUtils;
  }();

  src.RenderUtils = RenderUtils;
})(src || (src = {}));

var src;

(function (src) {
  var Level =
  /*#__PURE__*/
  function (_Phaser$Scene) {
    _inherits(Level, _Phaser$Scene);

    function Level() {
      var _this;

      _classCallCheck(this, Level);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Level).apply(this, arguments));
      _this.isStarted = false;
      return _this;
    }

    _createClass(Level, [{
      key: "create",
      value: function create() {
        var _this2 = this;

        this.cameras.main.fadeIn(400, 255, 255, 255);
        this.backgroundManager = new src.BackgroundManager(this);
        this.elephantManager = new src.ElephantManager(this);
        this.pocoyoManager = new src.PocoyoManager(this);
        this.towerManager = new src.TowerManager(this);
        this.foregroundManager = new src.ForegroundManager(this);
        this.uiManager = new src.UIManager(this);
        this.add.existing(this.backgroundManager);
        this.add.existing(this.elephantManager);
        this.add.existing(this.pocoyoManager);
        this.add.existing(this.foregroundManager);
        this.add.existing(this.towerManager);
        this.add.existing(this.uiManager);

        if (Level.FIRST_TIME) {
          Level.FIRST_TIME = false;
          this.uiManager.buttonExit.visible = false;
          src.SoundController.instance.playIntroSound(this, function () {
            _this2.uiManager.buttonExit.visible = true;
            _this2.isStarted = true;

            _this2.uiManager.startNextRound();
          }, this);
        } else {
          this.isStarted = true;
          this.uiManager.startNextRound();
        }
      }
    }, {
      key: "update",
      value: function update(time, elapsed) {
        this.elephantManager.update(elapsed);
      }
    }, {
      key: "showVictory",
      value: function showVictory() {
        this.scene.add('Victory', src.Victory, true);
        this.scene.remove(this.scene.key);
      }
    }, {
      key: "fadeAndRestart",
      value: function fadeAndRestart() {
        var _this3 = this;

        this.cameras.main.fadeOut(800, 255, 255, 255);
        this.time.addEvent({
          delay: 820,
          callback: function callback() {
            return _this3.scene.restart();
          }
        });
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.backgroundManager.destroy();
        this.elephantManager.destroy();
        this.pocoyoManager.destroy();
        this.towerManager.destroy();
        this.foregroundManager.destroy();
        this.uiManager.destroy();
      }
    }]);

    return Level;
  }(Phaser.Scene);

  Level.FIRST_TIME = true;
  src.Level = Level;
})(src || (src = {}));

var src;

(function (src) {
  var Preloader =
  /*#__PURE__*/
  function (_Phaser$Scene2) {
    _inherits(Preloader, _Phaser$Scene2);

    function Preloader() {
      _classCallCheck(this, Preloader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Preloader).apply(this, arguments));
    }

    _createClass(Preloader, [{
      key: "preload",
      value: function preload() {
        this.load.atlas("preloader", "img/preloader.png", "img/preloader.json");
      }
    }, {
      key: "create",
      value: function create() {
        var _this4 = this;

        this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 50, 'preloader', 'preloaderImg10000');
        var preloaderImg2 = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2 - 173 / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 140 - 50, 'preloader', 'preloaderImg20000');
        preloaderImg2.setOrigin(0, 0.5);
        var preloaderImg3 = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2 - 173 / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 140 - 50, 'preloader', 'preloaderImg30000');
        preloaderImg3.setOrigin(0, 0.5);
        preloaderImg3.scaleX = 0;
        var preloaderImg4 = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 190 - 50, 'preloader', 'preloaderImg40000');
        this.tweens.add({
          targets: preloaderImg4,
          duration: 1000,
          repeat: -1,
          angle: 360
        });
        /* create invisible debug text to forse the browser to preload fonts */

        var text = this.add.text(0, -100, 'Phaser text in GROBOLD', {
          fontFamily: src.Settings.FONT_FAMILY,
          fontSize: 42,
          color: '#000000'
        });
        this.load.atlas(src.Settings.GAME_ATLAS, "img/".concat(src.Settings.GAME_ATLAS, ".png"), "img/".concat(src.Settings.GAME_ATLAS, ".json"));
        this.load.json('texts', 'lang/texts.json');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = src.SoundController.instance.getSoundNames()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var soundKey = _step.value;
            this.load.audio(soundKey, ['sound/mp3/' + soundKey + '.mp3', 'sound/ogg/' + soundKey + '.ogg', 'sound/m4a/' + soundKey + '.m4a']);
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

        this.load.on('progress', function (value) {
          preloaderImg3.scaleX = value;
        }, this);
        this.load.on('complete', function () {
          _this4.prepareAnimations();

          _this4.scene.add('MainMenu', src.MainMenu, true);

          _this4.scene.remove(_this4);
        });
        this.load.start();
      }
    }, {
      key: "prepareAnimations",
      value: function prepareAnimations() {
        /* animations */
        this.anims.create({
          key: 'towerDestruction1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'towerDestruction1',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          showOnStart: true
        });
        this.anims.create({
          key: 'towerDestruction2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'towerDestruction2',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          showOnStart: true
        });
        this.anims.create({
          key: 'towerDestruction3',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'towerDestruction3',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          showOnStart: true
        });
        this.anims.create({
          key: 'elephantWalkingForward',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'elephant',
            start: 0,
            end: 22,
            zeroPad: 4
          }),
          showOnStart: true
        });
        this.anims.create({
          key: 'elephantWalkingBackward',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'elephant',
            start: 147,
            end: 181,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'elephantPrepareSneezing1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'elephant',
            start: 23,
            end: 34,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'elephantPrepareSneezing2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'elephant',
            start: 47,
            end: 68,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'elephantPrepareSneezing3',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'elephant',
            start: 80,
            end: 117,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'elephantSneezing',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'elephant',
            start: 121,
            end: 146,
            zeroPad: 4
          })
        });
        /* pocoyo anims */

        this.anims.create({
          key: 'pocoyoWaiting',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoWaiting',
            start: 0,
            end: 0,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoWaitingA',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockFinishA',
            start: 11,
            end: 11,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoWaitingB',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockFinishB',
            start: 8,
            end: 8,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoWaitingC',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockFinishC',
            start: 6,
            end: 6,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoWalkingForward',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoWalkingForward',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          repeat: -1
        });
        this.anims.create({
          key: 'pocoyoTakeBlock0',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoTakeBlock0',
            start: 0,
            end: 11,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoTakeBlock1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoTakeBlock1',
            start: 0,
            end: 11,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoTakeBlock2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoTakeBlock2',
            start: 0,
            end: 11,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoReturn0',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoReturn0',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          repeat: -1
        });
        this.anims.create({
          key: 'pocoyoReturn1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoReturn1',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          repeat: -1
        });
        this.anims.create({
          key: 'pocoyoReturn2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoReturn2',
            start: 0,
            end: 7,
            zeroPad: 4
          }),
          repeat: -1
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockA0',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockA0',
            start: 0,
            end: 5,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockA1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockA1',
            start: 0,
            end: 5,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockA2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockA2',
            start: 0,
            end: 5,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockFinishA',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockFinishA',
            start: 0,
            end: 11,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockB0',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockB0',
            start: 0,
            end: 3,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockB1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockB1',
            start: 0,
            end: 3,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockB2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockB2',
            start: 0,
            end: 3,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockFinishB',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockFinishB',
            start: 0,
            end: 8,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockC0',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockC0',
            start: 0,
            end: 4,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockC1',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockC1',
            start: 0,
            end: 4,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockC2',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockC2',
            start: 0,
            end: 4,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoPlaceBlockFinishC',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoPlaceBlockFinishC',
            start: 0,
            end: 6,
            zeroPad: 4
          })
        });
        this.anims.create({
          key: 'pocoyoSmile',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'pocoyoSmile',
            start: 0,
            end: 6,
            zeroPad: 4
          }),
          showOnStart: true
        });
      }
    }]);

    return Preloader;
  }(Phaser.Scene);

  src.Preloader = Preloader;
})(src || (src = {})); ///<reference path="scale/CustomScaleManager.ts"/>
///<reference path="utils/RenderUtils.ts"/>
///<reference path="scenes/Level.ts"/>
///<reference path="scenes/Preloader.ts"/>


var src;

(function (src) {
  var App =
  /*#__PURE__*/
  function (_Phaser$Game) {
    _inherits(App, _Phaser$Game);

    function App() {
      var _this5;

      _classCallCheck(this, App);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, App.gameConfig));
      App.instance = _assertThisInitialized(_assertThisInitialized(_this5));

      _this5.scene.add('Preloader', src.Preloader, true);

      return _this5;
    }

    return App;
  }(Phaser.Game);

  App.CANVAS_WIDTH = 809;
  App.CANVAS_HEIGHT = 566;
  App.gameConfig = {
    type: src.RenderUtils.detectRenderMode(),
    width: src.CustomScaleManager.ORIGINAL_WIDTH,
    height: src.CustomScaleManager.ORIGINAL_HEIGHT,
    transparent: true
  };
  src.App = App;
})(src || (src = {}));

function checkOrientationChanging(heightGreeterAsWidth) {
  if (isCorrectOrientation == !heightGreeterAsWidth || prevWindowOrientation == undefined) return;
  prevWindowOrientation = window['orientation'];
  isCorrectOrientation = !heightGreeterAsWidth;

  if (isCorrectOrientation) {
    game.canvas.style.display = "block";
    document.getElementById("orientationDiv").style.display = "none";
  } else {
    game.canvas.style.display = "none";
    document.getElementById("orientationDiv").style.display = "block";
    document.body.style.marginBottom = "0px";
  }
}

function resizeCanvas() {
  var w = window.innerWidth;
  var h = window.innerHeight; // stage dimensions

  var ow = src.App.CANVAS_WIDTH;
  var oh = src.App.CANVAS_HEIGHT;
  var scale = Math.min(w / ow, h / oh);
  checkOrientationChanging(h > w); // adjust canvas size

  var canvas = game.canvas;
  canvas.style.width = ow * scale + 'px';
  canvas.style.height = oh * scale + 'px';
  canvas.style.marginBottom = canvas.style.marginTop = (h - oh * scale) / 2 + 'px';
  canvas.style.marginRight = canvas.style.marginLeft = (w - ow * scale) / 2 + 'px';
}

var game;
var isCorrectOrientation = true;
var prevWindowOrientation;

window.onload = function () {
  prevWindowOrientation = window['orientation'];
  game = new src.App();
  resizeCanvas();

  (function requestResizeCanvas() {
    window.requestAnimationFrame(requestResizeCanvas);
    resizeCanvas();
  })();
};

var src;

(function (src) {
  var Settings = function Settings() {
    _classCallCheck(this, Settings);
  }; //FONTS


  Settings.FONT_FAMILY = 'Open Sans'; //SCALING

  Settings.USE_HIGH_RESOLUTION_SCALING = true;
  Settings.PIXEL_RATIO_MAX_THRESHOLD = 3; //BLOCKS

  Settings.TOTAL_BLOCKS = 17; //WINDOWS

  Settings.WINDOW_BACKGROUND_ALPHA = 0.8; //ATLASES

  Settings.GAME_ATLAS = 'graphics'; //SETTINGS

  Settings.DISPLAY_FPS = true;
  Settings.MUSIC_ENABLED_BY_DEFAULT = false;
  Settings.LOCAL_STORAGE_KEY = 'Torre_de_Bloques';
  src.Settings = Settings;
})(src || (src = {}));

var src;

(function (src) {
  var AbstractManager =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C) {
    _inherits(AbstractManager, _Phaser$GameObjects$C);

    function AbstractManager(level) {
      var _this6;

      _classCallCheck(this, AbstractManager);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractManager).call(this, level));
      _this6.level = level;
      return _this6;
    }

    _createClass(AbstractManager, [{
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(AbstractManager.prototype), "destroy", this).call(this);

        this.level = null;
      }
    }]);

    return AbstractManager;
  }(Phaser.GameObjects.Container);

  src.AbstractManager = AbstractManager;
})(src || (src = {}));

var src;

(function (src) {
  var BackgroundManager =
  /*#__PURE__*/
  function (_src$AbstractManager) {
    _inherits(BackgroundManager, _src$AbstractManager);

    function BackgroundManager(level) {
      var _this7;

      _classCallCheck(this, BackgroundManager);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(BackgroundManager).call(this, level));

      _this7.buildDecorations();

      return _this7;
    }

    _createClass(BackgroundManager, [{
      key: "buildDecorations",
      value: function buildDecorations() {
        this.decorations = this.level.add.sprite(562, 299, src.Settings.GAME_ATLAS, 'decorations10000').setOrigin(0.5);
        this.add(this.decorations);
      }
    }]);

    return BackgroundManager;
  }(src.AbstractManager);

  src.BackgroundManager = BackgroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var ElephantManager =
  /*#__PURE__*/
  function (_src$AbstractManager2) {
    _inherits(ElephantManager, _src$AbstractManager2);

    function ElephantManager(level) {
      var _this8;

      _classCallCheck(this, ElephantManager);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(ElephantManager).call(this, level));
      _this8.towerHeightFactor = 1;
      _this8.sneezeAttempts = 3;
      _this8.sneezingCancelled = false;
      _this8.elephantComingCountdown = 10000;
      _this8.isStarted = false;

      _this8.buildContent();

      _this8.visible = false;
      _this8.isStarted = false;
      return _this8;
    }

    _createClass(ElephantManager, [{
      key: "start",
      value: function start(towerHeightFactor) {
        var _this9 = this;

        this.isStarted = true;
        this.visible = true;
        this.sneezingCancelled = false;
        this.towerHeightFactor = towerHeightFactor;
        this.sneezeAttempts = 4 - towerHeightFactor;
        this.elephant.on("animationcomplete", this.handleAnimationComplete, this);
        this.elephant.anims.play('elephantWalkingForward');
        this.level.uiManager.hideControls();
        src.SoundController.instance.playSound('elephantCome', this.scene);
        this.scene.time.addEvent({
          delay: 150,
          callback: function callback() {
            return src.SoundController.instance.playSound('elephantStep', _this9.scene);
          }
        });
        this.scene.time.addEvent({
          delay: 600,
          callback: function callback() {
            return src.SoundController.instance.playSound('elephantStep', _this9.scene);
          }
        });
        this.scene.time.addEvent({
          delay: 1050,
          callback: function callback() {
            return src.SoundController.instance.playSound('elephantStep', _this9.scene);
          }
        });
      }
    }, {
      key: "forceStart",
      value: function forceStart() {
        this.start(1);
      }
    }, {
      key: "finish",
      value: function finish() {
        this.isStarted = false;
        this.visible = false;
        this.sneezingCancelled = false;

        if (this.destroyTowerEvent) {
          this.destroyTowerEvent.destroy();
        }

        this.destroyTowerEvent = null;
        this.elephant.off("animationcomplete", this.handleAnimationComplete, this, false);
        this.elephant.anims.stop();
        this.level.uiManager.showControls();
      }
    }, {
      key: "update",
      value: function update(elapsed) {
        _get(_getPrototypeOf(ElephantManager.prototype), "update", this).call(this);

        if (!this.isStarted && this.level.isStarted) {
          this.elephantComingCountdown -= elapsed;

          if (this.elephantComingCountdown < 0 && this.level.pocoyoManager.getCurrentAnimationKey() === 'pocoyoWaiting') {
            this.start(this.level.towerManager.getTowerSizeKey());
            this.elephantComingCountdown = 13000 - this.level.towerManager.numBlocks * 250;
          }
        }
      }
    }, {
      key: "handleAnimationComplete",
      value: function handleAnimationComplete(animation) {
        if (animation.key === 'elephantWalkingForward') {
          this.prepareSneezing();
        } else if (animation.key.indexOf('elephantPrepareSneezing') != -1 && !this.sneezingCancelled) {
          this.sneeze();
        } else if (animation.key === 'elephantSneezing' && !this.sneezingCancelled) {
          this.sneezingFinished();
        } else if (animation.key === 'elephantWalkingBackward') {
          this.finish();
        }
      }
    }, {
      key: "handleElephantClicked",
      value: function handleElephantClicked() {
        var _this10 = this;

        this.sneezingCancelled = true;
        this.inputCatcher.off("pointerdown", this.handleElephantClicked, this, false);
        this.elephant.anims.play('elephantWalkingBackward');
        this.scene.time.addEvent({
          delay: 150,
          callback: function callback() {
            return src.SoundController.instance.playSound('elephantStep', _this10.scene);
          }
        });
        this.scene.time.addEvent({
          delay: 600,
          callback: function callback() {
            return src.SoundController.instance.playSound('elephantStep', _this10.scene);
          }
        });
        this.scene.time.addEvent({
          delay: 1050,
          callback: function callback() {
            return src.SoundController.instance.playSound('elephantStep', _this10.scene);
          }
        });

        if (this.destroyTowerEvent) {
          this.destroyTowerEvent.destroy();
        }

        this.destroyTowerEvent = null;
      }
    }, {
      key: "buildContent",
      value: function buildContent() {
        this.inputCatcher = this.scene.add.sprite(245, 260, src.Settings.GAME_ATLAS, 'transitionSquare0000').setSize(118, 172).setOrigin(0.5).setAlpha(0.01).setInteractive();
        this.add(this.inputCatcher);
        this.elephant = this.scene.add.sprite(77, 260, src.Settings.GAME_ATLAS, 'elephant0000').setOrigin(0.5);
        this.add(this.elephant);
      }
      /**
       * ACTIONS
       */

    }, {
      key: "prepareSneezing",
      value: function prepareSneezing() {
        if (this.level.towerManager.numBlocks < src.Settings.TOTAL_BLOCKS) {
          this.inputCatcher.on("pointerdown", this.handleElephantClicked, this);
        }

        this.elephant.anims.play('elephantPrepareSneezing' + this.sneezeAttempts);
      }
    }, {
      key: "sneeze",
      value: function sneeze() {
        var _this11 = this;

        src.SoundController.instance.playSound('sneeze', this.scene);
        this.inputCatcher.off("pointerdown", this.handleElephantClicked, this, false);
        this.elephant.anims.play('elephantSneezing');
        this.destroyTowerEvent = this.scene.time.addEvent({
          delay: 3 / 24 * 1000,
          callback: function callback() {
            if (!_this11.sneezingCancelled) {
              _this11.level.towerManager.destroyTower();
            }
          }
        });
      }
    }, {
      key: "sneezingFinished",
      value: function sneezingFinished() {
        var _this12 = this;

        if (this.level.towerManager.numBlocks < src.Settings.TOTAL_BLOCKS) {
          this.level.uiManager.showMessageText();
          this.scene.time.addEvent({
            delay: 1400,
            callback: function callback() {
              return _this12.level.fadeAndRestart();
            }
          });
        } else {
          this.scene.time.addEvent({
            delay: 1000,
            callback: function callback() {
              return _this12.level.showVictory();
            }
          });
        }
      }
    }]);

    return ElephantManager;
  }(src.AbstractManager);

  src.ElephantManager = ElephantManager;
})(src || (src = {}));

var src;

(function (src) {
  var TowerManager =
  /*#__PURE__*/
  function (_src$AbstractManager3) {
    _inherits(TowerManager, _src$AbstractManager3);

    function TowerManager(level) {
      var _this13;

      _classCallCheck(this, TowerManager);

      _this13 = _possibleConstructorReturn(this, _getPrototypeOf(TowerManager).call(this, level));
      _this13.firstBlockColor = 1;
      _this13.numBlocks = 0;
      _this13.blocksPositions = [[], [[10, -67], [5, -82.5], [18.3, -83.3], [8.8, -98.6], [9, -112], [15.5, -125.5], [4.2, -132.5], [16, -142], [2.6, -155], [16.4, -164], [6, -177.25], [22, -184], [2.5, -200], [22.5, -197.5], [15.8, -213.7], [29.3, -214], [20.4, -229]], [[-3.3, -61.5], [-8.5, -77.5], [4, -77.3], [-4.6, -93], [-3.5, -106.3], [2, -113], [-9.2, -126.7], [1.75, -129], [-3.5, -147], [-0.6, -160], [-10.7, -167], [3.5, -179.5], [-15.1, -189.4], [-2.3, -193.3], [-9.7, -209.2], [3.2, -209], [-4.6, -223.5]]];
      _this13.towerId = TowerManager.CURRENT_TOWER_VIEW++ % 2 + 1;
      _this13.animKey = 'tower' + _this13.towerId;

      _this13.buildContent();

      _this13.setBlocks(0);

      return _this13;
    }

    _createClass(TowerManager, [{
      key: "getTowerSizeKey",
      value: function getTowerSizeKey() {
        if (this.numBlocks < 4) {
          return 1;
        } else if (this.numBlocks < 8) {
          return 2;
        } else {
          return 3;
        }
      }
    }, {
      key: "getNextBlockColor",
      value: function getNextBlockColor() {
        if (this.blocks[this.numBlocks - 1]) {
          return (this.blocks[this.numBlocks - 1].getColor() + 1) % 3;
        } else {
          this.firstBlockColor = Math.floor(Math.random() * 3);
          return this.firstBlockColor;
        }
      }
    }, {
      key: "putBlock",
      value: function putBlock(color) {
        this.numBlocks += 1;
        this.setBlocks(this.numBlocks);
        this.blocks[this.numBlocks - 1].setColor(color);
        this.level.uiManager.setNumBlocksText("".concat(this.numBlocks));

        if (this.numBlocks >= src.Settings.TOTAL_BLOCKS) {
          console.log('Game completed!');
        }
      }
    }, {
      key: "destroyTower",
      value: function destroyTower() {
        this.towerContainer.visible = false;
        this.towerDestruction.play('towerDestruction' + this.getTowerSizeKey());
        this.towerDestruction.on("animationcomplete", this.handleTowerDestroyed, this);
      }
      /**
       * PROTECTED
       */

    }, {
      key: "buildContent",
      value: function buildContent() {
        this.towerContainer = this.scene.add.container(390, 370);
        this.add(this.towerContainer);
        this.towerBase = this.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'towerBase' + this.towerId + '0000').setOrigin(0.5, 1);
        this.towerContainer.add(this.towerBase);
        this.buildBlocks();
        this.towerDestruction = this.scene.add.sprite(390, 380, src.Settings.GAME_ATLAS).setOrigin(0.15, 1);
        this.add(this.towerDestruction);
        this.towerDestruction.visible = false;
      }
    }, {
      key: "buildBlocks",
      value: function buildBlocks() {
        this.blocks = [];

        for (var i = 1; i < src.Settings.TOTAL_BLOCKS + 1; i++) {
          var b = new src.Block(this.level, this.blocksPositions[this.towerId][i - 1][0], this.blocksPositions[this.towerId][i - 1][1], i, this.towerId, Math.floor(Math.random() * 3));
          this.blocks.push(b);
          this.towerContainer.add(b);
        }
      }
    }, {
      key: "setBlocks",
      value: function setBlocks(value) {
        this.blocks.forEach(function (block, index) {
          return block.visible = index <= value - 1;
        });
      }
    }, {
      key: "handleTowerDestroyed",
      value: function handleTowerDestroyed() {
        console.log('Tower Destroyed!');
        this.towerDestruction.off("animationcomplete", this.handleTowerDestroyed, this, false);
        this.level.pocoyoManager.startLaughing();
      }
    }]);

    return TowerManager;
  }(src.AbstractManager);

  TowerManager.CURRENT_TOWER_VIEW = 0;
  src.TowerManager = TowerManager;
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

      _this14.buildDecorations();

      _this14.hideControls();

      return _this14;
    }

    _createClass(UIManager, [{
      key: "showControls",
      value: function showControls() {
        this.colorIndicator.visible = true;
        this.buttonOrange.visible = true;
        this.buttonBlue.visible = true;
        this.buttonYellow.visible = true;
      }
    }, {
      key: "hideControls",
      value: function hideControls() {
        this.colorIndicator.visible = false;
        this.buttonOrange.visible = false;
        this.buttonBlue.visible = false;
        this.buttonYellow.visible = false;
      }
    }, {
      key: "setNumBlocksText",
      value: function setNumBlocksText(value) {
        this.scoreText.text = value;
      }
    }, {
      key: "setNextColor",
      value: function setNextColor(color) {
        this.nextColor = color;
        this.colorIndicator.setFrame('colorSelector000' + this.nextColor);
      }
    }, {
      key: "startNextRound",
      value: function startNextRound() {
        this.setNextColor(this.level.towerManager.getNextBlockColor());
        this.showControls();
      }
      /**
       * PROTECTED
       */

    }, {
      key: "buildDecorations",
      value: function buildDecorations() {
        this.buttonExit = src.ButtonFactory.makeButton(this.scene, 705, 484, src.Settings.GAME_ATLAS, 'buttonExit0000', 'buttonExit0001', 'buttonExit0000', this.exitClicked, this);
        this.add(this.buttonExit);
        this.scorePlate = this.scene.add.sprite(680, 56, src.Settings.GAME_ATLAS, 'scorePlate0000').setOrigin(0.5);
        this.add(this.scorePlate);
        this.blocksText = this.scene.add.text(662, 74, src.LocalizationManager.getLocaleText('blocks'), {
          fontFamily: src.Settings.FONT_FAMILY,
          fontSize: 16,
          color: '#ffffff'
        }).setOrigin(0.5);
        this.add(this.blocksText);
        this.scoreText = this.scene.add.text(764, 64, '0', {
          fontFamily: src.Settings.FONT_FAMILY,
          fontSize: 24,
          color: '#666666'
        }).setOrigin(0.5);
        this.add(this.scoreText);
        this.messageText = this.scene.add.text(400, 175, src.LocalizationManager.getLocaleText('ellySneezed'), {
          fontFamily: src.Settings.FONT_FAMILY,
          fontSize: 15,
          color: '#1189cc',
          align: 'center'
        }).setOrigin(0.5);
        this.add(this.messageText);
        this.colorIndicator = this.scene.add.sprite(404, 66, src.Settings.GAME_ATLAS, 'colorSelector0000').setOrigin(0.5);
        this.add(this.colorIndicator);
        this.buttonOrange = src.ButtonFactory.makeButton(this.scene, 300, 446, src.Settings.GAME_ATLAS, 'shapeOrange0000', 'shapeOrange0000', 'shapeOrange0000', this.orangeSelected, this, false);
        this.add(this.buttonOrange);
        this.buttonBlue = src.ButtonFactory.makeButton(this.scene, 404, 452, src.Settings.GAME_ATLAS, 'shapeBlue0000', 'shapeBlue0000', 'shapeBlue0000', this.blueSelected, this, false);
        this.add(this.buttonBlue);
        this.buttonYellow = src.ButtonFactory.makeButton(this.scene, 508, 446, src.Settings.GAME_ATLAS, 'shapeYellow0000', 'shapeYellow0000', 'shapeYellow0000', this.yellowSelected, this, false);
        this.add(this.buttonYellow);
        this.messageText.visible = false;
      }
    }, {
      key: "showMessageText",
      value: function showMessageText() {
        this.messageText.visible = true;
      }
      /**
       * ACTION LISTENERS
       */

    }, {
      key: "exitClicked",
      value: function exitClicked() {
        var _this15 = this;

        this.scene.input.enabled = false;
        this.scene.scene.pause('Level');
        game.scene.add('PauseScene', src.PauseScene, true, {
          onContinueClick: function onContinueClick() {
            _this15.scene.input.enabled = true;

            _this15.scene.scene.resume('Level');
          }
        }); //
        // this.scene.scene.remove(this.scene.scene.key);
        // this.scene.scene.add('MainMenu', MainMenu, true);
      }
    }, {
      key: "orangeSelected",
      value: function orangeSelected() {
        if (this.nextColor === 0) {
          this.level.pocoyoManager.takeBlock(0);
        } else {
          src.SoundController.instance.debounceSound('error', this.scene, 1, 0.7);
        }
      }
    }, {
      key: "blueSelected",
      value: function blueSelected() {
        if (this.nextColor === 1) {
          this.level.pocoyoManager.takeBlock(1);
        } else {
          src.SoundController.instance.debounceSound('error', this.scene, 1, 0.7);
        }
      }
    }, {
      key: "yellowSelected",
      value: function yellowSelected() {
        if (this.nextColor === 2) {
          this.level.pocoyoManager.takeBlock(2);
        } else {
          src.SoundController.instance.debounceSound('error', this.scene, 1, 0.7);
        }
      }
    }]);

    return UIManager;
  }(src.AbstractManager);

  src.UIManager = UIManager;
})(src || (src = {}));

var src;

(function (src) {
  var Block =
  /*#__PURE__*/
  function (_Phaser$GameObjects$S) {
    _inherits(Block, _Phaser$GameObjects$S);

    function Block(level, x, y, blockId, towerId, color) {
      var _this16;

      _classCallCheck(this, Block);

      _this16 = _possibleConstructorReturn(this, _getPrototypeOf(Block).call(this, level, x, y, src.Settings.GAME_ATLAS));

      _this16.setOrigin(0.5);

      _this16.blockId = blockId;
      _this16.towerId = towerId;

      _this16.setColor(color);

      return _this16;
    }

    _createClass(Block, [{
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        this.setFrame(this.getFrameName());
      }
    }, {
      key: "getColor",
      value: function getColor() {
        return this.color;
      }
    }, {
      key: "getFrameName",
      value: function getFrameName() {
        return this.scene.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
          prefix: "block".concat(this.towerId, "_").concat(this.blockId),
          start: this.color,
          end: this.color,
          zeroPad: 4
        })[0].frame;
      }
    }]);

    return Block;
  }(Phaser.GameObjects.Sprite);

  src.Block = Block;
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
      key: "getLocaleText",
      value: function getLocaleText(key) {
        var textData = src.App.instance.cache.json.get('texts')[language];
        return textData && textData.hasOwnProperty(key) ? textData[key] : "";
      }
    }]);

    return LocalizationManager;
  }();

  src.LocalizationManager = LocalizationManager;
})(src || (src = {}));

var src;

(function (src) {
  var MainMenu =
  /*#__PURE__*/
  function (_Phaser$Scene3) {
    _inherits(MainMenu, _Phaser$Scene3);

    function MainMenu() {
      _classCallCheck(this, MainMenu);

      return _possibleConstructorReturn(this, _getPrototypeOf(MainMenu).apply(this, arguments));
    }

    _createClass(MainMenu, [{
      key: "create",
      value: function create() {
        src.SoundController.instance.startMainMenuMusic(this);
        this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        this.headingText = this.add.text(0, -160, src.LocalizationManager.getLocaleText('title'), {
          fontFamily: src.Settings.FONT_FAMILY,
          fontSize: 33,
          color: '#1189cc'
        }).setOrigin(0.5);
        this.container.add(this.headingText);
        this.logoImage = this.add.sprite(0, 45, src.Settings.GAME_ATLAS, 'mainMenuLogo0000').setOrigin(0.5);
        this.container.add(this.logoImage);
        this.playButton = src.ButtonFactory.makeButton(this, 300, 200, src.Settings.GAME_ATLAS, 'buttonPlay0000', 'buttonPlay0001', 'buttonPlay0000', this.playClicked, this);
        this.container.add(this.playButton);
        this.exitButton = src.ButtonFactory.makeButton(this, -300, 200, src.Settings.GAME_ATLAS, 'buttonExit0000', 'buttonExit0001', 'buttonExit0000', this.exitClicked, this);
        this.container.add(this.exitButton);
      }
      /**
       * LISTENERS
       */

    }, {
      key: "playClicked",
      value: function playClicked() {
        src.SoundController.instance.stopMainMenuMusic();
        this.scene.remove(this.scene.key);
        this.scene.add('Level', src.Level, true);
      }
    }, {
      key: "exitClicked",
      value: function exitClicked() {
        src.SoundController.instance.stopMainMenuMusic();
        this.scene.remove(this.scene.key);
        game.scene.add('ContinueGameScene', src.ContinueGameScene, true, {
          onContinueClick: function onContinueClick() {
            game.scene.add('MainMenu', MainMenu, true);
          }
        });
      }
      /**
       * INHERITED
       */

    }, {
      key: "update",
      value: function update() {}
    }, {
      key: "shutdown",
      value: function shutdown() {
        console.log("Main Menu::shutdown");
      }
    }]);

    return MainMenu;
  }(Phaser.Scene);

  src.MainMenu = MainMenu;
})(src || (src = {}));

var src;

(function (src) {
  var ButtonFactory =
  /*#__PURE__*/
  function () {
    function ButtonFactory() {
      _classCallCheck(this, ButtonFactory);
    }

    _createClass(ButtonFactory, null, [{
      key: "makeButton",
      value: function makeButton(scene, x, y, atlasName, defaultFrame, overFrame, downFrame, listener, listenerContext) {
        var enableSound = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
        var button = scene.add.sprite(x, y, atlasName, defaultFrame).setInteractive();
        button.setOrigin(0.5);
        button.on('pointerover', function () {
          if (enableSound) src.SoundController.instance.playSound('buttonOver', scene);
          button.setFrame(overFrame);
        });
        button.on('pointerout', function () {
          return button.setFrame(defaultFrame);
        });
        button.on('pointerdown', listener, listenerContext);
        button.on('pointerdown', function () {
          return button.setFrame(downFrame);
        });
        button.on('pointerup', function () {
          return button.setFrame(overFrame);
        });
        return button;
      }
    }]);

    return ButtonFactory;
  }();

  src.ButtonFactory = ButtonFactory;
})(src || (src = {}));

var src;

(function (src) {
  var ForegroundManager =
  /*#__PURE__*/
  function (_src$AbstractManager5) {
    _inherits(ForegroundManager, _src$AbstractManager5);

    function ForegroundManager(level) {
      var _this17;

      _classCallCheck(this, ForegroundManager);

      _this17 = _possibleConstructorReturn(this, _getPrototypeOf(ForegroundManager).call(this, level));

      _this17.buildDecorations();

      return _this17;
    }

    _createClass(ForegroundManager, [{
      key: "buildDecorations",
      value: function buildDecorations() {
        this.decorations = this.level.add.sprite(578, 336, src.Settings.GAME_ATLAS, 'decorations20000').setOrigin(0.5);
        this.add(this.decorations);
      }
    }]);

    return ForegroundManager;
  }(src.AbstractManager);

  src.ForegroundManager = ForegroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var PocoyoManager =
  /*#__PURE__*/
  function (_src$AbstractManager6) {
    _inherits(PocoyoManager, _src$AbstractManager6);

    function PocoyoManager(level) {
      var _this18;

      _classCallCheck(this, PocoyoManager);

      _this18 = _possibleConstructorReturn(this, _getPrototypeOf(PocoyoManager).call(this, level));
      _this18.towerHeightKey = 1;

      _this18.buildPocoyo();

      return _this18;
    }
    /**
     * PUBLIC
     */


    _createClass(PocoyoManager, [{
      key: "takeBlock",
      value: function takeBlock(color) {
        var _this19 = this;

        this.level.uiManager.hideControls();
        this.blockColor = color;
        this.towerHeightKey = this.level.towerManager.getTowerSizeKey();
        this.pocoyo.play('pocoyoWalkingForward');
        this.scene.tweens.add({
          targets: this.pocoyo,
          x: 542,
          ease: 'Linear',
          duration: 690,
          onComplete: function onComplete() {
            return _this19.startTakingBlock();
          }
        });
      }
    }, {
      key: "getCurrentAnimationKey",
      value: function getCurrentAnimationKey() {
        return this.pocoyo.anims.currentAnim.key;
      }
      /**
       * PROTECTED
       */

    }, {
      key: "buildPocoyo",
      value: function buildPocoyo() {
        this.pocoyo = this.scene.add.sprite(446, 354, src.Settings.GAME_ATLAS).setOrigin(0.5, 1);
        this.add(this.pocoyo);
        this.pocoyoSmile = this.scene.add.sprite(449, 354 - 65, src.Settings.GAME_ATLAS).setOrigin(0.5, 0.5);
        this.add(this.pocoyoSmile);
        this.pocoyoSmile.visible = false;
        this.pocoyo.on("animationcomplete", this.handleAnimationComplete, this);
        this.pocoyo.play('pocoyoWaiting');
      }
    }, {
      key: "handleAnimationComplete",
      value: function handleAnimationComplete(animation) {
        if (animation.key.indexOf('pocoyoTakeBlock') != -1) {
          this.returnBack();
        } else if (animation.key.indexOf('pocoyoPlaceBlock') != -1 && animation.key.indexOf('pocoyoPlaceBlockFinish') == -1) {
          this.putBlock();
        } else if (animation.key.indexOf('pocoyoPlaceBlockFinish') != -1) {
          this.startNextRound();
        }
      }
    }, {
      key: "getTowerAnimKey",
      value: function getTowerAnimKey() {
        switch (this.towerHeightKey) {
          case 1:
            return 'A';

          case 2:
            return 'B';

          case 3:
            return 'C';
        }
      }
      /**
       * ACTIONS
       */

    }, {
      key: "startTakingBlock",
      value: function startTakingBlock() {
        this.pocoyo.play('pocoyoTakeBlock' + this.blockColor);
      }
    }, {
      key: "returnBack",
      value: function returnBack() {
        var _this20 = this;

        this.pocoyo.play('pocoyoReturn' + this.blockColor);
        this.scene.tweens.add({
          targets: this.pocoyo,
          x: 446,
          ease: 'Linear',
          duration: 690,
          onComplete: function onComplete() {
            return _this20.jump();
          }
        });
      }
    }, {
      key: "jump",
      value: function jump() {
        this.pocoyo.play('pocoyoPlaceBlock' + this.getTowerAnimKey() + this.blockColor);
      }
    }, {
      key: "putBlock",
      value: function putBlock() {
        this.level.towerManager.putBlock(this.blockColor);
        this.pocoyo.play('pocoyoPlaceBlockFinish' + this.getTowerAnimKey());
        src.SoundController.instance.playSound('putBlock', this.scene);
      }
    }, {
      key: "startNextRound",
      value: function startNextRound() {
        this.pocoyo.play('pocoyoWaiting');
        this.level.uiManager.startNextRound();

        if (this.level.towerManager.numBlocks >= src.Settings.TOTAL_BLOCKS) {
          this.level.elephantManager.forceStart();
        }
      }
    }, {
      key: "startLaughing",
      value: function startLaughing() {
        src.SoundController.instance.playSound('laugh', this.scene);
        this.pocoyoSmile.play('pocoyoSmile');
      }
    }]);

    return PocoyoManager;
  }(src.AbstractManager);

  src.PocoyoManager = PocoyoManager;
})(src || (src = {}));

var src;

(function (src) {
  var SoundController =
  /*#__PURE__*/
  function () {
    function SoundController() {
      _classCallCheck(this, SoundController);

      this.defaultMusicVolume = 0.8;
      this.chokedMusicVolume = 0.1;
      this.hadBeenMutedBeforePauseTriggered = false;
      this.soundInstances = {};
      this.debouncedSoundsTimestamps = new Map();
      this.soundNames = ['buttonOver', 'click', 'elephantCome', 'elephantStep', 'error', 'intro_' + language, 'laugh', 'mainMenuTheme', 'pickupBlock', 'putBlock', 'sneeze', 'victoryTheme'];
    }

    _createClass(SoundController, [{
      key: "getSoundNames",
      value: function getSoundNames() {
        return this.soundNames;
      }
    }, {
      key: "playIntroSound",
      value: function playIntroSound(scene, callback, callbackContext) {
        var sound = scene.sound.add('intro_' + language, {
          volume: 1,
          loop: false
        });
        sound.play();
        scene.time.addEvent({
          delay: sound.duration * 1000,
          callback: callback,
          callbackScope: callbackContext
        });
      }
    }, {
      key: "startMainMenuMusic",
      value: function startMainMenuMusic(scene) {
        var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (!this.mainMenuMusic) {
          this.mainMenuMusic = scene.sound.add('mainMenuTheme', {
            volume: volume,
            loop: true
          });
        }

        this.mainMenuMusic.play();
      }
    }, {
      key: "stopMainMenuMusic",
      value: function stopMainMenuMusic() {
        if (this.mainMenuMusic) {
          this.mainMenuMusic.stop();
        }
      }
    }, {
      key: "startVictoryMusic",
      value: function startVictoryMusic(scene) {
        var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (!this.victoryTheme) {
          this.victoryTheme = scene.sound.add('victoryTheme', {
            volume: volume,
            loop: false
          });
        }

        this.victoryTheme.play();
      }
    }, {
      key: "stopVictoryMusic",
      value: function stopVictoryMusic() {
        if (this.victoryTheme && this.victoryTheme.isPlaying) {
          this.victoryTheme.stop();
        }
      }
    }, {
      key: "playSound",
      value: function playSound(key, scene) {
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var delay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        scene.sound.add(key, {
          volume: volume,
          loop: loop,
          delay: delay
        }).play();
      }
    }, {
      key: "debounceSound",
      value: function debounceSound(key, scene) {
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var durationModifier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var nextTimestamp = this.debouncedSoundsTimestamps.get(key) || 0;

        if (scene.time.now < nextTimestamp) {// console.log('Debouncing sound "'+key+'": still playing...');
        } else {
          var sound = scene.sound.add(key, {
            volume: volume,
            loop: false
          });
          sound.play();
          this.debouncedSoundsTimestamps.set(key, scene.time.now + sound.duration * durationModifier * 1000);
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
  var Victory =
  /*#__PURE__*/
  function (_Phaser$Scene4) {
    _inherits(Victory, _Phaser$Scene4);

    function Victory() {
      _classCallCheck(this, Victory);

      return _possibleConstructorReturn(this, _getPrototypeOf(Victory).apply(this, arguments));
    }

    _createClass(Victory, [{
      key: "create",
      value: function create() {
        src.SoundController.instance.startVictoryMusic(this);
        this.plate = this.add.sprite(420, 303, src.Settings.GAME_ATLAS, 'victory0000').setOrigin(0.5);
        this.headingText = this.add.text(420, 150, src.LocalizationManager.getLocaleText('great'), {
          fontFamily: src.Settings.FONT_FAMILY,
          fontSize: 32,
          color: '#FFFFFF'
        }).setOrigin(0.5);
        this.playButton = src.ButtonFactory.makeButton(this, 600, 320, src.Settings.GAME_ATLAS, 'buttonPlay0000', 'buttonPlay0001', 'buttonPlay0000', this.playClicked, this);
        this.exitButton = src.ButtonFactory.makeButton(this, 237, 320, src.Settings.GAME_ATLAS, 'buttonExit0000', 'buttonExit0001', 'buttonExit0000', this.exitClicked, this);
      }
      /**
       * LISTENERS
       */

    }, {
      key: "playClicked",
      value: function playClicked() {
        src.SoundController.instance.stopVictoryMusic();
        this.scene.remove(this.scene.key);
        this.scene.add('Level', src.Level, true);
      }
    }, {
      key: "exitClicked",
      value: function exitClicked() {
        src.SoundController.instance.stopVictoryMusic();
        this.scene.remove(this.scene.key);
        game.scene.add('ContinueGameScene', src.ContinueGameScene, true, {
          onContinueClick: function onContinueClick() {
            game.scene.add('Victory', Victory, true);
          }
        });
      }
      /**
       * INHERITED
       */

    }, {
      key: "update",
      value: function update() {}
    }]);

    return Victory;
  }(Phaser.Scene);

  src.Victory = Victory;
})(src || (src = {}));

var src;

(function (src) {
  var ContinueGameScene =
  /*#__PURE__*/
  function (_Phaser$Scene5) {
    _inherits(ContinueGameScene, _Phaser$Scene5);

    function ContinueGameScene() {
      _classCallCheck(this, ContinueGameScene);

      return _possibleConstructorReturn(this, _getPrototypeOf(ContinueGameScene).apply(this, arguments));
    }

    _createClass(ContinueGameScene, [{
      key: "create",
      value: function create(data) {
        var _this21 = this;

        this.add.graphics().fillStyle(0xFFFFFF, 1).fillRect(0, 0, src.CustomScaleManager.ORIGINAL_WIDTH, src.CustomScaleManager.ORIGINAL_HEIGHT);
        var contWnd_icon = this.add.sprite(game.canvas.width / 2, game.canvas.height / 2, src.Settings.GAME_ATLAS, 'contWnd_icon0000');
        contWnd_icon.setScale(1 / 1.1, 1 / 1.1);
        contWnd_icon.setInteractive();
        contWnd_icon.on('pointerover', function (event) {
          contWnd_icon.setScale(1, 1);
        });
        contWnd_icon.on('pointerout', function (event) {
          contWnd_icon.setScale(1 / 1.1, 1 / 1.1);
        });
        contWnd_icon.on('pointerdown', function (event) {
          contWnd_icon.setScale(1 / 1.1, 1 / 1.1);
          window.open(pocoyoOnClickURL, '_blank');
        });
        var contWnd_txt = this.add.sprite(game.canvas.width / 2, game.canvas.height / 2 - 200, src.Settings.GAME_ATLAS, 'contWnd_txt0000');
        var contWnd_btn = this.add.sprite(game.canvas.width / 2, game.canvas.height / 2 + 200, src.Settings.GAME_ATLAS, 'contWnd_btn0000');
        contWnd_btn.setInteractive();
        contWnd_btn.on('pointerover', function (event) {
          contWnd_btn.setFrame('contWnd_btn0001');
        });
        contWnd_btn.on('pointerout', function (event) {
          contWnd_btn.setFrame('contWnd_btn0000');
        });
        contWnd_btn.on('pointerdown', function (event) {
          _this21.scene.remove(_this21.scene.key);

          data['onContinueClick']();
        });
        if (data['onCreate']) data['onCreate']();
      }
    }]);

    return ContinueGameScene;
  }(Phaser.Scene);

  src.ContinueGameScene = ContinueGameScene;
})(src || (src = {}));

var src;

(function (src) {
  var PauseScene =
  /*#__PURE__*/
  function (_Phaser$Scene6) {
    _inherits(PauseScene, _Phaser$Scene6);

    function PauseScene() {
      _classCallCheck(this, PauseScene);

      return _possibleConstructorReturn(this, _getPrototypeOf(PauseScene).apply(this, arguments));
    }

    _createClass(PauseScene, [{
      key: "create",
      value: function create(data) {
        var _this22 = this;

        this.add.graphics().fillStyle(0x000000, 0.25).fillRect(0, 0, src.CustomScaleManager.ORIGINAL_WIDTH, src.CustomScaleManager.ORIGINAL_HEIGHT);
        this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 60, src.Settings.GAME_ATLAS, 'WindowBackGame0000');
        var tfbg = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 115, src.Settings.GAME_ATLAS, 'tfb0000');
        var boy = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT - 2, src.Settings.GAME_ATLAS, 'boy_0000').setOrigin(0.5, 1);
        this.add.text(tfbg.x, tfbg.y, src.LocalizationManager.getLocaleText('areYouSure'), {
          fontSize: '30px',
          fontFamily: src.Settings.FONT_FAMILY,
          color: '#A5C9DE',
          boundsAlignH: "center",
          boundsAlignV: "middle",
          align: 'center'
        }).setOrigin(0.5).setWordWrapWidth(350);
        this.pBNO = this.add.sprite(235, 420 - 90, src.Settings.GAME_ATLAS, 'pBNO0000');
        this.pBNO.setInteractive().on('pointerover', function (event) {
          _this22.pBNO.setFrame('pBNO0001');

          src.SoundController.instance.playSound('buttonOver', _this22);
        }, this).on('pointerout', function (event) {
          _this22.pBNO.setFrame('pBNO0000');
        }).on('pointerup', function (event) {
          _this22.pBNO.setFrame('pBNO0000');

          game.scene.remove(_this22);
          if (data['onContinueClick']) data['onContinueClick']();
        });
        this.pBOK = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH - this.pBNO.x, this.pBNO.y, src.Settings.GAME_ATLAS, 'pBOK0000');
        this.pBOK.setInteractive().on('pointerover', function (event) {
          _this22.pBOK.setFrame('pBOK0001');

          src.SoundController.instance.playSound('buttonOver', _this22);
        }, this).on('pointerout', function (event) {
          _this22.pBOK.setFrame('pBOK0000');
        }).on('pointerup', function (event) {
          _this22.pBOK.setFrame('pBOK0000');

          game.scene.add('ContinueGameScene', src.ContinueGameScene, true, {
            'onContinueClick': function onContinueClick() {
              _this22.input.enabled = true;
            },
            'onCreate': function onCreate() {
              _this22.input.enabled = false;
            }
          });
        });
      }
    }]);

    return PauseScene;
  }(Phaser.Scene);

  src.PauseScene = PauseScene;
})(src || (src = {}));
//# sourceMappingURL=game.js.map

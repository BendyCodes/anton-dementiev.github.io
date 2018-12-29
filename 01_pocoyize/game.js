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

  CustomScaleManager.ORIGINAL_WIDTH = 750;
  CustomScaleManager.ORIGINAL_HEIGHT = 550;
  CustomScaleManager.WIDTH = 750;
  CustomScaleManager.HEIGHT = 550;
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
      _classCallCheck(this, Level);

      return _possibleConstructorReturn(this, _getPrototypeOf(Level).apply(this, arguments));
    }

    _createClass(Level, [{
      key: "create",
      value: function create() {
        this.cameras.main.fadeIn(400, 255, 255, 255);
        this.backgroundManager = new src.BackgroundManager(this);
        this.dressingManager = new src.DressingManager(this);
        this.avatarManager = new src.AvatarManager(this);
        this.panelsManager = new src.PanelsManager(this);
        this.foregroundManager = new src.ForegroundManager(this);
        this.add.existing(this.backgroundManager);
        this.add.existing(this.panelsManager);
        this.add.existing(this.dressingManager);
        this.add.existing(this.avatarManager);
        this.add.existing(this.foregroundManager);
      }
    }, {
      key: "fadeAndRestart",
      value: function fadeAndRestart() {
        var _this = this;

        this.cameras.main.fadeOut(800, 255, 255, 255);
        this.time.addEvent({
          delay: 820,
          callback: function callback() {
            return _this.scene.restart();
          }
        });
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.avatarManager.destroy();
        this.backgroundManager.destroy();
        this.panelsManager.destroy();
        this.dressingManager.destroy();
        this.foregroundManager.destroy();
      }
    }]);

    return Level;
  }(Phaser.Scene);

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
        this.load.atlas(src.Settings.PRELOADER_ATLAS, "img/" + src.Settings.PRELOADER_ATLAS + ".png", "img/" + src.Settings.PRELOADER_ATLAS + ".json");
      }
    }, {
      key: "create",
      value: function create() {
        var _this2 = this;

        this.anims.create({
          key: 'preloaderClock',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.PRELOADER_ATLAS, {
            prefix: 'preloaderClock',
            start: 0,
            end: 72,
            zeroPad: 4
          })
        });
        this.clock = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2 + 10, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 15, src.Settings.PRELOADER_ATLAS).setOrigin(0.5);
        this.clock.play('preloaderClock');
        this.barFrames = this.anims.generateFrameNames(src.Settings.PRELOADER_ATLAS, {
          prefix: 'preloaderBar',
          start: 0,
          end: 99,
          zeroPad: 4
        }).map(function (frameConfig) {
          return '' + frameConfig.frame;
        });
        this.bar = this.add.sprite(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 25, src.Settings.PRELOADER_ATLAS, 'preloaderBar0000').setOrigin(0.5);
        /* create invisible debug text to forse the browser to preload fonts */

        this.add.text(0, -100, 'Debug text', {
          fontFamily: src.Settings.DEFAULT_FONT_FAMILY,
          fontSize: 42,
          color: '#000000'
        });
        this.add.text(0, -100, 'Preload text in HVD Comin Serif', {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 30,
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
          _this2.bar.setFrame(_this2.barFrames[Phaser.Math.Clamp(value * 100, 0, 99)]);
        }, this);
        this.load.on('complete', function () {
          document.querySelector('html').style.cursor = 'url(img/cursor.png), url(img/cursor-waiting.png), auto';

          _this2.prepareAnimations();

          src.LocalStorageController.instance.loadSave();

          _this2.scene.add('Level', src.Level, true);

          _this2.scene.remove(_this2);
        });
        this.load.start();
      }
    }, {
      key: "prepareAnimations",
      value: function prepareAnimations() {
        /* animations */
        this.anims.create({
          key: 'lamp',
          frameRate: 25,
          frames: this.anims.generateFrameNames(src.Settings.GAME_ATLAS, {
            prefix: 'lamp',
            start: 0,
            end: 47,
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
      var _this3;

      _classCallCheck(this, App);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, App.gameConfig));
      App.instance = _assertThisInitialized(_assertThisInitialized(_this3));

      _this3.scene.add('Preloader', src.Preloader, true);

      return _this3;
    }

    return App;
  }(Phaser.Game);

  App.CANVAS_WIDTH = 750;
  App.CANVAS_HEIGHT = 550;
  App.gameConfig = {
    type: Phaser.WEBGL,
    width: src.CustomScaleManager.ORIGINAL_WIDTH,
    height: src.CustomScaleManager.ORIGINAL_HEIGHT,
    transparent: true,
    preserveDrawingBuffer: true
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

var prevWidth;
var prevHeight;

function resizeCanvas() {
  var w = window.innerWidth;
  var h = window.innerHeight; // stage dimensions

  var ow = src.App.CANVAS_WIDTH;
  var oh = src.App.CANVAS_HEIGHT;
  var scale = Math.min(w / ow, h / oh);
  checkOrientationChanging(h > w); // adjust canvas size

  if (prevWidth != w || prevHeight != h) {
    var canvas = game.canvas;
    canvas.style.width = ow * scale + 'px';
    canvas.style.height = oh * scale + 'px';
    canvas.style.marginBottom = canvas.style.marginTop = (h - oh * scale) / 2 + 'px';
    canvas.style.marginRight = canvas.style.marginLeft = (w - ow * scale) / 2 + 'px';
    var inputContainer = document.querySelector('#inputContainer');
    inputContainer.style.marginTop = ~~(h / 2 - 59 * scale) + 'px';
    inputContainer.style.marginLeft = w / 2 + 'px';
    document.querySelector('#yournameDiv').style.marginTop = ~~(0 * scale - 2 / scale) + 'px';
    document.querySelector('#emailDiv').style.marginTop = ~~(47 * scale - 2 / scale) + 'px';
    document.querySelector('#email1Div').style.marginTop = ~~(47 * 2.15 * scale - 2 / scale) + 'px';
    document.querySelector('#email2Div').style.marginTop = ~~(48 * 3 * scale - 2 / scale) + 'px';
    document.querySelector('#email3Div').style.marginTop = ~~(48 * 4 * scale - 2 / scale) + 'px';
    document.querySelectorAll('.inputField').forEach(function (div) {
      return div.style.height = ~~(20 * scale) + 'px';
    });
    document.querySelectorAll('.inputField').forEach(function (div) {
      return div.style.fontSize = ~~(14 * scale) + 'px';
    });
  }

  prevWidth = w;
  prevHeight = h;
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


  Settings.DEFAULT_FONT_FAMILY = 'Open Sans';
  Settings.MAIN_FONT_FAMILY = 'HVD Comic Serif Pro'; //COLORS

  Settings.FACIALHAIR_COLORS = [10461087, 6710886, 5659228, 2102031, 1973790, 4076328, 6305053, 6703918, 7816209, 13660949, 16696901, 15981699, 9645357];
  Settings.EYEBROWS_COLORS = [10461087, 6710886, 5659228, 2102031, 1973790, 4076328, 6305053, 6703918, 7816209, 13660949, 16696901, 15981699, 9645357];
  Settings.MOUTH_COLORS = [11756883, 6177312, 14768515, 11993088];
  Settings.HAIR_COLORS = [10461087, 6710886, 5659228, 2102031, 1973790, 4076328, 6305053, 6703918, 7816209, 13660949, 16696901, 15981699, 9645357];
  Settings.SKIN_COLORS = [15190179, 16034939, 7093807];
  Settings.EYES_COLORS = [26715, 13158, 3877140, 0]; //ATLASES

  Settings.GAME_ATLAS = 'graphics';
  Settings.PRELOADER_ATLAS = 'preloader'; //SETTINGS

  Settings.MUSIC_ENABLED_BY_DEFAULT = false;
  Settings.LOCAL_STORAGE_KEY = 'Pocoyizer';
  src.Settings = Settings;
})(src || (src = {}));

var src;

(function (src) {
  var AvatarPartType;

  (function (AvatarPartType) {
    AvatarPartType["FACE"] = "Face";
    AvatarPartType["HAIR"] = "Hair";
    AvatarPartType["EYES"] = "Eyes";
    AvatarPartType["MOUTH"] = "Mouth";
    AvatarPartType["BODY"] = "Body";
    AvatarPartType["LEGS"] = "Legs";
    AvatarPartType["EYEBROWS"] = "Eyebrows";
    AvatarPartType["FACIAL_HAIR"] = "FacialHair";
    AvatarPartType["GLASSES"] = "Glasses";
  })(AvatarPartType = src.AvatarPartType || (src.AvatarPartType = {}));
})(src || (src = {}));

var src;

(function (src) {
  var AbstractManager =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C) {
    _inherits(AbstractManager, _Phaser$GameObjects$C);

    function AbstractManager(level) {
      var _this4;

      _classCallCheck(this, AbstractManager);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractManager).call(this, level));
      _this4.level = level;
      return _this4;
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
      var _this5;

      _classCallCheck(this, BackgroundManager);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(BackgroundManager).call(this, level));

      _this5.buildContent();

      return _this5;
    }

    _createClass(BackgroundManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.background = this.scene.add.sprite(375, 290, src.Settings.GAME_ATLAS, 'gameplayBackground0000').setOrigin(0.5);
        this.add(this.background);
      }
    }]);

    return BackgroundManager;
  }(src.AbstractManager);

  src.BackgroundManager = BackgroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var DressingManager =
  /*#__PURE__*/
  function (_src$AbstractManager2) {
    _inherits(DressingManager, _src$AbstractManager2);

    function DressingManager(level) {
      var _this6;

      _classCallCheck(this, DressingManager);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(DressingManager).call(this, level));

      _this6.setPosition(232, 300);

      _this6.buildContent();

      return _this6;
    }
    /**
     * PROTECTED
     */


    _createClass(DressingManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.background = this.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'dressingRoomBackground0000').setOrigin(0.5);
        this.add(this.background);
        this.buttonOk = src.ButtonFactory.makeButton(this.level, 113, 152, src.Settings.GAME_ATLAS, 'buttonOk0000', 'buttonOk0001', 'buttonOk0000', this.handleOKClicked, this);
        this.add(this.buttonOk);
        this.buttonHair = new src.CommonButton(this.level, 116, -150, 'iconHair0000', this.selectHairClicked, this);
        this.add(this.buttonHair);
        this.buttonEyesMouth = new src.CommonButton(this.level, 116, -75, 'iconEyesMouth0000', this.selectEyesMouthClicked, this);
        this.add(this.buttonEyesMouth);
        this.buttonBody = new src.CommonButton(this.level, 116, 0, 'iconBody0000', this.selectBodyClicked, this);
        this.add(this.buttonBody);
        this.buttonLegs = new src.CommonButton(this.level, 116, 75, 'iconLegs0000', this.selectLegsClicked, this);
        this.add(this.buttonLegs);
        this.buttonEyebrows = new src.CommonButton(this.level, 35, 156, 'iconEyebrows0000', this.selectEyebrowsClicked, this);
        this.add(this.buttonEyebrows);
        this.buttonFacialHair = new src.CommonButton(this.level, -40, 156, 'iconFacialHair0000', this.selectFacialHairClicked, this);
        this.add(this.buttonFacialHair);
        this.buttonGlasses = new src.CommonButton(this.level, -115, 156, 'iconGlasses0000', this.selectGlassesClicked, this);
        this.add(this.buttonGlasses);
        this.buttons = [this.buttonHair, this.buttonEyesMouth, this.buttonBody, this.buttonLegs, this.buttonEyebrows, this.buttonFacialHair, this.buttonGlasses];
      }
    }, {
      key: "handleOKClicked",
      value: function handleOKClicked() {
        this.level.scene.add('Results', src.Results, true);
        this.level.scene.setVisible(false, "Level");
        this.level.scene.remove(this.level);
      }
    }, {
      key: "selectHairClicked",
      value: function selectHairClicked() {
        var _this7 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this7.buttonHair);
          });
          this.level.panelsManager.openPanelHair();
        }
      }
    }, {
      key: "selectEyesMouthClicked",
      value: function selectEyesMouthClicked() {
        var _this8 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this8.buttonEyesMouth);
          });
          this.level.panelsManager.openPanelEyesMouth();
        }
      }
    }, {
      key: "selectBodyClicked",
      value: function selectBodyClicked() {
        var _this9 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this9.buttonBody);
          });
          this.level.panelsManager.openPanelBody();
        }
      }
    }, {
      key: "selectLegsClicked",
      value: function selectLegsClicked() {
        var _this10 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this10.buttonLegs);
          });
          this.level.panelsManager.openPanelLegs();
        }
      }
    }, {
      key: "selectEyebrowsClicked",
      value: function selectEyebrowsClicked() {
        var _this11 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this11.buttonEyebrows);
          });
          this.level.panelsManager.openPanelEyebrows();
        }
      }
    }, {
      key: "selectFacialHairClicked",
      value: function selectFacialHairClicked() {
        var _this12 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this12.buttonFacialHair);
          });
          this.level.panelsManager.openPanelFacialHair();
        }
      }
    }, {
      key: "selectGlassesClicked",
      value: function selectGlassesClicked() {
        var _this13 = this;

        this.level.foregroundManager.hideTutorial();

        if (!this.level.panelsManager.isLocked()) {
          this.buttons.forEach(function (button) {
            return button.setSelected(button == _this13.buttonGlasses);
          });
          this.level.panelsManager.openPanelGlasses();
        }
      }
    }, {
      key: "lockButtons",
      value: function lockButtons() {
        this.buttonHair.buttonBase.disableInteractive();
        this.buttonEyesMouth.buttonBase.disableInteractive();
        this.buttonBody.buttonBase.disableInteractive();
        this.buttonLegs.buttonBase.disableInteractive();
        this.buttonEyebrows.buttonBase.disableInteractive();
        this.buttonFacialHair.buttonBase.disableInteractive();
        this.buttonGlasses.buttonBase.disableInteractive();
      }
    }, {
      key: "unlockButtons",
      value: function unlockButtons() {
        this.buttonHair.buttonBase.setInteractive();
        this.buttonEyesMouth.buttonBase.setInteractive();
        this.buttonBody.buttonBase.setInteractive();
        this.buttonLegs.buttonBase.setInteractive();
        this.buttonEyebrows.buttonBase.setInteractive();
        this.buttonFacialHair.buttonBase.setInteractive();
        this.buttonGlasses.buttonBase.setInteractive();
      }
    }]);

    return DressingManager;
  }(src.AbstractManager);

  src.DressingManager = DressingManager;
})(src || (src = {}));

var src;

(function (src) {
  var ForegroundManager =
  /*#__PURE__*/
  function (_src$AbstractManager3) {
    _inherits(ForegroundManager, _src$AbstractManager3);

    function ForegroundManager(level) {
      var _this14;

      _classCallCheck(this, ForegroundManager);

      _this14 = _possibleConstructorReturn(this, _getPrototypeOf(ForegroundManager).call(this, level));

      _this14.buildContent();

      return _this14;
    }

    _createClass(ForegroundManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.logo = this.scene.add.sprite(380, 53, src.Settings.GAME_ATLAS, 'logo0000').setOrigin(0.5);
        this.add(this.logo);
        this.tutorial = new src.Tutorial(this.level, 405, 105);
        this.add(this.tutorial);
      }
    }, {
      key: "hideTutorial",
      value: function hideTutorial() {
        this.tutorial.visible = false;
      }
    }]);

    return ForegroundManager;
  }(src.AbstractManager);

  src.ForegroundManager = ForegroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var PanelsManager =
  /*#__PURE__*/
  function (_src$AbstractManager4) {
    _inherits(PanelsManager, _src$AbstractManager4);

    function PanelsManager(level) {
      var _this15;

      _classCallCheck(this, PanelsManager);

      _this15 = _possibleConstructorReturn(this, _getPrototypeOf(PanelsManager).call(this, level));
      _this15.inputLocked = false;

      _this15.setPosition(70, 300);

      _this15.buildContent();

      return _this15;
    }

    _createClass(PanelsManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.panelHair = new src.PanelHair(this);
        this.add(this.panelHair);
        this.panelEyesMouth = new src.PanelEyesMouth(this);
        this.add(this.panelEyesMouth);
        this.panelBody = new src.PanelBody(this);
        this.add(this.panelBody);
        this.panelLegs = new src.PanelLegs(this);
        this.add(this.panelLegs);
        this.panelGlasses = new src.PanelGlasses(this);
        this.add(this.panelGlasses);
        this.panelFacialHair = new src.PanelFacialHair(this);
        this.add(this.panelFacialHair);
        this.panelEyebrows = new src.PanelEyebrows(this);
        this.add(this.panelEyebrows);
      }
    }, {
      key: "isLocked",
      value: function isLocked() {
        return this.inputLocked;
      }
    }, {
      key: "openPanelLegs",
      value: function openPanelLegs() {
        this.changePanel(this.panelLegs);
      }
    }, {
      key: "openPanelBody",
      value: function openPanelBody() {
        this.changePanel(this.panelBody);
      }
    }, {
      key: "openPanelGlasses",
      value: function openPanelGlasses() {
        this.changePanel(this.panelGlasses);
      }
    }, {
      key: "openPanelFacialHair",
      value: function openPanelFacialHair() {
        this.changePanel(this.panelFacialHair);
      }
    }, {
      key: "openPanelEyebrows",
      value: function openPanelEyebrows() {
        this.changePanel(this.panelEyebrows);
      }
    }, {
      key: "openPanelHair",
      value: function openPanelHair() {
        this.changePanel(this.panelHair);
      }
    }, {
      key: "openPanelEyesMouth",
      value: function openPanelEyesMouth() {
        this.changePanel(this.panelEyesMouth);
      }
      /**
       * PROTECTED
       */

    }, {
      key: "changePanel",
      value: function changePanel(nextPanel) {
        var _this16 = this;

        if (nextPanel != this.activePanel) {
          this.lock();
          this.closeActivePanel(function () {
            return _this16.openPanel(nextPanel, function () {
              return _this16.unlock();
            });
          });
        }
      }
    }, {
      key: "closeActivePanel",
      value: function closeActivePanel(callback) {
        if (this.activePanel && this.activePanel.isOpened()) {
          this.activePanel.close(callback);
        } else {
          callback();
        }
      }
    }, {
      key: "openPanel",
      value: function openPanel(panel, callback) {
        this.activePanel = panel;
        this.activePanel.open(callback);
      }
    }, {
      key: "lock",
      value: function lock() {
        this.level.dressingManager.lockButtons();
        this.inputLocked = true;
      }
    }, {
      key: "unlock",
      value: function unlock() {
        this.level.dressingManager.unlockButtons();
        this.inputLocked = false;
      }
    }]);

    return PanelsManager;
  }(src.AbstractManager);

  src.PanelsManager = PanelsManager;
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
        return textData && textData[key] ? textData[key] : "";
      }
    }]);

    return LocalizationManager;
  }();

  src.LocalizationManager = LocalizationManager;
})(src || (src = {}));

var src;

(function (src) {
  var ScoreManager =
  /*#__PURE__*/
  function () {
    function ScoreManager() {
      _classCallCheck(this, ScoreManager);
    }

    _createClass(ScoreManager, null, [{
      key: "updateBestScore",
      value: function updateBestScore(newScore) {
        this.bestScore = Math.max(0, this.bestScore, newScore);
        src.LocalStorageController.instance.save();
        return this.bestScore;
      }
    }]);

    return ScoreManager;
  }();

  ScoreManager.bestScore = 0;
  src.ScoreManager = ScoreManager;
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
      this.soundNames = ['buttonOver', 'buttonClick'];
    }

    _createClass(SoundController, [{
      key: "getSoundNames",
      value: function getSoundNames() {
        return this.soundNames;
      }
    }, {
      key: "startCounting",
      value: function startCounting(scene) {
        var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (!this.recountSound) {
          this.recountSound = scene.sound.add('recount', {
            volume: volume,
            loop: true
          });
        }

        this.recountSound.play();
      }
    }, {
      key: "stopCounting",
      value: function stopCounting() {
        if (this.recountSound && this.recountSound.isPlaying) {
          this.recountSound.stop();
        }
      }
    }, {
      key: "playSound",
      value: function playSound(key, scene) {
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var delay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        if (src.App.instance.sound["context"] && src.App.instance.sound["context"]["state"] === 'suspended') {//do nothing
        } else {
          scene.sound.add(key, {
            volume: volume,
            loop: loop,
            delay: delay
          }).play();
        }
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
  var Avatar =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C2) {
    _inherits(Avatar, _Phaser$GameObjects$C2);

    function Avatar(scene, x, y) {
      var _this17;

      _classCallCheck(this, Avatar);

      _this17 = _possibleConstructorReturn(this, _getPrototypeOf(Avatar).call(this, scene, x, y));
      _this17.skinValues = new Map();
      _this17.colorValues = new Map();

      _this17.buildChildren();

      return _this17;
    }

    _createClass(Avatar, [{
      key: "buildChildren",
      value: function buildChildren() {
        this.face = this.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, src.AvatarPartType.FACE + 'Big0000').setOrigin(0.5);
        this.add(this.face);
        this.eyes = this.scene.add.sprite(0, -44, src.Settings.GAME_ATLAS, src.AvatarPartType.EYES + 'Big0000').setOrigin(0.5);
        this.add(this.eyes);
        this.eyesShadow = this.scene.add.sprite(0, -45, src.Settings.GAME_ATLAS, src.AvatarPartType.EYES + 'Shadow' + 'Big0000').setOrigin(0.5);
        this.add(this.eyesShadow);
        this.mouth = this.scene.add.sprite(2.5, -17, src.Settings.GAME_ATLAS, src.AvatarPartType.MOUTH + 'Big0000').setOrigin(0.5);
        this.add(this.mouth);
        this.mouthShadow = this.scene.add.sprite(0, -17, src.Settings.GAME_ATLAS, src.AvatarPartType.MOUTH + 'Shadow' + 'Big0000').setOrigin(0.5);
        this.add(this.mouthShadow);
        this.eyebrows = this.scene.add.sprite(0.5, -56, src.Settings.GAME_ATLAS, src.AvatarPartType.EYEBROWS + 'Big0000').setOrigin(0.5);
        this.add(this.eyebrows);
        this.facialHair = this.scene.add.sprite(0.5, -21, src.Settings.GAME_ATLAS, src.AvatarPartType.FACIAL_HAIR + 'Big0000').setOrigin(0.5);
        this.add(this.facialHair);
        this.facialHairShadow = this.scene.add.sprite(0, -31, src.Settings.GAME_ATLAS, src.AvatarPartType.FACIAL_HAIR + 'Shadow' + 'Big0000').setOrigin(0.5);
        this.add(this.facialHairShadow);
        this.hair = this.scene.add.sprite(4.5, -41, src.Settings.GAME_ATLAS, src.AvatarPartType.HAIR + 'Big0000').setOrigin(0.5);
        this.add(this.hair);
        this.hairShadow = this.scene.add.sprite(4.5, -57, src.Settings.GAME_ATLAS, src.AvatarPartType.HAIR + 'Shadow' + 'Big0000').setOrigin(0.5);
        this.add(this.hairShadow);
        this.body = this.scene.add.sprite(1, 24, src.Settings.GAME_ATLAS, src.AvatarPartType.BODY + 'Big0000').setOrigin(0.5);
        this.add(this.body);
        this.legs = this.scene.add.sprite(1, 82, src.Settings.GAME_ATLAS, src.AvatarPartType.LEGS + 'Big0000').setOrigin(0.5);
        this.add(this.legs);
        this.glasses = this.scene.add.sprite(1, -45, src.Settings.GAME_ATLAS, src.AvatarPartType.GLASSES + 'Big0000').setOrigin(0.5);
        this.add(this.glasses);
      }
    }, {
      key: "dispatchSkinChange",
      value: function dispatchSkinChange(skparseIntype, value) {
        var saveResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        this.skinValues.set(skparseIntype, value);

        switch (skparseIntype) {
          case src.AvatarPartType.LEGS:
            this.legs.setFrame(src.AvatarPartType.LEGS + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.BODY:
            this.body.setFrame(src.AvatarPartType.BODY + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.GLASSES:
            this.glasses.setFrame(src.AvatarPartType.GLASSES + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.FACIAL_HAIR:
            this.facialHair.setFrame(src.AvatarPartType.FACIAL_HAIR + 'Big' + src.TextUtils.toFixedPad(value));
            this.facialHairShadow.setFrame(src.AvatarPartType.FACIAL_HAIR + 'Shadow' + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.EYEBROWS:
            this.eyebrows.setFrame(src.AvatarPartType.EYEBROWS + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.HAIR:
            this.hair.setFrame(src.AvatarPartType.HAIR + 'Big' + src.TextUtils.toFixedPad(value));
            this.hairShadow.setFrame(src.AvatarPartType.HAIR + 'Shadow' + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.EYES:
            this.eyes.setFrame(src.AvatarPartType.EYES + 'Big' + src.TextUtils.toFixedPad(value));
            this.eyesShadow.setFrame(src.AvatarPartType.EYES + 'Shadow' + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.MOUTH:
            this.mouth.setFrame(src.AvatarPartType.MOUTH + 'Big' + src.TextUtils.toFixedPad(value));
            this.mouthShadow.setFrame(src.AvatarPartType.MOUTH + 'Shadow' + 'Big' + src.TextUtils.toFixedPad(value));
            break;

          case src.AvatarPartType.FACE:
            this.face.setFrame(src.AvatarPartType.FACE + 'Big' + src.TextUtils.toFixedPad(value));
            break;
        }

        if (saveResult) {
          src.AvatarManager.AVATAR_CODE = this.getAvatarCode();
          src.LocalStorageController.instance.save();
        }
      }
    }, {
      key: "dispatchColorChange",
      value: function dispatchColorChange(skparseIntype, value) {
        var saveResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        this.colorValues.set(skparseIntype, value);

        switch (skparseIntype) {
          case src.AvatarPartType.FACIAL_HAIR:
            this.facialHair.tint = src.Settings.FACIALHAIR_COLORS[value];
            break;

          case src.AvatarPartType.EYEBROWS:
            this.eyebrows.tint = src.Settings.EYEBROWS_COLORS[value];
            break;

          case src.AvatarPartType.HAIR:
            this.hair.tint = src.Settings.HAIR_COLORS[value];
            break;

          case src.AvatarPartType.EYES:
            this.eyes.tint = src.Settings.EYES_COLORS[value];
            break;

          case src.AvatarPartType.MOUTH:
            this.mouth.tint = src.Settings.MOUTH_COLORS[value];
            break;
        }

        if (saveResult) {
          src.AvatarManager.AVATAR_CODE = this.getAvatarCode();
          src.LocalStorageController.instance.save();
        }
      }
    }, {
      key: "getAvatarCode",
      value: function getAvatarCode() {
        return src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.HAIR) + 1) + src.TextUtils.toFixedPad(this.colorValues.get(src.AvatarPartType.HAIR) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.EYES) + 1) + src.TextUtils.toFixedPad(this.colorValues.get(src.AvatarPartType.EYES) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.MOUTH) + 1) + src.TextUtils.toFixedPad(this.colorValues.get(src.AvatarPartType.MOUTH) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.FACE)) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.BODY) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.LEGS) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.GLASSES) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.FACIAL_HAIR) + 1) + src.TextUtils.toFixedPad(this.colorValues.get(src.AvatarPartType.FACIAL_HAIR) + 1) + src.TextUtils.toFixedPad(this.skinValues.get(src.AvatarPartType.EYEBROWS) + 1) + src.TextUtils.toFixedPad(this.colorValues.get(src.AvatarPartType.EYEBROWS) + 1);
      }
    }, {
      key: "buildFromCode",
      value: function buildFromCode(code) {
        this.dispatchSkinChange(src.AvatarPartType.HAIR, parseInt(code.substr(0, 4)) - 1, false);
        this.dispatchColorChange(src.AvatarPartType.HAIR, parseInt(code.substr(4, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.EYES, parseInt(code.substr(8, 4)) - 1, false);
        this.dispatchColorChange(src.AvatarPartType.EYES, parseInt(code.substr(12, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.MOUTH, parseInt(code.substr(16, 4)) - 1, false);
        this.dispatchColorChange(src.AvatarPartType.MOUTH, parseInt(code.substr(20, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.FACE, parseInt(code.substr(24, 4)), false);
        this.dispatchSkinChange(src.AvatarPartType.BODY, parseInt(code.substr(28, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.LEGS, parseInt(code.substr(32, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.GLASSES, parseInt(code.substr(36, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.FACIAL_HAIR, parseInt(code.substr(40, 4)) - 1, false);
        this.dispatchColorChange(src.AvatarPartType.FACIAL_HAIR, parseInt(code.substr(44, 4)) - 1, false);
        this.dispatchSkinChange(src.AvatarPartType.EYEBROWS, parseInt(code.substr(48, 4)) - 1, false);
        this.dispatchColorChange(src.AvatarPartType.EYEBROWS, parseInt(code.substr(52, 4)) - 1, false);
      }
    }]);

    return Avatar;
  }(Phaser.GameObjects.Container);

  src.Avatar = Avatar;
})(src || (src = {}));

var src;

(function (src) {
  var ButtonGroup =
  /*#__PURE__*/
  function () {
    function ButtonGroup() {
      _classCallCheck(this, ButtonGroup);

      this.buttons = [];
    }

    _createClass(ButtonGroup, [{
      key: "addButton",
      value: function addButton(button) {
        if (!this.contains(button)) {
          this.buttons.push(button);
        }
      }
    }, {
      key: "contains",
      value: function contains(button) {
        return this.buttons.indexOf(button) != -1;
      }
    }, {
      key: "handleButtonClicked",
      value: function handleButtonClicked(clickedButton) {
        this.buttons.forEach(function (button) {
          return button.setSelected(button == clickedButton);
        });
      }
    }, {
      key: "selectButton",
      value: function selectButton(buttonId) {
        this.handleButtonClicked(this.buttons[buttonId]);
      }
    }]);

    return ButtonGroup;
  }();

  src.ButtonGroup = ButtonGroup;
})(src || (src = {}));

var src;

(function (src) {
  var CommonButton =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C3) {
    _inherits(CommonButton, _Phaser$GameObjects$C3);

    function CommonButton(level, x, y, iconFrame, callback, callbackContext) {
      var _this18;

      _classCallCheck(this, CommonButton);

      _this18 = _possibleConstructorReturn(this, _getPrototypeOf(CommonButton).call(this, level, x, y));
      _this18.isSelected = false;
      _this18.level = level;
      /* button */

      _this18.buttonBase = _this18.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'activeContainer0000').setOrigin(0.5).setInteractive();

      _this18.add(_this18.buttonBase);

      _this18.buttonBase.on('pointerover', function () {
        src.SoundController.instance.playSound('buttonOver', level);

        _this18.buttonBase.setFrame('activeContainer0002');
      });

      _this18.buttonBase.on('pointerout', function () {
        return _this18.buttonBase.setFrame(_this18.isSelected ? 'activeContainer0001' : 'activeContainer0000');
      });

      _this18.buttonBase.on('pointerdown', callback, callbackContext);

      _this18.buttonBase.on('pointerdown', function () {
        src.SoundController.instance.playSound('buttonClick', level);

        _this18.buttonBase.setFrame('activeContainer0001');
      });

      _this18.buttonBase.on('pointerup', function () {
        return _this18.buttonBase.setFrame('activeContainer0002');
      });
      /* icon */


      _this18.icon = _this18.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, iconFrame).setOrigin(0.5);

      _this18.add(_this18.icon);

      return _this18;
    }

    _createClass(CommonButton, [{
      key: "setSelected",
      value: function setSelected(value) {
        this.isSelected = value;

        if (this.isSelected) {
          this.buttonBase.setFrame('activeContainer0001');
        } else {
          this.buttonBase.setFrame('activeContainer0000');
        }
      }
    }]);

    return CommonButton;
  }(Phaser.GameObjects.Container);

  src.CommonButton = CommonButton;
})(src || (src = {}));

var src;

(function (src) {
  var AbstractButton =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C4) {
    _inherits(AbstractButton, _Phaser$GameObjects$C4);

    function AbstractButton(level, buttonGroup) {
      var _this19;

      _classCallCheck(this, AbstractButton);

      _this19 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractButton).call(this, level));
      _this19.isSelected = false;
      _this19.level = level;
      _this19.buttonGroup = buttonGroup;

      _this19.buttonGroup.addButton(_assertThisInitialized(_assertThisInitialized(_this19)));

      return _this19;
    }

    return AbstractButton;
  }(Phaser.GameObjects.Container);

  src.AbstractButton = AbstractButton;
})(src || (src = {})); ///<reference path="AbstractButton.ts"/>


var src;

(function (src) {
  var ItemButton =
  /*#__PURE__*/
  function (_src$AbstractButton) {
    _inherits(ItemButton, _src$AbstractButton);

    function ItemButton(level, buttonGroup, avatarPartType, partIndex, iconScale, callback, callbackContext) {
      var _this20;

      _classCallCheck(this, ItemButton);

      _this20 = _possibleConstructorReturn(this, _getPrototypeOf(ItemButton).call(this, level, buttonGroup));
      _this20.avatarPartType = avatarPartType;
      _this20.partIndex = partIndex;
      /* button */

      _this20.buttonBase = _this20.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'activeContainer0000').setOrigin(0.5).setInteractive();

      _this20.add(_this20.buttonBase);

      _this20.buttonBase.on('pointerover', function () {
        if (!_this20.level.panelsManager.isLocked()) {
          src.SoundController.instance.playSound('buttonOver', _this20.level);

          _this20.buttonBase.setFrame('activeContainer0002');
        }
      });

      _this20.buttonBase.on('pointerout', function () {
        if (!_this20.level.panelsManager.isLocked()) {
          _this20.buttonBase.setFrame(_this20.isSelected ? 'activeContainer0001' : 'activeContainer0000');
        }
      });

      _this20.buttonBase.on('pointerdown', function () {
        if (!_this20.level.panelsManager.isLocked()) {
          _this20.buttonGroup.handleButtonClicked(_assertThisInitialized(_assertThisInitialized(_this20)));

          callback.apply(callbackContext, [_this20.partIndex]);
        }
      });

      _this20.buttonBase.on('pointerdown', function () {
        if (!_this20.level.panelsManager.isLocked()) {
          src.SoundController.instance.playSound('buttonClick', _this20.level);

          _this20.buttonBase.setFrame('activeContainer0001');
        }
      });

      _this20.buttonBase.on('pointerup', function () {
        if (!_this20.level.panelsManager.isLocked()) {
          _this20.buttonBase.setFrame('activeContainer0002');
        }
      });
      /* icon */


      _this20.icon = _this20.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, _this20.getIconKey()).setOrigin(0.5);

      _this20.icon.setScale(iconScale);

      _this20.add(_this20.icon);

      return _this20;
    }

    _createClass(ItemButton, [{
      key: "setSelected",
      value: function setSelected(value) {
        this.isSelected = value;

        if (this.isSelected) {
          this.buttonBase.setFrame('activeContainer0001');
        } else {
          this.buttonBase.setFrame('activeContainer0000');
        }
      }
    }, {
      key: "getIconKey",
      value: function getIconKey() {
        return this.avatarPartType + src.TextUtils.toFixedPad(this.partIndex);
      }
    }]);

    return ItemButton;
  }(src.AbstractButton);

  src.ItemButton = ItemButton;
})(src || (src = {}));

var src;

(function (src) {
  var ScrollableContainer =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C5) {
    _inherits(ScrollableContainer, _Phaser$GameObjects$C5);

    function ScrollableContainer(panel, items) {
      var _this21;

      _classCallCheck(this, ScrollableContainer);

      _this21 = _possibleConstructorReturn(this, _getPrototypeOf(ScrollableContainer).call(this, panel.level));
      _this21.panel = panel;
      _this21.level = panel.level;
      _this21.items = items.slice();

      _this21.buildItems();

      _this21.buildScroller();

      return _this21;
    }

    _createClass(ScrollableContainer, [{
      key: "buildItems",
      value: function buildItems() {
        var _this22 = this;

        this.itemsContainer = this.scene.add.container(91, -55);
        this.add(this.itemsContainer);
        this.items.forEach(function (item, index) {
          _this22.itemsContainer.add(item);

          item.setPosition(72 * (index % 3), 72 * Math.floor(index / 3));
        });
      }
    }, {
      key: "buildScroller",
      value: function buildScroller() {
        this.scroller = new src.Scroller(this, 296, 15);
        this.add(this.scroller);
      }
    }, {
      key: "dragTo",
      value: function dragTo(percentage) {
        var rows = Math.ceil(this.items.length / 3);
        var scrollableRows = Phaser.Math.Clamp(rows - 3, 0, rows);
        var targetRow = Phaser.Math.Clamp(Math.round(percentage * scrollableRows), 0, rows - 3);
        this.itemsContainer.y = -55 - targetRow * 72;
        this.items.forEach(function (item, index) {
          item.visible = index / 3 >= targetRow && index / 3 < targetRow + 3;
        });
      }
    }, {
      key: "scrollToItem",
      value: function scrollToItem(itemId) {
        var rows = Math.ceil(this.items.length / 3);
        var row = Math.floor(itemId / 3);
        var percentage = Phaser.Math.Clamp(row / (rows - 3), 0, 1);
        this.scroller.scrollTo(percentage);
      }
    }]);

    return ScrollableContainer;
  }(Phaser.GameObjects.Container);

  src.ScrollableContainer = ScrollableContainer;
})(src || (src = {}));

var src;

(function (src) {
  var ContentPanel =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C6) {
    _inherits(ContentPanel, _Phaser$GameObjects$C6);

    function ContentPanel(panelsManager) {
      var _this23;

      _classCallCheck(this, ContentPanel);

      _this23 = _possibleConstructorReturn(this, _getPrototypeOf(ContentPanel).call(this, panelsManager.level));
      _this23.opened = false;
      _this23.animationsLocked = false;
      _this23.panelsManager = panelsManager;
      _this23.level = _this23.panelsManager.level;

      _this23.buildContent();

      _this23.buildScrollableContainer();

      _this23.loadState();

      return _this23;
    }

    _createClass(ContentPanel, [{
      key: "buildContent",
      value: function buildContent() {
        this.backgroundPanel = this.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'contentPanel0000').setOrigin(0, 0.5);
        this.add(this.backgroundPanel);
      }
    }, {
      key: "open",
      value: function open(callback) {
        var _this24 = this;

        if (!this.opened) {
          this.opened = true;
          this.lock();
          this.scene.tweens.add({
            targets: this,
            x: 280,
            duration: 350,
            ease: 'Back.easeOut',
            onComplete: function onComplete() {
              _this24.unlock();

              callback();
            }
          });
        }
      }
    }, {
      key: "close",
      value: function close(callback) {
        var _this25 = this;

        if (this.opened) {
          this.opened = false;
          this.lock();
          this.scene.tweens.add({
            targets: this,
            x: 0,
            duration: 300,
            ease: 'Back.easeIn',
            onComplete: function onComplete() {
              _this25.unlock();

              callback();
            }
          });
        }
      }
    }, {
      key: "unlock",
      value: function unlock() {
        this.animationsLocked = false;
      }
    }, {
      key: "lock",
      value: function lock() {
        this.animationsLocked = true;
      }
      /**
       * PUBLIC
       */

    }, {
      key: "isLocked",
      value: function isLocked() {
        return this.animationsLocked;
      }
    }, {
      key: "isOpened",
      value: function isOpened() {
        return this.opened;
      }
    }]);

    return ContentPanel;
  }(Phaser.GameObjects.Container);

  src.ContentPanel = ContentPanel;
})(src || (src = {}));

var src;

(function (src) {
  var PanelBody =
  /*#__PURE__*/
  function (_src$ContentPanel) {
    _inherits(PanelBody, _src$ContentPanel);

    function PanelBody(panelsManager) {
      _classCallCheck(this, PanelBody);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelBody).call(this, panelsManager));
    }

    _createClass(PanelBody, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.bodyIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 149; i++) {
          this.bodyIconsGroup.addButton(new src.ItemButton(this.level, this.bodyIconsGroup, src.AvatarPartType.BODY, i, 1, this.selectItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.bodyIconsGroup.buttons);
        this.add(this.scrollableContainer);
      }
    }, {
      key: "selectItem",
      value: function selectItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.BODY, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var itemId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.BODY);
        this.bodyIconsGroup.selectButton(itemId);
        this.selectItem(itemId);
        this.scrollableContainer.scrollToItem(itemId);
      }
    }]);

    return PanelBody;
  }(src.ContentPanel);

  src.PanelBody = PanelBody;
})(src || (src = {}));

var src;

(function (src) {
  var PanelLegs =
  /*#__PURE__*/
  function (_src$ContentPanel2) {
    _inherits(PanelLegs, _src$ContentPanel2);

    function PanelLegs(panelsManager) {
      _classCallCheck(this, PanelLegs);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelLegs).call(this, panelsManager));
    }

    _createClass(PanelLegs, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.legsIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 78; i++) {
          this.legsIconsGroup.addButton(new src.ItemButton(this.level, this.legsIconsGroup, src.AvatarPartType.LEGS, i, 1, this.selectItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.legsIconsGroup.buttons);
        this.add(this.scrollableContainer);
      }
    }, {
      key: "selectItem",
      value: function selectItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.LEGS, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var itemId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.LEGS);
        this.legsIconsGroup.selectButton(itemId);
        this.selectItem(itemId);
        this.scrollableContainer.scrollToItem(itemId);
      }
    }]);

    return PanelLegs;
  }(src.ContentPanel);

  src.PanelLegs = PanelLegs;
})(src || (src = {}));

var src;

(function (src) {
  var Scroller =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C7) {
    _inherits(Scroller, _Phaser$GameObjects$C7);

    function Scroller(scrollableContainer, x, y) {
      var _this26;

      _classCallCheck(this, Scroller);

      _this26 = _possibleConstructorReturn(this, _getPrototypeOf(Scroller).call(this, scrollableContainer.level, x, y));
      _this26.scrollableContainer = scrollableContainer;

      _this26.buildContent();

      return _this26;
    }

    _createClass(Scroller, [{
      key: "buildContent",
      value: function buildContent() {
        var _this27 = this;

        this.pad = this.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'scrollPad0000').setOrigin(0.5);
        this.add(this.pad);
        this.bar = this.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'scrollBar0000').setOrigin(0.5);
        this.add(this.bar);
        this.bar.setInteractive();
        this.scene.input.setDraggable(this.bar, true);
        /* adjust scroller height */

        var rows = Math.ceil(this.scrollableContainer.items.length / 3);
        var targetHeight = rows > 0 ? this.pad.height * (3 / rows) : this.pad.height;
        this.bar.setScale(1, targetHeight < 26 ? 26 / this.bar.height : targetHeight / this.bar.height);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
          var barHeight = _this27.bar.getBounds().height;

          _this27.bar.y = Phaser.Math.Clamp(dragY, -_this27.pad.height / 2 + barHeight / 2, _this27.pad.height / 2 - barHeight / 2);

          _this27.dragTo(_this27.calculateCurrentPercentage(barHeight));
        });
      }
    }, {
      key: "calculateCurrentPercentage",
      value: function calculateCurrentPercentage(barHeight) {
        return Phaser.Math.Clamp((this.bar.y - (-this.pad.height / 2 + barHeight / 2)) / (this.pad.height - barHeight), 0, 1);
      }
    }, {
      key: "dragTo",
      value: function dragTo(percentage) {
        this.scrollableContainer.dragTo(percentage);
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(value) {
        var barHeight = this.bar.getBounds().height;
        this.bar.y = Phaser.Math.Clamp(-this.pad.height / 2 + barHeight / 2 + value * (this.pad.height - barHeight), -this.pad.height / 2 + barHeight / 2, this.pad.height / 2 - barHeight / 2);
        this.dragTo(this.calculateCurrentPercentage(barHeight));
      }
    }]);

    return Scroller;
  }(Phaser.GameObjects.Container);

  src.Scroller = Scroller;
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
          if (enableSound) src.SoundController.instance.playSound('buttonClick', scene);
          button.setFrame(downFrame);
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
})(src || (src = {})); ///<reference path="../scores/ScoreManager.ts"/>


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
        "avatarCode": null
      };
    }

    _createClass(LocalStorageController, [{
      key: "getAvatarCode",
      value: function getAvatarCode() {
        return this.data["avatarCode"];
      }
    }, {
      key: "save",
      value: function save() {
        this.data["avatarCode"] = src.AvatarManager.AVATAR_CODE.slice();

        if (this.isLocalStorageSupported) {
          localStorage.setItem(LocalStorageController.STORAGE_NAME, JSON.stringify(this.data));
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
          if (localStorage.getItem(LocalStorageController.STORAGE_NAME)) {
            this.data = JSON.parse(localStorage.getItem(LocalStorageController.STORAGE_NAME));
          } else {
            localStorage.setItem(LocalStorageController.STORAGE_NAME, JSON.stringify(this.data));
          }
        }

        this.finalizeLoading();
      }
    }, {
      key: "finalizeLoading",
      value: function finalizeLoading() {
        src.AvatarManager.AVATAR_CODE = LocalStorageController.instance.getAvatarCode();
        console.log("Code loaded: " + src.AvatarManager.AVATAR_CODE);
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
  var TextUtils =
  /*#__PURE__*/
  function () {
    function TextUtils() {
      _classCallCheck(this, TextUtils);
    }

    _createClass(TextUtils, null, [{
      key: "convertMSToHumanTime",
      value: function convertMSToHumanTime(milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var minutes = Math.floor(seconds / 60);
        var restSeconds = seconds - minutes * 60;
        return (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + restSeconds;
      }
    }, {
      key: "normalizeTime",
      value: function normalizeTime(milliseconds) {
        var restSeconds = milliseconds / 1000;
        var hours = Math.floor(restSeconds / 3600);
        restSeconds %= 3600;
        var minutes = Math.floor(restSeconds / 60);
        restSeconds %= 60;
        return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + restSeconds;
      }
    }, {
      key: "toFixedPad",
      value: function toFixedPad(index) {
        var pad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var result = '' + index;

        while (result.length < 4) {
          result = '0' + result;
        }

        return result;
      }
    }]);

    return TextUtils;
  }();

  src.TextUtils = TextUtils;
})(src || (src = {}));

var src;

(function (src) {
  var TimeUtils =
  /*#__PURE__*/
  function () {
    function TimeUtils() {
      _classCallCheck(this, TimeUtils);
    }

    _createClass(TimeUtils, null, [{
      key: "getTimestamp",
      value: function getTimestamp() {
        return +new Date();
      }
    }, {
      key: "isFuture",
      value: function isFuture(timestamp) {
        return timestamp > this.getTimestamp();
      }
    }]);

    return TimeUtils;
  }();

  src.TimeUtils = TimeUtils;
})(src || (src = {}));

var src;

(function (src) {
  var PanelGlasses =
  /*#__PURE__*/
  function (_src$ContentPanel3) {
    _inherits(PanelGlasses, _src$ContentPanel3);

    function PanelGlasses(panelsManager) {
      _classCallCheck(this, PanelGlasses);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelGlasses).call(this, panelsManager));
    }

    _createClass(PanelGlasses, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.glassesIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 29; i++) {
          this.glassesIconsGroup.addButton(new src.ItemButton(this.level, this.glassesIconsGroup, src.AvatarPartType.GLASSES, i, 1, this.selectItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.glassesIconsGroup.buttons);
        this.add(this.scrollableContainer);
      }
    }, {
      key: "selectItem",
      value: function selectItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.GLASSES, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var itemId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.GLASSES);
        this.glassesIconsGroup.selectButton(itemId);
        this.selectItem(itemId);
        this.scrollableContainer.scrollToItem(itemId);
      }
    }]);

    return PanelGlasses;
  }(src.ContentPanel);

  src.PanelGlasses = PanelGlasses;
})(src || (src = {}));

var src;

(function (src) {
  var PanelFacialHair =
  /*#__PURE__*/
  function (_src$ContentPanel4) {
    _inherits(PanelFacialHair, _src$ContentPanel4);

    function PanelFacialHair(panelsManager) {
      _classCallCheck(this, PanelFacialHair);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelFacialHair).call(this, panelsManager));
    }

    _createClass(PanelFacialHair, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.facialHairIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 20; i++) {
          this.facialHairIconsGroup.addButton(new src.ItemButton(this.level, this.facialHairIconsGroup, src.AvatarPartType.FACIAL_HAIR, i, 1, this.selectItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.facialHairIconsGroup.buttons);
        this.add(this.scrollableContainer);
        /* color selector */

        this.colorSelector = new src.ColorSelector(this.level, 175, -125, src.Settings.FACIALHAIR_COLORS, this.selectColor, this);
        this.add(this.colorSelector);
      }
    }, {
      key: "selectItem",
      value: function selectItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.FACIAL_HAIR, index);
      }
    }, {
      key: "selectColor",
      value: function selectColor(index) {
        this.level.avatarManager.avatar.dispatchColorChange(src.AvatarPartType.FACIAL_HAIR, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var itemId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.FACIAL_HAIR);
        this.facialHairIconsGroup.selectButton(itemId);
        this.selectItem(itemId);
        this.scrollableContainer.scrollToItem(itemId);
        var colorId = this.level.avatarManager.avatar.colorValues.get(src.AvatarPartType.FACIAL_HAIR);
        this.colorSelector.selectColor(colorId);
        this.selectColor(colorId);
      }
    }]);

    return PanelFacialHair;
  }(src.ContentPanel);

  src.PanelFacialHair = PanelFacialHair;
})(src || (src = {}));

var src;

(function (src) {
  var ColorButton =
  /*#__PURE__*/
  function (_src$AbstractButton2) {
    _inherits(ColorButton, _src$AbstractButton2);

    function ColorButton(level, x, y, buttonGroup, colorIndex, color, callback, callbackContext) {
      var _this28;

      _classCallCheck(this, ColorButton);

      _this28 = _possibleConstructorReturn(this, _getPrototypeOf(ColorButton).call(this, level, buttonGroup));

      _this28.setPosition(x, y);

      _this28.level = level;
      _this28.colorIndex = colorIndex;
      _this28.color = color;
      /* button */

      _this28.colorBase = _this28.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'selectColorButton0000').setOrigin(0.5).setInteractive();

      _this28.add(_this28.colorBase);

      _this28.colorBase.setTint(color);
      /* icon */


      _this28.buttonFrame = _this28.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'selectColorFrame0000').setOrigin(0.5);

      _this28.add(_this28.buttonFrame);

      _this28.colorBase.on('pointerover', function () {
        if (!_this28.level.panelsManager.isLocked()) {
          src.SoundController.instance.playSound('buttonOver', _this28.level);

          _this28.buttonFrame.setFrame('selectColorFrame0002');
        }
      });

      _this28.colorBase.on('pointerout', function () {
        if (!_this28.level.panelsManager.isLocked()) {
          _this28.buttonFrame.setFrame(_this28.isSelected ? 'selectColorFrame0001' : 'selectColorFrame0000');
        }
      });

      _this28.colorBase.on('pointerdown', function () {
        if (!_this28.level.panelsManager.isLocked()) {
          _this28.buttonGroup.handleButtonClicked(_assertThisInitialized(_assertThisInitialized(_this28)));

          callback.apply(callbackContext, [_this28.colorIndex]);
        }
      });

      _this28.colorBase.on('pointerdown', function () {
        if (!_this28.level.panelsManager.isLocked()) {
          src.SoundController.instance.playSound('buttonClick', _this28.level);

          _this28.buttonFrame.setFrame('selectColorFrame0001');
        }
      });

      _this28.colorBase.on('pointerup', function () {
        if (!_this28.level.panelsManager.isLocked()) {
          _this28.buttonFrame.setFrame('selectColorFrame0002');
        }
      });

      return _this28;
    }

    _createClass(ColorButton, [{
      key: "setSelected",
      value: function setSelected(value) {
        this.isSelected = value;

        if (this.isSelected) {
          this.buttonFrame.setFrame('selectColorFrame0001');
        } else {
          this.buttonFrame.setFrame('selectColorFrame0000');
        }
      }
    }]);

    return ColorButton;
  }(src.AbstractButton);

  src.ColorButton = ColorButton;
})(src || (src = {}));

var src;

(function (src) {
  var ColorSelector =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C8) {
    _inherits(ColorSelector, _Phaser$GameObjects$C8);

    function ColorSelector(level, x, y, colors, callback, callbackContext) {
      var _this29;

      _classCallCheck(this, ColorSelector);

      _this29 = _possibleConstructorReturn(this, _getPrototypeOf(ColorSelector).call(this, level, x, y));
      _this29.level = level;
      _this29.colorButtonsGroup = new src.ButtonGroup();

      for (var i = 0; i < colors.length; i++) {
        _this29.colorButtonsGroup.addButton(new src.ColorButton(_this29.level, (i - colors.length / 2 + 0.5) * 20, 0, _this29.colorButtonsGroup, i, colors[i], callback, callbackContext));
      }

      _this29.colorButtonsGroup.buttons.forEach(function (button) {
        return _this29.add(button);
      });

      return _this29;
    }

    _createClass(ColorSelector, [{
      key: "selectColor",
      value: function selectColor(colorId) {
        this.colorButtonsGroup.selectButton(colorId);
      }
    }]);

    return ColorSelector;
  }(Phaser.GameObjects.Container);

  src.ColorSelector = ColorSelector;
})(src || (src = {}));

var src;

(function (src) {
  var PanelEyebrows =
  /*#__PURE__*/
  function (_src$ContentPanel5) {
    _inherits(PanelEyebrows, _src$ContentPanel5);

    function PanelEyebrows(panelsManager) {
      _classCallCheck(this, PanelEyebrows);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelEyebrows).call(this, panelsManager));
    }

    _createClass(PanelEyebrows, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.eyebrowsIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 24; i++) {
          this.eyebrowsIconsGroup.addButton(new src.ItemButton(this.level, this.eyebrowsIconsGroup, src.AvatarPartType.EYEBROWS, i, 1, this.selectItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.eyebrowsIconsGroup.buttons);
        this.add(this.scrollableContainer);
        /* color selector */

        this.colorSelector = new src.ColorSelector(this.level, 175, -125, src.Settings.EYEBROWS_COLORS, this.selectColor, this);
        this.add(this.colorSelector);
      }
    }, {
      key: "selectItem",
      value: function selectItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.EYEBROWS, index);
      }
    }, {
      key: "selectColor",
      value: function selectColor(index) {
        this.level.avatarManager.avatar.dispatchColorChange(src.AvatarPartType.EYEBROWS, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var itemId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.EYEBROWS);
        this.eyebrowsIconsGroup.selectButton(itemId);
        this.selectItem(itemId);
        this.scrollableContainer.scrollToItem(itemId);
        var colorId = this.level.avatarManager.avatar.colorValues.get(src.AvatarPartType.EYEBROWS);
        this.colorSelector.selectColor(colorId);
        this.selectColor(colorId);
      }
    }]);

    return PanelEyebrows;
  }(src.ContentPanel);

  src.PanelEyebrows = PanelEyebrows;
})(src || (src = {}));

var src;

(function (src) {
  var PanelHair =
  /*#__PURE__*/
  function (_src$ContentPanel6) {
    _inherits(PanelHair, _src$ContentPanel6);

    function PanelHair(panelsManager) {
      _classCallCheck(this, PanelHair);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelHair).call(this, panelsManager));
    }

    _createClass(PanelHair, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.hairIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 113; i++) {
          this.hairIconsGroup.addButton(new src.ItemButton(this.level, this.hairIconsGroup, src.AvatarPartType.HAIR, i, 1, this.selectItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.hairIconsGroup.buttons);
        this.add(this.scrollableContainer);
        /* color selector */

        this.colorSelector = new src.ColorSelector(this.level, 175, -125, src.Settings.HAIR_COLORS, this.selectColor, this);
        this.add(this.colorSelector);
      }
    }, {
      key: "selectItem",
      value: function selectItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.HAIR, index);
      }
    }, {
      key: "selectColor",
      value: function selectColor(index) {
        this.level.avatarManager.avatar.dispatchColorChange(src.AvatarPartType.HAIR, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var itemId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.HAIR);
        this.hairIconsGroup.selectButton(itemId);
        this.selectItem(itemId);
        this.scrollableContainer.scrollToItem(itemId);
        var colorId = this.level.avatarManager.avatar.colorValues.get(src.AvatarPartType.HAIR);
        this.colorSelector.selectColor(colorId);
        this.selectColor(colorId);
      }
    }]);

    return PanelHair;
  }(src.ContentPanel);

  src.PanelHair = PanelHair;
})(src || (src = {}));

var src;

(function (src) {
  var PanelEyesMouth =
  /*#__PURE__*/
  function (_src$ContentPanel7) {
    _inherits(PanelEyesMouth, _src$ContentPanel7);

    function PanelEyesMouth(panelsManager) {
      _classCallCheck(this, PanelEyesMouth);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelEyesMouth).call(this, panelsManager));
    }

    _createClass(PanelEyesMouth, [{
      key: "buildScrollableContainer",
      value: function buildScrollableContainer() {
        this.eyesIconsGroup = new src.ButtonGroup();

        for (var i = 0; i < 8; i++) {
          this.eyesIconsGroup.addButton(new src.ItemButton(this.level, this.eyesIconsGroup, src.AvatarPartType.EYES, i, 1, this.selectEyesItem, this));
        }

        this.mouthsIconsGroup = new src.ButtonGroup();

        for (var _i = 0; _i < 22; _i++) {
          this.mouthsIconsGroup.addButton(new src.ItemButton(this.level, this.mouthsIconsGroup, src.AvatarPartType.MOUTH, _i, 1, this.selectMouthItem, this));
        }

        this.scrollableContainer = new src.ScrollableContainer(this, this.eyesIconsGroup.buttons.slice().concat(this.mouthsIconsGroup.buttons.slice()));
        this.add(this.scrollableContainer);
        /* color selector */

        this.eyesColorSelector = new src.ColorSelector(this.level, 90, -125, src.Settings.EYES_COLORS, this.selectEyesColor, this);
        this.add(this.eyesColorSelector);
        this.mouthColorSelector = new src.ColorSelector(this.level, 189, -125, src.Settings.MOUTH_COLORS, this.selectMouthColor, this);
        this.add(this.mouthColorSelector);
        this.faceColorSelector = new src.ColorSelector(this.level, 276, -125, src.Settings.SKIN_COLORS, this.selectFaceType, this);
        this.add(this.faceColorSelector);
      }
    }, {
      key: "selectEyesItem",
      value: function selectEyesItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.EYES, index);
      }
    }, {
      key: "selectMouthItem",
      value: function selectMouthItem(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.MOUTH, index);
      }
    }, {
      key: "selectEyesColor",
      value: function selectEyesColor(index) {
        this.level.avatarManager.avatar.dispatchColorChange(src.AvatarPartType.EYES, index);
      }
    }, {
      key: "selectMouthColor",
      value: function selectMouthColor(index) {
        this.level.avatarManager.avatar.dispatchColorChange(src.AvatarPartType.MOUTH, index);
      }
    }, {
      key: "selectFaceType",
      value: function selectFaceType(index) {
        this.level.avatarManager.avatar.dispatchSkinChange(src.AvatarPartType.FACE, index);
      }
    }, {
      key: "loadState",
      value: function loadState() {
        var eyesId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.EYES);
        this.eyesIconsGroup.selectButton(eyesId);
        this.selectEyesItem(eyesId);
        this.scrollableContainer.scrollToItem(eyesId);
        var mouthId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.MOUTH);
        this.mouthsIconsGroup.selectButton(mouthId);
        this.selectMouthItem(mouthId);
        var faceId = this.level.avatarManager.avatar.skinValues.get(src.AvatarPartType.FACE);
        this.faceColorSelector.selectColor(faceId);
        this.selectFaceType(faceId);
        var eyesColorId = this.level.avatarManager.avatar.colorValues.get(src.AvatarPartType.EYES);
        this.eyesColorSelector.selectColor(eyesColorId);
        this.selectEyesColor(eyesColorId);
        var mouthColorId = this.level.avatarManager.avatar.colorValues.get(src.AvatarPartType.MOUTH);
        this.mouthColorSelector.selectColor(mouthColorId);
        this.selectMouthColor(mouthColorId);
      }
    }]);

    return PanelEyesMouth;
  }(src.ContentPanel);

  src.PanelEyesMouth = PanelEyesMouth;
})(src || (src = {}));

var src;

(function (src) {
  var AvatarManager =
  /*#__PURE__*/
  function (_src$AbstractManager5) {
    _inherits(AvatarManager, _src$AbstractManager5);

    function AvatarManager(level) {
      var _this30;

      _classCallCheck(this, AvatarManager);

      _this30 = _possibleConstructorReturn(this, _getPrototypeOf(AvatarManager).call(this, level));

      _this30.setPosition(221 - 30, 297 - 15);

      _this30.avatar = new src.Avatar(_this30.level, 0, 0);

      _this30.add(_this30.avatar);

      _this30.loadAvatar();

      return _this30;
    }

    _createClass(AvatarManager, [{
      key: "loadAvatar",
      value: function loadAvatar() {
        AvatarManager.AVATAR_CODE = AvatarManager.AVATAR_CODE || this.generateRandomAvatarCode();
        this.avatar.buildFromCode(AvatarManager.AVATAR_CODE);
        src.LocalStorageController.instance.save();
      }
    }, {
      key: "generateRandomAvatarCode",
      value: function generateRandomAvatarCode() {
        return src.TextUtils.toFixedPad(Math.floor(Math.random() * 113) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * src.Settings.HAIR_COLORS.length) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 8) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * src.Settings.EYES_COLORS.length) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 22) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * src.Settings.MOUTH_COLORS.length) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 3)) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 149) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 78) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 29) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 20) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * src.Settings.FACIALHAIR_COLORS.length) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * 24) + 1) + src.TextUtils.toFixedPad(Math.floor(Math.random() * src.Settings.EYEBROWS_COLORS.length) + 1);
      }
    }]);

    return AvatarManager;
  }(src.AbstractManager);

  AvatarManager.AVATAR_CODE = null;
  src.AvatarManager = AvatarManager;
})(src || (src = {}));

var src;

(function (src) {
  var Tutorial =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C9) {
    _inherits(Tutorial, _Phaser$GameObjects$C9);

    function Tutorial(level, x, y) {
      var _this31;

      _classCallCheck(this, Tutorial);

      _this31 = _possibleConstructorReturn(this, _getPrototypeOf(Tutorial).call(this, level, x, y));
      _this31.level = level;
      _this31.text1 = _this31.scene.add.text(0, 10, src.LocalizationManager.getLocaleText(16), {
        fontFamily: src.Settings.MAIN_FONT_FAMILY,
        fontSize: 30,
        color: '#FFFFFF',
        align: 'left',
        wordWrap: {
          width: 295,
          useAdvancedWrap: true
        }
      }).setOrigin(0, 0).setShadow(0, 2, '#024f96');

      _this31.add(_this31.text1);

      _this31.text2 = _this31.scene.add.text(5, 50, src.LocalizationManager.getLocaleText(17), {
        fontFamily: src.Settings.MAIN_FONT_FAMILY,
        fontSize: 18,
        color: '#FFFFFF',
        align: 'left',
        wordWrap: {
          width: 295,
          useAdvancedWrap: true
        }
      }).setOrigin(0, 0).setShadow(-1, 1.2, '#024f96');

      _this31.add(_this31.text2);

      _this31.text3 = _this31.scene.add.text(60, 330, src.LocalizationManager.getLocaleText(18), {
        fontFamily: src.Settings.MAIN_FONT_FAMILY,
        fontSize: 14,
        color: '#FFFFFF',
        align: 'left',
        wordWrap: {
          width: 250,
          useAdvancedWrap: true
        }
      }).setOrigin(0, 0).setShadow(-1, 1, '#024f96');

      _this31.add(_this31.text3);

      _this31.arrow = _this31.scene.add.sprite(25, 347, src.Settings.GAME_ATLAS, 'arrow0000').setOrigin(0.5);

      _this31.add(_this31.arrow);

      _this31.visible = !Tutorial.FIRST_TIME_SHOWN;
      Tutorial.FIRST_TIME_SHOWN = true;
      return _this31;
    }

    return Tutorial;
  }(Phaser.GameObjects.Container);

  Tutorial.FIRST_TIME_SHOWN = false;
  src.Tutorial = Tutorial;
})(src || (src = {}));

var src;

(function (src) {
  var AbstractResultsManager =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C10) {
    _inherits(AbstractResultsManager, _Phaser$GameObjects$C10);

    function AbstractResultsManager(results) {
      var _this32;

      _classCallCheck(this, AbstractResultsManager);

      _this32 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractResultsManager).call(this, results));
      _this32.results = results;
      return _this32;
    }

    _createClass(AbstractResultsManager, [{
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(AbstractResultsManager.prototype), "destroy", this).call(this);

        this.results = null;
      }
    }]);

    return AbstractResultsManager;
  }(Phaser.GameObjects.Container);

  src.AbstractResultsManager = AbstractResultsManager;
})(src || (src = {})); ///<reference path="AbstractResultsManager.ts"/>


var src;

(function (src) {
  var ResultsBackgroundManager =
  /*#__PURE__*/
  function (_src$AbstractResultsM) {
    _inherits(ResultsBackgroundManager, _src$AbstractResultsM);

    function ResultsBackgroundManager(results) {
      var _this33;

      _classCallCheck(this, ResultsBackgroundManager);

      _this33 = _possibleConstructorReturn(this, _getPrototypeOf(ResultsBackgroundManager).call(this, results));

      _this33.buildContent();

      return _this33;
    }

    _createClass(ResultsBackgroundManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.background = this.scene.add.sprite(375, 290, src.Settings.GAME_ATLAS, 'resultsBackground0000').setOrigin(0.5);
        this.add(this.background);
      }
    }]);

    return ResultsBackgroundManager;
  }(src.AbstractResultsManager);

  src.ResultsBackgroundManager = ResultsBackgroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var ResultsForegroundManager =
  /*#__PURE__*/
  function (_src$AbstractResultsM2) {
    _inherits(ResultsForegroundManager, _src$AbstractResultsM2);

    function ResultsForegroundManager(results) {
      var _this34;

      _classCallCheck(this, ResultsForegroundManager);

      _this34 = _possibleConstructorReturn(this, _getPrototypeOf(ResultsForegroundManager).call(this, results));

      _this34.buildContent();

      return _this34;
    }

    _createClass(ResultsForegroundManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.logo = this.scene.add.sprite(380, 53, src.Settings.GAME_ATLAS, 'logo0000').setOrigin(0.5);
        this.add(this.logo);
      }
    }]);

    return ResultsForegroundManager;
  }(src.AbstractResultsManager);

  src.ResultsForegroundManager = ResultsForegroundManager;
})(src || (src = {}));

var src;

(function (src) {
  var Results =
  /*#__PURE__*/
  function (_Phaser$Scene3) {
    _inherits(Results, _Phaser$Scene3);

    function Results() {
      _classCallCheck(this, Results);

      return _possibleConstructorReturn(this, _getPrototypeOf(Results).apply(this, arguments));
    }

    _createClass(Results, [{
      key: "create",
      value: function create() {
        this.backgroundManager = new src.ResultsBackgroundManager(this);
        this.panelsManager = new src.ResultsPanelsManager(this);
        this.msnAvatarManger = new src.MSNAvatarManager(this);
        this.avatarManager = new src.ResultsAvatarManager(this);
        this.emailPanel = new src.EmailPanel(this, 0, 0);
        this.foregroundManager = new src.ResultsForegroundManager(this);
        this.add.existing(this.backgroundManager);
        this.add.existing(this.panelsManager);
        this.add.existing(this.msnAvatarManger);
        this.add.existing(this.avatarManager);
        this.add.existing(this.emailPanel);
        this.add.existing(this.foregroundManager);
        this.processing = this.add.sprite(375, 275, src.Settings.GAME_ATLAS, 'processing0000');
        this.processing.visible = false;
      }
    }, {
      key: "showEmailPanel",
      value: function showEmailPanel() {
        this.panelsManager.visible = false;
        this.msnAvatarManger.visible = false;
        this.avatarManager.visible = false;
        this.emailPanel.show();
      }
    }, {
      key: "hideEmailPanel",
      value: function hideEmailPanel() {
        this.panelsManager.visible = true;
        this.msnAvatarManger.visible = true;
        this.avatarManager.visible = true;
        this.emailPanel.hide();
      }
    }, {
      key: "startProcessing",
      value: function startProcessing() {
        this.game.input.enabled = false;
        this.processing.visible = true;
        document.querySelector('html').style.cursor = 'url(img/cursor-waiting.png), url(img/cursor.png), auto';
      }
    }, {
      key: "stopProcessing",
      value: function stopProcessing() {
        this.game.input.enabled = true;
        this.processing.visible = false;
        document.querySelector('html').style.cursor = 'url(img/cursor.png), url(img/cursor-waiting.png), auto';
      }
    }, {
      key: "update",
      value: function update() {
        if (this.emailPanel.visible) {
          this.emailPanel.update();
        }
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.msnAvatarManger.destroy();
        this.panelsManager.destroy();
        this.avatarManager.destroy();
        this.backgroundManager.destroy();
        this.emailPanel.destroy();
        this.foregroundManager.destroy();
      }
    }]);

    return Results;
  }(Phaser.Scene);

  src.Results = Results;
})(src || (src = {}));

var src;

(function (src) {
  var ResultsAvatarManager =
  /*#__PURE__*/
  function (_src$AbstractResultsM3) {
    _inherits(ResultsAvatarManager, _src$AbstractResultsM3);

    function ResultsAvatarManager(results) {
      var _this35;

      _classCallCheck(this, ResultsAvatarManager);

      _this35 = _possibleConstructorReturn(this, _getPrototypeOf(ResultsAvatarManager).call(this, results));
      _this35.buttonSave = new src.TextButton(_this35.results, 223 - 30, 450 - 15, src.LocalizationManager.getLocaleText(22), 0, 17, {
        fontFamily: src.Settings.MAIN_FONT_FAMILY,
        fontSize: 24,
        color: "#FFFFFF",
        align: 'center'
      }, "#FFFFFF", "#FFFFFF", 0, 0, 'buttonSave0000', 'buttonSave0001', 'buttonSave0000', _this35.saveClicked, _assertThisInitialized(_assertThisInitialized(_this35)));

      _this35.add(_this35.buttonSave);

      _this35.panelEdit = new src.TextButton(_this35.results, 223 - 30, 304 - 15, src.LocalizationManager.getLocaleText(3), 0, 128, {
        fontFamily: src.Settings.MAIN_FONT_FAMILY,
        fontSize: 24,
        color: "#999999",
        align: 'center'
      }, "#999999", "#FFFFFF", 0, 0, 'panelEdit0000', 'panelEdit0001', 'panelEdit0000', _this35.editClicked, _assertThisInitialized(_assertThisInitialized(_this35)));

      _this35.add(_this35.panelEdit);

      _this35.screen = _this35.scene.add.sprite(0, 0, src.Settings.GAME_ATLAS, 'transitionSquare0000').setOrigin(0);

      _this35.add(_this35.screen);

      _this35.screen.setScale(1200 / _this35.screen.width, 1000 / _this35.screen.height);

      _this35.screen.alpha = 0;
      _this35.avatar = new src.Avatar(_this35.results, 221 - 30, 297 - 15);

      _this35.add(_this35.avatar);

      _this35.loadAvatar();

      return _this35;
    }

    _createClass(ResultsAvatarManager, [{
      key: "saveClicked",
      value: function saveClicked() {
        var _this36 = this;

        this.results.tweens.add({
          targets: this.screen,
          alpha: 1,
          duration: 50,
          onYoyo: function onYoyo() {
            _this36.saveImage();
          },
          yoyo: true
        });
      }
    }, {
      key: "editClicked",
      value: function editClicked() {
        this.results.scene.add('Level', src.Level, true);
        this.results.scene.setVisible(false, "Results");
        this.results.scene.remove(this.results);
      }
    }, {
      key: "saveImage",
      value: function saveImage() {
        src.App.instance.renderer.snapshot(function (screenshot) {
          var canvas = document.createElement("canvas");
          canvas.width = 192;
          canvas.height = 260;
          var context = canvas.getContext("2d");

          screenshot.onload = function () {
            // draw cropped image
            var sourceX = 98;
            var sourceY = 140;
            var sourceWidth = 192;
            var sourceHeight = 260;
            var destWidth = sourceWidth;
            var destHeight = sourceHeight;
            var destX = 0;
            var destY = 0;
            context.drawImage(screenshot, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            src.FileUtils.saveBase64AsFile(canvas.toDataURL('image/png'), 'pocoyize.png');
          };
        }, 'image/png', null);
      }
    }, {
      key: "loadAvatar",
      value: function loadAvatar() {
        this.avatar.buildFromCode(src.AvatarManager.AVATAR_CODE);
      }
    }]);

    return ResultsAvatarManager;
  }(src.AbstractResultsManager);

  src.ResultsAvatarManager = ResultsAvatarManager;
})(src || (src = {}));

var src;

(function (src) {
  var TextButton =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C11) {
    _inherits(TextButton, _Phaser$GameObjects$C11);

    function TextButton(scene, x, y, textValue, textX, textY, textStyle, textColor, textColorHover, buttonX, buttonY, defaultFrame, overFrame, downFrame, listener, listenerContext) {
      var _this37;

      var enableSound = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : true;

      _classCallCheck(this, TextButton);

      _this37 = _possibleConstructorReturn(this, _getPrototypeOf(TextButton).call(this, scene, x, y));
      _this37.textColor = textColor;
      _this37.textColorHover = textColorHover;
      _this37.button = _this37.scene.add.sprite(buttonX, buttonY, src.Settings.GAME_ATLAS, defaultFrame).setInteractive().setOrigin(0.5);

      _this37.button.on('pointerover', function () {
        if (enableSound) src.SoundController.instance.playSound('buttonOver', scene);

        _this37.button.setFrame(overFrame);

        _this37.text.setColor(_this37.textColorHover);
      });

      _this37.button.on('pointerout', function () {
        _this37.button.setFrame(defaultFrame);

        _this37.text.setColor(_this37.textColor);
      });

      _this37.button.on('pointerdown', listener, listenerContext);

      _this37.button.on('pointerdown', function () {
        if (enableSound) src.SoundController.instance.playSound('buttonClick', scene);

        _this37.button.setFrame(downFrame);
      });

      _this37.button.on('pointerup', function () {
        return _this37.button.setFrame(overFrame);
      });

      _this37.add(_this37.button);

      _this37.text = _this37.scene.add.text(textX, textY, textValue, textStyle).setOrigin(0.5, 0.5);

      _this37.add(_this37.text);

      return _this37;
    }

    return TextButton;
  }(Phaser.GameObjects.Container);

  src.TextButton = TextButton;
})(src || (src = {}));

var src;

(function (src) {
  var FileUtils =
  /*#__PURE__*/
  function () {
    function FileUtils() {
      _classCallCheck(this, FileUtils);
    }

    _createClass(FileUtils, null, [{
      key: "saveBase64AsFile",
      value: function saveBase64AsFile(base64, fileName) {
        var link = document.createElement("a");
        link.setAttribute("href", base64);
        link.setAttribute("download", fileName);
        link.click();
      }
    }]);

    return FileUtils;
  }();

  src.FileUtils = FileUtils;
})(src || (src = {}));

var src;

(function (src) {
  var MainPanel =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C12) {
    _inherits(MainPanel, _Phaser$GameObjects$C12);

    function MainPanel(results, x, y) {
      var _this38;

      _classCallCheck(this, MainPanel);

      _this38 = _possibleConstructorReturn(this, _getPrototypeOf(MainPanel).call(this, results, x, y));
      _this38.results = results;

      _this38.buildContent();

      return _this38;
    }

    _createClass(MainPanel, [{
      key: "buildContent",
      value: function buildContent() {
        this.buttonShare = new src.DoubleTextButton(this.scene, 498, 230, src.LocalizationManager.getLocaleText(23), 0, -55, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 26,
          color: "#FFFFFF",
          align: 'center'
        }, 0.5, 0.5, src.LocalizationManager.getLocaleText(24), -166, -22, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 15,
          color: "#60398c",
          align: 'left',
          wordWrap: {
            width: 175,
            useAdvancedWrap: true
          }
        }, 0, 0, 0, 0, 'panelShare0000', 'panelShare0000', 'panelShare0000', this.shareClicked, this);
        this.add(this.buttonShare);
        this.buttonPresent = new src.DoubleTextButton(this.scene, 498, 402, src.LocalizationManager.getLocaleText(20), 0, -55, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, 0.5, 0.5, src.LocalizationManager.getLocaleText(21), 160, -12, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 13,
          color: "#4c8132",
          align: 'right',
          wordWrap: {
            width: 175,
            useAdvancedWrap: true
          }
        }, 1, 0, 0, 0, 'panelPresent0000', 'panelPresent0000', 'panelPresent0000', this.presentClicked, this);
        this.add(this.buttonPresent);
      }
    }, {
      key: "shareClicked",
      value: function shareClicked() {
        this.results.panelsManager.switchToShare();
      }
    }, {
      key: "presentClicked",
      value: function presentClicked() {
        this.results.panelsManager.switchToPresent();
      }
    }]);

    return MainPanel;
  }(Phaser.GameObjects.Container);

  src.MainPanel = MainPanel;
})(src || (src = {})); ///<reference path="AbstractResultsManager.ts"/>


var src;

(function (src) {
  var ResultsPanelsManager =
  /*#__PURE__*/
  function (_src$AbstractResultsM4) {
    _inherits(ResultsPanelsManager, _src$AbstractResultsM4);

    function ResultsPanelsManager(results) {
      var _this39;

      _classCallCheck(this, ResultsPanelsManager);

      _this39 = _possibleConstructorReturn(this, _getPrototypeOf(ResultsPanelsManager).call(this, results));

      _this39.buildContent();

      return _this39;
    }

    _createClass(ResultsPanelsManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.mainPanel = new src.MainPanel(this.results, -30, -15);
        this.add(this.mainPanel);
        this.presentPanel = new src.PresentPanel(this.results, -30, -15);
        this.add(this.presentPanel);
        this.sharePanel = new src.SharePanel(this.results, -30, -15);
        this.add(this.sharePanel);
        this.presentPanel.visible = false;
        this.sharePanel.visible = false;
      }
    }, {
      key: "switchToShare",
      value: function switchToShare() {
        this.mainPanel.visible = false;
        this.presentPanel.visible = false;
        this.sharePanel.visible = true;
        this.results.msnAvatarManger.visible = true;
      }
    }, {
      key: "switchToPresent",
      value: function switchToPresent() {
        this.results.msnAvatarManger.visible = false;
        this.mainPanel.visible = false;
        this.sharePanel.visible = false;
        this.presentPanel.visible = true;
      }
    }]);

    return ResultsPanelsManager;
  }(src.AbstractResultsManager);

  src.ResultsPanelsManager = ResultsPanelsManager;
})(src || (src = {}));

var src;

(function (src) {
  var DoubleTextButton =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C13) {
    _inherits(DoubleTextButton, _Phaser$GameObjects$C13);

    function DoubleTextButton(scene, x, y, text1Value, text1X, text1Y, text1Style, text1OriginX, text1OriginY, text2Value, text2X, text2Y, text2Style, text2OriginX, text2OriginY, buttonX, buttonY, defaultFrame, overFrame, downFrame, listener, listenerContext) {
      var _this40;

      var enableSound = arguments.length > 22 && arguments[22] !== undefined ? arguments[22] : true;

      _classCallCheck(this, DoubleTextButton);

      _this40 = _possibleConstructorReturn(this, _getPrototypeOf(DoubleTextButton).call(this, scene, x, y));
      _this40.button = _this40.scene.add.sprite(buttonX, buttonY, src.Settings.GAME_ATLAS, defaultFrame).setInteractive().setOrigin(0.5);

      _this40.button.on('pointerover', function () {
        if (enableSound) src.SoundController.instance.playSound('buttonOver', scene);

        _this40.button.setFrame(overFrame);
      });

      _this40.button.on('pointerout', function () {
        _this40.button.setFrame(defaultFrame);
      });

      _this40.button.on('pointerdown', listener, listenerContext);

      _this40.button.on('pointerdown', function () {
        if (enableSound) src.SoundController.instance.playSound('buttonClick', scene);

        _this40.button.setFrame(downFrame);
      });

      _this40.button.on('pointerup', function () {
        return _this40.button.setFrame(overFrame);
      });

      _this40.add(_this40.button);

      _this40.text1 = _this40.scene.add.text(text1X, text1Y, text1Value, text1Style).setOrigin(text1OriginX, text1OriginY);

      _this40.add(_this40.text1);

      _this40.text2 = _this40.scene.add.text(text2X, text2Y, text2Value, text2Style).setOrigin(text2OriginX, text2OriginY);

      _this40.add(_this40.text2);

      return _this40;
    }

    return DoubleTextButton;
  }(Phaser.GameObjects.Container);

  src.DoubleTextButton = DoubleTextButton;
})(src || (src = {}));

var src;

(function (src) {
  var PresentPanel =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C14) {
    _inherits(PresentPanel, _Phaser$GameObjects$C14);

    function PresentPanel(results, x, y) {
      var _this41;

      _classCallCheck(this, PresentPanel);

      _this41 = _possibleConstructorReturn(this, _getPrototypeOf(PresentPanel).call(this, results, x, y));
      _this41.results = results;

      _this41.buildContent();

      return _this41;
    }

    _createClass(PresentPanel, [{
      key: "buildContent",
      value: function buildContent() {
        this.panel = new src.DoubleTextButton(this.scene, 498, 295, src.LocalizationManager.getLocaleText(20), 0, -125, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, 0.5, 0.5, src.LocalizationManager.getLocaleText(28), 160, -78, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 13,
          color: "#4c8132",
          align: 'right',
          wordWrap: {
            width: 160,
            useAdvancedWrap: true
          }
        }, 1, 0, 0, 0, 'panelPresentBig0000', 'panelPresentBig0000', 'panelPresentBig0000', function () {}, this, false);
        this.add(this.panel);
        this.buttonGo = new src.TextButton(this.scene, 588, 325, src.LocalizationManager.getLocaleText(27), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'buttonPresentGo0000', 'buttonPresentGo0001', 'buttonPresentGo0000', this.goClicked, this);
        this.add(this.buttonGo);
        this.buttonSwitch = new src.TextButton(this.scene, 497, 463, src.LocalizationManager.getLocaleText(23), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 16,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'buttonShareMini0000', 'buttonShareMini0001', 'buttonShareMini0000', this.switchClicked, this);
        this.add(this.buttonSwitch);
      }
    }, {
      key: "goClicked",
      value: function goClicked() {
        window.open(shareScriptsBaseDirectoryURL + "php/zazzle.php?code=" + src.AvatarManager.AVATAR_CODE.slice() + "&image=" + escape(this.getImageURL("zazzle", src.AvatarManager.AVATAR_CODE.slice())) + "&language=" + language, "_blank");
      }
    }, {
      key: "getImageURL",
      value: function getImageURL(param1, param2) {
        var param3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        return shareScriptsBaseDirectoryURL + "php/image.php" + "?platform=" + param1 + "&code=" + param2 + (param3 != null ? "&filename=" + param3 : "") + "&key=" + md5("pocoyizepkimage" + param1 + param2);
      }
    }, {
      key: "switchClicked",
      value: function switchClicked() {
        this.results.panelsManager.switchToShare();
      }
    }]);

    return PresentPanel;
  }(Phaser.GameObjects.Container);

  src.PresentPanel = PresentPanel;
})(src || (src = {}));

var src;

(function (src) {
  var SharePanel =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C15) {
    _inherits(SharePanel, _Phaser$GameObjects$C15);

    function SharePanel(results, x, y) {
      var _this42;

      _classCallCheck(this, SharePanel);

      _this42 = _possibleConstructorReturn(this, _getPrototypeOf(SharePanel).call(this, results, x, y));
      _this42.results = results;

      _this42.buildContent();

      return _this42;
    }

    _createClass(SharePanel, [{
      key: "buildContent",
      value: function buildContent() {
        this.panelShareSocial = new src.TextButton(this.scene, 498, 235, src.LocalizationManager.getLocaleText(23), 0, -58, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 24,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'shareSocial0000', 'shareSocial0000', 'shareSocial0000', function () {}, this, false);
        this.add(this.panelShareSocial);
        this.buttonFacebook = new src.TextButton(this.scene, 498, 223, src.LocalizationManager.getLocaleText(15), 15, -1, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 11,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'buttonFacebook0000', 'buttonFacebook0001', 'buttonFacebook0000', this.shareFacebookClicked, this);
        this.add(this.buttonFacebook);
        this.buttonTwitter = new src.TextButton(this.scene, 498, 262, src.LocalizationManager.getLocaleText(26), 15, -1, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 11,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'buttonTwitter0000', 'buttonTwitter0001', 'buttonTwitter0000', this.shareTwitterClicked, this);
        this.add(this.buttonTwitter);
        this.buttonEmail = new src.TextButton(this.scene, 498, 299, src.LocalizationManager.getLocaleText(11), 15, -1, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 11,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'buttonEmail0000', 'buttonEmail0001', 'buttonEmail0000', this.shareEmailClicked, this);
        this.add(this.buttonEmail);
        this.panelShareMSN = new src.TextButton(this.scene, 498, 383, src.LocalizationManager.getLocaleText(19), 47, -28, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'shareMsn0000', 'shareMsn0001', 'shareMsn0000', this.shareMSNClicked, this);
        this.add(this.panelShareMSN);
        this.screen = this.scene.add.sprite(498, 383, src.Settings.GAME_ATLAS, 'shareMsnScreen0000').setOrigin(0.5);
        this.add(this.screen);
        this.screen.alpha = 0;
        this.buttonSwitch = new src.TextButton(this.scene, 497, 463, src.LocalizationManager.getLocaleText(20), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'buttonPresentMini0000', 'buttonPresentMini0001', 'buttonPresentMini0000', this.switchClicked, this);
        this.add(this.buttonSwitch);
      }
    }, {
      key: "shareFacebookClicked",
      value: function shareFacebookClicked() {
        window.open(shareScriptsBaseDirectoryURL + "php/facebook/facebook.php?code=" + src.AvatarManager.AVATAR_CODE.slice() + "&image=" + escape(this.getImageURL("twitter", src.AvatarManager.AVATAR_CODE.slice())) + "&language=" + language, "_blank");
      }
    }, {
      key: "shareTwitterClicked",
      value: function shareTwitterClicked() {
        window.open(shareScriptsBaseDirectoryURL + "php/twitter/twitter.php?code=" + src.AvatarManager.AVATAR_CODE.slice() + "&image=" + escape(this.getImageURL("twitter", src.AvatarManager.AVATAR_CODE.slice())) + "&language=" + language, "_blank");
      }
    }, {
      key: "shareEmailClicked",
      value: function shareEmailClicked() {
        this.results.showEmailPanel();
      }
    }, {
      key: "shareMSNClicked",
      value: function shareMSNClicked() {
        this.results.msnAvatarManger.saveClicked();
      }
    }, {
      key: "switchClicked",
      value: function switchClicked() {
        this.results.panelsManager.switchToPresent();
      }
    }, {
      key: "getImageURL",
      value: function getImageURL(param1, param2) {
        var param3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        return shareScriptsBaseDirectoryURL + "php/image.php" + "?platform=" + param1 + "&code=" + param2 + (param3 != null ? "&filename=" + param3 : "") + "&key=" + md5("pocoyizepkimage" + param1 + param2);
      }
    }]);

    return SharePanel;
  }(Phaser.GameObjects.Container);

  src.SharePanel = SharePanel;
})(src || (src = {})); ///<reference path="AbstractResultsManager.ts"/>


var src;

(function (src) {
  var MSNAvatarManager =
  /*#__PURE__*/
  function (_src$AbstractResultsM5) {
    _inherits(MSNAvatarManager, _src$AbstractResultsM5);

    function MSNAvatarManager(results) {
      var _this43;

      _classCallCheck(this, MSNAvatarManager);

      _this43 = _possibleConstructorReturn(this, _getPrototypeOf(MSNAvatarManager).call(this, results));

      _this43.buildContent();

      return _this43;
    }

    _createClass(MSNAvatarManager, [{
      key: "buildContent",
      value: function buildContent() {
        this.avatar = new src.Avatar(this.scene, 355, 407).setScale(0.7);
        this.avatar.buildFromCode(src.AvatarManager.AVATAR_CODE);
        this.add(this.avatar);
        this.avatarMask = this.scene.make.graphics({
          x: 355,
          y: 368
        });
        this.avatarMask.fillStyle(0xFFFFFF);
        this.avatarMask.beginPath();
        this.avatarMask.fillRoundedRect(-48, -48, 96, 96, 12);
        this.setMask(this.avatarMask.createGeometryMask());
        this.visible = false;
      }
    }, {
      key: "saveClicked",
      value: function saveClicked() {
        var _this44 = this;

        this.results.tweens.add({
          targets: this.results.panelsManager.sharePanel.screen,
          alpha: 1,
          duration: 50,
          onYoyo: function onYoyo() {
            _this44.saveImage();
          },
          yoyo: true
        });
      }
    }, {
      key: "saveImage",
      value: function saveImage() {
        src.App.instance.renderer.snapshot(function (screenshot) {
          var canvas = document.createElement("canvas");
          canvas.width = 96;
          canvas.height = 96;
          var context = canvas.getContext("2d");

          screenshot.onload = function () {
            // draw cropped image
            var sourceX = 355 - 48;
            var sourceY = 368 - 48;
            var sourceWidth = 96;
            var sourceHeight = 96;
            var destWidth = sourceWidth;
            var destHeight = sourceHeight;
            var destX = 0;
            var destY = 0;
            context.drawImage(screenshot, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            src.FileUtils.saveBase64AsFile(canvas.toDataURL('image/png'), 'pocoyize_msn.png');
          };
        }, 'image/png', null);
      }
    }, {
      key: "switchToShare",
      value: function switchToShare() {
        this.visible = true;
      }
    }, {
      key: "switchToPresent",
      value: function switchToPresent() {
        this.visible = false;
      }
    }]);

    return MSNAvatarManager;
  }(src.AbstractResultsManager);

  src.MSNAvatarManager = MSNAvatarManager;
})(src || (src = {}));

var src;

(function (src) {
  var EmailPanel =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C16) {
    _inherits(EmailPanel, _Phaser$GameObjects$C16);

    function EmailPanel(results, x, y) {
      var _this45;

      _classCallCheck(this, EmailPanel);

      _this45 = _possibleConstructorReturn(this, _getPrototypeOf(EmailPanel).call(this, results, x, y));
      _this45.results = results;

      _this45.buildContent();

      _this45.buildCaptions();

      _this45.buildInputFields();

      _this45.buildResultsPanel();

      _this45.visible = false;
      return _this45;
    }

    _createClass(EmailPanel, [{
      key: "buildContent",
      value: function buildContent() {
        this.panel = this.scene.add.sprite(375, 303, src.Settings.GAME_ATLAS, 'emailPanel0000').setOrigin(0.5);
        this.add(this.panel);
        this.buttonClose = new src.TextButton(this.scene, 320, 463, src.LocalizationManager.getLocaleText(5), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'orangeButton0000', 'orangeButton0001', 'orangeButton0000', this.closeClicked, this);
        this.add(this.buttonClose);
        this.buttonSend = new src.TextButton(this.scene, 435, 463, src.LocalizationManager.getLocaleText(14), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'orangeButton0000', 'orangeButton0001', 'orangeButton0000', this.sendClicked, this, true);
        this.add(this.buttonSend);
        this.buttonSendLocker = new src.TextButton(this.scene, 435, 463, src.LocalizationManager.getLocaleText(14), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'orangeButton0002', 'orangeButton0002', 'orangeButton0002', function () {}, this, false);
        this.add(this.buttonSendLocker);
      }
    }, {
      key: "buildCaptions",
      value: function buildCaptions() {
        this.header = this.scene.add.text(375, 155, src.LocalizationManager.getLocaleText(11), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 26,
          color: "#FFFFFF",
          align: 'center'
        }).setOrigin(0.5, 0.5);
        this.caption1 = this.scene.add.text(350, 225, src.LocalizationManager.getLocaleText(12), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'right'
        }).setOrigin(1, 0.5);
        this.caption2 = this.scene.add.text(350, 273, src.LocalizationManager.getLocaleText(6), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'right'
        }).setOrigin(1, 0.5);
        this.caption3 = this.scene.add.text(350, 326, src.LocalizationManager.getLocaleText(7), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'right'
        }).setOrigin(1, 0.5);
        this.caption4 = this.scene.add.text(350, 372, src.LocalizationManager.getLocaleText(8), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'right'
        }).setOrigin(1, 0.5);
        this.caption5 = this.scene.add.text(350, 418, src.LocalizationManager.getLocaleText(9), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'right'
        }).setOrigin(1, 0.5);
        this.add([this.header, this.caption1, this.caption2, this.caption3, this.caption4, this.caption5]);
      }
    }, {
      key: "buildInputFields",
      value: function buildInputFields() {
        this.yourname = document.querySelector('#yourname');
        this.email = document.querySelector('#email');
        this.email1 = document.querySelector('#email1');
        this.email2 = document.querySelector('#email2');
        this.email3 = document.querySelector('#email3');
      }
    }, {
      key: "buildResultsPanel",
      value: function buildResultsPanel() {
        this.resultPanel = new src.EmailResultsPanel(this.results, 0, 0);
        this.add(this.resultPanel);
      }
    }, {
      key: "closeClicked",
      value: function closeClicked() {
        this.results.hideEmailPanel();
      }
    }, {
      key: "sendClicked",
      value: function sendClicked() {
        var _this46 = this;

        this.results.startProcessing();
        var url = shareScriptsBaseDirectoryURL + "php/email/email.php?name=" + escape(this.yourname.value) + "&email=" + escape(this.parseEmail(this.email.value)) + "&email1=" + escape(this.parseEmail(this.email1.value)) + "&email2=" + escape(this.parseEmail(this.email2.value)) + "&email3=" + escape(this.parseEmail(this.email3.value)) + "&code=" + src.AvatarManager.AVATAR_CODE + "&image=" + escape(this.getImageURL("facebook", src.AvatarManager.AVATAR_CODE)) + "&key=" + md5("pocoyizepkemail" + this.yourname.value + this.parseEmail(this.email.value) + this.parseEmail(this.email1.value) + this.parseEmail(this.email2.value) + this.parseEmail(this.email3.value)) + "&language=" + language;
        this.httpGetAsync(url, function (succesful, response) {
          _this46.results.stopProcessing();

          _this46.resultPanel.show(succesful);
        });
      }
    }, {
      key: "httpGetAsync",
      value: function httpGetAsync(url, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(true, xmlHttp.responseText);else callback(false, xmlHttp.responseText);
        };

        xmlHttp.open("GET", url, true); // true for asynchronous

        xmlHttp.send(null);
      }
    }, {
      key: "getImageURL",
      value: function getImageURL(param1, param2) {
        var param3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        return shareScriptsBaseDirectoryURL + "php/image.php" + "?platform=" + param1 + "&code=" + param2 + (param3 != null ? "&filename=" + param3 : "") + "&key=" + md5("pocoyizepkimage" + param1 + param2);
      }
    }, {
      key: "hideButtons",
      value: function hideButtons() {
        document.querySelector('.inputContainer').style.display = 'none';
        this.buttonSend.visible = this.buttonClose.visible = false;
      }
    }, {
      key: "showButtons",
      value: function showButtons() {
        document.querySelector('.inputContainer').style.display = 'block';
        this.buttonSend.visible = this.buttonClose.visible = true;
      }
    }, {
      key: "show",
      value: function show() {
        this.visible = true;
        document.querySelector('.inputContainer').style.display = 'block';
      }
    }, {
      key: "hide",
      value: function hide() {
        this.visible = false;
        document.querySelector('.inputContainer').style.display = 'none';
      }
    }, {
      key: "update",
      value: function update() {
        if (this.yourname.value.length > 0 && this.parseEmail(this.email.value).length > 0 && (this.parseEmail(this.email1.value).length > 0 || this.parseEmail(this.email2.value).length > 0 || this.parseEmail(this.email3.value).length > 0)) {
          this.buttonSend.visible = true;
          this.buttonSendLocker.visible = false;
        } else {
          this.buttonSend.visible = false;
          this.buttonSendLocker.visible = true;
        }
      }
    }, {
      key: "parseEmail",
      value: function parseEmail(email) {
        var regex = /^([\w\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (email.length >= 1) {
          var res = regex.exec(email);

          if (!regex.test(email)) {
            return "";
          }

          if (res.index != 0) {
            return "";
          }

          return email;
        }

        return "";
      }
    }]);

    return EmailPanel;
  }(Phaser.GameObjects.Container);

  src.EmailPanel = EmailPanel;
})(src || (src = {}));

var src;

(function (src) {
  var EmailResultsPanel =
  /*#__PURE__*/
  function (_Phaser$GameObjects$C17) {
    _inherits(EmailResultsPanel, _Phaser$GameObjects$C17);

    function EmailResultsPanel(results, x, y) {
      var _this47;

      _classCallCheck(this, EmailResultsPanel);

      _this47 = _possibleConstructorReturn(this, _getPrototypeOf(EmailResultsPanel).call(this, results, x, y));
      _this47.results = results;

      _this47.buildContent();

      _this47.visible = false;
      return _this47;
    }

    _createClass(EmailResultsPanel, [{
      key: "buildContent",
      value: function buildContent() {
        this.panel = this.scene.add.sprite(375, 303, src.Settings.GAME_ATLAS, 'emailResult0000').setOrigin(0.5);
        this.add(this.panel);
        this.text = this.scene.add.text(375, 348, src.LocalizationManager.getLocaleText(11), {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 24,
          color: "#FFFFFF",
          align: 'center',
          wordWrap: {
            width: 320,
            useAdvancedWrap: true
          }
        }).setOrigin(0.5, 0.5);
        this.add(this.text);
        this.buttonClose = new src.TextButton(this.scene, 375, 463, src.LocalizationManager.getLocaleText(5), 0, 0, {
          fontFamily: src.Settings.MAIN_FONT_FAMILY,
          fontSize: 14,
          color: "#FFFFFF",
          align: 'center'
        }, '#FFFFFF', '#FFFFFF', 0, 0, 'orangeButton0000', 'orangeButton0001', 'orangeButton0000', this.closeClicked, this);
        this.add(this.buttonClose);
      }
    }, {
      key: "shareClicked",
      value: function shareClicked() {
        this.results.panelsManager.switchToShare();
      }
    }, {
      key: "closeClicked",
      value: function closeClicked() {
        this.hide();
      }
    }, {
      key: "show",
      value: function show(status) {
        this.results.emailPanel.hideButtons();
        this.visible = true;
        this.panel.setFrame('emailResult000' + (status ? 0 : 1));
        this.text.setText(status ? src.LocalizationManager.getLocaleText(13) : src.LocalizationManager.getLocaleText(10));
      }
    }, {
      key: "hide",
      value: function hide() {
        this.results.emailPanel.showButtons();
        this.visible = false;
      }
    }]);

    return EmailResultsPanel;
  }(Phaser.GameObjects.Container);

  src.EmailResultsPanel = EmailResultsPanel;
})(src || (src = {}));
//# sourceMappingURL=game.js.map

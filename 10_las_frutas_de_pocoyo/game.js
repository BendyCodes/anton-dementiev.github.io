var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                var _this = this;
                var config = {
                    type: Phaser.AUTO,
                    parent: 'game',
                    backgroundColor: 0xFFFFFF,
                    width: Config.GW,
                    height: Config.GH,
                    autoResize: true,
                    loader: {
                        crossOrigin: "anonymous"
                    },
                    physics: {
                        default: 'arcade',
                        arcade: {
                            gravity: { y: 1500 },
                            debug: false
                        }
                    },
                    callbacks: {
                        postBoot: function (game) {
                        }
                    },
                };
                _this = _super.call(this, config) || this;
                if (!_this.device.os.desktop) {
                    Config.isMobile = true;
                }
                Config.currentLang = document.documentElement.lang;
                var canvas = document.querySelector("canvas");
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var windowRatio = windowWidth / windowHeight;
                var gameRatio = Config.GW / Config.GH;
                if (windowRatio < gameRatio) {
                    canvas.style.width = windowWidth + "px";
                    canvas.style.height = (windowWidth / gameRatio) + "px";
                }
                else {
                    canvas.style.width = (windowHeight * gameRatio) + "px";
                    canvas.style.height = windowHeight + "px";
                }
                var myListenerWithContext = onResize.bind(_this);
                window.addEventListener('resize', myListenerWithContext);
                function onResize() {
                    var canvas = document.querySelector("canvas");
                    var windowWidth = window.innerWidth;
                    var windowHeight = window.innerHeight;
                    var windowRatio = windowWidth / windowHeight;
                    var gameRatio = Config.GW / Config.GH;
                    if (windowRatio < gameRatio) {
                        canvas.style.width = windowWidth + "px";
                        canvas.style.height = (windowWidth / gameRatio) + "px";
                    }
                    else {
                        canvas.style.width = (windowHeight * gameRatio) + "px";
                        canvas.style.height = windowHeight + "px";
                    }
                    if (window.innerWidth > window.innerHeight) {
                        var rp_img = document.getElementById("rp-img");
                        rp_img.style.visibility = 'hidden';
                        var bg_img = document.getElementById("bg-img");
                        bg_img.style.visibility = 'hidden';
                    }
                    else {
                        var rp_img = document.getElementById("rp-img");
                        rp_img.style.visibility = 'visible';
                        var bg_img = document.getElementById("bg-img");
                        bg_img.style.visibility = 'visible';
                    }
                }
                if (window.innerWidth > window.innerHeight) {
                    var rp_img = document.getElementById("rp-img");
                    rp_img.style.visibility = 'hidden';
                    var bg_img = document.getElementById("bg-img");
                    bg_img.style.visibility = 'hidden';
                }
                else {
                    Config.orient = false;
                    var rp_img = document.getElementById("rp-img");
                    rp_img.style.visibility = 'visible';
                    var bg_img = document.getElementById("bg-img");
                    bg_img.style.visibility = 'visible';
                }
                _this.scene.add(Scenes.BOOT, Client.Boot, false);
                _this.scene.add(Scenes.PRELOADER, Client.Preloader, false);
                _this.scene.add(Scenes.MAINMENU, Client.MainMenu, false);
                _this.scene.add(Scenes.GAME, Client.Game, false);
                _this.scene.add(Scenes.COMPLETE, Client.Complete, false);
                _this.scene.start(Scenes.BOOT);
                return _this;
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
window.onload = function () {
    new PhaserGame.Client.GameEngine();
};
var Config;
(function (Config) {
    Config.DOM_PARENT_ID = 'game';
    Config.GW = 809;
    Config.GH = 566;
    Config.orient = false;
    Config.FPS = 12;
    Config.scaleFactor = 1;
    Config.useLevel = 1;
    Config.isMobile = false;
    Config.isLockOrientation = true;
    Config.lockOrientationMobileOnly = true;
    Config.lockOrientationLand = true;
})(Config || (Config = {}));
var DB;
(function (DB) {
    DB.ITEMS = [
        { name: 'r', fr: 'red-item', sel: 'red-item-sel', sector: 'red-sector' },
        { name: 'g', fr: 'green-item', sel: 'green-item-sel', sector: 'green-sector' },
        { name: 'b', fr: 'blue-item', sel: 'blue-item-sel', sector: 'blue-sector' }
    ];
})(DB || (DB = {}));
var Params;
(function (Params) {
    Params.isTapToStartBtn = false;
})(Params || (Params = {}));
var score;
(function (score) {
    score.value = 0;
    score.bestScore = 0;
    function addScore() {
        score.value += 5;
    }
    score.addScore = addScore;
    function addCompleteScore(time) {
        score.value += Math.round(time + 15);
    }
    score.addCompleteScore = addCompleteScore;
    function removeScore() {
        score.value -= 10;
    }
    score.removeScore = removeScore;
})(score || (score = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gButton = (function (_super) {
            __extends(gButton, _super);
            function gButton(scene, x, y, texture, normal, on, down) {
                var _this = _super.call(this, scene, x, y, texture, normal) || this;
                _this.eventName = '';
                _this.gtexture = texture;
                _this.gon = on;
                _this.gdown = down;
                _this.gnormal = normal;
                _this.setInteractive();
                _this.on('pointerdown', _this.pointerDown, _this);
                _this.on('pointerout', _this.pointerOut, _this);
                _this.on('pointerup', _this.pointerUp, _this);
                _this.on('pointerover', _this.pointerOver, _this);
                return _this;
            }
            gButton.prototype.pointerDown = function () {
                this.setTexture(this.gtexture, this.gdown);
                if (this.eventName != '') {
                    this.scene.events.emit(this.eventName);
                    this.setTexture(this.gtexture, this.gnormal);
                }
            };
            gButton.prototype.setEventName = function (eName) {
                this.eventName = eName;
            };
            gButton.prototype.getEventName = function () {
                return this.eventName;
            };
            gButton.prototype.pointerOut = function () {
                this.setTexture(this.gtexture, this.gnormal);
            };
            gButton.prototype.pointerUp = function () {
                this.setTexture(this.gtexture, this.gon);
            };
            gButton.prototype.pointerOver = function () {
                this.setTexture(this.gtexture, this.gon);
                SndMng.sfxPlay('sound3');
            };
            return gButton;
        }(Phaser.GameObjects.Sprite));
        Client.gButton = gButton;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gExitDialog = (function (_super) {
            __extends(gExitDialog, _super);
            function gExitDialog(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'game', 'bg') || this;
                _this.setInteractive();
                _this.depth = _this.scene.data.count + 1;
                _this.displayWidth = Config.GW;
                _this.displayHeight = Config.GH;
                _this.visible = false;
                return _this;
            }
            gExitDialog.prototype.show = function () {
                this.visible = true;
                if (!this.panel) {
                    this.panel = new Phaser.GameObjects.Sprite(this.scene, Config.GW / 2, Config.GH / 2, 'game', 'exitdialog');
                    this.panel.setScale(1 * Config.scaleFactor);
                    this.scene.add.existing(this.panel);
                }
                else {
                    this.panel.visible = true;
                }
                if (!this.btnNo) {
                    this.btnNo = new Client.gButton(this.scene, Config.GW / 2 - this.panel.displayWidth / 4, Config.GH / 2 + this.panel.displayHeight / 4, 'game', 'btn_no0001', 'btn_no0002', 'btn_no0003');
                    this.btnNo.setScale(1 * Config.scaleFactor);
                    this.btnNo.setEventName('btnNo');
                    this.scene.events.on(this.btnNo.getEventName(), this.hide, this);
                    this.scene.add.existing(this.btnNo);
                }
                else {
                    this.btnNo.visible = true;
                }
                if (!this.btnYes) {
                    this.btnYes = new Client.gButton(this.scene, Config.GW / 2 + this.panel.displayWidth / 4, Config.GH / 2 + this.panel.displayHeight / 4, 'game', 'btn_yes0001', 'btn_yes0002', 'btn_yes0003');
                    this.btnYes.setScale(1 * Config.scaleFactor);
                    this.btnYes.on('pointerdown', this.onExit, this);
                    this.scene.add.existing(this.btnYes);
                }
                else {
                    this.btnYes.visible = true;
                }
                if (!this.text) {
                    var Titletext;
                    try {
                        Titletext = Config.langXML.querySelector('[id="EstasSeguro"]').querySelector(Config.currentLang).textContent;
                    }
                    catch (error) {
                        Titletext = Config.langXML.querySelector('[id="EstasSeguro"]').querySelector('en').textContent;
                    }
                    this.text = new Phaser.GameObjects.Text(this.scene, Config.GW / 2, Config.GH / 2 - this.panel.displayHeight / 6, Titletext, { fontFamily: 'Arial', fontSize: 35 * Config.scaleFactor, color: '#E6F5FD', fontStyle: 'bold' });
                    this.scene.add.existing(this.text);
                    this.text.setAlign('center');
                    this.text.setOrigin(0.5);
                    this.text.setWordWrapWidth(500 * Config.scaleFactor);
                }
                else {
                    this.text.visible = true;
                }
                this.depth = this.scene.data.count + 1;
                this.panel.depth = this.scene.data.count + 1;
                this.btnNo.depth = this.scene.data.count + 1;
                this.btnYes.depth = this.scene.data.count + 1;
                this.text.depth = this.scene.data.count + 1;
            };
            gExitDialog.prototype.hide = function () {
                this.visible = false;
                this.panel.visible = false;
                this.btnNo.visible = false;
                this.btnYes.visible = false;
                this.text.visible = false;
            };
            gExitDialog.prototype.onExit = function () {
                this.scene.scene.start(Scenes.MAINMENU);
            };
            return gExitDialog;
        }(Phaser.GameObjects.Sprite));
        Client.gExitDialog = gExitDialog;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oFruit = (function (_super) {
            __extends(oFruit, _super);
            function oFruit(scene, x, y, type) {
                var _this = this;
                var name = 'fruitgood0001';
                if (type == 1) {
                    name = 'fruitgood000';
                    var indx = uMath.random(1, 16);
                    if (indx > 9) {
                        name = 'fruitgood00';
                    }
                    name = name + indx;
                }
                if (type == 2) {
                    name = 'fruitbad000';
                    var indx = uMath.random(1, 3);
                    name = name + indx;
                }
                _this = _super.call(this, scene, x, y, 'game', name) || this;
                _this.myType = type;
                _this.tween = _this.scene.tweens.add({
                    targets: _this,
                    scaleX: 0.8,
                    scaleY: 0.8,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                return _this;
            }
            oFruit.prototype.pick = function (group) {
                group.remove(this);
                this.tween.stop();
                if (this.myType == 1) {
                    score.addScore();
                    this.play('pick');
                    this.setScale(1.2);
                    SndMng.sfxPlay('sound14');
                }
                else {
                    score.removeScore();
                    this.play('badpick');
                    this.setScale(1.2);
                    SndMng.sfxPlay('sound5');
                }
            };
            return oFruit;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oFruit = oFruit;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlayer = (function (_super) {
            __extends(oPlayer, _super);
            function oPlayer(scene, x, y) {
                return _super.call(this, scene, x, y, 'game', 'pocoyo0001') || this;
            }
            return oPlayer;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlayer = oPlayer;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                this.load.atlas('preload', './assets/atlases/preload.png', './assets/atlases/preload.json');
                this.load.xml('lang', './assets/localization/localization.xml');
            };
            Boot.prototype.create = function () {
                this.game.scene.start(Scenes.PRELOADER);
                SndMng.init(this.sound, true);
            };
            return Boot;
        }(Phaser.Scene));
        Client.Boot = Boot;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Complete = (function (_super) {
            __extends(Complete, _super);
            function Complete() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Complete.prototype.create = function () {
                var Panel = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'game', 'complete2');
                Panel.setScale(1 * Config.scaleFactor);
                this.add.existing(Panel);
                var btnPlay = new Client.gButton(this, Config.GW / 2, Config.GH / 2, 'game', 'btn_play0001', 'btn_play0002', 'btn_play0003');
                btnPlay.setScale(0.8 * Config.scaleFactor);
                btnPlay.setEventName('startGame');
                this.events.on(btnPlay.getEventName(), this.playGame, this);
                this.add.existing(btnPlay);
                btnPlay.x += Panel.displayWidth / 3;
                btnPlay.y += btnPlay.displayHeight / 3;
                var btnClose = new Client.gButton(this, Config.GW / 2, Config.GH / 2, 'game', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                btnClose.setScale(0.8 * Config.scaleFactor);
                btnClose.setEventName('ExitGame');
                this.events.on(btnClose.getEventName(), this.closeGame, this);
                this.add.existing(btnClose);
                btnClose.x -= Panel.displayWidth / 3;
                btnClose.y += btnClose.displayHeight / 3;
                var Titletext;
                try {
                    Titletext = Config.langXML.querySelector('[id="OverPuntos"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    Titletext = Config.langXML.querySelector('[id="OverPuntos"]').querySelector('en').textContent;
                }
                var str = '' + Titletext;
                str = str.split('${0}').join('' + score.value);
                var text = new Phaser.GameObjects.Text(this, Config.GW / 2, Config.GH / 2 - Panel.displayHeight / 2.8, str, { fontFamily: 'Arial', fontSize: 24 * Config.scaleFactor, color: '#E6F5FD' });
                this.add.existing(text);
                text.setAlign('center');
                text.setOrigin(0.5);
                text.setWordWrapWidth(450 * Config.scaleFactor);
                var tickets;
                try {
                    tickets = Config.langXML.querySelector('[id="OverTickets"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    tickets = Config.langXML.querySelector('[id="OverTickets"]').querySelector('en').textContent;
                }
                var rewardtickets;
                if (score.value < 500) {
                    rewardtickets = Math.round(score.value / 50);
                }
                else if (score.value < 1000) {
                    rewardtickets = 10 + Math.round((score.value - 500) / 100);
                }
                else {
                    rewardtickets = 15 + Math.round((score.value - 1000) / 50);
                }
                rewardtickets++;
                str = '' + tickets;
                str = str.split('${0}').join('' + rewardtickets);
                var ticketstext = new Phaser.GameObjects.Text(this, Config.GW / 2, Config.GH / 2 - Panel.displayHeight / 4, str, { fontFamily: 'Arial', fontSize: 24 * Config.scaleFactor, color: '#E6F5FD' });
                this.add.existing(ticketstext);
                ticketstext.setAlign('center');
                ticketstext.setOrigin(0.5);
                ticketstext.setWordWrapWidth(450 * Config.scaleFactor);
                var best;
                try {
                    best = Config.langXML.querySelector('[id="OverEnhorabuena"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    best = Config.langXML.querySelector('[id="OverEnhorabuena"]').querySelector('en').textContent;
                }
                var beststext = new Phaser.GameObjects.Text(this, Config.GW / 2, Config.GH / 2 - Panel.displayHeight / 8, best, { fontFamily: 'Arial', fontSize: 24 * Config.scaleFactor, color: '#E6F5FD' });
                this.add.existing(beststext);
                beststext.setAlign('center');
                beststext.setOrigin(0.5);
                beststext.setWordWrapWidth(450 * Config.scaleFactor);
                beststext.visible = false;
                if (score.value > score.bestScore) {
                    beststext.visible = true;
                    score.bestScore = score.value;
                }
                SndMng.stopAllMusic();
                SndMng.playMusic('sound10');
            };
            Complete.prototype.playGame = function () {
                SndMng.stopAll();
                Config.useLevel = 1;
                score.value = 0;
                if (Config.useLevel > 5) {
                    Config.useLevel = 1;
                }
                this.scene.start(Scenes.GAME);
            };
            Complete.prototype.closeGame = function () {
                this.scene.start(Scenes.MAINMENU);
            };
            Complete.prototype.update = function () {
            };
            return Complete;
        }(Phaser.Scene));
        Client.Complete = Complete;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.groundArray = [];
                _this.complete = false;
                _this.collectBag = 0;
                _this.tap = false;
                return _this;
            }
            Game.prototype.myDestroy = function () {
                this.player.destroy();
                this.player = null;
                this.anims.remove('pick');
                this.anims.remove('badpick');
                this.anims.remove('move');
                this.anims.remove('jump');
                this.anims.remove('idle');
                this.anims.remove('complete');
                this.anims.remove('timesup');
                this.anims.remove('time');
                this.anims.remove('ready');
                this.collectBag = 0;
            };
            Game.prototype.create = function () {
                if (Config.isMobile) {
                    this.tap = false;
                }
                else {
                    this.tap = true;
                }
                this.countFruit = 0;
                this.complete = false;
                this.groundArray = [];
                this.timeToReady = 3;
                this.staticGroup = new Phaser.Physics.Arcade.StaticGroup(this.scene.scene.physics.world, this);
                this.fruitGroup = new Phaser.Physics.Arcade.Group(this.scene.scene.physics.world, this, { allowGravity: false });
                this.physics.world.setBounds(0, 0, Config.GW, Config.GH * 2);
                var lvlJSON = this.cache.json.get('levels');
                var numLevel = Config.useLevel;
                this.levelTime = lvlJSON['data']['niveles']['nivel'][numLevel]['_tiempo'];
                var lenghtPlatform = lvlJSON['data']['niveles']['nivel'][numLevel]['plataformas']['plataforma'].length;
                for (var j = 0; j < lenghtPlatform; j++) {
                    var pX = lvlJSON['data']['niveles']['nivel'][numLevel]['plataformas']['plataforma'][j]['_x'];
                    var pY = lvlJSON['data']['niveles']['nivel'][numLevel]['plataformas']['plataforma'][j]['_y'];
                    var pLen = lvlJSON['data']['niveles']['nivel'][numLevel]['plataformas']['plataforma'][j]['_cant'];
                    var ptype = lvlJSON['data']['niveles']['nivel'][numLevel]['_mundo'];
                    this.buildPlatform(pX, pY, pLen, ptype);
                }
                var lenghtObject = lvlJSON['data']['niveles']['nivel'][numLevel]['objects'].length;
                for (var k = 0; k < lenghtObject; k++) {
                    var oX = lvlJSON['data']['niveles']['nivel'][numLevel]['objects'][k]['_x'];
                    var oY = lvlJSON['data']['niveles']['nivel'][numLevel]['objects'][k]['_y'];
                    var oFrame = 'objects' + lvlJSON['data']['niveles']['nivel'][numLevel]['objects'][k]['_frame'];
                    this.buildObjects(oX, Number(oY) + 5, oFrame);
                }
                var bX = lvlJSON['data']['niveles']['nivel'][numLevel]['bag']['_x'];
                var bY = lvlJSON['data']['niveles']['nivel'][numLevel]['bag']['_y'];
                this.pBag = new Phaser.GameObjects.Sprite(this, bX, bY, 'game', 'bag0001');
                this.add.existing(this.pBag);
                var lenghtFruit = lvlJSON['data']['niveles']['nivel'][numLevel]['mariposas']['mariposa'].length;
                for (var i = 0; i < lenghtFruit; i++) {
                    var fX = lvlJSON['data']['niveles']['nivel'][numLevel]['mariposas']['mariposa'][i]['_x'];
                    var fY = lvlJSON['data']['niveles']['nivel'][numLevel]['mariposas']['mariposa'][i]['_y'];
                    var fType = lvlJSON['data']['niveles']['nivel'][numLevel]['mariposas']['mariposa'][i]['_tipo'];
                    var fruit = new Client.oFruit(this, Number(fX), Number(fY), fType);
                    this.add.existing(fruit);
                    if (fType == 1) {
                        this.countFruit++;
                        this.collectBag++;
                    }
                    fruit.y = fruit.y + fruit.displayHeight / 4;
                    this.fruitGroup.add(fruit);
                }
                var framePick = this.anims.generateFrameNames('game', {
                    start: 1, end: 19, zeroPad: 4,
                    prefix: 'pick', suffix: ''
                });
                this.anims.create({ key: 'pick', frames: framePick, frameRate: 24, repeat: 0 });
                var frameBadPick = this.anims.generateFrameNames('game', {
                    start: 1, end: 19, zeroPad: 4,
                    prefix: 'badpick', suffix: ''
                });
                this.anims.create({ key: 'badpick', frames: frameBadPick, frameRate: 24, repeat: 0 });
                var frameTime = this.anims.generateFrameNames('game', {
                    start: 1, end: 12, zeroPad: 4,
                    prefix: 'timepanel', suffix: ''
                });
                this.anims.create({ key: 'time', frames: frameTime, frameRate: 24, repeat: -1 });
                var frameReady = this.anims.generateFrameNames('game', {
                    start: 1, end: 21, zeroPad: 4,
                    prefix: 'ready', suffix: ''
                });
                this.anims.create({ key: 'ready', frames: frameReady, frameRate: 24, repeat: 0 });
                this.createPlayer();
                this.physics.add.collider(this.player, this.staticGroup);
                this.physics.add.overlap(this.player, this.fruitGroup, this.collider, null, this);
                this.btnClose = new Client.gButton(this, Config.GW, Config.GH, 'menu', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                this.btnClose.setScale(0.5 * Config.scaleFactor);
                this.btnClose.setEventName('ExitGame');
                this.events.on(this.btnClose.getEventName(), this.closeGame, this);
                this.add.existing(this.btnClose);
                this.btnClose.x = Config.GW - this.btnClose.displayWidth / 2;
                this.btnClose.y = Config.GH - this.btnClose.displayHeight / 2;
                this.input.on('pointerup', this.jump, this);
                if (Config.isMobile) {
                    this.input.on('pointerdown', this.Tap, this);
                }
                if (Config.useLevel == 1) {
                    SndMng.stopAllMusic();
                    SndMng.playMusic('sound8');
                }
                this.exdlg = new Client.gExitDialog(this, Config.GW / 2, Config.GH / 2);
                this.add.existing(this.exdlg);
                this.globalTimer = this.time.addEvent({
                    delay: 1000,
                    callback: this.onTimer.bind(this),
                    loop: true
                });
                this.timePanel = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'game', 'timepanel0001');
                this.add.existing(this.timePanel);
                this.timePanel.y = 0 + this.timePanel.displayHeight;
                this.timePanel.anims.play('time');
                this.timerText = new Phaser.GameObjects.Text(this, this.timePanel.x, this.timePanel.y, this.levelTime, { fontFamily: 'Arial', fontSize: 25 * Config.scaleFactor, color: '#666666' });
                this.add.existing(this.timerText);
                this.timerText.setAlign('center');
                this.timerText.setOrigin(0.5);
                this.timerText.setWordWrapWidth(500 * Config.scaleFactor);
                this.pointPanel = new Phaser.GameObjects.Sprite(this, Config.GW, this.timePanel.y, 'game', 'pointpanel');
                this.add.existing(this.pointPanel);
                this.pointPanel.x = Config.GW / 2 + this.pointPanel.displayHeight * 3.5;
                this.levelPanel = new Phaser.GameObjects.Sprite(this, Config.GW, this.timePanel.y, 'game', 'levelpanel');
                this.add.existing(this.levelPanel);
                this.levelPanel.x = Config.GW / 2 - this.levelPanel.displayHeight * 3.5;
                this.levelText = new Phaser.GameObjects.Text(this, this.levelPanel.x - this.levelPanel.displayWidth / 3.3, this.timePanel.y, '' + Config.useLevel, { fontFamily: 'Arial', fontSize: 25 * Config.scaleFactor, color: '#666666' });
                this.add.existing(this.levelText);
                this.levelText.setAlign('center');
                this.levelText.setOrigin(0.5);
                this.levelText.setWordWrapWidth(500 * Config.scaleFactor);
                var lvltext;
                try {
                    lvltext = Config.langXML.querySelector('[id="NivelEstatico"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    lvltext = Config.langXML.querySelector('[id="NivelEstatico"]').querySelector('en').textContent;
                }
                var lText = new Phaser.GameObjects.Text(this, this.levelPanel.x + this.levelPanel.displayWidth / 8, this.levelPanel.y + this.levelPanel.displayHeight / 4, lvltext, { fontFamily: 'Arial', fontSize: 16 * Config.scaleFactor, color: '#FFFFFF' });
                this.add.existing(lText);
                lText.setAlign('center');
                lText.setOrigin(0.5);
                lText.setWordWrapWidth(500 * Config.scaleFactor);
                this.pointText = new Phaser.GameObjects.Text(this, this.pointPanel.x + this.pointPanel.displayWidth / 3.2, this.pointPanel.y, '' + score.value, { fontFamily: 'Arial', fontSize: 25 * Config.scaleFactor, color: '#666666' });
                this.add.existing(this.pointText);
                this.pointText.setAlign('center');
                this.pointText.setOrigin(0.5);
                this.pointText.setWordWrapWidth(500 * Config.scaleFactor);
                var pointtext;
                try {
                    pointtext = Config.langXML.querySelector('[id="PuntosEstatico"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    pointtext = Config.langXML.querySelector('[id="PuntosEstatico"]').querySelector('en').textContent;
                }
                var pText = new Phaser.GameObjects.Text(this, this.pointPanel.x - this.pointPanel.displayWidth / 8, this.pointPanel.y + this.pointPanel.displayHeight / 4, pointtext, { fontFamily: 'Arial', fontSize: 16 * Config.scaleFactor, color: '#FFFFFF' });
                this.add.existing(pText);
                pText.setAlign('center');
                pText.setOrigin(0.5);
                pText.setWordWrapWidth(500 * Config.scaleFactor);
                this.readySprite = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'game', 'ready0001');
                this.add.existing(this.readySprite);
                this.timePanel.anims.play('time');
                this.readySprite.setScale(0.62);
                this.textToReady = new Phaser.GameObjects.Text(this, Config.GW / 2, Config.GH / 2, this.timeToReady, { fontFamily: 'Arial', fontSize: 60 * Config.scaleFactor, color: '#FFFFFF', fontStyle: 'bold' });
                this.add.existing(this.textToReady);
                this.textToReady.setAlign('center');
                this.textToReady.setOrigin(0.5);
                this.textToReady.setWordWrapWidth(500 * Config.scaleFactor);
                var completetext;
                try {
                    completetext = Config.langXML.querySelector('[id="NivelCompletado"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    completetext = Config.langXML.querySelector('[id="NivelCompletado"]').querySelector('en').textContent;
                }
                this.completeText = new Phaser.GameObjects.Text(this, Config.GW / 2, Config.GH / 2, completetext, { fontFamily: 'Arial', fontSize: 26 * Config.scaleFactor, color: '#356A9F' });
                this.add.existing(this.completeText);
                this.completeText.setAlign('center');
                this.completeText.setOrigin(0.5);
                this.completeText.visible = false;
                this.completeText.setWordWrapWidth(500 * Config.scaleFactor);
            };
            Game.prototype.onTimer = function () {
                if (this.readySprite.visible) {
                    if (this.timeToReady == 3) {
                        SndMng.sfxPlay('sound11');
                    }
                    if (this.timeToReady > 0) {
                        this.textToReady.text = this.timeToReady;
                        this.readySprite.play('ready');
                        this.timeToReady--;
                    }
                    else {
                        var gotext;
                        try {
                            gotext = Config.langXML.querySelector('[id="Ya"]').querySelector(Config.currentLang).textContent;
                        }
                        catch (error) {
                            gotext = Config.langXML.querySelector('[id="Ya"]').querySelector('en').textContent;
                        }
                        this.textToReady.text = gotext;
                        this.readySprite.alpha = 0;
                        this.textToReady.setColor('#FF9900');
                        var tween = this.tweens.add({
                            targets: this.readySprite,
                            alpha: 0,
                            duration: 1100,
                            onComplete: this.goLevel.bind(this)
                        });
                    }
                }
                else {
                    if (!this.complete) {
                        this.levelTime--;
                        this.timerText.text = this.levelTime;
                    }
                }
            };
            Game.prototype.goLevel = function () {
                this.readySprite.visible = false;
                this.textToReady.visible = false;
            };
            Game.prototype.closeGame = function () {
                this.exdlg.show();
            };
            Game.prototype.jump = function () {
                if (Config.isMobile) {
                    this.tap = false;
                }
                if (!this.exdlg.visible && !this.readySprite.visible)
                    if (!this.complete) {
                        if (this.player.body.touching.down) {
                            this.player.setVelocityY(-820);
                            this.player.anims.play('jump');
                            SndMng.sfxPlay('sound1');
                        }
                    }
            };
            Game.prototype.Tap = function () {
                this.tap = true;
            };
            Game.prototype.collider = function (player, fruit) {
                if (fruit.myType == 1) {
                    this.countFruit--;
                }
                fruit.pick(this.fruitGroup);
            };
            Game.prototype.createPlayer = function () {
                this.player = new Client.oPlayer(this, 96, 515).setOrigin(0.5);
                this.add.existing(this.player);
                this.physics.add.existing(this.player);
                this.player.setCollideWorldBounds(true);
                this.player.setSize(20, 50);
                this.player.setOffset(113, 90);
                var frameleft = this.anims.generateFrameNames('game', {
                    start: 24, end: 40, zeroPad: 4,
                    prefix: 'pocoyo', suffix: ''
                });
                this.anims.create({ key: 'move', frames: frameleft, frameRate: 24, repeat: -1 });
                var frameJump = this.anims.generateFrameNames('game', {
                    start: 92, end: 111, zeroPad: 4,
                    prefix: 'pocoyo', suffix: ''
                });
                this.anims.create({ key: 'jump', frames: frameJump, frameRate: 20, repeat: 0 });
                var frameidle = this.anims.generateFrameNames('game', {
                    start: 1, end: 10, zeroPad: 4,
                    prefix: 'pocoyo', suffix: ''
                });
                this.anims.create({ key: 'idle', frames: frameidle, frameRate: 24, repeat: -1 });
                this.player.play('idle');
                var frameComplete = this.anims.generateFrameNames('game', {
                    start: 150, end: 180, zeroPad: 4,
                    prefix: 'pocoyo', suffix: ''
                });
                this.anims.create({ key: 'complete', frames: frameComplete, frameRate: 24, repeat: 0 });
                var frameTimesUp = this.anims.generateFrameNames('game', {
                    start: 181, end: 220, zeroPad: 4,
                    prefix: 'pocoyo', suffix: ''
                });
                this.anims.create({ key: 'timesup', frames: frameTimesUp, frameRate: 24, repeat: 0 });
                this.player.play('idle');
            };
            Game.prototype.buildObjects = function (oX, oY, oFrame) {
                var pBody = new Phaser.GameObjects.Sprite(this, oX, oY, 'game', oFrame);
                this.add.existing(pBody);
            };
            Game.prototype.buildPlatform = function (px, py, plen, ptype) {
                var startBlock = 1 + ((ptype - 1) * 3);
                var midleBlock = 2 + ((ptype - 1) * 3);
                var endBlock = 3 + ((ptype - 1) * 3);
                var buildBlock = startBlock;
                for (var i = 0; i < plen; i++) {
                    if (i > 0) {
                        buildBlock = midleBlock;
                    }
                    if (i == plen - 1) {
                        buildBlock = endBlock;
                    }
                    var name = 'tile' + '000' + buildBlock;
                    if (buildBlock >= 10) {
                        name = 'tile' + '00' + buildBlock;
                    }
                    var tx = Number(px) + 40 * i;
                    var pBody = new Phaser.Physics.Arcade.Sprite(this, tx, py, 'game', name).setOrigin(0, 0);
                    this.add.existing(pBody);
                    this.staticGroup.add(pBody);
                }
            };
            Game.prototype.update = function () {
                this.input.setDefaultCursor('url(./assets/sprites/curs.cur), pointer');
                this.pointText.text = score.value;
                if (!this.exdlg.visible && !this.readySprite.visible) {
                    if (!this.complete) {
                        for (var i = 0; i < this.staticGroup.getLength(); i++) {
                            var tbody = this.staticGroup.getChildren()[i];
                            if (tbody.y < this.player.y) {
                                this.groundArray.push(tbody);
                                this.staticGroup.remove(tbody);
                            }
                        }
                        for (var i = 0; i < this.groundArray.length; i++) {
                            var tbody = this.groundArray[i];
                            if (tbody.y > this.player.y) {
                                this.staticGroup.add(tbody);
                                this.groundArray.splice(i, 1);
                            }
                        }
                        var mX = this.input.mouse.manager.activePointer.x;
                        var mY = this.input.mouse.manager.activePointer.y;
                        var distance = uMath.distance(mX, 0, this.player.x, 0);
                        if ((distance > 30) && (this.tap)) {
                            if (mX > this.player.x) {
                                this.input.setDefaultCursor('url(./assets/sprites/right.png), pointer');
                                this.player.setVelocityX(180);
                                if (this.player.anims.currentAnim) {
                                    if (this.player.anims.currentAnim.key != 'move') {
                                        if (this.player.body.touching.down) {
                                            this.player.anims.play('move');
                                        }
                                    }
                                }
                                this.player.flipX = true;
                            }
                            else {
                                this.input.setDefaultCursor('url(./assets/sprites/left.png), pointer');
                                this.player.setVelocityX(-180);
                                if (this.player.anims.currentAnim) {
                                    if (this.player.anims.currentAnim.key != 'move') {
                                        if (this.player.body.touching.down) {
                                            this.player.anims.play('move');
                                        }
                                    }
                                }
                                this.player.flipX = false;
                            }
                        }
                        else {
                            this.player.setVelocityX(0);
                            if (this.player.anims.currentAnim) {
                                if (this.player.anims.currentAnim.key != 'idle') {
                                    if (this.player.body.touching.down) {
                                        this.player.anims.play('idle');
                                    }
                                }
                            }
                        }
                        if (!this.player.body.touching.down) {
                            if (this.player.anims.currentAnim.key != 'jump') {
                                this.player.anims.play('jump');
                            }
                        }
                        var percent = uMath.toPercent(this.countFruit, this.collectBag);
                        percent = 100 - percent;
                        var pFrame = uMath.fromPercent(percent, 6);
                        pFrame = Math.round(pFrame);
                        if (pFrame <= 0) {
                            pFrame = 1;
                        }
                        if (this.pBag.frame.name != ('bag000' + pFrame)) {
                            this.pBag.setTexture('game', 'bag000' + pFrame);
                        }
                        if (this.countFruit <= 0) {
                            if (this.player.body.touching.down) {
                                if (this.player.anims.currentAnim.key != 'jump') {
                                    if (this.player.body.velocity.y == 0) {
                                        score.addCompleteScore(this.levelTime);
                                        if (Config.useLevel < 12) {
                                            SndMng.sfxPlay('sound12');
                                        }
                                        else {
                                            SndMng.sfxPlay('sound13');
                                        }
                                        this.complete = true;
                                        this.player.anims.play('complete');
                                        this.player.setVelocityX(0);
                                        this.btnClose.visible = false;
                                        var tween = this.tweens.add({
                                            targets: this.btnClose,
                                            alpha: 1,
                                            duration: 2200,
                                            onComplete: this.LevelPass.bind(this)
                                        });
                                        this.completeText.visible = true;
                                    }
                                }
                            }
                        }
                        if (this.levelTime <= 0) {
                            var timeUptetext;
                            try {
                                timeUptetext = Config.langXML.querySelector('[id="TiempoAgotado"]').querySelector(Config.currentLang).textContent;
                            }
                            catch (error) {
                                timeUptetext = Config.langXML.querySelector('[id="TiempoAgotado"]').querySelector('en').textContent;
                            }
                            this.player.anims.play('timesup');
                            this.complete = true;
                            this.completeText.text = timeUptetext;
                            this.completeText.visible = true;
                            SndMng.sfxPlay('sound9');
                            var tween = this.tweens.add({
                                targets: this.btnClose,
                                alpha: 1,
                                duration: 2200,
                                onComplete: this.LevelFiled.bind(this)
                            });
                        }
                    }
                }
                else {
                    this.player.setVelocityX(0);
                }
            };
            Game.prototype.LevelFiled = function () {
                this.myDestroy();
                this.scene.start(Scenes.COMPLETE);
            };
            Game.prototype.LevelPass = function () {
                if (Config.useLevel < 12) {
                    Config.useLevel++;
                    this.myDestroy();
                    this.scene.restart();
                }
                else {
                    this.myDestroy();
                    this.scene.start(Scenes.COMPLETE);
                }
            };
            return Game;
        }(Phaser.Scene));
        Client.Game = Game;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                Config.useLevel = 1;
                score.value = 0;
                var wH = Config.GH;
                var wW = Config.GW;
                var logo = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'menu', 'logo').setOrigin(0.45, 0.45);
                logo.setScale(1 * Config.scaleFactor);
                this.add.existing(logo);
                var btnPlay = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_play0001', 'btn_play0002', 'btn_play0003');
                btnPlay.setScale(Config.scaleFactor);
                btnPlay.setEventName('startGame');
                this.events.on(btnPlay.getEventName(), this.playGame, this);
                this.add.existing(btnPlay);
                btnPlay.x = wW - btnPlay.displayWidth;
                btnPlay.y = wH - btnPlay.displayHeight;
                var btnClose = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                btnClose.setScale(Config.scaleFactor);
                btnClose.setEventName('ExitGame');
                this.events.on(btnClose.getEventName(), this.closeGame, this);
                this.add.existing(btnClose);
                btnClose.x = btnClose.displayWidth;
                btnClose.y = wH - btnClose.displayHeight;
                var Titletext;
                try {
                    Titletext = Config.langXML.querySelector('[id="Titulo"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    Titletext = Config.langXML.querySelector('[id="Titulo"]').querySelector('en').textContent;
                }
                var gameNeme = new Phaser.GameObjects.Text(this, wW / 2, wH / 2, Titletext, { fontFamily: 'Arial', fontSize: 100 * Config.scaleFactor, color: '#3DA2E4', fontStyle: 'bold' });
                this.add.existing(gameNeme);
                gameNeme.setOrigin(0.5);
                gameNeme.y = gameNeme.displayHeight;
                SndMng.stopAllMusic();
                SndMng.playMusic('sound7');
            };
            MainMenu.prototype.playGame = function () {
                SndMng.stopAllMusic();
                this.scene.start(Scenes.GAME);
            };
            MainMenu.prototype.closeGame = function () {
            };
            MainMenu.prototype.update = function () {
            };
            return MainMenu;
        }(Phaser.Scene));
        Client.MainMenu = MainMenu;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Preloader.prototype.preload = function () {
                this.load.atlas('menu', './assets/atlases/menu.png', './assets/atlases/menu.json');
                this.load.atlas('game', './assets/atlases/game.png', './assets/atlases/game.json');
                this.load.json('levels', './data/levels.json');
                for (var i = 1; i < 15; i++) {
                    this.load.audio('sound' + i, './assets/audio/' + i + '.mp3');
                }
                this.load.on('progress', this.onProgress, this);
                this.load.on('complete', this.onLoadComplete, this);
                this.createPreloader();
            };
            Preloader.prototype.createPreloader = function () {
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                var logo = this.add.image(wW / 2, wH / 2, 'preload', 'logo');
                logo.setScale(0.5 * Config.scaleFactor);
                var loadingMovie = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'preload', 'loading0001');
                this.add.existing(loadingMovie);
                loadingMovie.setScale(0.5 * Config.scaleFactor);
                var frameNames = this.anims.generateFrameNames('preload', {
                    start: 1, end: 8, zeroPad: 4,
                    prefix: 'loading', suffix: ''
                });
                this.anims.create({ key: 'play', frames: frameNames, frameRate: 10, repeat: -1 });
                loadingMovie.anims.play('play');
                this.progressBar = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'preload', 'bar0001');
                this.add.existing(this.progressBar);
                this.progressBar.setScale(Config.scaleFactor * 2);
                var pYBar = wH - this.progressBar.displayHeight * 2;
                this.progressBar.y = pYBar;
                var pYlogo = (logo.displayHeight / 2) + (wH - pYBar);
                logo.y = pYlogo;
                var pTop = (logo.y + logo.displayHeight / 2);
                var pDown = (this.progressBar.y - this.progressBar.displayHeight / 2);
                var r = (pDown - pTop) / 2;
                loadingMovie.y = pTop + r;
            };
            Preloader.prototype.create = function () {
                this.input.setDefaultCursor('url(./assets/sprites/curs.cur), pointer');
                Config.langXML = this.cache.xml.get('lang');
            };
            Preloader.prototype.onLoadComplete = function () {
                this.scene.start(Scenes.MAINMENU);
            };
            Preloader.prototype.onProgress = function (value) {
                var numv = Math.round(value * 100);
                if (numv > 0)
                    if (this.progressBar) {
                        var fname = 'bar000' + numv;
                        if (numv > 10 && numv < 100) {
                            fname = 'bar00' + Math.round(numv);
                        }
                        else {
                            if (numv >= 100) {
                                fname = 'bar0' + Math.round(numv);
                            }
                        }
                        this.progressBar.setTexture('preload', fname);
                    }
            };
            Preloader.prototype.update = function () {
            };
            return Preloader;
        }(Phaser.Scene));
        Client.Preloader = Preloader;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var Scenes;
(function (Scenes) {
    Scenes.BOOT = 'Boot';
    Scenes.PRELOADER = 'Preloader';
    Scenes.MAINMENU = 'MainMenu';
    Scenes.GAME = 'Game';
    Scenes.COMPLETE = 'Complete';
})(Scenes || (Scenes = {}));
var SndMng;
(function (SndMng) {
    SndMng.MUSIC_MENU = 'music_main_menu';
    SndMng.MUSIC_GAME = 'music_game';
    SndMng.SFX_CLICK = 'click';
    SndMng.LOAD_SOUNDS = [SndMng.MUSIC_MENU, SndMng.MUSIC_GAME, SndMng.SFX_CLICK];
    var MUS_MAX_VOL = 1;
    var game;
    var enabled;
    var musics = [];
    function init(aGame, aEnabled) {
        game = aGame;
        enabled = aEnabled;
    }
    SndMng.init = init;
    function stopAll() {
        game.stopAll();
    }
    SndMng.stopAll = stopAll;
    function stopAllMusic() {
        for (var i = musics.length - 1; i >= 0; i--) {
            var data = musics[i];
            var music = data.mus;
            music.stop();
            musics.splice(i, 1);
        }
    }
    SndMng.stopAllMusic = stopAllMusic;
    function sfxPlay(aName, aVol) {
        if (aVol === void 0) { aVol = 1; }
        if (!enabled)
            return;
        var snd = game.add(aName, { volume: aVol });
        snd.play();
        return snd;
    }
    SndMng.sfxPlay = sfxPlay;
    function playMusic(aName, aVol, loop) {
        if (aVol === void 0) { aVol = 1; }
        if (loop === void 0) { loop = true; }
        if (!enabled)
            return;
        var music = game.add(aName, { volume: aVol, loop: loop });
        music.play();
        musics.push({ name: aName, mus: music });
    }
    SndMng.playMusic = playMusic;
    function stopMusicById(id) {
        try {
            var data = musics[id];
            var music = data.mus;
            music.stop();
            musics.splice(id, 1);
        }
        catch (e) {
            console.log('SndMng.stopMusicById: ' + e);
        }
    }
    function stopMusicByName(aName) {
        for (var i = musics.length - 1; i >= 0; i--) {
            var data = musics[i];
            if (data.name)
                if (data.name == aName) {
                    stopMusicById(i);
                }
        }
    }
    SndMng.stopMusicByName = stopMusicByName;
    function update(dt) {
    }
    SndMng.update = update;
})(SndMng || (SndMng = {}));
var uMath = (function () {
    function uMath() {
    }
    uMath.toPercent = function (current, total) {
        return (current / total) * 100;
    };
    uMath.fromPercent = function (percent, total) {
        return (percent * total) / 100;
    };
    uMath.random = function (lower, upper) {
        return Math.round(Math.random() * (upper - lower)) + lower;
    };
    uMath.toDegrees = function (radians) {
        return radians * 180 / Math.PI;
    };
    uMath.toRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    uMath.distance = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };
    uMath.prototype.getVelocity = function (x1, y1, velX, velY) {
    };
    uMath.getAngle = function (x1, y1, x2, y2, norm) {
        if (norm === void 0) { norm = true; }
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx);
        if (norm) {
            if (angle < 0) {
                angle = Math.PI * 2 + angle;
            }
            else if (angle >= Math.PI * 2) {
                angle = angle - Math.PI * 2;
            }
        }
        return angle;
    };
    return uMath;
}());
//# sourceMappingURL=game.js.map
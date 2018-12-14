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
                    width: 1366,
                    height: 768,
                    autoResize: true,
                    loader: {
                        crossOrigin: "anonymous"
                    },
                    physics: {
                        default: 'arcade',
                        arcade: {
                            gravity: { y: 200 }
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
                Config.scaleFactor = uMath.toPercent(window.innerHeight, 768) / 100;
                _this.resize(window.innerWidth, window.innerHeight);
                Config.currentLang = document.documentElement.lang;
                Config.GH = window.innerHeight;
                Config.GW = window.innerWidth;
                var myListenerWithContext = onResize.bind(_this);
                window.addEventListener('resize', myListenerWithContext);
                function onResize() {
                    if (window.innerWidth > window.innerHeight) {
                        var rp_img = document.getElementById("rp-img");
                        rp_img.style.visibility = 'hidden';
                        var bg_img = document.getElementById("bg-img");
                        bg_img.style.visibility = 'hidden';
                        try {
                            Config.GH = window.innerHeight;
                            Config.GW = window.innerWidth;
                            this.resize(window.innerWidth, window.innerHeight);
                            Config.scaleFactor = uMath.toPercent(window.innerHeight, 768) / 100;
                            this.scene.add(Scenes.BOOT, Client.Boot, false);
                            this.scene.add(Scenes.PRELOADER, Client.Preloader, false);
                            this.scene.add(Scenes.MAINMENU, Client.MainMenu, false);
                            this.scene.add(Scenes.GAME, Client.Game, false);
                            this.scene.add(Scenes.FREE, Client.Free, false);
                            this.scene.add(Scenes.GAMEMODE, Client.GameMode, false);
                            this.scene.add(Scenes.COMPLETE, Client.Complete, false);
                            this.scene.start(Scenes.BOOT);
                        }
                        catch (e) {
                            console.log('notresize');
                        }
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
                    _this.scene.add(Scenes.BOOT, Client.Boot, false);
                    _this.scene.add(Scenes.PRELOADER, Client.Preloader, false);
                    _this.scene.add(Scenes.MAINMENU, Client.MainMenu, false);
                    _this.scene.add(Scenes.GAME, Client.Game, false);
                    _this.scene.add(Scenes.FREE, Client.Free, false);
                    _this.scene.add(Scenes.GAMEMODE, Client.GameMode, false);
                    _this.scene.add(Scenes.COMPLETE, Client.Complete, false);
                    _this.scene.start(Scenes.BOOT);
                }
                else {
                    var rp_img = document.getElementById("rp-img");
                    rp_img.style.visibility = 'visible';
                    var bg_img = document.getElementById("bg-img");
                    bg_img.style.visibility = 'visible';
                }
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
    Config.GW = 0;
    Config.GH = 0;
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
                SndMng.sfxPlay('sound4');
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
                        Titletext = Config.langXML.querySelector('[id="txtSeguroSalir"]').querySelector(Config.currentLang).textContent;
                    }
                    catch (error) {
                        Titletext = Config.langXML.querySelector('[id="txtSeguroSalir"]').querySelector('en').textContent;
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
                console.log('бяда');
                SndMng.stopAllMusic();
                SndMng.playMusic('sound1');
                this.scene.scene.switch(Scenes.MAINMENU);
                this.scene.scene.stop(Scenes.FREE);
                this.scene.scene.stop(Scenes.GAME);
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
        var oBlock = (function (_super) {
            __extends(oBlock, _super);
            function oBlock(scene, x, y, frame) {
                var _this = this;
                if (frame == 'free_block0001') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(103, 55),
                        new Phaser.Geom.Point(155, 145),
                        new Phaser.Geom.Point(51, 145)
                    ]);
                }
                if (frame == 'free_block0002') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(0, 52),
                        new Phaser.Geom.Point(207, 52),
                        new Phaser.Geom.Point(207, 155),
                        new Phaser.Geom.Point(0, 155)
                    ]);
                }
                if (frame == 'free_block0003') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(79, 52),
                        new Phaser.Geom.Point(129, 52),
                        new Phaser.Geom.Point(129, 155),
                        new Phaser.Geom.Point(79, 155)
                    ]);
                }
                if (frame == 'free_block0004') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(14, 58),
                        new Phaser.Geom.Point(194, 58),
                        new Phaser.Geom.Point(194, 148),
                        new Phaser.Geom.Point(14, 148)
                    ]);
                }
                if (frame == 'free_block0005') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(1, 53),
                        new Phaser.Geom.Point(208, 53),
                        new Phaser.Geom.Point(208, 155),
                        new Phaser.Geom.Point(153, 155),
                        new Phaser.Geom.Point(151, 114),
                        new Phaser.Geom.Point(125, 86),
                        new Phaser.Geom.Point(84, 86),
                        new Phaser.Geom.Point(55, 114),
                        new Phaser.Geom.Point(55, 155),
                        new Phaser.Geom.Point(1, 155)
                    ]);
                }
                if (frame == 'free_block0006') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(52, 1),
                        new Phaser.Geom.Point(156, 1),
                        new Phaser.Geom.Point(156, 207),
                        new Phaser.Geom.Point(52, 207)
                    ]);
                }
                if (frame == 'free_block0007') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(105, 52),
                        new Phaser.Geom.Point(207, 152),
                        new Phaser.Geom.Point(2, 152),
                    ]);
                }
                if (frame == 'free_block0008') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(52, 53),
                        new Phaser.Geom.Point(156, 53),
                        new Phaser.Geom.Point(156, 154),
                        new Phaser.Geom.Point(52, 154)
                    ]);
                }
                if (frame == 'free_block0009') {
                    var shape = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(26, 78),
                        new Phaser.Geom.Point(181, 78),
                        new Phaser.Geom.Point(181, 129),
                        new Phaser.Geom.Point(26, 129)
                    ]);
                }
                _this = _super.call(this, scene, x, y, 'game', frame) || this;
                _this.setInteractive(shape, Phaser.Geom.Polygon.Contains);
                return _this;
            }
            return oBlock;
        }(Phaser.GameObjects.Sprite));
        Client.oBlock = oBlock;
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
                var Panel = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'game', 'complete');
                Panel.setScale(1 * Config.scaleFactor);
                this.add.existing(Panel);
                var btnPlay = new Client.gButton(this, Config.GW / 2, Config.GH / 2, 'game', 'btn_play0001', 'btn_play0002', 'btn_play0003');
                btnPlay.setScale(Config.scaleFactor);
                btnPlay.setEventName('startGame');
                this.events.on(btnPlay.getEventName(), this.playGame, this);
                this.add.existing(btnPlay);
                btnPlay.x += Panel.displayWidth / 3;
                var btnClose = new Client.gButton(this, Config.GW / 2, Config.GH / 2, 'game', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                btnClose.setScale(Config.scaleFactor);
                btnClose.setEventName('ExitGame');
                this.events.on(btnClose.getEventName(), this.closeGame, this);
                this.add.existing(btnClose);
                btnClose.x -= Panel.displayWidth / 3;
                var Titletext;
                try {
                    Titletext = Config.langXML.querySelector('[id="txtFin"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    Titletext = Config.langXML.querySelector('[id="txtFin"]').querySelector('en').textContent;
                }
                var text = new Phaser.GameObjects.Text(this, Config.GW / 2, Config.GH / 2 - Panel.displayHeight / 3.5, Titletext, { fontFamily: 'Arial', fontSize: 35 * Config.scaleFactor, color: '#E6F5FD', fontStyle: 'bold' });
                this.add.existing(text);
                text.setAlign('center');
                text.setOrigin(0.5);
                text.setWordWrapWidth(500 * Config.scaleFactor);
            };
            Complete.prototype.playGame = function () {
                SndMng.stopAll();
                Config.useLevel++;
                if (Config.useLevel > 5) {
                    Config.useLevel = 1;
                }
                this.scene.switch(Scenes.GAME);
            };
            Complete.prototype.closeGame = function () {
                this.scene.switch(Scenes.MAINMENU);
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
        var Free = (function (_super) {
            __extends(Free, _super);
            function Free() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.blockMenu = [];
                _this.selectBlock = -1;
                _this.PointX = 0;
                _this.PointY = 0;
                _this.BuildingBlock = [];
                return _this;
            }
            Free.prototype.create = function () {
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                this.blockPanel = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'game', 'bg_panel').setOrigin(0.53, 0.5);
                this.blockPanel.setInteractive();
                this.blockPanel.setScale(1.2 * Config.scaleFactor);
                this.add.existing(this.blockPanel);
                this.blockPanel.x = wW - this.blockPanel.displayWidth / 2;
                this.createBlockMenu(this.blockPanel.x, this.blockPanel.y - 240 * Config.scaleFactor);
                var btnScrollDown = new Client.gButton(this, wW / 2, wH / 2, 'game', 'btn_scroll0001', 'btn_scroll0002', 'btn_scroll0002').setOrigin(0.63, 0.5);
                btnScrollDown.setScale(Config.scaleFactor);
                btnScrollDown.setEventName('btnScrollDown');
                this.events.on(btnScrollDown.getEventName(), this.scrollDown, this);
                this.add.existing(btnScrollDown);
                btnScrollDown.x = this.blockPanel.x;
                btnScrollDown.y = this.blockPanel.y + this.blockPanel.displayHeight / 2 + btnScrollDown.displayHeight / 2;
                var btnScrollUp = new Client.gButton(this, wW / 2, wH / 2, 'game', 'btn_scroll0001', 'btn_scroll0002', 'btn_scroll0002').setOrigin(0.63, 0.5);
                btnScrollUp.setScale(Config.scaleFactor);
                btnScrollUp.flipY = true;
                btnScrollUp.setEventName('btnScrollUp');
                this.events.on(btnScrollUp.getEventName(), this.scrollUp, this);
                this.add.existing(btnScrollUp);
                btnScrollUp.x = this.blockPanel.x;
                btnScrollUp.y = this.blockPanel.y - this.blockPanel.displayHeight / 2 - btnScrollUp.displayHeight / 2;
                this.workSpace = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'game', 'workspace');
                this.workSpace.setScale(1.5 * Config.scaleFactor);
                this.workSpace.setInteractive();
                this.add.existing(this.workSpace);
                this.workSpace.x = (this.blockPanel.x - this.blockPanel.displayWidth / 2) / 2;
                var btnClose = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                btnClose.setScale(0.8 * Config.scaleFactor);
                btnClose.setEventName('ExitGame');
                this.events.on(btnClose.getEventName(), this.closeGame, this);
                this.add.existing(btnClose);
                btnClose.x = this.blockPanel.x + btnScrollDown.displayWidth + btnClose.displayWidth / 4;
                btnClose.y = this.blockPanel.y + this.blockPanel.displayHeight / 2 + btnClose.displayHeight / 2;
                this.input.on('gameobjectdown', this.selectObject, this);
                if (Config.isMobile) {
                    this.input.on('gameobjectup', this.selectObjectMobile, this);
                }
                this.takeBlock = new Phaser.GameObjects.Sprite(this, 0, 0, 'game', 'free_block0001');
                this.takeBlock.setScale(1 * Config.scaleFactor);
                this.takeBlock.visible = false;
                this.takeBlock.depth = 1;
                this.add.existing(this.takeBlock);
                this.exdlg = new Client.gExitDialog(this, wW / 2, wH / 2);
                this.add.existing(this.exdlg);
            };
            Free.prototype.selectObjectMobile = function (pointer, gameObject) {
                this.selectObject(pointer, gameObject);
            };
            Free.prototype.selectObject = function (pointer, gameObject) {
                console.log('Тратата');
                var oneEvent = false;
                if (this.takeBlock.visible)
                    if ((pointer.x > this.workSpace.x - this.workSpace.displayWidth / 2)
                        && (pointer.x < this.workSpace.x + this.workSpace.displayWidth / 2)
                        && (pointer.y > this.workSpace.y - this.workSpace.displayHeight / 2)
                        && (pointer.y < this.workSpace.y + this.workSpace.displayHeight / 2)) {
                        var buildBlock = new Client.oBlock(this, pointer.x, pointer.y, this.takeBlock.frame.name);
                        buildBlock.mask = new Phaser.Display.Masks.BitmapMask(this, this.workSpace);
                        buildBlock.setScale(1 * Config.scaleFactor);
                        this.add.existing(buildBlock);
                        this.takeBlock.visible = false;
                        SndMng.sfxPlay('sound8');
                        oneEvent = true;
                        this.BuildingBlock.push(buildBlock);
                    }
                if (!oneEvent) {
                    if (gameObject instanceof Client.oBlock) {
                        var oX = gameObject.x;
                        var oY = gameObject.y;
                        for (var i = 0; i < this.BuildingBlock.length; i++) {
                            if ((oX == this.BuildingBlock[i].x)
                                && (oY == this.BuildingBlock[i].y)) {
                                this.BuildingBlock[i].destroy(true);
                                this.BuildingBlock.splice(i, 1);
                            }
                        }
                        if (!this.takeBlock.visible) {
                            this.takeBlock.visible = true;
                            this.takeBlock.setTexture('game', gameObject.frame.name);
                            SndMng.sfxPlay('sound3');
                            oneEvent = true;
                        }
                    }
                }
                if (!oneEvent) {
                    if (this.takeBlock.visible) {
                        if (pointer.x > this.blockPanel.x - this.blockPanel.displayWidth / 2)
                            if (pointer.x < this.blockPanel.x + this.blockPanel.displayWidth / 2) {
                                this.takeBlock.visible = false;
                                SndMng.sfxPlay('sound3');
                                oneEvent = true;
                            }
                    }
                }
            };
            Free.prototype.createBlockMenu = function (tx, ty) {
                var height = 0;
                for (var i = 1; i < 10; i++) {
                    var block = new Client.oBlock(this, tx, ty + height, 'free_block000' + i);
                    block.setScale(1 * Config.scaleFactor);
                    block.setInteractive();
                    block.mask = new Phaser.Display.Masks.BitmapMask(this, this.blockPanel);
                    this.add.existing(block);
                    if (i != 6) {
                        height += block.displayHeight / 2 + 10;
                    }
                    else {
                        height += block.displayHeight + 10;
                        block.y += block.displayHeight / 4;
                    }
                    this.blockMenu.push({ tname: '' + i, tblock: block });
                }
            };
            Free.prototype.closeGame = function () {
                this.exdlg.show();
            };
            Free.prototype.scrollDown = function () {
                var posFirstBlock = this.blockMenu[0].tblock.y;
                var firstPoint = this.blockPanel.y - this.blockPanel.displayHeight / 2;
                if (posFirstBlock < firstPoint)
                    for (var i = 0; i < this.blockMenu.length; i++) {
                        var block = this.blockMenu[i].tblock;
                        block.y += 50 * Config.scaleFactor;
                    }
            };
            Free.prototype.scrollUp = function () {
                var posLastBlock = this.blockMenu[this.blockMenu.length - 1].tblock.y + this.blockMenu[this.blockMenu.length - 1].tblock.displayHeight / 4;
                if (posLastBlock > this.blockPanel.y + this.blockPanel.displayHeight / 2)
                    for (var i = 0; i < this.blockMenu.length; i++) {
                        var block = this.blockMenu[i].tblock;
                        block.y -= 50 * Config.scaleFactor;
                    }
            };
            Free.prototype.update = function () {
                if (this.takeBlock != null) {
                    if (this.takeBlock.visible) {
                        this.takeBlock.x = this.input.mouse.manager.activePointer.x;
                        this.takeBlock.y = this.input.mouse.manager.activePointer.y;
                    }
                }
            };
            return Free;
        }(Phaser.Scene));
        Client.Free = Free;
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
                _this.blockMenu = [];
                _this.selectBlock = -1;
                _this.PointX = 0;
                _this.PointY = 0;
                _this.BuildingBlock = [];
                _this.castle1X = [-1, -1, -1];
                _this.castle1Y = [-103.9, 0, 103.9];
                _this.castle1Block = ['free_block0007', 'free_block0002', 'free_block0005'];
                _this.castle2X = [100.95, -55.40, 101, -55.40, 101, -4.15, -132.9];
                _this.castle2Y = [-208.65, -7.40, -57.8, 96.45, 150.20, 201, 201];
                _this.castle2Block = ['free_block0001', 'free_block0007', 'free_block0006', 'free_block0002', 'free_block0006', 'free_block0008', 'free_block0003'];
                _this.castle3X = [-157.05, 157.05, 1, 77, -78, 157.05, -156.95, 77, 157.05, -78, -156.95];
                _this.castle3Y = [-208.65, -208.65, 97, -9, -9, -59.05, -59.05, 202, 150.95, 202, 150.95];
                _this.castle3Block = ['free_block0001', 'free_block0001', 'free_block0002', 'free_block0003', 'free_block0003', 'free_block0006', 'free_block0006', 'free_block0003', 'free_block0006', 'free_block0003', 'free_block0006'];
                _this.castle4X = [-203, 191.1, 193.1, 265.95, 118.95, 257.1, 126.55, -137.5, -266.55, -128, -276, -201, -5];
                _this.castle4Y = [-207.5, -208.5, -5, 151, 151, -110, -109.55, -109.55, -109.55, 151.05, 151.05, -5, -109];
                _this.castle4Block = ['free_block0004', 'free_block0004', 'free_block0002', 'free_block0006', 'free_block0006', 'free_block0003', 'free_block0003', 'free_block0003', 'free_block0003', 'free_block0006', 'free_block0006', 'free_block0002', 'free_block0007'];
                _this.castle5X = [0.4, 0.4, 156.1, 0.1, -156.95, 286.1, -286.05, 52.4, -51.6, 208.15, -209.95, 80.4, -79.65, 156.4, 0.35, -155.65, 233.6, 77.55, 286.2, -285.95, -79.45, -235.5];
                _this.castle5Y = [-234.6, -156.6, 0.55, 0.55, 0.55, 85.05, 85.05, -78.6, -78.6, 78.55, 76.55, 78.55, 78.55, 234.55, 234.55, 234.55, 156.55, 156.55, 234.55, 234.55, 156.55, 156.55];
                _this.castle5Block = ['free_block0007', 'free_block0009', 'free_block0009', 'free_block0009', 'free_block0009', 'free_block0001', 'free_block0001', 'free_block0003', 'free_block0003', 'free_block0003', 'free_block0003', 'free_block0008', 'free_block0008', 'free_block0008', 'free_block0008', 'free_block0008', 'free_block0009', 'free_block0009', 'free_block0003', 'free_block0003', 'free_block0009', 'free_block0009'];
                _this.complete = false;
                _this.timetoComplete = 300;
                return _this;
            }
            Game.prototype.create = function () {
                this.timetoComplete = 300;
                this.blockMenu = [];
                this.BuildingBlock = [];
                this.complete = false;
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                if (Config.useLevel == 1) {
                    this.LevelBlock = this.castle1Block;
                    this.levelCastleX = this.castle1X;
                    this.levelCastleY = this.castle1Y;
                }
                if (Config.useLevel == 2) {
                    this.LevelBlock = this.castle2Block;
                    this.levelCastleX = this.castle2X;
                    this.levelCastleY = this.castle2Y;
                }
                if (Config.useLevel == 3) {
                    this.LevelBlock = this.castle3Block;
                    this.levelCastleX = this.castle3X;
                    this.levelCastleY = this.castle3Y;
                }
                if (Config.useLevel == 4) {
                    this.LevelBlock = this.castle4Block;
                    this.levelCastleX = this.castle4X;
                    this.levelCastleY = this.castle4Y;
                }
                if (Config.useLevel == 5) {
                    this.LevelBlock = this.castle5Block;
                    this.levelCastleX = this.castle5X;
                    this.levelCastleY = this.castle5Y;
                }
                this.blockPanel = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'game', 'bg_panel').setOrigin(0.53, 0.5);
                this.blockPanel.setInteractive();
                this.blockPanel.setScale(1.2 * Config.scaleFactor);
                this.add.existing(this.blockPanel);
                this.blockPanel.x = wW - this.blockPanel.displayWidth / 2;
                this.createBlockMenu(this.blockPanel.x, this.blockPanel.y - 240 * Config.scaleFactor);
                this.btnScrollDown = new Client.gButton(this, wW / 2, wH / 2, 'game', 'btn_scroll0001', 'btn_scroll0002', 'btn_scroll0002').setOrigin(0.63, 0.5);
                this.btnScrollDown.setScale(Config.scaleFactor);
                this.btnScrollDown.setEventName('btnScrollDown');
                this.btnScrollDown.depth = 1;
                this.events.on(this.btnScrollDown.getEventName(), this.scrollDown, this);
                this.add.existing(this.btnScrollDown);
                this.btnScrollDown.x = this.blockPanel.x;
                this.btnScrollDown.y = this.blockPanel.y + this.blockPanel.displayHeight / 2 + this.btnScrollDown.displayHeight / 2;
                var btnScrollUp = new Client.gButton(this, wW / 2, wH / 2, 'game', 'btn_scroll0001', 'btn_scroll0002', 'btn_scroll0002').setOrigin(0.63, 0.5);
                btnScrollUp.setScale(Config.scaleFactor);
                btnScrollUp.flipY = true;
                btnScrollUp.depth = 1;
                btnScrollUp.setEventName('btnScrollUp');
                this.events.on(btnScrollUp.getEventName(), this.scrollUp, this);
                this.add.existing(btnScrollUp);
                btnScrollUp.x = this.blockPanel.x;
                btnScrollUp.y = this.blockPanel.y - this.blockPanel.displayHeight / 2 - btnScrollUp.displayHeight / 2;
                this.workSpace = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'game', 'workspace');
                this.workSpace.setScale(1.28 * Config.scaleFactor);
                this.workSpace.setInteractive();
                this.add.existing(this.workSpace);
                this.workSpace.x = (this.blockPanel.x - this.blockPanel.displayWidth / 2) / 2;
                this.castle = new Phaser.GameObjects.Sprite(this, this.workSpace.x, this.workSpace.y, 'game', 'lvl' + Config.useLevel);
                this.castle.setScale(1 * Config.scaleFactor);
                this.add.existing(this.castle);
                this.btnClose = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                this.btnClose.setScale(0.8 * Config.scaleFactor);
                this.btnClose.setEventName('ExitGame');
                this.events.on(this.btnClose.getEventName(), this.closeGame, this);
                this.add.existing(this.btnClose);
                this.btnClose.x = this.blockPanel.x + this.btnScrollDown.displayWidth + this.btnClose.displayWidth / 4;
                this.btnClose.y = this.blockPanel.y + this.blockPanel.displayHeight / 2 + this.btnClose.displayHeight / 2;
                this.input.on('gameobjectdown', this.selectObject, this);
                if (Config.isMobile) {
                    this.input.on('gameobjectup', this.selectObjectMobile, this);
                }
                this.takeBlock = new Phaser.GameObjects.Sprite(this, 0, 0, 'game', 'free_block0001');
                this.takeBlock.setScale(1 * Config.scaleFactor);
                this.takeBlock.visible = false;
                this.takeBlock.depth = 1;
                this.add.existing(this.takeBlock);
                this.exdlg = new Client.gExitDialog(this, wW / 2, wH / 2);
                this.add.existing(this.exdlg);
            };
            Game.prototype.selectObjectMobile = function (pointer, gameObject) {
                this.selectObject(pointer, gameObject);
            };
            Game.prototype.selectObject = function (pointer, gameObject) {
                if (!this.complete) {
                    var oneEvent = false;
                    if (this.takeBlock.visible)
                        if ((pointer.x > this.workSpace.x - this.workSpace.displayWidth / 2)
                            && (pointer.x < this.workSpace.x + this.workSpace.displayWidth / 2)
                            && (pointer.y > this.workSpace.y - this.workSpace.displayHeight / 2)
                            && (pointer.y < this.workSpace.y + this.workSpace.displayHeight / 2)) {
                            var build = false;
                            for (var i = 0; i < this.LevelBlock.length; i++) {
                                var castleX = (this.levelCastleX[i] * Config.scaleFactor) + this.castle.x;
                                var castleY = (this.levelCastleY[i] * Config.scaleFactor) + this.castle.y;
                                var distance = uMath.distance(this.takeBlock.x, this.takeBlock.y, castleX, castleY);
                                if (!build) {
                                    if (distance < (120 * Config.scaleFactor)) {
                                        if (this.LevelBlock[i] == this.takeBlock.frame.name) {
                                            var pass = true;
                                            for (var j = 0; j < this.BuildingBlock.length; j++) {
                                                if ((this.BuildingBlock[j].x == castleX)
                                                    && (this.BuildingBlock[j].y == castleY)) {
                                                    pass = false;
                                                }
                                            }
                                            if (pass) {
                                                build = true;
                                                var buildBlock = new Client.oBlock(this, this.takeBlock.x, this.takeBlock.y, this.takeBlock.frame.name);
                                                buildBlock.mask = new Phaser.Display.Masks.BitmapMask(this, this.workSpace);
                                                buildBlock.setScale(1 * Config.scaleFactor);
                                                this.add.existing(buildBlock);
                                                var tween = this.tweens.add({
                                                    targets: buildBlock,
                                                    x: castleX,
                                                    y: castleY,
                                                    duration: 300,
                                                    ease: 'Elastic',
                                                    easeParams: [1.5, 0.5],
                                                });
                                                this.takeBlock.visible = false;
                                                SndMng.sfxPlay('sound8');
                                                oneEvent = true;
                                                this.BuildingBlock.push(buildBlock);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    if (!oneEvent) {
                        if (!this.takeBlock.visible)
                            if (gameObject instanceof Client.oBlock) {
                                var oX = gameObject.x;
                                var oY = gameObject.y;
                                for (var i = 0; i < this.BuildingBlock.length; i++) {
                                    if ((oX == this.BuildingBlock[i].x)
                                        && (oY == this.BuildingBlock[i].y)) {
                                        this.BuildingBlock[i].destroy(true);
                                        this.BuildingBlock.splice(i, 1);
                                    }
                                }
                                for (var i = 0; i < this.blockMenu.length; i++) {
                                    if ((oX == this.blockMenu[i].tblock.x)
                                        && (oY == this.blockMenu[i].tblock.y)) {
                                        this.blockMenu[i].tblock.destroy(true);
                                        this.blockMenu.splice(i, 1);
                                        this.sortedBlockMenu(this.blockPanel.x, this.blockPanel.y - 240 * Config.scaleFactor);
                                    }
                                }
                                if (!this.takeBlock.visible) {
                                    this.takeBlock.visible = true;
                                    this.takeBlock.setTexture('game', gameObject.frame.name);
                                    SndMng.sfxPlay('sound3');
                                    oneEvent = true;
                                }
                            }
                    }
                    if (!oneEvent) {
                        if (this.takeBlock.visible) {
                            if (pointer.x > this.blockPanel.x - this.blockPanel.displayWidth / 2)
                                if (pointer.x < this.blockPanel.x + this.blockPanel.displayWidth / 2) {
                                    this.addBlockToPanel();
                                    this.takeBlock.visible = false;
                                    SndMng.sfxPlay('sound3');
                                    oneEvent = true;
                                }
                        }
                    }
                }
            };
            Game.prototype.addBlockToPanel = function () {
                var block = new Client.oBlock(this, this.blockPanel.x, this.blockPanel.y, this.takeBlock.frame.name);
                block.depth = 0;
                block.setScale(1 * Config.scaleFactor);
                block.mask = new Phaser.Display.Masks.BitmapMask(this, this.blockPanel);
                this.add.existing(block);
                this.blockMenu.push({ tname: '', tblock: block });
                this.sortedBlockMenu(this.blockPanel.x, this.blockPanel.y - 240 * Config.scaleFactor);
            };
            Game.prototype.sortedBlockMenu = function (x, y) {
                var height = 0;
                for (var i = 0; i < this.blockMenu.length; i++) {
                    var block = this.blockMenu[i].tblock;
                    block.x = x;
                    block.y = y + height;
                    if (block.frame.name != 'free_block0006') {
                        height += block.displayHeight / 2 + 10;
                    }
                    else {
                        height += block.displayHeight + 10;
                        block.y += block.displayHeight / 4;
                    }
                }
            };
            Game.prototype.createBlockMenu = function (tx, ty) {
                var height = 0;
                for (var i = 0; i < this.LevelBlock.length; i++) {
                    var block = new Client.oBlock(this, tx, ty + height, this.LevelBlock[i]);
                    block.setScale(1 * Config.scaleFactor);
                    block.setInteractive();
                    block.mask = new Phaser.Display.Masks.BitmapMask(this, this.blockPanel);
                    this.add.existing(block);
                    if (this.LevelBlock[i] != 'free_block0006') {
                        height += block.displayHeight / 2 + 10;
                    }
                    else {
                        height += block.displayHeight + 10;
                        block.y += block.displayHeight / 4;
                    }
                    this.blockMenu.push({ tname: '' + i, tblock: block });
                }
            };
            Game.prototype.closeGame = function () {
                this.exdlg.show();
            };
            Game.prototype.scrollDown = function () {
                var posFirstBlock = this.blockMenu[0].tblock.y;
                var firstPoint = this.blockPanel.y - this.blockPanel.displayHeight / 2;
                if (posFirstBlock < firstPoint)
                    for (var i = 0; i < this.blockMenu.length; i++) {
                        var block = this.blockMenu[i].tblock;
                        block.y += 50 * Config.scaleFactor;
                    }
            };
            Game.prototype.scrollUp = function () {
                var posLastBlock = this.blockMenu[this.blockMenu.length - 1].tblock.y + this.blockMenu[this.blockMenu.length - 1].tblock.displayHeight / 4;
                if (posLastBlock > this.blockPanel.y + this.blockPanel.displayHeight / 2)
                    for (var i = 0; i < this.blockMenu.length; i++) {
                        var block = this.blockMenu[i].tblock;
                        block.y -= 50 * Config.scaleFactor;
                    }
            };
            Game.prototype.update = function () {
                if (this.takeBlock != null) {
                    if (this.takeBlock.visible) {
                        this.takeBlock.x = this.input.mouse.manager.activePointer.x;
                        this.takeBlock.y = this.input.mouse.manager.activePointer.y;
                    }
                }
                if (!this.complete) {
                    if (this.BuildingBlock.length == this.LevelBlock.length) {
                        this.complete = true;
                        this.btnClose.removeInteractive();
                        this.btnClose.tint = 0x1188CC;
                        SndMng.sfxPlay('sound2');
                    }
                }
                else {
                    if (this.timetoComplete > 0) {
                        this.timetoComplete--;
                    }
                    else {
                        this.scene.switch(Scenes.COMPLETE);
                        this.scene.stop(Scenes.GAME);
                    }
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
        var GameMode = (function (_super) {
            __extends(GameMode, _super);
            function GameMode() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameMode.prototype.create = function () {
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                var lang = document.documentElement.lang;
                var Titletext;
                try {
                    Titletext = Config.langXML.querySelector('[id="txtTituloModo"]').querySelector(lang).textContent;
                }
                catch (error) {
                    Titletext = Config.langXML.querySelector('[id="txtTituloModo"]').querySelector('en').textContent;
                }
                var gameNeme = new Phaser.GameObjects.Text(this, wW / 2, wH / 2, Titletext, { fontFamily: 'Arial', fontSize: 80 * Config.scaleFactor, color: '#3DA2E4', fontStyle: 'bold' });
                this.add.existing(gameNeme);
                gameNeme.setOrigin(0.5);
                gameNeme.y = gameNeme.displayHeight;
                var btnClose = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_close0001', 'btn_close0002', 'btn_close0003');
                btnClose.setScale(Config.scaleFactor);
                btnClose.setEventName('ExitGame');
                this.events.on(btnClose.getEventName(), this.closeGame, this);
                this.add.existing(btnClose);
                btnClose.x = btnClose.displayWidth;
                btnClose.y = wH - btnClose.displayHeight;
                var taskModeText;
                try {
                    taskModeText = Config.langXML.querySelector('[id="txtJuego"]').querySelector(lang).textContent;
                }
                catch (error) {
                    taskModeText = Config.langXML.querySelector('[id="txtJuego"]').querySelector('en').textContent;
                }
                var taskNeme = new Phaser.GameObjects.Text(this, wW / 2 + wW / 4, wH / 2, taskModeText, { fontFamily: 'Arial', fontSize: 70 * Config.scaleFactor, color: '#3DA2E4', fontStyle: 'bold', width: 200 });
                this.add.existing(taskNeme);
                taskNeme.setWordWrapWidth(320 * Config.scaleFactor);
                taskNeme.setAlign('center');
                taskNeme.setOrigin(0.5);
                taskNeme.y = taskNeme.y - taskNeme.displayHeight / 2;
                var btnTask = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_task_mode0001', 'btn_task_mode0002', 'btn_task_mode0002');
                btnTask.setScale(Config.scaleFactor);
                btnTask.setEventName('GamePlay');
                this.events.on(btnTask.getEventName(), this.PlayGame, this);
                this.add.existing(btnTask);
                var tX = wW / 2 + (wW / 4);
                btnTask.x = tX;
                var customModeText;
                try {
                    customModeText = Config.langXML.querySelector('[id="txtLibre"]').querySelector(lang).textContent;
                }
                catch (error) {
                    customModeText = Config.langXML.querySelector('[id="txtLibre"]').querySelector('en').textContent;
                }
                var customNeme = new Phaser.GameObjects.Text(this, wW / 2 - wW / 4, wH / 2, customModeText, { fontFamily: 'Arial', fontSize: 70 * Config.scaleFactor, color: '#3DA2E4', fontStyle: 'bold', width: 200 });
                this.add.existing(customNeme);
                customNeme.setWordWrapWidth(320 * Config.scaleFactor);
                customNeme.setAlign('center');
                customNeme.setOrigin(0.5);
                customNeme.y = customNeme.y - customNeme.displayHeight / 2;
                var btnCustom = new Client.gButton(this, wW / 2, wH / 2, 'menu', 'btn_custom_mode0001', 'btn_custom_mode0002', 'btn_custom_mode0002');
                btnCustom.setScale(Config.scaleFactor);
                btnCustom.setEventName('FreePlay');
                this.events.on(btnCustom.getEventName(), this.PlayFree, this);
                this.add.existing(btnCustom);
                var cX = wW / 2 - (wW / 4);
                btnCustom.x = cX;
            };
            GameMode.prototype.PlayGame = function () {
                Config.useLevel = 1;
                SndMng.stopAllMusic();
                this.scene.switch(Scenes.GAME);
            };
            GameMode.prototype.PlayFree = function () {
                SndMng.stopAllMusic();
                this.scene.switch(Scenes.FREE);
            };
            GameMode.prototype.closeGame = function () {
                SndMng.stopAllMusic();
                SndMng.playMusic('sound1');
                this.scene.switch(Scenes.MAINMENU);
            };
            GameMode.prototype.update = function () {
            };
            return GameMode;
        }(Phaser.Scene));
        Client.GameMode = GameMode;
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
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                var logo = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'menu', 'logo').setOrigin(0.45, 0.45);
                logo.setScale(1.5 * Config.scaleFactor);
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
                    Titletext = Config.langXML.querySelector('[id="txtTitulo"]').querySelector(Config.currentLang).textContent;
                }
                catch (error) {
                    Titletext = Config.langXML.querySelector('[id="txtTitulo"]').querySelector('en').textContent;
                }
                var gameNeme = new Phaser.GameObjects.Text(this, wW / 2, wH / 2, Titletext, { fontFamily: 'Arial', fontSize: 100 * Config.scaleFactor, color: '#3DA2E4', fontStyle: 'bold' });
                this.add.existing(gameNeme);
                gameNeme.setOrigin(0.5);
                gameNeme.y = gameNeme.displayHeight;
                SndMng.playMusic('sound1');
                console.log('создали 1 раз');
            };
            MainMenu.prototype.playGame = function () {
                SndMng.stopAllMusic();
                SndMng.playMusic('sound6', 1, false);
                this.scene.switch(Scenes.GAMEMODE);
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
                for (var i = 1; i < 9; i++) {
                    this.load.audio('sound' + i, './assets/audio/' + Config.currentLang + '/' + i + '.mp3');
                }
                this.load.on('progress', this.onProgress, this);
                this.load.on('complete', this.onLoadComplete, this);
                this.createPreloader();
            };
            Preloader.prototype.createPreloader = function () {
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                var logo = this.add.image(wW / 2, wH / 2, 'preload', 'logo');
                logo.setScale(Config.scaleFactor);
                var loadingMovie = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'preload', 'loading0001');
                this.add.existing(loadingMovie);
                loadingMovie.setScale(Config.scaleFactor);
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
                this.input.setDefaultCursor('url(./assets/atlases/curs.cur), pointer');
                Config.langXML = this.cache.xml.get('lang');
            };
            Preloader.prototype.onLoadComplete = function () {
                this.scene.start(Scenes.MAINMENU);
            };
            Preloader.prototype.onProgress = function (value) {
                var numv = Math.round(value) + 1;
                if (this.progressBar) {
                    var fname = 'bar000' + numv;
                    if (numv > 10) {
                        fname = 'bar00' + Math.round(numv);
                    }
                    else {
                        if (numv >= 100) {
                            fname = 'bar0' + Math.round(numv);
                        }
                    }
                    this.progressBar.setFrame(fname);
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
    Scenes.GAMEMODE = 'GameMode';
    Scenes.GAME = 'Game';
    Scenes.FREE = 'Free';
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
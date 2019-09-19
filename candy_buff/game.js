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
                    backgroundColor: 0x000000,
                    width: Config.GW,
                    height: Config.GH,
                    autoResize: true,
                    loader: {
                        crossOrigin: "anonymous"
                    },
                    physics: {
                        default: 'arcade',
                        arcade: {
                            gravity: { y: 2400 },
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
    FBInstant.initializeAsync().then(function () {
        new PhaserGame.Client.GameEngine();
    });
};
var Config;
(function (Config) {
    Config.DOM_PARENT_ID = 'game';
    Config.GW = 640;
    Config.GH = 427;
    Config.orient = false;
    Config.FPS = 12;
    Config.scaleFactor = 1;
    Config.useLevel = 1;
    Config.paused = false;
    Config.soundPaused = false;
    Config.isMobile = false;
    Config.isLockOrientation = true;
    Config.lockOrientationMobileOnly = true;
    Config.lockOrientationLand = true;
    Config.distance20 = ['02', '23', '142', '146'];
    Config.distance190 = ['28'];
    Config.distance250 = ['01', '02', '04', '05', '07', '08', '09', '11', '12', '17', '24', '32', '33', '36', '38', '39', '41', '46', '47', '140', '141', '144', '145'];
    Config.distance800 = ['35'];
    Config.distance900 = ['60', '61'];
    Config.distance1050 = ['01', '03', '07', '11', '13', '14', '15', '16', '17', '18', '19', '20', '22', '24', '25', '27', '29', '30', '31', '34', '37', '39', '40', '41', '44', '48', '49', '53', '54', '55', '57', '62', '64', '66', '67', '68', '127'];
    Config.distance2000 = ['38'];
    Config.distance2100 = ['50', '51', '52'];
    Config.distance2300 = ['03', '09', '14', '15', '17', '19', '20', '23', '26', '27', '29', '34', '35', '37', '41', '42', '43', '44', '45', '49', '53', '56', '57', '62', '63', '64', '65', '66', '67', '69', '123', '126', '135', '139'];
    Config.distance3500 = ['58'];
    Config.distance3700 = ['57', '74', '77', '78', '79', '81', '82', '83', '84', '85', '86', '87', '89', '91', '93', '94', '96', '97', '98', '99', '103', '107', '109', '111', '113', '115', '116', '122'];
    Config.distance5200 = ['170'];
    Config.distance5300 = ['57', '63', '70', '75', '76', '80', '82', '84', '88', '89', '90', '92', '95', '96', '100', '101', '102', '104', '105', '106', '108', '110', '112', '114', '117', '120', '122', '123', '124', '127', '128', '129', '130', '131', '132', '134', '137', '138', '143'];
    Config.distance7500 = ['57', '72', '76', '96', '101', '104', '105', '106', '108', '110', '112', '114', '117', '120', '122', '123', '124', '127', '128', '129', '130', '131', '132', '134', '137', '138', '143', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '164', '165'];
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
    score.bestDistance = 0;
    score.stanina = 250;
    score.StartStanina = 280;
    score.Maxstanina = 500;
    score.runDistance = 0;
    score.CollectCoin = 0;
    score.Collection = false;
    score.showPrize = false;
    score.numberPrize = -1;
    score.congrat = ['cool', 'fantastic', 'rad!', 'superb'];
    score.showed = false;
    function addScore() {
        score.value += 5;
    }
    score.addScore = addScore;
    function StartCollectCoin() {
        score.CollectCoin = 0;
        score.Collection = true;
    }
    score.StartCollectCoin = StartCollectCoin;
    function StopCollectCoin() {
        score.Collection = false;
        score.showPrize = true;
        score.numberPrize = 1;
        if (score.CollectCoin > 3) {
            if (score.CollectCoin > 20) {
                score.congratUse = score.congrat[uMath.random(0, score.congrat.length - 1)];
            }
            else {
                score.congratUse = score.congrat[uMath.random(0, score.congrat.length - 2)];
            }
        }
    }
    score.StopCollectCoin = StopCollectCoin;
})(score || (score = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gAchievements = (function (_super) {
            __extends(gAchievements, _super);
            function gAchievements(scene, x, y) {
                var _this = _super.call(this, scene, x, y) || this;
                _this.downPointY = 75;
                _this.upPointY = -40;
                _this.topPoint = 0;
                _this.downPoint = 0;
                _this.mPointY = 0;
                _this.moveScrollLine = false;
                _this.slowStableY = false;
                _this.posYStable = 0;
                _this.SelectVector = false;
                _this.mDown = 'Down';
                _this.mUp = 'Up';
                _this.countMedal = 0;
                _this.medl = [];
                _this.medl = [];
                _this.panel = new Phaser.GameObjects.Sprite(_this.scene, 0, 0, 'menu', 'medalpanel');
                _this.add(_this.panel);
                _this.topPoint = y;
                _this.containerMedals = new Phaser.GameObjects.Container(_this.scene, x, y);
                _this.scene.add.existing(_this.containerMedals);
                _this.maskSprite = new Phaser.GameObjects.Sprite(_this.scene, x, y + 15, 'menu', 'medalmask');
                _this.containerMedals.setDepth(10);
                _this.containerMedals.mask = new Phaser.Display.Masks.BitmapMask(_this.scene, _this.maskSprite);
                _this.countMedal = AchEngine.getLength();
                for (var i = 0; i < _this.countMedal; i++) {
                    var md = new Client.gMedal(_this.scene, -20, -80 + (102 * i));
                    md.setNameText(AchEngine.getNameById(i));
                    md.setDescriptionText(AchEngine.getDescriptionById(i));
                    if (AchEngine.getStateAchById(i)) {
                        md.setNewIcon(i);
                    }
                    md.setInfoNew(AchEngine.getInfoNewById(i));
                    _this.containerMedals.add(md);
                    _this.medl.push(md);
                    _this.downPoint = md.y + 102;
                }
                _this.scrollBtnUp = new Client.gButton(_this.scene, 217, -112, 'menu', 'scroll_arrow_btn0001', 'scroll_arrow_btn0002', 'scroll_arrow_btn0003');
                _this.scrollBtnUp.setEventName('ScrollBtnUp');
                _this.scene.events.on(_this.scrollBtnUp.getEventName(), _this.scrollUp, _this);
                _this.add(_this.scrollBtnUp);
                _this.scrollBtnDown = new Client.gButton(_this.scene, 215, 137, 'menu', 'scroll_arrow_btn0001', 'scroll_arrow_btn0002', 'scroll_arrow_btn0003');
                _this.scrollBtnDown.setEventName('ScrollBtnDown');
                _this.scrollBtnDown.angle = 180;
                _this.scene.events.on(_this.scrollBtnDown.getEventName(), _this.scrollDown, _this);
                _this.add(_this.scrollBtnDown);
                _this.scrollSprite = new Phaser.GameObjects.Sprite(_this.scene, 218, -40, 'menu', 'scroll_line');
                _this.add(_this.scrollSprite);
                _this.scrollSprite.setInteractive();
                _this.scrollSprite.on('pointerdown', _this.pointerDown, _this);
                return _this;
            }
            gAchievements.prototype.showAllMedal = function () {
                for (var i = 0; i < this.medl.length; i++) {
                    this.medl[i].setInfoNew(false);
                }
            };
            gAchievements.prototype.hidePanel = function () {
                this.y = -Config.GH / 2;
                this.containerMedals.y = this.y;
                this.maskSprite.y = this.y;
            };
            gAchievements.prototype.ShowPanel = function () {
                var tTween = this.scene.tweens.add({
                    targets: this,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                });
                var tTween = this.scene.tweens.add({
                    targets: this.containerMedals,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                });
                var tTween = this.scene.tweens.add({
                    targets: this.maskSprite,
                    y: Config.GH / 2 + 15,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                });
            };
            gAchievements.prototype.pointerDown = function (pointer) {
                this.mPointY = (this.scrollSprite.y + this.y) - pointer.y;
                this.moveScrollLine = true;
            };
            gAchievements.prototype.scrollDown = function () {
                if (!this.slowStableY) {
                    if (this.downPoint - this.topPoint > Math.round(this.topPoint + (-this.containerMedals.y) + 100)) {
                        this.slowStableY = true;
                        this.vector = this.mUp;
                        this.posYStable = this.containerMedals.y - 102;
                    }
                }
            };
            gAchievements.prototype.scrollUp = function () {
                if (!this.slowStableY) {
                    if (Math.round(this.containerMedals.y + 100) < this.topPoint) {
                        this.slowStableY = true;
                        this.vector = this.mDown;
                        this.posYStable = this.containerMedals.y;
                    }
                }
            };
            gAchievements.prototype.update = function () {
                if (this.moveScrollLine) {
                    this.scrollSprite.y = (this.scene.input.mouse.manager.activePointer.y + this.mPointY) - this.y;
                    if (this.scrollSprite.y < this.upPointY) {
                        this.scrollSprite.y = this.upPointY;
                    }
                    if (this.scrollSprite.y > this.downPointY) {
                        this.scrollSprite.y = this.downPointY;
                    }
                    var current = this.scrollSprite.y - this.upPointY;
                    var total = this.downPointY - this.upPointY;
                    var percentMoveScroll = uMath.toPercent(current, total);
                    var slTotal = this.downPoint - this.topPoint;
                    var slToScroll = uMath.fromPercent(percentMoveScroll, slTotal);
                    this.containerMedals.y = Math.round(this.topPoint - slToScroll);
                }
                if (this.moveScrollLine == true) {
                    if (this.scene.input.mouse.manager.activePointer.isDown == false) {
                        this.moveScrollLine = false;
                        this.posYStable = 213;
                        this.SelectVector = false;
                        for (var i = 0; i < this.countMedal; i++) {
                            if (this.containerMedals.y < this.posYStable) {
                                this.posYStable -= 102;
                            }
                            this.slowStableY = true;
                        }
                    }
                }
                else {
                    if (!this.SelectVector) {
                        if ((this.containerMedals.y - this.posYStable - 102) < -50) {
                            this.vector = this.mUp;
                        }
                        else {
                            this.vector = this.mDown;
                        }
                        this.SelectVector = true;
                    }
                    else {
                        var current = this.containerMedals.y - this.topPoint;
                        var total = this.downPoint - this.topPoint;
                        var percentMoveScroll = uMath.toPercent(current, total);
                        var slTotal = this.downPointY - this.upPointY;
                        var slToScroll = uMath.fromPercent(percentMoveScroll, slTotal);
                        this.scrollSprite.y = Math.round(this.upPointY - slToScroll);
                        if (this.vector == this.mUp) {
                            for (var i = 0; i < 5; i++) {
                                if (this.slowStableY) {
                                    if (this.containerMedals.y > this.posYStable) {
                                        this.containerMedals.y -= 1;
                                    }
                                    else {
                                        this.slowStableY = false;
                                    }
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < 5; i++) {
                                if (this.slowStableY) {
                                    if (this.containerMedals.y < this.posYStable + 102) {
                                        this.containerMedals.y += 1;
                                    }
                                    else {
                                        this.slowStableY = false;
                                    }
                                }
                            }
                        }
                    }
                }
            };
            return gAchievements;
        }(Phaser.GameObjects.Container));
        Client.gAchievements = gAchievements;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
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
            gButton.prototype.ChangeSkin = function (texture, normal, on, down) {
                this.gtexture = texture;
                this.gon = on;
                this.gdown = down;
                this.gnormal = normal;
                this.setTexture(this.gtexture, this.gnormal);
            };
            gButton.prototype.pointerDown = function () {
                this.setTexture(this.gtexture, this.gdown);
                if (this.eventName != '') {
                    this.scene.events.emit(this.eventName);
                    this.setTexture(this.gtexture, this.gnormal);
                }
                SndMng.sfxPlay('sound8');
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
        var gMedal = (function (_super) {
            __extends(gMedal, _super);
            function gMedal(scene, x, y) {
                var _this = _super.call(this, scene, x, y) || this;
                _this.bg = new Phaser.GameObjects.Sprite(_this.scene, 0, 0, 'menu', 'medalbg');
                _this.add(_this.bg);
                _this.infoNew = new Phaser.GameObjects.Sprite(_this.scene, 180, -28, 'menu', 'new');
                _this.infoNew.visible = false;
                _this.add(_this.infoNew);
                _this.icon = new Phaser.GameObjects.Sprite(_this.scene, -155, 0, 'menu', 'medal0');
                _this.icon.angle = -10;
                _this.add(_this.icon);
                _this.nameMedal = _this.scene.add.dynamicBitmapText(25, -30, 'font', 'mega big cool perfect award', 18);
                _this.nameMedal.tint = 0x9682A7;
                _this.nameMedal.setOrigin(0.5);
                _this.add(_this.nameMedal);
                _this.descriptionMedal = _this.scene.add.dynamicBitmapText(25, 0, 'font', 'mega big cool perfect award \n perfect award perfect award award', 13);
                _this.descriptionMedal.tint = 0xC2B4CA;
                _this.descriptionMedal.setOrigin(0.5);
                _this.add(_this.descriptionMedal);
                return _this;
            }
            gMedal.prototype.setNameText = function (text) {
                this.nameMedal.text = text;
            };
            gMedal.prototype.setNewIcon = function (iconIndex) {
                this.icon.setFrame('medal' + (iconIndex + 1));
            };
            gMedal.prototype.setDescriptionText = function (text) {
                this.descriptionMedal.text = text;
            };
            gMedal.prototype.mSetMask = function (mmask) {
                this.bg.mask = new Phaser.Display.Masks.BitmapMask(this.scene, mmask);
            };
            gMedal.prototype.setInfoNew = function (value) {
                this.infoNew.visible = value;
            };
            return gMedal;
        }(Phaser.GameObjects.Container));
        Client.gMedal = gMedal;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oAchievsShow = (function (_super) {
            __extends(oAchievsShow, _super);
            function oAchievsShow(scene, x, y) {
                var _this = _super.call(this, scene, x, y) || this;
                _this.icon = new Phaser.GameObjects.Sprite(_this.scene, 0, 0, 'menu', 'medal1');
                _this.angle = -4;
                _this.add(_this.icon);
                _this.effect = new Phaser.GameObjects.Sprite(_this.scene, _this.x, _this.y, 'background2', 'medaleffect0001');
                _this.scene.add.existing(_this.effect);
                _this.effect.setScale(1.5);
                _this.effect.setDepth(1);
                _this.effect.play('showAchEffect');
                var effectTween = _this.scene.tweens.add({
                    targets: _this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    repeat: -1,
                });
                return _this;
            }
            oAchievsShow.prototype.update = function () {
                this.effect.x = this.x;
                this.effect.y = this.y;
            };
            oAchievsShow.prototype.Show = function (id) {
                SndMng.sfxPlay('sound37');
                score.showed = true;
                this.icon.setFrame('medal' + id);
                this.timeline = this.scene.tweens.createTimeline(null);
                this.timeline.add({
                    targets: this,
                    x: this.x + 170,
                    duration: 200,
                });
                this.timeline.add({
                    targets: this,
                    x: this.x,
                    duration: 200,
                    delay: 3000,
                    onComplete: function () { score.showed = false; }
                });
                this.timeline.play();
            };
            return oAchievsShow;
        }(Phaser.GameObjects.Container));
        Client.oAchievsShow = oAchievsShow;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oBestDistance = (function (_super) {
            __extends(oBestDistance, _super);
            function oBestDistance(scene, x, y) {
                var _this = _super.call(this, scene, x, y, '', '') || this;
                _this.visible = false;
                return _this;
            }
            oBestDistance.prototype.create = function () {
                this.setOrigin(0.5, 0.3);
                this.distanceText = this.scene.add.dynamicBitmapText(0, 130, 'font', 'BEST DISTANCE:' + '\n' + score.bestDistance + ' m', 30);
                this.distanceText.setCenterAlign();
                this.distanceText.setOrigin(0.5);
                this.conteiner = this.scene.add.container(this.x, this.y);
                for (var i = 0; i < 10; i++) {
                    var arrrow = new Phaser.GameObjects.Sprite(this.scene, 0, 0 - 151 * i, 'objects', 'arrow_distance');
                    this.conteiner.add(arrrow);
                }
                this.conteiner.add(this.distanceText);
                this.conteiner.setDepth(100000);
            };
            return oBestDistance;
        }(Phaser.GameObjects.Sprite));
        Client.oBestDistance = oBestDistance;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oBird = (function (_super) {
            __extends(oBird, _super);
            function oBird(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'bird0001') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.tSpike = 'Spike';
                return _this;
            }
            oBird.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.setCollideWorldBounds(true);
                this.setSize(50, 50);
                this.setOffset(30, 30);
                this.myType = this.tSpike;
                if (!this.scene.anims.get('bird_fly')) {
                    var nameSprite = 'bird';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 35, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'bird_fly', frames: frameAnim, frameRate: 30, repeat: -1 });
                }
                this.play('bird_fly');
                if (!this.scene.anims.get('bird_dead')) {
                    var nameSprite = 'bird';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 36, end: 57, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'bird_dead', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
                this.play('bird_fly');
                this.tween = this.scene.tweens.add({
                    targets: this,
                    x: this.x - 2000,
                    duration: 10000,
                    dalay: 6000,
                });
            };
            oBird.prototype.pick = function (group, destroyed) {
                if (destroyed === void 0) { destroyed = false; }
                this.myType = '';
                if (destroyed) {
                    this.setScale(2);
                    this.play('bird_dead');
                    SndMng.sfxPlay('sound' + 5);
                    AchEngine.birdTotal++;
                }
            };
            return oBird;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oBird = oBird;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var ooBonusMagneto = (function (_super) {
            __extends(ooBonusMagneto, _super);
            function ooBonusMagneto(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'game', 'bonusmagneto') || this;
                _this.tCandy = 'Candy';
                _this.tSpike = 'Spike';
                _this.tDino = 'Dino';
                _this.tMagneto = 'Magneto';
                return _this;
            }
            ooBonusMagneto.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.myType = this.tMagneto;
            };
            ooBonusMagneto.prototype.pick = function (group, destroyed) {
                if (destroyed === void 0) { destroyed = false; }
                this.myType = '';
                this.visible = false;
                AchEngine.magnetoTotal++;
            };
            return ooBonusMagneto;
        }(Phaser.Physics.Arcade.Sprite));
        Client.ooBonusMagneto = ooBonusMagneto;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oBonus_dino = (function (_super) {
            __extends(oBonus_dino, _super);
            function oBonus_dino(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'game', 'bonusdino') || this;
                _this.tCandy = 'Candy';
                _this.tSpike = 'Spike';
                _this.tDino = 'Dino';
                return _this;
            }
            oBonus_dino.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.myType = this.tDino;
            };
            oBonus_dino.prototype.pick = function (group, destroyed) {
                if (destroyed === void 0) { destroyed = false; }
                this.myType = '';
                this.visible = false;
                AchEngine.dinoTotal++;
            };
            return oBonus_dino;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oBonus_dino = oBonus_dino;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyBlue = (function (_super) {
            __extends(oCandyBlue, _super);
            function oCandyBlue(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_blue') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyBlue.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_blue')) {
                    var nameSprite = 'candy_blue_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 18, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_blue', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyBlue.prototype.pick = function (group) {
                this.tween.stop();
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 15 < score.Maxstanina) {
                        score.stanina += 15;
                    }
                    this.play('pick_blue');
                }
                this.myType = '';
            };
            return oCandyBlue;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyBlue = oCandyBlue;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyGreen = (function (_super) {
            __extends(oCandyGreen, _super);
            function oCandyGreen(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_green') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyGreen.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_green')) {
                    var nameSprite = 'candy_green_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 18, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_green', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyGreen.prototype.pick = function (group) {
                this.tween.stop();
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 15 < score.Maxstanina) {
                        score.stanina += 15;
                    }
                    this.play('pick_green');
                }
                this.myType = '';
            };
            return oCandyGreen;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyGreen = oCandyGreen;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyPink = (function (_super) {
            __extends(oCandyPink, _super);
            function oCandyPink(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_pink') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyPink.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_pink')) {
                    var nameSprite = 'candy_pink_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 18, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_pink', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyPink.prototype.pick = function (group) {
                this.tween.stop();
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 15 < score.Maxstanina) {
                        score.stanina += 15;
                    }
                    this.play('pick_pink');
                }
                this.myType = '';
            };
            return oCandyPink;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyPink = oCandyPink;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyStarBlue = (function (_super) {
            __extends(oCandyStarBlue, _super);
            function oCandyStarBlue(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_star_blue') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyStarBlue.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_star_blue')) {
                    var nameSprite = 'candy_star_blue_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 40, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_star_blue', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyStarBlue.prototype.pick = function (group) {
                AchEngine.starMax++;
                this.tween.stop();
                this.setScale(2);
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 200 < score.Maxstanina + 100) {
                        score.stanina += 200;
                    }
                    else {
                        score.stanina = score.Maxstanina + 100;
                    }
                    this.play('pick_star_blue');
                    SndMng.sfxPlay('sound' + uMath.random(47, 49));
                }
                this.myType = '';
            };
            return oCandyStarBlue;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyStarBlue = oCandyStarBlue;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyStarGreen = (function (_super) {
            __extends(oCandyStarGreen, _super);
            function oCandyStarGreen(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_star_green') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyStarGreen.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_star_green')) {
                    var nameSprite = 'candy_star_green_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 40, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_star_green', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyStarGreen.prototype.pick = function (group) {
                this.tween.stop();
                this.setScale(2);
                AchEngine.starMax++;
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 200 < score.Maxstanina + 100) {
                        score.stanina += 200;
                    }
                    else {
                        score.stanina = score.Maxstanina + 100;
                    }
                    this.play('pick_star_green');
                    SndMng.sfxPlay('sound' + uMath.random(47, 49));
                }
                this.myType = '';
            };
            return oCandyStarGreen;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyStarGreen = oCandyStarGreen;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyStarPink = (function (_super) {
            __extends(oCandyStarPink, _super);
            function oCandyStarPink(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_star_pink') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyStarPink.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_star_pink')) {
                    var nameSprite = 'candy_star_pink_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 40, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_star_pink', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyStarPink.prototype.pick = function (group) {
                this.tween.stop();
                this.setScale(2);
                AchEngine.starMax++;
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 200 < score.Maxstanina + 100) {
                        score.stanina += 200;
                    }
                    else {
                        score.stanina = score.Maxstanina + 100;
                    }
                    this.play('pick_star_pink');
                    SndMng.sfxPlay('sound' + uMath.random(47, 49));
                }
                this.myType = '';
            };
            return oCandyStarPink;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyStarPink = oCandyStarPink;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyStarYellow = (function (_super) {
            __extends(oCandyStarYellow, _super);
            function oCandyStarYellow(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_star_yellow') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyStarYellow.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_star_yellow')) {
                    var nameSprite = 'candy_star_yellow_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 40, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_star_yellow', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyStarYellow.prototype.pick = function (group) {
                this.tween.stop();
                this.setScale(2);
                AchEngine.starMax++;
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 200 < score.Maxstanina + 100) {
                        score.stanina += 200;
                    }
                    else {
                        score.stanina = score.Maxstanina + 100;
                    }
                    this.play('pick_star_yellow');
                    SndMng.sfxPlay('sound' + uMath.random(47, 49));
                }
                this.myType = '';
            };
            return oCandyStarYellow;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyStarYellow = oCandyStarYellow;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oCandyYellow = (function (_super) {
            __extends(oCandyYellow, _super);
            function oCandyYellow(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'candy_yellow') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.Magneted = false;
                return _this;
            }
            oCandyYellow.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.angle = -4;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    angle: 4,
                    duration: 500,
                    yoyo: true,
                    loop: -1
                });
                this.myType = this.tCandy;
                this.setDepth(2);
                if (!this.scene.anims.get('pick_yellow')) {
                    var nameSprite = 'candy_yellow_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 18, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'pick_yellow', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oCandyYellow.prototype.pick = function (group) {
                this.tween.stop();
                if (this.myType == this.tCandy) {
                    if (score.Collection) {
                        score.CollectCoin++;
                    }
                    if (score.stanina + 15 < score.Maxstanina) {
                        score.stanina += 15;
                    }
                    this.play('pick_yellow');
                }
                this.myType = '';
            };
            return oCandyYellow;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oCandyYellow = oCandyYellow;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oDistance = (function (_super) {
            __extends(oDistance, _super);
            function oDistance(scene, x, y) {
                return _super.call(this, scene, x, y, 'game', 'distance') || this;
            }
            oDistance.prototype.setPos = function (tx, ty, dist) {
                this.x = tx;
                this.y = ty;
                this.distanceText.x = tx;
                this.distanceText.y = this.y + 20;
                this.distanceText.text = dist + ' m';
                this.distanceText2.text = dist + ' m';
                this.distanceText3.text = dist + ' m';
                this.conteiner.x = this.x + 300;
                this.conteiner.y = this.y - 750;
            };
            oDistance.prototype.create = function () {
                this.setOrigin(0.5, 0.3);
                this.distanceText = this.scene.add.dynamicBitmapText(this.x, this.y + 20, 'font', '500 m', 31);
                this.distanceText.tint = 0x9682A7;
                this.distanceText.setOrigin(0.5);
                this.distanceText2 = this.scene.add.dynamicBitmapText(0, 635, 'font', '500 m', 31);
                this.distanceText2.tint = 0xCC8699;
                this.distanceText2.setOrigin(0.5);
                this.distanceText3 = this.scene.add.dynamicBitmapText(0, 0, 'font', '500 m', 31);
                this.distanceText3.tint = 0xCC8699;
                this.distanceText3.setOrigin(0.5);
                this.conteiner = this.scene.add.container(this.x + 300, this.y - 750);
                this.rotateDistance = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'game', 'distance2');
                this.conteiner.add(this.rotateDistance);
                this.conteiner.add(this.distanceText2);
                this.conteiner.add(this.distanceText3);
                this.conteiner.angle = -4;
                this.tweenDistance = this.scene.tweens.add({
                    targets: this.conteiner,
                    angle: 4,
                    duration: 2500,
                    yoyo: true,
                    loop: -1
                });
            };
            return oDistance;
        }(Phaser.GameObjects.Sprite));
        Client.oDistance = oDistance;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oHelpDoubleJump = (function (_super) {
            __extends(oHelpDoubleJump, _super);
            function oHelpDoubleJump(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'double_jump') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.tTrampoline = 'Trampoline';
                return _this;
            }
            oHelpDoubleJump.prototype.create = function () {
                this.setOrigin(0.5, 1);
                this.scene.physics.add.existing(this);
                this.setDepth(0);
            };
            oHelpDoubleJump.prototype.pick = function (group) {
                this.myType = '';
            };
            return oHelpDoubleJump;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oHelpDoubleJump = oHelpDoubleJump;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oMouse = (function (_super) {
            __extends(oMouse, _super);
            function oMouse(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'mouse0001') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.tSpike = 'Spike';
                return _this;
            }
            oMouse.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.setCollideWorldBounds(true);
                this.setSize(50, 50);
                this.setOffset(30, 30);
                this.myType = this.tSpike;
                this.setOrigin(0.5, 0.74);
                if (!this.scene.anims.get('mouse_go')) {
                    var nameSprite = 'mouse';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 25, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'mouse_go', frames: frameAnim, frameRate: 30, repeat: -1 });
                }
                this.play('mouse_go');
                if (!this.scene.anims.get('mouse_dead')) {
                    var nameSprite = 'mouse';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 26, end: 50, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'mouse_dead', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
                this.tween = this.scene.tweens.add({
                    targets: this,
                    x: this.x - 2000,
                    duration: 98000,
                    dalay: 3500,
                });
            };
            oMouse.prototype.pick = function (group, destroyed) {
                if (destroyed === void 0) { destroyed = false; }
                this.myType = '';
                if (destroyed) {
                    this.setScale(2);
                    this.play('mouse_dead');
                    SndMng.sfxPlay('sound' + 42);
                    AchEngine.mouseTotal++;
                }
            };
            return oMouse;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oMouse = oMouse;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform1 = (function (_super) {
            __extends(oPlatform1, _super);
            function oPlatform1(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_1';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform1.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform1;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform1 = oPlatform1;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform2 = (function (_super) {
            __extends(oPlatform2, _super);
            function oPlatform2(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_2';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform2.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform2;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform2 = oPlatform2;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform3 = (function (_super) {
            __extends(oPlatform3, _super);
            function oPlatform3(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_3';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform3.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform3;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform3 = oPlatform3;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform4 = (function (_super) {
            __extends(oPlatform4, _super);
            function oPlatform4(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_4';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform4.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform4;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform4 = oPlatform4;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform5 = (function (_super) {
            __extends(oPlatform5, _super);
            function oPlatform5(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_5';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform5.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform5;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform5 = oPlatform5;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform6 = (function (_super) {
            __extends(oPlatform6, _super);
            function oPlatform6(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_6';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform6.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform6;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform6 = oPlatform6;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform7 = (function (_super) {
            __extends(oPlatform7, _super);
            function oPlatform7(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_7';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform7.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform7;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform7 = oPlatform7;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlatform8 = (function (_super) {
            __extends(oPlatform8, _super);
            function oPlatform8(scene, x, y) {
                var _this = this;
                var nname = 'platform_' + (Config.useLevel - 1) + '_8';
                _this = _super.call(this, scene, x, y, 'objects', nname) || this;
                return _this;
            }
            oPlatform8.prototype.create = function () {
                this.setOrigin(0.5);
            };
            return oPlatform8;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlatform8 = oPlatform8;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oPlayer = (function (_super) {
            __extends(oPlayer, _super);
            function oPlayer(scene, x, y) {
                var _this = _super.call(this, scene, x, y, '') || this;
                _this.numIdle = [1, 14];
                _this.numRunHappy = [15, 35];
                _this.numJumpHappy = [36, 48];
                _this.numEatHuppy = [49, 54];
                _this.numRunHungry = [55, 75];
                _this.numJumpHungry = [76, 88];
                _this.numEatHungry = [89, 94];
                _this.numDead = [95, 127];
                _this.numDamageHappy = [128, 136];
                _this.numDamageHungry = [137, 145];
                _this.aIdle = 0;
                _this.aRunHappy = 1;
                _this.aJumpHappy = 2;
                _this.aEatHappy = 3;
                _this.aRunHungry = 4;
                _this.aJumpHungry = 5;
                _this.aEatHungry = 6;
                _this.aDead = 7;
                _this.aDamageHappy = 8;
                _this.aDamageHungry = 9;
                _this.dinoTime = 0;
                _this.magnetTime = 0;
                _this.Animbody = ['abIdle', 'abRunHuppy', 'abJumpHappy', 'abEatHappy', 'abRunHangry', 'abJumpHungry', 'abEatHungry', 'abDead', 'abDamageHappy', 'abDamageHungry'];
                _this.AnimHead = ['ahIdle', 'ahRunHuppy', 'ahJumpHappy', 'ahEatHappy', 'ahRunHangry', 'ahJumpHungry', 'ahEatHungry', 'ahDead', 'ahDamageHappy', 'ahDamageHungry'];
                _this.AnimHeadDino = ['ahdIdle', 'ahdRunHuppy', 'ahdJumpHappy', 'ahdEatHappy', 'ahdRunHangry', 'ahdJumpHungry', 'ahdEatHungry', 'ahdDead', 'ahdDamageHappy', 'ahdDamageHungry'];
                _this.AnimRHand = ['arhIdle', 'arhRunHuppy', 'arhJumpHappy', 'arhEatHappy', 'arhRunHangry', 'arhJumpHungry', 'arhEatHungry', 'arhDead', 'arhDamageHappy', 'arhDamageHungry'];
                _this.AnimLHand = ['alhIdle', 'alhRunHuppy', 'alhJumpHappy', 'alhEatHappy', 'alhRunHangry', 'alhJumpHungry', 'alhEatHungry', 'alhDead', 'alhDamageHappy', 'alhDamageHungry'];
                _this.AnimLHandMagnet = ['alhmIdle', 'alhmRunHuppy', 'alhmJumpHappy', 'alhmEatHappy', 'alhmRunHangry', 'alhmJumpHungry', 'alhmEatHungry', 'alhmDead', 'alhmDamageHappy', 'alhmDamageHungry'];
                _this.AnimRHandMagnet = ['arhmIdle', 'arhmRunHuppy', 'arhmJumpHappy', 'arhmEatHappy', 'arhmRunHangry', 'arhmJumpHungry', 'arhmEatHungry', 'arhmDead', 'arhmDamageHappy', 'arhmDamageHungry'];
                _this.allowJump = false;
                _this.allowDoubleJump = false;
                _this.ActiveMagnet = false;
                _this.ActiveDino = false;
                _this.Unbreakable = 0;
                _this.visible = false;
                return _this;
            }
            oPlayer.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.conteiner = this.scene.add.container(this.x + 10, this.y + 25);
                this.conteiner.setDepth(1);
                this.effect_magnet = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'magneto_effect').setOrigin(0.5);
                this.effect_magnet.visible = false;
                this.scene.add.existing(this.effect_magnet);
                this.l_hand = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'l_hand0001').setOrigin(0.5);
                this.scene.add.existing(this.l_hand);
                this.l_hand_magnet = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'l_hand_magnet0001').setOrigin(0.5);
                this.l_hand_magnet.visible = false;
                this.scene.add.existing(this.l_hand_magnet);
                this.pbody = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'body0001').setOrigin(0.5);
                this.pbody.on('animationcomplete', this.animComplete, this);
                this.scene.add.existing(this.pbody);
                this.r_hand = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'r_hand0001').setOrigin(0.5);
                this.scene.add.existing(this.r_hand);
                this.r_hand_magnet = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'r_hand_magnet0001').setOrigin(0.5);
                this.r_hand_magnet.visible = false;
                this.scene.add.existing(this.r_hand_magnet);
                this.head = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'head0001').setOrigin(0.5);
                this.scene.add.existing(this.head);
                this.dino_head = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'player', 'dino_head0001').setOrigin(0.5);
                this.dino_head.visible = false;
                this.scene.add.existing(this.dino_head);
                this.activateAnimDino = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'game', 'dino_hero_effect0001').setOrigin(0.5);
                this.activateAnimDino.visible = false;
                this.scene.add.existing(this.activateAnimDino);
                this.activateAnimMagnet = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'game', 'magneto_hero_effect0001').setOrigin(0.5);
                this.activateAnimMagnet.visible = false;
                this.scene.add.existing(this.activateAnimMagnet);
                this.conteiner.add(this.effect_magnet);
                this.conteiner.add(this.l_hand);
                this.conteiner.add(this.l_hand_magnet);
                this.conteiner.add(this.pbody);
                this.conteiner.add(this.r_hand);
                this.conteiner.add(this.r_hand_magnet);
                this.conteiner.add(this.head);
                this.conteiner.add(this.dino_head);
                this.conteiner.add(this.activateAnimDino);
                this.conteiner.add(this.activateAnimMagnet);
                this.setCollideWorldBounds(true);
                this.setSize(40, 90);
                this.setOffset(10, 10);
                if (!this.scene.anims.get('activeMagnet')) {
                    if (!this.scene.anims.get('showAchEffect'))
                        var nameSprite = 'medaleffect';
                    var frameAnim = this.scene.anims.generateFrameNames('background2', {
                        start: 1, end: 20, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'showAchEffect', frames: frameAnim, frameRate: 30, repeat: -1 });
                    var nameSprite = 'magneto_hero_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('game', {
                        start: 1, end: 21, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'activeMagnet', frames: frameAnim, frameRate: 30, repeat: 0 });
                    var nameSprite = 'dino_hero_effect';
                    var frameAnim = this.scene.anims.generateFrameNames('game', {
                        start: 1, end: 21, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'activeDino', frames: frameAnim, frameRate: 30, repeat: 0 });
                    var nameSprite = 'body';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.Animbody[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var nameSprite = 'head';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHead[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var nameSprite = 'l_hand';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHand[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var nameSprite = 'r_hand';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHand[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var nameSprite = 'r_hand_magnet';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimRHandMagnet[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var nameSprite = 'l_hand_magnet';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimLHandMagnet[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var nameSprite = 'dino_head';
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numIdle[0], end: this.numIdle[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aIdle], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHappy[0], end: this.numRunHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aRunHappy], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHappy[0], end: this.numJumpHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aJumpHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHuppy[0], end: this.numEatHuppy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aEatHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numRunHungry[0], end: this.numRunHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aRunHungry], frames: frameAnim, frameRate: 60, repeat: -1 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numJumpHungry[0], end: this.numJumpHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aJumpHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numEatHungry[0], end: this.numEatHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aEatHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDead[0], end: this.numDead[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aDead], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHappy[0], end: this.numDamageHappy[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aDamageHappy], frames: frameAnim, frameRate: 60, repeat: 0 });
                    var frameAnim = this.scene.anims.generateFrameNames('player', {
                        start: this.numDamageHungry[0], end: this.numDamageHungry[1], zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: this.AnimHeadDino[this.aDamageHungry], frames: frameAnim, frameRate: 60, repeat: 0 });
                }
                this.SetAnimIdle();
            };
            oPlayer.prototype.pick = function (group) {
                if (score.stanina >= score.Maxstanina / 3) {
                    this.SetAnimEatHappy();
                }
                else {
                    this.SetAnimEatHungry();
                }
            };
            oPlayer.prototype.setJump = function () {
                if (this.body.touching.down) {
                    this.allowJump = true;
                    this.allowDoubleJump = true;
                    if (score.CollectCoin > 0) {
                        score.StopCollectCoin();
                    }
                }
            };
            oPlayer.prototype.trampline = function () {
                score.StartCollectCoin();
                this.setVelocityY(-1300);
                this.allowJump = false;
                this.allowDoubleJump = true;
                if (score.stanina >= score.Maxstanina / 3) {
                    this.SetAnimJumpHappy();
                }
                else {
                    this.SetAnimJumpHungry();
                }
            };
            oPlayer.prototype.Jump = function () {
                if (this.pbody.anims.currentAnim.key != this.Animbody[this.aDead])
                    if ((this.pbody.anims.currentAnim.key != this.Animbody[this.aDamageHungry]) && (this.pbody.anims.currentAnim.key != this.Animbody[this.aDamageHappy])) {
                        if (this.allowJump && score.stanina > 0) {
                            score.StartCollectCoin();
                            this.setVelocityY(-900);
                            if (score.stanina >= score.Maxstanina / 3) {
                                this.SetAnimJumpHappy();
                            }
                            else {
                                this.SetAnimJumpHungry();
                            }
                            SndMng.sfxPlay('sound' + 28);
                            this.allowJump = false;
                            AchEngine.jumpMax++;
                        }
                        else {
                            if (this.allowDoubleJump) {
                                this.setVelocityY(-900);
                                score.StartCollectCoin();
                                if (score.stanina >= score.Maxstanina / 3) {
                                    this.SetAnimJumpHappy();
                                }
                                else {
                                    this.SetAnimJumpHungry();
                                }
                                SndMng.sfxPlay('sound' + 28);
                                this.allowDoubleJump = false;
                                AchEngine.doubleJumpMax++;
                            }
                        }
                    }
            };
            oPlayer.prototype.ActivatedMagnet = function () {
                this.magnetTime = 500;
                this.l_hand.visible = false;
                this.r_hand.visible = false;
                this.l_hand_magnet.visible = true;
                this.r_hand_magnet.visible = true;
                this.effect_magnet.visible = true;
                this.ActiveMagnet = true;
                this.activateAnimMagnet.visible = true;
                this.activateAnimMagnet.play('activeMagnet');
            };
            oPlayer.prototype.DeactivatedMagnet = function () {
                this.l_hand.visible = true;
                this.r_hand.visible = true;
                this.l_hand_magnet.visible = false;
                this.r_hand_magnet.visible = false;
                this.effect_magnet.visible = false;
                this.ActiveMagnet = false;
                this.activateAnimMagnet.visible = false;
            };
            oPlayer.prototype.ActivatedDino = function () {
                this.dinoTime = 500;
                this.head.visible = false;
                this.dino_head.visible = true;
                this.ActiveDino = true;
                score.stanina = score.Maxstanina + 100;
                this.activateAnimDino.play('activeDino');
                this.activateAnimDino.visible = true;
            };
            oPlayer.prototype.DeactivatedDino = function () {
                this.head.visible = true;
                this.dino_head.visible = false;
                this.ActiveDino = false;
                this.activateAnimDino.visible = false;
                this.Unbreakable = 100;
                this.tween = this.scene.tweens.add({
                    targets: this.conteiner,
                    alpha: 0,
                    duration: 100,
                    yoyo: true,
                    loop: -1
                });
            };
            oPlayer.prototype.ChangeFrameRate = function () {
                var speedFR = (((score.Maxstanina + 100) - score.stanina) / 13);
                this.head.anims.currentAnim.msPerFrame = speedFR;
                this.pbody.anims.currentAnim.msPerFrame = speedFR;
                this.l_hand.anims.currentAnim.msPerFrame = speedFR;
                this.r_hand.anims.currentAnim.msPerFrame = speedFR;
                this.r_hand_magnet.anims.currentAnim.msPerFrame = speedFR;
                this.l_hand_magnet.anims.currentAnim.msPerFrame = speedFR;
                this.dino_head.anims.currentAnim.msPerFrame = speedFR;
            };
            oPlayer.prototype.SetAnimIdle = function () {
                var anim = this.aIdle;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimRunHappy = function () {
                SndMng.stopMusicByName('sound' + 6);
                var anim = this.aRunHappy;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimJumpHappy = function () {
                var anim = this.aJumpHappy;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.animComplete = function () {
                if (this.pbody.anims.currentAnim.key == this.Animbody[this.aEatHappy]) {
                    if (this.allowJump) {
                        this.SetAnimRunHappy();
                    }
                    else {
                        this.SetAnimJumpHappy();
                    }
                }
                if (this.pbody.anims.currentAnim.key == this.Animbody[this.aEatHungry]) {
                    if (this.allowJump) {
                        this.SetAnimRunHungry();
                    }
                    else {
                        this.SetAnimJumpHungry();
                    }
                }
                if (this.pbody.anims.currentAnim.key == this.Animbody[this.aDead]) {
                    this.scene.events.emit('GameOver');
                }
            };
            oPlayer.prototype.SetAnimEatHappy = function () {
                var anim = this.aEatHappy;
                if (!this.ActiveDino) {
                    SndMng.sfxPlay('sound' + uMath.random(13, 18));
                }
                else {
                    SndMng.sfxPlay('sound' + uMath.random(32, 36));
                }
                if (this.pbody.anims.currentAnim.key != this.Animbody[this.aEatHappy]) {
                    this.head.play(this.AnimHead[anim]);
                    this.pbody.play(this.Animbody[anim]);
                    this.l_hand.play(this.AnimLHand[anim]);
                    this.r_hand.play(this.AnimRHand[anim]);
                    this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                    this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                    this.dino_head.play(this.AnimHeadDino[anim]);
                }
                else {
                    if (this.pbody.anims.currentAnim.key == this.Animbody[this.aEatHappy]) {
                        this.head.anims.restart();
                        this.pbody.anims.restart();
                        this.l_hand.anims.restart();
                        this.r_hand.anims.restart();
                        this.r_hand_magnet.anims.restart();
                        this.l_hand_magnet.anims.restart();
                        this.dino_head.anims.restart();
                    }
                }
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimRunHungry = function () {
                if (!this.ActiveDino) {
                    SndMng.sfxPlay('sound' + uMath.random(13, 18));
                }
                else {
                    SndMng.sfxPlay('sound' + uMath.random(32, 36));
                }
                SndMng.sfxPlay('sound' + 6, 1, true);
                var anim = this.aRunHungry;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimJumpHungry = function () {
                var anim = this.aJumpHungry;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimEatHungry = function () {
                var anim = this.aEatHungry;
                if (this.pbody.anims.currentAnim.key != this.Animbody[this.aEatHungry]) {
                    this.head.play(this.AnimHead[anim]);
                    this.pbody.play(this.Animbody[anim]);
                    this.l_hand.play(this.AnimLHand[anim]);
                    this.r_hand.play(this.AnimRHand[anim]);
                    this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                    this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                    this.dino_head.play(this.AnimHeadDino[anim]);
                }
                else {
                    this.head.anims.restart();
                    this.pbody.anims.restart();
                    this.l_hand.anims.restart();
                    this.r_hand.anims.restart();
                    this.r_hand_magnet.anims.restart();
                    this.l_hand_magnet.anims.restart();
                    this.dino_head.anims.restart();
                }
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimDead = function () {
                this.conteiner.setDepth(20);
                var anim = this.aDead;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimDamageHappy = function () {
                var anim = this.aDamageHappy;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.SetAnimDamageHungry = function () {
                var anim = this.aDamageHungry;
                this.head.play(this.AnimHead[anim]);
                this.pbody.play(this.Animbody[anim]);
                this.l_hand.play(this.AnimLHand[anim]);
                this.r_hand.play(this.AnimRHand[anim]);
                this.r_hand_magnet.play(this.AnimRHandMagnet[anim]);
                this.l_hand_magnet.play(this.AnimLHandMagnet[anim]);
                this.dino_head.play(this.AnimHeadDino[anim]);
                this.ChangeFrameRate();
            };
            oPlayer.prototype.addDamage = function () {
                if (this.Unbreakable <= 0) {
                    if (score.stanina - 400) {
                        score.stanina -= 400;
                    }
                    else {
                        score.stanina = 0;
                    }
                    this.Unbreakable = 200;
                    SndMng.sfxPlay('sound' + 50);
                    this.tween = this.scene.tweens.add({
                        targets: this.conteiner,
                        alpha: 0,
                        duration: 100,
                        yoyo: true,
                        loop: -1
                    });
                    if (score.stanina >= score.Maxstanina / 3) {
                        this.SetAnimDamageHappy();
                    }
                    else {
                        this.SetAnimDamageHungry();
                    }
                }
            };
            oPlayer.prototype.update = function (time, delta) {
                if (this.ActiveDino) {
                    if (this.dinoTime > 0) {
                        this.dinoTime -= 0.1 * delta;
                    }
                    else {
                        this.DeactivatedDino();
                    }
                }
                if (this.ActiveMagnet) {
                    if (this.magnetTime > 0) {
                        this.magnetTime -= 0.1 * delta;
                    }
                    else {
                        this.DeactivatedMagnet();
                    }
                }
                if (this.pbody.anims.currentAnim.key == this.Animbody[this.aRunHappy]) {
                }
                if (this.Unbreakable > 0) {
                    this.Unbreakable--;
                }
                else {
                    if (this.tween) {
                        this.tween.stop();
                    }
                    this.conteiner.alpha = 1;
                }
                if (score.stanina >= 0) {
                    if (score.stanina >= score.Maxstanina / 3) {
                        this.setVelocityX(score.stanina);
                    }
                    else {
                        this.setVelocityX(score.stanina * 1.5);
                    }
                }
                else {
                    this.setVelocityX(0);
                    if (this.allowJump)
                        if (this.pbody.anims.currentAnim.key != this.Animbody[this.aDead]) {
                            this.SetAnimDead();
                            SndMng.sfxPlay('sound' + 10);
                            if (this.tween) {
                                this.tween.stop();
                            }
                            this.conteiner.alpha = 1;
                        }
                }
                this.conteiner.x = this.x + 10;
                this.conteiner.y = this.y + 25;
                if (score.stanina >= score.Maxstanina / 3) {
                    if (this.body.velocity.x > 0) {
                        if (this.pbody.anims.currentAnim.key != this.Animbody[this.aRunHappy]) {
                            if (this.pbody.anims.currentAnim.key != this.Animbody[this.aEatHappy]) {
                                if (this.allowJump) {
                                    this.SetAnimRunHappy();
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.body.velocity.x > 0) {
                        if (this.pbody.anims.currentAnim.key != this.Animbody[this.aRunHungry]) {
                            if (this.pbody.anims.currentAnim.key != this.Animbody[this.aEatHungry]) {
                                if (this.allowJump) {
                                    this.SetAnimRunHungry();
                                }
                            }
                        }
                    }
                }
                if (this.effect_magnet.visible) {
                    this.effect_magnet.angle++;
                }
            };
            return oPlayer;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oPlayer = oPlayer;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oSand = (function (_super) {
            __extends(oSand, _super);
            function oSand(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'game', 'sand' + Config.useLevel) || this;
                _this.tCandy = 'Candy';
                _this.tSpike = 'Spike';
                _this.tDino = 'Dino';
                _this.tSand = 'Sand';
                return _this;
            }
            oSand.prototype.create = function () {
                this.setOrigin(0.5, 0.3);
                this.scene.physics.add.existing(this);
                this.myType = this.tSand;
            };
            oSand.prototype.pick = function (group, destroyed) {
                if (destroyed === void 0) { destroyed = false; }
            };
            return oSand;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oSand = oSand;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oSpike = (function (_super) {
            __extends(oSpike, _super);
            function oSpike(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'spike0001') || this;
                _this.tCandy = 'Candy';
                _this.tSpike = 'Spike';
                return _this;
            }
            oSpike.prototype.create = function () {
                this.setOrigin(0.5, 1);
                this.scene.physics.add.existing(this);
                this.setSize(50, 50);
                this.setOffset(10, 10);
                this.myType = this.tSpike;
                if (!this.scene.anims.get('spike_remove')) {
                    var nameSprite = 'spike';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 2, end: 27, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'spike_remove', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oSpike.prototype.pick = function (group, destroyed) {
                if (destroyed === void 0) { destroyed = false; }
                this.myType = '';
                if (destroyed) {
                    this.setScale(2);
                    this.setOrigin(0.45, 0.4);
                    this.play('spike_remove');
                    SndMng.sfxPlay('sound' + 7);
                }
            };
            return oSpike;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oSpike = oSpike;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var oTrampoline = (function (_super) {
            __extends(oTrampoline, _super);
            function oTrampoline(scene, x, y) {
                var _this = _super.call(this, scene, x, y, 'objects', 'trampoline0001') || this;
                _this.tCandy = 'Candy';
                _this.tStar = 'Star';
                _this.tTrampoline = 'Trampoline';
                return _this;
            }
            oTrampoline.prototype.create = function () {
                this.scene.physics.add.existing(this);
                this.myType = this.tTrampoline;
                if (!this.scene.anims.get('play_trampoline')) {
                    var nameSprite = 'trampoline';
                    var frameAnim = this.scene.anims.generateFrameNames('objects', {
                        start: 1, end: 20, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.anims.create({ key: 'play_trampoline', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
            };
            oTrampoline.prototype.pick = function (group) {
                this.myType = '';
                this.play('play_trampoline');
                SndMng.sfxPlay('sound' + 11);
            };
            return oTrampoline;
        }(Phaser.Physics.Arcade.Sprite));
        Client.oTrampoline = oTrampoline;
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
                this.load.bitmapFont('font', './assets/atlases/font.png', './assets/atlases/font.xml');
                this.load.bitmapFont('font2', './assets/atlases/font2.png', './assets/atlases/font2.xml');
                this.load.json('achievs', './data/achievements.json');
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
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shownewRecordEffect = false;
                return _this;
            }
            Complete.prototype.create = function () {
                var oldBestScore = score.bestDistance;
                if (score.runDistance > score.bestDistance) {
                    score.bestDistance = score.runDistance;
                    this.shownewRecordEffect = true;
                }

                FBInstant
                    .getLeaderboardAsync('Highscore')
                    .then(leaderboard => {
                        let p = leaderboard.setScoreAsync(score.bestDistance);
                        p.then((entry) => { });
                        return p;
                    })
                    .then(() => console.log('Score saved: ', score.bestDistance))
                    .catch(error => console.error(error));

                var FrameHeroFace = 1;
                if (score.runDistance > oldBestScore / 2) {
                    FrameHeroFace = 2;
                }
                if (score.runDistance > oldBestScore / 2 + oldBestScore / 3) {
                    FrameHeroFace = 3;
                }
                if ((score.runDistance > oldBestScore - oldBestScore / 10) && (score.runDistance < oldBestScore + oldBestScore / 10)) {
                    FrameHeroFace = 4;
                }
                if ((score.runDistance > oldBestScore + oldBestScore / 10)) {
                    FrameHeroFace = 5;
                }
                this.modalComplete = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'preload', 'black');
                this.modalComplete.alpha = 0;
                this.add.existing(this.modalComplete);
                this.modalComplete.setInteractive();
                this.tweens.add({
                    targets: this.modalComplete,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300
                });

                this.panelContainer = this.add.container(Config.GW / 2 + 30, -Config.GH / 2);
                this.panelComplete = new Phaser.GameObjects.Sprite(this, 0, -25, 'game', 'scorepanel');
                this.bestScoreText = this.add.dynamicBitmapText(0, -100, 'font', 'Best score   ' + score.bestDistance, 25);
                this.bestScoreText.tint = 0x9682A7;
                this.bestScoreText.setOrigin(0.5);
                this.youRanText = this.add.dynamicBitmapText(0, -50, 'font', 'you run', 25);
                this.youRanText.setOrigin(0.5);
                this.scorerunText = this.add.dynamicBitmapText(0, -10, 'font2', '' + score.runDistance + ' m', 50);
                this.scorerunText.setOrigin(0.5);
                this.btnMenu = new Client.gButton(this, Config.GW / 2 - 20, -Config.GH / 2 + 150, 'game', 'menu_btn0001', 'menu_btn0002', 'menu_btn0001');
                this.btnMenu.setEventName('MenuBtnGo');
                this.events.on(this.btnMenu.getEventName(), this.clickMenu, this);
                this.add.existing(this.btnMenu);
                this.btnRestart = new Client.gButton(this, Config.GW / 2 + 160, -Config.GH / 2 + 150, 'game', 'replay_btn0001', 'replay_btn0002', 'replay_btn0001');
                this.btnRestart.setEventName('RestartBtnGo');
                this.events.on(this.btnRestart.getEventName(), this.ClickRestart, this);
                this.add.existing(this.btnRestart);
                this.heroFace = new Phaser.GameObjects.Sprite(this, Config.GW / 2 - 200, -Config.GH / 2 + 60, 'game', 'hero_face000' + FrameHeroFace);
                this.add.existing(this.heroFace);
                this.newRecord = new Phaser.GameObjects.Sprite(this, 155, 50, 'game', 'newrecord');
                this.newRecord.alpha = 0;
                this.stamp = new Phaser.GameObjects.Sprite(this, 175, 75, 'game', 'stamp');
                this.stamp.visible = false;
                this.panelContainer.add(this.panelComplete);
                this.panelContainer.add(this.bestScoreText);
                this.panelContainer.add(this.youRanText);
                this.panelContainer.add(this.scorerunText);
                this.panelContainer.add(this.newRecord);
                this.panelContainer.add(this.stamp);
                this.panelContainer.setScale(1);
                this.btnBadgeNew = new Client.gButton(this, 0, 70, 'menu', 'medals_btn0004', 'medals_btn0005', 'medals_btn0006');
                this.btnBadgeNew.setEventName('BadgeBtn');
                this.events.on(this.btnBadgeNew.getEventName(), this.ShowBadge, this);
                this.panelContainer.add(this.btnBadgeNew);
                this.CheckNewButton();
                this.salut = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'menu', 'salut0001');
                this.salut.setScale(2.5);
                this.salut.visible = false;
                this.add.existing(this.salut);
                if (!this.scene.manager.getScene('Complete').anims.get('salut')) {
                    var nameSprite = 'salut';
                    var frameAnim = this.scene.manager.getScene('Complete').anims.generateFrameNames('menu', {
                        start: 1, end: 52, zeroPad: 4,
                        prefix: nameSprite, suffix: ''
                    });
                    this.scene.manager.getScene('Complete').anims.create({ key: 'salut', frames: frameAnim, frameRate: 30, repeat: 0 });
                }
                SndMng.stopAllMusic();
                SndMng.playMusic('sound2');
                this.showDialog();
                this.screen = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'preload', 'black');
                this.screen.alpha = 0;
                this.add.existing(this.screen);
                this.screen.setInteractive();
                this.medalsPanel = new Client.gAchievements(this, Config.GW / 2, Config.GH / 2);
                this.add.existing(this.medalsPanel);
                this.medalsPanel.hidePanel();
                this.btnCloseMedalPanel = new Client.gButton(this, 580, 77 - 500, 'menu', 'close_btn0001', 'close_btn0002', 'close_btn0003');
                this.btnCloseMedalPanel.setEventName('btnCloseCredits');
                this.events.on(this.btnCloseMedalPanel.getEventName(), this.CloseMedals, this);
                this.add.existing(this.btnCloseMedalPanel);

                var fbbuttons = this.add.image(-175, -120, 'fbbuttons').setInteractive();
                fbbuttons.on('pointerdown', function() {
                    var leaderboardContainer = this.add.container(this.screen.width/2, this.screen.height/2);
                    /*for (let i = 0; i < 7; i++) {
                        var _y = (i-7/2) * 40 + 17 + 20;

                        var text1 = this.add.text(80-230, _y, '1');
                        text1.setAlign('center');
                        text1.setOrigin(0.5);
                        leaderboardContainer.add(text1);

                        var text2 = this.add.text(240-40-4-230, _y, 'getName');
                        text2.setAlign('center');
                        text2.setOrigin(0, 0.5);
                        leaderboardContainer.add(text2);

                        var text3 = this.add.text(378-230, _y, '1');
                        text3.setAlign('center');
                        leaderboardContainer.add(text3);
                    }*/
                    var fetchData = (function() {
                        this.fetchedHighscore = score.bestDistance;

                        FBInstant
                            .getLeaderboardAsync('Highscore')
                            .then(leaderboard => leaderboard.getEntriesAsync(7, 0))
                            .then(entries => {
                                leaderboardContainer.removeAll(true);
                                var leaderboardBG = this.add.image(0, 0, 'leaderboardBG').setInteractive();
                                leaderboardBG.setOrigin(0.5, 0.5);
                                leaderboardContainer.add(leaderboardBG);

                                var buttonClose = new Client.gButton(this, -leaderboardBG.width / 2 + 25, -leaderboardBG.height / 2 + 25, 'menu', 'close_btn0001', 'close_btn0002', 'close_btn0003');
                                buttonClose.on('pointerdown', function() {
                                    if (leaderboardContainer) {
                                        leaderboardContainer.destroy();
                                        leaderboardContainer = null;
                                    }
                                }, this);
                                leaderboardContainer.add(buttonClose);

                                var yhlb = this.add.text(-50, -135, 'Your Highscore :');
                                yhlb.setAlign('center');
                                yhlb.setOrigin(0.5);
                                leaderboardContainer.add(yhlb);

                                this.highscoreValueTF = this.add.text(95, -135, '' + this.fetchedHighscore);
                                this.highscoreValueTF.setAlign('center');
                                this.highscoreValueTF.setOrigin(0, 0.5);
                                leaderboardContainer.add(this.highscoreValueTF);

                                var dy = 40;
                                var num = entries.length;
                                var nm = Math.floor(num / 2);
                                if (num % 2 == 0)
                                    nm -= 0.5;
                                var __dx = 40;
                                var loadedPhotosNum = 0;

                                this.load.off('progress');
                                this.load.off('complete');

                                this.load.on('complete', (function () {
                                    for (let i = 0; i < num; i++) {
                                        let _y = (i - nm / 2) * dy + 17 + 20;
                                        let ph = this.add.image(((80 - 230) + (240 - 40 - 4 - 230)) / 2, _y, '__' + i);
                                        ph.setOrigin(0.5, 0.5);
                                        ph.setScale(dy / ph.width * 0.75, dy / ph.height * 0.75);
                                        leaderboardContainer.add(ph);
                                    }
                                    this.load.off('complete');
                                }).bind(this));

                                for (let i = 0; i < num; i++) {
                                    let _y = (i - nm / 2) * dy + 17 + 20;

                                    let pldr = this.load.image('__' + i, entries[i].getPlayer().getPhoto());
                                    pldr.start();

                                    var text1 = this.add.text(80-230, _y, '' + entries[i].getRank());
                                    text1.setAlign('center');
                                    text1.setOrigin(0.5);
                                    leaderboardContainer.add(text1);

                                    var text2 = this.add.text(240-40-4-230, _y, entries[i].getPlayer().getName());
                                    text2.setAlign('center');
                                    text2.setOrigin(0, 0.5);
                                    leaderboardContainer.add(text2);

                                    var text3 = this.add.text(378-230, _y, '' + entries[i].getScore());
                                    text3.setAlign('center');
                                    leaderboardContainer.add(text3);
                                }
                            }).catch((error) => {
                            createTimer(250, () => { if (this && this.parent) fetchData(); }, this);
                        });
                    }).bind(this);
                    fetchData();
                }, this);
                this.panelContainer.add(fbbuttons);

                AchEngine.saveData();
            };
            Complete.prototype.CloseMedals = function () {
                this.screen.alpha = 0;
                this.btnCloseMedalPanel.y = 30 - 500;
                this.medalsPanel.hidePanel();
                this.medalsPanel.showAllMedal();
                this.CheckNewButton();
            };
            Complete.prototype.ShowBadge = function () {
                AchEngine.iAmShowAllAchievement();
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.btnCloseMedalPanel,
                    y: 32,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                    delay: 50,
                });
                this.medalsPanel.ShowPanel();
            };
            Complete.prototype.CheckNewButton = function () {
                if (AchEngine.ButtonNewMedal()) {
                    this.btnBadgeNew.ChangeSkin('menu', 'medals_btn0001', 'medals_btn0002', 'medals_btn0003');
                }
                else {
                    this.btnBadgeNew.ChangeSkin('menu', 'medals_btn0004', 'medals_btn0005', 'medals_btn0006');
                }
            };
            Complete.prototype.showDialog = function () {
                this.tweens.add({
                    targets: this.panelContainer,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 500
                });
                this.tweens.add({
                    targets: this.heroFace,
                    y: Config.GH / 2 + 60,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700
                });
                this.tweens.add({
                    targets: this.btnMenu,
                    y: Config.GH / 2 + 150,
                    ease: 'Elastic',
                    easeParams: [5, 1],
                    duration: 750
                });
                this.tweens.add({
                    targets: this.btnRestart,
                    y: Config.GH / 2 + 150,
                    ease: 'Elastic',
                    easeParams: [2, 1],
                    duration: 850
                });
            };
            Complete.prototype.showNewRecord = function () {
                SndMng.sfxPlay('sound39');
                this.stamp.visible = true;
                var tTween = this.tweens.add({
                    targets: this.stamp,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.newRecord,
                    alpha: 1,
                    ease: 'Power1',
                    delay: 300,
                    duration: 1
                });
                var tTween = this.tweens.add({
                    targets: this.panelContainer,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    ease: 'Power1',
                    delay: 300,
                    duration: 1,
                });
                var tTween = this.tweens.add({
                    targets: this.stamp,
                    scaleX: 0.7,
                    scaleY: 0.7,
                    alpha: 0,
                    ease: 'Power1',
                    delay: 300,
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.panelContainer,
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Power1',
                    delay: 310,
                    duration: 100,
                });
            };
            Complete.prototype.ClickRestart = function () {
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 300,
                    onComplete: function showMenu(a) { a.parent.scene.scene.stop(Scenes.GAME); a.parent.scene.scene.start(Scenes.GAME); },
                });

                createTimer(500, tryToShowAd);
            };
            Complete.prototype.clickMenu = function () {
                this.scene.stop(Scenes.GAME);
                this.scene.stop(Scenes.HUDPANEL);
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 300,
                    onComplete: function showMenu(a) { a.parent.scene.scene.stop(Scenes.GAME); a.parent.scene.scene.start(Scenes.MAINMENU); },
                });

                createTimer(500, tryToShowAd);
            };
            Complete.prototype.update = function () {
                this.medalsPanel.update();
                if (this.shownewRecordEffect) {
                    this.shownewRecordEffect = false;
                    this.showNewRecord();
                }
                if (this.stamp.visible) {
                    if (this.stamp.alpha == 0) {
                        SndMng.sfxPlay('sound19');
                        this.stamp.visible = false;
                        this.salut.visible = true;
                        this.salut.play('salut');
                    }
                }
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
                _this.cloudBigArray = [];
                _this.distTocloudBig = 0;
                _this.cloudSmallArray = [];
                _this.distTocloudSmall = 0;
                _this.frontArray = [];
                _this.distToFront = 0;
                _this.objArray = [];
                _this.platformArray = [];
                _this.distToBack = 0;
                _this.distToObject = 0;
                return _this;
            }
            Game.prototype.myDestroy = function () {
                if (this.scene.get(Scenes.HUDPANEL)) {
                    this.scene.remove(Scenes.HUDPANEL);
                }
                if (this.scene.get(Scenes.COMPLETE)) {
                    this.scene.remove(Scenes.COMPLETE);
                }
                this.groundArray = [];
                this.objArray = [];
                this.cloudBigArray = [];
                this.distTocloudBig = 0;
                this.cloudSmallArray = [];
                this.distTocloudSmall = 0;
                this.frontArray = [];
                this.distToFront = 0;
                this.platformArray = [];
                this.distToBack = 0;
                this.distToObject = 0;
                this.scene.scene.events.off('GameOver', this.showGameOver, this, false);
            };
            Game.prototype.showGameOver = function () {
                this.scene.add(Scenes.COMPLETE, Client.Complete, true);
                this.scene.pause();
            };
            Game.prototype.create = function () {
                this.myDestroy();
                this.spaceButton = this.input.keyboard.createCursorKeys();
                this.scene.scene.events.on('GameOver', this.showGameOver, this);
                Config.useLevel = 1;
                score.stanina = score.StartStanina;
                score.runDistance = 0;
                this.staticGroup = new Phaser.Physics.Arcade.StaticGroup(this.scene.scene.physics.world, this);
                this.objectGroup = new Phaser.Physics.Arcade.Group(this.scene.scene.physics.world, this, { allowGravity: false });
                this.physics.world.setBounds(0, -Config.GH * 3, 10000000, Config.GH * 6);
                this.bg2Sky = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'background2', 'bg2').setOrigin(0.5);
                this.bg2Sky.setScrollFactor(0);
                this.bg2Sky.setScale(1.4);
                this.add.existing(this.bg2Sky);
                this.bg1Sky = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'background2', 'bg1').setOrigin(0.5);
                this.bg1Sky.setScrollFactor(0);
                this.bg1Sky.setScale(1.4);
                this.add.existing(this.bg1Sky);
                this.createbigCloud();
                this.back1 = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'background', 'back1').setOrigin(0.1, 0.4);
                this.back1.setScrollFactor(0.2, 0.5);
                this.back1.setScale(2);
                this.add.existing(this.back1);
                this.back2 = new Phaser.GameObjects.Sprite(this, this.back1.x + 3685, Config.GH / 2, 'background', 'back2').setOrigin(0.1, 0.4);
                this.back2.setScrollFactor(0.2, 0.5);
                this.back2.setScale(2);
                this.add.existing(this.back2);
                this.createSmallCloud();
                this.createFront();
                this.distanceTable = new Client.oDistance(this, 250, 270);
                this.add.existing(this.distanceTable);
                this.distanceTable.create();
                this.distanceTable.setPos(5000, 270, '500');
                this.distanceToTableSound = this.distanceTable.x - 500;
                this.player = new Client.oPlayer(this, 145, +270).setOrigin(0.5);
                this.add.existing(this.player);
                this.player.create();
                if (score.bestDistance > 0) {
                    var bestDistance = new Client.oBestDistance(this, score.bestDistance * 10, 270);
                    bestDistance.create();
                    this.add.existing(bestDistance);
                }
                this.cameras.main.startFollow(this.player);
                this.cameras.main.setFollowOffset(-180, -40);
                this.cameras.main.deadzone = new Phaser.Geom.Rectangle(0, 200, 0, 120);
                this.cameras.main.midPoint.set(0, 800);
                this.physics.add.collider(this.player, this.staticGroup, this.colliderStatic, null, this);
                this.physics.add.overlap(this.player, this.objectGroup, this.collider, null, this);
                this.createGround();
                this.lvlJSON = this.cache.json.get('level');
                var numMovie = 10;
                for (var i = 0; i < this.lvlJSON['body'][numMovie]['items'].length; i++) {
                    this.CreateLocationFromJson(this.lvlJSON['body'][numMovie]['items'][i].name, this.lvlJSON['body'][numMovie]['items'][i]['pos'].x, -this.lvlJSON['body'][numMovie]['items'][i]['pos'].y, this.lvlJSON['body'][numMovie]['items'][i].angle);
                }
                {
                    this.input.on('pointerdown', this.jump, this);
                }
                this.HelpinGame = new Phaser.GameObjects.Sprite(this, this.player.x + 20, this.player.y - 100, 'game', 'help_in_game').setOrigin(0.5);
                this.HelpinGame.setDepth(100);
                this.add.existing(this.HelpinGame);
                this.tweenHelp = this.tweens.add({
                    targets: this.HelpinGame,
                    y: this.HelpinGame.y + 15,
                    duration: 300,
                    yoyo: true,
                    loop: -1
                });
                SndMng.stopAllMusic();
                SndMng.playMusic('sound1');
                this.scene.add(Scenes.HUDPANEL, Client.Panel, true);
                this.screen = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'preload', 'black');
                this.screen.alpha = 1;
                this.screen.setDepth(1000);
                this.add.existing(this.screen);
                this.screen.setInteractive();
                this.screen.setScrollFactor(0);
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 300,
                });
            };
            Game.prototype.createGround = function () {
                var posit = 0;
                for (var i = 0; i < 4; i++) {
                    this.groundArray[i] = new Phaser.Physics.Arcade.Sprite(this, posit, 485, 'background', 'bg1_ground');
                    this.add.existing(this.groundArray[i]);
                    this.staticGroup.add(this.groundArray[i]);
                    posit += this.groundArray[i].width;
                    if (posit > this.distToBack) {
                        this.distToBack = posit;
                    }
                }
                var spt = new Phaser.Physics.Arcade.Sprite(this, 0, 485, 'background', 'bg21_ground');
                spt.visible = false;
                this.add.existing(spt);
                this.groundArray.push(spt);
            };
            Game.prototype.createbigCloud = function () {
                var posit = 0;
                for (var i = 0; i < 4; i++) {
                    this.cloudBigArray[i] = new Phaser.GameObjects.Sprite(this, posit, 300, 'background', 'bigcloud');
                    this.add.existing(this.cloudBigArray[i]);
                    this.cloudBigArray[i].setScrollFactor(0.1, 0.3);
                    posit += this.cloudBigArray[i].width;
                    if (posit > this.distTocloudBig) {
                        this.distTocloudBig = posit;
                    }
                }
            };
            Game.prototype.checkCloudBig = function () {
                for (var i = 0; i < this.cloudBigArray.length - 1; i++) {
                    if (this.cloudBigArray[i].x + 700 < uMath.fromPercent(10, this.player.x)) {
                        this.cloudBigArray[i].x = this.distTocloudBig;
                        this.distTocloudBig += this.cloudBigArray[i].width;
                    }
                }
            };
            Game.prototype.createSmallCloud = function () {
                var posit = 0;
                for (var i = 0; i < 4; i++) {
                    this.cloudSmallArray[i] = new Phaser.GameObjects.Sprite(this, posit, 200 - uMath.random(50, 100), 'background', 'smallcloud');
                    this.add.existing(this.cloudSmallArray[i]);
                    this.cloudSmallArray[i].setScrollFactor(0.3, 0.6);
                    posit += this.cloudSmallArray[i].width + uMath.random(100, 500);
                    ;
                    if (posit > this.distTocloudSmall) {
                        this.distTocloudSmall = posit;
                    }
                }
            };
            Game.prototype.createFront = function () {
                var posit = 0;
                for (var i = 0; i < 4; i++) {
                    this.frontArray[i] = new Phaser.GameObjects.Sprite(this, posit, 250, 'background2', 'bg_front' + uMath.random(1, 4));
                    this.add.existing(this.frontArray[i]);
                    this.frontArray[i].setScrollFactor(0.5, 1);
                    posit += this.frontArray[i].width;
                    if (posit > this.distToFront) {
                        this.distToFront = posit;
                    }
                }
            };
            Game.prototype.checkCloudSmall = function () {
                for (var i = 0; i < this.cloudSmallArray.length - 1; i++) {
                    if (this.cloudSmallArray[i].x + 700 < uMath.fromPercent(30, this.player.x)) {
                        this.cloudSmallArray[i].x = this.distTocloudSmall;
                        this.distTocloudSmall += this.cloudSmallArray[i].width;
                    }
                }
            };
            Game.prototype.checkFront = function () {
                for (var i = 0; i < this.frontArray.length - 1; i++) {
                    if (this.frontArray[i].x + 1040 < uMath.fromPercent(50, this.player.x)) {
                        this.frontArray[i].x = this.distToFront;
                        this.distToFront += this.frontArray[i].width;
                        if (Config.useLevel == 1) {
                            this.frontArray[i].setFrame('bg_front' + uMath.random(1, 4));
                        }
                        else {
                            this.frontArray[i].setFrame('bg_front' + uMath.random(5, 8));
                        }
                    }
                }
            };
            Game.prototype.checkGround = function () {
                for (var i = 0; i < 4; i++) {
                    if (this.groundArray[i].x < this.player.x - 600) {
                        this.groundArray[i].x = this.distToBack;
                        this.groundArray[i].refreshBody();
                        this.staticGroup.add(this.groundArray[i]);
                        this.distToBack += this.groundArray[i].width;
                        var tframe = 'bg' + Config.useLevel + '_ground';
                        if (this.groundArray[i].frame.name != tframe) {
                            this.groundArray[i].setFrame(tframe);
                        }
                        if (this.groundArray[this.groundArray.length - 1].x + 16000 < this.player.x) {
                            if (Config.useLevel == 1) {
                                Config.useLevel = 2;
                                var tTween = this.tweens.add({
                                    targets: this.bg1Sky,
                                    alpha: 0,
                                    ease: 'Power1',
                                    duration: 2500,
                                });
                            }
                            else {
                                Config.useLevel = 1;
                                var tTween = this.tweens.add({
                                    targets: this.bg1Sky,
                                    alpha: 1,
                                    ease: 'Power1',
                                    duration: 2500,
                                });
                            }
                            this.groundArray[this.groundArray.length - 1].x = this.groundArray[i].x;
                            this.groundArray[this.groundArray.length - 1].visible = true;
                            if (Config.useLevel == 2) {
                                this.groundArray[this.groundArray.length - 1].setFlipX(true);
                            }
                            else {
                                this.groundArray[this.groundArray.length - 1].setFlipX(false);
                            }
                        }
                    }
                }
            };
            Game.prototype.CreateLocationFromJson = function (name, oX, oY, angle) {
                angle = -uMath.toDegrees(angle);
                var ff;
                if (name == 'CandyYellow') {
                    ff = new Client.oCandyYellow(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = 0;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyGreen') {
                    ff = new Client.oCandyGreen(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = 0;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyBlue') {
                    ff = new Client.oCandyBlue(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyPink') {
                    ff = new Client.oCandyPink(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'Spike') {
                    ff = new Client.oSpike(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyStarYellow') {
                    ff = new Client.oCandyStarYellow(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyStarBlue') {
                    ff = new Client.oCandyStarBlue(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyStarGreen') {
                    ff = new Client.oCandyStarGreen(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'CandyStarPink') {
                    ff = new Client.oCandyStarPink(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.z = -1;
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'Bg1Platform1') {
                    ff = new Client.oPlatform5(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform2') {
                    ff = new Client.oPlatform2(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform3') {
                    ff = new Client.oPlatform3(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform4') {
                    ff = new Client.oPlatform4(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform5') {
                    ff = new Client.oPlatform5(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform6') {
                    ff = new Client.oPlatform6(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform7') {
                    ff = new Client.oPlatform7(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Bg1Platform8') {
                    ff = new Client.oPlatform8(this, oX + 165, oY + 355);
                    ff.angle = angle;
                    this.add.existing(ff);
                    ff.setOrigin(0, 0);
                    this.staticGroup.add(ff);
                    this.platformArray.push(ff);
                }
                if (name == 'Trampline') {
                    ff = new Client.oTrampoline(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'Bird') {
                    ff = new Client.oBird(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'BlindMouse') {
                    ff = new Client.oMouse(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'HelpDoubleJump') {
                    ff = new Client.oHelpDoubleJump(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'BonusDino') {
                    ff = new Client.oBonus_dino(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'BonusMagneto') {
                    ff = new Client.ooBonusMagneto(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (name == 'Bg1Sand') {
                    ff = new Client.oSand(this, oX + 165, oY + 355);
                    this.add.existing(ff);
                    ff.create();
                    ff.angle = angle;
                    this.objectGroup.add(ff);
                    this.objArray.push(ff);
                }
                if (oX > this.distToObject) {
                    this.distToObject = oX;
                }
            };
            Game.prototype.addLocation = function () {
                var arrFrom = Config.distance20;
                var posit = this.player.x / 10;
                if (posit > 7500) {
                    arrFrom = Config.distance7500;
                }
                else {
                    if (posit > 5300) {
                        arrFrom = Config.distance5300;
                    }
                    else {
                        if (posit > 5200) {
                            arrFrom = Config.distance5200;
                        }
                        else {
                            if (posit > 3700) {
                                arrFrom = Config.distance3700;
                            }
                            else {
                                if (posit > 3500) {
                                    arrFrom = Config.distance3500;
                                }
                                else {
                                    if (posit > 2300) {
                                        arrFrom = Config.distance2300;
                                    }
                                    else {
                                        if (posit > 2100) {
                                            arrFrom = Config.distance2100;
                                        }
                                        else {
                                            if (posit > 2000) {
                                                arrFrom = Config.distance2000;
                                            }
                                            else {
                                                if (posit > 1050) {
                                                    arrFrom = Config.distance1050;
                                                }
                                                else {
                                                    if (posit > 900) {
                                                        arrFrom = Config.distance900;
                                                    }
                                                    else {
                                                        if (posit > 800) {
                                                            arrFrom = Config.distance800;
                                                        }
                                                        else {
                                                            if (posit > 250) {
                                                                arrFrom = Config.distance250;
                                                            }
                                                            else {
                                                                if (posit > 190) {
                                                                    arrFrom = Config.distance190;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var needLvl = 'Level_' + arrFrom[uMath.random(0, arrFrom.length)];
                var buildIndex = 10;
                for (var i = 0; i < this.lvlJSON['body'].length; i++) {
                    if (this.lvlJSON['body'][i].name == needLvl) {
                        buildIndex = i;
                    }
                }
                for (var i = 0; i < this.lvlJSON['body'][buildIndex]['items'].length; i++) {
                    this.CreateLocationFromJson(this.lvlJSON['body'][buildIndex]['items'][i].name, this.lvlJSON['body'][buildIndex]['items'][i]['pos'].x + this.player.x + 350, -this.lvlJSON['body'][buildIndex]['items'][i]['pos'].y, this.lvlJSON['body'][buildIndex]['items'][i].angle);
                }
            };
            Game.prototype.checkDistanceTable = function () {
                if (this.distanceTable.x + 1000 < this.player.x) {
                    this.distanceTable.setPos(this.distanceTable.x + 5000, 270, '' + Math.round((this.distanceTable.x + 5000) / 10));
                    this.distanceToTableSound = this.distanceTable.x - 500;
                }
                if (this.distanceToTableSound < this.player.x) {
                    SndMng.sfxPlay('sound51');
                    this.distanceToTableSound = this.distanceToTableSound + 10000;
                }
            };
            Game.prototype.jump = function () {
                if (this.HelpinGame) {
                    this.HelpinGame.destroy();
                    this.HelpinGame = null;
                    this.tweenHelp.stop();
                }
                this.player.Jump();
            };
            Game.prototype.colliderStatic = function (player, object) {
                player.setJump();
                if (player.body.touching.right) {
                    player.body.position.y -= 20;
                }
            };
            Game.prototype.collider = function (player, object) {
                if (object.myType == 'Candy') {
                    object.pick(this.objectGroup);
                    player.pick();
                }
                if (object.myType == 'Sand') {
                    score.stanina -= 3;
                }
                if (object.myType == 'Dino') {
                    score.congratUse = 'mr \n stuffer';
                    score.showPrize = true;
                    score.CollectCoin = 5;
                    object.pick();
                    player.ActivatedDino();
                    SndMng.sfxPlay('sound31');
                }
                if (object.myType == 'Magneto') {
                    score.congratUse = 'magnetic';
                    score.showPrize = true;
                    score.CollectCoin = 5;
                    object.pick();
                    player.ActivatedMagnet();
                    SndMng.sfxPlay('sound29');
                    SndMng.sfxPlay('sound30');
                }
                if (object.myType == 'Spike') {
                    if (!player.ActiveDino) {
                        object.pick(this.objectGroup);
                        player.addDamage();
                    }
                    else {
                        if (score.stanina + 50 < score.Maxstanina) {
                            score.stanina += 50;
                        }
                        else {
                            score.stanina = score.Maxstanina + 50;
                        }
                        object.pick(this.objectGroup, true);
                        player.pick();
                    }
                }
                if (object.myType == 'Trampoline') {
                    player.trampline();
                    object.pick(this.objectGroup);
                }
            };
            Game.prototype.update = function (time, delta) {
                if (this.input.keyboard.checkDown(this.spaceButton.space, 400)) {
                    this.jump();
                }
                if (!this.HelpinGame) {
                    if (this.player.ActiveMagnet) {
                        for (var i = 0; i < this.objArray.length; i++) {
                            if (uMath.distance(this.player.x, this.player.y, this.objArray[i].x, this.objArray[i].y) < 300) {
                                if ((this.objArray[i].myType == 'Candy') || (this.objArray[i].myType == 'Star')) {
                                    this.objArray[i].Magneted = true;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < this.objArray.length; i++) {
                        if (this.objArray[i].Magneted) {
                            if ((this.objArray[i].myType == 'Candy') || (this.objArray[i].myType == 'Star')) {
                                this.objArray[i].x -= (Math.cos(uMath.getAngle(this.player.x, this.player.y, this.objArray[i].x, this.objArray[i].y)) * 1) * delta;
                                this.objArray[i].y -= (Math.sin(uMath.getAngle(this.player.x, this.player.y, this.objArray[i].x, this.objArray[i].y)) * 1) * delta;
                            }
                        }
                    }
                    score.runDistance = Math.round((this.player.x / 10) - 14);
                    if (AchEngine.distanceMax < score.runDistance) {
                        AchEngine.distanceMax = score.runDistance;
                    }
                    if (uMath.fromPercent(20, this.player.x) > this.back1.x + 3685) {
                        this.back1.x = this.back2.x + 3625;
                    }
                    if (uMath.fromPercent(20, this.player.x) > this.back2.x + 3685) {
                        this.back2.x = this.back1.x + 3685;
                    }
                    for (var i = 0; i < this.objArray.length; i++) {
                        if (this.objArray[i].x < this.player.x - 500) {
                            if (!this.objArray[i].Magneted) {
                                this.objArray[i].body.destroy();
                                this.objectGroup.remove(this.objArray[i], true);
                                this.objArray.splice(i, 1);
                            }
                        }
                    }
                    for (var i = 0; i < this.platformArray.length; i++) {
                        if (this.platformArray[i].x < this.player.x - 1000) {
                            this.platformArray[i].body.destroy();
                            this.staticGroup.remove(this.platformArray[i], true);
                            this.platformArray.splice(i, 1);
                        }
                    }
                    if (score.stanina >= score.Maxstanina / 3) {
                        score.stanina -= 0.035 * delta;
                    }
                    else {
                        score.stanina -= 0.025 * delta;
                    }
                    if (score.stanina > score.Maxstanina) {
                        this.cameras.main.zoomTo(0.75);
                    }
                    else {
                        this.cameras.main.zoomTo(1);
                    }
                    this.player.update(time, delta);
                    this.checkGround();
                    this.checkCloudBig();
                    this.checkCloudSmall();
                    this.checkFront();
                    this.checkDistanceTable();
                    if (this.player.x + 300 > this.distToObject) {
                        this.addLocation();
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
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                this.events.off('PlayBtn', this.playGame, this, false);
                this.events.off('CreditBtn', this.ShowCredit, this, false);
                this.events.off('BadgeBtn', this.ShowBadge, this, false);
                this.events.off('SoundBtn', this.ClickSound, this, false);
                this.events.off('MusicBtn', this.ClickMusic, this, false);
                this.events.off('btnCloseCredits', this.CloseCredits, this, false);
                var wH = Config.GH;
                var wW = Config.GW;
                this.background = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'menu', 'bg');
                this.add.existing(this.background);
                var obj = new Phaser.GameObjects.Sprite(this, 526, 30, 'menu', 'bird1').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y + 5,
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 414, 57, 'menu', 'bird2').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y + 10,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 500, 115, 'menu', 'bird3').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y - 6,
                    duration: 1100,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 216, 75, 'menu', 'bird4').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y - 4,
                    duration: 1300,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, -2, 72, 'menu', 'man').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    x: obj.x - 4,
                    duration: 1300,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 148, 256, 'menu', 'star1').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y - 4,
                    duration: 1500,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 190, 260, 'menu', 'star2').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y + 3,
                    duration: 1300,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 239, 235, 'menu', 'star3').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y + 4,
                    duration: 1600,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 298, 198, 'menu', 'star4').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y - 4,
                    duration: 1800,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 367, 167, 'menu', 'star5').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y + 4,
                    duration: 2000,
                    yoyo: true,
                    repeat: -1,
                });
                var obj = new Phaser.GameObjects.Sprite(this, 276, 247, 'menu', 'bird5').setOrigin(0);
                this.add.existing(obj);
                var objTween = this.tweens.add({
                    targets: obj,
                    y: obj.y - 5,
                    duration: 1600,
                    yoyo: true,
                    repeat: -1,
                });
                this.logo = new Phaser.GameObjects.Sprite(this, 210, -190, 'menu', 'menu_logo').setOrigin(0.5);
                this.add.existing(this.logo);
                var logoTween = this.tweens.add({
                    targets: this.logo,
                    y: 90,
                    ease: 'Elastic',
                    easeParams: [1, 0.5],
                    duration: 500,
                    delay: 300,
                });
                var timeline = this.scene.scene.tweens.createTimeline(null);
                timeline.add({
                    targets: this.logo,
                    angle: 5,
                    duration: 1,
                });
                timeline.add({
                    targets: this.logo,
                    angle: 0,
                    duration: 400,
                    ease: 'Elastic',
                    easeParams: [1.5, 0.3],
                });
                timeline.loopDelay = 6000;
                timeline.loop = -1;
                timeline.play();
                var btnCredit = new Client.gButton(this, 105, 383, 'menu', 'credits_btn0001', 'credits_btn0002', 'credits_btn0003');
                btnCredit.setEventName('CreditBtn');
                this.events.on(btnCredit.getEventName(), this.ShowCredit, this);
                this.add.existing(btnCredit);
                var btnPlay = new Client.gButton(this, 536, 362, 'menu', 'play_btn0001', 'play_btn0002', 'play_btn0003');
                btnPlay.setEventName('PlayBtn');
                this.events.on(btnPlay.getEventName(), this.playGame, this);
                this.add.existing(btnPlay);
                this.btnBadgeNew = new Client.gButton(this, 548, 273, 'menu', 'medals_btn0004', 'medals_btn0005', 'medals_btn0006');
                this.btnBadgeNew.setEventName('BadgeBtn');
                this.events.on(this.btnBadgeNew.getEventName(), this.ShowBadge, this);
                this.add.existing(this.btnBadgeNew);
                this.CheckNewButton();
                this.btnSound = new Client.gButton(this, 606, 35, 'menu', 'options_sound_btn0001', 'options_sound_btn0002', 'options_sound_btn0001');
                this.btnSound.setEventName('SoundBtn');
                this.events.on(this.btnSound.getEventName(), this.ClickSound, this);
                this.add.existing(this.btnSound);
                this.btnMusic = new Client.gButton(this, 556, 35, 'menu', 'options_misic_btn0001', 'options_misic_btn0002', 'options_misic_btn0001');
                this.btnMusic.setEventName('MusicBtn');
                this.events.on(this.btnMusic.getEventName(), this.ClickMusic, this);
                this.add.existing(this.btnMusic);
                this.bestScoreText = this.add.dynamicBitmapText(wW / 2, 358, 'font', 'Best score', 22);
                this.bestScoreText.setOrigin(0.5);
                this.add.existing(this.bestScoreText);
                this.bestScoreText2 = this.add.dynamicBitmapText(wW / 2, 383, 'font2', '' + score.bestDistance, 40);
                this.bestScoreText2.setOrigin(0.5);
                this.add.existing(this.bestScoreText2);
                this.screen = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'preload', 'black');
                this.screen.alpha = 1;
                this.add.existing(this.screen);
                this.screen.setInteractive();
                this.creditsPanel = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2 - 500, 'menu', 'credits_panel').setOrigin(0.5);
                this.add.existing(this.creditsPanel);
                this.btnCloseCredits = new Client.gButton(this, 544, 77 - 500, 'menu', 'close_btn0001', 'close_btn0002', 'close_btn0003');
                this.btnCloseCredits.setEventName('btnCloseCredits');
                this.events.on(this.btnCloseCredits.getEventName(), this.CloseCredits, this);
                this.add.existing(this.btnCloseCredits);
                this.medalsPanel = new Client.gAchievements(this, wW / 2, wH / 2);
                this.add.existing(this.medalsPanel);
                this.medalsPanel.hidePanel();
                this.btnCloseMedalPanel = new Client.gButton(this, 580, 77 - 500, 'menu', 'close_btn0001', 'close_btn0002', 'close_btn0003');
                this.btnCloseMedalPanel.setEventName('btnCloseCredits');
                this.events.on(this.btnCloseMedalPanel.getEventName(), this.CloseMedals, this);
                this.add.existing(this.btnCloseMedalPanel);
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 300,
                });
                this.cameras.main.zoomTo(1);
                SndMng.stopAllMusic();
                SndMng.playMusic('sound3');
                if (!SndMng.getSoundEnable()) {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0003', 'options_sound_btn0004', 'options_sound_btn0003');
                }
                else {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0001', 'options_sound_btn0002', 'options_sound_btn0001');
                }
                if (!SndMng.getMusicEnable()) {
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0003', 'options_misic_btn0004', 'options_misic_btn0003');
                }
                else {
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0001', 'options_misic_btn0002', 'options_misic_btn0001');
                }
            };
            MainMenu.prototype.CloseMedals = function () {
                this.screen.alpha = 0;
                this.btnCloseMedalPanel.y = 30 - 500;
                this.medalsPanel.hidePanel();
                this.medalsPanel.showAllMedal();
                this.CheckNewButton();
            };
            MainMenu.prototype.CloseCredits = function () {
                this.screen.alpha = 0;
                this.btnCloseCredits.y = 72 - 500;
                this.creditsPanel.y = Config.GH / 2 - 500;
            };
            MainMenu.prototype.ShowBadge = function () {
                AchEngine.iAmShowAllAchievement();
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.btnCloseMedalPanel,
                    y: 32,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                    delay: 50,
                });
                this.medalsPanel.ShowPanel();
            };
            MainMenu.prototype.CheckNewButton = function () {
                if (AchEngine.ButtonNewMedal()) {
                    this.btnBadgeNew.ChangeSkin('menu', 'medals_btn0001', 'medals_btn0002', 'medals_btn0003');
                }
                else {
                    this.btnBadgeNew.ChangeSkin('menu', 'medals_btn0004', 'medals_btn0005', 'medals_btn0006');
                }
            };
            MainMenu.prototype.ClickSound = function () {
                if (SndMng.getSoundEnable()) {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0003', 'options_sound_btn0004', 'options_sound_btn0003');
                    SndMng.setSoundEnable(false);
                }
                else {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0001', 'options_sound_btn0002', 'options_sound_btn0001');
                    SndMng.setSoundEnable(true);
                }
            };
            MainMenu.prototype.ClickMusic = function () {
                if (SndMng.getMusicEnable()) {
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0003', 'options_misic_btn0004', 'options_misic_btn0003');
                    SndMng.setMusicEnable(false);
                    SndMng.stopAllMusic();
                }
                else {
                    SndMng.setMusicEnable(true);
                    SndMng.playMusic('sound3');
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0001', 'options_misic_btn0002', 'options_misic_btn0001');
                }
            };
            MainMenu.prototype.playGame = function () {
                this.scene.start(Scenes.GAME);
            };
            MainMenu.prototype.ShowCredit = function () {
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.creditsPanel,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                });
                var tTween = this.tweens.add({
                    targets: this.btnCloseCredits,
                    y: 72,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 700,
                    delay: 50,
                });
            };
            MainMenu.prototype.closeGame = function () {
            };
            MainMenu.prototype.update = function () {
                this.medalsPanel.update();
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
        var Panel = (function (_super) {
            __extends(Panel, _super);
            function Panel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Panel.prototype.create = function () {
                score.showed = false;
                this.panelMetr = this.add.dynamicBitmapText(10, 10, 'font2', '0 m', 31);
                this.add.existing(this.panelMetr);
                this.congrat = this.add.dynamicBitmapText(300, 200, 'font', '', 31);
                this.congrat.setOrigin(0.5);
                this.congrat.setCenterAlign();
                this.congrat.alpha = 0;
                this.congrat.tint = 0xF5ECCF;
                this.add.existing(this.congrat);
                this.progress = new Phaser.GameObjects.Sprite(this, Config.GW / 2, 390, 'game', 'progress0001');
                this.add.existing(this.progress);
                this.btnMusic = new Client.gButton(this, 506, 35, 'menu', 'options_misic_btn0001', 'options_misic_btn0002', 'options_misic_btn0001');
                this.btnMusic.setEventName('MusicBtn');
                this.events.on(this.btnMusic.getEventName(), this.ClickMusic, this);
                this.add.existing(this.btnMusic);
                this.btnSound = new Client.gButton(this, 556, 35, 'menu', 'options_sound_btn0001', 'options_sound_btn0002', 'options_sound_btn0001');
                this.btnSound.setEventName('SoundBtn');
                this.events.on(this.btnSound.getEventName(), this.ClickSound, this);
                this.add.existing(this.btnSound);
                this.btnPause = new Client.gButton(this, 606, 35, 'game', 'pause_btn0001', 'pause_btn0002', 'pause_btn0001');
                this.btnPause.setEventName('PauseBtn');
                this.events.on(this.btnPause.getEventName(), this.ClickPause, this);
                this.add.existing(this.btnPause);
                this.modalPause = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'preload', 'black');
                this.modalPause.alpha = 0;
                this.add.existing(this.modalPause);
                this.modalPause.setInteractive();
                this.btnResume = new Client.gButton(this, Config.GW / 2, -105, 'game', 'resume_btn0001', 'resume_btn0002', 'resume_btn0001');
                this.btnResume.setEventName('ResumeBtn');
                this.events.on(this.btnResume.getEventName(), this.ClickResume, this);
                this.add.existing(this.btnResume);
                this.btnRestart = new Client.gButton(this, Config.GW / 2, -175, 'game', 'replay_btn0001', 'replay_btn0002', 'replay_btn0001');
                this.btnRestart.setEventName('RestartBtn');
                this.events.on(this.btnRestart.getEventName(), this.ClickRestart, this);
                this.add.existing(this.btnRestart);
                this.btnHelp = new Client.gButton(this, Config.GW / 2, -240, 'game', 'help_btn0001', 'help_btn0002', 'help_btn0001');
                this.btnHelp.setEventName('HelpBtn');
                this.events.on(this.btnHelp.getEventName(), this.clickHelp, this);
                this.add.existing(this.btnHelp);
                this.btnMenu = new Client.gButton(this, Config.GW / 2, -305, 'game', 'menu_btn0001', 'menu_btn0002', 'menu_btn0001');
                this.btnMenu.setEventName('MenuBtn');
                this.events.on(this.btnMenu.getEventName(), this.clickMenu, this);
                this.add.existing(this.btnMenu);
                this.modalGoMenu = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'preload', 'black');
                this.modalGoMenu.alpha = 0;
                this.add.existing(this.modalGoMenu);
                this.modalGoMenu.setInteractive();
                this.confirmMenuConteiner = this.add.container(Config.GW / 2, Config.GH / 2 - 500);
                this.confirmMenuBG = new Phaser.GameObjects.Sprite(this, 0, 0, 'game', 'confirm_menu');
                this.confirmMenuConteiner.add(this.confirmMenuBG);
                this.btnYesMenu = new Client.gButton(this, -70, 60, 'game', 'yes_btn0001', 'yes_btn0002', 'yes_btn0001');
                this.btnYesMenu.setEventName('MenuYesBtn');
                this.events.on(this.btnYesMenu.getEventName(), this.clickYesMenu, this);
                this.confirmMenuConteiner.add(this.btnYesMenu);
                this.btnNoMenu = new Client.gButton(this, 70, 60, 'game', 'no_btn0001', 'no_btn0002', 'no_btn0001');
                this.btnNoMenu.setEventName('MenuNoBtn');
                this.events.on(this.btnNoMenu.getEventName(), this.clickNoMenu, this);
                this.confirmMenuConteiner.add(this.btnNoMenu);
                this.confirmReplayConteiner = this.add.container(Config.GW / 2, Config.GH / 2 - 500);
                this.confirmReplayBG = new Phaser.GameObjects.Sprite(this, 0, 0, 'game', 'confirm_replay');
                this.confirmReplayConteiner.add(this.confirmReplayBG);
                this.btnYesReplay = new Client.gButton(this, -70, 60, 'game', 'yes_btn0001', 'yes_btn0002', 'yes_btn0001');
                this.btnYesReplay.setEventName('ReplayYesBtn');
                this.events.on(this.btnYesReplay.getEventName(), this.clickYesReplay, this);
                this.confirmReplayConteiner.add(this.btnYesReplay);
                this.btnNoReplay = new Client.gButton(this, 70, 60, 'game', 'no_btn0001', 'no_btn0002', 'no_btn0001');
                this.btnNoReplay.setEventName('ReplayNoBtn');
                this.events.on(this.btnNoReplay.getEventName(), this.clickNoReplay, this);
                this.confirmReplayConteiner.add(this.btnNoReplay);
                this.helpPanel = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2 - 500, 'game', 'help_panel');
                this.add.existing(this.helpPanel);
                this.btnCloseHelpPanel = new Client.gButton(this, 520, 45 - 500, 'menu', 'close_btn0001', 'close_btn0002', 'close_btn0001');
                this.btnCloseHelpPanel.setEventName('CloseHelpPanel');
                this.events.on(this.btnCloseHelpPanel.getEventName(), this.clickCloseHelpPanel, this);
                this.add.existing(this.btnCloseHelpPanel);
                this.showMedal = new Client.oAchievsShow(this, -100, Config.GH / 2);
                this.add.existing(this.showMedal);
                this.screen = new Phaser.GameObjects.Sprite(this, Config.GW / 2, Config.GH / 2, 'preload', 'black');
                this.screen.alpha = 0;
                this.add.existing(this.screen);
                this.screen.setInteractive();
                if (!SndMng.getSoundEnable()) {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0003', 'options_sound_btn0004', 'options_sound_btn0003');
                }
                else {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0001', 'options_sound_btn0002', 'options_sound_btn0001');
                }
                if (!SndMng.getMusicEnable()) {
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0003', 'options_misic_btn0004', 'options_misic_btn0003');
                }
                else {
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0001', 'options_misic_btn0002', 'options_misic_btn0001');
                }
            };
            Panel.prototype.clickCloseHelpPanel = function () {
                this.helpPanel.y = Config.GH / 2 - 500;
                this.modalGoMenu.alpha = 0;
                this.btnCloseHelpPanel.y = 45 - 500;
            };
            Panel.prototype.clickNoReplay = function () {
                this.confirmReplayConteiner.y = Config.GH / 2 - 500;
                this.modalGoMenu.alpha = 0;
            };
            Panel.prototype.clickYesReplay = function () {
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 300,
                    onComplete: function showMenu(a) { a.parent.scene.scene.manager.getScene(Scenes.GAME).scene.restart(); },
                });
            };
            Panel.prototype.clickNoMenu = function () {
                this.confirmMenuConteiner.y = Config.GH / 2 - 500;
                this.modalGoMenu.alpha = 0;
            };
            Panel.prototype.removeAllAnim = function () {
                this.scene.manager.getScene(Scenes.GAME).anims.destroy();
            };
            Panel.prototype.clickYesMenu = function () {
                this.scene.stop(Scenes.GAME);
                var tTween = this.tweens.add({
                    targets: this.screen,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 300,
                    onComplete: function showMenu(a) { a.parent.scene.scene.stop(Scenes.GAME); a.parent.scene.scene.start(Scenes.MAINMENU); },
                });
            };
            Panel.prototype.clickMenu = function () {
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.modalGoMenu,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.confirmMenuConteiner,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 800,
                });
            };
            Panel.prototype.clickHelp = function () {
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.modalGoMenu,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.helpPanel,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 800,
                });
                var tTween = this.tweens.add({
                    targets: this.btnCloseHelpPanel,
                    y: 45,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 900,
                });
            };
            Panel.prototype.ClickRestart = function () {
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.modalGoMenu,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.confirmReplayConteiner,
                    y: Config.GH / 2,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 800,
                });
            };
            Panel.prototype.ClickResume = function () {
                this.modalPause.alpha = 0;
                this.btnResume.y = -105;
                this.btnRestart.y = -175;
                this.btnHelp.y = -240;
                this.btnMenu.y = -305;
                this.scene.manager.getScene(Scenes.GAME).scene.resume();
            };
            Panel.prototype.ClickPause = function () {
                SndMng.sfxPlay('sound41');
                var tTween = this.tweens.add({
                    targets: this.modalPause,
                    alpha: 0.7,
                    ease: 'Power1',
                    duration: 300,
                });
                var tTween = this.tweens.add({
                    targets: this.btnResume,
                    y: 105,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 600,
                });
                var tTween = this.tweens.add({
                    targets: this.btnRestart,
                    y: 175,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 500,
                });
                var tTween = this.tweens.add({
                    targets: this.btnHelp,
                    y: 240,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 400,
                });
                var tTween = this.tweens.add({
                    targets: this.btnMenu,
                    y: 305,
                    ease: 'Elastic',
                    easeParams: [1.5, 1],
                    duration: 300,
                });
                this.scene.manager.getScene(Scenes.GAME).scene.pause();
            };
            Panel.prototype.ClickSound = function () {
                if (SndMng.getSoundEnable()) {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0003', 'options_sound_btn0004', 'options_sound_btn0003');
                    SndMng.setSoundEnable(false);
                }
                else {
                    this.btnSound.ChangeSkin('menu', 'options_sound_btn0001', 'options_sound_btn0002', 'options_sound_btn0001');
                    SndMng.setSoundEnable(true);
                }
            };
            Panel.prototype.ClickMusic = function () {
                if (SndMng.getMusicEnable()) {
                    SndMng.setMusicEnable(false);
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0003', 'options_misic_btn0004', 'options_misic_btn0003');
                    SndMng.stopAllMusic();
                }
                else {
                    SndMng.setMusicEnable(true);
                    SndMng.playMusic('sound1');
                    this.btnMusic.ChangeSkin('menu', 'options_misic_btn0001', 'options_misic_btn0002', 'options_misic_btn0001');
                }
            };
            Panel.prototype.update = function () {
                if (score.showPrize) {
                    score.showPrize = false;
                    if (this.congrat.alpha == 0 && (score.CollectCoin > 3)) {
                        if (score.congratUse == score.congrat[score.congrat.length - 2] || score.congratUse == score.congrat[score.congrat.length - 1]) {
                            SndMng.sfxPlay('sound9');
                        }
                        score.CollectCoin = 0;
                        this.congrat.text = score.congratUse;
                        this.congrat.scaleX = 1.5;
                        this.congrat.scaleY = 1.5;
                        this.congrat.y = uMath.random(280, 350);
                        this.congrat.x = uMath.random(350, 500);
                        this.congrat.fontSize = uMath.random(31, 45);
                        var timeline = this.tweens.createTimeline(null);
                        timeline.add({
                            targets: this.congrat,
                            alpha: 1,
                            scaleY: 1,
                            scaleX: 1,
                            duration: 100,
                        });
                        timeline.add({
                            targets: this.congrat,
                            alpha: 0,
                            duration: 800,
                            delay: 1000,
                        });
                        timeline.play();
                    }
                }
                this.showMedal.update();
                if (!score.showed) {
                    var aId = AchEngine.update(0);
                    if (aId > 0) {
                        this.showMedal.Show(aId);
                    }
                }
                this.panelMetr.text = '' + score.runDistance + ' m';
                var percent = uMath.toPercent(score.stanina, score.Maxstanina);
                var nameframe = '000';
                percent = Math.floor(percent);
                if (percent >= 100) {
                    nameframe = '0';
                    percent = 100;
                }
                else {
                    if (percent > 9) {
                        nameframe = '00';
                    }
                }
                if (percent <= 0) {
                    percent = 1;
                }
                nameframe = 'progress' + nameframe + '' + percent;
                this.progress.setFrame(nameframe);
            };
            return Panel;
        }(Phaser.Scene));
        Client.Panel = Panel;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));

function isAdSupported() {
    return FBInstant.getSupportedAPIs().indexOf('getInterstitialAdAsync') >= 0;
}
let preloadedInterstitial = null;
function tryToPreloadAd() {
    if (!isAdSupported())
        return;
    if (preloadedInterstitial)
        return;
    FBInstant.getInterstitialAdAsync('288393711767551_288396658433923').then(function (interstitial) {
        // Load the Ad asynchronously
        preloadedInterstitial = interstitial;
        return preloadedInterstitial.loadAsync();
    }).then(function () {
        // console.log('Interstitial preloaded')
    }).catch(function (err) {
        // console.error('Interstitial failed to preload: ' + err.message);
    });
}
;
function tryToShowAd() {
    if (!isAdSupported())
        return;
    if (!preloadedInterstitial) {
        tryToPreloadAd();
        return;
    }
    let pa = preloadedInterstitial;
    preloadedInterstitial = null;
    pa.showAsync()
        .then(function () {
            // Perform post-ad success operation
            // console.log('Interstitial ad finished successfully');
            tryToPreloadAd();
        })
        .catch(function (e) {
            // console.error(e.message);
            tryToPreloadAd();
        });
}
;
tryToPreloadAd();

function createTimer(delay, callback, callbackContext, ...args) {
    setTimeout(callback.bind(callbackContext), delay);
}

var PhaserGame;
var fbStorage;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.CloseScene = false;
                return _this;
            }
            Preloader.prototype.preload = function () {
                this.load.atlas('menu', './assets/atlases/menu.png', './assets/atlases/menu.json');
                this.load.atlas('game', './assets/atlases/game.png', './assets/atlases/game.json');
                this.load.atlas('background', './assets/atlases/background.png', './assets/atlases/background.json');
                this.load.atlas('background2', './assets/atlases/background2.png', './assets/atlases/background2.json');
                this.load.atlas('player', './assets/atlases/player.png', './assets/atlases/player.json');
                this.load.atlas('objects', './assets/atlases/objects.png', './assets/atlases/objects.json');
                this.load.image('leaderboardBG', './assets/sprites/leaderboardBG.png');
                this.load.image('fbbuttons', './assets/sprites/fbbuttons.png');
                this.load.image('buttonClose', './assets/sprites/buttonClose.png');
                this.load.json('level', './data/level.json');
                this.load.json('build', './data/build.json');
                for (var i = 1; i <= 51; i++) {
                    // if (i == 12) continue;
                    this.load.audio('sound' + i, './assets/audio/' + i + '.mp3');
                }
                this.load.on('progress', this.onProgress, this);
                this.load.on('complete', this.onLoadComplete, this);
                this.createPreloader();
            };
            Preloader.prototype.createPreloader = function () {
                var wH = Number(this.game.config.height);
                var wW = Number(this.game.config.width);
                var logo = this.add.image(wW / 2, wH / 2, 'preload', 'splash');
                logo.setScale(1 * Config.scaleFactor);
                this.progressText = this.add.dynamicBitmapText(wW / 2 + 50, wH / 2 + 135, 'font', 'Loading 0%', 31);
                this.progressText.setOrigin(0.5);
            };
            Preloader.prototype.create = function () {

            };
            Preloader.prototype.onLoadComplete = function () {
                FBInstant.startGameAsync().then((function() {
                    var onComplete = (function() {
                        AchEngine.init(this);

                        var wH = Number(this.game.config.height);
                        var wW = Number(this.game.config.width);
                        this.screen = new Phaser.GameObjects.Sprite(this, wW / 2, wH / 2, 'preload', 'black');
                        this.screen.alpha = 0;
                        this.add.existing(this.screen);
                        this.tTween = this.tweens.add({
                            targets: this.screen,
                            alpha: 1,
                            ease: 'Power1',
                            duration: 300,
                            onComplete: function showMenu(a) { a.parent.scene.scene.start(Scenes.MAINMENU); },
                        });
                    }).bind(this);

                    var dataKeys = [];
                    var achArrJSON = this.cache.json.get('achievs');
                    for (var i = 0; i < achArrJSON['data']['achievement'].length; i++) {
                        var keyPass = achArrJSON['data']['achievement'][i]['-name'] + 'pass';
                        var keyShow = achArrJSON['data']['achievement'][i]['-name'] + 'show';
                        {
                            dataKeys.push(keyPass);
                            dataKeys.push(keyShow);
                        }
                    }
                    for (var i = 0; i < _achComplete_global_.length; i++) {
                        var tkey = _achComplete_global_[i];
                        dataKeys.push(tkey);
                    }
                    dataKeys.push('best');

                    FBInstant.player
                        .getDataAsync(dataKeys)
                        .then(function(data) {
                            console.log('data is loaded', data);
                            fbStorage = data;
                            onComplete();
                        }, function() {
                            fbStorage = {};
                            onComplete();
                        });
                }).bind(this));
            };
            Preloader.prototype.onProgress = function (value) {
                this.progressText.text = 'Loading ' + Math.round(value * 100) + '%';
                FBInstant.setLoadingProgress(Math.ceil(value * 100));
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
    Scenes.HUDPANEL = 'Panel';
})(Scenes || (Scenes = {}));
var AchEngine;
var _achComplete_global_ = ['distanceMax', 'magnetoTotal', 'birdTotal', 'dinoTotal', 'mouseTotal', 'starMax', 'doubleJumpMax', 'jumpMax'];
(function (AchEngine) {
    AchEngine.distanceMax = 0;
    AchEngine.magnetoTotal = 0;
    AchEngine.birdTotal = 0;
    AchEngine.dinoTotal = 0;
    AchEngine.mouseTotal = 0;
    AchEngine.starMax = 0;
    AchEngine.jumpMax = 0;
    AchEngine.doubleJumpMax = 0;
    AchEngine.completed = [];
    var MUS_MAX_VOL = 1;
    var achArrJSON;
    var achComplete = _achComplete_global_.slice();
    function init(scene) {
        achArrJSON = scene.cache.json.get('achievs');
        getDescriptionFromStr(parseSTR(achArrJSON['data']['achievement'][3]['-description_lock']));
        loadData();
    }
    AchEngine.init = init;
    function getDescriptionFromStr(obj) {
        var desc = '';
        for (var i = 0; i < achComplete.length; i++) {
            if (('{' + achComplete[i] + '}') == obj.split) {
                desc = obj.first + AchEngine[achComplete[i]] + obj.second;
            }
        }
        return desc;
    }
    function loadData() {
        for (var i = 0; i < achArrJSON['data']['achievement'].length; i++) {
            var ach = {
                'pass': false,
                'show': false,
                'value': achArrJSON['data']['achievement'][i]['lock']['-value'],
                'property': achArrJSON['data']['achievement'][i]['lock']['-property']
            };
            AchEngine.completed.push(ach);
        }
        for (var i = 0; i < achArrJSON['data']['achievement'].length; i++) {
            var keyPass = achArrJSON['data']['achievement'][i]['-name'] + 'pass';
            var keyShow = achArrJSON['data']['achievement'][i]['-name'] + 'show';
            {
                AchEngine.completed[i].pass = Boolean(fbStorage[keyPass]);
                AchEngine.completed[i].show = Boolean(fbStorage[keyShow]);
            }
        }
        for (var i = 0; i < achComplete.length; i++) {
            var tkey = achComplete[i];
            AchEngine[achComplete[i]] = Number(fbStorage[tkey] || 0);
        }
        score.bestDistance = Number(fbStorage['best'] || 0);
    }
    function saveData() {
        for (var i = 0; i < achComplete.length; i++) {
            var tkey = achComplete[i];
            fbStorage[tkey] = AchEngine[achComplete[i]];
        }
        fbStorage['best'] = '' + score.bestDistance;
        FBInstant.player.setDataAsync(fbStorage).then(FBInstant.player.flushDataAsync).then(function () {console.log('Data persisted to FB!');});
    }
    AchEngine.saveData = saveData;
    function ButtonNewMedal() {
        var flag = false;
        for (var i = 0; i < AchEngine.completed.length; i++) {
            if (AchEngine.completed[i].pass != AchEngine.completed[i].show) {
                flag = true;
            }
        }
        return flag;
    }
    AchEngine.ButtonNewMedal = ButtonNewMedal;
    function unlockAchByID(id) {
        var keyPass = achArrJSON['data']['achievement'][id]['-name'] + 'pass';
        fbStorage[keyPass] = 'true';
        AchEngine.completed[id].pass = true;
        FBInstant.player.setDataAsync(fbStorage).then(FBInstant.player.flushDataAsync).then(function () {console.log('Data persisted to FB!');});
    }
    function iAmShowAllAchievement() {
        for (var i = 0; i < AchEngine.completed.length; i++) {
            if (AchEngine.completed[i].pass) {
                var keyShow = achArrJSON['data']['achievement'][i]['-name'] + 'show';
                fbStorage[keyShow] = 'true';
                AchEngine.completed[i].show = true;
                FBInstant.player.setDataAsync(fbStorage).then(FBInstant.player.flushDataAsync).then(function () {console.log('Data persisted to FB!');});
            }
        }
    }
    AchEngine.iAmShowAllAchievement = iAmShowAllAchievement;
    function getInfoNewById(id) {
        var res = false;
        if (AchEngine.completed[id].pass == true && AchEngine.completed[id].show == false) {
            res = true;
        }
        return res;
    }
    AchEngine.getInfoNewById = getInfoNewById;
    function parseSTR(str) {
        var startSTR = false;
        var first = true;
        var allText = {
            'first': '',
            'second': '',
            'split': ''
        };
        for (var i = 0; i < str.length; i++) {
            if (str[i] == '{') {
                startSTR = true;
            }
            if (startSTR) {
                allText.split += str[i];
            }
            if (!startSTR) {
                if (first) {
                    allText.first += str[i];
                }
                else {
                    allText.second += str[i];
                }
            }
            if (str[i] == '}') {
                startSTR = false;
                first = false;
            }
        }
        return allText;
    }
    function getNameById(id) {
        if (id === void 0) { id = 0; }
        return achArrJSON['data']['achievement'][id]['-name'];
    }
    AchEngine.getNameById = getNameById;
    function getStateAchById(id) {
        if (id === void 0) { id = 0; }
        var res = AchEngine.completed[id].pass;
        return res;
    }
    AchEngine.getStateAchById = getStateAchById;
    function getDescriptionById(id) {
        if (id === void 0) { id = 0; }
        var dscpt = '';
        if (AchEngine.completed[id].pass) {
            dscpt = achArrJSON['data']['achievement'][id]['-description'];
        }
        else {
            dscpt = getDescriptionFromStr(parseSTR(achArrJSON['data']['achievement'][id]['-description_lock']));
        }
        return dscpt;
    }
    AchEngine.getDescriptionById = getDescriptionById;
    function getLength() {
        return achArrJSON['data']['achievement'].length;
    }
    AchEngine.getLength = getLength;
    function update(dt) {
        var id = -1;
        for (var i = 0; i < AchEngine.completed.length; i++) {
            if (!AchEngine.completed[i].pass) {
                if (AchEngine[AchEngine.completed[i].property] > AchEngine.completed[i].value) {
                    id = i + 1;
                    unlockAchByID(i);
                }
            }
        }
        return id;
    }
    AchEngine.update = update;
})(AchEngine || (AchEngine = {}));
var SndMng;
(function (SndMng) {
    SndMng.SFX_CLICK = 'click';
    var MUS_MAX_VOL = 1;
    var game;
    var enabled;
    var musEnabled;
    var currentMusicName = '';
    var musics = [];
    function init(aGame, aEnabled) {
        game = aGame;
        enabled = aEnabled;
        musEnabled = aEnabled;
    }
    SndMng.init = init;
    function setSoundEnable(stat) {
        enabled = stat;
    }
    SndMng.setSoundEnable = setSoundEnable;
    function getSoundEnable() {
        return enabled;
    }
    SndMng.getSoundEnable = getSoundEnable;
    function setMusicEnable(stat) {
        musEnabled = stat;
    }
    SndMng.setMusicEnable = setMusicEnable;
    function getMusicEnable() {
        return musEnabled;
    }
    SndMng.getMusicEnable = getMusicEnable;
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
    function sfxPlay(aName, aVol, toMassive) {
        if (aVol === void 0) { aVol = 1; }
        if (toMassive === void 0) { toMassive = false; }
        if (!enabled)
            return;
        var snd = game.add(aName, { volume: aVol });
        snd.play();
        if (toMassive) {
            musics.push({ name: aName, mus: snd });
        }
        return snd;
    }
    SndMng.sfxPlay = sfxPlay;
    function playMusic(aName, aVol, loop) {
        if (aVol === void 0) { aVol = 1; }
        if (loop === void 0) { loop = true; }
        if (!musEnabled)
            return;
        var music = game.add(aName, { volume: aVol, loop: loop });
        music.play();
        musics.push({ name: aName, mus: music });
        currentMusicName = aName;
    }
    SndMng.playMusic = playMusic;
    function resumeMusic(aVol, loop) {
        if (aVol === void 0) { aVol = 1; }
        if (loop === void 0) { loop = true; }
        if (!musEnabled)
            return;
        var music = game.add(currentMusicName, { volume: aVol, loop: loop });
        music.play();
        musics.push({ name: currentMusicName, mus: music });
    }
    SndMng.resumeMusic = resumeMusic;
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
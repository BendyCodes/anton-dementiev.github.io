var src;
(function (src) {
    class Boot extends Phaser.Scene {
        preload() {
            this.load.atlas('jsn', './assets/progress/loader.png', './assets/progress/loader.json');
        }
        create() {
            this.scene.start('Preload');
        }
    }
    src.Boot = Boot;
})(src || (src = {}));
var src;
(function (src) {
    class Card {
        constructor(id, scene, isInteractive = true) {
            this.width = 260;
            this.height = 380;
            this.idStr = "0";
            this.opened = false;
            this.scene = scene;
            this.id = id;
            this.id < 10 ? this.idStr += String(this.id) : this.idStr = String(this.id);
            this.shadow = this.scene.add.sprite(0, 0, 'cards', 'Card0019.png');
            this.shadow.tint = 0x000000;
            this.shadow.alpha = 0.2;
            this.instance = this.scene.add.sprite(0, 0, 'cards', 'Card0019.png');
            if (isInteractive)
                this.instance.setInteractive();
            this.instance.on('pointerout', function (pointer) {
                if (!this.opened && !this.scene.blocked)
                    this.instance.setFrame('Card0019.png');
            }.bind(this));
            this.instance.on('pointerup', function (pointer) {
                if (this.opened || this.scene.blocked)
                    return;
                this.scene.currentCard = this;
                this.opened = true;
                this.instance.setFrame('Card00' + this.idStr + '.png');
            }.bind(this));
            this.instance.on('pointermove', function (pointer) {
                if (!this.opened && !this.scene.blocked)
                    this.instance.setFrame('Card0020.png');
            }.bind(this));
        }
        setBack(val = true) {
            this.opened = !val;
            if (val)
                this.instance.setFrame('Card0019.png');
            else
                this.instance.setFrame('Card00' + this.idStr + '.png');
        }
        setVisible(val = true) {
            this.instance.visible = val;
            this.shadow.visible = val;
        }
        setScale(val) {
            this.instance.scaleX = this.instance.scaleY = val;
            this.shadow.scaleX = this.shadow.scaleY = val;
        }
        setX(val) {
            this.instance.x = val;
            this.shadow.x = val + 3;
        }
        setY(val) {
            this.instance.y = val;
            this.shadow.y = val + 3;
        }
        getId() {
            return this.id;
        }
    }
    src.Card = Card;
})(src || (src = {}));
var src;
(function (src) {
    class GameOverScreen extends Phaser.Scene {
        constructor() {
            super(...arguments);
            this.points = 0;
            this.level = 0;
            this.record = 0;
            this.tickets = 0;
            this.time_ = 0;
            this.elapsedTime = 0;
        }
        create(val) {
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');
            var rect = new Phaser.Geom.Rectangle(0, 0, 809, 566);
            var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
            graphics.fillRectShape(rect);
            this.add.sprite(280, 250, 'table').setScale(0.8, 0.8);
            var probX = 570;
            var probY = 170;
            this.add.sprite(probX, probY, "art", 'probeta.png').setOrigin(0.0, 0.0).setScale(2, 2);
            //var probeta_anim = this.anims.create({ key: 'Probeta', frames: this.anims.generateFrameNames('Probeta'), repeat: -1 });
            //probb = this.add.sprite(probX+10, probY-20, 'Probeta').play('Probeta').setOrigin(0.0, 0.0).setScale(2,2);
            //probeta_anim.pause();
            this.probb = this.add.sprite(probX + 10, probY - 20, 'Probeta').setOrigin(0.0, 0.0).setScale(2, 2);
            this.add.sprite(probX + (36 * 2), probY, "art", 'shine.png').setOrigin(0.0, 0.0).setScale(2, 2);
            var tst = 120;
            var tdiff = 60;
            this.levelText = this.add.text(280, tst, '', {
                fill: 'white',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 40,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.pointsHeader = this.add.text(280, tst + tdiff * 1, '', {
                fill: '#79c2ca',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 40,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.pointsText = this.add.text(280, tst + tdiff * 2, '', {
                fill: 'white',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 40,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.recordHeader = this.add.text(280, tst + tdiff * 3, '', {
                fill: '#79c2ca',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 40,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.recordText = this.add.text(280, tst + tdiff * 4, '', {
                fill: 'white',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 40,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.btnReplay = this.add.sprite(750, 500, 'btnPlay').setInteractive();
            this.btnReplay.on('pointerdown', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0003.png');
            }.bind(this));
            this.btnReplay.on('pointerout', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0001.png');
            }.bind(this));
            this.btnReplay.on('pointerup', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0001.png');
                this.sound.add('FX_Button_Click').play();
                //AudioManager.stopAll();
                this.scene.start('Gameplay', { tutor: false });
            }.bind(this));
            this.btnReplay.on('pointermove', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0002.png');
            }.bind(this));
            this.time_ = 0;
            this.elapsedTime = 0;
            this.init_screen(val.points, val.level);
        }
        init_screen(points, level) {
            this.points = points;
            this.level = Math.min(4, level - 1);
            this.record = src.Main.record;
            if (points > src.Main.record)
                src.Main.record = points;
            if (points < 100) {
                this.tickets = Math.floor(points / 10);
            }
            else if (points < 400) {
                this.tickets = 10 + Math.floor((points - 300) / 20);
            }
            else {
                this.tickets = 25 + Math.floor((points - 400) / 40);
            }
            this.tickets++;
            this.pointsHeader.text = src.Main.getText("Pizarra_Points");
            this.pointsText.text = "0123456789";
            this.pointsText.visible = false;
            this.recordHeader.text = src.Main.getText("Pizarra_Record");
            var r = String(this.record);
            while (r.length < 4) {
                r = "0" + r;
            }
            this.recordText.text = r;
            this.btnReplay.visible = false;
            this.sound.add('FX_Recount').play();
        }
        update() {
            this.elapsedTime++;
            var limit1 = Math.max(Math.min(4000, this.points * 10), 1000);
            var limit2 = limit1 + (this.level < 4 ? 250 : 2000);
            if (this.time_ < limit1) {
                this.time_ = Math.min(this.time_ + this.elapsedTime, limit1);
                var pointsPercentage = Math.floor(this.points * (this.time_ / limit1));
                var levelPercentage = Math.floor(Math.min(100, this.points / 4) * (this.time_ / limit1));
                var p = String(pointsPercentage);
                while (p.length < 4) {
                    p = "0" + p;
                }
                this.levelText.text = src.Main.getText("Pizarra_Level" + String(this.level + 1));
                this.pointsText.text = p;
                this.pointsText.visible = true;
                if (pointsPercentage > this.record) {
                    this.recordText.text = p;
                }
                if (levelPercentage > 99)
                    this.probb.setFrame('Probeta0' + levelPercentage);
                else if (levelPercentage > 9)
                    this.probb.setFrame('Probeta00' + levelPercentage);
                else if (levelPercentage >= 0)
                    this.probb.setFrame('Probeta000' + levelPercentage);
                if (levelPercentage == 100) {
                    this.sound.add('FX_Bubbles').play();
                }
            }
            else if (this.time_ < limit2) {
                //AudioManager.stop("FX_Recount");
                this.time_ = Math.min(this.time_ + this.elapsedTime, limit2);
                if (this.time_ == limit2) {
                    //AudioManager.stopAll();
                }
            }
            else {
                this.btnReplay.visible = true;
            }
        }
    }
    src.GameOverScreen = GameOverScreen;
})(src || (src = {}));
var src;
(function (src) {
    class Gameplay extends Phaser.Scene {
        constructor() {
            super(...arguments);
            this.points = 0;
            this.retries = 0;
            this.level = 0;
            this.levelTime = 0;
            this.levelPairs = 0;
            this.levelPointsOk = 0;
            this.levelPointsFail = 0;
            this.failTime = 0;
            this.endSuccess = false;
            this.elapsedTime = 0;
            this.allCards = new Array();
            this.blocked = false;
        }
        create(val) {
            this.stage = this;
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');
            var cont = this.add.container(0, 0);
            var left_panel = this.add.sprite(150, 80, "art", 'leftPanel.png');
            var right_panel = this.add.sprite(660, 80, "art", 'rightPanel.png');
            var clock_img = this.add.sprite(410, 80, "art", 'clockBack.png');
            this.LP_retries = this.add.text(90, 81, '0', {
                fill: 'black',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 30,
                align: "center"
            });
            this.LP_retries.setOrigin(0.5, 0.5);
            this.LP_text = this.add.text(180, 99, src.Main.getText("Intentos"), {
                fill: 'white',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 18,
                align: "center"
            });
            this.LP_text.setOrigin(0.5, 0.5);
            this.CP_time = this.add.text(410, 81, '0', {
                fill: 'black',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 30,
                align: "center"
            });
            this.CP_time.setOrigin(0.5, 0.5);
            this.RP_points = this.add.text(715, 81, '0', {
                fill: 'black',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 30,
                align: "center"
            });
            this.RP_points.setOrigin(0.5, 0.5);
            this.RP_text = this.add.text(615, 99, src.Main.getText("Puntos"), {
                fill: 'white',
                fontFamily: src.Main.getFont("Puntos"),
                fontSize: 18,
                align: "center"
            });
            this.RP_text.setOrigin(0.5, 0.5);
            var clock_anim = this.anims.create({ key: 'clock', frames: this.anims.generateFrameNames('clock'), repeat: -1 });
            this.add.sprite(410, 80, 'clock').play('clock');
            cont.add([left_panel, right_panel, clock_img]);
            this.cards_cont = this.add.container(0, 0);
            this.help_screen = this.add.container(0, 0);
            this.help_header = this.add.text(809 / 2, 160, src.Main.getText("HelpHeader"), {
                fill: '#1189cc',
                fontFamily: src.Main.getFont("HelpHeader"),
                fontSize: 20,
                align: "center"
            });
            this.help_header.setOrigin(0.5, 0.5);
            this.help_text1 = this.add.text(228 + 80, 192 + 30 + 15, src.Main.getText("HelpText1"), {
                fill: '#1189cc',
                fontFamily: src.Main.getFont("HelpText1"),
                fontSize: 17,
                align: "center",
                wordWrap: { width: 160, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.help_text2 = this.add.text(481 + 80, 220 + 30 + 25, src.Main.getText("HelpText2"), {
                fill: '#1189cc',
                fontFamily: src.Main.getFont("HelpText2"),
                fontSize: 17,
                align: "center",
                wordWrap: { width: 160, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.help_text3 = this.add.text(228 + 80, 270 + 30 + 15, src.Main.getText("HelpText3"), {
                fill: '#1189cc',
                fontFamily: src.Main.getFont("HelpText3"),
                fontSize: 17,
                align: "center",
                wordWrap: { width: 160, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.help_close = this.add.sprite(404, 390, 'btnYes').setInteractive();
            this.help_close.on('pointerdown', function (pointer) {
                this.help_close.setFrame('ButtonYes0003.png');
            }.bind(this));
            this.help_close.on('pointerout', function (pointer) {
                this.help_close.setFrame('ButtonYes0001.png');
            }.bind(this));
            this.help_close.on('pointerup', function (pointer) {
                this.help_close.setFrame('ButtonYes0001.png');
                this.sound.add('FX_Button_Click').play();
                this.init_area(1);
                this.help_screen.visible = false;
                this.blocked = false;
            }.bind(this));
            this.help_close.on('pointermove', function (pointer) {
                this.help_close.setFrame('ButtonYes0002.png');
            }.bind(this));
            this.help_screen.add([this.add.sprite(0, 0, 'tips_main').setOrigin(0.0, 0.0), this.add.sprite(330, 270, "art", 'tips.png'), this.help_header, this.help_text1, this.help_text2, this.help_text3, this.help_close]);
            this.endPopup = this.add.container(0, 0);
            this.info_header = this.add.text(809 / 2, 230, '190890890', {
                fill: '#ffffff',
                fontFamily: src.Main.getFont("End_Fail"),
                fontSize: 30,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.endPopup_close = this.add.sprite(404, 400, 'btnYes').setInteractive();
            this.endPopup_close.on('pointerdown', function (pointer) {
                this.endPopup_close.setFrame('ButtonYes0003.png');
            }.bind(this));
            this.endPopup_close.on('pointerout', function (pointer) {
                this.endPopup_close.setFrame('ButtonYes0001.png');
            }.bind(this));
            this.endPopup_close.on('pointerup', function (pointer) {
                this.endPopup_close.setFrame('ButtonYes0001.png');
                this.sound.add('FX_Button_Click').play();
                //AudioManager.stopAll();
                if (this.endSuccess)
                    this.init_area(this.level + 1);
                else
                    src.Main.instance.scene.start('GameOver', { points: this.points, level: this.level });
                this.endPopup.visible = false;
                //this.blocked = false;
            }.bind(this));
            this.endPopup_close.on('pointermove', function (pointer) {
                this.endPopup_close.setFrame('ButtonYes0002.png');
            }.bind(this));
            this.endPopup.add([this.add.sprite(0, 0, 'info_main').setOrigin(0.0, 0.0), this.endPopup_close, this.info_header]);
            if (val.tutor) {
                this.blocked = true;
            }
            else {
                this.help_screen.visible = false;
                this.blocked = false;
                this.level = 0;
                this.init_area(this.level + 1);
            }
            this.endPopup.visible = false;
        }
        init_area(level) {
            this.level = level;
            //console.log("start level", level);
            if (level == 1) {
                this.points = 0;
                this.retries = 0;
            }
            this.last = null;
            this.resetFail();
            this.endSuccess = false;
            var rows = 0;
            var cols = 0;
            if (level == 1) {
                rows = 2;
                cols = 4;
                this.levelTime = 30;
                this.levelPointsOk = 10;
                this.levelPointsFail = -3;
            }
            else if (level == 2) {
                rows = 2;
                cols = 5;
                this.levelTime = 40;
                this.levelPointsOk = 10;
                this.levelPointsFail = -2;
            }
            else if (level == 3) {
                rows = 2;
                cols = 7;
                this.levelTime = 50;
                this.levelPointsOk = 10;
                this.levelPointsFail = -1;
            }
            else if (level == 4) {
                rows = 3;
                cols = 6;
                this.levelTime = 65;
                this.levelPointsOk = 15;
                this.levelPointsFail = -1;
            }
            else {
                rows = 3;
                cols = 6;
                this.levelTime = 55 - (10 * (level - 5));
                this.levelPointsOk = 20;
                this.levelPointsFail = (level == 5 ? -1 : 0);
            }
            this.levelPairs = (rows * cols) / 2;
            var free = new Array();
            var i;
            for (i = 0; i < 18; i++) {
                free.push(i + 1);
            }
            this.clearArea();
            var cards = new Array();
            for (i = 0; i < this.levelPairs; i++) {
                var id = free.splice(Math.floor(Math.random() * free.length), 1)[0];
                cards.push(new src.Card(id, this));
                cards.push(new src.Card(id, this));
            }
            var padding = 0;
            var maxWidth = (810 - (padding * (cols - 1))) / cols;
            var maxHeight = (415 - (padding * (rows - 1))) / rows;
            var scale = Math.min(maxWidth / 260, maxHeight / 380) * 0.9;
            var xxx = 0;
            var yyy = 0;
            if (level == 1) {
                xxx = 220;
                yyy = 250;
            }
            else if (level == 2) {
                xxx = 155;
                yyy = 250;
            }
            else if (level == 3) {
                xxx = 100;
                yyy = 270;
            }
            else if (level >= 4) {
                xxx = 200;
                yyy = 220;
            }
            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                    var card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
                    card.setScale(scale);
                    card.setX(Math.floor((x * card.width * scale) + (x * padding)) + xxx);
                    card.setY(Math.floor((y * card.height * scale) + (y * padding)) + yyy);
                    this.cards_cont.add(card.shadow, card.instance);
                    this.allCards.push(card);
                }
            }
            this.LP_retries.text = String(this.retries);
            this.RP_points.text = String(this.points);
            this.CP_time.text = String(this.levelTime);
        }
        update() {
            this.elapsedTime++;
            if (this.elapsedTime > 60)
                this.elapsedTime = 0;
            if (!this.blocked) {
                this.levelTime = Math.max(this.levelTime - Math.floor(this.elapsedTime / 60), 0);
                this.LP_retries.text = String(this.retries);
                this.RP_points.text = String(this.points);
                this.CP_time.text = String(this.levelTime);
                if (this.failTime > 0) {
                    this.failTime--;
                    if (this.failTime <= 0) {
                        this.elapsedTime = 0;
                        this.resetFail();
                    }
                }
                if (this.levelTime <= 0) {
                    //AudioManager.stopAll();
                    this.sound.add('FX_GameOver').play();
                    this.endSuccess = false;
                    this.clearArea();
                    this.info_header.text = src.Main.getText("End_Fail");
                    this.endPopup.visible = true;
                    this.blocked = true;
                }
                else if (this.levelTime < 4000 * 2) {
                    //this.sound.add('FX_Time').play();
                }
                this.cardsUpdate();
            }
        }
        cardsUpdate() {
            if (this.currentCard && this.currentCard.opened) {
                if (this.last != null) {
                    this.retries++;
                    if (this.currentCard.getId() == this.last.getId()) {
                        this.points += this.levelPointsOk;
                        this.sound.add('FX_Ok').play();
                        this.levelPairs--;
                        if (this.levelPairs == 0) {
                            this.sound.add('FX_Completed').play();
                            this.endSuccess = true;
                            this.info_header.text = src.Main.getText("End_OK");
                            this.endPopup.visible = true;
                            this.clearArea();
                        }
                    }
                    else {
                        this.points = Math.max(0, this.points + this.levelPointsFail);
                        this.sound.add('FX_Fail').play();
                        this.fail1 = this.last;
                        this.fail2 = this.currentCard;
                        this.failTime = 60 / 2;
                    }
                    this.last = null;
                }
                else {
                    this.resetFail();
                    this.last = this.currentCard;
                }
            }
            this.currentCard = null;
        }
        clearArea() {
            while (this.allCards.length > 0) {
                this.allCards[this.allCards.length - 1].instance.destroy();
                this.allCards[this.allCards.length - 1].shadow.destroy();
                this.allCards.pop();
            }
        }
        resetFail() {
            if (this.fail1 != null) {
                this.fail1.setBack();
                this.fail1 = null;
            }
            if (this.fail2 != null) {
                this.fail2.setBack();
                this.fail2 = null;
            }
            this.failTime = 0;
        }
    }
    src.Gameplay = Gameplay;
})(src || (src = {}));
///<reference path="../phaser.d.ts" />
var src;
(function (src) {
    class Main extends Phaser.Game {
        constructor() {
            const config = {
                width: 809,
                height: 566,
                type: Phaser.AUTO,
                backgroundColor: 0xffffff
            };
            super(config);
            Main.instance = this;
            Main.resize();
            var WebFontConfig = {
                google: {
                    families: ["Lato"]
                },
                active: function () {
                    Main.instance.scene.add('Boot', src.Boot, false);
                    Main.instance.scene.add('Preload', src.PreloadScene, false);
                    Main.instance.scene.add('Title', src.TitleScreen, false);
                    Main.instance.scene.add('Gameplay', src.Gameplay, false);
                    Main.instance.scene.add('GameOver', src.GameOverScreen, false);
                    Main.instance.scene.start('Boot');
                }
            };
            WebFont.load(WebFontConfig);
        }
        static resize() {
            var w = window.innerWidth;
            var h = window.innerHeight;
            var scale = Math.min(w / 809, h / 566);
            Main.instance.canvas.setAttribute('style', ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
                ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
                ' transform-origin: top left;');
            var width = w / scale;
            var height = h / scale;
            Main.instance.canvas.style.left = (width * scale - 809 * scale) / 2 + 'px';
            Main.instance.canvas.style.top = (height * scale - 566 * scale) / 2 + 'px';
            Main.instance.canvas.style.position = "absolute";
        }
        static getFont(val) {
            if (locData[val]["font"])
                return locData[val]["font"];
            return "";
        }
        static getText(val) {
            if (locData[val][locData["lang"]])
                return locData[val][locData["lang"]];
            return "";
        }
    }
    Main.record = 0;
    src.Main = Main;
    window.addEventListener('resize', () => {
        Main.resize();
    }, false);
    window.onload = () => {
        new Main();
    };
})(src || (src = {}));
var src;
(function (src) {
    class PreloadScene extends Phaser.Scene {
        preload() {
            this.add.image(809 / 2, 200, 'jsn').setFrame("logo.png");
            this.add.image(809 / 2 - 85, 350, 'jsn').setFrame("line.png").setOrigin(0, 0.5);
            this.ppp = this.add.image(809 / 2 - 85, 350, 'jsn').setFrame("active.png").setOrigin(0, 0.5);
            this.spin = this.add.image(809 / 2, 430, 'jsn').setFrame("spinner.png");
            /*
            var percentText = this.make.text({
                x: 809 / 2,
                y: 490,
                text: '0%',
                style: {
                    fontSize: 40,
                    fill: '#1189cc'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            percentText.visible = false;
            */
            this.load.on('progress', function (value) {
                //percentText.setText(Math.floor(value * 100) + '%');
                this.ppp.scaleX = value;
                this.spin.rotation += 0.5;
            }.bind(this));
            this.load.image("cursor", "./assets/cursor.cur");
            this.load.image("title_back", "./assets/title.png");
            this.load.image("tips_main", "./assets/tips_main.png");
            this.load.image("info_main", "./assets/info_main.png");
            this.load.image("table", "./assets/table.png");
            this.load.atlas('btnPlay', 'assets/btnPlay/ButtonPlay.png', 'assets/btnPlay/ButtonPlay.json');
            this.load.atlas('btnYes', 'assets/btnYes/ButtonYes.png', 'assets/btnYes/ButtonYes.json');
            this.load.atlas('art', 'assets/art.png', 'assets/art.json');
            this.load.atlas('cards', 'assets/cards/cards.png', 'assets/cards/cards.json');
            this.load.atlas('clock', 'assets/clock/clock.png', 'assets/clock/clock.json');
            this.load.atlas('Probeta', 'assets/flask/Probeta.png', 'assets/flask/Probeta.json');
            var allSounds = ["FX_Bubbles",
                "FX_Button_Click",
                "FX_Button_RollOver",
                "FX_Completed",
                "FX_Fail",
                "FX_GameOver",
                "FX_Ok",
                "FX_Recount",
                "FX_Time"];
            for (var s in allSounds) {
                this.load.audio(allSounds[s], [
                    'sounds/' + allSounds[s] + '.mp3',
                    'sounds/' + allSounds[s] + '.ogg'
                ]);
            }
        }
        create() {
            this.scene.start('Title');
        }
        update() {
            if (this.spin)
                this.spin.rotation += 0.3;
        }
    }
    src.PreloadScene = PreloadScene;
})(src || (src = {}));
var src;
(function (src) {
    class TitleScreen extends Phaser.Scene {
        create() {
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');
            var title_back = this.add.sprite(809 / 2, 566 / 2, 'title_back');
            var title_text = this.add.text(0, 0, src.Main.getText("Title"), {
                fill: '#1189cc',
                fontFamily: src.Main.getFont("Title"),
                fontSize: 45,
                align: "center"
            });
            title_text.x = 809 / 2 - title_text.width / 2;
            title_text.y = 50;
            this.btnPlay = this.add.sprite(730, 480, 'btnPlay').setInteractive();
            this.btnPlay.on('pointerdown', function (pointer) {
                this.btnPlay.setFrame('ButtonPlay0003.png');
            }.bind(this));
            this.btnPlay.on('pointerout', function (pointer) {
                this.btnPlay.setFrame('ButtonPlay0001.png');
            }.bind(this));
            this.btnPlay.on('pointerup', function (pointer) {
                this.btnPlay.setFrame('ButtonPlay0001.png');
                this.scene.start('Gameplay', { tutor: true });
            }.bind(this));
            this.btnPlay.on('pointermove', function (pointer) {
                this.btnPlay.setFrame('ButtonPlay0002.png');
            }.bind(this));
        }
    }
    src.TitleScreen = TitleScreen;
})(src || (src = {}));

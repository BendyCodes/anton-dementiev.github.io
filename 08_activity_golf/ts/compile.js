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
    class GameOverScreen extends Phaser.Scene {
        create(val) {
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');
            this.add.sprite(809 / 2, 566 / 2, 'info_main');
            this.add.text(415, 150, src.Main.getText("bravo"), {
                fill: '#ffffff',
                fontFamily: src.Main.getFont("bravo"),
                fontSize: 30,
                align: "center",
                wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            this.music_bravo = this.sound.add('MUSIC_Outro', { loop: true });
            this.music_bravo.play();
            this.btnReplay = this.add.sprite(600, 330, 'btnPlay').setInteractive();
            this.btnReplay.on('pointerdown', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0003.png');
            }.bind(this));
            this.btnReplay.on('pointerout', function (pointer) {
                this.sound.add('botonRO').play();
                this.btnReplay.setFrame('ButtonPlay0001.png');
            }.bind(this));
            this.btnReplay.on('pointerup', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0001.png');
                this.sound.add('botonClick').play();
                if (this.music_bravo)
                    this.music_bravo.stop();
                this.scene.start('Gameplay', { tutor: false });
            }.bind(this));
            this.btnReplay.on('pointermove', function (pointer) {
                this.btnReplay.setFrame('ButtonPlay0002.png');
            }.bind(this));
        }
    }
    src.GameOverScreen = GameOverScreen;
})(src || (src = {}));
var src;
(function (src) {
    class Gameplay extends Phaser.Scene {
        constructor() {
            super(...arguments);
            this.allAnims_current = [];
            this.allAnims = ['pajaroto', 'trompeta_pelota', 'pato', 'palmera', 'nube', 'escoba', 'elly', 'despertador', 'caja', 'cactus', 'arbol'];
            this.allAnimsSounds = ['pajaroto', 'trompetita', 'cuac LIMPIO', 'palmera', 'nube', 'woo', 'eli trompeta', 'despertador', 'golpe', 'cactus', 'arbol'];
            this.allAnimsLen = [30, 21, 31, 39, 21, 40, 19, 17, 26, 22, 26];
            this.allAnimsScale = [1, 1, 1, -1, 1, 1, -1, 1, 1, -1, 1];
            this.allAnimsPos = [[180, 300], [380, 190], [380, 190], [380, 190], [380, 390], [380, 190], [420, 190], [380, 190], [450, 190], [350, 190], [400, 190]];
            this.firstTime = true;
            this.massivAnims = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.currentAnim = 0;
            this.finishCount = 0;
            this.block = false;
            this.nextClip = false;
        }
        create(val) {
            this.firstTime = val.tutor;
            this.currentAnim = 0;
            this.stage = this;
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');
            this.startCont = this.add.container(0, 0);
            this.flyCont = this.add.container(0, 0);
            this.finishCont = this.add.container(0, 0);
            this.topCont = this.add.container(0, 0);
            var green = this.add.sprite(0, 0, 'green').setOrigin(0, 0);
            var golfFlag = this.add.sprite(0, 0, 'golf').setOrigin(0, 0);
            this.finishCont.add([golfFlag]);
            this.finishCont.visible = false;
            if (this.firstTime) {
                this.music = this.sound.add(locData["lang"] + "_MPjuegos_golf");
                this.music.play();
                this.music.once('ended', function () {
                    this.block = false;
                }.bind(this));
            }
            this.block = this.firstTime;
            var pocoyoStr = "pocoyo";
            this.pocoyo = this.add.sprite(620, 390, pocoyoStr);
            var allFramesStrong = this.anims.generateFrameNames("strongPanel", {
                start: 1, end: 8, zeroPad: 4,
                prefix: "strongPanel", suffix: '.png'
            });
            if (this.strong_anim)
                this.strong_anim.destroy();
            this.strong_anim = this.anims.create({ key: "strongPanel", frames: allFramesStrong, repeat: -1, frameRate: 5 });
            this.pocoyo.setFrame("pocoyo0001.png");
            this.strongPanel = this.add.sprite(530, 220, "strongPanel").play("strongPanel");
            this.startCont.add([green, this.pocoyo, this.strongPanel]);
            this.animss = this.add.sprite(0, 0, "white");
            this.flyCont.add([this.animss]);
            this.flyCont.visible = false;
            this.fade = this.add.sprite(0, 0, "white").setScale(809 / 1, 566);
            this.fade.setInteractive();
            this.fade.alpha = 0.001;
            this.fade.on('pointerdown', function (pointer) {
                if (this.block)
                    return;
                this.strongRes = this.strongPanel.anims.currentFrame.index;
                this.strongPanel.visible = false;
                this.sound.add("golpe").play();
                if (this.strongRes > 5) {
                    switch (this.strongRes) {
                        case 6:
                            this.strongRes = 4;
                            break;
                        case 7:
                            this.strongRes = 3;
                            break;
                        case 8:
                            this.strongRes = 2;
                            break;
                    }
                }
                this.allAnims_current.length = 0;
                this.allAnims_current = [];
                this.allAnims_current = this.allAnims_current.concat(this.allAnims);
                this.shuffle(this.allAnims_current);
                var ppp = [[1, 17], [25, 34]];
                var pocoyoStr = "pocoyo";
                var ppp2 = 1;
                var pppT = 400;
                if (this.strongRes < 3) {
                    ppp2 = 0;
                    pppT = 700;
                }
                var allFramesPocoyo = this.anims.generateFrameNames(pocoyoStr, {
                    start: ppp[ppp2][0], end: ppp[ppp2][1], zeroPad: 4,
                    prefix: pocoyoStr, suffix: '.png'
                });
                if (this.pocoyo_anim)
                    this.pocoyo_anim.destroy();
                this.pocoyo_anim = this.anims.create({ key: pocoyoStr, frames: allFramesPocoyo, repeat: 0, frameRate: 25 });
                if (this.pocoyo) {
                    this.pocoyo.destroy();
                    this.pocoyo = this.add.sprite(620, 390, pocoyoStr);
                    this.startCont.add([this.pocoyo]);
                }
                this.pocoyo.play(pocoyoStr);
                this.time.addEvent({ delay: pppT, callback: function () {
                        this.startGolfAction();
                    }.bind(this), callbackScope: this });
                this.block = true;
            }.bind(this));
            this.topCont.add([this.fade]);
        }
        startGolfAction() {
            var fadeTween = this.tweens.add({
                targets: this.fade,
                alpha: 1,
                duration: 500,
                yoyo: true,
                repeat: 0,
                onYoyo: function () {
                    if (this.currentAnim < this.strongRes) {
                        this.startCont.visible = false;
                        this.flyCont.visible = true;
                        this.addAnimObject();
                        this.topCont.setDepth(100);
                        this.nextClip = true;
                    }
                    else {
                        this.flyCont.visible = false;
                        this.finishCont.visible = true;
                        this.addFinishObject();
                    }
                }.bind(this),
            });
        }
        addFinishObject() {
            if (this.finishAnimss)
                this.finishAnimss.destroy();
            var num = this.currentAnim;
            var sss = "";
            switch (this.strongRes) {
                case 1:
                    sss = "final_golf_fail1";
                    break;
                case 2:
                    sss = "final_golf_fail2";
                    break;
                case 3:
                    sss = "final_golf_win1";
                    break;
                case 4:
                    sss = "final_golf_win2";
                    break;
                case 5:
                    sss = "final_golf_win3";
                    break;
            }
            var allFramesFinish = this.anims.generateFrameNames(sss, {
                start: 1, end: 95, zeroPad: 4,
                prefix: sss, suffix: '.png'
            });
            if (this.finish_anim)
                this.finish_anim.destroy();
            this.finish_anim = this.anims.create({ key: sss, frames: allFramesFinish, repeat: 0, frameRate: 25 });
            this.finishAnimss = this.add.sprite(300, 300, sss);
            this.finishCont.add([this.finishAnimss]);
            switch (this.strongRes) {
                case 3:
                case 4:
                case 5:
                    this.sound.add("golf_pelota_cae").play();
                    break;
            }
            this.time.addEvent({ delay: 2500, callback: function () {
                    switch (this.strongRes) {
                        case 1:
                        case 2:
                            this.sound.add("derrota").play();
                            break;
                        case 3:
                        case 4:
                        case 5:
                            this.sound.add("victoria").play();
                            break;
                    }
                }.bind(this), callbackScope: this });
            this.time.addEvent({ delay: 500, callback: function () {
                    switch (this.strongRes) {
                        case 1:
                            this.finishAnimss.play("final_golf_fail1");
                            break;
                        case 2:
                            this.finishAnimss.play("final_golf_fail2");
                            break;
                        case 3:
                            this.finishAnimss.play("final_golf_win1");
                            break;
                        case 4:
                            this.finishAnimss.play("final_golf_win2");
                            break;
                        case 5:
                            this.finishAnimss.play("final_golf_win3");
                            break;
                    }
                }.bind(this), callbackScope: this });
            this.time.addEvent({ delay: 5000, callback: function () {
                    var fadeTween = this.tweens.add({
                        targets: this.fade,
                        alpha: 1,
                        duration: 500,
                        yoyo: true,
                        repeat: 0,
                        onYoyo: function () {
                            if (this.finishCount < 4) {
                                this.finishCount++;
                                this.startCont.visible = true;
                                this.finishCont.visible = false;
                                this.strongPanel.visible = true;
                                this.block = false;
                                this.currentAnim = 0;
                                this.pocoyo.setFrame("pocoyo0001.png");
                            }
                            else {
                                this.finishCount = 0;
                                this.scene.start('Gameover');
                            }
                        }.bind(this),
                    });
                }.bind(this), callbackScope: this });
        }
        addAnimObject() {
            if (this.animss)
                this.animss.destroy();
            var num = this.allAnims.indexOf(this.allAnims_current[this.currentAnim]);
            var sss = this.allAnims[num];
            var allFrames = this.anims.generateFrameNames(sss, {
                start: 1, end: this.allAnimsLen[num], zeroPad: 4,
                prefix: sss, suffix: '.png'
            });
            if (this.frame_anim)
                this.frame_anim.destroy();
            this.frame_anim = this.anims.create({ key: sss, frames: allFrames, repeat: 0, frameRate: 25 });
            this.animss = this.add.sprite(this.allAnimsPos[num][0], this.allAnimsPos[num][1], sss).setScale(1.1 * this.allAnimsScale[num], 1.1);
            this.flyCont.add([this.animss]);
            this.time.addEvent({ delay: 500, callback: function () {
                    this.animss.play(this.allAnims[this.allAnims.indexOf(this.allAnims_current[this.currentAnim])]);
                    this.sound.add(this.allAnimsSounds[this.allAnims.indexOf(this.allAnims_current[this.currentAnim])]).play();
                }.bind(this), callbackScope: this });
        }
        update() {
            if (this.nextClip && this.animss && this.animss.anims && this.animss.anims.currentFrame && this.animss.anims.currentFrame.progress == 1) {
                if (this.currentAnim < this.strongRes) {
                    this.nextClip = false;
                    this.currentAnim++;
                    this.startGolfAction();
                }
            }
        }
        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
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
                    Main.instance.scene.add('Gameover', src.GameOverScreen, false);
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
            this.load.on('progress', function (value) {
                this.ppp.scaleX = value;
                this.spin.rotation += 0.5;
            }.bind(this));
            this.load.image("cursor", "./assets/cursor.cur");
            this.load.image("white", "./assets/white.png");
            this.load.image("title_back", "./assets/back/title.png");
            this.load.image("green", "./assets/back/green.png");
            this.load.image("info_main", "./assets/back/info_main.png");
            this.load.image("golf", "./assets/back/golf.png");
            this.load.atlas('btnPlay', 'assets/btnPlay/ButtonPlay.png', 'assets/btnPlay/ButtonPlay.json');
            var allAnims = ["strongPanel",
                "pocoyo",
                "arbol",
                "cactus",
                "caja",
                "despertador",
                "elly",
                "escoba",
                "nube",
                "palmera",
                "pato",
                "trompeta_pelota",
                "pajaroto",
                "final_golf_fail1",
                "final_golf_fail2",
                "final_golf_win1",
                "final_golf_win2",
                "final_golf_win3"];
            for (var s in allAnims) {
                this.load.atlas(allAnims[s], 'assets/anims/' + allAnims[s] + '.png', 'assets/anims/' + allAnims[s] + '.json');
            }
            var allSounds = ["MUSIC_Intro",
                "MUSIC_Outro",
                locData["lang"] + "_MPjuegos_golf",
                "botonRO",
                "botonClick",
                "arbol",
                "cactus",
                "despertador",
                "golf_pelota_cae",
                "golpe",
                "nube",
                "trompeta",
                "trompetita",
                "cuac LIMPIO",
                "eli trompeta",
                "woo",
                "palmera",
                "pajaroto",
                "derrota",
                "victoria"];
            for (var s in allSounds) {
                this.load.audio(allSounds[s], [
                    'sounds/' + allSounds[s] + '.mp3',
                    'sounds/' + allSounds[s] + '.ogg'
                ]);
            }
        }
        create() {
            this.scene.start('Title');
            //this.scene.start('Gameplay', {tutor:false});
            //this.scene.start('Gameover');
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
            this.snd = this.sound.add("MUSIC_Intro", { loop: true });
            this.snd.play();
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
                if (this.snd)
                    this.snd.stop();
                this.scene.start('Gameplay', { tutor: true });
            }.bind(this));
            this.btnPlay.on('pointermove', function (pointer) {
                this.btnPlay.setFrame('ButtonPlay0002.png');
            }.bind(this));
        }
    }
    src.TitleScreen = TitleScreen;
})(src || (src = {}));

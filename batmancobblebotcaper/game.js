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
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                var _this = _super.call(this, Config.GW, Config.GH, Phaser.AUTO, Config.DOM_PARENT_ID, null) || this;
                _this.state.add(States.BOOT, Client.gsBoot, false);
                _this.state.add(States.PRELOADER, Client.gsPreloader, false);
                _this.state.add(States.MAINMENU, Client.gsMainMenu, false);
                _this.state.add(States.GAME, Client.gsGame, false);
                _this.state.add(States.INSTRUCTIONS, Client.gsInstructions, false);
                _this.state.add(States.CLIP1, Client.gsClip1, false);
                _this.state.add(States.CLIP2, Client.gsClip2, false);
                _this.state.add(States.LEVEL1A, Client.gslevel1a, false);
                _this.state.add(States.LEVEL1B, Client.gslevel1b, false);
                _this.state.add(States.LEVEL1C, Client.gslevel1c, false);
                _this.state.add(States.LEVEL2A, Client.gslevel2a, false);
                _this.state.add(States.CONTINUE, Client.gsContinue, false);
                _this.state.start(States.BOOT);
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
    Config.GW = 600;
    Config.GH = 400;
    Config.GSW = 600;
    Config.GSH = 400;
    Config.FPS = 12;
})(Config || (Config = {}));
var DB;
(function (DB) {
    DB.ITEMS = [
        { name: 'r', fr: 'red-item', sel: 'red-item-sel', sector: 'red-sector' },
        { name: 'g', fr: 'green-item', sel: 'green-item-sel', sector: 'green-sector' },
        { name: 'b', fr: 'blue-item', sel: 'blue-item-sel', sector: 'blue-sector' }
    ];
})(DB || (DB = {}));
var GlobalVar;
(function (GlobalVar) {
    GlobalVar.batarang = 0;
    GlobalVar.life = 5;
    GlobalVar.score = 0;
    GlobalVar.levelContinue = '';
    GlobalVar.bRight = 0;
    GlobalVar.bleft = 0;
})(GlobalVar || (GlobalVar = {}));
var Params;
(function (Params) {
    Params.isMacOS = false;
})(Params || (Params = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBatarang = (function (_super) {
            __extends(goBatarang, _super);
            function goBatarang(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.dest = false;
                _this.game.physics.p2.enable(_this);
                _this.body.setCircle(8);
                _this.body.fixedRotation = true;
                _this.body.data.shapes[0].sensor = true;
                _this.body.kinematic = true;
                _this.body.data.gravityScale = 0;
                _this.data.name = 'firebatarang';
                _this.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                _this.body.collides(GlobalVar.enemyCollisionGroup, GlobalVar.worldCollisionGroup);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'gameObjectAtlas', 'batarang0001');
                _this.sprite.animations.add('play', Phaser.Animation.generateFrameNames('batarang', 1, 5, '', 4), 25, true);
                _this.addChild(_this.sprite);
                _this.sprite.play('play');
                _this.sprite.anchor.set(0.5);
                _this.sprite.scale.set(0.5);
                return _this;
            }
            goBatarang.prototype.useEvent = function () {
            };
            goBatarang.prototype.attack = function () {
            };
            goBatarang.prototype.hide = function () {
                this.dest = true;
                this.body.velocity.x = 0;
                this.body.clearShapes();
                this.visible = false;
            };
            goBatarang.prototype.logicUpdate = function (posX, posY) {
                if (!this.dest) {
                    if (uMath.distance(this.x, this.y, posX, posY) > 600) {
                        this.hide();
                    }
                }
            };
            return goBatarang;
        }(Phaser.Sprite));
        Client.goBatarang = goBatarang;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBatman = (function (_super) {
            __extends(goBatman, _super);
            function goBatman(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.speed = 400;
                _this.walk = true;
                _this.yAxis = p2.vec2.fromValues(0, 1);
                _this.health = 10;
                _this.death = false;
                _this.attack = false;
                _this.pain = false;
                _this.noPain = false;
                _this.attackFrame = [54, 58, 67, 76, 81, 87, 96, 103, 112, 118, 127];
                _this.onAttack = new Phaser.Signal();
                _this.onBatarang = new Phaser.Signal();
                _this.punchPress = false;
                _this.kickPress = false;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 0, 0);
                _this.body.fixedRotation = true;
                _this.data.name = 'player';
                _this.body.setCollisionGroup(GlobalVar.playerCollisionGroup);
                _this.body.collides([GlobalVar.playerCollisionGroup, GlobalVar.worldCollisionGroup]);
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'batmanAtlas', 'batman0001');
                _this.sprite.animations.add('stand', Phaser.Animation.generateFrameNames('batman', 1, 9, '', 4), 25, true);
                _this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('batman', 10, 21, '', 4), 25, false).onComplete.add(_this.run, _this);
                _this.sprite.animations.add('run', Phaser.Animation.generateFrameNames('batman', 22, 31, '', 4), 25, true);
                _this.sprite.animations.add('jump', Phaser.Animation.generateFrameNames('batman', 32, 35, '', 4), 25, false);
                _this.sprite.animations.add('fall', Phaser.Animation.generateFrameNames('batman', 36, 40, '', 4), 25, false);
                _this.sprite.animations.add('glide', Phaser.Animation.generateFrameNames('batman', 41, 42, '', 4), 25, false);
                _this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('batman', 50, 51, '', 4), 25, false);
                _this.sprite.animations.add('duck', Phaser.Animation.generateFrameNames('batman', 45, 49, '', 4), 25, false);
                _this.sprite.animations.add('punch', Phaser.Animation.generateFrameNames('batman', 52, 62, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('hightpunch', Phaser.Animation.generateFrameNames('batman', 63, 73, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('lowpunch', Phaser.Animation.generateFrameNames('batman', 74, 82, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('jumppunch', Phaser.Animation.generateFrameNames('batman', 83, 91, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('kick', Phaser.Animation.generateFrameNames('batman', 92, 99, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('hightkick', Phaser.Animation.generateFrameNames('batman', 100, 107, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('lowkick', Phaser.Animation.generateFrameNames('batman', 108, 122, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('jumpkick', Phaser.Animation.generateFrameNames('batman', 123, 132, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('hurt', Phaser.Animation.generateFrameNames('batman', 225, 235, '', 4), 25, false).onComplete.add(_this.completeHurt, _this);
                _this.sprite.animations.add('electro', Phaser.Animation.generateFrameNames('batman', 236, 256, '', 4), 25, false).onComplete.add(_this.completeElectro, _this);
                _this.sprite.animations.add('hurt2', Phaser.Animation.generateFrameNames('batman', 208, 224, '', 4), 25, false).onComplete.add(_this.completeHurt, _this);
                _this.sprite.animations.add('die', Phaser.Animation.generateFrameNames('batman', 257, 279, '', 4), 25, false);
                _this.sprite.animations.add('batarang', Phaser.Animation.generateFrameNames('batman', 133, 141, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('duckbatarang', Phaser.Animation.generateFrameNames('batman', 142, 153, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.animations.add('jumpbatarang', Phaser.Animation.generateFrameNames('batman', 154, 160, '', 4), 25, false).onComplete.add(_this.completeAttack, _this);
                _this.sprite.anchor.set(0.5, 0.68);
                _this.addChild(_this.sprite);
                _this.sprite.play('stand');
                return _this;
            }
            goBatman.prototype.completeHurt = function () {
                this.pain = false;
            };
            goBatman.prototype.completeElectro = function () {
                this.pain = false;
                this.noPain = false;
            };
            goBatman.prototype.moveLeft = function () {
                if (!this.attack && !this.pain) {
                    if (this.body.x > GlobalVar.bleft + 30) {
                        this.body.moveLeft(this.speed);
                    }
                    else {
                        this.body.velocity.x = 0;
                    }
                    this.fWalkToRun();
                }
            };
            goBatman.prototype.seeUp = function () {
                if (!this.attack && !this.pain) {
                    if (this.sprite.animations.currentAnim.name != 'up') {
                        if (this.checkIfCanJump()) {
                            this.body.velocity.x = 0;
                            this.sprite.play('up');
                        }
                    }
                }
            };
            goBatman.prototype.punch = function () {
                if (!this.pain) {
                    if (!this.punchPress) {
                        this.sprite.animations.currentAnim.frame = 0;
                    }
                }
                this.punchPress = true;
                if (!this.attack && !this.pain) {
                    if (this.checkIfCanJump()) {
                        if (this.sprite.animations.currentAnim.name == 'up') {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('hightpunch');
                        }
                        else if (this.sprite.animations.currentAnim.name == 'duck') {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('lowpunch');
                        }
                        else {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('punch');
                        }
                    }
                    else {
                        if (this.sprite.animations.currentAnim.name != 'glide') {
                            this.attack = true;
                            this.sprite.play('jumppunch');
                        }
                    }
                }
            };
            goBatman.prototype.punchButtonUp = function () {
                this.punchPress = false;
            };
            goBatman.prototype.kick = function () {
                if (!this.attack && !this.pain) {
                    if (this.checkIfCanJump()) {
                        if (this.sprite.animations.currentAnim.name == 'up') {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('hightkick');
                        }
                        else if (this.sprite.animations.currentAnim.name == 'duck') {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('lowkick');
                        }
                        else {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('kick');
                        }
                    }
                    else {
                        if (this.sprite.animations.currentAnim.name != 'glide') {
                            this.attack = true;
                            this.sprite.play('jumpkick');
                        }
                    }
                }
            };
            goBatman.prototype.batarang = function () {
                var e = { y: 0 };
                if (!this.attack && !this.pain) {
                    if (this.checkIfCanJump()) {
                        if (this.sprite.animations.currentAnim.name == 'up') {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('batarang');
                            e.y = 50;
                            this.onBatarang.dispatch(e);
                        }
                        else if (this.sprite.animations.currentAnim.name == 'duck') {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('duckbatarang');
                            e.y = 20;
                            this.onBatarang.dispatch(e);
                        }
                        else {
                            this.body.velocity.x = 0;
                            this.attack = true;
                            this.sprite.play('batarang');
                            e.y = 50;
                            this.onBatarang.dispatch(e);
                        }
                    }
                    else {
                        if (this.sprite.animations.currentAnim.name != 'glide') {
                            this.attack = true;
                            this.sprite.play('jumpbatarang');
                            e.y = 50;
                            this.onBatarang.dispatch(e);
                        }
                    }
                }
            };
            goBatman.prototype.completeAttack = function () {
                this.attack = false;
            };
            goBatman.prototype.sitDown = function () {
                if (!this.attack && !this.pain) {
                    if (this.sprite.animations.currentAnim.name != 'duck') {
                        if (this.checkIfCanJump()) {
                            this.body.velocity.x = 0;
                            this.sprite.play('duck');
                        }
                    }
                }
            };
            goBatman.prototype.run = function () {
                if (this.sprite.animations.currentAnim.name != 'run') {
                    this.sprite.play('run');
                }
            };
            goBatman.prototype.fWalkToRun = function () {
                if (this.checkIfCanJump()) {
                    if (this.walk) {
                        if (this.sprite.animations.currentAnim.name != 'walk') {
                            if (this.sprite.animations.currentAnim.name != 'run') {
                                this.sprite.play('walk');
                            }
                        }
                        this.walk = false;
                    }
                    else {
                        this.run();
                    }
                }
            };
            goBatman.prototype.moveRight = function () {
                if (!this.attack && !this.pain) {
                    if (this.body.x < GlobalVar.bRight - 30) {
                        this.body.moveRight(this.speed);
                    }
                    else {
                        this.body.velocity.x = 0;
                    }
                    this.fWalkToRun();
                }
            };
            goBatman.prototype.stopMove = function () {
                if (!this.attack && !this.pain) {
                    this.body.velocity.x = 0;
                    this.walk = true;
                    if (this.checkIfCanJump()) {
                        if (this.sprite.animations.currentAnim.name != 'stand') {
                            this.sprite.play('stand');
                        }
                    }
                }
            };
            goBatman.prototype.checkIfCanJump = function () {
                var result = false;
                for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
                    var c = this.game.physics.p2.world.narrowphase.contactEquations[i];
                    if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
                        var d = p2.vec2.dot(c.normalA, this.yAxis);
                        if (c.bodyA === this.body.data) {
                            d *= -1;
                        }
                        if (d > 0.5) {
                            result = true;
                        }
                    }
                }
                return result;
            };
            goBatman.prototype.jump = function () {
                if (!this.attack && !this.pain) {
                    if (this.checkIfCanJump()) {
                        SndMng.sfxPlay(SndMng.SFX_JUMP);
                        this.body.velocity.y = -840;
                        if (this.sprite.animations.currentAnim.name != 'jump') {
                            this.sprite.play('jump');
                        }
                    }
                    else {
                        if (this.body.velocity.y > 0) {
                            this.body.velocity.y = 45;
                            if (this.sprite.animations.currentAnim.name != 'glide') {
                                this.sprite.play('glide');
                            }
                        }
                    }
                }
            };
            goBatman.prototype.hurt = function (e) {
                if (e === void 0) { e = ''; }
                if (!this.pain && !this.noPain) {
                    if (this.health > 1) {
                        if (this.tween) {
                            this.tween = null;
                            this.sprite.alpha = 1;
                        }
                        if (e == 'electro') {
                            SndMng.sfxPlay(SndMng.SFX_ELECTRO);
                            this.sprite.play('electro');
                        }
                        else {
                            if (this.checkIfCanJump()) {
                                this.sprite.play('hurt');
                                this.body.velocity.x = 0;
                                SndMng.sfxPlay(SndMng.SFX_KICK);
                                this.tween = this.game.add.tween(this.sprite).to({ alpha: 0 }, 30, Phaser.Easing.Linear.None, true, 30, 18, true).onComplete.addOnce(this.nopainComplete, this);
                            }
                            else {
                                this.sprite.play('hurt2');
                                SndMng.sfxPlay(SndMng.SFX_KICK);
                                this.tween = this.game.add.tween(this.sprite).to({ alpha: 0 }, 30, Phaser.Easing.Linear.None, true, 30, 18, true).onComplete.addOnce(this.nopainComplete, this);
                            }
                        }
                        this.health--;
                        this.attack = false;
                        this.pain = true;
                        this.noPain = true;
                    }
                    else {
                        this.pain = true;
                        this.health--;
                        this.sprite.play('die');
                        console.log('сменили йопта');
                    }
                }
            };
            goBatman.prototype.nopainComplete = function () {
                this.noPain = false;
            };
            goBatman.prototype.update = function () {
                if (!this.attack && !this.pain) {
                    if (this.body.velocity.y > 50) {
                        if (this.sprite.animations.currentAnim.name != 'fall') {
                            this.sprite.play('fall');
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.attackFrame.length; i++) {
                        if (this.sprite.animations.currentAnim.frame == this.attackFrame[i]) {
                            if (this.sprite.animations.currentAnim.name == 'lowkick') {
                                this.onAttack.dispatch('low');
                            }
                            else if (this.sprite.animations.currentAnim.name == 'hightpunch') {
                                this.onAttack.dispatch('low');
                            }
                            else {
                                this.onAttack.dispatch('norm');
                            }
                        }
                    }
                }
            };
            return goBatman;
        }(Phaser.Sprite));
        Client.goBatman = goBatman;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goCan = (function (_super) {
            __extends(goCan, _super);
            function goCan(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 50, 45, 10);
                _this.body.fixedRotation = true;
                _this.body.data.shapes[0].sensor = true;
                _this.body.static = true;
                _this.data.name = 'can';
                _this.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                _this.body.collides([GlobalVar.playerCollisionGroup]);
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'level1bAtlas', 'can0001');
                _this.sprite.animations.add('touch', Phaser.Animation.generateFrameNames('can', 1, 7, '', 4), 25, false);
                _this.addChild(_this.sprite);
                return _this;
            }
            goCan.prototype.useEvent = function () {
                this.sprite.play('touch');
                this.body.clearShapes();
            };
            goCan.prototype.attack = function () {
            };
            goCan.prototype.logicUpdate = function (posX, posY) {
            };
            return goCan;
        }(Phaser.Sprite));
        Client.goCan = goCan;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goEBiker = (function (_super) {
            __extends(goEBiker, _super);
            function goEBiker(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.sStand = 'stand';
                _this.sIdle = 'idle';
                _this.sDie = 'die';
                _this.state = _this.sStand;
                _this.healthPotion = 1;
                _this.onAttack = new Phaser.Signal();
                _this.speed = 300;
                _this.death = false;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 10, -50);
                _this.body.fixedRotation = true;
                _this.body.setCollisionGroup(GlobalVar.enemyCollisionGroup);
                _this.body.collides([GlobalVar.worldCollisionGroup]);
                _this.data.name = 'enemy';
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'enemyAtlas', 'enemy_biker0001');
                _this.sprite.animations.add(_this.sStand, Phaser.Animation.generateFrameNames('enemy_biker', 1, 4, '', 4), 25, true);
                _this.sprite.animations.add(_this.sIdle, Phaser.Animation.generateFrameNames('enemy_biker', 1, 4, '', 4), 25, true);
                _this.sprite.animations.add(_this.sDie, Phaser.Animation.generateFrameNames('enemy_biker', 5, 11, '', 4), 25, false).onComplete.add(_this.Die, _this);
                ;
                _this.sprite.anchor.set(0.2, 0.9);
                _this.sprite.play(_this.sStand);
                _this.addChild(_this.sprite);
                return _this;
            }
            goEBiker.prototype.Die = function () {
                this.game.add.tween(this.sprite).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None, true, 50, 11, true).onComplete.addOnce(this.unvisible, this);
            };
            goEBiker.prototype.unvisible = function () {
                this.death = true;
                this.sprite.visible = false;
                this.data.name = '';
            };
            goEBiker.prototype.stand = function () {
            };
            goEBiker.prototype.useEvent = function () {
                {
                    if (this.state != this.sDie) {
                        SndMng.sfxPlay(SndMng.SFX_DOWN);
                        SndMng.sfxPlay(SndMng.SFX_DIE1);
                        this.sprite.play(this.sDie);
                        this.state = this.sDie;
                        this.body.velocity.x = 0;
                        GlobalVar.score += 100;
                    }
                }
            };
            goEBiker.prototype.attack = function (posX, posY, kick) {
                if (this.sprite.animations.currentAnim.name != this.sDie) {
                    if (this.distanceToPlayer < 120) {
                        this.sprite.play(this.sDie);
                        this.state = this.sDie;
                        this.body.velocity.x = 0;
                        SndMng.sfxPlay(SndMng.SFX_BIKE_DIE);
                    }
                }
            };
            goEBiker.prototype.activate = function (posX, posY) {
                SndMng.sfxPlay(SndMng.SFX_BIKE);
                this.sprite.play(this.sIdle);
                this.state = this.sIdle;
            };
            goEBiker.prototype.logicUpdate = function (posX, posY) {
                this.distanceToPlayer = uMath.distance(this.x, this.y, posX, this.y);
                if (this.state == this.sStand) {
                    if (this.distanceToPlayer < 1000) {
                        this.activate(posX, posY);
                    }
                }
                else if (this.state == this.sIdle) {
                    this.body.velocity.x = 600;
                    var distanceToAttack = uMath.distance(this.x, this.y, posX, posY);
                    if (distanceToAttack < 80) {
                        this.onAttack.dispatch();
                    }
                    if (this.x > posX + 1000) {
                        SndMng.sfxPlay(SndMng.SFX_BIKE);
                        this.body.x = posX - 1000;
                    }
                }
                else if (this.state == this.sDie) {
                    if (this.x > posX + 1500) {
                        SndMng.sfxPlay(SndMng.SFX_BIKE);
                        this.data.name = 'enemy';
                        this.body.x = posX - 1000;
                        this.body.fixedRotation = true;
                        this.body.setCollisionGroup(GlobalVar.enemyCollisionGroup);
                        this.body.collides([GlobalVar.worldCollisionGroup]);
                        this.sprite.play(this.sIdle);
                        this.state = this.sIdle;
                        this.sprite.visible = true;
                        this.sprite.alpha = 1;
                        this.death = false;
                    }
                }
            };
            return goEBiker;
        }(Phaser.Sprite));
        Client.goEBiker = goEBiker;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goEBlackGoon = (function (_super) {
            __extends(goEBlackGoon, _super);
            function goEBlackGoon(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.sStand = 'stand';
                _this.sIdle = 'idle';
                _this.sWalk = 'walk';
                _this.sRetreat = 'retreat';
                _this.sAttack = 'attack';
                _this.sHurt = 'hurt';
                _this.sFall = 'fall';
                _this.sDie = 'die';
                _this.allState = [_this.sIdle, _this.sAttack, _this.sWalk, _this.sRetreat];
                _this.state = _this.sStand;
                _this.oldstate = _this.sStand;
                _this.polRetreat = true;
                _this.startX = 0;
                _this.retreatX = 0;
                _this.idleTime = 100;
                _this.healthPotion = 3;
                _this.onAttack = new Phaser.Signal();
                _this.speed = 300;
                _this.death = false;
                _this.startFrameFromAtlas = 'enemy_black_goon0001';
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 10, -50);
                _this.body.fixedRotation = true;
                _this.data.name = 'enemy';
                _this.body.setCollisionGroup(GlobalVar.enemyCollisionGroup);
                _this.body.collides([GlobalVar.worldCollisionGroup]);
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'enemyAtlas', 'enemy_black_goon0001');
                _this.sprite.animations.add(_this.sStand, Phaser.Animation.generateFrameNames('enemy_black_goon', 1, 1, '', 4), 25, true);
                _this.sprite.animations.add(_this.sIdle, Phaser.Animation.generateFrameNames('enemy_black_goon', 1, 1, '', 4), 25, true);
                _this.sprite.animations.add(_this.sWalk, Phaser.Animation.generateFrameNames('enemy_black_goon', 2, 12, '', 4), 25, true);
                _this.sprite.animations.add(_this.sRetreat, Phaser.Animation.generateFrameNames('enemy_black_goon', 13, 23, '', 4), 25, true);
                _this.sprite.animations.add(_this.sAttack, Phaser.Animation.generateFrameNames('enemy_black_goon', 24, 33, '', 4), 25, false).onComplete.add(_this.randomState, _this);
                _this.sprite.animations.add(_this.sHurt, Phaser.Animation.generateFrameNames('enemy_black_goon', 34, 39, '', 4), 25, false).onComplete.add(_this.stand, _this);
                _this.sprite.animations.add(_this.sFall, Phaser.Animation.generateFrameNames('enemy_black_goon', 40, 47, '', 4), 12, false).onComplete.add(_this.stand, _this);
                _this.sprite.animations.add(_this.sDie, Phaser.Animation.generateFrameNames('enemy_black_goon', 48, 55, '', 4), 25, false).onComplete.add(_this.Die, _this);
                ;
                _this.sprite.anchor.set(0.5, 0.95);
                _this.sprite.play(_this.sStand);
                _this.addChild(_this.sprite);
                return _this;
            }
            goEBlackGoon.prototype.Die = function () {
                this.game.add.tween(this.sprite).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None, true, 50, 11, true).onComplete.addOnce(this.unvisible, this);
            };
            goEBlackGoon.prototype.unvisible = function () {
                this.death = true;
                this.sprite.visible = false;
                this.body.clearShapes();
            };
            goEBlackGoon.prototype.stand = function () {
                this.randomState();
            };
            goEBlackGoon.prototype.randomState = function () {
                this.body.velocity.x = 0;
                var flag = false;
                while (!flag) {
                    var randomSt = this.allState[uMath.random(0, this.allState.length - 1)];
                    if (this.oldstate != randomSt) {
                        flag = true;
                        if (randomSt == this.sRetreat) {
                            if (this.distanceToPlayer > 100) {
                                flag = false;
                            }
                        }
                    }
                }
                this.oldstate = this.state;
                switch (randomSt) {
                    case this.sWalk: {
                        this.sprite.play(this.sWalk);
                        this.state = this.sWalk;
                        break;
                    }
                    case this.sAttack: {
                        this.sprite.play(this.sAttack);
                        this.state = this.sAttack;
                        break;
                    }
                    case this.sRetreat: {
                        this.sprite.play(this.sRetreat);
                        this.state = this.sRetreat;
                        if (uMath.random(0, 50) < 20) {
                            this.scale.x = -this.scale.x;
                        }
                        if (this.scale.x > 0) {
                            this.retreatX = this.x - 150;
                            this.polRetreat = true;
                        }
                        else {
                            this.retreatX = this.x + 150;
                            this.polRetreat = false;
                        }
                        break;
                    }
                    case this.sIdle: {
                        this.sprite.play(this.sIdle);
                        this.state = this.sIdle;
                        this.idleTime = 50;
                        break;
                    }
                }
            };
            goEBlackGoon.prototype.useEvent = function () {
                if (this.state != this.sHurt && this.state != this.sFall) {
                    this.healthPotion--;
                    if (this.healthPotion >= 0) {
                        this.sprite.play(this.sHurt);
                        this.state = this.sHurt;
                        this.body.velocity.x = 0;
                    }
                    else {
                        if (this.state != this.sDie) {
                            SndMng.sfxPlay(SndMng.SFX_DOWN);
                            SndMng.sfxPlay(SndMng.SFX_DIE1);
                            this.sprite.play(this.sDie);
                            this.state = this.sDie;
                            this.body.velocity.x = 0;
                            GlobalVar.score += 100;
                        }
                    }
                }
            };
            goEBlackGoon.prototype.attack = function (posX, posY, kick) {
                if (this.state != this.sHurt && this.state != this.sFall) {
                    if (this.distanceToPlayer < 120) {
                        this.healthPotion--;
                        if (this.healthPotion >= 0) {
                            SndMng.sfxPlay(SndMng.SFX_PUNCH);
                            if (kick == 'low') {
                                this.sprite.play(this.sFall);
                                this.state = this.sFall;
                                this.body.velocity.x = -this.scale.x * 500;
                                this.body.velocity.y = -500;
                            }
                            else {
                                this.sprite.play(this.sHurt);
                                this.state = this.sHurt;
                            }
                            this.body.velocity.x = -this.scale.x * 100;
                        }
                        else {
                            if (this.state != this.sDie) {
                                SndMng.sfxPlay(SndMng.SFX_DOWN);
                                SndMng.sfxPlay(SndMng.SFX_DIE1);
                                this.sprite.play(this.sDie);
                                this.state = this.sDie;
                                this.body.velocity.x = 0;
                                GlobalVar.score += 100;
                            }
                        }
                    }
                }
            };
            goEBlackGoon.prototype.activate = function (posX, posY) {
                this.sprite.play(this.sWalk);
                this.state = this.sWalk;
            };
            goEBlackGoon.prototype.logicUpdate = function (posX, posY) {
                this.distanceToPlayer = uMath.distance(this.x, this.y, posX, this.y);
                if (this.state == this.sStand) {
                    if (this.distanceToPlayer < 600) {
                        this.activate(posX, posY);
                    }
                }
                else if (this.state == this.sWalk) {
                    if (posX > this.x) {
                        this.scale.x = 1;
                    }
                    else {
                        this.scale.x = -1;
                    }
                    if (this.distanceToPlayer < 80) {
                        this.body.velocity.x = 0;
                        this.randomState();
                    }
                    else {
                        if (posX > this.x) {
                            this.body.velocity.x = this.speed;
                        }
                        else {
                            this.body.velocity.x = -this.speed;
                        }
                    }
                }
                else if (this.state == this.sRetreat) {
                    if (this.polRetreat) {
                        if (this.x < this.retreatX) {
                            this.body.velocity.x = 0;
                            this.randomState();
                        }
                        else {
                            this.body.velocity.x = -this.speed;
                        }
                    }
                    else {
                        if (this.x > this.retreatX) {
                            this.body.velocity.x = 0;
                            this.randomState();
                        }
                        else {
                            this.body.velocity.x = this.speed;
                        }
                    }
                }
                else if (this.state == this.sIdle) {
                    if (this.idleTime > 0) {
                        this.idleTime--;
                    }
                    else {
                        this.randomState();
                    }
                }
                if (this.sprite.animations.currentAnim.frame == (this.sprite.animations.frameData.getFrameByName(this.startFrameFromAtlas).index + 27)) {
                    var disttoattack = uMath.distance(this.x, this.y, posX, posY);
                    if (disttoattack < 120) {
                        SndMng.sfxPlay(SndMng.SFX_BITA);
                        this.onAttack.dispatch();
                    }
                }
            };
            return goEBlackGoon;
        }(Phaser.Sprite));
        Client.goEBlackGoon = goEBlackGoon;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goEBoss1 = (function (_super) {
            __extends(goEBoss1, _super);
            function goEBoss1(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.sStand = 'stand';
                _this.sIdle = 'idle';
                _this.sWalk = 'walk';
                _this.sAttack = 'attack';
                _this.sAttack2 = 'attack2';
                _this.sHurt = 'hurt';
                _this.sFall = 'fall';
                _this.sDie = 'die';
                _this.sJump = 'jump';
                _this.sBlock = 'block';
                _this.allState = [_this.sAttack, _this.sWalk];
                _this.state = _this.sStand;
                _this.oldstate = _this.sStand;
                _this.polRetreat = true;
                _this.startX = 0;
                _this.healthPotion = 25;
                _this.onAttack = new Phaser.Signal();
                _this.speed = 150;
                _this.death = false;
                _this.fireBatig = 0;
                _this.startFrameFromAtlas = 'boss0001';
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 10, -50);
                _this.body.fixedRotation = true;
                _this.data.name = 'enemy';
                _this.body.setCollisionGroup(GlobalVar.enemyCollisionGroup);
                _this.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.enemyCollisionGroup]);
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'bossAtlas1', 'boss0001');
                _this.sprite.animations.add(_this.sStand, Phaser.Animation.generateFrameNames('boss', 1, 21, '', 4), 25, true);
                _this.sprite.animations.add(_this.sIdle, Phaser.Animation.generateFrameNames('boss', 1, 21, '', 4), 25, true);
                _this.sprite.animations.add(_this.sWalk, Phaser.Animation.generateFrameNames('boss', 22, 29, '', 4), 25, true);
                _this.sprite.animations.add(_this.sAttack, Phaser.Animation.generateFrameNames('boss', 63, 72, '', 4), 25, false).onComplete.add(_this.jumpBack, _this);
                _this.sprite.animations.add(_this.sAttack2, Phaser.Animation.generateFrameNames('boss', 73, 95, '', 4), 25, false).onComplete.add(_this.randomState, _this);
                _this.sprite.animations.add(_this.sHurt, Phaser.Animation.generateFrameNames('boss', 96, 101, '', 4), 25, false).onComplete.add(_this.stand, _this);
                _this.sprite.animations.add(_this.sFall, Phaser.Animation.generateFrameNames('boss', 102, 122, '', 4), 25, false).onComplete.add(_this.stand, _this);
                _this.sprite.animations.add(_this.sDie, Phaser.Animation.generateFrameNames('boss', 123, 152, '', 4), 25, false).onComplete.add(_this.Die, _this);
                ;
                _this.sprite.animations.add(_this.sJump, Phaser.Animation.generateFrameNames('boss', 39, 48, '', 4), 25, false).onComplete.add(_this.randomState, _this);
                ;
                _this.sprite.animations.add(_this.sBlock, Phaser.Animation.generateFrameNames('boss', 49, 62, '', 4), 25, false).onComplete.add(_this.randomState, _this);
                ;
                _this.sprite.anchor.set(0.43, 0.58);
                _this.sprite.play(_this.sStand);
                _this.addChild(_this.sprite);
                return _this;
            }
            goEBoss1.prototype.jumpBack = function () {
                this.body.velocity.x = -this.scale.x * 300;
                this.body.velocity.y = -300;
                this.sprite.play(this.sJump);
                SndMng.sfxPlay(SndMng.SFX_HIHI);
            };
            goEBoss1.prototype.Die = function () {
                this.game.add.tween(this.sprite).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.unvisible, this);
            };
            goEBoss1.prototype.unvisible = function () {
                this.death = true;
                this.sprite.visible = false;
            };
            goEBoss1.prototype.stand = function () {
                this.randomState();
            };
            goEBoss1.prototype.randomState = function () {
                this.body.velocity.x = 0;
                var flag = false;
                while (!flag) {
                    flag = false;
                    var randomSt = this.allState[uMath.random(0, this.allState.length - 1)];
                    if (this.oldstate != randomSt) {
                        flag = true;
                    }
                }
                this.oldstate = this.state;
                switch (randomSt) {
                    case this.sWalk: {
                        this.sprite.play(this.sWalk);
                        this.state = this.sWalk;
                        break;
                    }
                    case this.sAttack: {
                        if (this.distanceToPlayer <= 80 && this.pPosY > 0) {
                            this.sprite.play(this.sAttack);
                            this.state = this.sAttack;
                        }
                        else {
                            this.sprite.play(this.sWalk);
                            this.state = this.sWalk;
                        }
                        break;
                    }
                }
            };
            goEBoss1.prototype.useEvent = function () {
                var flag = true;
                if (uMath.random(0, 100) > 10) {
                    this.sprite.play(this.sBlock);
                    this.state = this.sBlock;
                    this.body.velocity.x = 0;
                    SndMng.sfxPlay(SndMng.SFX_METAL1);
                }
                else if (this.state != this.sHurt && this.state != this.sFall) {
                    flag = false;
                    this.healthPotion--;
                    if (this.healthPotion >= 0) {
                        this.sprite.play(this.sHurt);
                        this.state = this.sHurt;
                        this.body.velocity.x = 0;
                    }
                    else {
                        if (this.state != this.sDie) {
                            this.body.clearShapes();
                            SndMng.sfxPlay(SndMng.SFX_DOWN);
                            SndMng.sfxPlay(SndMng.SFX_DIE1);
                            this.sprite.play(this.sDie);
                            this.state = this.sDie;
                            this.body.velocity.x = 0;
                            GlobalVar.score += 100;
                        }
                    }
                }
                return flag;
            };
            goEBoss1.prototype.attack = function (posX, posY, kick) {
                if (this.state != this.sHurt && this.state != this.sFall) {
                    if (this.distanceToPlayer < 120) {
                        this.healthPotion--;
                        if (this.healthPotion >= 0) {
                            SndMng.sfxPlay(SndMng.SFX_PUNCH);
                            if (kick == 'low') {
                                this.sprite.play(this.sFall);
                                this.state = this.sFall;
                                this.body.velocity.x = -this.scale.x * 500;
                                this.body.velocity.y = -500;
                            }
                            else {
                                this.sprite.play(this.sHurt);
                                this.state = this.sHurt;
                            }
                            this.body.velocity.x = -this.scale.x * 100;
                        }
                        else {
                            if (this.state != this.sDie) {
                                SndMng.sfxPlay(SndMng.SFX_EXPLODE);
                                this.sprite.play(this.sDie);
                                this.state = this.sDie;
                                this.body.velocity.x = 0;
                                GlobalVar.score += 500;
                            }
                        }
                    }
                }
            };
            goEBoss1.prototype.activate = function (posX, posY) {
                this.sprite.play(this.sWalk);
                this.state = this.sWalk;
            };
            goEBoss1.prototype.logicUpdate = function (posX, posY) {
                this.pPosX = posX;
                this.pPosY = posY;
                this.distanceToPlayer = uMath.distance(this.x, this.y, posX, this.y);
                if (this.state == this.sStand) {
                    if (this.distanceToPlayer < 600) {
                        this.activate(posX, posY);
                    }
                }
                else if (this.state == this.sWalk) {
                    if (posY > 0) {
                        if (posX > this.x) {
                            this.scale.x = 1;
                        }
                        else {
                            this.scale.x = -1;
                        }
                    }
                    if (this.fireBatig < 3 && uMath.distance(this.x, this.y, posX, posY) < 350 && posY > 0) {
                        if (this.state != this.sAttack2) {
                            this.sprite.play(this.sAttack2);
                            this.state = this.sAttack2;
                            this.body.velocity.x = 0;
                            this.fireBatig++;
                            SndMng.sfxPlay(SndMng.SFX_BATIG);
                        }
                    }
                    else {
                        if (this.distanceToPlayer < 80 && posY > 0) {
                            this.body.velocity.x = 0;
                            this.randomState();
                        }
                        else {
                            if (this.distanceToPlayer > 350) {
                                this.fireBatig = 0;
                            }
                            this.body.velocity.x = this.scale.x * this.speed;
                        }
                    }
                }
                if (this.sprite.animations.currentAnim.frame == 64) {
                    var disttoattack = uMath.distance(this.x, this.y, posX, posY);
                    if (disttoattack < 220) {
                        if (posY > 0) {
                            SndMng.sfxPlay(SndMng.SFX_BITA);
                            this.onAttack.dispatch();
                        }
                    }
                }
                if (this.sprite.animations.currentAnim.frame == 81) {
                    if (posY > 0) {
                        var e = 'electro';
                        this.onAttack.dispatch(e);
                        this.sprite.animations.currentAnim.frame = 10;
                        this.sprite.animations.currentAnim.stop();
                        this.game.add.tween(this.sprite).to({ alpha: 1 }, 1, Phaser.Easing.Linear.None, true, 300).onComplete.addOnce(this.continueAttack, this);
                    }
                }
            };
            goEBoss1.prototype.continueAttack = function () {
                this.sprite.animations.currentAnim.play();
                this.sprite.animations.currentAnim.frame = 10;
                console.log('норм так');
            };
            return goEBoss1;
        }(Phaser.Sprite));
        Client.goEBoss1 = goEBoss1;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goEWhiteGoon = (function (_super) {
            __extends(goEWhiteGoon, _super);
            function goEWhiteGoon(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.sStand = 'stand';
                _this.sIdle = 'idle';
                _this.sWalk = 'walk';
                _this.sRetreat = 'retreat';
                _this.sAttack = 'attack';
                _this.sHurt = 'hurt';
                _this.sFall = 'fall';
                _this.sDie = 'die';
                _this.allState = [_this.sIdle, _this.sAttack, _this.sWalk, _this.sRetreat];
                _this.state = _this.sStand;
                _this.oldstate = _this.sStand;
                _this.polRetreat = true;
                _this.startX = 0;
                _this.retreatX = 0;
                _this.idleTime = 100;
                _this.healthPotion = 3;
                _this.onAttack = new Phaser.Signal();
                _this.speed = 300;
                _this.startFrameFromAtlas = 'enemy_white_goon0001';
                _this.death = false;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 10, -50);
                _this.body.fixedRotation = true;
                _this.body.setCollisionGroup(GlobalVar.enemyCollisionGroup);
                _this.body.collides([GlobalVar.worldCollisionGroup]);
                _this.data.name = 'enemy';
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'enemyAtlas', _this.startFrameFromAtlas);
                _this.sprite.animations.add(_this.sStand, Phaser.Animation.generateFrameNames('enemy_white_goon', 1, 1, '', 4), 25, true);
                _this.sprite.animations.add(_this.sIdle, Phaser.Animation.generateFrameNames('enemy_white_goon', 1, 1, '', 4), 25, true);
                _this.sprite.animations.add(_this.sWalk, Phaser.Animation.generateFrameNames('enemy_white_goon', 2, 11, '', 4), 25, true);
                _this.sprite.animations.add(_this.sRetreat, Phaser.Animation.generateFrameNames('enemy_white_goon', 12, 21, '', 4), 25, true);
                _this.sprite.animations.add(_this.sAttack, Phaser.Animation.generateFrameNames('enemy_white_goon', 22, 31, '', 4), 25, false).onComplete.add(_this.randomState, _this);
                _this.sprite.animations.add(_this.sHurt, Phaser.Animation.generateFrameNames('enemy_white_goon', 32, 37, '', 4), 25, false).onComplete.add(_this.stand, _this);
                _this.sprite.animations.add(_this.sFall, Phaser.Animation.generateFrameNames('enemy_white_goon', 38, 45, '', 4), 12, false).onComplete.add(_this.stand, _this);
                _this.sprite.animations.add(_this.sDie, Phaser.Animation.generateFrameNames('enemy_white_goon', 46, 53, '', 4), 25, false).onComplete.add(_this.Die, _this);
                ;
                _this.sprite.anchor.set(0.55, 0.92);
                _this.sprite.play(_this.sStand);
                _this.addChild(_this.sprite);
                return _this;
            }
            goEWhiteGoon.prototype.Die = function () {
                this.game.add.tween(this.sprite).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None, true, 50, 11, true).onComplete.addOnce(this.unvisible, this);
            };
            goEWhiteGoon.prototype.unvisible = function () {
                this.death = true;
                this.sprite.visible = false;
                this.body.clearShapes();
            };
            goEWhiteGoon.prototype.stand = function () {
                this.randomState();
            };
            goEWhiteGoon.prototype.randomState = function () {
                this.body.velocity.x = 0;
                var flag = false;
                while (!flag) {
                    var randomSt = this.allState[uMath.random(0, this.allState.length - 1)];
                    if (this.oldstate != randomSt) {
                        flag = true;
                        if (randomSt == this.sRetreat) {
                            if (this.distanceToPlayer > 100) {
                                flag = false;
                            }
                        }
                    }
                }
                this.oldstate = this.state;
                switch (randomSt) {
                    case this.sWalk: {
                        this.sprite.play(this.sWalk);
                        this.state = this.sWalk;
                        break;
                    }
                    case this.sAttack: {
                        this.sprite.play(this.sAttack);
                        this.state = this.sAttack;
                        break;
                    }
                    case this.sRetreat: {
                        this.sprite.play(this.sRetreat);
                        this.state = this.sRetreat;
                        if (uMath.random(0, 50) < 20) {
                            this.scale.x = -this.scale.x;
                        }
                        if (this.scale.x > 0) {
                            this.retreatX = this.x - 150;
                            this.polRetreat = true;
                        }
                        else {
                            this.retreatX = this.x + 150;
                            this.polRetreat = false;
                        }
                        break;
                    }
                    case this.sIdle: {
                        this.sprite.play(this.sIdle);
                        this.state = this.sIdle;
                        this.idleTime = 50;
                        break;
                    }
                }
            };
            goEWhiteGoon.prototype.useEvent = function () {
                if (this.state != this.sHurt && this.state != this.sFall) {
                    this.healthPotion--;
                    if (this.healthPotion >= 0) {
                        this.sprite.play(this.sHurt);
                        this.state = this.sHurt;
                        this.body.velocity.x = 0;
                    }
                    else {
                        if (this.state != this.sDie) {
                            SndMng.sfxPlay(SndMng.SFX_DOWN);
                            SndMng.sfxPlay(SndMng.SFX_DIE1);
                            this.sprite.play(this.sDie);
                            this.state = this.sDie;
                            this.body.velocity.x = 0;
                            GlobalVar.score += 100;
                        }
                    }
                }
            };
            goEWhiteGoon.prototype.attack = function (posX, posY, kick) {
                if (this.state != this.sHurt && this.state != this.sFall) {
                    if (this.distanceToPlayer < 120) {
                        this.healthPotion--;
                        if (this.healthPotion >= 0) {
                            SndMng.sfxPlay(SndMng.SFX_PUNCH);
                            if (kick == 'low') {
                                this.sprite.play(this.sFall);
                                this.state = this.sFall;
                                this.body.velocity.x = -this.scale.x * 500;
                                this.body.velocity.y = -500;
                            }
                            else {
                                this.sprite.play(this.sHurt);
                                this.state = this.sHurt;
                            }
                            this.body.velocity.x = -this.scale.x * 100;
                        }
                        else {
                            if (this.state != this.sDie) {
                                SndMng.sfxPlay(SndMng.SFX_DOWN);
                                SndMng.sfxPlay(SndMng.SFX_DIE1);
                                this.sprite.play(this.sDie);
                                this.state = this.sDie;
                                this.body.velocity.x = 0;
                                GlobalVar.score += 100;
                            }
                        }
                    }
                }
            };
            goEWhiteGoon.prototype.activate = function (posX, posY) {
                this.sprite.play(this.sWalk);
                this.state = this.sWalk;
            };
            goEWhiteGoon.prototype.logicUpdate = function (posX, posY) {
                this.distanceToPlayer = uMath.distance(this.x, this.y, posX, this.y);
                if (this.state == this.sStand) {
                    if (this.distanceToPlayer < 600) {
                        this.activate(posX, posY);
                    }
                }
                else if (this.state == this.sWalk) {
                    if (posX > this.x) {
                        this.scale.x = 1;
                    }
                    else {
                        this.scale.x = -1;
                    }
                    if (this.distanceToPlayer < 80) {
                        this.body.velocity.x = 0;
                        this.randomState();
                    }
                    else {
                        if (posX > this.x) {
                            this.body.velocity.x = this.speed;
                        }
                        else {
                            this.body.velocity.x = -this.speed;
                        }
                    }
                }
                else if (this.state == this.sRetreat) {
                    if (this.polRetreat) {
                        if (this.x < this.retreatX) {
                            this.body.velocity.x = 0;
                            this.randomState();
                        }
                        else {
                            this.body.velocity.x = -this.speed;
                        }
                    }
                    else {
                        if (this.x > this.retreatX) {
                            this.body.velocity.x = 0;
                            this.randomState();
                        }
                        else {
                            this.body.velocity.x = this.speed;
                        }
                    }
                }
                else if (this.state == this.sIdle) {
                    if (this.idleTime > 0) {
                        this.idleTime--;
                    }
                    else {
                        this.randomState();
                    }
                }
                if (this.sprite.animations.currentAnim.frame == (this.sprite.animations.frameData.getFrameByName(this.startFrameFromAtlas).index + 25)) {
                    var disttoattack = uMath.distance(this.x, this.y, posX, posY);
                    if (disttoattack < 120) {
                        SndMng.sfxPlay(SndMng.SFX_BITA);
                        this.onAttack.dispatch();
                    }
                }
            };
            return goEWhiteGoon;
        }(Phaser.Sprite));
        Client.goEWhiteGoon = goEWhiteGoon;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goInstructions = (function (_super) {
            __extends(goInstructions, _super);
            function goInstructions(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.tween = null;
                _this.onUse = new Phaser.Signal();
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'instrAtlas');
                _this.sprite.anchor.set(0.5);
                _this.sprite.animations.add('goright', Phaser.Animation.generateFrameNames('hud', 1, 12, '', 4), 25, true);
                _this.sprite.animations.add('goleft', Phaser.Animation.generateFrameNames('hud', 13, 24, '', 4), 25, true);
                _this.sprite.animations.add('wrong', Phaser.Animation.generateFrameNames('hud', 35, 43, '', 4), 25, true);
                _this.sprite.animations.add('jump', Phaser.Animation.generateFrameNames('hud', 25, 34, '', 4), 25, true);
                _this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('hud', 63, 70, '', 4), 25, true);
                _this.sprite.animations.add('glide', Phaser.Animation.generateFrameNames('hud', 44, 52, '', 4), 25, true);
                _this.sprite.animations.add('tostreet', Phaser.Animation.generateFrameNames('hud', 145, 153, '', 4), 25, true);
                _this.sprite.animations.add('fightbtns', Phaser.Animation.generateFrameNames('hud', 80, 88, '', 4), 25, true);
                _this.sprite.animations.add('fight', Phaser.Animation.generateFrameNames('hud', 107, 144, '', 4), 25, true);
                _this.addChild(_this.sprite);
                _this.sprite.visible = false;
                return _this;
            }
            goInstructions.prototype.showInstruction = function (instruction) {
                if (this.tween) {
                    this.tween.stop();
                    this.tween.pendingDelete = true;
                    this.tween = null;
                }
                {
                    this.sprite.visible = true;
                    this.sprite.play(instruction);
                    this.tween = this.game.add.tween(this.sprite).to({ visible: false }, 1, Phaser.Easing.Linear.None, true, 2000);
                    if (instruction == 'fight') {
                        this.onUse.dispatch();
                    }
                }
            };
            goInstructions.prototype.hideInstruction = function () {
                this.sprite.visible = false;
            };
            goInstructions.prototype.update = function () {
            };
            return goInstructions;
        }(Phaser.Sprite));
        Client.goInstructions = goInstructions;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goMailBox = (function (_super) {
            __extends(goMailBox, _super);
            function goMailBox(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 20, 50);
                _this.body.fixedRotation = true;
                _this.body.data.shapes[0].sensor = true;
                _this.body.static = true;
                _this.data.name = 'enemy';
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'level1bAtlas', 'mailbox0001');
                _this.sprite.animations.add('normal', Phaser.Animation.generateFrameNames('mailbox', 1, 1, '', 4), 25, true);
                _this.sprite.animations.add('touch', Phaser.Animation.generateFrameNames('mailbox', 1, 3, '', 4), 25, false);
                _this.sprite.anchor.set(0.5, 0);
                _this.sprite.play('normal');
                _this.addChild(_this.sprite);
                return _this;
            }
            goMailBox.prototype.useEvent = function () {
                this.sprite.play('touch');
                this.body.clearShapes();
            };
            goMailBox.prototype.attack = function (posX, posY) {
                var distance = uMath.distance(posX, posY - 100, this.x, this.y);
                if (distance < 120) {
                    if (this.sprite.animations.currentAnim.name != 'touch') {
                        SndMng.sfxPlay(SndMng.SFX_METAL1);
                        this.sprite.play('touch');
                    }
                }
            };
            goMailBox.prototype.logicUpdate = function (posX, posY) {
            };
            return goMailBox;
        }(Phaser.Sprite));
        Client.goMailBox = goMailBox;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goTrashCan = (function (_super) {
            __extends(goTrashCan, _super);
            function goTrashCan(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 100, 20, 50);
                _this.body.fixedRotation = true;
                _this.body.data.shapes[0].sensor = true;
                _this.body.static = true;
                _this.data.name = 'enemy';
                _this.anchor.set(0.5);
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'level1bAtlas', 'trashcan0001');
                _this.sprite.animations.add('normal', Phaser.Animation.generateFrameNames('trashcan', 1, 1, '', 4), 25, true);
                _this.sprite.animations.add('touch', Phaser.Animation.generateFrameNames('trashcan', 1, 11, '', 4), 25, false);
                _this.sprite.anchor.set(0.7, 0.1);
                _this.sprite.play('normal');
                _this.addChild(_this.sprite);
                return _this;
            }
            goTrashCan.prototype.useEvent = function () {
                this.sprite.play('touch');
                this.body.clearShapes();
            };
            goTrashCan.prototype.attack = function (posX, posY) {
                var distance = uMath.distance(posX, posY - 100, this.x, this.y);
                if (distance < 120) {
                    if (this.sprite.animations.currentAnim.name != 'touch') {
                        SndMng.sfxPlay(SndMng.SFX_METAL1);
                        this.sprite.play('touch');
                    }
                }
            };
            goTrashCan.prototype.logicUpdate = function (posX, posY) {
            };
            return goTrashCan;
        }(Phaser.Sprite));
        Client.goTrashCan = goTrashCan;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsBoot = (function (_super) {
            __extends(gsBoot, _super);
            function gsBoot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsBoot.prototype.preload = function () {
                this.load.atlasJSONArray('preloader_atlas', './assets/atlases/preloader_atlas.png', './assets/atlases/preloader_atlas.json');
            };
            gsBoot.prototype.create = function () {
                this.stage.setBackgroundColor(0x0B58A1);
                this.input.maxPointers = 2;
                this.stage.disableVisibilityChange = true;
                ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);
                uSaveData.Init();
                Params.isMacOS =
                    this.game.device.iOS ||
                        this.game.device.iPhone ||
                        this.game.device.iPhone4 ||
                        this.game.device.iPad ||
                        this.game.device.mobileSafari;
                this.time.events.add(100, this.onWaitComplete, this);
            };
            gsBoot.prototype.onWaitComplete = function () {
                this.game.state.start(States.PRELOADER, true, false);
            };
            return gsBoot;
        }(Phaser.State));
        Client.gsBoot = gsBoot;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsClip1 = (function (_super) {
            __extends(gsClip1, _super);
            function gsClip1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsClip1.prototype.destroy = function () {
                this.game.world.setBounds(0, 0, 600, 400);
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.bg1 = new Phaser.Sprite(this.game, 0, 0, 'clip1Atlas', 'bg1');
                this.bg1.anchor.set(0.5);
                this.mainDummy.addChild(this.bg1);
                this.bg2 = new Phaser.Sprite(this.game, 0, 0, 'clip1Atlas', 'bg2');
                this.bg2.anchor.set(0.5);
                this.bg2.visible = false;
                this.bg2.width = 600;
                this.mainDummy.addChild(this.bg2);
                this.radio = new Phaser.Sprite(this.game, -150, 0, 'clip1Atlas', 'radio');
                this.radio.anchor.set(0.5);
                this.mainDummy.addChild(this.radio);
                this.game.add.tween(this.radio.scale).to({ x: 0.7 }, 1200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio.scale).to({ y: 0.7 }, 1200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showSignal, this);
                this.bat1 = new Phaser.Sprite(this.game, -100, 30, 'clip1Atlas', 'bat1');
                this.bat1.anchor.set(0.5);
                this.bat1.scale.set(1.3);
                this.bat1.visible = false;
                this.mainDummy.addChild(this.bat1);
                this.bat2 = new Phaser.Sprite(this.game, -100, 30, 'clip1Atlas', 'bat2');
                this.bat2.anchor.set(0.5);
                this.bat2.scale.set(1.3);
                this.bat2.visible = false;
                this.mainDummy.addChild(this.bat2);
                this.bat3 = new Phaser.Sprite(this.game, -680, 0, 'clip1Atlas', 'bat3');
                this.bat3.anchor.set(0.5);
                this.bat3.visible = false;
                this.mainDummy.addChild(this.bat3);
                this.signal = new Phaser.Sprite(this.game, -150, 0, 'clip1Atlas', 'signal');
                this.signal.anchor.set(0.5);
                this.signal.visible = false;
                this.mainDummy.addChild(this.signal);
                this.letterboxUp = new Phaser.Sprite(this.game, 0, -200, 'clip1Atlas', 'letterbox');
                this.letterboxUp.anchor.set(0.5);
                this.letterboxUp.height = 400;
                this.mainDummy.addChild(this.letterboxUp);
                this.letterboxDown = new Phaser.Sprite(this.game, 0, 200, 'clip1Atlas', 'letterbox');
                this.letterboxDown.anchor.set(0.5);
                this.letterboxDown.height = 400;
                this.mainDummy.addChild(this.letterboxDown);
                this.skipBtn = new Phaser.Button(this.game, 250, 175, 'clip1Atlas', this.clickSkip, this, 'skip0002', 'skip0001');
                this.skipBtn.anchor.set(0.5);
                this.mainDummy.addChild(this.skipBtn);
                this.game.add.tween(this.letterboxUp).to({ height: 200 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.letterboxDown).to({ height: 200 }, 200, Phaser.Easing.Linear.None, true);
                SndMng.playMusic(SndMng.CLIP_1, 1, 1);
            };
            gsClip1.prototype.clickSkip = function () {
                this.fade = new Client.gFade(this.game, 0, 0);
                this.fade.onComplete.addOnce(this.startGame, this);
                this.fade.start();
                this.mainDummy.addChild(this.fade);
            };
            gsClip1.prototype.showSignal = function () {
                this.game.add.tween(this.radio.scale).to({ x: 0.6 }, 1200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio.scale).to({ y: 0.6 }, 1200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.callBatmen, this);
                this.signal.visible = true;
                this.signal.scale.set(0);
                this.game.add.tween(this.signal.scale).to({ x: 3 }, 600, Phaser.Easing.Linear.None, true, 0, -1);
                this.game.add.tween(this.signal.scale).to({ y: 3 }, 600, Phaser.Easing.Linear.None, true, 0, -1);
                this.game.add.tween(this.signal).to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 0, -1);
            };
            gsClip1.prototype.callBatmen = function () {
                this.radio.visible = false;
                this.bg2.visible = true;
                this.bat1.visible = true;
                this.bat1.scale.set(0.7);
                this.game.add.tween(this.bat1.scale).to({ x: 1.3 }, 1200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bat1.scale).to({ y: 1.3 }, 1200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.readyBatmen, this);
            };
            gsClip1.prototype.readyBatmen = function () {
                this.signal.visible = false;
                this.bat2.visible = true;
                this.bat2.alpha = 0;
                this.game.add.tween(this.bg2).to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bat2).to({ alpha: 1 }, 600, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showBatmen, this);
            };
            gsClip1.prototype.showBatmen = function () {
                this.bat1.visible = false;
                this.bat3.visible = true;
                this.game.add.tween(this.bat3).to({ x: 80 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.moveBatman, this);
            };
            gsClip1.prototype.moveBatman = function () {
                this.game.add.tween(this.bat3).to({ x: 100 }, 1200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.hideLetter, this);
            };
            gsClip1.prototype.hideLetter = function () {
                this.skipBtn.visible = false;
                this.game.add.tween(this.bat3).to({ x: 880 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.startGame, this);
                this.game.add.tween(this.letterboxUp).to({ height: 400 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.letterboxDown).to({ height: 400 }, 200, Phaser.Easing.Linear.None, true);
            };
            gsClip1.prototype.startGame = function () {
                this.game.state.start(States.LEVEL1A, true, false);
            };
            gsClip1.prototype.create = function () {
                this.game.sound.stopAll();
                this.destroy();
            };
            gsClip1.prototype.update = function () {
                if (this.fade) {
                    this.fade.update();
                }
            };
            return gsClip1;
        }(Phaser.State));
        Client.gsClip1 = gsClip1;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsClip2 = (function (_super) {
            __extends(gsClip2, _super);
            function gsClip2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsClip2.prototype.destroy = function () {
                this.game.world.setBounds(0, 0, 600, 400);
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.bg1 = new Phaser.Sprite(this.game, 0, 0, 'clip2Atlas', 'bg1');
                this.bg1.anchor.set(0.5);
                this.mainDummy.addChild(this.bg1);
                this.bg3 = new Phaser.Sprite(this.game, 0, 0, 'clip2Atlas', 'bg2');
                this.bg3.anchor.set(0.5);
                this.bg3.alpha = 0;
                this.mainDummy.addChild(this.bg3);
                this.build = new Phaser.Sprite(this.game, -800, -135, 'clip2Atlas', 'build');
                this.build.anchor.set(0.5);
                this.mainDummy.addChild(this.build);
                this.bg2 = new Phaser.Sprite(this.game, 0, -100, 'clip2Atlas', 'mask');
                this.bg2.anchor.set(0.5);
                this.bg2.width = 600;
                this.mainDummy.addChild(this.bg2);
                this.car = new Phaser.Sprite(this.game, 800, 0, 'clip2Atlas', 'car0001');
                this.car.anchor.set(0.5);
                this.car.animations.add('car', Phaser.Animation.generateFrameNames('car', 1, 19, '', 4), 25, true);
                this.mainDummy.addChild(this.car);
                this.car.play('car');
                this.game.add.tween(this.car).to({ x: 0 }, 500, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showCar, this);
                this.boss = new Phaser.Sprite(this.game, -800, 100, 'clip2Atlas', 'boss');
                this.boss.anchor.set(0.5);
                this.mainDummy.addChild(this.boss);
                this.radio = new Phaser.Sprite(this.game, -150, 0, 'clip2Atlas', 'radio');
                this.radio.anchor.set(0.5);
                this.radio.alpha = 0;
                this.mainDummy.addChild(this.radio);
                this.bat1 = new Phaser.Sprite(this.game, 0, 0, 'clip2Atlas', 'bat1');
                this.bat1.anchor.set(0.5);
                this.bat1.scale.set(3);
                this.bat1.alpha = 0;
                this.mainDummy.addChild(this.bat1);
                this.signal = new Phaser.Sprite(this.game, -150, 0, 'clip2Atlas', 'signal');
                this.signal.anchor.set(0.5);
                this.signal.visible = false;
                this.mainDummy.addChild(this.signal);
                this.doctor = new Phaser.Sprite(this.game, 150, 0, 'clip2Atlas', 'doctor');
                this.doctor.anchor.set(0.5);
                this.doctor.alpha = 0;
                this.doctor.scale.set(2);
                this.mainDummy.addChild(this.doctor);
                this.letterboxUp = new Phaser.Sprite(this.game, 0, -200, 'clip2Atlas', 'letterbox');
                this.letterboxUp.anchor.set(0.5);
                this.letterboxUp.height = 400;
                this.mainDummy.addChild(this.letterboxUp);
                this.letterboxDown = new Phaser.Sprite(this.game, 0, 200, 'clip2Atlas', 'letterbox');
                this.letterboxDown.anchor.set(0.5);
                this.letterboxDown.height = 400;
                this.mainDummy.addChild(this.letterboxDown);
                this.text = new Phaser.Sprite(this.game, -800, 150, 'clip2Atlas', 'text0001');
                this.text.anchor.set(0.5);
                this.text.animations.add('first', Phaser.Animation.generateFrameNames('text', 1, 1, '', 4), 25, true);
                this.text.animations.add('second', Phaser.Animation.generateFrameNames('text', 2, 2, '', 4), 25, true);
                this.mainDummy.addChild(this.text);
                this.car.play('first');
                this.skipBtn = new Phaser.Button(this.game, 250, 175, 'clip2Atlas', this.clickSkip, this, 'skip0002', 'skip0001');
                this.skipBtn.anchor.set(0.5);
                this.mainDummy.addChild(this.skipBtn);
                this.game.add.tween(this.letterboxUp).to({ height: 200 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.letterboxDown).to({ height: 200 }, 200, Phaser.Easing.Linear.None, true);
                SndMng.playMusic(SndMng.CLIP_1, 1, 1);
            };
            gsClip2.prototype.showCar = function () {
                this.game.add.tween(this.build).to({ x: 800 }, 500, Phaser.Easing.Linear.None, true, 0, 3);
                this.game.add.tween(this.car).to({ x: 20 }, 200, Phaser.Easing.Linear.None, true, 0, 4, true).onComplete.addOnce(this.hideCar, this);
            };
            gsClip2.prototype.hideCar = function () {
                this.game.add.tween(this.car).to({ x: -800 }, 500, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bg2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.boss).to({ x: -100 }, 500, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showBoss, this);
            };
            gsClip2.prototype.showBoss = function () {
                this.game.add.tween(this.text).to({ x: -80 }, 150, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.boss).to({ x: -50 }, 1300, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.hideBoss, this);
            };
            gsClip2.prototype.hideBoss = function () {
                this.game.add.tween(this.text).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.boss).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio.scale).to({ x: 0.7 }, 1200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio.scale).to({ y: 0.7 }, 1200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showSignal, this);
            };
            gsClip2.prototype.showSignal = function () {
                this.game.add.tween(this.radio.scale).to({ x: 0.6 }, 1200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio.scale).to({ y: 0.6 }, 1200, Phaser.Easing.Linear.None, true);
                this.signal.visible = true;
                this.signal.scale.set(0);
                this.game.add.tween(this.signal.scale).to({ x: 3 }, 600, Phaser.Easing.Linear.None, true, 0, -1);
                this.game.add.tween(this.signal.scale).to({ y: 3 }, 600, Phaser.Easing.Linear.None, true, 0, -1);
                this.game.add.tween(this.signal).to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 0, -1);
                this.game.add.tween(this.doctor.scale).to({ x: 1 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.doctor.scale).to({ y: 1 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.doctor).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.slideDoctor, this);
                this.game.add.tween(this.text).to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
                this.text.play('second');
            };
            gsClip2.prototype.slideDoctor = function () {
                this.game.add.tween(this.doctor).to({ y: 50 }, 2200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.hideSignal, this);
            };
            gsClip2.prototype.hideSignal = function () {
                this.game.add.tween(this.doctor).to({ y: 450 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.signal).to({ y: -200 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.radio).to({ y: -200 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bat1.scale).to({ x: 1.3 }, 400, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bat1.scale).to({ y: 1.3 }, 400, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bat1).to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.slideBatman, this);
                this.game.add.tween(this.bg3).to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.text).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            };
            gsClip2.prototype.slideBatman = function () {
                this.game.add.tween(this.bat1).to({ y: 20 }, 1400, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.clickSkip, this);
            };
            gsClip2.prototype.clickSkip = function () {
                this.fade = new Client.gFade(this.game, 0, 0);
                this.fade.onComplete.addOnce(this.startGame, this);
                this.fade.start();
                this.mainDummy.addChild(this.fade);
            };
            gsClip2.prototype.hideLetter = function () {
                this.skipBtn.visible = false;
                this.game.add.tween(this.letterboxUp).to({ height: 400 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.letterboxDown).to({ height: 400 }, 200, Phaser.Easing.Linear.None, true);
            };
            gsClip2.prototype.startGame = function () {
                this.game.state.start(States.LEVEL2A, true, false);
            };
            gsClip2.prototype.create = function () {
                this.game.sound.stopAll();
                this.destroy();
            };
            gsClip2.prototype.update = function () {
                if (this.fade) {
                    this.fade.update();
                }
            };
            return gsClip2;
        }(Phaser.State));
        Client.gsClip2 = gsClip2;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsContinue = (function (_super) {
            __extends(gsContinue, _super);
            function gsContinue() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsContinue.prototype.destroy = function () {
                this.game.world.setBounds(0, 0, 600, 400);
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.bg1 = new Phaser.Sprite(this.game, 0, 0, 'clip1Atlas', 'bg1');
                this.bg1.anchor.set(0.5);
                this.mainDummy.addChild(this.bg1);
                this.bat1 = new Phaser.Sprite(this.game, -100, 0, 'continueAtlas', 'batmandie0001');
                this.bat1.animations.add('die', Phaser.Animation.generateFrameNames('batmandie', 1, 18, '', 4), 25);
                this.bat1.anchor.set(0.5);
                this.mainDummy.addChild(this.bat1);
                this.bat1.play('die', 25, false).onComplete.addOnce(this.blackBatman, this);
                this.bat2 = new Phaser.Sprite(this.game, -100, 0, 'continueAtlas', 'batmandie0018');
                this.bat2.anchor.set(0.5);
                this.bat2.tint = 0x000000;
                this.bat2.alpha = 0;
                this.mainDummy.addChild(this.bat2);
                this.bat3 = new Phaser.Sprite(this.game, 0, 0, 'continueAtlas', 'batmannew');
                this.bat3.anchor.set(0.5);
                this.bat3.scale.set(0.59);
                this.bat3.alpha = 0;
                this.mainDummy.addChild(this.bat3);
                this.bat4 = new Phaser.Sprite(this.game, 0, 0, 'continueAtlas', 'batmannew');
                this.bat4.anchor.set(0.5);
                this.bat4.tint = 0x000000;
                this.bat4.alpha = 0;
                this.bat4.scale.set(0.59);
                this.mainDummy.addChild(this.bat4);
                this.batGo = new Phaser.Sprite(this.game, 0, 0, 'continueAtlas', 'gomove0037');
                this.batGo.animations.add('die', Phaser.Animation.generateFrameNames('gomove', 37, 47, '', 4), 25);
                this.batGo.anchor.set(0.5);
                this.batGo.visible = false;
                this.mainDummy.addChild(this.batGo);
                this.letterboxUp = new Phaser.Sprite(this.game, 0, -200, 'clip1Atlas', 'letterbox');
                this.letterboxUp.anchor.set(0.5);
                this.letterboxUp.height = 400;
                this.mainDummy.addChild(this.letterboxUp);
                this.letterboxDown = new Phaser.Sprite(this.game, 0, 200, 'clip1Atlas', 'letterbox');
                this.letterboxDown.anchor.set(0.5);
                this.letterboxDown.height = 400;
                this.mainDummy.addChild(this.letterboxDown);
                this.game.add.tween(this.letterboxUp).to({ height: 200 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.letterboxDown).to({ height: 200 }, 200, Phaser.Easing.Linear.None, true);
                SndMng.stopAllMusic();
                SndMng.sfxPlay(SndMng.MENU, 1);
                SndMng.currentMusic = '';
            };
            gsContinue.prototype.blackBatman = function () {
                this.game.add.tween(this.bat2).to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showBatman, this);
            };
            gsContinue.prototype.showBatman = function () {
                this.bat1.visible = false;
                this.game.add.tween(this.bat4).to({ alpha: 0.5 }, 500, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.hideShadow, this);
                this.game.add.tween(this.bat2).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
            };
            gsContinue.prototype.hideShadow = function () {
                this.game.add.tween(this.bat4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.bat3).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.showGo, this);
            };
            gsContinue.prototype.showGo = function () {
                this.batGo.visible = true;
                this.batGo.play('die', 25, false).onComplete.addOnce(this.hideLetter, this);
                this.game.add.tween(this.bat4).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            };
            gsContinue.prototype.hideLetter = function () {
                this.game.add.tween(this.letterboxUp).to({ height: 400 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.letterboxDown).to({ height: 400 }, 200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.startGame, this);
                ;
            };
            gsContinue.prototype.startGame = function () {
                this.game.sound.stopAll();
                if (GlobalVar.levelContinue != '') {
                    this.game.state.start(GlobalVar.levelContinue, true, false);
                }
            };
            gsContinue.prototype.create = function () {
                this.destroy();
            };
            gsContinue.prototype.update = function () {
                if (this.fade) {
                    this.fade.update();
                }
            };
            return gsContinue;
        }(Phaser.State));
        Client.gsContinue = gsContinue;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsGame = (function (_super) {
            __extends(gsGame, _super);
            function gsGame() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsGame.prototype.destroy = function () {
            };
            gsGame.prototype.create = function () {
                this.destroy();
            };
            gsGame.prototype.update = function () {
            };
            return gsGame;
        }(Phaser.State));
        Client.gsGame = gsGame;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsInstructions = (function (_super) {
            __extends(gsInstructions, _super);
            function gsInstructions() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsInstructions.prototype.destroy = function () {
            };
            gsInstructions.prototype.create = function () {
                this.destroy();
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.background = new Phaser.Sprite(this.game, 0, 0, 'menuAtlas', 'instructions');
                this.background.anchor.set(0.5);
                this.mainDummy.addChild(this.background);
                this.btnPlay = new Phaser.Button(this.game, -200, 170, 'menuAtlas', this.clickPlay, this, 'title_playgame_btn0002', 'title_playgame_btn0001');
                this.btnPlay.anchor.set(0.5);
                this.btnPlay.scale.set(0.6);
                this.mainDummy.addChild(this.btnPlay);
            };
            gsInstructions.prototype.clickPlay = function () {
                this.fade = new Client.gFade(this.game, 0, 0);
                this.fade.onComplete.addOnce(this.startClip, this);
                this.fade.start();
                this.mainDummy.addChild(this.fade);
            };
            gsInstructions.prototype.startClip = function () {
                this.game.state.start(States.CLIP1, true, false);
            };
            gsInstructions.prototype.update = function () {
                if (this.fade) {
                    this.fade.update();
                }
            };
            return gsInstructions;
        }(Phaser.State));
        Client.gsInstructions = gsInstructions;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gslevel1a = (function (_super) {
            __extends(gslevel1a, _super);
            function gslevel1a() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.roofX = [5802.45, 4758.25, 3543.25, 3788.35, 4347.30, 2612.05, 1372.50, 476.80, -347.50, -1178.30, -2040.05, -2782.05, -2336.85, -3726.25];
                _this.roofY = [-107.45, 335.20, 335.20, 335.20, 335.20, 346.25, 305.25, 231.20, 179.80, 238.80, 124.95, 124.95, 124.95, 220.15];
                _this.roofArray = [];
                _this.chckX = [-4024.15, -3087, -2333, -1935, 1187, 4424];
                _this.chckY = [-279, -374, -374, -374, -233, -178];
                _this.chckV = ['wrong', 'jump', 'walk', 'jump', 'glide', 'tostreet'];
                _this.chckArray = [];
                _this.batarangX = [-3308, -1634, -824, 39, 889, 1940, 3029];
                _this.batarangY = [-250, -275, -194, -207, -157, -134, -105];
                _this.batarangArray = [];
                _this.objectArray = [];
                _this.wievCamera = 200;
                return _this;
            }
            gslevel1a.prototype.destroy = function () {
            };
            gslevel1a.prototype.create = function () {
                this.destroy();
                GlobalVar.levelContinue = States.LEVEL1A;
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.gravity.y = 1900;
                this.game.physics.p2.restitution = 0;
                this.game.physics.p2.setBounds(-4150, -1500, 10000, 2000);
                this.game.physics.p2.onBeginContact.add(this.beginContactListeners, this);
                this.game.physics.p2.setImpactEvents(true);
                GlobalVar.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();
                this.mainDummy = new Phaser.Sprite(this.game, 0, 0);
                this.add.existing(this.mainDummy);
                this.bg = new Phaser.Sprite(this.game, 0, 0, 'level1aAtlas', 'bg');
                this.mainDummy.addChild(this.bg);
                this.bg.fixedToCamera = true;
                this.townDummy = new Phaser.Sprite(this.game, 0, 0);
                this.mainDummy.addChild(this.townDummy);
                this.buildLevel();
                this.game.world.setBounds(-4150, -500, 10000, 2000);
                GlobalVar.bleft = this.game.world.position.x;
                GlobalVar.bRight = this.game.world.position.x + this.game.world.width;
                this.player = new Client.goBatman(this.game, -2182, -300);
                this.player.onBatarang.add(this.fireBatarang, this);
                this.mainDummy.addChild(this.player);
                this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
                this.game.camera.setPosition(this.player.x, this.player.y);
                for (var j = 0; j < 4; j++) {
                    var town = new Phaser.Sprite(this.game, 0, 0, 'level1aAtlas', 'town');
                    town.x = this.game.camera.x + ((town.width - 10) * j);
                    town.y = 50;
                    this.townDummy.addChild(town);
                }
                this.blackline = new Phaser.Sprite(this.game, 0, 0, 'level1aAtlas', 'blackline');
                this.blackline.x = this.player.x;
                this.blackline.scale.setTo(2, 1.2);
                this.blackline.anchor.set(0.5, 0);
                this.blackline.y = 100;
                this.mainDummy.addChild(this.blackline);
                this.game.camera.deadzone = new Phaser.Rectangle(100, 150, 0, 0);
                this.infoLevel = new Phaser.Sprite(this.game, 300, 100, 'level1aAtlas', 'infolevel0001');
                this.infoLevel.animations.add('play', Phaser.Animation.generateFrameNames('infolevel', 1, 99, '', 4), 25, false).onComplete.addOnce(this.showVectorMove, this);
                this.infoLevel.anchor.set(0.5);
                this.mainDummy.addChild(this.infoLevel);
                this.infoLevel.fixedToCamera = true;
                this.infoLevel.play('play');
                this.instruction = new Client.goInstructions(this.game, 300, 200);
                this.instruction.anchor.set(0.5);
                this.mainDummy.addChild(this.instruction);
                this.instruction.fixedToCamera = true;
                this.guiPanel = new Client.goGuiPanel(this.game, 300, 35);
                this.guiPanel.anchor.set(0.5);
                this.mainDummy.addChild(this.guiPanel);
                this.guiPanel.setLife(2);
                this.guiPanel.fixedToCamera = true;
                this.fade = new Client.gFade(this.game, 300, 200);
                this.mainDummy.addChild(this.fade);
                this.fade.fixedToCamera = true;
                this.fade.setFadeOut(false);
                this.fade.onComplete.addOnce(this.destroyFade, this);
                this.fade.start();
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.punchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                this.batarangButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.kickButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                SndMng.playMusic(SndMng.LEVEL1A, 1, 1);
            };
            gslevel1a.prototype.fireBatarang = function (e) {
                GlobalVar.batarang--;
                var btrng = new Client.goBatarang(this.game, this.player.x + (this.player.scale.x * 50), this.player.y - e.y);
                this.objectArray.push(btrng);
                this.mainDummy.addChild(btrng);
                btrng.body.velocity.x = this.player.scale.x * 1000;
            };
            gslevel1a.prototype.destroyFade = function () {
                this.fade.visible = false;
            };
            gslevel1a.prototype.showVectorMove = function () {
                this.instruction.showInstruction('goright');
            };
            gslevel1a.prototype.beginContactListeners = function (body, bodyB, shapeA, shapeB, equation) {
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'chck' && body.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(bodyB.parent.sprite.data.var);
                            }
                            if (body.parent.sprite.data.name == 'chck' && bodyB.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(body.parent.sprite.data.var);
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'batarang' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.body.clearShapes();
                                bodyB.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                            if (body.parent.sprite.data.name == 'batarang' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.body.clearShapes();
                                body.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                        }
                    }
                }
            };
            gslevel1a.prototype.buildLevel = function () {
                for (var i = 0; i < this.roofX.length; i++) {
                    var newroof = new Phaser.Sprite(this.game, this.roofX[i], this.roofY[i], 'level1aAtlas', 'roof');
                    newroof.anchor.set(0.5);
                    this.roofArray.push(newroof);
                    this.mainDummy.addChild(this.roofArray[this.roofArray.length - 1]);
                    var wall = new Phaser.Sprite(this.game, this.roofX[i], (newroof.y + newroof.height / 2) - 20, 'level1aAtlas', 'house');
                    wall.anchor.set(0.5, 0);
                    wall.scale.set(1, 3);
                    this.mainDummy.addChild(wall);
                    this.game.physics.p2.enable(newroof);
                    newroof.body.setRectangle(newroof.width - 50, newroof.height * 2, 0, ((newroof.height * 2) / 2) / 2);
                    newroof.body.static = true;
                    newroof.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    newroof.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.playerCollisionGroup, GlobalVar.enemyCollisionGroup]);
                }
                for (var i = 0; i < this.chckX.length; i++) {
                    var chck = new Phaser.Sprite(this.game, this.chckX[i] + 200, this.chckY[i] + 200);
                    this.mainDummy.addChild(chck);
                    this.chckArray.push(chck);
                    this.game.physics.p2.enable(chck);
                    chck.body.setRectangle(100, 100, 0, 0);
                    chck.body.static = true;
                    chck.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    chck.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.playerCollisionGroup, GlobalVar.enemyCollisionGroup]);
                    chck.body.data.shapes[0].sensor = true;
                    chck.data.name = 'chck';
                    chck.data.var = this.chckV[i];
                }
                for (var i = 0; i < this.batarangX.length; i++) {
                    var btrng = new Phaser.Sprite(this.game, this.batarangX[i] + 25, this.batarangY[i], 'gameObjectAtlas', 'batarang');
                    btrng.anchor.set(0.5);
                    this.mainDummy.addChild(btrng);
                    this.batarangArray.push(btrng);
                    this.game.physics.p2.enable(btrng);
                    btrng.body.setRectangle(50, 50, 0, 0);
                    btrng.body.static = true;
                    btrng.body.data.shapes[0].sensor = true;
                    btrng.data.name = 'batarang';
                    btrng.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    btrng.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.playerCollisionGroup, GlobalVar.enemyCollisionGroup]);
                }
            };
            gslevel1a.prototype.update = function () {
                if (this.fade) {
                    if (this.fade.visible) {
                        this.fade.update();
                    }
                }
                this.blackline.x = this.game.camera.x;
                this.townDummy.x = this.game.camera.x - this.player.x / 3;
                this.townDummy.y = this.game.camera.y;
                if (this.cursors.left.isDown) {
                    this.game.camera.deadzone.setTo(500, 150, 0, 0);
                    this.player.moveLeft();
                    this.player.scale.x = -1;
                }
                else if (this.cursors.right.isDown) {
                    this.game.camera.deadzone.setTo(100, 150, 0, 0);
                    this.player.moveRight();
                    this.player.scale.x = 1;
                }
                else if (this.cursors.up.isDown) {
                    this.player.seeUp();
                }
                else if (this.cursors.down.isDown) {
                    this.player.sitDown();
                }
                else {
                    this.player.stopMove();
                }
                if (this.jumpButton.isDown) {
                    this.player.jump();
                }
                if (this.punchButton.isDown) {
                    this.player.punch();
                }
                if (this.kickButton.isDown) {
                    this.player.kick();
                }
                if (this.batarangButton.isDown) {
                    if (GlobalVar.batarang > 0) {
                        this.player.batarang();
                    }
                }
                this.player.update();
                this.guiPanel.setHealth(this.player.health);
                this.guiPanel.setLife(GlobalVar.life);
                this.guiPanel.setScore(GlobalVar.score);
                this.guiPanel.setBatarantg(GlobalVar.batarang);
                if (this.player.x < 5000) {
                    if (this.player.y > 700) {
                        this.player.health = 0;
                    }
                    if (this.player.health <= 0) {
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.onComplete.addOnce(this.showClipDeath, this);
                            this.fade.start();
                            this.player.death = true;
                        }
                    }
                }
                else {
                    if (this.player.y > 700) {
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.onComplete.addOnce(this.nextLevel, this);
                            this.fade.start();
                        }
                    }
                }
            };
            gslevel1a.prototype.nextLevel = function () {
                this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                this.game.state.start(States.LEVEL1B, true, false);
            };
            gslevel1a.prototype.showClipDeath = function () {
                if (GlobalVar.life > 0) {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    GlobalVar.life--;
                    this.game.state.start(States.CONTINUE, true, false);
                }
                else {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    this.game.physics.p2.onBeginContact.removeAll(this);
                    this.game.state.start(States.MAINMENU, true, false);
                }
            };
            return gslevel1a;
        }(Phaser.State));
        Client.gslevel1a = gslevel1a;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gslevel1b = (function (_super) {
            __extends(gslevel1b, _super);
            function gslevel1b() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.gfX = [13, 13.90, 102.85, -408, -261.10, -2140.85, -1815.80, -1065.65, -3279.15, -2784.10, -4910.90, -4037.55, -4684.35, -4911.5, -5332.8, -5185.90, -7720.05, -7718.9, -6317.95, -7049.4, -7628.3, -5990.35, -7993.4, -8140.3, -8797.95, -1934.35, -3046.80, -6177.15];
                _this.gfY = [-206, 78.10, -292, 78.10, -387.55, -339.10, -401.85, -401.85, -339.10, -533.05, 78.10, -401.85, -401.85, -387.55, 78.10, -387.55, -206, 78.1, -339.10, -533.05, -294, -401.85, -387.55, 78.1, -401.85, -120.55, -120.55, -120.55];
                _this.gName = ['g0', 'g1', 'bank', 'g2', 'g3', 'g5', 'g4', 'g4', 'g5', 'g6', 'g8', 'g4', 'g4', 'g7', 'g2', 'g3', 'g0', 'g1', 'g5', 'g6', 'bank', 'g4', 'g3', 'g2', 'g4', 'g10', 'g10', 'g10'];
                _this.gArray = [];
                _this.objectX = [-1411.40, -2635.80, -4426.85, -6266.30, -788.60, -2217.15, -3758.65, -5709.55, -5188.32, -1783.30, -2122.35, -2773.15, -3113.15, -4165.15, -4505.15, -6015.15, -6403.15, -7009.05, -7148.75, -1608];
                _this.objectY = [139.20, 140.70, 140.70, 140.70, 11.05, 11.05, 11.05, 11.05, 5.2, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 137];
                _this.objectName = ['goCan', 'goCan', 'goCan', 'goCan', 'goTrashCan', 'goTrashCan', 'goTrashCan', 'goTrashCan', 'goMailBox', 'goEBlackGoon', 'goEWhiteGoon', 'goEBlackGoon', 'goEWhiteGoon', 'goEBlackGoon', 'goEBlackGoon', 'goEWhiteGoon', 'goEBlackGoon', 'goEWhiteGoon', 'goEBlackGoon', 'goEBiker'];
                _this.objectArray = [];
                _this.enemyArray = [];
                _this.chckX = [-920, -7768];
                _this.chckY = [-126, -126];
                _this.chckV = ['fightbtns', 'fight'];
                _this.chckArray = [];
                _this.batarangX = [-305, -1271.6, -2063.85, -3105.35];
                _this.batarangY = [-53.70, -38.25, -48.85, -97.65];
                _this.batarangArray = [];
                _this.wievCamera = 200;
                _this.endLevel = false;
                return _this;
            }
            gslevel1b.prototype.destroy = function () {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i] = null;
                }
                this.objectArray = [];
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i] = null;
                }
                this.enemyArray = [];
                this.endLevel = false;
            };
            gslevel1b.prototype.create = function () {
                this.destroy();
                GlobalVar.levelContinue = States.LEVEL1B;
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.gravity.y = 1900;
                this.game.physics.p2.restitution = 0;
                this.game.physics.p2.onBeginContact.add(this.beginContactListeners, this);
                this.game.physics.p2.setImpactEvents(true);
                GlobalVar.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();
                this.mainDummy = new Phaser.Sprite(this.game, 0, 0);
                this.add.existing(this.mainDummy);
                this.bg = new Phaser.Sprite(this.game, 0, 0, 'level1aAtlas', 'bg');
                this.mainDummy.addChild(this.bg);
                this.bg.fixedToCamera = true;
                this.buildLevel();
                this.enemyDummy = new Phaser.Sprite(this.game, 0, 0);
                this.mainDummy.addChild(this.enemyDummy);
                this.game.world.setBounds(-7650, -200, 7500, 500);
                GlobalVar.bleft = this.game.world.position.x;
                GlobalVar.bRight = this.game.world.position.x + this.game.world.width;
                this.player = new Client.goBatman(this.game, -498, -158);
                this.player.scale.x = -1;
                this.player.onAttack.add(this.checkAttack, this);
                this.player.onBatarang.add(this.fireBatarang, this);
                this.mainDummy.addChild(this.player);
                this.player.body.setCollisionGroup(GlobalVar.playerCollisionGroup);
                this.player.body.collides([GlobalVar.playerCollisionGroup, GlobalVar.worldCollisionGroup]);
                this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
                this.game.camera.setPosition(this.player.x, this.player.y);
                this.game.camera.deadzone = new Phaser.Rectangle(500, 280, 0, 0);
                this.instruction = new Client.goInstructions(this.game, 300, 200);
                this.instruction.anchor.set(0.5);
                this.mainDummy.addChild(this.instruction);
                this.instruction.fixedToCamera = true;
                this.instruction.onUse.addOnce(this.addFinalEnemy, this);
                this.instruction.showInstruction('goleft');
                this.guiPanel = new Client.goGuiPanel(this.game, 300, 35);
                this.guiPanel.anchor.set(0.5);
                this.mainDummy.addChild(this.guiPanel);
                this.guiPanel.setLife(2);
                this.guiPanel.fixedToCamera = true;
                this.fade = new Client.gFade(this.game, 300, 200);
                this.mainDummy.addChild(this.fade);
                this.fade.fixedToCamera = true;
                this.fade.setFadeOut(false);
                this.fade.onComplete.addOnce(this.destroyFade, this);
                this.fade.start();
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.punchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                this.batarangButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.kickButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                SndMng.playMusic(SndMng.LEVEL1B, 1, 1);
            };
            gslevel1b.prototype.fireBatarang = function (e) {
                GlobalVar.batarang--;
                var btrng = new Client.goBatarang(this.game, this.player.x + (this.player.scale.x * 50), this.player.y - e.y);
                this.objectArray.push(btrng);
                this.mainDummy.addChild(btrng);
                btrng.body.velocity.x = this.player.scale.x * 1000;
            };
            gslevel1b.prototype.addFinalEnemy = function () {
                for (var i = 0; i < 6; i++) {
                    var newobj;
                    if (uMath.random(0, 10) < 5) {
                        newobj = new Client.goEBlackGoon(this.game, this.player.x + 600 + 50 * i, 158);
                        newobj.onAttack.add(this.attackedBatman, this);
                    }
                    else {
                        newobj = new Client.goEWhiteGoon(this.game, this.player.x + 600 + 50 * i, 158);
                        newobj.onAttack.add(this.attackedBatman, this);
                    }
                    newobj.activate();
                    this.enemyArray.push(newobj);
                    this.enemyDummy.addChild(newobj);
                }
                for (var i = 0; i < 6; i++) {
                    var newobj;
                    if (uMath.random(0, 10) < 5) {
                        newobj = new Client.goEBlackGoon(this.game, this.player.x - 500 - 50 * i, 158);
                        newobj.onAttack.add(this.attackedBatman, this);
                    }
                    else {
                        newobj = new Client.goEWhiteGoon(this.game, this.player.x - 500 - 50 * i, 158);
                        newobj.onAttack.add(this.attackedBatman, this);
                    }
                    newobj.activate();
                    this.enemyArray.push(newobj);
                    this.enemyDummy.addChild(newobj);
                }
                this.endLevel = true;
            };
            gslevel1b.prototype.checkAttack = function (e) {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i].attack(this.player.x, this.player.y, e);
                }
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].attack(this.player.x, this.player.y, e);
                }
            };
            gslevel1b.prototype.attackedBatman = function () {
                this.player.hurt();
            };
            gslevel1b.prototype.destroyFade = function () {
                this.fade.visible = false;
            };
            gslevel1b.prototype.beginContactListeners = function (body, bodyB, shapeA, shapeB, equation) {
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'chck' && body.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(bodyB.parent.sprite.data.var);
                            }
                            if (body.parent.sprite.data.name == 'chck' && bodyB.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(body.parent.sprite.data.var);
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'batarang' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.body.clearShapes();
                                bodyB.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                            if (body.parent.sprite.data.name == 'batarang' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.body.clearShapes();
                                body.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'firebatarang' && body.parent.sprite.data.name == 'enemy') {
                                body.parent.sprite.useEvent();
                            }
                            if (body.parent.sprite.data.name == 'firebatarang' && bodyB.parent.sprite.data.name == 'enemy') {
                                bodyB.parent.sprite.useEvent();
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'can' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.useEvent();
                            }
                            if (body.parent.sprite.data.name == 'can' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.useEvent();
                            }
                        }
                    }
                }
            };
            gslevel1b.prototype.buildLevel = function () {
                var ground = new Phaser.Sprite(this.game, -4361, 351, 'level1bAtlas', 'ground');
                ground.anchor.set(0.5);
                ground.width = 10360;
                this.mainDummy.addChild(ground);
                var backBuild = new Phaser.Sprite(this.game, -4361, 27.45, 'level1bAtlas', 'g9');
                backBuild.anchor.set(0.5);
                backBuild.width = 10360;
                this.mainDummy.addChild(backBuild);
                this.game.physics.p2.enable(ground);
                ground.body.setRectangle(ground.width - 50, ground.height, 0, 90);
                ground.body.static = true;
                ground.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                ground.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.playerCollisionGroup, GlobalVar.enemyCollisionGroup]);
                for (var i = 0; i < this.gfX.length; i++) {
                    var newroof = new Phaser.Sprite(this.game, this.gfX[i], this.gfY[i], 'level1bAtlas', this.gName[i]);
                    this.gArray.push(newroof);
                    this.mainDummy.addChild(this.gArray[this.gArray.length - 1]);
                }
                for (var i = 0; i < this.objectName.length; i++) {
                    var newobj;
                    switch (this.objectName[i]) {
                        case 'goCan': {
                            newobj = new Client.goCan(this.game, this.objectX[i], this.objectY[i]);
                            this.objectArray.push(newobj);
                            break;
                        }
                        case 'goTrashCan': {
                            newobj = new Client.goTrashCan(this.game, this.objectX[i], this.objectY[i]);
                            this.objectArray.push(newobj);
                            break;
                        }
                        case 'goMailBox': {
                            newobj = new Client.goMailBox(this.game, this.objectX[i], this.objectY[i]);
                            this.objectArray.push(newobj);
                            break;
                        }
                        case 'goEBlackGoon': {
                            newobj = new Client.goEBlackGoon(this.game, this.objectX[i], this.objectY[i]);
                            newobj.onAttack.add(this.attackedBatman, this);
                            this.enemyArray.push(newobj);
                            break;
                        }
                        case 'goEWhiteGoon': {
                            newobj = new Client.goEWhiteGoon(this.game, this.objectX[i], this.objectY[i]);
                            newobj.onAttack.add(this.attackedBatman, this);
                            this.enemyArray.push(newobj);
                            break;
                        }
                        case 'goEBiker': {
                            newobj = new Client.goEBiker(this.game, this.objectX[i], this.objectY[i]);
                            newobj.onAttack.add(this.attackedBatman, this);
                            this.enemyArray.push(newobj);
                            break;
                        }
                    }
                    this.mainDummy.addChild(newobj);
                }
                for (var i = 0; i < this.batarangX.length; i++) {
                    var btrng = new Phaser.Sprite(this.game, this.batarangX[i] + 25, this.batarangY[i], 'gameObjectAtlas', 'batarang');
                    btrng.anchor.set(0.5);
                    this.mainDummy.addChild(btrng);
                    this.batarangArray.push(btrng);
                    this.game.physics.p2.enable(btrng);
                    btrng.body.setRectangle(50, 50, 0, 0);
                    btrng.body.static = true;
                    btrng.body.data.shapes[0].sensor = true;
                    btrng.data.name = 'batarang';
                    btrng.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    btrng.body.collides(GlobalVar.playerCollisionGroup, GlobalVar.worldCollisionGroup);
                }
                for (var i = 0; i < this.chckX.length; i++) {
                    var chck = new Phaser.Sprite(this.game, this.chckX[i] + 200, this.chckY[i] + 200);
                    this.mainDummy.addChild(chck);
                    this.chckArray.push(chck);
                    this.game.physics.p2.enable(chck);
                    chck.body.setRectangle(100, 100, 0, 0);
                    chck.body.static = true;
                    chck.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    chck.body.collides([GlobalVar.playerCollisionGroup]);
                    chck.body.data.shapes[0].sensor = true;
                    chck.data.name = 'chck';
                    chck.data.var = this.chckV[i];
                }
            };
            gslevel1b.prototype.update = function () {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i].logicUpdate(this.player.x, this.player.y);
                }
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].logicUpdate(this.player.x, this.player.y);
                }
                if (this.fade) {
                    if (this.fade.visible) {
                        this.fade.update();
                    }
                }
                if (this.endLevel) {
                    var pass = true;
                    for (var i = 0; i < this.enemyArray.length; i++) {
                        if (!this.enemyArray[i].death) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        console.log(this.enemyArray.length);
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.start();
                            this.fade.onComplete.addOnce(this.nextLevel, this);
                            this.game.camera.unfollow();
                        }
                    }
                }
                if (this.cursors.left.isDown) {
                    this.game.camera.deadzone.setTo(500, 280, 0, 0);
                    this.player.moveLeft();
                    this.player.scale.x = -1;
                }
                else if (this.cursors.right.isDown) {
                    this.game.camera.deadzone.setTo(100, 280, 0, 0);
                    this.player.moveRight();
                    this.player.scale.x = 1;
                }
                else if (this.cursors.up.isDown) {
                    this.player.seeUp();
                }
                else if (this.cursors.down.isDown) {
                    this.player.sitDown();
                }
                else {
                    this.player.stopMove();
                }
                if (this.jumpButton.isDown) {
                    this.player.jump();
                }
                if (this.punchButton.isDown) {
                    this.player.punch();
                }
                if (this.kickButton.isDown) {
                    this.player.kick();
                }
                if (this.punchButton.isUp) {
                    this.player.punchButtonUp();
                }
                if (this.batarangButton.isDown) {
                    if (GlobalVar.batarang > 0) {
                        this.player.batarang();
                    }
                }
                this.player.update();
                this.guiPanel.setHealth(this.player.health);
                this.guiPanel.setLife(GlobalVar.life);
                this.guiPanel.setScore(GlobalVar.score);
                this.guiPanel.setBatarantg(GlobalVar.batarang);
                if (this.player.health <= 0) {
                    if (!this.fade.visible) {
                        this.fade.visible = true;
                        this.fade.setFadeOut(true);
                        this.fade.onComplete.addOnce(this.showClipDeath, this);
                        this.fade.start();
                        this.player.death = true;
                    }
                }
            };
            gslevel1b.prototype.nextLevel = function () {
                this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                this.game.state.start(States.LEVEL1C, true, false);
            };
            gslevel1b.prototype.showClipDeath = function () {
                if (GlobalVar.life > 0) {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    GlobalVar.life--;
                    this.game.state.start(States.CONTINUE, true, false);
                }
                else {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    this.game.state.start(States.MAINMENU, true, false);
                }
            };
            return gslevel1b;
        }(Phaser.State));
        Client.gslevel1b = gslevel1b;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gslevel1c = (function (_super) {
            __extends(gslevel1c, _super);
            function gslevel1c() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.objectX = [-449];
                _this.objectY = [75];
                _this.objectName = ['goEBoss1'];
                _this.objectArray = [];
                _this.enemyArray = [];
                _this.batarangX = [-1091, -762, -245.75];
                _this.batarangY = [-39.8, -29.6, -44];
                _this.batarangArray = [];
                _this.wievCamera = 200;
                _this.endLevel = false;
                return _this;
            }
            gslevel1c.prototype.destroy = function () {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i] = null;
                }
                this.objectArray = [];
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i] = null;
                }
                this.enemyArray = [];
                this.endLevel = false;
            };
            gslevel1c.prototype.create = function () {
                this.destroy();
                GlobalVar.levelContinue = States.LEVEL1C;
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.gravity.y = 1900;
                this.game.physics.p2.restitution = 0;
                this.game.physics.p2.setBounds(-4150, -1500, 10000, 2000);
                this.game.physics.p2.onBeginContact.add(this.beginContactListeners, this);
                this.game.physics.p2.setImpactEvents(true);
                GlobalVar.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();
                this.game.physics.p2.updateBoundsCollisionGroup();
                this.mainDummy = new Phaser.Sprite(this.game, 0, 0);
                this.add.existing(this.mainDummy);
                this.bg = new Phaser.Sprite(this.game, 0, 0, 'level1aAtlas', 'bg');
                this.mainDummy.addChild(this.bg);
                this.bg.fixedToCamera = true;
                this.buildLevel();
                this.game.world.setBounds(-1400, -280, 2330, 500);
                GlobalVar.bleft = this.game.world.position.x;
                GlobalVar.bRight = this.game.world.position.x + this.game.world.width;
                this.player = new Client.goBatman(this.game, -1250, 42.5);
                this.player.scale.x = 1;
                this.player.onAttack.add(this.checkAttack, this);
                this.player.onBatarang.add(this.fireBatarang, this);
                this.mainDummy.addChild(this.player);
                this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
                this.game.camera.setPosition(this.player.x, this.player.y);
                this.game.camera.deadzone = new Phaser.Rectangle(100, 280, 0, 0);
                this.guiPanel = new Client.goGuiPanel(this.game, 300, 35);
                this.guiPanel.anchor.set(0.5);
                this.mainDummy.addChild(this.guiPanel);
                this.guiPanel.setLife(2);
                this.guiPanel.fixedToCamera = true;
                this.fade = new Client.gFade(this.game, 300, 200);
                this.mainDummy.addChild(this.fade);
                this.fade.fixedToCamera = true;
                this.fade.setFadeOut(false);
                this.fade.onComplete.addOnce(this.destroyFade, this);
                this.fade.start();
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.punchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                this.batarangButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.kickButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                SndMng.playMusic(SndMng.LEVEL1C, 1, 1);
            };
            gslevel1c.prototype.fireBatarang = function (e) {
                GlobalVar.batarang--;
                var btrng = new Client.goBatarang(this.game, this.player.x + (this.player.scale.x * 50), this.player.y - e.y);
                this.objectArray.push(btrng);
                this.mainDummy.addChild(btrng);
                btrng.body.velocity.x = this.player.scale.x * 1000;
            };
            gslevel1c.prototype.checkAttack = function (e) {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i].attack(this.player.x, this.player.y, e);
                }
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].attack(this.player.x, this.player.y, e);
                }
            };
            gslevel1c.prototype.attackedBatman = function (e) {
                this.player.hurt(e);
            };
            gslevel1c.prototype.destroyFade = function () {
                this.fade.visible = false;
            };
            gslevel1c.prototype.beginContactListeners = function (body, bodyB, shapeA, shapeB, equation) {
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'chck' && body.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(bodyB.parent.sprite.data.var);
                            }
                            if (body.parent.sprite.data.name == 'chck' && bodyB.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(body.parent.sprite.data.var);
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'batarang' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.body.clearShapes();
                                bodyB.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                            if (body.parent.sprite.data.name == 'batarang' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.body.clearShapes();
                                body.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'firebatarang' && body.parent.sprite.data.name == 'enemy') {
                                if (body.parent.sprite.useEvent()) {
                                    bodyB.parent.sprite.visible = false;
                                }
                            }
                            if (body.parent.sprite.data.name == 'firebatarang' && bodyB.parent.sprite.data.name == 'enemy') {
                                if (bodyB.parent.sprite.useEvent()) {
                                    body.parent.sprite.visible = false;
                                }
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'can' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.useEvent();
                            }
                            if (body.parent.sprite.data.name == 'can' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.useEvent();
                            }
                        }
                    }
                }
            };
            gslevel1c.prototype.buildLevel = function () {
                var down = new Phaser.Sprite(this.game, -870, 310, 'level1cAtlas', 'down');
                down.scale.set(100, 10);
                down.anchor.set(0.5);
                this.mainDummy.addChild(down);
                var top = new Phaser.Sprite(this.game, -870, -402, 'level1cAtlas', 'top');
                top.scale.set(100, 5);
                top.anchor.set(0.5);
                this.mainDummy.addChild(top);
                var ground = new Phaser.Sprite(this.game, -238, -85.3, 'level1cAtlas', 'front');
                var scle = 1 + (1 - uMath.fromPercent(80, 100) / 100);
                console.log(scle);
                ground.scale.set(scle);
                ground.anchor.set(0.5);
                this.mainDummy.addChild(ground);
                var car = new Phaser.Sprite(this.game, 832.15, 10.05, 'level1cAtlas', 'car0001');
                car.anchor.set(0.5);
                car.animations.add('car', Phaser.Animation.generateFrameNames('car', 1, 19, '', 4), 25, true);
                this.mainDummy.addChild(car);
                car.play('car');
                this.game.physics.p2.enable(ground);
                ground.body.setRectangle(ground.width - 50, 50, 0, 210);
                ground.body.static = true;
                ground.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                ground.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.playerCollisionGroup, GlobalVar.enemyCollisionGroup]);
                for (var i = 0; i < this.objectName.length; i++) {
                    var newobj;
                    switch (this.objectName[i]) {
                        case 'goEBoss1': {
                            newobj = new Client.goEBoss1(this.game, this.objectX[i], this.objectY[i]);
                            newobj.onAttack.add(this.attackedBatman, this);
                            this.enemyArray.push(newobj);
                            break;
                        }
                    }
                    this.mainDummy.addChild(newobj);
                }
                for (var i = 0; i < this.batarangX.length; i++) {
                    var btrng = new Phaser.Sprite(this.game, this.batarangX[i] + 25, this.batarangY[i], 'gameObjectAtlas', 'batarang');
                    btrng.anchor.set(0.5);
                    this.mainDummy.addChild(btrng);
                    this.batarangArray.push(btrng);
                    this.game.physics.p2.enable(btrng);
                    btrng.body.setRectangle(50, 50, 0, 0);
                    btrng.body.static = true;
                    btrng.body.data.shapes[0].sensor = true;
                    btrng.data.name = 'batarang';
                    btrng.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    btrng.body.collides(GlobalVar.playerCollisionGroup, GlobalVar.worldCollisionGroup);
                }
            };
            gslevel1c.prototype.update = function () {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i].logicUpdate(this.player.x, this.player.y);
                }
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].logicUpdate(this.player.x, this.player.y);
                }
                if (this.fade) {
                    if (this.fade.visible) {
                        this.fade.update();
                    }
                }
                if (this.endLevel) {
                    var pass = true;
                    for (var i = 0; i < this.enemyArray.length; i++) {
                        if (!this.enemyArray[i].death) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        console.log(this.enemyArray.length);
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.start();
                            this.fade.onComplete.addOnce(this.nextLevel, this);
                            this.game.camera.unfollow();
                        }
                    }
                }
                if (this.cursors.left.isDown) {
                    this.game.camera.deadzone.setTo(500, 280, 0, 0);
                    this.player.moveLeft();
                    this.player.scale.x = -1;
                }
                else if (this.cursors.right.isDown) {
                    this.game.camera.deadzone.setTo(100, 280, 0, 0);
                    this.player.moveRight();
                    this.player.scale.x = 1;
                }
                else if (this.cursors.up.isDown) {
                    this.player.seeUp();
                }
                else if (this.cursors.down.isDown) {
                    this.player.sitDown();
                }
                else {
                    this.player.stopMove();
                }
                if (this.jumpButton.isDown) {
                    this.player.jump();
                }
                if (this.punchButton.isDown) {
                    this.player.punch();
                }
                if (this.kickButton.isDown) {
                    this.player.kick();
                }
                if (this.punchButton.isUp) {
                    this.player.punchButtonUp();
                }
                if (this.batarangButton.isDown) {
                    if (GlobalVar.batarang > 0) {
                        this.player.batarang();
                    }
                }
                this.player.update();
                this.guiPanel.setHealth(this.player.health);
                this.guiPanel.setLife(GlobalVar.life);
                this.guiPanel.setScore(GlobalVar.score);
                this.guiPanel.setBatarantg(GlobalVar.batarang);
                {
                    var pass = true;
                    for (var i = 0; i < this.enemyArray.length; i++) {
                        if (!this.enemyArray[i].death) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        console.log(this.enemyArray.length);
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.start();
                            this.fade.onComplete.addOnce(this.nextLevel, this);
                            this.game.camera.unfollow();
                        }
                    }
                }
                if (this.player.health <= 0) {
                    if (!this.fade.visible) {
                        this.fade.visible = true;
                        this.fade.setFadeOut(true);
                        this.fade.onComplete.addOnce(this.showClipDeath, this);
                        this.fade.start();
                        this.player.death = true;
                    }
                }
            };
            gslevel1c.prototype.nextLevel = function () {
                this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                this.game.state.start(States.CLIP2, true, false);
            };
            gslevel1c.prototype.showClipDeath = function () {
                if (GlobalVar.life > 0) {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    GlobalVar.life--;
                    this.game.state.start(States.CONTINUE, true, false);
                }
                else {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    this.game.state.start(States.MAINMENU, true, false);
                }
            };
            return gslevel1c;
        }(Phaser.State));
        Client.gslevel1c = gslevel1c;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gslevel2a = (function (_super) {
            __extends(gslevel2a, _super);
            function gslevel2a() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.objectX = [-449];
                _this.objectY = [75];
                _this.objectName = ['goEBoss1'];
                _this.objectArray = [];
                _this.enemyArray = [];
                _this.batarangX = [-1091, -762, -245.75];
                _this.batarangY = [-39.8, -29.6, -44];
                _this.batarangArray = [];
                _this.wievCamera = 200;
                _this.endLevel = false;
                return _this;
            }
            gslevel2a.prototype.destroy = function () {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i] = null;
                }
                this.objectArray = [];
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i] = null;
                }
                this.enemyArray = [];
                this.endLevel = false;
            };
            gslevel2a.prototype.create = function () {
                this.destroy();
                GlobalVar.levelContinue = States.LEVEL1C;
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.gravity.y = 1900;
                this.game.physics.p2.restitution = 0;
                this.game.physics.p2.setBounds(-4150, -1500, 10000, 2000);
                this.game.physics.p2.onBeginContact.add(this.beginContactListeners, this);
                this.game.physics.p2.setImpactEvents(true);
                GlobalVar.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
                GlobalVar.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();
                this.game.physics.p2.updateBoundsCollisionGroup();
                this.add.existing(this.mainDummy);
                this.bg = new Phaser.Sprite(this.game, 0, 0, 'level1aAtlas', 'bg');
                this.mainDummy.addChild(this.bg);
                this.bg.fixedToCamera = true;
                this.buildLevel();
                this.game.world.setBounds(-1400, -280, 2330, 500);
                GlobalVar.bleft = this.game.world.position.x;
                GlobalVar.bRight = this.game.world.position.x + this.game.world.width;
                this.player = new Client.goBatman(this.game, -1250, 42.5);
                this.player.scale.x = 1;
                this.player.onAttack.add(this.checkAttack, this);
                this.player.onBatarang.add(this.fireBatarang, this);
                this.mainDummy.addChild(this.player);
                this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
                this.game.camera.setPosition(this.player.x, this.player.y);
                this.game.camera.deadzone = new Phaser.Rectangle(100, 280, 0, 0);
                this.guiPanel = new Client.goGuiPanel(this.game, 300, 35);
                this.guiPanel.anchor.set(0.5);
                this.mainDummy.addChild(this.guiPanel);
                this.guiPanel.setLife(2);
                this.guiPanel.fixedToCamera = true;
                this.fade = new Client.gFade(this.game, 300, 200);
                this.mainDummy.addChild(this.fade);
                this.fade.fixedToCamera = true;
                this.fade.setFadeOut(false);
                this.fade.onComplete.addOnce(this.destroyFade, this);
                this.fade.start();
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.punchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                this.batarangButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.kickButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                SndMng.playMusic(SndMng.LEVEL1C, 1, 1);
            };
            gslevel2a.prototype.fireBatarang = function (e) {
                GlobalVar.batarang--;
                var btrng = new Client.goBatarang(this.game, this.player.x + (this.player.scale.x * 50), this.player.y - e.y);
                this.objectArray.push(btrng);
                this.mainDummy.addChild(btrng);
                btrng.body.velocity.x = this.player.scale.x * 1000;
            };
            gslevel2a.prototype.checkAttack = function (e) {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i].attack(this.player.x, this.player.y, e);
                }
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].attack(this.player.x, this.player.y, e);
                }
            };
            gslevel2a.prototype.attackedBatman = function (e) {
                this.player.hurt(e);
            };
            gslevel2a.prototype.destroyFade = function () {
                this.fade.visible = false;
            };
            gslevel2a.prototype.beginContactListeners = function (body, bodyB, shapeA, shapeB, equation) {
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'chck' && body.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(bodyB.parent.sprite.data.var);
                            }
                            if (body.parent.sprite.data.name == 'chck' && bodyB.parent.sprite.data.name == 'player') {
                                this.instruction.showInstruction(body.parent.sprite.data.var);
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'batarang' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.body.clearShapes();
                                bodyB.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                            if (body.parent.sprite.data.name == 'batarang' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.body.clearShapes();
                                body.parent.sprite.visible = false;
                                SndMng.sfxPlay(SndMng.SFX_ITEM);
                                GlobalVar.batarang += 5;
                                GlobalVar.score += 5;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'firebatarang' && body.parent.sprite.data.name == 'enemy') {
                                if (body.parent.sprite.useEvent()) {
                                    bodyB.parent.sprite.visible = false;
                                }
                            }
                            if (body.parent.sprite.data.name == 'firebatarang' && bodyB.parent.sprite.data.name == 'enemy') {
                                if (bodyB.parent.sprite.useEvent()) {
                                    body.parent.sprite.visible = false;
                                }
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'can' && body.parent.sprite.data.name == 'player') {
                                bodyB.parent.sprite.useEvent();
                            }
                            if (body.parent.sprite.data.name == 'can' && bodyB.parent.sprite.data.name == 'player') {
                                body.parent.sprite.useEvent();
                            }
                        }
                    }
                }
            };
            gslevel2a.prototype.buildLevel = function () {
                var down = new Phaser.Sprite(this.game, -870, 310, 'level1cAtlas', 'down');
                down.scale.set(100, 10);
                down.anchor.set(0.5);
                this.mainDummy.addChild(down);
                var top = new Phaser.Sprite(this.game, -870, -402, 'level1cAtlas', 'top');
                top.scale.set(100, 5);
                top.anchor.set(0.5);
                this.mainDummy.addChild(top);
                var ground = new Phaser.Sprite(this.game, -238, -85.3, 'level1cAtlas', 'front');
                var scle = 1 + (1 - uMath.fromPercent(80, 100) / 100);
                console.log(scle);
                ground.scale.set(scle);
                ground.anchor.set(0.5);
                this.mainDummy.addChild(ground);
                var car = new Phaser.Sprite(this.game, 832.15, 10.05, 'level1cAtlas', 'car0001');
                car.anchor.set(0.5);
                car.animations.add('car', Phaser.Animation.generateFrameNames('car', 1, 19, '', 4), 25, true);
                this.mainDummy.addChild(car);
                car.play('car');
                this.game.physics.p2.enable(ground);
                ground.body.setRectangle(ground.width - 50, 50, 0, 210);
                ground.body.static = true;
                ground.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                ground.body.collides([GlobalVar.worldCollisionGroup, GlobalVar.playerCollisionGroup, GlobalVar.enemyCollisionGroup]);
                for (var i = 0; i < this.objectName.length; i++) {
                    var newobj;
                    switch (this.objectName[i]) {
                        case 'goEBoss1': {
                            newobj = new Client.goEBoss1(this.game, this.objectX[i], this.objectY[i]);
                            newobj.onAttack.add(this.attackedBatman, this);
                            this.enemyArray.push(newobj);
                            break;
                        }
                    }
                    this.mainDummy.addChild(newobj);
                }
                for (var i = 0; i < this.batarangX.length; i++) {
                    var btrng = new Phaser.Sprite(this.game, this.batarangX[i] + 25, this.batarangY[i], 'gameObjectAtlas', 'batarang');
                    btrng.anchor.set(0.5);
                    this.mainDummy.addChild(btrng);
                    this.batarangArray.push(btrng);
                    this.game.physics.p2.enable(btrng);
                    btrng.body.setRectangle(50, 50, 0, 0);
                    btrng.body.static = true;
                    btrng.body.data.shapes[0].sensor = true;
                    btrng.data.name = 'batarang';
                    btrng.body.setCollisionGroup(GlobalVar.worldCollisionGroup);
                    btrng.body.collides(GlobalVar.playerCollisionGroup, GlobalVar.worldCollisionGroup);
                }
            };
            gslevel2a.prototype.update = function () {
                for (var i = 0; i < this.objectArray.length; i++) {
                    this.objectArray[i].logicUpdate(this.player.x, this.player.y);
                }
                for (var i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].logicUpdate(this.player.x, this.player.y);
                }
                if (this.fade) {
                    if (this.fade.visible) {
                        this.fade.update();
                    }
                }
                if (this.endLevel) {
                    var pass = true;
                    for (var i = 0; i < this.enemyArray.length; i++) {
                        if (!this.enemyArray[i].death) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        console.log(this.enemyArray.length);
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.start();
                            this.fade.onComplete.addOnce(this.nextLevel, this);
                            this.game.camera.unfollow();
                        }
                    }
                }
                if (this.cursors.left.isDown) {
                    this.game.camera.deadzone.setTo(500, 280, 0, 0);
                    this.player.moveLeft();
                    this.player.scale.x = -1;
                }
                else if (this.cursors.right.isDown) {
                    this.game.camera.deadzone.setTo(100, 280, 0, 0);
                    this.player.moveRight();
                    this.player.scale.x = 1;
                }
                else if (this.cursors.up.isDown) {
                    this.player.seeUp();
                }
                else if (this.cursors.down.isDown) {
                    this.player.sitDown();
                }
                else {
                    this.player.stopMove();
                }
                if (this.jumpButton.isDown) {
                    this.player.jump();
                }
                if (this.punchButton.isDown) {
                    this.player.punch();
                }
                if (this.kickButton.isDown) {
                    this.player.kick();
                }
                if (this.punchButton.isUp) {
                    this.player.punchButtonUp();
                }
                if (this.batarangButton.isDown) {
                    if (GlobalVar.batarang > 0) {
                        this.player.batarang();
                    }
                }
                this.player.update();
                this.guiPanel.setHealth(this.player.health);
                this.guiPanel.setLife(GlobalVar.life);
                this.guiPanel.setScore(GlobalVar.score);
                this.guiPanel.setBatarantg(GlobalVar.batarang);
                {
                    var pass = true;
                    for (var i = 0; i < this.enemyArray.length; i++) {
                        if (!this.enemyArray[i].death) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        console.log(this.enemyArray.length);
                        if (!this.fade.visible) {
                            this.fade.visible = true;
                            this.fade.setFadeOut(true);
                            this.fade.start();
                            this.fade.onComplete.addOnce(this.nextLevel, this);
                            this.game.camera.unfollow();
                        }
                    }
                }
                if (this.player.health <= 0) {
                    if (!this.fade.visible) {
                        this.fade.visible = true;
                        this.fade.setFadeOut(true);
                        this.fade.onComplete.addOnce(this.showClipDeath, this);
                        this.fade.start();
                        this.player.death = true;
                    }
                }
            };
            gslevel2a.prototype.nextLevel = function () {
                this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                this.game.state.start(States.CLIP2, true, false);
            };
            gslevel2a.prototype.showClipDeath = function () {
                if (GlobalVar.life > 0) {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    GlobalVar.life--;
                    this.game.state.start(States.CONTINUE, true, false);
                }
                else {
                    this.game.physics.p2.onBeginContact.remove(this.beginContactListeners, this);
                    this.game.state.start(States.MAINMENU, true, false);
                }
            };
            return gslevel2a;
        }(Phaser.State));
        Client.gslevel2a = gslevel2a;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsMainMenu = (function (_super) {
            __extends(gsMainMenu, _super);
            function gsMainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gsMainMenu.prototype.create = function () {
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.background = new Phaser.Sprite(this.game, 0, 0, 'menuAtlas', 'bg');
                this.background.anchor.set(0.5);
                this.mainDummy.addChild(this.background);
                this.btnPlay = new Phaser.Button(this.game, 200, 140, 'menuAtlas', this.clickPlay, this, 'title_playgame_btn0002', 'title_playgame_btn0001');
                this.btnPlay.anchor.set(0.5);
                this.btnPlay.scale.set(0.6);
                this.mainDummy.addChild(this.btnPlay);
                this.btnInstruction = new Phaser.Button(this.game, 200, 175, 'menuAtlas', this.clickInstruction, this, 'titleinstruct_btn0002', 'titleinstruct_btn0001');
                this.btnInstruction.anchor.set(0.5);
                this.btnInstruction.scale.set(0.6);
                this.mainDummy.addChild(this.btnInstruction);
                SndMng.stopAllMusic();
                SndMng.sfxPlay(SndMng.MENU, 1);
                GlobalVar.score = 0;
                GlobalVar.life = 5;
                GlobalVar.batarang = 0;
            };
            gsMainMenu.prototype.clickPlay = function () {
                this.fade = new Client.gFade(this.game, 0, 0);
                this.fade.onComplete.addOnce(this.showIntro, this);
                this.fade.start();
                this.mainDummy.addChild(this.fade);
            };
            gsMainMenu.prototype.showIntro = function () {
                this.game.state.start(States.CLIP1, true, false);
            };
            gsMainMenu.prototype.clickInstruction = function () {
                this.fade = new Client.gFade(this.game, 0, 0);
                this.fade.onComplete.addOnce(this.showInstructions, this);
                this.fade.start();
                this.mainDummy.addChild(this.fade);
            };
            gsMainMenu.prototype.showInstructions = function () {
                this.game.state.start(States.INSTRUCTIONS, true, false);
            };
            gsMainMenu.prototype.update = function () {
                if (this.fade) {
                    this.fade.update();
                }
            };
            return gsMainMenu;
        }(Phaser.State));
        Client.gsMainMenu = gsMainMenu;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gsPreloader = (function (_super) {
            __extends(gsPreloader, _super);
            function gsPreloader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.soundsDecodeWaiting = false;
                _this.soundsLoading = [];
                return _this;
            }
            gsPreloader.prototype.preload = function () {
                this.dummyLoader = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.dummyLoader.anchor.set(0.5);
                this.add.existing(this.dummyLoader);
                var preloader_bg = new Phaser.Sprite(this.game, 0, 0, 'preloader_atlas', 'cnlogo');
                preloader_bg.anchor.set(0.5);
                this.dummyLoader.addChild(preloader_bg);
                this.preloadBar = new Phaser.Sprite(this.game, 0, 100, 'preloader_atlas', 'preloader_bar');
                this.preloadBar.anchor.set(0.5);
                this.dummyLoader.addChild(this.preloadBar);
                this.preloadProgress = new Phaser.Sprite(this.game, 0, 100, 'preloader_atlas', 'preload_progress0001');
                this.preloadProgress.x = -this.preloadProgress.width / 2;
                this.preloadProgress.y = this.preloadProgress.y - this.preloadProgress.height / 2;
                this.preloadProgress.animations.add('play', Phaser.Animation.generateFrameNames('preload_progress', 1, 10, '', 4), 24, true);
                this.preloadProgress.play('play');
                this.dummyLoader.addChild(this.preloadProgress);
                this.load.atlasJSONArray('menuAtlas', './assets/atlases/menu_atlas.png', './assets/atlases/menu_atlas.json');
                this.load.atlasJSONArray('clip1Atlas', './assets/atlases/clip1_atlas.png', './assets/atlases/clip1_atlas.json');
                this.load.atlasJSONArray('clip2Atlas', './assets/atlases/clip2_atlas.png', './assets/atlases/clip2_atlas.json');
                this.load.atlasJSONArray('level1aAtlas', './assets/atlases/level1a_atlas.png', './assets/atlases/level1a_atlas.json');
                this.load.atlasJSONArray('level1bAtlas', './assets/atlases/level1b_atlas.png', './assets/atlases/level1b_atlas.json');
                this.load.atlasJSONArray('level1cAtlas', './assets/atlases/level1c_atlas.png', './assets/atlases/level1c_atlas.json');
                this.load.atlasJSONArray('batmanAtlas', './assets/atlases/batmananim_atlas.png', './assets/atlases/batmananim_atlas.json');
                this.load.atlasJSONArray('instrAtlas', './assets/atlases/gameoInstruction_atlas.png', './assets/atlases/gameoInstruction_atlas.json');
                this.load.atlasJSONArray('gameObjectAtlas', './assets/atlases/gameobject_atlas.png', './assets/atlases/gameobject_atlas.json');
                this.load.atlasJSONArray('continueAtlas', './assets/atlases/continue_atlas.png', './assets/atlases/continue_atlas.json');
                this.load.atlasJSONArray('enemyAtlas', './assets/atlases/enemy_atlas.png', './assets/atlases/enemy_atlas.json');
                this.load.atlasJSONArray('bossAtlas1', './assets/atlases/boss1_atlas.png', './assets/atlases/boss1_atlas.json');
                this.load.bitmapFont('myFont', './assets/atlases/font.png', './assets/atlases/font.xml');
                SndMng.init(this.game, true, true);
                var sndFiles = SndMng.LOAD_SOUNDS;
                for (var i = 0; i < sndFiles.length; i++) {
                    var mp3 = './assets/audio/' + sndFiles[i] + '.mp3';
                    this.load.audio(sndFiles[i], [mp3]);
                    this.soundsLoading.push(sndFiles[i]);
                }
                this.load.setPreloadSprite(this.preloadProgress);
            };
            gsPreloader.prototype.create = function () {
                this.soundsDecodeWaiting = true;
            };
            gsPreloader.prototype.onSoundsDecoded = function () {
                this.game.time.events.add(1000, this.onContinueCreate, this);
            };
            gsPreloader.prototype.onContinueCreate = function () {
                if (Params.isMacOS) {
                    this.dummyLoader.visible = false;
                    var spr = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2, 'game', 'youtube-like-start-icon');
                    spr.anchor.set(0.5);
                    this.add.existing(spr);
                    this.input.onDown.addOnce(this.startMainMenu, this);
                }
                else {
                    this.showLogo();
                }
            };
            gsPreloader.prototype.showLogo = function () {
                this.game.add.tween(this.preloadProgress).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.preloadBar).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.startMainMenu, this);
            };
            gsPreloader.prototype.startMainMenu = function () {
                if (Params.isMacOS) {
                }
                this.game.state.start(States.MAINMENU, true, false);
            };
            gsPreloader.prototype.update = function () {
                if (!this.soundsDecodeWaiting)
                    return;
                var sndDecoded = true;
                for (var i = 0; i < this.soundsLoading.length; i++) {
                    var sndName = this.soundsLoading[i];
                    if (!this.game.cache.isSoundDecoded(sndName)) {
                        sndDecoded = false;
                        break;
                    }
                }
                if (sndDecoded) {
                    this.soundsDecodeWaiting = false;
                    this.onSoundsDecoded();
                }
            };
            return gsPreloader;
        }(Phaser.State));
        Client.gsPreloader = gsPreloader;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var States;
(function (States) {
    States.BOOT = 'Boot';
    States.PRELOADER = 'Preloader';
    States.MAINMENU = 'MainMenu';
    States.GAME = 'Game';
    States.INSTRUCTIONS = 'Instructions';
    States.CLIP1 = 'Clip1';
    States.CLIP2 = 'Clip2';
    States.LEVEL1A = 'Level1a';
    States.LEVEL1B = 'Level1b';
    States.LEVEL1C = 'Level1c';
    States.LEVEL2A = 'Level2a';
    States.CONTINUE = 'Continue';
})(States || (States = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var gFade = (function (_super) {
            __extends(gFade, _super);
            function gFade(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.complete = true;
                _this.onComplete = new Phaser.Signal();
                _this.fadeOut = true;
                _this.fade = new Phaser.Sprite(_this.game, 0, 0, 'menuAtlas', 'fade');
                _this.fade.anchor.set(0.5);
                _this.fade.width = 600 * 6;
                _this.fade.height = 400 * 6;
                _this.addChild(_this.fade);
                _this.topLine = new Phaser.Sprite(_this.game, 0, -Config.GH / 2, 'menuAtlas', 'width');
                _this.topLine.height = 0;
                _this.topLine.anchor.set(0.5, 0);
                _this.addChild(_this.topLine);
                _this.downLine = new Phaser.Sprite(_this.game, 0, Config.GH / 2, 'menuAtlas', 'width');
                _this.downLine.anchor.set(0.5, 1);
                _this.downLine.height = 0;
                _this.addChild(_this.downLine);
                _this.leftLine = new Phaser.Sprite(_this.game, -Config.GW / 2, 0, 'menuAtlas', 'height');
                _this.leftLine.width = 0;
                _this.leftLine.anchor.set(0, 0.5);
                _this.addChild(_this.leftLine);
                _this.rightLine = new Phaser.Sprite(_this.game, Config.GW / 2, 0, 'menuAtlas', 'height');
                _this.rightLine.width = 0;
                _this.rightLine.anchor.set(1, 0.5);
                _this.addChild(_this.rightLine);
                return _this;
            }
            gFade.prototype.setFadeOut = function (fade) {
                if (fade === void 0) { fade = true; }
                this.fadeOut = fade;
                if (fade == true) {
                    this.fade.width = 600 * 6;
                    this.fade.height = 400 * 6;
                    this.downLine.height = 0;
                    this.leftLine.width = 0;
                    this.rightLine.width = 0;
                    this.topLine.height = 0;
                }
                else {
                    this.fade.width = 6;
                    this.fade.height = 4;
                    var numh = 410 - this.fade.height;
                    numh = Math.round(numh / 2);
                    this.topLine.height = numh;
                    this.downLine.height = numh;
                    var numw = 610 - this.fade.width;
                    numw = Math.round(numw / 2);
                    this.leftLine.width = numw;
                    this.rightLine.width = numw;
                }
            };
            gFade.prototype.start = function () {
                this.complete = false;
            };
            gFade.prototype.update = function () {
                if (!this.complete) {
                    if (this.fadeOut) {
                        if (this.fade.width > 10) {
                            this.fade.width -= this.fade.width / 10;
                            this.fade.height -= this.fade.height / 10;
                            if (this.fade.height < 400) {
                                var numh = 410 - this.fade.height;
                                numh = Math.round(numh / 2);
                                this.topLine.height = numh;
                                this.downLine.height = numh;
                                var numw = 610 - this.fade.width;
                                numw = Math.round(numw / 2);
                                this.leftLine.width = numw;
                                this.rightLine.width = numw;
                            }
                        }
                        else {
                            if (!this.complete) {
                                this.complete = true;
                                this.onComplete.dispatch();
                            }
                        }
                    }
                    else {
                        if (this.fade.width < 600 * 6) {
                            this.fade.width += this.fade.width / 5;
                            this.fade.height += this.fade.height / 5;
                            if (this.fade.height > 0) {
                                var numh = 410 - this.fade.height;
                                numh = Math.round(numh / 2);
                                this.topLine.height = numh;
                                this.downLine.height = numh;
                                var numw = 610 - this.fade.width;
                                numw = Math.round(numw / 2);
                                this.leftLine.width = numw;
                                this.rightLine.width = numw;
                            }
                        }
                        else {
                            if (!this.complete) {
                                this.complete = true;
                                this.onComplete.dispatch();
                            }
                        }
                    }
                }
            };
            return gFade;
        }(Phaser.Sprite));
        Client.gFade = gFade;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goGuiPanel = (function (_super) {
            __extends(goGuiPanel, _super);
            function goGuiPanel(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.sprite = new Phaser.Sprite(_this.game, 0, 0, 'gameObjectAtlas', 'guipanel');
                _this.sprite.anchor.set(0.5);
                _this.addChild(_this.sprite);
                _this.maskedlife = new Phaser.Sprite(_this.game, -0, 8, 'gameObjectAtlas', 'maskedlife');
                _this.maskedlife.anchor.set(0.5);
                _this.addChild(_this.maskedlife);
                _this.tmask = game.add.graphics(-0, 8);
                _this.tmask.beginFill(0xffffff);
                _this.tmask.anchor.set(0.5);
                _this.tmask.drawCircle(0, 0, 75);
                _this.addChild(_this.tmask);
                _this.maskedlife.mask = _this.tmask;
                _this.lifesprite = new Phaser.Sprite(_this.game, -0, 8, 'gameObjectAtlas', 'bglife');
                _this.lifesprite.anchor.set(0.5);
                _this.addChild(_this.lifesprite);
                _this.lifeText = new Phaser.BitmapText(_this.game, 0, 30, 'myFont', '', 12);
                _this.lifeText.text = 'Lives x5';
                _this.lifeText.smoothed = true;
                _this.lifeText.anchor.set(0.5);
                _this.addChild(_this.lifeText);
                _this.batarangText = new Phaser.BitmapText(_this.game, -88, 27, 'myFont', '', 16);
                _this.batarangText.text = '18';
                _this.batarangText.smoothed = true;
                _this.batarangText.anchor.set(0.5);
                _this.addChild(_this.batarangText);
                _this.scoreText = new Phaser.BitmapText(_this.game, 85, 15, 'myFont', '', 32);
                _this.scoreText.text = '0';
                _this.scoreText.smoothed = true;
                _this.scoreText.anchor.set(0.5);
                _this.addChild(_this.scoreText);
                return _this;
            }
            goGuiPanel.prototype.setHealth = function (health) {
                this.tmask.scale.set(1 - ((10 - health) / 10));
            };
            goGuiPanel.prototype.setLife = function (life) {
                this.lifeText.text = 'Lives x' + life;
            };
            goGuiPanel.prototype.setScore = function (score) {
                this.scoreText.text = '' + score;
            };
            goGuiPanel.prototype.setBatarantg = function (batarang) {
                this.batarangText.text = '' + batarang;
            };
            goGuiPanel.prototype.update = function () {
            };
            return goGuiPanel;
        }(Phaser.Sprite));
        Client.goGuiPanel = goGuiPanel;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var LoadMng;
(function (LoadMng) {
    var SceneLoader = (function () {
        function SceneLoader(game) {
            this.isLoadingComplete = false;
            this.game = game;
        }
        SceneLoader.prototype.startLoading = function () {
            this.onLoading1Complete();
        };
        SceneLoader.prototype.onLoading1Complete = function () {
            LogMng.debug('LoadMng: loading complete!');
            this.isLoadingComplete = true;
        };
        return SceneLoader;
    }());
    LoadMng.SceneLoader = SceneLoader;
})(LoadMng || (LoadMng = {}));
var LogMng;
(function (LogMng) {
    LogMng.MODE_DEBUG = 'MODE_DEBUG';
    LogMng.MODE_RELEASE = 'MODE_RELEASE';
    var DEBUG = 'DEBUG';
    var INFO = 'INFO';
    var NETWORK = 'NETWORK';
    var WARNING = 'WARNING';
    var ERROR = 'ERROR';
    var mode = LogMng.MODE_DEBUG;
    var levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
    function setMode(aMode) {
        mode = aMode;
        switch (mode) {
            case LogMng.MODE_DEBUG:
                levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
                break;
            case LogMng.MODE_RELEASE:
                levels = [WARNING, ERROR];
                break;
        }
    }
    LogMng.setMode = setMode;
    function getMode() {
        return mode;
    }
    LogMng.getMode = getMode;
    function getCSS(bgColor) {
        return 'background: ' + bgColor + ';' +
            'background-repeat: no-repeat;' +
            'color: #1df9a8;' +
            'line-height: 16px;' +
            'padding: 1px 0;' +
            'margin: 0;' +
            'user-select: none;' +
            '-webkit-user-select: none;' +
            '-moz-user-select: none;';
    }
    ;
    function getLink(color) {
        return 'background: ' + color + ';' +
            'background-repeat: no-repeat;' +
            'font-size: 12px;' +
            'color: #446d96;' +
            'line-height: 14px';
    }
    ;
    function log(aMsg, aLevel) {
        if (aLevel === void 0) { aLevel = DEBUG; }
        if (levels.indexOf(aLevel) < 0)
            return;
        var css = '';
        switch (aLevel) {
            case INFO:
                css = 'background: #308AE4; color: #fff; padding: 1px 4px';
                break;
            case WARNING:
                css = 'background: #f7a148; color: #fff; padding: 1px 4px';
                break;
            case ERROR:
                css = 'background: #DB5252; color: #fff; padding: 1px 4px';
                break;
            case NETWORK:
                css = 'background: #7D2998; color: #fff; padding: 1px 4px';
                break;
            case DEBUG:
            default:
                css = 'background: #ADADAD; color: #fff; padding: 1px 4px';
        }
        console.log("%c%s", css, aLevel, aMsg);
    }
    ;
    function system(aMsg, aLink) {
        if (aLink === void 0) { aLink = ''; }
        console.log("%c %c %c %s %c %c %c %c%s", getCSS('#5C6166'), getCSS('#4F5357'), getCSS('#313335'), aMsg, getCSS('#4F5357'), getCSS('#5C6166'), getLink('none'), getLink('none'), aLink);
    }
    LogMng.system = system;
    function debug(aMsg) {
        log(aMsg, DEBUG);
    }
    LogMng.debug = debug;
    function info(aMsg) {
        log(aMsg, INFO);
    }
    LogMng.info = info;
    function net(aMsg) {
        log(aMsg, NETWORK);
    }
    LogMng.net = net;
    function warn(aMsg) {
        log(aMsg, WARNING);
    }
    LogMng.warn = warn;
    function error(aMsg) {
        log(aMsg, ERROR);
    }
    LogMng.error = error;
})(LogMng || (LogMng = {}));
var ScaleManager = (function () {
    function ScaleManager() {
    }
    ScaleManager.init = function (aGame, aDomId, GW, GH, GSW, GSH) {
        this.game = aGame;
        this.dom_id = aDomId;
        this.dom = document.getElementById(this.dom_id);
        this.game_w = GW;
        this.game_h = GH;
        this.game_sw = GSW;
        this.game_sh = GSH;
        aGame.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.isDesktop = this.game.device.desktop;
        ScaleManager.SizeCalculation();
        window.onresize = function () {
            ScaleManager.SizeCalculation();
        };
    };
    ScaleManager.doEventOriChange = function () {
        this.onOrientationChange.dispatch(this.isPortrait);
    };
    ScaleManager.SizeCalculation = function () {
        var wnd = {
            w: window.innerWidth,
            h: window.innerHeight
        };
        var oldOri = this.isPortrait;
        this.isPortrait = wnd.h > wnd.w;
        var g = {
            w: ScaleManager.game_w,
            h: ScaleManager.game_h,
            sw: ScaleManager.game_sw,
            sh: ScaleManager.game_sh
        };
        var gw;
        var gh;
        if (g.h / g.w > wnd.h / wnd.w) {
            if (g.sh / g.w > wnd.h / wnd.w) {
                gh = wnd.h * g.h / g.sh;
                gw = gh * g.w / g.h;
            }
            else {
                gw = wnd.w;
                gh = gw * g.h / g.w;
            }
        }
        else {
            if (g.h / g.sw > wnd.h / wnd.w) {
                gh = wnd.h;
                gw = gh * g.w / g.h;
            }
            else {
                gw = wnd.w * g.w / g.sw;
                gh = gw * g.h / g.w;
            }
        }
        var scale_x = gw / g.w;
        var scale_y = gh / g.h;
        var newScale = Math.min(scale_x, scale_y);
        ScaleManager.game.scale.setUserScale(newScale, newScale, 0, 0);
        this.dtx = (wnd.w - gw) / 2;
        this.dty = (wnd.h - gh) / 2;
        this.gameViewW = this.game_w + 2 * this.dtx / newScale;
        if (this.gameViewW > this.game_w)
            this.gameViewW = this.game_w;
        this.gameViewH = this.game_h + 2 * this.dty / newScale;
        if (this.gameViewH > this.game_h)
            this.gameViewH = this.game_h;
        this.dom.style.marginLeft = Math.round(this.dtx).toString() + 'px';
        if (!this.isDesktop && this.isPortrait) {
            this.dom.style.marginTop = '0px';
        }
        else {
            this.dom.style.marginTop = Math.round(this.dty).toString() + 'px';
        }
        this.dom.style.maxWidth = String(gw) + 'px';
        this.dom.style.maxHeight = String(gh) + 'px';
        ScaleManager.game.scale.refresh();
        this.updateRotationIcon();
        if (this.isPortrait != oldOri) {
            this.doEventOriChange();
        }
    };
    ScaleManager.updateRotationIcon = function () {
        var MAX_PERC = 24;
        if (!this.isDesktop) {
            if (this.isPortrait) {
                this.showRotateIcon();
            }
            else {
                this.hideRotateIcon();
                return;
            }
            var wnd = {
                w: window.innerWidth,
                h: window.innerHeight
            };
            var rp_div = document.getElementById("rp-div");
            var rp_img = document.getElementById("rp-img");
            var com_h = this.dom.clientHeight + rp_div.clientHeight;
            var perc = MAX_PERC;
            if (rp_img.style.height != null && rp_img.style.height != undefined && rp_img.style.height != '') {
                if (rp_img.style.height.indexOf('%') > 0)
                    perc = Number(rp_img.style.height.split('%')[0]);
            }
            if (com_h > wnd.h) {
                while (com_h > wnd.h) {
                    perc--;
                    rp_img.style.width = rp_img.style.height = String(perc) + '%';
                    com_h = this.dom.clientHeight + rp_div.clientHeight;
                }
            }
            else {
                while (perc < MAX_PERC && com_h < wnd.h - 10) {
                    perc++;
                    rp_img.style.width = rp_img.style.height = String(perc) + '%';
                    com_h = this.dom.clientHeight + rp_div.clientHeight;
                }
            }
            var bot_h = wnd.h - this.dom.clientHeight;
            rp_div.style.paddingTop = String((bot_h - rp_img.clientHeight) / 2) + 'px';
        }
    };
    ScaleManager.showRotateIcon = function () {
        document.getElementById("rp-div").style.display = "block";
    };
    ScaleManager.hideRotateIcon = function () {
        document.getElementById("rp-div").style.display = "none";
    };
    ScaleManager.dom_id = '';
    ScaleManager.isDesktop = false;
    ScaleManager.dtx = 0;
    ScaleManager.dty = 0;
    ScaleManager.onOrientationChange = new Phaser.Signal();
    return ScaleManager;
}());
var SndMng;
(function (SndMng) {
    SndMng.currentMusic = '';
    SndMng.CLIP_1 = 'clip1';
    SndMng.MENU = 'menu';
    SndMng.LEVEL1A = 'level1a';
    SndMng.LEVEL1B = 'level1b';
    SndMng.LEVEL1C = 'level1c';
    SndMng.SFX_JUMP = 'jump';
    SndMng.SFX_ITEM = 'item';
    SndMng.SFX_BITA = 'attackbita';
    SndMng.SFX_DOWN = 'down';
    SndMng.SFX_DIE1 = 'die1';
    SndMng.SFX_PUNCH = 'punch';
    SndMng.SFX_METAL1 = 'metal1';
    SndMng.SFX_KICK = 'kick';
    SndMng.SFX_BIKE = 'bike';
    SndMng.SFX_BIKE_DIE = 'bikedie';
    SndMng.SFX_HIHI = 'hihi';
    SndMng.SFX_BATIG = 'batig';
    SndMng.SFX_EXPLODE = 'explode';
    SndMng.SFX_ELECTRO = 'electro';
    SndMng.LOAD_SOUNDS = [SndMng.SFX_METAL1, SndMng.SFX_ELECTRO, SndMng.LEVEL1C, SndMng.SFX_EXPLODE, SndMng.SFX_BATIG, SndMng.SFX_HIHI, SndMng.SFX_BIKE_DIE, SndMng.SFX_KICK, SndMng.CLIP_1, SndMng.SFX_BIKE, SndMng.SFX_DIE1, SndMng.SFX_PUNCH, SndMng.SFX_DOWN, SndMng.MENU, SndMng.LEVEL1A, SndMng.SFX_JUMP, SndMng.SFX_ITEM, SndMng.LEVEL1B, SndMng.SFX_BITA];
    var MUS_MAX_VOL = 1;
    var game;
    var enabledMusic;
    var enabledSfx;
    var musics = [];
    var previos;
    function getMusic(aName) {
        for (var i = 0; i < musics.length; i++) {
            var data = musics[i];
            if (data.name == aName)
                return data.mus;
        }
        return null;
    }
    function init(aGame, aEnabledMusic, aEnabledSfx) {
        game = aGame;
        enabledMusic = aEnabledMusic;
        enabledSfx = aEnabledSfx;
    }
    SndMng.init = init;
    function playMusic(aName, aVolFrom, aVolEnd, aDuration) {
        if (aVolFrom === void 0) { aVolFrom = 0; }
        if (aVolEnd === void 0) { aVolEnd = 1; }
        if (aDuration === void 0) { aDuration = 500; }
        if (SndMng.currentMusic != aName) {
            SndMng.currentMusic = aName;
            stopAllMusic();
            if (!enabledMusic)
                return;
            if (aVolEnd > MUS_MAX_VOL)
                aVolEnd = MUS_MAX_VOL;
            var music = game.add.audio(aName, aVolFrom, true);
            music.volume = aVolFrom;
            music.play();
            game.add.tween(music).to({ volume: aVolEnd }, aDuration, Phaser.Easing.Linear.None, true);
            musics.push({ name: aName, mus: music });
        }
    }
    SndMng.playMusic = playMusic;
    function stopMusicById(id, aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        try {
            var data = musics[id];
            var music = data.mus;
            var tw = game.add.tween(music).to({ volume: aVol }, aDuration, Phaser.Easing.Linear.None, true);
            tw.onComplete.add(function (mus) { mus.stop(); }, null, null, music);
            musics.splice(id, 1);
        }
        catch (e) {
            LogMng.error('SndMng.stopMusicById: ' + e);
        }
    }
    function stopMusicByName(aName, aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        for (var i = musics.length - 1; i >= 0; i++) {
            var data = musics[i];
            if (data.name == aName) {
                stopMusicById(i, aVol, aDuration);
            }
        }
    }
    SndMng.stopMusicByName = stopMusicByName;
    function stopAllMusic(aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        for (var i = musics.length - 1; i >= 0; i--) {
            stopMusicById(i);
        }
    }
    SndMng.stopAllMusic = stopAllMusic;
    function setEnabledMusic(aEnabled) {
        enabledMusic = aEnabled;
        if (enabledMusic) {
        }
        else {
            stopAllMusic();
        }
    }
    SndMng.setEnabledMusic = setEnabledMusic;
    function getEnabledMusic() {
        return enabledMusic;
    }
    SndMng.getEnabledMusic = getEnabledMusic;
    function getEnabledSfx() {
        return enabledSfx;
    }
    SndMng.getEnabledSfx = getEnabledSfx;
    function setEnabledSfx(aEnable) {
        enabledSfx = aEnable;
    }
    SndMng.setEnabledSfx = setEnabledSfx;
    function sfxPlay(aName, aVol) {
        if (aVol === void 0) { aVol = 1; }
        if (!enabledSfx)
            return;
        var snd = game.add.audio(aName, aVol);
        snd.play();
        return snd;
    }
    SndMng.sfxPlay = sfxPlay;
    function update(dt) {
    }
    SndMng.update = update;
})(SndMng || (SndMng = {}));
var MyUtils;
(function (MyUtils) {
    var query_values = null;
    function readQueryValues() {
        var vals = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof vals[pair[0]] === "undefined") {
                vals[pair[0]] = decodeURIComponent(pair[1]);
            }
            else if (typeof vals[pair[0]] === "string") {
                var arr = [vals[pair[0]], decodeURIComponent(pair[1])];
                vals[pair[0]] = arr;
            }
            else {
                vals[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        query_values = vals;
    }
    function getQueryValue(aValName) {
        if (query_values == null)
            readQueryValues();
        return query_values[aValName];
    }
    MyUtils.getQueryValue = getQueryValue;
})(MyUtils || (MyUtils = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var p2Math = (function () {
            function p2Math() {
            }
            p2Math.AddVV = function (a, b) {
                var v = new Client.p2Vec2(a.x + b.x, a.y + b.y);
                return v;
            };
            p2Math.MulFV = function (s, a) {
                var v = new Client.p2Vec2(s * a.x, s * a.y);
                return v;
            };
            p2Math.Dot = function (a, b) {
                return a.x * b.x + a.y * b.y;
            };
            return p2Math;
        }());
        Client.p2Math = p2Math;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var p2Vec2 = (function () {
            function p2Vec2(_x, _y) {
                this.x = _x;
                this.y = _y;
            }
            p2Vec2.prototype.Normalize = function () {
                var length = Math.sqrt(this.x * this.x + this.y * this.y);
                if (length < Number.MIN_VALUE) {
                    return 0.0;
                }
                var invLength = 1.0 / length;
                this.x *= invLength;
                this.y *= invLength;
                return length;
            };
            p2Vec2.prototype.NegativeSelf = function () {
                this.x = -this.x;
                this.y = -this.y;
            };
            p2Vec2.prototype.Multiply = function (a) {
                this.x *= a;
                this.y *= a;
            };
            p2Vec2.prototype.Length = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };
            return p2Vec2;
        }());
        Client.p2Vec2 = p2Vec2;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var TextUtils;
(function (TextUtils) {
    function addZero(aNum, aLen) {
        var text = String(aNum);
        while (text.length < aLen)
            text = '0' + text;
        return text;
    }
    TextUtils.addZero = addZero;
    function sizingBitmapTextByW(aBmpText, aW, aInc, aDec) {
        if (aBmpText.text == '' || aBmpText.height == 0 || aBmpText.width == 0) {
            LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.text == ""');
            LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.width = ' + aBmpText.width);
            LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.height = ' + aBmpText.height);
            return;
        }
        if (aInc) {
            if (aBmpText.width < aW) {
                while (aBmpText.width < aW) {
                    aBmpText.fontSize++;
                }
            }
        }
        if (aDec) {
            if (aBmpText.width > aW) {
                while (aBmpText.width > aW) {
                    aBmpText.fontSize--;
                }
            }
        }
    }
    TextUtils.sizingBitmapTextByW = sizingBitmapTextByW;
    function sizingBitmapTextByH(aBmpText, aH, aInc, aDec) {
        if (aBmpText.text == '' || aBmpText.height == 0 || aBmpText.width == 0) {
            LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.text == ""');
            LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.width = ' + aBmpText.width);
            LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.height = ' + aBmpText.height);
            return;
        }
        if (aInc) {
            if (aBmpText.height < aH) {
                while (aBmpText.height < aH) {
                    aBmpText.fontSize++;
                }
            }
        }
        if (aDec) {
            if (aBmpText.height > aH) {
                while (aBmpText.height > aH) {
                    aBmpText.fontSize--;
                }
            }
        }
    }
    TextUtils.sizingBitmapTextByH = sizingBitmapTextByH;
})(TextUtils || (TextUtils = {}));
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
var uSaveData = (function () {
    function uSaveData() {
    }
    uSaveData.Init = function () {
        uSaveData.myLocalData = [];
        uSaveData.myLocalData = Array();
        var JSONString = localStorage.getItem(uSaveData.nameGame);
        if (!JSONString) {
            JSONString = JSON.stringify(uSaveData.myLocalData);
        }
        uSaveData.myLocalData = JSON.parse(JSONString);
    };
    uSaveData.setItem = function (key, data) {
        var keyName = this.nameGame + key;
        var flag = false;
        for (var i = 0; i < this.myLocalData.length; i++) {
            if (!flag) {
                if (this.myLocalData[i].key == keyName) {
                    this.myLocalData[i].data = data;
                    flag = true;
                }
            }
        }
        if (!flag) {
            this.myLocalData[this.myLocalData.length] = new Object();
            this.myLocalData[this.myLocalData.length - 1].key = keyName;
            this.myLocalData[this.myLocalData.length - 1].data = data;
        }
    };
    uSaveData.saveData = function () {
        var JSONString = JSON.stringify(this.myLocalData);
        localStorage.setItem(uSaveData.nameGame, JSONString);
    };
    uSaveData.getItem = function (key) {
        var keyName = this.nameGame + key;
        var index = -1;
        for (var i = 0; i < this.myLocalData.length; i++) {
            if (this.myLocalData[i].key == keyName) {
                index = i;
            }
        }
        if (index >= 0) {
            return this.myLocalData[index].data;
        }
        else {
            return null;
        }
    };
    uSaveData.clearData = function () {
        localStorage.clear();
        this.myLocalData = [];
        this.myLocalData = null;
        this.myLocalData = new Array();
    };
    uSaveData.myLocalData = new Array();
    uSaveData.nameGame = 'FlambosInferno';
    return uSaveData;
}());
var PhaserNineSlice;
(function (PhaserNineSlice) {
    var NineSlice = (function (_super) {
        __extends(NineSlice, _super);
        function NineSlice(game, x, y, key, frame, width, height, data) {
            var _this = _super.call(this, game, x, y, key, frame) || this;
            _this.baseTexture = _this.texture.baseTexture;
            _this.baseFrame = _this.texture.frame;
            if (frame !== null && !data) {
                data = game.cache.getNineSlice(frame);
            }
            else if (!data) {
                data = game.cache.getNineSlice(key);
            }
            if (undefined === data) {
                return _this;
            }
            _this.topSize = data.top;
            if (!data.left) {
                _this.leftSize = _this.topSize;
            }
            else {
                _this.leftSize = data.left;
            }
            if (!data.right) {
                _this.rightSize = _this.leftSize;
            }
            else {
                _this.rightSize = data.right;
            }
            if (!data.bottom) {
                _this.bottomSize = _this.topSize;
            }
            else {
                _this.bottomSize = data.bottom;
            }
            _this.loadTexture(new Phaser.RenderTexture(_this.game, _this.localWidth, _this.localHeight));
            _this.resize(width, height);
            return _this;
        }
        NineSlice.prototype.renderTexture = function () {
            this.texture.resize(this.localWidth, this.localHeight, true);
            var textureXs = [0, this.leftSize, this.baseFrame.width - this.rightSize, this.baseFrame.width];
            var textureYs = [0, this.topSize, this.baseFrame.height - this.bottomSize, this.baseFrame.height];
            var finalXs = [0, this.leftSize, this.localWidth - this.rightSize, this.localWidth];
            var finalYs = [0, this.topSize, this.localHeight - this.bottomSize, this.localHeight];
            for (var yi = 0; yi < 3; yi++) {
                for (var xi = 0; xi < 3; xi++) {
                    var s = this.createTexturePart(textureXs[xi], textureYs[yi], textureXs[xi + 1] - textureXs[xi], textureYs[yi + 1] - textureYs[yi]);
                    s.width = finalXs[xi + 1] - finalXs[xi];
                    s.height = finalYs[yi + 1] - finalYs[yi];
                    this.texture.renderXY(s, finalXs[xi], finalYs[yi]);
                }
            }
        };
        NineSlice.prototype.resize = function (width, height) {
            this.localWidth = width;
            this.localHeight = height;
            this.renderTexture();
        };
        NineSlice.prototype.createTexturePart = function (x, y, width, height) {
            var frame = new PIXI.Rectangle(this.baseFrame.x + this.texture.frame.x + x, this.baseFrame.y + this.texture.frame.y + y, Math.max(width, 1), Math.max(height, 1));
            return new Phaser.Sprite(this.game, 0, 0, new PIXI.Texture(this.baseTexture, frame));
        };
        return NineSlice;
    }(Phaser.Sprite));
    PhaserNineSlice.NineSlice = NineSlice;
})(PhaserNineSlice || (PhaserNineSlice = {}));
var PhaserNineSlice;
(function (PhaserNineSlice) {
    var Plugin = (function (_super) {
        __extends(Plugin, _super);
        function Plugin(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this.addNineSliceCache();
            _this.addNineSliceFactory();
            _this.addNineSliceLoader();
            return _this;
        }
        Plugin.prototype.addNineSliceLoader = function () {
            Phaser.Loader.prototype.nineSlice = function (key, url, top, left, right, bottom) {
                var cacheData = {
                    top: top
                };
                if (left) {
                    cacheData.left = left;
                }
                if (right) {
                    cacheData.right = right;
                }
                if (bottom) {
                    cacheData.bottom = bottom;
                }
                this.addToFileList('image', key, url);
                this.game.cache.addNineSlice(key, cacheData);
            };
        };
        Plugin.prototype.addNineSliceFactory = function () {
            Phaser.GameObjectFactory.prototype.nineSlice = function (x, y, key, frame, width, height, group) {
                if (group === undefined) {
                    group = this.world;
                }
                var nineSliceObject = new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
                return group.add(nineSliceObject);
            };
            Phaser.GameObjectCreator.prototype.nineSlice = function (x, y, key, frame, width, height) {
                return new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
            };
        };
        Plugin.prototype.addNineSliceCache = function () {
            Phaser.Cache.prototype.nineSlice = {};
            Phaser.Cache.prototype.addNineSlice = function (key, data) {
                this.nineSlice[key] = data;
            };
            Phaser.Cache.prototype.getNineSlice = function (key) {
                var data = this.nineSlice[key];
                if (undefined === data) {
                    console.warn('Phaser.Cache.getNineSlice: Key "' + key + '" not found in Cache.');
                }
                return data;
            };
        };
        return Plugin;
    }(Phaser.Plugin));
    PhaserNineSlice.Plugin = Plugin;
})(PhaserNineSlice || (PhaserNineSlice = {}));
//# sourceMappingURL=game.js.map

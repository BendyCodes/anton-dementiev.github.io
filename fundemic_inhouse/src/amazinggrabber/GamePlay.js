AG.GamePlay = function(soul) {
    this.soul = soul;
    this.tryCount = 0;
    GodStep.Frame.call(this, 'GamePlay', soul.W, soul.H);
    GodStep.IDownUp.call(this, this.W, this.H);
    this.visible = false;


    this.OW = soul.OW;
    this.OH = soul.OH;

    this.prizes = [];
    var S = this.startS = soul.startS;
    this.addChild(this.staticBack = new PIXI.DisplayObjectContainer());


    this.staticBack.addChild(this.back = new AG.Back(soul, 'game_back', null, this));
    this.staticBack.addChild(this.back2 = new AG.Back(soul, 'character_2', null, this));
   // this.staticBack.cacheAsBitmap = true;
    this.staticBack.timerCache = 0;


    this.addFrame(this.face = new AG.Face(this));
    this.addChild(this.line = new AG.Img('line', soul.startS *.9 , this.W *.5, this.H *.7, 0.5));
    this.addFrame(this.flash = new AG.Img('flash_1', soul.startS *.8, 0, 0, 0.5)); this.flash.visible = false; this.flash.sScale = this.flash.scale.x; this.flash.fScale = this.flash.scale.x * 1.3;

    this.addChild(this.grabSprite = new PIXI.DisplayObjectContainer());
    this.addChild(this.fallFlash = new AG.MovieClip(['fall_1', 'fall_2', 'fall_3', 'fall_4'], S *.8, 0, 0, new PIXI.Point(0.5, 1)));
    this.addChild(this.prizeContainer = new PIXI.DisplayObjectContainer());
    this.addFrame(this.hand = new AG.Hand(this));


    this.addChild(this.handMask = new PIXI.Graphics());
    this.hand.mask = this.handMask;
    this.fallFlash.mask = this.handMask;
    this.addFrame(this.safe = new AG.Safe(this));
    this.addChild(this.staticBack2 = new PIXI.DisplayObjectContainer());

    this.addChild(this.b_pause = new AG.ImgButton('50_b_pause', 'b_shadow', 1.1, this, S *.7, this.W *.92, this.H *.82));

    addEvent(this.b_pause, AG.ImgButton.CLICK, this.h_buttons);

    this.safe.mask = this.handMask;
    this.staticBack2.addChild(this.top1 = new AG.Back(soul, 'back_end_down', null, this));
    this.staticBack2.addChild(this.top2 = new AG.Back(soul, 'back_end_up', null, this));// this.staticBack2.cacheAsBitmap = true;
    this.addChild(this.moneyText = new AG.Text('', 160 * S, this.W *.15, this.W *.15, 'right'));
    this.addChild(this.addText = new AG.Text('', 190 * S, this.W *.5, this.W *.5, 'right'));
    this.addChild(this.tutor = new AG.Tutor(soul, this.W *.7, this.H *.75));

    this.addChild(this.pause = new AG.Pause(soul));
    // this.face.visible = false;
    //  this.face.cacheAsBitmap = true;
    //  this.staticBack.visible = false;
    this.moneyText.x = this.W/2 - this.moneyText.width/2;
    this.moneyText.y = this.H*.2;
    //this.hand.visible = this.face.visible = this.staticBack.visible = false;
    //  this.staticBack2.visible = false;
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);

};

extend(AG.GamePlay, GodStep.Frame);
AG.FRAME_RATE = 1/60;
AG.START_HAND = [0.1,.81];
AG.END_HAND = [.82, .67];

pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};
pro.equip = function(data, isEquip) {
    var type = data[2].substr(0, 3);
    switch (type) {
        case 'arm':
            this.hand.equip(data, isEquip);
            break;
        case 'hea':
            this.face.equip(data, isEquip);
            break;
    }
};
pro.update = function() {
    if(this.pause.visible) {
        return;
    }
    var frameRATE = AG.FRAME_RATE;
    if(this.tutor.visible) {
        this.tutor.nextFrame();
    }
    if( this.staticBack.timerCache-- == 0) {
        this.staticBack.timerCache = -1;
       // this.staticBack.cacheAsBitmap = true;
        //this.staticBack2.cacheAsBitmap = true;
    } else {
        if(this.staticBack.timerCache < -10) {
            this.staticBack.timerCache = -10;
        }
    }

    if(this.isGameStarted) {
        if(this.isRoundStarted) {
            this.addText.alpha += (0 - this.addText.alpha) * .05;
            this.addText.y -= .5;
            this.line.alpha += (0 - this.line.alpha) * .005;
            this.safe.update();
            this.generateTimer += frameRATE;
            this.spawnXTimer -= frameRATE;



            this.face.eyesTo(this.prizes[0]);
            /// hand
            if(this.handWaitTimer > 0) {
                this.handWaitTimer -= frameRATE;
            } else {
                if(this.isHandGo) {

                    this.handPhase += frameRATE *  this.handSpeed;
                    if(this.handPhase > 1) {
                        this.isHandGo = false;
                        this.isHandBack = true;
                        if (this.safe.isLife) {
                            if (this.safe.damage()) {
                                trace('safe destroyed' + " " + this.safe.x + " " + this.safe.y);
                                this.generatePrize('cristal', this.safe.x, this.safe.y);
                                this.safeSpawnTimer = this.spawnSafeTimeMin + Math.random() * (this.spawnSafeTimeMax - this.spawnSafeTimeMin);
                            }
                        }
                    }
                }
                if(!this.isFail) {
                    if (this.isHandBack) {
                        if (this.hand.state != 0) {
                            this.removeGrabbed();
                            this.hand.setState(0);
                            this.face.setState(parseInt(Math.random() * 4 + 5));
                        }
                        this.handPhase -= frameRATE * this.handSpeedBack;
                        if (this.handPhase < 0) {
                            this.isHandBack = false;
                            this.handPhase = 0;
                        }
                    }
                }
            }

            /// safe
            if(!this.safe.visible && !this.isFail) {
                this.safeSpawnTimer -= frameRATE;
                if(this.safeSpawnTimer < 0) {
                    this.safe.init();
                    this.safeLifeTimer = this.safeLife;
                }
            } else {
                if(this.safe.isLife) {
                    this.safeLifeTimer -= frameRATE;
                    if(this.safeLifeTimer < 0) {
                        this.safe.stop();
                        //   this.safe.artX = this.safe.art.width/2 * 2;
                        this.safeSpawnTimer = this.spawnSafeTimeMin + Math.random() * (this.spawnSafeTimeMax - this.spawnSafeTimeMin);
                    }
                }
            }

            /// prizes
            if(this.generateTimer > this.nextPrizeTime) {
                this.generatePrize();
            }
            var dy = this.H * .05;
            for(var i = 0; i<this.prizes.length; i++) {
                var prize = this.prizes[i];
                prize.move(frameRATE);
                if(!this.isFail) {
                    if(this.grabbed) {
                        this.grabbed.y = this.grabbed.startY+ this.hand.deltaY;
                    }
                    if (this.hand.collide(prize)) {

                        this.hand.setState(1);
                        this.removeGrabbed();
                        this.destroyPrize(i);


                        i--;
                        this.isHandGo = false;
                        this.isHandBack = true;
                        if (prize.price == 'x2') {
                            this.roundMoney *= 2;
                            this.addText.setText('x2');

                            GodStep.playSound('double_catch', 0, AG.SOUND);

                        } else {
                            if(prize.type == 'cristal') {
                                trace('cristal catch');

                                GodStep.playSound('catch', 0, AG.SOUND);
                            } else {
                                if(Math.random() > .66) {
                                    GodStep.playSound('catch_1', 0, AG.SOUND);
                                } else  if(Math.random() > .33) {
                                    GodStep.playSound('catch_2', 0, AG.SOUND);
                                }else {
                                    GodStep.playSound('catch_3', 0, AG.SOUND);
                                }
                            }

                            this.roundMoney += prize.price;
                            this.addText.setText('+ ' +  prize.price);
                            this.addText.updateText();
                            this.addText.alpha = 1;
                            this.addText.x = prize.x +  this.W * .03;
                            this.addText.y = this.W * .67;
                            if(Math.random() > .66) {
                                if(this.voiceID == 0) {
                                    this.voiceID++;
                                    GodStep.playSound('voice_1', 0, AG.SOUND);
                                } else if(this.voiceID == 1) {
                                    this.voiceID++;
                                    GodStep.playSound('voice_2', 0, AG.SOUND);
                                } else {
                                    this.voiceID = 0;
                                    GodStep.playSound('voice_3', 0, AG.SOUND);
                                }
                            }
                            if(this.roundMoney < this.bestScore) {
                                this.face.setState(2);
                            } else {
                                this.face.setState(3);
                            }
                        }
                        this.moneyText.setText('' + this.roundMoney);
                        this.moneyText.updateText();
                        this.moneyText.x = this.W * .5 - this.moneyText.width/2;
                        this.moneyText.y = this.H * .85;
                        this.handWaitTimer = this.handWait;
                        var grabbed = prize.getGrab();
                        if(grabbed) {
                            this.grabbed = grabbed;
                            this.flash.alpha = 1;
                            this.flash.visible = true;
                            this.grabSprite.addChild(this.grabbed);
                            this.flash.x = grabbed.x = grabbed.startX = this.hand.x;
                            this.flash.y = grabbed.y = grabbed.startY = this.hand.y - this.H * prize.gdx;
                            this.flash.x -= this.H * .01;
                            this.flash.scale.x = this.flash.scale.y = this.flash.sScale;
                        }
                    }
                    if (prize.y*this.scale.x > this.soul.OH - this.y - dy) {
                        if (prize.type != 'cristal' && prize.type != 'x2') {
                            this.over(prize);
                            this.fallPrize = prize; prize.isFall = true;
                            this.fallFlash.x = prize.x;
                            this.fallFlash.visible = true;
                        }
                        if(prize.y*this.scale.x > this.soul.OH * 2) {
                            this.destroyPrize(i);
                        }
                    }
                } else {
                    prize.fade();
                }
            }

            if(this.flash.visible) {
                this.flash.alpha += (0 - this.flash.alpha) * .07;
                this.flash.scale.x = this.flash.scale.y += (this.flash.fScale - this.flash.scale.x) * .06;
            }
            if(!this.isFail) {
                if(this.grabbed == null) {
                    this.hand.x = (AG.START_HAND[0] + (AG.END_HAND[0] - AG.START_HAND[0]) * this.handPhase) * this.W;
                    this.hand.y = this.hand.lastY = (AG.START_HAND[1] + (AG.END_HAND[1] - AG.START_HAND[1]) * this.handPhase) * this.H;
                }
            } else {
                this.overTimer--;
                this.fallFlash.phase -= AG.FRAME_RATE * 15;
                this.fallPrize.alpha = 1;
                //  this.fallFlash.y = this.soul.OH - this.y;

                this.staticBack2.alpha += (1 - this.staticBack2.alpha) * .02;

                if(this.fallFlash.phase < 0) {
                    this.fallFlash.phase = 1;
                    this.fallFlash.nextFrame();
                }
                if(this.overTimer < 0) {
                    this.isRoundStarted = false;

                    if(AG.MUSIC) {
                        //  GodStep.playSound('theme_1');
                    }
                    this.soul.screenTo([this.soul.gameover], this);
                    AG.PLAYER.totalMoney = this.totalMoney;
                    AG.PLAYER.totalScore = this.totalScore;
                    AG.PLAYER.bestScore = this.bestScore;
                    AG.AmazingGrabber.instance.savePlayer();

                }
            }

        }
        this.hand.deltaY = Math.sin(this.hand.phase) * this.hand.A;
        this.hand.y = this.hand.lastY + this.hand.deltaY; this.hand.phase += 0.1;

    }
};
pro.removeGrabbed = function() {
    if(this.grabbed) {
        this.flash.visible = false;
        this.grabSprite.removeChild(this.grabbed);
        this.grabbed = null;
    }
};
pro.init = function() {
    setBackgroundColor('#ab4270');
    this.pause.visible = false;
    this.line.visible = this.tutor.visible = AG.TUTOR;
    this.xCounter = 0;
    this.fallFlash.phase = 0;
    this.fallFlash.visible = false;
    this.staticBack2.visible = false;
    this.b_pause.visible= true;
    this.isFirstHand = true;

    this.voiceID = 0;
    this.staticBack2.alpha = 0;
    this.line.alpha = 1;
    AG.NEW_RECORD = false;
    while(this.prizes.length) {
        this.destroyPrize(0);
    }


    //createjs.Sound.stop();

    var player = GodStep.LoadLocal(this.soul.PLAYER_SLOT) || AG.PLAYER;
    var levelID = -1;
    if(!player.totalScore) {
        levelID = 0;
        player.totalScore = 0;
    }
    if(levelID == -1) {
        levelID = 1000000;
    }
    this.levels = AG.AmazingGrabber.LEVELS;
    for(var i = 1; i<this.levels.length; i++) {
        if(this.levels[i] > player.totalScore) {
            levelID = i - 1;
            break;
        }
    }
    this.soul.shop.equipAll(levelID);
    this.hand.setState(0);
    this.face.init();
    this.face.setState(1);
    this.removeGrabbed();

    if(player) {
        this.bestScore = player.bestScore;
        this.totalScore = player.totalScore;
        this.totalMoney = player.totalMoney;
    } else {
        this.bestScore = 0;
        this.totalScore = 0;
        this.totalMoney = 0;
    }
    this.lastTotalMoney = this.totalScore;

    var settings = GodStep.LoadLocal(this.soul.SETTINGS_SLOT);
    if(settings == null) {
        settings = GodStep.LoadText(AG.DEFAULT_SETTINGS);
    }
    if(settings) {
        this.handSpeed = settings.s_handSpeed/100;
        this.handSpeedBack = settings.s_handSpeedBack/100;
        this.speedGrow = settings.s_speedGrow/100;
        this.handWait = settings.s_handWait;
        this.spawnTimeMin = settings.s_spawnTimeMin;
        this.spawnTimeMax = settings.s_spawnTimeMax;
        this.hitCountSafe = settings.s_hitCountSafe;
        this.spawnSafeTimeMin = settings.s_spawnSafeTimeMin;
        this.spawnSafeTimeMax = settings.s_spawnSafeTimeMax;
        this.safeLife = settings.s_spawnSafeLife;
        this.spawnXTimeMin = settings.s_spawnXTimeMin;
        this.spawnXTimeMax = settings.s_spawnXTimeMax;
        this.speedMultiplier = settings.s_speedMultiplier/100;
        this.cristalGravity = settings.s_cristalGravity/100;
        this.prize1Chance = settings.s_prize1Chance || 50;
        this.prize2Chance = settings.s_prize2Chance || 50;
        this.prize3Chance = settings.s_prize3Chance || 50;
        this.prize4Chance = settings.s_prize4Chance || 50;
        this.spawnTimeIncreaseMax = settings.s_spawnTimeIncreaseMax/10000 || .02;
        this.spawnTimeIncreaseMin = settings.s_spawnTimeIncreaseMax/10000 || .02;
    }

    this.isFail = false;
    this.isGameStarted = true;
    this.isRoundStarted = false;
    this.prizeCount = 0;
    this.visible = true;
    this.handPhase = 0;
    this.isHandGo = false;
    this.roundMoney = 0;
    this.generateTimer = 0;
    this.nextPrizeTime = 1;
    this.isHandBack = false;
    this.safe.visible = false;
    this.spawnXTimer = this.spawnXTimeMin + Math.random() * (this.spawnXTimeMax - this.spawnXTimeMin);

    this.safe.x = this.W;
    this.safe.y = this.H * (AG.END_HAND[1] - 0.2);
    this.hand.x = this.W * AG.START_HAND[0];
    this.hand.y = this.hand.lastY = this.H * AG.START_HAND[1];
    this.moneyText.setText('');
    this.safeSpawnTimer = this.spawnSafeTimeMin + Math.random() * (this.spawnSafeTimeMax - this.spawnSafeTimeMin);
    this.safeLifeTimer = 0;



};
pro.over = function() {
    this.isFail = true;

    this.staticBack2.visible = true;
    this.top1.alpha = this.top2.alpha = 0;
    this.face.setState(4);

    this.hand.setState(2);
    this.removeGrabbed();
    this.safe.stop();
    if(this.soul.AUDIOTAG) {
        GodStep.muteSound('theme_1', 0);
    } else {
        if(createjs.Sound) createjs.Sound.stop();
    }

    if(AG.SOUND) {
        GodStep.playSound('theme_2', 0, AG.MUSIC);
    }
    this.overTimer = 120;
    AG.PLAYER.totalMoney = this.totalMoney += this.roundMoney;
    AG.PLAYER.totalScore = this.totalScore = Math.max(this.totalScore, this.totalMoney);
    if(this.bestScore < this.roundMoney) {
        AG.NEW_RECORD = true;
    }
    AG.PLAYER.bestScore = this.bestScore = Math.max(this.bestScore, this.roundMoney);
    if(AG.SOFT_GAMES) {
        if(window['SG_Hooks']) {
            SG_Hooks.gameOver(1, parseInt(this.roundMoney));
        }
    }
};
pro.destroyPrize = function(i) {
    this.delFrame(this.prizes[i].destroy());
    this.prizes.splice(i, 1);
};
pro.generatePrize = function(typeInstance, x, y) {
    if(this.isFail) return;
  //  if(Math.random() > .91 && typeInstance != 'cristal') return;
    var chance = Math.random() * 100;
    var specialSpeed = null;
    var instance = typeInstance;
    this.xCounter++;
    var min = Math.max(.25, this.spawnTimeMin - this.prizeCount * this.spawnTimeIncreaseMin);
    var max = Math.max(.25, this.spawnTimeMax - this.prizeCount * this.spawnTimeIncreaseMax);

    if(this.spawnXTimer < 0 ) {
        this.xCounter = 0;
        instance = 'x2';
        this.spawnXTimer = this.spawnXTimeMin + Math.random() * (this.spawnXTimeMax - this.spawnXTimeMin);

    }
    if(instance == 'cristal') {
        chance = -1;
        specialSpeed = this.speedMultiplier;
    } if(instance == 'x2') {
        chance = -2;
        specialSpeed = this.speedMultiplier;
        this.generateTimer = 0;
        this.nextPrizeTime = min + Math.random() * (max - min);
    } else {
        this.generateTimer = 0;
        this.nextPrizeTime = min + Math.random() * (max - min);
    }
    var prize = new AG.Prize(this, chance, specialSpeed || (this.speedGrow * this.prizeCount) ,.1 + Math.random() *.725, -.05);
    if(instance == 'cristal') {
        prize.mask = this.handMask;
    }
    if(x != null) {
        prize.x = x;
        prize.y = y;
    }

    if(instance == 'x2') {
        prize.x = this.W * (Math.random()*.4 + .3);
        prize.y = this.H * .93;
    }
    this.prizes.push(prize);
    this.addFrame(prize, this.prizeContainer);
    this.prizeCount++;
};

// listeners
pro.h_buttons = function(e) {
    var t = e.target;
    var p = t.parent;
    switch (t) {
        case p.b_pause:
            p.b_pause.visible = false;
            p.pause.init();
            break;
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    var p = t.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(t.isGameStarted && !t.isFail && t.pause.visible == false) {
                if(t.tutor.visible) {
                    t.tutor.visible = false;
                }
                t.isRoundStarted = true;
                if(t.isFirstHand) {
                    if(AG.MUSIC) {
                        t.isFirstHand = false;
                        if(this.soul.AUDIOTAG) {
                            GodStep.muteSound('theme_1', 1, AG.MUSIC);
                        } else {
                            createjs.Sound.stop();
                        }
                        GodStep.playSound('theme_1', 1, AG.MUSIC);
                    }
                }
                t.isHandGo = true;
                t.isHandBack = false;
                t.handWaitTimer = 0;


                this.removeGrabbed();
                t.hand.setState(0);
                t.face.setState(parseInt(Math.random() * 4 + 5));
            }
            break;
        case GodStep.FRAME_UP:
            t.b_pause.isDown = false;
            t.b_pause.Scale = 1;
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.fallFlash.y = (this.soul.OH - this.soul.DOH/2)/this.scale.x;//
        this.back.Scale = value;
        this.handMask.y = (this.soul.OH - this.H)/2/value;
        this.back2.Scale = value;
        this.top1.Scale = value;
        this.top2.Scale = value;
        this.handMask.clear();
        this.handMask.beginFill(0, 1);
        this.handMask.drawRect(0, -(this.OH - this.H)/2, this.W, this.OH);
        this.handMask.endFill();
        this.pause.Scale = value;
        this.b_pause.y = (-this.soul.DOH/2 + this.soul.OH - this.soul.H * .07)/value; //+// this.soul.OH/value;
        //this.pause.y =  - (this.soul.OH - this.soul.H)/2/value;
    //    this.pause.y =
        this.staticBack.timerCache = 30;
        this.staticBack2.cacheAsBitmap = false;
        this.staticBack.cacheAsBitmap = false;

    }
});

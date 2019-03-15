SS.GamePlay = function(soul) {
    GodStep.LFrame.call(this, soul, 'GamePlay');
    GodStep.IDownUp.call(this, this.W, this.H);

    this.elements = [];
    this.bankSaloonTimer = 7;

    var i, b;
    this.rect(10, this.H, 0x000000, 1, this.W/2 - 5, 0);
    this.addChild(this.back0 = new PIXI.DisplayObjectContainer());
    for(i = 0; i<5; i++) {

        this.back0.addChild(b = new SS.Img('back_1', this.s, this.W *.5, 0, new PIXI.Point(.5, 1)));
        b.y = - i * b.height;
    }


    this.addChild(this.back2 = new PIXI.DisplayObjectContainer());
    this.addChild(this.back3 = new SS.Img('back_3', this.s, this.W *.5, this.H *.5,.5));
    this.addChild(this.back1 = new SS.Img('back_0', this.s, this.W *.5, 0, new PIXI.Point(.5, 1)));

    var c = false;
    this.maxHomeH = 0;
    for(i = 0; i<8; i++) {
        c = !c;
        this.back2.addChild(b = new SS.MovieClip(['home_1_1', 'home_2_1', 'home_3_1', 'home_4_1', (c) ? 'saloon_2' : 'saloon_1',(c) ? 'bank_2': 'bank_1'], this.s, (c) ? 0 : this.W, 0, new PIXI.Point(1,.5)));
        this.maxHomeH = Math.max(this.maxHomeH, b.height);
        b.y = - i * this.maxHomeH - this.H * 1.2;
        if(this.bankSaloonTimer-- > 0) {
            b.setToFrame(parseInt(Math.random() * (b.totalFrames - 2)));
        } else {
            b.setToFrame(parseInt(Math.random() * b.totalFrames));
            if(b.currentFrame >= 4) {
                this.bankSaloonTimer = 7;
            }
        }
        if(c && b.currentFrame >= 4) {
            b.anchor = new PIXI.Point(0, 1);
        }
        if(c && b.currentFrame < 4) {
            b.scale.x = -b.scale.x;
        }
    }

    this.addChild(this.x_coins = new SS.Img('2x_coins',this.s *.6, this.W *.9, this.H *.92,.5));
    this.addChild(this.x_score = new SS.Img('2x_score', this.s *.6, this.W *.9, this.H *.92,.5));
    this.addFrame(this.multText = new SS.Text('x1', 120 * this.s, this.W *.7, this.H *.86, 'left', 0x111111));
    this.addChild(this.line = new SS.Img('line_2', this.s, this.W *.5, this.H *.5, new PIXI.Point(.5,.5)));
    this.addChild(this.world = new PIXI.DisplayObjectContainer());


    this.world.addChild(this.player = new SS.Player(this));
    this.addChild(this.startMonster = new SS.MovieClip(['start_1', 'start_2', 'start_3', 'start_4', 'start_5', 'start_6', 'start_7', 'start_8', 'start_9'], this.s, this.W *.5, 0,.5));

    this.world.addChild(this.enemy = new SS.Enemy(this)); this.enemy.x = this.W * .33;

    this.addChild(this.field_ui = new SS.Img('field_ui', this.s, this.W *.5, this.H *.1,.5));
    this.field_ui.addChild(this.icon_coin = new SS.Img('icon_coin_game', 1, -this.W *.05 / this.s, this.H *.0,.5));
    this.field_ui.addChild(this.icon_score = new SS.Img('icon_score_game', 1, -this.W *.4 / this.s, this.H *.0,.5));
    this.field_ui.addChild(this.b_pause = new SS.ImgButton('button_pause', this, this.W *.4 / this.s, this.H *.0));

    this.field_ui.addChild(this.scoreText = new SS.Text('coins', 155,  -this.W *.33 / this.s, -this.H *.08 / this.s, 'left', 0x49A6B3));
    this.field_ui.addChild(this.coinText = new SS.Text('coins', 155,  this.W *.03 / this.s, -this.H *.08 / this.s, 'left', 0x49A6B3));
    this.b_pause.scale.x = this.b_pause.scale.y /= this.s;

    this.addChild(this.tutorial = new SS.Tutorial(this));
    this.addFrame(this.pause = new SS.Pause(this));
    addEvent(this.b_pause, Games.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);

};
extend(SS.GamePlay, GodStep.LFrame);

SS.DELTA_W = .16;
SS.DELTA_W_ELEM = .195;
SS.CELL_W = .24;
SS.PLAYER_Y = .1;
SS.FRAME_RATE = 1/60;
SS.WORLD_S_Y_END = .6;
SS.WORLD_S_Y_START = .43;
SS.WORLD_S_Y = .43;

pro.update = function() {
    if(this.visible && !this.pause.visible) {

        this.enemy.update();
        this.player.update();
        var eSpeed = (this.enemySpeed - this.enemyGrowSpeed * this.player.pos.y) * (this.isFly ? .1 : 1);

        if(this.isOver) {
            if(this.endTimer-- == 0) {
                if(GodStep.DEVMODE) {
                    this.soul.screenTo([this.soul.dev], this);
                } else {
                    this.soul.screenTo([this.soul.gameover], this);
                }
                if(createjs) {
                    if(createjs.Sound) createjs.Sound.stop();
                }
            }
            if(this.isFall) {
                this.fallSpeed += 0.0015;
                this.player.pos.y += this.fallSpeed;
                this.player.y += (this.player.pos.y * this.H * SS.CELL_W - this.player.y + this.soul.DOH/this.scale.x/2)*.3;
                this.enemy.y += this.H * .005 * eSpeed * this.enemyStartSpeed;
                this.enemy.x = this.player.x += (this.W/2 + this.player.pos.x * this.W*SS.DELTA_W - this.player.x)*.3;
            }

        } else {
            this.tutorial.update();
            if(!this.isMonsterStartMove && !this.isFly) {
                if(GodStep.IsKeyPressed(GodStep.KEY_LEFT)) {
                    this.tutorial.visible = false;
                    this.turnPlayer(-1);
                }
                if(GodStep.IsKeyPressed(GodStep.KEY_RIGHT)) {
                    this.tutorial.visible = false;
                    this.turnPlayer(1);
                }
            }



            if(this.isFly) {
                this.flyPhase += .05;
                var delta = (this.player.pos.y * this.H * SS.CELL_W  - this.player.y)*.3;
                this.player.x += (this.W/2 + Math.sin(this.flyPhase) * this.W *.2 - this.player.x)*.2;
                this.player.y += Math.max(delta, -this.H *.02);
                if(Math.abs(delta) < this.H * SS.CELL_W/4) {
                    this.isFly = false;
                    this.player.stay();
                    this.player.pos.y += 1;
                    this.turnPlayer(this.player.pos.x);
                }

                for(var i = this.oldFlyPos; i>this.player.pos.y; i--) {
                    var cell1 = this.cells[1][i];
                    var cell2 = this.cells[-1][i];

                    if(cell1.isCoin && cell1.visible) {
                        if(cell1.y > this.player.y) {
                            this.takeCoin(cell1);
                        }
                    }
                    if(cell2.isCoin && cell2.visible) {
                        if(cell2.y > this.player.y) {
                            this.takeCoin(cell2);
                        }
                    }
                }

            } else {
                this.enemy.x = this.player.x += (this.W/2 + this.player.pos.x * this.W*SS.DELTA_W - this.player.x)*.3;
                this.player.y += (this.player.pos.y * this.H * SS.CELL_W - this.player.y + this.soul.DOH/this.scale.x/2)*.3;
            }

            this.updateWorld(.2);

            while(this.player.pos.y - 5 < this.lastPatternPlace) {
                this.addPattern();
            }
            if(this.elements.length > 0){
                if(this.elements[0].yi - this.player.pos.y > 10) {
                    this.world.removeChild(this.elements[0].destroy());
                    this.elements.splice(0, 1);
                }
            }
            for(var e = 0; e<this.elements.length; e++) {
                this.elements[e].move();
            }

            this.enemyTimer+= SS.FRAME_RATE;


            if(this.player.pos.y < -3) {
                if(this.enemyMode) {
                    this.enemy.y -= this.H * .01 * eSpeed * this.enemyStartSpeed;
                    if(this.enemyStartSpeed > 0.01) {
                        if(this.enemy.y - this.player.y < this.H * .5) {
                            this.enemyStartSpeed += (1 - this.enemyStartSpeed) * .4;
                        }
                    }
                    if(this.enemyTimer > this.soul.SETTINGS.s_enemyTime) {
                        this.enemyMode = false;
                        this.enemyTimer = 0;
                    }
                    if(this.enemy.y < this.player.y + this.H * .1) {
                        this.player.end();
                        GodStep.playSound('caught', 0, SS.SOUND);
                        this.enemy.visible = false;
                        this.over();
                    }
                } else {
                    this.enemy.y += this.H * .005 * eSpeed * this.enemyStartSpeed;

                    if(this.enemyTimer > this.soul.SETTINGS.s_enemyPeriod) {
                        this.enemyTimer = 0;
                        this.enemyMode = true;
                        this.enemyStartSpeed = 3;
                        this.enemy.y = this.player.y + this.H * .7;
                    }
                }
            }


            // graphics
            if(this.isMonsterStartMove) {
                if(this.startTimer > 0) {
                    this.startTimer--;
                } else {
                    if(this.startMonster.animTimer-- == 0) {
                        this.startMonster.animTimer = this.startMonster.animTime;
                        this.startMonster.nextFrame();
                        if(this.isLastMonsterStart) {
                            this.isMonsterStartMove = false;
                            this.startMonster.visible = false;
                            this.player.Visible = true;
                        }
                        if(this.startMonster.currentFrame == this.startMonster.totalFrames - 1) {
                            this.isLastMonsterStart = true;
                        }
                    }
                }
            }
        }
    }
};

pro.updateWorld = function(v) {
    SS.WORLD_S_Y += (SS.WORLD_S_Y_START + (SS.WORLD_S_Y_END - SS.WORLD_S_Y_START) *  Math.min(-this.player.pos.y/3, 1) - SS.WORLD_S_Y) * .2;

    this.world.y += (-this.player.y + this.H * SS.WORLD_S_Y - this.world.y + this.soul.DOH/2/this.scale.x) * v;
    this.line.y = Math.min(this.H * .5 - this.deltaYStart * this.H + this.world.y - this.H * SS.WORLD_S_Y, .5 * this.H);
    this.back2.y = this.back0.y = this.back1.y = (this.soul.OH - this.soul.DOH/2)/ this.scale.x  + this.world.y - this.H * SS.WORLD_S_Y;
    if(this.back1.y > (this.soul.OH * 2 - this.soul.DOH)/this.scale.x) {
        this.back1.visible = false;
    }


    // generate back
    var b = this.back0.children[0];
    if(b.y + this.back0.y > (this.H * 1 - this.soul.DOH * .5)) {
        this.back0.removeChild(b);
        this.back0.addChild(b);
        b.y = this.back0.children[4].y - b.height;
    }
    b = this.back2.children[0];
    if(b.y + this.back2.y > (this.H * 2 - this.soul.DOH * .5)) {
        this.back2.removeChild(b);
        this.back2.addChild(b);
        if(this.bankSaloonTimer-- > 0) {
            b.setToFrame(parseInt(Math.random() * (b.totalFrames - 2)));
        } else {
            b.setToFrame(parseInt(Math.random() * b.totalFrames));
            if(b.currentFrame >= 4) {
                this.bankSaloonTimer = 7;
            }
        }
        b.anchor = new PIXI.Point(1, 1);

        if(b.x > this.W * .5) {
            b.scale.x = Math.abs(b.scale.x);
        } else {
            b.scale.x = -Math.abs(b.scale.x);
        }
        if(b.currentFrame >=  4) {
            b.scale.x = Math.abs(b.scale.x);
            if(b.x > this.W * .5) {
                b.anchor = new PIXI.Point(1,.5);
            } else {
                b.anchor = new PIXI.Point(0,.5);
            }
        }

        b.y = this.back2.children[this.back2.children.length - 2].y - this.maxHomeH
    }
};
pro.addElement = function(e, x, y) {

    var elem;
    var xx = x;
    if(xx == 1) {
        if(this.soul.BONUS_FLY) {
            this.flyCounter--;
            if(this.flyCounter == 0) {
                this.flyNext += 10;
                this.flyCounter = this.flyNext;
                elem = new SS.Element(SS.FLY, this.s);
            }
        }

    }
    if(this.soul.BONUS_BIGCOIN || this.soul.BONUS_CRYSTAL) {
        if(e == SS.COIN) {
            this.bigCoinCounter--;
            if(this.bigCoinCounter == 0) {
                this.bigCoinNext *= 2;
                this.bigCoinCounter = this.bigCoinNext;
                elem = new SS.Element((this.soul.BONUS_CRYSTAL) ? SS.CRYSTAL : SS.BIGCOIN, this.s);
            }
        }
    }
    if(elem == null) {
        elem = new SS.Element(e, this.s);
    }
    if(e == SS.BLOCK) {
        if(xx < 0) {
            elem.scale.x = -elem.scale.x;
        }
    }
    elem.x = this.W/2 + xx * this.W*SS.DELTA_W_ELEM;
    elem.y = y * this.H * SS.CELL_W + this.H * SS.CELL_W * .07 + this.soul.DOH * .5/this.scale.x;
    this.world.addChildAt(elem, 0);
    this.elements.push(elem);

    elem.yi = y;
    return elem;
};
pro.addPattern = function() {
    var availablePacks = -this.player.pos.y / this.patternGrow;
    var countPacks = Math.min(3, availablePacks);
    var minPack = 0;
    if(availablePacks > 4) {
        minPack = 1;
    }
    if(availablePacks > 6) {
        minPack = 2;
    }
    var packID = parseInt(Math.random() * (countPacks - minPack)) + minPack;
    packID = Math.max(0, Math.min(2, packID));
    //trace(-this.player.pos.y + " : " + availablePacks  + " " + minPack + " " + countPacks + " " + packID);
    var patternPack = this.soul.PATTERNS[packID];
    var pat = patternPack[parseInt(Math.random() * patternPack.length)];
    var cells = pat.cells;
    var pattHeight = parseInt(pat.cells.length/2);
    var di = 0;
    var dx;
    if(Math.random() > .5) {
        dx = 1;
    } else {
        dx = -1;
    }
    for(var i =0; i<cells.length; i+=2) {
        var index = this.lastPatternPlace - pattHeight + di;
        this.cells[-dx][index] = this.addElement(cells[i], -dx, index);
        this.cells[dx][index] = this.addElement(cells[i+1], dx, index);
        di++
    }

    this.lastPatternPlace -= pattHeight;

};
pro.init = function() {
    /// destroy

    if(this.soul.AUDIOTAG) {
        GodStep.muteSound('theme', 0);
    } else {
        if(createjs.Sound) createjs.Sound.stop();
    }
    GodStep.playSound('theme', -1,  SS.MUSIC);

    var i, b;
    for(i = 0; i<5; i++) {
        b = this.back0.children[i];
        b.y = - i  * b.height;
    }
    for(i = 0; i<this.back2.children.length; i++) {
        b = this.back2.children[i];
        b.y = - i * this.maxHomeH- this.H * 1.2;
    }
    SS.WORLD_S_Y = SS.WORLD_S_Y_START;

    this.deltaYStart = .31;
    this.startTimer = 1;
    this.endTimer = 100;
    this.isMonsterStartMove = true;
    this.isLastMonsterStart = false;
    this.startMonster.visible = true;
    this.player.init();
    this.player.Visible = false;
    this.back1.visible = true;
    this.enemy.visible = true;

    this.isFall = false;
    this.fallSpeed = -0.04;
    while(this.elements.length) {
        this.world.removeChild(this.elements[0].destroy());
        this.elements.splice(0, 1);
    }
    this.flyPhase = 0;
    this.flyNext = 15;
    this.flyCounter = 15;
    this.bigCoinCounter = 5;
    this.bigCoinNext = 5;
    this.soul.loadSettings();
    var player = this.soul.PLAYER;

    this.soul.BONUS_FLY = player.items[0];
    this.soul.BONUS_BIGCOIN = player.items[1];
    this.soul.BONUS_CRYSTAL = player.items[2];
    this.soul.BONUS_COINMULT = player.items[3];
    this.soul.BONUS_POINTMULT = player.items[4];

    this.patternGrow = this.soul.SETTINGS.s_patternSpeed;
    this.enemyMode = false;
    this.enemyTimer = 0;
    this.enemySpeed = this.soul.SETTINGS.s_enemySpeed/50;
    this.enemyGrowSpeed = this.soul.SETTINGS.s_enemyGrowSpeed/10000;
    this.elements = [];
    this.coins = 0;
    this.points = 0;
    this.pointsMult = 1;
    this.coinMult = 1;
    this.coinTarget = 0;
    this.pointTarget = 0;
    this.coinStart = this.coinTargetNext = this.soul.SETTINGS.s_multCoinStart;
    this.pointStart = this.pointTargetNext = this.soul.SETTINGS.s_multPointsStart;
    this.cells = [];
    this.cells[-1] = [0];
    this.cells[1] = [0];
    this.time = 0;

    this.scoreText.setText('0');    this.scoreText.updateText();
    this.coinText.setText('0');  this.coinText.updateText();
    this.lastPatternPlace = -2;
    this.visible = true;
    this.isOver = false;
    this.pause.visible = false;
    this.player.x = this.W * .65;
    this.player.y = 0;
    this.world.y = 0;
    this.enemy.y = this.H * 1.8;
    this.multText.x = this.W * .93 - this.multText.width;
    this.player.pos = new PIXI.Point(1, 0);
    this.multText.setText('x' + 1);

    this.x_coins.visible = this.soul.BONUS_COINMULT;
    this.x_score.visible = this.soul.BONUS_POINTMULT;
    this.multText.visible = (this.soul.BONUS_POINTMULT || this.soul.BONUS_COINMULT);

    if(this.soul.BONUS_COINMULT) {
        this.multText.tint = 0xC46F00;
    }
    if(this.soul.BONUS_POINTMULT) {
        this.multText.tint = 0x515E0D;
    }
    this.updateWorld(1);

};

pro.over = function() {
    this.isOver = true;
    this.endTimer = 120;


    var player = SS.ChinUpShinUp.instance.PLAYER;
        player.score = this.points;
        player.lastCoins = this.coins;
        player.coins += this.coins;
        player.top = Math.max(this.points, player.top);


};
pro.turnPlayer = function(p) {
    this.player.pos.x = p;
    this.player.pos.y -= 1;
    this.player.turn(p);
    this.enemy.turn(p);

    var cell = this.cells[p][this.player.pos.y];
    var reCell = this.cells[-p][this.player.pos.y];
    this.player.run();
    if(reCell) {
        if(reCell.elemType == SS.COIN) {
            if(this.soul.BONUS_COINMULT) {
                this.coinMult = 1;
                this.coinTargetNext = this.soul.SETTINGS.s_multCoinStart;
                this.multText.setText('x' + this.coinMult);
                GodStep.playSound('multiply', 0, SS.SOUND);

            } else
            if(this.soul.BONUS_POINTMULT) {
                this.pointsMult = 1;
                this.pointTargetNext = this.soul.SETTINGS.s_multPointsStart;
                this.multText.setText('x' + this.pointsMult);
            }
        }
    }
    if(cell) {
        switch (cell.elemType) {
            case SS.CRYSTAL:
            case SS.BIGCOIN:
            case SS.COIN:
                this.takeCoin(cell);
                break;
            case SS.FLY:
                GodStep.playSound('balloon', 0, SS.SOUND);
                this.oldFlyPos = this.player.pos.y;
                this.player.pos.y -= 10;
                this.isFly = true;
                cell.visible = false;
                this.player.bubble();
                var column =this.cells[this.player.pos.x];
                while(!column[this.player.pos.y]) {
                    this.addPattern();
                }
                if(column[this.player.pos.y].elemType == SS.BLOCK) {
                    this.player.pos.x = -this.player.pos.x;
                }
                break;
            case SS.BLOCK:
                GodStep.playSound('fall', 0, SS.SOUND);

                cell.visible = true;
                this.player.fall();
                this.isFall = true;
                this.over();
                break;
        }
    }
};
pro.takeCoin = function(cell) {
    if(cell.elemType == SS.CRYSTAL) {
        GodStep.playSound('daimond', 0, SS.SOUND);
    } else {
         GodStep.playSound('catch', 0, SS.SOUND);

    }
    var dc = cell.cost * this.coinMult;
    var dp = cell.cost * 10 * this.pointsMult;
    this.coinTarget += dc;
    this.pointTarget += dp;
    if(this.soul.BONUS_COINMULT) {
        if(this.coinTarget >= this.coinTargetNext) {
            this.coinMult++;
            this.coinTarget -= this.coinTargetNext;
            this.coinTargetNext = this.coinStart * this.coinMult;
            this.multText.setText('x' + this.coinMult);
        }
    }
    if(this.soul.BONUS_POINTMULT) {
        if(this.pointTarget >= this.pointTargetNext) {
            this.pointsMult++;
            this.pointTarget -= this.pointTargetNext;
            this.pointTargetNext = this.pointStart * this.pointsMult;
            this.multText.setText('x' + this.pointsMult);
        }
    }

    this.coins += dc;
    this.points += dp;
    this.coinText.setText(this.coins + "");
    this.scoreText.setText(this.points + "");
    this.coinText.updateText();
    this.scoreText.updateText();
    cell.visible = false;
};
// listeners
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent.parent;
    switch (t) {
        case p.b_pause:
            GodStep.playSound('button', 0, SS.SOUND);

            p.pause.init();
            break;
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    if(!t.pause) {
        return;
    }
    if(t.pause.visible) {
        return;
    }
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(!t.isOver && !t.pause.visible && !t.isFly && !t.isMonsterStartMove) {
                t.tutorial.visible = false;
                var pos = e.content.getLocalPosition(t);
                if(pos.x > t.W/2) {
                    t.turnPlayer(1);
                } else {
                    t.turnPlayer(-1);
                }
            }
            break;
        case GodStep.FRAME_UP:
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.pause.Scale = value;
        var dy = (this.soul.OH - this.soul.H)/2/value;


        this.back3.scale.y = this.soul.OH/this.soul.H;
        this.line.scale.y = this.soul.OH/this.soul.H * this.s;

        this.tutorial.y = (this.soul.DOH *.5 + this.soul.H * .87)/value;
        this.field_ui.y = (this.soul.H * .1 - this.soul.DOH/2)/value;
        this.startMonster.y = this.soul.DOH * .5 + this.H * .615;
        this.setHitArea(0, -dy, this.H, this.soul.OH/value);

    }
});
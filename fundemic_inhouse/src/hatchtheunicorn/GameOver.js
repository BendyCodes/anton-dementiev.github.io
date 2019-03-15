HTU.GameOver = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'GameOver', soul.SW, soul.SH);
    GodStep.IDownUp.call(this, this.W, this.H);

    var s = this.startS = soul.startS * HTU.SCALE;
    this.timerCache = -1;

    this.addChild(this.b_replay = new HTU.Button('button_02', s, 18, 4, 5, this.W *.5, this.H*.83,.5));
    this.addChild(this.b_back = new HTU.Button('button_05', s, 8, 4, 2, this.W *.15, this.H*.13,.5));
    this.addChild(this.gameover = new Games.Img('game_over', s * 1.7, this.W *.5, this.H *.25,.5));
    this.addChild(this.victory = new Games.Img('victory_logo', s * 1.3, this.W *.5, this.H *.23,.5));
    this.addChild(this.bestLogo = new Games.Img('best', s * 1.5, this.W *.3, this.H *.57,.5));
    this.addChild(this.scoreLogo = new Games.Img('score', s * 1.5, this.W *.3, this.H *.44,.5));

    this.addChild(this.bestText = new HTU.Text('1234567890_playfield', 89,  s * 1.7,  this.W *.85, this.H *.54));
    this.addChild(this.scoreText = new HTU.Text('1234567890_playfield', 89,  s * 1.7, this.W *.85, this.H *.41));
    addEvent(this.b_back, GodStep.FRAME_DOWN, this.h_buttons);
    addEvent(this.b_replay, GodStep.FRAME_DOWN, this.h_buttons);
    //this.victory.visible = false;

    this.bestText.setText('0');
    this.scoreText.setText('0');

    this.visible = false;

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(HTU.GameOver, GodStep.Frame);
pro.update = function() {
    if(this.visible) {
        if( this.timerCache-- == 0) {
            this.timerCache = -1;
          //  this.cacheAsBitmap = true;
        }

        this.b_replay.play();
        if(this.b_replay.isPushed) {
            if(this.b_replay.currentFrame == 1) {
                this.soul.screenTo([this.soul.gameplay], this);
                this.b_replay.isPushed = false;
            }
        } else {
            if(this.b_replay.currentFrame == 9) {
                this.b_replay.currentFrame =-1;
            }
        }

        if(this.b_back.isPushed) {
            this.b_back.play();
            if(this.b_back.currentFrame == 7) {
                this.soul.screenTo([this.soul.startmenu], this);
                this.b_back.isPushed = false;  this.b_back.setToFrame(0);
            }
        }
    }

};

pro.init = function() {
    this.soul.background.setState(0);

    HTU.HatchTheUnicorn.instance.PLAYER.pointsBest = this.soul.gameplay.pointsBest;
    this.visible = true;
    this.victory.visible = this.soul.gameplay.isWin;
    this.gameover.visible = !this.victory.visible;
    this.bestText.setText(this.soul.gameplay.pointsBest);
    this.scoreText.setText(this.soul.gameplay.points);

};


pro.h_mouse = function(e) {
    if(e.content.target) {
        if(e.content.target.soul) {
            var t = e.content.target;
         //   t.b_clear.isDown = t.b_back.isDown = false;
           // t.b_clear.Scale = t.b_back.Scale = 1;
        }
    }
};
pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};

pro.h_buttons = function(e) {
    var t = e.target;
    var p = t.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            switch (t) {
                case p.b_replay:
                    t.isPushed = true;
                    GodStep.playSound('button', 0, HTU.SOUND);
                    t.setToFrame(11);
                    break;
                case p.b_back:
                    t.isPushed = true;
                    GodStep.playSound('button', 0, HTU.SOUND);
                    t.setToFrame(0);
                    break;
            }
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.gameover.y = (this.soul.H - this.soul.OH)*.5/value + this.soul.H * .3/value;
        this.b_back.y = (this.soul.H - this.soul.OH)*.5/value + this.soul.H * .14/value;
        this.scale.x = this.scale.y = value;
        this.cacheAsBitmap = false;
        this.timerCache = 36;
    }
});
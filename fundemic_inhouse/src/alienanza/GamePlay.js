AZ.GamePlay = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'GamePlay', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    this.visible = false;

    this.bestScore = 0;
    this.nowScore = 0;

    var S = soul.startS;
    this.addChild(this.remember = new AZ.Img('remember', S, soul.W/2, soul.H *.8, 0.5));
    this.addChild(this.tap_to_begin = new AZ.Img('tap_to_begin', S, soul.W/2, soul.H *.9, 0.5));
    this.addChild(this.does_match = new AZ.Img('does_match', S, soul.W/2, soul.H *.75, 0.5));
    this.addChild(this.tablo = new AZ.Img('tablo', S, soul.W *.76, soul.H *.13, 0.5));
    this.addFrame(this.timer = new AZ.Timer(S, soul.W *.2, soul.H*.13));
    this.addFrame(this.countText = new AZ.Text()); this.countText.init(15, S, 0xfffc00);
    this.countText.place(this.tablo.x + 120 * S, this.tablo.y-30* S);
    this.countText.rotation = 0.1;

    this.countText.setText(0);

    this.addFrame(this.button_no = new AZ.ImgButton('no', this, S, soul.W *.3, soul.H *.87));
    this.addFrame(this.button_yes = new AZ.ImgButton('yes', this, S, soul.W *.7, soul.H *.87));
    this.addChild(this.crest = new AZ.Img('crest', S, 0, 0, 0.5));
    this.addChild(this.galka = new AZ.Img('galka', S, 0, 0, 0.5));
    this.addChild(this.maska = new PIXI.Graphics());

    addEvent(this.button_yes, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.button_no, AZ.ImgButton.CLICK, this.h_buttons);



    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);

};
extend(AZ.GamePlay, GodStep.Frame);

pro.nextAlien = function() {
    if(!this.isGoNext) {
        if(this.alienNext) {
            this.alienPrev = this.alienNext;
            this.prevID = this.nextID;
            this.currentPoints++;
            GodStep.playSound('alienanza_right', 0, AZ.SOUND);

            this.placeWrong(true, this.lastButton);

            this.timer.start();
            this.countText.setText(this.currentPoints);
        }

        this.isGoNext = true;
        this.nextID = (Math.random() >.7) ? parseInt(Math.random()*12 + 1).toString() : (this.nextID || parseInt(Math.random()*12 + 1).toString());
        this.addChild(this.alienNext = new AZ.Img(this.nextID, this.soul.startS, this.W * 1.5,  this.H *.65,.5));
        this.alienNext.mask = this.maska;

        trace(this.alienNext);
    }
};
pro.placeWrong = function(ok, o, x, y) {
    var placeholder;
    if(ok) {
        placeholder = this.galka;
    } else {
        placeholder = this.crest;
    }

    placeholder.alpha = 1;
    placeholder.visible = true;
    placeholder.x = o.x + (x || 0);
    placeholder.y = o.y + (y || 0);
};
pro.update = function() {
    if(this.isWaitAnwser && !this.isGameOver) {
        this.timer.update();
    }
    this.galka.alpha += (0 - this.galka.alpha) * .03;
    if(this.isGoNext) {
       this.alienPrev.x +=(-this.W *.5 - this.alienPrev.x) * .1;
       this.alienNext.x +=(this.W/2 - this.alienNext.x) * .2;
       this.alienNext.y +=(this.H/2 - this.alienNext.y) * .2;
       this.alienPrev.y +=(this.H *.65 - this.alienPrev.y) * .1;
       if(Math.abs(this.alienNext.x - this.W/2) < 3) {
           this.isGoNext = false;
           this.isWaitAnwser = true;
           this.removeChild(this.alienPrev);
       }
   }
    if(this.timer.isFinished) {
        if(!this.isGameOver) {
            this.isGameOver = true;
            createjs.Sound.stop();

            GodStep.playSound('alienanza_time', 0, AZ.SOUND);
            GodStep.playSound('alienanza_end', 0, AZ.SOUND);

            this.placeWrong(false, this.timer, 5 * this.soul.startS, -7 * this.soul.startS);
        }
    }

    if(this.isGameOver) {
        if(this.gg_timer-- == 0) {
            this.nowScore = this.currentPoints;
            this.bestScore = Math.max(this.bestScore, this.nowScore);
            this.soul.screenTo([this.soul.gameover], this);
        }
    }
};
pro.init = function() {
    createjs.Sound.stop();

    this.isGameOver = false;
    this.isWaitAnwser = false;
    this.galka.alpha = 0;
    this.crest.visible = false;
    this.currentPoints = 0;
    this.visible = true;
    this.isPreGame = true;
    this.does_match.visible = false;
    this.tap_to_begin.visible = true;
    this.remember.visible = true;
    this.gg_timer = 70;
    this.countText.setText(0);
    this.button_yes.visible = this.button_no.visible = false;
    GodStep.playSound('alienanza_start', 0, AZ.SOUND);

    if(this.alienPrev) this.removeChild(this.alienPrev);
    if(this.alienNext) this.removeChild(this.alienNext); this.alienNext = null;
    this.prevID = parseInt(Math.random()*10 + 1).toString();
    this.addChild(this.alienPrev = new AZ.Img(this.prevID, this.soul.startS, this.W/2, this.H *.5,.5));
    this.alienPrev.mask = this.maska;

    this.timer.init();
};

// listeners
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    if(!p.isGameOver) {
        switch (t) {
            case p.button_no:
                p.lastButton = p.button_no;
                if(p.prevID != p.nextID) {
                    p.nextAlien();
                } else {
                    createjs.Sound.stop();
                    GodStep.playSound('alienanza_wrong', 0, AZ.SOUND);
                    GodStep.playSound('alienanza_end', 0, AZ.SOUND);

                    p.placeWrong(false, p.lastButton);
                    p.isGameOver = true;
                }
                break;
            case p.button_yes:
                p.lastButton = p.button_yes;
                if(p.prevID == p.nextID) {
                    p.nextAlien();
                } else {
                    createjs.Sound.stop();

                    GodStep.playSound('alienanza_wrong', 0, AZ.SOUND);
                    GodStep.playSound('alienanza_end', 0, AZ.SOUND);

                    p.placeWrong(false, p.lastButton);
                    p.isGameOver = true;
                }
                break;
        }
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
       // this.maska.y = (this.soul.OH - this.H)/2;///value;
        this.maska.clear();
        this.maska.beginFill(0x071240, 1);
        this.maska.drawRect(0 , 0, this.W, this.soul.OH/value);
        this.maska.endFill();


    }
});

pro.h_mouse = function(e) {
    var t = e.content.target;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            if(this.isPreGame) {

                GodStep.playSound('alienanza_click', 0, AZ.SOUND);
                GodStep.playSound('alienanza_main', -1, AZ.MUSIC);

                this.isPreGame = false;
                this.does_match.visible = true;
                this.tap_to_begin.visible = false;
                this.remember.visible = false;
                this.button_yes.visible = this.button_no.visible = true;
                this.timer.start();
                this.nextAlien();
            }
            break;
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.button_yes.isDown =  t.button_no.isDown = false;
                    t.button_yes.Scale =
                        t.button_no.Scale = 1;
            }
            break;
    }
};


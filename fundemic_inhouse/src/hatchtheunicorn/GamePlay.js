HTU.GamePlay = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'GamePlay', soul.SW, soul.SH);
    GodStep.IDownUp.call(this, this.W, this.H);
    this.visible = false;
    var s = this.startS = this.soul.startS * HTU.SCALE;
    this.addChild(this.container = new PIXI.DisplayObjectContainer());
    this.container.addChild(this.b_back = new HTU.Button('button_05', s, 8, 4, 2, this.W *.15, this.H*.13,.5));
    this.container.addChild(this.scoreLogo = new Games.Img('score_playfield', s * 1.1, this.W *.4, this.H *.05,.5));
    this.container.addChild(this.bestLogo = new Games.Img('best_playfield', s * 1.1, this.W *.7, this.H *.05,.5));

    this.container.addChild(this.scoreText = new HTU.Text('1234567890_playfield', 89,  s *.8, this.W *.49, this.H *.1));
    this.container.addChild(this.bestText = new HTU.Text('1234567890_playfield', 89,  s * .8,  this.W *.775, this.H *.1));

    this.bestText.setText('0');
    this.scoreText.setText('0');
    this.pointsBest = 0;

    this.addFrame(this.field = new HTU.Field(this));

    this.points = 0;
    this.OW = soul.OW;
    this.OH = soul.OH;

    addEvent(this.b_back, GodStep.FRAME_DOWN, this.h_buttons);
    addEvent(this, GodStep.FRAME_MOVE, this.h_mouse);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);


    addEvent(this.field, HTU.FieldCellComplete, this.h_field);
    addEvent(this.field, HTU.FieldNoVariants, this.h_field);
    addEvent(this.field, HTU.FieldUnicornFinded, this.h_field);
};
extend(HTU.GamePlay, GodStep.Frame);

pro.getBounds = function() {
    return new PIXI.Rectangle(0, -this.y, this.W, this.soul.OH / this.scale.x);
};

pro.update = function() {
    if(this.visible) {

        if(this.overTimer-- == 0) {
            this.overTimer = -1;
            this.soul.screenTo([this.soul.gameover], this);
        }
        if(GodStep.IsKeyPressed(GodStep.KEY_W) || GodStep.IsKeyPressed(GodStep.KEY_TOP)) {
            this.swipe('top');
        }
        if(GodStep.IsKeyPressed(GodStep.KEY_A) || GodStep.IsKeyPressed(GodStep.KEY_LEFT)) {
            this.swipe('left');
        }
        if(GodStep.IsKeyPressed(GodStep.KEY_S) || GodStep.IsKeyPressed(GodStep.KEY_BOT)) {
            this.swipe('bot');
        }
        if(GodStep.IsKeyPressed(GodStep.KEY_D) || GodStep.IsKeyPressed(GodStep.KEY_RIGHT)) {
            this.swipe('right');
        }
        if (this.isGameStarted) {

            this.field.update();
            if(this.isSwiped) {

            }
            if (this.b_back.isPushed) {
                this.b_back.play();
                if (this.b_back.currentFrame == 7) {
                    this.soul.screenTo([this.soul.startmenu], this);
                    this.b_back.isPushed = false;
                    this.b_back.setToFrame(0);
                }
            }
        }
    }
};

pro.init = function() {
    this.soul.background.setState(0);

    this.overTimer = -1;
    this.isFail = false;
    this.isOver = false;
    this.isWin = false;
    this.isGameStarted = true;
    this.visible = true;
    this.points = 0;
    this.scoreText.setText('0');

    this.field.init();
};
pro.swipe = function(side) {
    this.isSwiped = true;
    this.downPos = null;
    this.field.swipe(side);

};


// listeners
pro.h_field = function(e) {
    var g = this.gameplay;
    var data = e.content.data;
    switch (e.type) {
        case HTU.FieldCellComplete:
            g.points += data;
            if(g.points > g.pointsBest) {
                g.pointsBest = g.points;
                g.bestText.setText(g.points + '');
            }
            g.scoreText.setText(g.points + '');
            break;
        case HTU.FieldUnicornFinded:

            g.isWin = true;
            g.overTimer = 300;
            g.isOver = true;
            trace('Win');
            GodStep.playSound('3', 0, HTU.SOUND);

            break;
        case HTU.FieldNoVariants:
            g.isOver = true;
            g.isFail = true;
            g.overTimer = 100;
            trace('No var');
            GodStep.playSound('2', 0, HTU.SOUND);

            break;
    }

};
pro.h_mouse = function(e) {
    var t = e.target;


    switch (e.type) {
        case GodStep.FRAME_MOVE:
            if(t.downPos) {
                var p = e.content.getLocalPosition(t);
                var d = 22;
                if(p.x - t.downPos.x > d) {
                    t.swipe('right');
                } else  if(t.downPos.x - p.x> d){
                    t.swipe('left');
                } else  if(t.downPos.y - p.y> d){
                    t.swipe('top');
                } else if(p.y - t.downPos.y> d){
                    t.swipe('bot');
                }
            }
            break;
        case GodStep.FRAME_DOWN:
            t.soul.keyboard.focus();
            if(t.isGameStarted && !t.isFail && !t.isWin) {
                t.downPos = e.content.getLocalPosition(t);
            }
            break;
        case GodStep.FRAME_UP:
            t.downPos = null;
            break;
    }
};
pro.h_buttons = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            switch (t) {
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
        this.scale.x = this.scale.y = value;
        this.container.y = (this.soul.H - this.soul.OH)*.5/value;

    }
});
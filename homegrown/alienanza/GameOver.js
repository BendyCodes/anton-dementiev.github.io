AZ.GameOver = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'GameOver', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = soul.startS;
    this.addChild(this.remember = new AZ.Img('gameover_back', S, soul.W/2, soul.H *.5, 0.5));
    this.addChild(this.background1 = new AZ.Img('back_pod', S, soul.W/2, soul.H *.32, 0.5));
    this.addChild(this.background1 = new AZ.Img('back_pod', S, soul.W/2, soul.H *.42, 0.5));
    this.addChild(this.scoreLabel = new AZ.Img('score', S, soul.W *.35, soul.H *.325, 0.5));
    this.addChild(this.bestLabel = new AZ.Img('best_score', S, soul.W*.35, soul.H *.425, 0.5));
    this.addChild(this.againButton = new AZ.ImgButton('restart', this, S, soul.W/2, soul.H *.6));
    this.addChild(this.backButton = new AZ.ImgButton('back', this, S, soul.W *.3, soul.H *.80));

    this.addFrame(this.nowScore = new AZ.Text()); this.nowScore.init(10, S, 0x00ff00);
    this.addFrame(this.bestScore = new AZ.Text()); this.bestScore.init(10, S, 0xfffc00);
    this.nowScore.place(soul.W *.72, soul.H *.3);
    this.bestScore.place(soul.W *.72, soul.H *.4);
    this.addChild(this.newRecord = new AZ.ImgButton('new_record', this, S, soul.W *.71, soul.H *.28)); this.newRecord.visible = false;

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    addEvent(this.againButton, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.backButton, AZ.ImgButton.CLICK, this.h_buttons);

    this.phase = 0;
    this.visible = false;

};
extend(AZ.GameOver, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
        this.againButton.rotation = Math.sin(this.phase) * Math.PI * .05; this.phase+= 0.05;
        this.newRecord.scale.x =  Math.sin(this.phase) * .1 + .95;
        this.newRecord.scale.y =  Math.cos(this.phase) * .1 + .95;
    }
};
pro.init = function() {
    this.visible = true;
    if(this.soul.gameplay.nowScore == this.soul.gameplay.bestScore) {
        this.newRecord.visible = true;
    } else {
        this.newRecord.visible = false;
    }
    this.nowScore.setText(this.soul.gameplay.nowScore);
    this.bestScore.setText(this.soul.gameplay.bestScore);
};


pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    if(!p.isGameOver) {
        switch (t) {
            case p.againButton:
                GodStep.playSound('alienanza_click', 0, AZ.SOUND);

                s.screenTo([s.gameplay], p);
                break;
            case p.backButton:
                GodStep.playSound('alienanza_click', 0, AZ.SOUND);
                GodStep.playSound('alienanza_main', -1, AZ.MUSIC);

                s.screenTo([s.startmenu], p);
                break;
        }
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.againButton.isDown = t.backButton.isDown = false;
                t.againButton.Scale = t.backButton.Scale = 1;
            }
            break;
    }
};

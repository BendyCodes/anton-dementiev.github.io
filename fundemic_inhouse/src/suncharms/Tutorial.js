M3.Tutorial = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Tutorial', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.endTimer = -1;
    this.addChild(this.back = new M3.Background(this, 'back_t1'));
    this.addChild(this.pers = new M3.Img('pers_start_1', S, this.W *.35, this.H *.35,.5));
    this.addChild(this.field = new M3.Img('field_tutorial', S, this.W *.5, this.H *.64,.5));
    this.addChild(this.bubble = new M3.Img('bubble', S, this.W *.7, this.H *.3,.5));
    this.addChild(this.bubbleIcon = new M3.Img('bubble', S, this.W *.7, this.H *.3,.5));
    this.addChild(this.targetLabel = new M3.Text('TARGET', 90 * S, this.W *.5, this.H *.59, 'left', 0xffffff));

    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
};
extend(M3.Tutorial, GodStep.Frame);

pro.initEnd = function(isWin) {
    this.isEndView = true;
    this.endTimer = 100;
    this.visible = true;
    this.alpha = 0;
    this.isDead = false;
    this.bubbleIcon.visible = this.bubble.visible = false;
    this.pers.visible = isWin;
    this.targetLabel.setText(isWin ? 'LEVEL COMPLETE' : 'OUT OF MOVES');
    this.targetLabel.updateText();
    this.targetLabel.x = this.W/2 - this.targetLabel.width/2;

    this.field.setTexture((isWin ? 'win' : 'fail') + '_p');

};

pro.init = function() {
    this.isEndView = false;
    this.visible = true;
    this.isDead = false;
    this.alpha = 1;
    this.bubbleIcon.visible = this.bubble.visible = this.pers.visible = true;

    this.field.setTexture('field_tutorial');

    var leveldata = M3.LAST_LEVEL_DATA;
    var dirtCount = 0;
    for(var i = 0; i<leveldata.length-1; i++) {
        if(leveldata[i].name == 'dirt') {
            dirtCount++;
        }
    }
    this.params = leveldata[leveldata.length - 1];
    var points = this.params.points + '';
    if(this.params.points > 0) {
        this.targetLabel.setText('Score ' + M3.Format(points) + " in " + this.params.steps + " moves");
        this.bubbleIcon.setTexture('star');
        this.pers.setTexture('pers_start_' + 3);
        this.back.img.setTexture('back_t' + 3);


    } else
    if(dirtCount > 0) {
        this.targetLabel.setText('Pop ' + dirtCount + " goo-balls" + " in " + this.params.steps + " moves");
        this.bubbleIcon.setTexture('icon_1_' + M3.SKIN);
        this.pers.setTexture('pers_start_' + 1);
        this.back.img.setTexture('back_t' + 1);



    } else
    if(this.params.items > 0) {
        this.targetLabel.setText('Collect ' + this.params.items + " crystals" + " in " + this.params.steps + " moves");
        this.bubbleIcon.setTexture('icon_2_1');
        this.pers.setTexture('pers_start_' + 2);
        this.back.img.setTexture('back_t' + 2);
    }


    this.targetLabel.updateText();
    this.targetLabel.x = this.W/2 - this.targetLabel.width/2;
};

pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;

        if(!t.isEndView) {
            t.isDead = true;
        }
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var dy = this.soul.OH - this.soul.H;
        //this.b_back.y = (this.soul.H * .11 - dy/2) / value;
       // this.pers.y = (-dy/2 + this.soul.H *.13)/value;
   //     this.levelLabel.y = (this.soul.H * .028 - dy/2)/value;
        this.back.rescale(value);
    }
});
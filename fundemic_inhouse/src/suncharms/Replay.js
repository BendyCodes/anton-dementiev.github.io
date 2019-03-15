M3.Replay = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Replay', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addChild(this.back = new M3.Background(this, 'back_end_fail'));
    this.addChild(this.pers = new M3.Img('pers_2_end_fail', S, this.W *.3, this.H *.1,.5));
    this.addChild(this.pers2 = new M3.Img('pers_1_end_fail', S, this.W *.8, this.H *.1,.5));
    this.addChild(this.field = new M3.Img('field_end', S, this.W *.5, this.H *.6,.5));
    this.addChild(this.field_reccord = new M3.Img('field_record', S, this.W *.5, this.H *.36,.5));

    this.addChild(this.star = new M3.ImgButton('star2', 'star_shadow',.9, this, S, this.W *.5, this.H *.59, null, null,.1,.2));
    this.field_reccord.visible =false;
    this.addChild(this.b_back = new M3.ImgButton('b_menu', 'b_end_fail', 1, this, S, this.W *.35, this.H *.83));
    this.addChild(this.b_play = new M3.ImgButton('b_replay', 'b_end_fail', 1, this, S, this.W *.65, this.H *.83));

    this.addChild(this.recordLabel = new M3.Text('LEVEL', 150 * S, this.W *.5, this.H *.375, 'left', 0x465763));
    this.addChild(this.levelLabel = new M3.Text('FAIL!', 290 * S, this.W *.5, this.H *.2, 'left', 0xffffff));
    this.addChild(this.targetLabel = new M3.Text('TARGET', 150 * S, this.W *.5, this.H *.53, 'left', 0xffffff));

    this.visible = false;
    this.star.scaleble = false;

    addEvent(this.b_back, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_play, M3.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.Replay, GodStep.Frame);

pro.init = function() {
    this.visible = true;
    this.levelLabel.updateText();
    this.levelLabel.x = this.W/2 - this.levelLabel.width/2;

    GodStep.playSound('loss', 0, M3.SOUND);

    this.recordLabel.setText('LEVEL ' + (M3.LAST_LEVEL_SELECTED));
   // this.recordLabel.setText('RECORD ' +));
    this.recordLabel.updateText();
    this.recordLabel.x = this.W/2 - this.recordLabel.width/2;

    var leveldata = M3.LAST_LEVEL_DATA;
    var dirtCount = 0;
    for(var i = 0; i<leveldata.length-1; i++) {
        if(leveldata[i].name == 'dirt') {
            dirtCount++;
        }
    }
    this.params = leveldata[leveldata.length - 1];
    var points = this.params.points + '';

    var text = this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1];
    this.targetLabel.setText((M3.NEW_RECORD ? 'NEW RECORD ' : 'SCORE ') +  M3.Format(text + ''));
    if(0) {
        if(this.params.points > 0) {
            this.targetLabel.setText('COLLECT ' + (points.substr(0, points.length - 3) + ',' + points.substr(points.length - 3, 3)) + " FOR " + this.params.steps + " MOVE");
        } else
        if(dirtCount > 0) {
            this.targetLabel.setText('REMOVE ALL ' + dirtCount + " DIRT"+ " FOR " + this.params.steps + " MOVE");
        } else
        if(this.params.items > 0) {
            this.targetLabel.setText('DROP DOWN ' + this.params.items + " CRYSTALS"+ " FOR " + this.params.steps + " MOVE");
        }
    }



    this.targetLabel.updateText();
    this.targetLabel.x = this.W/2 - this.targetLabel.width/2 + (M3.NEW_RECORD ? this.W *.11 : 0);
    this.star.visible = M3.NEW_RECORD;
    this.star.x = this.targetLabel.x - this.W * .11;
};

pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        t.b_play.isDown = false;
        t.b_back.isDown = false;
        t.b_back.Scale = 1;
        t.b_play.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_play:
            GodStep.playSound('button', 0, M3.SOUND);

            s.screenTo([s.gameplay], p);
            break;
        case p.b_back:
            GodStep.playSound('button', 0, M3.SOUND);

            s.screenTo([s.levelselect], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var dy = this.soul.OH - this.soul.H;
        this.scale.x = this.scale.y = value;
       //this.b_back.y = (this.soul.H * .11 - dy/2) / value;
        this.pers2.y = this.pers.y = (-dy/2 + this.soul.H *.13)/value;
        this.levelLabel.y = (this.soul.H * .18 - dy/2)/value;
        this.back.rescale(value);
    }
});
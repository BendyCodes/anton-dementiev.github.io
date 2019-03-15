M3.Victory = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Victory', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addChild(this.back = new M3.Background(this, 'back_end'));
    this.addChild(this.backAnim = new M3.MovieClip(['f_1', 'f_2', 'f_3'], S, this.W *.5, this.H *.3,.5)); this.backAnim.animTimer = 0;
    this.addChild(this.winAnim = new M3.MovieClip(['win_1', 'win_2'], S, this.W *.5, this.H *.28,.5)); this.winAnim.animTimer = 0;
    this.addChild(this.pers = new M3.Img('pers_e_2', S, this.W *.25, this.H *.1,.5));
    this.addChild(this.pers2 = new M3.Img('pers_e_3', S, this.W *.8, this.H *.1,.5));
    this.addChild(this.field = new M3.Img('field_end', S, this.W *.5, this.H *.6,.5));

    this.addChild(this.b_back = new M3.ImgButton('b_menu', 'e_shadow', 1, this, S, this.W *.25, this.H *.8));
    this.addChild(this.b_replay = new M3.ImgButton('b_replay', 'e_shadow', 1, this, S, this.W *.5, this.H *.8));
    this.addChild(this.b_next = new M3.ImgButton('b_next', 'e_shadow', 1, this, S, this.W *.75, this.H *.8));
    this.addChild(this.star = new M3.ImgButton('star2', 'star_shadow',.9, this, S, this.W *.5, this.H *.59, null, null,.1,.2));
    this.star.scaleble = false;

    this.addChild(this.victory = new M3.Text('VICTORY!', 285 * S, this.W *.22, this.H *.2, 'left', 0xffffff));
    this.addChild(this.levelLabel = new M3.Text('LEVEL', 140 * S, this.W *.5, this.H *.37, 'left', 0xCC6600)); this.levelLabel.alpha = .7;
    this.addChild(this.recordLabel = new M3.Text('RECORD', 150 * S, this.W *.5, this.H *.53, 'left', 0xffffff));

    this.victory.x = this.W / 2 - this.victory.width/2;
    this.visible = false;

    addEvent(this.b_back, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_next, M3.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_replay, M3.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.Victory, GodStep.Frame);

pro.init = function() {
    this.visible = true;
    var player = this.soul.playerDATA;
    this.levelLabel.setText('LEVEL ' + M3.LAST_LEVEL_SELECTED);
    this.levelLabel.updateText();
    this.levelLabel.x = this.W/2 - this.levelLabel.width/2;


    this.star.visible = this.levelLabel.visible = this.victory.visible = this.backAnim.visible = this.pers.visible = this.pers2.visible = this.b_next.visible = M3.LAST_LEVEL_SELECTED < 30;
    this.winAnim.visible = !this.b_next.visible;

    GodStep.playSound('victory', 0, M3.SOUND);

    if(M3.LAST_LEVEL_SELECTED == 30) {
        this.b_replay.x = this.W * .65;
        this.b_back.x = this.W * .35;
        this.recordLabel.setText('YOU WON!');
        this.recordLabel.updateText();
        this.recordLabel.scale.x = this.recordLabel.scale.y = 1.5;
        this.recordLabel.x = this.W/2- (this.recordLabel.width/2) ;
        this.field.setTexture('field_win');
        this.recordLabel.y = this.H *.49;

    } else {
        this.star.visible = M3.NEW_RECORD;
        this.recordLabel.setText((M3.NEW_RECORD ? 'NEW RECORD ' : 'SCORE ')  + M3.Format(this.soul.playerDATA.levels[M3.LAST_LEVEL_SELECTED - 1][1] + ''));
        this.recordLabel.scale.x = this.recordLabel.scale.y = 1;
        this.recordLabel.updateText();

        this.recordLabel.x = this.W/2 - this.recordLabel.width/2  + (M3.NEW_RECORD ? this.W *.11 : 0);
        this.b_next.x = this.W * .75;
        this.b_replay.x = this.W * .5;
        this.b_back.x = this.W * .25;
        this.field.setTexture('field_end');
        this.recordLabel.y = this.H *.53;



    }


    this.star.x = this.recordLabel.x - this.W * .11;

};

pro.update = function() {
    if(this.visible) {
        if(this.winAnim.animTimer++ > 15) {
            this.winAnim.nextFrame(); this.winAnim.animTimer = 0;
        }
        if(this.backAnim.animTimer++ > 10) {
            this.backAnim.nextFrame(); this.backAnim.animTimer = 0;
        }
    }
};
pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        t.b_replay.isDown = false;
        t.b_next.isDown = false;
        t.b_back.isDown = false;
        t.b_back.Scale = 1;
        t.b_replay.Scale = 1;
        t.b_next.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_next:
            p.settingsDATA = s.settingsDATA;
            M3.LAST_LEVEL_SELECTED++;
            if(M3.LAST_LEVEL_SELECTED > p.settingsDATA.levels.length) {
                s.screenTo([s.startmenu], p);
            } else {
                M3.LAST_LEVEL_DATA = p.settingsDATA.levels[M3.LAST_LEVEL_SELECTED-1];
                s.screenTo([s.gameplay], p);
            }
            GodStep.playSound('button', 0, M3.SOUND);

            break;
        case p.b_back:
            s.screenTo([s.levelselect], p);
            GodStep.playSound('button', 0, M3.SOUND);

            break;
        case p.b_replay:
            p.settingsDATA =  s.settingsDATA;
            M3.LAST_LEVEL_DATA = p.settingsDATA.levels[M3.LAST_LEVEL_SELECTED-1];
            s.screenTo([s.gameplay], p);
            GodStep.playSound('button', 0, M3.SOUND);

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
     //   this.b_back.y = (this.soul.H * .11 - dy/2) / value;
        this.pers2.y = this.pers.y = (-dy/2 + this.soul.H *.13)/value;
        this.victory.y = this.pers2.y + this.H * .05;
        this.back.rescale(value);
    }
});
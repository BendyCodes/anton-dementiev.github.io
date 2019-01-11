PR.Victory = function(soul) {
    GodStep.LFrame.call(this, soul, 'Victory');
    this.addChild(this.back = new PR.Background(this, 'back_win'));
    this.addChild(this.bot = new PIXI.DisplayObjectContainer());
    this.addChild(this.top = new PIXI.DisplayObjectContainer());

    this.top.addChild(this.field_score_win = new Games.Img('field_score_win', this.s, this.W *.5, this.H * .13,.5));
    this.top.addChild(this.pers1 = new GodStep.MovieClip(['pers_fg_1', 'pers_fg_1_0'], this.s, this.W *.18, this.H *.2,.5));
    this.top.addChild(this.pers2 = new GodStep.MovieClip(['pers_v_1', 'pers_v_1_0'], this.s, this.W *.82, this.H *.2,.5));

    this.top.addChild(this.label_score = new PR.Text('12313', 160 * this.s, this.W *.32, this.H *.08, 'center', 0xffffff));
    this.bot.addChild(this.label = new PR.Text(PR.S('victory').toUpperCase(), 240 * this.s, this.W *.12, -this.H *.68, 'center', 0xffffff));
    this.bot.addChild(this.label_level = new PR.Text('LEVEL 1', 140 * this.s, this.W *.32, -this.H *.73, 'center', 0x6f3873));

    this.bot.addChild(this.field_record = new Games.Img('field_record', this.s, this.W *.5, this.H * -.42,.5));
    this.bot.addChild(this.label_record = new PR.Text('New Record    12323', 130 * this.s, this.W *.32, -this.H *.488, 'center', 0xffffff));
    this.bot.addChild(this.star = new Games.Img('star', this.s, this.W *.5, this.H * -.414,.5));
    this.pers1.animTime =  100;
    this.pers2.animTime = 111;
    this.pers2.animTimer = 66;
    this.field_score_win.phase = 0;
    this.bot.addChild(this.field_button = new Games.Img('field_button2', this.s, this.W *.5, this.H * -.22,.5));
    this.bot.addChild(this.b_replay = new Games.ImgButton('b_replay', this, this.W *.25,- this.H *.22));
    this.bot.addChild(this.b_menu = new Games.ImgButton('b_menu', this, this.W *.5,- this.H *.22));
    this.bot.addChild(this.b_next = new Games.ImgButton('b_next_1', this, this.W *.75,- this.H *.22));
    this.star.pos = new PIXI.Point(this.star.x, this.star.y);

    this.bot.addChild(this.maska = new PIXI.Graphics());
    this.field_record.mask = this.maska;
    this.field_button.mask = this.maska;
    this.maska.y = this.field_button.y - this.field_button.height;
    this.maska.beginFill(0, 1);
    this.maska.drawRect(0, -this.field_button.height * 2, this.field_button.width, this.field_button.height * 5);
    this.maska.endFill();


    addEvent(this.b_next, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_menu, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_replay, Games.ImgButton.CLICK, this.h_buttons);


}; extend(PR.Victory, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {
        var w = this.W * .005;
        this.star.x = Math.random() * w + this.star.pos.x - w * 2;
        this.star.y = Math.random() * w + this.star.pos.y- w * 2;
        this.field_score_win.phase += .05;
        this.field_score_win.y += Math.min(this.H *.05, ( this.H * .13 - this.field_score_win.y + Math.sin(this.field_score_win.phase) *.01 * this.W) *.3);
        this.field_button.x += Math.min(this.W *.1, (this.W *.5 - this.field_button.x) *.3);
        this.field_record.x += Math.max(-this.W *.1, (this.W *.5 - this.field_record.x) *.3);
        this.label_score.y = this.field_score_win.y - this.H * .05;
        this.label.x += Math.max(-this.W *.1, ((this.W - this.label.width)/2 - this.label.x) *.3);
        this.pers1.animate();
        this.pers2.animate();
        this.b_menu.scale.x = this.b_menu.scale.y += (1 - this.b_menu.scale.x) * .03;
        this.b_next.scale.x = this.b_next.scale.y += (1 - this.b_next.scale.x) * .07;
        this.b_replay.scale.x = this.b_replay.scale.y += (1 - this.b_replay.scale.x) * .05;
    }
};

pro.init = function() {
    GodStep.playSound('win', 0, PR.SOUND);
    this.visible = true;
    this.b_menu.scale.x =  this.b_menu.scale.y =
    this.b_next.scale.x =  this.b_next.scale.y = 0;
    this.b_replay.scale.x =  this.b_replay.scale.y = 0;
    this.field_score_win.phase = 0;

    this.field_button.x = -this.W * 2;
    this.field_score_win.y = -this.H * 1.5;
    this.field_record.x = this.W * 2;

    this.label_record.setText((this.soul.gameplay.isNewRecord ? PR.S('new record') : PR.S('score')) + '    ' + this.soul.gameplay.points);
    this.label_level.setText(PR.S('level') + ' ' + (PR.LAST_LEVEL_SELECTED + 1));
    this.label_score.setText(this.soul.gameplay.points + '');
    this.label_record.updateText();
    this.label_score.updateText();
    this.label.updateText();
    this.label_level.updateText();
    this.label.x = -(this.W);

    this.label_level.x = (this.W - this.label_level.width)/2;
    this.label_record.x = (this.W - this.label_record.width)/2;
    this.label_score.x = (this.W - this.label_score.width)/2;
    this.star.visible = this.soul.gameplay.isNewRecord;
    this.star.x = this.label_record.x + this.W * .582;
    this.star.pos = new PIXI.Point(this.star.x, this.star.pos.y);

    PR.PetResque.instance.savePlayer();

};
pro.h_buttons = function(e) {
    var p = e.target.parent.parent;
    var s = p.soul;
    GodStep.playSound('button', 0, PR.SOUND);

    switch (e.target) {
        case p.b_menu:

            s.screenTo([s.levelselect], p);
            break;
        case p.b_next:
            PR.LAST_LEVEL_SELECTED++;
            PR.LAST_LEVEL_DATA = PR.LEVELS[PR.LAST_LEVEL_SELECTED];
            s.screenTo([s.gameplay], p);
            break;
        case p.b_replay:
            s.screenTo([s.gameplay], p);
            break;
    }
};
Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        var s = this.soul;
        this.back.rescale(value);
        this.scale.x = this.scale.y = value;
        this.top.y = (- s.DOH/2)/value;
        this.bot.y = (s.OH - s.DOH/2)/value;
    }
});
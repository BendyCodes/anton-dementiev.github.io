PS.LevelOutro = function(soul) {
    this.soul = soul;
    var S = this.startS = soul.startS;

    GodStep.Frame.call(this, 'LevelOutro', soul.W, soul.H);
    this.addChild(this.back = new PS.Background(this, 'background_game_over'));

    this.addChild(this.star = new PS.Img('star', this.startS, this.W/2, this.H *.4,.5));
    this.addChild(this.label = new PS.Text('55',400 * S, this.W *.5, this.H *.27, 'center', 0xffffff));

    this.addChild(this.endLevel = new PS.MovieClip('end_level', this.startS, this.W/2, this.H/2,.5));
    this.addChild(this.endGame = new PS.MovieClip('end', this.startS, this.W/2, this.H *.44,.5));
    this.addChild(this.b_back = new PS.ImgButton('back', S, this.W *.13, this.H *.12));
    this.addChild(this.b_next = new PS.ImgButton('next', S, this.W *.5, this.H *.9));

  //  this.endLevel.visible = false;
 //   this.endGame.visible = false;
    this.timer = 50;

    this.b_back.visible = false;

    this.animateTimer = 0;
    this.visible = false;

    addEvent(this.b_back, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_next, PS.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PS.LevelOutro, GodStep.Frame);

pro.init = function() {
    GodStep.playSound('win', 0, PS.SOUND);

    this.timer = 100;
    this.visible = true;
    this.label.setText('' + PS.LAST_LEVEL_SELECTED);
    //var id =  PS.LAST_LEVEL_SELECTED - parseInt(PS.LAST_LEVEL_SELECTED/5) * 5 + 1;
//    this.back.img.setTexture(PS.LevelIntro.tex[id-1]);

    this.label.visible = this.star.visible = this.endLevel.visible = false;// PS.LAST_LEVEL_SELECTED != PS.LEVELS.length;
    this.endGame.visible = !this.star.visible;
    this.label.updateText();
    this.label.x = (this.W - this.label.width)/2;
    PS.LAST_LEVEL_SELECTED++;
    var player = PS.ZippyBoxes.instance.PLAYER;
    if(player.count < PS.LAST_LEVEL_SELECTED-1) {
        player.count  = PS.LAST_LEVEL_SELECTED - 1;
        PS.ZippyBoxes.instance.savePlayer();
    }

    if(PS.LAST_LEVEL_SELECTED < PS.LEVELS.length) {
        PS.LAST_LEVEL_DATA = PS.LEVELS[PS.LAST_LEVEL_SELECTED].levelData;
    }

};
pro.update = function() {
    if(this.visible) {
        if(this.timer-- == 0) {
        //    this.soul.screenTo([this.soul.levelselect], this);
        }
        if(this.animateTimer++ == 5) {
            this.animateTimer = 0;
            if(this.endLevel) this.endLevel.nextFrame();
            if(this.endGame) this.endGame.nextFrame();
        }
    }
};

pro.h_mouse = function(e) {
    var t = e.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.b_back.Scale = 1;
                t.b_back.isDown = false;
                t.b_next.Scale = 1;
                t.b_next.isDown = false;
            }
            break;
    }


};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_next:
            GodStep.playSound('button', 0, PS.SOUND);

            if(PS.LAST_LEVEL_SELECTED == PS.LEVELS.length + 1) {
                s.screenTo([s.startmenu], p);
            } else {
                s.screenTo([s.intro], p);
            }
            break;
        case p.b_back:
            GodStep.playSound('button', 0, PS.SOUND);

            s.screenTo([s.levelselect], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.b_back.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .1 / value;
        this.back.rescale(value);
    }
});
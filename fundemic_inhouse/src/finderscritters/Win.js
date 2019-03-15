PR.Win = function(soul) {
    GodStep.LFrame.call(this, soul, 'Win');
    this.addChild(this.back = new PR.Background(this, 'back_fin_animation'));
    this.addChild(this.bot = new PIXI.DisplayObjectContainer());
    this.addChild(this.top = new PIXI.DisplayObjectContainer());

    this.top.addChild(this.anim = new GodStep.MovieClip(['fin_animation_1', 'fin_animation_2', 'fin_animation_3'], this.s, this.W *.5, this.H *.32,.5));
    this.bot.addChild(this.field_button = new Games.Img('field_button2', this.s, this.W *.5, this.H * -.22,.5));
    this.bot.addChild(this.b_next = new Games.ImgButton('b_next_2', this, this.W *.5,- this.H *.22));
    this.anim.animTime = 20;
    addEvent(this.b_next, Games.ImgButton.CLICK, this.h_buttons);


}; extend(PR.Win, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {
        this.anim.animate();
    }
};
pro.init = function() {
    this.visible = true;
};
pro.h_buttons = function(e) {
    GodStep.playSound('button', 0, PR.SOUND);

    var p = e.target.parent.parent;
    var s = p.soul;
    switch (e.target) {
        case p.b_next:
            if(PR.DEVMODE) {
                s.screenTo([s.dev], p);
            } else {
                s.screenTo([s.startmenu], p);
            }
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
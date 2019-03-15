PS.LevelIntro = function(soul) {
    this.soul = soul;
    var S = this.startS = soul.startS;
    GodStep.Frame.call(this, 'LevelIntro', soul.W, soul.H);
    this.addChild(this.back = new PS.Background(this, 'background_loading_3'));
    this.addChild(this.header = new PS.Img('line', S, this.W *.5, this.H *.5,.5));
    this.addChild(this.headerLabel = new PS.Text('',400 * S, 0, this.H *.73, 'center', 0xffffff));


    this.soundTimer = 0;
    this.timer = -1;
    this.visible = false;
};
extend(PS.LevelIntro, GodStep.Frame);
PS.LevelIntro.tex = ['background_loading_3', 'background_loading_1', 'background_loading_2', 'menu_background', 'options_background'];
pro.update = function() {
    if(this.visible) {
        if(this.soundTimer++ == 15) {
            GodStep.playSound('start_screen', 0, PS.SOUND);
        }
        if(this.timer-- == 0) {
            if(PS.ISMUSICSTARTED == false) {
                PS.ISMUSICSTARTED = true;
                GodStep.playSound('theme2', null, PS.MUSIC);
            }
            this.soul.screenTo([this.soul.gameplay], this);
        }
    }
};
pro.init = function() {
    this.soundTimer = 0;

    var id =  PS.LAST_LEVEL_SELECTED - parseInt(PS.LAST_LEVEL_SELECTED/5) * 5 + 1;
    this.back.img.setTexture(PS.LevelIntro.tex[id-1]);
    this.visible = true;
    this.timer = 50;
    this.headerLabel.setText(PS.S('Level') + ' ' + PS.LAST_LEVEL_SELECTED);
    this.headerLabel.updateText();
    this.headerLabel.x = (this.W - this.headerLabel.width)/2;
    this.headerLabel.y = (this.H - this.headerLabel.height)/2 - this.H * .015;
};


Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.back.rescale(value);
    }
});
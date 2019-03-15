AZ.StartMenu = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'StartMenu', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    var S = soul.startS;

    this.addChild(this.head_logo = new AZ.Img('head_logo', S, soul.W/2, soul.H *.22, 0.5));
    this.addChild(this.alien1 = new AZ.Img('1', S, soul.W *.3, soul.H *.5, 0.5));
    this.addChild(this.alien2 = new AZ.Img('2',S, soul.W*.7, soul.H *.46, 0.5));

    this.addFrame(this.b_play = new AZ.ImgButton('play', this, S, soul.W/2, soul.H *.7));
    this.addFrame(this.b_settings = new AZ.ImgButton('settings_icon', this,S *1.2, soul.W *.25, soul.H *.81));
    this.addFrame(this.b_more = new AZ.ImgButton('more_icon', this, S *1.2, soul.W *.75, soul.H *.81));

    addEvent(this.b_play, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_settings, AZ.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_more, AZ.ImgButton.CLICK, this.h_buttons);


    this.phase = 0;
    this.visible = false;
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(AZ.StartMenu, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
        this.b_play.rotation = Math.sin(this.phase) * Math.PI * .05; this.phase+= 0.05;
    }
};

pro.init = function() {
    this.visible = true;
   // createjs.Sound.stop();

};

// listeners
pro.h_mouse = function(e) {
    if(e.content.target.soul) {
        var t = e.content.target;
        t.b_play.isDown =
            t.b_settings.isDown =
                t.b_more.isDown = false;
        t.b_more.Scale =
            t.b_settings.Scale =
                t.b_play.Scale = 1;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_settings:
            s.screenTo([s.settings], p);
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);

            break;
        case p.b_more:
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            break;
        case p.b_play:
            s.screenTo([s.gameplay], p);
            GodStep.playSound('alienanza_click', 0, AZ.SOUND);
            break;
    }
};
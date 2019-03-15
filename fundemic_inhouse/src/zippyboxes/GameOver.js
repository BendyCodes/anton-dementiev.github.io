PS.GameOver = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'GameOver', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    var S = soul.startS;
    this.startS = soul.startS;
    this.addChild(this.b_startmenu = new AG.TextButton('main menu', 33, 0xfa66466, this, S, soul.W *.2, soul.H *.81));
    this.addChild(this.b_restart = new AG.TextButton('restart', 33, 0xfa66466, this, S, soul.W *.54, soul.H *.81));
    this.addChild(this.b_shop = new AG.TextButton('shop', 33, 0xfa66466, this, S, soul.W *.75, soul.H *.81));

    this.addChild(this.totalMoney = new GodStep.Text('total', 55*S, 'Arial', 'left', 0xffffff));
    this.addChild(this.roundMoney = new GodStep.Text('round', 55*S, 'Arial', 'left', 0xffffff));
    this.addChild(this.bestMoney = new GodStep.Text('money', 55*S, 'Arial', 'left', 0xffffff));
    this.addChild(this.level = new GodStep.Text('level', 55*S, 'Arial', 'left', 0xffffff));
    this.addChild(this.till = new GodStep.Text('till', 55*S, 'Arial', 'left', 0xffffff));

    this.addFrame(this.progress = new PS.ProgressBar(this));
    addEvent(this.b_startmenu, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_restart, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_shop, PS.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);


    this.levels = [];
    this.levels[0] = 0;
    this.levels[1] = 100;
    for(var i =2; i<100; i++) {
        this.levels[i] = this.levels[i-1] * 1.05 + 100;
    }
    this.visible = false;

};
extend(PS.GameOver, GodStep.Frame);

pro.update = function() {
    if(this.visible) {

    }
};
pro.init = function() {
    var player = GodStep.LoadLocal('player');
    this.totalMoney.setText('total: ' + player.totalMoney);
    this.bestMoney.setText('best: ' + player.bestScore);
    this.roundMoney.setText('money: ' + this.soul.gameplay.roundMoney);

    var levelID = 0;
    for(var i =1; i<this.levels.length; i++) {
        if(this.levels[i] > player.totalScore) {
            levelID = i - 1;
            break;
        }
    }
    this.level.setText('level: ' + levelID);
    this.till.setText(Math.floor(this.levels[levelID + 1] - player.totalScore) + '$ till next prize');
    this.progress.drawProgress(1 - ((this.levels[levelID + 1] - player.totalScore)/(this.levels[levelID + 1] - this.levels[levelID])));
    this.progress.x = (this.W - this.progress.W)/2;
    this.roundMoney.y = this.H * .2;
    this.totalMoney.y = this.H * .3;
    this.bestMoney.y = this.H * .4;
    this.level.y = this.H * .5;
    this.till.y = this.H * .6;
    this.progress.y = this.H * .7;

    this.till.x =
    this.level.x =
    this.roundMoney.x =
    this.totalMoney.x =
    this.bestMoney.x = this.W * .2;
    this.visible = true;
};


pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    if(!p.isGameOver) {
        switch (t) {
            case p.b_startmenu:
                s.screenTo([s.startmenu], p);
                break;
            case p.b_shop:
                s.screenTo([s.shop], p);
                break;
            case p.b_restart:
                s.screenTo([s.gameplay], p);
                break;
        }
    }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.b_startmenu.isDown =
                    t.b_restart.isDown =
                            t.b_shop.isDown = false;
                t.b_shop.Scale =
                    t.b_startmenu.Scale =
                            t.b_restart.Scale = 1;
            }
            break;
    }
};

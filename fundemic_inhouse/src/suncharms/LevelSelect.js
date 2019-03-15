M3.LevelSelect = function(soul) {
    this.soul = soul;
    var S = this.startS = soul.startS;
    GodStep.Frame.call(this, 'LevelSelect', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    this.addChild(this.back = new M3.Background(this, 'back_l'));
    this.addChild(this.pers = new M3.Img('pers_l', S, this.W *.85, this.H *.2,.5));
    this.addChild(this.label = new M3.Text('LEVELS',195 * S, this.W *.31, this.H *.1, 'left', 0xffffff));

    this.addChild(this.maska = new PIXI.Graphics());
    this.addChild(this.container = new GodStep.Frame('Container', soul.W, soul.H));

    GodStep.IDownUp.call(this.container, this.soul.W, this.soul.H);
    this.addChild(this.b_back = new M3.ImgButton('b_back', 'l_shadow', 1, this, S, this.W *.16, this.H *.12));

    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);

    this.visible = false;

    this.levels = [];
    this.container.MY = this.container.y = soul.H * .23;

    this.maska.beginFill(0,.1);
    this.maska.drawRect(0, this.container.y, this.W, this.H);
    this.container.mask = this.maska;

    addEvent(this.container, GodStep.FRAME_MOVE, this.h_container);
    addEvent(this.container, GodStep.FRAME_DOWN, this.h_container);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(M3.LevelSelect, GodStep.Frame);

pro.init = function(data) {
    this.visible = true;
    this.settingsDATA = M3.SunCharms.instance.settingsDATA;

    while(this.levels.length) {
        this.container.removeChild(this.levels[0].destroy());
        this.levels.splice(0, 1);
    }

    M3.LEVELS = this.levels = [];
    var S = this.startS;
    var w = this.W/4.3;
    var x, y;
    var maxY =0;
    var levels = this.settingsDATA.levels;
    var plevels = this.soul.playerDATA.levels;
    var isActivate = false;
    for(var i = 0; i<levels.length; i++) {
        y = parseInt(i/4);
        x = i - y * 4;
        var level = new M3.LevButton('lock', S, x * w + w *.66, y * w + w/2, '' + (i + 1), 200 * S, 0, this.H *.058, 0x3289bf);
        maxY = Math.max(maxY, level.y + level.H/2);
        this.container.addChild(level);
        level.ID = i+1;

        level.isDisabled = true;
        if(plevels[i][0] == 1) {
            level.isDisabled = false;
            level.setAsComplete();

        } else {
            if(!isActivate) {
                isActivate = true;
                level.isDisabled = false;
                level.setAsActive();
            }
        }


        this.levels.push(level);
        level.levelData = levels[i];
        addEvent(level, M3.ImgButton.CLICK, this.h_levels);
    }
    if(this.newLevel) {
        this.container.addChild(this.newLevel.destroy());
        this.newLevel = null;
    }

    if(M3.DEVMODE) {
        if(!this.b_loadDef) {
            this.addFrame(this.b_loadDef = new Games.TextButton('Load Default', 35, 0x562466, this, S, this.soul.W *.5, this.soul.H *.05));
            addEvent(this.b_loadDef, Games.ImgButton.CLICK, this.h_buttons);
        }
        this.b_loadDef.visible = true;

        y = parseInt(this.levels.length/4);
        x = this.levels.length - y * 4;
        var newLevel = this.newLevel =  new Games.TextButton('add', 60, 0x555555, this, S, x * w + w/2, y * w + w/2);
        newLevel.ID = this.levels.length + 1;
        addEvent(newLevel, GodStep.FRAME_DOWN, this.h_newLevels);
        this.container.addChild(newLevel);
    } else {
        if( this.b_loadDef)  {
            this.b_loadDef.visible = false;
        }
    }

    this.container.setHitArea(0, 0, this.W, maxY);
    this.container.MH = maxY + this.H * .1;
    this.container.LH = (level) ? level.H : 0;

};
pro.h_levels = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var s = p.soul;
    switch (e.type) {
       case M3.ImgButton.CLICK:
           M3.LAST_LEVEL_SELECTED = t.ID;
           M3.LAST_LEVEL_DATA = t.levelData;
           if(M3.DEVMODE) {
               s.screenTo([s.dev], p);
           } else {
             // if(!t.isDisabled) {
                 GodStep.playSound('button', 0, M3.SOUND);
                 s.screenTo([s.gameplay], p);
            //  }
           }
           break;
   }
};
pro.h_newLevels = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var s = p.soul;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            M3.LAST_LEVEL_SELECTED = t.ID;
            s.screenTo([s.dev], p);
            break;
    }
};
pro.h_container = function(e) {
    var t = e.target;
    var parent = t.parent;
    var s = parent.soul;
    if(t.name == 'Container') {
        switch (e.type) {
            case GodStep.FRAME_MOVE:
                if(t.isDown) {
                    var p = e.content.getLocalPosition(t.parent);
                    var hy = (s.OH - s.H) * .5;
                    t.y = p.y - t.downPoint.y;
                    t.y = Math.max(Math.min(t.y, t.MY - hy / parent.scale.x), (s.OH - hy) / parent.scale.x - t.MH);
                }
                break;
        }
    }

};
pro.h_mouse = function(e) {
    var t = e.content.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.b_back.Scale = 1;
                t.b_back.isDown = false;
                if(t.b_loadDef) {
                    t.b_loadDef.isDown = false;
                    t.b_loadDef.Scale = 1;
                }
                for(var i = 0; i<t.levels.length; i++) {
                    t.levels[i].Scale = 1;
                    t.levels[i].isDown = false;
                }
            }
            break;
    }


};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_loadDef:
            p.init(GodStep.LoadText(M3.DEFAULT_SETTINGS));
            break;
        case p.b_back:
            GodStep.playSound('button', 0, M3.SOUND);

            s.screenTo([s.startmenu], p);
            break;
    }
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.maska.y = this.container.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .15 / value;
        this.container.y -= -this.container.MY + this.soul.H * .15 / value;
        this.maska.y += this.soul.H * .07 / value;

        this.maska.clear();
        this.maska.beginFill(0,.1);
        this.maska.drawRect(0, 0, this.W, this.soul.OH* 1.1/value -  this.container.y);

        var dy = this.soul.OH - this.soul.H;
        this.b_back.y = (this.soul.H * .11 - dy/2)/value;
        this.pers.y = (this.soul.H * .113 - dy/2)/value;
        this.label.y = (this.soul.H * .028 - dy/2)/value;
        this.back.rescale(value);
    }
});
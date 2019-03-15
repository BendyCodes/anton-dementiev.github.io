PS.LevelSelect = function(soul) {
    this.soul = soul;
    var S = this.startS = soul.startS;
    GodStep.Frame.call(this, 'LevelSelect', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    this.addChild(this.back = new PS.Background(this, 'level_background'));

    this.addChild(this.maska = new PIXI.Graphics());
    this.addChild(this.container = new GodStep.Frame('Container', soul.W, soul.H));

    GodStep.IDownUp.call(this.container, this.soul.W, this.soul.H);
    this.addChild(this.header = new PS.Img('header_level', S, this.W, this.H *.12, new PIXI.Point(1,.5)));
    var oText = PS.S('Levels'); var c = Math.min(1, 7/oText.length);
    this.addChild(this.headerLabel = new PS.Text(oText,300 * S * c, this.W *.3, this.H *.01, 'left', 0xffffff));
    this.addChild(this.b_back = new PS.ImgButton('back', S, this.W *.13, this.H *.12));

    addEvent(this.b_back, PS.ImgButton.CLICK, this.h_buttons);

    this.visible = false;

    this.levels = [];
    this.container.MY = this.container.y = soul.H * .2;

    this.maska.beginFill(0,.1);
    this.maska.drawRect(0, this.container.y, this.W, this.H);
    this.container.mask = this.maska;

    addEvent(this.container, GodStep.FRAME_MOVE, this.h_container);
    addEvent(this.container, GodStep.FRAME_DOWN, this.h_container);
    addEvent(this.b_back, PS.ImgButton.CLICK, this.h_buttons);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PS.LevelSelect, GodStep.Frame);

PS.ISMUSICSTARTED = false;
pro.init = function(data) {
    this.visible = true;
    this.settingsDATA = data || GodStep.LoadLocal(this.soul.SETTINGS_SLOT);
    if(this.settingsDATA == null) {
        this.settingsDATA = GodStep.LoadText(this.soul.defaultSettings);
    }
    var player = PS.ZippyBoxes.instance.PLAYER;


    while(this.levels.length) {
        this.container.removeChild(this.levels[0].destroy());
        this.levels.splice(0, 1);
    }

    PS.LEVELS = this.levels = [];
    var S = this.startS;
    var w = this.W/4.3;
    var x, y;
    var maxY =0;
    var levels = this.settingsDATA.levels;
    for(var i = 0; i<levels.length; i++) {
        y = parseInt(i/4);
        x = i - y * 4;
        var level = new PS.ImgButton('field_off', S, x * w + w *.66, y * w + w/2, '' + (i + 1), 175 * S, 0, this.H *.022, 0x36818A);
        maxY = Math.max(maxY, level.y + level.H/2);
        this.container.addChild(level);
        level.ID = i+1;
        level.isDisabled = true;
        if(i < player.count) {
            level.isDisabled = false;
            level.setAsComplete();
        }
        if(i == player.count) {
            level.isDisabled = false;
            level.setAsActive();
        }

        this.levels.push(level);
        level.levelData = levels[i];
        addEvent(level, PS.ImgButton.CLICK, this.h_levels);
    }
   // GodStep.SaveLocal(this.settingsDATA, this.soul.SETTINGS_SLOT);
    if(this.newLevel) {
        this.container.addChild(this.newLevel.destroy());
        this.newLevel = null;
    }

    if(PS.DEVMODE) {
        if(!this.b_loadDef) {
            this.addFrame(this.b_loadDef = new PS.TextButton('Load Default', 35, 0x562466, this, S, this.soul.W *.5, this.soul.H *.05));
            addEvent(this.b_loadDef, PS.ImgButton.CLICK, this.h_buttons);

        }
        this.b_loadDef.visible = true;

        y = parseInt(this.levels.length/4);
        x = this.levels.length - y * 4;
        var newLevel = this.newLevel =  new PS.TextButton('add', 60, 0x555555, this, S, x * w + w/2, y * w + w/2);
        newLevel.ID = this.levels.length + 1;
        addEvent(newLevel, GodStep.FRAME_DOWN, this.h_newLevels);
        this.container.addChild(newLevel);
    } else {
        if( this.b_loadDef)  {
            this.b_loadDef.visible = false;
        }
    }

    this.container.setHitArea(0, 0, this.W, maxY);
    this.container.MH = maxY + this.H * .06;
    this.container.LH = level.H;

};
pro.h_levels = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var s = p.soul;
    switch (e.type) {
       case PS.ImgButton.CLICK:
           PS.LAST_LEVEL_SELECTED = t.ID;
           PS.LAST_LEVEL_DATA = t.levelData;
           if(PS.DEVMODE) {
               s.screenTo([s.dev], p);
           } else {
               if(!t.isDisabled) {
                    GodStep.playSound('button', 0, PS.SOUND);
                    s.screenTo([s.intro], p);
               }
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
            PS.LAST_LEVEL_SELECTED = t.ID;
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
    var t = e.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.target.soul) {
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
            p.init(GodStep.LoadText(PS.DEFAULT_SETTINGS));
            break;
        case p.b_back:
            GodStep.playSound('button', 0, PS.SOUND);
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
        this.maska.y = this.container.y = this.header.y = this.headerLabel.y = this.b_back.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .1 / value;
        this.headerLabel.y -=  this.soul.H * .025 / value + this.headerLabel.height/2;
        this.container.y -= -this.container.MY + this.soul.H * .13 / value;
        this.maska.y += this.soul.H * .07 / value;

        this.maska.clear();
        this.maska.beginFill(0,.1);
        this.maska.drawRect(0, 0, this.W, this.soul.OH/value -  this.container.y);

        this.back.rescale(value);
    }
});
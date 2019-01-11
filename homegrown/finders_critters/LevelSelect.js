PR.LevelSelect = function(soul) {
    this.soul = soul;
    var S = this.startS = soul.startS;
    GodStep.LFrame.call(this, soul, 'LevelSelect');
    GodStep.IDownUp.call(this, soul.W, soul.H);
    this.addChild(this.back = new PR.Background(this, 'back_levels'));

    this.addChild(this.maska = new PIXI.Graphics());
    this.addChild(this.container = new GodStep.Frame('Container', soul.W, soul.H));
    this.addChild(this.top = new GodStep.Frame('top', soul.W, soul.H *.2));


    // this.top.interactive = true;
   // this.top.hitArea = new PIXI.Rectangle(0, 0, this.W, this.H *.2);


    this.top.addChild(this.label = new PR.Text(PR.S('levels'), 170 * this.s, this.W *.3, this.H *.01, 'center', 0xffffff));

    GodStep.IDownUp.call(this.container, this.soul.W, this.soul.H);
    this.top.addChild(this.b_back = new Games.ImgButton('b_back', this, this.W *.15, this.H *.1));
    this.top.addChild(this.pers = new GodStep.MovieClip(['pers_l', 'pers_l1', 'pers_l'], this.s, this.W *.85, this.H *.15,.5));
    this.pers.animTime = 110;
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);

    this.visible = false;

    this.levels = [];
    this.container.MY = this.container.y = soul.H * .25;

    this.maska.beginFill(0,.1);
    this.maska.drawRect(0, this.container.y, this.W, this.H);
    this.container.mask = this.maska;

    addEvent(this.container, GodStep.FRAME_MOVE, this.h_container);
    addEvent(this.container, GodStep.FRAME_DOWN, this.h_container);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PR.LevelSelect, GodStep.LFrame);

pro.h_m = function(e) {
   trace(e);
};
pro.init = function(data) {
    this.visible = true;
    GodStep.volumeSound('theme',  0);

    var settings = PR.PetResque.instance.SETTINGS;

    while(this.levels.length) {
        this.container.removeChild(this.levels[0].destroy());
        this.levels.splice(0, 1);
    }

    PR.LEVELS = this.levels = [];
    var S = this.startS;
    var w = this.W/4.6;
    var x, y;
    var maxY =0;
    var levels = settings.levels;
    var plevels = PR.PetResque.instance.PLAYER.levels;
    var isActivate = false;
    var lastCompleted;
    for(var i = 0; i<levels.length; i++) {
        y = parseInt(i/4);
        x = i - y * 4;
        var level = new PR.LevButton('lock', S, x * w + w *.82, y * w *.95 + w/2, '' + (i + 1), 160 * S, this.W *.002, this.H *.058, 0xff3b45);
        maxY = Math.max(maxY, level.y + level.H/2);
        this.container.addChild(level);
        level.ID = i;

        level.isDisabled = true;
        if(plevels.length) {
            if(plevels[i][0] == 1) {
                level.isDisabled = false;
                level.setAsComplete();
                lastCompleted = level;
            } else {
                if(!isActivate) {
                    isActivate = true;
                    level.isDisabled = false;
                    level.setAsActive();
                }
            }
        }

        this.levels.push(level);

        level.levelData = levels[i];
        addEvent(level, Games.ImgButton.CLICK, this.h_levels);
    }
    if(lastCompleted == null) {
        this.levels[0].isDisabled = false;
        this.levels[0].setAsActive();
    } else {
     //   lastCompleted.setAsActive();
    }


    if(this.newLevel) {
        this.container.addChild(this.newLevel.destroy());
        this.newLevel = null;
    }

    if(PR.DEVMODE) {
        if(!this.b_loadDef) {
            this.top.addChild(this.b_loadDef = new Games.TextButton('Load Default', 35 * S, 0x562466, this.soul.W *.5, this.soul.H *.05));
            addEvent(this.b_loadDef, Games.ImgButton.CLICK, this.h_buttons);
        }
        this.b_loadDef.visible = true;
        this.b_loadDef.y = (-this.soul.DOH/2 + this.soul.H*.07)/this.scale.x;
        y = parseInt(this.levels.length/4);
        x = this.levels.length - y * 4;
        var newLevel = this.newLevel =  new Games.TextButton('add', 60 * S, 0x555555, x * w + w/2, y * w );
        newLevel.ID = this.levels.length;
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
pro.update = function() {
    this.pers.animate();
};
pro.h_levels = function(e) {
    var t = e.target;
    var p = t.parent.parent;

   var point = t.y + t.parent.y + p.soul.DOH/2;
    if(point < p.H *.25) return;

    var s = p.soul;
    switch (e.type) {
       case Games.ImgButton.CLICK:
           GodStep.playSound('button', 0, PR.SOUND);

           PR.LAST_LEVEL_SELECTED = t.ID;
           PR.LAST_LEVEL_DATA = t.levelData;
           if(PR.DEVMODE) {
               s.screenTo([s.dev], p);
           } else {
             // if(!t.isDisabled) {
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
            PR.LAST_LEVEL_SELECTED = t.ID;
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
                    t.y = Math.min(t.MY - hy / parent.scale.x, Math.max(t.y, (s.OH - hy) / parent.scale.x - t.MH));
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
pro.h_buttons = function(e) {
    GodStep.playSound('button', 0, PR.SOUND);

    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    switch (t) {
        case p.b_loadDef:
            p.init(GodStep.LoadText(PR.DEFAULT_SETTINGS));
            PR.PetResque.instance.saveSettings();
            break;
        case p.b_back:
            GodStep.playSound('button', 0, PR.SOUND);

            s.screenTo([s.startmenu], p);
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
        this.maska.y = this.container.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .2 / value;
        this.container.y -= -this.container.MY + this.soul.H * .2 / value;
        this.maska.y += this.soul.H * .07 / value;
        if(this.b_loadDef) {
            this.b_loadDef.y = (-this.soul.DOH/2 + this.soul.H*.07)/this.scale.x;
        }

        this.maska.clear();
        this.maska.beginFill(0,.1);
        this.maska.drawRect(0, 0, this.W, this.soul.OH* 1.1/value -  this.container.y);

        var dy = this.soul.OH - this.soul.H;
        this.top.y = -s.DOH/2/value;

    }
});
include('lq/editor/Slider');


SS.Dev = function(soul) {
    GodStep.LFrame.call(this, soul, 'Dev');
    GodStep.IDownUp.call(this, soul.W, soul.H);

    this.rect(this.W, this.H, 0,.3);
    this.addFrame(this.b_back = new Games.TextButton('back', 27 * this.s, 0x562466, soul.W *.67, soul.H *.95));
    this.addFrame(this.b_test = new Games.TextButton('[test]', 27 * this.s, 0x563366, soul.W *.80, soul.H *.95));
    this.addFrame(this.b_save = new Games.TextButton('save', 27 * this.s, 0x882466, soul.W *.93, soul.H *.95));


    this.addFrame(this.b_addE = new Games.TextButton('+E', 25 * this.s, 0x562488, soul.W *.05, soul.H *.05));  this.b_addE.sy = .05;
    this.addFrame(this.b_addA = new Games.TextButton('+A', 25 * this.s, 0x336611, soul.W *.05, soul.H *.25));  this.b_addA.sy = .25;
    this.addFrame(this.b_addH = new Games.TextButton('+H', 25 * this.s, 0x772466, soul.W *.05, soul.H *.45));  this.b_addH.sy = .45;

    this.addFrame(this.b_instrument_coin = new Games.ImgButton('coin', this, this.W *.77, this.H *.045));
    this.addFrame(this.b_instrument_crest = new Games.ImgButton('crest', this, this.W *.9, this.H *.04));

    this.b_instrument_coin.alpha = this.b_instrument_crest.alpha = .3;

    this.average = [];
    this.hard = [];
    this.easy = [];

    this.addFrame(this.pattern = new SS.PatternView(soul, this.W *.72, this.H *.1));

    addEvent(this, GodStep.FRAME_UP, this.h_mouse_up);
    addEvent(this.b_instrument_coin, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_instrument_crest, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_addE, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_addH, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_addA, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_test, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_save, Games.ImgButton.CLICK, this.h_buttons);

    var sliderW = soul.W * .6;
    var sliderH = 90 * this.s;
    this.addFrame(this.s_patternSpeed = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 100, 1, 'рост сложности паттернов'));
    this.addFrame(this.s_enemyPeriod = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 100, 1, 'период между появлениями врага'));
    this.addFrame(this.s_enemyTime = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 100, 1, 'время преследования врага'));
    this.addFrame(this.s_enemySpeed = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 100, 1, 'скорость движения врага'));
    this.addFrame(this.s_enemyGrowSpeed = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 100, 1, 'рост скорости врага со временем'));
    this.addFrame(this.s_multCoinStart = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 200, 1, 'количество монет для множителя'));
    this.addFrame(this.s_multPointsStart = new GodStep.Slider(sliderW, sliderH, this.s, 'int', 1, 500, 1, 'количество очков для множителя'));

    this.isFirstRun = true;
    var dy = this.H * .05;
    this.s_patternSpeed.y = this.H * .6;
    this.s_enemyGrowSpeed.y =  this.s_patternSpeed.y + dy * 4;
    this.s_enemyPeriod.y =  this.s_patternSpeed.y + dy;
    this.s_enemyTime.y =  this.s_patternSpeed.y + dy * 2;
    this.s_enemySpeed.y =  this.s_patternSpeed.y + dy * 3;
    this.s_multCoinStart.y =  this.s_patternSpeed.y + dy * 5;
    this.s_multPointsStart.y =  this.s_patternSpeed.y + dy * 6;
    this.s_multPointsStart.x = this.s_multCoinStart.x = this.s_enemyGrowSpeed.x = this.s_enemyTime.x = this.s_enemySpeed.x = this.s_enemyPeriod.x = this.s_patternSpeed.x = this.W * .03;
};
extend(SS.Dev, GodStep.LFrame);

pro.update = function() {
    if(this.visible) {

    }
};
pro.init = function() {
    this.visible = true;
    var data = GodStep.LoadLocal(SS.ChinUpShinUp.instance.SETTINGS_SLOT);
    if(data && this.isFirstRun) {
        this.isFirstRun = false;
        var i;
        for(i =0; i<data.easy.length; i++) {
            this.addPattern('E', data.easy[i]);
        }
        for(i =0; i<data.average.length; i++) {
            this.addPattern('A', data.average[i]);
        }
        for(i =0; i<data.hard.length; i++) {
            this.addPattern('H', data.hard[i]);
        }
        this.s_enemyPeriod.Value = data.s_enemyPeriod || 1;
        this.s_enemyGrowSpeed.Value = data.s_enemyGrowSpeed || 1;
        this.s_enemyTime.Value = data.s_enemyTime || 1;
        this.s_patternSpeed.Value = data.s_patternSpeed || 1;
        this.s_enemySpeed.Value = data.s_enemySpeed || 1;
        this.s_multCoinStart.Value = data.s_multCoinStart || 1;
        this.s_multPointsStart.Value = data.s_multPointsStart || 1;
    }
};

pro.addPattern = function(pt, cells) {
    var p = this;
    var s = this.soul;
    var array, but;
    switch (pt) {
        case 'A':
            array = p.average;
            but = p.b_addA;
            break;
        case 'H':
            array = p.hard;
            but = p.b_addH;
            break;
        case 'E':
            but = p.b_addE;
            array = p.easy;
            break;
    }

    var pat, w = p.W * .063, sx = p.W * .025, sy, h = .08;
    p.addChild(pat = new Games.TextButton(array.length + 1 + '', 25 * p.s, but.color, 0, 0));
    array.push(pat);
    sy = parseInt(array.length/10);
    pat.x = sx + (array.length - sy * 10) * w;
    but.y = pat.y = p.H * but.sy + sy * p.W * h;
    but.x = array[array.length - 1].x + w;

    pat.pattern = new SS.Pattern(cells);
    pat.array = array;

    p.selectPattern(pat);
    addEvent(pat, GodStep.FRAME_DOWN, this.h_patterns);

};
pro.save = function() {
    var data = {easy:[], average:[], hard:[], s_multPointsStart:this.s_multPointsStart.Value, s_multCoinStart:this.s_multCoinStart.Value, s_patternSpeed:this.s_patternSpeed.Value, s_enemyGrowSpeed:this.s_enemyGrowSpeed.Value, s_enemyTime:this.s_enemyTime.Value, s_enemySpeed:this.s_enemySpeed.Value, s_enemyPeriod:this.s_enemyPeriod.Value};
    var i;
    for(i =0; i<this.easy.length; i++) {
        data.easy.push(this.easy[i].pattern.cells);
    }
    for(i =0; i<this.average.length; i++) {
        data.average.push(this.average[i].pattern.cells);
    }
    for(i =0; i<this.hard.length; i++) {
        data.hard.push(this.hard[i].pattern.cells);
    }
    GodStep.SaveLocal(data, SS.ChinUpShinUp.instance.SETTINGS_SLOT);
};
pro.selectPattern = function(p) {
    var pat;
    for(var i = 0; i<p.array.length; i++) {
        pat = p.array[i];
        pat.Selected = false;
        pat.Scale = 1;
        pat.isDown = false;
    }
    if(this.lastSelected) {
        this.lastSelected.Selected = false;
    }
    this.lastSelected = p;
    p.Selected = true;
    this.pattern.setData(p.pattern);
    this.pattern.currentPattern = p.pattern;

};
pro.h_patterns = function(e)  {
    var t = e.content.t;
    var p = t.parent;

    switch (e.type) {
        case GodStep.FRAME_DOWN:
            p.selectPattern(t);
            break;
    }
};

pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_instrument_crest:
            p.b_instrument_coin.alpha = .3;
            if(p.b_instrument_crest.alpha == 1) {
                p.b_instrument_crest.alpha = .3;
                p.instrument = '';
            } else {
                p.b_instrument_crest.alpha = 1;
                p.instrument = 'crest';
            }
            break;
        case p.b_instrument_coin:
            p.b_instrument_crest.alpha = .3;

            if(p.b_instrument_coin.alpha == 1) {
                p.b_instrument_coin.alpha = .3;
                p.instrument = '';
            } else {
                p.b_instrument_coin.alpha = 1;
                p.instrument = 'coin';
            }
            break;
        case p.b_addE:
            p.addPattern('E');
            break;
        case p.b_addA:
            p.addPattern('A');
            break;
        case p.b_addH:
            p.addPattern('H');
            break;

        case p.b_test:
            GodStep.DEVMODE = true;
            s.screenTo([s.gameplay], p);
            break;
        case p.b_save:
            p.save();
           break;
       case p.b_back:
           GodStep.DEVMODE = false;
           s.screenTo([s.startmenu], p);
           break;
   }
};
pro.h_mouse_up = function(e) {
    var t = e.content.target;
    if(t.s_patternSpeed) {
        t.s_patternSpeed.IsDown = false;
        t.s_enemyTime.IsDown = false;
        t.s_enemySpeed.IsDown = false;
        t.s_multCoinStart.IsDown = false;
        t.s_multPointsStart.IsDown = false;
        t.s_enemyPeriod.IsDown = false;
        t.s_enemyGrowSpeed.IsDown = false;
        t.b_instrument_coin.isDown = t.b_instrument_crest.isDown = t.b_addA.isDown = t.b_addH.isDown = t.b_addE.isDown =
            t.b_test.isDown = t.b_back.isDown = t.b_save.isDown = false;
        t.b_instrument_coin.Scale = t.b_instrument_crest.Scale = t.b_addA.Scale = t.b_addH.Scale = t.b_addE.Scale =
            t.b_test.Scale = t.b_back.Scale = t.b_save.Scale = 1;
    }
};

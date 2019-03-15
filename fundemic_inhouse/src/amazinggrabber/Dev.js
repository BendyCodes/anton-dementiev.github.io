include('lq/editor/Slider');

AG.Dev = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Dev', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = soul.startS * .7;
    this.addFrame(this.b_back = new AG.TextButton('back', 35, 0x562466, this, S, soul.W *.1, soul.H *.05));
    this.addFrame(this.b_default = new AG.TextButton('load build', 35, 0x562466, this, S, soul.W *.5, soul.H *.05));
    this.addFrame(this.b_million = new AG.TextButton('millionier!', 35, 0x562466, this, S, soul.W *.85, soul.H *.05));
    addEvent(this.b_back, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_default, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_million, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    this.visible = false;

    var sliderW = soul.W * .8;
    var sliderH = 50;
    this.addFrame(this.s_handSpeed = new GodStep.Slider(sliderW, sliderH, S, 'int', 50, 600, 100, 'hand speed forward'));
    this.addFrame(this.s_handSpeedBack = new GodStep.Slider(sliderW, sliderH, S, 'int', 50, 500, 100, 'hand speed back'));
    this.addFrame(this.s_handWait = new GodStep.Slider(sliderW, sliderH, S,.1, 0.1, 1, .3, 'hand wait'));
    this.addFrame(this.s_speedGrow = new GodStep.Slider(sliderW, sliderH, S, .1, .1, 10, 3, 'prize speed grow'));
    this.addFrame(this.s_spawnTimeMin = new GodStep.Slider(sliderW/2, sliderH, S, .1, .5, 25,.1, 'spawn time min'));
    this.addFrame(this.s_spawnTimeMax = new GodStep.Slider(sliderW/2, sliderH, S, .1, .5, 25,1, 'spawn time max'));


    this.addFrame(this.s_hitCountSafe = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 10, 2, 'safe hit count'));
    this.addFrame(this.s_spawnSafeTimeMin = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 30, 2, 'safe spawn time min'));
    this.addFrame(this.s_spawnSafeTimeMax = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 50, 10, 'safe spawn time max'));
    this.addFrame(this.s_spawnSafeLife = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 200, 10, 'safe life'));
    this.addFrame(this.s_spawnXTimeMin = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 30, 2, 'X spawn time min'));
    this.addFrame(this.s_spawnXTimeMax = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 50, 10, 'X spawn time max'));
    this.addFrame(this.s_speedMultiplier = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 300, 100, 'cristal & multiplier speed'));
    this.addFrame(this.s_cristalGravity = new GodStep.Slider(sliderW, sliderH, S, 'int', 1, 300, 100, 'cristal & multiplier gravity'));
    this.addFrame(this.s_spawnTimeIncreaseMax = new GodStep.Slider(sliderW/2, sliderH, S, 'int',1,200,2, 'spawn grow max'));
    this.addFrame(this.s_spawnTimeIncreaseMin = new GodStep.Slider(sliderW/2, sliderH, S, 'int',1,200,2, 'spawn grow min'));
    this.addFrame(this.s_prize1Chance = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 100, 50, 'chance worm'));
    this.addFrame(this.s_prize2Chance = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 100, 50, 'chance fish'));
    this.addFrame(this.s_prize3Chance = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 100, 50, 'chance bear'));
    this.addFrame(this.s_prize4Chance = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 100, 50, 'chance candy'));


    var sd = 25 * S;
    this.s_prize4Chance.x = this.s_prize1Chance.x = this.s_prize2Chance.x = this.s_prize3Chance.x = this.s_handSpeedBack.x = this.s_speedMultiplier.x = this.s_handWait.x = this.s_hitCountSafe.x = this.s_speedGrow.x =
    this.s_cristalGravity.x = this.s_spawnXTimeMax.x = this.s_spawnXTimeMin.x = this.s_spawnSafeLife.x = this.s_spawnSafeTimeMin.x = this.s_spawnSafeTimeMax.x = this.s_handSpeed.x = soul.W * .1;
    this.s_handSpeed.y = this.b_back.y + this.b_back.H + sd;
    this.s_handSpeedBack.y = this.s_handSpeed.y + this.s_handSpeed.H  * 2 + sd;
    this.s_handWait.y = this.s_handSpeedBack.y + this.s_handSpeedBack.H * 2 + sd;
    this.s_speedGrow.y = this.s_handWait.y + this.s_handWait.H * 2 + sd;
    this.s_hitCountSafe.y = this.s_speedGrow.y + this.s_speedGrow.H * 2 + sd;
    this.s_spawnSafeTimeMin.y = this.s_hitCountSafe.y + this.s_hitCountSafe.H * 2 + sd;
    this.s_spawnSafeTimeMax.y = this.s_spawnSafeTimeMin.y + this.s_spawnSafeTimeMin.H * 2 + sd;
    this.s_spawnSafeLife.y = this.s_spawnSafeTimeMax.y + this.s_spawnSafeTimeMax.H * 2 + sd;
    this.s_spawnXTimeMin.y = this.s_spawnSafeLife.y + this.s_spawnSafeLife.H * 2 + sd;
    this.s_spawnXTimeMax.y = this.s_spawnXTimeMin.y + this.s_spawnXTimeMin.H * 2 + sd;
    this.s_speedMultiplier.y = this.s_spawnXTimeMax.y + this.s_spawnXTimeMax.H * 2 + sd;
    this.s_cristalGravity.y = this.s_speedMultiplier.y + this.s_speedMultiplier.H * 2 + sd;


    this.s_spawnTimeIncreaseMin.y = this.s_spawnTimeIncreaseMax.y = this.s_cristalGravity.y + this.s_cristalGravity.H * 2 + sd;

    this.s_spawnTimeMin.y = this.s_spawnTimeMax.y = this.s_spawnTimeIncreaseMin.y + this.s_spawnTimeIncreaseMin.H * 2 + sd;
    this.s_prize1Chance.y = this.s_spawnTimeMin.y + this.s_spawnTimeMin.H * 2 + sd;
    this.s_prize2Chance.y = this.s_prize1Chance.y + this.s_prize1Chance.H * 2 + sd;
    this.s_prize3Chance.y = this.s_prize2Chance.y + this.s_prize2Chance.H * 2 + sd;
    this.s_prize4Chance.y = this.s_prize3Chance.y + this.s_prize3Chance.H * 2 + sd;


    this.s_spawnTimeMin.x = this.s_spawnTimeIncreaseMin.x = soul.W * .075;
    this.s_spawnTimeMax.x = this.s_spawnTimeIncreaseMax.x = this.s_spawnTimeIncreaseMin.x + this.s_spawnTimeIncreaseMin.width + soul.W * .05;

};
extend(AG.Dev, GodStep.Frame);

pro.update = function() {

};
pro.init = function() {
    this.visible = true;
    var data = GodStep.LoadLocal(this.soul.SETTINGS_SLOT);
    // var data = GodStep.LoadText('{"s_handSpeed":183,"s_speedGrow":4.38,"s_handWait":1,"s_speedBase":35,"s_spawnTimeMin":0.9,"s_spawnTimeMax":1,"s_hitCountSafe":2,"s_spawnSafeTimeMin":2,"s_spawnSafeTimeMax":10,"s_spawnSafeLife":10,"s_xChance":10}');

    if(data != null) {
        this.s_handSpeed.Value = data.s_handSpeed;
        this.s_handWait.Value = data.s_handWait;
        this.s_speedGrow.Value = data.s_speedGrow;
        this.s_spawnTimeMin.Value = data.s_spawnTimeMin;
        this.s_spawnTimeMax.Value = data.s_spawnTimeMax;
        this.s_hitCountSafe.Value = data.s_hitCountSafe;
        this.s_spawnSafeTimeMin.Value = data.s_spawnSafeTimeMin;
        this.s_spawnSafeTimeMax.Value = data.s_spawnSafeTimeMax;
        this.s_spawnSafeLife.Value = data.s_spawnSafeLife;
        this.s_spawnXTimeMin.Value = data.s_spawnXTimeMin || 30;
        this.s_spawnXTimeMax.Value = data.s_spawnXTimeMax || 50;
        this.s_handSpeedBack.Value = data.s_handSpeedBack || 100;
        this.s_cristalGravity.Value = data.s_cristalGravity || 100;
        this.s_speedMultiplier.Value = data.s_speedMultiplier;
        this.s_spawnTimeIncreaseMin.Value = data.s_spawnTimeIncreaseMin || 2;
        this.s_spawnTimeIncreaseMax.Value = data.s_spawnTimeIncreaseMax || 2;
        this.s_prize1Chance.Value = data.s_prize1Chance || 50;
        this.s_prize2Chance.Value = data.s_prize2Chance || 50;
        this.s_prize3Chance.Value = data.s_prize3Chance || 50;
        this.s_prize4Chance.Value = data.s_prize4Chance || 50;



    }
};


pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
       case p.b_default:
           GodStep.SaveLocal(GodStep.LoadText(s.defaultSettings), s.SETTINGS_SLOT);
           p.init();
            break;
       case p.b_million:
           GodStep.SaveLocal({totalMoney:1000000, totalScore:1000000, bestScore:1000000}, s.PLAYER_SLOT);
           break;
       case p.b_back:
           var data = {
               s_handSpeed: p.s_handSpeed.value,
               s_speedGrow: p.s_speedGrow.value,
               s_handWait: p.s_handWait.value,
               s_spawnTimeMin: p.s_spawnTimeMin.value,
               s_spawnTimeMax: p.s_spawnTimeMax.value,
               s_hitCountSafe: p.s_hitCountSafe.value,
               s_spawnSafeTimeMin: p.s_spawnSafeTimeMin.value,
               s_spawnSafeTimeMax: p.s_spawnSafeTimeMax.value,
               s_spawnSafeLife: p.s_spawnSafeLife.value,
               s_spawnXTimeMin: p.s_spawnXTimeMin.value,
               s_spawnXTimeMax: p.s_spawnXTimeMax.value,
               s_handSpeedBack: p.s_handSpeedBack.value,
               s_cristalGravity: p.s_cristalGravity.value,
               s_speedMultiplier: p.s_speedMultiplier.value,
               s_spawnTimeIncreaseMax: p.s_spawnTimeIncreaseMax.value,
               s_spawnTimeIncreaseMin: p.s_spawnTimeIncreaseMin.value,
               s_prize1Chance: p.s_prize1Chance.value,
               s_prize2Chance: p.s_prize2Chance.value,
               s_prize3Chance: p.s_prize3Chance.value,
               s_prize4Chance: p.s_prize4Chance.value

           };
           GodStep.SaveLocal(data, s.SETTINGS_SLOT);
           s.screenTo([s.startmenu], p);
           break;
   }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            if(e.content.target.soul) {
                t.b_default.isDown = t.b_back.isDown = false;
                t.b_default.Scale = t.b_back.Scale = 1;
               t.s_handSpeed.IsDown =
               t.s_spawnTimeMax.IsDown =
               t.s_spawnTimeMin.IsDown =

               t.s_speedGrow.IsDown =
               t.s_hitCountSafe.IsDown =
               t.s_spawnSafeLife.IsDown =
               t.s_spawnXTimeMax.IsDown =
               t.s_spawnXTimeMin.IsDown =
               t.s_handSpeedBack.IsDown =
               t.s_spawnSafeTimeMin.IsDown =
               t.s_speedMultiplier.IsDown =
               t.s_cristalGravity.IsDown =
               t.s_spawnTimeIncreaseMax.IsDown =
               t.s_spawnTimeIncreaseMin.IsDown =
               t.s_prize1Chance.IsDown =
               t.s_prize2Chance.IsDown =
               t.s_prize3Chance.IsDown =
               t.s_prize4Chance.IsDown =

               t.s_spawnSafeTimeMax.IsDown = false;
            }
            break;
    }
};

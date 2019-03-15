include('lq/editor/Slider');

M3.Dev = function(soul) {
    this.soul = soul;

    GodStep.LFrame.call(this, soul, 'Dev');
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addFrame(this.b_back = new Games.TextButton('back', 30 * S, 0x562466, soul.W *.1, soul.H *.05));
    this.addFrame(this.b_test = new Games.TextButton('[test]', 30* S, 0x562466, soul.W *.9, soul.H *.125));
    this.addFrame(this.b_save = new Games.TextButton('save', 30 * S, 0x562466, soul.W *.9, soul.H *.05));
    this.addChild(this.text = new GodStep.Text('Level ID: ', 30 * S, 'Arial', 'left', 0xffffff));

    this.standart = [];
    for(var i = 0; i<M3.Cell.STANDART.length; i++) {
        var cell = new Games.ImgButton(M3.Cell.STANDART[i], this, this.W *.06, this.H *.07 * i + this.H *.3);
        this.addChild(cell);
        this.standart.push(cell);
        addEvent(cell, Games.ImgButton.CLICK, this.h_colors);
    }

    this.addChild(this.buttonBlock =  new Games.ImgButton('block', this, this.W *.94, this.H *.07 + this.H *.3));
    this.addChild(this.buttonDelete =  new Games.ImgButton('delete', this, this.W *.94, this.H *.07 * 2 + this.H *.3));
    this.addChild(this.buttonDirt =  new Games.ImgButton('dirt', this, this.W *.94, this.H *.07 * 3 + this.H *.3));
    this.addChild(this.buttonBonus =  new Games.ImgButton('bonusGor', this, this.W *.94, this.H *.07 * 4 + this.H *.3));

    addEvent(this.buttonBlock, Games.ImgButton.CLICK, this.h_instrument);
    addEvent(this.buttonDelete, Games.ImgButton.CLICK, this.h_instrument);
    addEvent(this.buttonDirt, Games.ImgButton.CLICK, this.h_instrument);
    addEvent(this.buttonBonus, Games.ImgButton.CLICK, this.h_instrument);
    this.clearSelectionInstruments();

    var sliderW = soul.W * .6;
    var sliderH = 35;
    this.addFrame(this.s_pointsLimit = new GodStep.Slider(sliderW, sliderH, S, 500, 0, 100000, 0, 'score target'));
    this.addFrame(this.s_itemsLimit = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 30, 0, 'items target'));
    this.addFrame(this.s_stepLimit = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 200, 0, 'steps target'));
    this.addFrame(this.s_bonusCount = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 10, 0, 'bonus count'));
    this.s_bonusCount.x = this.s_stepLimit.x = this.s_itemsLimit.x = this.s_pointsLimit.x = (this.W - sliderW)*.5;
    this.s_pointsLimit.y = (this.H *.05);
    this.s_itemsLimit.y = this.s_pointsLimit.y + this.s_pointsLimit.H * 2;
    this.s_stepLimit.y = this.s_itemsLimit.y + this.s_itemsLimit.H * 2;
    this.s_bonusCount.y = this.s_stepLimit.y + this.s_stepLimit.H * 2;
    this.text.y = this.H * .015;
    this.addFrame(this.field = new M3.Field(soul, 7, 9));
    this.field.x = (this.W - this.field.W * M3.CELLW_SCALE) * .5;
    this.field.y = this.H - this.field.x - this.field.H + this.H * .075;
    addEvent(this.b_save, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_test, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    this.visible = false;
  //  addEvent(this.field, GodStep.FRAME_DOWN, this.h_cells);
    addEvent(this.field, Games.CELL_DOWN, this.h_cells);



};
extend(M3.Dev, GodStep.Frame);

pro.update = function() {

};
pro.init = function() {
    this.clearSelectionInstruments();
    M3.SKIN = 1;
    this.visible = true;
    var data = GodStep.LoadLocal(this.soul.SETTINGS_SLOT);

    this.text.setText('Level ' + M3.LAST_LEVEL_SELECTED);

    this.text.updateText();
    this.text.x = (this.W *.2);
    var level = data.levels[M3.LAST_LEVEL_SELECTED-1] || [];
    this.field.setData(level);
    this.field.reskin(M3.SKIN);


    if(level.length >= 1) {
        var params = level[level.length - 1];

        this.s_pointsLimit.Value = params.points;
        this.s_itemsLimit.Value = params.items;
        this.s_stepLimit.Value = params.steps || 0;
        this.s_bonusCount.Value = params.bonuses || 0;
        this.buttonBonus.alpha = (params.isBonus) ? 1 : 0.2;

        for(var st = 0; st<this.standart.length; st++) {
            this.standart[st].alpha = .2;
        }
        for(var pc = 0; pc<params.colors.length; pc++) {
            this.standart[params.colors[pc]].alpha = 1;
        }
    }

};
pro.clearSelectionInstruments = function() {
    this.instrument = '';
    this.buttonBlock.alpha = this.buttonDelete.alpha = this.buttonDirt.alpha = .2;

};
pro.h_colors = function(e) {
    var t = e.target;
    t.alpha = (t.alpha == 1) ? .2 : 1;
};
pro.h_cells = function(e) {
    var t = e.target;
    var p = t.parent;
    var cell = e.content.data;
    switch (e.type) {
        case Games.CELL_DOWN:
            if(p.instrument != '') {
                p.field.addCellObject(new M3.CellObject(p.instrument, p.startS, cell));
            } else {
                cell.clear();
            }
            break;
    }
};
pro.h_instrument = function(e) {
    var t = e.target;
    var p = t.parent;
    switch (t) {
        case p.buttonBonus:
            if(p.buttonBonus.alpha == 1) {
                p.buttonBonus.alpha = .2;
            } else {
                p.buttonBonus.alpha = 1;
            }
            break;
        case p.buttonDirt:
            if(p.buttonDirt.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'dirt';
                p.buttonDirt.alpha = 1;
            }
            break;
        case p.buttonDelete:
            if(p.buttonDelete.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'delete';
                p.buttonDelete.alpha = 1;
            }
            break;
        case p.buttonBlock:
            if(p.buttonBlock.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'block';
                p.buttonBlock.alpha = 1;
            }
            break;
    }
};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_test:
        case p.b_save:
           var data = GodStep.LoadLocal(s.SETTINGS_SLOT);
           if(!data.levels) {
               data.levels = [];
           }
           var d = p.field.getData();
           M3.LAST_LEVEL_DATA = data.levels[M3.LAST_LEVEL_SELECTED - 1] = d;
           for(var i =0;i<data.levels.length; i++) {
               var lev = data.levels[i];
               var val = lev[lev.length-1];
               var colors = [];
               for(var st = 0; st<p.standart.length; st++) {
                   if(p.standart[st].alpha == 1) {
                       colors.push(st);
                   }
               }
               if(val == undefined) {
                   val = {};
               }
               if(val.id) {
                   if(M3.LAST_LEVEL_SELECTED == i + 1) {
                       data.levels[i][lev.length-1] = {points:p.s_pointsLimit.value, items:p.s_itemsLimit.value, colors:colors, steps: p.s_stepLimit.value, bonuses: p.s_bonusCount.value, isBonus: p.buttonBonus.alpha == 1, id:i + 1};
                   }
               } else {
                   data.levels[i][lev.length] = {points:p.s_pointsLimit.value, items:p.s_itemsLimit.value, colors:colors, steps: p.s_stepLimit.value, bonuses: p.s_bonusCount.value, isBonus: p.buttonBonus.alpha == 1, id:i + 1};
               }
           }
           GodStep.SaveLocal(data, s.SETTINGS_SLOT);
            if(t == p.b_test) {
                s.screenTo([s.gameplay], p);
            }
           break;
       case p.b_back:
           s.screenTo([s.levelselect], p);
           break;
   }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    if(e.content.target) {

        switch (e.type) {
            case GodStep.FRAME_UP:
                if (e.content.target.soul) {
                    for(var i = 0; i< t.standart.length; i++) {
                        t.standart[i].Scale = 1;
                        t.standart[i].isDown = false;
                    }
                    t.s_stepLimit.IsDown =
                    t.s_itemsLimit.IsDown =
                    t.s_bonusCount.IsDown =
                    t.s_pointsLimit.IsDown = false;
                    t.b_test.isDown = t.b_back.isDown = t.b_save.isDown = false;
                    t.b_test.Scale = t.b_back.Scale = t.b_save.Scale = 1;
                }
                break;
        }
    }
};

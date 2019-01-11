include('lq/editor/Slider');

PR.Dev = function(soul) {
    GodStep.LFrame.call(this, soul, 'Dev');
    GodStep.IDownUp.call(this, soul.W, soul.H);

    this.addFrame(this.back = new PR.Background(this));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());

    this.addChild(this.fieldContainer = new PIXI.DisplayObjectContainer());
    this.fieldContainer.addChild(this.field = new PR.Field(soul, 9 ,9, .85));

    this.container.addChild(this.b_back = new Games.TextButton('back', 30 * this.s, 0x562466, soul.W *.1, soul.H *.05));
    this.container.addChild(this.b_test = new Games.TextButton('[test]', 30 * this.s, 0x567766, soul.W *.1, soul.H *.05));
    this.container.addChild(this.b_save = new Games.TextButton('save', 30 * this.s, 0x882466, soul.W *.1, soul.H *.05));
    this.container.addChild(this.b_add = new Games.TextButton('add row', 30 * this.s, 0x889966, soul.W *.1, soul.H *.05));
    this.container.addChild(this.b_del = new Games.TextButton('del row', 30 * this.s, 0x889966, soul.W *.1, soul.H *.05));


    addEvent(this, GodStep.FRAME_UP, this.h_mouse_up);
    addEvent(this.b_back, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_test, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_save, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_add, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_del, Games.ImgButton.CLICK, this.h_buttons);

    this.container.addChild(this.rowsText = new PR.Text('', 150 * this.s, this.W *.5, -this.H *.025, 'left', 0xffffff));


    var S = this.s;
    this.standart = [];
    var cell;
    this.s *= .6;
    var dy = .072;
    for(var i = 0; i<PR.Cell.STANDART.length; i++) {
        cell = new Games.ImgButton(PR.Cell.STANDART[i], this,  this.W *.88, this.H *dy * i + this.H *.15);
        this.container.addChild(cell);
        this.standart.push(cell);
        addEvent(cell, Games.ImgButton.CLICK, this.h_colors);

        this.container.addChild(this['s_' + i] =  new Games.ImgButton(PR.Cell.STANDART[i], this, this.W *.1 + i *.1 * this.W, this.H *.95));
        this.container.addChild(this['b_' + i] =  new Games.ImgButton(PR.Cell.STANDART[i], this, this.W *.96, this.H *dy * i + this.H *.15));
        addEvent(this['b_' + i], Games.ImgButton.CLICK, this.h_buttons);
        addEvent(this['s_' + i], Games.ImgButton.CLICK, this.h_selectors);
        this['b_' + i].alpha = .2;
        this['s_' + i].alpha = .2;
    }

    this.container.addChild(this.b_block =  new Games.ImgButton('block', this,  this.W *.91, this.H *dy * 5 + this.H *.15));
    this.container.addChild(this.b_delete =  new Games.ImgButton('delete', this, this.W *.91, this.H *dy * 6 + this.H *.15));
    this.container.addChild(this.b_setka =  new Games.ImgButton('dirt', this, this.W *.91, this.H *dy * 7 + this.H *.15));
    this.container.addChild(this.b_bonus =  new Games.ImgButton('s_bonus', this, this.W *.91, this.H *dy * 8 + this.H *.15));
    this.container.addChild(this.b_bomb =  new Games.ImgButton('bomb', this, this.W *.91, this.H *dy * 9 + this.H *.15));
    this.container.addChild(this.b_hero =  new Games.ImgButton('hero', this, this.W *.91, this.H *dy * 10 + this.H *.15));
    this.container.addChild(this.b_hero2 =  new Games.ImgButton('hero2', this, this.W *.91, this.H *dy * 11 + this.H *.15));
    this['s_' + 0].alpha = 1;
    var sliderW = soul.W * .6;
    var sliderH = 35;
    this.container.addChild(this.s_stepLimit = new GodStep.Slider(sliderW, sliderH, S, 'int', 0, 150, 0, 'steps target'));
    this.s_stepLimit.y = this.H *.82;
    this.s_stepLimit.x = this.W * .04;
    this.selector = 0;

    this.container.addChild(this.b_bonus_disable =  new Games.ImgButton('s_bonus', this, this.W *.2, this.H* .88 ));
    this.container.addChild(this.b_bomb_disable =  new Games.ImgButton('bomb', this, this.W *.3, this.H * .88));


    this.s = S;
    addEvent(this.b_bonus_disable, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_bomb_disable, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_setka, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_delete, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_block, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_bonus, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_bomb, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_hero, Games.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_hero2, Games.ImgButton.CLICK, this.h_buttons);

    addEvent(this.field, Games.CELL_DOWN, this.h_cells);
    addEvent(this.field, GodStep.FRAME_DOWN, this.h_field);
    addEvent(this.field, GodStep.FRAME_MOVE, this.h_field);
    addEvent(this.field, GodStep.FRAME_UP, this.h_field);

    this.addChild(this.maska = new PIXI.Graphics());
    this.addChild(this.top = new PIXI.Graphics());

    var fw = this.field.W * PR.CELLW_SCALE * this.field.scale.x;
    var fd = -this.W * .005;
    this.maska.beginFill(0, 1);
    this.maska.drawRect(fd, fd, fw-fd*2, fw-fd*2);
    this.maska.endFill();
    this.top.lineStyle(2, 0, 1);
    this.top.drawRect(fd, fd, fw-fd*2, fw-fd*2);
    this.top.endFill();

    this.field.mask = this.maska;

    this.instrument = '';

    this.colors = [0, 1, 2, 3, 4];
};
extend(PR.Dev, GodStep.Frame);

pro.update = function() {
    if(this.visible) {

    }
};
pro.init = function() {
    this.visible = true;
    this.updateRowText();
    this.clearInstruments();
    GodStep.ISEDITMODE = true;
    var level = GodStep.TEST_DATA || PR.PetResque.instance.SETTINGS.levels[PR.LAST_LEVEL_SELECTED];

    if (level) {
        this.field.setData(level);
        this.s_stepLimit.Value = level.params.steps || 0;
    }
    this.b_bonus_disable.alpha = (this.field.isBonus) ? 1 : .2;
    this.b_bomb_disable.alpha = (this.field.isBomb) ? 1 : .2;

    var i;
    for( i = 0;i<this.standart.length; i++) {
        this.standart[i].alpha = .2;
    }
    this.colors = [];
    for( i = 0;i<this.field.colors.length; i++) {
        this.standart[this.field.colors[i]].alpha = 1;
        this.colors.push(this.field.colors[i]);
    }

    GodStep.TEST_DATA = null;
};
pro.clearInstruments = function() {
    this.b_setka.alpha =
    this.b_delete.alpha =
    this.b_block.alpha =
    this.b_bonus.alpha =
    this.b_hero2.alpha =
    this.b_hero.alpha =
    this.b_bomb.alpha = .2;
    for(var i = 0; i<5; i++){
        this['b_' + i].alpha = .2;
    }
    this.instrument = '';
};
pro.updateRowText = function() {
    this.rowsText.setText('' + this.field.cellCountY);
    this.rowsText.updateText();
    this.rowsText.x = this.W * .98 - this.rowsText.width;
};
pro.h_field = function(e) {
    var t = e.target;
    var p;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            t.isFieldDown = true;
            t.down = e.content.getLocalPosition(t.parent);

            break;
        case GodStep.FRAME_UP:
            t.isFieldDown = false;

            break;
        case GodStep.FRAME_MOVE:
            if(t.isFieldDown) {
                p = e.content.getLocalPosition(t.parent.parent);
                t.parent.y = Math.min(0,  Math.max((t.SH - t.H)* t.scale.x, p.y - t.down.y));
            }
            break;
    }
};
pro.h_cells = function(e)  {
    var t = e.target;
    var p = t.parent.parent;
    var cell = e.content.data;
    trace(cell.xi + " " + cell.yi);
    switch (e.type) {
        case Games.CELL_DOWN:
            if(p.instrument != '') {
                p.field.addCellObject(new PR.CellObject(p.instrument, p.s, cell, null, null,  p.selector + 1));
            } else {
                cell.clear();
            }
            break;
    }
};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent.parent;
    var s = p.soul;
    var data;
    switch (t) {
        case p.b_bonus_disable:
        case p.b_bomb_disable:
            t.alpha = (t.alpha == 1) ? .2 : 1;
            break;
        case p.b_0:
        case p.b_1:
        case p.b_2:
        case p.b_3:
        case p.b_4:
        case p.b_bonus:
        case p.b_delete:
        case p.b_block:
        case p.b_bomb:
        case p.b_hero2:
        case p.b_hero:
        case p.b_setka:

            if(t.alpha == 1) {
                p.clearInstruments();
            } else {
                p.clearInstruments();
                p.instrument = t.imgName;
                t.alpha = 1;
            }
            p.field.isBomb = (p.b_bomb_disable.alpha == 1);
            p.field.isBonus = (p.b_bonus_disable.alpha == 1);
            break;
        case p.b_del:
            p.field.delLine();
            p.updateRowText();
            break;
        case p.b_add:
            p.field.addLine();
            p.updateRowText();
            break;
        case p.b_test:
            GodStep.DEVMODE = true;
            data = GodStep.TEST_DATA = p.field.getData();
            data.params = {colors: p.colors, steps: p.s_stepLimit.Value, isBomb: p.b_bomb_disable.alpha == 1, isBonus:p.b_bonus_disable.alpha == 1};

            s.screenTo([s.gameplay], p);
            break;
        case p.b_save:
            var settings = PR.PetResque.instance.SETTINGS;_
                PR.LAST_LEVEL_SELECTED;
            data = settings.levels[PR.LAST_LEVEL_SELECTED] = p.field.getData();
            data.params = {colors: p.colors,  steps: p.s_stepLimit.Value, isBomb: p.b_bomb_disable.alpha == 1, isBonus:p.b_bonus_disable.alpha == 1};

            p.soul.saveSettings();
           break;
       case p.b_back:
           GodStep.ISEDITMODE = false;
           GodStep.DEVMODE = false;
           s.screenTo([s.startmenu], p);
           break;
   }
};
pro.h_mouse_up = function(e) {
    var t = e.content.target;
    if(t.standart) {
        for(var i = 0; i< t.standart.length; i++) {
            t.standart[i].Scale = 1;
            t.standart[i].isDown = false;
        }
        t.s_stepLimit.IsDown = false;
        t.b_bomb.isDown = t.b_bonus.isDown = t.b_add.isDown = t.b_del.isDown = t.b_test.isDown = t.b_back.isDown = t.b_save.isDown = false;
        t.b_bomb.Scale = t.b_bonus.Scale = t.b_add.Scale = t.b_del.Scale = t.b_test.Scale = t.b_back.Scale = t.b_save.Scale = 1;
    }
};

pro.h_selectors = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    var id;
    for(var i = 0; i<5; i++) {
        if(t == p['s_' + i]) {
            id = i;
        }
        p['s_' + i].alpha = 0.2;
    }
    p.selector = id;
    t.alpha = 1;
};
pro.h_colors = function(e) {
    var t = e.target;
    t.alpha = (t.alpha == 1) ? .2 : 1;

    var p = t.parent.parent;
    p.colors = [];
    for(var i = 0; i < p.standart.length; i++) {
        if(p.standart[i].alpha == 1) {
            p.colors.push(i);
        }
    }
};
Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.back.rescale(value);
        this.b_back.x = this.W * .1;
        this.b_save.x = this.b_back.x + this.b_back.width * 1.1;
        this.b_test.x = this.b_save.x + this.b_save.width * 1.1;
        this.b_add.x = this.b_test.x + this.b_test.width * 1.4;
        this.b_del.x = this.b_add.x + this.b_add.width * 1.05;
        this.top.x = this.maska.x = this.field.x = (this.W - this.field.W * PR.CELLW_SCALE) * .5;
        this.container.y = -this.soul.DOH/2/value;
        this.top.y = this.maska.y = this.field.y = (this.soul.H *.11 - this.soul.DOH/2)/value;

    }
});
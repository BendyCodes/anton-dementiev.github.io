LQ.Editor = function(soul) {
    trace("Liquid Editor " + '0.1.0');

    this.object = null;
    GodStep.LFrame.call(this, soul, 'LEditor');
    GodStep.IDownUp.call(this, soul.OW, soul.OH);

    this.addChild(this.instruments = new PIXI.DisplayObjectContainer());
                    this.instruments.isOpened = false;
    this.addFrame(this.b_instruments = new LQ.IconButton(0, 0, 0, 0), this.instruments);
                  this.b_instruments.alpha = .25;
    this.addFrame(this.b_i_object = new LQ.IconButton(0, -250, 50, 0), this.instruments);
    this.addFrame(this.b_i_dots = new LQ.IconButton(0, -100, 100, 0), this.instruments);
    this.addFrame(this.b_i_program = new LQ.IconButton(0, -150, 150, 0), this.instruments);
    this.addFrame(this.b_i_params = new LQ.IconButton(0, -50, 250, 0), this.instruments);
    this.addFrame(this.b_i_colors = new LQ.IconButton(0, -200, 200, 0), this.instruments);

    this.addChild(this.status = new LQ.Text('', 25, 0, -2, 'left', 0xffffff));
    this.addChild(this.objectEditor = new LQ.ObjectEditor(soul));
    this.addChild(this.colorEditor = new LQ.ColorEditor(soul, this));
    this.addChild(this.paramEditor = new LQ.ParamEditor(soul, this));

    this.paramEditor.x = this.colorEditor.x = this.objectEditor.x = this.status.x = (this.b_i_object.w + 5);// * this.s + 5;
    this.paramEditor.y = this.colorEditor.y = this.objectEditor.y = this.status.y + (this.status.height + 28);



    addEvent(this.objectEditor, LQ.ITEM_SELECTED, this.h_objectEditor);
   // addEvent(this.colorEditor, LQ.ITEM_SELECTED, this.h_objectEditor);
    addEvent(this.b_instruments, GodStep.FRAME_DOWN, this.h_instruments);
    addEvent(this.b_i_object, GodStep.FRAME_DOWN, this.h_instruments);
    addEvent(this.b_i_dots, GodStep.FRAME_DOWN, this.h_instruments);
    addEvent(this.b_i_program, GodStep.FRAME_DOWN, this.h_instruments);
    addEvent(this.b_i_params, GodStep.FRAME_DOWN, this.h_instruments);
    addEvent(this.b_i_colors, GodStep.FRAME_DOWN, this.h_instruments);
};
extend(LQ.Editor, GodStep.LFrame);
LQ.COLORS = [0x054405, 0x232323, 0x555555, 0xaaaaaa, 0x00aa00, 0xffffff];

pro.init = function() {
    this.visible = true;
};
pro.clearSelection = function() {
    this.b_i_dots.Selected = false;
    this.b_i_object.Selected = false;
    this.b_i_program.Selected = false;
    this.b_i_params.Selected = false;
    this.b_i_colors.Selected = false;
    this.objectEditor.visible = false;
    this.colorEditor.visible = false;
    this.paramEditor.visible = false;
};
pro.h_instruments = function(e) {
    var c = e.content;
    var t = c.target;
    var p = t.parent.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            switch (t) {
                case p.b_i_params:
                    p.clearSelection();
                    p.paramEditor.init(p.object);
                    p.b_i_params.Selected = !p.b_i_params.Selected;
                    p.setStatus('parameters');
                    break;
                case p.b_i_colors:
                    p.clearSelection();
                    p.colorEditor.init(p.object);
                    p.b_i_colors.Selected = !p.b_i_colors.Selected;
                    p.setStatus('colors');
                    break;
                case p.b_i_object:
                    p.clearSelection();
                    p.objectEditor.init();
                    p.b_i_object.Selected = !p.b_i_object.Selected;
                    p.setStatus('objects');
                    break;
                case p.b_i_program:
                    p.clearSelection();
                    p.b_i_program.Selected = !p.b_i_program.Selected;
                    p.setStatus('program');
                    break;
                case p.b_i_dots:
                    p.clearSelection();
                    p.b_i_dots.Selected = !p.b_i_dots.Selected;
                    p.setStatus('dots');

                    break;
                case p.b_instruments:
                    p.instruments.isOpened = !p.instruments.isOpened;
                    p.instruments.y = (p.instruments.isOpened) ? 250 : 0;
                    p.b_instruments.alpha = (p.instruments.isOpened) ? .75 : .25;
                    p.clearSelection();
                    p.status.setText('');
                    break;
            }
            break;
    }
};
pro.h_objectEditor = function(e) {
    var t = e.target;
    var p = t.parent;
    p.object = e.content.data;
    p.setStatus('objects');
};
pro.setStatus = function(label) {
    this.status.setText(label + " " + (this.object ? '[' + this.object.name + ']' : ''));
};
override(LQ.Editor, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = 1;
    }
});


include('lq/liquid/LObjectEditor');
include('lq/liquid/LDrawProgram');
include('lq/liquid/LColorEditor');
include('lq/liquid/LParamEditor');
include('lq/liquid/LPassEditor');
include('lq/liquid/com/LIconButton');
include('lq/liquid/com/LTextButton');
include('lq/liquid/com/LContainer');
include('lq/liquid/com/LiquidFont');
include('lq/liquid/com/LSlider');
include('lq/liquid/com/LText');
include('lq/liquid/com/LColor');

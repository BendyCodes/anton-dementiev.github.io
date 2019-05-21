LQ.ColorEditor = function(soul, editor) {
    GodStep.LFrame.call(this, soul, 'ColorEditor');
    this.W = 185; this.H = 185;
    this.addChild(this.back = this.createGraphics('back'));
    this.addFrame(this.b_add = new LQ.IconButton(-6, this.H - 3, 300, 0));
    this.addFrame(this.b_del = new LQ.IconButton(-16 + 50, this.H - 3, 350, 0));

    this.b_add.scale.x = this.b_add.scale.y = this.b_del.scale.x = this.b_del.scale.y = .65;

    this.addChild(this.status = new LQ.Text('1', 30, 85, this.H + 2, 'left', 0xffffff));

    var sw = this.W + 40, sh = 20;
    this.editor = editor;
    this.addChild(this.s_red = new LQ.Slider(sw, sh));
    this.addChild(this.s_green = new LQ.Slider(sw, sh));
    this.addChild(this.s_blue = new LQ.Slider(sw, sh));

    this.s_red.x = this.s_green.x = this.s_blue.x = 10;
    this.s_red.y = this.H + 50;
    this.s_green.y = this.H + 80;
    this.s_blue.y = this.H + 110;

    this.redrawBack();
    this.selectColor(null);

    this.colors = [];
    GodStep.IDownUp.call(this, this.W, this.H);

    addEvent(this.s_red, LQ.SLIDER_CHANGE, this.h_slider);
    addEvent(this.s_green, LQ.SLIDER_CHANGE, this.h_slider);
    addEvent(this.s_blue, LQ.SLIDER_CHANGE, this.h_slider);

    addEvent(this.b_add, GodStep.FRAME_DOWN, this.h_buttons);
    addEvent(this.b_del, GodStep.FRAME_DOWN, this.h_buttons);
};
extend(LQ.ColorEditor, GodStep.LFrame);
pro.redrawBack = function() {
    var g = this.back;

    g.beginFill(LQ.COLORS[2], 1);
    g.drawRoundedRect(0, 0, this.W, this.H, 5);
    g.endFill();
};
pro.init = function(object) {
    this.visible = true;
    this.selected = null;
    this.clear();
    this.object = object;

    if(object) {
        for(var i = 0; i<object.colors.length; i++) {
            this.addColor(object.colors[i]);
        }
    }

    this.b_add.Enabled = this.b_del.Enabled = object != null;
    this.selectColor(null);
};

pro.clear = function() {
    this.status.setText('');
    while(this.colors.length) {
        this.removeChild(this.colors[0].destroy());
        this.colors.splice(0, 1);
    }
};
pro.addColor = function(c) {
    var color = new LQ.Color(c);
    this.addChild(color);
    this.colors.push(color);
    var i = parseInt((this.colors.length - 1)/6);
    color.y = (this.colors.length - 1 - 6 * i) * color.W + 2;
    color.x = i * color.W + 2;

    addEvent(color, GodStep.FRAME_DOWN, this.h_color);
    return color;
};
pro.sort = function() {
    var c;
    for(var i = 0; i<this.colors.length; i++) {
        c = parseInt((i)/6);
        this.colors[i].x = c * this.colors[i].W + 2;
        this.colors[i].y = (i - 6 * c) * this.colors[i].W + 2;
    }
};
pro.selectColor = function(c) {
    if(c) {
        var color = c.color;
        this.s_red.Value = color.r/255;
        this.s_green.Value = color.g/255;
        this.s_blue.Value = color.b/255;
    }

    this.b_del.Enabled = this.s_blue.Enabled = this.s_red.Enabled = this.s_green.Enabled = c != null;
};
// listeners

pro.h_color = function(e) {
    var t = e.target;
    var p = t.parent;
    if(p.selected) {
        p.selected.Selected = false;
    }
    p.selected = t;
    t.Selected = true;
    p.selectColor(t);
    p.status.setText(p.colors.indexOf(p.selected) + '');

};
pro.h_slider = function(e) {
    var p = e.target.parent;
    p.selected.applyRGB(p.s_red.value, p.s_green.value, p.s_blue.value);
    p.object.applyToState();

};
pro.h_buttons = function(e) {
    var c;
    var t = e.target;
    var p = t.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            switch (t) {
                case p.b_add:
                    if(p.object && p.colors.length < 36) {
                        var color = p.addColor(c = GodStep.Color.random());
                        p.status.setText(p.colors.length - 1 + '');
                        if(p.selected) {
                            p.selected.Selected = false;
                        }
                        p.selected = color;
                        color.Selected = true;
                        p.status.setText(p.colors.indexOf(p.selected) + '');
                        p.object.pushColor(c);
                        p.selectColor(color);

                    }
                    break;
                case p.b_del:
                    if(p.selected) {
                        p.removeChild(p.selected.destroy());
                        p.object.removeColor(p.selected.color);
                        addEvent(p.selected, GodStep.FRAME_DOWN, this.h_color);
                        p.colors.splice(p.colors.indexOf(p.selected), 1);
                        p.selected = null;
                        p.status.setText('');
                        p.sort();
                        p.selectColor(null);
                    }
                    break;
            }
            break;
    }
};
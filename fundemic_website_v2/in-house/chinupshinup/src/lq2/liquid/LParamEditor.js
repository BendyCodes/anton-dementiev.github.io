LQ.ParamEditor = function(soul) {
    GodStep.LFrame.call(this, soul, 'ParamEditor');

    this.addChild(this.container = new LQ.Container(soul, this.W = 200, this.H = 250, LQ.Slider));
    this.container.setHitArea(0, 0, this.W *.15, this.H);
    this.addFrame(this.b_add = new LQ.IconButton(-6, this.H - 3, 300, 0));
    this.addFrame(this.b_del = new LQ.IconButton(-16 + 50, this.H - 3, 350, 0));
    this.b_add.scale.x = this.b_add.scale.y = this.b_del.scale.x = this.b_del.scale.y = .65;

    addEvent(this.container, LQ.SLIDER_CHANGE, this.h_container);
    addEvent(this.b_add, GodStep.FRAME_DOWN, this.h_buttons);
    addEvent(this.b_del, GodStep.FRAME_DOWN, this.h_buttons);

}; extend(LQ.ParamEditor, GodStep.LFrame);

pro.init = function(object) {
    this.visible = true;
    this.container.clear();
    this.object = object;
    if(object) {
        for(var i = 0; i<object.params.length; i++) {
            this.addSlider(object.params[i], i);
        }
    }

};
pro.addSlider = function(v, i) {
    this.container.addItem(v, i)
};
//listeners
pro.h_container = function(e) {
    var t = e.target;
    var p = t.parent;
    var sliders = t.items;
    var object = p.object;
    for(var i = 0; i<object.params.length; i++) {
        object.params[i] = sliders[i].Value;
    }
    object.applyToState();
};
pro.h_buttons = function(e) {
    var c;
    var t = e.target;
    var p = t.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            switch (t) {
                case p.b_add:
                    if(p.object) {
                        p.addSlider(0, p.object.params.length);
                        p.object.pushParam();
                    }
                    break;
                case p.b_del:
                    if(p.object) {
                        if(p.object.params.length > 0) {
                            p.container.delItem(p.object.params.length - 1);
                            p.object.removeParam();
                        }
                    }
                    break;
            }
            break;
    }
};
LQ.Container = function(soul, w, h, itemClass) {
    GodStep.LFrame.call(this, soul, 'Container');
    GodStep.IDownUp.call(this, w, h);

    this.visible = true;
    this.addChild(this.back = this.createGraphics('back'));
    this.addChild(this.container = new PIXI.DisplayObjectContainer());
    this.addChild(this.maska = this.createGraphics('maska'));

    this.container.mask = this.maska;
    this.W = w;
    this.H = h;
    this.items = [];
    this.redrawBack();

    this.itemClass = itemClass;

    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    addEvent(this, GodStep.FRAME_MOVE, this.h_mouse);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
}; extend(LQ.Container, GodStep.LFrame);

LQ.ITEM_SELECTED = 'item selected';

pro.redrawBack = function() {
    var g = this.back;

    g.beginFill(LQ.COLORS[2], 1);
    g.drawRoundedRect(0, 0, this.W, this.H, 5);
    g.endFill();
    g = this.maska;
    g.beginFill(LQ.COLORS[2], 1);
    g.drawRoundedRect(0, 2, this.W, this.H - 4, 5);
    g.endFill();
};
pro.clear = function() {
   this.selected = null;
    while(this.items.length) {
        this.delItem(0);
    }
    this.items = [];
};
pro.getContainerH = function(delta) {
    if(this.items) {
        return (this.items.length - delta) * this.items[0].DH;
    }
    return 0;
};
pro.addItem = function(object, name) {
    var button;
    switch (this.itemClass) {
        case LQ.TextButton:
            button = this.container.addChild(new this.itemClass(object, name, this.W));
            break;
        case LQ.Slider:
            button = this.container.addChild(new this.itemClass(this.W *.85 - 4, 22)); button.x = 2 + this.W * .15;
            button.Value = object;
            addEvent(button, LQ.SLIDER_CHANGE, this.h_sliders);
            break;
    }


    this.items.push(button);
    button.y = this.getContainerH(1) + ((this.itemClass == LQ.Slider) ? 4 : 0);
    addEvent(button, GodStep.FRAME_DOWN, this.h_items);
    return button;
};
pro.delItem = function(i) {
    delEvent(this.items[i], GodStep.FRAME_DOWN, this.h_items);
    this.removeChild(this.items[i].destroy());
    this.items.splice(i, 1);
};
//listeners
pro.h_sliders = function(e) {
    var t = e.target;
    dispatch(t.parent.parent, LQ.SLIDER_CHANGE);
};
pro.h_items = function(e) {
    var t = e.target;
    if(t.name == "down") return;
    var p = t.parent.parent;
    if(p.selected) {
        p.selected.Selected = false;
    }
    p.selected = t;
    t.Selected = true;
    dispatch(p, LQ.ITEM_SELECTED, t);
};
pro.h_mouse = function(e) {
    var c = e.content;
    var t = e.target;
    var p;
    switch (e.type) {
        case GodStep.FRAME_UP:
            t.downPoint = null;
            break;
        case GodStep.FRAME_MOVE:
            if(t.downPoint) {
                p = c.getLocalPosition(t);
                t.container.y = Math.min(0, Math.max(t.oy + p.y - t.downPoint.y, t.H - t.getContainerH(0)));
            }
            break;
       case GodStep.FRAME_DOWN:
           p = c.getLocalPosition(t);
           t.downPoint = p;
           t.oy = t.container.y;
           break;
   }
};
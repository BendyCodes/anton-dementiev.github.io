LQ.ObjectEditor = function(soul) {
    GodStep.LFrame.call(this, soul, 'ObjectEditor');
    this.addChild(this.container = new LQ.Container(soul, 200, 250, LQ.TextButton));

    addEvent(this.container, LQ.ITEM_SELECTED, this.h_container);

};
extend(LQ.ObjectEditor, GodStep.LFrame);

pro.init = function() {
    this.visible = true;
    this.container.clear();
    var objects = GodStep.lqobjects[0];
    var item, object;
    for(var i = 0; i<objects.length; i++) {
        object = objects[i];
        item = this.container.addItem(object, object.name);
        if(object == this.object) {
            item.Selected = true;
            dispatch(this, LQ.ITEM_SELECTED, item.object);
        }
    }
};

// listeners
pro.h_container = function(e) {
    var t = e.target;
    var p = t.parent;
    var item = e.content.data;
    p.object = item.object;
    dispatch(p, LQ.ITEM_SELECTED, item.object);
};
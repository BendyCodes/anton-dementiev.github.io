LQ.Slider = function(sw, sh) {
    GodStep.Frame.call(this, 'LSlider', sw, this.H = sh);
    GodStep.IDownUp.call(this, sw, sh);
    this.DH = this.H + 5;

    this.value = 0;
    this.back = this.createGraphics('back');
    this.cursor = this.createGraphics('cursor');
    this.addChild(this.down = new GodStep.Frame('down', sh * 2, sh * 2));
    GodStep.IDownUp.call(this.down, sh * 2, sh * 2);

    addEvent(this.down, GodStep.FRAME_UP, this.h_mouse_up);
    addEvent(this, GodStep.FRAME_MOVE, this.h_mouse);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);

    this.isEnabled = true;
    this.value = 0;

    this.redrawBack();
    this.redrawCursor();
}; extend(LQ.Slider, GodStep.Frame);

LQ.SLIDER_CHANGE = 'slider change';

pro.destroy = function() {
    this.removeChild(this.back);
    this.removeChild(this.cursor);
    this.removeChild(this.down);
    delEvent(this.down, GodStep.FRAME_UP, this.h_mouse_up);
    delEvent(this, GodStep.FRAME_MOVE, this.h_mouse);
    delEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    return this;
};
pro.redrawCursor = function() {
    var g = this.cursor;
    g.W = this.W *.1;
    g.clear();
    g.beginFill(LQ.COLORS[2], 1);
    g.drawRoundedRect(2,2, g.W - 4, this.H - 4, 5);
    g.endFill();

};
pro.redrawBack = function() {
    var g = this.back;
        g.clear();
        g.beginFill(LQ.COLORS[1], 1);
        g.drawRoundedRect(0,0, this.W, this.H, 5);
        g.endFill();
};

pro.h_mouse_up = function(e) {
    var p = e.target.parent;
    p.down.visible = false;
    p.downPoint = null;
};
pro.h_mouse = function(e) {
    var t = e.target;
    var p = t.parent;
    var c = e.content;
    var point;
    switch (e.type) {
        case GodStep.FRAME_UP:
            t.downPoint = null;
            break;
        case GodStep.FRAME_MOVE:
            if(t.downPoint && t.cursor && t.isEnabled) {
                point = c.getLocalPosition(t);
                t.cursor.x = t.startPointX - (t.downPoint.x - point.x);
                t.cursor.x = Math.max(0, Math.min(t.W - t.cursor.W, t.cursor.x));
                t.down.x = point.x - t.H;
                t.down.y = point.y - t.H;
                t.value = t.cursor.x/(t.W - t.cursor.W);
                dispatch(t, LQ.SLIDER_CHANGE, t);
            }
            break;
        case GodStep.FRAME_DOWN:
            if(t.cursor) {
                point = c.getLocalPosition(t);
                t.downPoint = point;
                t.down.visible = true;
                t.startPointX = t.cursor.x;
            }
            break;
    }
};
override(LQ.Slider, 'Enabled', {
    get: function() {
        return this.isEnabled;
    },
    set: function(value) {
        this.isEnabled = value;
        this.alpha = (value) ? 1 : .5;
    }
});
override(LQ.Slider, 'Value', {
    get: function() {
        return this.value;
    },
    set: function(value) {
        this.value = value;
        this.cursor.x = value * (this.W - this.cursor.W);
    }
});
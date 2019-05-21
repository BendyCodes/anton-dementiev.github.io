GodStep.Slider = function (w, h, s, type, min, max, val, n){
    GodStep.Frame.call(this, 'Slider');
    GodStep.IOverOut.call(this);
    GodStep.IDownUp.call(this);

    this.CW = 20;
    this.min = min || 0;
    this.max  = max || 1;
    this.delta  = this.max - this.min;
    this.W = w;
    this.H = h * s;
    this.type = type;
    this.isFloat = (type > 0 && type < 1);
    this.back = this.createGraphics('back');
    this.cursor = this.createGraphics('cursor');
    this.label = this.addFrame(new GodStep.Text(n || '', h * s, 'Arial', 'left', 0x0));
    this.valueText = this.addFrame(new GodStep.Text(val || '', h * s, 'Arial', 'left', 0x0));
    this.valueText.y = this.label.y = -this.H;
    GodStep.IDownUp.call(this.cursor);

    GodStep.addEvent(this, GodStep.FRAME_OUT, this.h_back);
    GodStep.addEvent(this, GodStep.FRAME_OVER, this.h_back);
    GodStep.addEvent(this, GodStep.FRAME_UP, this.h_cursor);
    GodStep.addEvent(this, GodStep.FRAME_MOVE, this.h_move);
    GodStep.addEvent(this.cursor, GodStep.FRAME_DOWN, this.h_cursor);

    this.setHitArea(0, 0, this.W, this.H);
    this.setHitArea(0, 0, this.CW, this.H, this.cursor);

    this.redrawBack();
    this.redraw();

    this.Value = val;
};
extend(GodStep.Slider, GodStep.Frame);

pro.redrawBack = function() {
    if(!this.cursor.IsDown) {
        this.back.clear();
        this.rect(this.W, this.H, (this.IsOver) ? 0xff4444 : 0xffaaaa,.8, 0, 0, this.back);
    }
};
pro.redraw = function() {
    this.cursor.clear();
    this.rect(this.CW, this.H,  (this.cursor.IsDown) ? 0x00ff00 : 0xffffff,.8, 0, 0, this.cursor);
};

pro.h_back = function(e) {
    e.target.redrawBack();
};
pro.h_move = function(e) {
    var t = e.content.t;
    var power;
    var dv;
    if(e.content.getLocalPosition) {
        var point = e.content.getLocalPosition(t);
        if(t.cursor.IsDown) {
            power = 1;//Math.max(0, Math.min(1, 1 - (point.y- t.cursor.downPoint.y)/ t.W/2));
            t.cursor.position.x = Math.max(0, Math.min(point.x - t.cursor.downPoint.x, t.W - t.CW));
            dv = (t.cursor.position.x/(t.W - t.CW)) * (t.delta) + t.min -  t.lastValue;
            t.value = t.lastValue + dv * power;
            GodStep.dispatch(t, GodStep.FRAME_CHANGED);
            if(t.type == 'int') {
                t.value = parseInt(t.value);
            } else {
                if(t.isFloat) {
                    t.value = parseInt(t.value / t.type)*t.type;
                } else {
                    t.value = parseInt(t.value / t.type)*t.type;
                }
            }
            t.valueText.setText(t.value);
            t.valueText.updateText();
            t.valueText.x = t.W - t.valueText.width;
            t.updateCursor();
        }
    }
};
pro.h_cursor = function(e) {
    if(e.content.t instanceof GodStep.Slider) {
        e.content.t.cursor.IsDown = false;
        e.content.t.redraw();
        e.content.t.lastValue = e.content.t.value;
    } else {
        e.content.t.parent.redraw();
        e.content.t.lastValue = e.content.t.value;
    }
};
pro.updateCursor = function() {
    this.cursor.x = ((this.value - this.min)/(this.delta))*(this.W - this.CW);
};

Object.defineProperty(GodStep.Slider.prototype, 'IsDown', {
    set: function(value) {
        this.cursor.IsDown = false;
        this.redraw();
        this.redrawBack();
    }
});
Object.defineProperty(GodStep.Slider.prototype, 'Value', {
    get: function() {
        return this.value;
    },
    set: function(value) {
        this.value = value;
        if(this.type == 'int') {
            this.value = parseInt(this.value);
        } else {
            if(this.isFloat) {
                this.value = parseInt(this.value / this.type) * this.type;
            } else {
                this.value = parseInt(this.value / this.type) * this.type;
            }
        }
        this.lastValue = this.value;
        this.valueText.setText(this.value);
        this.valueText.updateText();
        this.valueText.x = this.W - this.valueText.width;
        this.updateCursor();
    }
});

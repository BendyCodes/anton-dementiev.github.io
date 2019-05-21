Games.Cell = function(xi, yi, w, h, isDisableInteractive) {
    this.xi = xi;
    this.yi = yi;
    this.guests = [];
    GodStep.Frame.call(this, 'Cell[' + xi +", " +yi + ']' , w, h);
    if(!isDisableInteractive) {
        GodStep.IDownUp.call(this, w * 22, h * 22);
        addEvent(this, GodStep.FRAME_UP, this.h_mouse);
        addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    }
};
Games.CELL_UP = 'cellup';
Games.CELL_DOWN = 'celldown';
Games.CELL_CLICK = 'cellclick';

extend(Games.Cell, GodStep.Frame);
pro.destroy = function() {
    delEvent(this, GodStep.FRAME_UP, this.h_mouse);
    delEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
};
pro.clear = function() {
    this.guests = [];
};
pro.delObject = function(o) {
    this.guests.splice(this.guests.indexOf(o), 1);
};
pro.h_mouse = function(e) {
    var t = e.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            dispatch(t, Games.CELL_UP);
            break;
        case GodStep.FRAME_DOWN:
            t.dragData = e.data;
            dispatch(t, Games.CELL_DOWN);
            break;
    }
};
pro.getAlias = function(alias) {
    var g;
    for (var gi in this.guests) {
        g = this.guests[gi];
        if(g.Alias == alias) {
            return g;
        }
    }
    return null;
};
pro.setObject = function(o) {
    this.guests.push(o);
};
pro.getGuests = function() {
    return this.guests;
};
Object.defineProperty(pro, 'X', {
    get: function() {
        return this.xi;
    },
    set: function(value) {
        this.xi = value;
    }
});

Object.defineProperty(pro, 'Y', {
    get: function() {
        return this.yi;
    },
    set: function(value) {
        this.yi = value;
    }
});
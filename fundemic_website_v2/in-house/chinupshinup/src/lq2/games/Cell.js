Games.Cell = function(xi, yi, w, h) {
    this.xi = xi;
    this.yi = yi;
    this.guests = [];
    GodStep.Frame.call(this, 'Cell[' + xi +", " +yi + ']' , w, h);
    GodStep.IDownUp.call(this, w, h);

    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
};
Games.CELL_UP = 'cellup';
Games.CELL_DOWN = 'celldown';
Games.CELL_CLICK = 'cellclick';

extend(Games.Cell, GodStep.Frame);

pro.h_mouse = function(e) {
    var t = e.target;
    switch (e.type) {
        case GodStep.FRAME_UP:
            dispatch(t, Games.CELL_UP);
            break;
        case GodStep.FRAME_DOWN:
            dispatch(t, Games.CELL_DOWN);
            break;
    }
};
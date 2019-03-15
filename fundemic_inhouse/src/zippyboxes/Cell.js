PS.Cell = function(xi, yi, w, h, s) {
    Games.Cell.call(this, xi, yi, w, h);
    this.xi = xi;
    this.yi = yi;
    this.guests = [];
    this.addChild(this.img = new PS.Img('squares_game', s * PS.CELL_SCALE, this.W *.5, this.H *.5,.5));

    // this.createGraphics();
  //  this.redraw();
};

extend(PS.Cell, Games.Cell);
pro.pushGuest = function(o) {
    this.guests.push(o);
};
pro.delGuest = function(o) {
    this.guests.splice(this.guests.indexOf(o), 1);
};
pro.setAsGuest = function(o) {
    if(o.name == 'player') {
        this.guests.push(o);
    } else {
        this.guests.splice(0, 0, o);
    }

    o.cell.guests.splice(o.cell.guests.indexOf(o), 1);
    o.cell = this;
};

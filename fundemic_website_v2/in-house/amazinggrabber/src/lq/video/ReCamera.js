GodStep.ReCamera = function(soul, w, h) {
    GodStep.Frame.call(this, 'ReCamera', w, h);
    this.soul = soul;

    this.addFrame(this.redrawer1 = new GodStep.Redrawer(w, h, 1));
    this.addFrame(this.redrawer2 = new GodStep.Redrawer(w, h, 2));
    this.redrawer2.ox2 = this.redrawer2.oy2 = 0;
    GodStep.IDownUp.call(this, w, h);
    GodStep.addEvent(this, GodStep.FRAME_MOVE, this.h_mouse);

};
extend(GodStep.ReCamera, GodStep.Frame);

pro.update = function() {
    this.redrawer1.draw(this.target);
    var s = .8;
    var is = 1/s;
    var dx = this.W*(1 -s)*.5;
    var dy = this.H*(1 -s)*.5;

    this.redrawer2.scale.x = this.redrawer2.scale.y = 1;
    this.redrawer2.x = this.redrawer2.ox2;
    this.redrawer2.y = this.redrawer2.oy2;


    this.redrawer1.visible = true;
    this.redrawer2.visible = true;
    this.redrawer1.scale.x = this.redrawer1.scale.y = s;
    this.redrawer1.x += dx;
    this.redrawer1.y += dy;
    this.redrawer2.draw(this.redrawer1);
    this.redrawer1.scale.x = this.redrawer1.scale.y = 1;
    this.redrawer1.x = this.redrawer2.x;
    this.redrawer1.y = this.redrawer2.y;
    this.redrawer1.draw(this.redrawer2);
    this.redrawer1.visible = false;

    this.redrawer2.scale.x = this.redrawer2.scale.y = is;
    this.redrawer2.ox2 = this.redrawer2.x;
    this.redrawer2.oy2 = this.redrawer2.y;
    this.redrawer2.x += this.W*(1 -is)*.5;
    this.redrawer2.y += this.H*(1 -is)*.5;

};

pro.setTarget = function(t) {
    this.target = t;
};

pro.place = function(x, y) {
   this.redrawer1.place(x, y);
   this.redrawer2.place(x, y);
    this.redrawer2.ox2 = x;
    this.redrawer2.oy2 = y;
};
pro.h_mouse = function(e) {
    var t = e.t;
    switch (e.type) {
        case GodStep.FRAME_MOVE:
            var point = e.getLocalPosition(t);
            t.place(point.x - t.W/2, point.y - t.H/2);
            break;
    }
};

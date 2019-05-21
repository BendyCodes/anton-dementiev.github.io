GodStep.WaysEditor = function (editor){
    GodStep.Frame.call(this, 'WaysEditor');
    GodStep.IDownUp.call(this);

    this.editor = editor;
    this.back = this.createGraphics('back');
    this.marker = this.createGraphics('marker');
    this.rect(20, 30, 0xff9b5f, 1, 40, 0, this.marker);

    this.views = [];
    this.currentWay = null;
    this.dots = [];
    this.dotContainer = this.addChild(new PIXI.DisplayObjectContainer());
    this.setHitArea(0, 0, editor.W, editor.H);

    this.addFrame(this.buttonAdd = new GodStep.IconButton('img/add_icon.png'));

    GodStep.addEvent(this.buttonAdd, GodStep.FRAME_DOWN, this.h_button);
    GodStep.addEvent(this, GodStep.FRAME_MOVE, this.h_mouse);
    GodStep.addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    GodStep.addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    this.visible = false;
    this.viewType = 0;

};
extend(GodStep.WaysEditor, GodStep.Frame);

pro.drawWay = function() {
    this.back.clear();
    this.back.lineStyle(2, 0x00ff00, .9);
    this.currentWay.draw(this.back);
    if(this.currentWay) {
        if(this.currentWay.curves.length > 0) {
            this.back.lineStyle(2, 0xff0000, .9);
            for(var i = 0; i<this.currentWay.curves.length; i++) {
                this.currentWay.curves[i].draw(this.back);
            }
            this.dot = this.currentWay.getPoint(this.currentWay.position);
            //this.back.drawCircle(this.dot.x ,this.dot.y, 5);
        }
    }

    if(this.overedCurve) {
        this.back.lineStyle(2, 0xffffff, .9);
        this.overedCurve.draw(this.back);
    }

};
pro.setWay = function(way) {
    while(this.dots.length) {
        this.delFrame(this.dots[0]);
        this.dots.splice(0, 1);
    }
    if(way) {
        this.currentWay = way;

        if(this.viewType == 0) {
            var points = way.points;
            for(var i = 0; i < points.length; i++) {
                this.dots.push(this.addFrame(new GodStep.DotView(points[i]), this.dotContainer));
                GodStep.addEvent(this.dots[i], GodStep.FRAME_DOWN, this.h_dot);
            }
            this.dots[0].lvl = 2; this.dots[0].redraw();
        } else {
            var curves = this.currentWay.curves;
            this.currentWay.createCurves();
            this.overedCurve = null;
            for (var c = 0; c < curves.length; c++) {
                this.dots.push(this.addFrame(new GodStep.DotView(curves[c].getPoint(0.5)), this.dotContainer));
                GodStep.addEvent(this.dots[c], GodStep.FRAME_DOWN, this.h_tickDot);
                GodStep.addEvent(this.dots[c], GodStep.FRAME_OVER, this.h_tickDot);
            }
        }
    }
    if(this.currentWay) {
        this.drawWay();
    }
};
pro.setFrame = function(frame) {
    if(this.frame || frame) {
        this.frame = frame || this.frame;
        this.back.position = this.dotContainer.position = this.frame.position;

        while(this.views.length) {
            this.delFrame(this.views[0]);
            this.views.splice(0, 1);
        }

        if(this.frame.ways) {
            this.ways = this.frame.ways;
            GodStep.WayView.count = 0;
            for(var i = 0; i<this.ways.length; i++) {
                var way = this.addFrame(new GodStep.WayView(this.ways[i]));
                this.views.push(way);
                way.x = this.editor.W - way.W - 4 - 10;
                way.y = this.editor.H - this.ways.length * (way.H + 5) + i*(way.H + 5) - 10;
                GodStep.addEvent(this.views[i], GodStep.FRAME_DOWN, this.h_views);
            }
            this.buttonAdd.x = this.views[this.views.length-1].x + this.views[0].W - 15;
            this.buttonAdd.y = this.views[0].y - 15;
            if(this.ways.length > 0) {
                this.setWay(this.ways[this.ways.length-1]);
                this.views[this.ways.length-1].IsDown = true;
            }
        } else {
            this.setWay(null);
        }
    }
};
pro.update = function() {
    if(this.visible) {
        this.buttonAdd.update();
        if(this.currentWay) this.drawWay();
    }
};
pro.switchView = function(type) {
    if(type) {
        this.viewType = type;
    } else {
        if(this.viewType == 1) {
            this.viewType = 0;
        } else {
            this.viewType = 1;
        }
    }
};
pro.h_views = function(e) {
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            e.t.parent.setWay(e.t.way);
            break;
    }
};
pro.h_tickDot = function(e) {
    var dot = e.t;
    var parent = dot.parent.parent;
    switch (e.type) {
        case GodStep.FRAME_DOWN:

            break;
        case GodStep.FRAME_OVER:
            var curveID = parent.dots.indexOf(dot);
            parent.overedCurve = parent.currentWay.curves[curveID];
            parent.drawWay();
            break;
    }
};
pro.h_dot = function(e) {
    var dot = e.t;
    var parent = dot.parent.parent;
    if(GodStep.IsKeyPressed(GodStep.KEY_ALT)) {
        parent.delFrame(dot.destroy());
        parent.currentWay.delPoint(dot.point);
        parent.dots.splice(parent.dots.indexOf(dot), 1);
    }
    if(GodStep.IsKeyPressed(GodStep.KEY_SHIFT)) {
        if(dot.lvl == 0) {
            dot.lvl = 1;
            dot.point.ctype = 'c';
        }
        else {
            dot.lvl = 0;
            dot.point.ctype = 'p';
        }
        dot.redraw();
    }
    parent.currentWay.createCurves();

    parent.drawWay();
};
pro.h_mouse = function(e) {
    var t = e.content.t;
    if(t.visible && t.currentWay) {
        var selected;
        var p;
        switch (e.type) {
            case GodStep.FRAME_UP:
                selected = GodStep.DotView.selected;
                if(selected) {
                    selected.isSelected = false; selected.redraw();
                    GodStep.DotView.selected = null;
                }
                break;
            case GodStep.FRAME_DOWN:
                if(GodStep.IsKeyPressed(GodStep.KEY_CTRL)) {
                    p = e.getLocalPosition(t);
                    p = new PIXI.Point(p.x - t.dotContainer.x, p.y - t.dotContainer.y);
                    t.dots.push(t.addFrame(new GodStep.DotView(p), t.dotContainer));
                    GodStep.addEvent(t.dots[t.dots.length-1], GodStep.FRAME_DOWN, t.h_dot);

                    t.currentWay.push(p, 'p');
                    t.currentWay.createCurves();

                    t.drawWay();
                }
                break;
            case GodStep.FRAME_MOVE:
                selected = GodStep.DotView.selected;
                if(selected) {
                    p = e.getLocalPosition(t);
                    selected.place(new PIXI.Point(p.x - t.dotContainer.x, p.y - t.dotContainer.y));
                    t.drawWay();
                }
                break;
        }
    }
};
pro.h_button = function(e) {
    switch (e.t) {
        case e.t.parent.buttonAdd:
            var way = e.t.parent.frame.addWay();
            e.t.parent.setFrame(e.t.parent.frame);
            way.createCurves();
            break;
    }
};
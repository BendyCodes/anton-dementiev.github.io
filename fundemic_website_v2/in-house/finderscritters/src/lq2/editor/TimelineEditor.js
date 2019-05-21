GodStep.TimelineEditor = function (editor){
    GodStep.Frame.call(this, 'TimelineEditor');
    GodStep.IDownUp.call(this);

    this.editor = editor;
    this.marker = this.createGraphics('marker');
    this.rect(20, 30, 0xffdf54, 1, 20, 0, this.marker);

    this.back = this.createGraphics('back');
    this.cursor = this.createGraphics('cursor');

    this.label = this.createText('', 22, 'Arial', 'left');

    this.lineWidth = editor.W - 40;
    this.lineHeight = 110;
    this.rect(this.lineWidth, this.lineHeight, 0,.5, 0, 0, this.back);
    this.rect(1, this.lineHeight, 0x00ff00, 1, 0, 0, this.cursor);

    this.cursor.visible = false;
    this.visible = false;

    this.addFrame(this.buttonAdd = new GodStep.IconButton('img/add_icon.png'));
    this.addFrame(this.buttonDel = new GodStep.IconButton('img/delete_icon.png'));
    this.addFrame(this.sliderSpeed = new GodStep.Slider(this.lineWidth, 15, 'horizontal',0,.11));


    this.container = this.addChild(new PIXI.DisplayObjectContainer());
    this.container.y = this.cursor.y = this.back.y = editor.H - this.lineHeight - 20;
    this.sliderSpeed.x = this.container.x = this.label.x = this.back.x = 20; this.label.y = this.back.y - 25;
    this.buttonAdd.x = this.lineWidth - 20;
    this.buttonDel.x = this.buttonAdd.x + 26;
    this.buttonDel.y = this.buttonAdd.y = this.back.y - 14;
    this.sliderSpeed.y = this.container.y + this.lineHeight + 3;

    this.transformDot = this.addFrame(new GodStep.DotView(new PIXI.Point()), this.container); this.transformDot.scale = new PIXI.Point(1.5, 1.5);
    this.setHitArea(0, 0, editor.W, editor.H);

    GodStep.addEvent(this, GodStep.FRAME_MOVE, this.h_mouse);
    GodStep.addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);
    GodStep.addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    GodStep.addEvent(this.sliderSpeed, GodStep.FRAME_CHANGED, this.h_slider);

    this.views = [];

    GodStep.addEvent(this.buttonAdd, GodStep.FRAME_DOWN, this.h_button);
};
extend(GodStep.TimelineEditor, GodStep.Frame);

pro.setFrame = function(frame) {
    this.frame = frame;
    this.transformDot.visible = false;
    this.label.setText(this.frame.name);
    this.loop = this.frame.loop || null;
    this.cursor.visible = this.loop != null;

    if(this.loop) {
        this.sliderSpeed.Value = this.loop.speed;
    }

    GodStep.addEvent(this.loop, GodStep.EVENT_START, this.h_events);
    GodStep.addEvent(this.loop, GodStep.EVENT_END, this.h_events);

    while(this.views.length) {
        this.delFrame(this.views[0]);
        this.views.splice(0, 1);
    }

    for(var i = 0; i<this.loop.events.length; i++) {
        var event = this.loop.events[i];
        var view = this.addFrameAt(new GodStep.EventView(event), this.container, 0);
        view.W = event.length * this.lineWidth;
        view.x = event.start * this.lineWidth;
        view.y = event.y * (this.lineHeight - view.H);
        event.view = view;
        GodStep.addEvent(view, GodStep.FRAME_DOWN, this.h_view);
        view.redraw();
        this.views.push(view);
    }
};
pro.update = function() {
    if(this.visible) {
        this.buttonAdd.update();
        this.buttonDel.update();
        if(this.loop) {
            this.cursor.x = this.back.x + this.loop.position * this.lineWidth;
        }
    }
};

pro.h_button = function(e) {
    var p = e.t.parent;
    switch(e.t) {
        case p.buttonAdd:
            if(p.frame.loop) {
                var event = new GodStep.Event(0, .3);
                var view = p.addFrameAt(new GodStep.EventView(event), p.container, p.container.children.length - 1);
                event.length = view.W/p.lineWidth;
                event.y = 0;
                event.view = view;
                p.views.push(view);
                p.frame.loop.addEvent(event);
                GodStep.addEvent(view, GodStep.FRAME_DOWN, p.h_view);
            }
            break;
        case p.buttonDel:
            break;
    }
};
pro.h_slider = function(e) {
    var p = e.t.parent;
    p.loop.speed = e.t.Value;
};
pro.h_events = function(e) {
   var t = e.data;
   switch (e.type) {
       case GodStep.EVENT_END:
           t.view.redraw();
           break;
       case GodStep.EVENT_START:
           t.view.redraw();
           break;
   }
};
pro.h_mouse = function(e) {
    var t = e.content.t;
    var p = t.parent;
    var l;
    switch (e.type) {
        case GodStep.FRAME_UP:
            selected = GodStep.EventView.selected;
            if(selected) {
                selected.isDown = false;
                selected.isSelected = false;
                selected.redraw();
            }
            t.transformDot.isDown = false;
            break;
        case GodStep.FRAME_MOVE:
            if(e.content.getLocalPosition) {
                l = e.content.getLocalPosition(t);
                var container = t.container;
                var selected = GodStep.EventView.selected;
                if(t.transformDot.isDown) {
                    t.transformDot.place(new PIXI.Point(Math.min(t.lineWidth, Math.max(0, l.x - container.x)), t.transformDot.y));
                    if(selected) {
                        selected.W = Math.max(1, t.transformDot.x - selected.x);
                        selected.event.length = selected.W/t.lineWidth;
                        selected.redraw();
                    }
                    return;
                }
                if(selected) {
                    if(selected.isDown && selected.isSelected) {
                        selected.place(Math.min(t.lineWidth - selected.W, Math.max(0, l.x - container.x - selected.downPoint.x)), Math.min(t.lineHeight - selected.H, Math.max(0, l.y - container.y - selected.downPoint.y)));
                        t.transformDot.x = selected.x + selected.W;
                        selected.event.start = selected.x/t.lineWidth;
                        selected.event.y = selected.y/(t.lineHeight - selected.H);
                        t.transformDot.y = selected.y + selected.H/2;
                    }
                }
            }

            break;
    }
};
pro.h_view = function(e) {
    var t = e.t;
    var p = t.parent.parent;
    switch (e.type) {
        case GodStep.FRAME_UP:
            break;
        case GodStep.FRAME_DOWN:
            p.transformDot.visible = true;
            p.transformDot.x = t.x + t.W;
            p.transformDot.y = t.y + t.H/2;
            var par = p.transformDot.parent;
            par.removeChild(p.transformDot);
            par.addChild(p.transformDot);
            break;
    }
};

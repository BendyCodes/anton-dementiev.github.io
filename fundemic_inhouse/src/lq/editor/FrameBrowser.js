GodStep.FrameBrowser = function (soul){
    GodStep.Frame.call(this, 'FrameBrowser');

    this.visible = false;

    this.createGraphics();
    this.views = [];
    this.setSoul(soul);
};
pro = GodStep.FrameBrowser.prototype = Object.create( GodStep.Frame.prototype);

pro.createViews = function(frame, parent) {

    var view = new GodStep.FrameView(frame);
    if(parent) {
         view.parentFrame = parent;
         parent.pushChild(view);
    }
    this.views.push(view); this.addFrame(view);
    for(var i = 0; i<frame.frames.length; i++) {
        this.createViews(frame.frames[i], view);
    }
};
pro.setSoul = function(soul, instance) {
        this.visible = true;
        if(!this.soul || instance) {
            this.soul = soul;
            this.graphics.clear();
            this.rect(20, 30, 0xa0ff52);
            while(this.views.length) {
                this.delFrame(this.views[0].destroy());
                this.views.splice(0, 1);
            }

            this.createViews(soul, null);
            if(this.views.length) {
                this.views[0].x = this.views[0].y = 34;
                this.views[0].place();
            }
            for(var i =0; i<this.views.length; i++) {
                this.views[i].drawLines(this.graphics);
                GodStep.addEvent(this.views[i], GodStep.FRAME_DOWN, this.h_views);
            }
        }
};
pro.update = function() {
    if(this.visible) {

    }
};

pro.h_views = function(e) {
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            e.t.parent.parent.soul.timelineEditor.setFrame(e.t.frame);
            e.t.parent.parent.soul.waysEditor.setFrame(e.t.frame);
            break;
    }
};

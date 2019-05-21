GodStep.Animation = function (name, w, h) {
    GodStep.Frame.call(this, name);
    this.loop = new GodStep.Loop(this);
    this.ways = [new GodStep.Way(new PIXI.Point(10, 10))];
    GodStep.addEvent(this.loop, GodStep.LOOP_FINISH, this.h_events);
    GodStep.addEvent(this.loop, GodStep.EVENT_START, this.h_events);
    GodStep.addEvent(this.loop, GodStep.EVENT_END, this.h_events);

    this.state = -1;
    this.currentEvent = null;

    this.addChild(this.out = new PIXI.Sprite(new PIXI.RenderTexture(w, h)));
    this.tempImage = new PIXI.Sprite(this.temp = new PIXI.RenderTexture(w, h));
};
extend(GodStep.Animation, GodStep.Frame);

pro.update = function() {
    if(this.visible) {
        GodStep.Frame.prototype.update.call(this);

        this.loop.update();
        if(this.currentEvent != null) {
            var position = this.currentEvent.getPosition(this.loop.position);
            for(var i = 0; i<this.loop.active.length; i++) {
                this.animSequance(this.loop.active[i].uid, position);
            }
        }
    }
};
pro.animSequance = function(id, position) {
};
pro.restart = function() {

};
pro.eventStartHandler = function(uid, event) {

};
pro.eventEndHandler = function(uid) {

};
pro.render = function(object, dx, dy) {
    this.out.texture.render(object, new PIXI.Matrix(1,0,0,1,dx || 0, dy || 0));
};
pro.clear = function() {
    this.out.texture.clear();
};

pro.saveTemp = function() {
    this.tempImage.texture.clear();
    this.temp.render(this.out);
    this.out.texture.clear();
    this.out.texture.render(this.tempImage);
    this.graphics.clear();
};

pro.h_events = function(e) {
    var frame;
    switch (e.type) {
        case GodStep.LOOP_FINISH:
            switch (e.content.t.finishMode) {
                case GodStep.LOOP_CYCLE:
                    e.content.t.frame.restart();
                    break;
            }
            break;
        case GodStep.EVENT_END:
            frame = e.content.data.loop.frame;
            frame.eventEndHandler(e.data.uid);
            break;
        case GodStep.EVENT_START:
            frame = e.content.data.loop.frame;
            frame.eventStartHandler(e.content.data.uid, e.content.data);
            break;
    }
};
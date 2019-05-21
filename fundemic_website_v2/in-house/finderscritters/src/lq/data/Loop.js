GodStep.Loop = function(frame) {
    this.frame = frame;
    this.position = 0;
    this.speed = 0.005;
    this.count = 0;
    this.events = [];
    this.active = [];
    this.finishMode = GodStep.LOOP_CYCLE;
    this.isActive = true;
    PIXI.EventTarget.call(this);
};
extend(GodStep.Loop, Object);

GodStep.LOOP_CYCLE = 0;
GodStep.LOOP_PAUSE = 1;
GodStep.LOOP_STOP = 2;

pro.start = function(position) {
    this.position = position || 0;
    this.isActive = true;
    this.active = [];
    for(var i = 0; i<this.count; i++) {
        this.events[i].reset();
    }
};
pro.finish = function() {
    switch (this.finishMode) {
        case GodStep.LOOP_CYCLE:
            this.position -= 1;
            break;
        case GodStep.LOOP_PAUSE:
            this.position = 1;
            this.isActive = false;
            break;
        case GodStep.LOOP_STOP:
            this.position = 0;
            this.isActive = false;
            break;
    }
    this.active = [];
};
pro.update = function() {
    var event;
    if( this.isActive) {
        this.position += this.speed;
        if(this.position > 1) {
            this.finish();
            for(var j = 0; j<this.count; j++) {
                event = this.events[j];
                if(event.isStarted) {
                    event.finish();
                }
                event.startCount = 0;
            }
            GodStep.dispatch(this, GodStep.LOOP_FINISH);
        }

        for(var i =0; i<this.count; i++) {
            event = this.events[i];

            if(this.position > event.start && event.startCount == 0) {
                event.begin();
            }
            if(this.position > event.start + event.length) {
               event.finish();
            }

        }
    }
};
pro.setData = function(data) {
    this.speed = parseFloat(data.s);

    this.events = [];
    for(var i = 0; i < data.e.length; i++) {
        this.addEvent(GodStep.Event.parse(data.e[i]));
    }
};
pro.getData = function() {
    var data = {};
        data.e = [];
        data.s = this.speed.toString().substr(0, 6);

    for(var i = 0; i<this.events.length; i++) {
        data.e.push(this.events[i].getData());
    }

    return data;
};
pro.delEvent = function(event) {
    this.events.splice(this.events.indexOf(event), 1);
    this.count--;
};
pro.addEvent = function(event) {
    this.events.push(event);
                     event.loop = this;
                     event.uid = this.count;
    this.count++;

    GodStep.addEvent(event, GodStep.EVENT_END, this.h_events);
    GodStep.addEvent(event, GodStep.EVENT_START, this.h_events);
};

pro.h_events = function(e) {
    var t = e.content.t;
    switch (e.type) {
        case GodStep.EVENT_END:
            t.loop.active.splice(t.loop.active.indexOf(t), 1);
            break;
        case GodStep.EVENT_START:
            t.loop.active.push(t);
            break;
    }
    GodStep.dispatch(t.loop, e.type, t);
};
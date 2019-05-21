GodStep.Event = function(start, length) {
    this.start = start;
    this.length = length;
    this.startCount = 0;
    this.id = GodStep.Event.count++;
    PIXI.EventTarget.call(this);
};
GodStep.Event.DATA_TRUTH = 1000;
GodStep.Event.count = 0;
pro = GodStep.Event.prototype = Object.create( Object.prototype);

pro.getData = function() {
   var truth = GodStep.Event.DATA_TRUTH.toString().length;
   var data = {};
       data.s = (this.start).toString().substr(0, truth);
       data.l = (this.length).toString().substr(0, truth);
       data.y = (this.y).toString().substr(0, truth);
      return data;
};
pro.getPosition = function(globalPosition) {
    return (globalPosition - this.start)/this.length;
};
pro.reset = function() {
    this.isStarted = false;
    this.startCount = 0;
};
pro.finish = function() {
    if(this.isStarted) {
        this.isStarted = false;
        GodStep.dispatch(this, GodStep.EVENT_END);
    }
};
pro.begin = function() {
    this.startCount++;
    this.isStarted = true;
    GodStep.dispatch(this, GodStep.EVENT_START);
};

GodStep.Event.parse = function(data) {
    var e = new GodStep.Event(parseFloat(data.s), parseFloat(data.l));
    e.y = parseFloat(data.y);
    return e;
};
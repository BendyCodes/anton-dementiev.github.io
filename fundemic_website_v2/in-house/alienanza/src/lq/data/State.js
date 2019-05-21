GodStep.State = function () {
    this.values = [];
};
extend(GodStep.State, Object);

pro.pushValues = function(values, length) {
    this.values = values.slice(0, length);
};
pro.push = function(v) {
    this.values.push(v);
};
pro.randomize = function() {
    var values = this.values;
    var vl = values.length;
    for(var i = 0; i<vl; i++) {
        values[i] = Math.random();
    }
};
pro.clone = function() {
    var state = new GodStep.State();
    var values = this.values;
    var newValues = state.values;
    var vl = values.length;
    for(var i  = 0; i<vl; i++) {
        newValues.push(values[i]);
    }
    return state;
};
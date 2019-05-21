GodStep.Animation = function() {
    this.states = [];
};
extend(GodStep.Animation, Object);

pro.sort = function() {
    var s = this.states;
    for (var i = 0; i < s.length; i++) {
        for (var j = s.length - 1; j > i; j--) {
            if (s[j - 1].position > s[j].position) {
                var ts = s[j];
                s[j] = s[j - 1];
                s[j - 1] = ts;
            }
        }
    }
};
pro.getState = function(position) {

};
pro.remove = function(s) {
    this.states.splice(this.states.indexOf(s), 1);
};

pro.push = function(s, pos) {
    this.states.push(s);
    s.position = pos || 0;

    this.sort();
};
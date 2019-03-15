AG.Tutor = function(soul, x, y) {
    AG.MovieClip.call(this, ['tap_1', 'tap_2', 'tap_3','tap_2','tap_3','tap_2','tap_3','tap_2','tap_1'], soul.startS *.5, x, y,.5);
    pro.phase = 0;
    this.tutor = false;
}; extend(AG.Tutor, AG.MovieClip);

pro.nextFrame = function() {
    pro.phase++;
    if(pro.phase > 4) {
        pro.phase = 0;
        AG.MovieClip.prototype.nextFrame.call(this);
    }
};
GodStep.Container = function(name, w, h, isDrawRect) {
    GodStep.Frame.call(this, name, w, h);
    GodStep.IDownUp.call(this, w, h);

    GodStep.addEvent(this, GodStep.FRAME_DOWN, this.h_mouse);

    this.dragCoef1 = JS.CONTAINER_DRAG_C;
    this.dragCoef2 = JS.CONTAINER_DRAG_C;
    if(isDrawRect) {
        this.rect(w-2, h-2, 0xffffff * Math.random(), 1, 1, 1);
    }
};
extend(GodStep.Container, GodStep.Frame);

pro.h_mouse = function(e) {
    var t = e.t;
    switch (e.type) {
        case GodStep.FRAME_DOWN:
            var mp = e.getLocalPosition(t);
            if(mp.x < t.W * t.dragCoef1 || mp.x > t.W * (1-t.dragCoef2)) {
                GodStep.dispatch(t, JS.EVENT_DRAG_IN_CONTAINER);
            }
            break;
    }
};
Object.defineProperty(GodStep.Container.prototype, 'CacheAsBitmap', {
    get: function() {
        return this.cacheAsBitmap;
    },
    set: function(value) {
        this.alpha = (value) ? 0.5 : 1;
        this.cacheAsBitmap = value;
    }
});




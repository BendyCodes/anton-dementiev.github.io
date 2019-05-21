GodStep.IDownUp = function (w, h) {
    if(!this.addEventListener) PIXI.EventTarget.call(this);
    if(w && h)  {
        if(this.setHitArea) {
            this.setHitArea(0, 0, w, h);
        } else {
            this.interactive = true;
            this.hitArea = new PIXI.Rectangle(0, 0, w, h);
        }
    }
    GodStep.addMEvent(this, 'move', function(e) {
        GodStep.dispatch(this, GodStep.FRAME_MOVE, null, e);
    });

    GodStep.addMEvent(this, 'rightup', function(e) {
        this.downRightPoint = e.getLocalPosition(this);
        this.IsRDown = true;
        if(this.redraw) this.redraw();
        GodStep.dispatch(this, GodStep.FRAME_RUP, null, e);
    });
    GodStep.addMEvent(this, 'rightdown', function(e) {
        this.downRightPoint = e.getLocalPosition(this);
        this.IsRDown = true;
        if(this.redraw) this.redraw();
        GodStep.dispatch(this, GodStep.FRAME_RDOWN, null, e);
    });
    GodStep.addMEvent(this, 'down', function(e) {
         this.downPoint = e.getLocalPosition(this);
         this.IsDown = true;
         if(this.redraw) this.redraw();
         GodStep.dispatch(this, GodStep.FRAME_DOWN, null, e);
    });
    GodStep.addMEvent(this, 'up', function(e) {
         this.IsDown = false;
         this.downPoint = null;
         if(this.redraw) this.redraw();
         GodStep.dispatch(e.target, GodStep.FRAME_UP, null, e);
    });
};

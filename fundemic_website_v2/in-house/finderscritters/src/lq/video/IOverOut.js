GodStep.IOverOut = function (w, h) {
    if(!this.addEventListener) PIXI.EventTarget.call(this);
    if(w && h)  {
        this.setHitArea(0, 0, w, h);
    }
     this.mouseupoutside = function(e) {
         this.redraw();
         GodStep.dispatch(this, GodStep.FRAME_OUTSIDE);
     };
     this.touchendoutside = function(e) {
         this.redraw();
         GodStep.dispatch(this, GodStep.FRAME_OUTSIDE);
     };
     this.mouseover = function(e) {
         this.IsOver = true;
         this.redraw();
         GodStep.dispatch(this, GodStep.FRAME_OVER);

     };
     this.mouseout = function(e) {
         this.IsOver = false;
         this.redraw();
         GodStep.dispatch(this, GodStep.FRAME_OUT);
     };
};

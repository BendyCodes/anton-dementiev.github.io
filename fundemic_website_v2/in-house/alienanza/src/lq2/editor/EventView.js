GodStep.EventView = function (event){
    GodStep.Frame.call(this, 'EventView');
    GodStep.IOverOut.call(this);
    GodStep.IDownUp.call(this);

    GodStep.EventView.count = (GodStep.EventView.count + 1) || 1;
    this.event = event;
    this.createGraphics();
    this.W = 26;
    this.H = 14;
    this.setHitArea(0, 0, this.W, this.H);

    this.redraw();
};
pro = GodStep.EventView.prototype = Object.create( GodStep.Frame.prototype);
pro.redraw = function() {
    this.graphics.clear();
    this.rect(this.W, this.H, (this.isDown) ? 0x00ff00 : ((this.event.isStarted) ? 0x5555ff : 0xffffff), .6);
    this.setHitArea(0, 0, this.W, this.H);
};


Object.defineProperty(GodStep.EventView.prototype, 'IsDown', {
    get: function() {
        return this.isDown;
    },
    set: function(value) {
        this.isDown = value;
        if(GodStep.EventView.selected) {
            GodStep.EventView.selected.isSelected = false;
            GodStep.EventView.selected.redraw();
        }
        GodStep.EventView.selected = this;
        this.isSelected = true;
        this.redraw();
    }
});



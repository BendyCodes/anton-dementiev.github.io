PS.Orientation = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'Orientation', soul.W, soul.H);
    this.addChild(this.back = new PS.Img('back_o', soul.startS, this.W/2, this.H/2,.5));
    this.addChild(this.face = new PS.Img('face', soul.startS, this.W/2, this.H *.35,.5));
    this.addChild(this.device = new PS.Img('device_1', soul.startS , this.W/2, this.H *.75,.5));
    GodStep.IDownUp.call(this, this.W, this.H);
    this.visible = false;


    if(window.orientation == 90 || window.orientation == -90) {
        this.visible = true;
    }


};
extend(PS.Orientation, GodStep.Frame);
pro.init = function() {
   this.visible = true;
};

Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.back.scale.x = this.soul.OW/this.back.texture.width/value;
        this.back.scale.y = this.soul.OH/this.back.texture.height/value;
    }
});
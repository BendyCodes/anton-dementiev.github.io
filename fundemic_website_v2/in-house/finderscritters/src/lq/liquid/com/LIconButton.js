LQ.IconButton = function(px, py, tx, ty) {
    GodStep.Frame.call(this, 'IconButton');
    GodStep.IDownUp.call(this, 50, 50);
    this.x = px + 25;
    this.y = py + 25;
    var w = this.w = this.h = 50;
    this.isEnabled = true;
    this.setHitArea(-25, -25, w, w);
    this.addChild(this.icon = new Games.Img('liquid_icons', 1, 0, 0, new PIXI.Point(0.5, 0.5)));
    this.icon.texture.setFrame(new PIXI.Rectangle(tx, ty, 50, 50));
    this.cacheAsBitmap = true;
};
extend(LQ.IconButton, GodStep.Frame);

override(LQ.IconButton, 'Selected', {
    get: function() {
        return this.isSelected;
    },
    set: function(value) {
        this.isSelected = value;
        if(this.isSelected) {
            this.alpha = 1;
          //  this.scale.x = this.scale.y = .5;
        } else {
            this.alpha = .35;
        }
    }
});
override(LQ.IconButton, 'Enabled', {
    get: function() {
        return this.isEnabled;
    },
    set: function(value) {
        this.isEnabled = value;
        this.alpha = (value) ? 1 : .5;
    }
});
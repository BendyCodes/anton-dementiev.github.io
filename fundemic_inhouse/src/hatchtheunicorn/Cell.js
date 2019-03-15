HTU.Cell = function(type, s, x, y) {
    if(!HTU.Cell.types) {
        HTU.Cell.types = ['icon_01', 'icon_02', 'icon_03', 'icon_04', 'icon_05', 'icon_06', 'icon_07', 'icon_08', 'icon_09', 'icon_10', 'icon_11'];
    }

    GodStep.Frame.call(this, 'Cell', 1, 1);
    this.level = type;
    this.addChild(this.img = new Games.Img(HTU.Cell.types[type], s, 0, 0,.5));
    this.x = x;
    this.y = y;
    this.scale.x = this.scale.y = 0;
    this.liveTime = 100;
    this.livePhase = 0;
    this.liveSpeed = 1;
};
extend(HTU.Cell, GodStep.Frame);
pro.getCost = function() {
    return this.resumm(2, this.level);
};
pro.resumm = function(v, i) {
    if(i == 0) {
        return v;
    }else {
        return this.resumm(v * 2, --i);
    }
};
pro.upgrade = function() {
    if(++this.level < HTU.Cell.types.length) {
        this.justUpdate = true;
        this.img.setTexture(HTU.Cell.types[this.level]);
        return true;
    }
    return false
};
pro.move = function(){
    this.liveTime-=2;
    if(this.liveTime == -2) {
        this.liveTime = 0;
    }

    this.livePhase += .3 * this.liveSpeed;
  //  this.liveSpeed += (0.1 - this.liveSpeed) * .01;
    this.scale.x = this.scale.y += (1 + Math.sin(this.livePhase) * this.liveTime/100 *.4 - this.scale.x) * .1 ;

};
pro.destroy = function() {
    this.removeChild(this.img);
    return this;
};
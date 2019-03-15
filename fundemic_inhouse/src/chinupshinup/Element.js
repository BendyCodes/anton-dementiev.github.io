SS.Element = function(type, s) {
    GodStep.Frame.call(this, 'Element' + type, 1, 1);
    this.elemType = type;
    switch (type) {
        case SS.COIN:
            this.isCoin = true;
            this.cost = 1;
            this.addChild(this.mvc = new SS.MovieClip(['coin_1', 'coin_2', 'coin_3', 'coin_4', 'coin_5', 'coin_6'], s, 0, 0,.5));
            break;
        case SS.BLOCK:
            this.addChild(this.img = new Games.Img('add_hammer', s, 0, 0,.5));
            this.scale.x = - this.scale.x;
            break;
        case SS.FLY:
            this.addChild(this.img = new Games.Img('bubble_1', s, 0, 0, new PIXI.Point(.5,.4)));
            break;
        case SS.BIGCOIN:
            this.isCoin = true;
            this.cost = 5;
            this.addChild(this.mvc = new SS.MovieClip(['2coin_1', '2coin_2', '2coin_3', '2coin_4', '2coin_5', '2coin_6'], s, 0, 0,.5));

            break;
        case SS.CRYSTAL:
            this.isCoin = true;
            this.cost = 10;
            this.addChild(this.img = new Games.Img('stone', s, 0, 0,.5));
            break;
    }
};
extend(SS.Element, GodStep.Frame);
SS.COIN = 2;
SS.FLY = 4;
SS.BLOCK = 3;
SS.BIGCOIN = 5;
SS.CRYSTAL = 6;
pro.move = function() {
   if(this.mvc) {
       this.mvc.animate();
   }
};
pro.destroy = function() {
    if(this.mvc) {
        this.removeChild(this.mvc);
    }
    if(this.img) {
        this.removeChild(this.img);
    }
    return this;
};
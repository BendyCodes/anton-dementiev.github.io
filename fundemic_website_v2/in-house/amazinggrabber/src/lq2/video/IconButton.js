/**
 * Created by Jura on 9/2/2014.
 */
GodStep.IconButton = function (img) {
    GodStep.Frame.call(this, null);
    PIXI.EventTarget.call(this);

    GodStep.IOverOut.call(this);
    GodStep.IDownUp.call(this);

    this.createGraphics();
    this.image = this.addChild(GodStep.Image.fromImage(GodPath + img));

    GodStep.addEvent(this.image, GodStep.IMAGE_LOADED, this.h_image);

    this.alpha = .7;
};

pro = GodStep.IconButton.prototype = Object.create( GodStep.Frame.prototype );
pro.update = function() {
    this.image.update();
};
pro.redraw = function() {
    var g = this.graphics;
    g.clear();
    g.lineStyle((this.isOver) ?2: 1, 0xffffff);
    g.beginFill((this.isDown) ? 0xaaaaaa : ((this.isOver) ? 0xffffff : 0xcccccc), 1);
    g.drawRoundedRect(this.image.position.x, this.image.position.y, this.W, this.H, 5);
    this.alpha = (this.isOver) ? 1 : .7;
};

pro.h_image = function(e) {
    e.t.parent.W = e.t.texture.width;
    e.t.parent.H = e.t.texture.height;
    e.t.x -= e.t.parent.W/2;
    e.t.y -= e.t.parent.H/2;
    e.t.parent.redraw();
    e.t.parent.setHitArea(e.t.x, e.t.y, e.t.parent.W, e.t.parent.H);
};
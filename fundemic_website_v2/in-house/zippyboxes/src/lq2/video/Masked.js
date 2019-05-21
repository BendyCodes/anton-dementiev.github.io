GodStep.Masked = function (img) { // Only CANVAS
    img.masked = img.masked || [];
    img.masked.push(this);
    this.img = img;
    this.inverse = false;
    this.rendered = new PIXI.RenderTexture(2, 2);

    if(img.texture.baseTexture.hasLoaded) {
        var baseTexture = img.texture.baseTexture;
        this.rendered.resize(baseTexture.width, baseTexture.height);
    } else {
        GodStep.addEvent(img, GodStep.IMAGE_LOADED, this.h_source);
    }

    this.temp = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(GodStep.TEMPCANVAS, 1)));

    PIXI.Sprite.call(this, this.out = new PIXI.RenderTexture(10, 10));
};
extend(GodStep.Masked, PIXI.Sprite);

GodStep.Masked.maskTile = function(tile, mask, inverse, bound) {
    var dx = bound.x || 0;
    var dy = bound.y || 0;
    var w = bound.width - bound.x;
    var h = bound.height - bound.y;
    var rendered = new PIXI.RenderTexture(parseInt(w || tile.width), parseInt(h || tile.height));
    rendered.render(mask, new PIXI.Matrix(1, 0,0,1, -tile.x-dx ,-tile.y-dy));

    var canvas = GodStep.TEMPCANVAS;
    var context = GodStep.TEMPCTX;
    context.clearRect(0, 0, canvas.width, canvas.height);
    GodStep.TEMPCANVAS.width = w || tile.width;
    GodStep.TEMPCANVAS.height = h || tile.height;
    context.clearRect(0, 0, canvas.width, canvas.height);

    trace(canvas.width + ' x '+ canvas.height);
   // context.rect(0,0,canvas.width,canvas.height);
   // context.fillStyle="red";
    //context.fill();
    //*
    context.save();
    context.globalCompositeOperation = 'destination-over';
    var i = 0, j = 0;
    var s = tile.texture.baseTexture.source;
    for(i = 0; i<parseInt( w/tile.texture.width) + 1; i++) {
        for(j = 0; j<parseInt(h/tile.texture.height) + 1; j++) {
            context.drawImage(s, i * tile.texture.width , j * tile.texture.height);
        }
    }
    context.restore();

    context.save();
    context.globalCompositeOperation = "destination-" + ((inverse) ? 'out' : 'in');
    context.drawImage(rendered.baseTexture.source,  0,0);
    context.restore();
    //*/
    var txt = new PIXI.Texture(new PIXI.BaseTexture(GodStep.TEMPCANVAS, 1));
    var rt = new PIXI.RenderTexture(txt.width, txt.height);
    var spr = new PIXI.Sprite(txt);
    rt.render(spr, new PIXI.Matrix(1, 0,0,1, 0, 0));
    return rt;
};
GodStep.Masked.mask = function(sprite, mask, inverse) {
    var spr = sprite;
    if(sprite instanceof PIXI.Graphics) {
        spr = new PIXI.Sprite(new PIXI.RenderTexture(sprite.getBounds().width, sprite.getBounds().height));
        spr.texture.render(sprite, {x:-sprite.x , y:-sprite.y});
    }

    var rendered = new PIXI.RenderTexture(spr.width, spr.height);
        rendered.render(mask, {x:mask.x , y:mask.y});

    var canvas = GodStep.TEMPCANVAS;
    var context = GodStep.TEMPCTX;
    context.clearRect(0, 0, canvas.width, canvas.height);
    GodStep.TEMPCANVAS.width = spr.width;
    GodStep.TEMPCANVAS.height = spr.height;
    context.clearRect(0, 0, canvas.width, canvas.height);

    //*
        context.save();
        context.globalCompositeOperation = 'destination-over';
        context.drawImage(spr.texture.baseTexture.source, 0, 0);
        context.restore();

        context.save();
        context.globalCompositeOperation = "destination-" + ((inverse) ? 'out' : 'in');
        context.drawImage(rendered.baseTexture.source, mask.x, mask.y);
        context.restore();
    //*/


   return new PIXI.Texture(new PIXI.BaseTexture(GodStep.TEMPCANVAS, 1));
};
pro.draw = function(object) {
    object.visible = true;
    this.rendered.render(object,  new PIXI.Matrix(1, 0,0,1, object.x - this.img.x, object.y - this.img.y)); object.visible = false;

    var canvas = GodStep.TEMPCANVAS;
    var frame = this.texture.frame;
    var context = GodStep.TEMPCTX;
        context.clearRect(0, 0, canvas.width, canvas.height); // optimize pls
        context.save();
        context.globalCompositeOperation = 'destination-over';
        context.drawImage(this.img.texture.baseTexture.source, 0, 0);
        context.restore();
        context.save();
        context.globalCompositeOperation = "destination-" + ((this.inverse) ? 'out' : 'in');
        context.drawImage(this.rendered.baseTexture.source, frame.x, frame.y);
        context.restore();

    this.temp.setTexture(new PIXI.Texture(new PIXI.BaseTexture(GodStep.TEMPCANVAS, 1)));
    this.out.clear();
    this.out.render(this.temp);
};
pro.clear = function() {
    this.rendered.clear();
    this.out.clear();
};
pro.h_source = function(e) {
    var tt = e.content.t;
    for(var i = 0; i< tt.masked.length; i++) {
        var t = tt.masked[i];
        var baseTexture = t.img.texture.baseTexture;
        t.position = tt.position;
        t.rendered.resize(baseTexture.width, baseTexture.height);
        t.out.resize(baseTexture.width, baseTexture.height);
    }
};

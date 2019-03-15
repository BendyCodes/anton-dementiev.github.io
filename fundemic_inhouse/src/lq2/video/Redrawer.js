GodStep.Redrawer = function(w, h, id, isClear) {
    GodStep.Frame.call(this, 'Redrawer' + (id || ''), w, h);
    this.addChild(this.source =  new PIXI.Sprite(this.sourceTex =  new PIXI.RenderTexture(w, h)));
    this.border = this.createGraphics();
   // this.border.lineStyle(1, 0xffffff, .1);
    this.border.drawRect(0, 0, w, h);
    this.isClear = isClear;

    if(this.sourceTex.renderer.type === PIXI.WEBGL_RENDERER) {
        this.sourceTex.render = this.renderWebGLScale
    }
};

extend(GodStep.Redrawer, GodStep.Frame);

pro.draw = function(o) {
    this.source.setTexture(this.sourceTex);
    this.sourceTex.render(o, {x: o.x - this.x, y: o.y - this.y}, this.isClear);
};

pro.renderWebGLScale = function(displayObject, position, clear) {
    //TOOD replace position with matrix..
    var gl = this.renderer.gl;

    gl.colorMask(true, true, true, true);

    gl.viewport(0, 0, this.width, this.height);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer );

    if(clear)this.textureBuffer.clear();

    // THIS WILL MESS WITH HIT TESTING!
    var children = displayObject.children;

    //TODO -? create a new one??? dont think so!
    var originalWorldTransform = displayObject.worldTransform;
    displayObject.worldTransform = PIXI.RenderTexture.tempMatrix;
    // modify to flip...
    displayObject.worldTransform.a = displayObject.scale.x;
    displayObject.worldTransform.d = displayObject.scale.y;
    displayObject.worldTransform.d = -displayObject.worldTransform.d;
    displayObject.worldTransform.ty = this.projection.y * -2;

    if(position)
    {
        displayObject.worldTransform.tx = position.x;
        displayObject.worldTransform.ty -= position.y;
    }

    for(var i=0,j=children.length; i<j; i++)
    {
        children[i].updateTransform();
    }

    // update the textures!
    PIXI.WebGLRenderer.updateTextures();

    //
    this.renderer.renderDisplayObject(displayObject, this.projection, this.textureBuffer.frameBuffer);

    displayObject.worldTransform = originalWorldTransform;
};
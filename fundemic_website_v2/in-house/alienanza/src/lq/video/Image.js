    GodStep.Image = function (texture) {
        if(!texture) {
            trace(texture);
        }
        PIXI.Sprite.call(this, texture);
        PIXI.EventTarget.call(this, texture);
        this.isNewTexture = true;
    };
    extend(GodStep.Image, PIXI.Sprite);

    GodStep.Image.fromUrl = function(imgPath, callBackLoaded) {
        var image = new GodStep.Image(PIXI.Texture.fromImage(imgPath));
        if(callBackLoaded) {
            image.texture.image = image;
            if(!image.texture.baseTexture.hasLoaded) {
                image.texture.addEventListener( 'update', callBackLoaded );
            } else {
                callBackLoaded(image);
            }
        }
        return image;
    };
    GodStep.Image.fromImage = function(imgPath, callBackLoaded) {
        if(imgPath.length > 4) {
            if(imgPath.substr(0, 4) != 'http') {
                imgPath = GodPath + imgPath;
            }
        }
        var image = new GodStep.Image(PIXI.Texture.fromImage(imgPath));
        if(callBackLoaded) {
            image.texture.baseTexture.image = image;
            if(!image.texture.baseTexture.hasLoaded) {
                image.texture.baseTexture.on('loaded', callBackLoaded );
            }
        }
        return image;
    };

    pro.place = function(x, y) {
        this.x = x;
        this.y = y;
    };
    pro.update = function() {
        if(this.isNewTexture) {
            if(this.texture.baseTexture.hasLoaded) {
               this.isNewTexture = false;
               GodStep.dispatch(this, GodStep.IMAGE_LOADED);
            }
        }
    };
    Object.defineProperty(pro, 'Scale', {
        get: function() {
            return this.scale.x;
        },
        set: function(value) {
            this.scale.x =
            this.scale.y = value;
        }
    });

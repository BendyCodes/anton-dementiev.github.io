GodStep.Preloader = function(soul) {
    this.preloadState = 0;
    GodStep.Preloader.textures = [];
    this.startS = soul.startS;
    this.soul = soul;
    this.isAudioTag = soul.AUDIOTAG;
    this.isOnlyOneView = true;
    GodStep.Preloader.instance = this;
    GodStep.Frame.call(this, 'Preloader', soul.W, soul.H);
  //  PIXI.EventTarget.call(this);
};

extend(GodStep.Preloader, GodStep.Frame);
GodStep.ASSETS_LOADED = 'assets loaded';
GodStep.SOUNDS_LOADED = 'sounds loaded';

pro.loadAll = function(pathImages, pngs, jpgs, pathSounds, sounds, assets) {
    //this.trace('start loading');
    this.textures = [];
    this.pathImages = pathImages;
    var i, img;
    this.images = pngs;
    this.assets = assets;
    this.exts = [];
    for(i=0; i<this.images.length; i++) {
        this.exts.push('.png');
        /*
        img = GodStep.Image.fromImage(this.pathImages + this.images[i] + '.png');
        img.p = this;
        img.texName = this.images[i];
        this.textures[img.texName] = img.texture;
        if (img.texture.baseTexture.hasLoaded) {
            img.Scale = this.startS;
            this.images.splice(i, 1);
            GodStep.textures[img.texName] = img.texture; i--;
        }
        //*/
    }
    for(i=0; i<jpgs.length; i++) {
        this.images.push(jpgs[i]);
        this.exts.push('.jpg');
        /*
        img = GodStep.Image.fromImage(this.pathImages + jpgs[i] + '.jpg');
        img.p = this;
        img.texName = jpgs[i];
        this.textures[img.texName] = img.texture;
        if (img.texture.baseTexture.hasLoaded) {
            img.Scale = this.startS;
            GodStep.textures[img.texName] = img.texture; i--;
        } else {
            this.images.push(jpgs[i]);
        }
        //*/
    }

    this.imagesCount = this.images.length;

    if(this.images.length > 0) {
        img = GodStep.Image.fromImage(this.pathImages + this.images[0] + this.exts[0]);
        img.p = this;
        img.texName = this.images[0];
        this.textures[img.texName] = img.texture;
    }

    this.initSounds(pathSounds, sounds);
    this.soundsCount = sounds.length;

    if(this.images.length == 0) {
        this.isImagesComplete = true;
        this.loadSounds();
    }

};
pro.trace = function(v) {
    trace(v);
};
pro.initSounds = function(soundPath, arr) {

    this.trace('init sounds');
    GodStep.Game.instance.sound = {};

    var sounds = [];
    var isLoop = false;
    for(var i = 0; i<arr.length; i++) {
        var name = arr[i]; isLoop = false;
        if(name.length > 4) {
            if(name.substr(0, 4) == 'loop') {
                isLoop = true;
                name = name.substr(5, name.length - 5);
            }
        }
        sounds.push({src:name, id:name, loop:isLoop});
    }
    this.soundPath = soundPath;
    GodStep.Game.instance.sound.needLoaded = this.needLoaded = this.sounds = sounds;

};
pro.loadSound = function(url, vol, loop) {
    var audio = new Audio();
    if(loop) {
        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            audio.play();
        }, false);
    }

    this.sounds.push(audio);
    audio.src = url;
    audio.preload = "auto";
    audio.volume = vol;
    audio.preloader = this;
    audio.onloadeddata = this.launchApp;
    audio.load();
    if(GodStep.loadingCallback) {
        GodStep.loadingCallback((this.audio_preload/this.soundsCount) * .5 +.5);
    }
    return audio;
};
pro.launchApp = function(launch){
    var preloader = this.preloader;
    preloader.audio_preload++;

    if ( preloader.audio_preload == preloader.needLoaded.length || launch == 1) {  // set 3 to # of your files
        preloader.startSounds();
    } else {
        preloader.loadSound(GodPath + preloader.soundPath + preloader.needLoaded[preloader.audio_preload].src + "." + preloader.support.audio, 1, preloader.needLoaded[preloader.audio_preload].loop);
    }
};
pro.startSounds = function() {
    this.loadAssets();
};
pro.loadSounds = function() {
    if(this.soul.DISABLE_SOUND) {
        this.loadAssets();
        return;
    }
    if(this.isAudioTag) {
        this.support = {};
        this.audio_preload = 0;
        GodStep.Game.instance.sound.sounds = this.sounds = [];
        GodStep.Game.instance.sound.AVAILABLE = true;
        var a = document.createElement('audio');
        var ogg = !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
        var mp3 = !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
        if (ogg) {
            trace('AUDIOTAG: ' + 'ogg');
            this.support.audio = 'ogg';
        } else
        if (mp3) {
            trace('AUDIOTAG: ' + 'mp3');
            this.support.audio = 'mp3';
        }
        else {
            trace('no sound supported');
            this.support.audio = 'no';
            GodStep.Game.instance.sound.AVAILABLE = false;
            this.startSounds();
            return 0;
        }

        this.loadSound(GodPath + this.soundPath + this.needLoaded[0].src + "." + this.support.audio, 1,  this.needLoaded[0].loop);
    } else {
        this.trace('loadSounds');
        var sound = GodStep.Game.instance.sound = {preloader:this};
        sound.AVAILABLE = true;
        if(window['createjs']) {
            if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
                this.ISMOBILE = true;
            }
        } else {
            sound.AVAILABLE = false;
            GodStep.Game.instance.sound = {};
            this.loadAssets();
            return;

        }
        if(sound.AVAILABLE) {}
        if(!this.soul.isNativeAndroid) {
            if (!createjs.Sound.initializeDefaultPlugins()) {
                sound.AVAILABLE = false;
                this.loadAssets();
                return;
            }
            if(sound.AVAILABLE) {
                for(var i = 0 ; i<this.sounds.length; i++) {
                    this.sounds[i].src += '.ogg';
                }
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", this.h_loadedSound);
                sound.countLoaded = this.sounds.length;
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.h_loadedSound, this));
                createjs.Sound.registerSounds(this.sounds, GodPath + this.soundPath);
            } else {
                GodStep.Game.instance.sound = {};
                this.loadAssets();
            }
        } else {
            sound.AVAILABLE = false;
            GodStep.Game.instance.sound = {};
            this.loadAssets();
        }
    }


};
pro.update = function() {
   if(!this.isImagesComplete) {
       var img;
       if(this.images) {
           for(var im in this.images) {
               var tex = this.textures[this.images[im]];
               if(tex) {
                //   this.trace(this.images[im] + " " + tex.baseTexture.hasLoaded + " " + parseInt(1000 * Math.random()));

                   if(tex.baseTexture.hasLoaded){
                       this.exts.splice(this.images.indexOf(this.images[im]), 1);
                       this.images.splice(this.images.indexOf(this.images[im]), 1);
                       if(GodStep.loadingCallback) {
                           GodStep.loadingCallback((1 - this.images.length/this.imagesCount) * .5);
                       }
                       if(this.images.length > 0) {
                           img = GodStep.Image.fromImage(this.pathImages + this.images[0] + this.exts[0]);
                           img.p = this;
                           img.texName = this.images[0];
                           this.textures[img.texName] = img.texture;
                       }
                       if(this.images.length > 0) {
                           for(var i = 0; i<10; i++) {
                               if(this.images[i]) {
                                //   this.trace(this.images[i]);
                                   img = GodStep.Image.fromImage(this.pathImages + this.images[i] + this.exts[i]);
                                   img.p = this;
                                   img.texName = this.images[i];
                                   this.textures[img.texName] = img.texture;
                               }
                           }
                       }
                   }
               }
           }
           if(this.images.length == 0) {
               this.isImagesComplete = true;
               GodStep.textures = this.textures;
               if(GodStep.IMAGE_RESOLUTION != null && GodStep.IMAGE_RESOLUTION != 1) {
                   this.resizeImages(GodStep.IMAGE_RESOLUTION);
               }
               this.loadSounds();
           }
       }
   }
};
pro.resizeImages = function(res) {
    var i;
    for (var img in GodStep.textures) {
        var isFound = false;
        if(GodStep.DONT_RESIZE != null) {
           for(i = 0; i<GodStep.DONT_RESIZE.length; i++) {
               if(img == GodStep.DONT_RESIZE[i]) {
                   isFound = true;
               }
           }
        }
        if(!isFound) {
            var tex = GodStep.textures[img];
            var newTex = new PIXI.RenderTexture(parseInt(tex.width *res), parseInt(tex.height *res));
            this.addChild(this.spr = new PIXI.Sprite(tex));
            newTex.render(this.spr, new PIXI.Matrix(res, 0, 0, res,0 ,0));
            this.removeChild(this.spr);
            GodStep.textures[img] = newTex;
            if(newTex.width == 0 || newTex.height == 0) {
            //    trace(0);
            }
        }
    }
    for(var bt in PIXI.BaseTextureCache) {
        if(GodStep.DONT_RESIZE != null) {
            isFound = false;
            for(i = 0; i<GodStep.DONT_RESIZE.length; i++) {
                var id = bt.search(GodStep.DONT_RESIZE[i]);
                if(id >= 0) {
                    isFound = true;
                }
            }
        }
        if(!isFound) {
            if(!PIXI.BaseTextureCache[bt].isLoader) {
                PIXI.BaseTextureCache[bt].destroy();
            }
        }
    }
};
pro.loadAssets = function() {
   // PIXI.loader.add(window['GodPath'] + 'src/godstep/assets/img/fonts1/' + 'font1.fnt')
  //      .load(this.h_loadedAssets);
    var loader;
    for(var i = 0; i<this.assets.length; i++) {
        loader = PIXI.loader.add(window['GodPath'] + this.pathImages + this.assets[i]);
    }

    loader.load(this.h_loadedAssets);
  //  dispatch(this, GodStep.ASSETS_LOADED);
    return;
    PIXI.loader
        //.add(window['GodAssetsPath'] + this.assets[0])
        .add(window['GodAssetsPath'] + 'logo.png')
        .load(this.h_loadedAssets);
    return;

    this.trace('loading assets');
    var fontClasses = [];
    if(!this.fontLoaderClass) {
        dispatch(this, GodStep.ASSETS_LOADED);
        return;
    }
    if(!this.fontLoaderClass.slice) {
        fontClasses = [this.fontLoaderClass];
    } else {
        fontClasses = this.fontLoaderClass;
    }
    if(this.assets) {
        while(this.assets.length) {
            var assetsToLoader;
            if(window['GodAssetsPath'] != undefined) {
                assetsToLoader =[window['GodAssetsPath'] + this.assets[0]];
            } else {
                assetsToLoader = [this.pathImages + this.assets[0]];
            }
            var loader;
            this.assets.splice(0, 1);
            if(fontClasses[0]) {
                loader = new fontClasses[0](assetsToLoader);
                this.soul.startS *= this.Scale;
                if(this.assets.length == 0) {
                    dispatch(this, GodStep.ASSETS_LOADED);
                }
            } else {
                loader = new PIXI.AssetLoader(assetsToLoader);
                loader.onComplete = this.h_loadedAssets;
                loader.preloader = this;
                loader.load();
            }
            fontClasses.splice(0, 1);
        }

    } else {
        dispatch(this, GodStep.ASSETS_LOADED);
    }
};
pro.h_loadedSound = function(e) {
    var sound = GodStep.Game.instance.sound;

   // this.trace('sound loaded ' + sound.countLoaded);
    if(GodStep.loadingCallback) {
        if(sound.countLoaded >= 0) {
            GodStep.loadingCallback((1 - sound.countLoaded/sound.preloader.soundsCount) * .5 +.5);
        }
    }
    sound.countLoaded--;
    if(sound.countLoaded == 0) {
        this.trace('sound loaded');
        sound.preloader.loadAssets();
   //     dispatch(sound.preloader, GodStep.ASSETS_LOADED);
    }
};

pro.h_loadedAssets = function(e) {
    var t = GodStep.Preloader.instance;
    t.trace('sound game');

    if(t.soul) {
        t.soul.startS *= t.Scale;
    }

    dispatch(t, GodStep.ASSETS_LOADED);
};
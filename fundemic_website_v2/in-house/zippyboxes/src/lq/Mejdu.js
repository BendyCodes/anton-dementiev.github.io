var GS;
var GodStep = GS = GodStep || {}; var GodPath = GodPath || '';  GodStep.ver = 1; var pro; GodStep.includes = []; GodStep.SCALE = 1;
    GodStep.version = '1.1.9';
    GodStep.UPDATE_LAG = 0;
    GodStep.DIVBYCLASS = false;
    GodStep.POSITION_SET_ZERO = true;
    GodStep.UPDATE_TIME_LAST = GodStep.UPDATE_TIME = new Date().getTime();
    GodStep.UPDATE_DELAY_COEF_INV = 1;
include('com/pixi.dev27');           //\\\\////\\
include('lq/Const');                //\\\\\/////\\
include('lq/video/Frame');         /// \\\\//// \\\
include('lq/data/Event');         //  OO  ||  OO  \\
include('lq/editor/Dialog');     ////// 020140 \\\\\\
include('lq/video/Image');      //| | | | .. | | | |\\
include('lq/video/Preloader');  //| | | | .. | | | |\\
include('lq/data/State');       //| | | | .. | | | |\\
include('lq/data/Color');       //| | | | .. | | | |\\
include('lq/data/Point');     ///   Created by JS    \\\
include('lq/server/Ajax');   ////   protected var    \\\\
include('lq/data/Math');      ////    presents      \\\\
include('lq/video/IHTML');    //\\ | | | | | | | | |  //\\
include('lq/video/IOverOut');   //\\//\\//\\//\\//\\//\\//\\
include('lq/video/IDownUp');   //\\//\\//\\//\\//\\//\\//\\
include('lq/video/IDragDrop');  //\\//\\//\\//\\//\\//\\//\\
                                 //\\//\\//\\//\\//\\//\\//\\
                                 //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                               //\\//\\//\\//\\//\\//\\//\\
                              //\\//\\//\\//\\//\\//\\//\\
                              //\\//\\//\\//\\//\\//\\//\\
                               //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                               //\\//\\//\\//\\//\\//\\//\\
                              //\\//\\//\\//\\//\\//\\//\\
                              //\\//\\//\\//\\//\\//\\//\\
                               //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\
                                //\\//\\//\\//\\//\\//\\//\\

           ////\\//\\//\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
          //\\//\\//\\//\\//\\  global  //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
         //\\//\\//\\//\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
         function catched(body, message) {
            try{
                body();
            } catch (e) {
                var s = 'CATCHED: "' + message + '"' + '\n[' + e + ']' + '\n\n' + e.stack;
                trace(s);
                alert(s);
            }
         }
         function update(cl, instance) {
             cl.prototype.update.call(instance);
         }
         function extend(child, parent) {
             if(!parent) {
                 trace("ERROR extend()");
             }
              pro = child.prototype = Object.create(parent.prototype);
         }
         function trace(message) {
             if (window.console) {
                 if(window.console.log) {
                     console.log(message);
                 }
             }
         }

         function include(path) {
             if(!GodStep.includes[path]) {
                 GodStep.includes[path] = true;
                 document.write("<script src=" + GodPath + path + ".js" + " type='text/javascript' charset='utf-8'></script>");
             }
         }
         function addCSS(style) {
             var newSS = document.createElement('link');
             newSS.rel='stylesheet';
             newSS.href= GodPath + style + '.css';
             document.getElementsByTagName("head")[0].appendChild(newSS);
         }
         function dialog(message, out) {
             if(GodStep.Mejdu.dialogSoul) {
                 GodStep.Mejdu.dialogSoul.dialog(message, out);
             }
         }
         function dispatch(target, type, data, ee) {
             GodStep.dispatch(target, type, data, ee);
         }
         function delEvent(target, type, handle) {
             target.removeEventListener(type, handle);
         }
         function addEvent(target, type, handle) {
             GodStep.addEvent(target, type, handle);
         }
         function override(object, name, body) {
             Object.defineProperty(object.prototype, name, body);
         }

                              //\\//\\//\\//\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
                              //\\//\\//\\//\\//\\   MEJDU   //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
                             //\\//\\//\\//\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
                             (function(){
                                 GodStep.Mejdu = function(name, w, h) {
                                        if(!GodStep.Mejdu.souls) {
                                         if(GodStep.Audio) new GodStep.Audio();
                                         if(GodStep.Symfony) new GodStep.Symfony();
                                        }
                                            GodStep.Mejdu.souls = GodStep.Mejdu.souls || [];
                                            GodStep.Mejdu.souls.push(this);


                                 PIXI.EventTarget.call(this);

                                 var body, html;
                                     if(navigator) {
                                         var isAndroid = navigator.userAgent.indexOf('Android') >= 0;
                                         var webkitVer = parseInt((/WebKit\/([0-9]+)/.exec(navigator.appVersion) || 0)[1],10) || void 0; // also match AppleWebKit
                                         this.isNativeAndroid = isAndroid && webkitVer <= 534 && navigator.vendor.indexOf('Google') == 0;
                                     }
                                     this.div = (GodStep.DIVBYCLASS) ? document.getElementsByClassName(name) : document.getElementById(name);
                                    if(this.div.item) {
                                        this.div = this.div[0];
                                    }
                                if(!this.div) {
                                     this.div = document.createElement('div');
                                     document.body.appendChild(this.div); this.div.id = name;
                                     this.div.style.position = 'absolute';
                                     if(GS.POSITION_SET_ZERO) {
                                         this.div.style.left = this.div.style.top = '0px';
                                     }

                                }
                                this.div.mejdu = this; this.name = name;
                                if(this.div) { trace("[" + GodStep.version +
                                                    "] {Godstep." + this.name + '' + ((this.WEBGL) ? " WEBGL" : '') + ((this.CANVAS) ? " CANVAS" : '') + "}"); }
                                        else { trace(GodStep.ERR_DIV_NF);  return null; }

                                            if(w && h) {
                                                this.W = w; this.H = h;
                                            } else {
                                                body = document.body, html = document.documentElement;
                                                this.H = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
                                                 if(this.FULLPAGE) {
                                                     document.body.style.margin = 0;
                                                     document.body.padding = 0;
                                                     this.W = this.div.scrollWidth;
                                                     this.H = html.clientHeight;
                                                 }
                                                 else {
                                                    this.W = this.div.clientWidth;
                                                    this.H = this.div.clientHeight;
                                                }
                                            }

                                     var opt = PIXI.defaultRenderOptions;
                                        opt.transparent = this.TRANSPARENT;
                                        opt.antialias = this.ANTIALIAS;
                                    // opt.resolution = .5;
                                    if(this.WEBGL) {
                                        this.webgl   = new PIXI.WebGLRenderer  ( this.W, this.H, opt );
                                        this.div.appendChild(this.soulview = this.webgl.view); }
                                    else
                                    if(this.CANVAS) {
                                        this.canvas = new PIXI.CanvasRenderer ( this.W, this.H, opt);
                                        this.canvas.view.style.display = 'block';

                                        this.div.appendChild(this.soulview = this.canvas.view);  GodStep.Mejdu.C =this.canvas;
                                    } else {
                                        var renderer = PIXI.autoDetectRenderer(this.W, this.H, opt);
                                        if(renderer instanceof PIXI.WebGLRenderer) {
                                            this.WEBGL = true;
                                            this.webgl = renderer;
                                            this.div.appendChild(this.soulview = this.webgl.view);
                                        } else {
                                            this.CANVAS = true;
                                            this.canvas = renderer;
                                            this.canvas.view.style.display = 'block';
                                            this.div.appendChild(this.soulview = this.canvas.view);  GodStep.Mejdu.C =this.canvas;
                                        }
                                    }
                                     if(GodStep.COLOR_STAGE) {
                                         this.stage = new PIXI.Stage(GodStep.COLOR_STAGE);
                                     } else {
                                         this.stage = new PIXI.Stage();
                                     }
                                    this.stage.soul = this;
                                    this.frames = [];


                                     if(!GodStep.Mejdu.TESTCANVAS) {
                                         GodStep.Mejdu.TESTCANVAS = document.createElement("canvas");
                                         GodStep.Mejdu.TESTCANVAS.width =
                                         GodStep.Mejdu.TESTCANVAS.height = 1;
                                         GodStep.TESTCTX = GodStep.Mejdu.TESTCANVAS.getContext('2d');
                                         GodStep.TESTCTX_RT = new PIXI.RenderTexture(1, 1);
                                         GodStep.TESTCTX_IMG = new PIXI.Sprite(GodStep.TESTCTX_RT);
                                         GodStep.TESTCTX_C = new PIXI.DisplayObjectContainer();

                                         this.stage.addChild(GodStep.TESTCTX_IMG);
                                         this.stage.addChild(GodStep.TESTCTX_C);
                                     }
                                     if(this.FULLPAGE) {
                                        if(this.WEBGL && this.CANVAS && this.PARALLEL){
                                            this.canvas.view.style.position = "absolute";
                                            this.canvas.view.style.left = this.webgl.view.offsetLeft + 'px';
                                            this.canvas.view.style.top = this.webgl.view.offsetTop + 'px';
                                        }


                                       if(this.ALWAYSONTOP) {
                                            this.canvas.view.style.left = this.canvas.view.style.top = '0px';
                                            this.div.style.position = 'absolute';
                                       }

                                       this.div.offsetParent.style['overflow-y'] = 'hidden';
                                       this.div.offsetParent.style['overflow-x'] = 'auto';
                                   }

                                   this.isStarted = true;

                                   this.isDataLoading = false;
                                   this.visible = true;
                                   //this.div.style.left = this.div.style.top = '0px';
                                    this.start();
                                     GodStep.Mejdu.render() ; window.requestAnimFrame( GodStep.Mejdu.update );
                                 };

                                    GodStep.Mejdu.pro = GodStep.Mejdu.prototype;// = Object.create( GodStep.Frame.prototype );
                                    GodStep.Mejdu.pro.start = function() {

                                    };
                                    GodStep.Mejdu.pro.update = function() {
                                        if(this.isStarted) {
                                            if(this.visible) {
                                                for (var i = 0, frame; frame = this.frames[i]; i++) {
                                                    frame.update();
                                                }
                                            }
                                        }
                                    };
                                    GodStep.Mejdu.pro.postFX = function() {};
                                    GodStep.Mejdu.pro.switchZ = function(soul) {
                                         var t = soul.getZ();
                                         soul.setZ(this.getZ());
                                         this.setZ(t);
                                     };
                                    GodStep.Mejdu.pro.getZ = function() {
                                        if(this.canvas) return this.canvas.view.style.zIndex;
                                        if(this.webgl) return this.webgl.view.style.zIndex;
                                    };
                                    GodStep.Mejdu.pro.setZ = function(zIndex) {
                                        if(this.canvas) this.canvas.view.style.zIndex = zIndex;
                                        if(this.webgl) this.webgl.view.style.zIndex = zIndex;
                                    };
                                    GodStep.Mejdu.pro.addPosition = function(dx, dy, viewType) {
                                        if(!viewType) {
                                            if (this.webgl) {
                                                this.webgl.view.style.position = "absolute";
                                                this.webgl.view.style.left = (this.webgl.view.offsetLeft + dx) + 'px';
                                                this.webgl.view.style.top = (this.webgl.view.offsetTop  + dy) + 'px';
                                            }
                                            if (this.canvas) {
                                                this.canvas.view.style.position = "absolute";
                                                this.canvas.view.style.left = (this.canvas.view.offsetLeft + dx) + 'px';
                                                this.canvas.view.style.top = (this.canvas.view.offsetTop  + dy) + 'px';
                                            }
                                        } else {
                                            this[viewType].view.style.position = "absolute";
                                            this[viewType].view.style.left = (this[viewType].view.offsetLeft + dx) + 'px';
                                            this[viewType].view.style.top = (this[viewType].view.offsetTop  + dy) + 'px';
                                        }
                                    };
                                    GodStep.Mejdu.pro.setAbsolutePositionAs = function(soul, viewType) {
                                        var pos;
                                        if(!viewType) {
                                            if (this.webgl) {
                                                pos = GodStep.IHTML.getPosition(soul.webgl.view);
                                                this.webgl.view.style.position = "absolute";
                                                this.webgl.view.style.left = pos.left + 'px';
                                                this.webgl.view.style.top = pos.top + 'px';
                                            }
                                            if (this.canvas) {
                                                pos = GodStep.IHTML.getPosition(soul.canvas.view);
                                                this.canvas.view.style.position = "absolute";
                                                this.canvas.view.style.left = pos.left + 'px';
                                                this.canvas.view.style.top = pos.top + 'px';
                                            }
                                        }
                                        else  {
                                            pos = GodStep.IHTML.getPosition(soul[viewType].view);
                                            this[viewType].view.style.position = "absolute";
                                            this[viewType].view.style.left = pos.left + 'px';
                                            this[viewType].view.style.top = pos.top + 'px';
                                        }
                                    };
                                    GodStep.Mejdu.pro.setPositionAs = function(soul, viewType) {
                                        if(!viewType) {
                                            if (this.webgl) {
                                                this.webgl.view.style.position = "absolute";
                                                this.webgl.view.style.left = soul.webgl.view.offsetLeft + 'px';
                                                this.webgl.view.style.top = soul.webgl.view.offsetTop + 'px';
                                            }
                                            if (this.canvas) {
                                                this.canvas.view.style.position = "absolute";
                                                this.div.style.left = soul.div.offsetLeft + 'px';
                                                this.div.style.top = soul.div.offsetTop + 'px';
                                            }
                                        }
                                        else  {
                                            this[viewType].view.style.position = "absolute";
                                            this[viewType].view.style.left = soul[viewType].view.offsetLeft + 'px';
                                            this[viewType].view.style.top = soul[viewType].view.offsetTop + 'px';
                                        }
                                    };
                                    GodStep.Mejdu.pro.addFrame = function(frame, container) {
                                        if(container) {
                                            container.addChild(frame);
                                        } else {
                                            this.stage.addChild(frame);
                                        }
                                        this.frames.push(frame);
                                        this.frames[frame.name] = frame;
                                        return frame;
                                    };
                                    GodStep.Mejdu.pro.delFrame = function(frame) {
                                        frame.parent.removeChild(frame);
                                        this.frames.splice(this.frames.indexOf(frame), 1);
                                    };
                                    GodStep.Mejdu.pro.dialog = function(message, outTime) {
                                        if(!this.dialogWindow) {
                                            GodStep.Mejdu.dialogSoul = this;
                                            this.addFrame(this.dialogWindow = new GodStep.Dialog(this));
                                        }
                                        this.dialogWindow.setMessage(message);
                                        this.dialogWindow.out(outTime);
                                        this.dialogWindow.view();
                                    };
                                    GodStep.Mejdu.pro.setData = function(data) {
                                        this.dataObject = JSON.parse(data);
                                        this.isStarted = true;
                                        for(var i = 0; i<this.dataObject.frames.length; i++) {
                                            var frame = this.frames[this.dataObject.frames[i].n];
                                            if(frame) {
                                                frame.setData(this.dataObject.frames[i]);
                                            }
                                        }

                                        GodStep.dispatch(this, GodStep.DATA_LOADED);
                                    };
                                    GodStep.Mejdu.pro.loadData = function(dataPath) {
                                        this.isStarted = false;
                                        this.isDataLoading = true;
                                        this.dataLoader = new GodStep.Ajax(dataPath + '.json', this, this.h_data);
                                    };
                                    GodStep.Mejdu.pro.h_data = function(e) {
                                        this.parent.isDataLoading = false;
                                        this.parent.setData(this.response);
                                        this.parent.dataLoader = null
                                    };
                                    GodStep.Mejdu.pro.beginFps = function() {
                                        if(this.fps) this.fps.begin();
                                    };
                                    GodStep.Mejdu.pro.endFps = function() {
                                        if(this.fps) this.fps.end();
                                    };
                                    GodStep.Mejdu.pro.createTempCanvas = function(w, h) {
                                        if(!GodStep.TEMPCANVAS) {
                                            var tempCanvas = GodStep.TEMPCANVAS = document.createElement("canvas");
                                            tempCanvas.width = w;
                                            tempCanvas.height = h;
                                            GodStep.TEMPCTX = tempCanvas.getContext('2d');
                                            this.stage.addChild(GodStep.TEMPCONTAINER = new PIXI.DisplayObjectContainer());
                                        }
                                    };
                                    GodStep.Mejdu.pro.createStats = function(x, y, visible) {
                                        var stats = this.stats = new Stats();

                                        stats.domElement.style.position = 'absolute';
                                        stats.domElement.style.left = (x || 0) + 'px';
                                        stats.domElement.style.top = (y || 0) + 'px';

                                        if(visible) {
                                            document.body.appendChild( stats.domElement );
                                        }
                                    };
                                    GodStep.Mejdu.pro.resize = function(ww, hh, oww, ohh) {
                                         var s = 1;
                                         var w = ww * s;
                                         var h = hh* s;
                                         var ow = oww* s;
                                         var oh = ohh* s;
                                         this.W = w;
                                         this.H = h;
                                         this.HH = h * .5;
                                         this.HW = w * .5;
                                         this.OH = oh;
                                         this.OW = ow;
                                         this.HOW = w * .5;
                                         this.HOH = oh * .5;
                                         this.DOW = this.OW - this.W;
                                         this.DOH = this.OH - this.H;
                                         if(this.three) this.three.resize(ow || w, oh || h);
                                         if(this.canvas) this.canvas.resize(ow || w, oh || h);
                                         if(this.webgl) this.webgl.resize(ow || w, oh || h);
                                         this.div.style.width = (ow || w) + 'px';
                                         this.div.style.height = (oh || h) + 'px';
                                     };
                                    Object.defineProperty(GodStep.Mejdu.pro, 'position', {
                                         get: function() {
                                             var view = (this.canvas) ?  this.canvas.view : this.webgl.view;
                                             return new PIXI.Point(view.clientLeft, view.clientTop);
                                         },
                                         set: function(value) {
                                             if(this.canvas) {
                                                 // this.canvas.view.style.visibility = (value) ? 'visible':'hidden';
                                             }
                                             if(this.webgl) {
                                                 //  this.webgl.view.style.visibility = (value) ? 'visible':'hidden';
                                             }
                                         }
                                     });
                                    Object.defineProperty(GodStep.Mejdu.pro, 'visible', {
                                         get: function() {
                                             return this.isVisible;
                                         },
                                         set: function(value) {
                                             this.isVisible = value;
                                             if(this.canvas) this.canvas.view.style.visibility = (value) ? 'visible':'hidden';
                                             if(this.webgl) this.webgl.view.style.visibility = (value) ? 'visible':'hidden';
                                             this.div.style.visibility = (value) ? 'visible':'hidden';
                                         }
                                     });

                             }());

                              ////\\//\\//\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
                              //\\//\\//\\//\\//\\  static  //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
                              //\\//\\//\\//\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
                              //pro = GodStep.Loop.prototype = Object.create( Object.prototype);
                              GodStep.hitTest = function(obj, x, y) {
                                  var ctx = GodStep.TESTCTX;

                                  var p = obj.parent;
                                  var c = GodStep.TESTCTX_C;
                                  var id = obj.parent.children.indexOf(obj);
                                  p.removeChild(obj);

                                  c.addChild(obj);
                                  GodStep.TESTCTX_RT.render(c, {x: -x, y:-y}, true);

                                  ctx.drawImage(GodStep.TESTCTX_IMG.texture.baseTexture.source, 0, 0);

                                  var hit = ctx.getImageData(0, 0, 1, 1).data[3] > 1;
                                  ctx.clearRect(0, 0, 2, 2);
                                  c.removeChild(obj);
                                  p.addChildAt(obj, id);
                                  return hit;
                              };
                              GodStep.addMEvent = function(target, type, handle) {
                                   var type1;
                                   var type2;
                                   switch (type) {
                                       case 'up':
                                           type1 = 'mouseup';
                                           type2 = 'touchend';
                                           break;
                                       case 'move':
                                           type1 = 'mousemove';
                                           type2 = 'touchmove';
                                           break;
                                       case 'down':
                                           type1 = 'mousedown';
                                           type2 = 'touchstart';
                                           break;
                                       case 'rightdown':
                                           type1 = 'rightdown';
                                           break;
                                       case 'rightup':
                                           type1 = 'rightup';
                                           break;
                                   }
                                   target[type1] = handle;
                                   target[type2] = handle;
                              };
                              GodStep.addEvent = function(target, type, handle) {
                                  if(!target.addEventListener) {
                                      PIXI.EventTarget.call(target);
                                  }
                                  target.addEventListener(type, handle);
                              };
                              GodStep.dispatch = function(target, type, data, ee) {
                                  var event;
                                  try { // optimize to safari
                                      if(ee) {
                                          event = ee;
                                          ee.type = type;
                                      } else {
                                          event = new Event(type);
                                      }
                                      event.t = target;
                                      event.data = data;
                                      target.dispatchEvent(event);
                                  }
                                  catch (e) {
                                     // jGp.evt.erro = document.createEvent('Event');
                                     // jGp.evt.erro.initEvent("jGp_evtErro", true, true);
                                      event = document.createEvent('Event');
                                      event.t = target;
                                      event.data = data;
                                      event.initEvent(type, true, true);
                                      target.dispatchEvent(event);
                                  }


                                 //  var e = ee ||  new Event(type);// || document.createEvent('CustomEvent');
                                 //  if(ee) ee.type = type;

                              };
                              GodStep.Mejdu.update = function() {
                                  GodStep.UPDATE_TIME = new Date().getTime();
                                  GodStep.UPDATE_DELAY = GodStep.UPDATE_TIME - GodStep.UPDATE_TIME_LAST;
                                  GodStep.UPDATE_DELAY_COEF = 1000/(GodStep.FrameRate || 60)/GodStep.UPDATE_DELAY;
                                  GodStep.UPDATE_DELAY_COEF_INV = 1/GodStep.UPDATE_DELAY_COEF;
                                  if(GodStep.FrameRate) {
                                      setTimeout(GodStep.Mejdu.update, 1000/GodStep.FrameRate);
                                  } else {
                                      window.requestAnimFrame( GodStep.Mejdu.update );
                                  }
                                  for(var i = 0; i<GodStep.UPDATE_LAG;i++) {
                                      this.s = Math.sin(.132313);
                                      this.s = Math.sin(.132313);
                                  }
                                  var framesCount = GodStep.Mejdu.souls.length;
                                  for(var s = 0; s < framesCount; s++) {
                                      var soul = GodStep.Mejdu.souls[s];
                                      soul.update();
                                  }
                                  GodStep.UPDATE_TIME_LAST = GodStep.UPDATE_TIME;
                              };
                              GodStep.Mejdu.render = function() {
                                  var framesCount = GodStep.Mejdu.souls.length;
                                  for(var s = 0; s < framesCount; s++) {
                                      var soul = GodStep.Mejdu.souls[s];
                                      if(soul.rfps) soul.rfps.begin();

                                      if(soul.WEBGL) soul.webgl.render(soul.stage);
                                      if(soul.CANVAS) soul.canvas.render(soul.stage);
                                         soul.postFX();

                                      if(soul.rfps) soul.rfps.end();

                                  }
                                  window.requestAnimFrame( GodStep.Mejdu.render );
                              };

include('lq/Game');             //\\//\\//\\//\\//\\//\\//\\

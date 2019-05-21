//   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//   |||                                                    |||
//   ||  FFFFFF  rrrrr        AAA         mm mm      eeeeee  ||  |||||||||
//   ||  ff      RR  rr      AA AA      mm  M  mm    EE      ||  |       |
//   ||  ffff    RRRRR      aaaaaaa     m   m   m    eeee    ||  |   |||||
//   ||  ff      RR  rr    aa     aa   mm   m   mm   EE      ||  |   |  ||
//   ||  ff      rr    R  aa       aa  mm       mm   eeeeee  ||  |   |||||
//   |||                                                    |||  |||||||||
//   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

            GodStep.Frame = function (name, w, h) {
                PIXI.DisplayObjectContainer.call(this);
                this.frames = [];
                this.W = w;
                this.H = h;
                this.name = name || ('Frame' + GodStep.Frame.frameCount++);
            };
            GodStep.Frame.frameCount = 0;
                pro = GodStep.Frame.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
                pro.addChild = function(child) {
                    this.addChildAt(child, this.children.length);
                    return child;
                };
                pro.addFrame = function(frame, container) {
                  this.frames.push(frame);
                  this.frames[frame.name] = frame;
                  if(container) {
                     container.addChild(frame);
                  }
                  else {
                     this.addChild(frame);
                  }
                  return frame;
                };
                pro.addFrameAt = function(frame, container, index) {
                    this.frames.push(frame);
                    this.frames[frame.name] = frame;
                    if(container) {
                        if(index) {
                            container.addChildAt(frame, index);
                        } else {
                            container.addChild(frame);
                        }
                    }
                    else {
                        if(index) {
                            this.addChildAt(frame, index);
                        } else {
                            this.addChild(frame);
                        }
                    }
                    return frame;
                };
                pro.delFrame = function(frame) {
                    this.frames.splice(this.frames.indexOf(frame), 1);
                    delete this.frames[frame.name];
                    frame.parent.removeChild(frame);
                    return frame;
                };
                pro.setHitArea = function(x, y, w, h, object) {
                    var frame = object || this;
                    frame.interactive = true;
                    frame.hitArea = new PIXI.Rectangle(x, y, w, h);
                };
                pro.destroy = function() {
                    var children = this.children;
                    while(children.length) {
                        this.removeChild(children[0]);
                    }
                    return this;
                };
                pro.destrukt = function() {
                    this.destroy();
                    var p = this.parent;
                    if(p) {
                        if(p.delFrame) {
                            p.delFrame(this);
                        } else {
                            p.removeChild(this);
                        }
                    }
                    return this;
                };
                pro.update = function() {
                    for(var i= 0, frame; frame = this.frames[i]; i++) {
                        frame.update();
                    }
                };
                pro.place = function(x, y) {
                    this.x = x;
                    this.y = y;
                };
                pro.addPoint = function(x, y) {
                   this.ps = this.ps || [];
                   this.ps.push(new PIXI.Point(x, y));
                };
                pro.addWay = function() {
                    var way;
                    this.ways = this.ways || [];
                    this.ways.push(way = new GodStep.Way(new PIXI.Point(0, 0)));
                    way.push(new PIXI.Point(20, 20), 'p');
                    return way;
                };
                pro.isInRect = function(x, y) {
                    return GodStep.Math.isInRect(x, y, this.position.x, this.position.y, this.W, this.H);
                };
                pro.viewOriginal = function() {
                    var i = 0, count = this.children.length - 1;
                    while(i < count) {
                        this.children[i].visible = true;
                        i++;
                    }
                    this.rendered.alpha = 0;
                };
                pro.reCache = function() {
                    var a = this.alpha;
                    var v = this.visible;
                    this.visible = true;
                    this.alpha = 1;
                    this.cacheAsBitmap = false;
                    this.cacheAsBitmap = true;
                    this.visible = v;
                    this.alpha = a;
                };
                pro.setData = function(data) {
                    if(data.lp) {
                        if(!this.loop) {
                            this.loop = new GodStep.Loop();
                    }
                        this.loop.setData(data.lp);

                    }
                    if(data.ws) {
                        this.ways = [];
                        for(var w = 0; w<data.ws.length; w++) {
                            this.ways.push(GodStep.Way.parse(data.ws[w]));
                        }
                    }
                    if(data.fr) {
                        for(var i =0; i<data.fr.length; i++) {
                            var frame = this.frames[data.fr[i].n];
                            if(frame) {
                                frame.setData(data.fr[i]);
                            }
                        }
                    }
                };
                pro.getData = function() {
                    var object = {};
                        object.n = this.name;

                    if(this.loop) {
                        object.lp = this.loop.getData();
                    }
                    if(this.ways) {
                        object.ws = [];
                        for(var w = 0; w<this.ways.length; w++) {
                            object.ws.push(this.ways[w].getData());
                        }
                    }

                    if(this.frames.length > 0) {
                        var fr = [];
                        for(var i = 0; i<this.frames.length; i++) {
                            if(this.frames[i].name.substr(0, 5) != "Frame") {
                                fr.push(this.frames[i].getData());
                            }
                        }
                        if(fr.length > 0) object.fr = fr;
                    }

                    return object;
                };
                pro.resizeRendered = function(w, h) {
                    var needRedraw = false;
                    if(this.renderedTexture.width != w || this.renderedTexture.height != h) {
                        needRedraw = true;
                    }
                    this.renderedTexture.resize(w, h);
                    if(needRedraw) {
                        this.renderThis(-w/2, -h/2);
                        this.rendered.position = new PIXI.Point(-w/2, -h/2);
                    }
                };
                pro.createGraphics = function(gName, container){
                    var g = this[gName || 'graphics'] = new PIXI.Graphics();
                    if(container == undefined) this.addChild(g);
                    else if(container != null) container.addChild(g);
                    return this[gName || 'graphics'];
                    };
                pro.createText = function(text, size, font, align, fill) {
                    return this.addChild(new PIXI.Text(text, {font: ""+ size +"px " + font + "", align: align || "center", fill : fill || '#ffffff'}));
                };
                pro.renderThis = function(offX, offY) {
                        var i = 0;
                        this.lastOffRendered = new PIXI.Point(offX, offY);
                        var child, count = this.children.length-1;
                        var W2 = this.W*.5;
                        var H2 = this.H*.5;
                        this.rendered.alpha = 1;

                        this.rendered.position = new PIXI.Point(offX, offY);
                        while(i < count) {
                            child = this.children[i];
                            child.visible = true;
                            this.renderedTexture.render(child, {x:child.position.x - offX, y:child.position.y - offY}, i==0);
                            child.visible = false;
                            i++;
                    }
                };
                pro.createRendered = function() {
                    this.addChild(this.rendered = new PIXI.Sprite(this.renderedTexture = new PIXI.RenderTexture(this.W, this.H)));
                    return this.rendered;
                };

                pro.roundRect = function(w, h, color, alpha, r, x, y) {
                    var g = this.graphics;// || this.addChild(this.graphics = new PIXI.Graphics());
                    g.beginFill(color, alpha);
                    g.drawRoundedRect(x || 0, y || 0, w, h, r);
                    g.endFill();
                };
                pro.rect = function(w, h, color, alpha, x, y, graphics) {
                    var g = graphics || (this.graphics || this.addChild(this.graphics = new PIXI.Graphics()));
                        g.beginFill(color, alpha || 1);
                        g.drawRect(x || 0, y || 0, w, h);
                        g.endFill();
                };
                pro.redraw = function() {

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
                Object.defineProperty(pro, 'Place', {
                    get: function() {
                        return new PIXI.Point(this.x, this.y);
                    },
                    set: function(value) {
                        this.x = value.x;
                        this.y = value.y;
                    }
                });
                Object.defineProperty(pro, 'IsDown', {
                    get: function() {
                        return this.isDown;
                    },
                    set: function(value) {
                        this.isDown = value;
                    }
                });
                Object.defineProperty(pro, 'IsOver', {
                    get: function() {
                        return this.isOver;
                    },
                    set: function(value) {
                        this.isOver = value;
                    }
                });
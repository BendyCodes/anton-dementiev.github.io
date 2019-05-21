GodStep.Way = function(startPoint, type) {
    this.start   = startPoint || new PIXI.Point();  this.points = [];
    this.push(startPoint, (type == undefined) ? 'p' : type);
    this.start.isStart = true;
    this.curves = [];
    this.position = 0;
};

extend(GodStep.Way, Object);
    pro.clone = function() {
        var way = new GodStep.Way(this.start.clone(), this.start.ctype);
        var len = this.points.length, point;
        for(var p = 1; p<len; p++) {
            point = this.points[p];
            way.push(point.clone(), point.ctype);
        }

        return way;
    };

    pro.offset = function(dx, dy) {
        for(var i = 0; i<this.points.length; i++) {
            this.points[i].x += dx;
            this.points[i].y += dy;
        }
    };
    pro.pushc = function(point) {
        this.push(point, 'c');
    };
    pro.pushp = function(point) {
        this.push(point, 'p');
    };
    pro.push = function(point, type) {
        point.ctype = type;
        this.points.push(point);
    };
    pro.addPoint = function(point, after) {
        for(var i = 0; i<this.points.length; i++) {
            if(this.points[i] == after) {
                var next = this.points[i+1];
                this.points.splice(i + 1, 0, point);
                if(next) {
                    point.x = (this.points[i].x + next.x)*.5;
                    point.y = (this.points[i].y + next.y)*.5;
                } else {
                    point.x = (this.points[i].x + this.start.x)*.5;
                    point.y = (this.points[i].y + this.start.y)*.5;
                }
                point.ctype = this.points[i].ctype;
                return;
            }
        }
    };
    pro.delPoint = function(point) {
        for(var i = 0; i<this.points.length; i++) {
            if(this.points[i] == point) {
                this.points.splice(i, 1);
                return;
            }
        }
    };
    pro.draw = function(graphics, hold) {
        var len = this.points.length;
        var point, next;
        if(hold) graphics.lineTo(this.start.x, this.start.y);
        else {
            if(this.start.ctype == 'c') {
                if(this.points[len-1].ctype == 'c') {
                    graphics.moveTo((this.start.x + this.points[len-1].x)*.5, (this.start.y + this.points[len-1].y)*.5);
                } else {
                    graphics.moveTo((this.points[len-1].x), (this.points[len-1].y));
                }
            } else {
                graphics.moveTo(this.start.x, this.start.y);
            }
        }

        this.points.push(this.points[0]);
        if (len) {
            for (var i=1; i<len; i++) {
                point = this.points[i];
                next = this.points[i+1];

                if(point.ctype == 'c') {
                    if(i == 1) {
                        if(this.start.ctype == 'c') graphics.quadraticCurveTo(this.start.x, this.start.y, (this.start.x + point.x)*.5, (this.start.y + point.y)*.5);
                        if (next.ctype == 'c') {
                            graphics.quadraticCurveTo(point.x, point.y, (this.points[i + 1].x + point.x) * .5, (this.points[i + 1].y + point.y) * .5);
                        } else {
                            graphics.quadraticCurveTo(point.x, point.y, this.points[i + 1].x, this.points[i + 1].y);
                        }
                    } else {
                        if (next.ctype == 'c') {
                            graphics.quadraticCurveTo(point.x, point.y, (this.points[i + 1].x + point.x) * .5, (this.points[i + 1].y + point.y) * .5);
                        } else {
                            graphics.quadraticCurveTo(point.x, point.y, this.points[i + 1].x, this.points[i + 1].y);
                        }
                    }

                } else {
                    if(this.start.ctype == 'c' && i == 1) {
                        graphics.quadraticCurveTo(this.start.x, this.start.y, point.x, point.y);
                    } else
                    graphics.lineTo(point.x, point.y);
                }
            }
        }
        this.points.pop();
    };
    pro.reflect = function(axis) {
        var points = this.points, i;
        switch (axis) {
            case 'x':
                for(i = 0; i<points.length; i++) {
                    points[i].x = - points[i].x;
                }
                break;
            case 'y':
                for(i = 0; i<points.length; i++) {
                    points[i].y = - points[i].y;
                }
               break;

        }
    };
    pro.getData = function() {
        var data = {};
        var p = [];
        var points = this.points;
        var point;
        for(var i = 0; i<points.length; i++) {
            point = points[i];
            p.push({x:parseInt(point.x * 10)/10, y:parseInt(point.y * 10)/10, c:point.ctype});
        }

        data.t = 'w';
        data.p = p;
        return data;
    };
    pro.createCurves = function() {
        if(this.points.length > 1) {
             this.curves = [];
             var curve;
             var start,first;
            var isStartC = false;
            if (this.points[0].ctype == 'c') {
                if(this.points[this.points.length-1].ctype == 'p') {
                    start = this.points[this.points.length-1];
                } else {
                    start = GodStep.Point.middlePoint(this.points[0], this.points[this.points.length-1],.5);
                }
                isStartC = true;
            } else {
                start = this.points[0];
            }
             var end, starti = 0;
             for(var i = 1; i<this.points.length; i++) {
                 if(this.points[i].ctype == 'p') {
                     end = this.points[i];
                     curve = new GodStep.Curve(start, end);
                     for(var j = starti + 1; j<i; j++) {
                         curve.addControl(this.points[j]);
                     }
                     this.curves.push(curve); curve.update();

                     start = end;
                     starti = i;
                 }
             }

            if(starti < this.points.length - 1) {
                if(this.points[this.points.length - 1].ctype == 'c') {
                    if(this.points[0].ctype == 'c') {
                        curve = new GodStep.Curve(start, start);
                    } else {
                        curve = new GodStep.Curve(start, this.points[0]);
                    }
                } else {
                    curve = new GodStep.Curve(start, start);
                }
                if(isStartC) {
                    curve.addControl(this.points[0]);
                }
                for(var k = starti + 1; k<this.points.length; k++) {
                    curve.addControl(this.points[k]);
                }

                this.curves.push(curve); curve.update();
            }
        }
    };

    pro.getFirstPoint = function() {
        return this.points[0];
    };
    pro.getLastPoint = function() {
        return this.points[this.points.length - 1];
    };
    pro.getPoint = function(pos) {
        var time = Math.min(0.999999999, pos);
        var lengths = [];
        var summ = 0;
        for(var i = 0; i<this.curves.length; i++) {
            lengths.push(this.curves[i].getLength());
            summ += lengths[i];
        }
        var cur = 0;
        var last = 0;
        for(var l = 0; l<lengths.length; l++) {
            cur += lengths[l];
            if(cur/summ > time) {
                var t = time * summ;
                var len = cur - last;
                var pos = (time * summ - last)/len;
                return this.curves[l].getPoint(pos);
            }
            last = cur;
        }
        return null
    };
    pro.getBounds = function() {
        var min = new PIXI.Point(GodStep.MAX_INT, GodStep.MAX_INT);
        var max = new PIXI.Point(-GodStep.MAX_INT, -GodStep.MAX_INT);
        var l = this.points.length;
        var p = this.points;
        var point;
        for(var i = 0; i <l; i++) {
            point = p[i];
            min.x = Math.min(point.x, min.x);
            min.y = Math.min(point.y, min.y);
            max.x = Math.max(point.x, max.x);
            max.y = Math.max(point.y, max.y);
        }
        return new PIXI.Rectangle(min.x, min.y, max.x, max.y);
    };
    GodStep.Way.parse = function(data) {
        var points = data.p;
        var point;
        var way = new GodStep.Way(new PIXI.Point(points[0].x, points[0].y), points[0].c);
        for(var i = 1; i<points.length; i++) {
            point = points[i];
            way.push(new PIXI.Point(point.x, point.y), point.c);
        }
        way.createCurves();
        return way;
    };
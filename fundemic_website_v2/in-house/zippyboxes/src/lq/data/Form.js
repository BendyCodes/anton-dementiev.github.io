    GodStep.Form = function() {
        this.elements = [];
    };

    pro = GodStep.Form.prototype = Object.create(Object.prototype);
    pro.update = function() {

    };
    pro.addPoint = function(point, after) {
        var len = this.elements.length, elem;
        for(var i = 0; i<len; i++) {
            elem = this.elements[i];
            elem.addPoint(point, after);
        }
    };
    pro.delPoint = function(point) {
        var len = this.elements.length, elem;
        for(var i = 0; i<len; i++) {
            elem = this.elements[i];
            elem.delPoint(point);
        }
    };
    pro.addElem = function(elem) {
        this.elements.push(elem);
    };
    pro.drawLines = function(graphics) {
        var len = this.elements.length, elem, point;
        var start;
        for(var i = 0; i<len; i++) {
            elem = this.elements[i];
            if(!start) start = elem.points[0];
            for(var p = 0; p<elem.points.length; p++) {
                point = elem.points[p];
                graphics.lineTo(point.x, point.y);
            }
        }

        if(start) graphics.lineTo(start.x, start.y);
    };
    pro.draw = function(graphics) {
        var len = this.elements.length, elem;
        for(var i = 0; i<len; i++) {
            elem = this.elements[i];
            elem.draw(graphics, i > 0);
        }
    };
    pro.clone = function() {
        var form = new GodStep.Form();
        var len = this.elements.length;
        for(var e = 0; e<len; e++) {
            form.addElem(this.elements[e].clone());
        }
        return form;
    };
    pro.getCenter = function() {
        var elemPoints;
        var lt, rb;
        var center;
        for(var e = 0; e<this.elements.length; e++) {
            elemPoints = this.elements[e].points;
            if(elemPoints.length > 2) {
                lt = elemPoints[0];
                rb = elemPoints[1];
                for(var p = 0; p<elemPoints.length; p++) {
                    lt = new PIXI.Point(Math.min(lt.x, elemPoints[p].x), Math.min(lt.y, elemPoints[p].y));
                    rb = new PIXI.Point(Math.max(rb.x, elemPoints[p].x), Math.max(rb.y, elemPoints[p].y));
                }
            }
            if(!center) {
                center = new PIXI.Point((lt.x + rb.x) *.5, (lt.y + rb.y) *.5);
            } else {
                center = new PIXI.Point((center.x + (lt.x + rb.x) *.5) *.5, (center.y + (lt.y + rb.y) *.5) *.5);
            }
        }

        return center;
    };
    pro.setData = function(data) {
         for(var i = 0; i<data.e.length; i++) {
             switch (data.e[i].t) {
                 case 'w':
                     this.addElem(GodStep.Way.parse(data.e[i]));
                     break;
             }

         }
    };
    pro.getData = function() {
        var data = {};
            data.e = [];
        for(var i = 0; i<this.elements.length; i++) {
            data.e.push(this.elements[i].getData());
        }
        return data;
    };
    pro.getBounds = function() {
        var min = new PIXI.Point(GodStep.MAX_INT, GodStep.MAX_INT);
        var max = new PIXI.Point(-GodStep.MAX_INT, -GodStep.MAX_INT);
        for(var e = 0; e<this.elements.length; e++) {
            var b = this.elements[e].getBounds();
            min.x = Math.min(min.x, b.x);
            min.y = Math.min(min.y, b.y);
            max.x = Math.max(max.x, b.width);
            max.y = Math.max(max.y, b.height);
        }

        return new PIXI.Rectangle(min.x, min.y, max.x, max.y);
    };
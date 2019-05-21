    GodStep.Curve = function(startPoint, endPoint) {
    this.start   = startPoint || new PIXI.Point();
    this.end     = endPoint   || new PIXI.Point();
    this.beziers = [];
    this.controls = [];
    this.points = [this.start, this.end];
};

    extend(GodStep.Curve, GodStep.Frame);

    pro.drawBezier = function(target, bezier, move) {
        if (move) {
            target.moveTo(bezier.start.x, bezier.start.y);
        }
        target.quadraticCurveTo(bezier.control.x, bezier.control.y, bezier.end.x, bezier.end.y);
    };

    pro.update = function() {
        var len = this.beziers.length;
        if (len) {
            var prevBezier = this.beziers[0], currentBezier, mid;
            for (var j=1; j<len; j++) {
                currentBezier = this.beziers[j];
                mid = GodStep.Math.middlePoint(prevBezier.control, currentBezier.control, 0.5);
                currentBezier.start.x = mid.x;
                currentBezier.start.y = mid.y;
                prevBezier = currentBezier;
            }
        }
    };

    pro.draw = function(graphics, hold) {
        var len = this.beziers.length;

        this.update();

        if(!hold) graphics.moveTo(this.start.x, this.start.y);
        if (!len) {
            graphics.lineTo(this.end.x, this.end.y);  return;
        }

        var bezier = this.beziers[0];
        this.drawBezier(graphics, bezier, false);

        for (var i=1; i<len; i++) {
            bezier = this.beziers[i];
            this.drawBezier(graphics, bezier, false);
        }

    };
    pro.addControl = function(control) {
        this.controls.push(control);
        this.points.splice(1, 0, control);
        if (control) {
            var newBezier;
            if (this.beziers.length) {
                var lastBezier = this.beziers[this.beziers.length-1];
                    lastBezier.end = new PIXI.Point();
                    newBezier = new GodStep.Bezier(lastBezier.end, control, this.end);
            } else {
                newBezier = new GodStep.Bezier(this.start, control, this.end);
            }
            this.beziers[this.beziers.length] = newBezier;
        }
    };

    pro.getLength = function() {
       // if (!__length_dirty) {
        //    return __length;
       // }
        var __length;
        var len = this.beziers.length;
        if (len) {
            var curveLength = 0;

            for (var i=0; i<len; i++) {
                var bezier = this.beziers[i];
                curveLength += bezier.getLength();
            }
            __length = curveLength;
        } else {
            __length = GodStep.Point.distance(this.start, this.end);
        }
       // __length_dirty = false;
        return __length;
    };
    pro.getPoint = function(time) {
        if (this.controls.length == 0) {
            return new PIXI.Point((this.end.x - this.start.x) * time + this.start.x, (this.end.y - this.start.y) * time + this.start.y);
        }
        var globalEnd = 0;
        var globalStart = 0;
        var globalTime = time * this.getLength();
        for (var b = 0; b < this.beziers.length; b++) {
            globalEnd += this.beziers[b].getLength();
            if (globalEnd >= globalTime) {
                this.lastBezier = this.beziers[b];
                globalStart = globalEnd - this.beziers[b].getLength();
                break;
            }
        }
        var localTime = (globalTime - globalStart)/ (this.lastBezier.getLength());

        return this.lastBezier.getPoint(localTime);
    };
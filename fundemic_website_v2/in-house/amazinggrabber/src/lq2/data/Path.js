GodStep.Path = function(startPoint) {
    this.start   = startPoint || new PIXI.Point();
    this.points = [this.start];
};

    pro = GodStep.Path.prototype = Object.create(Object.prototype);


    pro.push = function(point) {
        this.points.push(point);
    };
    pro.draw = function(graphics, hold) {
        var len = this.points.length;

       if(hold) graphics.lineTo(this.start.x, this.start.y);
       else graphics.moveTo(this.start.x, this.start.y);

        if (len) {
            for (var i=1; i<len; i++) {
                graphics.lineTo(this.points[i].x, this.points[i].y);
            }
        }
    };

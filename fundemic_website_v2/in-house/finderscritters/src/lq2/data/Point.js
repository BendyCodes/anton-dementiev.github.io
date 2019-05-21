    // •
    GodStep.Point = function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };

    pro = Object.prototype = Object.create( Object.prototype );
    pro.clone = function(p) {
        return new GodStep.Point(p.x, p.y, p.z);
    };
    GodStep.Point.getLength = function(point) {
        return Math.sqrt(point.x * point.x + point.y * point.y)
    };
    GodStep.Point.distance2 = function(p1x, p1y, p2x, p2y)  {
        return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
    };
    GodStep.Point.distance = function(p1, p2)  {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    GodStep.Point.middlePoint = function(p1, p2, c)  {
        return new GodStep.Point(p1.x + (p2.x - p1.x)*c, p1.y + (p2.y - p1.y)*c);
    };
    GodStep.Point.getData = function(p) {
        return [parseInt(p.x * 1000) / 1000, parseInt(p.y * 1000) / 1000];
    };
    GodStep.Point.random = function(ix, iy, ax, ay) {
        return new GodStep.Point(ix + Math.random() * ax, iy + Math.random() * ay);
    };
    GodStep.Point.randomR = function(i, a) {
        var r = Math.random();
        return new GodStep.Point(i + r * a, i + r * a);
    };
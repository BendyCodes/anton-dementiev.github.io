include('lq/data/Bezier');
include('lq/data/Curve');
include('lq/data/Path');
include('lq/data/Way');
include('lq/data/Form');

    GodStep.Math = function() { };
    GodStep.Math.middlePoint = function(p1, p2, c)  {
        return new PIXI.Point(p1.x + (p2.x - p1.x)*c, p1.y + (p2.y - p1.y)*c);
    };
    

    GodStep.Math.isInRect = function(x, y, rx, ry, rw, rh)  {
        if(x > rx && y > ry) {
            if(x < rx + rw && y < ry + rh) return true;
        }
        return false;
    };
    GodStep.Math.isBetweenLTRB = function(p, lt, rb)  {
        if(p.x > lt.x && p.y > lt.y) {
            if(p.x < rb.x && p.y < rb.y) return true;
        }
        return false;
    };

    GodStep.Math.rotatePoint = function(p, c, a) {
        return new PIXI.Point(c.x + (p.x - c.x) * Math.cos(a) - (p.y - c.y) * Math.sin(a),
                c.y + (p.y - c.y) * Math.cos(a) + (p.x - c.x) * Math.sin(a));
    };

    // зацикливает value[0-1] с периодом period
    GodStep.Math.cycle = function(value, period) {
        var d = 1/period;
        return (value/d - parseInt(value/d));
    };
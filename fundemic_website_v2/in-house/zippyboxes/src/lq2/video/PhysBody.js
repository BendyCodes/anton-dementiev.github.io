GodStep.PhysBody = function(body) {
    this.body = body;
    body.p_body = this;
    GodStep.Frame.call(this, 'PhysFrame');
    this.createGraphics();
    this.redraw();
};
extend(GodStep.PhysBody, GodStep.Frame);

pro.move = function() {
    var b2s = this.body.m_world.b2s;
    var p = this.body.GetPosition();
    this.place(p.x * b2s, p.y * b2s);
    this.rotation = this.body.GetAngle();///360 * Math.PI;
};
pro.redraw = function() {
    this.cacheAsBitmap = false;
    var g = this.graphics;
        g.clear();
        g.beginFill(0xffffff, 1);
        g.beginFill(0x0, .5);
    var body = this.body;

    var b2s = this.body.m_world.b2s;

    var shape = body.GetFixtureList().m_shape;
    if(shape.m_type == box2d.b2ShapeType.e_circleShape) {
        g.drawCircle(0, 0, shape.m_radius * b2s);
    } else {
        var vertics = body.GetFixtureList().m_shape.m_vertices;
        g.moveTo(b2s * (vertics[0].x), b2s * (vertics[0].y));
        for(var v = 1; v<vertics.length/2; v++) {
            g.lineTo(b2s*(vertics[v].x), b2s*(vertics[v].y));
        }
    }
    this.cacheAsBitmap = true;
};
pro.GetAngle = function() {
   return this.body.GetAngle();
};

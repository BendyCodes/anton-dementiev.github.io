GS.PhysFrame = function(soul, b2scale) {
    GS.LFrame.call(this, soul);
    this.timeStep = 1 / 60;
    this.velocityIterations = 6;
    this.positionIterations = 2;
    this.gravity = new box2d.b2Vec2(0, 10);
    this.space = new box2d.b2World(this.gravity);
    this.space.b2s = this.b2s = b2scale * this.s;
    this.space.ib2s = this.ib2s = 1/this.b2s;

    this.physBodies = [];

};
extend(GS.PhysFrame, GS.LFrame);
GS.PhysFrame.entityCategory = [
    GS.PhysFrame.GROUP_1 =   0x0001,
    GS.PhysFrame.GROUP_2 =     0x0002,
    GS.PhysFrame.GROUP_3 =        0x0004,
    GS.PhysFrame.GROUP_4 =      0x0008,
    GS.PhysFrame.GROUP_5 =    0x0010
];

pro.createBox = function(x, y, w, h, isStatic, filter) {
    var ib2s = this.ib2s;
    var bodyDef = new box2d.b2BodyDef();
        bodyDef.type = isStatic ? box2d.b2BodyType.b2_staticBody : box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(x *  ib2s, y *  ib2s);
    var dynamicBox = new box2d.b2PolygonShape();
    dynamicBox.SetAsBox(w *  ib2s, h *  ib2s);
    var fixtureDef = new box2d.b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.3;
    if(filter) {
        fixtureDef.filter.categoryBits = filter[0];
        fixtureDef.filter.maskBits = filter[1];
    }

    var body = this.space.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
    var pb = new GodStep.PhysBody(body);

    this.physBodies.push(pb);
    this.addFrame(pb); pb.move();
    return pb;
};
pro.createPoly = function(points, anti, isStatic) {
    var ib2s = this.ib2s;
    var vertices = [];//new Vector.<b2Vec2>();
    var array = [];
    var i, v;
    if (anti)
        for (i = 0; i < points.length; i++) {
            vertices.push(new box2d.b2Vec2(-points[i].x * ib2s, points[i].y * ib2s));
        } else
        for (i = 0; i < points.length; i++) {
            vertices.push(new box2d.b2Vec2(points[i].x * ib2s, points[i].y * ib2s));
        }

    var c = new box2d.b2Vec2();
    var centroid = box2d.b2PolygonShape.ComputeCentroid(vertices, vertices.length, c);

    for (v = 0; v < vertices.length; v++) {
        array.push(new box2d.b2Vec2(vertices[v].x - centroid.x, vertices[v].y - centroid.y));
    }

    var shape = new box2d.b2PolygonShape();
        shape.Set(array, vertices.length);

    var bd = new box2d.b2BodyDef();
        bd.position.Set(155*  ib2s, 155 *  ib2s);

    bd.type = isStatic ? box2d.b2BodyType.b2_staticBody : box2d.b2BodyType.b2_dynamicBody;
    var f = new box2d.b2FixtureDef();
        f.restitution = 0;
        f.density = 1;
        f.friction = 0.3;
        f.shape = shape;

    var body = this.space.CreateBody(bd);
        body.CreateFixture(f);

    var pb = new GodStep.PhysBody(body);

    this.physBodies.push(pb);
    this.addFrame(pb); pb.move();
    return pb;
};
pro.createCircle = function(x, y, r, isStatic) {
    var ib2s = this.ib2s;
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = isStatic ? box2d.b2BodyType.b2_staticBody : box2d.b2BodyType.b2_dynamicBody;
    bodyDef.position.Set(x *  ib2s, y *  ib2s);
    var circleShape = new box2d.b2CircleShape(r*  ib2s);
    var fixtureDef = new box2d.b2FixtureDef();
    fixtureDef.shape = circleShape;
    fixtureDef.density = 1;
    fixtureDef.friction = 0.3;

    var body = this.space.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);
    var pb = new GodStep.PhysBody(body);

    this.physBodies.push(pb);
    this.addFrame(pb); pb.move();
    return pb;
};

pro.createJoint = function(body1, body2, lower, upper, anchor, enableLimit, enableMotor) {
    var el = (enableLimit) ? true : false;
    var jd = new box2d.b2RevoluteJointDef();
    var pos1 = body1.body.GetPosition().Clone();
    var pos2 = body2.body.GetPosition().Clone();

    jd.enableMotor = enableMotor;
    jd.enableLimit = el;
    jd.lowerAngle = lower/(180/Math.PI);
    jd.upperAngle = upper/(180/Math.PI);
    jd.collideConnected = false;

    if (anchor)	 jd.Initialize(body1.body, body2.body, new box2d.b2Vec2(anchor.x  *  this.ib2s, anchor.y  *  this.ib2s));
    else jd.Initialize(body1.body, body2.body, new box2d.b2Vec2((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2));

    return this.space.CreateJoint(jd);
};
pro.update = function() {
    this.space.Step(this.timeStep, this.velocityIterations, this.positionIterations);

    for(var b in this.physBodies) {
        this.physBodies[b].move();
    }
};
this.world = new box2d.b2World(new box2d.b2Vec2(0, -10));
var bodyDef = new box2d.b2BodyDef();
bodyDef.type = box2d.b2BodyType.b2_dynamicBody;

var dynamicBox = new box2d.b2PolygonShape();
dynamicBox.SetAsBox(1, 1);

var fixtureDef = new box2d.b2FixtureDef();
fixtureDef.shape = dynamicBox;
fixtureDef.density = 1;
fixtureDef.friction = 0.3;

this.body = this.world.CreateBody(bodyDef);
this.body.CreateFixture(fixtureDef);



var timeStep = 1 / 60;
var velocityIterations = 6;
var positionIterations = 2;
this.world.Step(timeStep, velocityIterations, positionIterations);
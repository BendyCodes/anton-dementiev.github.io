AG.Hand = function(gameplay) {
    this.gameplay = gameplay;
    GodStep.Frame.call(this, 'Hand');
    this.rotation = 0;//-Math.PI * .1;

    this.startS = gameplay.startS;
    this.collideRaduis = 190;

    this.addChild(this.img1 = new AG.Img('arm_1', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.addChild(this.img2 = new AG.Img('arm_2', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.addChild(this.img3 = new AG.Img('arm_3', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.addChild(this.slots = new PIXI.DisplayObjectContainer()); this.slots.y += 15 * gameplay.startS;
    this.slots.addChild(this.slot1 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slots.addChild(this.slot2 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slots.addChild(this.slot4_1 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slots.addChild(this.slot4_2 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slots.addChild(this.slot4_3 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slots.addChild(this.slot3_1 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slots.addChild(this.slot3_2 = new AG.Img('empty', gameplay.startS, -gameplay.W *.33, gameplay.H *.09, 0.5));
    this.slot3_2.visible = this.slot4_2.visible = this.slot4_3.visible = false;
    this.img2.visible = this.img3.visible = false;
   // this.createGraphics();
  //  this.redraw();

    this.A = gameplay.startS * 15;
    this.phase = 0;

};

extend(AG.Hand, GodStep.Frame);

pro.equip = function(data, isEquip) {
   switch (data[2]) {
       case 'arm1':
           this.slot1.setImg((isEquip) ? data[3][0] : 'empty');
           break;
       case 'arm2':
           this.slot2.setImg((isEquip) ? data[3][0] : 'empty');
           break;
       case 'arm3':
           this.slot3_1.setImg((isEquip) ? data[3][0] : 'empty');
           this.slot3_2.setImg((isEquip) ? data[3][1] : 'empty');
           break;
       case 'arm4':
           this.slot4_1.setImg((isEquip) ? data[3][0] : 'empty');
           this.slot4_2.setImg((isEquip) ? data[3][1] : 'empty');
           this.slot4_3.setImg((isEquip) ? data[3][2] : 'empty');
           break;
   }
};
pro.setState = function(state) {
    this.state = state;
   switch(state) {
       case 0:
           this.slot4_1.visible = this.slot3_1.visible =
               this.img1.visible = true;
           this.slot4_2.visible = this.slot4_3.visible = this.slot3_2.visible =
               this.img2.visible =
           this.img3.visible = false;
           break;
       case 1:
           this.slot4_2.visible = this.slot3_1.visible = this.img2.visible = true;
           this.slot3_2.visible = this.slot4_1.visible = this.slot4_3.visible = this.img1.visible =
               this.img3.visible = false;
           break;
       case 2:
           this.slot4_3.visible = this.slot3_2.visible = this.img3.visible = true;
           this.slot3_1.visible = this.slot4_2.visible = this.slot4_1.visible = this.img2.visible =
               this.img1.visible = false;
           break;
   }
};
pro.collide = function(prize) {
    var distance = GodStep.Point.distance(new PIXI.Point(prize.x, prize.y), new PIXI.Point(this.x, this.y));
    return (distance < (prize.collideRaduis + this.collideRaduis) * this.startS && prize.life < 0);
};
pro.redraw = function() {
    var g = this.graphics;
    var s = this.gameplay.startS;
    g.clear();
    g.beginFill(0xffffff, .1);
    g.drawCircle(0, 0, this.collideRaduis * s);
    g.drawRect(-800 * s, -40 * s, 800 * s, 80 * s);
    g.endFill();
};
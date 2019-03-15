AG.Face = function(gameplay) {
    this.gameplay = gameplay;
    GodStep.Frame.call(this, 'Face');

    var dy = .35;
    this.isWrongEyes = false;
    var s = gameplay.startS, w = gameplay.W, h = gameplay.H;
    this.addChild(this.static = new PIXI.DisplayObjectContainer());
    this.static.addChild(this.head = new AG.Img('head', s, w *.5, h * dy, .5));
    this.static.addChild(this.eyesBack1 = new AG.Img('eyes_1', s, w *.5, h *dy,.5));
    this.static.addChild(this.eyesBack2 = new AG.Img('eyes_2', s, w *.5, h *dy,.5));
    this.static.addChild(this.eyesBack3 = new AG.Img('eyes_3', s, w *.5, h *dy,.5));
    this.static.addChild(this.eyesBack4 = new AG.Img('eyes_4', s, w *.5, h *dy,.5));
   // this.static.cacheAsBitmap = true;
    this.addChild(this.eyes = new AG.Img('eyes_1_1', s, w *.5, h * dy, .5)); this.eyes.startPoint = new PIXI.Point(this.eyes.x, this.eyes.y);
    this.addChild(this.eyes2 = new AG.Img('eyes_4_1', s, w *.5, h * dy, .5)); this.eyes2.startPoint = new PIXI.Point(this.eyes2.x, this.eyes2.y);



    this.addChild(this.slots1 = new PIXI.DisplayObjectContainer()); this.slots1.y += 15 * s;
    this.slots1.addChild(this.slot4_1 = new AG.Img('mouth_1', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_2 = new AG.Img('mouth_2', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_3 = new AG.Img('mouth_3', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_4 = new AG.Img('mouth_4', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_5 = new AG.Img('mouth_5_1', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_6 = new AG.Img('mouth_5_2', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_7 = new AG.Img('mouth_5_3', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot4_8 = new AG.Img('mouth_5_4', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot1 = new AG.Img('empty', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot2 = new AG.Img('empty', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot3 = new AG.Img('empty', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot5 = new AG.Img('empty', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot6 = new AG.Img('empty', s, w *.5, h * dy, .5));
    this.slots1.addChild(this.slot7 = new AG.Img('empty', s, w *.5, h * dy, .5));

    this.eyesBack4.visible = this.eyesBack3.visible = this.eyesBack2.visible = this.eyes2.visible = false;
    this.setState(1);
    this.eyeDistanceMax = 28 * s;

}; extend(AG.Face, GodStep.Frame);

pro.setState = function(state) {
  //  this.static.cacheAsBitmap = false;
   // this.slots1.cacheAsBitmap = false;
    // mouth
    if(state < 8) {
            var isEyesView = false;
            for(var i = 0; i<8; i++) {
                if(!this.isWrongEyes) {
                    if (this['eyesBack' + (i + 1)]) {
                        if (i == state - 1) {
                            isEyesView = true;
                        }
                        this['eyesBack' + (i + 1)].visible = (i == state - 1);
                    }
                }
                this['slot4_' + (i + 1)].visible = (i == state - 1);
            }

            if(!isEyesView) {
                this.eyesBack1.visible = true;
            }
            this.eyes.visible = this.eyesBack1.visible;
            this.eyes2.visible = this.eyesBack4.visible;

    } else {

    }

 //   this.static.cacheAsBitmap = true;
 //   this.slots1.cacheAsBitmap = true;

};
pro.init = function() {
    this.eyes2.visible  = this.eyesBack4.visible = false;
    this.eyesBack1.visible = true;
};
pro.equip = function(data, isEquip) {
    switch (data[2]) {
        case 'head1':
            this.eyesBack2.setImg('eyes_2');
            this.eyesBack3.setImg('eyes_3');
            this.eyesBack4.setImg('eyes_4');
            this.eyes2.setImg('eyes_4_1');

             this.eyesBack1.setImg((isEquip) ? data[3][0] : 'eyes_1');
             this.eyes.setImg((isEquip) ? data[3][1] : 'eyes_1_1');
             this.isWrongEyes = isEquip;
            break;
        case 'head2':
            this.slot2.setImg((isEquip) ? data[3][0] : 'empty');
            break;
        case 'head3':
            this.slot3.setImg((isEquip) ? data[3][0] : 'empty');
            break;
        case 'head4':
            this.slot4_1.setImg((isEquip) ? data[3][0] : 'mouth_1');
            this.slot4_2.setImg((isEquip) ? data[3][1] : 'mouth_2');
            this.slot4_3.setImg((isEquip) ? data[3][2] : 'mouth_3');
            this.slot4_4.setImg((isEquip) ? data[3][3] : 'mouth_4');
            this.slot4_5.setImg((isEquip) ? data[3][4] : 'mouth_5_1');
            this.slot4_6.setImg((isEquip) ? data[3][5] : 'mouth_5_2');
            this.slot4_7.setImg((isEquip) ? data[3][6] : 'mouth_5_3');
            this.slot4_8.setImg((isEquip) ? data[3][7] : 'mouth_5_4');
            break;
        case 'head5':
            this.slot5.setImg((isEquip) ? data[3][0] : 'empty');
            break;
        case 'head6':
            this.slot6.setImg((isEquip) ? data[3][0] : 'empty');
            break;
        case 'head7':
            this.slot7.setImg((isEquip) ? data[3][0] : 'empty');
            break;
        case 'head8':
            this.isWrongEyes = false;
            this.eyesBack1.setImg((isEquip) ? data[3][0] : 'eyes_1');
            this.eyesBack2.setImg((isEquip) ? data[3][1] : 'eyes_2');
            this.eyesBack3.setImg((isEquip) ? data[3][2] : 'eyes_3');
            this.eyesBack4.setImg((isEquip) ? data[3][3] : 'eyes_4');
            this.eyes2.setImg((isEquip) ? 'empty' : 'eyes_4_1');
            this.eyes.setImg((isEquip) ? 'empty': 'eyes_1_1');
            break;
    }
};
pro.eyesTo = function(prize) {
    if(prize) {
        var pp = new PIXI.Point(prize.x, prize.y);
        var pe = new PIXI.Point(this.x + this.eyes.startPoint.x, this.y + this.eyes.startPoint.y);

        var a = Math.atan2(pe.y - pp.y, pe.x - pp.x) + Math.PI/2;
        this.eyes2.x = this.eyes.x += (this.eyes.startPoint.x - Math.sin(a) * this.eyeDistanceMax - this.eyes.x) * .1;
        this.eyes2.y = this.eyes.y += (this.eyes.startPoint.y +  Math.cos(a) * this.eyeDistanceMax - this.eyes.y) * .1;
    }
};


SS.Player = function(parent) {
    this.p = parent;
    GodStep.Frame.call(this, 'Player', 1, 1);
    var cc = .15;
    this.runTimer = 0;
    parent.addChildAt(this.backArm = new SS.Img('back_arm_2', parent.s, 0, 0,.5), 5);
    this.addChild(this.a_bubble = new SS.MovieClip(['bubble_2'], parent.s, 0, 0,.5));
    this.addChild(this.a_stay = new SS.MovieClip(['stay_2'], parent.s, 0, 0,.5));
    this.addChild(this.a_run = new SS.MovieClip(['run_1_1', 'run_1_2'], parent.s, 0, 0,.5));
    this.addChild(this.a_end = new SS.MovieClip(['end_1', 'end_2'], parent.s, 0, 0, new PIXI.Point(.5,.5)));
    this.addChild(this.a_fall = new SS.MovieClip(['fail_1', 'fail_2', 'fail_3'], parent.s, 0, 0, new PIXI.Point(.5,.5)));


    this.a_bubble.scale.x = this.a_end.scale.x = -this.a_end.scale.x;
    this.a_run.visible = false;
    this.a_bubble.visible = false;
    this.a_run.animTime = 10;
    this.a_end.animTime = 20;


    // items
    this.addChild(this.item_1 = new SS.MovieClip(['2run_icon_1', '2stay_icon_1', 'fail_icon_1', '2end_icon_1',  'icon_1_bubble'], parent.s, 0, 0,.5));
    this.addChild(this.item_2 = new SS.MovieClip(['2stay_run_icon_2', '2stay_run_icon_2', 'fail_icon_2', '2end_icon_2',  'icon_2_bubble'], parent.s, 0, 0,.5));
    this.addChild(this.item_3 = new SS.MovieClip(['2stay_run_icon_3', '2stay_run_icon_3', 'fail_icon_3', '2end_icon_3',  'icon_3_bubble'], parent.s, 0, 0,.5));
    this.addChild(this.item_4 = new SS.MovieClip(['2stay_run_icon_4', '2stay_run_icon_4', 'fail_icon_3', '2end_icon_3',  'icon_4_bubble'], parent.s, 0, 0,.5));
    this.addChild(this.item_5 = new SS.MovieClip(['2stay_run_icon_3', '2stay_run_icon_3', 'fail_icon_3', '2end_icon_3',  'icon_5_bubble'], parent.s, 0, 0,.5));
   this.item_1.visible = false;
     this.item_2.visible = false;
     this.item_3.visible = false;
    this.item_4.visible = false;
     this.item_5.visible = false;
};
extend(SS.Player, GodStep.Frame);


pro.bubble = function() {
    this.a_bubble.visible = true;
    this.a_run.visible = false;
    this.a_stay.visible = false;
    this.item_1.setToFrame(4);
    this.item_2.setToFrame(4);
    this.item_3.setToFrame(4);
    this.item_4.setToFrame(4);
    this.item_5.setToFrame(4);

};
pro.fall = function() {
    this.a_fall.visible = true;
    this.a_run.visible = false;
    this.a_stay.visible = false;
    this.item_1.setToFrame(2);
    this.item_2.setToFrame(2);
    this.item_3.setToFrame(2);
    this.item_4.setToFrame(2);
    this.item_5.setToFrame(2);
};

pro.end = function() {
    this.a_end.visible = true;
    this.a_run.visible = false;
    this.a_stay.visible = false;
    this.item_1.setToFrame(3);
    this.item_2.setToFrame(3);
    this.item_3.setToFrame(3);
    this.item_4.setToFrame(3);
    this.item_5.setToFrame(3);

};
pro.turn = function(v) {
    this.scale.x = v;
    this.runTimer = 0;
    this.backArm.scale.x = v * this.p.s;
};
pro.init = function() {
    this.turn(1);
    this.stay();
    this.a_fall.visible = false;
    this.a_bubble.visible = false;
    this.a_end.visible = false;

    var player = SS.ChinUpShinUp.instance.PLAYER;
    for(var i =0; i<5; i++) {
        this['item_' + (i+1)].visible = player.items[i];
    }
};
pro.stay = function() {
    this.a_bubble.visible = false;
    this.a_stay.visible = true;
    this.a_run.visible = false;
    this.backArm.visible = true;
    this.item_1.setToFrame(1);
    this.item_2.setToFrame(1);
    this.item_3.setToFrame(1);
    this.item_4.setToFrame(1);
    this.item_5.setToFrame(1);

};
pro.run = function() {
    this.runTimer = 15;
    this.backArm.visible = false;
    this.a_stay.visible = false;
    this.a_run.visible = true;
    this.item_1.setToFrame(0);
    this.item_2.setToFrame(0);

};
pro.update = function() {
    if(this.a_fall.visible) {
        this.a_fall.animate();
    }
    if(this.a_end.visible) {
        this.a_end.animate();
    }
    if(this.runTimer > 0) {
        this.runTimer--;
        this.a_run.animate();
        if(!this.a_fall.visible && ! this.a_bubble.visible && this.runTimer == 0) {
            this.stay();
        }
    }

    this.backArm.x = this.x + this.parent.x;
    this.backArm.y = this.y + this.parent.y;
};

Object.defineProperty(pro, 'Visible', {
    set: function(value) {
        this.backArm.visible =
            this.visible = value;
    }
});
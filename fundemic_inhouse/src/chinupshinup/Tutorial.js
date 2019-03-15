SS.Tutorial = function(parent) {
    this.soul = parent.soul;
    GodStep.LFrame.call(this, parent.soul, 'GamePlay');
    this.addChild(this.a_left = new SS.MovieClip(['button_1_off', 'button_1_on'], parent.s, -this.soul.W *.11, 0,.5));
    this.addChild(this.a_right = new SS.MovieClip(['button_2_on', 'button_2_off'], parent.s, this.soul.W *.11, 0,.5));

    this.a_left.animTime = this.a_right.animTime = 15;
    this.x = this.soul.W * .5;
    this.y = this.soul.H * .87;
    this.visible = true;
};
extend(SS.Tutorial, GodStep.LFrame);

pro.update = function() {
   this.a_left.animate();
   this.a_right.animate();
};
SS.Enemy = function(parent) {
    GodStep.Frame.call(this, 'Enemy');
    var cc = .15;
  //  this.rect(parent.W *cc, parent.W *cc, 0xff0000, 1, - parent.W * cc/2, -parent.W * cc/2);
    this.addChild(this.a_stay = new SS.MovieClip(['sheriff_1', 'sheriff_2'], parent.s, 0, 0,.5));
    this.animTime = 6;

};
extend(SS.Enemy, GodStep.Frame);

pro.update = function() {
   this.a_stay.animate();
};
pro.turn = function(v) {
    this.scale.x = -v;
};
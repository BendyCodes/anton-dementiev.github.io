PS.Transmission = function(soul) {
    this.soul = soul;
    Games.Transmission.call(this, soul,.09, 0xffffff);
   // this.createGraphics();
   // this.rect(soul.W, soul.H, GodStep.COLOR_STAGE , 1, 0, 0);
};
extend(PS.Transmission, Games.Transmission);

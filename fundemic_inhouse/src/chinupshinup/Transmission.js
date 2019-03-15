SS.Transmission = function(soul) {
    this.soul = soul;
    Games.Transmission.call(this, soul,.09, 0x33CCFF);
};
extend(SS.Transmission, Games.Transmission);

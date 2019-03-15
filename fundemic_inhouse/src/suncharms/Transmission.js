M3.Transmission = function(soul) {
    this.soul = soul;
    Games.Transmission.call(this, soul,.09, 0xffff55);
};
extend(M3.Transmission, Games.Transmission);

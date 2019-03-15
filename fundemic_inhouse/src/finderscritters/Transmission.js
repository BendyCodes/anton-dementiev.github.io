PR.Transmission = function(soul) {
    this.soul = soul;
    Games.Transmission.call(this, soul,.09, 0xa11655);
};
extend(PR.Transmission, Games.Transmission);

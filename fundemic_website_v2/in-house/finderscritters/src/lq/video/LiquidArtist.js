
GodStep.LiquidArtist = function() {

};

extend(GodStep.LiquidArtist, Object);

GodStep.LiquidArtist.render = function(lq) {
    var commands = lq.commands;
    var commandsCount = commands.length;
    for (var c = 0; c < commandsCount; c++) {
        commands.apply(this);
    }
};

GodStep.LiquidArtist.init = function() {
    GodStep.LiquidArtist.instance = new GodStep.LiquidArtist();
};

GodStep.LiquidArtist.init();
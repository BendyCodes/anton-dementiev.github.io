include('lq/data/Point');
include('lq/data/Command');
include('lq/data/Color');
include('lq/video/LiquidArtist');

GodStep.Liquid = function(name, w, h) {
    GodStep.Frame.call(this, 'Liquid', name, w, h);
};

extend(GodStep.Liquid, GodStep.Frame);



pro.redraw = function() {
    var commands = this.commands;
    var commandsCount = commands.length;
    for (var c = 0; c < commandsCount; c++) {
        commands.apply(this);
    }
};
pro.setData = function (data) {

};
pro.getData = function () {
    var data = {};

    data.v = GodStep.Liquid.getData(this.values, null);
    data.c = GodStep.Liquid.getData(this.colors, GodStep.Color);
    data.C = GodStep.Liquid.getData(this.commands, GodStep.Command);
    data.p = GodStep.Liquid.getData(this.points, GodStep.Point);

    return data;
};
pro.update = function () {
    GodStep.Frame.prototype.update.call(this);
};

GodStep.Liquid.getData = function (data, Class) {
    if(data) {
        var i, l = data.length, s = [];
        for(i=0; i<l; i++) {
            s.push(Class.getData(data[i]));
        }
    }
    return s;
};

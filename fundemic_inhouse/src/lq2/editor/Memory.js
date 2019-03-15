GodStep.Memory = function (soul){
    GodStep.Frame.call(this, 'Memory');
    GodStep.IHTML.call(this);

    this.rect(20, 30, 0xffffff, 1, 60, 0, this.marker);

    this.soul = soul;
    this.div = soul.div;
    this.textData = this.addTextArea(null, soul.W-20, soul.H-20, 10, 10);
    this.hide();

};

pro = GodStep.Memory.prototype = Object.create( GodStep.Frame.prototype );

pro.getData = function() {
    var frames = this.soul.frames;
    var main = {};
        main.name = this.soul.name;
        main.frames = [];

    for(var i = 0; i<frames.length; i++) {
        main.frames.push(frames[i].getData());
    }
    return JSON.stringify(main);
};
pro.hide = function() {
    this.visible = false;
    this.textData.style.visibility = 'hidden';
};
pro.show = function() {
    this.visible = true;
    this.textData.style.visibility = 'visible';
    this.textData.disabled  = true;

    this.textData.value = this.getData();
    this.textData.focus();
    this.textData.select();

};


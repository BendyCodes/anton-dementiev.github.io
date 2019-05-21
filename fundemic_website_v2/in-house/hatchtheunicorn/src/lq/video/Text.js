
GodStep.Text = function (t, size, font, align, color) {
    this.font = font || 'Arial';
    this.size = size || 15;
    this.align = (align || "center");
    PIXI.Text.call(this, t, {font: this.size + "px " + this.font, align: this.align, fill: (color) ? ('#' + color.toString(16)) : '#000000'});
};
extend(GodStep.Text, PIXI.Text);

pro.place = function(x, y) {
   this.x = x;
    this.y = y;
};
pro.centerX = function(w, y) {
    this.y = y;
    this.x =  w/2 - this.width/2;
};
pro.setColor = function(color) {
    this.style.fill = '#' + color.toString(16);
};
pro.setFont = function(font) {
    this.font = font;
    this.style.font =  this.size + 'px ' + this.font;
    this.updateText();
};
pro.setSize = function(size) {
    this.size = size;
    this.style.font =  this.size + 'px ' + this.font;
    this.updateText();
};
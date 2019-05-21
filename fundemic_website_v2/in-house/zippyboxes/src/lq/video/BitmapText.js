GodStep.BitmapText = function(text, size, x, y, align, tint, font) {
    PIXI.BitmapText.call(this, text, {font: parseInt(size) + "px " + (font ? font : "Font"), align: align || "left"});
    this.x = x;
    this.y = y;
    if(tint) this.tint = tint;
    this.updateText();
};

extend(GodStep.BitmapText, PIXI.BitmapText);

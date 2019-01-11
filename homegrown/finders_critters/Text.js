PR.Text = function(text, size, x, y, align, tint) {
    PIXI.BitmapText.call(this, text, {font: parseInt(size) + "px Font", align: align || "left"});
    this.x = x;
    this.y = y;
    if(tint) this.tint = tint;
    this.updateText();
};

extend(PR.Text, PIXI.BitmapText);

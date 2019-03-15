
    // •
    GodStep.Color = function(r, g, b) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.calcHex();
    };
    extend(GodStep.Color, Object);
    pro.add = function(a) {
        with(this) {
            r += a;
            g += a;
            b += a;

            r = Math.max(0, Math.min(r, 255));
            g = Math.max(0, Math.min(g, 255));
            b = Math.max(0, Math.min(b, 255));
        }
        return this;
    };
    pro.grayscale = function() {
      //  this.r = 0.21 * this.r;
     //   this.g = 0.72 * this.g;
     //  this.b = 0.07 * this.b;
      //  return this;

        var gr = (this.r + this.g + this.b)/3;
        this.r = gr;
        this.g = gr;
        this.b = gr;
        return this;
    };
    pro.calcHex = function() {
        var h;
        with(this) {
            h = ((r << 16) + (g << 8) + b);
        }
        this.hex = h;
        return h;
    };
    pro.clone = function(c) {
        return new GodStep.Color(c.r,c.g,c.b);
    };
    pro.mix = function(c, percent) {
         var ip = 1 - percent;
         this.r = parseInt(c.r * percent + this.r * ip);
         this.g = parseInt(c.g * percent + this.g * ip);
         this.b = parseInt(c.b * percent + this.b * ip);
    };
    GodStep.Color.getData = function() {
        return this.calcHex().toString(16);
    };
    GodStep.Color.fromHEX = function(hex) {
        return new GodStep.Color((hex >> 16) & 255, (hex >> 8) & 255, hex & 255);
    };
    GodStep.Color.random = function() {
        return new GodStep.Color(parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255))
    };
AG.Prize = function(gameplay, chance, addSpeed, x, y) {
    GodStep.Frame.call(this, 'Face');


    var s = gameplay.startS;
    this.GW = gameplay.W;
    this.GH = gameplay.H;
    this.sx = this.sy = 0;
    this.x = gameplay.soul.W / gameplay.scale.x * x;
    this.y = gameplay.soul.OH * y - gameplay.y;
    this.collideRaduis = 10;
    this.life = 1;
    this.gravity = gameplay.cristalGravity/100;
    this.isFall = false;
    if(chance == -2) {
        this.type = 'x2';
    } else
    if(chance == -1) {
        this.type = 'cristal';
        trace('cristal');
    } else
    if(chance < gameplay.prize1Chance) {
        this.type = 'worm';
    } else if(chance < gameplay.prize2Chance) {
        this.type = 'fish';
    } else if(chance < gameplay.prize3Chance) {
        this.type = 'bear';
    } else if(chance < gameplay.prize4Chance) {
        this.type = 'candy';
    }

    this.createGraphics();
    var ss = .76;
    this.gdx = .1;

    switch (this.type) {
        case 'worm':
            this.speed =  addSpeed;
            this.price = .5;
            this.collideRaduis = 50*s;
            this.addChild(this.art = new AG.MovieClip(['worm_1', 'worm_2', 'worm_3', 'worm_4', 'worm_5', 'worm_6', 'worm_7', 'worm_8'], s * ss , 0, 0, 0.5));
            this.art.phase = 1;
            this.art.grab_name = 'worm_grab';
            break;
        case 'fish':
            this.speed = addSpeed;
            this.price = 1;
            this.collideRaduis = 50*s;
            this.addChild(this.art = new AG.MovieClip(['fish_1', 'fish_2', 'fish_3', 'fish_4', 'fish_5', 'fish_6'], s * ss, 0, 0, 0.5));
            this.art.phase = 1;
            this.art.grab_name = 'fish_grab';
            break;
        case 'candy':
            this.speed =  addSpeed;
            this.price = 10;
            this.collideRaduis = 50*s;
            this.addChild(this.art = new AG.MovieClip(['candy_1', 'candy_2', 'candy_3', 'candy_4', 'candy_5', 'candy_6', 'candy_7', 'candy_8'], s * ss, 0, 0, 0.5));
            this.art.phase = 1;
            this.art.grab_name = 'candy_grab';
            break;
        case 'bear':
            this.speed =  addSpeed;
            this.price = 5;
            this.collideRaduis = 50*s;
            this.addChild(this.art = new AG.MovieClip(['bear_1', 'bear_2', 'bear_3', 'bear_4', 'bear_5', 'bear_6'], s * ss, 0, 0, 0.5));
            this.art.phase = 1;
            this.art.grab_name = 'bear_grab';
            break;
        case 'cristal':
            this.speed = -addSpeed ;
            this.speedX = -addSpeed/3;
            this.price = 50;
            this.life = 77;
            this.collideRaduis = 50*s;
            this.gdx = .075;
            this.addChild(this.art2 = new AG.MovieClip(['tail_1', 'tail_2', 'tail_3', 'tail_4'], s * ss, 0, 0, new PIXI.Point(0.3, 0.0)));
            this.addChild(this.art = new AG.MovieClip(['jewel'], s * ss, 0, 0, 0.5));
            this.art2.phase = 1;
            this.art.phase = 1;
            this.art2.sScale = this.art2.scale.x;
            this.art.grab_name = 'jewel';
            break;
        case 'x2':
            this.collideRaduis = 40*s;
            this.startSpeed = this.speed = -addSpeed * 1.7;
            this.speedX = -addSpeed * Math.random() + addSpeed/2;
            this.price = 'x2';
            this.life = 20;
            this.addChild(this.art = new AG.MovieClip(['x2'], s * ss, 0, 0, 0.5));
            break;
    }


}; extend(AG.Prize, GodStep.Frame);

pro.getGrab = function() {
    if(this.art) {
        var img = new AG.Img(this.art.grab_name, this.art.startS/  AG.SCALE, 0, 0,.5);
        img.x = this.x;
        img.y = this.y;
        return img;
    } else {
        return null;
    }
};
pro.destroy = function() {
    this.removeChild(this.graphics);
    if(this.art2) {
        this.removeChild(this.art2);
    }
    if(this.art) {
        this.removeChild(this.art);
    }
    return this;
};
pro.fade = function() {
  this.alpha += (0 - this.alpha ) * .1;
};
pro.move = function(delta) {
    this.life--;
    if(this.art2) {
        this.art2.phase -= AG.FRAME_RATE * 10;
        if(this.art2.phase < 0) {
            this.art2.phase = 1;
            this.art2.nextFrame();
        }
        this.art2.scale.y = Math.max(this.art2.sScale *.9, Math.abs(this.speed *.9));
        this.art2.rotation = Math.atan2(this.sy, this.sx) + Math.PI/2;
    }
    if(this.art) {
        this.art.phase -= AG.FRAME_RATE * 10;
        if(this.art.phase < 0) {
            this.art.phase = 1;
            this.art.nextFrame();
        }
    }
    var s = this.speed * delta;
    if(this.type == 'cristal') {
        this.sy = this.speed * delta;
        this.sx = this.speedX * delta;
        this.speed += this.gravity;
        this.x -= Math.abs(this.sx) * this.GW;
        this.y += this.sy * this.GH;
    } else
    if(this.type == 'x2') {
        this.sy = this.speed * delta;
        this.sx = this.speedX * delta;
        this.speed += this.gravity;
        if(this.y > this.GH * .93) {
            this.speed = this.startSpeed;
        }

        if(this.x > this.GW * .975 || this.x < this.GW * .025) {
            this.speedX = -this.speedX;
            this.sx = this.speedX * delta;
        }
        this.x += this.sx * this.GW;
        this.y += this.sy * this.GH;
    } else {
        if(!this.isFall) {
            this.speed += 0.005;
            this.y += s * this.GH;
        }
    }
};
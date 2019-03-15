AG.Safe = function(gameplay) {
    GodStep.Frame.call(this, 'Face');
    this.gameplay = gameplay;

    this.damages = [];
    this.addChild(this.art = new AG.MovieClip(['safe_1', 'safe_2'], gameplay.startS, 0, 0, 0));
    this.artX = this.art.x = -this.art.width;
    this.damageCursor = 0;
    this.addChild(this.damage2 = new AG.MovieClip(['2_damage_1', '2_damage_2', '2_damage_3', '2_damage_4', '2_damage_5', '2_damage_6'], gameplay.startS, 0, 0, 0));
    for(var i = 0; i<3; i++) {
        var damage;
        this.addChild(damage = new AG.MovieClip(['1_damage_1', '1_damage_2', '1_damage_3', '1_damage_4', '1_damage_5'], gameplay.startS, 0, 0, 0));
        this.damages.push(damage); damage.visible = false;
        damage.phase = 0;
        damage.x = this.art.x;
    }
    this.damage2.x = this.art.x;

    this.visible = true;
    this.damage2.visible = false;
    this.art.visible = false;
    this.fadeTimer = 25
}; extend(AG.Safe, GodStep.Frame);

pro.update = function() {
    if(this.isLife == false) {
        this.fadeTimer--;
        if(this.fadeTimer == 0) {
            this.visible = false;
        }
    }
    if(this.art.visible || this.damage2.visible) {
        var damage, l = this.damages.length;
        for(var i = 0; i<l; i++) {
            damage = this.damages[i];
            if(damage.visible) {
                damage.phase -= AG.FRAME_RATE * 15;
                if(damage.phase < 0) {
                    damage.phase = 1;
                    damage.nextFrame();
                    if(damage.currentFrame == 0) damage.visible = false;
                }
            }
        }
        this.art.x += (this.artX - this.art.x) * .2;
        if(this.damage2.visible) {
            this.damage2.phase -= AG.FRAME_RATE * 15;
            if(this.damage2.phase < 0) {
                this.damage2.phase = 1;
                this.damage2.nextFrame();
                if(this.damage2.currentFrame == 2) {
                    this.art.visible = false;
                }
                if(this.damage2.currentFrame == 0) this.damage2.visible = false;
            }
        }
    }


};
pro.stop = function() {
    this.fadeTimer = 25;

    this.artX = this.art.width/2;
    this.isLife = false;
    trace('safe stoped');
};
pro.init = function() {
    this.fadeTimer = 25;
    this.alpha = 1;
    this.art.setToFrame(0);
    this.art.x = this.art.width/2;
    this.visible = true;
    this.artX = this.art.x = -this.art.width;
    this.isLife = true;
    this.damage2.phase = 0;
    this.damageCursor = 0;
    for(var i = 0; i<this.damages.length; i++) {
        this.damages[i].phase = 0;
        this.damages[i].visible = false;
    }
    this.damage2.visible = false;
    this.art.visible = true;
    this.hits = this.gameplay.hitCountSafe;

};
pro.damage = function() {
    if(this.isLife && this.artX - this.art.x < 5) {
        this.hits--;
        trace('safe DAMAGE  ' + this.hits);

        //this.alpha = this.hits/this.maxHits;
        this.damages[this.damageCursor].visible = true;
        this.damages[this.damageCursor].phase = 0;
        this.damages[this.damageCursor].setToFrame(0);
        this.damageCursor++;
        if(this.damageCursor == this.damages.length) this.damageCursor = 0;

        if(this.hits == 1) {
            this.art.setToFrame(1);
        }
        GodStep.playSound('vault', 0, AG.SOUND);

        if(this.hits == 0) {
            this.fadeTimer = 25;
            trace('safe killed');
            this.isLife = false;
            for(var i = 0; i<this.damages.length; i++) {
                this.damages[i].visible = false;
            }
            this.damage2.setToFrame(0);
            this.damage2.visible = true;
            this.damage2.phase = 0;
            GodStep.playSound('daimond_fly', 0, AG.SOUND);

            return true;
        }
     }
     return false;
};
PS.CellObject = function(name, S, alias, cell, rotate, isShadow) {
    var type = (name == 'playerB' || name == 'playerR') ? 'player': name;
    GodStep.Frame.call(this, type);
    this.typeName = name;
    this.startS = S * PS.CELL_SCALE;
    trace(name + " " + alias);
    var aid = alias + 1;
    this.nextRotation = this.rotateAngle = rotate || 0;
    var cID, pers;
    if(name == 'player' || name == 'playerB' || name == 'playerR') {
        cID = parseInt(Math.random() * PS.CellObject.PERS.length);
        pers = PS.CellObject.PERS[cID]; PS.CellObject.PERS.splice(cID, 1);
    }

    switch (name) {
        case 'star':
            this.addFrame(this.img = new PS.Img('key_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            break;
        case 'player':
            this.addFrame(this.img = new PS.Img('box_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.character = new PS.Img(pers, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.doors = new PS.MovieClip(aid, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.icon = new PS.Img('arrow' + aid + "_" + (this.rotateAngle + 1), this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.keyhole = new PS.Img('keyhole_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            break;
        case 'playerR':
            this.addFrame(this.img = new PS.Img('box_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.character = new PS.Img(pers, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.doors = new PS.MovieClip(aid, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.icon = new PS.Img('reaktiw_' + (this.rotateAngle + 1), this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.keyhole = new PS.Img('keyhole_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            break;
        case 'playerB':
            this.addFrame(this.img = new PS.Img('box_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.character = new PS.Img(pers, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.doors = new PS.MovieClip(aid, this.startS, cell.W/2, cell.H/2,.5));
            this.addFrame(this.keyhole = new PS.Img('keyhole_' + aid, this.startS, cell.W/2, cell.H/2,.5));
            break;
        case 'arrow':
            this.addFrame(this.img = new PS.Img('turn1_' + (this.rotateAngle + 1), this.startS, cell.W/2, cell.H/2,.5));
            break;
        case 'teleport':
            this.addFrame(this.img = new PS.Img('teleport', this.startS, cell.W/2, cell.H/2,.5));
            break;
    }

    trace('char ' + cID);
    this.animatePhase2 = 0;
    this.animatePhase1 = 0;
    this.animatePhase3 = 0;
    this.alias = alias;
    this.cell = cell;
    this.countTeleportations = 0;
    if(this.keyhole) {
        this.doors.visible = this.character.visible = this.keyhole.visible = false;
    }
    if(isShadow == null){
        cell.guests.push(this);
    }
    this.applyCellPostion(true);

};
extend(PS.CellObject, GodStep.Frame);

PS.CellObject.COLORS = [0x0000ff, 0xff0000, 0x00ff00, 0xffff88, 0xff00ff];

pro.animate2 = function() {
    if(this.isFinished ) {
        this.animatePhase3++;
        if(this.animatePhase3 < 50) {
            this.keyhole.visible = true;
            if(this.icon) this.icon.visible = false;
        } else {
            this.keyhole.visible = false;
            if(this.icon) this.icon.visible = true;
        }

        if(this.animatePhase3 > 100) {
            this.animatePhase3 = 0;
        }
    }
};
pro.animate = function() {

    if(this.icon) this.icon.visible = false;
    this.keyhole.alpha = Math.max(0, 1 - this.animatePhase1/45);
    if(this.animatePhase1++ > 45) {
        if(!this.startPos) {
            this.startPos = new PIXI.Point(this.x, this.y);
        }
        this.scale.x = this.scale.y += (1.15 - this.scale.x) * .05;
        this.x = this.startPos.x - this.doors.width * .5 * (this.scale.x - 1);
        this.y = this.startPos.y - this.doors.width * .5 * (this.scale.x - 1);
        if(this.animatePhase2 == 5) {
            this.animatePhase2 = 0;
            if( this.doors.currentFrame < this.doors.frames.length-1) {
                this.doors.nextFrame();
                this.doors.visible = true;
            } else {
                this.doors.visible = false;
            }
        }
        if( this.doors.currentFrame < this.doors.frames.length) {
            this.animatePhase2++;
        }
    }
};
pro.applyRotation = function() {

    switch (this.typeName) {
        case 'player':
            this.icon.setTexture('arrow' + (this.alias + 1) + "_" + (this.nextRotation + 1));
            break;
        case 'playerR':
            this.icon.setTexture('reaktiw_' + (this.nextRotation + 1));
            break;
        case 'arrow':
            this.img.setTexture('turn1_' + (this.nextRotation + 1));
            break;
    }
};
pro.setAsFinished = function(isOk) {
    this.isFinished = isOk;
    if(this.keyhole) {
        this.doors.visible = this.character.visible = this.keyhole.visible = isOk;
    }
    if(this.icon) {
        this.icon.visible = !isOk;
    }
};
pro.applyCellPostion = function(now) {
    this.nextPlace = new PIXI.Point(this.cell.x, this.cell.y);
    if(now) {
        this.Place = this.nextPlace;
    }
    if(this.tpCell) {
        this.Place = new PIXI.Point(this.tpCell.x, this.tpCell.y);
    }
    this.rotateAngle = this.nextRotation;
    trace(this.rotateAngle);
};
pro.destroy = function() {
    if(this.character) {
        this.removeChild(this.character);
    }
    if(this.keyhole) {
        this.removeChild(this.keyhole);
    }
    if(this.icon) {
        this.removeChild(this.icon);
    }
    this.cell.guests.splice(this.cell.guests.indexOf(this), 1);

    this.removeChild(this.img);
    return this;
};
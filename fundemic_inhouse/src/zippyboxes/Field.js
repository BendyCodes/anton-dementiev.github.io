PS.Field = function(soul, xc, yc) {
    Games.CellField.call(this, soul, xc, yc, soul.W *.95, soul.W *.95, PS.Cell, soul.startS);
    this.cellObjects = [];
    this.soul = soul;
    this.players = [];
    this.shadows = [];
    this.teleports = [];
    this.stars = [];
    this.arrows = [];
}; extend(PS.Field, Games.CellField);

pro.rotateCellObject = function(cell) {
    var o;
    for(var i = 0; i<this.cellObjects.length; i++) {
        o = this.cellObjects[i];
        if(o.cell.name == cell.name) {
            if(o.name == 'player' || o.name == 'arrow') {
                o.rotateAngle++;
                if(o.rotateAngle > 3) o.rotateAngle = 0;
                o.applyRotation();
               // o.img.rotation = Math.PI/2 * o.rotateAngle;
            }

        }
    }

};
pro.clear = function() {
    while(this.shadows.length) {
        this.objectContainer.removeChild(this.shadows[0].destroy());
        this.shadows.splice(0, 1);
    }
    this.players = [];
    this.teleports = [];
    this.stars = [];
    this.arrows = [];

    while(this.cellObjects.length) {
       this.delFrame(this.cellObjects[0].destroy());
       this.cellObjects.splice(0, 1);
    }

};
pro.setData = function(d) {
    this.clear();

    if(d) {
        var S = this.soul.startS;
        for(var i = 0; i< d.length;i++) {
            var o = d[i];
            if(o.id) {

            } else {
                this.addCellObject(new PS.CellObject(o.name, this.soul.startS, o.alias, this.cells[o.xi + o.yi * this.cellCountY], o.rotate));
            }
        }
    }
};
pro.getData = function() {
    var objects = [];

    for(var i =0; i<this.cellObjects.length; i++) {
        var o = this.cellObjects[i];
        var od = {name: o.typeName, xi: o.cell.xi, yi: o.cell.yi, rotate: o.rotateAngle, alias: o.alias};
        objects.push(od);
    }

    return objects;
};
pro.initTutor = function(ok) {
    for(var i = 0; i<5; i++) {
        for(var j = 0; j<5; j++) {
            if(i> 0 && i < 4 && j==2) {
            //    this.cellsXY[i][j].visible = ok;
            } else {
                this.cellsXY[i][j].visible = !ok;
            }
        }
    }
};
pro.delCellObject = function(cell) {
    var o;
    for(var i = 0; i<this.cellObjects.length; i++) {
        o = this.cellObjects[i];
        if(o.cell.name == cell.name) {
            if(o.name == 'teleport') {
                this.teleports.splice(this.teleports.indexOf(o), 1);
            }
            this.cellObjects.splice(this.cellObjects.indexOf(o), 1);
            this.delFrame(o);
            i--;
        }
    }

};
pro.addCellObject = function(ob) {
    var o;
    var isFound;
    switch(ob.name) {
        case 'player':
        case 'playerR':
        case 'playerB':
            this.players.push(ob);
            break;
        case 'arrow':
            this.arrows.push(ob);
            break;
        case 'teleport':
            this.teleports.push(ob);
            break;
        case 'star':
            this.stars.push(ob);
            break;
    }
    for(var i = 0; i<this.cellObjects.length; i++) {
        o = this.cellObjects[i];
        if(o.cell.name == ob.cell.name) {
            isFound = true;
        }
    }
    if(!isFound) {
        if(ob.name == 'player' || ob.name == 'playerR' || ob.name == 'playerB') {
            this.cellObjects.push(ob);
        } else {
            this.cellObjects.splice(0, 0, ob);
        }
        if(ob.name == 'teleport') {
            this.addFrameAt(ob, this.objectContainer, 0);
        } else {
            if(ob.name == 'arrow' || ob.name == 'star') {
                this.addFrameAt(ob, this.objectContainer, 0);
            } else {
                this.addFrameAt(ob, this.objectContainer, this.objectContainer.children.length);
            }
        }
    }

};
pro.delShadow = function(player) {
    var shadow = player.shadow;
    this.objectContainer.removeChild(shadow);
    this.shadows.splice(this.shadows.indexOf(shadow), 1);
    player.shadow = null;

};
pro.addShadow = function(player, teleport) {
    var shadow = new PS.CellObject(player.typeName, this.soul.startS, player.alias, player.lastCell, player.rotateAngle, true);
    player.shadow = shadow;
    player.countTeleportations++;
    shadow.teleport = teleport;
    this.objectContainer.addChildAt(shadow, this.objectContainer.children.length - this.teleports.length-1);
    this.shadows.push(shadow);

};
pro.h_cells = function(e) {
    var t = e.target;
    var p = t.parent.parent;
    switch (e.type) {
        case Games.CELL_DOWN:
            dispatch(p, Games.CELL_CLICK, t);
            break;
    }
};

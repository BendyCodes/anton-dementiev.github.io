PR.Cell = function(xi, yi, w, h, s) {
    Games.Cell.call(this, xi, yi, w, h);
    this.xi = xi;
    this.yi = yi;
    this.guests = [];
    var id = (((yi * 9 + xi) % 2 == 0) ? '2' : '1');
    this.addChild(this.img = new Games.Img('cube_back_' + id, s * PR.CELL_SCALE_BACK * 1.18, this.W *.5, this.H *.5, .5));
    this.addFrame(this.label = new PR.Text('100', 75 * s, 0, 0, 'left', 0x100000));
    this.label.visible = false;

};

PR.Cell.STANDART = ['red', 'yellow', 'blue', 'purple', 'green'];
extend(PR.Cell, Games.Cell);

pro.clear = function() {
     for(var i = 0; i<this.guests.length; i++) {
         this.guests[i].parent.parent.delCellObject(this.guests[i]);
     }
    this.guests = [];
    this.isSelected = false;
};
pro.isEmpty = function() {
    return this.guests.length == 0;
};
pro.isDynamic = function() {
    for(var i = 0; i < this.guests.length; i++) {
        if(this.guests[i].isDynamic) {
            return true;
        }
    }
    return false;
};
pro.getColored = function() {
    for(var i = 0; i < this.guests.length; i++) {
        if(this.guests[i].isColored) {
            return this.guests[i];
        }
    }
    return null;
};
pro.replaceColored = function(color) {
    var guest = this.getColored();
    if(guest) {
        if(guest.isColored) {
            var field = guest.parent.parent;
            field.delCellObject(guest);
            this.guests.splice(this.guests.indexOf(guest), 1);
            var co;
            field.addCellObject(co = new PR.CellObject(color, guest.S, this));
            co.applyCellPostion(true);
        }
    }
};
pro.replaceCellObjects = function(cell) {
   var c1 = this.guests[0];
   var c2 = cell.guests[0];
    this.guests[0] = c2;
    cell.guests[0] = c1;

    c1.cell = cell;
    c2.cell = this;
    c1.applyCellPostion(true);
    c2.applyCellPostion(true);
};
pro.isBusy = function() {
   for(var i = 0; i < this.guests.length; i++) {
       if(this.guests[i].isObject) {
           return true;
       }
   }
    return false;
};
pro.pushGuest = function(o) {
    this.guests.push(o);
};
pro.delGuest = function(o) {
    this.guests.splice(this.guests.indexOf(o), 1);
};
pro.setAsGuest = function(o) {
    if(o.name == 'player') {
        this.guests.push(o);
    } else {
        this.guests.splice(0, 0, o);
    }

    o.cell.guests.splice(o.cell.guests.indexOf(o), 1);
    o.cell = this;
};
pro.setAsSelected = function(ok) {
    var guests = this.guests;
    var length = guests.length;
    var guest;
    for(var i = 0; i<length;i++) {
        guest = guests[i];
        if (guest.isColored) {
            guest.setAsSelected(ok);
            this.isSelected = ok;
        }
    }
    return this.isSelected;
};
pro.isEqual = function(cell) {
    var object, i, object2;
    for(i = 0; i<this.guests.length; i++) {
        if(this.guests[i].isDynamic) {
            object = this.guests[i];
        }
    }
    for(i = 0; i<cell.guests.length; i++) {
        if(cell.guests[i].isDynamic) {
            object2 = cell.guests[i];
        }
    }

    return (object.typeName == object2.typeName);
};
pro.getBonus = function() {
    var g;
    for(var i = 0; i < this.guests.length; i++) {
        g = this.guests[i];
        if(g.isBomb) {
            return g;
        }
        if(g.isBonus) {
            return g;
        }
    }
    return null;
};
pro.removeDirt = function() {
    var i, obj;
    var guests = this.guests;
    for(i = 0; i<guests.length; i++) {
        obj = guests[i];
        if(obj.isDirt) {
            if(PR.JUST_DIRT_DELETE == 0) {
                PR.JUST_DIRT_DELETE = 5;
                GodStep.playSound('dirt', 0, PR.SOUND);
            }

            obj.isKill = true;
            this.setCost(500);
            return obj;
        }
    }
    return null;
};

pro.getObject = function(){
    return this.guests[0];
};
pro.animate = function() {
    if(this.label.visible) {
        this.label.alpha += (0 - this.label.alpha) * .04;
        this.label.y -= this.W * .007;
        if(this.label.alpha < 0.05) {
            this.label.visible = false;
        }
    }
};
pro.setCost = function(c) {
    this.cost = c;
    this.label.alpha = 1;
    this.label.visible = true;
    this.label.setText(c + '');
    this.label.updateText();
    this.label.x = this.W/2 - this.label.width/2;
    this.label.y = this.label.height/2;
};
Object.defineProperty(pro, 'Selected', {
    get: function() {
        return isSelected;
    },
    set: function(value) {
        var obj = this.getObject();
        if(obj) {
            obj.scale.x = obj.scale.y = (value) ? 1.1 : 1;
            obj.applyCellPostion(true);
            obj.deltaXY = -this.W * (1 - obj.scale.x) * .5;
            this.isSelected = value;

        }
    }
});

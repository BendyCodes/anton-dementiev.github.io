AG.ItemIcon = function(itemDesc, parent, x, y, id) {
    GodStep.Frame.call(this, 'ItemIcon');

    var s = parent.startS;
    this.addChild(this.back = new AG.Img('field_icons', s, 0, 0,.5));
    this.addChild(this.shadow = new AG.Img('icons_shadow', s, 0, 0,.5));
    this.addChild(this.lock = new AG.Img('icons_lock', s, 0, 0,.5));
    this.addChild(this.icon = new AG.Img(itemDesc[1], s, 0, 0,.5));
    this.addChild(this.offBack = new AG.Img('field_icons_off', s, 0, 0,.5));
    this.addChild(this.label = new AG.Text(itemDesc[0] + "\n ", 75 * s, -(this.icon.width - 3)/2, this.icon.height/2 - 22 * s, 'center', 0xffffff));
    this.label.x = 0 - this.label.width/2;
    this.icon.visible = false;
    this.offBack.visible = false;
    this.cacheAsBitmap = true;
    this.x = x;
    this.y = y;
    this.isLocked = true;
   // this.isPurchased = true;

    this.data = itemDesc;

    GodStep.IDownUp.call(this, 0, 0);
    this.setHitArea(-this.back.width/2, -this.back.height/2, this.back.width, this.back.height);
};
extend(AG.ItemIcon, GodStep.Frame);

pro.getCost = function() {
    var cost = AG.AmazingGrabber.getCostByLevel(this.data[4]);
   return cost;
};
pro.purchase = function() {
    this.isPurchased = true;
};
pro.equip = function() {
    this.cacheAsBitmap = false;
    this.offBack.visible = !this.offBack.visible;
    this.isEquip = !this.offBack.visible;
    this.gameplay.equip(this.data, this.isEquip);

    this.cacheAsBitmap = true;
};
pro.locked = function() {
    this.cacheAsBitmap = false;
    this.isLocked = true;
    this.isPurchased = false;
    this.lock.visible = true;
    this.offBack.visible = false;
    this.icon.visible = false;
    this.cacheAsBitmap = true;
    this.gameplay.equip(this.data, false);

};
pro.unlock = function() {
    if(this.isLocked) {
        this.cacheAsBitmap = false;
        this.isLocked = false;
        this.lock.visible = false;
        this.offBack.visible = true;
        this.icon.visible = true;
        this.cacheAsBitmap = true;
    }
};
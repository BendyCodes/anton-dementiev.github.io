SS.Dialog = function(parent, size) {
    GodStep.Frame.call(this, 'Dialog', parent.W *.7, parent.W *.4);
    GodStep.IDownUp.call(this, parent.W, parent.H);
    this.soul = parent.soul;

    this.x = parent.W * .5;
    this.y = parent.W * .543;

    this.p = parent;
    this.soul = parent.soul;
    this.s = parent.s;
    this.setHitArea(-parent.W, -parent.H, parent.W * 2, parent.H * 2);
    this.addChild(this.back = new SS.Img('back_up', parent.s, 0, 0, .5));
    this.back.scale.y *= 2;
    this.back.y -= this.H * .5;
    this.addChild(this.popUp = new SS.Img('field_up', parent.s, 0, 0, .5));
    this.addChild(this.b_no = new SS.ImgButton('button_up', this, parent.W *.16, parent.H *.05, 'NO', 130, 0, parent.H *.049));
    this.addChild(this.b_yes = new SS.ImgButton('button_up', this, -parent.W *.16, parent.H*.05, 'YES', 130, 0, parent.H *.049));


    this.addChild(this.message = new SS.Text('', (size || 110) * this.s * 3, 0, -parent.H *.16, 'center', 0xA35200));
    this.message.y = - parent.H * .16;
    this.visible = false;
    this.message.alpha = .7;

    GodStep.IDownUp.call(this.back, parent.W, parent.H);
    this.back.hitArea = new PIXI.Rectangle(-parent.W/2 / parent.s, 0, parent.W / parent.s, parent.H / parent.s);


    addEvent(this.b_no, SS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_yes, SS.ImgButton.CLICK, this.h_buttons);
};
extend(SS.Dialog, GodStep.Frame);

pro.show = function(message, callbackYES, callbackNO) {
    this.visible = true;
    this.message.setText(message);
    this.message.updateText();
    this.message.x = -this.message.width/2;
    this.yesCallBack = callbackYES;
    this.noCallBack = callbackNO;
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    if(p.visible) {
        switch (t) {
            case p.b_no:
                p.isYes = false;
                p.noCallBack(p);
                p.visible = false;
                break;
            case p.b_yes:
                p.isYes = true;
                p.yesCallBack(p);
                p.visible = false;
                break;
        }
    }
};


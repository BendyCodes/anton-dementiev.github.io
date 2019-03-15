AG.Dialog = function(parent, back, popUp, size, size2, size3) {
    GodStep.Frame.call(this, 'Shop', parent.W *.7, parent.W *.4);
    GodStep.IDownUp.call(this, parent.W, parent.H);

    this.x = parent.W * .5;
    this.y = parent.W * .6;

    this.p = parent;
    this.soul = parent.soul;
    this.startS = parent.startS;
    this.setHitArea(-parent.W, -parent.H, parent.W * 2, parent.H * 2);
    this.addChild(this.popUp = new AG.Img(popUp, parent.startS, 0, 0,.5));
    this.addChild(this.back = new AG.Img(back, parent.startS, 0, 0,.5));
    this.addChild(this.b_yes = new AG.ImgButton('b_y_n', 'b_y_n_shadow', 1.0, this, parent.startS, parent.W *.14, parent.H *.1, AG.S('yes'), 150, 0, parent.H *.040));
    this.addChild(this.b_no = new AG.ImgButton('b_y_n', 'b_y_n_shadow', 1.0, this, parent.startS, -parent.W *.14, parent.H*.1, AG.S('no'), 150, 0, parent.H *.040));
    this.b_yes.shadow.y = this.b_no.shadow.y -= parent.H *.02;
    this.soul = parent.soul;
    this.addChild(this.costIcon = new AG.Img('coin', parent.startS *.9, parent.W *.1, - parent.H *.005,.5));
    this.costIcon.visible = false;
    this.addChild(this.title = new AG.Text('', (size3 || 150) * this.startS, 0, parent.H *.05, 'center'));
    this.addChild(this.message = new AG.Text('', (size || size2 || 150) * this.startS, 0, parent.H *.075, 'center'));
    this.addChild(this.messageCost = new AG.Text('', (size || 150) * this.startS, 0, parent.H *.13, 'center'));
    this.title.y = - parent.H * .2;
    this.message.y = - parent.H * .09;
    this.visible = false;
    this.messageCost.alpha = this.message.alpha = .7;

    addEvent(this.b_no, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_yes, AG.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);


};
extend(AG.Dialog, GodStep.Frame);


pro.show = function(title, message, callbackYES, callbackNO, cost) {
    this.visible = true;
    this.title.setText(title.replace('\n', ' '));
    this.message.setText(message);
    this.title.updateText();
    this.title.y = -this.p.H  *.17 - this.title.height/2;
    this.message.updateText();
    this.title.x = -this.title.width/2;
    this.message.x = -this.message.width/2;
    this.yesCallBack = callbackYES;
    this.noCallBack = callbackNO;

    if(this.W/2 < this.message.width ) {
        var words = this.message.text.split(' ');
        var finishText = ''; var isPerenos = false;
        for(var w = 0; w < words.length; w++) {
            if(w > words.length * .5) {
                if(!isPerenos) {
                    isPerenos = true;
                    finishText += '\n';
                }
            }
            finishText += words[w] + " ";
        }
        this.message.text = finishText;
        this.message.updateText();
        this.message.x = -this.message.width/2;
    }

    switch (this.okType) {
        case 'buing':
            this.costIcon.visible = true;
            this.messageCost.setText(cost + "?");
            this.message.y = - this.parent.H * .13;
            this.messageCost.y = this.message.y + this.parent.H * .07;
            this.messageCost.updateText();
            this.messageCost.visible = true;
            this.messageCost.x = - this.messageCost.width/2 + this.parent.W * .04;
            this.costIcon.x = this.messageCost.x - this.parent.W * .04;
            break;
        default:
            this.messageCost.visible = this.costIcon.visible = false;
            this.message.y = - this.parent.H * .09;
            break;
    }
};
pro.h_buttons = function(e) {
    var t = e.content.t;
    var p = t.parent;
    if(p.visible) {
        switch (t) {
            case p.b_no:
                p.noCallBack(p);
                p.visible = false;
                break;
            case p.b_yes:
                p.yesCallBack(p);
                p.visible = false;
                break;
        }
    }
};

pro.h_mouse = function(e) {
    var t = e.content.target;
    if(t) {
        switch (e.type) {
            case GodStep.FRAME_UP:
                if(t.soul) {
                    t.b_no.isDown = false;
                    t.b_yes.isDown = false;
                    t.b_no.Scale = 1;
                    t.b_yes.Scale = 1;
                }
                break;
        }
    }
};

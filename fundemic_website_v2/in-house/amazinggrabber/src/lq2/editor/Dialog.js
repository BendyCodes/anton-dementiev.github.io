GodStep.Dialog = function (soul) {
    this.soul = soul;
    GodStep.Frame.call(this, "Dialog");

    this.rect(soul.W, soul.H, 0, .5, 0, 0);
    this.windowRect = this.addChild(new PIXI.Graphics());
    this.messageText = this.createText('message', 30, 'Arial', 'left');
};

    pro = GodStep.Dialog.prototype = Object.create(GodStep.Frame.prototype);
    pro.view = function() {
        this.visible = true;
        this.alpha = 1;
    };
    pro.update = function() {
        if(this.visible) {
            if(this.outTime) {
                this.outTime -= 0.1;
                if(this.outTime < 0) {
                    this.alpha -= .1;
                    if(this.alpha < 0) {
                        this.alpha = 0;
                        this.outTime = null;
                        this.visible = false;
                    }
                }
            }
        }
    };
    pro.out = function(outTime) {
        this.outTime = outTime;
    };
    pro.setMessage = function(message) {
        trace(message);
        this.messageText.setText(message);
        this.messageText.updateText();
        this.messageText.position.x = this.soul.W/2 - this.messageText.width/2;
        this.messageText.position.y = this.soul.H/2 - this.messageText.height/2;
    };

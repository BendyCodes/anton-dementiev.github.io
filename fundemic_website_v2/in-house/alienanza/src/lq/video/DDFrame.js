// liquid uploader frame

GodStep.DDFrame = function (mejdu, w, h) {
    GodStep.Frame.call(this, mejdu);

    this.W = w;
    this.H = h;

    if (typeof(window.FileReader) == 'undefined') {
        this.rect(w, h, 0x990000,.8); trace(GodStep.ERR_FILEAPI)
    } else {
        this.rect(w, h, 0x003300,.5);
    }
};


    pro = GodStep.DDFrame.prototype = Object.create( GodStep.Frame.prototype );

    pro.dropOver = function(x, y) {
        for(var i= 0, frame; frame = this.frames[i]; i++) {
            if(frame instanceof GodStep.DDFrame) {
                frame.dropOver(x - this.position.x, y - this.position.y);
            }
        }

       if(this.isInRect(x, y)) {
            if(!this.IsOver) {
                this.IsOver = true;
            }
       } else {
           if(this.IsOver) {
               this.IsOver = false;
           }
       }
    };
    pro.dropFiles = function(files, x, y) {
        for(var i= 0, frame; frame = this.frames[i]; i++) {
            if(frame instanceof GodStep.DDFrame) {
                frame.dropFiles(files, x - this.position.x, y - this.position.y);
            }
        }
        if(this.isInRect(x, y)) {
            this.applyFiles(files);
        }
    };
    Object.defineProperty(GodStep.DDFrame.prototype, 'IsOver', {
        get: function() {
            return this.isOver;
        },
        set: function(value) {
            this.isOver = value;
        }
    });
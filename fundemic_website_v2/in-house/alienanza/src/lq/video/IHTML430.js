GodStep.IHTML430 = function (soul) {
    this.soul = soul;
    this.coms = [];

    this.addInput = function(text, className, handle, x, y, w, h, fontsize, placeholder, op) {
        var view = this.soul.renderer.view;
        var input = document.createElement('input');
        if(placeholder) {
            input.placeholder = placeholder;
        }
        input.style.opacity = isNaN(op) ? .5 : op;
        input.className = className;
        input.style['font-size'] = (fontsize || 24) + 'px';
        input.style.position = "absolute";
        input.style.zIndex = "1000";
        input.style.left = (view.offsetLeft + (x || 0)) + 'px';
        input.style.top = (view.offsetTop + (y || 0)) + 'px';
        input.value = text;
        input.style.width = (w || 100) + "px";
        input.style.height = (h || 100) + "px";

        input.onkeypress = handle;
        input.soul = this.soul;
        input.target = this;
        this.soul.div.appendChild(input);
        input.__proto__.resize = function (x, y, w, h, t) {
            if(x) {
                this.style.left = parseInt(x) + 'px';
            }
            if(y) {
                this.style.top = parseInt(y) + 'px';
            }
            if(w) {
                this.style.width = parseInt(w) + 'px';
            }
            if(h) {
                this.style.height = parseInt(h) + 'px';
            }
            if(t) {
                this.style['font-size'] = parseInt(t) + 'px';
            }
        };

        //input.style.visibility = 'hidden';
        this.coms.push(input);
        return input;
    };
    this.addTextArea = function(className, fontsize, w, h, x, y) {
        var textarea = document.createElement("textarea");
        textarea.style['font-size'] = (fontsize || 24) + 'px';
        textarea.style.position = "absolute";
        textarea.className = className || 'godstepTextArea';
        textarea.style.zIndex = "1000";
        textarea.style.opacity = .75;
        textarea.style.width = w + 'px';
        textarea.style.height = h + 'px';
        textarea.style.left = x + 'px';
        textarea.style.top = y + 'px';
        textarea.soul = this;
        textarea.style.resize = 'none';
        this.soul.div.appendChild(textarea);
        this.coms.push(textarea);
        return textarea;
    };
    this.destroyCom = function (com) {
        com.parentNode.removeChild(com);
        this.coms.splice(this.coms.indexOf(com), 1);
    };
    this.destroyComs = function () {
        while(this.coms.length) {
            this.coms[0].parentNode.removeChild(this.coms[0]);
            this.coms.splice(0, 1);
        }
    };
    this.hideComs = function () {
        for(var i = 0; i<this.coms.length; i++) {
            this.coms[i].style.visibility = 'hidden';
        }
    };
    this.showComs = function () {
        for(var i = 0; i<this.coms.length; i++) {
            this.coms[i].style.visibility = 'visible';
        }
    };
};






/**
 * Created by Jura on 17.04.2017.
 */
GS.WebText = function (text, size, style, color, soul, target, isNotRTL) {
    if(!GS.WebText.objects) {
        GS.WebText.objects = [];
        GS.WebText.S = soul;
    }

    this.target = target;
    this.target.alphaOld = target.alpha;
    this.style = style;
    this.soul = soul;
    this.text = text;
    this.size = size;
    this.div = soul.div;
    this.dx = 0;
    this.dy = 0;
    GS.WebText.objects.push(this);

    var e = this.elem = document.createElement("p");

    if(this.target) {
        this.target.web = this;
    }
        e.style.position = "absolute";
        e.style.left = 0 + 'px';
        e.style.top = 0 + 'px';
        e.style.color = color;
        if(!isNotRTL) e.dir = 'rtl';
        e.padding = '0px';
        e.margin = '0px';
        e.innerText = text;
        e.className = style;

    this.elem.style.opacity = 0;//this.target.alpha;

    this.div.appendChild(e);
}; extend(GS.WebText, Object);
pro.show = function () {
    this.elem.style.visibility = 'visible';
};
pro.hide = function () {
    this.elem.style.visibility = 'hidden';
};
pro.returnAlphas = function () {
    if(this.target) {
       this.target.alpha = this.target.alphaOld;
    }
};
pro.updateY = function () {
    var addP = new PIXI.Point();
    if(this.addTargetPos) {
        if(this.isAntiPos) {
            addP = new PIXI.Point(-this.addTargetPos.x, -this.addTargetPos.y);
        } else {
            addP = new PIXI.Point(this.addTargetPos.x, this.addTargetPos.y);
        }
    }
    this.elem.style.left = parseInt(addP.x * this.lastS + this.target.x * this.lastS + this.dx * this.lastS) + 'px';
};

pro.update = function (s, px0, py0) {
    if(this.target) {
        if(this.isUpdateText) {
            this.elem.innerText = this.target.text;
        }
        var addP = new PIXI.Point();
        if(this.addTargetPos) {
            if(this.isAntiPos) {
                addP = new PIXI.Point(-this.addTargetPos.x, -this.addTargetPos.y);
            } else {
                addP = new PIXI.Point(this.addTargetPos.x, this.addTargetPos.y);
            }
        }
        this.lastS = s;
        this.elem.style.left = parseInt(addP.x * s + px0 + this.target.x * s + this.dx * s) + 'px';
        this.elem.style.top = parseInt(addP.y * s + py0 + this.target.y * s + this.dy * s) + 'px';
        this.elem.style.opacity = this.target.alpha;
        this.elem.style['font-size'] = parseInt(this.size * s * this.target.scale.x) + 'px';
        this.target.alphaOld = this.target.alpha;
        if(!this.noAlpha) this.target.alpha = 0;
    }
};
GS.WebText.returnAlphas = function () {
    if(GS.WebText.objects) {
        for (var i = 0; i < GS.WebText.objects.length; i++) {
            GS.WebText.objects[i].returnAlphas();
        }
    }
};
GS.WebText.update = function (s) {
    if(GS.WebText.objects) {
        var dx = GS.WebText.S.DOW / 2;
        var dy = GS.WebText.S.DOH / 2;
        for (var i = 0; i < GS.WebText.objects.length; i++) {
            GS.WebText.objects[i].update(s, dx, dy);
        }
    }
};
GS.WebText.delete = function (elem) {
    elem.div.removeChild(elem);
    GS.WebText.objects.splice(GS.WebText.objects.indexOf(elem), 1);
};
GS.WebText.deleteAll = pro.deleteAll = function (texts) {
    if(GS.WebText.objects) {
        if(texts) {
            while(texts.length) {
                if(texts[0]) {
                    if(texts[0].elem) {
                        texts[0].div.removeChild(texts[0].elem); texts[0].elem  = null;
                        GS.WebText.objects.splice(GS.WebText.objects.indexOf(texts[0]), 1);
                    }
                    texts.splice(0, 1);
                }
            }
        } else {
            while(GS.WebText.objects.length) {
                if(GS.WebText.objects[0].elem) {
                    GS.WebText.objects[0].div.removeChild(GS.WebText.objects[0].elem);  GS.WebText.objects[0].elem  = null;
                }
                GS.WebText.objects.splice(0, 1);
            }
        }
    }
};

GodStep.IHTML = function () {
    this.addInput = function(text, className, handle, x, y, w, h, fontsize, placeholder) {
        var view = (this.soul.canvas) ? this.soul.canvas.view : this.soul.webgl.view;


        var input = document.createElement('input');
            if(placeholder) {
                input.placeholder = 'Search';
            }

            input.className = className;
            input.style['font-size'] = (fontsize || 24) + 'px';
            input.style.position = "absolute";
            input.style.zIndex = "1000";
            input.style.left = (view.offsetLeft + (x || 0)) + 'px';
            input.style.top = (view.offsetTop + (y || 0)) + 'px';
            input.value = text;
            input.style.width = (w || 100) + "px";
            input.style.height = (h || 100) + "px";

            input.onkeydown = handle;
            input.soul = this.soul;
            input.target = this;
            this.soul.div.appendChild(input);
            return input;
    };
    this.addButton = function(text, className, handle, x, y) {
        var view = (this.canvas) ? this.canvas.view : this.webgl.view;
        var button = document.createElement("div");
            button.className = className;
            button.innerHTML = text;
            button.style.position = "absolute";
            button.style.zIndex = "1000";
            button.style.left = (view.offsetLeft + (x || 0)) + 'px';
            button.style.top = (view.offsetTop + (y || 0)) + 'px';

            button.style['cursor'] = 'pointer';
            button.style['-moz-user-select'] =
            button.style['-khtml-user-select'] =
            button.style['-webkit-user-select'] =
            button.style['-o-user-select'] = 'none';

            button.onclick = handle;
            button.soul = this;
            this.div.appendChild(button);
            return button;
    };
    this.addSelectBox = function(className, handle, x, y, w) {
        var view = (this.canvas) ? this.canvas.view : this.webgl.view;
        var select = document.createElement("select");
        select.className = className;
        select.style.position = "absolute";
        select.style.zIndex = "1000";
        select.style.left = (view.offsetLeft + (x || 0)) + 'px';
        select.style.top = (view.offsetTop + (y || 0)) + 'px';

        select.style.width = (w || 65) + 'px';

        select.style['cursor'] = 'pointer';
        select.style['-moz-user-select'] =
            select.style['-khtml-user-select'] =
                select.style['-webkit-user-select'] =
                    select.style['-o-user-select'] = 'none';

        select.onchange = handle;
        select.soul = this;
        this.div.appendChild(select);
        return select;
    };
    this.addTextLabel_btstrp = function(text, x, y, size) {
        var h = document.createElement("h" + (size ? size : 1));
        var span  = document.createElement("span");
            span.style.position = "absolute";
            span.style.left = x + 'px';
            span.style.top = y + 'px';
            span.style.resize = 'none';
            span.className = 'label label-default"';
            span.innerText = text;
            this.div.appendChild(h);
             h.appendChild(span);
        h.X = x;
        h.Y = y;
        h.span = span;
        h.W = span.clientWidth;
        h.H = span.clientHeight;
        return h;
    };
    this.addTextField_btstrp = function(x, y, w, h, id, callback) {
        var div = document.createElement("div");
        var span  = document.createElement("span");
        var input = document.createElement("input");

        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.resize = 'none';
        if(w) div.style.width = w + 'px';
        if(h) input.style.height = h + 'px';

        if(id) {
            input.id =id;
        }
        input.onclick = callback;

        div.className = 'input-group';
        input.className = 'form-control';
        div.placeholder = 'Username';

        div.appendChild(input);

        input.soul = this;

        this.div.appendChild(div);
        input.div = div;
        input.X = div.X = x;
        input.Y = div.Y = y;
        input.W = div.W = div.clientWidth;
        input.H = div.H = div.clientHeight;
        return input;
    };
    this.addCalendar2 = function(x, y, z, w, h, id, callback) {
        var div = document.createElement("input");
        div.id = id;
        this.div.appendChild(div);
        var times = [];
        function pat(i) {
            if(i.toString().length < 2) return '0'+ i;
            else return i;
        }
        for(var i =0; i<24; i++) {
            for(var j = 0; j<6; j++) {
                times.push(pat(i) + ":" + pat(j*10));
            }
        }
        $('#'+id).datetimepicker( {
            lang:'ru',
            startDate:new Date(),
            format:'Y-m-d H:i',
            allowTimes:times,
            'autoclose': false,
            onChangeDateTime:callback
        });

        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';

        div.soul = this;

        div.style.zIndex = z;
        div.W = w;
        div.H = h;
        div.X = x;
        div.Y = y;
        div.readOnly = true;
        return div;
    };

    this.addTextArea_btstrp = function(x, y, w, h, r) {
        var div = document.createElement("div");
        var span  = document.createElement("span");
        var input = document.createElement("textarea");

        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        input.style.resize = 'none';

        var round = (r || 0) + "px";
        input.style['-webkit-border-radius'] = round;
        input.style['-moz-border-radius'] = round;
        input.style['border-radius'] = round;
        if(w) div.style.width = w + 'px';
        if(h) input.style.height = h + 'px';

        div.className = 'input-group';
        input.className = 'form-control';
        div.placeholder = 'Username';

        div.appendChild(input);

        input.soul = this;

        this.div.appendChild(div);
        input.X = div.X = x;
        input.Y = div.Y = y;
        input.W = div.W = div.clientWidth;
        input.H = div.H = div.clientHeight;
        input.div = div;


        return input;
    };

    this.addButton_btstrp = function(x, y, label, callback) {
        var div = document.createElement("div");

        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        //div.style.resize = 'none';
        div.innerHTML = label;
        //if(w) div.style.width = w + 'px';
        //if(h) input.style.height = h + 'px';

        div.className = 'btn btn-default disable';

        div.soul = this;
        div.onclick = callback;

        this.div.appendChild(div);

        div.X = x;
        div.Y = y;
        div.W = div.clientWidth;
        div.H = div.clientHeight;
        return div;
    };
    this.addInputFile2_btstrp = function(x, y, label, callback, w, h) {
        var div = document.createElement("div");
        var span  = document.createElement("span");
        var input = document.createElement("input");
        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.resize = 'none';
        if(w) div.style.width = w + 'px';
         if(h) div.style.height = h + 'px';
        input.X = x;
        input.Y = y;
        span.innerHTML = label;
        div.className = 'file-input-wrapper btn btn-default';
        input.type = 'file';

        div.appendChild(span);

        input.soul = this;
        input.div = div;
        input.span = span;
        input.class = 'btn-primary';
        //input.style.visibility = 'hidden';
        //input.style.opacity = 0.5;
        input.style.left = -300 + 'px';
        div.appendChild(input);
        this.div.appendChild(div);
        return input;
    };
    this.addInputFile_btstrp = function(x, y, label, callback) {
        var div = document.createElement("input");
        div.type = 'file';
        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        //div.style.resize = 'none';
        div.innerHTML = label;
        //if(w) div.style.width = w + 'px';
        //if(h) input.style.height = h + 'px';

        //div.className = 'btn btn-default disable';

        div.soul = this;
        div.onclick = callback;

        this.div.appendChild(div);

        div.X = x;
        div.Y = y;
        div.W = div.clientWidth;
        div.H = div.clientHeight;
        return div;
    };
    this.addTextArea = function(className, w, h, x, y) {
        var textarea = document.createElement("textarea");
            textarea.style.position = "absolute";
            textarea.className = className || 'godstepTextArea';
            textarea.style.zIndex = "1000";
            textarea.style.width = w + 'px';
            textarea.style.height = h + 'px';
            textarea.style.left = x + 'px';
            textarea.style.top = y + 'px';
        textarea.soul = this;
        this.div.appendChild(textarea);

        return textarea;
    };

    GodStep.IHTML.clearSelectBox = function(selectBox) {
        while(selectBox.options.length) {
            selectBox.remove(0);
        }
    };

};

GodStep.IHTML.getPosition = function(elem) {
    var top=0, left=0;
    while(elem) {
        top = top + parseFloat(elem.offsetTop);
        left = left + parseFloat(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return {top: Math.round(top), left: Math.round(left)}
};

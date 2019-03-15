    GodStep.Ajax = function (url, parent, h_loaded, h_error) {
        this.parent = parent;
        this.load(url, h_loaded, h_error);
    };

    pro = GodStep.Ajax.prototype = Object.create( Object.prototype );
    pro.load = function(url, h_loaded, h_error) {
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = h_loaded;
        xhr.onerror  = h_error || function(e) {
            trace('Error: ' + e);
        };
        xhr.parent = this.parent;
        xhr.send();
    };

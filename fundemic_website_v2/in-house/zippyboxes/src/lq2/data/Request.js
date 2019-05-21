GodStep.Request = function (url, callback, parent, params) {
    this.url = url;
    this.parent = parent;
    this.callback = callback;
    this.params = params;
};

extend(GodStep.Request, Object);

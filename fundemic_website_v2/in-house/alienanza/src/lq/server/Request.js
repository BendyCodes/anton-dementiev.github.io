GodStep.Request = function (url, d, callback, api) {
    this.id = V4.Request.count++;
    this.url = url;
    this.api = api;
    var data = new FormData();
        data.append('data', JSON.stringify(d));
    this.callback = callback;
    this.data = data;
};

GodStep.Request.count = 0;
extend(GodStep.Request, Object);
pro.setResponse = function(data) {
    this.response = data;
    if(this.callback) {
        this.callback(data);
    }
};
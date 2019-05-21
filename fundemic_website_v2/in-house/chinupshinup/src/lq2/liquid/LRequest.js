LQ.Request = function (url, d, callback, api) {
    this.id = LQ.Request.count++;
    this.url = url;
    this.api = api;
    var data = new FormData();
    data.append('data', JSON.stringify(d));
    this.callback = callback;
    this.data = data;
};
extend(LQ.Request, Object);
LQ.Request.count = 0;
pro.setResponse = function(data) {
    this.response = data;
    if(this.callback) {
        this.callback(data);
    }
};
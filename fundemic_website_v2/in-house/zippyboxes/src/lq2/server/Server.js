include('lq/server/Request');

GodStep.Server = function(path, soul) {
    this.server_path = path;
    this.requests = [];
    this.token = '';
    this.soul = soul;
    this.user_id = null;
    GodStep.Server.instance = this;
    PIXI.EventTarget.call(this);
};
GodStep.ERROR = 'ERROR';
GodStep.LOGIN = 'LOGIN';
GodStep.TEMP_LOADED = 'TEMP_LOADED';
GodStep.NOT_CONNECTED = 'NOT_CONNECTED';

GodStep.COM_LOGIN = 'Login';
GodStep.COM_REGISTER = 'Register';
GodStep.COM_ERROR = 'Error';

extend(GodStep.Server, Object);

// functions
GodStep.Server.getFact = function(fact_id) {
    var instance = GodStep.Server.instance;
    instance.pushRequest('fact/get/'+fact_id);
};
GodStep.Server.register = function(owner_id, app_id,  password) {
    var instance = GodStep.Server.instance;
    instance.isConnected = true;
    instance.pushRequest("register", {owner_id:owner_id, app_id:app_id, password:password});
    instance.isConnected = false;
};
GodStep.Server.login = function(owner_id, app_id, password) {
    var instance = GodStep.Server.instance;
    instance.isConnected = true;
    instance.pushRequest("login", {owner_id:owner_id, app_id:app_id, password:password});
    instance.isConnected = false;
};

GodStep.Server.upload = function(file, h_loaded, caller, dataArray) {
    var instance = GodStep.Server.instance;
    instance.upload(file, h_loaded, caller, dataArray);
};

// service
pro.upload = function(file, h_loaded, caller, dataArray) {
    var data = new FormData();
    if(file.newFileName) {
        data.append('file', file, file.newFileName);
    } else {
        data.append('file', file);
    }

    if(dataArray) {
        for(var i =0;i<dataArray.length; i++) {
            data.append(dataArray[i][0], dataArray[i][1]);
        }
    }
    var req = new GodStep.Request(GodStep.UPLOAD_CONTROLLER, data, h_loaded, this);
    var xhr = new XMLHttpRequest(); xhr.req = req;
    xhr.caller = caller;
    xhr.onreadystatechange = function(e){
        if(xhr.readyState == 4){
            try {
                GodStep.Server.instance.h_loaded(e);
            } catch (e){
                var resp = {
                    status: 'error',
                    data: 'Unknown error occurred: [' + xhr.responseText + ']'
                };
            }
        }
    };
    xhr.open('POST', this.server_path + GodStep.UPLOAD_CONTROLLER);
    xhr.send(data);


};
pro.pushRequest = function(controller, data, callback) {
    var req = new GodStep.Request(this.server_path + controller, data, callback, this);

    if(this.requests.length == 0) {
        this.loadRequest(req, this.h_loaded, this.h_error);
    }
    this.requests.push(req);
};
pro.loadRequest = function(req, h_loaded, h_error) {
    if(this.isConnected) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', req.url, true);
            xhr.onload = h_loaded;
            xhr.onerror = h_error;
            xhr.onabort = function (e) {
                alert(e);
            };
            xhr.req = req;
            if(req.api.authKey) {
                req.data = req.data || new FormData();
                req.data.append('authKey', req.api.authKey);
            }
            xhr.send(req.data);
        } catch (e) {
            alert(e);
        }
    } else {
        dispatch(this, GodStep.ERROR, GodStep.NOT_CONNECTED);
    }
};
pro.nextRequest = function() {
    this.requests.splice(0, 1);
    if(this.requests.length > 0) {
        this.loadRequest(this.requests[0], this.h_loaded, this.h_error);
    }
};

// listeners
pro.h_loaded = function(e) {
    var resp = e.currentTarget.response;
    var req = e.currentTarget.req;
    var api = req.api;
    var data = JSON.parse(resp);
    req.setResponse(data);

    switch (data.command) {
        case GodStep.COM_FACTS:
            break;
        case GodStep.COM_REGISTER:
        case GodStep.COM_LOGIN:
            api.isConnected = true;
            api.authKey = data.authKey;
            api.user_id = data.user_id;
            dispatch(api, GodStep.LOGIN, data);
            break;
        case GodStep.COM_ERROR:
            dispatch(api, GodStep.ERROR, {message: data.message, params:data.params});
            break;
    }

    api.nextRequest();
    trace(data.command);
};

pro.h_error = function(e) {
    var t = GodStep.Server.instance;
    dispatch(t, GodStep.ERROR, e);
    t.nextRequest();
};
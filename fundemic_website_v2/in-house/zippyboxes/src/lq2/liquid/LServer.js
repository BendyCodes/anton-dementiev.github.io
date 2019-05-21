include('lq/liquid/LRequest');

LQ.Server = function(path, soul) {
    if(!LQ.Server.instance) {
        trace("Liquid Server " + '0.1.0');
        this.server_path = path;
        this.requests = [];
        this.token = '';
        this.soul = soul;
        this.game_id = soul.GAME_ID;
        this.user_id = null;
        LQ.Server.instance = this;
        PIXI.EventTarget.call(this);
    }
};
LQ.COM_ERROR = 'Error';
LQ.COM_LOGIN = 'Login';
LQ.COM_LOGIN_NEW = 'LoginNew';

LQ.ERROR = 'ERROR';
LQ.LOGIN = 'LOGIN';
LQ.OTHERDATA = 'OTHERDATA';
LQ.NOT_CONNECTED = 'NOT_CONNECTED';


extend(LQ.Server, Object);

// functions
LQ.Server.changeFact = function(fact_id, params, callback) {
    var instance = LQ.Server.instance;
    instance.pushRequest('fact/change/'+fact_id, params, callback);
};
LQ.Server.register = function(username, password) {
    var instance = LQ.Server.instance;
    instance.isConnected = true;
    instance.pushRequest("register", {username:username, password:password});
    instance.isConnected = false;
};
LQ.Server.login = function(username, password) {
    var instance = LQ.Server.instance;
    instance.isConnected = true;
    instance.pushRequest("login", {username:username, password:password, game_id:instance.game_id});
    instance.isConnected = false;
};
LQ.Server.ping = function() {
    var instance = LQ.Server.instance;
    instance.isConnected = true;
    var d = (new Date()).getTime();
    instance.pushRequest("ping", d).reqTime = d;
    instance.isConnected = false;
};
LQ.Server.upload = function(file, h_loaded, caller, dataArray) {
    var instance = LQ.Server.instance;
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
    var req = new LQ.Request(LQ.UPLOAD_CONTROLLER, data, h_loaded, this);
    var xhr = new XMLHttpRequest(); xhr.req = req;
    xhr.caller = caller;
    xhr.onreadystatechange = function(e){
        if(xhr.readyState == 4){
            try {
                LQ.Server.instance.h_loaded(e);
            } catch (e){
                var resp = {
                    status: 'error',
                    data: 'Unknown error occurred: [' + xhr.responseText + ']'
                };
            }
        }
    };
    xhr.open('POST', this.server_path + LQ.UPLOAD_CONTROLLER);
    xhr.send(data);


};
pro.pushRequest = function(controller, data, callback) {
    var req = new LQ.Request(this.server_path + controller, data, callback, this);
    req.controller = controller;
    if(this.requests.length == 0) {
        this.loadRequest(req, this.h_loaded, this.h_error);
    }
    this.requests.push(req);
    return req;
};
pro.loadRequest = function(req, h_loaded, h_error) {
    if(this.isConnected || req.controller == 'register') {
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
        dispatch(this, LQ.ERROR, LQ.NOT_CONNECTED);
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
    if(data.command) {
        switch (data.command) {
            case LQ.COM_FACTS:
                break;
            case LQ.COM_REGISTER:
            case LQ.COM_LOGIN_NEW:
            case LQ.COM_LOGIN:
                api.isConnected = true;
                api.authKey = data.authKey;
                api.player_id = data.player_id;
                dispatch(api, LQ.LOGIN, data);
                break;
            case LQ.COM_ERROR:
                dispatch(api, LQ.ERROR, {message: data.message, params:data.params});
                break;
        }
        api.nextRequest();
    } else {
        api.nextRequest();
        dispatch(api, LQ.OTHERDATA, [data, (new Date()).getTime() - req.reqTime]);
    }

};

pro.h_error = function(e) {
    var t = LQ.Server.instance;
    dispatch(t, LQ.ERROR, e);
    t.nextRequest();
};
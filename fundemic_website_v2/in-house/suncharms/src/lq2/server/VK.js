include('lq/server/VKQuery');

GodStep.VK = function (soul, startData) {
    this.soul = soul;
    GodStep.VK.I = VK;
    GodStep.VK.instance = this;
    GodStep.VK.Q = [];
    GodStep.IDownUp.call(this, 1, 1);
    this.startData = startData;
};

var pro = GodStep.VK.prototype = Object.create( Object.prototype );


    GodStep.VK.request = function(q) {
        VK.api(q.query, q.fields, GodStep.VK.instance.h_loaded);
    };
    GodStep.VK.getAppPermissions = function(target, callback) {
        var instance = GodStep.VK.instance;
        var q = new GodStep.VKQuery("account.getAppPermissions", callback, {user_id: instance.viewer_id}, target);
        GodStep.VK.pushRequest(q);
    };
    GodStep.VK.getAudios = function(target, callback) {
        var instance = GodStep.VK.instance;
        var q = new GodStep.VKQuery("audio.get", callback, {owner_id: instance.viewer_id, count:'5'}, target);
        GodStep.VK.pushRequest(q);
    };
    GodStep.VK.getFriends = function(target, callback) {
        var q = new GodStep.VKQuery("friends.get", callback, {fields: "photo_50"}, target);
        GodStep.VK.pushRequest(q);
    };
    GodStep.VK.pushRequest = function(q) {
        GodStep.VK.Q.push(q);
        if(GodStep.VK.Q.length == 1) {
            GodStep.VK.request(q);
        }
    };
    GodStep.VK.userGet = function(fields, target, callback) {
        var q = new GodStep.VKQuery("users.get", callback, {user_ids: GodStep.VK.instance.viewer_id, fields: fields}, target);
        GodStep.VK.pushRequest(q);
    };

    pro.init = function() {
        if(this.startData) {
            this.viewer_id = this.startData.uid | this.startData.mid;
            this.api_id = VK._apiId;
            this.auth_key  = this.startData.hash;
            this.isConnected = true;
            dispatch(this, GodStep.MVK_CONNECT);
        } else {
            VK.init(this.h_init, this.h_error);
        }
    };
    pro.h_query_error = function(e) {
        trace(e);
    };
    pro.h_loaded = function(e) {
        var queries = GodStep.VK.Q;
        var q = queries[0];
        queries.splice(0, 1);
        if(e.error) {
            trace(e);
            switch (e.error.error_msg) {
                case "Access denied: no access to call this method":
                   // VK.Api.call('showSettingsBox');
                    break;
                default:
                    alert('VKAPI: ' + e.error.error_msg);
                    break;
            }
        } else {
            q.data = e.response;
            q.callbackFunc(q);
        }

        if(queries.length > 0) {
            GodStep.VK.request(queries[0])
        }
    };
    pro.h_init = function() {
        var instance = GodStep.VK.instance;
        var parts=document.location.search.substr(1).split("&");
        var flashVars={}, curr;
        for (var i=0; i<parts.length; i++) {
            curr = parts[i].split('=');
            // записываем в массив flashVars значения. Например: flashVars['viewer_id'] = 1;
            flashVars[curr[0]] = curr[1];
        }

        instance.viewer_id = flashVars['viewer_id'];
        instance.api_id = flashVars['api_id'];
        instance.auth_key  = flashVars['auth_key'];
        instance.api_secret = '';
        if(instance.viewer_id)  {
            trace(GodStep.MVK_CONNECT + " " + instance.viewer_id + " [" + instance.api_id + "] " + "\n" + instance.auth_key);
            dispatch(instance, GodStep.MVK_CONNECT);
        } else {
            trace(GodStep.ERR_MVK_CONNECT);
            dispatch(instance, GodStep.ERR_MVK_CONNECT);
        }
    };
    pro.h_error = function() {
        trace(GodStep.ERR_MVK_CONNECT);
        dispatch(GodStep.VK.instance, GodStep.ERR_MVK_CONNECT);
    };


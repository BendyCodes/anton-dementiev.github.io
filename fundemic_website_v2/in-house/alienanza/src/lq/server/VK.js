include('lq/server/VKQuery');

var GSVK = GodStep.VK = function (soul, startData) {
    this.soul = soul;
    GodStep.VK.I = VK;
    GodStep.VK.instance = this;
    GodStep.VK.Q = [];
    GodStep.IDownUp.call(this, 1, 1);
    this.startData = startData;
};

var pro = GodStep.VK.prototype = Object.create( Object.prototype );

GSVK.USERSGET = 'users.get';
GSVK.AUDIOGET = 'audio.getById';
GSVK.AUDIOSEARCH = "audio.search";

GSVK.photo_50 = 'photo_50';
GSVK.photo_100 = 'photo_100';
GSVK.photo_200 = 'photo_200';
GSVK.photo_400 = 'photo_400';
GSVK.photo_max = 'photo_max';
GSVK.photo_max_orig = 'photo_max_orig';

    GodStep.VK.request = function(q) {
        VK.api(q.query, q.fields, GodStep.VK.instance.h_loaded);
    };
    GodStep.VK.getAppPermissions = function(target, callback) {
        var instance = GodStep.VK.instance;
        var q = new GodStep.VKQuery("account.getAppPermissions", callback, {user_id: instance.viewer_id}, target);
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
    GodStep.VK.searchAudios = function(query, count, target, callback) {
        var instance = GodStep.VK.instance;
        if(instance) {
            var q = new GodStep.VKQuery(GSVK.AUDIOSEARCH, callback, {q: query, count:count}, target);
            GodStep.VK.pushRequest(q);
        }
    };
    GodStep.VK.getAudios = function(arr, target, callback) {
        var instance = GodStep.VK.instance;
        if(instance) {
            var s = '';
            for(var a in arr) {
                s += arr[a] + ',';
            }
            s = s.substr(0, s.length - 1);
            var q = new GodStep.VKQuery(GSVK.AUDIOGET, callback, {audios: s}, target);
            GodStep.VK.pushRequest(q);
        }
    };
    GodStep.VK.userGet = function(fields, target, callback) {
        var instance = GodStep.VK.instance;
        if(instance) {
            var q = new GodStep.VKQuery("users.get", callback, {user_ids: GodStep.VK.instance.viewer_id, fields: fields}, target);
            GodStep.VK.pushRequest(q);
        }
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
                    VK.Api.call('showSettingsBox');
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


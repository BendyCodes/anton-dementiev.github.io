    include('lq/data/Xor64');
    include('lq/data/Base64');
    include('lq/data/Request');

        GodStep.GS_CONNECTED = GodStep.MARK + 'GS connected';
        GodStep.GS_ERROR = GodStep.MARK + 'GS error';
        GodStep.LOGIN_BY_PASSWORD = GodStep.MARK + 'GS login by password';
        GodStep.GS_AJAX_ERROR = GodStep.MARK + 'GS ajax error';
        GodStep.GS_GAMEDATA = GodStep.MARK + 'GS game data';
        GodStep.GS_GAMEDATARANGE = GodStep.MARK + 'GS game data';
        GodStep.GS_CHANGEGAMEDATA = GodStep.MARK + 'GS change game data';

        GodStep.Symfony = function () {
            GodStep.Symfony.PATH = 'http://godstep.ru/gameapi/';

            //GodStep.Symfony.PATH = 'http://symfony/gameapi/';
            //GodStep.Symfony.PATH = 'http://symfony/gameapiOpen/';
            this.playerID = 0;
            this.sessionID = 0;
            this.requests = [];
            this.isConnected = false;
            GodStep.Symfony.instance = this;
            PIXI.EventTarget.call(this);
        };
        GodStep.Symfony.PATH_SITE = 'http://godstep.ru:99';

          pro = GodStep.Symfony.prototype = Object.create( Object.prototype );
                GodStep.Symfony.init = function(gameID, soul, securityType) {
                    if(securityType == 'open') {
                        GodStep.Symfony.instance.loadPost = GodStep.Symfony.instance.loadRequest;
                        GodStep.Symfony.instance.pushRequest = GodStep.Symfony.instance.pushRequest_normal;
                        GodStep.Symfony.instance.h_loaded = GodStep.Symfony.instance.h_loaded_normal;
                        GodStep.Symfony.getGameDataRange = GodStep.Symfony.getGameDataRange_normal;
                        GodStep.Symfony.setGameData = GodStep.Symfony.setGameData_normal;
                        GodStep.Symfony.getGameData = GodStep.Symfony.getGameData_normal;
                        GodStep.Symfony.login = GodStep.Symfony.login_normal;
                    }
                    GodStep.Symfony.instance.gameID = gameID;
                    GodStep.Symfony.instance.soul = soul;
                    return GodStep.Symfony.instance;
                };

          pro.loadRequest = function(req, h_loaded, h_error) {
              try {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', req.url, true);
                  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");

                  xhr.onload = h_loaded;
                  xhr.onerror  = h_error;
                  xhr.onabort = function(e) {
                      alert(e);
                  };
                  xhr.req = req;
                  xhr.soul = this.soul;

                  xhr.send('req=' + JSON.stringify(req.params));
              } catch (e) {
                  alert(e);
              }
          }
          pro.loadPost = function(req, h_loaded, h_error) {
              try {
                  var params = 'req=' + req.params;
                  var params22 = params.replace(new RegExp("\\+","g"), '___');

                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', req.url, true);
                  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                  xhr.onload = h_loaded;
                  xhr.onerror  = h_error;
                  xhr.onabort = function(e) {
                      alert(e);
                  };
                  xhr.req = req;
                  xhr.soul = this.soul;

                  xhr.send(params22);
              } catch (e) {
                  alert(e);
              }
          };
          pro.load = function(req, h_loaded) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET', req.url, true);
                xhr.onload = h_loaded;
                xhr.req = req;
                xhr.soul = this.soul;
                xhr.send();
           };
          pro.pushRequest_normal = function(r, callback) {
              if(this.isConnected) {
                  var data = {r:r, s:this.sessionID, p:this.playerID};

                  var req = new GodStep.Request(GodStep.Symfony.PATH + this.gameID + "/", callback, GodStep.Symfony.reqParent, data);
                  if(this.requests.length == 0) {
                      this.loadPost(req, this.h_loaded, this.h_error);
                  }
                  this.requests.push(req);
              }
          };
          pro.pushRequest = function(r, callback) {
            if(this.isConnected) {
                var fullReq = r + ":" + "s=" + this.sessionID + "=" + this.playerID + ":" + Math.random()*1000;
                var secretHash = this.encrypt(fullReq);
                secretHash = secretHash.replace(/\//gi, '!!!');

                var finalReq = GodStep.Symfony.PATH + this.gameID + "/" + secretHash;
               //  var req = new GodStep.Request(finalReq, callback, GodStep.Symfony.reqParent);
                var req = new GodStep.Request(GodStep.Symfony.PATH + this.gameID + "/", callback, GodStep.Symfony.reqParent, secretHash);
                if(this.requests.length == 0) {
                    this.loadPost(req, this.h_loaded, this.h_error);
                   // this.load(req, this.h_loaded)
                }
                this.requests.push(req);
            }
        };

         GodStep.Symfony.loginPass = function(login, password) {
             var instance = GodStep.Symfony.instance;
             instance.isConnected = true;
             instance.playerID = login;
             instance.pushRequest({c:'loginPassword', login:login, password:password});
             instance.isConnected = false;
         }
         GodStep.Symfony.login_normal = function(id) {
             var instance = GodStep.Symfony.instance;
             instance.isConnected = true;
             instance.playerID = id;
             instance.pushRequest({c:'login', id:id});
             instance.isConnected = false;
         };
         GodStep.Symfony.login = function(id) {
              var instance = GodStep.Symfony.instance;
              instance.isConnected = true;
              instance.playerID = id;
              instance.pushRequest("login=" + id);
              instance.isConnected = false;
          };
         GodStep.Symfony.setGameData_normal = function(name, data, linkId, callBack) {
             GodStep.Symfony.instance.pushRequest({c:"setGameData", n:name, d:data, l:linkId}, callBack);
         };
         GodStep.Symfony.setGameData = function(name, data, linkId, callBack) {
             var instance = GodStep.Symfony.instance;
             var s = '#E#Q#';
            // var encrypted = instance.encrypt(data);
             trace(encrypted);
             var decrypted = instance.decrypt(encrypted);
            // trace('\n\n' + decrypted);

             var reverse = encrypted.replace(/=/gi, s);

             instance.pushRequest("setGameData=" + name + "=" + reverse + "=" + linkId, callBack);
         };
         GodStep.Symfony.getGameDataRange = function(name, linkId1, linkId2) {
             var instance = GodStep.Symfony.instance;
                 instance.pushRequest("getGameDataRange=" + name + "=" + linkId1 + '=' + linkId2);
         };
         GodStep.Symfony.getGameDataRange_normal = function(name, linkId1, linkId2) {
             GodStep.Symfony.instance.pushRequest({c:"getGameDataRange", 'n':name, 'l1':linkId1, 'l2':linkId2});
         };
         GodStep.Symfony.getGameData_normal = function(name, linkId, callBack) {
            var instance = GodStep.Symfony.instance;
                instance.pushRequest({c:"getGameData", n:name, l:linkId}, callBack);
         };
         GodStep.Symfony.getGameData = function(name, linkId, callBack) {
             var instance = GodStep.Symfony.instance;
                 instance.pushRequest("getGameData=" + name + "=" + linkId, callBack);
         };

          pro.nextRequest = function() {
            this.requests.splice(0, 1);
            if(this.requests.length > 0) {
                this.loadPost(this.requests[0], this.h_loaded, this.h_error);
            }
         };
          pro.decrypt = function(s) {
              var key = "secret key";
              return GodStep.Xor64.decode(s, key);
          };
          pro.encrypt = function(s) {
              var key = "secret key";
              return GodStep.Xor64.encode(s, key);
          };
          pro.h_loaded_normal = function(e) {
              var t = GodStep.Symfony.instance;
              var req = e.currentTarget.req;
              try {
                  var data = JSON.parse(e.currentTarget.response);
              } catch(err) {
                  GodStep.dispatch(t, GodStep.GS_ERROR, {type:e.currentTarget.response});
                  if(req.callback) {
                      req.callback({dtype:'Error', type:e.currentTarget.response});
                  }
                  return
              }
              switch (data.rc) {

                  case "OrderExistCount":
                      //dispatchEvent(new ServerEvent(ServerEvent.GS_ORDER_EXIST, {item:second, count:arr[2]}));
                      break;
                  case "Highscore":
                      //dispatchEvent(new ServerEvent(ServerEvent.GS_HIGHSCORE, {mode:second, score:arr[2]}));
                      break;
                  case "LoginPassword":
                      //GodStep.dispatch(t, GodStep.LOGIN_BY_PASSWORD,  {login: data.login});
                      t.isConnected = true;
                      t.sessionID = data.session;
                      GodStep.dispatch(t, GodStep.GS_CONNECTED,  {sessionID: t.sessionID});
                      trace(data);
                      break;
                  case "Logged":
                  case "Registered":
                      t.isConnected = true;
                      t.sessionID = data.s;
                      GodStep.dispatch(t, GodStep.GS_CONNECTED,  {sessionID: t.sessionID});
                      break;
                  case "GameData":
                      var gd =  {data:data.d, name:data.n, linkId:parseInt(data.l)};
                      if(req.callback) {
                          req.callback(gd);
                      }
                      GodStep.dispatch(t, GodStep.GS_GAMEDATA, gd);
                      break;
                  case "GameDataRange":
                      var datas = data.e;
                      GodStep.dispatch(t, GodStep.GS_GAMEDATARANGE, datas);
                      break;
                  case "NewGameData":
                  case "ChangedGameData":
                      var changed = {name:data.n, linkId:data.l};
                      if(req.callback) {
                          req.callback(changed);
                      }
                      GodStep.dispatch(t, GodStep.GS_CHANGEGAMEDATA, changed);
                      break;
                  case "Error":
                      if(data.message) {
                           GodStep.dispatch(t, GodStep.GS_ERROR, {type:data.message});
                           if(req.callback) {
                              req.callback({dtype:'Error', type:data.message});
                           }
                      } else {
                          GodStep.dispatch(t, GodStep.GS_ERROR, {type:'e'});
                          if(req.callback) {
                              req.callback({dtype:'Error', type:'e'});
                          }
                      }

                      break;
                  default:
                      GodStep.dispatch(t, GodStep.GS_ERROR, {type:data});
                      break;
              }
              t.nextRequest();

          };
          pro.h_loaded = function(e) {
              var t = GodStep.Symfony.instance;
              var s = e.currentTarget.response.split('\n');
              var arr = s[0].split(":");
              var first = arr[0];
              var second = arr[1];
              var req = e.currentTarget.req;
              switch (first) {
                  case "ServerTime":
                      var date = new Date();
                      date.setHours(parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]));
                      //log("PING", (getTimer() - pingTime).toString());
                      //pingTime = null;
                      //dispatchEvent(new ServerEvent(ServerEvent.GS_SERVER_TIME, {serverTime:date}));
                      break;
                  case "OrderExistCount":
                      //dispatchEvent(new ServerEvent(ServerEvent.GS_ORDER_EXIST, {item:second, count:arr[2]}));
                      break;
                  case "Highscore":
                      //dispatchEvent(new ServerEvent(ServerEvent.GS_HIGHSCORE, {mode:second, score:arr[2]}));
                      break;
                  case "Highscores":
                      var highscores = arr[2].split("|");
                      var scores = [];
                      var score;
                      for(var hs =0; hs<highscores.length - 1; hs++) {
                          score = highscores[hs].split('=');
                          scores.push({vkID:score[0], score:score[1]});
                      }
                      //dispatchEvent(new ServerEvent(ServerEvent.GS_HIGHSCORES, {mode:second, scores:scores}));
                      break;
                  case "Error":
                      GodStep.dispatch(t, GodStep.GS_ERROR, {type:second});
                      if(req.callback) {
                          req.callback({dtype:'Error', type:second});
                      }
                      break;
                  case "Logged":
                  case "Registered":
                      t.isConnected = true;
                      t.sessionID = s[0].split(":")[1].split('=')[1];

                      GodStep.dispatch(t, GodStep.GS_CONNECTED,  {sessionID: t.sessionID});
                      break;
                  case "GameData":
                      var ddd = second.replace(/#E#Q#/gi, '=');
                      var gameData = t.decrypt(ddd);
                      var data =  {dtype:'GameData', data:gameData, name:arr[2], linkId:parseInt(arr[3])};
                      if(req.callback) {
                          req.callback(data);
                      }
                      GodStep.dispatch(t, GodStep.GS_GAMEDATA, data);
                      break;
                  case "GameDataRange":
                      var datas = JSON.decode(second);
                      var outData = [];
                      for(var m = 0; m<datas.length; m++) {
                          var d = this.decrypt(datas[m][0].replace(/#E#Q#/gi, '='));
                          outData.push({linkId:[datas[m][1]], data:d});
                      }
                      GodStep.dispatch(t, GodStep.GS_GAMEDATARANGE,  outData);
                      break;
                  case "NewGameData":
                  case "ChangedGameData":
                      var changed = {dtype:'ChangedGameData', name:arr[2], linkId:arr[3]};
                      if(req.callback) {
                          req.callback(changed);
                      }
                      GodStep.dispatch(t, GodStep.GS_CHANGEGAMEDATA, changed);
                      break;
                  case "players":
                      var jsonString = s[0].split("=")[1];
                      //var regExp:RegExp = /&quot;/g;
                      //jsonString = jsonString.replace(regExp,'"');
                      break;
                  default:
                      GodStep.dispatch(t, GodStep.GS_ERROR, {type:first});
                      break;
              }

              t.nextRequest();
          };
          pro.h_error = function(e) {
              var t = GodStep.Symfony.instance;
                  GodStep.dispatch(t, GodStep.GS_AJAX_ERROR, e);
              t.nextRequest();
          };
          pro.trace = function(e) {
            trace('GS >>> ' + e);
        };

          GodStep.Symfony.upload = function(file, path, h_loaded, caller, dataArray) {
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

               var xhr = new XMLHttpRequest();
                   xhr.caller = caller;
                   xhr.onreadystatechange = function(e){
                       if(xhr.readyState == 4){
                           try {
                               h_loaded(e);
                           } catch (e){
                               var resp = {
                                   status: 'error',
                                   data: 'Unknown error occurred: [' + xhr.responseText + ']'
                               };
                           }
                       }
                   };
               xhr.open('POST', path);
               xhr.send(data);
          };



var GodStepAPI = GodStepAPI || {};
    GodStepAPI.apiName = 'BoosterApi';
    GodStepAPI.Booster = function(game_name, start_h, pause, resume) {
        GodStepAPI.Booster.instance = this;
        var Booster = window.Booster || {};
        if(Booster.ready) {
            Booster.ready = function () {
                new Booster.Init({
                    orientation: 'portrait',
                    splash: true,
                    minimalUI: true
                });
                adSense = new Booster.Ad({
                    type: 'adsense',
                    size: '300x250',
                    channelID: BM_channelID_Placeholder
                });
                community = new Booster.Community({
                    position: 1,
                    gameCode: 'BM_gameCode_Placeholder'
                });
                analytics = new Booster.Analytics({
                    gameName: game_name,
                    gameId: 'BM_gameId_Placeholder',
                    gameCategory: 'BM_gameCategory_Placeholder',
                    developer: 'BM_developerCode_Placeholder'
                });
                moregames = new Booster.Moregames();

                Booster.onSplashFinishedEvent = function() {
                    start_h();
                };
                Booster.onOpenTab = function() {
                    pause()
                };
                Booster.onCloseTab = function() {
                    resume()
                };
            };
        } else {
            start_h();
        }
    };
    var pro = pro || GodStepAPI.Booster;
    pro.checkDevices = function(soul) {
        trace('Check Devices');
        var useragent = window.navigator.userAgent;
        if(useragent.search('NOKIA') != -1) {
            soul.isNokia635 = true;
        }

        function isStock() {
            var matches = useragent.match(/Android.*AppleWebKit\/([\d.]+)/);
            return matches && matches[1] < 537;
        }
        var ua = navigator.userAgent.toLowerCase();
        soul.isSharpMiniStock = ((/SHL24/i).test(ua)) && isStock();
        soul.isXperiaAStock = ((/SO-04E/i).test(ua)) && isStock();
        soul.isFujitsu = ((/F-01F/i).test(ua)) && isStock();
        soul.isSharp = (((/SH-01F/i).test(ua)) && isStock()) || (useragent.search('SH-01F') != -1);


        if(useragent.search('GT-I9500') != -1) {
            soul.isGTI9500 = isStock();
        }
        if(useragent.search('GT-I9505') != -1) {
            soul.isGTI9505 = isStock();
        }
        if(window.navigator) {
            soul.isAndroid = window.navigator.userAgent.indexOf('Android') >= 0;
            var webkitVer = parseInt((/WebKit\/([0-9]+)/.exec(window.navigator.appVersion) || 0)[1],10) || void 0; // also match AppleWebKit
            soul.isNativeAndroid = soul.isAndroid && webkitVer <= 534 && window.navigator.vendor.indexOf('Google') == 0;
        }

        var navU = navigator.userAgent;

        var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;

        var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
        var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
        var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));

        var regExChrome = new RegExp(/Chrome\/([\d.]+)/);
        var resultChromeRegEx = regExChrome.exec(navU);
        var chromeVersion = (resultChromeRegEx === null ? null : parseFloat(regExChrome.exec(navU)[1]));

        soul.isAndroidBrowser2 = isAndroidMobile && (appleWebKitVersion !== null && appleWebKitVersion < 537) || (chromeVersion !== null && chromeVersion < 37);

        if(soul.isGTI9505 || soul.isGTI9500 || soul.isNativeAndroid || soul.isSharpMiniStock || soul.isXperiaAStock || soul.isFujitsu || soul.isSharp || soul.isNokia635 || soul.isAndroidBrowser2) {
            soul.isNativeAndroid = true;
        }
    };
    pro.showAdvertising = function() {
        if(window['adSense']) {
            window['adSense'].showAdvertising();
        } else {
            trace(GodStepAPI.apiName + ' Advertising');
        }
    };
    pro.sendScore = function(score, resume_h) {
        if(window['community']) {
            window['community'].submitScore({
                score: score, // This is an int value
                callback: resume_h || function() {
                    // Call method(s) in the game that should happen after the high score popup is closed, like showing advertisement.
                }
            });
        } else {
            trace(GodStepAPI.apiName + ' Score ' + score);
        }
    };
    pro.analytics = function(method, value) {
        var analytics = window['analytics'];
        if(analytics) {
            switch (method) {
                case 'menu':
                    analytics.menu(); // // Menu call, this should be called when the users sees the menu page
                    break;
                case 'level':
                    analytics.level(value); //currentLevel // Level Complete, this should be called when the user completes a level
                    break;
                case 'levelFailed':
                    analytics.levelFailed(value); //currentLevel // Level Failed, this should be called when the user fails a level
                    break;
                case 'score':
                    analytics.score(value); //scoreValue // Highscore call, should be called when the highscore popup also shows
                    break;
            }
        } else {
            trace(GodStepAPI.apiName + " Analytics " + method + " " + (value ? value : ''));
        }
    };
    pro.redirect = function() {
        if(window['moregames']) {
            window['moregames'].redirect();
        } else {
            trace(GodStepAPI.apiName + ' MoreGames');
        }
    };


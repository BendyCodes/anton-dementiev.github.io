var src;
(function (src) {
    class CustomScaleManager {
        static update(newWidth, newHeight) {
            CustomScaleManager.WIDTH = newWidth;
            CustomScaleManager.HEIGHT = newHeight;
            let newRatio = newWidth / newHeight;
            if (newRatio >= CustomScaleManager.ORIGINAL_RATIO) {
                CustomScaleManager.SCALE_X = CustomScaleManager.SCALE_Y = newHeight / CustomScaleManager.ORIGINAL_HEIGHT;
            }
            else {
                CustomScaleManager.SCALE_X = CustomScaleManager.SCALE_Y = newWidth / CustomScaleManager.ORIGINAL_WIDTH;
            }
            if (src.App.instance.scale.scaleMode != Phaser.ScaleManager.RESIZE) {
                src.App.instance.state.getCurrentState().resize(src.App.instance.width, src.App.instance.height);
            }
            src.WindowManager.instance.resize();
            src.TransitionScreen.instance.resize();
        }
        static getScaleMode() {
            // return Settings.USE_HIGH_RESOLUTION_SCALING ? Phaser.ScaleManager.USER_SCALE : Phaser.ScaleManager.RESIZE;
            return Phaser.ScaleManager.SHOW_ALL;
        }
        static getPixelRatio() {
            return src.App.instance.device.desktop || !src.ProjectSettings.USE_HIGH_RESOLUTION_SCALING ? 1 : Math.min(src.App.instance.device.pixelRatio, src.ProjectSettings.PIXEL_RATIO_MAX_THRESHOLD);
        }
        static minX() {
            return 0;
        }
        static maxX() {
            return 1;
        }
        static centerX() {
            return 0.5;
        }
        static minY() {
            return 0;
        }
        static maxY() {
            return 1;
        }
        static centerY() {
            return 0.5;
        }
    }
    CustomScaleManager.ORIGINAL_WIDTH = 640;
    CustomScaleManager.ORIGINAL_HEIGHT = 427;
    CustomScaleManager.WIDTH = 640;
    CustomScaleManager.HEIGHT = 427;
    CustomScaleManager.SCALE_X = 1;
    CustomScaleManager.SCALE_Y = 1;
    CustomScaleManager.ORIGINAL_RATIO = CustomScaleManager.ORIGINAL_WIDTH / CustomScaleManager.ORIGINAL_HEIGHT;
    src.CustomScaleManager = CustomScaleManager;
})(src || (src = {}));
var src;
(function (src) {
    class RenderUtils {
        static detectRenderMode() {
            const isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0;
            const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            const isOldIPhone = window.navigator.userAgent.indexOf('iPhone ') > -1 && window.screen.width <= 414 && window.screen.height <= 736;
            return isIE || isFirefox || isOldIPhone ? Phaser.CANVAS : Phaser.AUTO;
        }
    }
    src.RenderUtils = RenderUtils;
})(src || (src = {}));
///<reference path="scale/CustomScaleManager.ts"/>
///<reference path="utils/RenderUtils.ts"/>
var src;
(function (src) {
    class App extends Phaser.Game {
        constructor() {
            super(App.gameConfig);
            App.instance = this;
            this.state.add('Boot', src.Boot, false);
            this.state.add('Preloader', src.Preloader, false);
            this.state.add('MainMenu', src.MainMenu, false);
            this.state.add('Level', src.Level, false);
            this.state.start('Boot');
        }
        navigateToSponsor() {
            window["moreGamesHandler"]();
        }
    }
    App.gameConfig = {
        width: src.CustomScaleManager.ORIGINAL_WIDTH,
        height: src.CustomScaleManager.ORIGINAL_HEIGHT,
        renderer: src.RenderUtils.detectRenderMode(),
        transparent: false,
        enableDebug: true
    };
    src.App = App;
})(src || (src = {}));
var game;
window.onload = () => {
    game = new src.App();
};
var src;
(function (src) {
    class SoundController {
        constructor() {
            this.currentMusicVolume = src.ProjectSettings.MUSIC_ENABLED_BY_DEFAULT ? 0.5 : 0;
            this.currentSFXVolume = 0.5;
            this.hadBeenMutedBeforePauseTriggered = false;
            this.defaultMusicVolume = 0.5;
            this.defaultSFXVolume = 0.5;
            this.debouncedSoundsTimestamps = new Map();
            this.soundNames = [
                "click",
                'Bottle1',
                'Bottle2',
                'Bottle3',
                'Bottle4',
                'ComboAll',
                'Shoot1',
                'Shoot2',
                'Shoot3',
                'Shoot4',
                'MusicGameplay',
                'MusicScore',
                'Jamp',
                'Landing',
                'GunIn',
                'GunShot',
                'Window',
                'VoiceAllright1',
                'VoiceAllright2',
                'VoiceAllright3',
                'VoiceDeath',
                'VoiceHowdee',
                'VoiceLaugh',
                'Ambient',
                'UfoExplosion',
                'VoiceInFly1',
                'VoiceInFly2',
                'SoundStamp',
                'SoundMedalScore',
                'SoundMedalGame',
                'SoundComboCounter',
                'SoundMegaChain',
                'Soundx2Down',
                'Soundx2Up',
                'SoundConfetti'
            ];
        }
        static get instance() {
            return SoundController._instance ? SoundController._instance :
                SoundController._instance = new SoundController();
        }
        isDecodingSupported() {
            return src.App.instance.sound.usingWebAudio;
        }
        getSoundNames() {
            return this.soundNames;
        }
        /**
         * MUSIC
         */
        init() {
            this.countingSound = src.App.instance.add.sound('SoundComboCounter', 0.5, true);
            this.countingSound.volume = 0;
        }
        startMusic() {
            this.mainTheme = src.App.instance.sound.play('Ambient', this.currentMusicVolume, true);
            if (src.App.instance.sound.usingWebAudio && src.App.instance.sound.context.state === 'suspended') {
                src.App.instance.input.onTap.addOnce(() => {
                    if (src.App.instance.sound.context.state === 'suspended') {
                        src.App.instance.sound.context.resume();
                    }
                });
            }
        }
        /**
         * PAUSE/RESUME SOUND
         */
        pauseAudio() {
            this.hadBeenMutedBeforePauseTriggered = src.App.instance.sound.mute;
            src.App.instance.sound.mute = true;
        }
        resumeAudio() {
            src.App.instance.sound.mute = this.hadBeenMutedBeforePauseTriggered;
            if (src.App.instance.sound.usingWebAudio && src.App.instance.sound.context.state === 'suspended') {
                src.App.instance.input.onTap.addOnce(() => {
                    if (src.App.instance.sound.context.state === 'suspended') {
                        src.App.instance.sound.context.resume();
                    }
                });
            }
        }
        getMusicVolume() {
            return this.currentMusicVolume;
        }
        setMusicVolume(value) {
            this.currentMusicVolume = Phaser.Math.clamp(value, 0, 1);
            if (this.mainTheme && this.mainTheme.isPlaying) {
                this.mainTheme.volume = this.currentMusicVolume;
            }
        }
        getSFXVolume() {
            return this.currentSFXVolume;
        }
        setSFXVolume(value) {
            this.currentSFXVolume = Phaser.Math.clamp(value, 0, 1);
        }
        isMusicMuted() {
            return this.currentMusicVolume == 0;
        }
        isSFXMuted() {
            return this.currentSFXVolume == 0;
        }
        /**
         * SOUNDS
         */
        playClickSound() {
            this.startSound('click');
        }
        playSound(key, completeCallback = null, completeCallbackContext = null) {
            if (completeCallback) {
                const sound = this.startSound(key);
                if (sound)
                    sound.onStop.addOnce(completeCallback, completeCallbackContext);
                else
                    src.App.instance.time.events.add(20, completeCallback, completeCallbackContext);
            }
            else {
                this.startSound(key);
            }
        }
        playMusic(key, fade = true) {
            if (this.mainTheme) {
                if (this.mainTheme.key != key) {
                    this.mainTheme.stop();
                }
                else {
                    return;
                }
            }
            this.mainTheme = src.App.instance.sound.play(key, fade ? 0 : this.currentMusicVolume, true);
            if (fade) {
                this.mainTheme.fadeTo(0.35, this.currentMusicVolume);
            }
        }
        startSound(key, volume = 0.5, loop = false) {
            if (src.App.instance.sound.usingWebAudio && src.App.instance.sound.context.state === 'suspended') {
                //skip this sound
                return null;
            }
            else {
                return src.App.instance.sound.play(key, volume * this.currentSFXVolume, loop);
            }
        }
        /**
         * COUNTING
         */
        startCountingSound() {
            this.countingSound.play();
            this.countingSound.volume = 0.5;
        }
        stopCountingSound() {
            if (this.countingSound.isPlaying) {
                this.countingSound.stop();
            }
            this.countingSound.volume = 0;
        }
        /**
         * PRIVATE
         */
        debounceSound(key, volume, interval) {
            const currentTime = new Date().getTime();
            const lastTimestamp = this.debouncedSoundsTimestamps.get(key) || 0;
            if (currentTime - lastTimestamp >= interval) {
                this.startSound(key, volume, false);
                this.debouncedSoundsTimestamps.set(key, currentTime);
            }
        }
        /**
         * MUSIC
         */
        chokeMusicVolume(duration = 500) {
            if (this.mainTheme) {
                this.mainTheme.fadeTo(duration, this.currentMusicVolume / 2);
            }
        }
        restoreMusicVolume(duration = 500) {
            if (this.mainTheme) {
                this.mainTheme.fadeTo(duration, this.currentMusicVolume);
            }
        }
    }
    SoundController._instance = null;
    src.SoundController = SoundController;
})(src || (src = {}));
var src;
(function (src) {
    class AutoResizeableState extends Phaser.State {
        init(containerWidth = src.CustomScaleManager.ORIGINAL_WIDTH, containerHeight = src.CustomScaleManager.ORIGINAL_HEIGHT) {
            super.init();
            this.isInitialized = false;
            this.containerWidth = containerWidth;
            this.containerHeight = containerHeight;
            this.container = this.add.existing(this.game.make.group(null));
            this.originalBounds = new WindowBounds();
            this.originalBounds.set(0, src.CustomScaleManager.ORIGINAL_WIDTH, 0, src.CustomScaleManager.ORIGINAL_HEIGHT);
            this.resize();
        }
        create() {
            this.isInitialized = true;
        }
        addChild(child) {
            return this.container.add(child);
        }
        getInputPosition() {
            return new Phaser.Point((this.game.input.activePointer.x - this.container.x) / src.CustomScaleManager.SCALE_X, (this.game.input.activePointer.y - this.container.y) / src.CustomScaleManager.SCALE_Y);
        }
        translateInputPosition(pointer) {
            return new Phaser.Point((pointer.x - this.container.x) / src.CustomScaleManager.SCALE_X, (pointer.y - this.container.y) / src.CustomScaleManager.SCALE_Y);
        }
        resize(width = 0, height = 0) {
            this.container.scale.set(src.CustomScaleManager.SCALE_X, src.CustomScaleManager.SCALE_Y);
            this.container.position.set(src.CustomScaleManager.WIDTH / 2 - this.containerWidth * src.CustomScaleManager.SCALE_X / 2, src.CustomScaleManager.HEIGHT / 2 - this.containerHeight * src.CustomScaleManager.SCALE_Y / 2);
            this.windowBounds = this.windowBounds || new WindowBounds();
            this.windowBounds.set(-(src.CustomScaleManager.WIDTH / src.CustomScaleManager.SCALE_X - this.containerWidth) / 2, (src.CustomScaleManager.WIDTH / src.CustomScaleManager.SCALE_X - this.containerWidth) / 2 + this.containerWidth, -(src.CustomScaleManager.HEIGHT / src.CustomScaleManager.SCALE_Y - this.containerHeight) / 2, (src.CustomScaleManager.HEIGHT / src.CustomScaleManager.SCALE_Y - this.containerHeight) / 2 + this.containerHeight);
        }
        shutdown() {
            this.container.destroy();
            this.container = null;
        }
    }
    src.AutoResizeableState = AutoResizeableState;
    class WindowBounds {
        constructor() {
            this.set(0, 0, 0, 0);
        }
        set(left, right, top, down) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.down = down;
            this.x = left;
            this.y = top;
            this.width = right - left;
            this.height = down - top;
            this.centerX = (right + left) / 2;
            this.centerY = (down + top) / 2;
        }
        getRelative(rx, ry, dx = 0, dy = 0) {
            return new Phaser.Point(this.left + rx * this.width + dx, this.top + ry * this.height + dy);
        }
    }
    src.WindowBounds = WindowBounds;
})(src || (src = {}));
var src;
(function (src) {
    class Boot extends Phaser.State {
        init() {
            this.game.scale.scaleMode = src.CustomScaleManager.getScaleMode();
            this.game.scale.fullScreenScaleMode = src.CustomScaleManager.getScaleMode();
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            if (this.game.device.android) {
                this.game.input.mouse.enabled = !this.game.device.mspointer;
            }
            // this.game.scale.setResizeCallback(this.resizeCallback, this);
            // this.game.scale.onSizeChange.add(this.sizeChanged, this);
            if (src.ProjectSettings.DISPLAY_FPS) {
                this.game.plugins.add(Phaser.Plugin["AdvancedTiming"], { mode: "domText" });
            }
        }
        preload() {
            this.game.load.atlasJSONArray(src.ProjectSettings.PRELOADER_ATLAS, 'img/' + src.ProjectSettings.PRELOADER_ATLAS + '.png', 'img/' + src.ProjectSettings.PRELOADER_ATLAS + '.json');
            this.game.load.json('l10n', 'lang/texts.json');
        }
        create() {
            this.input.maxPointers = 1;
            if (this.game.device.desktop) {
                this.game.canvas.oncontextmenu = function (e) {
                    e.preventDefault();
                };
            }
            src.LocalizationManager.init(this.game.cache.getJSON('l10n'));
            this.game.state.start('Preloader', true, false);
        }
        resizeCallback(scaleManager, parentBounds) {
            if (src.CustomScaleManager.getScaleMode() == Phaser.ScaleManager.USER_SCALE) {
                if (this.game.width != window.innerWidth * src.CustomScaleManager.getPixelRatio() || this.game.height != window.innerHeight * src.CustomScaleManager.getPixelRatio()) {
                    scaleManager.setGameSize(window.innerWidth * src.CustomScaleManager.getPixelRatio(), window.innerHeight * src.CustomScaleManager.getPixelRatio());
                    scaleManager.setUserScale(1 / src.CustomScaleManager.getPixelRatio(), 1 / src.CustomScaleManager.getPixelRatio());
                }
            }
        }
        sizeChanged(scaleManager, w, h) {
            const windowDimensions = (this.game.device.android
                && window["visualViewport"]
                && window["visualViewport"].width
                && window["visualViewport"].height)
                ? new Phaser.Rectangle(0, 0, Math.min(w, window["visualViewport"].width), Math.min(h, window["visualViewport"].height))
                : new Phaser.Rectangle(0, 0, window.innerWidth, window.innerHeight);
            src.CustomScaleManager.update(windowDimensions.width * src.CustomScaleManager.getPixelRatio(), windowDimensions.height * src.CustomScaleManager.getPixelRatio());
        }
    }
    src.Boot = Boot;
})(src || (src = {}));
///<reference path="AutoResizeableState.ts"/>
var src;
(function (src) {
    class Level extends src.AutoResizeableState {
        create() {
            super.create();
            src.ScoreManager.instance.reset();
            this.gameStateManager = this.addChild(new src.GameStateManager(this));
            this.screen = new src.Screen(this);
            this.zoom = this.screen.zoom;
            this.space = this.screen.zoom.space;
            this.addChild(this.screen);
            this.screen.replay(Level.SHOW_HELP);
            this.gameStateManager.startLevel();
            this.uiManager = this.addChild(new src.UIManager(this));
        }
        postUpdate() {
            if (this.gameStateManager && !this.gameStateManager.isPaused() && this.gameStateManager.isActive()) {
                this.screen.updateDelta(this.game.time.elapsedMS / 1000);
                this.screen.render();
            }
        }
        shutdown() {
            this.gameStateManager.destroy();
            this.gameStateManager = null;
            this.uiManager.destroy();
            this.uiManager = null;
            super.shutdown();
        }
    }
    Level.SHOW_HELP = true;
    src.Level = Level;
})(src || (src = {}));
var src;
(function (src) {
    class MainMenu extends src.AutoResizeableState {
        create() {
            super.create();
            this.buildContent();
            src.SoundController.instance.playMusic('Ambient');
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.handleSpacebarPressed, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.handleSpacebarPressed, this);
            this.resize(this.game.world.width, this.game.world.height);
        }
        resize(w, h) {
            super.resize(w, h);
            if (this.isInitialized) {
            }
        }
        shutdown() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
            super.shutdown();
        }
        /**
         * BUILDERS
         */
        buildContent() {
            this.background = this.addChild(this.game.make.image(0, 0, 'main-menu'));
            if (this.game.device.desktop) {
                this.keyHelper = this.addChild(this.game.make.sprite(340, 12, src.ProjectSettings.GAME_ATLAS, 'mainMenuKeyHelper0000'));
            }
            this.menuAnim = this.addChild(new src.MainMenuAnim(185, 181));
            this.buttonPlay = this.addChild(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonPlay', 538, 355, this.playClicked, this, 1, 2));
            this.buttonSubmit = this.addChild(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonSubmit', 83, 386, this.submitClicked, this, 1, 2));
            this.buttonMore = this.addChild(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonMoreGames', 556, 243, this.moreClicked, this, 1, 2));
            this.buttonFacebook = this.addChild(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonFacebook', 373, 386, this.facebookClicked, this, 1, 2));
            this.buttonCredits = this.addChild(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonCredits', 556, 168, this.creditsClicked, this, 1, 2));
            this.buttonSubmit.visible = window["enableSubmitButton"];
            this.buttonFacebook.visible = window["enableFacebookButton"];
            this.buttonMore.visible = window["enableMoreGamesButton"];
            this.bestScoreText = this.addChild(src.TextUtils.getStyledText('' + src.ScoreManager.instance.getMaxScores(), 217, 400, 40, '#FFFFFF', 'rgba(0,0,0,0.42)', 8, false, "left"));
            this.bestScoreText.anchor.set(0, 0.5);
            if (src.MedalManager.instance.getMedalLevel() > 0) {
                this.medal = this.addChild(new src.MedalInformer('medalSmall', src.MedalManager.instance.getMedalLevel(), 80, -59));
                this.medal.position.set(240, 320);
            }
        }
        /**
         * HANDLERS
         */
        handleSpacebarPressed() {
            this.playClicked();
        }
        playClicked() {
            src.TransitionScreen.instance.changeState("Level");
        }
        moreClicked() {
            src.App.instance.navigateToSponsor();
        }
        creditsClicked() {
            src.WindowManager.instance.showCredits();
        }
        submitClicked() {
            window["submitScoreHandler"](src.ScoreManager.instance.getMaxScores());
        }
        facebookClicked() {
            window["shareOnFacebookHandler"](src.ScoreManager.instance.getMaxScores());
        }
    }
    src.MainMenu = MainMenu;
})(src || (src = {}));
var src;
(function (src) {
    class Preloader extends src.AutoResizeableState {
        preload() {
            super.preload(this.game);
            this.buildChildren();
            this.preloadContent();
            this.resize(this.game.width, this.game.height);
        }
        buildChildren() {
            this.preloadContainer = this.addChild(this.game.make.group());
            this.preloadBackground = this.preloadContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.PRELOADER_ATLAS, 'preloaderBackground0000'));
            this.preloadBackground.anchor.setTo(0.5);
            this.preloadHero = this.preloadContainer.add(this.game.make.sprite(0, -33, src.ProjectSettings.PRELOADER_ATLAS));
            this.preloadHero.anchor.setTo(0.5);
            this.preloadHero.animations.add('preloadHero', Phaser.Animation.generateFrameNames('preloaderHero', 0, 23, '', 4)).play(60, true);
            this.preloadProgress = this.preloadContainer.add(this.game.make.sprite(-50, 41, src.ProjectSettings.PRELOADER_ATLAS, 'preloaderProgress0000'));
            this.preloadProgress.anchor.setTo(0, 0.5);
            this.versionText = this.addChild(src.TextUtils.getText(src.ProjectSettings.GAME_VERSION, 0, 0, 12, "#ffffff"));
            this.preloadText = this.preloadContainer.add(src.TextUtils.getStyledText("Loading 0%", 0, 20, 24, "#FFF4E6", 'rgba(0,0,0,0.2)', 5));
            this.infoText = this.preloadContainer.add(src.TextUtils.getText(src.LocalizationManager.getText('txt_preloader_info'), 0, 190, 16, "#FFF4E6"));
            this.game.load.onFileComplete.add(this.onFileComplete, this);
            this.game.load.onLoadComplete.add(this.onLoadingComplete, this);
            this.isInitialized = true;
        }
        preloadContent() {
            for (let soundName of src.SoundController.instance.getSoundNames()) {
                this.game.load.audio(soundName, ['sound/mp3/' + soundName + '.mp3', 'sound/m4a/' + soundName + '.m4a', 'sound/ogg/' + soundName + '.ogg']);
            }
            this.game.load.xml('chain', 'xml/chain.xml');
            this.game.load.atlasJSONArray(src.ProjectSettings.GAME_ATLAS, 'img/' + src.ProjectSettings.GAME_ATLAS + '.png', 'img/' + src.ProjectSettings.GAME_ATLAS + '.json');
            this.game.load.atlasJSONArray(src.ProjectSettings.EFFECTS_ATLAS, 'img/' + src.ProjectSettings.EFFECTS_ATLAS + '.png', 'img/' + src.ProjectSettings.EFFECTS_ATLAS + '.json');
            this.game.load.atlasJSONArray('confetti', 'img/confetti.png', 'img/confetti.json');
            this.game.load.image('camera_shadow', 'img/backgrounds/camera_shadow.png');
            this.game.load.image('x2_star_light', 'img/backgrounds/x2_star_light.png');
            this.game.load.image('x3_star_light', 'img/backgrounds/x3_star_light.png');
            this.game.load.image('x4_star_light', 'img/backgrounds/x4_star_light.png');
            this.game.load.image('main-menu', 'img/main-menu.png');
            this.game.load.image('Fon1Background', 'img/backgrounds/Fon1Background.png');
            this.game.load.image('Fon1To2', 'img/backgrounds/Fon1To2.png');
            this.game.load.image('Fon2Background', 'img/backgrounds/Fon2Background.png');
            this.game.load.image('Fon2To1', 'img/backgrounds/Fon2To1.png');
        }
        create() {
            super.create();
        }
        resize(width, height) {
            super.resize(width, height);
            if (this.isInitialized) {
                this.preloadContainer.position.set(this.windowBounds.centerX, this.windowBounds.centerY);
                this.versionText.position.set(this.windowBounds.right + 25, this.windowBounds.down + 16);
            }
        }
        onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
            let progressKey = Phaser.Math.clamp(Math.round(progress * 50 / 100), 0, 49);
            this.preloadProgress.frameName = Phaser.Animation.generateFrameNames('preloaderProgress', progressKey, progressKey, '', 4)[0];
            this.preloadText.setText(src.LocalizationManager.getText('txt_preloader_loading') + " " + progress + "%");
        }
        onLoadingComplete() {
            src.SoundController.instance.init();
            src.LocalStorageController.instance.loadSave();
            src.WindowManager.instance.init();
            src.TransitionScreen.instance.init();
            src.ChainGenerator.init();
            this.preloadText.setText(src.LocalizationManager.getText('txt_preloader_decoding_sounds'));
            this.preloadProgress.alpha = 0;
            if (src.SoundController.instance.isDecodingSupported()) {
                this.game.sound.setDecodedCallback(src.SoundController.instance.getSoundNames(), this.onSoundsDecoded, this);
            }
            else {
                this.onSoundsDecoded();
            }
        }
        onSoundsDecoded() {
            src.SoundController.instance.startMusic();
            src.TransitionScreen.instance.changeState("MainMenu", () => src.SoundButtonsController.instance.start());
        }
    }
    src.Preloader = Preloader;
})(src || (src = {}));
var src;
(function (src) {
    class TransitionScreen extends Phaser.Group {
        constructor() {
            super(src.App.instance, null);
            this.isInitialized = false;
        }
        static get instance() {
            return TransitionScreen._instance ? TransitionScreen._instance : TransitionScreen._instance = new TransitionScreen();
        }
        buildChildren() {
            this.background = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'blackSquare0000'));
            this.background.anchor.set(0.5);
            this.background.alpha = 0.0;
            this.background.inputEnabled = true;
            this.background.events.onInputDown.add(() => console.log('Transition Screen: input locked'));
            this.screen = this.add(this.game.make.sprite(0, src.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 12, src.ProjectSettings.GAME_ATLAS, 'transitionSplash0000'));
            this.screen.anchor.set(0.5, 1);
            this.screen.scale.y = 0;
        }
        init() {
            this.isInitialized = true;
            this.buildChildren();
        }
        resize() {
            if (this.isInitialized) {
                this.position.set(this.game.world.centerX, this.game.world.centerY);
                this.background.width = this.game.width + 100;
                this.background.height = this.game.height + 100;
            }
        }
        changeState(newState, callback = null) {
            this.targetStateName = newState;
            this.callback = callback;
            this.show();
        }
        show() {
            this.game.stage.addChild(this);
            this.visible = true;
            src.SoundController.instance.playSound("Window");
            this.resize();
            this.game.add.tween(this.background)
                .to({ alpha: 0.4 }, 360, Phaser.Easing.Sinusoidal.Out, true)
                .onComplete.add(this.close, this);
            this.game.add.tween(this.screen.scale)
                .to({ y: 1 }, 360, Phaser.Easing.Circular.Out, true);
        }
        close() {
            if (this.targetStateName) {
                this.game.state.start(this.targetStateName, true, false);
                src.WindowManager.instance.hideAll();
            }
            if (this.callback) {
                this.callback();
                this.callback = null;
            }
            this.proceedClosing();
        }
        proceedClosing() {
            if (this.parent && this.parent.getChildIndex(this) > -1) {
                this.parent.setChildIndex(this, this.parent.children.length - 1);
            }
            else {
                this.game.stage.addChild(this);
            }
            setTimeout(() => {
                this.game.add.tween(this.screen.scale)
                    .to({ y: 0 }, 320, Phaser.Easing.Sinusoidal.In, true);
                this.game.add.tween(this.background)
                    .to({ alpha: 0 }, 320, Phaser.Easing.Sinusoidal.In, true)
                    .onComplete.add(this.onTransitionFinished, this);
            }, 250);
            setTimeout(() => {
                this.onTransitionFinished();
            }, 600);
        }
        onTransitionFinished() {
            this.hide();
        }
        hide() {
            if (this.parent && this.parent.getChildIndex(this) > -1) {
                this.parent.removeChild(this);
            }
            this.visible = false;
        }
    }
    TransitionScreen._instance = null;
    src.TransitionScreen = TransitionScreen;
})(src || (src = {}));
var src;
(function (src) {
    class ButtonUtils {
        static createButton(atlasName, spriteName, x, y, callback, callbackContext, overFrame = 0, downFrame = 0) {
            let button = new Phaser.Button(src.App.instance, x, y, atlasName, callback, callbackContext, spriteName + '000' + overFrame, spriteName + '0000', spriteName + '000' + downFrame, spriteName + '0000');
            button.anchor.setTo(0.5, 0.5);
            button.input.pixelPerfectClick = true;
            button.input.pixelPerfectAlpha = 1;
            button.input.useHandCursor = true;
            button.events.onInputDown.add(() => src.SoundController.instance.playClickSound());
            return button;
        }
        static createOneFrameButton(atlasName, spriteName, x, y, callback, callbackContext) {
            let button = new Phaser.Button(src.App.instance, x, y, atlasName, callback, callbackContext, spriteName + '0000', spriteName + '0000', spriteName + '0000', spriteName + '0000');
            button.anchor.setTo(0.5, 0.5);
            button.input.pixelPerfectClick = true;
            button.input.pixelPerfectAlpha = 1;
            button.input.useHandCursor = true;
            button.events.onInputDown.add(() => src.SoundController.instance.playClickSound());
            return button;
        }
        static createSimpleButton(atlasName, spriteName, x, y, startScale, callback, callbackContext) {
            let button = new Phaser.Button(src.App.instance, x, y, atlasName, callback, callbackContext, spriteName + '0000', spriteName + '0000', spriteName + '0000', spriteName + '0000');
            button.anchor.setTo(0.5, 0.5);
            button.scale.set(startScale);
            button.input.pixelPerfectClick = true;
            button.input.pixelPerfectAlpha = 1;
            button.input.useHandCursor = false;
            button["overTween"] = src.App.instance.add.tween(button.scale).to({ x: startScale * 1.05, y: startScale * 1.05 }, 100);
            button["outTween"] = src.App.instance.add.tween(button.scale).to({ x: startScale, y: startScale }, 100);
            button["downTween"] = src.App.instance.add.tween(button.scale).to({ x: startScale * 0.95, y: startScale * 0.95 }, 50).to({ x: startScale, y: startScale }, 50);
            button.events.onInputOver.add(ButtonUtils.mouseOverHandler, this, 0);
            button.events.onInputOut.add(ButtonUtils.mouseOutHandler, this, 0);
            button.events.onInputDown.add(ButtonUtils.mouseDownHandler, this, 0);
            button.events.onInputDown.add(() => src.SoundController.instance.playClickSound());
            return button;
        }
        static mouseOverHandler(caller) {
            caller["overTween"].start();
        }
        static mouseOutHandler(caller) {
            caller["outTween"].start();
        }
        static mouseDownHandler(caller) {
            caller["downTween"].start();
        }
    }
    src.ButtonUtils = ButtonUtils;
})(src || (src = {}));
var src;
(function (src) {
    class ColorUtils {
        static tweenTint(spriteToTween, startColor, endColor, duration) {
            let colorBlend = { step: 0 };
            src.App.instance.add.tween(colorBlend).to({ step: 100 }, duration, Phaser.Easing.Linear.None, true)
                .onUpdateCallback(() => {
                spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);
            })
                .onComplete.add(() => spriteToTween.tint = endColor);
        }
        ;
    }
    src.ColorUtils = ColorUtils;
})(src || (src = {}));
var src;
(function (src) {
    class ProjectSettings {
    }
    //SCALING
    ProjectSettings.USE_HIGH_RESOLUTION_SCALING = true;
    ProjectSettings.PIXEL_RATIO_MAX_THRESHOLD = 3;
    //FONTS
    ProjectSettings.DEFAULT_FONT_FAMILY = 'cheeseFR';
    //WINDOWS
    ProjectSettings.WINDOW_BACKGROUND_ALPHA = 0.8;
    //MEDALS
    ProjectSettings.GOLD_MEDAL_SCORE = 100000;
    ProjectSettings.SILVER_MEDAL_SCORE = 50000;
    ProjectSettings.BRONZE_MEDAL_SCORE = 10000;
    //ATLASES
    ProjectSettings.PRELOADER_ATLAS = 'preloader';
    ProjectSettings.GAME_ATLAS = 'assets';
    ProjectSettings.EFFECTS_ATLAS = 'effects';
    //SETTINGS
    ProjectSettings.GAME_VERSION = "v1.0a";
    ProjectSettings.DISPLAY_FPS = false;
    ProjectSettings.MUSIC_ENABLED_BY_DEFAULT = true;
    ProjectSettings.LOCAL_STORAGE_KEY = 'Amazing_Sheriff';
    src.ProjectSettings = ProjectSettings;
})(src || (src = {}));
///<reference path="../ProjectSettings.ts"/>
var src;
(function (src) {
    class LocalStorageController {
        constructor() {
            this.isLocalStorageSupported = false;
            this.data = null;
            this.data = {
                "maxScore": 0,
                "medalLevel": 0
            };
        }
        static get instance() {
            return LocalStorageController._instance ? LocalStorageController._instance
                : LocalStorageController._instance = new LocalStorageController();
        }
        getMaxScores() {
            return this.data["maxScore"];
        }
        getMedalLevel() {
            return this.data["medalLevel"];
        }
        save() {
            this.data["maxScore"] = src.ScoreManager.instance.getMaxScores();
            this.data["medalLevel"] = src.MedalManager.instance.getMedalLevel();
            if (this.isLocalStorageSupported) {
                localStorage[LocalStorageController.STORAGE_NAME] = JSON.stringify(this.data);
            }
        }
        checkLocalStorageSupported() {
            try {
                this.isLocalStorageSupported = "localStorage" in window && window["localStorage"] !== null;
            }
            catch (e) {
                this.isLocalStorageSupported = false;
            }
        }
        loadSave() {
            this.checkLocalStorageSupported();
            if (this.isLocalStorageSupported) {
                if (localStorage[LocalStorageController.STORAGE_NAME]) {
                    this.data = JSON.parse(localStorage[LocalStorageController.STORAGE_NAME]);
                }
                else {
                    localStorage[LocalStorageController.STORAGE_NAME] = JSON.stringify(this.data);
                }
            }
            this.finalizeLoading();
        }
        finalizeLoading() {
            src.ScoreManager.instance.setMaxScores(LocalStorageController.instance.getMaxScores());
            src.MedalManager.instance.updateMedalLevel(LocalStorageController.instance.getMedalLevel());
        }
    }
    LocalStorageController.STORAGE_NAME = src.ProjectSettings.LOCAL_STORAGE_KEY;
    src.LocalStorageController = LocalStorageController;
})(src || (src = {}));
var src;
(function (src) {
    class LocalizationManager {
        static init(jsonFile) {
            LocalizationManager.texts = jsonFile;
        }
        static getText(key) {
            return LocalizationManager.texts[key] ? LocalizationManager.texts[key] : "NO_TEXT";
        }
    }
    src.LocalizationManager = LocalizationManager;
})(src || (src = {}));
var src;
(function (src) {
    class TextUtils {
        static getText(text, x, y, fontSize, color, fontFamily = src.ProjectSettings.DEFAULT_FONT_FAMILY, fontWidth = null) {
            let textField = new Phaser.Text(src.App.instance, x, y, text, {
                font: (fontWidth ? fontWidth + ' ' : '') + fontSize + "px " + fontFamily,
                fill: color,
                align: "center"
            });
            textField.anchor.setTo(0.5, 0.5);
            return textField;
        }
        static getBitmapText(text, x, y, fontSize, color = 0xFFFFFF, family = src.ProjectSettings.DEFAULT_FONT_FAMILY) {
            let textField = new Phaser.BitmapText(src.App.instance, x, y, family, text, fontSize, "center");
            textField.anchor.setTo(0.5, 0.5);
            textField.tint = color;
            return textField;
        }
        static getShadowText(text, x, y, fontSize, color, shadowColor = "#000000", shadowX = 0, shadowY = 2, anchorX = 0.5, anchorY = 0.5, fontFamily = src.ProjectSettings.DEFAULT_FONT_FAMILY, fontWidth = null) {
            let textField = new Phaser.Text(src.App.instance, x, y, text, {
                font: (fontWidth ? fontWidth + ' ' : '') + fontSize + "px " + fontFamily,
                fill: color,
                align: "center"
            });
            textField.anchor.setTo(anchorX, anchorY);
            textField.setShadow(shadowX, shadowY, shadowColor, 0);
            return textField;
        }
        static getStyledText(text, x, y, fontSize, color, strokeColor, strokeThinkness = 4, enableShadow = false, textAlign = "center") {
            let textField = new Phaser.Text(src.App.instance, x, y, text, {
                font: '' + fontSize + "px " + src.ProjectSettings.DEFAULT_FONT_FAMILY,
                fill: color,
                stroke: strokeColor,
                strokeThickness: strokeThinkness,
                align: textAlign
            });
            if (enableShadow) {
                textField.setShadow(0, 2, strokeColor, 0);
            }
            textField.anchor.set(0.5, 0.5);
            return textField;
        }
        static convertMSToHumanTime(milliseconds) {
            let seconds = Math.floor(milliseconds / 1000);
            let minutes = Math.floor(seconds / 60);
            let restSeconds = seconds - minutes * 60;
            return (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + restSeconds;
        }
        static normalizeTime(seconds) {
            let restSeconds = seconds;
            let hours = Math.floor(restSeconds / 3600);
            restSeconds %= 3600;
            let minutes = Math.floor(restSeconds / 60);
            restSeconds %= 60;
            return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + restSeconds;
        }
        static tweenText(textField, initialValue, targetValue, duration, delay) {
            let valueHolder = { value: initialValue };
            src.App.instance.add.tween(valueHolder)
                .to({ value: targetValue }, duration, Phaser.Easing.Linear.None, true, delay)
                .onUpdateCallback(() => textField.setText('' + Math.floor(valueHolder.value)))
                .onComplete.add(() => textField.setText('' + Math.floor(valueHolder.value)));
        }
    }
    src.TextUtils = TextUtils;
})(src || (src = {}));
var src;
(function (src) {
    class BaseWindow extends Phaser.Group {
        constructor(regX, regY, backgroundAlpha = src.ProjectSettings.WINDOW_BACKGROUND_ALPHA) {
            super(src.App.instance, null);
            this.backgroundAlpha = src.ProjectSettings.WINDOW_BACKGROUND_ALPHA;
            this.registrationPoint = new Phaser.Point(regX, regY);
            this.backgroundAlpha = backgroundAlpha;
            this.visible = false;
            this.buildBackground();
            this.buildContent();
        }
        buildBackground() {
            this.background = this.add(this.game.make.sprite(-50, -50, src.ProjectSettings.GAME_ATLAS, 'blackSquare0000'));
            this.background.width = this.game.world.width + 100;
            this.background.height = this.game.world.height + 100;
            this.background.alpha = this.backgroundAlpha;
            this.background.inputEnabled = true;
        }
        buildContent() {
            this.content = this.game.make.group(this);
            this.content.inputEnableChildren = true;
        }
        resize() {
            this.background.width = this.game.world.width + 100;
            this.background.height = this.game.world.height + 100;
            this.content.scale.set(src.CustomScaleManager.SCALE_X, src.CustomScaleManager.SCALE_Y);
            this.content.position.set(src.CustomScaleManager.WIDTH / 2 - src.CustomScaleManager.ORIGINAL_WIDTH * src.CustomScaleManager.SCALE_X / 2, src.CustomScaleManager.HEIGHT / 2 - src.CustomScaleManager.ORIGINAL_HEIGHT * src.CustomScaleManager.SCALE_Y / 2);
        }
        show() {
            this.visible = true;
            this.resize();
            this.game.stage.addChild(this);
            src.SoundButtonsController.instance.getToTop();
        }
        hide() {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        lockUpButtons(...args) {
            for (let i = 0; i < args.length; i++) {
                args[i]["inputEnabled"] = false;
            }
        }
        unlockButtons(...args) {
            for (let i = 0; i < args.length; i++) {
                args[i]["inputEnabled"] = true;
            }
        }
        destroy() {
            super.destroy();
            this.background = null;
            this.content = null;
        }
    }
    src.BaseWindow = BaseWindow;
})(src || (src = {}));
var src;
(function (src) {
    class WindowManager {
        constructor() {
            this.isInitialized = false;
        }
        static get instance() {
            return WindowManager._instance ? WindowManager._instance : WindowManager._instance = new WindowManager();
        }
        init() {
            this.credits = new src.CreditsWindow();
            this.pause = new src.PauseWindow();
            this.quitMenu = new src.QuitMenuWindow();
            this.confirmRestart = new src.ConfirmRestartWindow();
            this.help = new src.HelpWindow();
            this.results = new src.ResultsWindow();
            this.isInitialized = true;
        }
        resize() {
            if (this.isInitialized) {
                this.credits.resize();
                this.pause.resize();
                this.quitMenu.resize();
                this.confirmRestart.resize();
                this.help.resize();
                this.results.resize();
            }
        }
        showCredits() {
            this.credits.show();
        }
        showPause() {
            this.pause.show();
        }
        showQuitMenuWindow() {
            this.quitMenu.show();
        }
        showConfirmRestartWindow() {
            this.confirmRestart.show();
        }
        showHelp() {
            this.help.show();
        }
        showResults() {
            this.results.show();
        }
        hideAll() {
            this.credits.hide();
            this.pause.hide();
            this.quitMenu.hide();
            this.confirmRestart.hide();
            this.help.hide();
            this.results.hide();
        }
    }
    WindowManager._instance = null;
    src.WindowManager = WindowManager;
})(src || (src = {}));
var src;
(function (src) {
    class Effect extends Phaser.Sprite {
        constructor(effectsManager, spriteKey, x, y, startFrame, endFrame, rotation = 0, fps = 60) {
            super(effectsManager.game, x, y, src.ProjectSettings.GAME_ATLAS);
            this.effectsManager = effectsManager;
            this.rotation = rotation;
            this.animations.add('spriteKey', Phaser.Animation.generateFrameNames(spriteKey, startFrame, endFrame, '', 4))
                .play(fps, false, true);
            this.events.onKilled.add(this.destroy, this);
        }
        destroy() {
            this.effectsManager = null;
            super.destroy();
        }
    }
    src.Effect = Effect;
})(src || (src = {}));
var src;
(function (src) {
    class EffectsManager extends Phaser.Group {
        constructor(space) {
            super(space.game);
            this.space = space;
        }
        addRastEffect(effectName, x, y, rotation) {
            let startFrame = 0;
            let endFrame = 0;
            let anchorX = 0.5;
            let anchorY = 0.5;
            switch (effectName) {
                case 'GunCloud':
                    endFrame = 29;
                    break;
                case 'JumpCloud1':
                    endFrame = 20;
                    anchorY = 0.75;
                    break;
                case 'GunLandingCloud1':
                    endFrame = 26;
                    break;
                case 'LandingCloud1':
                    endFrame = 24;
                    break;
                case 'GunShotCloud':
                    endFrame = 24;
                    anchorX = 0;
                    break;
                case 'score_effect_10':
                    endFrame = 19;
                    break;
                case 'score_effect_100':
                    endFrame = 19;
                    break;
            }
            let effect = this.add(new src.Effect(this, effectName, x, y, startFrame, endFrame, rotation));
            effect.anchor.set(anchorX, anchorY);
        }
        getComboEffect(combo, score, x, y) {
            return new src.ComboEffect(combo, score, x, y);
        }
        getSuperComboEffect(combo, score, x, y) {
            return new src.SuperComboEffect(combo, score, x, y);
        }
    }
    src.EffectsManager = EffectsManager;
})(src || (src = {}));
var src;
(function (src) {
    class ComboEffect extends Phaser.Group {
        constructor(combos, score, x, y) {
            super(src.App.instance, null);
            this.position.set(x, y);
            this.comboText = this.add(src.TextUtils.getStyledText('' + combos + ' Combo', 0, -18, 34, '#333333', '#FFFFFF', 8, false));
            this.scoreText = this.add(src.TextUtils.getStyledText('+' + score, 0, 19, 43, '#F54202', '#FFFFFF', 8, false));
            this.alpha = 0;
            this.scale.set(0.12, 3.3);
            const fps = 30;
            this.game.add.tween(this)
                .to({ alpha: 1 }, 4 / fps * 1000, Phaser.Easing.Sinusoidal.In, false, 5 / fps * 1000)
                .to({ alpha: 1 }, 5 / fps * 1000, Phaser.Easing.Sinusoidal.Out, false, 0)
                .to({ alpha: 0 }, 17 / fps * 1000, Phaser.Easing.Circular.In, false, 0)
                .start();
            this.game.add.tween(this.scale)
                .to({ x: 1.13, y: 1 }, 4 / fps * 1000, Phaser.Easing.Sinusoidal.In, false, 5 / fps * 1000)
                .to({ x: 0.93, y: 1.6 }, 5 / fps * 1000, Phaser.Easing.Sinusoidal.Out, false, 0)
                .to({ x: 1.7, y: 0.3 }, 17 / fps * 1000, Phaser.Easing.Circular.In, false, 0)
                .start();
        }
    }
    src.ComboEffect = ComboEffect;
})(src || (src = {}));
var src;
(function (src) {
    class SuperComboEffect extends Phaser.Group {
        constructor(combos, score, x, y) {
            super(src.App.instance, null);
            this.position.set(x, y);
            this.megaChainSprite = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'megaChainX30000'));
            this.megaChainSprite.anchor.set(0.5);
            this.effContainer = this.add(this.game.make.group());
            this.comboText = this.effContainer.add(src.TextUtils.getStyledText('' + combos + ' Combo', 0, -18, 34, '#333333', '#FFFFFF', 8, false));
            this.scoreText = this.effContainer.add(src.TextUtils.getStyledText('+' + score, 0, 19, 43, '#F54202', '#FFFFFF', 8, false));
            this.effContainer.alpha = 0;
            this.effContainer.scale.set(0.12, 3.3);
            this.megaChainSprite.position.set(0, 14);
            this.megaChainSprite.alpha = 0;
            const fps = 30;
            this.game.add.tween(this.effContainer)
                .to({ alpha: 1 }, 4 / fps * 1000, Phaser.Easing.Sinusoidal.In, false, 5 / fps * 1000)
                .to({ alpha: 1 }, 5 / fps * 1000, Phaser.Easing.Sinusoidal.Out, false, 0)
                .to({ alpha: 0 }, 17 / fps * 1000, Phaser.Easing.Circular.In, false, 0)
                .start();
            this.game.add.tween(this.effContainer.scale)
                .to({ x: 1.13, y: 1 }, 4 / fps * 1000, Phaser.Easing.Sinusoidal.In, false, 5 / fps * 1000)
                .to({ x: 0.93, y: 1.6 }, 5 / fps * 1000, Phaser.Easing.Sinusoidal.Out, false, 0)
                .to({ x: 1.7, y: 0.3 }, 17 / fps * 1000, Phaser.Easing.Circular.In, false, 0)
                .start();
            this.game.add.tween(this.megaChainSprite)
                .to({ alpha: 1, y: -96 }, 10 / fps * 1000, Phaser.Easing.Sinusoidal.Out, false, 7 / fps * 1000)
                .to({ alpha: 0, y: 5 }, 29 / fps * 1000, Phaser.Easing.Quadratic.In, false, 0)
                .start();
        }
    }
    src.SuperComboEffect = SuperComboEffect;
})(src || (src = {}));
var src;
(function (src) {
    let MedalLevel;
    (function (MedalLevel) {
        MedalLevel[MedalLevel["NONE"] = 0] = "NONE";
        MedalLevel[MedalLevel["BRONZE"] = 1] = "BRONZE";
        MedalLevel[MedalLevel["SILVER"] = 2] = "SILVER";
        MedalLevel[MedalLevel["GOLD"] = 3] = "GOLD";
    })(MedalLevel = src.MedalLevel || (src.MedalLevel = {}));
})(src || (src = {}));
var src;
(function (src) {
    class Confetti extends Phaser.Sprite {
        constructor() {
            super(src.App.instance, 0, -25, 'confetti');
            this.scale.set(2);
            this.anim = this.animations.add('confetti', Phaser.Animation.generateFrameNames('confetti', 0, 50, '', 4), 45, false);
            this.visible = false;
        }
        playAnim(tint) {
            this.game.tweens.removeFrom(this);
            this.tint = tint;
            this.visible = true;
            this.alpha = 0;
            this.anim.restart();
            this.game.add.tween(this)
                .to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, false)
                .to({ alpha: 1 }, 1460, Phaser.Easing.Linear.None, false)
                .to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, false)
                .start()
                .onComplete.add(this.stopAnim, this);
        }
        stopAnim() {
            this.visible = false;
            this.alpha = 0;
            this.game.tweens.removeFrom(this);
        }
    }
    src.Confetti = Confetti;
})(src || (src = {}));
var src;
(function (src) {
    class MainMenuAnim extends Phaser.Group {
        constructor(x, y) {
            super(src.App.instance);
            this.position.set(x, y);
            this.buildItems();
            this.startTweens();
        }
        buildItems() {
            this.cap = this.add(this.game.make.sprite(39, -103, src.ProjectSettings.GAME_ATLAS, 'menuCap0000'));
            this.cap.anchor.set(0.5);
            this.gun = this.add(this.game.make.sprite(-79, -60, src.ProjectSettings.GAME_ATLAS, 'menuGun0000'));
            this.gun.anchor.set(0.5);
            this.star = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'menuStar0000'));
            this.star.anchor.set(0.5);
            this.title = this.add(this.game.make.sprite(102, 293, src.ProjectSettings.GAME_ATLAS, 'menuName0000'));
            this.title.anchor.set(0.625, 2);
            this.title.angle = -1;
        }
        startTweens() {
            this.game.add.tween(this.cap)
                .to({ x: 41, y: -110 }, 70, Phaser.Easing.Linear.None, false, 450)
                .to({ x: 39, y: -103 }, 200, Phaser.Easing.Back.Out, false, 0)
                .start();
            this.game.add.tween(this.gun)
                .to({ x: -86, y: -66 }, 70, Phaser.Easing.Linear.None, false, 330)
                .to({ x: -79, y: -60 }, 250, Phaser.Easing.Back.Out, false, 0)
                .start();
            this.game.add.tween(this.star)
                .to({ angle: -5 }, 100, Phaser.Easing.Linear.None, false, 433)
                .to({ angle: 5 }, 100, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: -2 }, 133, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: 0 }, 133, Phaser.Easing.Linear.None, false, 0)
                .start();
            this.game.add.tween(this.title)
                .to({ angle: 0.7 }, 630, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: 2.1 }, 500, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: -1.6 }, 860, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: 0.5 }, 760, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: 1.1 }, 240, Phaser.Easing.Linear.None, false, 0)
                .to({ angle: -1 }, 1100, Phaser.Easing.Linear.None, false, 0)
                .start()
                .onComplete.addOnce(() => this.startTweens());
        }
    }
    src.MainMenuAnim = MainMenuAnim;
})(src || (src = {}));
var src;
(function (src) {
    class MedalInformer extends Phaser.Group {
        constructor(medalSpriteKey, medalLevel, plateX, plateY) {
            super(src.App.instance);
            this.medal = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, medalSpriteKey + '000' + Phaser.Math.clamp(medalLevel - 1, 0, 2)));
            this.medal.anchor.set(0.5);
            this.medal.inputEnabled = true;
            if (this.game.device.desktop) {
                this.medal.events.onInputOver.add(this.showTooltip, this);
                this.medal.events.onInputOut.add(this.hideTooltip, this);
            }
            else {
                this.medal.events.onInputDown.add(this.showTooltipTemporally, this);
            }
            this.tooltip = this.add(this.game.make.sprite(plateX, plateY, src.ProjectSettings.GAME_ATLAS, 'medalTooltip000' + Phaser.Math.clamp(medalLevel - 1, 0, 2)));
            this.tooltip.anchor.set(0.5);
            this.tooltip.visible = false;
        }
        showTooltip() {
            this.tooltip.visible = true;
        }
        hideTooltip() {
            this.tooltip.visible = false;
        }
        showTooltipTemporally() {
            this.game.tweens.removeFrom(this.tooltip, false);
            this.tooltip.visible = true;
            this.tooltip.alpha = 1;
            this.game.add.tween(this.tooltip)
                .to({ alpha: 0 }, 1500, Phaser.Easing.Exponential.In, true)
                .onComplete.add(() => { this.tooltip.visible = false; });
        }
    }
    src.MedalInformer = MedalInformer;
})(src || (src = {}));
var src;
(function (src) {
    class MedalPopup extends Phaser.Group {
        constructor(uiManager) {
            super(uiManager.game);
            this.uiManager = uiManager;
            this.level = uiManager.level;
            this.buildContent();
            this.visible = false;
        }
        buildContent() {
            this.tooltip = this.add(this.game.make.sprite(0, 23, src.ProjectSettings.GAME_ATLAS, 'medalInfoText0000'));
            this.tooltip.anchor.set(0, 0.5);
            this.medalContainer = this.add(this.game.make.group());
            this.effect = this.medalContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS));
            this.effect.anchor.set(0.5);
            this.effect.scale.set(2);
            this.effect.animations.add('anim', Phaser.Animation.generateFrameNames('coinEffect', 0, 19, '', 4)).play(30, true);
            this.medal = this.medalContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'medalUI0000'));
            this.medal.anchor.set(0.5);
            this.medal.scale.set(0.8);
        }
        showMedal(medalLevel) {
            this.visible = true;
            this.medal.frameName = 'medalUI000' + (medalLevel - 1);
            this.tooltip.frameName = 'medalInfoText000' + (medalLevel - 1);
            src.SoundController.instance.playSound('SoundMedalGame');
            this.medalContainer.x = -75;
            this.game.add.tween(this.medalContainer)
                .to({ x: 60 }, 400, Phaser.Easing.Back.Out, true);
            this.tooltip.x = -250;
            this.game.add.tween(this.tooltip)
                .to({ x: 120 }, 600, Phaser.Easing.Back.Out, true, 100);
            this.game.time.events.add(3000, this.hideMedal, this);
        }
        hideMedal() {
            this.game.add.tween(this.tooltip)
                .to({ x: -200 }, 600, Phaser.Easing.Back.In, true);
            this.game.add.tween(this.medalContainer)
                .to({ x: -75 }, 400, Phaser.Easing.Back.In, true, 300)
                .onComplete.add(() => this.visible = false);
        }
    }
    src.MedalPopup = MedalPopup;
})(src || (src = {}));
var src;
(function (src) {
    class Constant {
    }
    Constant.SCREEN_WIDTH = 640;
    Constant.SCREEN_HEIGHT = 427;
    Constant.NORMAL_FPS = 30;
    Constant.GAME_FPS = 60;
    Constant.PI_180 = 0.0174532925199433;
    Constant._180_PI = 57.295779513082321;
    Constant.PI_2 = 1.5707963267948966;
    /// гравитация, действующая на шерифа
    Constant.GRAVITY = 1100;
    /// начальная скорость прыжка от планеты
    Constant.JAMP_SPEED = 800;
    /// разложенная скорость второго прыжка шерифа
    Constant.TWO_JAMP_Y = -600;
    /// начальная скорость при выстреле
    Constant.GUN_SHOOT = 2200;
    /// количество очков за простую бутылку
    Constant.SCORE_BOTTLE_SHOOT = 10;
    /// количество очков за "крутую" бутылку
    Constant.SCORE_BOSS_BOTTLE_SHOOT = 100;
    /// количество очков за максимальное комбо в конце игры в статистике
    Constant.SCORE_COMBO_FACTOR = 10;
    /// Идентификатор "крутой" бутылки
    Constant.BOSS_BOTTLE_ID = 'UFO';
    // эффект умножения очков - когда вступают в силу коэффициеннта умножения
    Constant.COMBO_X2 = 30;
    Constant.COMBO_X3 = 60;
    Constant.COMBO_X4 = 90;
    /// сколько нужно сбить объектов в цепи, чтобы произошел супер-комбо
    Constant.SUPER_COMBO_COUNT_BOTTLE = 7;
    /// коэффиценты перемножения скорости вращения планет, зависящие от коэффицента умножения
    Constant.PLANET_ROTATE_SPEED = [
        1.00, 1.06, 1.12, 1.18
    ];
    //достижения, за которые даются медали
    Constant.SCORE_BRONZE_MEDAL = 10000;
    Constant.SCORE_SILVER_MEDAL = 50000;
    Constant.SCORE_GOLD_MEDAL = 100000;
    // точка, откуда вылетает шериф из пистолета
    Constant.GUNPOINT_X = 70;
    Constant.GUNPOINT_Y = -20;
    // настройки для генерации планет
    Constant.MIN_DISTANCE_PLANET_TO_BOTTLE = 50;
    Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE = 60;
    Constant.MIN_DISTANCE_PLANET_TO_PLANET = 100;
    Constant.BOTTLE_RADIUS = 20;
    Constant.BOTTLE_BOSS_RADIUS = 45;
    src.Constant = Constant;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Фабрика создание визульных объектов из настроечных объектов
     * @author zu
     */
    class Factory {
        static create(item, space) {
            switch (item.type) {
                case "planet":
                    return new src.Planet(item, space);
                case "gun":
                    return new src.ItemGun(item, space);
                case "bottle":
                    return new src.Bottle(item, space);
            }
        }
        static remove(item) {
            item.destroy();
        }
    }
    src.Factory = Factory;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Мир в котором живет шериф...
     * @author zu
     */
    class Screen extends Phaser.Group {
        constructor(level) {
            super(level.game, null);
            /// таймер скрытия хелпа
            this.helpHideTimer = 0.0;
            this.level = level;
            this.bmd = this.game.make.bitmapData(src.Constant.SCREEN_WIDTH, src.Constant.SCREEN_HEIGHT, 'cam1');
            this.fonImage = this.add(this.game.make.image(0, 0, this.bmd));
            this.starsContainer = this.add(this.game.make.group());
            this.createFon();
            this.bringToTop(this.starsContainer);
            this.zoom = this.add(new src.Zoom(this));
            this.game.input.onDown.add(this.clickListener, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.clickListener, this);
            this.changeSpeedXListner = this.changeSpeedXListner.bind(this);
            addEventListener(src.Space.CHANGE_SPEED_X, this.changeSpeedXListner);
        }
        clickListener(pointer) {
            if (this.level.gameStateManager.isPaused() || !this.level.gameStateManager.isActive()) {
                return;
            }
            if (pointer && pointer.targetObject && pointer.targetObject.sprite && pointer.targetObject.sprite instanceof Phaser.Button) {
                //skip input
            }
            else {
                this.zoom.space.handleClick();
            }
        }
        render() {
            this.zoom.render();
            this.fon.render(this.bmd, this.zoom.visual_space_x, this.zoom.visual_space_y, this.zoom.space.scale.x);
        }
        updateDelta(delta) {
            this.zoom.updateDelta(delta);
            this.fon.updateDelta(delta);
        }
        replay(help = false) {
            this.fon.replay();
            this.zoom.replay(help);
            this.fon.setSpaceStartPos(this.zoom.visual_space_x, this.zoom.visual_space_y);
        }
        // для подготовки изображений
        createFon() {
            let fon = new src.FonGame(this);
            this.fon = fon;
            src.ChainGenerator.getFon = function (x) {
                return fon.getFon(x);
            };
        }
        changeSpeedXListner() {
            if (this.fon) {
                this.fon.changeSpeedX(this.zoom.space.speedGame);
            }
        }
        destroy() {
            removeEventListener(src.Space.CHANGE_SPEED_X, this.changeSpeedXListner);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.onDown.removeAll();
            super.destroy();
        }
    }
    src.Screen = Screen;
})(src || (src = {}));
var src;
(function (src) {
    var Point = Phaser.Point;
    class Space extends Phaser.Group {
        constructor(screen) {
            super(screen.game, null);
            /// замедленное время...
            this.slow_time = 0.0;
            this._changeTimeScore = 0.0;
            this._addVisualScore = 1;
            this.deltaVisualScore = [0.04, 0.03, 0.02, 0.01];
            this.screen = screen;
            this.planet_container = this.game.make.group();
            this.add(this.planet_container);
            this._effects = new src.EffectsManager(this);
            this.add(this._effects);
            this.hero = new src.HeroMan(this);
            this.add(this.hero);
            // расскоментировать для просмотра траекторий
            // ChainGenerator.graphics = this.add(this.game.make.graphics(0, 0));
            //
            this.items = [];
            this.gravity_planets = [];
            this.gravitys = [];
            this.hit_bottles = [];
        }
        replay(help) {
            this._show_help = help;
            this.inGame = true;
            this.regeneratePlanet(help);
            this.hero.replay();
            this.hero.visible = true;
            let first = this.gravity_planets[0];
            first.angle = 0;
            this.hero.x = 0;
            this.hero.y = -first.settings.radius * 1.5;
            var hit = false;
            while (!hit) {
                this.hero.y += 1;
                hit = first.hitTestPoint(this.hero.x, this.hero.y, false);
            }
            this.hero.land(first);
            first.land(this.hero, new Point(this.hero.x, this.hero.y));
            first.angle = -25;
            this._visualScore = this._score = this._countBottle = this._countCombo =
                this._maxCombo = this._curCombo = this._speedGame = 0;
            src.Planet.speed_rotate = src.Constant.PLANET_ROTATE_SPEED[this._speedGame];
            this._level_time = 0.0;
            dispatchEvent(new Event(Space.CHANGE_SCORE));
            dispatchEvent(new Event(Space.CHANGE_VISUAL_SCORE));
            dispatchEvent(new Event(Space.CHANGE_COMBO));
            dispatchEvent(new Event(Space.CHANGE_SPEED_X));
            this._effects.removeAll();
        }
        regeneratePlanet(help) {
            for (let item of this.gravitys) {
                this.planet_container.removeChild(item);
                src.Factory.remove(item);
            }
            for (let item of this.hit_bottles) {
                this.planet_container.removeChild(item);
                src.Factory.remove(item);
            }
            this.gravitys.length = 0;
            this.gravity_planets.length = 0;
            this.hit_bottles.length = 0;
            this.items.length = 0;
            if (help) {
                src.ChainGenerator.helpChain(this.items);
                src.ChainGenerator.generateNChain(10, this.items);
            }
            else {
                // первая планета
                this.items.push(src.ChainGenerator.getFirstGravity());
                src.ChainGenerator.generateNChain(10, this.items);
            }
            this.addChain(this.items[0]);
            this.addChain(this.items[1]);
        }
        zoomRect(rect) {
            var index = this.hero.gravity_item.index;
            // проверим планету, на которой стоял или стоит шериф
            var chain = this.items[index];
            var intersects = rect.intersects(chain.bounds, 1);
            if (intersects != (chain.gravity.item != null)) {
                if (intersects)
                    this.addChain(chain);
                else
                    this.removeChain(chain);
            }
            // допустим, шериф может допрыгнуть до 5-ой планеты
            // посмотрим что нужно удалить или добавить
            for (var i = 1; i < 6; i++) {
                // слева
                var j = index - i;
                if (j >= 0) {
                    chain = this.items[j];
                    intersects = rect.intersects(chain.bounds, 1);
                    if (intersects != (chain.gravity.item != null)) {
                        if (intersects)
                            this.addChain(chain);
                        else
                            this.removeChain(chain);
                    }
                }
                // справа
                j = index + i;
                if (j < this.items.length) {
                    chain = this.items[j];
                    intersects = rect.intersects(chain.bounds, 1);
                    if (intersects != (chain.gravity.item != null)) {
                        if (intersects)
                            this.addChain(chain);
                        else
                            this.removeChain(chain);
                    }
                }
            }
        }
        addChain(chain) {
            var item = src.Factory.create(chain.gravity, this);
            chain.gravity.item = item;
            this.gravity_planets.push(item);
            this.planet_container.addChild(item);
            this.gravitys.push(item);
            for (var bottle of chain.bottles) {
                if (!bottle.hit) {
                    var b = src.Factory.create(bottle, this);
                    bottle.bottle = b;
                    this.planet_container.addChildAt(b, 0);
                    this.gravitys.push(b);
                }
            }
            if (this.hero.isFly) {
                // переместим шерифа вверху дисплей листа
                var p = this.hero.parent;
                p.setChildIndex(this.hero, p.children.length - 1);
            }
        }
        removeChain(chain) {
            var item = chain.gravity.item;
            chain.gravity.item = null;
            this.gravity_planets.splice(this.gravity_planets.indexOf(item), 1);
            this.gravitys.splice(this.gravitys.indexOf(item), 1);
            this.planet_container.removeChild(item);
            src.Factory.remove(item);
            for (var bottle of chain.bottles) {
                if (bottle.bottle) {
                    var b = bottle.bottle;
                    bottle.bottle = null;
                    this.planet_container.removeChild(b);
                    src.Factory.remove(b);
                    if (bottle.hit) {
                        this.hit_bottles.splice(this.hit_bottles.indexOf(b), 1);
                    }
                    else {
                        this.gravitys.splice(this.gravitys.indexOf(b), 1);
                    }
                }
            }
        }
        handleClick() {
            if (this.hero.isFly) {
                this.hero.two_jamp();
            }
            else {
                this.hero.gravity_item.launch(this.hero);
            }
        }
        updateDelta(delta) {
            this._level_time += delta;
            if (this._visualScore != this._score) {
                this._changeTimeScore -= delta;
                if (this._changeTimeScore <= 0) {
                    this._changeTimeScore = 0.025;
                    this._visualScore = Math.min(this._score, this._visualScore + this._addVisualScore);
                    dispatchEvent(new Event(Space.CHANGE_VISUAL_SCORE));
                }
            }
            var item;
            for (item of this.hit_bottles) {
                item.updateDelta(delta);
            }
            if (this.slow_time > 0.0) {
                this.slow_time -= delta;
                if (this.slow_time < 0)
                    this.slow_time = 0;
                delta *= Space.SLOW_TIME_RATE;
            }
            // this._effects.updateDelta(delta);
            if (this.inGame)
                this.hero.updateDelta(delta);
            for (item of this.gravitys) {
                item.updateDelta(delta);
            }
            if (this.hero.isFly && this.inGame) {
                // столкновения
                var nearItem;
                var nearSettings;
                var min_distance = Number.MAX_VALUE;
                var distance = 0;
                // найдем ближайщий объект
                var start = Math.max(0, this.hero.gravity_item.index - 4);
                var end = Math.min(this.items.length, this.hero.gravity_item.index + 5);
                for (var i = start; i < end; i++) {
                    var settings = this.items[i].gravity;
                    distance = Math.abs(settings.x - this.hero.x) + Math.abs(settings.y - this.hero.y) - settings.radius;
                    if (distance < min_distance) {
                        min_distance = distance;
                        nearItem = settings.item;
                        nearSettings = settings;
                    }
                    for (var b of this.items[i].bottles) {
                        if (!b.hit) {
                            distance = Math.abs(b.x - this.hero.x) + Math.abs(b.y - this.hero.y) - b.radius;
                            if (distance < min_distance) {
                                min_distance = distance;
                                nearItem = b.bottle;
                                nearSettings = b;
                            }
                        }
                    }
                }
                // проверим его на столкновения
                var hit = null;
                if (nearItem && (!this.hero.ignore_gravity || nearItem instanceof src.Bottle)) {
                    hit = nearItem.hitTestPoint(this.hero.hit_head.x, this.hero.hit_head.y) ? this.hero.hit_head : null;
                    hit = hit || (nearItem.hitTestPoint(this.hero.hit_left.x, this.hero.hit_left.y) ? this.hero.hit_left : null);
                    hit = hit || (nearItem.hitTestPoint(this.hero.hit_right.x, this.hero.hit_right.y) ? this.hero.hit_right : null);
                    if (!hit && nearItem instanceof src.Bottle) {
                        hit = hit || (nearItem.hitTestPoint(this.hero.left_shootpoint.x, this.hero.left_shootpoint.y) ? this.hero.left_shootpoint : null);
                        hit = hit || (nearItem.hitTestPoint(this.hero.right_shootpoint.x, this.hero.right_shootpoint.y) ? this.hero.right_shootpoint : null);
                    }
                    if (hit) {
                        if (nearItem instanceof src.Bottle) {
                            var bottle = nearItem;
                            this.hero.shoot();
                            bottle.shoot();
                            this.hit_bottles.push(nearItem);
                            this.gravitys.splice(this.gravitys.indexOf(nearItem), 1);
                            if (bottle.settings.movie_id == src.Constant.BOSS_BOTTLE_ID) {
                                this.slow_time = Space.SLOW_BOTTLE_HIT;
                                this._score += src.Constant.SCORE_BOSS_BOTTLE_SHOOT;
                            }
                            else {
                                this._score += src.Constant.SCORE_BOTTLE_SHOOT;
                            }
                            ++this._countBottle;
                            // проверим комбо
                            var chain = (bottle.settings).chain;
                            var countShootBottle = 0;
                            var nowCombo = false;
                            var secondNotHitedBoss = false;
                            var summScore = 0;
                            for (var bs of chain.bottles) {
                                if (bs.hit) {
                                    ++countShootBottle;
                                    if (bs.boss) {
                                        nowCombo = !secondNotHitedBoss;
                                        summScore += src.Constant.SCORE_BOSS_BOTTLE_SHOOT;
                                    }
                                    else {
                                        summScore += src.Constant.SCORE_BOTTLE_SHOOT;
                                    }
                                }
                                else if (bs.boss) { // когда два инопланетянина
                                    nowCombo = false;
                                    secondNotHitedBoss = true;
                                }
                            }
                            nowCombo = nowCombo || (countShootBottle == chain.bottles.length && countShootBottle != 1);
                            if (nowCombo) {
                                let p = nearItem.toGlobal(this.game.world.position);
                                p = this.game.world.toLocal(p, this.screen.zoom);
                                p.x += 80;
                                p.y += 50;
                                let margin = 50;
                                if (p.x > src.Constant.SCREEN_WIDTH - margin)
                                    p.x = src.Constant.SCREEN_WIDTH - margin;
                                else if (p.x < margin)
                                    p.x = margin;
                                if (p.y > src.Constant.SCREEN_HEIGHT - margin)
                                    p.y = src.Constant.SCREEN_HEIGHT - margin;
                                else if (p.y < 0)
                                    p.y = margin;
                                let oldCombo = this._curCombo;
                                this._curCombo += countShootBottle;
                                this._countCombo += countShootBottle;
                                let superCombo = countShootBottle >= src.Constant.SUPER_COMBO_COUNT_BOTTLE;
                                if (superCombo) {
                                    this.screen.zoom.add(this.effects.getSuperComboEffect(this._curCombo, summScore, p.x, p.y));
                                    src.SoundController.instance.playSound('SoundMegaChain');
                                }
                                else {
                                    this.screen.zoom.add(this.effects.getComboEffect(this._curCombo, summScore, p.x, p.y));
                                    src.SoundController.instance.playSound('ComboAll');
                                }
                                if (this._curCombo > this._maxCombo)
                                    this._maxCombo = this._curCombo;
                                dispatchEvent(new Event(Space.CHANGE_COMBO));
                                this._score += (summScore + (superCombo ? summScore : 0)) * (this._speedGame + 1);
                                var changeSpeed = false;
                                if (oldCombo < src.Constant.COMBO_X4 && this._curCombo >= src.Constant.COMBO_X4) {
                                    this._speedGame = 3;
                                    changeSpeed = true;
                                }
                                else if (oldCombo < src.Constant.COMBO_X3 && this._curCombo >= src.Constant.COMBO_X3) {
                                    this._speedGame = 2;
                                    changeSpeed = true;
                                }
                                else if (oldCombo < src.Constant.COMBO_X2 && this._curCombo >= src.Constant.COMBO_X2) {
                                    this._speedGame = 1;
                                    changeSpeed = true;
                                }
                                if (changeSpeed) {
                                    dispatchEvent(new Event(Space.CHANGE_SPEED_X));
                                    src.Planet.speed_rotate = src.Constant.PLANET_ROTATE_SPEED[this._speedGame];
                                }
                            }
                            this._addVisualScore = Math.ceil((this._score - this._visualScore) * this.deltaVisualScore[this._speedGame]);
                            dispatchEvent(new Event(Space.CHANGE_SCORE));
                        }
                        else {
                            // это планета или пистолет
                            var gravity = nearItem;
                            gravity.land(this.hero, hit);
                            this.hero.land(gravity);
                            if (this._show_help && gravity.index >= 4) {
                                this._show_help = false;
                                dispatchEvent(new Event(Space.END_HELP));
                            }
                            // проверим, все ли бутылки сбиты
                            var ch = this.items[gravity.index];
                            var nullCombo = false;
                            if (ch.discovered) {
                                nullCombo = true;
                            }
                            else {
                                for (var bt of ch.bottles) {
                                    if (!bt.hit) {
                                        nullCombo = true;
                                    }
                                }
                            }
                            if (nullCombo) {
                                if (this._curCombo > 0) {
                                    src.SoundController.instance.playSound('VoiceLaugh');
                                    if (this._curCombo >= src.Constant.COMBO_X2) {
                                        this._speedGame = 0;
                                        dispatchEvent(new Event(Space.CHANGE_SPEED_X));
                                        src.Planet.speed_rotate = src.Constant.PLANET_ROTATE_SPEED[this._speedGame];
                                    }
                                    this._curCombo = 0;
                                    dispatchEvent(new Event(Space.CHANGE_COMBO));
                                }
                            }
                            else if (Math.random() < 0.4) { // 0,4 - вероятность появления звука
                                src.SoundController.instance.playSound('VoiceAllright' + String(1 + Math.floor(Math.random() * 3)));
                            }
                            ch.discovered = true;
                            if (this.hero.gravity_item.index + 10 > this.items.length) {
                                // сгенерируем еще планет
                                src.ChainGenerator.generateNChain(10, this.items);
                            }
                        }
                    }
                }
                var visual_y = 600 * this._1_scale;
                if (this.hero.isFly && this.hero.y > nearSettings.y + visual_y && this.hero.y > this.nextChainSettings.gravity.y + visual_y) {
                    this.inGame = false;
                    this.hero.deltaX = this.hero.deltaY = this.hero.speedX = this.hero.speedY = 0;
                    dispatchEvent(new Event(Space.END_GAME));
                    this.hero.visible = false;
                }
            }
        }
        /// чтобы правильно определять, что шериф упал
        set scaleY(value) {
            this._1_scale = 1 / value;
        }
        render() {
            this.hero.render();
            for (var item of this.gravitys) {
                item.render();
            }
            for (item of this.hit_bottles) {
                item.render();
            }
        }
        get currentChainSettings() {
            return this.items[this.hero.gravity_item.index];
        }
        get nextChainSettings() {
            return this.items[this.hero.gravity_item.index + 1];
        }
        // /// эффекты
        get effects() {
            return this._effects;
        }
        get visualScore() {
            return this._visualScore;
        }
        /// количество очков за уровень
        get score() {
            return this._score;
        }
        /// максимально длинная цепочека
        get maxCombo() { return this._maxCombo; }
        /// общая сумма комбо
        get countCombo() { return this._countCombo; }
        ;
        /// текущее комбо
        get combo() { return this._curCombo; }
        /// скорость игры x2, x3, x4
        get speedGame() {
            return this._speedGame;
        }
    }
    Space.END_GAME = "end game";
    Space.CHANGE_VISUAL_SCORE = "change visual score";
    Space.CHANGE_COMBO = "change combo";
    Space.CHANGE_SCORE = "change score";
    Space.CHANGE_SPEED_X = "change speed";
    Space.END_HELP = "end help";
    /// во сколько раз замедляется время (delta = detla * SLOW_TIME_RATE)
    Space.SLOW_TIME_RATE = 0.2;
    /// на какое время замедляется время при выстреле в "крутую" бутылку
    Space.SLOW_BOTTLE_HIT = 0.4;
    src.Space = Space;
})(src || (src = {}));
var src;
(function (src) {
    class Time {
        static get delta() {
            let t = src.App.instance.time.now;
            let d = (t - this.prev_time) * 0.001;
            this.prev_time = t;
            return d;
        }
        static update() {
            this.prev_time = src.App.instance.time.now - 1;
        }
    }
    Time.prev_time = 0;
    src.Time = Time;
})(src || (src = {}));
var src;
(function (src) {
    var Rectangle = Phaser.Rectangle;
    /**
     * Sprite для управлением масштаба отображения мира
     * @author zu
     */
    class Zoom extends Phaser.Group {
        constructor(screen) {
            super(screen.game, null);
            this.speed_x = 0;
            this.speed_y = 0;
            this.space_x = 0;
            this.space_y = 0;
            this.space_scale = 1;
            this._1_scale = 1;
            this.zoom_rect = new Rectangle();
            this.LEFT_RECT = new Rectangle();
            this.RIGHT_RECT = new Rectangle();
            this.TOP_RECT = new Rectangle();
            this.screen = screen;
            this.space = new src.Space(screen);
            this.addChild(this.space);
            this.calcSpeedRect();
        }
        updateDelta(delta) {
            this.space.updateDelta(delta);
            var hero = this.space.hero;
            var dx = 0.0;
            var dy = 0.0;
            if ((this._boom_sum_x != 0.0 || this._boom_sum_y != 0.0) && this.space.slow_time <= 0.0) {
                this._boom_sum_x = this._boom_sum_y = 0.0;
            }
            if (this.space.slow_time > 0.0) {
                dx = -hero.deltaX * 0.4;
                dy = -hero.deltaY * 0.4;
                this.space_x += dx * this.space_scale;
                this.space_y += dy * this.space_scale;
                if (this.space.slow_time < 0.2) { // тряска от взрыва
                    var r_x = (Math.random() - 0.5) * 16;
                    while (Math.abs(this._boom_sum_x + r_x) > 16) {
                        r_x = (Math.random() - 0.5) * 16;
                    }
                    var r_y = (Math.random() - 0.5) * 16;
                    while (Math.abs(this._boom_sum_y + r_y) > 16) {
                        r_y = (Math.random() - 0.5) * 16;
                    }
                    this.space_x += r_x;
                    this.space_y += r_y;
                    this._boom_sum_x += r_x;
                    this._boom_sum_y += r_y;
                }
            }
            else if (this.space.hero.isShootFly) {
                dx = hero.deltaX;
                dy = hero.deltaY;
                this.space_x -= dx * this.space_scale;
                this.space_y -= dy * this.space_scale;
                this.calcCenterPlanet = true;
            }
            else if (this.space.hero.isPlanetFly) {
                var p = this.space.hero.toGlobal(this.game.world.position);
                this.speed_x = hero.speedX * 0.25;
                if (hero.deltaX > 0) {
                    if (this.RIGHT_RECT.contains(p.x, p.y)) {
                        this.speed_x += hero.speedX * (p.x - this.RIGHT_RECT.x) / this.RIGHT_RECT.width;
                    }
                }
                else if (hero.deltaX < 0 && this.LEFT_RECT.contains(p.x, p.y)) {
                    this.speed_x += hero.speedX * (this.LEFT_RECT.x - p.x + this.LEFT_RECT.width) / this.LEFT_RECT.width;
                }
                this.speed_y = hero.speedY * 0.2;
                if (hero.deltaY < 0 && this.TOP_RECT.contains(p.x, p.y)) {
                    this.speed_y += hero.speedY * (this.TOP_RECT.y - p.y + this.TOP_RECT.height) / this.TOP_RECT.height;
                }
                dx = this.speed_x * delta;
                dy = this.speed_y * delta;
                this.space_x -= dx * this.space_scale;
                this.space_y -= dy * this.space_scale;
                this.calcCenterPlanet = true;
            }
            else if (this.calcCenterPlanet) {
                // пересчитаем положения
                this._scale0 = this.space_scale;
                this._x0 = this.space_x;
                this._y0 = this.space_y;
                var rect = this.space.nextChainSettings.camera;
                this._scale1 = src.Constant.SCREEN_WIDTH / rect.width;
                this._x1 = -rect.x * this._scale1;
                this._y1 = -rect.y * this._scale1;
                this.toCenterPlanet = true;
                this.calcCenterPlanet = false;
                this._timer = 0;
            }
            else if (this.toCenterPlanet) {
                this._timer += delta;
                if (this._timer > 0.4) {
                    this.space_scale = this._scale1;
                    this._1_scale = 1 / this.space_scale;
                    this.space_x = this._x1;
                    this.space_y = this._y1;
                    this.toCenterPlanet = false;
                    this.zoom_rect = this.space.nextChainSettings.camera.clone();
                    this.space.zoomRect(this.zoom_rect);
                }
                else {
                    var t = this._timer * 2.5;
                    this.space_x = this._x0 + (this._x1 - this._x0) * t;
                    this.space_y = this._y0 + (this._y1 - this._y0) * t;
                    this.space_scale = this._scale0 + (this._scale1 - this._scale0) * t;
                    this._1_scale = 1 / this.space_scale;
                    this.zoom_rect.x = -this.space_x * this._1_scale;
                    this.zoom_rect.y = -this.space_y * this._1_scale;
                    this.zoom_rect.width = src.Constant.SCREEN_WIDTH * this._1_scale;
                    this.zoom_rect.height = src.Constant.SCREEN_HEIGHT * this._1_scale;
                    this.space.zoomRect(this.zoom_rect);
                }
            }
            if (dx != 0 || dy != 0) {
                this.zoom_rect.x += dx;
                this.zoom_rect.y += dy;
                this.space.zoomRect(this.zoom_rect);
            }
        }
        render() {
            this.space.render();
            this.space.x = this.space_x;
            this.space.y = this.space_y;
            this.space.scale.set(this.space_scale);
            this.space.scaleY = this.space_scale;
        }
        replay(help) {
            this.space.replay(help);
            let rect = this.space.nextChainSettings.camera;
            this.space_scale = src.Constant.SCREEN_WIDTH / rect.width;
            this.space.scale.set(this.space_scale);
            this._1_scale = 1 / this.space_scale;
            this.space_x = this.space.x = -rect.x * this.space_scale;
            this.space_y = this.space.y = -rect.y * this.space_scale;
            this.calcCenterPlanet = false;
            this.toCenterPlanet = false;
            this.zoom_rect = this.space.nextChainSettings.camera.clone();
            this._boom_sum_x = this._boom_sum_y = 0.0;
        }
        calcSpeedRect() {
            this.LEFT_RECT.x = 0;
            this.LEFT_RECT.y = 0;
            this.LEFT_RECT.width = src.Constant.SCREEN_WIDTH * 0.3;
            this.LEFT_RECT.height = src.Constant.SCREEN_HEIGHT;
            this.RIGHT_RECT.width = src.Constant.SCREEN_WIDTH * 0.4;
            this.RIGHT_RECT.height = src.Constant.SCREEN_HEIGHT;
            this.RIGHT_RECT.x = src.Constant.SCREEN_WIDTH - this.RIGHT_RECT.width;
            this.RIGHT_RECT.y = 0;
            this.TOP_RECT.x = 0;
            this.TOP_RECT.y = 0;
            this.TOP_RECT.width = src.Constant.SCREEN_WIDTH;
            this.TOP_RECT.height = src.Constant.SCREEN_HEIGHT * 0.3;
        }
        get visual_space_x() {
            return this.space_x * this._1_scale;
        }
        get visual_space_y() {
            return this.space_y * this._1_scale;
        }
    }
    src.Zoom = Zoom;
})(src || (src = {}));
var Rectangle = Phaser.Rectangle;
var Point = Phaser.Point;
var BitmapData = Phaser.BitmapData;
var src;
(function (src) {
    var Matrix = Phaser.Matrix;
    var BitmapData = Phaser.BitmapData;
    class FonGame {
        constructor(screen) {
            /// градиент
            this.prevGameSpeed = 0;
            this.currentGameSpeed = 0;
            this.zeroPoint = new Point(0, 0);
            this.destPoint = new Point();
            this.destMatrix = new Matrix();
            this.FADE_TIME = 1.3;
            this.fadeTimer = 0.0;
            this.fadeAlpha = 0.0;
            this.screen = screen;
            let WIDTH = 2048;
            let HEIGHT = 866;
            this.fons = [
                new BitmapData(src.App.instance, 'fon0', WIDTH, HEIGHT),
                new BitmapData(src.App.instance, 'fon1', WIDTH, HEIGHT),
                new BitmapData(src.App.instance, 'fon2', WIDTH, HEIGHT),
                new BitmapData(src.App.instance, 'fon3', WIDTH, HEIGHT)
            ];
            this.fons[0].draw(src.App.instance.make.image(0, 0, 'Fon1Background'));
            this.fons[1].draw(src.App.instance.make.image(0, 0, 'Fon1To2'));
            this.fons[2].draw(src.App.instance.make.image(0, 0, 'Fon2Background'));
            this.fons[3].draw(src.App.instance.make.image(0, 0, 'Fon2To1'));
            this.fons_index = [];
            var h = 30 + src.Constant.SCREEN_HEIGHT + 30;
            var w = Math.ceil(h * src.Constant.SCREEN_WIDTH / src.Constant.SCREEN_HEIGHT);
            this.scaleBuffer = new BitmapData(src.App.instance, 'scaleBuffer', w, h);
            this.height2Texture = (h - src.Constant.SCREEN_HEIGHT) * 0.5;
            this.width2Texture = (w - src.Constant.SCREEN_WIDTH) * 0.5;
            this.minSpaceScale = src.Constant.SCREEN_HEIGHT / h;
            this.rectPos = new RectPos(this.fons[0], w, h);
            this.maxShiftY = Math.floor((this.fons[0].height - this.scaleBuffer.height) * 0.5) * 2;
            this.stars = this.screen.starsContainer.add(new src.StarEffect(w, h));
            this.cameraShadow = this.screen.starsContainer.add(src.App.instance.make.image(0, 0, 'camera_shadow'));
        }
        replay() {
            this.fons_index.length = 0;
            this.fons_index.push(0); // нулевой зеленый
            this.fons_index.push(0); // и первый зеленый
            this.calcFon();
            this.index = 1;
            this.currentBmd = this.fons[this.fons_index[0]];
            this.nextBmd = this.fons[this.fons_index[1]];
            this.rectPos.y = Math.floor((this.scaleBuffer.height - src.Constant.SCREEN_HEIGHT) * 0.5);
            this.currentGameSpeed = 0;
        }
        setSpaceStartPos(space_x, space_y) {
            this.space_x = space_x;
            this.space_y = space_y;
        }
        calcFon() {
            for (var i = 0; i < 30; i++) {
                var last = this.fons_index[this.fons_index.length - 1];
                if (Math.random() < 0.4) {
                    this.fons_index.push(last);
                }
                ++last;
                this.fons_index.push(last);
                ++last;
                if (last >= this.fons.length)
                    last = 0;
                this.fons_index.push(last);
            }
        }
        getFon(x) {
            return this.fons_index[Math.floor(x * FonGame.FON_DISTANCE_SCALE) + 1];
        }
        render(bmd, space_x, space_y, space_scale) {
            // определяем разрезы
            var dx = (this.space_x - space_x) * FonGame.SCALE_SPEED_X;
            if (dx != 0) {
                this.space_x = space_x;
                var two_bitmap = this.rectPos.rect2.width != 0;
                this.rectPos.x += dx;
                if (two_bitmap != (this.rectPos.rect2.width != 0)) {
                    // нужно сменить фоны
                    if (dx > 0 && this.rectPos.rect2.width == 0) {
                        ++this.index;
                    }
                    else if (dx < 0 && this.rectPos.rect2.width != 0) {
                        --this.index;
                    }
                    this.currentBmd = this.fons[this.fons_index[this.index]];
                    this.nextBmd = this.fons[this.fons_index[this.index + 1]];
                    if (this.index + 2 > this.fons.length) {
                        this.calcFon();
                    }
                }
            }
            var dy = (this.space_y - space_y) * FonGame.SCALE_SPEED_Y;
            this.space_y = space_y;
            this.rectPos.y += dy;
            if (this.rectPos.y < 0) {
                this.rectPos.y = 0;
            }
            else if (this.rectPos.y > this.maxShiftY) {
                this.rectPos.y = this.maxShiftY;
            }
            // фон
            this.destPoint.x = 0;
            this.destPoint.y = 0;
            this.scaleBuffer.copy(this.currentBmd, this.rectPos.rect1.x, this.rectPos.rect1.y, this.rectPos.rect1.width, this.rectPos.rect1.height, this.destPoint.x, this.destPoint.y);
            if (this.rectPos.rect2.width != 0) {
                this.destPoint.x = this.rectPos.point.x;
                this.scaleBuffer.copy(this.nextBmd, this.rectPos.rect2.x, this.rectPos.rect2.y, this.rectPos.rect2.width, this.rectPos.rect2.height, this.destPoint.x, this.destPoint.y);
            }
            // звездный ветер
            if (dx != 0 || dy != 0) {
                this.stars.move(-dx, -dy);
            }
            if (this.fadeAlpha > 0) {
                this.stars.render(1 - this.fadeAlpha);
            }
            else {
                this.stars.render(1);
                this;
            }
            // масштабирование фона
            var scale = 1 - (1 - space_scale) * FonGame.SCALE_SPEED_SCALE;
            if (scale < this.minSpaceScale)
                scale = this.minSpaceScale;
            else if (scale > 1.0)
                scale = 1.0;
            this.destMatrix.identity();
            var w2 = this.scaleBuffer.width * 0.5;
            var h2 = this.scaleBuffer.height * 0.5;
            this.destMatrix.translate(-w2, -h2);
            this.destMatrix.scale(scale, scale);
            this.destMatrix.translate(w2 - this.width2Texture, h2 - this.height2Texture);
            bmd.copy(this.scaleBuffer, this.destMatrix.tx, this.destMatrix.ty, this.scaleBuffer.width, this.scaleBuffer.height, this.destMatrix.tx, this.destMatrix.ty, this.scaleBuffer.width, this.scaleBuffer.height, 0, 0, 0, scale, scale);
            //градиент
            if (this.fadeAlpha == 0) {
                this.cameraShadow.alpha = this.currentGameSpeed == 0 ? 1 : 0;
            }
            else {
                if (this.prevGameSpeed == 0 && this.currentGameSpeed != 0) {
                    this.cameraShadow.alpha = this.fadeAlpha;
                }
                else if (this.prevGameSpeed != 0 && this.currentGameSpeed == 0) {
                    this.cameraShadow.alpha = 1 - this.fadeAlpha;
                }
                else {
                    this.cameraShadow.alpha = 0;
                }
            }
        }
        updateDelta(delta) {
            if (this.fadeTimer > 0.0) {
                this.fadeTimer -= delta;
                if (this.fadeTimer <= 0.0) {
                    this.fadeTimer = 0.0;
                }
                this.fadeAlpha = this.fadeTimer / this.FADE_TIME;
            }
            this.stars.updateDelta(delta, this.fadeAlpha);
        }
        changeSpeedX(speedGame) {
            this.stars.setSpeed(speedGame);
            if (speedGame != this.currentGameSpeed) {
                this.prevGameSpeed = this.currentGameSpeed;
                this.currentGameSpeed = speedGame;
                this.fadeTimer = this.FADE_TIME;
            }
        }
    }
    FonGame.SCALE_SPEED_X = 0.25;
    FonGame.SCALE_SPEED_Y = 0.20;
    FonGame.SCALE_SPEED_SCALE = 0.3;
    FonGame.FON_DISTANCE_SCALE = FonGame.SCALE_SPEED_X / 2048;
    src.FonGame = FonGame;
})(src || (src = {}));
class RectPos {
    constructor(bmd, width, height) {
        this._x = 0;
        this._width = bmd.width;
        this.rect1 = new Rectangle(0, 0, bmd.width, height);
        this.width = width;
        this.rect2 = this.rect1.clone();
        this.rect2.width = 0;
        this.point = new Point();
    }
    get x() { return this._x; }
    ;
    set x(value) {
        if (value >= this._width)
            this._x = value - this._width;
        else if (value < 0)
            this._x = this._width + value;
        else
            this._x = value;
        this.rect1.x = this._x;
        if ((this._x + this.width) <= this._width) {
            this.rect1.width = this.width;
            this.rect2.width = 0;
        }
        else {
            this.rect1.width = this._width - this._x;
            this.rect2.x = 0;
            this.rect2.width = this.width - this.rect1.width;
            this.point.x = this.rect1.width - 1;
        }
    }
    get y() {
        return this.rect1.y;
    }
    set y(value) {
        this.rect1.y = this.rect2.y = value;
    }
}
var Constant = src.Constant;
var AnimatedStar = src.AnimatedStar;
var src;
(function (src) {
    /**
     * Эффект звездного ветра
     * @author zu
     */
    class StarEffect extends Phaser.Group {
        constructor(width, height) {
            super(src.App.instance, null);
            this.x2Container = this.add(this.game.make.group());
            this.x3Container = this.add(this.game.make.group());
            this.x4Container = this.add(this.game.make.group());
            this.containers = [this.x2Container, this.x3Container, this.x4Container];
            this.x2Container.add(this.game.make.image(0, 0, 'x2_star_light'));
            this.x3Container.add(this.game.make.image(0, 0, 'x3_star_light'));
            this.x4Container.add(this.game.make.image(0, 0, 'x4_star_light'));
            this._width = width;
            this._height = height;
            this.x2 = [];
            this.createNStar(this.x2Container, this.x2, 'x2BonusStar', 0, 1, 1, 110 / 60, 110 / 60, 110 / 60);
            this.createNStar(this.x2Container, this.x2, 'x2BonusStar', 30, 0.8, 0.7, 110 / 60, 110 / 60, 110 / 60);
            this.createNStar(this.x2Container, this.x2, 'x2BonusStar', 60, 0.6, 0.4, 110 / 60, 110 / 60, 110 / 60);
            this.x3 = [];
            this.createNStar(this.x3Container, this.x3, 'x3BonusStar', 0, 1, 1, 2 * 80 / 60, 80 / 60, 80 / 60);
            this.createNStar(this.x3Container, this.x3, 'x3BonusStar', 30, 0.8, 0.7, 2 * 80 / 60, 80 / 60, 80 / 60);
            this.createNStar(this.x3Container, this.x3, 'x3BonusStar', 60, 0.6, 0.4, 2 * 80 / 60, 80 / 60, 80 / 60);
            this.x4 = [];
            this.createNStar(this.x4Container, this.x4, 'x4BonusStar', 0, 1, 1, 48 / 60, 48 / 60, 48 / 60);
            this.createNStar(this.x4Container, this.x4, 'x4BonusStar', 30, 0.8, 0.7, 48 / 60, 48 / 60, 48 / 60);
            this.createNStar(this.x4Container, this.x4, 'x4BonusStar', 60, 0.6, 0.4, 48 / 60, 48 / 60, 48 / 60);
        }
        createNStar(container, out, id, starYShift, scale, alpha, vx, vy, angularSpeed) {
            for (let i = 0; i < 5; i++) {
                let star = container.add(new src.AnimatedStar(id, Math.floor(Math.random() * StarEffect.SCREEN_WIDTH), starYShift + 100 * i, scale, alpha, src.Constant.SCREEN_WIDTH / vx / 2.5, vy, angularSpeed));
                out.push(star);
            }
        }
        updateDelta(delta, n) {
            if (this.current || this.prev) {
                if (this.current) {
                    for (let item of this.current) {
                        item.updateDelta(delta);
                    }
                }
                if (this.prev) {
                    for (let item of this.prev) {
                        item.updateDelta(delta);
                    }
                }
                if (n == 0.0) {
                    this.prev = null;
                }
            }
        }
        render(alpha = 0) {
            this.containers.forEach(c => c.alpha = 0);
            if (this.prev) {
                for (let item of this.prev) {
                    item.parent.alpha = 1 - alpha;
                }
            }
            if (this.current) {
                for (let item of this.current) {
                    item.parent.alpha = alpha;
                }
            }
        }
        move(dx, dy) {
            if (this.current) {
                for (let item of this.current) {
                    item.move(dx, dy);
                }
            }
            if (this.prev) {
                for (let item of this.prev) {
                    item.move(dx, dy);
                }
            }
        }
        setSpeed(value) {
            switch (value) {
                case 0:
                    this.prev = this.current;
                    this.current = null;
                    break;
                case 1:
                    this.prev = this.current;
                    this.current = this.x2;
                    break;
                case 2:
                    this.prev = this.current;
                    this.current = this.x3;
                    break;
                case 3:
                    this.prev = this.current;
                    this.current = this.x4;
                    break;
            }
            if (this.current) {
                for (let item of this.current) {
                    item.x = Math.floor(StarEffect.SCREEN_WIDTH * Math.random());
                }
            }
            else {
            }
        }
    }
    StarEffect.SCREEN_WIDTH = src.Constant.SCREEN_WIDTH + 100;
    src.StarEffect = StarEffect;
})(src || (src = {}));
var src;
(function (src) {
    class AnimatedStar extends Phaser.Sprite {
        constructor(spriteKey, x, y, scale, alpha, speedX, speedY, angularSpeed) {
            super(src.App.instance, x, y, src.ProjectSettings.GAME_ATLAS, spriteKey + '0000');
            this.speedX = 0;
            this.anchor.set(0.5);
            this.scale.set(scale);
            this.alpha = alpha;
            this.speedX = speedX;
            this.game.add.tween(this)
                .to({ angle: -360 }, angularSpeed * 1000, Phaser.Easing.Linear.None, true, Math.random() * angularSpeed * 1000, -1);
            this.game.add.tween(this)
                .to({ y: this.y + 35 }, speedY * 1000, Phaser.Easing.Sinusoidal.InOut, true, Math.random() * speedY * 1000, -1, true);
        }
        updateDelta(delta) {
            this.move(-this.speedX * delta, 0);
        }
        move(dx, dy) {
            this.x += dx;
            this.y += dy;
            if (this.x < -this.width) {
                this.x += src.StarEffect.SCREEN_WIDTH;
            }
            else if (this.x > src.StarEffect.SCREEN_WIDTH) {
                this.x = -this.width;
            }
            if (this.y < -this.height - 50) {
                this.y += src.Constant.SCREEN_HEIGHT + 100;
            }
            else if (this.y > src.Constant.SCREEN_HEIGHT + 50) {
                this.y -= src.Constant.SCREEN_HEIGHT + 100;
            }
        }
    }
    src.AnimatedStar = AnimatedStar;
})(src || (src = {}));
var src;
(function (src) {
    class MultiplierEffect extends Phaser.Sprite {
        constructor(frameName, x, y, totalFrames, cycleStartFrame, finishFrame) {
            super(src.App.instance, x, y, src.ProjectSettings.EFFECTS_ATLAS);
            this.anchor.set(1);
            this.soundUpDelay = (cycleStartFrame - 10) / 45 * 1000;
            this.flyingAnim = this.animations.add('flying', Phaser.Animation.generateFrameNames(frameName, 0, cycleStartFrame - 1, '', 4), 45, false);
            this.flyingAnim.onComplete.add(this.startCycle, this);
            this.cycleAnim = this.animations.add('cycle', Phaser.Animation.generateFrameNames(frameName, cycleStartFrame, finishFrame - 1, '', 4), 45, true);
            this.disappearingAnim = this.animations.add('disappearing', Phaser.Animation.generateFrameNames(frameName, finishFrame, totalFrames, '', 4), 45, false);
            this.disappearingAnim.onComplete.add(this.removeFromScreen, this);
            this.visible = false;
        }
        startCycle() {
            this.cycleAnim.restart();
        }
        removeFromScreen() {
            this.visible = false;
        }
        /**
         * PUBLIC
         */
        start() {
            this.visible = true;
            this.flyingAnim.restart();
            src.SoundController.instance.playSound('Soundx2Down');
            this.game.time.events.add(this.soundUpDelay, () => src.SoundController.instance.playSound('Soundx2Up'));
        }
        stop() {
            if (this.visible) {
                this.disappearingAnim.restart();
            }
        }
    }
    src.MultiplierEffect = MultiplierEffect;
})(src || (src = {}));
var src;
(function (src) {
    var Point = Phaser.Point;
    var Matrix = Phaser.Matrix;
    /**
     * Общий класс для планет, пистолетов и бутылок
     * @author zu
     */
    class Item extends Phaser.Group {
        /**
         * @param	id идентификатор мувиклипа планеты
         */
        constructor(setting) {
            super(src.App.instance, null);
            this._setting = setting;
            this.init();
        }
        init() {
            this._1_scale = 1.0;
            this.settings = this._setting; // нужно вызвать
            this.createDisplay();
        }
        /// создает визуальный объект
        createDisplay() { }
        get settings() { return this._setting; }
        set settings(value) {
            this._setting = value;
            this.x = this._setting.x;
            this.y = this._setting.y;
        }
        /// обновление в миллисекундах
        updateDelta(deltaTime) { }
        hitTestPoint(x, y) {
            if (this.mc) {
                return Phaser.Math.distance(this.x, this.y, x, y) <= this.mc.width / 2;
            }
            else {
                console.warn("Item.hitTestPoint is not completely implemented ");
                return Phaser.Math.distance(this.x, this.y, x, y) <= 25;
            }
        }
        /// актуализируем нативные свойства
        render() { }
    }
    Item.matrix = new Matrix();
    Item.point = new Point();
    src.Item = Item;
})(src || (src = {}));
///<reference path="Item.ts"/>
var src;
(function (src) {
    class Bottle extends src.Item {
        constructor(settigns, space) {
            super(settigns);
            this.space = space;
            this.initSelf();
        }
        initSelf() {
            this.angle = (this._setting).rotation;
        }
        animationStopCallback() {
            this.visible = false;
        }
        animationNullRotateCallback() {
            this.rotation = 0;
        }
        set settings(value) {
            super.settings = value;
            this.visible = true;
            this.playRandIdleFrame();
            this.angle = (this._setting).rotation;
        }
        get settings() {
            return this._setting;
        }
        playRandIdleFrame() {
        }
        createDisplay() {
            this.mc = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS));
            this.mc.anchor.set(0.5, 0.5);
            switch (this.settings.movie_id) {
                case 'Bottle1':
                    this.mc.anchor.set(0.5, 0.22);
                    break;
                case 'Bottle2':
                    this.mc.anchor.set(0.55, 0.25);
                    break;
                case 'Bottle3':
                    this.mc.anchor.set(0.38, 0.245);
                    break;
                case 'UFO':
                    this.mc.anchor.set(0.45, 0.33);
                    break;
            }
            let bottle = this._setting;
            if (bottle.boss) {
                this.deathAnim = this.mc.animations.add('death', Phaser.Animation.generateFrameNames(this.settings.movie_id, 8, 30, '', 4));
                this.shakeAnim = this.mc.animations.add('shake', Phaser.Animation.generateFrameNames(this.settings.movie_id, 0, 7, '', 4));
                this.shakeAnim.play(45, true, false);
            }
            else {
                this.deathAnim = this.mc.animations.add('death', Phaser.Animation.generateFrameNames(this.settings.movie_id, 8, 23, '', 4));
                this.shakeAnim = this.mc.animations.add('shake', Phaser.Animation.generateFrameNames(this.settings.movie_id, 0, 7, '', 4));
                this.shakeAnim.play(60, true, false);
                this.shakeAnim.setFrame(Math.floor(Math.random() * 8), true);
            }
        }
        updateDelta(deltaTime) {
        }
        render() {
            //do nothing
        }
        hitTestPoint(x, y, shapeFlag = false) {
            return Phaser.Math.distance(this.x, this.y, x, y) <= this.settings.radius;
        }
        shoot() {
            let bottle = this._setting;
            bottle.shoot();
            if (this.mc && this.deathAnim) {
                this.deathAnim.play(45, false, false)
                    .onComplete.add(this.animationStopCallback, this);
            }
            if (bottle.boss) {
                this.space.effects.addRastEffect('score_effect_100', this.x, this.y - 40, 0);
                src.SoundController.instance.playSound('UfoExplosion');
            }
            else {
                this.space.effects.addRastEffect('score_effect_10', this.x, this.y - 30, 0);
                src.SoundController.instance.playSound('Bottle' + String(1 + Math.floor(Math.random() * 4)));
            }
        }
    }
    src.Bottle = Bottle;
})(src || (src = {}));
///<reference path="Item.ts"/>
var src;
(function (src) {
    /**
     * Общий класс для планет и пистолета
     * @author zu
     */
    class Gravity extends src.Item {
        constructor(setting) {
            super(setting);
        }
        land(hero, landPoint) { }
        ;
        launch(hero) { return false; }
        ;
        get index() { return (this._setting).index; }
        ;
    }
    src.Gravity = Gravity;
})(src || (src = {}));
var src;
(function (src) {
    var Point = Phaser.Point;
    var Matrix = Phaser.Matrix;
    /**
     * @author zu
     */
    class HeroMan extends Phaser.Group {
        constructor(space) {
            super(space.game, null);
            this.framerate = 60;
            this.speedX = 0.0;
            this.speedY = 0.0;
            this.deltaX = 0.0;
            this.deltaY = 0.0;
            /// расстояние которое нужно пролететь, чтобы реагировать с элементами мира
            this.IGNORE_DISTANCE = 30;
            /// расстояние после которого будет произноситься фраза
            this.SOUND_DISTANCE = 40;
            this.HIT_HEAD = new Point(0, -32).subtract(0, 32);
            this.HIT_LEFT = new Point(-33, -12).subtract(0, 22);
            this.HIT_RIGHT = new Point(33, -12).subtract(0, 22);
            /// матрица для вычислений
            this.matrix = new Matrix();
            this.space = space;
            this.hero = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS));
            this.hero.anchor.set(0.5, 0.92);
            this.createAnimations();
            this.left_shootpoint = new Point(-33, -20);
            this.right_shootpoint = new Point(33, -20);
            // var gh:Graphics = new Graphics(App.instance);
            // gh.beginFill(0);
            // gh.drawCircle(this.HIT_HEAD.x, this.HIT_HEAD.y, 5);
            // gh.drawCircle( this.HIT_LEFT.x, this.HIT_LEFT.y, 5);
            // gh.drawCircle( this.HIT_RIGHT.x, this.HIT_RIGHT.y, 5);
            // gh.endFill();
            // this.addChild(gh);
            this.hit_head = this.HIT_HEAD.clone();
            this.hit_left = this.HIT_LEFT.clone();
            this.hit_right = this.HIT_RIGHT.clone();
            this.hit_left_shoot = this.left_shootpoint.clone();
            this.hit_right_shoot = this.right_shootpoint.clone();
        }
        createAnimations() {
            this.hero.animations.add('fly', Phaser.Animation.generateFrameNames('hero', 0, 0, '', 4));
            this.hero.animations.add('default', Phaser.Animation.generateFrameNames('hero', 1, 7, '', 4)).onComplete.add(this.cycleDefault, this);
            const shotAnim = this.hero.animations.add('shot', Phaser.Animation.generateFrameNames('hero', 8, 24, '', 4));
            shotAnim.onComplete.add(this.endShoot, this);
            shotAnim.enableUpdate = true;
            shotAnim.onUpdate.add((anim) => {
                if (anim._frameIndex == 1 || anim._frameIndex == 9) {
                    this.leftShotEffect();
                }
                else if (anim._frameIndex == 5 || anim._frameIndex == 13) {
                    this.rightShotEffect();
                }
            });
            this.hero.animations.add('landing', Phaser.Animation.generateFrameNames('hero', 25, 33, '', 4)).onComplete.add(this.cycleDefault, this);
            this.hero.animations.add('gun_remove', Phaser.Animation.generateFrameNames('hero', 36, 46, '', 4)).onComplete.add(this.gotoAndPlay, this);
            this.hero.animations.add('relax', Phaser.Animation.generateFrameNames('hero', 47, 60, '', 4)).onComplete.add(this.gunRemove, this);
            this.hero.animations.play('fly');
        }
        leftShotEffect() {
            this.space.effects.addRastEffect('GunCloud', this.hit_left_shoot.x, this.hit_left_shoot.y, -this.rotation);
            src.SoundController.instance.playSound('Shoot' + String(1 + Math.floor(Math.random() * 4)));
        }
        rightShotEffect() {
            this.space.effects.addRastEffect('GunCloud', this.hit_right_shoot.x, this.hit_right_shoot.y, -this.rotation);
            src.SoundController.instance.playSound('Shoot' + String(1 + Math.floor(Math.random() * 4)));
        }
        endShoot() {
            this._isShoot = false;
            this.gotoAndPlay('relax');
        }
        gunRemove() {
            this.gotoAndPlay('gun_remove');
        }
        gotoFly() {
            this.gotoAndPlay('fly');
        }
        cycleDefault() {
            this.gotoAndPlay('default', true, 45);
        }
        ;
        relaxAnimCompleteListener() {
            this.gotoFly();
        }
        updateDelta(delta) {
            if (this._isShootFly || this._isPlanetFly) {
                this.speedY += src.Constant.GRAVITY * delta; // изменение скорости
                this.deltaX = this.speedX * delta;
                this.deltaY = this.speedY * delta;
                this.x += this.deltaX;
                this.y += this.deltaY;
                var d = Math.atan2(this.deltaY, this.deltaX) + src.Constant.PI_2;
                this.rotation = d;
                this._fly_distance += Math.abs(this.deltaX) + Math.abs(this.deltaY); // не будем считать корень, сойдет и так...
                if (this._fly_sound && this._fly_distance > this.SOUND_DISTANCE) {
                    src.SoundController.instance.playSound('VoiceInFly' + String(Math.floor(Math.random() * 2) + 1));
                    this._fly_sound = false;
                }
                /// точки столкновений
                var dcos = Math.cos(d);
                var dsin = Math.sin(d);
                this.hit_head.x = this.x /* + (HIT_HEAD.x * dcos)*/ - (this.HIT_HEAD.y * dsin);
                this.hit_head.y = this.y /* + (HIT_HEAD.x * dsin)*/ + (this.HIT_HEAD.y * dcos);
                this.hit_left.x = this.x + (this.HIT_LEFT.x * dcos) - (this.HIT_LEFT.y * dsin);
                this.hit_left.y = this.y + (this.HIT_LEFT.x * dsin) + (this.HIT_LEFT.y * dcos);
                this.hit_right.x = this.x + (this.HIT_RIGHT.x * dcos) - (this.HIT_RIGHT.y * dsin);
                this.hit_right.y = this.y + (this.HIT_RIGHT.x * dsin) + (this.HIT_RIGHT.y * dcos);
                this.hit_left_shoot.x = this.x + (this.left_shootpoint.x * dcos) - (this.left_shootpoint.y * dsin);
                this.hit_left_shoot.y = this.y + (this.left_shootpoint.x * dsin) + (this.left_shootpoint.y * dcos);
                this.hit_right_shoot.x = this.x + (this.right_shootpoint.x * dcos) - (this.right_shootpoint.y * dsin);
                this.hit_right_shoot.y = this.y + (this.right_shootpoint.x * dsin) + (this.right_shootpoint.y * dcos);
            }
        }
        replay() {
            this.x = this.y = 0;
            this.deltaX = this.deltaY = 0;
            this.rotation = 0;
            this._isPlanetFly = this._isShootFly = false;
            this.visible = true;
            this._isShoot = false;
            this.cycleDefault();
        }
        two_jamp() {
            if (this._isPlanetFly) {
                if (!this._hasJamp) {
                    this.speedY = src.Constant.TWO_JAMP_Y;
                    this.space.effects.addRastEffect('JumpCloud1', this.x, this.y, 0);
                    this._hasJamp = true;
                    src.SoundController.instance.playSound('Jamp');
                }
            }
        }
        land(gravity_item) {
            this._isPlanetFly = this._isShootFly = false;
            this.deltaX = this.deltaY = 0;
            this._hasJamp = false;
            this._isShoot = false;
            this._gravity_item = gravity_item;
            this.gotoAndPlay('landing');
        }
        /// шериф летит
        get isFly() {
            return this._isShootFly || this._isPlanetFly;
        }
        get isPlanetFly() {
            return this._isPlanetFly;
        }
        get isShootFly() {
            return this._isShootFly;
        }
        shoot() {
            if (!this._isShoot) {
                this.gotoAndPlay('shot');
                this._isShoot = true;
            }
        }
        get gravity_item() {
            return this._gravity_item;
        }
        render() {
        }
        fly(from_planet) {
            this._fly_distance = 0;
            this.gotoFly();
            if (from_planet) {
                this._isPlanetFly = true;
                this._fly_sound = Math.random() < 0.4;
            }
            else {
                this._isShootFly = true;
                this._fly_sound = Math.random() < 0.1;
            }
        }
        get ignore_gravity() {
            return this._fly_distance < this.IGNORE_DISTANCE;
        }
        gotoAndPlay(key, loop = false, framerate = this.framerate) {
            this.hero.animations.play(key, framerate, loop, false);
        }
        pauseAnims() {
            this.hero.animations.paused = true;
        }
        resumeAnims() {
            this.hero.animations.paused = false;
        }
    }
    src.HeroMan = HeroMan;
})(src || (src = {}));
var src;
(function (src) {
    class ItemGun extends src.Gravity {
        constructor(settings, space) {
            super(settings);
            this.space = space;
            this.gun_settings = settings;
            this.initSelf();
        }
        initSelf() {
            this.angle = this.gun_settings.rotation;
        }
        createDisplay() {
            this.mc = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'gun0000'));
            this.mc.anchor.set(0.5);
            this.mc.animations.add('prepare_shot', Phaser.Animation.generateFrameNames('gun', 0, 59, '', 4), 45, false).onComplete.add(this.autoShoot, this);
            this.mc.animations.add('after_shot', Phaser.Animation.generateFrameNames('gun', 60, 70, '', 4), 45, false);
        }
        land(hero, landPoint) {
            this.hero = hero;
            hero.visible = false;
            this.mc.animations.play('prepare_shot');
            this.space.effects.addRastEffect('GunLandingCloud1', landPoint.x, landPoint.y, 0);
            src.SoundController.instance.playSound('GunIn');
        }
        autoShoot() {
            src.Item.matrix.tx = src.Constant.GUNPOINT_X;
            src.Item.matrix.ty = src.Constant.GUNPOINT_Y;
            src.Item.matrix.rotate(this.rotation);
            this.hero.x = this.x + src.Item.matrix.tx;
            this.hero.y = this.y + src.Item.matrix.ty;
            src.Item.matrix.tx = src.Constant.GUN_SHOOT;
            src.Item.matrix.ty = 0;
            src.Item.matrix.rotate(this.rotation);
            this.hero.speedX = src.Item.matrix.tx;
            this.hero.speedY = src.Item.matrix.ty;
            this.hero.visible = true;
            this.hero.fly(false);
            this.mc.animations.play('after_shot');
            this.space.effects.addRastEffect('GunShotCloud', this.hero.x, this.hero.y, this.rotation);
            src.SoundController.instance.playSound('GunShot');
            this.hero = null;
        }
        updateDelta(deltaTime) {
        }
        render() {
        }
        set settings(value) {
            super.settings = value;
            this.gun_settings = value;
            this.angle = this.gun_settings.rotation;
        }
    }
    src.ItemGun = ItemGun;
})(src || (src = {}));
var src;
(function (src) {
    class Path {
        static getPoint(planetID, angle, planetRadius) {
            const normalizedAngle = (Phaser.Math.wrapAngle(angle, false) + 360) % 360;
            let point;
            let scale = 1;
            if (planetID == 'EarthTriangleGuide') {
                point = this.trianglePathPoints[Math.floor(normalizedAngle)];
                scale = Phaser.Math.distance(0, 0, point.x, point.y) / 244;
            }
            else {
                point = this.roundPathPoints[Math.floor(normalizedAngle)];
                scale = Phaser.Math.distance(0, 0, point.x, point.y) / 255;
            }
            let actualAngle = Math.atan2(point.y, point.x) + Math.PI / 2;
            let targetPoint = { x: planetRadius * scale * Math.sin(actualAngle), y: -planetRadius * scale * Math.cos(actualAngle) };
            return targetPoint;
        }
        static getAngle(planetID, angle) {
            const normalizedAngle = (Phaser.Math.wrapAngle(angle, false) + 360) % 360;
            if (planetID == 'EarthTriangleGuide') {
                return this.trianglePathPoints[Math.floor(normalizedAngle)].r;
            }
            else {
                return this.roundPathPoints[Math.floor(normalizedAngle)].r;
            }
        }
    }
    Path.trianglePathPoints = [{ x: -0.35, y: -244.65, r: 0.01 }, { x: 3.7, y: -244.6, r: 1.01 }, { x: 7.8, y: -244.5, r: 3.03 }, { x: 11.9, y: -244.2, r: 5.05 }, { x: 15.95, y: -243.75, r: 7.06 }, { x: 20, y: -243.15, r: 9.26 }, { x: 24.1, y: -242.4, r: 11.06 }, { x: 28.15, y: -241.55, r: 13.05 }, { x: 32.1, y: -240.55, r: 15.02 }, { x: 36.1, y: -239.4, r: 16.79 }, { x: 40, y: -238.15, r: 18.55 }, { x: 43.9, y: -236.8, r: 20.29 }, { x: 47.75, y: -235.3, r: 21.83 }, { x: 51.5, y: -233.75, r: 23.54 }, { x: 55.2, y: -232.05, r: 25.05 }, { x: 58.95, y: -230.25, r: 26.54 }, { x: 62.6, y: -228.35, r: 27.84 }, { x: 66.2, y: -226.4, r: 29.3 }, { x: 69.75, y: -224.35, r: 30.56 }, { x: 73.25, y: -222.25, r: 31.81 }, { x: 76.7, y: -220.05, r: 32.86 }, { x: 80.1, y: -217.8, r: 34.09 }, { x: 83.45, y: -215.55, r: 35.11 }, { x: 86.8, y: -213.1, r: 36.12 }, { x: 90.05, y: -210.7, r: 37.12 }, { x: 93.3, y: -208.2, r: 38.12 }, { x: 96.45, y: -205.65, r: 39.1 }, { x: 99.6, y: -203.05, r: 39.88 }, { x: 102.65, y: -200.45, r: 40.84 }, { x: 105.7, y: -197.75, r: 41.58 }, { x: 108.8, y: -195.05, r: 42.34 }, { x: 111.75, y: -192.25, r: 43.1 }, { x: 114.75, y: -189.45, r: 43.86 }, { x: 117.65, y: -186.6, r: 44.61 }, { x: 120.65, y: -183.7, r: 45.36 }, { x: 123.45, y: -180.8, r: 46.11 }, { x: 126.25, y: -177.8, r: 46.86 }, { x: 129.05, y: -174.85, r: 47.6 }, { x: 131.85, y: -171.8, r: 48.15 }, { x: 134.55, y: -168.75, r: 48.89 }, { x: 137.25, y: -165.65, r: 49.62 }, { x: 139.9, y: -162.5, r: 50.17 }, { x: 142.45, y: -159.35, r: 50.89 }, { x: 145.05, y: -156.2, r: 51.62 }, { x: 147.55, y: -153, r: 52.15 }, { x: 150.05, y: -149.75, r: 52.87 }, { x: 152.5, y: -146.5, r: 53.4 }, { x: 154.9, y: -143.2, r: 53.93 }, { x: 157.3, y: -139.9, r: 54.64 }, { x: 159.65, y: -136.55, r: 55.16 }, { x: 162, y: -133.2, r: 55.68 }, { x: 164.2, y: -129.85, r: 56.38 }, { x: 166.55, y: -126.5, r: 56.89 }, { x: 168.7, y: -123.05, r: 57.4 }, { x: 170.95, y: -119.65, r: 57.91 }, { x: 173.05, y: -116.15, r: 58.42 }, { x: 175.2, y: -112.7, r: 58.92 }, { x: 177.3, y: -109.2, r: 59.42 }, { x: 179.3, y: -105.7, r: 59.92 }, { x: 181.35, y: -102.2, r: 60.42 }, { x: 183.35, y: -98.65, r: 60.91 }, { x: 185.35, y: -95.1, r: 61.4 }, { x: 187.3, y: -91.55, r: 61.9 }, { x: 189.2, y: -88, r: 62.2 }, { x: 191.05, y: -84.45, r: 62.69 }, { x: 192.9, y: -80.85, r: 63.19 }, { x: 194.7, y: -77.3, r: 63.68 }, { x: 196.45, y: -73.65, r: 64.17 }, { x: 198.25, y: -70.05, r: 64.67 }, { x: 199.95, y: -66.4, r: 65.17 }, { x: 201.65, y: -62.75, r: 65.67 }, { x: 203.3, y: -59.1, r: 66.18 }, { x: 204.9, y: -55.4, r: 66.68 }, { x: 206.5, y: -51.7, r: 67.19 }, { x: 208.05, y: -48.05, r: 67.7 }, { x: 209.6, y: -44.25, r: 68.21 }, { x: 211.1, y: -40.5, r: 68.72 }, { x: 212.5, y: -36.75, r: 69.42 }, { x: 213.95, y: -32.95, r: 69.94 }, { x: 215.35, y: -29.15, r: 70.46 }, { x: 216.65, y: -25.35, r: 71.17 }, { x: 217.95, y: -21.6, r: 71.69 }, { x: 219.25, y: -17.7, r: 72.22 }, { x: 220.45, y: -13.85, r: 72.93 }, { x: 221.6, y: -10, r: 73.46 }, { x: 222.8, y: -6.1, r: 74.18 }, { x: 223.9, y: -2.25, r: 74.71 }, { x: 224.9, y: 1.6, r: 75.44 }, { x: 226, y: 5.55, r: 75.97 }, { x: 226.95, y: 9.5, r: 76.7 }, { x: 227.85, y: 13.45, r: 77.43 }, { x: 228.75, y: 17.35, r: 77.97 }, { x: 229.6, y: 21.35, r: 78.71 }, { x: 230.35, y: 25.25, r: 79.44 }, { x: 231.1, y: 29.3, r: 79.99 }, { x: 231.8, y: 33.3, r: 80.72 }, { x: 232.45, y: 37.25, r: 81.47 }, { x: 233, y: 41.15, r: 82.22 }, { x: 233.55, y: 45.05, r: 82.99 }, { x: 234, y: 49, r: 83.95 }, { x: 234.35, y: 52.9, r: 84.73 }, { x: 234.75, y: 56.9, r: 85.71 }, { x: 235.05, y: 60.85, r: 86.71 }, { x: 235.25, y: 64.75, r: 87.71 }, { x: 235.4, y: 68.75, r: 88.73 }, { x: 235.45, y: 72.75, r: 89.96 }, { x: 235.45, y: 76.75, r: 91.01 }, { x: 235.35, y: 80.8, r: 92.26 }, { x: 235.15, y: 84.7, r: 93.54 }, { x: 234.85, y: 88.7, r: 95.02 }, { x: 234.45, y: 92.7, r: 96.52 }, { x: 233.95, y: 96.65, r: 98.05 }, { x: 233.35, y: 100.7, r: 99.78 }, { x: 232.6, y: 104.6, r: 101.54 }, { x: 231.75, y: 108.55, r: 103.52 }, { x: 230.75, y: 112.45, r: 105.52 }, { x: 229.6, y: 116.25, r: 107.54 }, { x: 228.35, y: 120.15, r: 109.79 }, { x: 226.9, y: 123.85, r: 112.05 }, { x: 225.3, y: 127.65, r: 114.54 }, { x: 223.6, y: 131.3, r: 117.04 }, { x: 221.65, y: 134.9, r: 119.57 }, { x: 219.6, y: 138.35, r: 122.32 }, { x: 217.3, y: 141.8, r: 125.11 }, { x: 214.85, y: 145.15, r: 128.07 }, { x: 212.2, y: 148.3, r: 130.63 }, { x: 209.45, y: 151.45, r: 133.34 }, { x: 206.55, y: 154.4, r: 135.65 }, { x: 203.5, y: 157.25, r: 138.12 }, { x: 200.4, y: 159.95, r: 140.36 }, { x: 197.15, y: 162.55, r: 142.39 }, { x: 193.85, y: 165.1, r: 144.38 }, { x: 190.5, y: 167.45, r: 146.16 }, { x: 187.05, y: 169.65, r: 147.91 }, { x: 183.5, y: 171.9, r: 149.44 }, { x: 179.95, y: 173.95, r: 150.95 }, { x: 176.35, y: 175.9, r: 152.44 }, { x: 172.65, y: 177.75, r: 153.9 }, { x: 169, y: 179.55, r: 155.16 }, { x: 165.25, y: 181.3, r: 156.21 }, { x: 161.5, y: 182.85, r: 157.43 }, { x: 157.75, y: 184.4, r: 158.45 }, { x: 153.95, y: 185.9, r: 159.45 }, { x: 150.1, y: 187.35, r: 160.44 }, { x: 146.3, y: 188.7, r: 161.42 }, { x: 142.4, y: 190, r: 162.2 }, { x: 138.55, y: 191.25, r: 162.97 }, { x: 134.65, y: 192.4, r: 163.71 }, { x: 130.7, y: 193.5, r: 164.46 }, { x: 126.75, y: 194.65, r: 165.21 }, { x: 122.8, y: 195.65, r: 165.95 }, { x: 118.8, y: 196.7, r: 166.69 }, { x: 114.85, y: 197.65, r: 167.43 }, { x: 110.8, y: 198.55, r: 167.97 }, { x: 106.8, y: 199.4, r: 168.7 }, { x: 102.8, y: 200.2, r: 169.24 }, { x: 98.75, y: 200.95, r: 169.96 }, { x: 94.7, y: 201.7, r: 170.68 }, { x: 90.7, y: 202.35, r: 171.21 }, { x: 86.65, y: 203, r: 171.73 }, { x: 82.6, y: 203.6, r: 172.44 }, { x: 78.5, y: 204.15, r: 172.96 }, { x: 74.5, y: 204.65, r: 173.47 }, { x: 70.4, y: 205.1, r: 173.99 }, { x: 66.35, y: 205.5, r: 174.49 }, { x: 62.3, y: 205.95, r: 175.19 }, { x: 58.2, y: 206.3, r: 175.69 }, { x: 54.15, y: 206.6, r: 176.19 }, { x: 50.1, y: 206.9, r: 176.69 }, { x: 46.05, y: 207.15, r: 177.19 }, { x: 42, y: 207.35, r: 177.49 }, { x: 37.9, y: 207.5, r: 177.98 }, { x: 33.8, y: 207.7, r: 178.47 }, { x: 29.75, y: 207.8, r: 178.95 }, { x: 25.7, y: 207.9, r: 179.44 }, { x: 21.6, y: 207.95, r: 179.73 }, { x: 17.6, y: 208, r: -179.97 }, { x: 13.45, y: 208, r: -179.49 }, { x: 9.4, y: 207.95, r: -179.21 }, { x: 5.35, y: 207.9, r: -178.73 }, { x: 1.3, y: 207.85, r: -178.46 }, { x: -2.7, y: 207.75, r: -177.99 }, { x: -6.65, y: 207.6, r: -177.71 }, { x: -10.7, y: 207.45, r: -177.24 }, { x: -14.7, y: 207.25, r: -176.95 }, { x: -18.75, y: 207.05, r: -176.47 }, { x: -22.7, y: 206.8, r: -176.18 }, { x: -26.7, y: 206.5, r: -175.7 }, { x: -30.75, y: 206.2, r: -175.22 }, { x: -34.75, y: 205.9, r: -174.74 }, { x: -38.75, y: 205.55, r: -174.44 }, { x: -42.8, y: 205.1, r: -173.96 }, { x: -46.8, y: 204.7, r: -173.47 }, { x: -50.8, y: 204.25, r: -172.98 }, { x: -54.8, y: 203.75, r: -172.49 }, { x: -58.85, y: 203.25, r: -172.18 }, { x: -62.8, y: 202.7, r: -171.69 }, { x: -66.8, y: 202.1, r: -171.19 }, { x: -70.75, y: 201.5, r: -170.7 }, { x: -74.8, y: 200.85, r: -170.2 }, { x: -78.75, y: 200.15, r: -169.69 }, { x: -82.75, y: 199.4, r: -169.19 }, { x: -86.7, y: 198.65, r: -168.69 }, { x: -90.65, y: 197.85, r: -168.18 }, { x: -94.65, y: 197.05, r: -167.48 }, { x: -98.6, y: 196.15, r: -166.97 }, { x: -102.55, y: 195.25, r: -166.46 }, { x: -106.4, y: 194.3, r: -165.94 }, { x: -110.4, y: 193.3, r: -165.43 }, { x: -114.25, y: 192.3, r: -164.72 }, { x: -118.2, y: 191.25, r: -164.2 }, { x: -122.1, y: 190.1, r: -163.68 }, { x: -126, y: 189, r: -162.97 }, { x: -129.85, y: 187.8, r: -162.46 }, { x: -133.7, y: 186.6, r: -161.92 }, { x: -137.45, y: 185.3, r: -161.2 }, { x: -141.2, y: 184.1, r: -160.47 }, { x: -144.9, y: 182.75, r: -159.91 }, { x: -148.6, y: 181.4, r: -159.16 }, { x: -152.25, y: 180, r: -158.21 }, { x: -155.9, y: 178.5, r: -157.44 }, { x: -159.65, y: 177, r: -156.65 }, { x: -163.25, y: 175.4, r: -155.67 }, { x: -166.85, y: 173.75, r: -154.67 }, { x: -170.45, y: 172.05, r: -153.66 }, { x: -173.95, y: 170.25, r: -152.44 }, { x: -177.5, y: 168.4, r: -151.39 }, { x: -180.95, y: 166.5, r: -150.14 }, { x: -184.45, y: 164.45, r: -148.67 }, { x: -187.85, y: 162.4, r: -147.38 }, { x: -191.2, y: 160.2, r: -145.68 }, { x: -194.5, y: 157.9, r: -144.14 }, { x: -197.75, y: 155.55, r: -142.39 }, { x: -200.9, y: 153.05, r: -140.41 }, { x: -203.95, y: 150.5, r: -138.41 }, { x: -206.95, y: 147.75, r: -136.36 }, { x: -209.8, y: 144.95, r: -134.1 }, { x: -212.55, y: 142.05, r: -131.6 }, { x: -215.2, y: 139, r: -129.07 }, { x: -217.75, y: 135.75, r: -126.31 }, { x: -220.1, y: 132.4, r: -123.08 }, { x: -222.3, y: 128.9, r: -119.8 }, { x: -224.2, y: 125.25, r: -116.56 }, { x: -226, y: 121.45, r: -113.54 }, { x: -227.65, y: 117.6, r: -110.56 }, { x: -229.05, y: 113.7, r: -107.81 }, { x: -230.3, y: 109.7, r: -105.29 }, { x: -231.3, y: 105.75, r: -103.01 }, { x: -232.2, y: 101.65, r: -100.76 }, { x: -232.95, y: 97.6, r: -98.55 }, { x: -233.55, y: 93.5, r: -96.76 }, { x: -234, y: 89.35, r: -95 }, { x: -234.3, y: 85.25, r: -93.26 }, { x: -234.55, y: 81.1, r: -91.75 }, { x: -234.65, y: 77.05, r: -90.26 }, { x: -234.65, y: 72.9, r: -88.98 }, { x: -234.55, y: 68.8, r: -87.73 }, { x: -234.4, y: 64.65, r: -86.68 }, { x: -234.05, y: 60.65, r: -85.47 }, { x: -233.8, y: 56.55, r: -84.45 }, { x: -233.4, y: 52.45, r: -83.46 }, { x: -232.9, y: 48.45, r: -82.47 }, { x: -232.35, y: 44.35, r: -81.69 }, { x: -231.8, y: 40.4, r: -80.73 }, { x: -231.15, y: 36.4, r: -79.97 }, { x: -230.4, y: 32.4, r: -79.22 }, { x: -229.65, y: 28.3, r: -78.47 }, { x: -228.85, y: 24.35, r: -77.73 }, { x: -227.95, y: 20.35, r: -76.98 }, { x: -227.05, y: 16.35, r: -76.43 }, { x: -226.1, y: 12.35, r: -75.69 }, { x: -225.1, y: 8.35, r: -74.95 }, { x: -224, y: 4.45, r: -74.22 }, { x: -222.9, y: 0.45, r: -73.68 }, { x: -221.75, y: -3.45, r: -72.95 }, { x: -220.55, y: -7.35, r: -72.42 }, { x: -219.35, y: -11.2, r: -71.7 }, { x: -218.05, y: -15.1, r: -71.17 }, { x: -216.8, y: -19, r: -70.45 }, { x: -215.4, y: -22.85, r: -69.92 }, { x: -214, y: -26.7, r: -69.21 }, { x: -212.55, y: -30.5, r: -68.69 }, { x: -211.1, y: -34.3, r: -68.18 }, { x: -209.55, y: -38.1, r: -67.66 }, { x: -208, y: -41.9, r: -66.96 }, { x: -206.45, y: -45.65, r: -66.45 }, { x: -204.85, y: -49.35, r: -65.95 }, { x: -203.2, y: -53.1, r: -65.44 }, { x: -201.5, y: -56.75, r: -64.94 }, { x: -199.8, y: -60.5, r: -64.44 }, { x: -198.05, y: -64.15, r: -63.94 }, { x: -196.35, y: -67.8, r: -63.45 }, { x: -194.5, y: -71.5, r: -63.14 }, { x: -192.65, y: -75.05, r: -62.65 }, { x: -190.8, y: -78.65, r: -62.16 }, { x: -188.95, y: -82.3, r: -61.68 }, { x: -187, y: -85.85, r: -61.19 }, { x: -185.1, y: -89.45, r: -60.69 }, { x: -183.15, y: -93, r: -60.39 }, { x: -181.15, y: -96.45, r: -59.91 }, { x: -179.15, y: -99.95, r: -59.42 }, { x: -177.15, y: -103.4, r: -58.93 }, { x: -175.1, y: -106.8, r: -58.44 }, { x: -173, y: -110.3, r: -58.13 }, { x: -170.9, y: -113.65, r: -57.64 }, { x: -168.75, y: -117.1, r: -57.14 }, { x: -166.6, y: -120.5, r: -56.64 }, { x: -164.4, y: -123.85, r: -56.14 }, { x: -162.15, y: -127.2, r: -55.63 }, { x: -159.95, y: -130.5, r: -55.12 }, { x: -157.6, y: -133.8, r: -54.43 }, { x: -155.25, y: -137.1, r: -53.91 }, { x: -152.9, y: -140.4, r: -53.4 }, { x: -150.55, y: -143.6, r: -52.88 }, { x: -148.15, y: -146.8, r: -52.37 }, { x: -145.65, y: -150.05, r: -51.66 }, { x: -143.15, y: -153.2, r: -51.13 }, { x: -140.65, y: -156.35, r: -50.61 }, { x: -138.1, y: -159.5, r: -49.89 }, { x: -135.5, y: -162.6, r: -49.36 }, { x: -132.9, y: -165.65, r: -48.64 }, { x: -130.2, y: -168.65, r: -48.1 }, { x: -127.5, y: -171.75, r: -47.37 }, { x: -124.8, y: -174.7, r: -46.64 }, { x: -122.05, y: -177.6, r: -46.1 }, { x: -119.25, y: -180.55, r: -45.36 }, { x: -116.4, y: -183.5, r: -44.63 }, { x: -113.55, y: -186.35, r: -43.89 }, { x: -110.65, y: -189.15, r: -43.14 }, { x: -107.75, y: -191.95, r: -42.59 }, { x: -104.75, y: -194.7, r: -41.84 }, { x: -101.75, y: -197.35, r: -41.09 }, { x: -98.65, y: -200.05, r: -40.13 }, { x: -95.65, y: -202.65, r: -39.37 }, { x: -92.6, y: -205.15, r: -38.6 }, { x: -89.55, y: -207.6, r: -37.81 }, { x: -86.35, y: -210.1, r: -36.84 }, { x: -83.2, y: -212.45, r: -35.85 }, { x: -79.95, y: -214.8, r: -34.85 }, { x: -76.7, y: -217.1, r: -33.84 }, { x: -73.45, y: -219.35, r: -32.82 }, { x: -70.1, y: -221.5, r: -31.59 }, { x: -66.65, y: -223.6, r: -30.55 }, { x: -63.2, y: -225.6, r: -29.3 }, { x: -59.7, y: -227.55, r: -28.04 }, { x: -56.2, y: -229.45, r: -26.58 }, { x: -52.6, y: -231.25, r: -25.29 }, { x: -48.95, y: -232.95, r: -23.79 }, { x: -45.3, y: -234.55, r: -22.28 }, { x: -41.55, y: -236.05, r: -20.57 }, { x: -37.75, y: -237.45, r: -19.03 }, { x: -33.95, y: -238.75, r: -17.28 }, { x: -30.1, y: -239.95, r: -15.52 }, { x: -26.2, y: -241, r: -13.55 }, { x: -22.25, y: -241.95, r: -11.76 }, { x: -18.3, y: -242.75, r: -9.77 }, { x: -14.3, y: -243.4, r: -7.76 }, { x: -10.3, y: -243.95, r: -5.56 }, { x: -6.3, y: -244.3, r: -3.53 }, { x: -2.2, y: -244.55, r: -1.5 }];
    Path.roundPathPoints = [{ x: 0.2, y: -251.5, r: 3.3 }, { x: 4.6, y: -251.25, r: 4.03 }, { x: 8.9, y: -250.85, r: 4.8 }, { x: 13.3, y: -250.4, r: 5.76 }, { x: 17.65, y: -249.9, r: 6.53 }, { x: 22, y: -249.35, r: 7.3 }, { x: 26.4, y: -248.65, r: 8.06 }, { x: 30.7, y: -248, r: 9.04 }, { x: 34.95, y: -247.25, r: 10.02 }, { x: 39.25, y: -246.45, r: 10.81 }, { x: 43.5, y: -245.55, r: 11.79 }, { x: 47.75, y: -244.6, r: 12.78 }, { x: 52, y: -243.55, r: 13.78 }, { x: 56.2, y: -242.45, r: 14.78 }, { x: 60.45, y: -241.25, r: 15.79 }, { x: 64.65, y: -240, r: 16.81 }, { x: 68.85, y: -238.65, r: 18.02 }, { x: 72.95, y: -237.2, r: 19.05 }, { x: 77.1, y: -235.7, r: 20.27 }, { x: 81.15, y: -234.15, r: 21.32 }, { x: 85.2, y: -232.45, r: 22.55 }, { x: 89.2, y: -230.7, r: 23.8 }, { x: 93.2, y: -228.85, r: 24.55 }, { x: 97.15, y: -227.05, r: 24.79 }, { x: 101, y: -225.2, r: 25.03 }, { x: 104.9, y: -223.35, r: 25.09 }, { x: 108.8, y: -221.45, r: 25.53 }, { x: 112.65, y: -219.55, r: 25.8 }, { x: 116.55, y: -217.65, r: 26.06 }, { x: 120.4, y: -215.7, r: 26.34 }, { x: 124.25, y: -213.7, r: 26.82 }, { x: 128.15, y: -211.7, r: 27.31 }, { x: 132, y: -209.65, r: 27.81 }, { x: 135.85, y: -207.55, r: 28.34 }, { x: 139.65, y: -205.4, r: 29.29 }, { x: 143.35, y: -203.25, r: 29.83 }, { x: 147.05, y: -201.05, r: 30.57 }, { x: 150.75, y: -198.85, r: 31.33 }, { x: 154.4, y: -196.55, r: 32.1 }, { x: 158, y: -194.15, r: 33.08 }, { x: 161.65, y: -191.75, r: 34.09 }, { x: 165.15, y: -189.25, r: 35.32 }, { x: 168.65, y: -186.7, r: 36.58 }, { x: 172.15, y: -184, r: 37.88 }, { x: 175.45, y: -181.25, r: 39.61 }, { x: 178.75, y: -178.35, r: 41.59 }, { x: 182, y: -175.4, r: 43.08 }, { x: 185.15, y: -172.4, r: 44.12 }, { x: 188.2, y: -169.3, r: 45.34 }, { x: 191.25, y: -166.15, r: 46.39 }, { x: 194.2, y: -162.9, r: 47.62 }, { x: 197.1, y: -159.55, r: 48.86 }, { x: 199.9, y: -156.25, r: 50.11 }, { x: 202.7, y: -152.85, r: 51.17 }, { x: 205.35, y: -149.4, r: 52.42 }, { x: 207.95, y: -145.85, r: 53.67 }, { x: 210.5, y: -142.25, r: 54.92 }, { x: 212.9, y: -138.6, r: 56.18 }, { x: 215.35, y: -134.95, r: 57.44 }, { x: 217.6, y: -131.2, r: 58.89 }, { x: 219.8, y: -127.35, r: 60.14 }, { x: 221.95, y: -123.5, r: 61.4 }, { x: 224, y: -119.6, r: 62.66 }, { x: 226, y: -115.7, r: 63.92 }, { x: 227.85, y: -111.7, r: 65.17 }, { x: 229.6, y: -107.75, r: 66.43 }, { x: 231.25, y: -103.7, r: 67.68 }, { x: 232.9, y: -99.6, r: 68.92 }, { x: 234.4, y: -95.45, r: 70.17 }, { x: 235.85, y: -91.3, r: 71.21 }, { x: 237.15, y: -87.05, r: 72.45 }, { x: 238.45, y: -82.8, r: 73.69 }, { x: 239.6, y: -78.45, r: 74.92 }, { x: 240.65, y: -74.15, r: 75.95 }, { x: 241.7, y: -69.85, r: 76.98 }, { x: 242.65, y: -65.5, r: 77.99 }, { x: 243.45, y: -61.1, r: 79.18 }, { x: 244.2, y: -56.8, r: 79.98 }, { x: 244.95, y: -52.4, r: 80.97 }, { x: 245.55, y: -48, r: 81.94 }, { x: 246.15, y: -43.65, r: 82.72 }, { x: 246.65, y: -39.2, r: 83.68 }, { x: 247.05, y: -34.85, r: 84.45 }, { x: 247.4, y: -30.4, r: 85.21 }, { x: 247.7, y: -26, r: 85.96 }, { x: 248, y: -21.6, r: 86.7 }, { x: 248.25, y: -17.2, r: 87.44 }, { x: 248.3, y: -12.8, r: 87.98 }, { x: 248.45, y: -8.35, r: 88.71 }, { x: 248.5, y: -4, r: 89.24 }, { x: 248.5, y: 0.4, r: 89.96 }, { x: 248.45, y: 4.75, r: 90.29 }, { x: 248.35, y: 9.15, r: 91.25 }, { x: 248.2, y: 13.5, r: 92.05 }, { x: 247.9, y: 17.85, r: 93.05 }, { x: 247.65, y: 22.25, r: 94.04 }, { x: 247.2, y: 26.65, r: 95.04 }, { x: 246.75, y: 30.95, r: 96.04 }, { x: 246.15, y: 35.3, r: 97.05 }, { x: 245.55, y: 39.7, r: 98.06 }, { x: 244.9, y: 44, r: 99.26 }, { x: 244.1, y: 48.3, r: 100.28 }, { x: 243.25, y: 52.6, r: 101.29 }, { x: 242.3, y: 56.85, r: 102.32 }, { x: 241.25, y: 61.1, r: 103.52 }, { x: 240.15, y: 65.45, r: 104.55 }, { x: 238.95, y: 69.65, r: 105.76 }, { x: 237.7, y: 73.8, r: 106.79 }, { x: 236.35, y: 78.05, r: 107.82 }, { x: 234.9, y: 82.15, r: 109.03 }, { x: 233.45, y: 86.3, r: 110.06 }, { x: 231.8, y: 90.4, r: 111.27 }, { x: 230.15, y: 94.45, r: 112.3 }, { x: 228.4, y: 98.45, r: 113.31 }, { x: 226.55, y: 102.5, r: 114.34 }, { x: 224.65, y: 106.45, r: 115.55 }, { x: 222.65, y: 110.45, r: 116.57 }, { x: 220.6, y: 114.35, r: 117.59 }, { x: 218.5, y: 118.25, r: 118.6 }, { x: 216.3, y: 122.05, r: 119.8 }, { x: 214.05, y: 125.85, r: 120.8 }, { x: 211.75, y: 129.6, r: 121.61 }, { x: 209.3, y: 133.3, r: 122.6 }, { x: 206.85, y: 137, r: 123.59 }, { x: 204.35, y: 140.6, r: 124.57 }, { x: 201.8, y: 144.2, r: 125.36 }, { x: 199.15, y: 147.8, r: 126.34 }, { x: 196.5, y: 151.3, r: 127.12 }, { x: 193.75, y: 154.75, r: 128.08 }, { x: 191, y: 158.15, r: 128.85 }, { x: 188.2, y: 161.6, r: 129.61 }, { x: 185.35, y: 164.9, r: 130.37 }, { x: 182.4, y: 168.15, r: 131.13 }, { x: 179.45, y: 171.4, r: 131.88 }, { x: 176.5, y: 174.7, r: 132.63 }, { x: 173.45, y: 177.8, r: 133.6 }, { x: 170.4, y: 180.9, r: 134.35 }, { x: 167.35, y: 183.95, r: 135.11 }, { x: 164.2, y: 187, r: 135.87 }, { x: 161.05, y: 189.95, r: 136.64 }, { x: 157.85, y: 192.9, r: 137.61 }, { x: 154.6, y: 195.8, r: 138.39 }, { x: 151.3, y: 198.6, r: 139.37 }, { x: 147.95, y: 201.4, r: 140.17 }, { x: 144.55, y: 204.1, r: 141.16 }, { x: 141.1, y: 206.8, r: 142.16 }, { x: 137.6, y: 209.4, r: 143.17 }, { x: 134.05, y: 211.95, r: 144.18 }, { x: 130.45, y: 214.4, r: 145.39 }, { x: 126.75, y: 216.85, r: 146.42 }, { x: 123.1, y: 219.2, r: 147.65 }, { x: 119.4, y: 221.45, r: 148.69 }, { x: 115.55, y: 223.65, r: 149.94 }, { x: 111.75, y: 225.75, r: 151.19 }, { x: 107.85, y: 227.8, r: 152.44 }, { x: 103.95, y: 229.8, r: 153.71 }, { x: 99.95, y: 231.6, r: 154.96 }, { x: 95.95, y: 233.4, r: 156.42 }, { x: 91.8, y: 235.05, r: 157.68 }, { x: 87.75, y: 236.65, r: 158.95 }, { x: 83.55, y: 238.15, r: 160.21 }, { x: 79.35, y: 239.6, r: 161.47 }, { x: 75.2, y: 240.9, r: 162.73 }, { x: 70.95, y: 242.15, r: 164.17 }, { x: 66.7, y: 243.25, r: 165.23 }, { x: 62.35, y: 244.3, r: 166.48 }, { x: 58.1, y: 245.2, r: 167.72 }, { x: 53.75, y: 246.1, r: 168.95 }, { x: 49.4, y: 246.8, r: 170.19 }, { x: 45.1, y: 247.55, r: 171.22 }, { x: 40.7, y: 248.1, r: 172.44 }, { x: 36.3, y: 248.55, r: 173.47 }, { x: 31.9, y: 249.05, r: 174.49 }, { x: 27.55, y: 249.3, r: 175.69 }, { x: 23.1, y: 249.65, r: 176.7 }, { x: 18.7, y: 249.8, r: 177.7 }, { x: 14.35, y: 249.9, r: 178.7 }, { x: 9.9, y: 249.95, r: 179.69 }, { x: 5.55, y: 249.9, r: -179.2 }, { x: 1.15, y: 249.75, r: -178.74 }, { x: -3.2, y: 249.6, r: -177.94 }, { x: -7.55, y: 249.35, r: -176.95 }, { x: -11.95, y: 249, r: -175.96 }, { x: -16.35, y: 248.6, r: -174.97 }, { x: -20.75, y: 248.15, r: -173.97 }, { x: -25.05, y: 247.6, r: -172.98 }, { x: -29.4, y: 246.95, r: -171.98 }, { x: -33.75, y: 246.25, r: -170.99 }, { x: -38.1, y: 245.5, r: -170.18 }, { x: -42.35, y: 244.65, r: -169.18 }, { x: -46.65, y: 243.75, r: -168.18 }, { x: -50.95, y: 242.75, r: -167.19 }, { x: -55.2, y: 241.65, r: -166.19 }, { x: -59.45, y: 240.55, r: -165.19 }, { x: -63.7, y: 239.3, r: -164.2 }, { x: -67.9, y: 238.05, r: -163.2 }, { x: -72.1, y: 236.7, r: -162.21 }, { x: -76.25, y: 235.25, r: -161.22 }, { x: -80.35, y: 233.75, r: -160.42 }, { x: -84.45, y: 232.25, r: -159.43 }, { x: -88.5, y: 230.55, r: -158.44 }, { x: -92.6, y: 228.85, r: -157.67 }, { x: -96.7, y: 227.1, r: -156.69 }, { x: -100.75, y: 225.25, r: -155.9 }, { x: -104.8, y: 223.35, r: -154.94 }, { x: -108.75, y: 221.4, r: -154.17 }, { x: -112.75, y: 219.35, r: -153.41 }, { x: -116.65, y: 217.3, r: -152.66 }, { x: -120.55, y: 215.2, r: -151.91 }, { x: -124.45, y: 213.05, r: -151.17 }, { x: -128.3, y: 210.85, r: -150.44 }, { x: -132.1, y: 208.6, r: -149.9 }, { x: -135.9, y: 206.3, r: -149.18 }, { x: -139.6, y: 203.95, r: -148.65 }, { x: -143.35, y: 201.6, r: -148.13 }, { x: -147.1, y: 199.2, r: -147.42 }, { x: -150.75, y: 196.75, r: -146.91 }, { x: -154.45, y: 194.3, r: -146.41 }, { x: -158, y: 191.8, r: -145.9 }, { x: -161.65, y: 189.3, r: -145.4 }, { x: -165.2, y: 186.75, r: -144.91 }, { x: -168.75, y: 184.15, r: -144.42 }, { x: -172.3, y: 181.55, r: -143.42 }, { x: -175.75, y: 178.85, r: -142.39 }, { x: -179.1, y: 176.15, r: -141.15 }, { x: -182.5, y: 173.35, r: -140.1 }, { x: -185.75, y: 170.45, r: -138.86 }, { x: -188.95, y: 167.55, r: -137.6 }, { x: -192.05, y: 164.5, r: -136.15 }, { x: -195.2, y: 161.45, r: -134.88 }, { x: -198.2, y: 158.2, r: -133.61 }, { x: -201.1, y: 155.05, r: -132.14 }, { x: -204, y: 151.7, r: -130.84 }, { x: -206.8, y: 148.3, r: -129.36 }, { x: -209.5, y: 144.9, r: -127.87 }, { x: -212.1, y: 141.35, r: -126.56 }, { x: -214.65, y: 137.7, r: -125.07 }, { x: -217.05, y: 134.1, r: -123.57 }, { x: -219.4, y: 130.4, r: -122.06 }, { x: -221.65, y: 126.55, r: -120.56 }, { x: -223.8, y: 122.75, r: -119.05 }, { x: -225.85, y: 118.8, r: -117.54 }, { x: -227.75, y: 114.9, r: -116.04 }, { x: -229.65, y: 110.8, r: -114.53 }, { x: -231.4, y: 106.8, r: -113.03 }, { x: -233, y: 102.65, r: -111.53 }, { x: -234.5, y: 98.55, r: -110.03 }, { x: -235.9, y: 94.35, r: -108.54 }, { x: -237.2, y: 90.1, r: -107.05 }, { x: -238.45, y: 85.9, r: -105.76 }, { x: -239.55, y: 81.55, r: -104.28 }, { x: -240.55, y: 77.3, r: -103 }, { x: -241.4, y: 72.95, r: -101.54 }, { x: -242.2, y: 68.6, r: -100.27 }, { x: -242.9, y: 64.25, r: -99.02 }, { x: -243.45, y: 59.85, r: -97.76 }, { x: -244, y: 55.5, r: -96.52 }, { x: -244.4, y: 51.1, r: -95.28 }, { x: -244.7, y: 46.7, r: -94.25 }, { x: -244.95, y: 42.3, r: -93.03 }, { x: -245.1, y: 37.95, r: -92 }, { x: -245.15, y: 33.5, r: -90.8 }, { x: -245.1, y: 29.1, r: -89.98 }, { x: -245.1, y: 24.75, r: -90.76 }, { x: -245.1, y: 20.45, r: -90.54 }, { x: -245.05, y: 16.2, r: -90.52 }, { x: -245.1, y: 11.9, r: -90.3 }, { x: -245.05, y: 7.6, r: -90.27 }, { x: -245.05, y: 3.3, r: -90.04 }, { x: -245, y: -0.95, r: -90 }, { x: -244.95, y: -5.3, r: -89.96 }, { x: -244.85, y: -9.55, r: -89.72 }, { x: -244.75, y: -13.9, r: -89.48 }, { x: -244.65, y: -18.2, r: -89.23 }, { x: -244.55, y: -22.55, r: -88.97 }, { x: -244.4, y: -26.9, r: -88.7 }, { x: -244.2, y: -31.2, r: -88.23 }, { x: -244, y: -35.6, r: -87.74 }, { x: -243.75, y: -39.9, r: -87.22 }, { x: -243.45, y: -44.25, r: -86.69 }, { x: -243.1, y: -48.5, r: -85.95 }, { x: -242.75, y: -52.8, r: -85.21 }, { x: -242.3, y: -57.1, r: -84.45 }, { x: -241.75, y: -61.35, r: -83.49 }, { x: -241.2, y: -65.65, r: -82.69 }, { x: -240.55, y: -69.95, r: -81.69 }, { x: -239.8, y: -74.15, r: -80.47 }, { x: -239, y: -78.4, r: -79.23 }, { x: -238.05, y: -82.65, r: -77.95 }, { x: -237.05, y: -86.9, r: -76.44 }, { x: -235.9, y: -91.1, r: -74.7 }, { x: -234.6, y: -95.2, r: -72.71 }, { x: -233.2, y: -99.35, r: -70.46 }, { x: -231.55, y: -103.5, r: -67.92 }, { x: -229.75, y: -107.6, r: -65.65 }, { x: -227.75, y: -111.6, r: -63.43 }, { x: -225.6, y: -115.55, r: -61.44 }, { x: -223.4, y: -119.4, r: -59.69 }, { x: -221.05, y: -123.15, r: -58.17 }, { x: -218.6, y: -126.9, r: -56.67 }, { x: -216.1, y: -130.5, r: -55.4 }, { x: -213.5, y: -134.1, r: -54.15 }, { x: -210.8, y: -137.6, r: -53.12 }, { x: -208.1, y: -141.05, r: -51.92 }, { x: -205.35, y: -144.5, r: -51.11 }, { x: -202.35, y: -147.9, r: -49.87 }, { x: -199.3, y: -151.4, r: -48.89 }, { x: -196.2, y: -154.8, r: -48.36 }, { x: -193.1, y: -158.15, r: -47.86 }, { x: -190, y: -161.45, r: -47.39 }, { x: -186.9, y: -164.75, r: -47.13 }, { x: -183.8, y: -167.95, r: -46.87 }, { x: -180.75, y: -171.15, r: -46.63 }, { x: -177.65, y: -174.35, r: -46.39 }, { x: -174.55, y: -177.55, r: -46.35 }, { x: -171.45, y: -180.7, r: -46.13 }, { x: -168.35, y: -183.75, r: -45.9 }, { x: -165.3, y: -186.85, r: -45.61 }, { x: -162.3, y: -189.8, r: -45.12 }, { x: -159.2, y: -192.8, r: -44.63 }, { x: -156.1, y: -195.75, r: -44.13 }, { x: -153, y: -198.7, r: -43.62 }, { x: -149.8, y: -201.6, r: -43.1 }, { x: -146.65, y: -204.45, r: -42.38 }, { x: -143.4, y: -207.3, r: -41.84 }, { x: -140.15, y: -210.1, r: -41.1 }, { x: -136.85, y: -212.85, r: -40.34 }, { x: -133.5, y: -215.6, r: -39.37 }, { x: -130.1, y: -218.25, r: -38.57 }, { x: -126.7, y: -220.85, r: -37.57 }, { x: -123.15, y: -223.4, r: -36.34 }, { x: -119.55, y: -225.9, r: -35.08 }, { x: -116, y: -228.3, r: -33.6 }, { x: -112.3, y: -230.65, r: -32.06 }, { x: -108.55, y: -232.85, r: -30.1 }, { x: -104.65, y: -234.95, r: -27.84 }, { x: -100.7, y: -236.85, r: -25.81 }, { x: -96.65, y: -238.7, r: -23.8 }, { x: -92.5, y: -240.35, r: -21.81 }, { x: -88.25, y: -241.9, r: -20.04 }, { x: -84.1, y: -243.3, r: -18.29 }, { x: -79.8, y: -244.6, r: -16.56 }, { x: -75.55, y: -245.8, r: -15.05 }, { x: -71.2, y: -246.85, r: -13.56 }, { x: -66.85, y: -247.7, r: -12.27 }, { x: -62.55, y: -248.55, r: -11 }, { x: -58.15, y: -249.3, r: -9.75 }, { x: -53.75, y: -250, r: -8.52 }, { x: -49.4, y: -250.55, r: -7.31 }, { x: -45, y: -251, r: -6.29 }, { x: -40.6, y: -251.4, r: -5.29 }, { x: -36.2, y: -251.65, r: -4.3 }, { x: -31.85, y: -251.95, r: -3.27 }, { x: -27.45, y: -252.1, r: -2.3 }, { x: -23.05, y: -252.2, r: -1.52 }, { x: -18.65, y: -252.25, r: -0.55 }, { x: -14.3, y: -252.2, r: 0.04 }, { x: -9.9, y: -252.1, r: 1.01 }, { x: -5.5, y: -251.9, r: 1.79 }, { x: -1.05, y: -251.9, r: 2.79 }];
    src.Path = Path;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Отображение планеты
     * @author zu
     */
    class Planet extends src.Gravity {
        /**
         * @param    id идентификатор мувиклипа планеты
         */
        constructor(setting, space) {
            super(setting);
            this.space = space;
        }
        createDisplay() {
            this.mc = this.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, this.settings.movie_id));
            this.mc.scale.set(this.planet_setting.scale);
            this.mc.anchor.set(0.5, 0.5);
            let id_path = this.planet_setting.movie_id.substring(0, this.planet_setting.movie_id.length - 4);
            this.pathID = id_path == 'Earth4' ? 'EarthTriangleGuide' : 'EarthRoundGuide';
            // let g:Phaser.Graphics = this.add(this.game.make.graphics(0, 0));
            // g.beginFill(0x666666, 0.5).drawCircle(0, 0, this.planet_setting.radius * 2).endFill();
        }
        updateDelta(deltaTime) {
            this.angle += this.planet_setting.speed_rotation * deltaTime * Planet.speed_rotate;
        }
        land(hero, landPoint) {
            let effect_rotation = Math.atan2(landPoint.y - this.y, landPoint.x - this.x) * +Math.PI / 2;
            this.space.effects.addRastEffect('LandingCloud1', landPoint.x, landPoint.y, effect_rotation);
            src.Item.matrix.tx = hero.x - this.x;
            src.Item.matrix.ty = hero.y - this.y;
            src.Item.matrix.rotate(-this.rotation);
            let angle = Math.atan2(src.Item.matrix.ty, src.Item.matrix.tx) + Math.PI / 2;
            let p = src.Path.getPoint(this.pathID, Phaser.Math.radToDeg(angle), this.planet_setting.radius);
            hero.x = p.x;
            hero.y = p.y;
            hero.angle = src.Path.getAngle(this.pathID, Phaser.Math.radToDeg(angle));
            this.addChild(hero);
            src.SoundController.instance.playSound('Landing');
        }
        set settings(value) {
            super.settings = value;
            this.planet_setting = value;
            this._1_scale = 1 / this.planet_setting.scale;
            this.angle = 360 * Math.random();
        }
        get settings() {
            return super.settings;
        }
        launch(hero) {
            src.Item.matrix.tx = hero.x;
            src.Item.matrix.ty = hero.y;
            src.Item.matrix.rotate(this.rotation);
            var radius_1 = 1.0 / Math.sqrt(src.Item.matrix.tx * src.Item.matrix.tx + src.Item.matrix.ty * src.Item.matrix.ty);
            hero.speedX = src.Constant.JAMP_SPEED * src.Item.matrix.tx * radius_1;
            hero.speedY = src.Constant.JAMP_SPEED * src.Item.matrix.ty * radius_1;
            hero.x = this.x + src.Item.matrix.tx;
            hero.y = this.y + src.Item.matrix.ty;
            hero.rotation = (Math.atan2(src.Item.matrix.ty, src.Item.matrix.tx) + Math.PI / 2);
            this.parent.addChild(hero);
            hero.fly(true);
            this.space.effects.addRastEffect('JumpCloud1', hero.x, hero.y, hero.rotation);
            src.SoundController.instance.playSound('Jamp');
            return true;
        }
        hitTestPoint(x, y, shapeFlag = false) {
            return Phaser.Math.distance(this.x, this.y, x, y) <= this.planet_setting.radius;
        }
        render() {
        }
    }
    Planet.speed_rotate = 1.0;
    src.Planet = Planet;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Настройка, из которой можно создать небесное тело, чтобы хранить историю,
     * и не тратить память на визуальные объекты
     * @author zu
     */
    class Settings {
        constructor(type, movie_id, x, y) {
            this._type = type;
            this._movie_id = movie_id;
            this._x = x;
            this._y = y;
        }
        /// какой класс настройки
        get type() { return this._type; }
        /// положение на карте, x
        get x() { return this._x; }
        /// положение на карте, y
        get y() { return this._y; }
        /// идентификатор мувиклипа
        get movie_id() { return this._movie_id; }
        /// радиус
        get radius() { return NaN; }
        ;
    }
    Settings.PLANET = 'planet';
    Settings.GUN = 'gun';
    Settings.BOTTLE = 'bottle';
    src.Settings = Settings;
})(src || (src = {}));
///<reference path="Settings.ts"/>
var src;
(function (src) {
    /**
     * Настройка бутылки
     * @author zu
     */
    class BottleSettings extends src.Settings {
        constructor(movie_id, x, y, rotation) {
            super(src.Settings.BOTTLE, movie_id, x, y);
            this._rotation = rotation;
            this._boss = movie_id == src.Constant.BOSS_BOTTLE_ID;
        }
        get radius() { return this._boss ? src.Constant.BOTTLE_BOSS_RADIUS : src.Constant.BOTTLE_RADIUS; }
        get hit() {
            return this._hit;
        }
        shoot() { this._hit = true; }
        ;
        get rotation() { return this._rotation; }
        get boss() {
            return this._boss;
        }
    }
    src.BottleSettings = BottleSettings;
})(src || (src = {}));
var src;
(function (src) {
    var Rectangle = Phaser.Rectangle;
    var Point = Phaser.Point;
    class ChainGenerator {
        static calcNextLevel() {
            this.nextUpLevel = 2;
        }
        static getFirstGravity() {
            this.variant = this.START_VARIANT;
            this.level = 1;
            this.calcNextLevel();
            let result = new src.ChainSetting();
            result.gravity = new src.PlanetSettings(this.planetColor(0), 0, 0, this.getRotatePlanet(), this.PLANET_RADIUS[0].value);
            result.gravity.index = 0;
            this.calcBounds(result);
            if (this.graphics) {
                this.graphics.clear();
                this.draw_chain_bottle(result);
            }
            return result;
        }
        static helpChain(items) {
            this.level = 0;
            items.push(new src.ChainSetting());
            items[0].gravity = new src.PlanetSettings(this.planetColor(0), 0, 0, this.rand(60, 70), 100);
            this.calcBounds(items[0]);
            if (this.graphics)
                this.draw_planet(items[0].gravity);
            items.push(this.generateHelpPlanetChain(items[0].gravity));
            if (this.graphics)
                this.draw_chain_bottle(items[1]);
            items.push(this.generateHelpPlanetChain(items[1].gravity));
            if (this.graphics)
                this.draw_chain_bottle(items[2]);
            items.push(this.generateHelpPlanetChain(items[2].gravity));
            if (this.graphics)
                this.draw_chain_bottle(items[3]);
            items.push(this.generateHelpPlanetChain(items[3].gravity));
            if (this.graphics)
                this.draw_chain_bottle(items[4]);
            for (let i = 0; i < items.length; i++) {
                items[i].gravity.index = i;
            }
            this.variant = this.START_VARIANT;
            this.level = 1;
            this.calcNextLevel();
        }
        static generateNChain(count, items) {
            let last = items.length - 1;
            for (let i = 0; i < count; i++) {
                if (this.nextUpLevel > 0) {
                    if (--this.nextUpLevel <= 0) {
                        if (this.level < this.levels.length) {
                            this.variant = this.levels[this.level++];
                        }
                        else {
                            if (--this.endNextUpLevel <= 0) {
                                this.endHardChain = !this.endHardChain;
                                this.endNextUpLevel = this.endHardChain ? 3 : 2;
                            }
                            if (this.endHardChain) {
                                this.variant = this.endHard[Math.floor(this.endHard.length * Math.random())];
                            }
                            else {
                                this.variant = this.endLight[Math.floor(this.endLight.length * Math.random())];
                            }
                        }
                        if (this.graphics) {
                            let cur_x = items[last].gravity.x;
                            let cur_y = items[last].gravity.y;
                            src.drawNumber(this.graphics, this.variant, new Point(cur_x + 30, cur_y - 300));
                        }
                        this.calcNextLevel();
                    }
                }
                let chain = this.generateNextChain(items[last]);
                chain.generateId = String(this.variant);
                items.push(chain);
                chain.gravity.index = ++last;
                if (this.graphics) {
                    this.draw_chain_bottle(chain);
                }
            }
        }
        static generateNextChain(chain) {
            if (chain.gravity instanceof src.GunSettings) {
                return this.generateGunChain(chain.gravity, chain);
            }
            else {
                return this.generatePlanetChain(chain.gravity);
            }
        }
        static generatePlanetChain(setting) {
            let result = new src.ChainSetting();
            let r1 = this.jampRotateFromPlanet(setting) * src.Constant.PI_180;
            let cos_r = Math.cos(r1);
            let sin_r = Math.sin(r1);
            let x1 = setting.radius * cos_r;
            let y1 = setting.radius * sin_r;
            let vx = src.Constant.JAMP_SPEED * cos_r;
            let vy = src.Constant.JAMP_SPEED * sin_r;
            let x = setting.x + x1;
            let y = setting.y + y1;
            // сосчитаем траекторию
            let path_len = this.calc_path(x, y, vx, vy, (index) => this.planetStopCalcPath(index));
            // найдем точку приземления, с учетом смещения
            let land_point = this.get_planet_point(this.FLY_DISTANCE_FROM_PLANET[this.variant].value, path_len);
            let min_path_y = this.get_min_path_y(land_point);
            if (this.graphics) {
                this.draw_path(land_point);
            }
            // угол приземления
            let r2 = Math.atan2(this.cache_y[land_point] - this.cache_y[land_point - 1], this.cache_x[land_point] - this.cache_x[land_point - 1]) * src.Constant._180_PI;
            // угол отклонения ценрта планеты
            let r_center = (r2 + this.LAND_ROTATION[this.variant].value) * src.Constant.PI_180;
            let R2, x2, y2;
            if (Math.random() < this.GUN_AFTER_PLANET_PROBABLY[this.variant]) {
                R2 = src.GunSettings.RADIUS;
                x2 = this.cache_x[land_point] + R2 * Math.cos(r_center);
                y2 = this.cache_y[land_point] + R2 * Math.sin(r_center);
                result.gravity = new src.GunSettings(x2, y2, this.rotateAngleGun(setting));
            }
            else {
                // радиус второй планеты
                R2 = 0;
                cos_r = Math.cos(r_center);
                sin_r = Math.sin(r_center);
                let save_k = 1.0; // коэффициент, для предотвращения зацикливания
                while (R2 == 0) {
                    R2 = this.PLANET_RADIUS[this.variant].value * save_k;
                    x2 = this.cache_x[land_point] + R2 * cos_r;
                    y2 = this.cache_y[land_point] + R2 * sin_r;
                    x = x2 - setting.x;
                    x *= x;
                    y = y2 - setting.y;
                    y *= y;
                    if (Math.sqrt(x + y) - setting.radius - R2 < src.Constant.MIN_DISTANCE_PLANET_TO_PLANET) {
                        R2 = 0;
                        save_k -= 0.02;
                    }
                }
                result.gravity = new src.PlanetSettings(this.planetColor(x2), x2, y2, this.getRotatePlanet(), R2);
            }
            // устанавливаем бутылки
            this.set_bottle(result, this.randNumBottle(setting), Math.random() < this.PLANET_BOSS_PROBABLY[this.variant], land_point);
            // вид камеры
            let min_y = Math.min(setting.y - setting.radius, result.gravity.y, min_path_y) - this.ZOOM_SPACE_TOP;
            let max_y = Math.max(setting.y + setting.radius, result.gravity.y) + this.ZOOM_SPACE_BOTTOM;
            let height_rect = max_y - min_y;
            let min_x = setting.x - setting.radius - this.ZOOM_SPACE_LEFT;
            let max_x = result.gravity.x + result.gravity.radius + this.ZOOM_SPACE_RIGHT;
            let width_rect = max_x - min_x;
            let scale = Math.min(1.0, src.Constant.SCREEN_WIDTH / width_rect, src.Constant.SCREEN_HEIGHT / height_rect);
            width_rect = src.Constant.SCREEN_WIDTH / scale;
            height_rect = src.Constant.SCREEN_HEIGHT / scale;
            result.camera = new Rectangle(min_x, (min_y + max_y - height_rect) * 0.5, width_rect, height_rect);
            // боундс
            this.calcBounds(result);
            return result;
        }
        static generateHelpPlanetChain(setting) {
            let result = new src.ChainSetting();
            let r1 = this.rand(-50, -40) * src.Constant.PI_180;
            let cos_r = Math.cos(r1);
            let sin_r = Math.sin(r1);
            let x1 = setting.radius * cos_r;
            let y1 = setting.radius * sin_r;
            let vx = src.Constant.JAMP_SPEED * cos_r;
            let vy = src.Constant.JAMP_SPEED * sin_r;
            let x = setting.x + x1;
            let y = setting.y + y1;
            // сосчитаем траекторию
            let path_len = this.calc_path(x, y, vx, vy, (index) => this.planetStopCalcPath(index));
            // найдем точку приземления, с учетом смещения
            let land_point = this.get_planet_point(this.rand(650, 670), path_len);
            let min_path_y = this.get_min_path_y(land_point);
            if (this.graphics) {
                this.draw_path(land_point);
            }
            // угол приземления
            let r2 = Math.atan2(this.cache_y[land_point] - this.cache_y[land_point - 1], this.cache_x[land_point] - this.cache_x[land_point - 1]) * src.Constant._180_PI;
            // угол отклонения ценрта планеты
            let r_center = r2 * src.Constant.PI_180;
            let R2, x2, y2;
            // радиус второй планеты
            R2 = setting.radius + this.rand(-15, 15);
            cos_r = Math.cos(r_center);
            sin_r = Math.sin(r_center);
            x2 = this.cache_x[land_point] + R2 * cos_r;
            y2 = this.cache_y[land_point] + R2 * sin_r;
            result.gravity = new src.PlanetSettings(this.planetColor(x2), x2, y2, this.rand(60, 70), R2);
            // устанавливаем бутылки
            this.set_bottle(result, this.rand(5, 6), false, land_point);
            // вид камеры
            let min_y = Math.min(setting.y - setting.radius, result.gravity.y, min_path_y) - this.ZOOM_SPACE_TOP - 300;
            let max_y = Math.max(setting.y + setting.radius, result.gravity.y) + this.ZOOM_SPACE_BOTTOM;
            let height_rect = max_y - min_y;
            let min_x = setting.x - setting.radius - this.ZOOM_SPACE_LEFT;
            let max_x = result.gravity.x + result.gravity.radius + this.ZOOM_SPACE_RIGHT;
            let width_rect = max_x - min_x;
            let scale = Math.min(1.0, src.Constant.SCREEN_WIDTH / width_rect, src.Constant.SCREEN_HEIGHT / height_rect);
            width_rect = src.Constant.SCREEN_WIDTH / scale;
            height_rect = src.Constant.SCREEN_HEIGHT / scale;
            result.camera = new Rectangle(min_x, (min_y + max_y - height_rect) * 0.5, width_rect, height_rect);
            // боундс
            this.calcBounds(result);
            return result;
        }
        static generateGunChain(setting, chain) {
            let result = new src.ChainSetting();
            let r = setting.rotation * src.Constant.PI_180;
            let cos_r = Math.cos(r);
            let sin_r = Math.sin(r);
            let vx = src.Constant.GUN_SHOOT * cos_r;
            let vy = src.Constant.GUN_SHOOT * sin_r;
            // точка выстрела
            let x = setting.x + src.Constant.GUNPOINT_X * cos_r - src.Constant.GUNPOINT_Y * sin_r;
            let y = setting.y + src.Constant.GUNPOINT_X * sin_r + src.Constant.GUNPOINT_Y * cos_r;
            let len_path = this.calc_path(x, y, vx, vy, (index) => this.gunStopCalcPath(index));
            // дистанция пролета
            let distance = 800 + Math.random() * 600;
            let land_point = this.get_shoot_point(distance, len_path);
            if (this.graphics) {
                this.draw_path(land_point);
            }
            if (Math.random() < this.GUN_AFTER_GUN_PROBABLY[this.variant]) {
                result.gravity = new src.GunSettings(this.cache_x[land_point], this.cache_y[land_point], this.rotateAngleGun(setting));
            }
            else {
                result.gravity = new src.PlanetSettings(this.planetColor(this.cache_x[land_point]), this.cache_x[land_point], this.cache_y[land_point], this.getRotatePlanet(), this.PLANET_RADIUS[this.variant].value);
            }
            let d = 0;
            while (d < result.gravity.radius) {
                d += this.cache_len[land_point--];
            }
            this.set_bottle(result, this.randNumBottle(setting), Math.random() < this.GUN_BOSS_PROBABLY[this.variant], land_point);
            // вид камеры
            let camera_x = setting.x - setting.radius - (setting.rotation == 90 ? this.ZOOM_SPACE_LEFT + this.ZOOM_SPACE_LEFT : this.ZOOM_SPACE_LEFT);
            let camera_y = setting.y - chain.camera.height * 0.5;
            let delta_y = (chain.camera.height - this.ZOOM_SPACE_TOP - this.ZOOM_SPACE_BOTTOM - setting.radius - setting.radius) * 0.5;
            if (setting.rotation > 0) {
                camera_y += delta_y;
            }
            else if (setting.rotation < 0) {
                camera_y -= delta_y;
            }
            result.camera = new Rectangle(camera_x, camera_y, chain.camera.width, chain.camera.height);
            // боундс
            this.calcBounds(result);
            return result;
        }
        /// считает траекторию полета шерифа и возвращает количество просчитанных точек
        static calc_path(x0, y0, speedX0, speedY0, stopCalcPath) {
            this.cache_x[0] = x0;
            this.cache_y[0] = y0;
            this.cache_len[0] = 0.0;
            this.cache_dist[0] = 0.0;
            let i = 1;
            const dt = 0.01;
            let dx = speedX0 * dt;
            let dx2 = dx * dx;
            let dy;
            let dGravity = src.Constant.GRAVITY * dt;
            while (stopCalcPath(i - 1)) {
                dy = speedY0 * dt;
                speedY0 += dGravity;
                x0 = this.cache_x[i] = x0 + dx;
                y0 = this.cache_y[i] = y0 + dy;
                this.cache_len[i] = Math.sqrt(dx2 + dy * dy);
                this.cache_dist[i] = this.cache_dist[i - 1] + this.cache_len[i];
                ++i;
            }
            return i;
        }
        /// функция, которая определяет, что дальше просчитывать точки не надо...
        static planetStopCalcPath(index) {
            return this.cache_y[index] - this.cache_y[0] < 500;
        }
        /// функция, которая определяет, что дальше просчитывать точки не надо...
        static gunStopCalcPath(index) {
            return this.cache_dist[index] < 2000;
        }
        static calcBounds(chain) {
            let grav = chain.gravity;
            let rect = new Rectangle(grav.x - grav.radius, grav.y - grav.radius, grav.radius + grav.radius, grav.radius + grav.radius);
            for (let item of chain.bottles) {
                let x = item.x - item.radius;
                if (x < rect.x) {
                    rect.width += rect.x - x;
                    rect.x = x;
                }
                let min_y = item.y - item.radius;
                let max_y = item.y + item.radius;
                if (min_y < rect.y) {
                    rect.height += rect.y - min_y;
                    rect.y = min_y;
                }
                else if (max_y > rect.bottom) {
                    rect.height += max_y - rect.y;
                }
            }
            rect.inflate(32, 32);
            chain.bounds = rect;
        }
        /// выбирает точку приземления на планету
        static get_planet_point(distance, length) {
            let max_delta_y = src.PlanetSettings.maxPlanetRadius + src.PlanetSettings.maxPlanetRadius;
            for (let i = 0; i < length; i++) {
                if (this.cache_dist[i] > distance || this.cache_y[i] - this.cache_y[0] > max_delta_y) {
                    return i;
                }
            }
            return 0;
        }
        static get_shoot_point(distance, length) {
            for (let i = 0; i < length; i++) {
                if (this.cache_dist[i] > distance) {
                    return i;
                }
            }
            return 0;
        }
        /// расставляет бутылки по траектории
        static set_bottle(setting, num_bottle, has_boss, end_point) {
            let bottle;
            let d;
            let start_point = 0;
            // найдем участок, в котором можно расположить бутылки
            d = 0;
            while (d < src.Constant.MIN_DISTANCE_PLANET_TO_BOTTLE) {
                d = this.cache_dist[++start_point];
            }
            d = 0;
            while (d < src.Constant.MIN_DISTANCE_PLANET_TO_BOTTLE * 2.5) {
                d += this.cache_len[end_point--];
            }
            let second_boss = false;
            if (has_boss) {
                // босс будет всегда ближе к следующей планете
                let ep = end_point;
                let g = src.Constant.BOTTLE_BOSS_RADIUS * (2 + Math.random());
                while (g > 0 && start_point < ep) {
                    g -= this.cache_len[ep--];
                }
                if (start_point < ep && this.cache_dist[ep] > src.Constant.BOTTLE_BOSS_RADIUS + src.Constant.MIN_DISTANCE_PLANET_TO_BOTTLE) {
                    bottle = new src.BottleSettings(src.Constant.BOSS_BOTTLE_ID, this.cache_x[ep], this.cache_y[ep], Math.atan2(this.cache_y[ep] - this.cache_y[ep - 1], this.cache_x[ep] - this.cache_x[ep - 1]) * src.Constant._180_PI);
                    setting.bottles.push(bottle);
                    bottle.chain = setting;
                    g = src.Constant.BOTTLE_BOSS_RADIUS * 2 + src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE;
                    while (g > 0 && ep >= 0) {
                        g -= this.cache_len[ep--];
                    }
                    end_point = ep + 1;
                    // второй босс
                    second_boss = Math.random() < this.SECOND_BOSS_PROBABLY[this.variant] &&
                        this.cache_dist[end_point] - this.cache_dist[start_point] > 2 * src.Constant.BOTTLE_BOSS_RADIUS;
                }
            }
            if (second_boss) {
                let ep = end_point;
                let g = src.Constant.BOTTLE_BOSS_RADIUS;
                while (g > 0) {
                    g -= this.cache_len[ep--];
                }
                bottle = new src.BottleSettings(src.Constant.BOSS_BOTTLE_ID, this.cache_x[ep], this.cache_y[ep], Math.atan2(this.cache_y[ep] - this.cache_y[ep - 1], this.cache_x[ep] - this.cache_x[ep - 1]) * src.Constant._180_PI);
                setting.bottles.push(bottle);
                bottle.chain = setting;
                g = src.Constant.BOTTLE_BOSS_RADIUS * 2 + src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE;
                while (g > 0 && ep >= 0) {
                    g -= this.cache_len[ep--];
                }
                end_point = ep + 1;
            }
            // определим, влезут ли все бутылки
            let distance = this.cache_dist[end_point] - this.cache_dist[start_point];
            while (num_bottle > 0 && distance / (num_bottle + 1) < src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE) {
                --num_bottle;
            }
            // три варианта расположения бутылок:
            let random = Math.random();
            if (random < 0.4 || this.level == 0) {
                // равновмероно расположения по всей длине дуги
                d = Math.min(2 * src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE, distance / (num_bottle + 1));
                let left_d = (distance - d * num_bottle) * 0.5;
                while (left_d > d) {
                    ++start_point;
                    left_d -= this.cache_len[start_point];
                }
                ;
            }
            else if (random < 0.7 && this.level < this.levels.length) {
                // бутылки находятся слева, ближе к шерифу
                d = src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE;
            }
            else {
                // бутылки находятся справа, ближе к следующей планете
                d = distance - (num_bottle + 1) * src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE;
                let l = 0;
                while (l < d) {
                    ++start_point;
                    l += this.cache_len[start_point];
                }
                ;
                d = src.Constant.MIN_DISTANCE_BOTTLE_TO_BOTTLE;
            }
            let bottleMovieId = this.bottleColor(setting.gravity.x);
            while (num_bottle-- && start_point < end_point) {
                distance = 0;
                while (distance < d) {
                    distance += this.cache_len[++start_point];
                }
                bottle = new src.BottleSettings(bottleMovieId, this.cache_x[start_point], this.cache_y[start_point], Math.atan2(this.cache_y[start_point] - this.cache_y[start_point - 1], this.cache_x[start_point] - this.cache_x[start_point - 1])
                    * src.Constant._180_PI);
                setting.bottles.push(bottle);
                bottle.chain = setting;
            }
        }
        static get_min_path_y(end_point) {
            let r = this.cache_y[0];
            for (let i = 0; i < end_point; i++) {
                if (r > this.cache_y[i])
                    r = this.cache_y[i];
            }
            return r;
        }
        static planetColor(x) {
            // в зависимости от расстояния, выбираем либо первый или второй массив цветов
            let array /*String*/ = x < 50000 ? this.PLANET_COLOR_BEGIN[this.getFon(x)] : this.PLANET_COLOR_END[this.getFon(x)];
            return array[Math.floor(array.length * Math.random())];
        }
        static bottleColor(x) {
            let array /*String*/ = this.BOTTLE_COLOR[this.getFon(x)];
            return array[Math.floor(array.length * Math.random())];
        }
        static rand(min, max) {
            return min + (max - min) * Math.random();
        }
        static getRotatePlanet() {
            return this.REVERSE_ROTATION_PROBABLY[this.variant] > Math.random() ?
                -this.PLANET_ROTATION[this.variant].value :
                this.PLANET_ROTATION[this.variant].value;
        }
        static rotateAngleGun(last) {
            if (last.y > 600)
                return -45;
            if (last.y < -600)
                return 45;
            let r = Math.random();
            if (r < 0.25)
                return -45;
            if (r < 0.50)
                return 0;
            if (r < 0.75)
                return 45;
            return 90;
        }
        /// угол прыжка с планеты
        static jampRotateFromPlanet(last) {
            return this.JAMP_ROTATE_FROM_PLANET[this.variant].value;
        }
        static randNumBottle(setting) {
            if (setting instanceof src.PlanetSettings) {
                return this.NUM_BOTTLE_FROM_PLANET[this.variant].value;
            }
            else {
                return this.rand(5, 11);
            }
        }
        static draw_planet(pl) {
            this.graphics.lineStyle(1, 0xff2500);
            this.graphics.drawCircle(pl.x, pl.y, 2);
            this.graphics.drawCircle(pl.x, pl.y, pl.radius * 2);
            this.graphics.endFill();
        }
        static draw_gun(gun) {
            this.graphics.lineStyle(1, 0x0000FF);
            this.graphics.drawCircle(gun.x, gun.y, src.GunSettings.RADIUS);
            this.graphics.moveTo(gun.x, gun.y);
            this.graphics.lineTo(gun.x + src.GunSettings.RADIUS * Math.cos(gun.rotation * src.Constant.PI_180), gun.y + src.GunSettings.RADIUS * Math.sin(gun.rotation * src.Constant.PI_180));
        }
        static draw_path(len) {
            this.graphics.moveTo(this.cache_x[0], this.cache_y[0]);
            this.graphics.lineStyle(1, 0xFF0000);
            for (let i = 1; i < len; i++) {
                this.graphics.lineTo(this.cache_x[i], this.cache_y[i]);
            }
        }
        static draw_bootle(bottle) {
            this.graphics.lineStyle(bottle.boss ? 2 : 1, 0x000000);
            this.graphics.drawCircle(bottle.x, bottle.y, bottle.radius);
            this.graphics.moveTo(bottle.x, bottle.y);
            this.graphics.lineTo(bottle.x + bottle.radius * Math.cos((bottle.rotation - 90) * src.Constant.PI_180), bottle.y + bottle.radius * Math.sin((bottle.rotation - 90) * src.Constant.PI_180));
        }
        static draw_chain_bottle(chain) {
            if (chain.gravity instanceof src.GunSettings)
                this.draw_gun(chain.gravity);
            else
                this.draw_planet(chain.gravity);
            for (let item of chain.bottles) {
                this.draw_bootle(item);
            }
            if (chain.camera) {
                this.graphics.lineStyle(1, 0x0000FF, 0.5);
                this.graphics.drawRect(chain.camera.x, chain.camera.y, chain.camera.width, chain.camera.height);
            }
            if (chain.bounds) {
                this.graphics.lineStyle(1, 0xFF00FF, 0.5);
                this.graphics.drawRect(chain.bounds.x, chain.bounds.y, chain.bounds.width, chain.bounds.height);
            }
            //
        }
        static init() {
            let xml = src.App.instance.cache.getXML('chain');
            this.levels = [];
            this.endLight = [];
            this.endHard = [];
            for (let item of xml.getElementsByTagName('data')[0].getElementsByTagName('levels')[0].getElementsByTagName('item')) {
                let array = item.getAttribute('level').split(',');
                for (let levelIndex of array) {
                    this.levels.push(parseInt(levelIndex));
                }
            }
            for (let levelIndex of xml.getElementsByTagName('data')[0].getElementsByTagName('levels')[0].getElementsByTagName('end')[0].getAttribute('ligth').split(',')) {
                this.endLight.push(parseInt(levelIndex));
            }
            for (let levelIndex of xml.getElementsByTagName('data')[0].getElementsByTagName('levels')[0].getElementsByTagName('end')[0].getAttribute('hard').split(',')) {
                this.endHard.push(parseInt(levelIndex));
            }
            for (let variant of xml.getElementsByTagName('data')[0].getElementsByTagName('variant')) {
                this.GUN_AFTER_PLANET_PROBABLY.push(parseFloat(variant.getAttribute('gun_after_planet')));
                this.GUN_AFTER_GUN_PROBABLY.push(parseFloat(variant.getAttribute('gun_after_gun')));
                this.PLANET_BOSS_PROBABLY.push(parseFloat(variant.getAttribute('planet_boss')));
                this.GUN_BOSS_PROBABLY.push(parseFloat(variant.getAttribute('gun_boss')));
                this.SECOND_BOSS_PROBABLY.push(parseFloat(variant.getAttribute('second_boss')));
                this.NUM_BOTTLE_FROM_PLANET.push(this.xmlToRandValue(variant.getElementsByTagName('num_bottle_from_planet')[0]));
                this.JAMP_ROTATE_FROM_PLANET.push(this.xmlToRandValue(variant.getElementsByTagName('jamp_rotate_from_planet')[0]));
                this.FLY_DISTANCE_FROM_PLANET.push(this.xmlToRandValue(variant.getElementsByTagName('fly_distance_from_planet')[0]));
                this.PLANET_RADIUS.push(this.xmlToRandValue(variant.getElementsByTagName('planet_radius')[0]));
                this.LAND_ROTATION.push(this.xmlToRandValue(variant.getElementsByTagName('land_rotation')[0]));
                this.PLANET_ROTATION.push(this.xmlToRandValue(variant.getElementsByTagName('planet_rotation')[0]));
                this.REVERSE_ROTATION_PROBABLY.push(parseFloat(variant.getAttribute('reverse_rotation')));
            }
        }
        static xmlToRandValue(xml) {
            let min_maxex = xml.getElementsByTagName('min_max');
            let sequences = xml.getElementsByTagName('sequence');
            let rand_sequences = xml.getElementsByTagName('rand_sequence');
            if (rand_sequences.length > 0) {
                let randSequence = rand_sequences[0];
                let minMaxes = [];
                for (let minMax of randSequence.getElementsByTagName('min_max')) {
                    minMaxes.push(new src.MinMax(parseFloat(minMax.getAttribute('min')), parseFloat(minMax.getAttribute('max'))));
                }
                return new src.RandSequence(minMaxes);
            }
            else if (sequences.length > 0) {
                let sequence = sequences[0];
                let minMaxes = [];
                for (let minMax of sequence.getElementsByTagName('min_max')) {
                    minMaxes.push(new src.MinMax(parseFloat(minMax.getAttribute('min')), parseFloat(minMax.getAttribute('max'))));
                }
                return new src.Sequence(minMaxes);
            }
            else if (min_maxex.length > 0) {
                return new src.MinMax(parseFloat(min_maxex[0].getAttribute('min')), parseFloat(min_maxex[0].getAttribute('max')));
            }
        }
    }
    /// выбирает настройки для генерации расположения объектов
    ChainGenerator.variant = 0;
    /// определяет с каких настроек будут генерироваться уровни
    /// нужно для тестирования, в релизе нужно оставить 0
    ChainGenerator.START_VARIANT = 0;
    ChainGenerator.ZOOM_SPACE_LEFT = 50;
    ChainGenerator.ZOOM_SPACE_RIGHT = 35;
    ChainGenerator.ZOOM_SPACE_TOP = 50;
    ChainGenerator.ZOOM_SPACE_BOTTOM = 35;
    ChainGenerator.cache_num_points = 350;
    ChainGenerator.cache_x = [];
    ChainGenerator.cache_y = [];
    ChainGenerator.cache_len = [];
    ChainGenerator.cache_dist = [];
    /// настройки зависящие от сложности
    ChainGenerator.GUN_AFTER_PLANET_PROBABLY = [];
    ChainGenerator.GUN_AFTER_GUN_PROBABLY = [];
    ChainGenerator.PLANET_BOSS_PROBABLY = [];
    ChainGenerator.GUN_BOSS_PROBABLY = [];
    ChainGenerator.SECOND_BOSS_PROBABLY = [];
    /// цвета планет, взависимости от теущего фона
    ChainGenerator.PLANET_COLOR_BEGIN /*Array*/ = [
        ['Earth1', 'Earth3'],
        ['Earth1', 'Earth2'],
        ['Earth2', 'Earth3'],
        ['Earth1', 'Earth2'] // переход с красного на зеленый
    ];
    /// для конечных уровней добавляется 4-ая планета
    ChainGenerator.PLANET_COLOR_END /*Array*/ = [
        ['Earth1', 'Earth3', 'Earth1', 'Earth3', 'Earth1', 'Earth3', 'Earth4'],
        ['Earth1', 'Earth2', 'Earth3', 'Earth1', 'Earth2', 'Earth3', 'Earth4'],
        ['Earth2', 'Earth3', 'Earth2', 'Earth3', 'Earth2', 'Earth3', 'Earth4'],
        ['Earth1', 'Earth2', 'Earth3', 'Earth1', 'Earth2', 'Earth3', 'Earth4'] // переход с красного на зеленый
    ];
    /// цвет бутылок в зависимости от фона
    ChainGenerator.BOTTLE_COLOR /*Array*/ = [
        ['Bottle3'],
        ['Bottle1', 'Bottle3'],
        ['Bottle2'],
        ['Bottle2', 'Bottle3']
    ];
    /// количество бутылок в цепочке после прыжка с планеты
    ChainGenerator.NUM_BOTTLE_FROM_PLANET = []; // отсюда идут рандомные уровни
    /// предполагаемый угол прыжка с планеты
    ChainGenerator.JAMP_ROTATE_FROM_PLANET = [];
    /// дистанция, которую должен пролететь шериф
    ChainGenerator.FLY_DISTANCE_FROM_PLANET = [];
    /// радиус планеты
    ChainGenerator.PLANET_RADIUS = [];
    /// угол оклонения центра планеты от нормального угла падения шерифа
    ChainGenerator.LAND_ROTATION = [];
    /// скорость вращения планет
    ChainGenerator.PLANET_ROTATION = [];
    /// вероятность появления планеты с обратным вращением
    ChainGenerator.REVERSE_ROTATION_PROBABLY = [];
    src.ChainGenerator = ChainGenerator;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Одна планета (или пистолет) + бутылки
     * @author zu
     */
    class ChainSetting {
        constructor() {
            this.bottles = [];
        }
    }
    src.ChainSetting = ChainSetting;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Настройка для планеты и пистолета
     * @author zu
     */
    class GravitySetting extends src.Settings {
        constructor(type, movie_id, x, y) {
            super(type, movie_id, x, y);
        }
    }
    src.GravitySetting = GravitySetting;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Настройка пистолета
     * @author zu
     */
    class GunSettings extends src.GravitySetting {
        constructor(x, y, rotation) {
            super(src.Settings.GUN, 'Gun', x, y);
            this._rotation = rotation;
        }
        /// направление выстрела (-45 вправо-вверх, 0 - вправо, 45 - вправо вниз, 90 - вниз)
        get rotation() { return this._rotation; }
        get radius() { return GunSettings.RADIUS; }
        ;
    }
    GunSettings.RADIUS = 65;
    src.GunSettings = GunSettings;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Выбирает значение между минимумом и максимумом
     * @author zu
     */
    class MinMax {
        constructor(min, max) {
            this.min = Math.min(min, max);
            this.max = Math.max(min, max);
        }
        get value() {
            return this.min + (this.max - this.min) * Math.random();
        }
    }
    src.MinMax = MinMax;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * @author zu
     */
    class PlanetSettings extends src.GravitySetting {
        constructor(movie_id, x, y, speed_rotation, radius) {
            super(src.Settings.PLANET, movie_id, x, y);
            /// примерный радиус планеты
            this._radius = 100;
            /// сжатие текстуры
            this._scale = 1.0;
            /// сжатие места приземления шерифа
            this._hero_place_scale = 1.0;
            /// какую подпланету выбрать
            this._suffix = '';
            this._speed_rotation = speed_rotation;
            if (isNaN(radius)) {
                radius = PlanetSettings.minPlanetRadius;
            }
            else if (radius < PlanetSettings.minPlanetRadius) {
                radius = PlanetSettings.minPlanetRadius;
            }
            else if (radius > PlanetSettings.maxPlanetRadius) {
                radius = PlanetSettings.maxPlanetRadius;
            }
            this._radius = radius;
            let planet_rad = 1;
            for (var i = 0; i < PlanetSettings.movie_suffix.length; i++) {
                if (PlanetSettings.planet_radius[i] >= this._radius) {
                    this._suffix = PlanetSettings.movie_suffix[i];
                    planet_rad = PlanetSettings.planet_radius[i];
                }
                else {
                    break;
                }
            }
            this._scale = this._radius / planet_rad;
            this._hero_place_scale = 0; //this._radius / PlanetSettings.planet_radius[0] * PlanetSettings.place_scale[i];
        }
        /// скорость вращения планеты (в углах в секунду, может быть отрицательным)
        get speed_rotation() { return this._speed_rotation; }
        /// cжатие текстуры
        get scale() { return this._scale; }
        /// радиус планеты
        get radius() { return this._radius; }
        ;
        /// идентификатор мувиклипа
        get movie_id() { return super.movie_id + this._suffix; }
        /// сжатие места приземления шерифа
        get hero_place_scale() {
            return this._hero_place_scale;
        }
    }
    PlanetSettings.movie_suffix = ['0000', '0001', '0002', '0003'];
    PlanetSettings.planet_radius = [225, 150, 96, 56];
    PlanetSettings.place_scale = [0.94, 0.96, 0.98, 1];
    PlanetSettings.minPlanetRadius = PlanetSettings.planet_radius[PlanetSettings.planet_radius.length - 1];
    PlanetSettings.maxPlanetRadius = PlanetSettings.planet_radius[0];
    src.PlanetSettings = PlanetSettings;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Выбирает рандомно из переданных IRandValue
     * @author zu
     */
    class RandSequence {
        constructor(sequences /*IRandValue*/) {
            this.seqs = [];
            for (var item of sequences) {
                this.seqs.push(item);
            }
        }
        get value() {
            return this.seqs[Math.floor(Math.random() * this.seqs.length)].value;
        }
    }
    src.RandSequence = RandSequence;
})(src || (src = {}));
var src;
(function (src) {
    /**
     * Выбирает последовательно из переданных IRandValue
     * @author zu
     */
    class Sequence {
        constructor(sequences /*IRandValue*/) {
            this.seqs = [];
            for (let item of sequences) {
                this.seqs.push(item);
            }
            this.current = Math.floor(this.seqs.length * Math.random());
        }
        get value() {
            ++this.current;
            if (this.current >= this.seqs.length)
                this.current = 0;
            return this.seqs[this.current].value;
        }
    }
    src.Sequence = Sequence;
})(src || (src = {}));
var src;
(function (src) {
    function drawNumber(gr, n, pos) {
        var digits = [];
        var d;
        if (n > 0) {
            while (n > 0) {
                d = n % 10;
                digits.unshift(d);
                n = (n - d) / 10;
            }
        }
        else {
            digits.push(0);
        }
        const size = 50;
        gr.lineStyle(2, 0);
        var p = pos.clone();
        for (d of digits) {
            gr.moveTo(p.x, p.y);
            if (d == 0) {
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size + size);
                gr.lineTo(p.x, p.y + size + size);
                gr.lineTo(p.x, p.y);
            }
            else if (d == 1) {
                gr.moveTo(p.x, p.y + size);
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size + size);
            }
            else if (d == 2) {
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size);
                gr.lineTo(p.x, p.y + size + size);
                gr.lineTo(p.x + size, p.y + size + size);
            }
            else if (d == 3) {
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size + size);
                gr.lineTo(p.x, p.y + size + size);
                gr.moveTo(p.x + size, p.y + size);
                gr.lineTo(p.x, p.y + size);
            }
            else if (d == 4) {
                gr.lineTo(p.x, p.y + size);
                gr.lineTo(p.x + size, p.y + size);
                gr.moveTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size + size);
            }
            else if (d == 5) {
                gr.moveTo(p.x + size, p.y);
                gr.lineTo(p.x, p.y);
                gr.lineTo(p.x, p.y + size);
                gr.lineTo(p.x + size, p.y + size);
                gr.lineTo(p.x + size, p.y + size + size);
                gr.lineTo(p.x, p.y + size + size);
            }
            else if (d == 6) {
                gr.moveTo(p.x + size, p.y);
                gr.lineTo(p.x, p.y + size);
                gr.lineTo(p.x, p.y + size + size);
                gr.lineTo(p.x + size, p.y + size + size);
                gr.lineTo(p.x + size, p.y + size);
                gr.lineTo(p.x, p.y + size);
            }
            else if (d == 7) {
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x, p.y + size);
                gr.lineTo(p.x, p.y + size + size);
            }
            else if (d == 8) {
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size + size);
                gr.lineTo(p.x, p.y + size + size);
                gr.lineTo(p.x, p.y);
                gr.moveTo(p.x, p.y + size);
                gr.lineTo(p.x + size, p.y + size);
            }
            else if (d == 9) {
                gr.moveTo(p.x, p.y + size + size);
                gr.lineTo(p.x + size, p.y + size);
                gr.lineTo(p.x, p.y + size);
                gr.lineTo(p.x, p.y);
                gr.lineTo(p.x + size, p.y);
                gr.lineTo(p.x + size, p.y + size);
            }
            p.x += size + size * 0.4;
        }
    }
    src.drawNumber = drawNumber;
})(src || (src = {}));
var src;
(function (src) {
    class AbstractManager extends Phaser.Group {
        constructor(level) {
            super(level.game);
            this.level = level;
        }
    }
    src.AbstractManager = AbstractManager;
})(src || (src = {}));
var src;
(function (src) {
    class GameStateManager extends src.AbstractManager {
        constructor(level) {
            super(level);
            this.gameActive = true;
            this.paused = false;
        }
        startLevel() {
            this.gameActive = true;
            this.paused = false;
            this.handleLevelFinish = this.handleLevelFinish.bind(this);
            addEventListener(src.Space.END_GAME, this.handleLevelFinish);
            src.SoundController.instance.playSound('VoiceHowdee', () => src.SoundController.instance.playMusic('MusicGameplay', false));
        }
        /**
         * GETTERS
         */
        isPaused() {
            return this.paused;
        }
        setPaused(value) {
            if (value != this.paused) {
                if (value) {
                    this.level.space.hero.pauseAnims();
                }
                else {
                    this.level.space.hero.resumeAnims();
                }
                this.paused = value;
            }
        }
        isActive() {
            return this.gameActive;
        }
        /**
         * PROTECTED
         */
        handleLevelFinish() {
            this.gameActive = false;
            src.ScoreManager.instance.addCurrentScores(this.level.space.score);
            src.ScoreManager.instance.addCombo(this.level.space.countCombo);
            src.SoundController.instance.playSound('VoiceDeath', () => src.WindowManager.instance.showResults());
        }
        destroy() {
            removeEventListener(src.Space.END_GAME, this.handleLevelFinish);
            super.destroy();
        }
    }
    src.GameStateManager = GameStateManager;
})(src || (src = {}));
var src;
(function (src) {
    class UIManager extends src.AbstractManager {
        constructor(level) {
            super(level);
            this.currentEffect = null;
            this.lastVisualScore = 0;
            this.frameCounter = 0;
            this.buildContent();
        }
        buildContent() {
            this.ingameHelp = this.add(this.game.make.sprite(325, 105, src.ProjectSettings.GAME_ATLAS, 'ingameHelp0000'));
            this.ingameHelp.anchor.set(0.5);
            this.ingameHelp.visible = src.Level.SHOW_HELP;
            this.scoreContainer = this.add(this.game.make.group());
            this.scoreContainer.position.set(25, 27);
            this.scorePlaceholder = this.scoreContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'scorePlaceholder0000'));
            this.scorePlaceholder.anchor.set(0.5);
            this.scoreText = this.scoreContainer.add(src.TextUtils.getStyledText('1200', 15, 0, 36, '#FFFFFF', 'rgba(0,0,0,0.42)', 8));
            this.scoreText.anchor.set(0, 0.5);
            this.comboPlaceholder = this.add(this.game.make.sprite(583, 403, src.ProjectSettings.GAME_ATLAS, 'comboPlaceholder0000'));
            this.comboPlaceholder.anchor.set(0.5);
            this.comboText = this.add(src.TextUtils.getStyledText('0', 554, 406, 30, '#333333', '#FFFFFF', 6, false));
            this.comboText.anchor.set(1, 0.5);
            this.pauseButton = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonPause', 516, 31, this.pauseClicked, this, 1, 2));
            this.medalPopup = this.add(new src.MedalPopup(this));
            this.medalPopup.position.set(0, 367);
            this.x2Effect = this.add(new src.MultiplierEffect('x2Full', 640, 460, 118, 53 + 28, 53 + 53));
            this.x3Effect = this.add(new src.MultiplierEffect('x3Full', 650, 460, 86, 51 + 15, 51 + 27));
            this.x4Effect = this.add(new src.MultiplierEffect('x4Full', 645, 492, 85, 52 + 12, 52 + 19));
            this.handleVisualScoreChange = this.handleVisualScoreChange.bind(this);
            this.handleGameSpeedChange = this.handleGameSpeedChange.bind(this);
            this.endHelpListener = this.endHelpListener.bind(this);
            addEventListener(src.Space.CHANGE_VISUAL_SCORE, this.handleVisualScoreChange);
            addEventListener(src.Space.CHANGE_SPEED_X, this.handleGameSpeedChange);
            addEventListener(src.Space.END_HELP, this.endHelpListener);
        }
        update() {
            super.update();
            this.frameCounter++;
            if (this.currentEffect && this.frameCounter % 4 == 0) {
                this.scoreContainer.position.set(25 + this.game.rnd.realInRange(-2, 2), 27 + this.game.rnd.realInRange(-2, 2));
            }
            else {
                this.scoreContainer.position.set(25, 27);
            }
            this.scoreText.setText(`${this.level.space.visualScore}`);
            this.comboText.setText(`${this.level.space.combo}`);
        }
        /**
         * EVENT LISTENERS
         */
        endHelpListener() {
            removeEventListener(src.Space.END_HELP, this.endHelpListener);
            src.Level.SHOW_HELP = false;
            this.game.add.tween(this.ingameHelp)
                .to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true);
        }
        pauseClicked() {
            if (this.level.gameStateManager.isActive()) {
                src.WindowManager.instance.showPause();
            }
        }
        handleVisualScoreChange() {
            if (this.lastVisualScore < src.Constant.SCORE_GOLD_MEDAL && this.level.space.visualScore >= src.Constant.SCORE_GOLD_MEDAL) {
                this.medalPopup.showMedal(src.MedalLevel.GOLD);
            }
            else if (this.lastVisualScore < src.Constant.SCORE_SILVER_MEDAL && this.level.space.visualScore >= src.Constant.SCORE_SILVER_MEDAL) {
                this.medalPopup.showMedal(src.MedalLevel.SILVER);
            }
            else if (this.lastVisualScore < src.Constant.SCORE_BRONZE_MEDAL && this.level.space.visualScore >= src.Constant.SCORE_BRONZE_MEDAL) {
                this.medalPopup.showMedal(src.MedalLevel.BRONZE);
            }
            this.lastVisualScore = this.level.space.visualScore;
        }
        handleGameSpeedChange() {
            const speed = this.level.space.speedGame;
            if (speed == 0) {
                this.scorePlaceholder.frameName = 'scorePlaceholder0000';
                this.scoreContainer.scale.set(1);
                this.scoreText.addColor('#FFFFFF', 0);
                this.scoreText.stroke = 'rgba(0,0,0,0.42)';
                this.scoreText.strokeThickness = 6;
                if (this.currentEffect)
                    this.currentEffect.stop();
                this.currentEffect = null;
            }
            else {
                if (this.currentEffect)
                    this.currentEffect.stop();
                this.currentEffect = speed == 1 ? this.x2Effect : speed == 2 ? this.x3Effect : this.x4Effect;
                this.currentEffect.start();
                switch (speed) {
                    case 1:
                        this.scorePlaceholder.frameName = 'scorePlaceholder0001';
                        this.scoreContainer.scale.set(1.075);
                        this.scoreText.addColor('#E3B602', 0);
                        this.scoreText.stroke = '#FFFFFF';
                        this.scoreText.strokeThickness = 4;
                        break;
                    case 2:
                        this.scorePlaceholder.frameName = 'scorePlaceholder0002';
                        this.scoreContainer.scale.set(1.15);
                        this.scoreText.addColor('#F87719', 0);
                        this.scoreText.stroke = '#FFFFFF';
                        this.scoreText.strokeThickness = 4;
                        break;
                    case 3:
                        this.scorePlaceholder.frameName = 'scorePlaceholder0003';
                        this.scoreContainer.scale.set(1.225);
                        this.scoreText.addColor('#ED2F1B', 0);
                        this.scoreText.stroke = '#FFFFFF';
                        this.scoreText.strokeThickness = 4;
                        break;
                }
            }
        }
        destroy() {
            removeEventListener(src.Space.CHANGE_VISUAL_SCORE, this.handleVisualScoreChange);
            removeEventListener(src.Space.CHANGE_SPEED_X, this.handleGameSpeedChange);
            removeEventListener(src.Space.END_HELP, this.endHelpListener);
            super.destroy();
        }
    }
    src.UIManager = UIManager;
})(src || (src = {}));
var src;
(function (src) {
    class MedalManager {
        constructor() {
            this.medalLevel = 0;
        }
        static get instance() {
            return MedalManager._instance ? MedalManager._instance : MedalManager._instance = new MedalManager();
        }
        getMedalLevel() {
            return this.medalLevel;
        }
        calculateMedalLevelByScore(score) {
            if (score > src.ProjectSettings.GOLD_MEDAL_SCORE) {
                return src.MedalLevel.GOLD;
            }
            else if (score > src.ProjectSettings.SILVER_MEDAL_SCORE) {
                return src.MedalLevel.SILVER;
            }
            else if (score > src.ProjectSettings.BRONZE_MEDAL_SCORE) {
                return src.MedalLevel.BRONZE;
            }
            else {
                return src.MedalLevel.NONE;
            }
        }
        updateMedalLevel(value) {
            if (value > this.medalLevel) {
                this.medalLevel = Math.max(this.medalLevel, value);
                src.LocalStorageController.instance.save();
            }
        }
    }
    MedalManager._instance = null;
    src.MedalManager = MedalManager;
})(src || (src = {}));
var src;
(function (src) {
    class ScoreManager {
        constructor() {
            this.maxScores = 0;
            this.currentScore = 0;
            this.combos = 0;
        }
        static get instance() {
            return ScoreManager._instance ? ScoreManager._instance : ScoreManager._instance = new ScoreManager();
        }
        reset() {
            this.currentScore = 0;
            this.combos = 0;
        }
        getCurrentScores() {
            return ~~this.currentScore;
        }
        addCurrentScores(value) {
            this.currentScore += value;
        }
        addCombo(value) {
            this.combos += value;
        }
        getCombos() {
            return ~~this.combos;
        }
        getComboScore() {
            return this.getCombos() * src.Constant.SCORE_COMBO_FACTOR;
        }
        getTotalScores() {
            return this.getCurrentScores() + this.getComboScore();
        }
        updateMaxScores(newScore) {
            if (this.getMaxScores() < newScore) {
                this.setMaxScores(newScore);
                src.LocalStorageController.instance.save();
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * MAX SCORES
         */
        getMaxScores() {
            return this.maxScores;
        }
        setMaxScores(value) {
            this.maxScores = Math.max(this.maxScores, value);
        }
    }
    ScoreManager._instance = null;
    src.ScoreManager = ScoreManager;
})(src || (src = {}));
var src;
(function (src) {
    class SoundButtonsController extends Phaser.Group {
        constructor() {
            super(src.App.instance);
            this.started = false;
            this.buttonSoundOn = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonSoundOn', 562, 31, this.soundOnClicked, this, 1, 0));
            this.buttonSoundOff = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonSoundOff', 562, 31, this.soundOffClicked, this, 1, 0));
            this.buttonMusicOn = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonMusicOn', 608, 31, this.musicOnClicked, this, 1, 0));
            this.buttonMusicOff = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonMusicOff', 608, 31, this.musicOffClicked, this, 1, 0));
            this.updateSoundButtons();
        }
        static get instance() {
            return SoundButtonsController._instance ? SoundButtonsController._instance : SoundButtonsController._instance = new SoundButtonsController();
        }
        start() {
            if (!this.started) {
                this.started = true;
                src.App.instance.stage.addChild(this);
            }
        }
        getToTop() {
            src.App.instance.stage.setChildIndex(this, src.App.instance.stage.children.length - 1);
        }
        soundOnClicked() {
            src.SoundController.instance.setSFXVolume(0);
            this.updateSoundButtons();
        }
        soundOffClicked() {
            src.SoundController.instance.setSFXVolume(src.SoundController.instance.defaultSFXVolume);
            this.updateSoundButtons();
        }
        musicOnClicked() {
            src.SoundController.instance.setMusicVolume(0);
            this.updateSoundButtons();
        }
        musicOffClicked() {
            src.SoundController.instance.setMusicVolume(src.SoundController.instance.defaultMusicVolume);
            this.updateSoundButtons();
        }
        updateSoundButtons() {
            if (src.SoundController.instance.isMusicMuted()) {
                this.buttonMusicOn.visible = false;
                this.buttonMusicOff.visible = true;
            }
            else {
                this.buttonMusicOn.visible = true;
                this.buttonMusicOff.visible = false;
            }
            if (src.SoundController.instance.isSFXMuted()) {
                this.buttonSoundOn.visible = false;
                this.buttonSoundOff.visible = true;
            }
            else {
                this.buttonSoundOn.visible = true;
                this.buttonSoundOff.visible = false;
            }
        }
    }
    SoundButtonsController._instance = null;
    src.SoundButtonsController = SoundButtonsController;
})(src || (src = {}));
var src;
(function (src) {
    class ConfirmRestartWindow extends src.BaseWindow {
        constructor() {
            super(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.3);
        }
        buildContent() {
            super.buildContent();
            this.plateContainer = this.content.add(this.game.make.group());
            this.plateContainer.position.set(320, -160);
            this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'confirmRestartPlate' + '0000'));
            this.plate.anchor.set(0.5);
            this.buttonYes = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonYes', -66, 64, this.yesClicked, this, 1, 2));
            this.buttonNo = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonNo', 66, 64, this.noClicked, this, 1, 2));
        }
        show() {
            super.show();
            this.clearTweens();
            this.background.alpha = 0;
            this.game.add.tween(this.background)
                .to({ alpha: this.backgroundAlpha }, 350, Phaser.Easing.Circular.Out, true, 0);
            this.plateContainer.y = -160;
            this.game.add.tween(this.plateContainer)
                .to({ y: 230 }, 600, this.elasticOut, true, 100);
        }
        clearTweens() {
            this.game.tweens.removeFrom(this.background);
            this.game.tweens.removeFrom(this.plateContainer, false);
        }
        hide() {
            this.clearTweens();
            super.hide();
        }
        /**
         * TWEENS
         */
        elasticOut(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0)
                return 0;
            if (k === 1)
                return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            }
            else
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        }
        /**
         * BUTTON HANDLERS
         */
        yesClicked() {
            src.TransitionScreen.instance.changeState("Level");
        }
        noClicked() {
            this.hide();
        }
    }
    src.ConfirmRestartWindow = ConfirmRestartWindow;
})(src || (src = {}));
var src;
(function (src) {
    class CreditsWindow extends src.BaseWindow {
        constructor() {
            super(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5);
        }
        buildContent() {
            super.buildContent();
            this.plateContainer = this.content.add(this.game.make.group());
            this.plateContainer.position.set(320, -80);
            this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'creditsPlate' + '0000'));
            this.plate.anchor.set(0.5);
            this.buttonFundemic = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'blackSquare', 0, 30, this.fundemicClicked, this));
            this.buttonFundemic.width = 260;
            this.buttonFundemic.height = 120;
            this.buttonFundemic.alpha = 0.0;
            this.buttonFundemic.input.pixelPerfectAlpha = 0;
            this.buttonClose = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonCloseCredits', 220, -132, this.closeClicked, this, 1, 2));
        }
        show() {
            super.show();
            this.clearTweens();
            this.background.alpha = 0;
            this.game.add.tween(this.background)
                .to({ alpha: this.backgroundAlpha }, 350, Phaser.Easing.Circular.Out, true, 0);
            this.buttonClose.y = -135 - 90;
            this.game.add.tween(this.buttonClose)
                .to({ y: -132 }, 600, Phaser.Easing.Elastic.Out, true, 200);
            this.plateContainer.y = -180;
            this.game.add.tween(this.plateContainer)
                .to({ y: 220 }, 600, this.elasticOut, true, 100);
        }
        clearTweens() {
            this.game.tweens.removeFrom(this.background);
            this.game.tweens.removeFrom(this.plateContainer, false);
        }
        hide() {
            this.clearTweens();
            super.hide();
        }
        /**
         * TWEENS
         */
        elasticOut(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0)
                return 0;
            if (k === 1)
                return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            }
            else
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        }
        /**
         * BUTTON HANDLERS
         */
        fundemicClicked() {
            window.open("https://fundemic.com", "_blank");
        }
        closeClicked() {
            this.hide();
        }
    }
    src.CreditsWindow = CreditsWindow;
})(src || (src = {}));
var src;
(function (src) {
    class HelpWindow extends src.BaseWindow {
        constructor() {
            super(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.3);
        }
        buildContent() {
            super.buildContent();
            this.plateContainer = this.content.add(this.game.make.group());
            this.plateContainer.position.set(320, -200);
            this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'helpPlate' + '0000'));
            this.plate.anchor.set(0.5);
            this.buttonClose = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonCloseCredits', 220, 85, this.closeClicked, this, 1, 2));
        }
        show() {
            super.show();
            this.clearTweens();
            this.background.alpha = 0;
            this.game.add.tween(this.background)
                .to({ alpha: this.backgroundAlpha }, 350, Phaser.Easing.Circular.Out, true, 0);
            this.buttonClose.y = -242 - 90;
            this.game.add.tween(this.buttonClose)
                .to({ y: -142 }, 700, Phaser.Easing.Elastic.Out, true, 350);
            this.plateContainer.y = -200;
            this.game.add.tween(this.plateContainer)
                .to({ y: 227 }, 750, this.elasticOut, true, 100);
        }
        clearTweens() {
            this.game.tweens.removeFrom(this.background);
            this.game.tweens.removeFrom(this.plateContainer, false);
        }
        hide() {
            this.clearTweens();
            super.hide();
        }
        /**
         * TWEENS
         */
        elasticOut(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0)
                return 0;
            if (k === 1)
                return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            }
            else
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        }
        /**
         * BUTTON HANDLERS
         */
        closeClicked() {
            this.hide();
        }
    }
    src.HelpWindow = HelpWindow;
})(src || (src = {}));
var src;
(function (src) {
    class PauseWindow extends src.BaseWindow {
        constructor() {
            super(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.5);
        }
        buildContent() {
            super.buildContent();
            this.plateContainer = this.content.add(this.game.make.group());
            this.plateContainer.position.set(0, 0);
            this.buttonResume = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonResume', 320, 140, this.resumeClicked, this, 1, 2));
            this.buttonMenu = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonMenu', 320, 212, this.menuClicked, this, 1, 2));
            this.buttonReplay = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonReplay', 320, 275, this.replayClicked, this, 1, 2));
            this.buttonHelp = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonHelp', 320, 337, this.helpClicked, this, 1, 2));
            this.keysInfo = this.content.add(this.game.make.sprite(320, 405, src.ProjectSettings.GAME_ATLAS, 'pauseHelpLine0000'));
            this.keysInfo.anchor.set(0.5);
        }
        show() {
            super.show();
            if (src.App.instance.state.getCurrentState() instanceof src.Level) {
                src.App.instance.state.getCurrentState().gameStateManager.setPaused(true);
            }
            this.clearTweens();
            this.background.alpha = 0;
            this.game.add.tween(this.background)
                .to({ alpha: this.backgroundAlpha }, 200, Phaser.Easing.Circular.Out, true, 0);
            this.buttonHelp.y = -50;
            this.game.add.tween(this.buttonHelp)
                .to({ y: 337 }, 600, this.elasticOut, true, 50);
            this.buttonReplay.y = -100;
            this.game.add.tween(this.buttonReplay)
                .to({ y: 275 }, 600, this.elasticOut, true, 50 + 70);
            this.buttonMenu.y = -150;
            this.game.add.tween(this.buttonMenu)
                .to({ y: 212 }, 600, this.elasticOut, true, 50 + 140);
            this.buttonResume.y = -210;
            this.game.add.tween(this.buttonResume)
                .to({ y: 140 }, 600, this.elasticOut, true, 50 + 210);
            this.keysInfo.alpha = 0;
            this.game.add.tween(this.keysInfo)
                .to({ alpha: 1 }, 150, Phaser.Easing.Linear.None, true, 100);
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.handleResumeKeyClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.handleResumeKeyClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.handleResumeKeyClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(this.menuClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(this.replayClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.H).onDown.add(this.helpClicked, this);
        }
        clearTweens() {
            this.game.tweens.removeFrom(this.background);
            this.game.tweens.removeFrom(this.plateContainer, false);
            this.game.tweens.removeFrom(this.buttonReplay, false);
            this.game.tweens.removeFrom(this.buttonMenu, false);
            this.game.tweens.removeFrom(this.buttonHelp, false);
            this.game.tweens.removeFrom(this.buttonResume, false);
            this.game.tweens.removeFrom(this.keysInfo, false);
        }
        hide() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ESC);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.M);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.R);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.H);
            this.clearTweens();
            super.hide();
        }
        /**
         * TWEENS
         */
        elasticOut(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0)
                return 0;
            if (k === 1)
                return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            }
            else
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        }
        /**
         * BUTTON HANDLERS
         */
        handleResumeKeyClicked(e) {
            this.resumeClicked();
        }
        resumeClicked() {
            if (src.App.instance.state.getCurrentState() instanceof src.Level) {
                src.App.instance.state.getCurrentState().gameStateManager.setPaused(false);
            }
            this.hide();
        }
        menuClicked() {
            src.WindowManager.instance.showQuitMenuWindow();
        }
        replayClicked() {
            src.WindowManager.instance.showConfirmRestartWindow();
        }
        helpClicked() {
            src.WindowManager.instance.showHelp();
        }
    }
    src.PauseWindow = PauseWindow;
})(src || (src = {}));
var src;
(function (src) {
    class QuitMenuWindow extends src.BaseWindow {
        constructor() {
            super(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.3);
        }
        buildContent() {
            super.buildContent();
            this.plateContainer = this.content.add(this.game.make.group());
            this.plateContainer.position.set(320, -160);
            this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'quitMenuPlate' + '0000'));
            this.plate.anchor.set(0.5);
            this.buttonYes = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonYes', -66, 64, this.yesClicked, this, 1, 2));
            this.buttonNo = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonNo', 66, 64, this.noClicked, this, 1, 2));
        }
        show() {
            super.show();
            this.clearTweens();
            this.background.alpha = 0;
            this.game.add.tween(this.background)
                .to({ alpha: this.backgroundAlpha }, 350, Phaser.Easing.Circular.Out, true, 0);
            this.plateContainer.y = -160;
            this.game.add.tween(this.plateContainer)
                .to({ y: 230 }, 600, this.elasticOut, true, 100);
        }
        clearTweens() {
            this.game.tweens.removeFrom(this.background);
            this.game.tweens.removeFrom(this.plateContainer, false);
        }
        hide() {
            this.clearTweens();
            super.hide();
        }
        /**
         * TWEENS
         */
        elasticOut(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0)
                return 0;
            if (k === 1)
                return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            }
            else
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        }
        /**
         * BUTTON HANDLERS
         */
        yesClicked() {
            src.TransitionScreen.instance.changeState("MainMenu");
        }
        noClicked() {
            this.hide();
        }
    }
    src.QuitMenuWindow = QuitMenuWindow;
})(src || (src = {}));
var src;
(function (src) {
    class ResultsWindow extends src.BaseWindow {
        constructor() {
            super(src.CustomScaleManager.ORIGINAL_WIDTH / 2, src.CustomScaleManager.ORIGINAL_HEIGHT / 2, 0.3);
        }
        buildContent() {
            super.buildContent();
            /* MAIN PANEL */
            this.plateContainer = this.content.add(this.game.make.group());
            this.plateContainer.position.set(320, 190);
            this.plate = this.plateContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'resultsPlate' + '0000'));
            this.plate.anchor.set(0.5);
            this.comboBonusText = this.plateContainer.add(src.TextUtils.getText('40000', 96, -44, 26, '#8E7260'));
            this.comboBonusText.anchor.set(1, 0.5);
            this.comboBonusText.alpha = 0.9;
            this.scoresText = this.plateContainer.add(src.TextUtils.getStyledText('1400', -32, 6, 40, '#FFFFFF', 'rgba(0,0,0,0.42)', 8, true));
            this.scoresText.anchor.set(0, 0.5);
            this.buttonSubmit = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonSubmit', -40, 70, this.submitClicked, this, 1, 2));
            this.buttonFacebook = this.plateContainer.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonFacebook', 78, 70, this.facebookClicked, this, 1, 2));
            this.buttonSubmit.visible = window["enableSubmitButton"];
            this.buttonFacebook.visible = window["enableFacebookButton"];
            this.stamp = this.plateContainer.add(this.game.make.sprite(145, 50, src.ProjectSettings.GAME_ATLAS, 'stamp' + '0000'));
            this.stamp.anchor.set(0.5);
            this.stamp.alpha = 0;
            this.medal = this.plateContainer.add(new src.MedalInformer('medal', src.MedalManager.instance.getMedalLevel(), -18, 68));
            this.medal.position.set(-163, -97);
            this.medal.visible = false;
            /* COMBOS PANEL */
            this.combosContainer = this.content.add(this.game.make.group());
            this.combosContainer.position.set(390, 75);
            this.combosPlate = this.combosContainer.add(this.game.make.sprite(0, 0, src.ProjectSettings.GAME_ATLAS, 'resultsCombosPlate' + '0000'));
            this.combosPlate.anchor.set(0.5);
            this.maxComboText = this.combosContainer.add(src.TextUtils.getStyledText('20', 85, -2, 30, '#333333', 'rgba(0,0,0,0.3)', 4));
            this.maxComboText.anchor.set(1, 0.5);
            /* BUTTONS */
            this.buttonMenu = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonMenu', 228, 340, this.menuClicked, this, 1, 2));
            this.buttonReplay = this.add(src.ButtonUtils.createButton(src.ProjectSettings.GAME_ATLAS, 'buttonReplayRed', 413, 340, this.replayClicked, this, 1, 2));
            /* INFO TEXT */
            this.keysInfo = this.content.add(this.game.make.sprite(320, 405, src.ProjectSettings.GAME_ATLAS, 'resultsHelpLine0000'));
            this.keysInfo.anchor.set(0.5);
            this.confetti = this.add(new src.Confetti());
        }
        show() {
            super.show();
            src.SoundController.instance.playMusic('MusicScore');
            this.updateData();
            this.animateTexts(1000);
            this.animateContent();
            this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.menuClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.replayClicked, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.replayClicked, this);
        }
        updateData() {
            const newBestScoreReached = src.ScoreManager.instance.updateMaxScores(src.ScoreManager.instance.getTotalScores());
            const medalLevelReached = src.MedalManager.instance.calculateMedalLevelByScore(src.ScoreManager.instance.getTotalScores());
            src.MedalManager.instance.updateMedalLevel(medalLevelReached);
            this.maxComboText.setText('' + src.ScoreManager.instance.getCombos());
            this.scoresText.setText('' + src.ScoreManager.instance.getCurrentScores());
            this.comboBonusText.setText('' + src.ScoreManager.instance.getComboScore());
            src.LocalStorageController.instance.save();
            if (newBestScoreReached) {
                this.game.time.events.add(2000, this.playStampTween, this);
            }
            if (medalLevelReached > 0) {
                if (newBestScoreReached) {
                    this.game.time.events.add(2700, this.playMedalTween, this);
                }
                else {
                    this.game.time.events.add(1800, this.playMedalTween, this);
                }
            }
        }
        animateTexts(delay) {
            if (src.ScoreManager.instance.getCombos() > 0) {
                const countingDuration = Math.log(src.ScoreManager.instance.getComboScore() + 1) * 200; //750
                this.game.time.events.add(delay, () => src.SoundController.instance.startCountingSound());
                src.TextUtils.tweenText(this.comboBonusText, src.ScoreManager.instance.getComboScore(), 0, countingDuration, delay);
                src.TextUtils.tweenText(this.scoresText, src.ScoreManager.instance.getCurrentScores(), src.ScoreManager.instance.getTotalScores(), countingDuration, delay);
                this.game.time.events.add(delay + countingDuration, () => src.SoundController.instance.stopCountingSound());
            }
        }
        animateContent() {
            this.clearTweens();
            this.plateContainer.scale.set(1);
            this.plate.frameName = 'resultsPlate' + '0000';
            this.stamp.alpha = 0;
            this.background.alpha = 0;
            this.game.add.tween(this.background)
                .to({ alpha: this.backgroundAlpha }, 350, Phaser.Easing.Circular.Out, true, 0);
            this.combosContainer.y = -150;
            this.game.add.tween(this.combosContainer)
                .to({ y: 75 }, 1000, Phaser.Easing.Elastic.Out, true, 200);
            this.plateContainer.y = -200;
            this.game.add.tween(this.plateContainer)
                .to({ y: 190 }, 1100, this.elasticOut, true, 100);
            this.buttonMenu.y = -53;
            this.game.add.tween(this.buttonMenu)
                .to({ y: 338 }, 1850, this.elasticOut, true, 100);
            this.buttonReplay.y = -40;
            this.game.add.tween(this.buttonReplay)
                .to({ y: 340 }, 2000, this.elasticOut, true, 100);
            this.keysInfo.alpha = 0;
            this.game.add.tween(this.keysInfo)
                .to({ alpha: 1 }, 150, Phaser.Easing.Linear.None, true, 100);
        }
        clearTweens() {
            this.game.tweens.removeFrom(this.background);
            this.game.tweens.removeFrom(this.plateContainer, false);
            this.game.tweens.removeFrom(this.keysInfo, false);
            this.game.tweens.removeFrom(this.buttonReplay, false);
            this.game.tweens.removeFrom(this.buttonMenu, false);
            this.game.tweens.removeFrom(this.plateContainer, false);
            this.game.tweens.removeFrom(this.combosContainer, false);
            this.game.tweens.removeFrom(this.stamp, false);
            this.game.tweens.removeFrom(this.stamp.scale, false);
            this.game.tweens.removeFrom(this.plateContainer.scale, false);
        }
        playStampTween() {
            src.SoundController.instance.playSound('SoundStamp');
            src.SoundController.instance.playSound('SoundConfetti');
            this.stamp.scale.set(2);
            this.stamp.alpha = 0.45;
            this.game.add.tween(this.stamp.scale)
                .to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true)
                .onComplete.add(() => {
                this.confetti.playAnim(0xFFFFFF);
                this.plate.frameName = 'resultsPlate' + '0001';
                this.plateContainer.scale.set(0.87);
                this.game.add.tween(this.plateContainer.scale)
                    .to({ x: 1, y: 1 }, 320, Phaser.Easing.Back.Out, true);
                this.game.add.tween(this.stamp.scale)
                    .to({ x: 1.1, y: 1.1 }, 300, Phaser.Easing.Sinusoidal.Out, true);
                this.game.add.tween(this.stamp)
                    .to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            });
        }
        playMedalTween() {
            if (src.MedalManager.instance.getMedalLevel() > 0) {
                src.SoundController.instance.playSound('SoundMedalScore');
                src.SoundController.instance.playSound('SoundConfetti');
                this.medal.visible = true;
                this.game.tweens.removeFrom(this.medal, false);
                this.game.tweens.removeFrom(this.medal.scale, false);
                this.medal.alpha = 0;
                this.medal.scale.set(2.5);
                this.game.add.tween(this.medal)
                    .to({ alpha: 1 }, 250, Phaser.Easing.Sinusoidal.Out, true);
                this.game.add.tween(this.medal.scale)
                    .to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true)
                    .onComplete.add(() => {
                    this.confetti.playAnim(0xFFFF00);
                    this.plateContainer.scale.set(0.87);
                    this.game.add.tween(this.plateContainer.scale)
                        .to({ x: 1, y: 1 }, 320, Phaser.Easing.Back.Out, true);
                    this.game.add.tween(this.medal.scale)
                        .to({ x: 1.1, y: 1.1 }, 300, Phaser.Easing.Sinusoidal.Out, true);
                });
            }
        }
        hide() {
            src.SoundController.instance.stopCountingSound();
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ESC);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
            this.clearTweens();
            super.hide();
        }
        /**
         * TWEENS
         */
        elasticOut(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0)
                return 0;
            if (k === 1)
                return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            }
            else
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2.7, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        }
        /**
         * BUTTON HANDLERS
         */
        menuClicked() {
            src.TransitionScreen.instance.changeState("MainMenu");
        }
        replayClicked() {
            src.TransitionScreen.instance.changeState("Level");
        }
        submitClicked() {
            window["submitScoreHandler"](src.ScoreManager.instance.getMaxScores());
        }
        facebookClicked() {
            window["shareOnFacebookHandler"](src.ScoreManager.instance.getMaxScores());
        }
    }
    src.ResultsWindow = ResultsWindow;
})(src || (src = {}));
//# sourceMappingURL=game.js.map
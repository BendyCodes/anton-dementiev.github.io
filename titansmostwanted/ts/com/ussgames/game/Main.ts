declare var GAF:any;
declare var Stats:any;
declare var xml2js:any;
declare var WebFont:any;
declare var Howler:any;
declare var Howl:any;

import Rectangle = PIXI.Rectangle;
import Point = PIXI.Point;
import Sprite = PIXI.Sprite;
import ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;


window.onresize = function() {
    Main.onResize();
}

module com.ussgames.game
{
	export class Main
	{
		public static score:MochiDigits;
		public static level:MochiDigits;
		public static lives:MochiDigits;
		
		public static inGamePanel:GamePanel;
		
		public static gamePaused:boolean = false;
		
		public static inited:boolean = false;

		public static gafBundle_instance_nesting:any;
		public static gafBundle_instance_nestingStr:any;


		public static visibilityState = true;
		public static soundMusic;
		public static soundMusicState = false;
		public currAudioFormat;
		public static soundData = [];
		public static renderer;
		public static stage:PIXI.Container;
		public loader;
		public numToLoadCount = 0;
		public progressLoadCount = 0;
		public stageCreated = false;
		public static globalWidth = 640*2;
		public static globalHeight = 480*2;
		public static globalScale = 1;
		public static realW = window.innerWidth;
		public static realH = window.innerHeight;
		public static stats:any;

		public static preload_image:HTMLImageElement;
		public static preload_imageBitmap:Sprite;

		public allSounds = (["badHP", "buyUpgrade", "goodHP", "levelup", "lose", "select", "tune1", "tune2", "tune3", "upgrades", "win"]);

		public static customEfFunc:any = {};

		public static gameLoopEnabled:boolean = false;
		
		
		constructor() {
			if (Main.inited) return;
			Main.inited = true;

			this.loader = PIXI.loader;
			this.loader.add("localisedtext.xml");
			this.loader.once('complete', function() {
				this.onPreloaderLoaded();
			}.bind(this));
			this.loader.load();
		}

		private onPreloaderLoaded()
		{
			var currAudioFormat = "ogg";
			if (Howler.codecs("mp3")) {
				currAudioFormat = "mp3";
			}

			var soundPreloadData = [];
			for (var s = 0; s < this.allSounds.length; s++) {
				soundPreloadData.push({name:this.allSounds[s].toLowerCase(), url:"sounds/" + this.allSounds[s].toLowerCase() + "." + currAudioFormat});
			}
			var soundPreloadNum = soundPreloadData.length;

			for (var s = 0; s < soundPreloadData.length; s++) {
				var _loop = false;
				if (soundPreloadData[s].name.indexOf("tune") > -1) _loop = true;

				Main.soundData[soundPreloadData[s].name] = new Howl({
					urls: [soundPreloadData[s].url],
					loop: _loop,
					onload: function() {
						//var percentValue = ((soundPreloadData.length - soundPreloadNum) / soundPreloadData.length) / 2;

						soundPreloadNum--;
						if (soundPreloadNum == 0) Main.initialization();
					}
				});
			}
		}

		public static initialization()
		{
			Main.score = new MochiDigits();
			Main.lives = new MochiDigits();
			Main.level = new MochiDigits();

			Main.stats = new Stats();
			
			Main.updateRender();

			Main.preload_image = document.createElement("img");
			Main.preload_image.src = "loading_splash.png";
			Main.preload_image.onload = function() {

				Main.preload_imageBitmap = PIXI.Sprite.fromImage(Main.preload_image.src);
		
				Main.renderer = PIXI.autoDetectRenderer(Main.globalWidth, Main.globalHeight, { antialias: false, transparent: true });
				document.body.appendChild(Main.renderer.view);
				Main.stage = new PIXI.Container();

				Main.preload_imageBitmap.scale.x = 2;
				Main.preload_imageBitmap.scale.y = 2;
		
				Main.stage.addChild(Main.preload_imageBitmap);

				Main.onResize();
				
				Main.stats.showPanel(0);
				document.body.appendChild(Main.stats.dom);


				var converter_gaf = new GAF.ZipToGAFAssetConverter();
				converter_gaf.convert("././././tmw/tmw.gaf");

				converter_gaf.on(GAF.GAFEvent.PROGRESS, converter_gaf_progress);

				function converter_gaf_progress(pEvent)
				{
					//console.log("main load", pEvent.progress);
				}

				converter_gaf.on(GAF.GAFEvent.COMPLETE, converter_gaf_complete);
				function converter_gaf_complete(pEvent)
				{
					console.log("gaf assets", pEvent);
					Main.gafBundle_instance_nesting = pEvent;

					Main.stage.removeChild(Main.preload_imageBitmap);
					Main.preload_imageBitmap = undefined;
					Localizer.startLocalizer();

					var rootGafTimeline = Main.addGAFMovieClip("rootTimeline", true, true);

					rootGafTimeline.scale.x = 2;
					rootGafTimeline.scale.y = 2;

					Main.stage.addChild(rootGafTimeline);

					//var tempClip = Main.addGAFMovieClip("dots1");
					//tempClip.x = 300;
					//tempClip.y = 300;
					//tempClip.gotoAndStop(5);
					//Main.changeText(tempClip.hpDown, " -299");
					//tempClip.cacheAsBitmap = true;
					//Main.stage.addChild(tempClip);
					
					
					var gameMain:BattleQuestMain = new BattleQuestMain();
					new TitansCinematicInitialiser().init();
					
					Controller.setRoot(rootGafTimeline);

					var transition:Transitioner = new Transitioner(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", "rootTimeline"));
					Transitioner.setRoot(rootGafTimeline);
					Controller.init(gameMain, transition);


					//Transitioner.theRoot.transition.gotoAndStop(7);
					//Transitioner.theRoot.loader.bar.gotoAndPlay(2);
					Transitioner.theRoot.loader.gotoAndStop(9);
					Transitioner.theRoot.loader.cn.visible = false;
					Transitioner.theRoot.loader.cn.gotoAndStop(1);

					setTimeout(function () {
						Transitioner.theRoot.loader.cn.visible = true;
						Transitioner.theRoot.loader.cn.gotoAndPlay(1);
					}, 100);

					Main.addCustomEfFunc('cn.onEnterFrame', function()
					{
						if (Transitioner.theRoot.loader.cn.currentFrame == 42)
						{
							Main.removeCustomEfFunc("cn.onEnterFrame");

							new PlayButton(rootGafTimeline.titleScreen.PlayButton, "menu");
							new CreditsButton(rootGafTimeline.titleScreen.CreditsButton, "menu");
							new SoundButton(Controller.root.soundBtn);
							new MusicButton(Controller.root.musicBtn);

							SoundController.playMusic("tune1");

							setTimeout(function () {
								Transitioner.theRoot.gotoAndStop("menu");
							}, 0);
							
						}
					});
				}
			};
		}

		public static updateRender():void {
			Main.stats.begin();

			if (Main.gameLoopEnabled)
			{
				BattleController.update();
			}

			if (Main.renderer != undefined)
			Main.renderer.render(Main.stage);

			Main.stats.end();
	   
		   	requestAnimationFrame(this.updateRender.bind(this));
	   	}
		
		public resetGame():void {
			Main.score.setValue();
			Main.lives.setValue(com.ussgames.game.Config.STARTLIVES);
		}
		
		public nextLevel():void {
			this.stopGame();
			if (Main.level.value<com.ussgames.game.Config.NUMBEROFLEVELS) {
				Main.level.addValue(1);
				if (com.ussgames.game.Config.RESETLIVESEVERYLEVEL) {
					Main.lives.setValue(com.ussgames.game.Config.STARTLIVES);
				}
				Controller.unlockLevel(Main.level.value);
				this.resetLevel();
			} else {
				Controller.gameComplete();
			}
		}
		
		public levelComplete():void {
			if (Controller.getLevelNumber() == 1) {
				Main.inGamePanel.openPanel("complete", "levelComplete_levelUp" );
			} else {
				Main.inGamePanel.openPanel("complete", "levelComplete_levelOver" );
			}
		}
		
		public retryLevel():void {
			this.stopGame();
			Controller.transitioner.goto("theGame", "Controller.main.resetLevel");
		}
		
		public resetLevel():void {
			if (Main.lives.value == 0) {
				this.resetGame();
			}
			Controller.main.cleanUp();

			Controller.startLevel();
			Main.gamePaused = false;
		}
		
		public gameOver():void {
			Main.inGamePanel.openPanel("gameover");
		}
		
		public startGame():void {
			Main.gameLoopEnabled = true;
		}
		
		public stopGame():void {
			Main.gameLoopEnabled = false;
		}
		
		public static pauseGame():void {
			if (!com.ussgames.general.GamePanel.panelOpen) {
				Main.gamePaused = true;
				Main.inGamePanel.openPanel("paused", "Main.gamePaused = false");
			}
		}
		
		public static inGameHelp():void {
			if (!com.ussgames.general.GamePanel.panelOpen) {
				Main.inGamePanel.openPanel("help");
			}
		}
		
		public gameLoop(e:Event):void {
			if (!Main.gamePaused) {
				BattleController.update();
			}
		}
		
		public loseLife():void {
			Main.lives.addValue( -1);
			if (Main.lives.value > 0) {
				this.reactToDeath();
			} else {
				this.gameOver();
			}
		}
		
		public reactToDeath():void {
			Main.inGamePanel.openPanel("loselife", "Main.retryLevel" );
		}
		
		public initGame():void {
		}
		
		public cleanUp():void {
		}

		public static getCurrentLabel(mc:any):string {
			var res:string = undefined;
			var cufe:number = mc.currentFrame;
			
			for (var sa = 0; sa < mc._gafTimeline._config._animationSequences._sequences.length; sa++)
			{
				var currfr = mc._gafTimeline._config._animationSequences._sequences[sa];

				if (currfr._startFrameNo <= cufe && currfr._endFrameNo >= cufe) {
						return currfr._id;
					}
			}

			return res;
		}

		public static mcInitedArrayClips:Array<any> = [];
		public static cacheAssets:boolean = false;

		public static startClearAssetCache()
		{
			Main.cacheAssets = true;

			for (var m in this.mcInitedArrayClips) {
				for (var e:number = 0; e < this.mcInitedArrayClips[m].length; e++) {
					//console.log("set stop", m, this.mcInitedArrayClips[m][e][1]);
					if (this.mcInitedArrayClips[m][e][1] == true) {						
						this.mcInitedArrayClips[m][e][1] = false;
					}
				}
			}
		}

		public static stopClearAssetCache()
		{
			Main.cacheAssets = false;
			//console.log("stopClearAssetCache", this.mcInitedArrayClips);
		}
		
		public static addGAFMovieClip(name:string, playClip:boolean = false, localis:boolean = false, maxInstance:number = 1)
		{
			//console.log("addGAFMovieClip", name);

			//localis = false;

			function setLocalisedText(clip_text)
			{
				if (localis) {

					//clip_text.textField.text = "test";

					if (clip_text.textField != undefined && clip_text.textField.text != undefined)
					
					Main.changeText(clip_text, Localizer.getlocalisedText(clip_text.textField.text));
					//clip_text.textField.text = Localizer.getlocalisedText(clip_text.textField.text)[0];
				}
			}

		
			var clp;

			var notCached = ["rootTimeline", "NewBattleAnimHolder"];
			notCached = ["rootTimeline"];
			
			if (notCached.indexOf(name) == -1)
			{
				var useUsed:boolean = false;

				if (this.mcInitedArrayClips[name] == undefined)
				{
					this.mcInitedArrayClips[name] = [];
					this.mcInitedArrayClips[name].push([new GAF.GAFMovieClip(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", name)), true]);
				}
				else
				{
					if (Main.cacheAssets)
					{
						for (var p:number = 0; p < this.mcInitedArrayClips[name].length; p++) {
							if (!this.mcInitedArrayClips[name][p][1])
							{
								clp = this.mcInitedArrayClips[name][p][0];
								this.mcInitedArrayClips[name][p][1] = true;
								useUsed = true;
								break;
							}
						}
					}
				}

				if (!useUsed) {
					clp = new GAF.GAFMovieClip(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", name));
					this.mcInitedArrayClips[name].push([clp, true]);
				}
				
			}
			else
			clp = new GAF.GAFMovieClip(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", name));


			//if (false)
			if (playClip)
			for (var a in clp) {
				if (clp[a] != undefined)
				if (clp[a].children != undefined)
				if (clp[a].pluginName == undefined && clp[a].textField == undefined)
				if (clp[a].name == a)
				{
					clp[a].play();
				}
					
			}

			var deepClip = clp;

			var showText = false;


			if (localis)
			for (var clipa in deepClip) {
				if (deepClip[clipa] != undefined) {
					if (deepClip[clipa].textField != undefined && deepClip[clipa].name.indexOf("localisedText") > -1) {
						if (showText) console.log("check1", clipa.length, clipa, deepClip[clipa].textField.text);
						setLocalisedText(clipa);
					}
			
					for (var ca in deepClip[clipa]) {
						var currClp_0 = deepClip[clipa][ca];
						if (currClp_0 != undefined) {
							if (currClp_0.textField != undefined && currClp_0.name != undefined && currClp_0.name.indexOf("localisedText") > -1) {
								if (showText) console.log("check2", currClp_0.textField.text);
								setLocalisedText(currClp_0);
							}
							
							for (var ba in currClp_0) {
								var currClp_1 = currClp_0[ba];

								if (currClp_1 != undefined) {
									if (currClp_1.textField != undefined && currClp_1.name != undefined && currClp_1.name.indexOf("localisedText") > -1) {
										if (showText) console.log("check3", currClp_1.textField.text);
										setLocalisedText(currClp_1);
									}

									for (var fa in currClp_1) {
										var currClp_2 = currClp_1[fa];
										if (currClp_2 != undefined) {
											if (currClp_2.textField != undefined && currClp_2.name != undefined && currClp_2.name.indexOf("localisedText") > -1) {
												if (showText) console.log("check4", currClp_2.textField.text);
												setLocalisedText(currClp_2);
											}

											for (var ia in currClp_2) {
												var currClp_3 = currClp_2[ia];
												if (currClp_3 != undefined) {
													if (currClp_3.textField != undefined && currClp_3.name != undefined && currClp_3.name.indexOf("localisedText") > -1) {
														if (showText) console.log("check5", currClp_3.textField.text);
														setLocalisedText(currClp_3);
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}

			return clp;
			
		}

		public static onResize():void
		{
			if (!Main.renderer) return;

			var gdpi = window.devicePixelRatio;
			gdpi = 1;

			Main.realW = window.innerWidth*gdpi;
			Main.realH = window.innerHeight*gdpi;

			Main.globalScale = Math.min(Main.realW / Main.globalWidth, Main.realH / Main.globalHeight);

			Main.renderer.resize(Main.globalWidth/1, Main.globalHeight/1);
			Main.renderer.view.style.width = Main.globalWidth/gdpi * Main.globalScale + 'px';
			Main.renderer.view.style.height = Main.globalHeight/gdpi * Main.globalScale+ 'px';

			Main.renderer.view.style.position = 'absolute';
			Main.renderer.view.style.left = (Main.realW / 2 - Main.globalWidth * Main.globalScale / 2) + 'px';
			Main.renderer.view.style.top = (Main.realH / 2 - Main.globalHeight * Main.globalScale / 2) + 'px';
		}

		public static removeCustomEfFunc(name):void
		{
			//console.log("remove CustomEfFunc", name, customEfFunc[name]);
			PIXI.ticker.shared.remove(Main.customEfFunc[name], name);
			Main.customEfFunc[name] = undefined;
		}

		public static addCustomEfFunc(name, func):void
		{
			if (name != undefined && func != undefined)
			{
				this.removeCustomEfFunc(name);
				Main.customEfFunc[name] = func;
				PIXI.ticker.shared.add(Main.customEfFunc[name], name);
				//console.log("add CustomEfFunc", name, Main.customEfFunc[name]);
			}
			else console.log("custom func error: func is null", name, func);
		}

		public static changeText(clip_, text_:Array<string>, shadowType:string = "null", addedText:boolean = false):void {

			//console.log("change text", text_, clip_);
			
			if (addedText) clip_.textField.text = clip_.textField.text + text_[0];
			else clip_.textField.text = text_[0];

			//clip_.textField.style.fontFamily = "Lobster";
			clip_.textField.style.fontFamily = "Baloo Paaji";

			if (shadowType != "null")
			{
				if(shadowType == "hp" || shadowType == "speech" || shadowType == "xp")
				{
					clip_.textField.style.stroke = "white";
					clip_.textField.style.strokeThickness = 5;

					//clip_.textField.style.dropShadow = true;
					//clip_.textField.style.dropShadowBlur = 5;
					//clip_.textField.style.dropShadowDistance = 0;
				}
				else if (shadowType == "hpDown")
				{
					clip_.textField.style.stroke = "#CC0033";
					clip_.textField.style.strokeThickness = 8;
				}
			}
			else
			{
				//clip_.textField.style.stroke = "white";
				clip_.textField.style.strokeThickness = 2;

				//clip_.textField.style.dropShadow = true;
				//clip_.textField.style.dropShadowBlur = 5;
				//clip_.textField.style.dropShadowDistance = 0;
			}

			

			if (text_.length > 1)
			{
				var fontRes:number = clip_.textField.style.fontSize;

				if (text_[1].indexOf("+") == 0)
				fontRes += Number(text_[1]);
				else if (text_[1].indexOf("-") == 0)
				fontRes -= Math.abs(Number(text_[1]));
				else
				fontRes = Number(text_[1]);

				if (fontRes < 1) fontRes = 1;
				clip_.textField.style.fontSize = fontRes;
			}
		}
/*
		Visibility.change(function (e, state)
		{
			if (state == "hidden")
			{
				visibilityState = false;

				if (soundMusic != undefined && soundMusic != null)
				{
					soundMusicState = false;
					soundMusic.mute();
				}
			}
			else
			{
				visibilityState = true;

				if (soundMusic != undefined && soundMusic != null)
				if (soundState)
				{
					if (!soundMusicState)
					{
						soundMusicState = true;
						soundMusic.unmute();
					}
				}
			}
		});
		*/
		

		public isLocalStorageAvailable()
		{
			var checkKey = "test", storage = window.sessionStorage;
			try
			{
				storage.setItem(checkKey, "test");
				storage.removeItem(checkKey);
				return true;
			}
			catch (error)
			{
				return false;
			}
		}

		public loadGameProcess()
		{
			if (this.isLocalStorageAvailable()) {
				if (window.localStorage.getItem(Config.SONAME) != undefined)
					return Controller.sharedObjectData = JSON.parse(window.localStorage.getItem(Config.SONAME));
				else return undefined;
			}
		}

		public saveGameProcess()
		{
			if (this.isLocalStorageAvailable()) {
				window.localStorage.setItem(Config.SONAME, JSON.stringify(Controller.sharedObjectData));
			}
		}

		public static convertToPixiGlowFilter(color, alpha:number, blurX:number, blurY:number, strength:number, quality:number, inner:boolean, knockout:boolean)
		{
			//distance, outerStrength, innerStrength, color, quality
			return new PIXI.filters.GlowFilter(blurX*strength, strength, inner ? strength : 0, color, quality);
		}


	}
}

import Main = com.ussgames.game.Main;
module com.ussgames.game
{
	export class Controller
	{
		public static root:any;
		public static main:Main;
		public static transitioner:Transitioner;
		public static sharedObjectData:any;
		public static flags:any;
		public static psbtn:boolean = false;
		
		public static setRoot(rootTimeline:any) {
			Controller.root = rootTimeline;

			this.flags = {};
			this.flags.infoPanels = {};
			this.flags.infoPanels.actionSelectorPanel = false;
			this.flags.infoPanels.enemyInfoPanel = false;
		}
		
		public static init(mainClass:Main, transitionClip:Transitioner):void {
			Controller.main = mainClass;
			Controller.transitioner = transitionClip;
			Transitioner.setRoot(Controller.root);
			
			if (Controller.sharedObjectData == null) {
				Controller.loadSharedObject();
				SoundController.updateSoundButtons();
			}
		}
		
		public static startGame():void {
			Controller.main.startGame();
		}
		
		public static stopGame():void {
			Controller.main.stopGame();
		}
		
		public static selectLevel(level:number = 1):void {
			console.log("run level", level);

			Main.level.setValue(level);
			
			Controller.unlockLevel(level);
			Controller.transitioner.goto("theGame", "Controller.saveSharedObject");
			Controller.startLevel();

			Controller.root.infoPanels.levelNumberPanel.gotoAndStop(Controller.getLevelNumber());
			Controller.root.infoPanels.levelNumberPanel.visible = false;

			Controller.root.tut.visible = false;
			
			if (!Controller.psbtn) {
				Controller.psbtn = true;
				new PauseButton(Controller.root.pauseBtnGame, "theGame");
			}
		}
		
		public static getLevelNumber():number {
			return Main.level.value;
		}
		
		public static startLevel():void {
			Main.startClearAssetCache();

			if (!Main.inGamePanel) Main.inGamePanel = new GamePanel(Controller.root.inGamePanel);;
			Controller.main.initGame();
			Controller.startGame();
			SoundController.playMusic("tune2");

			Main.stopClearAssetCache();
		}
		
		public static newGame():void {
			Main.gamePaused = false;
			GamePanel.panelOpen = false;
			Controller.transitioner.goto("levelSelect");
			Controller.main.resetGame();
		}
		
		public static quitGame():void {
			Controller.stopGame();
			Controller.transitioner.goto("levelSelect", "Controller.main.cleanUp");
		}
		
		public static gameComplete():void {
			Controller.stopGame();
			Controller.transitioner.goto("complete");
		}
		
		public static showGameHelp():void {
			Controller.transitioner.goto("help");
		}
		
		public static showMainMenu():void {
			Controller.transitioner.goto("menu");
		}
		
		public static loadSharedObject():void {
			var mySo = Controller.main.loadGameProcess();
			if (mySo != undefined) {
				Controller.sharedObjectData = mySo;
				SoundController.soundOn = Controller.sharedObjectData.soundOn;
				SoundController.musicOn = Controller.sharedObjectData.musicOn;
				BattleController.initPersistentUnits(Controller.sharedObjectData.unitData);
			} else {
				Controller.sharedObjectData = {};
				Controller.sharedObjectData.soundOn = true;
				Controller.sharedObjectData.musicOn = true;
				Controller.sharedObjectData.levelsUnlocked = new Array();
				Controller.sharedObjectData.levelsUnlocked[0] = true;
				Controller.sharedObjectData.levelScores = new Array();
				Controller.sharedObjectData.levelScores[0] = 0;
				Controller.sharedObjectData.levelMedals = new Array();
				Controller.sharedObjectData.levelMedals[0] = 0;
				for (var i:number = 1; i < Config.NUMBEROFLEVELS; i++) 
				{
					Controller.sharedObjectData.levelsUnlocked[i] = false;
					Controller.sharedObjectData.levelScores[i] = 0;
					Controller.sharedObjectData.levelMedals[i] = 0;
				}
				
				BattleController.initPersistentUnits();
				
				Controller.saveSharedObject();
			}

			console.log("loadSharedObject", Controller.sharedObjectData);
		}
		
		public static saveSoundSettings():void {
			Controller.sharedObjectData.soundOn = SoundController.soundOn;
			Controller.sharedObjectData.musicOn = SoundController.musicOn;
			Controller.saveSharedObject();
		}
		
		public static saveSharedObject():void {
			Controller.sharedObjectData.unitData = BattleController.getPersistendUnitData();
			Controller.main.saveGameProcess();

			console.log("saveSharedObject", Controller.sharedObjectData);
		}
		
		public static isLevelUnlocked(theLevel:number):boolean {
			return Controller.sharedObjectData.levelsUnlocked[theLevel - 1];
		}
		
		public static setLevelScore(theLevel:number, theScore:number) {
			if (theScore>Controller.sharedObjectData.levelScores[theLevel - 1]) {
				Controller.sharedObjectData.levelScores[theLevel - 1] = theScore;
			}
			Controller.saveSharedObject();
		}
		
		public static resetLevelScores() {
			for (var i:number = 0; i < Config.NUMBEROFLEVELS; i++) 
			{
				Controller.sharedObjectData.levelScores[i] = 0;
				Controller.sharedObjectData.levelAllRainbows[i] = false;
			}
			Controller.saveSharedObject();
		}
		
		public static getLevelScore(levelNum:number):number {
			return Controller.sharedObjectData.levelScores[levelNum-1];
		}
		
		public static get_levelMedal(levelNum:number):number {
			return Controller.sharedObjectData.levelMedals[levelNum - 1];
		}
		
		public static set_levelMedal(levelNum:number, medal:number) {
			if (Controller.sharedObjectData.levelMedals[levelNum - 1]<medal) {
				Controller.sharedObjectData.levelMedals[levelNum - 1] = medal;
			}
			Controller.saveSharedObject();
		}
		
		public static getGameEnding():number {
			var gameEnd:number = 4;
			for (var i = 0; i<Config.NUMBEROFLEVELS; i++) 
			{
				if (Controller.sharedObjectData.levelScores[i] == 0) {
					gameEnd = 1;
				}
				if (Controller.sharedObjectData.levelMedals[i] + 1 < gameEnd) {
					gameEnd = Controller.sharedObjectData.levelMedals[i] + 1;
				}
			}
			return gameEnd;
		}
		
		public static getTotalScore():number {
			var currentScore:number = 0;
			for (var i:number = 0; i < Config.NUMBEROFLEVELS; i++) 
			{
				currentScore += Controller.sharedObjectData.levelScores[i];
			}
			return currentScore;
		}
		
		public static unlockLevel(theLevel:number):void {
			Controller.sharedObjectData.levelsUnlocked[theLevel - 1] = true;
			Controller.saveSharedObject();
		}
		
		public static unlockAllLevels() {
			for (var i:number = 0; i < Config.NUMBEROFLEVELS; i++) 
			{
				Controller.sharedObjectData.levelsUnlocked[i] = true;
			}
			Controller.saveSharedObject();
		}
		
		public static resetLevelLocks() {
			Controller.sharedObjectData.levelsUnlocked[0] = true;
			for (var i:number = 1; i < Config.NUMBEROFLEVELS; i++) 
			{
				Controller.sharedObjectData.levelsUnlocked[i] = false;
			}
			Controller.saveSharedObject();
		}
		
		public static currentInGameMusic:number = 2;
		public static playInGameMusic() {
			SoundController.playMusic("tune" + Controller.currentInGameMusic);
			Controller.currentInGameMusic++;
			if (Controller.currentInGameMusic > 3) Controller.currentInGameMusic = 2;
		}
	}
	
}

import Controller = com.ussgames.game.Controller;
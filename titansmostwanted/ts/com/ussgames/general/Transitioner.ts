module com.ussgames.general {

	export class Transitioner extends CustomMovieClip {
		
		public static theRoot:any;
		public frameLabel:string;
		public transEndFunction:string;
		public static upgrade_panel_instance:UpgradePanelContainer;
		public initedLevelBtn:boolean = false;
		public initedCompleteBtn:boolean = false;

		constructor(clip:any) {
			super(clip);
		}
		
		public static setRoot(_root:any):void {
			Transitioner.theRoot = _root;
		}
		
		public goto(frameLabel:string, _transEndFunction:string = null):void {

			if (this.frameLabel == frameLabel) return;

			console.log("Transitioner goto", frameLabel);

			this.transEndFunction = _transEndFunction;
			this.frameLabel = frameLabel;

			//setTimeout(function () {
				Transitioner.theRoot.transition.gotoAndPlay(13);
			//}, 0);
			
			//Transitioner.theRoot.gotoAndStop(this.frameLabel);

			Main.addCustomEfFunc('Transitioner.onEnterFrame', function()
			{
				if (Transitioner.theRoot.transition.currentFrame >= 13)
				{
					Transitioner.theRoot.transition.stop();
					this.transEnd();
					this.frameLabel = "";

					console.log("GOTO trans", frameLabel, _transEndFunction);
				}
				else if (Transitioner.theRoot.transition.currentFrame == 7) {
					Main.removeCustomEfFunc("Transitioner.onEnterFrame");
				}
			}.bind(this));
		}
		
		public transEnd():void {
			console.log("trans end", this.transEndFunction);

			if (this.transEndFunction!=null) {
				if (this.transEndFunction == "Controller.saveSharedObject") Controller.saveSharedObject();
				if (this.transEndFunction == "Controller.main.cleanUp") Controller.main.cleanUp();
				if (this.transEndFunction == "Controller.main.resetLevel") Controller.main.resetLevel();
			}
			if (this.frameLabel != "") {
				Transitioner.theRoot.gotoAndStop(this.frameLabel);
			}

			if (this.frameLabel == "levelSelect")
			{
				if (!this.initedLevelBtn)
				{
					this.initedLevelBtn = true;

					new LevelSelectButton(Controller.root.l1, "levelSelect");
					new LevelSelectButton(Controller.root.l2, "levelSelect");
					new LevelSelectButton(Controller.root.l3, "levelSelect");
					new LevelSelectButton(Controller.root.l4, "levelSelect");
					new LevelSelectButton(Controller.root.l5, "levelSelect");
					new LevelSelectButton(Controller.root.l6, "levelSelect");
					new LevelSelectButton(Controller.root.l7, "levelSelect");
					new LevelSelectButton(Controller.root.l8, "levelSelect");
					new LevelSelectButton(Controller.root.l9, "levelSelect");
					new LevelSelectButton(Controller.root.l10, "levelSelect");
					new LevelSelectButton(Controller.root.l11, "levelSelect");
					new LevelSelectButton(Controller.root.l12, "levelSelect");

					new NextLevelButton(Controller.root.newGame, "levelSelect");
				}

				Controller.root.l1.gotoAndStop(!Controller.isLevelUnlocked(1) ? "locked" : "out");
				Controller.root.l2.gotoAndStop(!Controller.isLevelUnlocked(2) ? "locked" : "out");
				Controller.root.l3.gotoAndStop(!Controller.isLevelUnlocked(3) ? "locked" : "out");
				Controller.root.l4.gotoAndStop(!Controller.isLevelUnlocked(4) ? "locked" : "out");
				Controller.root.l5.gotoAndStop(!Controller.isLevelUnlocked(5) ? "locked" : "out");
				Controller.root.l6.gotoAndStop(!Controller.isLevelUnlocked(6) ? "locked" : "out");
				Controller.root.l7.gotoAndStop(!Controller.isLevelUnlocked(7) ? "locked" : "out");
				Controller.root.l8.gotoAndStop(!Controller.isLevelUnlocked(8) ? "locked" : "out");
				Controller.root.l9.gotoAndStop(!Controller.isLevelUnlocked(9) ? "locked" : "out");
				Controller.root.l10.gotoAndStop(!Controller.isLevelUnlocked(10) ? "locked" : "out");
				Controller.root.l11.gotoAndStop(!Controller.isLevelUnlocked(11) ? "locked" : "out");
				Controller.root.l12.gotoAndStop(!Controller.isLevelUnlocked(12) ? "locked" : "out");
			}
			
			if (this.frameLabel == "levelUp")
			{
				SoundController.playMusic("tune3");
				Transitioner.theRoot.level_up_scene.play();

				if (Transitioner.upgrade_panel_instance == undefined) {
					Transitioner.upgrade_panel_instance = new UpgradePanelContainer(Transitioner.theRoot.level_up_scene.upgrade_panel_container);
				}
				else Transitioner.upgrade_panel_instance.init();
			}

			if (this.frameLabel == "levelOver")
			{
				Transitioner.theRoot.level_over_scene.gotoAndPlay("level"+String(Controller.getLevelNumber()));

				Main.addCustomEfFunc('Transitioner.theRoot.level_over_scene.onEnterFrame', function()
				{
					var allEnds = [121, 209, 284, 359, 445, 520, 595, 670, 758, 846, 1005];

					if (allEnds.indexOf(Transitioner.theRoot.level_over_scene.currentFrame) > -1 ||
						(Transitioner.theRoot.level_over_scene.currentFrame > 990))
					{
						Transitioner.theRoot.level_over_scene.stop();
						Controller.transitioner.goto("levelUp");
						Main.removeCustomEfFunc("Transitioner.theRoot.level_over_scene.onEnterFrame");
					}
				});
			}
			
			if (this.frameLabel == "complete")
			{
				if (!this.initedCompleteBtn) {
					this.initedCompleteBtn = true;
					new MenuButton(Transitioner.theRoot.NextButton_complete, "complete");
				}
			}

			Transitioner.theRoot.transition.gotoAndPlay(1);
		}
	}
}

import Transitioner = com.ussgames.general.Transitioner;
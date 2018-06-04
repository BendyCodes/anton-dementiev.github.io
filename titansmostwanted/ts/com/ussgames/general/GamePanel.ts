module com.ussgames.general
{
	export class GamePanel extends CustomMovieClip
	{
		public static panelOpen:boolean = false;
		public afterCloseFunction:string;
		public inited_tut1:boolean = false;
		public inited_tut2:boolean = false;
		public inited_complete:boolean = false;
		public inited_undoEndAlert:boolean = false;
		public inited_gameover:boolean = false;
		public inited_paused:boolean = false;
		
		constructor(mc) {
			super(mc);
			Main.inGamePanel = this;
		}
		
		public openPanel(panelFrameLabel:string, afterClose:string = null):void {
			console.log("openPanel", panelFrameLabel);

			this.afterCloseFunction = afterClose;
			
			this.instanceClip["panelContent"].gotoAndStop(panelFrameLabel);
			GamePanel.panelOpen = true;
			
			this.instanceClip["panelContent"].visible = true;
			
			if (panelFrameLabel == "tut1") {
				if (!this.inited_tut1) {
					this.inited_tut1 = true;
					new NextLevelButton(this.instanceClip.panelContent.toTutorial1, "theGame");
				}
			}
			else if (panelFrameLabel == "tut2") {
				if (!this.inited_tut2) {
					this.inited_tut2 = true;
					new NextLevelButton(this.instanceClip.panelContent.toTutorial, "theGame");
				}
			}
			else if (panelFrameLabel == "complete") {
				if (!this.inited_complete) {
					this.inited_complete = true;
					new ClosePanelButton(this.instanceClip.panelContent.victory_ok, "theGame");
				}
			}
			else if (panelFrameLabel == "undoEndAlert") {
				if (!this.inited_undoEndAlert) {
					this.inited_undoEndAlert = true;
					new AlertButton(this.instanceClip.panelContent.endTurn, "endTurn", "theGame");
					new AlertButton(this.instanceClip.panelContent.undoMove, "undoMove", "theGame");
					new ClosePanelButton(this.instanceClip.panelContent.undo_cancel, "theGame");
				}
			}
			else if (panelFrameLabel == "gameover") {
				if (!this.inited_gameover) {
					this.inited_gameover = true;
					new RetryLevelButton(this.instanceClip.panelContent.defeat_retry);
					new MenuButtonInGame(this.instanceClip.panelContent.defeat_levels);
				}
			}
			else if (panelFrameLabel == "paused") {
				if (!this.inited_paused) {
					this.inited_paused = true;
					new RetryLevelButton(this.instanceClip.panelContent.pause_retry);
					new MenuButtonInGame(this.instanceClip.panelContent.pause_levels);
					new ClosePanelButton(this.instanceClip.panelContent.pause_close, "theGame");
				}
			}
		}
		
		public closePanel(afterClose:string = null):void {
			if (afterClose != null) {
				this.afterCloseFunction = afterClose;
			}

			this.instanceClip["panelContent"].visible = false;

			console.log("closePanel", afterClose);

			this.executeAfterCloseFunction();
		}
		
		public executeAfterCloseFunction():void {

			GamePanel.panelOpen = false;
			if (this.afterCloseFunction != null) {
				//this.afterCloseFunction();
				//eval(ts.transpile(this.afterCloseFunction()));
				
				switch (this.afterCloseFunction)
				{
					case "BattleController.endTurn": BattleController.endTurn(); break;
					case "BattleController.undo": BattleController.undo(); break;
					case "Controller.quitGame": Controller.quitGame(); break;
					case "BattleController.startTutorial": BattleController.startTutorial(); break;
					case "Main.gamePaused = false": Main.gamePaused = false; break;
					case "Controller.main.retryLevel":
					case "Main.retryLevel": Controller.main.retryLevel(); break;

					case "this.gotoLevelSelect":
						Controller.main.stopGame();
						Controller.transitioner.goto("levelSelect", "Controller.main.cleanUp"); break;

					case "levelComplete_levelUp":
						Controller.transitioner.goto("levelUp", "Controller.main.cleanUp"); break;

					case "levelComplete_levelOver":
						Controller.transitioner.goto("levelOver", "Controller.main.cleanUp"); break;
				}

				console.log("executeAfterCloseFunction", this.afterCloseFunction);
			}
		}
	}
	
}

import GamePanel = com.ussgames.general.GamePanel;
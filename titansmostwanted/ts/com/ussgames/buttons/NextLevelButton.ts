module com.ussgames.buttons {
	
	export class NextLevelButton extends ButtonButton {
		
		constructor(mc, loc) {
			super(mc, loc);
		}
		
		/*override*/ public buttonAction():void {
			console.log("NextLevelButton", this.instanceClip.name);
			
			if (this.instanceClip.name == "nextLevel") {
				if (Controller.getLevelNumber() < com.ussgames.game.Config.NUMBEROFLEVELS) {
					Controller.selectLevel(Controller.getLevelNumber() + 1);
				} else {
					Controller.gameComplete();
				}
			} else
			if (this.instanceClip.name == "toLevelUp") {
				Main.inGamePanel.closePanel();
			} else
			if (this.instanceClip.name == "toTutorial") {
				//Main.inGamePanel.closePanel(BattleController.startTutorial);
				Main.inGamePanel.closePanel("BattleController.startTutorial");
			} else
			if (this.instanceClip.name == "toTutorial1") {
				Main.inGamePanel.closePanel();
			} else
			if (this.instanceClip.name == "newGame") {
				Controller.root.confirmNew.gotoAndStop(2);

				new MenuButton(Controller.root.confirmNew.yesNew, "levelSelect", "yesNew");
				new MenuButton(Controller.root.confirmNew.noNew, "levelSelect", "noNew");
			} else
			if (this.instanceClip.name == "closeTutorial") {
				Controller.root.tut2.gotoAndStop(1);
			}
		}
	}
}

import NextLevelButton = com.ussgames.buttons.NextLevelButton;
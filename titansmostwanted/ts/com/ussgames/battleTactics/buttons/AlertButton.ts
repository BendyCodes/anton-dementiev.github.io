module com.ussgames.battleTactics.buttons {
	
	export class AlertButton extends SimpleButton {

		public name:string = "";
		
		constructor(mc, name:string, loc:string) {
			super(mc);

			this.name = name;
			this.location = loc;
		}
		
		/*override*/ public buttonAction():void {
			if (this.name == "endTurn") {
				Main.inGamePanel.closePanel("BattleController.endTurn");
			} else
			if (this.name == "undoMove") {
				Main.inGamePanel.closePanel("BattleController.undo");
			}
		}
		
	}

}

import AlertButton = com.ussgames.battleTactics.buttons.AlertButton;
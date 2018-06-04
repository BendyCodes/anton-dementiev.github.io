module com.ussgames.battleTactics.buttons {
	
	export class ActionButton extends SimpleButton {
		
		public actionID:number = 1;
		
		constructor(mc) {
			super(mc);
		}
		
		/*override*/ public buttonAction():void {

			BattleController.selectAction(this.actionID);
		}
		
		/*override*/ public over(e:MouseEvent):void {
			Controller.root.infoPanels.actionSelectorPanel.showActionInfo(this.actionID);
			BattleController.showActionGrid_forID(this.actionID);
		}
		
		/*override*/ public out(e:MouseEvent):void {
			if (BattleController.currentPhase != BattleController.ACTIONPHASE) {
				Controller.root.infoPanels.actionSelectorPanel.clearActionInfo();
			}
			BattleController.showActionGrid_forID(0);
		}
		
	}

}

import ActionButton = com.ussgames.battleTactics.buttons.ActionButton;
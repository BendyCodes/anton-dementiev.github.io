module com.ussgames.battleTactics.buttons {
	
	export class EndTurnButton extends SimpleButton {
		
		constructor(mc) {
			super(mc);
		}
		
		/*override*/ public buttonAction():void {
			BattleController.endTurn(true);
		}
		
		/*override*/ public over(e:MouseEvent):void {
			super.over(e);
			
			Main.changeText(Controller.root.infoPanels.actionSelectorPanel.instanceClip.attackDescription, Localizer.getlocalisedText("End the current turn"));
		}
		
		/*override*/ public out(e:MouseEvent):void {
			super.out(e);
			
			Controller.root.infoPanels.actionSelectorPanel.clearActionInfo();
		}
		
	}

}

import EndTurnButton = com.ussgames.battleTactics.buttons.EndTurnButton;
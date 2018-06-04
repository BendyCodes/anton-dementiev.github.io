module com.ussgames.battleTactics.buttons {
	
	export class UndoButton extends SimpleButton {
		
		constructor(mc) {
			super(mc);
		}
		
		/*override*/ public buttonAction():void {
			BattleController.undo(true);
		}
		
		/*override*/ public over(e:MouseEvent):void {
			super.over(e);

			Main.changeText(Controller.root.infoPanels.actionSelectorPanel.instanceClip.attackDescription, Localizer.getlocalisedText("Undo move"));
		}
		
		/*override*/ public out(e:MouseEvent):void {
			super.out(e);
			
			Controller.root.infoPanels.actionSelectorPanel.clearActionInfo();
		}
		
	}

}

import UndoButton = com.ussgames.battleTactics.buttons.UndoButton;
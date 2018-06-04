module com.ussgames.buttons
{
	export class MenuButton extends SimpleButton
	{
		/*override*/ public init():void {
			super.init();
		}
		
		/*override*/ public buttonAction():void {
			if (this.name == "yesNew") {
				BattleController.initPersistentUnits();
				Controller.resetLevelLocks();
				Controller.selectLevel(1);
			}
			else if (this.name == "noNew") {
				Controller.root.confirmNew.gotoAndStop(1);
			} else {
				Controller.showMainMenu();
			}
		}
	}
}

import MenuButton = com.ussgames.buttons.MenuButton;
module com.ussgames.battleTactics.buttons {
	
	export class UnlockActionButton extends ButtonButton {

		public titanid:number;
		
		constructor(mc) {
			super(mc, "levelUp");
		}

		/*override*/ public init(id):void {

			super.init();
			this.titanid = id;
		}
		
		/*override*/ public buttonAction():void {
			Transitioner.upgrade_panel_instance.allUpgr[this.titanid-1].unlockAction();
		}
	}

}

import UnlockActionButton = com.ussgames.battleTactics.buttons.UnlockActionButton;
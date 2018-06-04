module com.ussgames.battleTactics.buttons {

	export class UpgradeHPButton extends ButtonButton {

		public titanid:number;
		
		constructor(mc) {
			super(mc, "levelUp");
		}

		/*override*/ public init(id):void {
			super.init();
			this.titanid = id;
		}
		
		/*override*/ public buttonAction():void {
			Transitioner.upgrade_panel_instance.allUpgr[this.titanid-1].upgradeHP();
		}
		
	}

}

import UpgradeHPButton = com.ussgames.battleTactics.buttons.UpgradeHPButton;
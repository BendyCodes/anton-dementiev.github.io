module com.ussgames.teenTitansBattleQuest {
	
	export class BeastBoyCheetahDash extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 5;
			this.power = 6;
			this.level = 1; // 4;
			this.coolDown = 3;
			this.type = Action.ATTACK;
			this.straightLineOnly = true;
			this.attackMultipleUnits = false;
			this.dashAttack = true;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("CheetahAttackAnim");
			this.adjustBlastClipHeight = false;
			this.canBeCountered = false;
			this.label = "Cheetah Slash";
			this.description = "Dash Attack";
			this.iconFrame = 6;
			
			this.unlockTutorialFrame = 5;
		}
		
	}

}

import BeastBoyCheetahDash = com.ussgames.teenTitansBattleQuest.BeastBoyCheetahDash;
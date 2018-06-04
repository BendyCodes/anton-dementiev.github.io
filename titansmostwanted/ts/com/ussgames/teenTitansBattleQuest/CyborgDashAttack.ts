module com.ussgames.teenTitansBattleQuest {
	
	export class CyborgDashAttack extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 5;
			this.power = 8;
			this.level = 1; //4;
			this.coolDown = 4;
			this.type = Action.ATTACK;
			this.straightLineOnly = true;
			this.attackMultipleUnits = true;
			this.stopAtSurvivorUnit = true;
			this.dashAttack = true;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("CyborgDashAttackAnim");
			this.adjustBlastClipHeight = false;
			this.canBeCountered = false;
			this.label = "Jetpack Bash";
			this.description = "Dash Attack";
			this.iconFrame = 6;
			
			this.unlockTutorialFrame = 4;
		}
		
	}

}

import CyborgDashAttack = com.ussgames.teenTitansBattleQuest.CyborgDashAttack;
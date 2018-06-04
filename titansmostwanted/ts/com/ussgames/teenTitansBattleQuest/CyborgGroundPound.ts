module com.ussgames.teenTitansBattleQuest {
	
	export class CyborgGroundPound extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 2;
			this.power = 2;
			this.level = 1; // 2
			this.coolDown = 2;
			this.type = Action.ATTACK;
			this.battleAnimOffset = 50;
			this.attackMultipleUnits = true;
			this.distanceAffectsPower = true;
			this.canBeCountered = false;
			this.friendlyFire = true;
			this.label = "Ground Pound";
			this.description = "Special Attack";
			this.supplementalInfo = "(affects surrounding squares)";
			this.iconFrame = 7;
			
			this.unlockTutorialFrame = 3;
		}
		
	}

}

import CyborgGroundPound = com.ussgames.teenTitansBattleQuest.CyborgGroundPound;
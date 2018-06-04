module com.ussgames.teenTitansBattleQuest {
	
	export class RobinStaffAttack extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 6;
			this.level = 1; // 3;
			this.coolDown = 2;
			this.type = Action.ATTACK;
			
			this.label = "Staff Smash";
			this.description = "Melee Attack";
			this.iconFrame = 1;
		}
		
	}

}

import RobinStaffAttack = com.ussgames.teenTitansBattleQuest.RobinStaffAttack;
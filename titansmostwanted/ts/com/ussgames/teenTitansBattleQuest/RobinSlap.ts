module com.ussgames.teenTitansBattleQuest {
	
	export class RobinSlap extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 2;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.label = "Punch";
			this.description = "Melee Attack";
			this.iconFrame = 1;
		}
	}

}

import RobinSlap = com.ussgames.teenTitansBattleQuest.RobinSlap;
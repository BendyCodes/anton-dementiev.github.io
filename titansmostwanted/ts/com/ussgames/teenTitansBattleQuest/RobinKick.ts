module com.ussgames.teenTitansBattleQuest {
	
	export class RobinKick extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 4;
			this.level = 1; // 2;
			this.coolDown = 1;
			this.type = Action.ATTACK;
			
			this.label = "Jump Kick";
			this.description = "Melee Attack";
			this.iconFrame = 1;
		}
		
	}

}

import RobinKick = com.ussgames.teenTitansBattleQuest.RobinKick;
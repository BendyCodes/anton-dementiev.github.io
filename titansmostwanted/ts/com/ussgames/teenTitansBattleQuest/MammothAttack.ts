module com.ussgames.teenTitansBattleQuest {
	
	export class MammothAttack extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 6;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.label = "Power Punch";
			this.description = "Short range";
			this.iconFrame = 1;
		}
		
	}

}

import MammothAttack = com.ussgames.teenTitansBattleQuest.MammothAttack;
module com.ussgames.teenTitansBattleQuest {
	
	export class CyborgFistSmash extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 3;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			this.battleAnimOffset = 50;
			this.label = "Punch";
			this.description = "Melee Attack";
			this.iconFrame = 1;
		}
	}

}

import CyborgFistSmash = com.ussgames.teenTitansBattleQuest.CyborgFistSmash;
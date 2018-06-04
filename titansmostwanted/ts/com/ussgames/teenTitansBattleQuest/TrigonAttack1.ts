module com.ussgames.teenTitansBattleQuest {
	
	export class TrigonAttack1 extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 8;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			this.battleAnimOffset = 50;
			this.label = "Flick";
			this.iconFrame = 1;
		}
		
	}

}

import TrigonAttack1 = com.ussgames.teenTitansBattleQuest.TrigonAttack1;
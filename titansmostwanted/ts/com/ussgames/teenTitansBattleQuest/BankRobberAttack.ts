module com.ussgames.teenTitansBattleQuest {
	
	export class BankRobberAttack extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 1;
			this.power = 1;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.label = "Punch";
			this.description = "Short range";
			this.iconFrame = 1;
		}
		
	}

}

import BankRobberAttack = com.ussgames.teenTitansBattleQuest.BankRobberAttack;
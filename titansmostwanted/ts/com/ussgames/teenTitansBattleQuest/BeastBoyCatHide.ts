module com.ussgames.teenTitansBattleQuest {
	
	export class BeastBoyCatHide extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 0;
			this.maxRange = 0;
			this.power = 0;
			this.level = 1; //2;
			this.coolDown = 1;
			this.type = Action.SELF;
			
			this.label = "Kitty Camo";
			this.description = "Special Action";
			this.iconFrame = 3;
		}
		
		/*override*/ public performSelfAction(thisUnit:UnitInPlay):boolean {
			thisUnit.attackable = false;
			return true;
		}
		
	}

}

import BeastBoyCatHide = com.ussgames.teenTitansBattleQuest.BeastBoyCatHide;
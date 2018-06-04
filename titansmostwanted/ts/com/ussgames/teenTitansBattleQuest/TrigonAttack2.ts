module com.ussgames.teenTitansBattleQuest {
	
	export class TrigonAttack2 extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 6;
			this.power = 1000;
			this.level = 1;
			this.coolDown = 3;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("TrigonVortexBlastAnim");
			this.adjustBlastClipHeight = false;
			this.placeBlastClipBehind = true;
			this.label = "Mega Blast";
			this.iconFrame = 5;
		}
		
	}

}

import TrigonAttack2 = com.ussgames.teenTitansBattleQuest.TrigonAttack2;
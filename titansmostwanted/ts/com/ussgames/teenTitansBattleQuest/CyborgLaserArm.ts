module com.ussgames.teenTitansBattleQuest {
	
	export class CyborgLaserArm extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 4;
			this.power = 4;
			this.level = 1; // 3
			this.coolDown = 3;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("CyborgLaserAnim");
			this.label = "Sonic Cannon";
			this.description = "Range Attack";
			this.iconFrame = 2;
		}
		
	}

}

import CyborgLaserArm = com.ussgames.teenTitansBattleQuest.CyborgLaserArm;
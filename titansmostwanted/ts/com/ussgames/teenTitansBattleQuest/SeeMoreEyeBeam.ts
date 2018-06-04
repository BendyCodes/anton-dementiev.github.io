module com.ussgames.teenTitansBattleQuest {
	
	export class SeeMoreEyeBeam extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 3;
			this.power = 4;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("SeeMoreBlastAnim");
			this.label = "Laser Eye";
			this.iconFrame = 2;
		}
		
	}

}

import SeeMoreEyeBeam = com.ussgames.teenTitansBattleQuest.SeeMoreEyeBeam;
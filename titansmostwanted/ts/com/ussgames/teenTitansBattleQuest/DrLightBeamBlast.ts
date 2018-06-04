module com.ussgames.teenTitansBattleQuest {
	
	export class DrLightBeamBlast extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 5;
			this.power = 3;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("LightBeamBlastAnim");
			this.label = "Beam Blast";
			this.iconFrame = 2;
		}
		
	}

}

import DrLightBeamBlast = com.ussgames.teenTitansBattleQuest.DrLightBeamBlast;
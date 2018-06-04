module com.ussgames.teenTitansBattleQuest {
	
	export class DrLightBeamBlastHolo extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 3;
			this.power = 2;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("LightBeamBlastAnim");
			this.label = "Holo Beam Blast";
			this.iconFrame = 2;
		}
		
	}

}

import DrLightBeamBlastHolo = com.ussgames.teenTitansBattleQuest.DrLightBeamBlastHolo;
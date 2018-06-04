module com.ussgames.teenTitansBattleQuest {
	
	export class StarfireLaserEyes extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 3;
			this.power = 4;
			this.level = 1; // 2;
			this.coolDown = 2;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("LaserEyesAnim");
			this.label = "Eyebeams";
			this.description = "Range Attack";
			this.iconFrame = 2;
		}
		
	}

}

import StarfireLaserEyes = com.ussgames.teenTitansBattleQuest.StarfireLaserEyes;
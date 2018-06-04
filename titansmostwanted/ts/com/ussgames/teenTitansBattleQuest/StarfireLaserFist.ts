module com.ussgames.teenTitansBattleQuest {
	
	export class StarfireLaserFist extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 3;
			this.power = 3;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("LaserFistsAnim");
			this.label = "Starbolts";
			this.description = "Range Attack";
			this.iconFrame = 2;
		}
		
	}

}

import StarfireLaserFist = com.ussgames.teenTitansBattleQuest.StarfireLaserFist;
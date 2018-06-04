module com.ussgames.teenTitansBattleQuest {
	
	export class StarfireMegaFist extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 4;
			this.power = 6;
			this.level = 1; // 4;
			this.coolDown = 3;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("LaserFists2Anim");
			this.label = "Starblast";
			this.description = "Range Attack";
			this.iconFrame = 2;
		}
		
	}

}

import StarfireMegaFist = com.ussgames.teenTitansBattleQuest.StarfireMegaFist;
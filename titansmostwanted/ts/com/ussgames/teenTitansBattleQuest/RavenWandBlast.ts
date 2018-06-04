module com.ussgames.teenTitansBattleQuest {
	
	export class RavenWandBlast extends Action {
		
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
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("WandBlastAnim");
			this.label = "Dark Energy";
			this.description = "Range Attack";
			this.iconFrame = 2;
		}
		
	}

}

import RavenWandBlast = com.ussgames.teenTitansBattleQuest.RavenWandBlast;
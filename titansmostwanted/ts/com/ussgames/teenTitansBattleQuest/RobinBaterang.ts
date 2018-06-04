module com.ussgames.teenTitansBattleQuest {
	
	export class RobinBaterang extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 4;
			this.power = 4;
			this.level = 1;
			this.coolDown = 3;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("BatarangAnim");
			this.label = "Birdarang";
			this.description = "Range Attack";
			this.iconFrame = 2;
		}
		
	}

}

import RobinBaterang = com.ussgames.teenTitansBattleQuest.RobinBaterang;
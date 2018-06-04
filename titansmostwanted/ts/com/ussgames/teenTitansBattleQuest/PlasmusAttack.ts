module com.ussgames.teenTitansBattleQuest {
	
	export class PlasmusAttack extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 6;
			this.power = 8;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			this.straightLineOnly = true;
			this.attackMultipleUnits = true;
			this.friendlyFire = true;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("PlasmusFlameBlast");
			this.adjustBlastClipHeight = false;
			this.label = "Line of Fire";
			this.iconFrame = 2;
		}
		
	}

}

import PlasmusAttack = com.ussgames.teenTitansBattleQuest.PlasmusAttack;
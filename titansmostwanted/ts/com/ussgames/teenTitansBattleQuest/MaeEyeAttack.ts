module com.ussgames.teenTitansBattleQuest {

	export class MaeEyeAttack extends Action {
		
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
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("MayEyePieAttackAnim");
			this.label = "Pie Toss";
		}
		
	}

}

import MaeEyeAttack = com.ussgames.teenTitansBattleQuest.MaeEyeAttack;
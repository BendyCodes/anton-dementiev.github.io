module com.ussgames.teenTitansBattleQuest {
	
	export class GizmoAttack extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 3;
			this.power = 5;
			this.level = 1;
			this.coolDown = 0;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("SpannerThrowAnim");
			this.label = "Wrench Throw";
			this.iconFrame = 2;
		}
		
	}

}

import GizmoAttack = com.ussgames.teenTitansBattleQuest.GizmoAttack;
module com.ussgames.teenTitansBattleQuest {
	
	export class KamikazePieAttack extends Action {
		
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
			this.canBeCountered = false;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("MayEyePieAttackAnim");
			this.label = "Kamikaze";
			this.iconFrame = 2;
		}
		
		/*override*/ public actionEnded(thisUnit:UnitInPlay, map:BTMap):void {
			//super.actionEnded(thisUnit, map);
			thisUnit.currentHP = 0;
		}
		
	}

}

import KamikazePieAttack = com.ussgames.teenTitansBattleQuest.KamikazePieAttack;
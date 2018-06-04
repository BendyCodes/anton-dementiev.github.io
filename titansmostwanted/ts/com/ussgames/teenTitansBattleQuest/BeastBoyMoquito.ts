module com.ussgames.teenTitansBattleQuest {
	
	export class BeastBoyMoquito extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 1;
			this.maxRange = 2;
			this.power = 0;
			this.level = 1; // 3;
			this.coolDown = 2;
			this.type = Action.ATTACK;
			this.attackMultipleUnits = true;
			
			this.poisonTurns = 999;
			this.poisonPower = 1;
			this.canBeCountered = false;
			
			this.useStandardDamagePerc = false;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("MozzieAnim");
			this.label = "Moquito Bite";
			this.description = "Poison Attack";
			this.supplementalInfo = "(affects surrounding squares)";
			this.iconFrame = 8;
			
			this.unlockTutorialFrame = 2;
		}
		
		/*override*/ public alternateDamageDisplay(attackingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap):string {
			return "POISON";
		}
		
	}

}

import BeastBoyMoquito = com.ussgames.teenTitansBattleQuest.BeastBoyMoquito;
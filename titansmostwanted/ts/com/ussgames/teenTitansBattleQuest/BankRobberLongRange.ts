module com.ussgames.teenTitansBattleQuest {
	
	export class BankRobberLongRange extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Catapult Thug";
			
			this.MP = 2;
			this.HP = 4;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("LongRangeThug");
			
			this.unitActions.push(new BankRobberLongRngeAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("Thug2AttackAnims");
			
			this.villainInfoLabel = "ThugRange";
		}
		
	}

}

import BankRobberLongRange = com.ussgames.teenTitansBattleQuest.BankRobberLongRange;
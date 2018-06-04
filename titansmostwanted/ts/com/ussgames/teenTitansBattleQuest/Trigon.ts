module com.ussgames.teenTitansBattleQuest {
	
	export class Trigon extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Trigon";
			
			this.MP = 2;
			this.HP = 40;
			
			this.movementCosts = [1, 1, 1, 1, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("TrigonAnims");
			
			this.unitActions.push(new TrigonAttack1, new TrigonAttack2);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("TrigonAttackAnims");
			
			this.villainInfoLabel = "Trigon";
		}
		
	}

}

import Trigon = com.ussgames.teenTitansBattleQuest.Trigon;
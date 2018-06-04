module com.ussgames.teenTitansBattleQuest {
	
	export class KamikazePie extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Magic Pie";
			
			this.MP = 0;
			this.HP = 1;
			
			this.movementCosts = [1, 1, 1, 1, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("KamikazePieAnims");
			
			this.unitActions.push(new KamikazePieAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("PieAttackAnims");
			
			this.villainInfoLabel = "Pie";
		}
		
	}

}

import KamikazePie = com.ussgames.teenTitansBattleQuest.KamikazePie;
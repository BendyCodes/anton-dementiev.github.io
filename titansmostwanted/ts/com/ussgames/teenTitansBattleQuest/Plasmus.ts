module com.ussgames.teenTitansBattleQuest {
	
	export class Plasmus extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Plasmus";
			
			this.MP = 1;
			this.HP = 20;
			
			this.movementCosts = [1, 1, 1, 1, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("PlasmusClip");
			
			this.unitActions.push(new PlasmusAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("PlasmusAttackAnims");
			
			this.villainInfoLabel = "Plasmus";
		}
		
	}

}

import Plasmus = com.ussgames.teenTitansBattleQuest.Plasmus;
module com.ussgames.teenTitansBattleQuest {
	
	export class Mammoth extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Mammoth";
			
			this.MP = 2;
			this.HP = 20;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("MammothAnims");
			
			this.unitActions.push(new MammothAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("MammothAttackAnims");
			
			this.villainInfoLabel = "Mammoth";
		}
		
	}

}

import Mammoth = com.ussgames.teenTitansBattleQuest.Mammoth;
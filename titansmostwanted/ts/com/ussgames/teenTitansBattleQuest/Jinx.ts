module com.ussgames.teenTitansBattleQuest {
	
	export class Jinx extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Jinx";
			
			this.MP = 3;
			this.HP = 10;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("JinxAnims");
			
			this.unitActions.push(new JinxKick, new JinxHex);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("JinxAttackAnims");
			
			this.villainInfoLabel = "Jinx";
		}
		
	}

}

import Jinx = com.ussgames.teenTitansBattleQuest.Jinx;
module com.ussgames.teenTitansBattleQuest {
	
	export class Demon extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Demon";
			
			this.MP = 3;
			this.HP = 5;
			this.flys = true;
			
			this.movementCosts = [1, 1, 1, 1, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("DemonBaddieClip");
			
			this.unitActions.push(new DemonScare);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("DemonAttackAnims");
			
			this.villainInfoLabel = "Demon";
		}
		
	}

}

import Demon = com.ussgames.teenTitansBattleQuest.Demon;
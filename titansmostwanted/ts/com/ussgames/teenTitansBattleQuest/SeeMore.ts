module com.ussgames.teenTitansBattleQuest {
	
	export class SeeMore extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "See More";
			
			this.MP = 2;
			this.HP = 8;
			this.movementSpeed = 4;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("SeeMoreAnims");
			
			this.unitActions.push(new SeeMoreEyeBeam);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("SeeMoreAttackAnims");
			
			this.villainInfoLabel = "See-More";
		}
	}

}

import SeeMore = com.ussgames.teenTitansBattleQuest.SeeMore;
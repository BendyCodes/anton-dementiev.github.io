module com.ussgames.teenTitansBattleQuest {
	
	export class Cyborg extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Cyborg";
			this.description = "Part man, part robot, Cyborg has superhuman strength";
			this.frameLabel = "cyborg";
			
			this.HP = 8;
			this.MP = 3;
			this.movementSpeed = 8;
			
			this.movementCosts = [1, 1, 0, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("CyborgPlaceHolder");
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("CyborgAttackAnims");
			
			this.unitActions.push(new CyborgFistSmash, new CyborgGroundPound, new CyborgLaserArm, new CyborgDashAttack);
		}
		
	}
}

import Cyborg = com.ussgames.teenTitansBattleQuest.Cyborg;
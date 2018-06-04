module com.ussgames.teenTitansBattleQuest {
	
	export class Starfire extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Starfire";
			this.description = "Friendly alien princess, quick with long range attacks";
			this.frameLabel = "starfire";
			
			this.MP = 3;
			this.HP = 4;
			this.movementSpeed = 8;
			
			this.movementCosts = [1, 1, 1, 1, 1];
			this.flys = true;
			
			this.movieClipClass = Main.addGAFMovieClip("StarfirePlaceHolder");
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("StarfireAttackAnims");
			
			this.unitActions.push(new StarfireLaserFist, new StarfireLaserEyes, new StarfireEvade, new StarfireMegaFist);
		}
		
	}

}

import Starfire = com.ussgames.teenTitansBattleQuest.Starfire;
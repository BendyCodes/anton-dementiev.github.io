module com.ussgames.teenTitansBattleQuest {
	
	export class Raven extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Raven";
			this.description = "Part Demon, has range attack and magical abilites";
			this.frameLabel = "raven";
			
			this.MP = 2;
			this.HP = 5;
			this.movementSpeed = 4;
			this.flys = true;
			
			this.movementCosts = [1, 1, 1, 1, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("RavenPlaceHolder");
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("RavenAttackAnims");
			
			this.unitActions.push(new RavenWandBlast, new RavenHeal, new RavenTeleport, new RavenBlackHole);
		}
		
	}

}

import Raven = com.ussgames.teenTitansBattleQuest.Raven;
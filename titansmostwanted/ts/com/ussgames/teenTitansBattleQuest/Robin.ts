module com.ussgames.teenTitansBattleQuest {
	
	export class Robin extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Robin";
			this.description = "Leader of the Teen Titans, a good all rounder";
			this.frameLabel = "robin";
			
			this.HP = 6;
			this.MP = 3;
			this.movementSpeed = 8;
			
			this.movementCosts = [1, 1, 3, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("RobinPlaceHolder");
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("RobinAttackAnims");
			
			this.unitActions.push(new RobinSlap, new RobinKick, new RobinStaffAttack, new RobinBaterang);
		}
		
	}

}

import Robin = com.ussgames.teenTitansBattleQuest.Robin;
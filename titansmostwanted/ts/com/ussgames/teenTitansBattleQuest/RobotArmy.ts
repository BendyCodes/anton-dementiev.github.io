module com.ussgames.teenTitansBattleQuest {
	
	export class RobotArmy extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Robot";
			
			this.MP = 2;
			this.HP = 6;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("RobotAnims");
			
			this.unitActions.push(new RobotAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("RobotAttackAnims");
			
			this.villainInfoLabel = "RobotSoldier";
		}
		
	}

}

import RobotArmy = com.ussgames.teenTitansBattleQuest.RobotArmy;
module com.ussgames.teenTitansBattleQuest {
	
	export class BankRobber extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Thug";
			
			this.MP = 2;
			this.HP = 3;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("BaddiePlaceHolder");
			
			this.unitActions.push(new BankRobberAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("Thug1AttackAnims");
			
			this.villainInfoLabel = "Thug";
		}
		
	}

}

import BankRobber = com.ussgames.teenTitansBattleQuest.BankRobber;
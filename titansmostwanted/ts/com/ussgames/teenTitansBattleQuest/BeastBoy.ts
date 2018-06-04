module com.ussgames.teenTitansBattleQuest {
	
	export class BeastBoy extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Beast Boy";
			this.description = "Loves burritos, turns into animals to attack and evade";
			this.frameLabel = "beastboy";
			
			this.HP = 6;
			this.MP = 3;
			this.movementSpeed = 8;
			
			this.movementCosts = [1, 1, 1, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("BeastBoyPlaceHolder");
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("BeastBoyAttackAnims");
			
			this.unitActions.push(new BeastBoyGorillaPunch, new BeastBoyCatHide, new BeastBoyMoquito, new BeastBoyCheetahDash);
		}
		
	}

}

import BeastBoy = com.ussgames.teenTitansBattleQuest.BeastBoy;
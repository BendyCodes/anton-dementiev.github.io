module com.ussgames.teenTitansBattleQuest {
	
	export class BillyNumerous extends Unit {
		public static duplicated:boolean = false;
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Billy Numerous";
			
			this.MP = 1;
			this.HP = 6;
			
			this.movementCosts = [1, 1, 1, 1, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("BillyNumerousAnims");
			
			this.unitActions.push(new BillyNumerousKick);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("NumerousAttackAnims");
			
			this.villainInfoLabel = "Bill";
		}
		
		/*override*/ public beforeMoveFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			if (!BillyNumerous.duplicated && (unitInPlay.mapX != unitInPlay.movedFromX || unitInPlay.mapY != unitInPlay.movedFromY)) {
				var newUnit:Unit = new BillyNumerous;
				newUnit.init();
				newUnit.initUnlockedActions(true);
				newUnit.id = Config.unitConfigs.indexOf(BillyNumerous);
				
				var newUnitInPlay:UnitInPlay = new UnitInPlay();
				newUnitInPlay.init(newUnit, unitInPlay.movedFromX, unitInPlay.movedFromY, unitInPlay.team, unitInPlay.ai);
				newUnitInPlay.actioned = true;
				
				map.unitsInPlay.push(newUnitInPlay);
				
				map.addUnitToView(newUnitInPlay);
				
				BillyNumerous.duplicated = true;
			}
		}
		
		/*override*/ public startOfTeamsTurnFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			BillyNumerous.duplicated = false;
		}
		
	}

}

import BillyNumerous = com.ussgames.teenTitansBattleQuest.BillyNumerous;
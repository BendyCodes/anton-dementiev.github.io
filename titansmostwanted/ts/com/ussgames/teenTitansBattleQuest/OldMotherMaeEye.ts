module com.ussgames.teenTitansBattleQuest {
	
	export class OldMotherMaeEye extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Mother Mae-Eye";
			
			this.MP = 3;
			this.HP = 10;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("MotherMayEye");
			
			this.unitActions.push(new MaeEyeAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("MaeEyeAttackAnims");
			
			this.villainInfoLabel = "Mother";
		}
		
		/*override*/ public beforeMoveFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			if ((unitInPlay.mapX != unitInPlay.movedFromX || unitInPlay.mapY != unitInPlay.movedFromY)) {
				var newUnit:Unit = new KamikazePie;
				newUnit.init();
				newUnit.initUnlockedActions(true);
				newUnit.id = Config.unitConfigs.indexOf(KamikazePie);
				
				var newUnitInPlay:UnitInPlay = new UnitInPlay();
				newUnitInPlay.init(newUnit, unitInPlay.movedFromX, unitInPlay.movedFromY, unitInPlay.team, unitInPlay.ai);
				newUnitInPlay.actioned = true;
				
				map.unitsInPlay.push(newUnitInPlay);
				
				map.addUnitToView(newUnitInPlay);
			}
		}
		
		/*override*/ public noHPLeftFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (map.unitsInPlay[i].unit instanceof KamikazePie) {
					map.unitsInPlay[i].currentHP = 0;

					Main.changeText(map.unitsInPlay[i].clip.hp, ["0"]);
				}
			}
		}
		
	}

}

import OldMotherMaeEye = com.ussgames.teenTitansBattleQuest.OldMotherMaeEye;
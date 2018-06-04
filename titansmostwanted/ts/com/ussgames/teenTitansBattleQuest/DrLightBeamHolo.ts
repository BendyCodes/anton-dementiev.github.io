module com.ussgames.teenTitansBattleQuest {
	
	export class DrLightBeamHolo extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Holo Dr. Lightbeam";
			
			this.MP = 2;
			this.HP = 3;
			this.movementSpeed = 4;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("LightbeamAnims_holo");
			
			this.unitActions.push(new DrLightBeamBlastHolo);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("DrLightHoloAttackAnims");
			
			this.villainInfoLabel = "Hologram";
		}
		
	}

}

import DrLightBeamHolo = com.ussgames.teenTitansBattleQuest.DrLightBeamHolo;
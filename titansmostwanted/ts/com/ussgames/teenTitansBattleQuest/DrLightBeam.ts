module com.ussgames.teenTitansBattleQuest {
	
	export class DrLightBeam extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Dr. Lightbeam";
			
			this.MP = 2;
			this.HP = 6;
			this.movementSpeed = 4;
			
			this.movementCosts = [1, 1, 2, 2, 0];
			
			this.movieClipClass = Main.addGAFMovieClip("LightbeamAnims");
			
			this.unitActions.push(new DrLightBeamBlast);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("DrLightAttackAnims");
			
			this.villainInfoLabel = "DrLight";
		}
		
	}

}

import DrLightBeam = com.ussgames.teenTitansBattleQuest.DrLightBeam;
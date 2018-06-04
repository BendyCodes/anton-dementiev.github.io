module com.ussgames.teenTitansBattleQuest {
	
	export class Gizmo extends Unit {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.label = "Gizmo";
			
			this.MP = 3;
			this.HP = 10;
			this.movementSpeed = 8;
			
			this.movementCosts = [1, 1, 1, 1, 1];
			this.flys = true;
			
			this.movieClipClass = Main.addGAFMovieClip("GizmoAnims");
			
			this.unitActions.push(new GizmoAttack);
			
			this.useNewAttackAnim = true;
			this.newAttackAnimClipClass = Main.addGAFMovieClip("GizmoAttackAnims");
			
			this.villainInfoLabel = "Gizmo";
		}
		
	}

}

import Gizmo = com.ussgames.teenTitansBattleQuest.Gizmo;
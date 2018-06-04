module com.ussgames.battleTactics {
	
	export class EndTurnAction extends Action {
		
		constructor() {
			super();
			this.coolDown = 0;
			this.label = "End Turn";
		}
	}
}

import EndTurnAction = com.ussgames.battleTactics.EndTurnAction;
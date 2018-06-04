module com.ussgames.battleTactics {
	
	export class AIAction {
		public score:number;
		public actionType:number;
		public mapTargetX:number;
		public mapTargetY:number;
		public distance:number;
		public otherUnit:UnitInPlay;
		public actionID:number = 0;
		
		constructor() {
			
		}
		
	}

}
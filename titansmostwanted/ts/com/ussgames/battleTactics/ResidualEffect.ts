module com.ussgames.battleTactics {
	
	export class ResidualEffect {
		
		public effectCountDown:number = 0;
		public effectLive:boolean = false;
		public effectClip:any;
		
		public originatingUnit:UnitInPlay;
		public mapX:number;
		public mapY:number;
		
		constructor() {
			
		}
		
		public init(map:BTMap, originatingUnit:UnitInPlay, mapX:number, mapY:number):void {
			this.originatingUnit = originatingUnit;
			this.mapX = mapX;
			this.mapY = mapY;
			this.effectLive = true;
		}
		
		public update(map:BTMap):void {
			
		}
		
		public endTeamTurn(team:number, map:BTMap):void {
			
		}
		
	}

}

import ResidualEffect = com.ussgames.battleTactics.ResidualEffect;
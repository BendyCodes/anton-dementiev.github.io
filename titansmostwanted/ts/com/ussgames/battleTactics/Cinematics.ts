module com.ussgames.battleTactics {
	
	export class Cinematics {
		
		public static speechBubbleCount:number = -1;
		public static cinematicEvents:any[];
		public static cinematicsRunning:boolean = false;
		public static level:number = 0;
		
		constructor() {
			
		}
		
		public init():void {
			
		}
		
		public static initCinematicUnits(map:BTMap) {
			Cinematics.cinematicsRunning = false;
			Cinematics.level = Controller.getLevelNumber() - 1;
			if (Cinematics.cinematicEvents && Cinematics.cinematicEvents.length >= Cinematics.level) {
				for (var i:number = 0; i < map.unitsInPlay.length; i++) {
					for (var j:number = 0; j < Cinematics.cinematicEvents[Cinematics.level].length; j++) {
						if (Cinematics.cinematicEvents[Cinematics.level][j].baddieIDs.indexOf(map.unitsInPlay[i].unit.id) >= 0) {
							map.unitsInPlay[i].clip.visible = false;
							Cinematics.cinematicsRunning = true;
						}
					}
				}
			}
		}
		
		public static triggerCinematic(map:BTMap):boolean {
			var cinematicTriggered:boolean = false;
			Cinematics.speechBubbleCount++;
			
			if (Cinematics.cinematicEvents && Cinematics.cinematicEvents.length >= Cinematics.level) {
				for (var i:number = 0; i < map.unitsInPlay.length; i++) {
					for (var j:number = 0; j < Cinematics.cinematicEvents[Cinematics.level].length; j++) {
						if (Cinematics.cinematicEvents[Cinematics.level][j].afterSpeech == Cinematics.speechBubbleCount && Cinematics.cinematicEvents[Cinematics.level][j].baddieIDs.indexOf(map.unitsInPlay[i].unit.id)>=0) {
							var destX:number = map.unitsInPlay[i].mapX;
							var destY:number = map.unitsInPlay[i].mapY;
							
							if (destX >= 5) {
								map.unitsInPlay[i].mapX = 11;
							} else {
								map.unitsInPlay[i].mapX = -1;
							}
							
							map.unitsInPlay[i].updateClipPosition(map);
							map.unitsInPlay[i].moveTo(destX, destY, map, false);
							
							map.unitsInPlay[i].clip.visible = true;
							
							cinematicTriggered = true;
						}
					}
				}
			}
			
			return cinematicTriggered;
		}
		
		public static update(map:BTMap):boolean {
			var allMoved:boolean = true;
			
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (map.unitsInPlay[i].state == UnitInPlay.MOVINGINTOPOSITION) {
					if (map.unitsInPlay[i].moveIntoPosition(map, false)) {
						map.unitsInPlay[i].state = UnitInPlay.IDLE;
						map.unitsInPlay[i].update();
						map.unitsInPlay[i].movedFromX = map.unitsInPlay[i].mapX;
						map.unitsInPlay[i].movedFromY = map.unitsInPlay[i].mapY;
					} else {
						map.unitsInPlay[i].update();
						allMoved = false;
					}
				}
			}
			
			return allMoved;
		}
		
	}

}

import Cinematics = com.ussgames.battleTactics.Cinematics;
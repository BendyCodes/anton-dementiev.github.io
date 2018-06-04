module com.ussgames.teenTitansBattleQuest.TitansCinematics {
	
	export class TitansCinematicInitialiser extends Cinematics {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			Cinematics.speechBubbleCount = 0;
			Cinematics.cinematicEvents = [[], [new Level2Cine], [], [], [new Level5Cine, new Level5Cine2], [], [new Level7Cine], [new Level8Cine], [], [], [new Level11Cine, new Level11Cine2], []];
			for (var i:number = 0; i < Cinematics.cinematicEvents.length; i++) {
				for (var j:number = 0; j < Cinematics.cinematicEvents[i].length; j++) {
					if (Cinematics.cinematicEvents[i][j]) {
						Cinematics.cinematicEvents[i][j].init();
					}
				}
			}
		}
		
	}

}

import TitansCinematicInitialiser = com.ussgames.teenTitansBattleQuest.TitansCinematics.TitansCinematicInitialiser;
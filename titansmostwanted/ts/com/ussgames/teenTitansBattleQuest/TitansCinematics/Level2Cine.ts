module com.ussgames.teenTitansBattleQuest.TitansCinematics {
	
	export class Level2Cine extends CinematicEvent {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.baddieIDs = [5, 15];
			this.afterSpeech = 2;
		}
	}

}
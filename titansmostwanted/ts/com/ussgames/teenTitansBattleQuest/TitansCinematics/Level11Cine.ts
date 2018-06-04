module com.ussgames.teenTitansBattleQuest.TitansCinematics {
	
	export class Level11Cine extends CinematicEvent {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.baddieIDs = [13];
			this.afterSpeech = 1;
		}
		
	}

}
module com.ussgames.teenTitansBattleQuest.TitansCinematics {
	
	export class Level5Cine extends CinematicEvent {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.baddieIDs = [0,1,2,3,4];
			this.afterSpeech = 1;
		}
		
	}

}
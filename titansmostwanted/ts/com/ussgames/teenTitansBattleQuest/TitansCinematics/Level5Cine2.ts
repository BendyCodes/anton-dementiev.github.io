module com.ussgames.teenTitansBattleQuest.TitansCinematics {
	
	export class Level5Cine2 extends CinematicEvent {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.baddieIDs = [17];
			this.afterSpeech = 3;
		}
		
	}

}
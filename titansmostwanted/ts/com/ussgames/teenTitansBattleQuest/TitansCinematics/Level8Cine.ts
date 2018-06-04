module com.ussgames.teenTitansBattleQuest.TitansCinematics {

	export class Level8Cine extends CinematicEvent {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.baddieIDs = [5, 15, 19];
			this.afterSpeech = 2;
		}
		
	}

}
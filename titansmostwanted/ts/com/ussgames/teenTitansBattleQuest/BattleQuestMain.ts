module com.ussgames.teenTitansBattleQuest {
	
	export class BattleQuestMain extends Main {
		
		public battleQuestMap:BTMap;
		public static levelToPlay:string = "";
		
		constructor() {
			super();
		}
		
		/*override*/ public initGame():void {
			if (Controller.root.levelTester) {
				this.initNow();
			}
			
			BattleQuestMain.levelToPlay = LevelData.getLevelData(Controller.getLevelNumber());
			this.initNow();
		}
		
		public initNow() {
			this.battleQuestMap = new BTMap();
			this.battleQuestMap.initMapLayers(Controller.root.gameContainer);
			this.battleQuestMap.initMap(BattleQuestMain.levelToPlay);
			this.battleQuestMap.initView();
			this.battleQuestMap.depthSortView();
			
			Cinematics.speechBubbleCount = -1;
			BattleController.initBattle(this.battleQuestMap);
		}
		
		/*override*/ public update():void {
			BattleController.update();
		}
		
		/*override*/ public cleanUp():void {
			BattleController.cleanUp();
		}
	}
}

import BattleQuestMain = com.ussgames.teenTitansBattleQuest.BattleQuestMain;

new BattleQuestMain();
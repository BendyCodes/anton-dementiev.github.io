module com.ussgames.teenTitansBattleQuest {
	
	export class JinxHex extends Action {
		public static hexedUnit:UnitInPlay;
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 6;
			this.power = 0;
			this.level = 1;
			this.coolDown = 1;
			this.type = Action.ATTACK;
			
			this.longRangeAnimClipClass = Main.addGAFMovieClip("JinxHexSpellAnim");
			this.adjustBlastClipHeight = false;
			this.placeBlastClipBehind = false;
			this.label = "Hex";
			this.iconFrame = 8;
		}
		
		/*override*/ public actionExtraEffect(targetUnit:UnitInPlay, map:BTMap):void {
			//super.actionExtraEffect(targetUnit, map);
			JinxHex.hexedUnit = this.actionTargetUnit;
		}
		
	}

}

import JinxHex = com.ussgames.teenTitansBattleQuest.JinxHex;
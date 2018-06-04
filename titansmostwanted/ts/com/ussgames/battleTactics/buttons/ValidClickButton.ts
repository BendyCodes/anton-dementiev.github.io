module com.ussgames.battleTactics.buttons {

	export class ValidClickButton extends SimpleButton {
		
		constructor(mc) {
			super(mc);

			this.checkAlpha = false;
		}
		
		/*override*/ public init():void {
			super.init();
		}

		/*override*/ public down(e:Event):void {
			BattleController.validClick = true;

			//console.log("ValidClickButton down>>>>>");
		}
		
		/*override*/ public over(e:Event):void {
			BattleController.validClick = true;

			//console.log("ValidClickButton over>>>>>");
		}
		
		/*override*/ public out(e:Event):void {
			BattleController.validClick = false;

			//console.log("ValidClickButton out>>>");
		}

		public buttonAction():void {
			BattleController.mouseClicked(null);
		}
		
	}

}

import ValidClickButton = com.ussgames.battleTactics.buttons.ValidClickButton;
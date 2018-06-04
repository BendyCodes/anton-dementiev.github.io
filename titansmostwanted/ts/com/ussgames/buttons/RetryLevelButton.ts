module com.ussgames.buttons {
	
	export class RetryLevelButton extends SimpleButton {
		
		constructor(mc) {
			super(mc);
		}
		
		/*override*/ public buttonAction():void {
			Main.inGamePanel.closePanel("Controller.main.retryLevel");
		}
		
		public gotoRetry() {
			Controller.main.retryLevel();
		}
	}

}

import RetryLevelButton = com.ussgames.buttons.RetryLevelButton;
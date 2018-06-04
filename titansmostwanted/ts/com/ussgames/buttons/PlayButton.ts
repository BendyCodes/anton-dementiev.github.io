module com.ussgames.buttons
{
	export class PlayButton extends SimpleButton
	{
		/*override*/ public init():void {
			super.init();
		}
		
		/*override*/ public buttonAction():void {
			Controller.newGame();
		}
	}
	
}

import PlayButton = com.ussgames.buttons.PlayButton;
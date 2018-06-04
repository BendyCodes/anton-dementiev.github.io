module com.ussgames.buttons
{
	export class PauseButton extends SimpleButton
	{
		/*override*/ public buttonAction():void {
			Main.pauseGame();
		}
	}
}

import PauseButton = com.ussgames.buttons.PauseButton;
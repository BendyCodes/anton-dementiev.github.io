module com.ussgames.buttons
{
	
	export class ClosePanelButton extends SimpleButton
	{
		/*override*/ public init():void {
			super.init();
		}
		
		/*override*/ public buttonAction():void {
			Main.inGamePanel.closePanel();
		}
	}
	
}

import ClosePanelButton = com.ussgames.buttons.ClosePanelButton;
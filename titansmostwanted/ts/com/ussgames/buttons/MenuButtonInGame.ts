module com.ussgames.buttons
{
	export class MenuButtonInGame extends SimpleButton
	{
		/*override*/ public buttonAction():void {
			Main.inGamePanel.closePanel("Controller.quitGame");
			com.ussgames.general.GamePanel.panelOpen = false;
			Main.gamePaused = false;
		}
	}
}

import MenuButtonInGame = com.ussgames.buttons.MenuButtonInGame;
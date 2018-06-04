module com.ussgames.buttons
{
	export class MusicButton extends SimpleButton
	{
		/*override*/ public init():void {
			super.init();
			SoundController.musicButton = this;
			this.update();
		}
		
		/*override*/ public buttonAction():void {
			SoundController.toggleMusic();
		}
		
		public update():void {
			Controller.root.musicBtn.onOffDisplay.visible = !SoundController.musicOn;
		}
	}
}

import MusicButton = com.ussgames.buttons.MusicButton;
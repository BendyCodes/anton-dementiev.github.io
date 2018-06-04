module com.ussgames.buttons
{
	export class SoundButton extends SimpleButton
	{
		/*override*/ public init():void {
			super.init();
			SoundController.soundButton = this;
			this.update();
		}
		
		/*override*/ public buttonAction():void {
			SoundController.toggleSound();
		}
		
		public update():void {
			Controller.root.soundBtn.onOffDisplay.visible = !SoundController.soundOn;
		}
	}
}

import SoundButton = com.ussgames.buttons.SoundButton;
module com.ussgames.buttons {

	export class CreditsButton extends ButtonButton {
		
		constructor(mc, loc) {
			super(mc, loc);
		}
		
		/*override*/ public buttonAction():void {
			Controller.transitioner.goto("credits");
			new MenuButton(Controller.root.toMenuFromCredits, "credits");
		}
	}
}

import CreditsButton = com.ussgames.buttons.CreditsButton;
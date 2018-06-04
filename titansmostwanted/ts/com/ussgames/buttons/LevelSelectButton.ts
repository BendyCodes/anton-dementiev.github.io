module com.ussgames.buttons
{
	export class LevelSelectButton extends SimpleButton
	{
		public level:number = 0;

		constructor(clip:any, loc:string = "", name:string = undefined) {
			super(clip);

			this.init();
		}
		
		/*override*/ public init():void {
			super.init();
			
			this.level = parseInt(this.instanceClip.name.substr(1));

			Main.changeText(this.instanceClip["levelNumber"], [String(this.level)]);
			
			this.addEventListener(CustomMouseEvent.MOUSE_OVER, this.over, this.instanceClip, this);
			this.addEventListener(CustomMouseEvent.MOUSE_OUT, this.out, this.instanceClip, this);
			this.addEventListener(CustomMouseEvent.CLICK, this.click, this.instanceClip, this);
		}
		
		/*override*/ public buttonAction():void {
			if (Controller.isLevelUnlocked(this.level))
			Controller.selectLevel(this.level);
		}
	}
	
}

import LevelSelectButton = com.ussgames.buttons.LevelSelectButton;
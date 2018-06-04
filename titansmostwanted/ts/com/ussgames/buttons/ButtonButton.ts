module com.ussgames.buttons {
	
	export class ButtonButton extends SimpleButton {
		
		constructor(clip:any, loc:string = "") {
			super(clip);
			this.init();

			this.location = loc;
		}
		
		public init(arg0:any = null):void {
			this.instanceClip.interactive = true;
			this.addEventListener(CustomMouseEvent.CLICK, this.click, this.instanceClip, this);
		}
		
		public click(e:MouseEvent):void {
			this.clickCount++;
			
			if (this.clickCount > 1) return;
			if (this.location != "" && Main.getCurrentLabel(Controller.root) != this.location) return;
			
			this.buttonAction();
		}
		
		public buttonAction():void {
			super.buttonAction();
		}
	}
}

import ButtonButton = com.ussgames.buttons.ButtonButton;
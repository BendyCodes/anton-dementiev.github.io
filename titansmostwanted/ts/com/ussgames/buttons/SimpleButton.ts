module com.ussgames.buttons
{
	export class SimpleButton extends CustomMovieClip
	{
		public unlocked:boolean = true;
		public clickCount:number = 0;
		public location:string;
		public checkAlpha:Boolean = true;
		public name:string;
		
		constructor(clip:any, loc:string = "", name:string = undefined) {
			super(clip);

			this.name = name;
			this.location = loc;

			setInterval(function(){
				this.clickCount = 0;
			}.bind(this), 100);

			this.init();
		}
		
		public init():void {
			this.instanceClip.interactive = true;
			
			this.addEventListener(CustomMouseEvent.MOUSE_OVER, this.over, this.instanceClip, this);
			this.addEventListener(CustomMouseEvent.MOUSE_OUT, this.out, this.instanceClip, this);
			this.addEventListener(CustomMouseEvent.CLICK, this.click, this.instanceClip, this);
		}
		
		public disable():void {
			this.interactive = false;
		}
		
		public enable():void {
			this.interactive = true;
		}
		
		public over(e:MouseEvent):void {
			if (Main.getCurrentLabel(Controller.root) != this.location) return;
			
			if (this.unlocked) {
				this.instanceClip.gotoAndStop(2);
			}
		}
		
		public out(e:MouseEvent):void {

			if (Main.getCurrentLabel(Controller.root) != this.location) return;
		}
		
		public down(e:MouseEvent):void {
			if (Main.getCurrentLabel(Controller.root) != this.location) return;

			if (this.unlocked) {
				this.instanceClip.gotoAndStop(3);
			}
		}
		
		public click(e:MouseEvent):void {
			this.clickCount++;
			if (this.clickCount > 1) return;
			if (this.location != "" && Main.getCurrentLabel(Controller.root) != this.location) return;
			if (this.checkAlpha && this.instanceClip.alpha == 0) return;

			if (this.unlocked) {
				this.buttonAction();
			}
		}
		
		public buttonAction():void {
			
		}
	}
	
}

import SimpleButton = com.ussgames.buttons.SimpleButton;
module com
{
	export class CustomMouseEvent
	{
		public static MOUSE_OVER:string = "pointerover";
		public static MOUSE_OUT:string = "pointerout";
		public static MOUSE_DOWN:string = "pointerdown";
		public static MOUSE_UP:string = "pointerup";
		public static MOUSE_MOVE:string = "pointermove";
		public static CLICK:string = "pointertap";

		public instance:any;
		
		public buttonMode:boolean = false;
		public useHandCursor:boolean = false;
		public enabled:boolean = false;
		
		constructor() {
			
		}

		public gotoAndPlay(frameLabel:any):void {
			this.instance.gotoAndPlay(frameLabel);
		}
		
		public gotoAndStop(frameLabel:any):void {
			this.instance.gotoAndStop(frameLabel);
		}

		public play():void {
			this.instance.play();
		}
	}
}

import CustomMouseEvent = com.CustomMouseEvent;
module com.ussgames.buttons
{
	export class CustomMovieClip extends PIXI.Sprite
	{
		public instanceClip:any;
		
		constructor(mc) {
			super();
			this.instanceClip = mc;
		}

		public gotoAndPlay(frameLabel:any):void {
			this.instanceClip.gotoAndPlay(frameLabel);
		}
		
		public gotoAndStop(frameLabel:any):void {
			this.instanceClip.gotoAndStop(frameLabel);
		}

		public play():void {
			this.instanceClip.play();
		}

		public addEventListener(type:any, arg1:any, arg2:any = null, arg3:any = null):void {
			this.interactive = true;

			if (arg3 != undefined) arg2.on(type, arg1.bind(arg3));
			else arg2.on(type, arg1);
		}
	}
}

import CustomMovieClip = com.ussgames.buttons.CustomMovieClip;
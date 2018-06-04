module com.ussgames.general
{
	export class ScreenShaker
	{
		public static screenShakeTime:number = 0;
		public static screenShakeAmount:number = 0;
		public static gameContainer:any;
		
		public static gcx:number;
		public static gcy:number;
		
		public static screenShakeOn:boolean = true;
		
		public static init(container:any) {
			ScreenShaker.gameContainer = container;
			ScreenShaker.gcx = container.x;
			ScreenShaker.gcy = container.y;
			ScreenShaker.screenShakeAmount = 0;
			ScreenShaker.screenShakeTime = 0;
		}
		
		public static shakeScreen(amount:number, time:number) {
			if (ScreenShaker.screenShakeTime>0) {
				ScreenShaker.screenShakeAmount += amount/5;
			} else {
				ScreenShaker.screenShakeAmount = amount;
			}
			if (ScreenShaker.screenShakeAmount > 5) {
				ScreenShaker.screenShakeAmount = 5;
			}
			ScreenShaker.screenShakeTime = time;
		}
		
		public static update() {
			if (!ScreenShaker.screenShakeOn) {
				ScreenShaker.screenShakeTime = 0;
			}
			
			if (ScreenShaker.screenShakeTime <= 0) {
				ScreenShaker.gameContainer.x = 0;
				ScreenShaker.gameContainer.y = 0;
				ScreenShaker.screenShakeAmount = 0;
			} else {
				ScreenShaker.screenShakeTime--;
				
				var xR:number = Math.random() * (ScreenShaker.screenShakeAmount * 2);
				var yR:number = Math.random() * (ScreenShaker.screenShakeAmount * 2);
				
				ScreenShaker.gameContainer.x = 0 + (xR - ScreenShaker.screenShakeAmount);
				ScreenShaker.gameContainer.y = 0 + (yR - ScreenShaker.screenShakeAmount);
			}
		}
	}
}

import ScreenShaker = com.ussgames.general.ScreenShaker;
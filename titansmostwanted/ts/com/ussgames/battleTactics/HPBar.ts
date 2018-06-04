module com.ussgames.battleTactics {
	
	export class HPBar extends CustomMovieClip {
		
		constructor(mc) {
			super(mc);
		}
		
		public showHP(hp:number) {
			for (var i:number = 1; i <= 4; i++) {

				if (hp <= 0) {
					this.instanceClip["fill" + String(i)].gotoAndStop(1);
				} else
				if (hp >= 10) {
					this.instanceClip["fill" + String(i)].gotoAndStop(11);
				} else {
					this.instanceClip["fill" + String(i)].gotoAndStop(Math.floor(hp%10)+1);
				}
				
				hp -= 10;
			}
		}
		
	}

}

import HPBar = com.ussgames.battleTactics.HPBar;
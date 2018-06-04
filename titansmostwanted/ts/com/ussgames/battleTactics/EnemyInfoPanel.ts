module com.ussgames.battleTactics {
	
	export class EnemyInfoPanel extends CustomMovieClip {
		public static OFFX:number = 1038;
		public static ONX:number = 753;
		public panelOpen:boolean = false;
		
		constructor(mc) {
			super(mc);

			this.instanceClip["hpBar"] = new HPBar(this.instanceClip["hpBar"]);
			this.instanceClip.y = 50;
		}
		
		public showUnitInfo(theUnit:UnitInPlay) {
			if (theUnit.unit.villainInfoLabel != "") {
				this.instanceClip.gotoAndStop(theUnit.unit.villainInfoLabel);
				
				this.instanceClip["hpBar"].showHP(theUnit.currentHP);
				
				if (this.instanceClip["cooler"]) {
					if (theUnit.unit.unitActions.length > 2)
					if (theUnit.unit.unitActions[2].coolDown > theUnit.coolDownCount[2]) {
						var coolDownPerc:number = theUnit.coolDownCount[2] / theUnit.unit.unitActions[2].coolDown;
						if (coolDownPerc > 1) {
							coolDownPerc = 1;
						}
						this.instanceClip["cooler"].gotoAndStop(Math.round(coolDownPerc * 100));
						this.instanceClip["cooler"].visible = true;
					} else {
						this.instanceClip["cooler"].visible = false;
					}
				}
				
				var powerPerc:number = theUnit.unit.unitActions[1].power / 10;
				if (powerPerc > 1 || theUnit.unit.unitActions[1].alwaysShowFullPower) {
					powerPerc = 1;
				}

				var dmg = Math.ceil(5*powerPerc)+1; 
				if (dmg < 1) dmg = 1;
				if (dmg > 6) dmg = 6;
				this.instanceClip["actionPower"].gotoAndStop(dmg);
				
				if (theUnit.unit.unitActions.length > 2) {
					powerPerc = theUnit.unit.unitActions[2].power / 10;
					if (powerPerc > 1 || theUnit.unit.unitActions[2].alwaysShowFullPower) {
						powerPerc = 1;
					}
					var dmg = Math.ceil(5*powerPerc)+1; 
					if (dmg < 1) dmg = 1;
					if (dmg > 6) dmg = 6;

					this.instanceClip["actionPower2"].gotoAndStop(dmg);
				}
				
				this.panelOpen = true;
			} else {
				this.panelOpen = false;
			}
		}
		
		public closePanel() {
			this.panelOpen = false;
		}
		
		public update() {
			if (BattleController.teamsTurn == 1 && this.panelOpen) {
				if (this.instanceClip.x > EnemyInfoPanel.ONX+1) {
					this.instanceClip.x += (EnemyInfoPanel.ONX - this.instanceClip.x) / 2;
					this.instanceClip.visible = true;
				}
			} else {
				if (this.instanceClip.x < EnemyInfoPanel.OFFX-1) {
					this.instanceClip.x += (EnemyInfoPanel.OFFX-this.instanceClip.x)/2;
				} else {
					this.instanceClip.visible = false;
					this.instanceClip.gotoAndStop(1);
				}
			}

		}
		
	}

}

import EnemyInfoPanel = com.ussgames.battleTactics.EnemyInfoPanel;
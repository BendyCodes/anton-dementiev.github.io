module com.ussgames.battleTactics {
	
	export class UpgradePanel extends CustomMovieClip {
		private titanID:number = 0;
		private XPDisp:number = 0;
		private XPUpDisp:number = 0;
		private levelDisp:number = 0;
		private tickUpDelay:number = 20;
		private fadingBars:boolean = false;
		private inited_btns:boolean = false;
		private ind:number;
		
		constructor(clip) {
			super(clip);

			if (this.instanceClip["hpBar"].pluginName == undefined)
			this.instanceClip["hpBar"] = new HPBar(this.instanceClip["hpBar"]);
		}
		
		public init(ind:number) {
			this.ind = ind;
			this.titanID = BattleController.yourTeamUnits[ind-1].unit.id+1;
			this.XPDisp = BattleController.persistentTeamUnits[this.titanID - 1].prevXP;
			this.levelDisp = BattleController.persistentTeamUnits[this.titanID - 1].prevLevel;

			this.XPUpDisp = 0;
			this.gotoAndStop(this.titanID);
			this.updateInfo();
			this.updateXPBarDisplay();
			this.clearActionInfo();
			this.initLocks();
			
			if (this.XPDisp != BattleController.persistentTeamUnits[this.titanID - 1].XP) {
				Main.addCustomEfFunc('tickUpXP.onEnterFrame'+this.titanID, this.tickUpXP.bind(this));
			}
			
			for (var i:number = 0; i < 4; i++) {
				this.instanceClip["_" + String(i + 1)].on(CustomMouseEvent.MOUSE_OVER, this.displayActionInfo.bind(this, i));
				this.instanceClip["_" + String(i + 1)].on(CustomMouseEvent.MOUSE_OUT, this.clearActionInfo);
				if (this.instanceClip["l" + String(i + 1)]) {
					this.instanceClip["l" + String(i + 1)].on(CustomMouseEvent.MOUSE_OVER, this.showLockedInfo);
					this.instanceClip["l" + String(i + 1)].on(CustomMouseEvent.MOUSE_OUT, this.clearActionInfo);
				}
			}
		}
		
		public initLocks() {
			for (var i:number = 2; i <= 4; i++) {
				if (BattleController.persistentTeamUnits[this.titanID - 1].unlockedActions[i]) {
					this.instanceClip["l" + String(i)].gotoAndStop("unlocked");
				}
			}
		}
		
		public updateInfo() {
			Main.changeText(this.instanceClip["titanName"], Localizer.getlocalisedText(BattleController.persistentTeamUnits[this.titanID - 1].label));
			Main.changeText(this.instanceClip["level"], [String(this.levelDisp)]);
			Main.changeText(this.instanceClip["xp"], [String(Math.floor(this.XPDisp))]);

			this.instanceClip["hpBar"].showHP(BattleController.persistentTeamUnits[this.titanID - 1].HP + BattleController.persistentTeamUnits[this.titanID - 1].HPBonus);
			
			for (var i:number = 0; i < 4; i++) {
				this.instanceClip["_" + String(i + 1)].gotoAndStop(BattleController.persistentTeamUnits[this.titanID - 1].unitActions[i + 1].iconFrame);
			}
		}
		
		public unlockAction() {
			BattleController.persistentTeamUnits[this.titanID - 1].unlockAction();
			for (var i:number = 2; i <= 4; i++) {
				if (this.instanceClip["l" + String(i)].currentLabel == "locked" && BattleController.persistentTeamUnits[this.titanID - 1].unlockedActions[i]) {
					this.instanceClip["l" + String(i)].gotoAndPlay("unlock");
					SoundController.playSound("buyUpgrade");
					
					Controller.root.tut2.gotoAndStop(BattleController.persistentTeamUnits[this.titanID - 1].unitActions[i].unlockTutorialFrame);
				}
			}
			if (BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend <= 0) {
				this.instanceClip["levelUpPanel"].gotoAndStop(1);
			}
			this.allPointsSpent();
			
			var allActionsUnlocked:boolean = true;
			for (var i:number = 0; i < BattleController.persistentTeamUnits.length; i++) {
				for (var j:number = 0; j < 5; j++) {
					if (BattleController.persistentTeamUnits[i].unlockedActions[j] == false) {
						allActionsUnlocked = false;
					}
				}
			}
		}
		
		public upgradeHP() {
			var zeroHPBonus:boolean = false;
			if (BattleController.persistentTeamUnits[this.titanID - 1].HPBonus == 0) {
				zeroHPBonus = true;
			}
			
			BattleController.persistentTeamUnits[this.titanID - 1].increaseHP();
			this.updateInfo();
			if (BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend <= 0) {
				this.instanceClip["levelUpPanel"].gotoAndStop(1);
			}
			this.allPointsSpent();
			
			SoundController.playSound("buyUpgrade");
			
			var allHPUpgraded:boolean = zeroHPBonus;
			for (var i:number = 0; i < BattleController.persistentTeamUnits.length; i++) {
				if (BattleController.persistentTeamUnits[i].HPBonus == 0) {
					allHPUpgraded = false;
				}
			}
		}
		
		public allPointsSpent() {
			var pointsLeft:number = 0;
			for (var i:number = 0; i < BattleController.persistentTeamUnits.length; i++) {
				pointsLeft += BattleController.persistentTeamUnits[i].levelPointsLeftToSpend
			}
			if (pointsLeft == 0) {
				Transitioner.theRoot.level_up_scene.nextLevel.visible = true;
			}
		}
		
		public updateXPBarDisplay() {
			var bar1Perc:number, bar2Perc:number, prevxpForLevel:number, prevxpPastLevel:number, xpForLevel:number, xpPastLevel:number;
			
			if (this.levelDisp == BattleController.persistentTeamUnits[this.titanID - 1].prevLevel || this.XPDisp == Config.XPTOLEVELUP[this.levelDisp-1] || BattleController.persistentTeamUnits[this.titanID - 1].prevXP == Config.XPTOLEVELUP[Config.XPTOLEVELUP.length - 1]) {
				
				if (this.levelDisp > 1) {
					prevxpForLevel = Config.XPTOLEVELUP[this.levelDisp - 1] - Config.XPTOLEVELUP[this.levelDisp - 2];
					prevxpPastLevel = BattleController.persistentTeamUnits[this.titanID - 1].prevXP - Config.XPTOLEVELUP[this.levelDisp - 2];
					xpForLevel = Config.XPTOLEVELUP[this.levelDisp - 1] - Config.XPTOLEVELUP[this.levelDisp - 2];
					xpPastLevel = this.XPDisp - Config.XPTOLEVELUP[this.levelDisp - 2];
				} else {
					prevxpForLevel = Config.XPTOLEVELUP[0];
					prevxpPastLevel = BattleController.persistentTeamUnits[this.titanID - 1].prevXP;
					xpForLevel = Config.XPTOLEVELUP[0];
					xpPastLevel = this.XPDisp;
				}
				
				bar1Perc = prevxpPastLevel/prevxpForLevel;
				bar2Perc = xpPastLevel/xpForLevel;

				this.instanceClip["XPBar"].oldXP.width = 185*bar1Perc;
				this.instanceClip["XPBar"].newXP.width = 185*bar2Perc;
			} else {
				if (this.levelDisp > 1) {
					xpForLevel = Config.XPTOLEVELUP[this.levelDisp - 1] - Config.XPTOLEVELUP[this.levelDisp - 2];
					xpPastLevel = this.XPDisp - Config.XPTOLEVELUP[this.levelDisp - 2];
				} else {
					xpForLevel = Config.XPTOLEVELUP[0];
					xpPastLevel = this.XPDisp;
				}
				
				bar1Perc = 0;
				bar2Perc = xpPastLevel/xpForLevel;

				this.instanceClip["XPBar"].oldXP.width = 185*bar1Perc;
				this.instanceClip["XPBar"].newXP.width = 185*bar2Perc;
			}
			
			this.instanceClip["XPBar"].oldXP.alpha = 1;
			this.instanceClip["XPBar"].newXP.alpha = 1;
			
			if (this.levelDisp < Config.MAXLEVEL) {
				Main.changeText(this.instanceClip["xpToGo"], [Localizer.getlocalisedText("LEVEL UP IN ")[0] + String(Math.ceil(Config.XPTOLEVELUP[this.levelDisp - 1]-this.XPDisp))]);
			}
			else {
				Main.changeText(this.instanceClip["xpToGo"], [""]);
			}
		}
		
		public tickUpXP(e:Event) {
			if (this.instanceClip["levelUpPanel"].currentFrame >= 45 && !this.inited_btns) {
				this.inited_btns = true;
				
				this.instanceClip["levelUpPanel"].upgrade_hp = new UpgradeHPButton(this.instanceClip["levelUpPanel"].upgrade_hp);
				this.instanceClip["levelUpPanel"].upgrade_hp.init(this.ind);
				
				this.instanceClip["levelUpPanel"].unlock_action = new UnlockActionButton(this.instanceClip["levelUpPanel"].unlock_action);
				this.instanceClip["levelUpPanel"].unlock_action.init(this.ind);
			}

			if (this.tickUpDelay > 0) {
				this.tickUpDelay--;
				if (this.fadingBars) {
					this.instanceClip["XPBar"].oldXP.alpha -= 0.05;
					this.instanceClip["XPBar"].newXP.alpha -= 0.05;
				}
				return;
			} else {
				this.fadingBars = false;
			}
			
			if (this.XPDisp == BattleController.persistentTeamUnits[this.titanID - 1].XP) {
				if (BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend > 0) {
					if (this.instanceClip["levelUpPanel"].currentFrame == 1) {
						this.instanceClip["levelUpPanel"].gotoAndPlay(2);
						
						SoundController.playSound("upgrades");
					}
					if (this.instanceClip["levelUpPanel"].levelUpPanel && this.instanceClip["levelUpPanel"].levelUpPanel.levelUpMess) {
						if (BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend>1) {
							Main.changeText(this.instanceClip["levelUpPanel"].levelUpPanel.levelUpMess.pointsToSpend, [String(BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend) + Localizer.getlocalisedText(" Points to Spend")[0]]);
						} else {
							Main.changeText(this.instanceClip["levelUpPanel"].levelUpPanel.levelUpMess.pointsToSpend, [String(BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend) + Localizer.getlocalisedText(" Point to Spend")[0]]);
						}
					}
				} else {
					Main.removeCustomEfFunc('tickUpXP.onEnterFrame'+this.titanID);
				}
				
				return;
			}
			
			if (this.instanceClip["levelUpPanel"].currentFrame == 1) {
				if (this.XPDisp < BattleController.persistentTeamUnits[this.titanID - 1].XP) {
					this.XPDisp += 0.5;
					this.XPUpDisp += 0.5;
				}
				if (this.XPDisp >= Config.XPTOLEVELUP[this.levelDisp - 1]) {
					this.levelDisp++;
					this.tickUpDelay = 20;
					this.updateInfo();
					this.instanceClip["XPBar"].newXP.width = 185;
					this.fadingBars = true;
					
					SoundController.playSound("levelup");
					
					return;
				}
				
				this.updateXPBarDisplay();
				this.updateInfo();
			}
		}
		
		public clearActionInfo(e:Event = null) {
			Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("Roll over action icon for info"));
			this.instanceClip["actionPower"].gotoAndStop(1);
		}
		
		public showLockedInfo(e:Event = null) {
			Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("Action locked, level up to unlock"));
			this.instanceClip["actionPower"].gotoAndStop(1);
		}
		
		public displayActionInfo(num:number) {
			var targetName:string = String(num+1);
			var actionID:number = parseInt(targetName.substr(1));
			this.instanceClip["attackDescription"].text = Localizer.getlocalisedText(BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].description) + " - " + Localizer.getlocalisedText(BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].label) + " " + Localizer.getlocalisedText(BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].supplementalInfo);
			
			var powerPerc:number = BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].power / 10;
			if (powerPerc > 1 || BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].alwaysShowFullPower) {
				powerPerc = 1;
			}
			var dmg = Math.ceil(5*powerPerc)+1; 
				if (dmg < 1) dmg = 1;
				if (dmg > 6) dmg = 6;
			this.instanceClip["actionPower"].gotoAndStop(dmg);
		}
	}

}
	
import UpgradePanel = com.ussgames.battleTactics.UpgradePanel;
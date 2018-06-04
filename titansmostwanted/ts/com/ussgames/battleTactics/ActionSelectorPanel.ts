module com.ussgames.battleTactics {
	export class ActionSelectorPanel extends CustomMovieClip {
		
		public _titanID:number = -1;
		public _unitInPlay:UnitInPlay;
		public static OFFX:number = 30;
		public static ONX:number = 400;
		public showingActionInfo:boolean = false;
		public initedButtons:boolean = false;

		private actionButtonsInstance:any = [];
		
		constructor(any) {
			super(any);

			this.instanceClip["hpBar"] = new HPBar(this.instanceClip["hpBar"]);
			this.instanceClip.y = 50;
		}
		
		public update() {
			if (BattleController.teamsTurn == 1 && (BattleController.selectedUnit || (BattleController.hoverUnit && BattleController.hoverUnit.ai == false))) {
				if (this.instanceClip.x < ActionSelectorPanel.ONX-1) {
					this.instanceClip.x += (ActionSelectorPanel.ONX - this.instanceClip.x) / 2;
					if (Controller.getLevelNumber() == 2 && Controller.root.tut.currentFrame!=18) {
						Controller.root.tut.visible = false;
					}
					this.instanceClip.visible = true;
				} else {
					if (Controller.getLevelNumber() == 2) {
						Controller.root.tut.visible = true;
					}
				}
			} else {
				if (this.instanceClip.x > ActionSelectorPanel.OFFX+1) {
					this.instanceClip.x += (ActionSelectorPanel.OFFX - this.instanceClip.x) / 2;
					if (Controller.getLevelNumber() == 2 && Controller.root.tut.currentFrame!=18) {
						Controller.root.tut.visible = false;
					}
					this.showingActionInfo = false;
				} else {
					this._titanID = -1;
					this._unitInPlay = null;
					this.instanceClip.visible = false;
				}
			}
			
			if (this._unitInPlay) {
				this.updateInfo(this._unitInPlay);
			}
		}
		
		public init(unitInPlay:UnitInPlay) {
			var titanID:number = unitInPlay.unit.id;
			this._unitInPlay = unitInPlay;
			
			if (ActionSelectorPanel.unvailableActionFilter == null) {
				ActionSelectorPanel.generateUnvailableActionFilter();
			}

			if (!this.initedButtons)
			for (var i:number = 1; i <= 4; i++) {
				this.actionButtonsInstance[i] = new ActionButton(this.instanceClip["a" + String(i)]);
				this.actionButtonsInstance[i].actionID = i;

				for (var sa = 0; sa < this.instanceClip.children.length; sa++)
				{
					var currfr;
					if (this.instanceClip.children[sa]._config != null)
					currfr = this.instanceClip.children[sa]._config;
					else continue;

					if (this.instanceClip.children[sa]._config._linkage != null)
					currfr = this.instanceClip.children[sa]._config._linkage;
					else continue;
					
					if (currfr == "UndoActionButton") new UndoButton(this.instanceClip.children[sa]);
					if (currfr == "EndTurnActionButton") new EndTurnButton(this.instanceClip.children[sa]);
				}

				this.initedButtons = true;
			}

			if (titanID != -1) {
				this._titanID = titanID;
				this.instanceClip.gotoAndStop(titanID+1);
				this.updateInfo(unitInPlay);
				this.clearActionInfo();
				this.initLocks();
			}
			if (BattleController.currentPhase != BattleController.ACTIONPHASE && BattleController.currentPhase != BattleController.PERFORMINGACTIONPHASE) {
				this.initActionButtons();
			}
		}
		
		public initLocks() {
			for (var i:number = 2; i <= 4; i++) {
				if (BattleController.persistentTeamUnits[this._titanID].unlockedActions[i]) {
					this.instanceClip["l" + String(i)].gotoAndStop("unlocked");

				} else {
					this.instanceClip["l" + String(i)].gotoAndStop("locked");
					//this.actionButtonsInstance[i].on(CustomMouseEvent.MOUSE_OVER, this.showLockedInfo);
					//this.actionButtonsInstance[i].on(CustomMouseEvent.MOUSE_OUT, this.clearActionInfo);
				}
			}
		}
		
		public static selectedActionFilter:PIXI.filters.GlowFilter = Main.convertToPixiGlowFilter(0xffffff, 0.65, 20, 20, 2.25, 1, true, false);
		public static unvailableActionFilter:ColorMatrixFilter;
		
		public static generateUnvailableActionFilter() {
			ActionSelectorPanel.unvailableActionFilter = new ColorMatrixFilter();
			ActionSelectorPanel.unvailableActionFilter.saturate(-1);
		}
		
		public initActionButtons() {

			var unit:Unit = BattleController.persistentTeamUnits[this._titanID];
			var unitInPlay:UnitInPlay = BattleController.selectedUnit;
			if (unitInPlay == null) {
				unitInPlay = BattleController.hoverUnit;
			}
			if (unitInPlay == null) {
				return;
			}
			for (var i:number = 1; i <= 4; i++) {
				this.instanceClip["a" + String(i)].icon.gotoAndStop(unit.unitActions[i].iconFrame);
				
				if (!unit.unlockedActions[i]) {
					//this.instanceClip["a" + String(i)].disable();
				} else
				if (unit.unitActions[i].coolDown > unitInPlay.coolDownCount[i]) {
					var coolDownPerc:number = unitInPlay.coolDownCount[i] / unit.unitActions[i].coolDown;
					if (coolDownPerc > 1) {
						coolDownPerc = 1;
					}
					this.instanceClip["a" + String(i)].cooler.gotoAndStop(Math.round(coolDownPerc * 100));
					this.instanceClip["a" + String(i)]["cooler"].visible = true;
					//this.instanceClip["a" + String(i)].enable();
				} else {
					this.instanceClip["a" + String(i)]["cooler"].visible = false;
					//this.instanceClip["a" + String(i)].enable();
				}
			}
			
			this.hilightAction(0);
		}
		
		public hilightAction(actionID:number) {
			for (var i:number = 1; i <= 4; i++) {
				if (i == actionID) {
					this.instanceClip["a" + String(i)].filters = [ActionSelectorPanel.selectedActionFilter];
				} else {
					this.instanceClip["a" + String(i)].filters = [];
				}
			}
		}
		
		public updateInfo(unitInPlay:UnitInPlay) {
			Main.changeText(this.instanceClip["titanName"], Localizer.getlocalisedText(BattleController.persistentTeamUnits[this._titanID].label));
			
			this.instanceClip["hpBar"].showHP(unitInPlay.currentHP);
			
			for (var i:number = 0; i < 4; i++) {
				this.instanceClip["a" + String(i + 1)].gotoAndStop(BattleController.persistentTeamUnits[this._titanID].unitActions[i + 1].iconFrame);
			}
		}
		
		public clearActionInfo() {
			if (BattleController.currentPhase == BattleController.ACTIONPHASE || BattleController.currentPhase == BattleController.PERFORMINGACTIONPHASE) {
				Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText(BattleController.persistentTeamUnits[this._titanID].unitActions[BattleController.selectedUnit.selectedAction].label));
				
				var powerPerc:number = BattleController.persistentTeamUnits[this._titanID].unitActions[BattleController.selectedUnit.selectedAction].power / 10;
				if (powerPerc > 1 || BattleController.persistentTeamUnits[this._titanID].unitActions[BattleController.selectedUnit.selectedAction].alwaysShowFullPower) {
					powerPerc = 1;
				}

				var dmg = Math.ceil(5*powerPerc)+1; 
				if (dmg < 1) dmg = 1;
				if (dmg > 6) dmg = 6;
				this.instanceClip["actionPower"].gotoAndStop(dmg);
			} else {
				Main.changeText(this.instanceClip["attackDescription"], com.ussgames.general.Localizer.getlocalisedText("Roll over icons for info"));

				this.instanceClip["actionPower"].gotoAndStop(1);
			}
			
			this.showingActionInfo = false;
		}
		
		public showActionInfo(actionID:number) {
			if (this._titanID>=0 && actionID>=1 && BattleController.persistentTeamUnits[this._titanID].unlockedActions[actionID] && BattleController.selectedUnit) {
				if (BattleController.selectedUnit.coolDownCount[actionID] >= BattleController.selectedUnit.unit.unitActions[actionID].coolDown) {
					Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText(BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].label));
				} else {
					var turnsCoolDown:number = BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].coolDown - BattleController.selectedUnit.coolDownCount[actionID];

					Main.changeText(this.instanceClip["attackDescription"], [Localizer.getlocalisedText("Available in ")[0] + String(turnsCoolDown) + com.ussgames.general.Localizer.getlocalisedText(" turn")]);

					if (turnsCoolDown > 1) {
						Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("s"), "null", true);
					}
				}
				
				var powerPerc:number = BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].power / 10;
				if (powerPerc > 1 || BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].alwaysShowFullPower) {
					powerPerc = 1;
				}

				var dmg = Math.ceil(5*powerPerc)+1; 
				if (dmg < 1) dmg = 1;
				if (dmg > 6) dmg = 6;
				this.instanceClip["actionPower"].gotoAndStop(dmg);
				
				this.showingActionInfo = true;
			}
		}
		
		public showLockedInfo() {
			Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("Locked"));
		}
		
	}

}

import ActionSelectorPanel = com.ussgames.battleTactics.ActionSelectorPanel;
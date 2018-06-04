module com.ussgames.battleTactics {
	
	export class Unit {
		public id:number = 0;
		public label:string = "";
		public description:string = "";
		public villainInfoLabel:string = "";
		public frameLabel:string = "";
		
		public HP:number;
		public MP:number;
		public prevLevel:number = 1;
		public level:number = 1;
		public prevXP:number = 0;
		public XP:number = 0;
		
		public levelPointsLeftToSpend:number = 0;
		public unlockedActions:any[];
		public usedActions:any[];
		public HPBonus:number = 0;
		
		public movementCosts:any[];
		
		public movementSpeed:number = 4;
		
		public flys:boolean = false;
		
		public unitActions:any[] = [new EndTurnAction];
		public retaliationAction:number = 1;
		
		public aiControllerClass:any = AIController;
		
		public movieClipClass:any;
		
		public useNewAttackAnim:boolean = true;
		public newAttackAnimClipClass:any = Main.addGAFMovieClip("RobinAttackAnims");
		
		constructor() {
			
		}
		
		public init():void {
			
		}
		
		public initUnlockedActions(unlockAll:boolean = false) {
			this.unlockedActions = [];
			this.unlockedActions[0] = true;
			this.unlockedActions[1] = true;
			this.usedActions = [];
			this.usedActions[0] = true;
			this.usedActions[1] = false;
			for (var i:number = 2; i < this.unitActions.length; i++) {
				this.unlockedActions[i] = unlockAll;
				this.usedActions[i] = false;
			}
		}
		
		public performAction(actionID:number, map:BTMap, unitInPlay:UnitInPlay, targetX:number, targetY:number):boolean {
			var paramObj:any = {};

			console.log("performAction", unitInPlay.unit.label);
			
			switch (actionID) {
				case 0:
					return true;
				default:
					paramObj["map"] = map;
					paramObj["targetX"] = targetX;
					paramObj["targetY"] = targetY;
					paramObj["unit"] = unitInPlay;
					break;
			}
			
			return this.unitActions[actionID].perform(paramObj);
		}
		
		public increaseXP(xpUp:number, theUnit:UnitInPlay = null) {
			if (xpUp > 0) {
				
				this.prevXP = this.XP;
				this.XP += xpUp;
				this.prevLevel = this.level;
				
				if (this.XP > Config.XPTOLEVELUP[Config.XPTOLEVELUP.length - 1]) {
					this.XP = Config.XPTOLEVELUP[Config.XPTOLEVELUP.length - 1];
				}
				
				while (this.level < 10 && this.XP >= Config.XPTOLEVELUP[this.level - 1]) {
					this.level++;
					this.levelPointsLeftToSpend++;
				}
			}
		}
		
		public increaseHP() {
			if (this.levelPointsLeftToSpend > 0) {
				this.HPBonus++;
				this.levelPointsLeftToSpend--;
			}
		}
		
		public unlockAction() {
			if (this.levelPointsLeftToSpend > 0) {
				for (var i:number = 2; i < this.unlockedActions.length; i++) {
					if (this.unlockedActions[i] == false) {
						this.unlockedActions[i] = true;
						this.levelPointsLeftToSpend--;
						break;
					}
				}
			}
		}
		
		public beforeMoveFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			
		}
		
		public afterMoveFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			
		}
		
		public startOfTeamsTurnFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			unitInPlay.attackable = true;
			unitInPlay.evadeAttackCount = 0;
			
			if (unitInPlay.poisonTurns > 0) {
				unitInPlay.currentHP -= Math.floor(unitInPlay.poisonPower);
				unitInPlay.poisonTurns--;
				BattleController.showDamageRiser(unitInPlay.poisonPower, unitInPlay, true);
				if (unitInPlay.currentHP <= 0) {
					unitInPlay.state = UnitInPlay.KO;
					unitInPlay.actioned = true;
				}
				if (unitInPlay.poisonTurns <= 0) {
					unitInPlay.poisonPower = 0;
				}
			}
		}
		
		public endOfTeamsTurnFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			
		}
		
		public noHPLeftFunction(unitInPlay:UnitInPlay, map:BTMap):void {
			
		}
		
		public getSaveData():Object {
			var saveDataObject:any = {};
			saveDataObject.prevLevel = this.prevLevel;
			saveDataObject.prevXP = this.prevXP;
			saveDataObject.level = this.level;
			saveDataObject.XP = this.XP;
			saveDataObject.levelPointsLeftToSpend = this.levelPointsLeftToSpend;
			saveDataObject.unlockedActions = [];
			for (var i:number = 0; i < this.unlockedActions.length; i++) {
				saveDataObject.unlockedActions[i] = this.unlockedActions[i];
			}
			saveDataObject.usedActions = [];
			for (var i:number = 0; i < this.usedActions.length; i++) {
				saveDataObject.usedActions[i] = this.usedActions[i];
			}
			saveDataObject.HPBonus = this.HPBonus;
			
			return saveDataObject;
		}
		
		public restoreFromSaveData(saveDataObject:any ) {
			this.prevLevel = saveDataObject.prevLevel;
			this.prevXP = saveDataObject.prevXP;
			this.level = saveDataObject.level;
			this.XP = saveDataObject.XP;
			this.levelPointsLeftToSpend = saveDataObject.levelPointsLeftToSpend;
			for (var i:number = 0; i < this.unlockedActions.length; i++) {
				this.unlockedActions[i] = saveDataObject.unlockedActions[i];
			}
			for (var i:number = 0; i < this.usedActions.length; i++) {
				this.usedActions[i] = saveDataObject.usedActions[i];
			}
			this.HPBonus = saveDataObject.HPBonus;
		}
		
	}

}

import Unit = com.ussgames.battleTactics.Unit;
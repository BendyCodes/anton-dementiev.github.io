module com.ussgames.teenTitansBattleQuest {
	
	export class RavenBlackHole extends Action {
		
		public static BLACKHOLETIME:number = 3;
		public blackHoleDone:boolean = false;
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 3;
			this.power = 0;
			this.level = 1; // 4;
			this.coolDown = 3;
			this.type = Action.AREA;
			
			this.label = "Demon Vortex";
			this.description = "Special Attack";
			this.supplementalInfo = "(affects surrounding squares)";
			this.iconFrame = 5;
			
			this.mouseIconFrame = 5;
			
			this.useStandardDamagePerc = false;
			this.alwaysShowFullPower = true;
			this.validSquareOccupied = false;
		}
		
		/*override*/ public perform(paramObj:any = null):boolean {
			var map:BTMap = paramObj.map;
			var targetX:number = paramObj.targetX;
			var targetY:number = paramObj.targetY;
			var originatingUnit:UnitInPlay = paramObj.unit;
			
			var targetUnit:UnitInPlay = map.getUnitInSquare(targetX, targetY);
			map.calculateActionGrid(originatingUnit);
			
			this.attackDamageDone = false;
			this.retaliateDamageDone = false;
			this.attackDamage = 0;
			this.defendDamage = 0;
			this.blackHoleDone = false;
			
			if (map.actionGrid[targetX][targetY]>=this.minRange && map.actionGrid[targetX][targetY]<=this.maxRange) {
				this.actionTargetMapX = targetX;
				this.actionTargetMapY = targetY;
				this.actionTargetUnit = targetUnit;
				this.actionPhase = Action.PERFORM;
				originatingUnit.state = UnitInPlay.PERFORMINGACTION;
				return true;
			}
			
			return false;
		}
		
		/*override*/ public updateAction(map:BTMap, thisUnit:UnitInPlay):boolean {
			if (!this.blackHoleDone && thisUnit.actionHit(thisUnit.clip)) {
				var newBlackHole:BlackHoleResidualEffect = new BlackHoleResidualEffect;
				newBlackHole.init(map, thisUnit, this.actionTargetMapX, this.actionTargetMapY);
				BattleController.residualEffects.push(newBlackHole);
				this.blackHoleDone = true;
			}
			if (thisUnit.actionAnimFinished(thisUnit.clip)) {
				this.actionPhase = Action.IDLE;
				return true;
			}
			return false;
		}
		
	}

}

import RavenBlackHole = com.ussgames.teenTitansBattleQuest.RavenBlackHole;
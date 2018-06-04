module com.ussgames.teenTitansBattleQuest {

	export class RavenTeleport extends Action {
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 2;
			this.maxRange = 4;
			this.power = 0;
			this.level = 1; // 3
			this.coolDown = 2;
			this.type = Action.AREA;
			
			this.label = "Teleport";
			this.description = "Special Action";
			this.iconFrame = 3;
			
			this.mouseIconFrame = 4;
			
			this.useStandardDamagePerc = false;
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
			
			if (map.actionGrid[targetX][targetY]>=this.minRange && map.actionGrid[targetX][targetY]<=this.maxRange && targetUnit==null) {
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
			if (thisUnit.actionHit(thisUnit.clip)) {
				thisUnit.movedFromX = thisUnit.mapX;
				thisUnit.movedFromY = thisUnit.mapY;
				thisUnit.mapX = this.actionTargetMapX;
				thisUnit.mapY = this.actionTargetMapY;
				thisUnit.updateClipPosition(map);
			}
			if (thisUnit.actionAnimFinished(thisUnit.clip)) {
				this.actionPhase = Action.IDLE;
				return true;
			}
			return false;
		}
	}

}

import RavenTeleport = com.ussgames.teenTitansBattleQuest.RavenTeleport;
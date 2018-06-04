module com.ussgames.teenTitansBattleQuest {
	
	export class RavenHeal extends Action {
		// 50% max healage
		public static healPerc:number = 0.5;
		public healDone:boolean = false;
		
		constructor() {
			super();
		}
		
		/*override*/ public init():void {
			this.minRange = 0;
			this.maxRange = 1;
			this.power = 0;
			this.level = 1; //2;
			this.coolDown = 3;
			this.type = Action.DEFENCE;
			
			this.label = "Heal a Titan";
			this.description = "Special Action";
			this.iconFrame = 4;
			
			this.mouseIconFrame = 3;
			
			this.useStandardDamagePerc = false;
			this.canAffectSelf = true;
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
			this.healDone = false;
			
			if (map.actionGrid[targetX][targetY]>=this.minRange && map.actionGrid[targetX][targetY]<=this.maxRange && targetUnit && targetUnit.team == originatingUnit.team) {
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
			if (!this.healDone && thisUnit.actionHit(thisUnit.clip)) {
				var hpUp:number = this.actionTargetUnit.heal(RavenHeal.healPerc);
				var healEffect:any = Main.addGAFMovieClip("RavenHealSpellEffect");
				healEffect.x = this.actionTargetUnit.clip.x;
				healEffect.y = this.actionTargetUnit.clip.y - (this.actionTargetUnit.clip.height / 2);
				BattleController.currentMap.mapView.addChild(healEffect);
				BattleController.showHealRiser(hpUp, this.actionTargetUnit);
				
				this.healDone = true;
			}
			if (thisUnit.actionAnimFinished(thisUnit.clip)) {
				this.actionPhase = Action.IDLE;
				return true;
			}
			return false;
		}
		
		/*override*/ public alternateDamageDisplay(attackingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap):string {
			
			var healAmount:number = Math.ceil((targetUnit.unit.HP + targetUnit.unit.HPBonus) * RavenHeal.healPerc);
			
			if (targetUnit.unit.HP + targetUnit.unit.HPBonus < targetUnit.currentHP + healAmount) {
				healAmount = (targetUnit.unit.HP + targetUnit.unit.HPBonus) - targetUnit.currentHP;
			}
			
			return "+" + String(healAmount);
		}
	}

}

import RavenHeal = com.ussgames.teenTitansBattleQuest.RavenHeal;
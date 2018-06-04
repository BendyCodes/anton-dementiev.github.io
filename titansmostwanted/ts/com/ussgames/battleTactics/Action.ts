module com.ussgames.battleTactics {
	
	export class Action{

		public label:string = "";
		public description:string = "";
		public supplementalInfo:string = "";
		public iconFrame:number = 1;
		public unlockTutorialFrame:number = 1;
		
		public minRange:number;
		public maxRange:number;
		public power:number;
		public level:number;
		
		public coolDown:number;
		
		public static DEFENCE:number = 0;
		public static ATTACK:number = 1;
		public static SELF:number = 2;
		public static AREA:number = 3;
		public type:number;
		
		public forceAttackDisplay:boolean = false;
		
		public straightLineOnly:boolean = false;
		public attackMultipleUnits:boolean = false;
		public stopAtSurvivorUnit:boolean = false;
		public distanceAffectsPower:boolean = false;
		public canBeCountered:boolean = true;
		public friendlyFire:boolean = false;
		
		public dashAttack:boolean = false;
		
		public poisonTurns:number = 0;
		public poisonPower:number = 0;
		public unitAttackTargetDistance:number = 0;
		
		public actionTargetUnit:UnitInPlay;
		public lastTargetUnit:UnitInPlay;
		public actionTargetMapX:number;
		public actionTargetMapY:number;
		
		public static IDLE:number = 0;
		public static PERFORM:number = 1;
		public static REACT1:number = 2;
		public static RETALIATE:number = 3;
		public static REACT2:number = 4;
		public actionPhase:number = Action.IDLE;
		
		public attackDamageDone:boolean = false;
		public retaliateDamageDone:boolean = false;
		public attackDamage:number = 0;
		public defendDamage:number = 0;
		public attackKO:boolean = false;
		public defendKO:boolean = false;
		public attackEvaded:boolean = false;
		public defendEvaded:boolean = false;
		
		public longRangeAnimClipClass:any;
		public adjustBlastClipHeight:boolean = true;
		public placeBlastClipBehind:boolean = false;
		public longRange:boolean = false;
		
		public battleAnimOffset:number = 0;
		
		public mouseIconFrame:number = 2;
		public validSquareOccupied:boolean = true;
		
		public alwaysShowFullPower:boolean = false;
		public useStandardDamagePerc:boolean = true;
		public canAffectSelf:boolean = false;
		
		constructor() {
			this.init();
		}
		
		public init():void {
			
		}
		
		public perform(paramObj:any = null):boolean {
			var map:BTMap = paramObj.map;
			var targetX:number = paramObj.targetX;
			var targetY:number = paramObj.targetY;
			var originatingUnit:UnitInPlay = paramObj.unit;
			
			var targetUnit:UnitInPlay = map.getUnitInSquare(targetX, targetY);
			map.calculateActionGrid(originatingUnit);
			
			if (!this.attackMultipleUnits && !this.straightLineOnly && targetUnit && this.type == Action.ATTACK && targetUnit.attackable == false) {
				return false;
			}
			
			if (this.attackMultipleUnits) {
				map.calculateMultipleUnitAttackGrid(originatingUnit, targetUnit);
				this.unitAttackTargetDistance = this.minRange;
				targetUnit = this.findNextTargetUnit(originatingUnit, map);
			}
			
			this.attackDamageDone = false;
			this.retaliateDamageDone = false;
			this.attackDamage = 0;
			this.defendDamage = 0;
			this.attackKO = false;
			this.defendKO = false;
			this.attackEvaded = false;
			this.defendEvaded = false;
			
			if (map.actionGrid[targetX][targetY]>=this.minRange && map.actionGrid[targetX][targetY]<=this.maxRange && targetUnit && targetUnit.team != originatingUnit.team) {
				
				this.actionTargetMapX = targetX;
				this.actionTargetMapY = targetY;
				this.actionTargetUnit = targetUnit;
				this.actionPhase = Action.PERFORM;
				
				this.longRange = false;
				if ( this.maxRange > 1 || this.attackMultipleUnits) {
					this.longRange = true;
				}
				BattleAnimController.initBattleAnim(originatingUnit, targetUnit, this.longRange);
				
				return true;
			}
			
			return false;
		}
		
		public performSelfAction(thisUnit:UnitInPlay):boolean {
			return true;
		}
		
		public performAreaAction(targetX:number, targetY:number):boolean {
			return true;
		}
		
		public updateAction(map:BTMap, thisUnit:UnitInPlay):boolean {
			if (BattleAnimController.battleStarted == false) {
				return false;
			}
			
			switch (this.actionPhase) {
				case Action.PERFORM:
					if (!this.attackDamageDone) {
						this.standardAttackAction(thisUnit, this.actionTargetUnit, map);
						BattleAnimController.populateBattleHolder();
					}
				
					if (Main.getCurrentLabel(BattleAnimController.actionAnim) != BattleAnimController.newStyleActionLabel) {
						
						/*console.log("label",
						BattleAnimController.actionAnim.currentFrame,
						BattleAnimController.newStyleActionLabel,
						Main.getCurrentLabel(BattleAnimController.actionAnim),
						BattleAnimController.actionAnim);*/

						//console.log("label", BattleAnimController.battleAnimHolder);
						
						if (BattleAnimController.battleAnimHolder.fader.currentFrame >= 1) {
							BattleAnimController.battleAnimHolder.fader.gotoAndPlay(3);
							this.actionPhase = Action.REACT1;
						}
					}
					break;
				case Action.REACT1:

					console.log(">>>>>>>>>>>>>> fader react 1", BattleAnimController.battleAnimHolder.fader.currentFrame);
					
					if (BattleAnimController.battleAnimHolder.fader.currentFrame >= 4 ||
						BattleAnimController.battleAnimHolder.fader.currentFrame == 1) {
						if (this.actionTargetUnit.currentHP > 0 && this.canBeCountered && this.actionTargetUnit.team!=thisUnit.team) {
							this.actionPhase = Action.RETALIATE;
							this.actionTargetUnit.selectedAction = this.actionTargetUnit.unit.retaliationAction;
							map.calculateActionGrid(this.actionTargetUnit);
							
							if (map.actionGrid[thisUnit.mapX][thisUnit.mapY] >= this.actionTargetUnit.unit.unitActions[this.actionTargetUnit.unit.retaliationAction].minRange && map.actionGrid[thisUnit.mapX][thisUnit.mapY] <= this.actionTargetUnit.unit.unitActions[this.actionTargetUnit.unit.retaliationAction].maxRange) {
								BattleAnimController.populateBattleHolder();
							} else {
								this.endOfAttack(thisUnit, map);
							}
						} else {
							this.endOfAttack(thisUnit, map);
						}
					}
					break;
				case Action.RETALIATE:
					if (!this.retaliateDamageDone) {
						this.standardRetaliate(this.actionTargetUnit, thisUnit, map);
						BattleAnimController.battleAnimHolder.counter.gotoAndPlay(2);
					}
					if (Main.getCurrentLabel(BattleAnimController.actionAnim) != BattleAnimController.newStyleActionLabel) {

						console.log(">>>>>>>>>>>>>> fader 3", BattleAnimController.battleAnimHolder.fader.currentFrame);

						if (BattleAnimController.battleAnimHolder.fader.currentFrame >= 1) {
							BattleAnimController.battleAnimHolder.fader.gotoAndPlay(2);
							this.actionPhase = Action.REACT2;
						}
					}
					break;
				case Action.REACT2:

					console.log(">>>>>>>>>>>>>> fader 4", BattleAnimController.battleAnimHolder.fader.currentFrame);

					if (BattleAnimController.battleAnimHolder.fader.currentFrame >= 4 ||
						BattleAnimController.battleAnimHolder.fader.currentFrame == 1) {
						this.endOfAttack(thisUnit, map);
					}
					break;
			}
			
			
			if (this.actionPhase == Action.IDLE) {
				return BattleAnimController.openPanels();
			} else {
				return false;
			}
		}
		
		public endOfAttack(thisUnit:UnitInPlay, map:BTMap) {
			console.log("endOfAttack");
			
			this.lastTargetUnit = this.actionTargetUnit;
			if (this.attackMultipleUnits && (!this.stopAtSurvivorUnit || this.actionTargetUnit.currentHP <= 0)) {
				this.actionTargetUnit = this.findNextTargetUnit(thisUnit, map);
				if (this.actionTargetUnit) {
					this.attackDamageDone = false;
					this.retaliateDamageDone = false;
					this.attackDamage = 0;
					this.defendDamage = 0;
					this.actionPhase = Action.PERFORM;
					
					console.log("set Action.PERFORM 2");
					
				} else {
					this.actionPhase = Action.IDLE;
					this.actionEnded(thisUnit, map);
					BattleController.generalDelayCount = 10*2.4;

					console.log("actionPhase 3", this.actionPhase);
				}
			} else {
				this.actionPhase = Action.IDLE;
				this.actionEnded(thisUnit, map);
				BattleController.generalDelayCount = 10*2.4;

				console.log("actionPhase 4", this.actionPhase);
			}
		}
		
		public standardAttackAction(attackingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap):void {
			var damage:number = Math.floor(this.getStandardAttackPower(attackingUnit, targetUnit, map));

			if (damage >= targetUnit.currentHP) {
				damage = Math.floor(targetUnit.currentHP);
				this.attackKO = true;
			}
			if (targetUnit.evadeAttackCount > 0) {
				this.attackEvaded = true;
			}
			
			this.applyDamage(damage, targetUnit, attackingUnit);
			this.attackDamage = damage;
			this.attackDamageDone = true;
			
			this.actionExtraEffect(targetUnit, map);
			
			if (this.newDamageClip) {
				this.showDamageNew(this.newDamageClip);
			}
		}
		
		public getStandardAttackPower(attackingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap):number {
			var attackPower:number = Math.ceil((0.5+((attackingUnit.currentHP / attackingUnit.unit.HP)/2)) * this.power);
			if (map.mapGrid[attackingUnit.mapX][attackingUnit.mapY].height > map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
				attackPower *= 1 + Config.HIGHGROUNDATTACKBONUS;
			}

			if (map.mapGrid[targetUnit.mapX][targetUnit.mapY].type == MapSquare.COVER) {
				attackPower *= Config.COVERDEFENCEBONUS;
			}

			if (map.mapGrid[attackingUnit.mapX][attackingUnit.mapY].height < map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
				attackPower *= Config.COVERDEFENCEBONUS;
			}

			if (this.distanceAffectsPower) {
				var distPoint:Point = new Point(Math.abs(attackingUnit.mapX - targetUnit.mapX), Math.abs(attackingUnit.mapY - targetUnit.mapY));
				var distance:number = Math.sqrt( Math.pow((distPoint.x-0), 2) + Math.pow((distPoint.y-0), 2) ) - this.minRange;
				var distRange:number = (this.maxRange-this.minRange) + 1;
				var distMult:number = 1 - (distance / distRange);
				attackPower = Math.ceil(attackPower * distMult);
			}
			
			if (attackPower < 1 && this.power>0) {
				attackPower = 1;
			}
			
			return Math.floor(attackPower);
		}
		
		public alternateDamageDisplay(attackingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap):string {
			return "";
		}
		
		public standardRetaliate(retaliatingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap):void {
			if (retaliatingUnit.currentHP > 0) {
				retaliatingUnit.selectedAction = retaliatingUnit.unit.retaliationAction;
				map.calculateActionGrid(retaliatingUnit);
				
				if (targetUnit.evadeAttackCount > 0) {
					this.defendEvaded = true;
				}
				
				if (map.actionGrid[targetUnit.mapX][targetUnit.mapY] >= retaliatingUnit.unit.unitActions[retaliatingUnit.unit.retaliationAction].minRange && map.actionGrid[targetUnit.mapX][targetUnit.mapY] <= retaliatingUnit.unit.unitActions[retaliatingUnit.unit.retaliationAction].maxRange) {
					var damage:number = this.getRetaliatePower(retaliatingUnit, targetUnit, map);
					if (damage >= targetUnit.currentHP) {
						damage = Math.floor(targetUnit.currentHP);
						this.defendKO = true;
					}
						
					this.applyDamage(damage, targetUnit, retaliatingUnit);
					this.defendDamage = damage;
					this.retaliateDamageDone = true;
				}
				
				this.retaliateDamageDone = true;
				
				if (this.newDamageClip) {
					this.showDamageNew(this.newDamageClip);
				}
			}
		}
		
		public getRetaliatePower(retaliatingUnit:UnitInPlay, targetUnit:UnitInPlay, map:BTMap, hpOff:number = 0):number {
			var attackPower:number = Math.ceil((0.5+(((retaliatingUnit.currentHP-hpOff) / retaliatingUnit.unit.HP)/2)) * (retaliatingUnit.unit.unitActions[retaliatingUnit.unit.retaliationAction].power));
			
			if (map.mapGrid[retaliatingUnit.mapX][retaliatingUnit.mapY].height > map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
				attackPower *= 1 + Config.HIGHGROUNDATTACKBONUS;
			}
			
			if (map.mapGrid[targetUnit.mapX][targetUnit.mapY].type == MapSquare.COVER) {
				attackPower *= Config.COVERDEFENCEBONUS;
			}
			
			if (map.mapGrid[retaliatingUnit.mapX][retaliatingUnit.mapY].height < map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
				attackPower *= Config.COVERDEFENCEBONUS;
			}
			
			if (attackPower < 1) {
				attackPower = 1;
			}
			
			return attackPower;
		}
		
		public applyDamage(damage:number, targetUnit:UnitInPlay, attackingUnit:UnitInPlay) {
			if (targetUnit.evadeAttackCount > 0) {
				targetUnit.evadeAttackCount--; 
				targetUnit.state = UnitInPlay.EVADE;
				damage = 0;
			} else {
				var xpInc:number = damage;
				if (xpInc > targetUnit.currentHP) {
					xpInc = targetUnit.currentHP;
				}

				damage = Math.floor(damage);
				
				targetUnit.currentHP -= damage;
				
				attackingUnit.awardXP(damage, UnitInPlay.DAMAGE);
				
				if (targetUnit.currentHP > 0) {
					targetUnit.state = UnitInPlay.HIT;
				} else {
					targetUnit.state = UnitInPlay.KO;
					attackingUnit.awardXP(Config.KOXP, UnitInPlay.KOS);
					targetUnit.awardXP(Config.DIEXP, UnitInPlay.DIE);
					targetUnit.unit.noHPLeftFunction(attackingUnit, BattleController.currentMap);
				}
				
				if (targetUnit == this.actionTargetUnit) {
					if (this.poisonTurns > 0) {
						targetUnit.poisonTurns = this.poisonTurns;
						targetUnit.poisonPower = this.poisonPower;
					}
				}
				
				var screenshake:number = damage;
				ScreenShaker.shakeScreen(screenshake, 6);
				
				if (targetUnit.team == 1) {
					SoundController.playSound("badHP");
				} else {
					SoundController.playSound("goodHP");
				}
			}
		}
		
		public findNextTargetUnit(thisUnit:UnitInPlay, map:BTMap):UnitInPlay {
			var i:number, j:number;
			var targetUnit:UnitInPlay;
			for (i = 0; i < map.mapGrid.length; i++) {
				for (j = 0; j < map.mapGrid[i].length; j++) {
					if (map.multipleUnitAttackGrid[i][j] == this.unitAttackTargetDistance) {
						targetUnit = map.getUnitInSquare(i, j);
						if (targetUnit) {
							map.multipleUnitAttackGrid[i][j] = 0;
							if (this.friendlyFire || targetUnit.team != thisUnit.team) {
								return targetUnit;
							}
						}
					}
				}
			}
			
			if (this.unitAttackTargetDistance < this.maxRange && this.unitAttackTargetDistance < map.mapGrid.length) {
				this.unitAttackTargetDistance++;
				
				return this.findNextTargetUnit(thisUnit, map);
			}
			
			return null;
		}
		
		public actionExtraEffect(targetUnit:UnitInPlay, map:BTMap):void {
			
		}
		
		public actionEnded(thisUnit:UnitInPlay, map:BTMap):void {
			if (this.dashAttack) {
				if (this.lastTargetUnit.currentHP <= 0) {
					thisUnit.mapX = this.lastTargetUnit.mapX;
					thisUnit.mapY = this.lastTargetUnit.mapY;
				} else {
					var dirX:number = 0;
					var dirY:number = 0;
					if (this.lastTargetUnit.mapX < thisUnit.mapX) {
						dirX = -1;
					} else
					if (this.lastTargetUnit.mapX > thisUnit.mapX) {
						dirX = 1;
					} else
					if (this.lastTargetUnit.mapY < thisUnit.mapY) {
						dirY = -1;
					} else
					if (this.lastTargetUnit.mapY > thisUnit.mapY) {
						dirY = 1;
					}
					
					if (dirX != 0 && dirY == 0) {
						thisUnit.mapX = this.lastTargetUnit.mapX - dirX;
						thisUnit.mapY = this.lastTargetUnit.mapY;
					} else
					if (dirX == 0 && dirY != 0) {
						thisUnit.mapX = this.lastTargetUnit.mapX;
						thisUnit.mapY = this.lastTargetUnit.mapY - dirY;
					}
				}
				
				thisUnit.updateClipPosition(map);
			}
		}
		
		public newDamageClip:CustomMovieClip;
		public showDamageNew(damageClip:any) {
			this.newDamageClip = damageClip;
			
			if (this.actionPhase == Action.PERFORM || this.actionPhase == Action.REACT1) {
				if (this.attackDamageDone) {
					
					if (this.poisonTurns > 0) {
						damageClip.gotoAndStop(4);
					} else
					if (this.attackEvaded) {
						damageClip.gotoAndStop(3);
					} else
					if (this.attackKO) {
						damageClip.gotoAndStop(2);
					} else {
						damageClip.gotoAndStop(1);

						Main.changeText(damageClip.hpDown, ["-" + String(this.attackDamage)], "hpDown");
						
					}
					damageClip.visible = true;
				} else {
					damageClip.gotoAndStop(1);
					Main.changeText(damageClip.hpDown, [""], "hpDown");
					damageClip.visible = false;
				}
			} else
			if (this.actionPhase == Action.RETALIATE || this.actionPhase == Action.REACT2) {
				if (this.retaliateDamageDone) {
					if (this.defendEvaded) {
						damageClip.gotoAndStop(3);
					} else
					if (this.defendKO) {
						damageClip.gotoAndStop(2);
					} else {
						damageClip.gotoAndStop(1);
						Main.changeText(damageClip.hpDown, ["-" + String(this.attackDamage)], "hpDown");
					}
					damageClip.visible = true;
				} else {
					damageClip.gotoAndStop(1);
					Main.changeText(damageClip.hpDown, [""], "hpDown");
					damageClip.visible = false;
				}
			}
		}
		
		public showDefender(clip:CustomMovieClip) {
			if (this.actionPhase == Action.PERFORM || this.actionPhase == Action.REACT1) {
				if ((this.actionTargetUnit.evadeAttackCount > 0 || this.attackEvaded)) {
					clip.gotoAndStop(21);
				} else {
					clip.gotoAndStop(this.actionTargetUnit.unit.id + 1);
				}
			} else
			if (this.actionPhase == Action.RETALIATE || this.actionPhase == Action.REACT2) {
				
				if ((BattleAnimController.attackingUnit.evadeAttackCount > 0 || this.defendEvaded)) {
					clip.gotoAndStop(21);
				} else {
					clip.gotoAndStop(BattleAnimController.attackingUnit.unit.id + 1);
				}
			}
		}
		
	}
}

import Action = com.ussgames.battleTactics.Action;
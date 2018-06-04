module com.ussgames.battleTactics {
	
	export class AIController {
		public static IDLE:number = 0;
		public static ATTACK:number = 1;
		public static DEFEND:number = 2;
		public static AID:number = 3;
		
		public currentState:number = AIController.IDLE;
		
		public otherUnit:UnitInPlay;
		
		public mapTargetX:number;
		public mapTargetY:number;
		
		public potentialActions:any[];
		public potentialSquares:any[];
		
		public preferredUnitToAttack:UnitInPlay;
		public _aStarNodes : any[];
		public _astar : AStar;
		public _aStarPath : AStarNodeVO[];
		
		public static unitActionOrder:any[];
		
		constructor() {
			
		}
		
		public initialDecision(thisUnit:UnitInPlay, map:BTMap) {
			var i:number, j:number, a:number;
			
			this.findPreferredUnitToAttack(thisUnit, map);
			
			var safeSquaresAvailable:boolean = false;
			map.calculateMovementGrid(thisUnit);
			for (i = 0; i < map.movementGrid.length; i++) {
				for (j = 0; j < map.movementGrid[i].length; j++) {
					if (map.movementGrid[i][j] != -1) {
						if (this.checkSquareSafety(i, j, thisUnit.team, map)) {
							safeSquaresAvailable = true;
							break;
						}
						map.calculateMovementGrid(thisUnit);
					}
				}
			}
			
			this.potentialActions = [];
			
			for (a = 1; a < thisUnit.unit.unitActions.length; a++) {
				if (thisUnit.coolDownCount[a]>=thisUnit.unit.unitActions[a].coolDown) {
				
					for (i = 0; i < map.unitsInPlay.length; i++) {
						if (map.unitsInPlay[i].team != thisUnit.team && map.unitsInPlay[i].attackable) {
							
							map.calculateMovementGrid(thisUnit);
							map.calculateUnitDangerArea_action(thisUnit, a);
							if (map.actionGrid[map.unitsInPlay[i].mapX][map.unitsInPlay[i].mapY] != -1) {
								
								var anAIAction:AIAction = new AIAction;
								anAIAction.actionType = AIController.ATTACK;
								anAIAction.mapTargetX = map.unitsInPlay[i].mapX;
								anAIAction.mapTargetY = map.unitsInPlay[i].mapY;
								anAIAction.distance = Math.sqrt(((thisUnit.mapX - map.unitsInPlay[i].mapX) * (thisUnit.mapX - map.unitsInPlay[i].mapX)) + ((thisUnit.mapY - map.unitsInPlay[i].mapY) * (thisUnit.mapY - map.unitsInPlay[i].mapY)));
								anAIAction.otherUnit = map.unitsInPlay[i];
								anAIAction.actionID = a;
								
								var damageOtherUnitWillSustain:number = thisUnit.unit.unitActions[a].getStandardAttackPower(thisUnit, map.unitsInPlay[i], map);
								var retaliateDamage:number = map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].getRetaliatePower(map.unitsInPlay[i], thisUnit, map, damageOtherUnitWillSustain);
								if (damageOtherUnitWillSustain >= map.unitsInPlay[i].currentHP) {
									retaliateDamage = -10;
								}
								
								var backUpDamageApplied:number = 0;
								var backUpRetaliateDamage:number = 0;
								
								for (j = 0; j < map.unitsInPlay.length; j++) {
									if (map.unitsInPlay[j] != thisUnit && map.unitsInPlay[j].team == thisUnit.team) {
										map.calculateMovementGrid(map.unitsInPlay[j]);
										map.calculateUnitDangerArea(map.unitsInPlay[j]);
										if (map.actionGrid[map.unitsInPlay[i].mapX][map.unitsInPlay[i].mapY] != -1) {
											backUpDamageApplied += map.unitsInPlay[j].unit.unitActions[1].getStandardAttackPower(map.unitsInPlay[j], map.unitsInPlay[i], map);
											if (damageOtherUnitWillSustain < map.unitsInPlay[i].currentHP) {
												backUpRetaliateDamage += map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].getRetaliatePower(map.unitsInPlay[i], map.unitsInPlay[j], map);
											}
										}
									}
								}
								
								var theirBackUpDamageApplied:number = 0;
								
								for (j = 0; j < map.unitsInPlay.length; j++) {
									if (map.unitsInPlay[i] != map.unitsInPlay[j]) {
										map.calculateMovementGrid(map.unitsInPlay[j]);
										map.calculateUnitDangerArea(map.unitsInPlay[j]);
										if (map.actionGrid[thisUnit.mapX][thisUnit.mapY] != -1) {
											theirBackUpDamageApplied += map.unitsInPlay[j].unit.unitActions[1].getStandardAttackPower(map.unitsInPlay[j], thisUnit, map);
										}
									}
								}
							
								var attackRating:number = ((retaliateDamage + theirBackUpDamageApplied) - backUpDamageApplied) - damageOtherUnitWillSustain;
								
								if (thisUnit.unit.unitActions[a].maxRange == 1 && map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].minRange > 1) {
									attackRating-=100;
								}
								if (thisUnit.unit.unitActions[a].minRange > 1 && map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].maxRange == 1) {
									attackRating-=100;
								}
								
								if (safeSquaresAvailable && retaliateDamage >= thisUnit.currentHP && damageOtherUnitWillSustain+backUpDamageApplied < map.unitsInPlay[i].currentHP) {
									attackRating += 10;
								}
								
								anAIAction.score = attackRating;
								this.potentialActions.push(anAIAction);
								
							}
						}
					}
				}
			}
			
			if (this.potentialActions.length > 0) {
				//this.potentialActions.sortOn("score", Array.NUMERIC);
			} else {
				var defendAction:AIAction = new AIAction;
				defendAction.actionType = AIController.DEFEND;
				this.potentialActions.push(defendAction);
			}
			
			if (thisUnit.clip.aiMode) {
				thisUnit.clip.aiMode.gotoAndStop(this.potentialActions[0].actionType+1);
			}
		}
		
		public reconsider(thisUnit:UnitInPlay, map:BTMap) {
			var i:number, j:number;
			
			if (this.potentialActions.length > 0 && this.potentialActions[0].actionType == AIController.DEFEND) {
				var aidID:number = -1;
				var aidDistance:number = -1;
				for (i = 0; i < map.unitsInPlay.length; i++) {
					if (map.unitsInPlay[i] != thisUnit && map.unitsInPlay[i].team == thisUnit.team) {
						if (map.unitsInPlay[i].aiController.potentialActions && map.unitsInPlay[i].aiController.potentialActions.length > 0 && map.unitsInPlay[i].aiController.potentialActions[0].actionType == AIController.ATTACK) {
							if (aidID == -1) {
								aidID = i;
								aidDistance = Math.sqrt(((thisUnit.mapX - map.unitsInPlay[i].mapX) * (thisUnit.mapX - map.unitsInPlay[i].mapX)) + ((thisUnit.mapY - map.unitsInPlay[i].mapY) * (thisUnit.mapY - map.unitsInPlay[i].mapY)));
							} else {
								var newAidDistance:number = Math.sqrt(((thisUnit.mapX - map.unitsInPlay[i].mapX) * (thisUnit.mapX - map.unitsInPlay[i].mapX)) + ((thisUnit.mapY - map.unitsInPlay[i].mapY) * (thisUnit.mapY - map.unitsInPlay[i].mapY)));
								if (newAidDistance < aidDistance) {
									aidID = i;
									aidDistance = newAidDistance;
								}
							}
						}
					}
				}
				
				if (aidID != -1) {
					this.potentialActions[0].actionType = AIController.AID;
					this.potentialActions[0].distance = aidDistance;
					this.potentialActions[0].mapTargetX = map.unitsInPlay[aidID].mapX;
					this.potentialActions[0].mapTargetY = map.unitsInPlay[aidID].mapY;
					this.potentialActions[0].otherUnit = map.unitsInPlay[aidID];
					this.potentialActions[0].score = 0;
				}
			}
			
			if (thisUnit.clip.aiMode) {
				thisUnit.clip.aiMode.gotoAndStop(this.potentialActions[0].actionType+1);
			}
		}
		
		public setAction(thisUnit:UnitInPlay, map:BTMap) {
			var i:number, j:number, k:number;
			var potentialSquare:AIPotentialSquare;
			var unitDist:number = 0;
			
			if (this.potentialActions.length>0) {
				switch (this.potentialActions[0].actionType) {
					
					case AIController.ATTACK:
						this.potentialSquares = [];
						
						var beingAided:boolean = false;
						for (k = 0; k < AIController.unitActionOrder.length; k++) {
							if (AIController.unitActionOrder[k].aiController.potentialActions[0].actionType == AIController.AID && AIController.unitActionOrder[k].aiController.potentialActions[0].otherUnit == thisUnit) {
								beingAided = true;
							}
						}
						
						map.calculateMovementGrid(thisUnit);
						map.calculateUnitDangerArea(thisUnit);
						
						for (i = 0; i < map.movementGrid.length; i++) {
							for (j = 0; j < map.movementGrid[i].length; j++) {
								if ( (i!=thisUnit.movedFromX || j!=thisUnit.movedFromY || (i==thisUnit.mapX && j==thisUnit.mapY)) && (map.getUnitInSquare(i, j) == null || map.getUnitInSquare(i, j) == thisUnit) && map.movementGrid[i][j] != -1) {
									potentialSquare = new AIPotentialSquare();
									
									potentialSquare.mapX = i;
									potentialSquare.mapY = j;
									
									var unitMX:number = thisUnit.mapX;
									var unitMY:number = thisUnit.mapY;
									thisUnit.mapX = i;
									thisUnit.mapY = j;
									map.calculateActionGrid(thisUnit);
									thisUnit.mapX = unitMX;
									thisUnit.mapY = unitMY;
									
									if (map.actionGrid[this.potentialActions[0].otherUnit.mapX][this.potentialActions[0].otherUnit.mapY]>=thisUnit.unit.unitActions[1].minRange && map.actionGrid[this.potentialActions[0].otherUnit.mapX][this.potentialActions[0].otherUnit.mapY]<=thisUnit.unit.unitActions[1].maxRange) {
										potentialSquare.score = -20;
									}
									
									for (k = 0; k < map.unitsInPlay.length; k++) {
										if (map.unitsInPlay[k].team != thisUnit.team && map.unitsInPlay[k].attackable) {
											map.calculateMovementGrid(map.unitsInPlay[k]);
											map.calculateUnitDangerArea(map.unitsInPlay[k]);
											
											if (map.actionGrid[i][j] == -1) {
												potentialSquare.score -= 1;
											} else {
												potentialSquare.score += map.unitsInPlay[k].unit.unitActions[map.unitsInPlay[k].unit.retaliationAction].getStandardAttackPower(map.unitsInPlay[k], thisUnit, map);
											}
										}
									}
									
									unitDist = Math.ceil(Math.sqrt(((i - this.potentialActions[0].otherUnit.mapX) * (i - this.potentialActions[0].otherUnit.mapX)) + ((j - this.potentialActions[0].otherUnit.mapY) * (j - this.potentialActions[0].otherUnit.mapY))));
									potentialSquare.score -= unitDist;
									
									this.potentialSquares.push(potentialSquare);
									
									map.calculateMovementGrid(thisUnit);
									map.calculateUnitDangerArea(thisUnit);
								}
							}
						}
						
						if (this.potentialSquares.length>0) {
							//this.potentialSquares.sortOn("score", Array.NUMERIC);
							this.mapTargetX = this.potentialSquares[0].mapX;
							this.mapTargetY = this.potentialSquares[0].mapY;
						} else {
							this.mapTargetX = thisUnit.mapX;
							this.mapTargetY = thisUnit.mapY;
						}
						
						break;
					
					case AIController.AID:
						this.potentialSquares = [];
						
						map.calculateMovementGrid(thisUnit);
						
						for (i = 0; i < map.movementGrid.length; i++) {
							for (j = 0; j < map.movementGrid[i].length; j++) {
								if ((i!=thisUnit.movedFromX || j!=thisUnit.movedFromY) && map.getUnitInSquare(i, j) == null && map.movementGrid[i][j] != -1) {
									potentialSquare = new AIPotentialSquare();
									
									potentialSquare.mapX = i;
									potentialSquare.mapY = j;
									
									for (k = 0; k < map.unitsInPlay.length; k++) {
										if (map.unitsInPlay[k].team != thisUnit.team && map.unitsInPlay[k].attackable) {
											map.calculateMovementGrid(map.unitsInPlay[k]);
											map.calculateUnitDangerArea(map.unitsInPlay[k]);
											
											if (map.actionGrid[i][j] == -1) {
												potentialSquare.score -= 5;
											}
										}
									}
									
									unitDist = Math.ceil(Math.sqrt(((i - this.potentialActions[0].otherUnit.mapX) * (i - this.potentialActions[0].otherUnit.mapX)) + ((j - this.potentialActions[0].otherUnit.mapY) * (j - this.potentialActions[0].otherUnit.mapY))));
									potentialSquare.score += unitDist;
									
									var unitMX:number = thisUnit.mapX;
									var unitMY:number = thisUnit.mapY;
									thisUnit.mapX = i;
									thisUnit.mapY = j;
									map.calculateMovementGrid(thisUnit);
									map.calculateUnitDangerArea(thisUnit);
									thisUnit.mapX = unitMX;
									thisUnit.mapY = unitMY;
									for (k = 0; k < map.unitsInPlay.length; k++) {
										if (map.unitsInPlay[k].team != thisUnit.team) {
											if (map.actionGrid[map.unitsInPlay[k].mapX][map.unitsInPlay[k].mapY] != -1) {
												potentialSquare.score -= 10;
											}
										}
									}
									
									this.potentialSquares.push(potentialSquare);
									
									map.calculateMovementGrid(thisUnit);
									map.calculateUnitDangerArea(thisUnit);
								}
							}
						}
						
						if (this.potentialSquares.length>0) {
							//this.potentialSquares.sortOn("score", Array.NUMERIC);
							
							this.mapTargetX = this.potentialSquares[0].mapX;
							this.mapTargetY = this.potentialSquares[0].mapY;
						} else {
							this.mapTargetX = thisUnit.mapX;
							this.mapTargetY = thisUnit.mapY;
						}
						
						break;
					
					case AIController.DEFEND:
						this.potentialSquares = [];
						
						map.calculateMovementGrid(thisUnit);
						
						for (i = 0; i < map.movementGrid.length; i++) {
							for (j = 0; j < map.movementGrid[i].length; j++) {
								if ((i!=thisUnit.movedFromX || j!=thisUnit.movedFromY) && map.getUnitInSquare(i, j) == null && map.movementGrid[i][j] != -1) {
									potentialSquare = new AIPotentialSquare();
									
									potentialSquare.mapX = i;
									potentialSquare.mapY = j;
									
									var weakestEnemyHP:number = 1000;
									var weakestEnemyUnit:UnitInPlay;
									for (k = 0; k < map.unitsInPlay.length; k++) {
										if (map.unitsInPlay[k].team != thisUnit.team && map.unitsInPlay[k].attackable) {
											map.calculateMovementGrid(map.unitsInPlay[k]);
											map.calculateUnitDangerArea(map.unitsInPlay[k]);
											
											if (map.actionGrid[i][j] == -1) {
												potentialSquare.score -= 1;
											}
											
											if (map.unitsInPlay[k].currentHP < weakestEnemyHP) {
												weakestEnemyUnit = map.unitsInPlay[k];
											}
											
											unitDist = Math.ceil(Math.sqrt(((i - this.preferredUnitToAttack.mapX) * (i - this.preferredUnitToAttack.mapX)) + ((j - this.preferredUnitToAttack.mapY) * (j - this.preferredUnitToAttack.mapY))));
											potentialSquare.score += unitDist;
										}
									}
									
									if (this.preferredUnitToAttack) {
										
										if (this._aStarNodes && this._aStarPath) {
											var nodeAtPos:AStarNodeVO = this._aStarNodes[i][j];
											if (this._aStarPath.indexOf(nodeAtPos) >= 0) {
												potentialSquare.score -= 10;
											}
										}
									}
									
									var unitMX:number = thisUnit.mapX;
									var unitMY:number = thisUnit.mapY;
									thisUnit.mapX = i;
									thisUnit.mapY = j;
									map.calculateMovementGrid(thisUnit);
									map.calculateUnitDangerArea(thisUnit);
									thisUnit.mapX = unitMX;
									thisUnit.mapY = unitMY;
									for (k = 0; k < map.unitsInPlay.length; k++) {
										if (map.unitsInPlay[k].team != thisUnit.team) {
											if (map.actionGrid[map.unitsInPlay[k].mapX][map.unitsInPlay[k].mapY] != -1) {
												potentialSquare.score -= 10;
											}
										}
									}
									
									this.potentialSquares.push(potentialSquare);
									
									map.calculateMovementGrid(thisUnit);
									map.calculateUnitDangerArea(thisUnit);
								}
							}
						}
						
						if (this.potentialSquares.length>0) {
							//this.potentialSquares.sortOn("score", Array.NUMERIC);
							
							this.mapTargetX = this.potentialSquares[0].mapX;
							this.mapTargetY = this.potentialSquares[0].mapY;
						} else {
							this.mapTargetX = thisUnit.mapX;
							this.mapTargetY = thisUnit.mapY;
						}
						
						break;
				}
			}
			
			if (thisUnit.clip.aiMode) {
				thisUnit.clip.aiMode.gotoAndStop(this.potentialActions[0].actionType+1);
			}
		}
		
		public findPreferredUnitToAttack(thisUnit:UnitInPlay, map:BTMap) {
			var potentialAttackUnits:any[] = [];
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (map.unitsInPlay[i].team != thisUnit.team && map.unitsInPlay[i].attackable) {
					var newAIAction:AIAction = new AIAction;
					newAIAction.otherUnit = map.unitsInPlay[i];
					newAIAction.score = newAIAction.otherUnit.currentHP;
					
					if (thisUnit.unit.unitActions[1].minRange == 1 && thisUnit.unit.unitActions[1].maxRange == 1) {
						if (newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].maxRange > 1) {
							newAIAction.score -= 5;
						}
					} else {
						if (newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].minRange == 1 && newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].maxRange == 1) {
							newAIAction.score -= 5;
						}
					}
					
					var attackDamage:number = thisUnit.unit.unitActions[1].getStandardAttackPower(thisUnit, newAIAction.otherUnit, map);
					var retaliateDamage:number = 0;
					if (attackDamage < newAIAction.otherUnit.currentHP) {
						retaliateDamage = Math.floor(newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].getRetaliatePower(newAIAction.otherUnit, thisUnit, map, attackDamage));
					}
					newAIAction.score -= attackDamage;
					newAIAction.score += retaliateDamage;
					
					newAIAction.score += Math.abs(thisUnit.mapX - newAIAction.otherUnit.mapX);
					newAIAction.score += Math.abs(thisUnit.mapY - newAIAction.otherUnit.mapY);
					
					potentialAttackUnits.push(newAIAction);
				}
			}
			
			if (potentialAttackUnits.length > 0) {
				//potentialAttackUnits.sortOn("score", Array.NUMERIC);

				this.preferredUnitToAttack = potentialAttackUnits[0].otherUnit;
				
				this.initNodesForAStar(thisUnit, map);
				this._astar = new AStar(this._aStarNodes);
				this._aStarPath = this._astar.search(this._aStarNodes[thisUnit.mapX][thisUnit.mapY], this._aStarNodes[this.preferredUnitToAttack.mapX][this.preferredUnitToAttack.mapY]);
				
			} else {
				this.preferredUnitToAttack = null;
			}
		}
		
		public initNodesForAStar(thisUnit:UnitInPlay, map:BTMap) : void {
			this._aStarNodes = new Array<any>();
			var _previousNode : AStarNodeVO;
			
			var x : number = 0;
			var z : number = 0;
			
			while ( x < map.mapGrid.length ) {
				this._aStarNodes[x] = new Array<AStarNodeVO>();
				
				while ( z < map.mapGrid[x].length ){
					var node :AStarNodeVO  = new AStarNodeVO();
					node.next = _previousNode;
					node.h = 0;
					node.f = 0;
					node.g = 0;
					node.visited = false;
					node.parent = null;
					node.closed = false;
					node.isWall = (Config.mapSquareConfig[map.mapGrid[x][z].terrainID].type == MapSquare.NOACCESS);
					
					node.position = new Point(x, z);
					this._aStarNodes[x][z]  = node;
					_previousNode = node;
					
					z++;
				}
				z=0;
				x++;
			}
			
		}
		
		public checkForRandomAttack(thisUnit:UnitInPlay, map:BTMap) {
			var i:number, j:number, a:number;
			var randomAttackArray:any[] = [];
			for (a = 1; a < thisUnit.unit.unitActions.length; a++) {
				if (thisUnit.coolDownCount[a] >= thisUnit.unit.unitActions[a].coolDown) {
					thisUnit.selectedAction = a;
					map.calculateActionGrid(thisUnit);
					for (i = 0; i < map.actionGrid.length; i++) {
						for (j = 0; j < map.actionGrid[i].length; j++) {
							if (map.actionGrid[i][j] >= thisUnit.unit.unitActions[a].minRange && map.actionGrid[i][j] <= thisUnit.unit.unitActions[a].maxRange) {
								var unitInSquare:UnitInPlay = map.getUnitInSquare(i, j);
								if (unitInSquare && unitInSquare.team != thisUnit.team && unitInSquare.attackable) {
									var newRandomAction:AIAction = new AIAction;
									newRandomAction.score = unitInSquare.currentHP - thisUnit.unit.unitActions[1].getStandardAttackPower(thisUnit, unitInSquare, map);
									if (newRandomAction.score > 0) {
										newRandomAction.score += unitInSquare.unit.unitActions[unitInSquare.unit.retaliationAction].getRetaliatePower(unitInSquare, thisUnit, map);
									}
									newRandomAction.otherUnit = unitInSquare;
									newRandomAction.actionID = a;
									randomAttackArray.push(newRandomAction);
								}
							}
						}
					}
				}
			}
			
			if (randomAttackArray.length>0) {
				//randomAttackArray.sortOn("score", Array.NUMERIC);
				
				this.potentialActions[0].actionType = AIController.ATTACK;
				this.potentialActions[0].otherUnit = this.otherUnit = randomAttackArray[0].otherUnit;
				this.potentialActions[0].actionID = randomAttackArray[0].actionID;
			}
		}
		
		public checkSquareSafety(mapX:number, mapY:number, team:number, map:BTMap):boolean {
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (map.unitsInPlay[i].team != team && map.unitsInPlay[i].attackable) {
					map.calculateMovementGrid(map.unitsInPlay[i]);
					map.calculateUnitDangerArea(map.unitsInPlay[i]);
					
					if (map.actionGrid[mapX][mapY] != -1) {
						return false;
					}
				}
			}
			return true;
		}
		
		public static chooseUnitOrder(unitsArray:any[]) {
			var i:number;
			
			AIController.unitActionOrder = [];
			for (i = unitsArray.length-1; i >= 0; i--) {
				if (unitsArray[i].aiController.potentialActions.length > 0 && unitsArray[i].aiController.potentialActions[0].actionType == AIController.DEFEND && Math.random() > 0.5) {
					AIController.unitActionOrder.push(unitsArray[i]);
					unitsArray.splice(i, 1);
				}
			}
			for (i = unitsArray.length-1; i >= 0; i--) {
				if (unitsArray[i].aiController.potentialActions.length > 0 && unitsArray[i].aiController.potentialActions[0].actionType == AIController.AID && Math.random() > 0.5) {
					AIController.unitActionOrder.push(unitsArray[i]);
					unitsArray.splice(i, 1);
				}
			}
			
			var attackers:any[] = [];
			for (i = unitsArray.length-1; i >= 0; i--) {
				if (unitsArray[i].aiController.potentialActions.length > 0) {
					attackers.push(unitsArray[i]);
					unitsArray.splice(i, 1);
				}
			}
			
			if (attackers.length > 0) {
				//attackers.sortOn("currentHP", Array.DESCENDING | Array.NUMERIC);
				
				for (i = 0; i < attackers.length; i++) {
					AIController.unitActionOrder.push(attackers[i]);
				}
				
			}
			
		}
		
	}

}
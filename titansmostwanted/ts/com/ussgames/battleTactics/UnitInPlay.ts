module com.ussgames.battleTactics {
	
	export class UnitInPlay {

		public unit:Unit;
		public XPEarned:number = 0;
		public XPEarnedLastAttack:number = 0;
		public firstFrame:boolean = true;
		
		public static DAMAGE:number = 0;
		public static KOS:number = 1;
		public static SURVIVE:number = 2;
		public static DIE:number = 3;
		public XPEarnedFor:any[] = [0, 0, 0, 0];
		public stats:any[] = [0, 0, 0, 0];
		
		public currentHP:number;
		public coolDownCount:any[];
		
		public mapX:number;
		public mapY:number;
		
		public clip:any;
		public clipX:number = 0;
		public clipY:number = 0;
		public destClipX:number = 0;
		public destClipY:number = 0;
		public startX:number = 0;
		public startY:number = 0;

		public clip_hp:any;
		
		public team:number;
		public ai:boolean = false;
		public aiController:AIController;
		public selectedAction:number = 0;
		
		public externalForcesActing:boolean = false;
		public validUnitForAction:boolean = false;
		
		public moved:boolean = false;
		public movedFromX:number;
		public movedFromY:number;
		public actioned:boolean = false;
		
		public poisonPower:number = 0;
		public poisonTurns:number = 0;
		public poisonRemoveDelay:number = 45;
		
		public evadeAttackCount:number = 0;
		public attackable:boolean = true;
		
		public static IDLE:number = 0;
		public static WAITINGFORORDER:number = 3;
		public static MOVINGINTOPOSITION:number = 1;
		public static PERFORMINGACTION:number = 2;
		public static HIT:number = 4;
		public static KO:number = 5;
		public static EVADE:number = 6;
		public state:number = 0;
		
		public static stateLabels:any[] = ["idle", "move", "action", "breath", "hit", "ko", "evade"];
		
		public dir:number = 1;
		public moveXSpeed:number = 0;
		public moveYSpeed:number = 0;

		public thisStateLabel:string = "idle";
		
		constructor() {
			
		}
		
		public update() {
			if (this.currentHP <= 0) Main.changeText(this.clip_hp.damageDisplay.damage, [""], "hp");
			else Main.changeText(this.clip_hp.damageDisplay.damage, [String(this.currentHP)], "hp");
			
			this.thisStateLabel = UnitInPlay.stateLabels[this.state];
			if (this.state == UnitInPlay.IDLE && !this.attackable) {
				this.thisStateLabel = "hide";
			}

			//console.log("this.state", this.state, this.thisStateLabel);
			
			if (this.state == UnitInPlay.KO) {
				if (BattleAnimController.battleAnimHolder) {

				} else {
					if (Main.getCurrentLabel(this.clip) != this.thisStateLabel) {
						this.clip.gotoAndStop(this.thisStateLabel);
						this.clip.scale.x = this.dir;
						this.clip_hp.scale.x = this.dir;
					} else {
						if (Main.getCurrentLabel(this.clip) == "ko" && this.clip["anim_"+this.thisStateLabel] && this.clip["anim_"+this.thisStateLabel].action && this.clip["anim_"+this.thisStateLabel].action.currentFrame == this.clip["anim_"+this.thisStateLabel].action.totalFrames) {
							if (this.poisonRemoveDelay > 0) {
								this.poisonRemoveDelay--;
							} else {
								BattleController.currentMap.removeDeadUnits();
							}
						}
					}
				}
			} else
			if (this.state == UnitInPlay.EVADE) {
				if (BattleAnimController.battleAnimHolder) {
				}
			} else
			if (this.state == UnitInPlay.HIT) {
				if (BattleAnimController.battleAnimHolder) {

				}
			} else
			if (this.state == UnitInPlay.PERFORMINGACTION) {
				this.thisStateLabel += String(this.selectedAction);
				if (BattleAnimController.battleAnimHolder && BattleAnimController.battleStarted) {

				} else {
					if (this.unit.unitActions[this.selectedAction].type != Action.ATTACK && Main.getCurrentLabel(this.clip) != this.thisStateLabel) {
						this.clip.gotoAndStop(this.thisStateLabel);
						this.clip.scale.x = this.dir;
						this.clip_hp.scale.x = this.dir;
					}
				}
			} else
			if (Main.getCurrentLabel(this.clip) != this.thisStateLabel) {
				if (this.state == UnitInPlay.MOVINGINTOPOSITION && this.mapX == this.movedFromX && this.mapY == this.movedFromY) {
					this.thisStateLabel = "idle";
				}

				this.clip.gotoAndStop(this.thisStateLabel);


				if (this.thisStateLabel == "idle") {
					this.clip.gotoAndStop("breath");
					if (this.clip["anim_breath"].breath) {
						this.clip["anim_breath"].breath.gotoAndStop(1);
					}
					else this.clip.gotoAndStop(this.thisStateLabel);
				}

				if (this.thisStateLabel == "move") {
					this.clip.anim_move.children[0].play();
				}

				this.clip.scale.x = this.dir;
				this.clip_hp.scale.x = this.dir;
				
				if (this.state == UnitInPlay.WAITINGFORORDER) {
					if (this.clip["anim_"+this.thisStateLabel] && this.clip["anim_"+this.thisStateLabel].breath) {
						this.clip["anim_"+this.thisStateLabel].breath.gotoAndPlay(Math.floor(Math.random() * this.clip["anim_"+this.thisStateLabel].breath.totalFrames) + 1);
					}
				}
			}
			
			if (UnitInPlay.actionSelector == null) {
				UnitInPlay.actionSelectorOpen = false;
			}
		}
		
		public init(unit:Unit, mapX:number, mapY:number, team:number, ai:boolean = false):void {
			this.unit = unit;
			this.currentHP = Math.floor(unit.HP + unit.HPBonus);

			this.coolDownCount = [];
			for (var i:number = 0; i < unit.unitActions.length; i++) {
				this.coolDownCount[i] = 0;
			}
			this.mapX = mapX;
			this.mapY = mapY;
			this.movedFromX = mapX;
			this.movedFromY = mapY;
			this.team = team;
			this.ai = ai;

			//console.log("unit info", unit);

			this.clip = unit.movieClipClass;
			this.clip.alpha = 1;
			this.clip_hp = Main.addGAFMovieClip("HealRiser", false, false);
			this.clip_hp.y = this.clip.hp.transform.localTransform.ty;
			
			this.clip.addChild(this.clip_hp);
			Main.changeText(this.clip_hp.damageDisplay.damage, [String(this.currentHP)], "hp");
			Main.changeText(this.clip.hp, [""]);
			this.clip.hp.visible = false;
			
			if (ai) {
				this.aiController = new unit.aiControllerClass;
			}
			
			if (team == 2) {
				this.dir = -1;
				this.clip.scale.x = this.dir;
				this.clip_hp.scale.x = this.dir;
			}
			this.state = UnitInPlay.IDLE;
			
			UnitInPlay.actionSelector = null;
			UnitInPlay.actionSelectorOpen = false;
		}
		
		public availableForOrder() {
			if (this.state == UnitInPlay.IDLE) {
				this.state = UnitInPlay.WAITINGFORORDER;
			}
		}

		public normalize(point, scale) {
			var norm = Math.sqrt(point.x * point.x + point.y * point.y);
			if (norm != 0) {
			  point.x = scale * point.x / norm;
			  point.y = scale * point.y / norm;
			}
		  }
		
		public moveTo(mapX_:number, mapY_:number, map:BTMap, triggerBeforeMoveFunction:boolean = true):void {
			this.movedFromX = this.mapX;
			this.movedFromY = this.mapY;
			this.mapX = mapX_;
			this.mapY = mapY_;
			
			this.destClipX = (this.mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
			this.destClipY = (this.mapY * Config.GRIDSIZEY) + Config.GRIDSIZEY;
			
			this.state = UnitInPlay.MOVINGINTOPOSITION;
			
			var movePoint:Point = new Point(this.destClipX - this.clipX, this.destClipY - this.clipY);
			
			this.normalize(movePoint, 1);
			this.moveXSpeed = movePoint.x * this.unit.movementSpeed;
			this.moveYSpeed = movePoint.y * this.unit.movementSpeed;

			if (this.moveXSpeed < 0) {
				this.dir = -1;
			} else
			if (this.moveXSpeed > 0) {
				this.dir = 1;
			}
			
			if (triggerBeforeMoveFunction) {
				this.unit.beforeMoveFunction(this, map);
			}
		}
		
		public moveIntoPosition(map:BTMap, triggerAfterMoveFunction:boolean = true):boolean {
			if (Math.abs(this.clipX - this.destClipX) <= this.unit.movementSpeed) {
				this.clipX = this.destClipX;
			} else {
				this.clipX += this.moveXSpeed;
			}
			
			if (Math.abs(this.clipY - this.destClipY) <= this.unit.movementSpeed) {
				this.clipY = this.destClipY;
			} else {
				this.clipY += this.moveYSpeed;
			}
			
			this.clip.x = this.clipX;
			this.clip.y = this.clipY;
			
			if (Math.abs(this.clipX - this.destClipX) <= this.unit.movementSpeed && Math.abs(this.clipY - this.destClipY) <= this.unit.movementSpeed) {
				this.updateClipPosition(map);
				this.state = UnitInPlay.WAITINGFORORDER;
				if (triggerAfterMoveFunction) {
					this.unit.afterMoveFunction(this, map);
				}
				return true;
			}
			
			return false;
		}
		
		public undoMove(map:BTMap) {
			this.mapX = this.movedFromX;
			this.mapY = this.movedFromY;
			this.updateClipPosition(map);
			this.closeActionSelector();
		}
		
		public updateClipPosition(map:BTMap):void {
			if (!this.externalForcesActing) {
				this.clipX = (this.mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
				this.clipY = (this.mapY * Config.GRIDSIZEY) + (Config.GRIDSIZEY);
				this.clip.x = this.clipX;
				if (this.mapX>=0 && map.mapGrid.length > this.mapX && this.mapY>=0 && map.mapGrid[this.mapX].length > this.mapY) {
					this.clip.y = this.clipY - map.mapGrid[this.mapX][this.mapY].height;
				}
				
				if (this.firstFrame) {
					this.startX = this.mapX;
					this.startY = this.mapY;
					this.firstFrame = false;
				}
			}
		}

		public static unlockedActionFilter:PIXI.filters.GlowFilter = Main.convertToPixiGlowFilter(0x33333300, 1, 5, 5, 2, 1, true, true);
		public static unvailableActionFilter:ColorMatrixFilter;
		
		public static generateUnvailableActionFilter() {
			UnitInPlay.unvailableActionFilter = new ColorMatrixFilter();
			UnitInPlay.unvailableActionFilter.saturate(1);
		}
		
		public static actionSelector:any;
		public static actionSelectorOpen:boolean = false;
		public openActionSelector(map:BTMap) {
			if (UnitInPlay.actionSelector == null) {
				UnitInPlay.actionSelector = Main.addGAFMovieClip("ActionIconHolder");
			}
			
			if (UnitInPlay.unvailableActionFilter == null) {
				UnitInPlay.generateUnvailableActionFilter();
			}
			
			var iconX:number = 22;
			var iconY:number = 22;
			
			var anActionButton:any = Main.addGAFMovieClip("UndoActionButton");
			anActionButton.x = iconX;
			anActionButton.y = iconY;
			UnitInPlay.actionSelector.addChild(anActionButton);
			
			iconX += 36;
			
			anActionButton = Main.addGAFMovieClip("EndTurnActionButton");
			anActionButton.x = iconX;
			anActionButton.y = iconY;
			UnitInPlay.actionSelector.addChild(anActionButton);
			
			for (var i:number = 1; i < this.unit.unitActions.length; i++) {
				iconX += 36;
				anActionButton = Main.addGAFMovieClip("SelectActionButton");
				anActionButton.x = iconX;
				anActionButton.y = iconY;
				anActionButton.actionID = i;
				anActionButton.icon.gotoAndStop(this.unit.unitActions[i].iconFrame);
				UnitInPlay.actionSelector.addChild(anActionButton);
				
				if (!this.unit.unlockedActions[i]) {
					anActionButton.filters = [UnitInPlay.unvailableActionFilter];
					anActionButton["redBG"].visible = false;
				} else
				if (this.unit.unitActions[i].coolDown > this.coolDownCount[i]) {

					var coolDownPerc:number = this.coolDownCount[i] / this.unit.unitActions[i].coolDown;
					if (coolDownPerc > 1) {
						coolDownPerc = 1;
					}
					anActionButton["redBG"].scale.y = 1-coolDownPerc;
				} else {
					anActionButton["redBG"].visible = false;
				}
			}
			
			UnitInPlay.actionSelector.bgPanel.width = iconX + 22;
			
			UnitInPlay.actionSelector.x = this.clip.x - (UnitInPlay.actionSelector.bgPanel.width / 2);
			UnitInPlay.actionSelector.y = this.clip.y;
			
			
			if ((UnitInPlay.actionSelector.y + UnitInPlay.actionSelector.height) + map.mapView.y > 320) {
				UnitInPlay.actionSelector.y = this.clip.y - (this.clip.height + UnitInPlay.actionSelector.height);
				
			}
			
			if (UnitInPlay.actionSelector.x + map.mapView.x < 0) {
				UnitInPlay.actionSelector.x = this.clip.x;
				
			} else
			if (UnitInPlay.actionSelector.x + map.mapView.x + UnitInPlay.actionSelector.width > 640) {
				UnitInPlay.actionSelector.x = this.clip.x - UnitInPlay.actionSelector.width;
				
			}
			
			map.mapView.addChild(UnitInPlay.actionSelector);
			UnitInPlay.actionSelectorOpen = true;
		}
		
		public closeActionSelector() {
			if (UnitInPlay.actionSelector && UnitInPlay.actionSelector.parent) {
				UnitInPlay.actionSelector.parent.removeChild(UnitInPlay.actionSelector);
			}
			UnitInPlay.actionSelector = null;
		}
		
		public selectAction(actionID:number):boolean {
			if (this.unit.level >= this.unit.unitActions[actionID].level && this.unit.unitActions[actionID].coolDown <= this.coolDownCount[actionID]) {
				if (this.unit.unitActions[actionID].type == Action.SELF) {
					this.unit.unitActions[actionID].performSelfAction(this);
					this.coolDownCount[actionID] = -1;
				}
				
				this.selectedAction = actionID;
				this.closeActionSelector();
				return true;
			}
			return false;
		}
		
		public performAction(map:BTMap, targetX:number, targetY:number):boolean {
			if (this.coolDownCount[this.selectedAction] >= this.unit.unitActions[this.selectedAction].coolDown && this.unit.performAction(this.selectedAction, map, this, targetX, targetY)) {
				this.coolDownCount[this.selectedAction] = -1;
				if (targetX > this.mapX) {
					this.dir = 1;
				} else
				if (targetX < this.mapX) {
					this.dir = -1;
				}

				this.clip.scale.x = this.dir;
				this.clip_hp.scale.x = this.dir;

				this.state = UnitInPlay.PERFORMINGACTION;
				return true;
			}
			
			return false;
		}
		
		public updateAction(map:BTMap):boolean {
			return this.unit.unitActions[this.selectedAction].updateAction(map, this);
		}
		
		public actionAnimFinished(animClip:any):boolean {
			if (Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.KO] || Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.HIT] || Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.EVADE] || Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.PERFORMINGACTION]+String(this.selectedAction)) {
				if (animClip["anim_"+this.thisStateLabel] && animClip["anim_"+this.thisStateLabel].action) {
					if (animClip["anim_"+this.thisStateLabel].action.currentFrame == animClip["anim_"+this.thisStateLabel].action.totalFrames) {
						this.state = UnitInPlay.IDLE;
						return true;
					} else {
						return false;
					}
				}
				
				this.state = UnitInPlay.IDLE;
				return true;
			} else {
				return false;
			}
		}
		
		public actionHit(animClip:any):boolean {
			if (animClip["anim_"+this.thisStateLabel] && animClip["anim_"+this.thisStateLabel].action) {
				if (Main.getCurrentLabel(animClip["anim_"+this.thisStateLabel].action) == "attackOver") {
					return true;
				} else {
					return false;
				}
			}
			
			return false;
		}
		
		public updateCoolDowns() {
			for (var i:number = 0; i < this.coolDownCount.length; i++) {
				this.coolDownCount[i]++;
			}
		}
		
		public removeFromPlay() {
			if (this.clip && this.clip.parent) {
				this.clip.parent.removeChild(this.clip);
			}
		}
		
		public endTurn() {
			this.actioned = true;
			this.state = UnitInPlay.IDLE;
			this.movedFromX = this.mapX;
			this.movedFromY = this.mapY;	
			this.closeActionSelector();
		}
		
		public heal(maxHealPerc:number):number {
			var healAmount:number = Math.ceil((this.unit.HP + this.unit.HPBonus) * maxHealPerc);
			
			if (this.currentHP + healAmount > this.unit.HP + this.unit.HPBonus) {
				healAmount = (this.unit.HP + this.unit.HPBonus) - this.currentHP;
				this.currentHP = Math.floor(this.unit.HP + this.unit.HPBonus);
			} else {
				this.currentHP += Math.floor(healAmount);
			}
			
			this.poisonTurns = 0;
			this.poisonPower = 0;
			
			return healAmount;
		}
		
		public awardXP(XPToAward:number, reason:number) {
			this.XPEarned += XPToAward;
			this.XPEarnedFor[reason] += XPToAward;
			this.XPEarnedLastAttack += XPToAward;
			this.stats[reason]++;
		}
		
	}
}

import UnitInPlay = com.ussgames.battleTactics.UnitInPlay;
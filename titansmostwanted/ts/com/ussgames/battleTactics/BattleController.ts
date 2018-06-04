module com.ussgames.battleTactics {
	
	export class BattleController {
		public static SELECTUNITPHASE:number = 0;
		public static MOVEMENTPHASE:number = 1;
		public static MOVINGINTOPOSITION:number = 2;
		public static SELECTACTIONPHASE:number = 3;
		public static ACTIONPHASE:number = 4;
		public static PERFORMINGACTIONPHASE:number = 5;
		public static currentPhase:number = BattleController.SELECTUNITPHASE;
		
		public static currentMap:BTMap;
		public static teamsTurn:number;
		public static teamPopInc:number = 0;
		public static teamPopShown:boolean = false;
		public static selectedUnit:UnitInPlay;
		public static selectedUnit_switch:UnitInPlay;
		public static hoverUnit:UnitInPlay;
		public static showingMovementsOrActions:boolean = false;
		
		public static aiTeams:any[] = [false, false];
		public static aiCalculated:boolean = false;
		public static nextAIUnit:number = 0;
		
		public static residualEffects:any[];
		
		public static AIPAUSEBETWEENPHASES:number = 10;
		public static phaseDelay:number = 0;

		public static persistentTeamUnits:any[];
		public static yourTeamUnits:any[];
		
		public static showingTutorial:boolean = false;
		public static validClick:boolean = true;
		
		public static battleOver:boolean = false;
		public static battleOverCountDown:number = 60;
		
		public static startSpeech:any[] = ["", "", "", "", "", ""];
		public static startSpeechCharacter:any[] = [1, 1, 1, 1, 1, 1];
		public static endSpeech:any[] = ["", "", "", "", "", ""];
		public static endSpeechCharacter:any[] = [1, 1, 1, 1, 1, 1];
		public static endSpeechClips:any[] = [];
		
		public static tutorialDone:boolean = false;
		public static mouseDown:boolean = false;
		
		public static generalDelayCount:number = 0;

		public static mouseActionIcon:any;

		public static xpCounter:number = 0;
		public static xpCounterClip:any;
		
		constructor() {
			
		}
		
		public static initBattle(map:BTMap, ai1:boolean = false, ai2:boolean = true) {
			BattleController.currentPhase = BattleController.SELECTUNITPHASE;

			BattleController.teamPopShown = false;
			BattleController.showingMovementsOrActions = false;
			BattleController.aiCalculated = false;
			BattleController.nextAIUnit = 0;
			BattleController.phaseDelay = 0;
			
			BattleController.currentMap = map;
			BattleController.teamsTurn = 1;
			BattleController.aiTeams[0] = ai1;
			BattleController.aiTeams[1] = ai2;
			BattleController.aiCalculated = false;
			BattleController.mouseDown = false;
			
			map.viewContainer.on(CustomMouseEvent.CLICK, BattleController.mouseClicked);
			map.viewContainer.on(CustomMouseEvent.MOUSE_DOWN, BattleController.mouseDown_h);
			map.viewContainer.on(CustomMouseEvent.MOUSE_UP, BattleController.mouseUp_h);
			map.viewContainer.on(CustomMouseEvent.MOUSE_OUT, BattleController.mouseUp_h);
			
			BattleController.hideAllInfoPanels();
			BattleController.teamPopShown = false;
			
			BattleController.resetSpecialActionFlags();
			
			BattleController.runStartOfTeamsTurnFunctions();
			
			BattleController.residualEffects = [];
			
			BattleController.battleOver = false;
			BattleController.battleOverCountDown = 60;
			
			BattleController.yourTeamUnits = [];
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (map.unitsInPlay[i].team == 1) {
					BattleController.yourTeamUnits.push(map.unitsInPlay[i]);
					map.unitsInPlay[i].update();
				}
			}
			
			for (var j:number = 0; j < BattleController.persistentTeamUnits.length; j++) {
				BattleController.persistentTeamUnits[j].prevXP = BattleController.persistentTeamUnits[j].XP;
				BattleController.persistentTeamUnits[j].prevLevel = BattleController.persistentTeamUnits[j].level;
			}
			
			SpeechController.init();
			for (var k:number = 0; k < BattleController.startSpeech.length; k++) {
				if (BattleController.startSpeech[k] != "") {
					var theUnit:UnitInPlay = BattleController.currentMap.getUnitForID(BattleController.startSpeechCharacter[k]-1);
					if (theUnit) {
						SpeechController.addSpeech(BattleController.startSpeech[k], theUnit.clip);
					}
				}
			}
			
			BattleController.endSpeechClips = [];
			for (var l:number = 0; l < BattleController.endSpeech.length; l++) {
				if (BattleController.endSpeech[l] != "") {
					theUnit = BattleController.currentMap.getUnitForID(BattleController.endSpeechCharacter[l]-1);
					if (theUnit) {
						BattleController.endSpeechClips.push(theUnit);
					}
				}
			}
			
			BattleController.generalDelayCount = 0;
			BattleController.tutorialDone = false;
			Controller.root.infoPanels.actionSelectorPanel.showingActionInfo = false;
			Controller.root.infoPanels.actionSelectorPanel.visible = false;
			Controller.root.infoPanels.enemyInfoPanel.visible = false;
			Controller.root.infoPanels.enemyInfoPanel.gotoAndStop(1);
			Controller.root.tut.visible = true;
			Controller.root.infoPanels.attackRangeKey.visible = false;
			ScreenShaker.init(Controller.root.battleAnimContainer);
			
			Controller.root.infoPanels.visible = true;

			if (Controller.getLevelNumber() == 1) {
				Main.inGamePanel.openPanel("tut1");
			}
		}
		
		public static initPersistentUnits(unitSavedDataArray:any[] = null) {
			BattleController.persistentTeamUnits = [];
			for (var i:number = 0; i < 5; i++) {
				BattleController.persistentTeamUnits[i] = new Config.unitConfigs[i];
				BattleController.persistentTeamUnits[i].init();
				BattleController.persistentTeamUnits[i].initUnlockedActions();
				BattleController.persistentTeamUnits[i].id = i;
				
				if (unitSavedDataArray) {
					BattleController.persistentTeamUnits[i].restoreFromSaveData(unitSavedDataArray[i]);
				}
			}
		}
		
		public static getPersistendUnitData():any[] {
			var unitDataArray:any[] = [];
			for (var i:number = 0; i < BattleController.persistentTeamUnits.length; i++) {
				unitDataArray.push(BattleController.persistentTeamUnits[i].getSaveData());
			}
			return unitDataArray;
		}
		
		public static resetSpecialActionFlags() {
			JinxHex.hexedUnit = null;
		}
		
		public static update() {
			ScreenShaker.update();

			if (!Controller.flags.infoPanels.actionSelectorPanel) {
				Controller.flags.infoPanels.actionSelectorPanel = true;
				Controller.root.infoPanels.actionSelectorPanel = new ActionSelectorPanel(Controller.root.infoPanels.actionSelectorPanel);
			}
			Controller.root.infoPanels.actionSelectorPanel.update();

			if (!Controller.flags.infoPanels.enemyInfoPanel) {
				Controller.flags.infoPanels.enemyInfoPanel = true;
				Controller.root.infoPanels.enemyInfoPanel = new EnemyInfoPanel(Controller.root.infoPanels.enemyInfoPanel);
			}
			Controller.root.infoPanels.enemyInfoPanel.update();

			
			if (GamePanel.panelOpen) {
				return;
			}
			
			if (BattleController.generalDelayCount > 0) {
				BattleController.generalDelayCount--;
				return;
			}
			
			if (BattleAnimController.battleAnimHolder == null && SpeechController.running) {
				SpeechController.update();
				if (!SpeechController.running && !BattleController.tutorialDone) {
					if (Config.tutorialIntroLevels[Controller.getLevelNumber() - 1]) {
						Main.inGamePanel.openPanel("tut" + String(Controller.getLevelNumber()), "BattleController.startTutorial");
					} else
					if (Config.tutorialInteractiveLevels[Controller.getLevelNumber() - 1]) {
						BattleController.startTutorial();
					}
					
					BattleController.tutorialDone = true;
				}
				return;
			}
			
			if (BattleAnimController.battleAnimHolder == null) { 
				for (var j:number = 0; j < BattleController.yourTeamUnits.length; j++) {
					if (BattleController.yourTeamUnits[j].XPEarnedLastAttack > 0) {
						BattleController.showXPRiser(BattleController.yourTeamUnits[j].XPEarnedLastAttack, BattleController.yourTeamUnits[j]);
						BattleController.yourTeamUnits[j].XPEarnedLastAttack = 0;
					}
				}
				
				if (BattleController.checkForWinner() == 1) {
					if (BattleController.battleOver) {
						BattleController.battleOverCountDown--;
						if (BattleController.battleOverCountDown<=0) {
							BattleController.awardSurvivalXP();
							BattleController.levelUpPersistentUnits();
							Controller.main.stopGame();
							
							Controller.main.levelComplete();
							return;
						}
					} else {
						BattleController.battleOver = true;
					}
				} else
				if (BattleController.checkForWinner() == 2) {
					if (BattleController.battleOver) {
						BattleController.battleOverCountDown--;
						if (BattleController.battleOverCountDown<=0) {
							SoundController.stopMusic();
							SoundController.playSound("lose");
							Controller.main.stopGame();
							Controller.main.gameOver();
							return;
						}
					} else {
						BattleController.battleOver = true;
					}
				}
				
				if (!BattleController.teamPopShown && !BattleController.battleOver) {
					var teamPop:any = Main.addGAFMovieClip("TeamPop");
					this.teamPopInc++;

					Main.changeText(teamPop.children[0].teamName, Localizer.getlocalisedText(Config.TEAMNAMES[BattleController.teamsTurn-1]));
					
					teamPop.play();
					teamPop.x = 320;
					teamPop.y = 0;
					Controller.root.gameContainer.addChild(teamPop);
					BattleController.teamPopShown = true;

					Main.addCustomEfFunc('teamPop.onEnterFrame'+this.teamPopInc, function(this, num, teamPop_)
					{
						if (teamPop_.currentFrame == teamPop_.totalFrames) {
							Controller.root.gameContainer.removeChild(teamPop_);
							Main.removeCustomEfFunc("teamPop.onEnterFrame"+num);
						}
					}.bind(this, this.teamPopInc, teamPop));

					if (BattleController.teamsTurn == 1) {
						BattleController.currentMap.clearSquareHighlights();
						BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
					}
				}
			} else
			if (BattleAnimController.battleAnimHolder.parent) {
				if (BattleAnimController.battleAnimHolder.currentFrame == 20) {
					Controller.root.infoPanels.actionSelectorPanel.x = ActionSelectorPanel.OFFX;
					Controller.root.infoPanels.actionSelectorPanel._titanID = -1;
					Controller.root.infoPanels.actionSelectorPanel._unitInPlay = null;
					Controller.root.infoPanels.enemyInfoPanel.x = EnemyInfoPanel.OFFX;
					
					if (Controller.getLevelNumber() == 2) {
						Controller.root.tut.visible = false;
					}
				}
				
				if (!SpeechController.running) {
					BattleController.checkForWinner(false);
				}
			}
			
			var i:number;
			
			if (!BattleController.battleOver) {
				if (BattleController.aiTeams[BattleController.teamsTurn - 1]) {
					BattleController.currentMap.clearSquareHighlights();
					
					if (!BattleController.aiCalculated) {
						
						for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
							if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && BattleController.currentMap.unitsInPlay[i].ai && BattleController.currentMap.unitsInPlay[i].currentHP>0 && !BattleController.currentMap.unitsInPlay[i].actioned) {
								BattleController.currentMap.unitsInPlay[i].aiController.initialDecision(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
							}
						}
						
						for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
							if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && BattleController.currentMap.unitsInPlay[i].ai && BattleController.currentMap.unitsInPlay[i].currentHP>0 && !BattleController.currentMap.unitsInPlay[i].actioned) {
								BattleController.currentMap.unitsInPlay[i].aiController.reconsider(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
							}
						}
						
						var aiUnits:any[] = [];
						for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
							if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && BattleController.currentMap.unitsInPlay[i].ai && BattleController.currentMap.unitsInPlay[i].currentHP>0 && !BattleController.currentMap.unitsInPlay[i].actioned) {
								aiUnits.push(BattleController.currentMap.unitsInPlay[i]);
							}
						}
						AIController.chooseUnitOrder(aiUnits);
						BattleController.nextAIUnit = 0;
						
						BattleController.aiCalculated = true;
						BattleController.phaseDelay = BattleController.AIPAUSEBETWEENPHASES;
						
					} else {
						
						if (BattleController.phaseDelay > 0) {
							BattleController.phaseDelay--;
							return;
						}
					
						switch (BattleController.currentPhase) {
							case BattleController.SELECTUNITPHASE:
								BattleController.currentMap.clearSquareHighlights();
								BattleController.selectedUnit = AIController.unitActionOrder[BattleController.nextAIUnit];
								BattleController.currentPhase = BattleController.MOVEMENTPHASE;
								break;
								
							case BattleController.MOVEMENTPHASE:
								BattleController.selectedUnit.aiController.setAction(BattleController.selectedUnit, BattleController.currentMap);
								BattleController.selectedUnit.moveTo(AIController.unitActionOrder[BattleController.nextAIUnit].aiController.mapTargetX, AIController.unitActionOrder[BattleController.nextAIUnit].aiController.mapTargetY, BattleController.currentMap);
								BattleController.selectedUnit.aiController.checkForRandomAttack(BattleController.selectedUnit, BattleController.currentMap);
								BattleController.currentPhase = BattleController.MOVINGINTOPOSITION;
								break;
								
							case BattleController.MOVINGINTOPOSITION:
								if (BattleController.selectedUnit) {
									if (BattleController.selectedUnit.moveIntoPosition(BattleController.currentMap)) {
										BattleController.currentPhase = BattleController.SELECTACTIONPHASE;
										BattleController.phaseDelay = BattleController.AIPAUSEBETWEENPHASES;
									}
								}
								break;
								
							case BattleController.SELECTACTIONPHASE:
								BattleController.selectedUnit.selectAction(BattleController.selectedUnit.aiController.potentialActions[0].actionID);
								BattleController.currentPhase = BattleController.ACTIONPHASE;
								break;
								
							case BattleController.ACTIONPHASE:
								if (BattleController.selectedUnit.aiController.potentialActions[0].actionType == AIController.ATTACK) {
									
									console.log("performAction 1");

									//player action
									if (BattleController.selectedUnit.performAction(BattleController.currentMap, BattleController.selectedUnit.aiController.potentialActions[0].otherUnit.mapX, BattleController.selectedUnit.aiController.potentialActions[0].otherUnit.mapY)) {
										BattleController.currentPhase = BattleController.PERFORMINGACTIONPHASE;
										BattleController.phaseDelay = BattleController.AIPAUSEBETWEENPHASES;
									} else {
										BattleController.endTurn();
									}
								} else {
									BattleController.endTurn();
								}
								break;
								
							case BattleController.PERFORMINGACTIONPHASE:
								if (BattleController.selectedUnit.updateAction(BattleController.currentMap)) {
									BattleController.endTurn();
									BattleController.currentMap.removeDeadUnits();
									BattleController.currentMap.clearSquareHighlights();
								}
								break;
								
						}
					}
				} else {
					BattleController.aiCalculated = false;
					
					switch (BattleController.currentPhase) {
						
						case BattleController.SELECTUNITPHASE:
						case BattleController.MOVEMENTPHASE:
						case BattleController.SELECTACTIONPHASE:
						case BattleController.ACTIONPHASE:
							if (BattleController.currentPhase == BattleController.ACTIONPHASE || !Controller.root.infoPanels.actionSelectorPanel.showingActionInfo) {
								BattleController.hilightUnitUnderMouse();
							}
							break;
							
						case BattleController.PERFORMINGACTIONPHASE:
							if (BattleController.selectedUnit.updateAction(BattleController.currentMap)) {
								BattleController.endTurn();
								BattleController.currentMap.removeDeadUnits();
								BattleController.currentMap.clearSquareHighlights();
								BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
							}
							break;
							
						case BattleController.MOVINGINTOPOSITION:
							if (BattleController.selectedUnit) {
								if (BattleController.selectedUnit.moveIntoPosition(BattleController.currentMap)) {
									BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
									BattleController.currentPhase = BattleController.SELECTACTIONPHASE;
								}
							}
							break;
							
					}
				}
				
				BattleController.showMouseIcon();
			}
			
			BattleController.currentMap.depthSortView();
			
			for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
				BattleController.currentMap.unitsInPlay[i].update();
			}
			
			for (i = BattleController.residualEffects.length - 1; i >= 0; i--) {
				if (!BattleController.residualEffects[i].effectLive) {
					BattleController.residualEffects.splice(i, 1);
				} else {
					BattleController.residualEffects[i].update(BattleController.currentMap);
				}
			}
			
			if (!BattleController.battleOver && BattleController.selectedUnit && BattleController.currentPhase != BattleController.SELECTACTIONPHASE) {
				BattleController.displayTargetInfo();
				if (BattleController.currentPhase == BattleController.ACTIONPHASE) {
					var percDisplayed:boolean = false;
					var mapSquare:MapSquare = BattleController.currentMap.getMapSquareUnderMouse();
					if (mapSquare && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] >= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].minRange && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] <= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].maxRange) {
						var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
						if (unitInSquare && unitInSquare.team!=BattleController.selectedUnit.team) {
							Controller.root.infoPanels.enemyInfoPanel.showUnitInfo(unitInSquare);
							percDisplayed = true;
						}
					}
					if (!percDisplayed) {
						Controller.root.infoPanels.enemyInfoPanel.closePanel();
					}
				}
			}
			
			if (!BattleController.battleOver && !BattleController.selectedUnit) {
				BattleController.endTurn();
			}
		}
		
		public static cleanUp() {

			//console.log("cleanUp BattleController.currentMap", BattleController.currentMap, Controller.root.gameContainer);

			if (BattleController.currentMap != undefined)
			{
				if (BattleController.currentMap.viewContainer != undefined)
				{
					BattleController.currentMap.viewContainer.off(CustomMouseEvent.CLICK, BattleController.mouseClicked);
					BattleController.currentMap.viewContainer.off(CustomMouseEvent.MOUSE_DOWN, BattleController.mouseDown_h);
					BattleController.currentMap.viewContainer.off(CustomMouseEvent.MOUSE_UP, BattleController.mouseUp_h);
					BattleController.currentMap.viewContainer.off(CustomMouseEvent.MOUSE_OUT, BattleController.mouseUp_h);
				}
				BattleController.currentMap.cleanUp();
			}
			BattleController.currentMap = null;
			BattleController.selectedUnit = null;
			BattleController.hoverUnit = null;
		}
		
		public static undo(fromButton:boolean = false) {
			if (BattleController.currentPhase == BattleController.MOVINGINTOPOSITION || BattleController.currentPhase == BattleController.PERFORMINGACTIONPHASE) {
				return;
			}
			
			BattleController.hideDamagePercClips();
			
			if (BattleController.currentPhase == BattleController.MOVINGINTOPOSITION || BattleController.currentPhase == BattleController.SELECTACTIONPHASE || BattleController.currentPhase == BattleController.ACTIONPHASE) {
				BattleController.selectedUnit.undoMove(BattleController.currentMap);
				BattleController.currentPhase = BattleController.MOVEMENTPHASE;
				
				if (fromButton) {
					SoundController.playSound("select");
				}
			} else
			if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
				BattleController.currentPhase = BattleController.SELECTUNITPHASE;
				if (fromButton) {
					SoundController.playSound("select");
				}
			}
			BattleController.currentMap.clearUnitHighlights();
			BattleController.currentMap.clearSquareHighlights();
			
			if (BattleController.selectedUnit) {
				BattleController.selectedUnit.selectedAction = 0;
			}
			
			if (BattleController.currentPhase == BattleController.SELECTUNITPHASE) {
				BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
				BattleController.showingMovementsOrActions = false;
				BattleController.hoverUnit = null;
				BattleController.selectedUnit = null;
				BattleController.hideAllInfoPanels();
			} else
			if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
				BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
				BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
				BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
			}
			
			Controller.root.infoPanels.actionSelectorPanel.hilightAction(0);
			
			BattleController.switchToPrevSelectedUnit();
		}
		
		public static endTurn(fromButton:boolean = false) {
			if (BattleController.currentPhase == BattleController.MOVINGINTOPOSITION) {
				return;
			}
			
			var i:number;
			var turnEnded:boolean = false;
			
			if (BattleController.selectedUnit) {
				BattleController.selectedUnit.updateCoolDowns();
				BattleController.selectedUnit.endTurn();
				turnEnded = true;
			}
			
			var movesRemaining:boolean = false;
			for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
				if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && !BattleController.currentMap.unitsInPlay[i].actioned) {
					movesRemaining = true;
				}
			}
			if (!movesRemaining) {
				for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
					BattleController.currentMap.unitsInPlay[i].actioned = false;
				}
				
				for (i = 0; i < BattleController.residualEffects.length; i++) {
					BattleController.residualEffects[i].endTeamTurn(BattleController.teamsTurn, BattleController.currentMap);
				}
				
				BattleController.teamsTurn++;
				if (BattleController.teamsTurn > 2) {
					BattleController.teamsTurn = 1;
				}
				BattleController.generalDelayCount = Math.floor(15*2.4);
				
				if (Controller.getLevelNumber() == 1) {
					BattleController.nextTutorialFrame();
				} else
				if (BattleController.showingTutorial && Controller.getLevelNumber() == 2) {
					if (Controller.root.tut.currentFrame!=18) {
						BattleController.nextTutorialFrame(18);
						Controller.root.tut.visible = true;
					} else {
						BattleController.nextTutorialFrame();
					}
				}
				
				BattleController.aiCalculated = false;
				BattleController.teamPopShown = false;
				
				BattleController.runStartOfTeamsTurnFunctions();
				BattleController.runEndOfTeamsTurnFunctions();
				
				for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
					if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn) {
						if (JinxHex.hexedUnit && JinxHex.hexedUnit == BattleController.currentMap.unitsInPlay[i]) {
							BattleController.currentMap.unitsInPlay[i].actioned = true;
							JinxHex.hexedUnit = null;
							break;
						}
					}
				}
				turnEnded = true;
				
			}
			
			if (turnEnded) {
				BattleController.currentMap.clearUnitHighlights();
				BattleController.currentMap.clearSquareHighlights();
				BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
				BattleController.showingMovementsOrActions = false;
				BattleController.hoverUnit = null;
				BattleController.selectedUnit = null;
				BattleController.lastHighlightMouseDown = false;
				
				BattleController.currentPhase = BattleController.SELECTUNITPHASE;
				
				BattleController.aiCalculated = false;
				BattleController.nextAIUnit = 0;
				
				BattleController.hideAllInfoPanels();
				
				if (fromButton) {
					SoundController.playSound("select");
				}
				
				BattleController.switchToPrevSelectedUnit();
			}
		}
		
		public static switchToPrevSelectedUnit() {
			if (BattleController.selectedUnit_switch) {
				BattleController.selectedUnit = BattleController.selectedUnit_switch;
				BattleController.selectedUnit.selectedAction = 0;
				BattleController.currentPhase = BattleController.MOVEMENTPHASE;
				
				BattleController.currentMap.clearSquareHighlights();
				BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
				BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
				BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
				
				BattleController.selectedUnit_switch = null;
			}
		}
		
		public static runStartOfTeamsTurnFunctions():void {
			for (var i:number = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
				if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn) {
					BattleController.currentMap.unitsInPlay[i].unit.startOfTeamsTurnFunction(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
				}
			}
		}
		
		public static runEndOfTeamsTurnFunctions():void {
			for (var i:number = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
				if (BattleController.currentMap.unitsInPlay[i].team != BattleController.teamsTurn) {
					BattleController.currentMap.unitsInPlay[i].unit.endOfTeamsTurnFunction(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
				}
			}
		}
		
		public static checkForWinner(triggerEnd:boolean = true):number {
			var team1Count:number = 0;
			var team2Count:number = 0;
			for (var i:number = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
				if (BattleController.currentMap.unitsInPlay[i].team == 1 && BattleController.currentMap.unitsInPlay[i].currentHP > 0) {
					team1Count++;
				} else
				if (BattleController.currentMap.unitsInPlay[i].team == 2 && BattleController.currentMap.unitsInPlay[i].currentHP > 0) {
					team2Count++;
				}
			}
			if (team1Count == 0 && team2Count > 0) {
				return 2;
			} else
			if (team1Count > 0 && team2Count == 0) {
				if (!BattleController.battleOver) {
					BattleController.doEndSpeech(triggerEnd);
				}
				return 1;
			}
			//return 1; //debug fix
			return 0;
		}
		
		public static doEndSpeech(triggerEnd:boolean = true) {
			if (triggerEnd) {
				SoundController.stopMusic();
				SoundController.playSound("win");
				
				SpeechController.init();
			}
			for (var k:number = 0; k < BattleController.endSpeech.length; k++) {
				if (BattleController.endSpeech[k] != "") {
					if (!BattleController.endSpeechClips[k].clip.parent) {
						BattleController.currentMap.unitsContainerClip.addChild(BattleController.endSpeechClips[k].clip);
						BattleController.currentMap.objectClipsInView.push(BattleController.endSpeechClips[k].clip);
						
						var mX:number = BattleController.endSpeechClips[k].startX;
						var mY:number = BattleController.endSpeechClips[k].startY;
						var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mX, mY);
						while (unitInSquare) {
							mX = Math.floor(Math.random() * BattleController.currentMap.mapGrid.length);
							mY = Math.floor(Math.random() * BattleController.currentMap.mapGrid[0].length);
							var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mX, mY);
						}
						
						BattleController.endSpeechClips[k].externalForcesActing = false;
						BattleController.endSpeechClips[k].mapX = mX;
						BattleController.endSpeechClips[k].mapY = mY;
						BattleController.endSpeechClips[k].updateClipPosition(BattleController.currentMap);
						BattleController.endSpeechClips[k].clip.gotoAndStop("breath");
						BattleController.endSpeechClips[k].clip.filters = [];
						BattleController.endSpeechClips[k].clip.hp.visible = false;
						BattleController.endSpeechClips[k].clip_hp.visible = false;
						
						BattleController.currentMap.depthSortView();
					}
					
					if (triggerEnd) {
						SpeechController.addSpeech(BattleController.endSpeech[k], BattleController.endSpeechClips[k].clip);
						
						Controller.root.infoPanels.visible = false;
						Controller.root.infoPanels.enemyInfoPanel.gotoAndStop(1);
						
						if (Controller.root.batman.currentFrame == 1 && Controller.getLevelNumber() == 12) {
							Controller.root.batman.gotoAndPlay(2);
						}
					}
				}
			}
			
			for (var i:number = 0; i < BattleController.yourTeamUnits.length; i++) {
				if (!BattleController.yourTeamUnits[i].clip.parent) {
					BattleController.currentMap.unitsContainerClip.addChild(BattleController.yourTeamUnits[i].clip);
					BattleController.currentMap.objectClipsInView.push(BattleController.yourTeamUnits[i].clip);
					
					var mX:number = BattleController.yourTeamUnits[i].startX;
					var mY:number = BattleController.yourTeamUnits[i].startY;
					var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mX, mY);
					while (unitInSquare || BattleController.currentMap.mapGrid[mX][mY].type == MapSquare.NOACCESS) {
						mX = Math.floor(Math.random() * BattleController.currentMap.mapGrid.length);
						mY = Math.floor(Math.random() * BattleController.currentMap.mapGrid[0].length);
						var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mX, mY);
					}
					
					BattleController.yourTeamUnits[i].externalForcesActing = false;
					BattleController.yourTeamUnits[i].mapX = mX;
					BattleController.yourTeamUnits[i].mapY = mY;
					BattleController.yourTeamUnits[i].updateClipPosition(BattleController.currentMap);
					BattleController.yourTeamUnits[i].clip.gotoAndStop("breath");
					BattleController.yourTeamUnits[i].clip.hp.visible = false;
					BattleController.yourTeamUnits[i].clip_hp.visible = false;
					
					BattleController.currentMap.depthSortView();
				}
				
				BattleController.yourTeamUnits[i].clip.filters = [];
			}
			
			BattleController.currentMap.clearSquareHighlights();
			BattleController.currentMap.clearUnitHighlights(true);
			Controller.root.infoPanels.actionSelectorPanel.x = ActionSelectorPanel.OFFX;
			Controller.root.infoPanels.actionSelectorPanel.visible = false;
			Controller.root.infoPanels.actionSelectorPanel._titanID = -1;
			Controller.root.infoPanels.actionSelectorPanel._unitInPlay = null;
			Controller.root.infoPanels.enemyInfoPanel.x = EnemyInfoPanel.OFFX;
			Controller.root.infoPanels.enemyInfoPanel.visible = false;
			Controller.root.infoPanels.enemyInfoPanel.gotoAndStop(1);
			
			if (Controller.getLevelNumber() == 2) {
				Controller.root.tut.visible = false;
			}
			
		}
		
		public static awardSurvivalXP() {
			for (var i:number = 0; i < BattleController.yourTeamUnits.length; i++) {
				if (BattleController.yourTeamUnits[i].currentHP > 0) {
					BattleController.yourTeamUnits[i].awardXP(Config.SURVIVEXP, UnitInPlay.SURVIVE);
				}
			}
		}
		
		public static levelUpPersistentUnits() {
			for (var i:number = 0; i < BattleController.yourTeamUnits.length; i++) {
				BattleController.yourTeamUnits[i].unit.increaseXP(BattleController.yourTeamUnits[i].XPEarned);
			}
		}
		
		public static selectAction(actionID:number) {
			
			if (BattleController.currentPhase != BattleController.MOVINGINTOPOSITION) {
				if (BattleController.selectedUnit.selectAction(actionID)) {
					if (BattleController.selectedUnit.unit.unitActions[actionID].type != Action.SELF) {
						if (BattleController.selectedUnit.unit.unitActions[actionID].attackMultipleUnits && !BattleController.selectedUnit.unit.unitActions[actionID].straightLineOnly) {
							
							var unitToAttack:UnitInPlay;
							
							for (var i:number = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
								if (BattleController.currentMap.unitsInPlay[i].team != BattleController.selectedUnit.team && BattleController.currentMap.actionGrid[BattleController.currentMap.unitsInPlay[i].mapX][BattleController.currentMap.unitsInPlay[i].mapY] >= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].minRange && BattleController.currentMap.actionGrid[BattleController.currentMap.unitsInPlay[i].mapX][BattleController.currentMap.unitsInPlay[i].mapY] <= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].maxRange) {
									unitToAttack = BattleController.currentMap.unitsInPlay[i];
									break;
								}
							}

							console.log("performAction 2");
							
							if (unitToAttack && BattleController.selectedUnit.performAction(BattleController.currentMap, unitToAttack.mapX, unitToAttack.mapY)) {
								BattleController.currentMap.clearSquareHighlights();
								BattleController.currentMap.clearUnitHighlights();
								BattleController.currentPhase = BattleController.PERFORMINGACTIONPHASE;
								
								BattleController.hideDamagePercClips();
								SoundController.playSound("select");
							}
							
						} else {
							BattleController.showActionGrid();
							BattleController.currentPhase = BattleController.ACTIONPHASE;
							Controller.root.infoPanels.actionSelectorPanel.hilightAction(actionID);
							SoundController.playSound("select");
						}
					} else {
						BattleController.endTurn();
						SoundController.playSound("select");
					}
				}
			}
			
			if (BattleController.showingTutorial) {
				BattleController.nextTutorialFrame();
			}
		}
		
		public static showActionGrid() {
			BattleController.hideDamagePercClips();
			BattleController.currentMap.clearUnitHighlights();
			BattleController.currentMap.clearSquareHighlights();
			BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
			BattleController.currentMap.calculateActionGrid(BattleController.selectedUnit);
			BattleController.currentMap.showActionGrid(BattleController.selectedUnit);
			BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
			
			BattleController.showingMovementsOrActions = true;
		}
		
		public static lastHighlightMouseDown:boolean = false;
		public static hilightUnitUnderMouse() {
			var mapSquare:MapSquare = BattleController.currentMap.getMapSquareUnderMouse();
			if (mapSquare) {
				var unitInPlay:UnitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
				
				if (BattleController.mouseDown && unitInPlay && unitInPlay.team == 1) {
					BattleController.mouseDown = false;
				}
				
				if (BattleController.currentPhase == BattleController.ACTIONPHASE) {
				} else
				if (unitInPlay && (BattleController.currentPhase!=BattleController.SELECTACTIONPHASE || unitInPlay!=BattleController.selectedUnit)) {
					if (unitInPlay != BattleController.hoverUnit || BattleController.mouseDown!=BattleController.lastHighlightMouseDown || BattleController.hoverUnit == null) {
						BattleController.currentMap.clearUnitHighlights();
						BattleController.currentMap.clearSquareHighlights();
						
						if (!BattleController.mouseDown || unitInPlay.team == 1) {
							BattleController.currentMap.calculateMovementGrid(unitInPlay, true, true);
						} else {
							BattleController.currentMap.clearMovementGrid();
							BattleController.currentMap.movementGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
						}
						if (unitInPlay.team == 1) {
							BattleController.currentMap.showMovementGrid();
						}
						BattleController.currentMap.calculateUnitDangerArea(unitInPlay);
						BattleController.currentMap.showActionGrid(unitInPlay, true, !BattleController.mouseDown);
						
						BattleController.currentMap.hilightUnit(unitInPlay);
						
						BattleController.showingMovementsOrActions = true;
						
						BattleController.hoverUnit = unitInPlay;
							
						if (unitInPlay.ai == false) {
							Controller.root.infoPanels.actionSelectorPanel.init(unitInPlay);
						}
						
						BattleController.lastHighlightMouseDown = BattleController.mouseDown;
					}
				} else {
					if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
						if (BattleController.hoverUnit) {
							BattleController.currentMap.clearSquareHighlights();
							BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
							BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
							BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
							BattleController.hoverUnit = null;
							BattleController.lastHighlightMouseDown = false;
						}
					} else
					if (BattleController.showingMovementsOrActions) {
						BattleController.currentMap.clearSquareHighlights();
						BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
						if (BattleController.currentPhase == BattleController.SELECTACTIONPHASE) {
							BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
						}
						if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
							BattleController.showingMovementsOrActions = true;
						} else {
							BattleController.showingMovementsOrActions = false;
						}
					}
					BattleController.hoverUnit = null;
					BattleController.lastHighlightMouseDown = false;
				}
			} else {
				if (!BattleController.hoverUnit) {
					return;
				}
				if (BattleController.currentPhase == BattleController.ACTIONPHASE) {
					BattleController.currentMap.clearUnitHighlights();
					BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
				} else
				if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
					if (!Controller.root.infoPanels.actionSelectorPanel.showingActionInfo) {
						BattleController.currentMap.clearSquareHighlights();
						BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
						BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
						BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
						BattleController.showingMovementsOrActions = true;
					}
					BattleController.hoverUnit = null;
					BattleController.lastHighlightMouseDown = false;
				} else {
					BattleController.currentMap.clearSquareHighlights();
					BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
					if (BattleController.currentPhase == BattleController.SELECTACTIONPHASE) {
						BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
					}
					BattleController.showingMovementsOrActions = false;
					BattleController.hoverUnit = null;
					BattleController.lastHighlightMouseDown = false;
				}
			}
			
			if (!BattleController.hoverUnit && BattleController.selectedUnit) {
				if (BattleController.selectedUnit.ai == false) {
					Controller.root.infoPanels.actionSelectorPanel.init(BattleController.selectedUnit);
				}
			}
			
			if (BattleController.hoverUnit && BattleController.hoverUnit.team == 2) {
				Controller.root.infoPanels.enemyInfoPanel.showUnitInfo(BattleController.hoverUnit);
			} else {
				Controller.root.infoPanels.enemyInfoPanel.closePanel();
			}
		}
		
		public static displayTargetInfo() {
			var mapSquare:MapSquare = BattleController.currentMap.getMapSquareUnderMouse();
			if (mapSquare) {
				var unitInPlay:UnitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
			}
		}
		
		public static getDefenceBonus(mapX:number, mapY:number):number {
			var mapSquare:MapSquare = BattleController.currentMap.mapGrid[mapX][mapY];
			var defBonus:number = 0;
			if (mapSquare) {
				if (mapSquare.type == MapSquare.COVER || mapSquare.type == MapSquare.HIGHGROUND) {
					defBonus = Config.COVERDEFENCEBONUS * 100;
				}
			}
			return defBonus;
		}
		
		public static getAttackBonus(mapX:number, mapY:number):number {
			var mapSquare:MapSquare = BattleController.currentMap.mapGrid[mapX][mapY];
			var attBonus:number = 0;
			if (mapSquare) {
				if (mapSquare.type == MapSquare.HIGHGROUND) {
					attBonus = Config.HIGHGROUNDATTACKBONUS * 100;
				}
			}
			return attBonus;
		}
		
		public static showActionGrid_forID(actionID:number) {
			if (BattleController.selectedUnit && BattleController.currentPhase != BattleController.MOVINGINTOPOSITION) {
				BattleController.hideDamagePercClips();
				var oldAction:number = BattleController.selectedUnit.selectedAction;
				if (actionID > 0 && BattleController.selectedUnit.unit.unlockedActions[actionID]) {
					BattleController.selectedUnit.selectedAction = actionID;
					BattleController.currentMap.clearSquareHighlights();
					BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
					BattleController.currentMap.calculateActionGrid(BattleController.selectedUnit);
					
					var fullColour:boolean = false;
					if (BattleController.selectedUnit.unit.unitActions[actionID].coolDown <= BattleController.selectedUnit.coolDownCount[actionID]) {
						fullColour = true;
					}
					
					BattleController.currentMap.showActionGrid(BattleController.selectedUnit, false, false, BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].friendlyFire, fullColour);
					BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
					BattleController.selectedUnit.selectedAction = oldAction;
				} else {
					BattleController.currentMap.clearActionGrid();
					BattleController.currentMap.clearUnitHighlights();
					BattleController.currentMap.clearSquareHighlights();
					if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
						BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
						BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
						BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
						BattleController.hoverUnit = null;
					} else
					if (BattleController.currentPhase == BattleController.ACTIONPHASE || BattleController.currentPhase == BattleController.SELECTACTIONPHASE) {
						BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
						if (BattleController.currentPhase == BattleController.ACTIONPHASE && BattleController.selectedUnit.selectedAction > 0) {
							BattleController.currentMap.calculateActionGrid(BattleController.selectedUnit);
							BattleController.currentMap.showActionGrid(BattleController.selectedUnit, false, false, BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].friendlyFire);
							BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
						}
					}
				}
			}
		}
		
		public static damagePercClips:any[] = [];
		public static displayDamagePerc(unitInPlay:UnitInPlay) {
			if (BattleController.damagePercClips == null) {
				BattleController.damagePercClips = [];
			}
			var aDamagePercClip:any = Main.addGAFMovieClip("DamagePercDisplay");
			
			if (BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].useStandardDamagePerc) {
				var damage:number = BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].getStandardAttackPower(BattleController.selectedUnit, unitInPlay, BattleController.currentMap);
				var damagePerc:number = Math.round((damage / unitInPlay.currentHP) * 100);
				Main.changeText(aDamagePercClip.damagePerc, [String(damagePerc) + "%"]);
			} else {
				aDamagePercClip.damagePerc.text = BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].alternateDamageDisplay(BattleController.selectedUnit, unitInPlay, BattleController.currentMap);
			}
			aDamagePercClip.x = unitInPlay.clip.x;
			aDamagePercClip.y = unitInPlay.clip.y - 32;
			BattleController.currentMap.mapView.addChild(aDamagePercClip);
			BattleController.damagePercClips.push(aDamagePercClip);
		}
		
		public static hideDamagePercClips() {
			for (var i:number = 0; i < BattleController.damagePercClips.length; i++) {
				if (BattleController.damagePercClips[i] && BattleController.damagePercClips[i].parent) {
					BattleController.damagePercClips[i].parent.removeChild(BattleController.damagePercClips[i]);
				}
			}
			BattleController.damagePercClips = [];
		}
		
		public static showMouseIcon() {
			if (BattleController.mouseActionIcon == undefined) {
				BattleController.mouseActionIcon = Main.addGAFMovieClip("MouseIcons", false, true);
			}
			
			if (BattleController.currentPhase == BattleController.ACTIONPHASE || BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
				var mapSquare:MapSquare = BattleController.currentMap.getMapSquareUnderMouse();
				if (mapSquare) {
					var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
					if (BattleController.currentPhase == BattleController.MOVEMENTPHASE && BattleController.currentMap.movementGrid[mapSquare.mapX][mapSquare.mapY] >= 0) {
						if (unitInSquare && unitInSquare != BattleController.selectedUnit) {
							BattleController.hideMouseIcon();
						} else {
							if (unitInSquare == BattleController.selectedUnit) {
								BattleController.hideMouseIcon();
								return;
							} else {
								BattleController.mouseActionIcon.gotoAndStop(1);
							}
							BattleController.mouseActionIcon.x = (mapSquare.mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
							BattleController.mouseActionIcon.y = (mapSquare.mapY * Config.GRIDSIZEY) + (Config.GRIDSIZEY / 2);
							BattleController.currentMap.mapView.addChild(BattleController.mouseActionIcon);
						}
					} else
					if ( BattleController.selectedUnit && BattleController.currentPhase == BattleController.ACTIONPHASE && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] >= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].minRange && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] <= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].maxRange && ( (BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].validSquareOccupied && unitInSquare && unitInSquare.validUnitForAction) || (!BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].validSquareOccupied) ) ) {
						BattleController.mouseActionIcon.gotoAndStop(BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].mouseIconFrame);
						BattleController.mouseActionIcon.x = (mapSquare.mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
						BattleController.mouseActionIcon.y = (mapSquare.mapY * Config.GRIDSIZEY) + (Config.GRIDSIZEY / 2);
						BattleController.currentMap.mapView.addChild(BattleController.mouseActionIcon);
					} else {
						BattleController.hideMouseIcon();
					}
				} else {
					BattleController.hideMouseIcon();
				}
			} else {
				BattleController.hideMouseIcon();
			}
		}
		
		public static hideMouseIcon() {
			if (BattleController.mouseActionIcon == undefined) {
				BattleController.mouseActionIcon = Main.addGAFMovieClip("MouseIcons", false, true);
			}

			if (BattleController.mouseActionIcon && BattleController.mouseActionIcon.parent) {
				BattleController.mouseActionIcon.parent.removeChild(BattleController.mouseActionIcon);
			}
		}
		
		public static hideAllInfoPanels() {
			BattleController.hideDamagePercClips();
		}
		
		
		public static showDamageRiser(damage:number, targetUnit:UnitInPlay, poison:boolean = false) {
			if (damage > 0) {
				var damageRiser:any;
				if (!poison) {
					damageRiser = Main.addGAFMovieClip("DamageRiser");
				} else {
					damageRiser = Main.addGAFMovieClip("DamageRiser_poisoned");
				}

				Main.changeText(damageRiser.damageDisplay.damage, ["-"+String(damage)], "xp");

				damageRiser.x = targetUnit.clip.x;
				damageRiser.y = targetUnit.clip.y - targetUnit.clip.height;
				//targetUnit.clip.parent.addChild(damageRiser);
				//damageRiser.play();
				
				if (!targetUnit.unit.useNewAttackAnim && BattleAnimController.battleAnimHolder) {
					var battleAnimClip:any;
					if (targetUnit == BattleAnimController.attackingUnit) {
						battleAnimClip = BattleAnimController.attackingClip;
					} else {
						battleAnimClip = BattleAnimController.defendingClip;
					}
					
					var damageRiser2:any = Main.addGAFMovieClip("DamageRiser");
					damageRiser2.scale.x = damageRiser2.scale.y = 2;
					Main.changeText(damageRiser2.damageDisplay.damage, [String(damage)], "xp");

					damageRiser2.x = battleAnimClip.x;
					damageRiser2.y = (battleAnimClip.y - (battleAnimClip.height/2));
					if (battleAnimClip.parent) {
						//battleAnimClip.parent.addChild(damageRiser2);
						//damageRiser2.play();
					}
				}
			}
		}
		
		public static showHealRiser(hpUp:number, targetUnit:UnitInPlay) {
			if (hpUp > 0) {
				var healRiser:any = Main.addGAFMovieClip("HealRiser");
				Main.changeText(healRiser.damageDisplay.damage, ["+"+String(hpUp)], "xp");

				healRiser.x = targetUnit.clip.x;
				healRiser.y = targetUnit.clip.y - targetUnit.clip.height;
				//targetUnit.clip.parent.addChild(healRiser);
				//healRiser.play();
				
				if (BattleAnimController.battleAnimHolder) {
					var battleAnimClip:any;
					if (targetUnit == BattleAnimController.attackingUnit) {
						battleAnimClip = BattleAnimController.attackingClip;
					} else {
						battleAnimClip = BattleAnimController.defendingClip;
					}
					
					var damageRiser2:any = Main.addGAFMovieClip("DamageRiser");
					damageRiser2.scale.x = damageRiser2.scale.y = 2;
					Main.changeText(damageRiser2.damageDisplay.damage, [String(hpUp)], "xp");

					damageRiser2.x = battleAnimClip.x;
					damageRiser2.y = (battleAnimClip.y - (battleAnimClip.height/2));
					if (battleAnimClip.parent) {
						battleAnimClip.parent.addChild(damageRiser2);
						damageRiser2.play();
					}
				}
			}
		}
		
		public static showXPRiser(xpUp:number, targetUnit:UnitInPlay) {
			if (xpUp > 0 && targetUnit && targetUnit.clip && targetUnit.clip.parent) {
				var xpRiserClip:any = Main.addGAFMovieClip("XPRiser");
				Main.changeText(xpRiserClip.damageDisplay.damage, ["+"+String(xpUp)+"xp"], "xp");

				xpRiserClip.x = targetUnit.clip.x;
				xpRiserClip.y = targetUnit.clip.y - targetUnit.clip.height;
				targetUnit.clip.parent.addChild(xpRiserClip);
				xpRiserClip.play();

				//BattleController.xpCounter++;
				BattleController.xpCounterClip = xpRiserClip;

				Main.addCustomEfFunc('xpCounter.onEnterFrame', function()
				{
					if (BattleController.xpCounterClip.currentFrame == BattleController.xpCounterClip.totalFrames)
					{
						BattleController.xpCounterClip.parent.removeChild(BattleController.xpCounterClip);
						Main.removeCustomEfFunc('xpCounter.onEnterFrame');
					}
				});
			}
		}
		
		public static mouseDown_h(e:Event) {
			BattleController.mouseDown = true;
		}
		
		public static mouseUp_h(e:Event) {
			BattleController.mouseDown = false;
		}
		
		public static mouseClicked(e:Event=null) {
			console.log("mouse click", SpeechController.running, GamePanel.panelOpen, BattleController.battleOver,UnitInPlay.actionSelectorOpen, BattleController.showingTutorial, !BattleController.validClick);

			if (Controller.getLevelNumber() != 1) {
				BattleController.validClick = true;
			}
			
			if (SpeechController.running) {
				SpeechController.speedUp();
				return;
			}
			
			if (GamePanel.panelOpen || BattleController.battleOver || UnitInPlay.actionSelectorOpen || (BattleController.showingTutorial && !BattleController.validClick)) {
				return;
			}
			
			var mapSquare:MapSquare;
			var unitInPlay:UnitInPlay;
			switch (BattleController.currentPhase) {
				case BattleController.SELECTUNITPHASE:
					mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
					if (mapSquare) {
						unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
						if (unitInPlay && !unitInPlay.actioned && unitInPlay.team == BattleController.teamsTurn) {
							BattleController.selectedUnit = unitInPlay;
							BattleController.selectedUnit.selectedAction = 0;
							BattleController.currentPhase = BattleController.MOVEMENTPHASE;
							
							BattleController.currentMap.clearSquareHighlights();
							BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
							BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
							BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
							
							SoundController.playSound("select");
						}
					}
					break;
				case BattleController.MOVEMENTPHASE:
					
					mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
					if (mapSquare) {
						
						unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
						if (unitInPlay && unitInPlay != BattleController.selectedUnit && !unitInPlay.actioned && unitInPlay.team == BattleController.teamsTurn) {
							BattleController.selectedUnit = unitInPlay;
							BattleController.selectedUnit.selectedAction = 0;
							BattleController.currentPhase = BattleController.MOVEMENTPHASE;
							
							BattleController.currentMap.clearSquareHighlights();
							BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
							BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
							BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
							
							SoundController.playSound("select");
						} else
						if (BattleController.currentMap.movementGrid[mapSquare.mapX][mapSquare.mapY] >= 0) {
							
							unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
							if (unitInPlay == null) {
								
								BattleController.selectedUnit.moveTo(mapSquare.mapX, mapSquare.mapY, BattleController.currentMap);
								BattleController.currentMap.clearSquareHighlights();
								BattleController.currentMap.clearUnitHighlights();
								
								BattleController.currentPhase = BattleController.MOVINGINTOPOSITION;
								
								SoundController.playSound("select");
							}
						} else {
							BattleController.undo();
						}
						
						BattleController.hideMouseIcon();
					} else {
						if (e.target == Controller.root.bgs) {
							BattleController.undo();
							BattleController.hideMouseIcon();
						}
					}
					break;
				case BattleController.ACTIONPHASE:
					mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
					if (mapSquare) {
						if (BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] >= 0) {
							
							console.log("performAction 3");

							//enemy action
							if (BattleController.selectedUnit.performAction(BattleController.currentMap, mapSquare.mapX, mapSquare.mapY)) {
								
								BattleController.currentMap.clearSquareHighlights();
								BattleController.currentMap.clearUnitHighlights();
								BattleController.currentPhase = BattleController.PERFORMINGACTIONPHASE;
								
								var unitInSquare:UnitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
								if (unitInSquare && unitInSquare.team!=BattleController.selectedUnit.team) {
									Controller.root.infoPanels.enemyInfoPanel.showUnitInfo(unitInSquare);
								}
								
								BattleController.hideDamagePercClips();
								
								SoundController.playSound("select");
							
								
								BattleController.selectedUnit.unit.usedActions[BattleController.selectedUnit.selectedAction] = true;
								var usedAllActions:boolean = true;
								for (var i:number = 0; i < BattleController.selectedUnit.unit.usedActions.length; i++) {
									if (BattleController.selectedUnit.unit.usedActions[i] == false) {
										usedAllActions = false;
									}
								}
							}
						} else {
							Main.inGamePanel.openPanel("undoEndAlert");
						}
						
						BattleController.hideMouseIcon();
					} else {
						if (e.target == Controller.root.bgs) {
							Main.inGamePanel.openPanel("undoEndAlert");
							BattleController.hideMouseIcon();
						}
					}
					break;
				case BattleController.SELECTACTIONPHASE:
					mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
					if (mapSquare) {
						unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
						if (unitInPlay) {
							if (unitInPlay != BattleController.selectedUnit && unitInPlay.team == BattleController.teamsTurn && !unitInPlay.actioned) {
								BattleController.selectedUnit_switch = unitInPlay;
								Main.inGamePanel.openPanel("undoEndAlert");
							}
						} else {
							BattleController.selectedUnit_switch = null;
							Main.inGamePanel.openPanel("undoEndAlert");
						}
					} else {
						if (e.target == Controller.root.bgs) {
							BattleController.undo();
							BattleController.hideMouseIcon();
						}
					}
			}
			
			if (BattleController.showingTutorial && Controller.getLevelNumber()!=2) {
				BattleController.nextTutorialFrame();
			}
		}
		
		public static startTutorial() {
			console.log("startTutorial");

			if (Config.tutorialInteractiveLevels[Controller.getLevelNumber() - 1]) {
				Controller.root.tut.gotoAndStop("level" + String(Controller.getLevelNumber()));
				BattleController.showingTutorial = true;
				BattleController.validClick = false;

				if (Controller.getLevelNumber() == 1)
				{
					var la:number = 0;
					var cla:any = Controller.root.tut.children;
					for (var a of cla)
					{
						if (a && a._config && a._config._linkage == "validClickTutorialButton")
						{
							//console.log(">>>>>>>>>>", cla[la]);
							new ValidClickButton(cla[la]);
						}
						la++;
					}
				}
				
				if (Controller.getLevelNumber() == 2) {
					Controller.root.tut.visible = false;
				} else {
					Controller.root.tut.visible = true;
				}
			}
		}
		
		public static nextTutorialFrame(forceFrame:number = -1) {
			if (forceFrame == -1) {
				Controller.root.tut.gotoAndStop(Controller.root.tut.currentFrame+1);
			} else {
				Controller.root.tut.gotoAndStop(forceFrame);
			}
			
			if (Main.getCurrentLabel(Controller.root.tut) == "end1" || Main.getCurrentLabel(Controller.root.tut) == "end2" || Main.getCurrentLabel(Controller.root.tut) == "end3") {
				BattleController.showingTutorial = false;
			} else {
				BattleController.validClick = false;
			}
		}
		
		public static showCorrectEndAlert(alertClip:any) {
			var availableUnitCount:number = 0;
			for (var i:number = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
				if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && !BattleController.currentMap.unitsInPlay[i].actioned) {
					availableUnitCount++;
				}
			}
			
			if (availableUnitCount == 1) {
				alertClip.bg.gotoAndStop("team");
				alertClip.mess.gotoAndStop(2);
			} else {
				alertClip.bg.gotoAndStop(BattleController.selectedUnit.unit.frameLabel);
				alertClip.mess.gotoAndStop(1);
			}
		}
		
	}

}

import BattleController = com.ussgames.battleTactics.BattleController;
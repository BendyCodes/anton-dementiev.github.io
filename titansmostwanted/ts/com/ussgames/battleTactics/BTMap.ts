module com.ussgames.battleTactics {
	
	export class BTMap {
		
		public mapGrid:any[];
		public unitsInPlay:any[];
		public movementGrid:any[];
		public actionGrid:any[];
		public multipleUnitAttackGrid:any[];
		
		public viewContainer:any;
		
		public mapView:Sprite;
		public gridLayerClip:Sprite;
		public gridHighlightClip:Sprite;
		public unitsContainerClip:Sprite;
		public objectsContainerClip:Sprite;
		public objectClipsInView:any[];
		
		constructor() {
			
		}
		
		public initMap(mapXMLString:string):void {
			var xmlData:any = xml2js(mapXMLString, {compact: true, spaces: 4}).level_data;

			for (var xd in xmlData) {
				xmlData[xd] = xmlData[xd]["_attributes"];
			}

			var columnData:string;
			var columnArray:any[];

			var mapSizeArray:any[] = xmlData["level_size"]["data"].split(",");
			var mapWidth:number = mapSizeArray[0];
			var mapHeight:number = mapSizeArray[1];
			
			var i:number, j:number, mX:number, mY:number;
			var newUnit:Unit;
			var newUnitInPlay:UnitInPlay;
			var mapSquare:MapSquare;
			
			var mapBG:number = parseInt(xmlData["map_bg"]["data"]);
			Controller.root.bgs.gotoAndStop(Controller.getLevelNumber());
			
			BattleController.startSpeech = ["", "", "", "", "", ""];
			BattleController.startSpeechCharacter = [1, 1, 1, 1, 1, 1];
			BattleController.endSpeech = ["", "", "", "", "", ""];
			BattleController.endSpeechCharacter = [1, 1, 1, 1, 1, 1];
			
			for (var k:number = 0; k < BattleController.startSpeech.length; k++) {
				if (xmlData["start_speech_" + String(k + 1)] != undefined && xmlData["start_speech_" + String(k + 1)].speech != undefined && xmlData["start_speech_" + String(k + 1)].char != undefined) {
					BattleController.startSpeech[k] = String(xmlData["start_speech_" + String(k + 1)].speech);
					BattleController.startSpeechCharacter[k] = parseInt(xmlData["start_speech_" + String(k + 1)].char);
				}
				if (xmlData["end_speech_" + String(k + 1)] != undefined && xmlData["end_speech_" + String(k + 1)].speech != undefined && xmlData["end_speech_" + String(k + 1)].char != undefined) {
					BattleController.endSpeech[k] = String(xmlData["end_speech_" + String(k + 1)].speech);
					BattleController.endSpeechCharacter[k] = parseInt(xmlData["end_speech_" + String(k + 1)].char);
				}
			}
			
			this.unitsInPlay = [];
			this.objectClipsInView = [];
			
			this.mapGrid = [];
			this.movementGrid = [];
			this.actionGrid = [];
			this.multipleUnitAttackGrid = [];
			
			for (i = 0; i < Config.MAPWIDTH; i++) {
				var mapColumn:any[] = [];
				var movementColumn:any[] = [];
				var actionColumn:any[] = [];
				var multipleUnitAttackColumn:any[] = [];
				
				if (mapWidth > i) {
					columnData = xmlData["layer_0_" + String(i)].data;
					columnArray = columnData.split(",");
					
					for (j = 0; j < Config.MAPHEIGHT; j++) {
						
						if (mapHeight > j) {
							mapSquare = new MapSquare;
							var mapSquareClip:any = null;

							if (Config.mapSquareConfig[parseInt(columnArray[j])].clipClassName
							&& Config.mapSquareConfig[parseInt(columnArray[j])].clipClassName != null) {
								mapSquareClip = Main.addGAFMovieClip(Config.mapSquareConfig[columnArray[j]].clipClassName, false, false, 100);
							}
							mapSquare.init(Config.mapSquareConfig[parseInt(columnArray[j])].type, Config.mapSquareConfig[parseInt(columnArray[j])].height, i, j, mapSquareClip, parseInt(columnArray[j]));
							mapColumn.push(mapSquare);
							movementColumn.push( -1);
							actionColumn.push( -1);
							multipleUnitAttackColumn.push( -1);
						} else {
							mapSquare = new MapSquare;
							mapSquare.init(0, 0, i, j, null, 0);
							mapColumn.push(mapSquare);
							movementColumn.push( -1);
							actionColumn.push( -1);
							multipleUnitAttackColumn.push( -1);
						}
					}
				} else {
					for (j = 0; j < Config.MAPHEIGHT; j++) {
						mapSquare = new MapSquare;
						mapSquare.init(0, 0, i, j, null, 0);
						mapColumn.push(mapSquare);
						movementColumn.push( -1);
						actionColumn.push( -1);
						multipleUnitAttackColumn.push( -1);
					}
				}
				this.mapGrid.push(mapColumn);
				this.movementGrid.push(movementColumn);
				this.actionGrid.push(actionColumn);
				this.multipleUnitAttackGrid.push(multipleUnitAttackColumn);
			}
			
			for (i = 0; i < mapWidth; i++) {
				columnData = xmlData["layer_1_" + String(i)].data;
				columnArray = columnData.split(",");
				
				for (j = 0; j < mapHeight; j++) {
					if (parseInt(columnArray[j]) > 0) {
						if (parseInt(columnArray[j]) > 5) {
							newUnit = new Config.unitConfigs[parseInt(columnArray[j]) - 1];
							newUnit.init();
							newUnit.initUnlockedActions(true);
							newUnit.id = parseInt(columnArray[j])-1;
						} else {
							newUnit = BattleController.persistentTeamUnits[parseInt(columnArray[j]) - 1];
						}
						
						var team_:number = 1;
						var ai_:boolean = false;
						if (columnArray[j] > 5) {
							team_ = 2;
							ai_ = true;
						}
						
						newUnitInPlay = new UnitInPlay();
						newUnitInPlay.init(newUnit, i, j, team_, ai_);
						newUnitInPlay.update();
						
						this.unitsInPlay.push(newUnitInPlay);
					}
				}
			}

			var allHighlights:Array<string> = ["DefendHighlight", "UnitSquareHighlight", "MovementHighlight", "AttackHighlight"];
			
			for (var ahh = 0; ahh < allHighlights.length; ahh++) {
				for (var ix = 0; ix < mapWidth; ix++) {
					for (var iy = 0; iy < mapWidth; iy++) {
						var highlightClip_ = Main.addGAFMovieClip(allHighlights[ahh]);
						highlightClip_.x = ix * Config.GRIDSIZEX;
						highlightClip_.y = iy * Config.GRIDSIZEY;
						highlightClip_.name = allHighlights[ahh] + "_" + ix + "_" + iy;
						highlightClip_.visible = false;
						this.gridHighlightClip.addChild(highlightClip_);
					}
				}
			}
			
			Cinematics.initCinematicUnits(this);
		}
		
		public initMapLayers(mapContainer:any):void {
			this.gridLayerClip = new Sprite;
			this.gridHighlightClip = new Sprite;
			this.mapView = new Sprite;
			this.unitsContainerClip = new Sprite;
			this.objectsContainerClip = new Sprite;
			this.viewContainer = mapContainer;
			this.viewContainer.interactive = true;
			this.mapView.y = 164;
			this.viewContainer.addChild(this.mapView);
			this.mapView.addChild(this.gridLayerClip);
			this.mapView.addChild(this.gridHighlightClip);
			this.mapView.addChild(this.objectsContainerClip);
			this.objectsContainerClip.y = -5;
			this.mapView.addChild(this.unitsContainerClip);
		}
		
		public initView() {
			var i:number, j:number;
			this.generateUnHighlightedUnitFilter();
			this.objectClipsInView = [];
			for (i = 0; i < this.unitsInPlay.length; i++) {
				this.unitsInPlay[i].updateClipPosition(this);
				this.unitsContainerClip.addChild(this.unitsInPlay[i].clip);
				this.objectClipsInView.push(this.unitsInPlay[i].clip);
			}
			for (i = 0; i < this.mapGrid.length; i++) {
				for (j = 0; j < this.mapGrid[i].length; j++) {
					if (this.mapGrid[i][j].objectClip != null) {
						this.mapGrid[i][j].updateClipPosition();
						this.objectsContainerClip.addChild(this.mapGrid[i][j].objectClip);
					}
				}
			}
		}
		
		public cleanUp() {
			for (var i:number = 0; i < this.objectClipsInView.length; i++) {
				if (this.objectClipsInView[i].parent) {

					//console.log("remove object", this.objectClipsInView[i]._gafTimeline._config._linkage, this.objectClipsInView[i]);

					this.objectClipsInView[i].filters = [];
					this.objectClipsInView[i].parent.removeChild(this.objectClipsInView[i]);
				}
			}

			while (this.objectsContainerClip.children[0]) {
				this.objectsContainerClip.removeChildAt(0);
			}

			while (this.viewContainer.children[0]) {
				this.viewContainer.removeChildAt(0);
			}
			
			this.mapGrid = null;
			this.unitsInPlay = null;
			this.movementGrid = null;
			this.actionGrid = null;
			this.multipleUnitAttackGrid = null;
			this.viewContainer = null;
			this.mapView = null;
			this.gridLayerClip = null;
			this.gridHighlightClip = null;
			this.unitsContainerClip = null;
			this.objectsContainerClip = null;
		}
		
		public addUnitToView(unitInPlay:UnitInPlay) {
			unitInPlay.updateClipPosition(this);
			this.unitsContainerClip.addChild(unitInPlay.clip);
			this.objectClipsInView.push(unitInPlay.clip);
			this.depthSortView();
		}
		
		public update():void {
			
		}
		
		public depthSortView() {
			this.objectClipsInView.sort(function(b, a) {
				return a.y - b.y;
			});
			for (var i:number = 0; i < this.objectClipsInView.length; i++) {
				this.unitsContainerClip.setChildIndex(this.objectClipsInView[i], 0);
			}
		}
		
		public getUnitForID(unitID:number):UnitInPlay {
			for (var i:number = this.unitsInPlay.length-1; i >= 0; i--) {
				if (this.unitsInPlay[i].unit.id == unitID) {
					return this.unitsInPlay[i];
				}
			}
			return null;
		}
		
		public getUnitInSquare(mapX:number, mapY:number):UnitInPlay {
			var unitInSquare:UnitInPlay;
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (this.unitsInPlay[i].mapX == mapX && this.unitsInPlay[i].mapY == mapY) {
					unitInSquare = this.unitsInPlay[i];
					break;
				}
			}
			return unitInSquare;
		}
		
		public hilightUnitSquares(team:number):void {
			this.clearSquareHighlights();
			this.clearUnitHighlights();
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (this.unitsInPlay[i].team == team && this.unitsInPlay[i].actioned == false) {
					if (!this.unitsInPlay[i].ai) {
						this.highlightSquare(this.unitsInPlay[i].mapX, this.unitsInPlay[i].mapY, "UnitSquareHighlight");
					}
					this.unitsInPlay[i].clip.filters = [];
					this.unitsInPlay[i].availableForOrder();
				} else {
					this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
				}
			}
		}
		
		public hilightThisUnitSquare(theUnit:UnitInPlay):void {
			this.clearSquareHighlights();
			this.clearUnitHighlights();
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (this.unitsInPlay[i] != theUnit) {
					if (!this.unitsInPlay[i].actioned && this.unitsInPlay[i].team == theUnit.team) {
						this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter_lite];
					}
				} else {
					theUnit.clip.filters = [this.selectedUnitGlow];
					theUnit.availableForOrder();
				}
			}
		}

		public team1HighlightFilter:PIXI.filters.GlowFilter = Main.convertToPixiGlowFilter(0x00003300, 1, 5, 5, 2, 1, false, false);
		public team2HighlightFilter:PIXI.filters.GlowFilter = Main.convertToPixiGlowFilter(0x00330000, 1, 5, 5, 2, 1, false, false);
		public selectedUnitGlow:PIXI.filters.GlowFilter = Main.convertToPixiGlowFilter(0x00ffffff, 1, 5, 5, 2, 1, false, false);
		
		public unHighlightedUnitFilter:ColorMatrixFilter;
		public unHighlightedUnitFilter_lite:ColorMatrixFilter;
		
		public generateUnHighlightedUnitFilter() {
			this.unHighlightedUnitFilter = new ColorMatrixFilter();
			this.unHighlightedUnitFilter.saturate(-1);
			this.unHighlightedUnitFilter_lite = new ColorMatrixFilter();
			this.unHighlightedUnitFilter_lite.saturate(-0.5);
		}
		
		public hilightUnit(unitToHighlight:UnitInPlay, forceColour:boolean = false):void {
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (this.unitsInPlay[i] == unitToHighlight) {
					if (!forceColour && (unitToHighlight.actioned || this.unitsInPlay[i].team != BattleController.teamsTurn)) {
						this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
					} else {
						this.unitsInPlay[i].clip.filters = [];
						if (forceColour) {
							this.unitsInPlay[i].clip.gotoAndStop("breath");
						}
					}
				} else {
					if (this.unitsInPlay[i].team == 1) {
						if (this.unitsInPlay[i].team == BattleController.teamsTurn && this.unitsInPlay[i].actioned == false) {
							//this.unitsInPlay[i].clip.filters = [this.team1HighlightFilter];
						} else {
							this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
							//this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter, this.team1HighlightFilter];
						}
						this.unitsInPlay[i].clip.alpha = 0.4;
					} else {
						if (this.unitsInPlay[i].team == BattleController.teamsTurn && this.unitsInPlay[i].actioned == false) {
							//this.unitsInPlay[i].clip.filters = [this.team2HighlightFilter];
							this.unitsInPlay[i].clip.filters = [];
						} else {
							//this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter, this.team2HighlightFilter];
							this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
						}
						this.unitsInPlay[i].clip.alpha = 0.4;
					}
				}
			}
		}
		
		public clearUnitHighlights(forceColour:boolean = false):void {
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (forceColour || (this.unitsInPlay[i].team == BattleController.teamsTurn && this.unitsInPlay[i].actioned == false)) {
					this.unitsInPlay[i].clip.filters = [];
				} else {
					this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
				}
				this.unitsInPlay[i].clip.alpha = 1;
			}
		}
		
		public getMapSquareUnderMouse():MapSquare {
			var mX:number = Math.floor(Main.renderer.plugins.interaction.mouse.global.x / (Config.GRIDSIZEX*2));
			var mY:number = Math.floor((Main.renderer.plugins.interaction.mouse.global.y-(164*2)) / (Config.GRIDSIZEY*2));

			if (mX >= 0 && mX < this.mapGrid.length && mY>=0 && mY < this.mapGrid[0].length) {
				return this.mapGrid[mX][mY];
			}
			return null;
		}
		
		public countLiveUnits(team:number):number {
			var liveUnitCount:number = 0;
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (this.unitsInPlay[i].team == team) {
					liveUnitCount++;
				}
			}
			return liveUnitCount;
		}
		
		public clearSquareHighlights():void {
			var n:number = this.gridHighlightClip.children.length;
			for (var i:number = 0; i < n; i++) {
				this.gridHighlightClip.children[i].visible = false;
			}

			this.objectsContainerClip.alpha = 1;
			
			Controller.root.infoPanels.attackRangeKey.visible = false;
		}
		
		public highlightSquare(mapX:number, mapY:number, highlightClipStr:string, fullColour:boolean = true) {
			var highlightClip:any = this.gridHighlightClip.getChildByName(highlightClipStr + "_" + mapX + "_" + mapY);

			if (highlightClip != undefined) {
				highlightClip.visible = true;
			}
			try {
				highlightClip.children[0].play();
			}
			catch(e){}

			if (!fullColour) {
				try {
					highlightClip.filters = [this.unHighlightedUnitFilter];
				}
				catch(e){}
			}
		}
		
		public clearMovementGrid() {
			var i:number, j:number;
			for (i = 0; i < this.movementGrid.length; i++) {
				for (j = 0; j < this.movementGrid[i].length; j++) {
					this.movementGrid[i][j] = -1;
				}
			}
		}
		
		public calculateMovementGrid(unitInPlay:UnitInPlay, clearGrid:boolean = true, forDangerArea:boolean = false) {
			var i:number, j:number;
			if (clearGrid) {
				this.clearMovementGrid();
			}	
			this.movementGrid[unitInPlay.mapX][unitInPlay.mapY] = unitInPlay.unit.MP;
			var moreSquares:boolean = true;
			
			while (moreSquares) {
				moreSquares = false;
				for (i = 0; i < this.movementGrid.length; i++) {
					for (j = 0; j < this.movementGrid[i].length; j++) {
						if (this.movementGrid[i][j] > 0) {
							if (i>0 && (unitInPlay.unit.flys || (this.mapGrid[i-1][j].type!=MapSquare.NOACCESS && (this.getUnitInSquare(i-1, j)==null || (this.getUnitInSquare(i-1, j)!=null && this.getUnitInSquare(i-1, j).team==unitInPlay.team)))) && this.movementGrid[i - 1][j] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i - 1][j].type] != 0) {
								this.movementGrid[i - 1][j] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i - 1][j].type];
								if (this.movementGrid[i - 1][j] > -1) {
									moreSquares = true;
								} else {
									this.movementGrid[i - 1][j] = -1;
								}
							}
							if (i<this.movementGrid.length-1 && (unitInPlay.unit.flys || (this.mapGrid[i+1][j].type!=MapSquare.NOACCESS && (this.getUnitInSquare(i+1, j)==null || (this.getUnitInSquare(i+1, j)!=null && this.getUnitInSquare(i+1, j).team==unitInPlay.team)))) && this.movementGrid[i + 1][j] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i + 1][j].type] != 0) {
								this.movementGrid[i + 1][j] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i + 1][j].type];
								if (this.movementGrid[i + 1][j] > -1) {
									moreSquares = true;
								} else {
									this.movementGrid[i + 1][j] = -1;
								}
							}
							if (j>0 && (unitInPlay.unit.flys || (this.mapGrid[i][j-1].type!=MapSquare.NOACCESS && (this.getUnitInSquare(i, j - 1)==null || (this.getUnitInSquare(i, j - 1)!=null && this.getUnitInSquare(i, j - 1).team==unitInPlay.team)))) && this.movementGrid[i][j-1] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i][j-1].type] != 0) {
								this.movementGrid[i][j-1] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i][j-1].type];
								if (this.movementGrid[i][j-1] > -1) {
									moreSquares = true;
								} else {
									this.movementGrid[i][j-1] = -1;
								}
							}
							if (j<this.movementGrid[i].length-1 && (unitInPlay.unit.flys || (this.mapGrid[i][j+1].type!=MapSquare.NOACCESS && (this.getUnitInSquare(i, j + 1)==null || (this.getUnitInSquare(i, j + 1)!=null && this.getUnitInSquare(i, j + 1).team==unitInPlay.team)))) && this.movementGrid[i][j+1] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i][j+1].type] != 0) {
								this.movementGrid[i][j+1] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i][j+1].type];
								if (this.movementGrid[i][j+1] > -1) {
									moreSquares = true;
								} else {
									this.movementGrid[i][j+1] = -1;
								}
							}
						}
					}
				}
				
			}
			
			for (i = 0; i < this.movementGrid.length; i++) {
				for (j = 0; j < this.movementGrid[i].length; j++) {
					if (this.mapGrid[i][j].type == MapSquare.NOACCESS || (!forDangerArea && this.getUnitInSquare(i, j) != null && this.getUnitInSquare(i, j)!=unitInPlay)) {
						this.movementGrid[i][j] = -1;
					}
				}
			}
		}
		
		public showMovementGrid(unitInPlay:UnitInPlay = null) {
			var i:number, j:number;
			
			for (i = 0; i < this.movementGrid.length; i++) {
				for (j = 0; j < this.movementGrid[i].length; j++) {
					if (this.movementGrid[i][j] >= 0) {
						this.highlightSquare(i, j, "MovementHighlight");
					}
				}
			}
			
			this.objectsContainerClip.alpha = 0.4;
		}
		
		public clearActionGrid() {
			var i:number, j:number;
			for (i = 0; i < this.actionGrid.length; i++) {
				for (j = 0; j < this.actionGrid[i].length; j++) {
					this.actionGrid[i][j] = -1;
				}
			}
		}
		
		public calculateActionGrid(unitInPlay:UnitInPlay, clearGrid:boolean = true) {
			var i:number, j:number, dirX:number, dirY:number;
			var dashBlocked:boolean = false;
			var targetUnit:UnitInPlay;
			
			if (clearGrid) {
				this.clearActionGrid();
				this.actionGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
			}
			
			var moreSquares:boolean = true;
			var thisPass:number = 0;
			
			while (moreSquares) {
				moreSquares = false;
				for (i = 0; i < this.actionGrid.length; i++) {
					for (j = 0; j < this.actionGrid[i].length; j++) {
						if (this.actionGrid[i][j] == thisPass && this.actionGrid[i][j] < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
							dashBlocked = false;
							if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].dashAttack) {
								if (!unitInPlay.unit.flys && this.mapGrid[i][j].type == MapSquare.NOACCESS) {
									this.actionGrid[i][j] = -1;
									dashBlocked = true;
								}

								targetUnit = this.getUnitInSquare(i, j); 
								if (targetUnit && targetUnit != unitInPlay && targetUnit.team != unitInPlay.team) {
									if (this.getDamagePerc(unitInPlay, targetUnit) < 100) {
										dirX = 0;
										dirY = 0;
										if (targetUnit.mapX < unitInPlay.mapX) {
											dirX = -1;
										} else
										if (targetUnit.mapX > unitInPlay.mapX) {
											dirX = 1;
										} else
										if (targetUnit.mapY < unitInPlay.mapY) {
											dirY = -1;
										} else
										if (targetUnit.mapY > unitInPlay.mapY) {
											dirY = 1;
										}
										
										if (dirX != 0 && dirY == 0) {
											if (i-dirX>=0 && i-dirX<this.mapGrid.length && ((this.getUnitInSquare(i - dirX, j) != null && this.getUnitInSquare(i - dirX,j) != unitInPlay) || (this.mapGrid[i - dirX][j].type == MapSquare.NOACCESS))) {
												this.actionGrid[i][j] = -1;
											}
										} else
										if (dirX == 0 && dirY != 0) {
											if (j-dirY>=0 && j-dirY<this.mapGrid[i].length && ((this.getUnitInSquare(i, j - dirY) != null && this.getUnitInSquare(i, j - dirY) != unitInPlay) || (this.mapGrid[i][j - dirY].type == MapSquare.NOACCESS))) {
												this.actionGrid[i][j] = -1;
											}
										}
										
										dashBlocked = true;
									}
								}
							}
							
							if (!dashBlocked) {
								if (i>0 && this.actionGrid[i - 1][j] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && j == unitInPlay.mapY))) {
									this.actionGrid[i - 1][j] = this.actionGrid[i][j] + 1;
									moreSquares = true;
								}
								if (i<this.actionGrid.length-1 && this.actionGrid[i + 1][j] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && j == unitInPlay.mapY))) {
									this.actionGrid[i + 1][j] = this.actionGrid[i][j] + 1;
									moreSquares = true;
								}
								if (j>0 && this.actionGrid[i][j-1] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && i == unitInPlay.mapX))) {
									this.actionGrid[i][j-1] = this.actionGrid[i][j] + 1;
									moreSquares = true;
								}
								if (j<this.actionGrid[i].length-1 && this.actionGrid[i][j+1] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && i == unitInPlay.mapX))) {
									this.actionGrid[i][j+1] = this.actionGrid[i][j] + 1;
									moreSquares = true;
								}
							}
						}
					}
				}
				
				thisPass++;
				if (thisPass < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
					moreSquares = true;
				}
			}
			
			if (unitInPlay.unit.MP == 0) {
				this.removeTooCloseAttackGrid(unitInPlay);
			}
		}
		
		public calculateActionGrid_straightOnly(unitInPlay:UnitInPlay, clearGrid:boolean = true) {
			var i:number, j:number;
			var dashBlocked:boolean = false;
			
			if (clearGrid) {
				this.clearActionGrid();
				this.actionGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
			}
			
			var moreSquares:boolean = true;
			var thisPass:number = 0;
			var zeroActionSquareFound:boolean = false;
			
			while (moreSquares) {
				moreSquares = false;
				
				for (i = 0; i < this.actionGrid.length; i++) {
					zeroActionSquareFound = false;
					for (j = 0; j < this.actionGrid[i].length; j++) {
						if (this.actionGrid[i][j] == 0) {
							zeroActionSquareFound = true;
							break;
						}
					}
					
					if (zeroActionSquareFound) {
						for (j = 0; j < this.actionGrid[i].length; j++) {
							if (this.actionGrid[i][j] == thisPass && this.actionGrid[i][j]<unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
								
								dashBlocked = false;
								if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].dashAttack) {
									if (!unitInPlay.unit.flys && this.mapGrid[i][j].type == MapSquare.NOACCESS) {
										dashBlocked = true;
									}
									
								}
								
								if (!dashBlocked) {
									if (j>0 && this.actionGrid[i][j-1] == -1) {
										this.actionGrid[i][j-1] = this.actionGrid[i][j] + 1;
										moreSquares = true;
									}
									if (j<this.actionGrid[i].length-1 && this.actionGrid[i][j+1] == -1) {
										this.actionGrid[i][j+1] = this.actionGrid[i][j] + 1;
										moreSquares = true;
									}
								}
							}
						}
					}
				}
				
				for (j = 0; j < this.actionGrid[0].length; j++) {
					
					zeroActionSquareFound = false;
					for (i = 0; i < this.actionGrid.length; i++) {
						if (this.actionGrid[i][j] == 0) {
							zeroActionSquareFound = true;
							break;
						}
					}
					
					if (zeroActionSquareFound) {
						for (i = 0; i < this.actionGrid.length; i++) {
							if (this.actionGrid[i][j] == thisPass && this.actionGrid[i][j]<unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
								
								dashBlocked = false;
								if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].dashAttack) {
									if (!unitInPlay.unit.flys && this.mapGrid[i][j].type == MapSquare.NOACCESS) {
										dashBlocked = true;
									}
								}
								
								if (!dashBlocked) {
									if (i>0 && this.actionGrid[i - 1][j] == -1) {
										this.actionGrid[i - 1][j] = this.actionGrid[i][j] + 1;
										moreSquares = true;
									}
									if (i<this.actionGrid.length-1 && this.actionGrid[i + 1][j] == -1) {
										this.actionGrid[i + 1][j] = this.actionGrid[i][j] + 1;
										moreSquares = true;
									}
								}
							}
						}
					}
				}
				
				thisPass++;
				if (thisPass < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
					moreSquares = true;
				}
			}
			
			if (unitInPlay.unit.MP == 0) {
				this.removeTooCloseAttackGrid(unitInPlay);
			}
		}
		
		public removeTooCloseAttackGrid(unitInPlay:UnitInPlay) {
			var i:number, j:number;
			for (i = 0; i < this.actionGrid.length; i++) {
				for (j = 0; j < this.actionGrid[i].length; j++) {
					if (this.actionGrid[i][j] < unitInPlay.unit.unitActions[unitInPlay.selectedAction].minRange) {
						this.actionGrid[i][j] = -1;
					}
				}
			}
		}
		
		public clearMultipleUnitAttackGrid() {
			var i:number, j:number;
			for (i = 0; i < this.multipleUnitAttackGrid.length; i++) {
				for (j = 0; j < this.multipleUnitAttackGrid[i].length; j++) {
					this.multipleUnitAttackGrid[i][j] = -1;
				}
			}
		}
		
		public calculateMultipleUnitAttackGrid(unitInPlay:UnitInPlay, targetUnit:UnitInPlay, clearGrid:boolean = true) {
			var i:number, j:number;
			
			if (clearGrid) {
				this.clearMultipleUnitAttackGrid();
				this.multipleUnitAttackGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
			}
			
			if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly) {
				var xDir:number = 0;
				var yDir:number = 0;
				
				if (targetUnit.mapX == unitInPlay.mapX) {
					if (targetUnit.mapY < unitInPlay.mapY) {
						yDir = -1;
					} else {
						yDir = 1;
					}
				} else {
					if (targetUnit.mapX < unitInPlay.mapX) {
						xDir = -1;
					} else {
						xDir = 1;
					}
				}
				
				i = unitInPlay.mapX + xDir;
				j = unitInPlay.mapY + yDir;
				
				while (i >= 0 && j >= 0 && i < this.multipleUnitAttackGrid.length && j < this.multipleUnitAttackGrid[i].length) {
					this.multipleUnitAttackGrid[i][j] = this.multipleUnitAttackGrid[i - xDir][j - yDir] + 1;
					i += xDir;
					j += yDir;
				}
				
			} else {
				for (i = 0; i < this.multipleUnitAttackGrid.length; i++) {
					for (j = 0; j < this.multipleUnitAttackGrid[i].length; j++) {
						this.multipleUnitAttackGrid[i][j] = this.actionGrid[i][j];
					}
				}
			}
		}
		
		public calculateUnitDangerArea(unitInPlay:UnitInPlay, clearGrid:boolean = true) {
			var i:number, j:number;
			if (clearGrid) {
				this.clearActionGrid();
			}
			
			for (i = 0; i < this.actionGrid.length; i++) {
				for (j = 0; j < this.actionGrid[i].length; j++) {
					if (this.movementGrid[i][j] != -1) {
						this.actionGrid[i][j] = 0;
					}
				}
			}
			
			for (i = 0; i < unitInPlay.unit.unitActions.length; i++) {
				if (unitInPlay.unit.unitActions[i].type == Action.ATTACK && unitInPlay.coolDownCount[i]>=unitInPlay.unit.unitActions[i].coolDown && unitInPlay.unit.unlockedActions[i]) {
					unitInPlay.selectedAction = i;
					if (unitInPlay.unit.unitActions[i].straightLineOnly) {
						this.calculateActionGrid_straightOnly(unitInPlay, false);
					} else {
						this.calculateActionGrid(unitInPlay, false);
					}
				}
			}
		}
		
		public calculateUnitDangerArea_action(unitInPlay:UnitInPlay, actionID:number, clearGrid:boolean = true) {
			var i:number, j:number;
			if (clearGrid) {
				this.clearActionGrid();
			}
			
			for (i = 0; i < this.actionGrid.length; i++) {
				for (j = 0; j < this.actionGrid[i].length; j++) {
					if (this.movementGrid[i][j] != -1) {
						this.actionGrid[i][j] = 0;
					}
				}
			}
			
			i = actionID;
			if (unitInPlay.unit.unitActions[i].type == Action.ATTACK && unitInPlay.coolDownCount[i]>=unitInPlay.unit.unitActions[i].coolDown) {
				unitInPlay.selectedAction = i;
				if (unitInPlay.unit.unitActions[i].straightLineOnly) {
					this.calculateActionGrid_straightOnly(unitInPlay, false);
				} else {
					this.calculateActionGrid(unitInPlay, false);
				}
			}
		}
		
		public showActionGrid(unitInPlay:UnitInPlay, forceShowingDangerArea:boolean = false, ignoreMinRange:boolean = true, friendlyFire:boolean = false, fullColour:boolean = true) {
			var i:number, j:number;
			
			for (i = 0; i < this.actionGrid.length; i++) {
				for (j = 0; j < this.actionGrid[i].length; j++) {
					if (this.mapGrid[i][j].type != MapSquare.NOACCESS && this.actionGrid[i][j]!=-1 && (this.actionGrid[i][j] >= unitInPlay.unit.unitActions[unitInPlay.selectedAction].minRange || (forceShowingDangerArea && ignoreMinRange)) && this.actionGrid[i][j] <= unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
						if (forceShowingDangerArea || unitInPlay.unit.unitActions[unitInPlay.selectedAction].forceAttackDisplay || unitInPlay.unit.unitActions[unitInPlay.selectedAction].type == Action.ATTACK) {
							var unitInSquare:UnitInPlay = this.getUnitInSquare(i, j);
							this.highlightSquare(i, j, "AttackHighlight", fullColour);
							Controller.root.infoPanels.attackRangeKey.visible = true;
						} else {
							this.highlightSquare(i, j, "DefendHighlight", fullColour);
							Controller.root.infoPanels.attackRangeKey.visible = false;
						}
					}
				}
			}
			
			this.objectsContainerClip.alpha = 0.4;
		}
		
		public showActionUnits(selectedUnit:UnitInPlay, teamsTurn:number) {
			BattleController.hideDamagePercClips();
			
			for (var i:number = 0; i < this.unitsInPlay.length; i++) {
				if (this.unitsInPlay[i] == selectedUnit) {
					this.unitsInPlay[i].clip.filters = [];
					this.unitsInPlay[i].validUnitForAction = true;
					if (selectedUnit.unit.unitActions[selectedUnit.selectedAction].canAffectSelf) {
						BattleController.displayDamagePerc(this.unitsInPlay[i]);
					}
				} else {
					if (this.unitsInPlay[i].team == selectedUnit.team) {
						
						if (selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == Action.AREA || selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == Action.SELF || ((selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == Action.ATTACK && !selectedUnit.unit.unitActions[selectedUnit.selectedAction].friendlyFire) || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY]<selectedUnit.unit.unitActions[selectedUnit.selectedAction].minRange || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY]>selectedUnit.unit.unitActions[selectedUnit.selectedAction].maxRange)) {
							if (this.unitsInPlay[i].team == 1) {
								//this.unitsInPlay[i].clip.filters = [this.team1HighlightFilter];
								this.unitsInPlay[i].clip.filters = [];
							} else {
								this.unitsInPlay[i].clip.filters = [];
								//this.unitsInPlay[i].clip.filters = [this.team2HighlightFilter];
							}
							
							this.unitsInPlay[i].clip.alpha = 0.4;
							this.unitsInPlay[i].validUnitForAction = false;
						} else {
							this.unitsInPlay[i].clip.filters = [];
							BattleController.displayDamagePerc(this.unitsInPlay[i]);
							this.unitsInPlay[i].validUnitForAction = true;
						}
						
					} else {
						
						if (selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == Action.AREA || selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == Action.SELF || selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == Action.DEFENCE || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY] < selectedUnit.unit.unitActions[selectedUnit.selectedAction].minRange || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY] > selectedUnit.unit.unitActions[selectedUnit.selectedAction].maxRange || this.unitsInPlay[i].attackable == false) {
							if (this.unitsInPlay[i].team == 1) {
								//this.unitsInPlay[i].clip.filters = [this.team1HighlightFilter];
								this.unitsInPlay[i].clip.filters = [];
							} else {
								//this.unitsInPlay[i].clip.filters = [this.team2HighlightFilter];
								this.unitsInPlay[i].clip.filters = [];
								
								this.unitsInPlay[i].clip.alpha = 0.4;
								this.unitsInPlay[i].validUnitForAction = false;
							}
						} else {
							this.unitsInPlay[i].clip.filters = [];
							BattleController.displayDamagePerc(this.unitsInPlay[i]);
							this.unitsInPlay[i].validUnitForAction = true;
						}
						
					}
				}
			}
		}
		
		public getDamagePerc(attackingUnit:UnitInPlay, targetUnit:UnitInPlay):number {
			var damage:number = attackingUnit.unit.unitActions[attackingUnit.selectedAction].getStandardAttackPower(attackingUnit, targetUnit, this);
			var damagePerc:number = Math.round((damage / targetUnit.currentHP) * 100);
			return damagePerc;
		}
		
		public removeDeadUnits() {
			for (var i:number = this.unitsInPlay.length-1; i >= 0; i--) {
				if (this.unitsInPlay[i].currentHP <= 0) {
					var viewArrEle:number = this.objectClipsInView.indexOf(this.unitsInPlay[i].clip);
					this.objectClipsInView.splice(viewArrEle, 1);
					this.unitsInPlay[i].removeFromPlay();
					this.unitsInPlay.splice(i, 1);
				}
			}
		}
	}
}

import BTMap = com.ussgames.battleTactics.BTMap;
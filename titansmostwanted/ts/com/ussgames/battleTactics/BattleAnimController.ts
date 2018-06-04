module com.ussgames.battleTactics {

	export class BattleAnimController {
		
		public static battleAnimHolder:any;
		public static attackingUnit:UnitInPlay;
		public static attackingClip:any;
		public static attackingUnitLongRangeAnim:any;
		public static defendingUnit:UnitInPlay;
		public static defendingClip:any;
		public static defendingUnitLongRangeAnim:any;
		
		public static battleStarted:boolean = false;
		public static longRange:boolean = false;
		
		public static newStyleActionLabel:string = "";
		public static actionAnim:any;
		
		constructor() {
			
		}
		
		public static initBattleAnim(attackingUnit_:UnitInPlay, defendingUnit_:UnitInPlay, longRange_:boolean = false) {
			this.attackingUnit = attackingUnit_;
			this.defendingUnit = defendingUnit_;

			if (this.battleAnimHolder != undefined) {
				Controller.root.battleAnimContainer.removeChild(this.battleAnimHolder);
			}

			this.battleAnimHolder = Main.addGAFMovieClip("NewBattleAnimHolder");
			this.battleAnimHolder.fader.gotoAndStop(1);
			this.battleAnimHolder.counter.gotoAndStop(1);
			this.battleAnimHolder.panel1.gotoAndStop(1);
			this.battleAnimHolder.panel2.gotoAndStop(1);

			this.longRange = false;
			this.battleAnimHolder.x = 320;
			this.battleAnimHolder.y = 240;
			Controller.root.battleAnimContainer.addChild(this.battleAnimHolder);
			this.battleStarted = false;

			this.battleAnimHolder.panel1.gotoAndPlay(1);
			this.battleAnimHolder.panel2.gotoAndPlay(1);

			console.log("init battleAnimHolder", this.battleAnimHolder);

			Main.addCustomEfFunc('BattleAnimController.battleAnimHolder.panel1.onEnterFrame', function()
			{
				if (BattleAnimController.battleAnimHolder == undefined) console.log("alarm battleAnimHolder undefined");

				if (BattleAnimController.battleAnimHolder.panel1.currentFrame == 6)
				{
					Main.removeCustomEfFunc("BattleAnimController.battleAnimHolder.panel1.onEnterFrame");
					BattleAnimController.populateBattleHolder();
				}
			});
		}
		
		public static scaleClips() {
			this.attackingClip.scale.x = this.attackingClip.scale.y = this.defendingClip.scale.y = 3.5;
			this.defendingClip.scale.x = -3.5;
		}
		
		public static populateBattleHolder() {
			if (this.battleAnimHolder.animHolder.children > 0) {
				this.battleAnimHolder.animHolder.removeChildAt(0);
			}
			
			if (this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].actionPhase == Action.PERFORM) {
				
				console.log(">>1");
				
				this.actionAnim = this.attackingUnit.unit.newAttackAnimClipClass;
				this.newStyleActionLabel = "action" + String(this.attackingUnit.selectedAction);

				for (var sa = 0; sa < this.actionAnim.children.length; sa++) {
					var clcr = this.actionAnim.children[sa];
					if (clcr.pluginName == undefined) {
						if (clcr._totalFrames == 21) this.showDefender(clcr);
						if (clcr._totalFrames == 4) this.showDamageNew(clcr);
					}
				}

				this.actionAnim.gotoAndPlay(this.newStyleActionLabel);


			} else if (this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].actionPhase == Action.RETALIATE) {
				
				console.log(">>2");
				
				this.actionAnim = this.defendingUnit.unit.newAttackAnimClipClass;
				this.newStyleActionLabel = "action" + String(this.defendingUnit.unit.retaliationAction);

				for (var sa = 0; sa < this.actionAnim.children.length; sa++) {
					var clcr = this.actionAnim.children[sa];
					if (clcr.pluginName == undefined) {
						if (clcr._totalFrames == 21) this.showDefender(clcr);
						if (clcr._totalFrames == 4) this.showDamageNew(clcr);
					}
				}

				this.actionAnim.gotoAndPlay(this.newStyleActionLabel);
			}
			this.battleAnimHolder.animHolder.addChild(this.actionAnim);
			
			this.battleStarted = true;
		}
		
		public static gotoDefend() {
			if (this.longRange) {
				this.battleStarted = false;
				this.battleAnimHolder.gotoAndPlay("defend");
			}
		}
		
		public static gotoDefend_multiple() {
			if (this.longRange) {
				this.battleStarted = false;

				
				if (Main.getCurrentLabel(this.battleAnimHolder) == "defend") {
					this.battleAnimHolder.gotoAndPlay("out3");
				} else {
					this.battleAnimHolder.gotoAndPlay("out4");
				}
			}
		}
		
		public static gotoRetaliate() {
			this.battleAnimHolder.counter.gotoAndPlay(2);
		}
		
		public static openPanels():boolean {
			console.log("OPEN PANELS f");

			if (this.battleAnimHolder) {
				this.battleAnimHolder.gotoAndPlay("out");

				console.log("openPanels");

				Main.addCustomEfFunc('BattleAnimController.battleAnimHolder.onEnterFrame', function()
				{
					console.log("battleAnimHolder.currentFrame", BattleAnimController.battleAnimHolder.currentFrame, BattleAnimController.battleAnimHolder.totalFrames);

					if (BattleAnimController.battleAnimHolder.currentFrame == 4 ||
						BattleAnimController.battleAnimHolder.currentFrame == 1)
					{
						console.log("removePanels");
						Main.removeCustomEfFunc("BattleAnimController.battleAnimHolder.onEnterFrame");
						BattleAnimController.removePanels();
					}
				});
			}
			return true;
		}
		
		public static removePanels() {

			console.log("removePanels f");

			if (this.battleAnimHolder){
				Controller.root.battleAnimContainer.removeChild(this.battleAnimHolder);
			}

			this.battleAnimHolder = null;
			this.attackingClip = null;
			this.attackingUnit = null;
			this.defendingClip = null;
			this.defendingUnit = null;
		}
		
		public static hideBattleGrid() {
			Controller.root.infoPanels.visible = false;
			Controller.root.gameContainer.visible = false;
			Controller.root.bgs.visible = false;
		}
		
		public static showBattleGrid() {
			Controller.root.infoPanels.visible = true;
			Controller.root.gameContainer.visible = true;
			Controller.root.bgs.visible = true;
		}
		
		public static showDamageNew(damageClip:any) {
			this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].showDamageNew(damageClip);
		}
		
		public static showDefender(clip:any) {
			this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].showDefender(clip);
		}
		
		public static hideFriendlyFireUnit(clip:any) {
			if (this.attackingUnit.team == 1 && this.defendingUnit.team == 1) {
				clip.visible = false;
			}
		}
		
	}

}
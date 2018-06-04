module com.ussgames.battleTactics {
	
	export class UpgradePanelContainer extends CustomMovieClip {
		
		public YDOWN:any[] = [164, 123, 82, 41, 0];
		public allUpgr:any[] = [];
		public info_updated:any = [false, false, false, false, false];
		
		constructor(clip:any) {
			super(clip);

			Transitioner.theRoot.level_up_scene.nextLevel.visible = false;
			new NextLevelButton(Transitioner.theRoot.level_up_scene.nextLevel, "levelUp");
			
			this.init();
		}

		public init() {
			this.instanceClip.up2.visible = false;
			this.instanceClip.up3.visible = false;
			this.instanceClip.up4.visible = false;
			this.instanceClip.up5.visible = false;

			this.instanceClip.y = 0;

			Main.addCustomEfFunc('UpgradePanelContainer.onEnterFrame', this.update.bind(this));
		}
		
		public update(e:Event) {
		
			if (!this.info_updated[0]) {
				this.info_updated[0] = true;
				this.allUpgr[0] = new UpgradePanel(this.instanceClip.up1.__1);
				this.allUpgr[0].init(1);
			}
				
			if (BattleController.yourTeamUnits.length > 1) {
				if (!this.info_updated[1]) {
					this.info_updated[1] = true;
					this.allUpgr[1] = new UpgradePanel(this.instanceClip.up2.__2);
					this.allUpgr[1].init(2);
					this.instanceClip.up2.visible = true;
				}
			}
			
			if (BattleController.yourTeamUnits.length > 2) {
				if (!this.info_updated[2]) {
					this.info_updated[2] = true;
					this.allUpgr[2] = new UpgradePanel(this.instanceClip.up3.__3);
					this.allUpgr[2].init(3);
					this.instanceClip.up3.visible = true;
				}
			}
			if (BattleController.yourTeamUnits.length > 3) {
				if (!this.info_updated[3]) {
					this.info_updated[3] = true;
					this.allUpgr[3] = new UpgradePanel(this.instanceClip.up4.__4);
					this.allUpgr[3].init(4);
					this.instanceClip.up4.visible = true;
				}
			}
			if (BattleController.yourTeamUnits.length > 4) {
				if (!this.info_updated[4]) {
					this.info_updated[4] = true;
					this.allUpgr[4] = new UpgradePanel(this.instanceClip.up5.__5);
					this.allUpgr[4].init(5);
					this.instanceClip.up5.visible = true;
				}
			}

			if (BattleController.yourTeamUnits.length < 5) {
				if (Math.abs(this.instanceClip.y - this.YDOWN[BattleController.yourTeamUnits.length - 1]) > 1) {
					this.instanceClip.y += (this.YDOWN[BattleController.yourTeamUnits.length - 1] - this.instanceClip.y) / 5;
					return;
				}
			}
			
			Main.removeCustomEfFunc('UpgradePanelContainer.onEnterFrame');

			this.info_updated = [false, false, false, false, false];
			
			var pointsToSpend:number = 0;
			for (var i:number = 0; i < BattleController.yourTeamUnits.length; i++) {
				pointsToSpend += BattleController.yourTeamUnits[i].unit.levelPointsLeftToSpend;
			}
			if (pointsToSpend <= 0) {
				Transitioner.theRoot.level_up_scene.nextLevel.visible = true;
			}
		}
		
	}
}

import UpgradePanelContainer = com.ussgames.battleTactics.UpgradePanelContainer;
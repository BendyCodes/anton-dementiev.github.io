
module src {
	export class Gameplay extends Phaser.Scene {
		public stage:Phaser.Scene;
		
		private fade;
		private pocoyo;
		private pList;

		private allAnims_current = [];

		private allAnims = ['pajaroto', 'trompeta_pelota', 'pato', 'palmera', 'nube', 'escoba', 'elly', 'despertador', 'caja', 'cactus', 'arbol'];

		private allAnimsSounds = ['pajaroto', 'trompetita', 'cuac LIMPIO', 'palmera', 'nube', 'woo', 'eli trompeta', 'despertador', 'golpe', 'cactus', 'arbol'];

		private allAnimsLen = [30, 21, 31, 39, 21, 40, 19, 17, 26, 22, 26];
		private allAnimsScale = [1, 1, 1, -1, 1, 1, -1, 1, 1, -1, 1];

		private allAnimsPos = [[180, 300], [380, 190], [380, 190], [380, 190], [380, 390], [380, 190], [420, 190], [380, 190], [450, 190], [350, 190], [400, 190]];

		private firstTime:boolean = true;
		
		private animss;
		private finishAnimss;

		private strongPanel;
		private strong_anim;

		private massivAnims = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		
		private currentAnim = 0;
		private finishCount = 0;

		private startCont;
		private flyCont;
		private finishCont;
		private topCont;

		private block:boolean = false;

		private strongRes:number;
		private nextClip:boolean = false;

		private pocoyo_anim;
		private frame_anim;
		private finish_anim;

		private music;
		
		create(val): void {

			this.firstTime = val.tutor;
			this.currentAnim = 0;

			this.stage = this;

			this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');

			this.startCont = this.add.container(0,0);
			this.flyCont = this.add.container(0,0);
			this.finishCont = this.add.container(0,0);
			this.topCont = this.add.container(0,0);
			
			var green = this.add.sprite(0, 0, 'green').setOrigin(0, 0);
			var golfFlag = this.add.sprite(0, 0, 'golf').setOrigin(0, 0);

			this.finishCont.add([golfFlag]);
			this.finishCont.visible = false;

			if (this.firstTime) {
				this.music = this.sound.add(locData["lang"]+"_MPjuegos_golf");
				this.music.play();
				this.music.once('ended', function(){
					this.block = false;
				}.bind(this));
			}
			this.block = this.firstTime;


			var pocoyoStr = "pocoyo";
			this.pocoyo = this.add.sprite(620, 390, pocoyoStr);
			
			var allFramesStrong = this.anims.generateFrameNames("strongPanel", {
				start: 1, end: 8, zeroPad: 4,
				prefix: "strongPanel", suffix: '.png'});
			
			if (this.strong_anim) this.strong_anim.destroy();
			this.strong_anim = this.anims.create({ key: "strongPanel", frames: allFramesStrong, repeat: -1, frameRate: 5});

			this.pocoyo.setFrame("pocoyo0001.png");


			this.strongPanel = this.add.sprite(530, 220, "strongPanel").play("strongPanel");

			this.startCont.add([green, this.pocoyo, this.strongPanel]);

			this.animss = this.add.sprite(0,0, "white");
			this.flyCont.add([this.animss]);
			this.flyCont.visible = false;

			this.fade = this.add.sprite(0, 0, "white").setScale(809/1, 566);
			this.fade.setInteractive();
			this.fade.alpha = 0.001;

			
			this.fade.on('pointerdown', function (pointer) {

					if (this.block) return;
				
					this.strongRes = this.strongPanel.anims.currentFrame.index;
					this.strongPanel.visible = false;

					this.sound.add("golpe").play();

					if (this.strongRes > 5) {
						switch(this.strongRes)
						{
							case 6: this.strongRes = 4; break;
							case 7: this.strongRes = 3; break;
							case 8: this.strongRes = 2; break;
						}
					}

					this.allAnims_current.length = 0;
					this.allAnims_current = [];
					this.allAnims_current = this.allAnims_current.concat(this.allAnims);

					this.shuffle(this.allAnims_current);

					var ppp = [[1, 17], [25, 34]];
					var pocoyoStr = "pocoyo";
					var ppp2 = 1;
					var pppT = 400;
					if (this.strongRes < 3) {
						ppp2 = 0;
						pppT = 700;
					}

					var allFramesPocoyo = this.anims.generateFrameNames(pocoyoStr, {
						start: ppp[ppp2][0], end: ppp[ppp2][1], zeroPad: 4,
						prefix: pocoyoStr, suffix: '.png'});

					if (this.pocoyo_anim) this.pocoyo_anim.destroy();
					this.pocoyo_anim = this.anims.create({ key: pocoyoStr, frames: allFramesPocoyo, repeat: 0, frameRate: 25});

					if (this.pocoyo) {
						this.pocoyo.destroy();
						this.pocoyo = this.add.sprite(620, 390, pocoyoStr);
						this.startCont.add([this.pocoyo]);
					}
					
					this.pocoyo.play(pocoyoStr);
					
					this.time.addEvent({ delay: pppT, callback: function() {
						this.startGolfAction();
					}.bind(this), callbackScope: this});

					this.block = true;

			}.bind(this));

			this.topCont.add([this.fade]);
		}

		private startGolfAction() {

			var fadeTween = this.tweens.add({
				targets: this.fade,
				alpha: 1,
				duration: 500,
				yoyo: true,
				repeat: 0,
				onYoyo: function () {
					if (this.currentAnim < this.strongRes)
					{
						this.startCont.visible = false;
						this.flyCont.visible = true;
						this.addAnimObject();

						this.topCont.setDepth(100);
						
						this.nextClip = true;
					}
					else {
						this.flyCont.visible = false;
						this.finishCont.visible = true;
						this.addFinishObject();
					}
				}.bind(this),
			});
		}

		private addFinishObject() {
			if (this.finishAnimss) this.finishAnimss.destroy();
			var num = this.currentAnim;

			var sss = "";
			switch (this.strongRes) {
				case 1: sss = "final_golf_fail1"; break;
				case 2: sss = "final_golf_fail2"; break;
				case 3: sss = "final_golf_win1"; break;
				case 4: sss = "final_golf_win2"; break;
				case 5: sss = "final_golf_win3"; break;
			}
			
			var allFramesFinish = this.anims.generateFrameNames(sss, {
				start: 1, end: 95, zeroPad: 4,
				prefix: sss, suffix: '.png'});

			if (this.finish_anim) this.finish_anim.destroy();
			this.finish_anim = this.anims.create({ key: sss, frames: allFramesFinish, repeat: 0, frameRate: 25});
			
			this.finishAnimss = this.add.sprite(300, 300, sss);

			this.finishCont.add([this.finishAnimss]);

			switch (this.strongRes) {
				case 3: 
				case 4: 
				case 5: this.sound.add("golf_pelota_cae").play(); break;
			}

			this.time.addEvent({ delay: 2500, callback: function() {
				switch (this.strongRes) {
					case 1: 
					case 2: this.sound.add("derrota").play(); break;
					case 3: 
					case 4: 
					case 5: this.sound.add("victoria").play(); break;
				}
			}.bind(this), callbackScope: this});

			this.time.addEvent({ delay: 500, callback: function() {
				switch (this.strongRes) {
					case 1: this.finishAnimss.play("final_golf_fail1"); break;
					case 2: this.finishAnimss.play("final_golf_fail2"); break;
					case 3: this.finishAnimss.play("final_golf_win1"); break;
					case 4: this.finishAnimss.play("final_golf_win2"); break;
					case 5: this.finishAnimss.play("final_golf_win3"); break;
				}
			}.bind(this), callbackScope: this});

			this.time.addEvent({ delay: 5000, callback: function() {
				var fadeTween = this.tweens.add({
					targets: this.fade,
					alpha: 1,
					duration: 500,
					yoyo: true,
					repeat: 0,
					onYoyo: function () {
						if (this.finishCount < 4) {
							this.finishCount++;

							this.startCont.visible = true;
							this.finishCont.visible = false;
							this.strongPanel.visible = true;

							this.block = false;
							this.currentAnim = 0;
							this.pocoyo.setFrame("pocoyo0001.png");
						}
						else {
							this.finishCount = 0;
							this.scene.start('Gameover');
						}
					}.bind(this),
				});
			}.bind(this), callbackScope: this});
		}

		private addAnimObject() {
			if (this.animss) this.animss.destroy();

			var num = this.allAnims.indexOf(this.allAnims_current[this.currentAnim]);

			var sss = this.allAnims[num];
			
			var allFrames = this.anims.generateFrameNames(sss, {
				start: 1, end: this.allAnimsLen[num], zeroPad: 4,
				prefix: sss, suffix: '.png'});

			if (this.frame_anim) this.frame_anim.destroy();
			this.frame_anim = this.anims.create({ key: sss, frames: allFrames, repeat: 0, frameRate: 25});
			
			this.animss = this.add.sprite(this.allAnimsPos[num][0], this.allAnimsPos[num][1], sss).setScale(1.1 * this.allAnimsScale[num], 1.1);

			this.flyCont.add([this.animss]);

			this.time.addEvent({ delay: 500, callback: function() {
				this.animss.play(this.allAnims[this.allAnims.indexOf(this.allAnims_current[this.currentAnim])]);
				this.sound.add(this.allAnimsSounds[this.allAnims.indexOf(this.allAnims_current[this.currentAnim])]).play();
			}.bind(this), callbackScope: this});
		}

		public update():void
		{
			if (this.nextClip && this.animss && this.animss.anims && this.animss.anims.currentFrame && this.animss.anims.currentFrame.progress == 1) {
				if (this.currentAnim < this.strongRes)
				{
					this.nextClip = false;
					this.currentAnim++;
					this.startGolfAction();
				}
			}
		}

		private shuffle(a) {
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		}
	}
}
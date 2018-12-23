module src {
	export class PreloadScene extends Phaser.Scene {

		public spin;
		public ppp;

		preload(): void {
			this.add.image(809 / 2, 200, 'jsn').setFrame("logo.png");
			this.add.image(809 / 2-85, 350, 'jsn').setFrame("line.png").setOrigin(0, 0.5);
			this.ppp = this.add.image(809 / 2-85, 350, 'jsn').setFrame("active.png").setOrigin(0, 0.5);
			this.spin = this.add.image(809 / 2, 430, 'jsn').setFrame("spinner.png");

			this.load.on('progress', function (value) {
				this.ppp.scaleX = value;
				this.spin.rotation += 0.5;
			}.bind(this));


			this.load.image("cursor", "./assets/cursor.cur");
			this.load.image("white", "./assets/white.png");
			this.load.image("title_back", "./assets/back/title.png");
			this.load.image("green", "./assets/back/green.png");
			this.load.image("info_main", "./assets/back/info_main.png");
			this.load.image("golf", "./assets/back/golf.png");

			this.load.atlas('btnPlay', 'assets/btnPlay/ButtonPlay.png', 'assets/btnPlay/ButtonPlay.json');
			
			var allAnims = ["strongPanel",
							"pocoyo",
							"arbol",
							"cactus",
							"caja",
							"despertador",
							"elly",
							"escoba",
							"nube",
							"palmera",
							"pato",
							"trompeta_pelota",
							"pajaroto",
							"final_golf_fail1",
							"final_golf_fail2",
							"final_golf_win1",
							"final_golf_win2",
							"final_golf_win3"];

			for (var s in allAnims) {
				this.load.atlas(allAnims[s],
					'assets/anims/'+allAnims[s]+'.png',
					'assets/anims/'+allAnims[s]+'.json'
				);
			}

			var allSounds = ["MUSIC_Intro",
							"MUSIC_Outro",
							locData["lang"]+"_MPjuegos_golf",
							"botonRO",
							"botonClick",
							"arbol",
							"cactus",
							"despertador",
							"golf_pelota_cae",
							"golpe",
							"nube",
							"trompeta",
							"trompetita",
							"cuac LIMPIO",
							"eli trompeta",
							"woo",
							"palmera",
							"pajaroto",
							"derrota",
							"victoria"];

			for (var s in allSounds) {
				this.load.audio(allSounds[s], [
					'sounds/'+allSounds[s]+'.mp3',
					'sounds/'+allSounds[s]+'.ogg'
				]);
			}
		}

		create(): void {
			this.scene.start('Title');
			//this.scene.start('Gameplay', {tutor:false});
			//this.scene.start('Gameover');
		}

		update(): void {
			if (this.spin) this.spin.rotation += 0.3;
		}
	}
}
module src {
	export class PreloadScene extends Phaser.Scene {

		public spin;
		public ppp;

		preload(): void {
			this.add.image(809 / 2, 200, 'jsn').setFrame("logo.png");
			this.add.image(809 / 2-85, 350, 'jsn').setFrame("line.png").setOrigin(0, 0.5);
			this.ppp = this.add.image(809 / 2-85, 350, 'jsn').setFrame("active.png").setOrigin(0, 0.5);
			this.spin = this.add.image(809 / 2, 430, 'jsn').setFrame("spinner.png");

			/*
			var percentText = this.make.text({
                x: 809 / 2,
                y: 490,
                text: '0%',
                style: {
                    fontSize: 40,
                    fill: '#1189cc'
                }
            });
			percentText.setOrigin(0.5, 0.5);
			percentText.visible = false;
			*/

			this.load.on('progress', function (value) {
				//percentText.setText(Math.floor(value * 100) + '%');
				this.ppp.scaleX = value;
				this.spin.rotation += 0.5;
			}.bind(this));

			this.load.image("cursor", "./assets/cursor.cur");
			this.load.image("title_back", "./assets/title.png");
			this.load.image("tips_main", "./assets/tips_main.png");
			this.load.image("info_main", "./assets/info_main.png");
			this.load.image("table", "./assets/table.png");

			this.load.atlas('btnPlay', 'assets/btnPlay/ButtonPlay.png', 'assets/btnPlay/ButtonPlay.json');
			this.load.atlas('btnYes', 'assets/btnYes/ButtonYes.png', 'assets/btnYes/ButtonYes.json');

			this.load.atlas('art', 'assets/art.png', 'assets/art.json');
			this.load.atlas('cards', 'assets/cards/cards.png', 'assets/cards/cards.json');
			this.load.atlas('clock', 'assets/clock/clock.png', 'assets/clock/clock.json');
			this.load.atlas('Probeta', 'assets/flask/Probeta.png', 'assets/flask/Probeta.json');

			var allSounds = ["FX_Bubbles",
							"FX_Button_Click",
							"FX_Button_RollOver",
							"FX_Completed",
							"FX_Fail",
							"FX_GameOver",
							"FX_Ok",
							"FX_Recount",
							"FX_Time"];
			
			for (var s in allSounds) {
				this.load.audio(allSounds[s], [
					'sounds/'+allSounds[s]+'.mp3',
					'sounds/'+allSounds[s]+'.ogg'
				]);
			}
		}

		create(): void {
			this.scene.start('Title');
		}

		update(): void {
			if (this.spin) this.spin.rotation += 0.3;
		}
	}
}
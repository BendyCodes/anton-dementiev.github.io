module src {
	export class GameOverScreen extends Phaser.Scene {

		private btnReplay;
		private music_bravo;

		create(val): void {
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');

            this.add.sprite(809/2, 566/2, 'info_main');

            this.add.text(415, 150, Main.getText("bravo"), {
				fill: '#ffffff',
				fontFamily: Main.getFont("bravo"),
				fontSize: 30,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            
			this.music_bravo = this.sound.add('MUSIC_Outro', {loop:true});
			this.music_bravo.play();
			
			this.btnReplay = this.add.sprite(600, 330, 'btnPlay').setInteractive();
			this.btnReplay.on('pointerdown', function (pointer) {
					this.btnReplay.setFrame('ButtonPlay0003.png');
				}.bind(this)
			);
			this.btnReplay.on('pointerout', function (pointer) {
					this.sound.add('botonRO').play();
					this.btnReplay.setFrame('ButtonPlay0001.png');
				}.bind(this)
			);
			this.btnReplay.on('pointerup', function (pointer) {
                    this.btnReplay.setFrame('ButtonPlay0001.png');
					this.sound.add('botonClick').play();
					if (this.music_bravo) this.music_bravo.stop();

                    this.scene.start('Gameplay', {tutor:false});
				}.bind(this)
			);
			this.btnReplay.on('pointermove', function (pointer) {
					this.btnReplay.setFrame('ButtonPlay0002.png');
				}.bind(this)
            );
        }
	}
}
module src {
	export class TitleScreen extends Phaser.Scene {

		private btnPlay:Phaser.GameObjects.GameObject;
		private snd;

		create(): void {
			this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');

			this.snd = this.sound.add("MUSIC_Intro", {loop:true});
			this.snd.play();

			var title_back = this.add.sprite(809 / 2, 566 / 2, 'title_back');

			var title_text = this.add.text(0, 0, Main.getText("Title"), {
				fill: '#1189cc',
				fontFamily: Main.getFont("Title"),
				fontSize: 45,
				align: "center"
			});
			title_text.x = 809/2 - title_text.width/2;
			title_text.y = 50;

			this.btnPlay = this.add.sprite(730, 480, 'btnPlay').setInteractive();
			this.btnPlay.on('pointerdown', function (pointer) {
					this.btnPlay.setFrame('ButtonPlay0003.png');
				}.bind(this)
			);
			this.btnPlay.on('pointerout', function (pointer) {
					this.btnPlay.setFrame('ButtonPlay0001.png');
				}.bind(this)
			);
			this.btnPlay.on('pointerup', function (pointer) {
					this.btnPlay.setFrame('ButtonPlay0001.png');
					if (this.snd) this.snd.stop();
					this.scene.start('Gameplay', {tutor:true});
				}.bind(this)
			);
			this.btnPlay.on('pointermove', function (pointer) {
					this.btnPlay.setFrame('ButtonPlay0002.png');
				}.bind(this)
			);
		}
	}
	
}
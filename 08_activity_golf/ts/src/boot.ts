module src {
	export class Boot extends Phaser.Scene {

		preload(): void {
			this.load.atlas('jsn', './assets/progress/loader.png', './assets/progress/loader.json');
		}

		create(): void {
			this.scene.start('Preload');
		}
	}
}
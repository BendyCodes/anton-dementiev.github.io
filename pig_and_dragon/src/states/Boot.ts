namespace states {
    export class Boot extends Phaser.State {

        init() {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            if (this.game.device.android) {
                this.game.input.mouse.enabled = !this.game.device.mspointer;
            }

            this.game.stage.disableVisibilityChange = true;
        }

        create() {
            this.input.maxPointers = 1;

            if (this.game.device.desktop) {
                this.game.canvas.oncontextmenu = function (e) {
                    e.preventDefault();
                }
            }

            this.game.state.start('Preloader', true, false);
        }

    }
}

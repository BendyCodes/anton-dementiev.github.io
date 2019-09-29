class App extends Phaser.Game {

    constructor() {
        const gameConfig: Phaser.IGameConfig = {
            width: 760,
            height: 640,
            renderer: Phaser.AUTO,
            transparent: true
        };

        super(gameConfig);

        this.state.add('Boot', states.Boot, false);
        this.state.add('Preloader', states.Preloader, false);

        this.state.start('Boot');
    }
}

let TEXTURE_ATLAS:string = 'TEXTURE_ATLAS';

let game:App;
window.onload = () => {
    game = new App();
};

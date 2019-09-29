class selector extends Phaser.Group {

    view:Phaser.Sprite;

    constructor() {
        super(game);

        this.view = new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'selector' + '0000');
        this.add(this.view);

        game.add.tween(this.view.scale).to({x:0.9, y:0.9}, 1000, Phaser.Easing.Default, true, 0, -1, true);
    }
}
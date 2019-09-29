class IconCoin extends Phaser.Group {
    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'IconCoin' + '0000'));
    }
}
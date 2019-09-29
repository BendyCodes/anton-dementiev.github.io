class t_box extends Phaser.Group {

    box_1:Phaser.Sprite;
    box_2:Phaser.Sprite;
    box_3:Phaser.Sprite;

    constructor() {
        super(game);

        this.box_1 = new Phaser.Sprite(game, 0, 7, TEXTURE_ATLAS, 'box_' + '0000');
        this.add(this.box_1);
        this.box_2 = new Phaser.Sprite(game, 43, 0, TEXTURE_ATLAS, 'box_' + '0000');
        this.add(this.box_2);
        this.box_3 = new Phaser.Sprite(game, 86, 7, TEXTURE_ATLAS, 'box_' + '0000');
        this.add(this.box_3);
    }
}
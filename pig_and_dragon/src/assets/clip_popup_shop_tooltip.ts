class clip_popup_shop_tooltip extends Phaser.Group {

    tooltip_item_name:Phaser.Text;
    tooltip_desc:Phaser.Text;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_shop_tooltip' + '0000'));

        // this.tooltip_item_name = x:3, y:2
        // this.tooltip_desc = x:2, y:32
    }
}
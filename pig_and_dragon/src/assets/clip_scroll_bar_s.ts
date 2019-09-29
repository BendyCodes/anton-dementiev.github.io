class clip_scroll_bar_s extends Phaser.Group {

    scroll_track:Phaser.Sprite;
    scroll_thumb:Phaser.Sprite;

    constructor() {
        super(game);

        this.scroll_track = new Phaser.Sprite(game, -6, 0, TEXTURE_ATLAS, 'scroll_track' + '0000');
        this.add(this.scroll_track);
        this.scroll_thumb = new Phaser.Sprite(game, -8, 17, TEXTURE_ATLAS, 'scroll_thumb' + '0000');
        this.add(this.scroll_thumb);

        //txt_user_name
    }
}
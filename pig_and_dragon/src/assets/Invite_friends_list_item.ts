class Invite_friends_list_item extends Phaser.Group {

    txt_name:Phaser.Text;

    icon_check:Phaser.Sprite;
    mc_user_pic:Phaser.Sprite;

    constructor() {
        super(game);

        this.icon_check = new Phaser.Sprite(game, 2, 12, TEXTURE_ATLAS, 'icon_check' + '0000');
        this.add(this.icon_check);

        this.mc_user_pic = new Phaser.Sprite(game, 22, 8, TEXTURE_ATLAS, 'mc_user_pic' + '0000');
        this.mc_user_pic.addChild(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'mc_user_pictures' + '0000'));
        this.add(this.mc_user_pic);
    }
}
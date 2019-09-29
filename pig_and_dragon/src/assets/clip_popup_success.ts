class clip_popup_success extends Phaser.Group {

    txt_level:Phaser.Text;

    btn_continue:Phaser.Button;
    btn_close:Phaser.Button;

    txt_level_score:Phaser.Text;

    clip_reward_gold:Phaser.Group;
    check_share:Phaser.Group;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_success' + '0000'));

        // this.txt_level = x:122, y:24

        let btn_btn_continueFrmBase:string = 'btn_continue';
        this.btn_continue = new Phaser.Button(game, 120, 477, TEXTURE_ATLAS, null, null, btn_btn_continueFrmBase + '0000', btn_btn_continueFrmBase + '0000', btn_btn_continueFrmBase + '0000', btn_btn_continueFrmBase + '0000');
        this.btn_continue.input.pixelPerfectClick = true;
        this.btn_continue.input.pixelPerfectAlpha = 1;
        this.btn_continue.input.useHandCursor = true;

        let btn_closeFrmBase:string = 'btn_close';
        this.btn_close = new Phaser.Button(game, 367, 64, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);

        this.clip_reward_gold = new Phaser.Group(game, this);
        this.clip_reward_gold.position.set(35, 390);
        this.clip_reward_gold.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_reward_gold' + '0000'));
        /*this.clip_reward_gold["clip_reward_gold"] =
        this.clip_reward_gold.add(this.clip_reward_gold["clip_reward_gold"]);*/

        this.check_share = new Phaser.Group(game, this);
        this.check_share.position.set(53, 439);
        // this.check_share.txt_share =
        this.check_share["icon_check"] = new Phaser.Sprite(game, 1, 2, TEXTURE_ATLAS, 'icon_check' + '0000');
        this.check_share.add(this.check_share["icon_check"]);
    }
}
class clip_popup_new_request_key extends Phaser.Group {

    btn_askfriends:Phaser.Button;
    btn_close:Phaser.Button;

    user_box_0:user_box;
    user_box_1:user_box;
    user_box_2:user_box;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_new_request_key' + '0000'));

        let btn_askfriendsFrmBase:string = 'btn_askfriends';
        this.btn_askfriends = new Phaser.Button(game, 120, 477, TEXTURE_ATLAS, null, null, btn_askfriendsFrmBase + '0000', btn_askfriendsFrmBase + '0000', btn_askfriendsFrmBase + '0000', btn_askfriendsFrmBase + '0000');
        this.btn_askfriends.input.pixelPerfectClick = true;
        this.btn_askfriends.input.pixelPerfectAlpha = 1;
        this.btn_askfriends.input.useHandCursor = true;

        let btn_closeFrmBase:string = 'btn_close';
        this.btn_close = new Phaser.Button(game, 582, 79, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);

        this.user_box_0 = new user_box();
        this.user_box_0.position.set(75, 161);
        this.add(this.user_box_0);

        this.user_box_1 = new user_box();
        this.user_box_1.position.set(175, 161);
        this.add(this.user_box_1);

        this.user_box_2 = new user_box();
        this.user_box_2.position.set(274, 161);
        this.add(this.user_box_2);
    }
}
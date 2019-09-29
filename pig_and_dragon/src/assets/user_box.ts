class user_box extends Phaser.Group {

    btn_ask:Phaser.Button;

    user_pic:Phaser.Sprite;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'user_box_' + '0000'));

        this.user_pic = new Phaser.Sprite(game, 5, 5, TEXTURE_ATLAS, 'user_box_' + '0000');
        this.add(this.user_pic);

        let btn_askFrmBase:string = 'btn_ask';
        this.btn_ask = new Phaser.Button(game, 0, 76, TEXTURE_ATLAS, null, null, btn_askFrmBase + '0000', btn_askFrmBase + '0000', btn_askFrmBase + '0000', btn_askFrmBase + '0000');
        this.btn_ask.input.pixelPerfectClick = true;
        this.btn_ask.input.pixelPerfectAlpha = 1;
        this.btn_ask.input.useHandCursor = true;

        //txt_user_name = x:-3, y:79
    }
}
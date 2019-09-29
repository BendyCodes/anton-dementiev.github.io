class Popup_CrossPromotion extends Phaser.Group {

    btn_play:Phaser.Button;
    btn_close:Phaser.Button;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, -11, 31, TEXTURE_ATLAS, 'Popup_CrossPromotion' + '0000'));

        let btnFrmBase:string = 'btn_play';
        this.btn_play = new Phaser.Button(game, 185, 456, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_play.input.pixelPerfectClick = true;
        this.btn_play.input.pixelPerfectAlpha = 1;
        this.btn_play.input.useHandCursor = true;
        this.add(this.btn_play);

        let btn_closeFrmBase:string = 'btn_close';
        this.btn_close = new Phaser.Button(game, 499, 108, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
    }
}
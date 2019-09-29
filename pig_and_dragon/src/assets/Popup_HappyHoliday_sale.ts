class Popup_HappyHoliday_sale extends Phaser.Group {

    btn_shop:Phaser.Button;
    btn_close:Phaser.Button;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'Popup_HappyHoliday_sale' + '0000'));

        let btnFrmBase:string = 'btn_shop';
        this.btn_shop = new Phaser.Button(game, 213, 443, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_shop.input.pixelPerfectClick = true;
        this.btn_shop.input.pixelPerfectAlpha = 1;
        this.btn_shop.input.useHandCursor = true;
        this.add(this.btn_shop);

        let btn_closeFrmBase:string = 'btn_close';
        this.btn_close = new Phaser.Button(game, 581, 75, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
    }
}
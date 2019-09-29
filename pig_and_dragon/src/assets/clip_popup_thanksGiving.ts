class clip_popup_thanksGiving extends Phaser.Group {

    txt_again:Phaser.Sprite;

    btn_ok:Phaser.Button;
    btn_close:Phaser.Button;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_thanksGiving' + '0000'));

        let btn_okFrmBase:string = 'btn_ok';
        this.btn_ok = new Phaser.Button(game, 225, 517, TEXTURE_ATLAS, null, null, btn_okFrmBase + '0000', btn_okFrmBase + '0000', btn_okFrmBase + '0000', btn_okFrmBase + '0000');
        this.btn_ok.input.pixelPerfectClick = true;
        this.btn_ok.input.pixelPerfectAlpha = 1;
        this.btn_ok.input.useHandCursor = true;
        this.add(this.btn_ok);

        let btn_closeFrmBase:string = 'btn_close';
        this.btn_close = new Phaser.Button(game, 583, 80, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);
    }
}
class Popup_valentine_event_alert extends Phaser.Group {

    btn_gotit:Phaser.Button;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 87, -19, TEXTURE_ATLAS, 'Popup_valentine_event_alert' + '0000'));

        let btnFrmBase:string = 'btn_gotit';
        this.btn_gotit = new Phaser.Button(game, 216, 443, TEXTURE_ATLAS, null, null, btnFrmBase + '0001', btnFrmBase + '0003', btnFrmBase + '0002', btnFrmBase + '0000');
        this.btn_gotit.input.pixelPerfectClick = true;
        this.btn_gotit.input.pixelPerfectAlpha = 1;
        this.btn_gotit.input.useHandCursor = true;
        this.add(this.btn_gotit);
    }
}
class mc_popUpShopItem extends Phaser.Group {

    iid_:Phaser.Sprite;
    item_icon_cover:Phaser.Sprite;
    icon_using:Phaser.Sprite;

    btn_buy_coin:Phaser.Button;
    btn_buy_jewel:Phaser.Button;
    btn_lock:Phaser.Button;
    btn_cancel:Phaser.Button;

    txt_coin_price:Phaser.Text;
    txt_unlock_level:Phaser.Text;
    txt_jewel_price:Phaser.Text;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 87, -19, TEXTURE_ATLAS, 'Popup_valentine_event_alert' + '0000'));

        let btnFrmBase:string = 'btn_lock';
        this.btn_lock = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null, btnFrmBase + '0000', btnFrmBase + '0000', btnFrmBase + '0000', btnFrmBase + '0000');
        this.btn_lock.input.pixelPerfectClick = true;
        this.btn_lock.input.pixelPerfectAlpha = 1;
        this.btn_lock.input.useHandCursor = true;

        let btn_cancel_FrmBase:string = 'btn_cancel';
        this.btn_cancel = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null,btn_cancel_FrmBase + '0001', btn_cancel_FrmBase + '0003', btn_cancel_FrmBase + '0002', btn_cancel_FrmBase + '0000');
        this.btn_cancel.input.pixelPerfectClick = true;
        this.btn_cancel.input.pixelPerfectAlpha = 1;
        this.btn_cancel.input.useHandCursor = true;

        let btn_buy_jewel_FrmBase:string = 'btn_buy_jewel';
        this.btn_buy_jewel = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null,  btn_buy_jewel_FrmBase + '0001', btn_buy_jewel_FrmBase + '0003', btn_buy_jewel_FrmBase + '0002', btn_buy_jewel_FrmBase + '0000');
        this.btn_buy_jewel.input.pixelPerfectClick = true;
        this.btn_buy_jewel.input.pixelPerfectAlpha = 1;
        this.btn_buy_jewel.input.useHandCursor = true;

        let btn_buy_btn_buy_coin:string = 'btn_buy_coin';
        this.btn_buy_coin = new Phaser.Button(game, 2, 68, TEXTURE_ATLAS, null, null,  btn_buy_btn_buy_coin + '0001', btn_buy_btn_buy_coin + '0003', btn_buy_btn_buy_coin + '0002', btn_buy_btn_buy_coin + '0000');
        this.btn_buy_coin.input.pixelPerfectClick = true;
        this.btn_buy_coin.input.pixelPerfectAlpha = 1;
        this.btn_buy_coin.input.useHandCursor = true;

        this.icon_using = new Phaser.Sprite(game, 6, 5, TEXTURE_ATLAS, 'icon_using' + '0000');

        this.item_icon_cover = new Phaser.Sprite(game, 7, 5, TEXTURE_ATLAS, 'item_icon_cover' + '0000');

        this.iid_ = new Phaser.Sprite(game, 7, 5, TEXTURE_ATLAS, 'iid_9' + '0000');

        this.add(this.iid_);
        this.add(this.item_icon_cover);
        this.add(this.icon_using);
        this.add(this.btn_buy_coin);
        this.add(this.btn_buy_jewel);
        this.add(this.btn_cancel);
        this.add(this.btn_lock);
    }

    public gotoAndStop(label:string):void {
        this.iid_.frameName = label;
    }
}
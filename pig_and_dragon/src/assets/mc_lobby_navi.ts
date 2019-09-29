class mc_lobby_navi extends Phaser.Group {

    btn_scroll_up:Phaser.Button;
    btn_scroll_down:Phaser.Button;
    btn_home:Phaser.Button;

    constructor() {
        super(game);

        let btn_scroll_upbtnFrmBase:string = 'btn_scroll_up';
        this.btn_scroll_up = new Phaser.Button(game, 41, 20, TEXTURE_ATLAS, null, null, btn_scroll_upbtnFrmBase + '0001', btn_scroll_upbtnFrmBase + '0003', btn_scroll_upbtnFrmBase + '0002', btn_scroll_upbtnFrmBase + '0000');
        this.btn_scroll_up.input.pixelPerfectClick = true;
        this.btn_scroll_up.input.pixelPerfectAlpha = 1;
        this.btn_scroll_up.input.useHandCursor = true;
        this.add(this.btn_scroll_up);

        let btn_scroll_down_btnFrmBase:string = 'btn_scroll_down';
        this.btn_scroll_down = new Phaser.Button(game, 41, 98, TEXTURE_ATLAS, null, null, btn_scroll_down_btnFrmBase + '0001', btn_scroll_down_btnFrmBase + '0003', btn_scroll_down_btnFrmBase + '0002', btn_scroll_down_btnFrmBase + '0000');
        this.btn_scroll_down.input.pixelPerfectClick = true;
        this.btn_scroll_down.input.pixelPerfectAlpha = 1;
        this.btn_scroll_down.input.useHandCursor = true;
        this.add(this.btn_scroll_down);

        let btn_home_btnFrmBase:string = 'btn_home_btnFrmBase';
        this.btn_home = new Phaser.Button(game, 0, 27, TEXTURE_ATLAS, null, null, btn_home_btnFrmBase + '0001', btn_home_btnFrmBase + '0003', btn_home_btnFrmBase + '0002', btn_home_btnFrmBase + '0000');
        this.btn_home.input.pixelPerfectClick = true;
        this.btn_home.input.pixelPerfectAlpha = 1;
        this.btn_home.input.useHandCursor = true;
        this.add(this.btn_home);
    }
}
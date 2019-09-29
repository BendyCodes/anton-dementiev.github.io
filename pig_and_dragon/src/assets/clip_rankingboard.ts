class clip_rankingboard extends Phaser.Group {

    btn_sendtoall:Phaser.Button;

    mc_ranker_group:Phaser.Group;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_rankingboard' + '0000'));

        let btn_sendtoallFrmBase:string = 'btn_sendtoall';
        this.btn_sendtoall = new Phaser.Button(game, 67, 350, TEXTURE_ATLAS, null, null, btn_sendtoallFrmBase + '0000', btn_sendtoallFrmBase + '0000', btn_sendtoallFrmBase + '0000', btn_sendtoallFrmBase + '0000');
        this.btn_sendtoall.input.pixelPerfectClick = true;
        this.btn_sendtoall.input.pixelPerfectAlpha = 1;
        this.btn_sendtoall.input.useHandCursor = true;

        this.mc_ranker_group = new Phaser.Group(game, this);
        this.mc_ranker_group.position.set(22, 65);
    }
}
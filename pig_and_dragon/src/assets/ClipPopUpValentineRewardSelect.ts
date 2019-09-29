class ClipPopUpValentineRewardSelect extends Phaser.Group {

    txt_again:Phaser.Sprite;
    txt_choose:Phaser.Sprite;

    btn_no_thanks:Phaser.Button;
    btn_get_reward:Phaser.Button;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'ClipPopUpValentineRewardSelect' + '0000'));

        let btn_get_rewardFrmBase:string = 'btn_get_rewardFrmBase';
        this.btn_get_reward = new Phaser.Button(game, 134, 417, TEXTURE_ATLAS, null, null, btn_get_rewardFrmBase + '0000', btn_get_rewardFrmBase + '0000', btn_get_rewardFrmBase + '0000', btn_get_rewardFrmBase + '0000');
        this.btn_get_reward.input.pixelPerfectClick = true;
        this.btn_get_reward.input.pixelPerfectAlpha = 1;
        this.btn_get_reward.input.useHandCursor = true;

        let btn_no_thanksFrmBase:string = 'btn_no_thanks';
        this.btn_no_thanks = new Phaser.Button(game, 156, 417, TEXTURE_ATLAS, null, null, btn_no_thanksFrmBase + '0000', btn_no_thanksFrmBase + '0000', btn_no_thanksFrmBase + '0000', btn_no_thanksFrmBase + '0000');
        this.btn_no_thanks.input.pixelPerfectClick = true;
        this.btn_no_thanks.input.pixelPerfectAlpha = 1;
        this.btn_no_thanks.input.useHandCursor = true;

        this.txt_again = new Phaser.Sprite(game, 24, 121, TEXTURE_ATLAS, 'txt_again' + '0000');
        this.add(this.txt_again);

        this.txt_choose = new Phaser.Sprite(game, 31, 121, TEXTURE_ATLAS, 'txt_choose' + '0000');
        this.add(this.txt_choose);

        //not added _mcPop["item_reward_" + i]
    }
}
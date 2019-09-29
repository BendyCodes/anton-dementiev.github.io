class clip_popup_play extends Phaser.Group {

    txt_level:Phaser.Text;

    txt_again:Phaser.Sprite;

    btn_play:Phaser.Button;
    btn_close:Phaser.Button;

    clip_goal_desc:Phaser.Group;
    mc_goal_blocks:Phaser.Group;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_popup_play' + '0000'));

        // this.txt_level = x:122, y:24

        let btn_playFrmBase:string = 'btn_play';
        this.btn_play = new Phaser.Button(game, 118, 487, TEXTURE_ATLAS, null, null, btn_playFrmBase + '0000', btn_playFrmBase + '0000', btn_playFrmBase + '0000', btn_playFrmBase + '0000');
        this.btn_play.input.pixelPerfectClick = true;
        this.btn_play.input.pixelPerfectAlpha = 1;
        this.btn_play.input.useHandCursor = true;
        this.add(this.btn_play);

        let btn_closeFrmBase:string = 'btn_close';
        this.btn_close = new Phaser.Button(game, 368, 64, TEXTURE_ATLAS, null, null, btn_closeFrmBase + '0001', btn_closeFrmBase + '0003', btn_closeFrmBase + '0002', btn_closeFrmBase + '0000');
        this.btn_close.input.pixelPerfectClick = true;
        this.btn_close.input.pixelPerfectAlpha = 1;
        this.btn_close.input.useHandCursor = true;
        this.add(this.btn_close);

        this.clip_goal_desc = new Phaser.Group(game, this);
        this.clip_goal_desc.position.set(34, 194);
        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'clip_goal_desc' + '0000'));
        //this.clip_goal_desc.txt_goal_score = x:74, y:9
        this.clip_goal_desc["icon_goal_star"] = new Phaser.Sprite(game, 30, 9, TEXTURE_ATLAS, 'icon_goal_star' + '0000')
        this.clip_goal_desc.add(this.clip_goal_desc["icon_goal_star"]);
        this.add(this.clip_goal_desc);
        let _labels:string[] = ["s_0101", "s_0106", "s_0103", "s_0104", "s_0102", "s_0105"];
        for (let i = 0; i < _labels.length; i++)
            this.clip_goal_desc["icon_goal_star"].animations.add(_labels[i], Phaser.Animation.generateFrameNames('icon_goal_star', i, i, '', 4), 60, false);
        this.clip_goal_desc["icon_goal_star"]["gotoAndStop"] = (label:string) => {
            this.clip_goal_desc["icon_goal_star"].animations.stop(label);
        };

        this.mc_goal_blocks = new Phaser.Group(game, this);
        this.mc_goal_blocks.position.set(34, 246);
        this.clip_goal_desc["gotoAndStop"] = (lstGoalBlocks:number) => {
            this.mc_goal_blocks.removeAll();

            this.mc_goal_blocks.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'mc_goal_blocks' + '0000'));

            let _y:number = 4;
            let _x:number[][] = [
                [126],//0
                [76, 205],//1
                [34, 136, 239],//2
                [24, 98, 172, 246],//3
                [13, 75, 137, 200, 262],//4
            ];
            for (let k = 0; k <= lstGoalBlocks; k++) {
                let b:Phaser.Sprite = new Phaser.Sprite(game, _x[lstGoalBlocks][k], _y, TEXTURE_ATLAS, 'mc_goal_block_' + '0000');
                this.mc_goal_blocks.add(b);
                this.mc_goal_blocks["mc_goal_block_" + k] = b;
                let _labels:string[] = ["b_0101", "b_0103", "b_0104", "b_0102", "b_0105", "b_0106", "b_0301", "b_0501", "b_0701", "b_0803", "b_1504", "b_7001", "b_7002", "b_6003", "b_6002", "b_6001", "b_1601"];
                for (var _i = 0; _i < _labels.length; _i++) {
                    b.animations.add(_labels[_i], Phaser.Animation.generateFrameNames('mc_goal_block_', _i, _i, '', 4), 60, false);
                }
                b["gotoAndStop"] = (label:string) => {
                    b.animations.stop(label);
                };
                // b["txt_count"] = x:41, y:13
            }
        };
    }
}
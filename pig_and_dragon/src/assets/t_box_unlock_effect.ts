class t_box_unlock_effect extends Phaser.Group {

    view:Phaser.Sprite;

    constructor() {
        super(game);

        this.view = new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 't_box_unlock_effect'+'0000');
        this.scale.set(3, 3);
        this.add(this.view);
        this.view.animations.add('playingAnimation', Phaser.Animation.generateFrameNames('t_box_unlock_effect', 0, 38, '', 4), 60, false)
    }

    public play():void {
        this.view.animations.play('playingAnimation');
    }

    public stop():void {
        this.view.animations.stop();
    }
}
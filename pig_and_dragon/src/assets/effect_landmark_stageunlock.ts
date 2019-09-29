class effect_landmark_stageunlock extends Phaser.Group {

    view:Phaser.Sprite;

    constructor() {
        super(game);

        this.add(new Phaser.Sprite(game, 0, 0, TEXTURE_ATLAS, 'effect_landmark_stageunlock' + '0000'));
        this.scale.set(3, 3);
        this.add(this.view);
        this.view.animations.add('playingAnimation', Phaser.Animation.generateFrameNames('t_box_unlock_effect', 0, 18, '', 4), 60, false);
    }
}
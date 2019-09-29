///<reference path="../showcase/window/GameArea.ts"/>
namespace states {
    import GameArea = src.GameArea;

    export class Preloader extends Phaser.State {

        preload() {
            super.preload(this.game);

            this.buildChildren();
            this.preloadContent();
        }

        protected buildChildren() {
            this.game.load.onFileComplete.add(this.onFileComplete, this);
            this.game.load.onLoadComplete.add(this.onLoadingComplete, this);
        }

        protected preloadContent() {
            this.game.load.atlasJSONArray(TEXTURE_ATLAS, 'img/' + TEXTURE_ATLAS + '.png', 'img/' + TEXTURE_ATLAS + '.json');
            this.game.load.atlasJSONArray('gameTexture', 'img/' + 'gameTexture' + '.png', 'img/' + 'gameTexture' + '.json');
            this.game.load.image('ingamebg', 'img/' + 'ingamebg' + '.png');
        }


        create() {
        }


        private onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        }

        private onLoadingComplete() {
            let gameArea:GameArea = new GameArea(1);
            this.add.existing(gameArea);
            gameArea.createThis();
            gameArea.showThis();
        }
    }
}
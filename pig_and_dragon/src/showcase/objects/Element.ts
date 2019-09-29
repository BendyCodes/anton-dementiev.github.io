module src {
    export class Element extends Phaser.Sprite {
        public kind: string;
        public posX: number;
        public posY: number;
        public isAlive: boolean;

        private _isHighlighted: boolean;

        constructor(kind: string) {
            super(game, 0, 0, 'gameTexture', kind + '0000');
            this.kind = kind;
            this.anchor.setTo(0.46, 0.5);

            if (Constants.MATCHING_ELEMENTS.indexOf(this.kind) >= 0) {
                this.animations.add('default', Phaser.Animation.generateFrameNames(kind, 0, 0, '', 4), 30, false);
                this.animations.add('highlighted', Phaser.Animation.generateFrameNames(kind, 1, 1, '', 4), 30, false);
            } else if (this.kind == Constants.KIND_COIN) {
                this.animations.add('rotate', Phaser.Animation.generateFrameNames(kind, 0, 20, '', 4), 30, true);
                this.play('rotate');
            } else if (this.kind == Constants.KIND_GOLD) {
                this.animations.add('shine', Phaser.Animation.generateFrameNames(kind, 0, 54, '', 4), 30, true);
                this.play('shine');
                this.anchor.setTo(0.4, 0.6);
            } else {
                this.anchor.setTo(0.48, 0.52);
            }
            this.setHighlighted(false);
        }

        public isHighlighted(): boolean {
            return this._isHighlighted;
        }

        public setHighlighted(isHighlighted:boolean):void {
            this._isHighlighted = isHighlighted;
            if (this._isHighlighted) {
                this.play('highlighted');
            } else {
                this.play('default');
            }
        }

        public placeAt(grid: Grid, posX: number, posY: number, delayedShow:number): void {
            this.isAlive = true;
            this.posX = posX;
            this.posY = posY;
            let destinationX:number = grid.startX + this.posX * grid.spacingHorizontal;
            let destinationY:number = grid.startY + this.posY * grid.spacingVertical;
            this.x = destinationX;
            this.y = destinationY - 10;

            this.alpha = 0;

            CommonUtils.createTimer(delayedShow, ()=>{
                this.alpha = 1;

                game.add.tween(this)
                    .to({y: destinationY}, Constants.CANDY_ANIMATION_BASE_DURATION, Phaser.Easing.Back.Out)
                    .start();


                game.add.tween(this.scale)
                    .to({x: 1.04, y: 0.92}, 150, Phaser.Easing.Linear.None)
                    .to({x: 1, y: 1}, 130, Phaser.Easing.Linear.None)
                    .delay(Constants.CANDY_ANIMATION_BASE_DURATION)
                    .start();
            }, this);



        }

        public fallDownTo(grid: Grid, posY: number): number {
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.isAlive = true;

            let newY: number = grid.startY + posY * grid.spacingVertical;

            let duration:number = Constants.CANDY_FALLDOWN1CELL_BASE_DURATION *(Math.pow(posY-this.posY, 0.5));
            let delay:number = (grid.cols-this.posY)*50;

            game.add.tween(this).to({y: newY}, duration, Phaser.Easing.Cubic.InOut, true, delay);

            this.posY = posY;

            return duration + delay;
        }

        public playDisappearingAnimation(delayMultipler:number): void {
            if (this.isHighlighted()) {
                this.setHighlighted(false);
            }
            this.isAlive = false;
            // this.parent.setChildIndex(this, this.parent.children.length - 1);
            game.add.tween(this.scale)
                .to({
                    x: 0.6,
                    y: 0.6
                }, 500, Phaser.Easing.Back.In, true/*, Constants.CANDY_ANIMATION_BASE_DELAY * delayMultipler*/);
            game.add.tween(this)
                .to({
                    x: this.x + (Math.random() * 100 + 40) * (Math.random() < 0.5 ? -1 : 1),
                    y: game.height,
                    angle:360
                }, (game.height - this.y) / 450 * 1000, Phaser.Easing.Default, true,/*Constants.CANDY_ANIMATION_BASE_DELAY * delayMultipler +*/ 250).start()
                .onComplete.add(this.destroy, this);
        }

        public matchableWith(otherElement:Element):boolean {
            return otherElement && otherElement.kind == this.kind;
        }

         /**
         *  Overridden methods
         */

        destroy(destroyChildren?: boolean) {
            super.destroy(destroyChildren);
        }

    }
}
module src {

    export class CommonUtils {
        public static currentView: Phaser.Group = null;
        public static GAME_ART_GROUP: Phaser.Group;

        private static transScreen_: Phaser.Graphics = null;

        private static createTransScreenIfNotExist(): void {
            if (this.transScreen_ == null) {
                this.transScreen_ = new Phaser.Graphics(game);
                this.transScreen_.beginFill(0x000000, 1);
                this.transScreen_.drawRect(0, 0, game.width, game.height);
                this.transScreen_.endFill();
            }
        }

        public static changeCurrentView(object: Phaser.Group): void {
            this.createTransScreenIfNotExist();

            let g:()=>void = ()=>{
                this.GAME_ART_GROUP.add(this.transScreen_);
                this.transScreen_.alpha = 0;

                let fn:(o1:any, o2:any)=>boolean = (o1:any, o2:any)=>{
                    return o1 instanceof GameArea && o2 instanceof GameArea ||
                        o1 instanceof GameArea;
                };
                let _alpha:number = fn(object, this.currentView) || fn(this.currentView, object) ? 0 : 1;

                game.add.tween(this.transScreen_).to({alpha: _alpha}, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                    .onComplete.addOnce(() => {
                    this.currentView.visible = false;

                    if (this.currentView['destroyThis']) this.currentView['destroyThis']();

                    CommonUtils.GAME_ART_GROUP.remove(this.currentView, true, false);

                    this.currentView = object;
                    this.currentView.visible = true;
                    if (this.currentView['createThis']) this.currentView['createThis']();
                    this.GAME_ART_GROUP.addAt(this.currentView, this.transScreen_.parent.getChildIndex(this.transScreen_));

                    game.add.tween(this.transScreen_).to({alpha: 0}, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                        .onComplete.addOnce(() => {

                        if (this.currentView['showThis']) {
                            let duration:number = this.currentView['showThis']();
                            CommonUtils.createTimer(duration, ()=>{
                                this.transScreen_.parent.removeChild(this.transScreen_);
                            });
                        } else {
                            this.transScreen_.parent.removeChild(this.transScreen_);
                        }
                    }, this);
                }, this);
            };

            this.currentView['willBeReplacedWith'] = object;

            if (this.currentView['hideThis']) {
                let duration:number = this.currentView['hideThis']();
                CommonUtils.createTimer(duration, g);
            } else {
                g();
            }


        }

        public static showTransScreen(overScreen: Phaser.Group, onMidComplete: () => void = null, onComplete: () => void = null): void {
            this.createTransScreenIfNotExist();

            overScreen.parent.addChildAt(this.transScreen_, overScreen.parent.getChildIndex(overScreen) + 1);
            this.transScreen_.alpha = 0;
            game.add.tween(this.transScreen_).to({alpha: 1}, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                .onComplete.addOnce(() => {
                    if (onMidComplete) onMidComplete();
                    game.add.tween(this.transScreen_).to({alpha: 0}, CommonUtils.BETWEEN_WINDOW_ANIM_DURATION, Phaser.Easing.Linear.None, true)
                        .onComplete.addOnce(() => {
                            if (onComplete) onComplete();
                            this.transScreen_.parent.removeChild(this.transScreen_);
                    }, this);
            }, this);
        }

        public static BETWEEN_WINDOW_ANIM_DURATION: number = 375;

        public static centralize(group: Phaser.Group): Phaser.Group {
            if (group.parent) {
                let groupBounds: PIXI.Rectangle = group.getBounds(group.parent);
                group.position.set(game.world.centerX - groupBounds.x - groupBounds.width / 2,
                    game.world.centerY - groupBounds.y - groupBounds.height / 2);
            }

            return group;
        }

        private static mocObjArr: Array<Object> = [];
        public static tweenScores(tf: Phaser.Text, targetScore: number, startScores: number = 0, onCompleteCallback: Function = null,
                                  duration: number = 1500): void {
            // let snd:Phaser.Sound = startScores != targetScore && tf.parent && tf.parent.parent ? SoundController.instance.playSound('sound922') : null;
            let mocObj: Object;
            let i: number = 0;
            for (i = 0; i < this.mocObjArr.length; i++) {
                if (this.mocObjArr[i]["tf"] == tf) {
                    mocObj = this.mocObjArr[i];
                    game.tweens.removeFrom(mocObj);
                    mocObj["score"] = startScores;
                    break;
                }
            }
            if (i == this.mocObjArr.length) {
                mocObj = {'score': startScores, 'tf': tf};
                this.mocObjArr.push(mocObj);
            }


            let tw: Phaser.Tween = game.add.tween(mocObj)
                .to({score: targetScore}, duration, Phaser.Easing.Linear.None/*Phaser.Easing.Exponential.In*/, true);
            tw.onUpdateCallback((): void => {
                mocObj["tf"].text = "" + Math.round(mocObj["score"]);
            }, this);
            tw.onComplete.add((): void => {
                mocObj["tf"].text = "" + Math.round(mocObj["score"]);
                this.mocObjArr.splice(this.mocObjArr.indexOf(mocObj), 1);
                if (onCompleteCallback) {
                    onCompleteCallback();
                }

                /*if (snd) {
                    snd.volume = 0;
                    if (tf.parent && tf.parent.parent) {
                    }

                }*/

            }, this);

        }

        private static timers: Array<Phaser.Timer> = [];

        public static createTimer(delay: number, callback: Function, callbackContext?: any, ...args: any[]): Phaser.Timer {
            let timer: Phaser.Timer = game.time.create(true);
            timer.add(delay, callback, callbackContext, ...args);
            timer.onComplete.add((_timer: Phaser.Timer) => {
                let ind: number = CommonUtils.timers.indexOf(_timer);
                if (ind >= 0) CommonUtils.timers.splice(ind, 1);
            }, this, 0, timer);
            CommonUtils.timers.push(timer);
            timer.start();
            return timer;
        }

        public static destroyTimer(timer: Phaser.Timer): void {
            let ind: number = CommonUtils.timers.indexOf(timer);
            if (ind >= 0) CommonUtils.timers.splice(ind, 1);
            timer.destroy();
        }

        public static createTimerRepeat(delay: number, repeatCount: number, callback: Function, callbackContext?: any, ...args: any[]): Phaser.Timer {
            let timer: Phaser.Timer = game.time.create(true);
            timer.repeat(delay, repeatCount, callback, callbackContext, ...args);
            timer.onComplete.add((_timer: Phaser.Timer) => {
                let ind: number = CommonUtils.timers.indexOf(_timer);
                if (ind >= 0) CommonUtils.timers.splice(ind, 1);
            }, this, 0, timer);
            CommonUtils.timers.push(timer);
            timer.start();
            return timer;
        }

        public static setPausedTimers(paused: boolean): void {
            if (paused) {
                for (let t of CommonUtils.timers) {
                    t.pause();
                }
            } else {
                for (let t of CommonUtils.timers) {
                    t.resume();
                }
            }
        }

        public static destroyAllTimers(): void {
            for (let t of CommonUtils.timers) {
                t.destroy();
            }
            this.removeAllTimers();
        }

        public static removeAllTimers(): void {
            CommonUtils.timers.splice(0, CommonUtils.timers.length);
        }

        public static addButtonTweens(targetButton: Phaser.Sprite, startScaleX: number = 1, startScaleY: number = 1, inputEnabled: boolean = true, playClickSound: boolean = true): void {
            targetButton.inputEnabled = inputEnabled;
            targetButton.anchor.set(0.5, 0.5);
            targetButton.events.onInputOver.add(() => {
                game.add.tween(targetButton.scale).to({x: 1.1 * startScaleX, y: 1.1 * startScaleY}, 100).start();
            }, this);
            targetButton.events.onInputOut.add(() => {
                game.add.tween(targetButton.scale).to({
                    x: startScaleX,
                    y: startScaleY
                }, 200, Phaser.Easing.Elastic.Out).start();
            }, this);
            targetButton['defY'] = targetButton.y;
            targetButton.events.onInputDown.add(() => {
                targetButton.y = targetButton['defY'];
                game.add.tween(targetButton).to({y: targetButton['defY']+4}, 50, Phaser.Easing.Default, true, 0, 0, true);
            }, this);
        }

        public static removeButtonTweens(targetButton: Phaser.Sprite): void {
            targetButton.events.onInputOver.removeAll(this);
            targetButton.events.onInputOut.removeAll(this);
            targetButton.events.onInputDown.removeAll(this);
            targetButton.events.onInputUp.removeAll(this);
        }

        public static addButtonGroupTweens(targetButton: Phaser.Group, startScaleX: number = 1, startScaleY: number = 1): void {
            targetButton.onChildInputOver.add(() => {
                game.add.tween(targetButton.scale).to({x: 1.1 * startScaleX, y: 1.1 * startScaleY}, 250).start();
                // SoundController.instance.play_MouseOverSound();
            }, this);
            targetButton.onChildInputOut.add(() => {
                game.add.tween(targetButton.scale).to({
                    x: startScaleX,
                    y: startScaleY
                }, 500, Phaser.Easing.Elastic.Out).start();
            }, this);
        }

        public static removeButtonGroupTweens(targetButton: Phaser.Group): void {
            targetButton.onChildInputOver.removeAll(this);
            targetButton.onChildInputOut.removeAll(this);
        }

        public static setAllChildrenInputEnabled(group: Phaser.Group, enabled: boolean): void {
            for (let ch of group.children) ch['inputEnabled'] = enabled;
        }

        public static detectBestRenderMode(): number {
            let isIE: boolean = window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0;
            let isMozilla: boolean = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

            let bestRenderMode: number = isIE || isMozilla ? Phaser.CANVAS : Phaser.AUTO;

            return bestRenderMode;
        }

        public static createTextField(x: number, y: number, textContent: string, size: number, color: string, font:string, lineSpacing:number = 0,
                                      stroke:string = null, strokeThickness:number = NaN, glow:{color:string, blur:number} = null
            ): Phaser.Text {
            let tf: Phaser.Text = new Phaser.Text(game, x, y, textContent, {
                font: "" + size + "px " + font,
                boundsAlignH: "center",
                boundsAlignV: "middle",
                align: 'center'
            });
            tf.addColor(color, 0);
            tf.anchor.set(0.5, 0.5);
            tf.lineSpacing = lineSpacing;
            if (glow) tf.setShadow(0, 0, glow.color, glow.blur);

            if (stroke && !isNaN(strokeThickness)) {
                tf.stroke = stroke;
                tf.strokeThickness = strokeThickness;
            }

            return tf;
        }

        public static createTextBtn(x: number, y: number, textContent: string, size: number, color: string, font:string, lineSpacing:number,
                                    stroke:string, strokeThickness:number, glow:{color:string, blur:number}):Phaser.Text {
            let tf:Phaser.Text = CommonUtils.createTextField(x, y, textContent, size, color, font, lineSpacing, stroke, strokeThickness, glow);
            CommonUtils.addButtonTweens(tf, 1, tf.scale.y, true, true);
            return tf;
        }
    }
}
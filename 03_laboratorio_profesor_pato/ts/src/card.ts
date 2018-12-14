module src {
	export class Card {

        private id:number;
        private scene:Phaser.Scene;
        public width:number = 260;
        public height:number = 380;
        public instance;
        public shadow;
        private idStr:string = "0";
        public opened:boolean = false;

        constructor(id:number, scene:Phaser.Scene, isInteractive:boolean = true) {
            this.scene = scene;
            this.id = id;

            this.id < 10 ? this.idStr+=String(this.id) : this.idStr = String(this.id);

            this.shadow = this.scene.add.sprite(0, 0, 'cards', 'Card0019.png')
            this.shadow.tint = 0x000000;
            this.shadow.alpha = 0.2;

            this.instance = this.scene.add.sprite(0, 0, 'cards', 'Card0019.png');
            if (isInteractive) this.instance.setInteractive();

			this.instance.on('pointerout', function (pointer) {
                    if (!this.opened && !this.scene.blocked) this.instance.setFrame('Card0019.png');
				}.bind(this)
			);
			this.instance.on('pointerup', function (pointer) {
                    if (this.opened || this.scene.blocked) return;
                    this.scene.currentCard = this;
                    this.opened = true;
                    this.instance.setFrame('Card00' + this.idStr +'.png');
				}.bind(this)
			);
			this.instance.on('pointermove', function (pointer) {
                    if (!this.opened && !this.scene.blocked) this.instance.setFrame('Card0020.png');
				}.bind(this)
            );
        }

        public setBack(val:boolean = true)
        {
            this.opened = !val;
            if (val) this.instance.setFrame('Card0019.png');
            else this.instance.setFrame('Card00' + this.idStr +'.png');
        }

        public setVisible(val:boolean = true)
        {
            this.instance.visible = val;
            this.shadow.visible = val;
        }

        public setScale(val)
        {
            this.instance.scaleX=this.instance.scaleY=val;
            this.shadow.scaleX=this.shadow.scaleY=val;
        }
        
        public setX(val)
        {
            this.instance.x = val;
            this.shadow.x = val+3;
        }

        public setY(val)
        {
            this.instance.y = val;
            this.shadow.y = val+3;
        }

        public getId():number
        {
            return this.id;
        }
        
    }
}
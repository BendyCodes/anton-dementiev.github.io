module src {
	export class GameOverScreen extends Phaser.Scene {

        public btnReplay;
        
        private levelText;
        private pointsHeader;
        private pointsText;
        private recordHeader;
        private recordText;

        private points:number = 0;
        private level:number = 0;
        private record:number = 0;
        private tickets:number = 0;
        private time_:number = 0;

        private elapsedTime:number = 0;


        private probb;

		create(val): void {
            this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');
            
            var rect = new Phaser.Geom.Rectangle(0, 0, 809, 566);
            var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
            graphics.fillRectShape(rect);
            
            this.add.sprite(280, 250, 'table').setScale(0.8,0.8);

            var probX = 570;
            var probY = 170;
            

            this.add.sprite(probX, probY, "art", 'probeta.png').setOrigin(0.0, 0.0).setScale(2,2);

            //var probeta_anim = this.anims.create({ key: 'Probeta', frames: this.anims.generateFrameNames('Probeta'), repeat: -1 });
            //probb = this.add.sprite(probX+10, probY-20, 'Probeta').play('Probeta').setOrigin(0.0, 0.0).setScale(2,2);
            //probeta_anim.pause();

			this.probb = this.add.sprite(probX+10, probY-20, 'Probeta').setOrigin(0.0, 0.0).setScale(2,2);
            
            this.add.sprite(probX+(36*2), probY, "art", 'shine.png').setOrigin(0.0, 0.0).setScale(2,2);

            var tst = 120;
            var tdiff = 60;

            this.levelText = this.add.text(280, tst, '', {
				fill: 'white',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 40,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);
            
            this.pointsHeader = this.add.text(280, tst+tdiff*1, '', {
				fill: '#79c2ca',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 40,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);

            this.pointsText = this.add.text(280, tst+tdiff*2, '', {
				fill: 'white',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 40,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);

            this.recordHeader = this.add.text(280, tst+tdiff*3, '', {
				fill: '#79c2ca',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 40,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);

            this.recordText = this.add.text(280, tst+tdiff*4, '', {
				fill: 'white',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 40,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);

            
			this.btnReplay = this.add.sprite(750, 500, 'btnPlay').setInteractive();
			this.btnReplay.on('pointerdown', function (pointer) {
					this.btnReplay.setFrame('ButtonPlay0003.png');
				}.bind(this)
			);
			this.btnReplay.on('pointerout', function (pointer) {
					this.btnReplay.setFrame('ButtonPlay0001.png');
				}.bind(this)
			);
			this.btnReplay.on('pointerup', function (pointer) {
                    this.btnReplay.setFrame('ButtonPlay0001.png');
                    this.sound.add('FX_Button_Click').play();

                    //AudioManager.stopAll();
                    this.scene.start('Gameplay', {tutor:false});
				}.bind(this)
			);
			this.btnReplay.on('pointermove', function (pointer) {
					this.btnReplay.setFrame('ButtonPlay0002.png');
				}.bind(this)
            );
            
            this.time_ = 0;
            this.elapsedTime = 0;
            this.init_screen(val.points, val.level);
        }

        init_screen(points:number,level:number)
        {
            this.points=points;
            this.level=Math.min(4,level-1);
            this.record = Main.record;

            if (points > Main.record) Main.record = points;

            if (points<100)
            {
                this.tickets=Math.floor(points/10);
            }
            else if (points<400)
            {
                this.tickets=10+Math.floor((points-300)/20);
            }
            else
            {
                this.tickets=25+Math.floor((points-400)/40);
            }
            this.tickets++;
            
            this.pointsHeader.text = Main.getText("Pizarra_Points");
            this.pointsText.text = "0123456789";
            this.pointsText.visible=false;
            this.recordHeader.text = Main.getText("Pizarra_Record");
            var r:string=String(this.record);
            while (r.length<4)
            {
                r="0"+r;
            }
            this.recordText.text = r;
            
            this.btnReplay.visible=false;

            this.sound.add('FX_Recount').play();
        }

        public update():void
        {
            this.elapsedTime++;

            var limit1:number=Math.max(Math.min(4000,this.points*10),1000);
            var limit2:number=limit1+(this.level<4?250:2000);

            if (this.time_<limit1)
            {
                this.time_=Math.min(this.time_+this.elapsedTime,limit1);
                var pointsPercentage:number=Math.floor(this.points*(this.time_/limit1));
                var levelPercentage:number=Math.floor(Math.min(100,this.points/4)*(this.time_/limit1));
                var p:string=String(pointsPercentage);
                while (p.length<4)
                {
                    p="0"+p;
                }

                this.levelText.text = Main.getText("Pizarra_Level"+String(this.level+1));

                this.pointsText.text = p;
                this.pointsText.visible=true;
                if (pointsPercentage>this.record)
                {
                    this.recordText.text = p;
                }

                if (levelPercentage > 99) this.probb.setFrame('Probeta0'+levelPercentage);
                else if (levelPercentage > 9) this.probb.setFrame('Probeta00'+levelPercentage);
                else if (levelPercentage >= 0) this.probb.setFrame('Probeta000'+levelPercentage);
            
                if (levelPercentage==100)
                {
                    this.sound.add('FX_Bubbles').play();
                }
            }
            else if (this.time_<limit2)
            {
                //AudioManager.stop("FX_Recount");
                this.time_=Math.min(this.time_+this.elapsedTime,limit2);
                if (this.time_==limit2)
                {
                    //AudioManager.stopAll();
                }
            }
            else {
                this.btnReplay.visible=true;
            }
        }
	}
	
}
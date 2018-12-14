
module src {
	export class Gameplay extends Phaser.Scene {
		public stage:Phaser.Scene;

		private points:number = 0;
		private retries:number = 0;
		private level:number = 0;
		private levelTime:number = 0;
		private levelPairs:number = 0;
		private levelPointsOk:number = 0;
		private levelPointsFail:number = 0;
		private last:Card;
		private fail1:Card;
		private fail2:Card;
		private failTime:number = 0;
		private endSuccess:boolean = false;
		private elapsedTime:number = 0;
		public currentCard:Card;
		private allCards = new Array();
		public blocked:boolean = false;
		private cards_cont;

		private LP_retries;
		private LP_text;
		private RP_points;
		private RP_text;
		private CP_time;

		private help_screen;
		private help_header;
		private help_text1;
		private help_text2;
		private help_text3;
		private help_close;

		private endPopup;
		private info_header;
		private endPopup_close;
		
		create(val): void {
			this.stage = this;

			this.input.setDefaultCursor('url(./assets/cursor.cur), pointer');

			var cont = this.add.container(0,0);
			
			var left_panel = this.add.sprite(150, 80, "art", 'leftPanel.png');
			var right_panel = this.add.sprite(660, 80, "art", 'rightPanel.png');
			var clock_img = this.add.sprite(410, 80, "art", 'clockBack.png');

			this.LP_retries = this.add.text(90, 81, '0', {
				fill: 'black',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 30,
				align: "center"
			});
			this.LP_retries.setOrigin(0.5, 0.5);

			this.LP_text = this.add.text(180, 99, Main.getText("Intentos"), {
				fill: 'white',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 18,
				align: "center"
			});
			this.LP_text.setOrigin(0.5, 0.5);


			this.CP_time = this.add.text(410, 81, '0', {
				fill: 'black',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 30,
				align: "center"
			});
			this.CP_time.setOrigin(0.5, 0.5);
			

			this.RP_points = this.add.text(715, 81, '0', {
				fill: 'black',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 30,
				align: "center"
			});
			this.RP_points.setOrigin(0.5, 0.5);

			this.RP_text = this.add.text(615, 99, Main.getText("Puntos"), {
				fill: 'white',
				fontFamily: Main.getFont("Puntos"),
				fontSize: 18,
				align: "center"
			});
			this.RP_text.setOrigin(0.5, 0.5);



			var clock_anim = this.anims.create({ key: 'clock', frames: this.anims.generateFrameNames('clock'), repeat: -1 });
			this.add.sprite(410, 80, 'clock').play('clock');
			
			cont.add([left_panel, right_panel, clock_img]);

			this.cards_cont = this.add.container(0,0);

			this.help_screen = this.add.container(0,0);

			this.help_header = this.add.text(809/2, 160, Main.getText("HelpHeader"), {
				fill: '#1189cc',
				fontFamily: Main.getFont("HelpHeader"),
				fontSize: 20,
				align: "center"
			});
			this.help_header.setOrigin(0.5, 0.5);

			this.help_text1 = this.add.text(228+80, 192+30+15, Main.getText("HelpText1"), {
				fill: '#1189cc',
				fontFamily: Main.getFont("HelpText1"),
				fontSize: 17,
				align: "center",
				wordWrap: { width: 160, useAdvancedWrap: true }
			}).setOrigin(0.5, 0.5);

			this.help_text2 = this.add.text(481+80, 220+30+25, Main.getText("HelpText2"), {
				fill: '#1189cc',
				fontFamily: Main.getFont("HelpText2"),
				fontSize: 17,
				align: "center",
				wordWrap: { width: 160, useAdvancedWrap: true }
			}).setOrigin(0.5, 0.5);

			this.help_text3 = this.add.text(228+80, 270+30+15, Main.getText("HelpText3"), {
				fill: '#1189cc',
				fontFamily: Main.getFont("HelpText3"),
				fontSize: 17,
				align: "center",
				wordWrap: { width: 160, useAdvancedWrap: true }
			}).setOrigin(0.5, 0.5);




			
			this.help_close = this.add.sprite(404, 390, 'btnYes').setInteractive();
			this.help_close.on('pointerdown', function (pointer) {
					this.help_close.setFrame('ButtonYes0003.png');
				}.bind(this)
			);
			this.help_close.on('pointerout', function (pointer) {
					this.help_close.setFrame('ButtonYes0001.png');
				}.bind(this)
			);
			this.help_close.on('pointerup', function (pointer) {
					this.help_close.setFrame('ButtonYes0001.png');
					
					this.sound.add('FX_Button_Click').play();

					this.init_area(1);

					this.help_screen.visible = false;
					this.blocked = false;
				}.bind(this)
			);
			this.help_close.on('pointermove', function (pointer) {
					this.help_close.setFrame('ButtonYes0002.png');
				}.bind(this)
			);
			this.help_screen.add([this.add.sprite(0, 0, 'tips_main').setOrigin(0.0, 0.0), this.add.sprite(330, 270, "art", 'tips.png'), this.help_header, this.help_text1, this.help_text2, this.help_text3, this.help_close]);

			

			this.endPopup = this.add.container(0,0);
			this.info_header = this.add.text(809/2, 230, '190890890', {
				fill: '#ffffff',
				fontFamily: Main.getFont("End_Fail"),
				fontSize: 30,
				align: "center",
				wordWrap: { width: 430, useAdvancedWrap: true }
			}).setOrigin(0.5, 0.5);

			this.endPopup_close = this.add.sprite(404, 400, 'btnYes').setInteractive();
			this.endPopup_close.on('pointerdown', function (pointer) {
					this.endPopup_close.setFrame('ButtonYes0003.png');
				}.bind(this)
			);
			this.endPopup_close.on('pointerout', function (pointer) {
					this.endPopup_close.setFrame('ButtonYes0001.png');
				}.bind(this)
			);
			this.endPopup_close.on('pointerup', function (pointer) {
					this.endPopup_close.setFrame('ButtonYes0001.png');

					this.sound.add('FX_Button_Click').play();
					
					//AudioManager.stopAll();
					if (this.endSuccess) this.init_area(this.level+1);
					else Main.instance.scene.start('GameOver', {points:this.points, level:this.level});

					this.endPopup.visible = false;
					//this.blocked = false;
				}.bind(this)
			);
			this.endPopup_close.on('pointermove', function (pointer) {
					this.endPopup_close.setFrame('ButtonYes0002.png');
				}.bind(this)
			);
			
			this.endPopup.add([this.add.sprite(0, 0, 'info_main').setOrigin(0.0, 0.0), this.endPopup_close, this.info_header]);
			
			if (val.tutor) {
				this.blocked = true;
			}
			else {
				this.help_screen.visible = false;
				this.blocked = false;
				this.level = 0;
				this.init_area(this.level+1);
			}

			this.endPopup.visible = false;
		}
		
		private init_area(level:number):void
		{
			this.level=level;
			
			//console.log("start level", level);
			
			if (level==1)
			{
				this.points=0;
				this.retries=0;
			}
			this.last=null;
			this.resetFail();
			this.endSuccess=false;
			
			var rows:number=0;
			var cols:number=0;
			if (level==1)
			{
				rows=2;
				cols=4;
				this.levelTime=30;
				this.levelPointsOk=10;
				this.levelPointsFail=-3;
			}
			else if (level==2)
			{
				rows=2;
				cols=5;
				this.levelTime=40;
				this.levelPointsOk=10;
				this.levelPointsFail=-2;
			}
			else if (level==3)
			{
				rows=2;
				cols=7;
				this.levelTime=50;
				this.levelPointsOk=10;
				this.levelPointsFail=-1;
			}
			else if (level==4)
			{
				rows=3;
				cols=6;
				this.levelTime=65;
				this.levelPointsOk=15;
				this.levelPointsFail=-1;
			}
			else
			{
				rows=3;
				cols=6;
				this.levelTime=55-(10*(level-5));
				this.levelPointsOk=20;
				this.levelPointsFail=(level==5?-1:0);
			}
			this.levelPairs=(rows*cols)/2;

			var free:any[]=new Array();
			var i:number;
			for (i=0;i<18;i++)
			{
				free.push(i+1);
			}

			this.clearArea();

			var cards = new Array();
			for (i=0;i<this.levelPairs;i++)
			{
				var id:number=free.splice(Math.floor(Math.random()*free.length),1)[0];
				cards.push(new Card(id, this));
				cards.push(new Card(id, this));
			}
			
			var padding:number=0;
			var maxWidth:number=(810-(padding*(cols-1)))/cols;
			var maxHeight:number=(415-(padding*(rows-1)))/rows;
			var scale:number=Math.min(maxWidth/260,maxHeight/380)* 0.9;

			var xxx = 0;
			var yyy = 0;
			if (level==1) {
				xxx = 220;
				yyy = 250;
			}
			else if (level==2) {
				xxx = 155;
				yyy = 250;
			}
			else if (level==3) {
				xxx = 100;
				yyy = 270;
			}
			else if (level>=4) {
				xxx = 200;
				yyy = 220;
			}

			for (var y:number=0;y<rows;y++)
			{
				for (var x:number=0;x<cols;x++)
				{
					var card:Card=cards.splice(Math.floor(Math.random()*cards.length),1)[0];
					card.setScale(scale);
					card.setX(Math.floor((x*card.width*scale)+(x*padding)) + xxx);
					card.setY(Math.floor((y*card.height*scale)+(y*padding)) + yyy);
					this.cards_cont.add(card.shadow, card.instance);
					this.allCards.push(card);
				}
			}
			
			this.LP_retries.text = String(this.retries);
			this.RP_points.text = String(this.points);
			this.CP_time.text = String(this.levelTime);
		}

		public update():void
		{
			this.elapsedTime++;

			if (this.elapsedTime > 60) this.elapsedTime = 0;

			if (!this.blocked)
			{
				this.levelTime=Math.max(this.levelTime-Math.floor(this.elapsedTime/60),0);

				this.LP_retries.text = String(this.retries);
				this.RP_points.text = String(this.points);
				this.CP_time.text = String(this.levelTime);
				
				if (this.failTime>0)
				{
					this.failTime--;

					if (this.failTime<=0)
					{
						this.elapsedTime = 0;
						this.resetFail();
					}
				}
			
				if (this.levelTime<=0)
				{
					//AudioManager.stopAll();
					
					this.sound.add('FX_GameOver').play();
					this.endSuccess=false;

					this.clearArea();

					this.info_header.text = Main.getText("End_Fail");
					this.endPopup.visible=true;
					this.blocked = true;
				}
				else if (this.levelTime<4000*2)
				{
					//this.sound.add('FX_Time').play();
				}

				this.cardsUpdate();
			}
		}

		private cardsUpdate():void
		{
			if (this.currentCard && this.currentCard.opened)
			{
				if (this.last!=null)
				{
					this.retries++;
					if (this.currentCard.getId()==this.last.getId())
					{
						this.points+=this.levelPointsOk;
						
						this.sound.add('FX_Ok').play();
						this.levelPairs--;
						if (this.levelPairs==0)
						{
							this.sound.add('FX_Completed').play();
							this.endSuccess=true;

							this.info_header.text = Main.getText("End_OK");
							this.endPopup.visible=true;

							this.clearArea();
						}
					}
					else
					{
						this.points=Math.max(0,this.points+this.levelPointsFail);
						
						this.sound.add('FX_Fail').play();
						this.fail1=this.last;
						this.fail2=this.currentCard;
						this.failTime=60/2;
					}
					this.last=null;
				}
				else
				{
					this.resetFail();
					this.last=this.currentCard;
				}
			}

			this.currentCard = null;
		}

		private clearArea()
		{
			while (this.allCards.length > 0)
			{
				this.allCards[this.allCards.length-1].instance.destroy();
				this.allCards[this.allCards.length-1].shadow.destroy();
				this.allCards.pop();
			}
		}

		private resetFail():void
		{
			if (this.fail1!=null)
			{
				this.fail1.setBack();
				this.fail1=null;
			}
			if (this.fail2!=null)
			{
				this.fail2.setBack();
				this.fail2=null;
			}
			this.failTime=0;
		}
	}
}
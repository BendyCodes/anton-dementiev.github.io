///<reference path="../phaser.d.ts" />

declare var WebFont:any;
declare var locData:any;

module src {
    export class Main extends Phaser.Game {
        public static instance;
        public static record:number = 0;

        constructor() {

            const config = {
                width: 809,
                height: 566,
                type: Phaser.AUTO,
                backgroundColor: 0xffffff
            };

            super(config);

            Main.instance = this;
            Main.resize();

            var WebFontConfig = {
                google: {
                    families: ["Lato"]
                },
                active: function() {
                    Main.instance.scene.add('Boot', Boot, false);
                    Main.instance.scene.add('Preload', PreloadScene, false);
                    Main.instance.scene.add('Title', TitleScreen, false);
                    Main.instance.scene.add('Gameplay', Gameplay, false);
                    Main.instance.scene.add('GameOver', GameOverScreen, false);

                    Main.instance.scene.start('Boot');
                }
            };
            WebFont.load(WebFontConfig);
        }

        public static resize()
        {
            var w = window.innerWidth;
            var h = window.innerHeight;
            var scale = Math.min(w / 809, h / 566);
        
            Main.instance.canvas.setAttribute('style',
                ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
                ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
                ' transform-origin: top left;'
            );
            
            var width = w / scale;
            var height = h / scale;
        
            Main.instance.canvas.style.left = (width*scale-809*scale) / 2+'px';
            Main.instance.canvas.style.top = (height*scale - 566*scale) / 2+'px';
            Main.instance.canvas.style.position = "absolute";
        }

        public static getFont(val):string
        {
            if (locData[val]["font"]) return locData[val]["font"];
            return "";
        }

        public static getText(val):string
        {
            if (locData[val][locData["lang"]]) return locData[val][locData["lang"]];
            return "";
        }
    }

    window.addEventListener('resize', () => {
        Main.resize();
      }, false);

    window.onload = () => {
        new Main();
    };
}
module src {
    export class GameArea extends Phaser.Group {

        public static instance:GameArea = null;

        public grid: Grid;
        public globalContainer:Phaser.Group;

        level:number;

        constructor(level:number) {
            super(game, null);
            this.level = level;
        }

        public showThis():number {
            let d:number = 350;

            game.add.tween(this.grid).to({y:this.grid['centralizedY']},d).start();


            return d;
        }
        public hideThis():number {
            let d:number = 350;

            game.add.tween(this.grid).to({y:'-'+game.height},d).start();


            return d;
        }


        public createThis():void {

            GameArea.instance = this;

            this.add(new Phaser.Image(game, 0, 0, 'ingamebg'));

            this.globalContainer = new Phaser.Group(game, null);
            this.add(this.globalContainer);

            let line:string[] = Constants.LEVELS_DATA[this.level]['line'];
            let gridData:number[][] = [];
            for (let l of line) {
                let spl = l.split('\t');
                spl = spl.filter(function(a){return a !== ''});
                let arrNum:number[] = [];
                for (let s of spl) {
                    arrNum.push(parseInt(s));
                }
                gridData.push(arrNum);

            }
            let _gridData:number[][] = [];
            for (let i:number = 0; i < gridData.length; i++) {
                for (let j:number = 0; j < gridData[i].length; j++) {
                    if (_gridData.length <= j) _gridData.push([]);
                    _gridData[j].push(gridData[i][j]);
                }
            }

            this.grid = new Grid(_gridData, 0, 0, 66, Constants.LEVELS_DATA[this.level]["-objects"], this);
            this.grid.x = -10;
            this.grid.y = -12;
            let dur:number = this.grid.buildCandies(false);
            this.globalContainer.add(this.grid);

            CommonUtils.centralize(this.grid);
            this.grid['centralizedY'] = this.grid.y;

            this.grid.setCandiesInputEnabled(false);

            CommonUtils.createTimer(dur, ()=> {this.grid.setCandiesInputEnabled(true);}, this);

            this.grid.y -= game.height;
        }

    }
}

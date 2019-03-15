M3.TutorialOne = function(soul, gameplay) {
    this.soul = soul;
    this.gameplay = gameplay;
    GodStep.Frame.call(this, 'TutorialOne', soul.W, soul.H);
   // GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addChild(this.container = new PIXI.DisplayObjectContainer());
    this.addChild(this.container2 = new PIXI.DisplayObjectContainer());

    this.container.addChild(this.back = new M3.Background(this, 'back_menu')); this.back.alpha = .5;

    this.animTimer = 0;
    this.animCursor = 0;
    this.animCount = 0;
    this.animLine = [];
    this.container2.addChild(this.pers = new M3.Img('tutorial_sheriff', S, this.W *.29, this.H *.33,.5));
    this.container2.addChild(this.frame = new M3.Img('frame_tutorial', S *1.38, this.W *.7, this.H *.25,.5));
    this.container2.addChild(this.targetLabel = new M3.Text('TEXT TEXT TEXT\nTEXT TEXT\nTEXT!!!', 85 * S, this.W *.52, this.H *.15, 'left', 0xffffff));

    this.addChild(this.arm = new M3.MovieClip(['arm_1', 'arm_2'], S, this.W *.5, this.H *.5));
    this.addChild(this.maska = this.createGraphics('maska'));


    var field = gameplay.field;
    this.maska.clear();
    this.maska.beginFill(0, 1);
    var v = 0.03;
    this.maska.drawRect(0, -this.soul.H *v, this.soul.W, this.soul.H *.555 + this.soul.H *v);
    this.maska.endFill();
    this.visible = false;



    this.texts = ['Howdy!\nSwipe to wake up the\nwizzies and make magic',
                    'You rock!\nMake longer chains to\nfill the meter faster',
                 'Try a combo\nof 7+ wizzies!',
        'Use charged wizzie\nto ignite the last row\nor column you touch',
        'To remove sticky goo,\nconnect wizzies over it!',
        'Collect jade crystals\nby letting them fall\nto the bottom!',
        'Swipe next to bamboo\nstems blocking your\nway to weed them out!'
    ];

};
extend(M3.TutorialOne, GodStep.Frame);

pro.setText = function(v) {
    this.targetLabel.setText(this.texts[v]);
    this.targetLabel.updateText();
    this.targetLabel.x = this.W * .7 - this.targetLabel.width/2;
    this.targetLabel.y = this.W * .24 - this.targetLabel.height/2;
};
pro.update = function() {
    if(this.visible) {
        this.alpha += (1 - this.alpha) * .05;
        var field = this.field;
        var line = this.animLine;
        var arm = this.arm;
        var fs = field.scale.x;
        var cellW2 = field.cells[0].W/2;
        if( this.animTimer++ > 40) {
            this.animTimer = 0;
            this.animCursor++;
            if(this.animCursor > this.animCount) {
                this.animCursor = 0;
            }
        }
        switch (this.animCursor) {
            case 0:
                this.lineCursor = 1;
                arm.setToFrame(0);
                //arm.x = field.x + this.soul.W - field.x * 2 * field.scale.x;
              // arm.y = field.y + field.H * field.scale.x;
                break;
            case 1:
                arm.x += (field.x + line[0].x * fs + cellW2 - arm.x) * .1;
                arm.y += (field.y + line[0].y * fs + cellW2 - arm.y) * .1;
                break;
            case 2:
                if(this.animTimer > 20) {
                    arm.setToFrame(1);
                }
                break;
            case 3:
                arm.x += (field.x + line[this.lineCursor].x * fs + cellW2 - arm.x) * .1;
                arm.y += (field.y + line[this.lineCursor].y * fs + cellW2 - arm.y) * .1;
                if(this.animTimer == 40) {
                    this.lineCursor++;
                    if(this.lineCursor < line.length) {
                        this.animTimer = 0;
                    } else {
                        this.animTimer = 50;
                    }
                }
                break;
            case 4:
                if(this.animTimer > 20) {
                    arm.setToFrame(0);
                }
                break;
        }

    }
};
pro.finish= function() {
    this.nextBlock();
};
pro.isComplete = function(selected) {
    var count = 0;
       for(var i = 0; i<selected.length; i++) {
           for(var j = 0; j<this.animLine.length; j++) {
               if(selected[i] == this.animLine[j]) {
                   count++;
               }
           }
       }

    if(count >= this.animLine.length) {
        return true;
    } else {
        return false;
    }

};
pro.nextBlock = function() {
    this.currentBlock++;
    var cell, i;
    this.alpha = 0;
    if(this.currentBlock <= this.blocks) {
        this.Scale = this.Scale;

        switch(M3.LAST_LEVEL_SELECTED) {
            case 1:
                this.animLine = this.animLine2;
                for(i = 0; i<this.animLine.length; i++) {
                    cell = this.animLine[i];
                    if(cell.delta) {
                        cell.delta = null;
                        this.animLine[i] = this.field.cellsXY[cell.yi + 1][cell.xi];
                    }
                }
                this.animTimer = 0;
                this.animCursor = 0;
                this.animCount = 5;
                this.setText(1);
                break;
            case 4:
                this.animLine = this.animLine2;
                for(i = 0; i<this.animLine.length; i++) {
                    cell = this.animLine[i];
                    if(cell.delta) {
                        cell.delta = null;
                        this.animLine[i] = this.field.cellsXY[cell.yi + 1][cell.xi];
                    }
                }
                this.animTimer = 0;
                this.animCursor = 0;
                this.animCount = 5;
                this.setText(3);

                break;
            case 6:
                this.setText(4);

                this.animLine = this.animLine2;
                for(i = 0; i<this.animLine.length; i++) {
                    cell = this.animLine[i];
                    if(cell.delta) {
                        cell.delta = null;
                        this.animLine[i] = this.field.cellsXY[cell.yi + 1][cell.xi];
                    }
                }
                this.animTimer = 0;
                this.animCursor = 0;
                this.animCount = 5;
                break;
        }
    } else {
        this.visible = false;
    }
};
pro.init = function(level) {
    if(M3.TUTORIAL == false) return;
    this.visible = true;
    this.lineCursor = 0;
    this.alpha = 0;

    var field = this.field = this.gameplay.field;
    var dy = (this.soul.OH - this.soul.H)/2;

    this.container.mask = this.maska;
    this.animLine = [];
    var levelData = M3.LAST_LEVEL_DATA;
    var params = levelData[levelData.length - 1];
    var colors = params.colors;
    this.maska.y = this.container2.y = (-dy) / this.s;
    var deleteColor, deleteColor2, i;
    this.bonus = null;
    switch (level) {
        case 1:
            this.setText(0);

            this.currentBlock = 1;
            this.blocks = 2;
            this.animCount = 5;
            this.animTimer = 0;
            this.animCursor = 0;
            deleteColor = parseInt(Math.random() * colors.length);
            field.randomizeArea(colors, 0, 5, 7, 3, deleteColor);
            this.animLine = field.randomizeArea([deleteColor], 2, 6, 3, 1, null);

            for(i = 0; i<colors.length; i++) {
                if(colors[i] != deleteColor) {
                    deleteColor2 = colors[i];
                    break;
                }
            }
            field.randomizeArea(colors, 0, 0, 7, 5, deleteColor2);
            this.animLine2 = field.randomizeArea([deleteColor2], 2, 2, 2, 1, null);
            this.animLine2[0].delta = [0, 1];
            this.animLine2[1].delta = [0, 1];
            field.cellsXY[0][1].replaceColored(M3.Cell.STANDART[deleteColor2]);
            field.cellsXY[0][5].replaceColored(M3.Cell.STANDART[deleteColor2]);
            field.cellsXY[2][1].replaceColored(M3.Cell.STANDART[deleteColor2]);
            field.cellsXY[1][3].replaceColored(M3.Cell.STANDART[deleteColor2]);
            field.cellsXY[1][4].replaceColored(M3.Cell.STANDART[deleteColor2]);
            this.animLine2.splice(0, 0, field.cellsXY[2][1]);
            this.animLine2.push(field.cellsXY[1][3]);
            this.animLine2[3].delta = [0, 1];
            this.animLine2.push(field.cellsXY[1][4]);
            this.animLine2[4].delta = [0, 1];
            break;
        case 4:
            this.currentBlock = 1;
            this.blocks = 2;
            this.animCount = 5;
            this.animTimer = 0;
            this.animCursor = 0;
            deleteColor = parseInt(Math.random() * colors.length);
            for(i = 0; i<colors.length; i++) {
                if(colors[i] != deleteColor) {
                    deleteColor2 = colors[i];
                    break;
                }
            }
            field.randomizeArea(colors, 0, 4, 7, 5, deleteColor);
            this.animLine = field.randomizeArea([deleteColor], 1, 6, 5, 1, null);
            this.animLine.splice(0, 0, field.cellsXY[5][0]);
            this.animLine.push(field.cellsXY[7][5]);
            field.cellsXY[5][0].replaceColored(M3.Cell.STANDART[deleteColor]);
            field.cellsXY[7][5].replaceColored(M3.Cell.STANDART[deleteColor]);
            field.randomizeArea(colors, 0, 0, 7, 4, deleteColor2);

            this.animLine2 = field.randomizeArea([deleteColor2], 5, 2, 2, 1, null);
           // this.animLine2[0].delta = [0, 1];
            this.animLine2.push(field.cellsXY[1][6]);
            field.cellsXY[1][6].replaceColored(M3.Cell.STANDART[deleteColor2]);
            this.bonus = field.cellsXY[1][6];
            this.setText(2);

            break;
        case 6:
            this.currentBlock = 1;
            this.blocks = 2;
            this.animCount = 5;
            this.animTimer = 0;
            this.animCursor = 0;
            deleteColor = parseInt(Math.random() * colors.length);
            for(i = 0; i<colors.length; i++) {
                if(colors[i] != deleteColor) {
                    deleteColor2 = colors[i];
                    break;
                }
            }
            field.randomizeArea(colors, 0, 4, 7, 5, deleteColor);
            this.animLine = field.randomizeArea([deleteColor], 2, 6, 3, 1, null);

            field.randomizeArea(colors, 0, 0, 7, 4, deleteColor2);

            this.animLine2 = field.randomizeArea([deleteColor2], 2, 2, 3, 1, null);
            this.animLine2[0].delta = [0, 1];
            this.animLine2[1].delta = [0, 1];
            this.animLine2[2].delta = [0, 1];
            this.setText(4);

            break;
        case 13:
            this.currentBlock = 1;
            this.blocks = 1;
            this.animCount = 5;
            this.animTimer = 0;
            this.animCursor = 0;
            deleteColor = parseInt(Math.random() * colors.length);
            field.randomizeArea(colors, 0, 4, 7, 5, deleteColor);
            this.setText(5);

            var item = field.findItem();
            var itemCell = item.cell;
            field.replaceCells(item.cell, field.cellsXY[item.cell.yi + 5][item.cell.xi]);
            this.animLine = field.randomizeArea([deleteColor], item.cell.xi, item.cell.yi + 1, 1, 3, null);
            break;

        case 21:
            this.setText(6);

            this.currentBlock = 2;
            this.Scale = this.Scale;
            this.blocks = 1;
            this.animCount = 5;
            this.animTimer = 0;
            this.animCursor = 0;
            deleteColor = parseInt(Math.random() * colors.length);
            field.randomizeArea(colors, 0, 0, 7, 4, deleteColor);
            this.animLine = field.randomizeArea([deleteColor], 2, 3, 3, 1, null);
            break;
        default :
            this.visible = false;
            break;

    }

};


Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.s;
    },
    set: function(value) {
        this.s = value;
        var dy = this.soul.OH - this.soul.H;
        this.container2.y = this.maska.y = (-dy/2) / value + (this.currentBlock == 2 ? this.soul.OH *.5 : 0) / value ;
        this.maska.scale.y = this.soul.OH/this.soul.H;
        this.container2.y -= (this.currentBlock == 2 ? this.soul.H *.05 :0)/value;
        //this.b_back.y = (this.soul.H * .11 - dy/2) / value;
       // this.pers.y = (-dy/2 + this.soul.H *.13)/value;
   //     this.levelLabel.y = (this.soul.H * .028 - dy/2)/value;
        this.back.rescale(value);
    }
});
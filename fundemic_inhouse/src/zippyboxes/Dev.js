include('lq/editor/Slider');

PS.Dev = function(soul) {
    this.soul = soul;

    GodStep.Frame.call(this, 'Dev', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);

    var S = this.startS = soul.startS;
    this.addFrame(this.b_back = new PS.TextButton('back', 35, 0x562466, soul.W *.1, soul.H *.05));
    this.addFrame(this.b_save = new PS.TextButton('save', 35, 0x562466, soul.W *.9, soul.H *.05));
    this.addChild(this.text = new GodStep.Text('Level ID: ', 60 * S, 'Arial', 'left', 0xffffff));
    this.text.y = this.H * .02;
    this.addFrame(this.field = new PS.Field(soul, 5, 5));

    this.field.x = (this.W - this.field.W) * .5;
    this.field.y = this.H - this.field.x - this.field.H;
    addEvent(this.b_save, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
    this.visible = false;
    var yy = .13;
    var s = S * 2;
    var dx = this.W * .1;
    this.addFrame(this.b_addPlayerB = new PS.ImgButton('cell_playerB', s, dx, this.H * yy));
    this.addFrame(this.b_addPlayer = new PS.ImgButton('cell_player', s, dx * 2, this.H * yy));
    this.addFrame(this.b_addPlayerR = new PS.ImgButton('cell_playerR', s, dx * 3, this.H * yy));
    this.addFrame(this.b_addArrow = new PS.ImgButton('cell_arrow', s, dx * 4, this.H *yy));
    this.addFrame(this.b_addTeleport = new PS.ImgButton('cell_teleport', s, dx * 5, this.H *yy));
    this.addFrame(this.b_addStar = new PS.ImgButton('cell_star', s, dx * 6, this.H *yy));
    this.addFrame(this.b_addRotate = new PS.ImgButton('cell_rotate', s, dx * 7, this.H *yy));
    this.addFrame(this.b_addColor = new PS.ImgButton('cell_color', s, dx * 8, this.H *yy));
    this.colors = PS.CellObject.COLORS;

    this.b_addColor.color_id = 0;  this.b_addColor.img.tint = this.colors[this.b_addColor.color_id];

    addEvent(this.b_addArrow, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addPlayerR, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addPlayerB, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addPlayer, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addTeleport, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addStar, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addRotate, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.b_addColor, GodStep.FRAME_DOWN, this.h_instrument);
    addEvent(this.field, Games.CELL_CLICK, this.h_cells);


    this.editLevel = 0;
    this.instrument = '';
};
extend(PS.Dev, GodStep.Frame);

pro.update = function() {

};
pro.init = function() {
    this.visible = true;
    var data = GodStep.LoadLocal(this.soul.SETTINGS_SLOT);
    this.clearSelectionInstruments();
    this.instrument = '';
    this.text.setText('Level ' + PS.LAST_LEVEL_SELECTED);
    this.text.updateText();
    this.text.x = (this.W - this.text.width)/2;
    this.field.setData(data.levels[PS.LAST_LEVEL_SELECTED-1]);
};
pro.clearSelectionInstruments = function() {
    this.b_addStar.alpha =
    this.b_addTeleport.alpha =
    this.b_addPlayer.alpha =
    this.b_addRotate.alpha =
    this.b_addPlayerR.alpha =
    this.b_addPlayerB.alpha =
    this.b_addArrow.alpha = .5;
    this.instrument = '';

};
pro.h_cells = function(e) {
    var t = e.target;
    var p = t.parent;
    var cell = e.content.data;
    var object;
    switch (e.type) {
        case Games.CELL_CLICK:
            switch (p.instrument) {
                case 'reaktive':
                    p.field.addCellObject(new PS.CellObject('playerR', p.startS, p.b_addColor.color_id, cell));
                    break;
                case 'block':
                    p.field.addCellObject(new PS.CellObject('playerB', p.startS, p.b_addColor.color_id, cell));
                    break;
                case 'player':
                    p.field.addCellObject(new PS.CellObject('player', p.startS, p.b_addColor.color_id, cell));
                    break;
                case 'teleport':
                    p.field.addCellObject(new PS.CellObject('teleport', p.startS, -1, cell));
                    break;
                case 'arrow':
                    p.field.addCellObject(new PS.CellObject('arrow', p.startS, -1, cell));
                    break;
                case 'star':
                    p.field.addCellObject(new PS.CellObject('star', p.startS, p.b_addColor.color_id, cell));
                    break;
                case 'rotate':
                    p.field.rotateCellObject(cell);
                    break;
                case '':
                    p.field.delCellObject(cell);
                    break;
            }
            break;
    }
};
pro.h_instrument = function(e) {
    var t = e.target;
    var p = t.parent;
    switch (t) {
        case p.b_addPlayerB:
            if(p.b_addPlayerB.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'block';
                p.b_addPlayerB.alpha = 1;
            }
            break;
        case p.b_addPlayerR:
            if(p.b_addPlayerR.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'reaktive';
                p.b_addPlayerR.alpha = 1;
            }
            break;
        case p.b_addArrow:
            if(p.b_addArrow.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'arrow';
                p.b_addArrow.alpha = 1;
            }
            break;
        case p.b_addPlayer:
            if(p.b_addPlayer.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'player';
                p.b_addPlayer.alpha = 1;
            }
            break;
        case p.b_addTeleport:
            if(p.b_addTeleport.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'teleport';
                p.b_addTeleport.alpha = 1;
            }
            break;
        case p.b_addStar:
            if(p.b_addStar.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'star';
                p.b_addStar.alpha = 1;
            }
            break;
        case p.b_addColor:
            p.b_addColor.color_id++;
            if(p.b_addColor.color_id >= p.colors.length) {
                p.b_addColor.color_id = 0;
            }
            p.b_addColor.img.tint = p.colors[p.b_addColor.color_id];
            break;
        case p.b_addRotate:
            if(p.b_addRotate.alpha == 1) {
                p.clearSelectionInstruments();
            } else {
                p.clearSelectionInstruments();
                p.instrument = 'rotate';
                p.b_addRotate.alpha = 1;
            }
            break;
    }
};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
       case p.b_save:
           var data = GodStep.LoadLocal(s.SETTINGS_SLOT);
           if(!data.levels) {
               data.levels = [];
           }
           var d = p.field.getData();
          // d['levelID'] = {id:d};
           data.levels[PS.LAST_LEVEL_SELECTED - 1] = d;
           for(var i =0;i<data.levels.length; i++) {
               var lev = data.levels[i];
               var val = lev[lev.length-1];
               if(val.id) {
                   data.levels[i][lev.length-1] = {id:i + 1};
               } else {
                   data.levels[i][lev.length] = {id:i + 1};
               }
               trace(val);
           }
           GodStep.SaveLocal(data, s.SETTINGS_SLOT);
           break;
       case p.b_back:
           s.screenTo([s.levelselect], p);
           break;
   }
};
pro.h_mouse = function(e) {
    var t = e.content.target;
    if(e.content.target) {

        switch (e.type) {
            case GodStep.FRAME_UP:
                if (e.content.target.soul) {
                    t.b_addPlayer.isDown =
                        t.b_addArrow.isDown =
                            t.b_addTeleport.isDown =
                                t.b_addStar.isDown =
                                    t.b_back.isDown =
                                        t.b_addRotate.isDown =
                                            t.b_addColor.isDown =
                                                t.b_save.isDown =
                                                t.b_addPlayerR.isDown =
                                                t.b_addPlayerB.isDown = false;
                    t.b_addPlayer.Scale =
                        t.b_addArrow.Scale =
                            t.b_addTeleport.Scale =
                                t.b_addStar.Scale =
                                    t.b_back.Scale =
                                        t.b_addRotate.Scale =
                                            t.b_addColor.Scale =
                                            t.b_addPlayerR.Scale =
                                            t.b_addPlayerB.Scale =
                                                t.b_save.Scale = 1;
                }
                break;
        }
    }
};

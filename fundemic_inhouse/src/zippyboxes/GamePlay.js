PS.GamePlay = function(soul) {
    this.soul = soul;
    GodStep.Frame.call(this, 'GamePlay', soul.W, soul.H);
    GodStep.IDownUp.call(this, soul.W, soul.H);
    this.visible = false;
    this.OW = soul.OW;
    this.OH = soul.OH;

    var S = this.startS = soul.startS;
    this.overTimer = 0;

    this.isTutorial = true;
    this.addChild(this.back = new PS.Background(this, 'background_game'));
    this.addChild(this.tutorback = new PS.Background(this, 'options_background')); this.tutorback.visible = false;

    this.addChild(this.header_tutorial = new PS.Img('header_tutorial', S, this.W, this.H *.11, new PIXI.Point(1,.5)));
    this.addChild(this.header = new PS.Img('score_field', S, this.W * 1, this.H *.12, new PIXI.Point(1,.5)));
    //this.addChild(this.hMask = new PIXI.Graphics());
    //this.hMask.beginFill(0, 1).drawRect(0, 0, this.header.texture.width * S, this.header.texture.height * 1.01 * S).endFill();
    //this.header.mask = this.hMask;
    this.addChild(this.headerLabel = new PS.Text('0',170 * S, this.W *.91, this.H *.0, 'right', 0xffffff));
    var howText = PS.S('How to play'); var c = Math.min(1, 11/howText.length);
    this.addChild(this.header_tutorialLabel = new PS.Text(howText, S * 280 * c, this.W *.12, this.H *.04 + (1 - c) * this.H *.03, 'left', 0xffffff));
    this.header_tutorialLabel.x = (this.W - this.header_tutorialLabel.width)/2;
    var c = .21;
    var dd = .07;
    this.addChild(this.b_back = new PS.ImgButton('b_pause', S, this.W * (c*1 -dd), this.H *.12));
    this.addChild(this.b_restart = new PS.ImgButton('replay', S, this.W * (c*2 - dd), this.H *.12));
    this.addChild(this.b_stepBack = new PS.ImgButton('step_back', S, this.W * (c*3 - dd), this.H *.12));
    this.addChild(this.leftCont = new PIXI.DisplayObjectContainer());
    this.addChild(this.rightCont = new PIXI.DisplayObjectContainer());
    this.leftCont.addChild(new PS.Img('arrow_left', S, 0, 0,.5));
    var tapString = PS.S('Tap');
    var l = Math.max(.52, 3/tapString.length);
    this.leftCont.addChild(new PS.Text(tapString, 180 * S * l, -this.W *.08 - this.W * .03 * (1 - l), -this.H *.047 * l, 'right', 0xffffff));
    this.rightCont.addChild(new PS.Img('arrow_right', S, 0, 0,.5));
    this.rightCont.addChild(new PS.Text(tapString, 180 * S * l, -this.W *.06 - this.W * .05 * (1 - l), -this.H *.047 * l, 'right', 0xffffff));
    this.leftCont.x = this.rightCont.x = this.W * .5;
    this.leftCont.y = this.rightCont.y = this.H * .42;
    this.leftCont.phase = this.rightCont.phase = 0;
    this.addFrame(this.field = new PS.Field(soul, 5, 5)); this.field.gameplay = this;
    this.field.x = (this.W - this.field.W) * .5;
    this.field.y = this.H - this.field.x - this.field.H;

    addEvent(this.field, Games.CELL_CLICK, this.h_cells);

    addEvent(this.b_stepBack, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_back, PS.ImgButton.CLICK, this.h_buttons);
    addEvent(this.b_restart, PS.ImgButton.CLICK, this.h_buttons);


    this.addFrame(this.pause = new PS.Pause(soul));
    addEvent(this, GodStep.FRAME_UP, this.h_mouse);
};
extend(PS.GamePlay, GodStep.Frame);

PS.FRAME_RATE = 1/60;

pro.initTutor = function(ok) {
    this.b_back.visible = this.b_restart.visible = this.b_stepBack.visible = this.header.visible = this.headerLabel.visible = !ok;
    this.tutorback.visible = this.header_tutorial.visible = this.header_tutorialLabel.visible = ok;

    if(ok) {

        this.isFirstClick = false;
        PS.LAST_LEVEL_DATA = JSON.parse(PS.TUTOR_LEVEL);
        PS.LAST_LEVEL_SELECTED = 1;
    } else {
        this.isTutorial = false;
        this.rightCont.visible =  this.leftCont.visible = false;
    }

    this.field.initTutor(ok);
};
pro.update = function() {
    if(this.visible) {
        if(this.isTutorial) {
            var w = this.W * .045;
            if(this.isFirstClick) {
                this.leftCont.alpha = this.rightCont.alpha += (0 - this.leftCont.alpha) * .1;
            }
            this.leftCont.x = this.W * .23 + Math.sin(this.leftCont.phase) * w;
            this.rightCont.x = this.W * .77 + Math.sin(-this.rightCont.phase) * w;
            this.rightCont.phase = this.leftCont.phase+= 0.08;
        }

        var players = this.field.players;
        var d = this.W * .015;
        var i, player;

        for(i =0;i<players.length; i++) {
            player = players[i];
            player.x += Math.min(Math.max(-d, (player.nextPlace.x - player.x)*.5), d);
            player.y += Math.min(Math.max(-d, (player.nextPlace.y - player.y)*.5), d);
            if(player.shadow) {
                var shadow = player.shadow;
                shadow.x += Math.min(Math.max(-d, (shadow.teleport.cell.x - shadow.x)*.5), d);
                shadow.y += Math.min(Math.max(-d, (shadow.teleport.cell.y - shadow.y)*.5), d);
                if (GodStep.Point.distance(shadow.Place, shadow.teleport.cell.Place) < 1) {
                    this.field.delShadow(player);
                }
            }
        }
        if(this.lastPlayer) {
            if(GodStep.Point.distance(this.lastPlayer.Place, this.lastPlayer.nextPlace) < 10) {
                if(!this.canNextStep) {
                    this.canNextStep = true;
                }
                if(this.lastPlayer.typeName == 'playerR') {
                    if(this.isCollide) {
                        this.isCollide = false;
                        this.lastPlayer = false;
                        this.canNextStep = true;

                    } else {
                        if(this.lastPlayer.countTeleportations < 2) {
                            var result = this.clickBlock(this.lastPlayer, false);
                            if(!result) {
                                this.lastPlayer = false;
                                this.canNextStep = true;
                            }
                        } else {
                            this.lastPlayer.countTeleportations = 0;
                            this.lastPlayer = false;
                            this.canNextStep = true;
                        }
                    }
                }
            }
        }

        if(this.isFinished) {
            if(this.playSoundFinishTimer-- == 0) {
                GodStep.playSound('open', 0, PS.SOUND);
            } else {
                if(this.playSoundFinishTimer < -10) {
                    this.playSoundFinishTimer = -10;
                }
            }

            for (i = 0; i < players.length; i++) {
                players[i].animate();
            }
            if (this.overTimer++ == 170) {
                if( this.isTutorial) {
                    this.isTutorial = false;
                    this.offTutor = true;
                    this.soul.screenTo([this.soul.startmenu], this);
                } else {
                    this.soul.screenTo([this.soul.outro], this);
                    if(PS.SOFT_GAMES) {
                        if(window['SG_Hooks']) {
                            SG_Hooks.levelUp(PS.LAST_LEVEL_SELECTED, null);
                        }
                    }
                }
            }
        } else {
            for (i = 0; i < players.length; i++) {
                players[i].animate2();
            }
        }
    }


};
pro.destroy = function() {
    createjs.Sound.stop();
};
pro.init = function() {
    this.b_stepBack.alpha = .5;
    this.pause.visible = false;
    if(this.offTutor) {
        this.offTutor = false;
        this.initTutor(false);
    }

    this.headerLabel.setText(PS.LAST_LEVEL_SELECTED + '');
    this.headerLabel.x = this.W * .83 - this.headerLabel.width/2;
    this.history = [];
    this.overTimer = 0;
    this.canNextStep = true;
    this.visible = true;
    this.isFinished = false;
    this.playSoundFinishTimer = 50;
    this.isCollide = false;
    this.playerDATA = GodStep.LoadLocal(this.soul.PLAYER_SLOT);
    if(this.playerDATA) {
    } else {
        this.playerDATA = {};
        trace('default save');
    }

    if(PS.LAST_LEVEL_DATA) {
        var coef = PS.LAST_LEVEL_SELECTED/30 + .15;
        PS.CellObject.PERS = [];
        for(var i = 0; i<Math.min(11 * coef, 11); i++) {
            PS.CellObject.PERS.push('c' + (i + 1));
        }
        this.field.setData(PS.LAST_LEVEL_DATA);
        this.updatePlayers();
    }

};
pro.over = function() {
    GodStep.SaveLocal(this.playerDATA, this.soul.PLAYER_SLOT);
};

// listeners
pro.h_mouse = function(e) {
    var t = e.target;
    if(t) {
        switch (e.type) {
            case GodStep.FRAME_UP:
                t.b_stepBack.isDown = t.b_back.isDown =
                t.b_restart.isDown = false;
                t.b_back.Scale =
                t.b_stepBack.Scale = t.b_restart.Scale = 1;
                break;
        }
    }

};
pro.backHistory = function() {
    if( this.history.length >0) {
        //trace('back -------- ' +  (this.history.length - 1) );

        var players = this.field.players;
        var lastStep = this.history[this.history.length - 1];
        for(var i = players.length-1; i>=0; i--) {
            players[i].cell.delGuest(players[i]);
            players[i].cell = this.field.getCell(lastStep[i].x, lastStep[i].y);
            players[i].applyCellPostion(true);
            players[i].cell.pushGuest(players[i]);
            players[i].rotateAngle = players[i].nextRotation = lastStep[i].r;
            players[i].applyRotation();
           // trace(lastStep[i].x + " " + lastStep[i].y  + " " + players[i].cell.guests.length);
        }
        this.history.splice(this.history.length - 1, 1);
        if(this.history.length == 0) {
            this.b_stepBack.alpha = .5;
        }
    }
    this.updatePlayers();
};
pro.addHistory = function() {
    this.b_stepBack.alpha = 1;

    //trace('move - - - - - ' +  this.history.length );
    var playerPos = [];
    var players = this.field.players;
    for(var i = 0; i < players.length; i++) {
        playerPos.push({x:players[i].cell.xi, y:players[i].cell.yi, r:players[i].rotateAngle});
       // trace(playerPos[i].x + " " + playerPos[i].y + '  ' +  players[i].cell.guests.length);
    }

    this.history.push(playerPos);
};
pro.clickBlock = function(player, safeHistory) {
    if(this.pause.visible) return;
    this.isFirstClick = true;
    var field = this.field;
    var dx = (player.rotateAngle == 0) ? 1 : ((player.rotateAngle == 2) ? -1 : 0);
    var dy = (player.rotateAngle == 1) ? 1 : ((player.rotateAngle == 3) ? -1 : 0);
    if(safeHistory) this.addHistory();

    this.lastPlayer = player;
    this.canNextStep = false;
    this.isCollide = false;
    var result;
    if(player.typeName != 'playerB') {
        result = this.movePlayer(player, player.cell, dx, dy, field);
    }
    if(result) {
        if(player.typeName == 'player') {
            GodStep.playSound('move', 0, PS.SOUND);
        } else {
            if(player.typeName == 'playerR') {
                if(safeHistory)
                GodStep.playSound('fast', 0, PS.SOUND);
            }
        }
    }
    this.updatePlayers();
    return result;
};
pro.h_cells = function(e) {
    var cell = e.content.data;
    var t = e.target;
    var p = t.parent;
    var players = t.players;
    var cells = t.cells;
    if(p.canNextStep && !p.isFinished) {
        switch (e.type) {
          case Games.CELL_CLICK:
             for(var i = 0; i<players.length; i++) {
                 var player = players[i];
                 if(player.cell == cell) {
                     p.clickBlock(player, true);
                     return;
                 }
             }
             break;
        }
    }
};
pro.updatePlayers = function() {
    if(!this.isFinished) {
        var players = this.field.players;
        var finishCount = 0;
        for(var i = 0; i<players.length; i++) {
            var player = players[i];
            player.tpCell = player.goToCell = null;
            player.isWaitForTeleport = false;
            player.setAsFinished(false);

            var stars = this.field.stars;
            for(var s = 0; s<stars.length; s++) {
                var star = stars[s];
                var guests = star.cell.guests;
                for(var g = 0; g<guests.length; g++) {
                    var guest = guests[g];
                    if(guest.name == 'player') {
                        if(guest.alias == star.alias) {
                            finishCount++;
                            guest.setAsFinished(true);
                        } else {
                            guest.setAsFinished(false);
                        }
                    } else {
                        guest.setAsFinished(false);
                    }
                }
            }
        }

        if(finishCount == this.field.stars.length *  this.field.stars.length) {
            this.isFinished = true;
        }
    }
};
pro.getOtherTP = function(teleport, field) {
    var teleports = field.teleports;
    for(var i =0; i<teleports.length; i++) {
        if(teleports[i] != teleport) return teleports[i];
    }
};
pro.movePlayer = function(player, cell, dx, dy, field) {
    var gameplay = field.gameplay;
    var isHaveCell = !((cell.xi + dx > field.cellCountX - 1 || cell.xi + dx < 0) || (cell.yi + dy > field.cellCountY - 1 || cell.yi + dy < 0));
    var result;

    if(isHaveCell) {
        var nextCell = field.getCell(cell.xi + dx, cell.yi + dy);
        player.goToCell = nextCell;

        for(var i = 0;i < nextCell.guests.length; i++) {
            var object = nextCell.guests[i];
            switch (object.name) {
                case 'player':
                       if(object.goToCell != null) {
                           player.goToCell.setAsGuest(player);
                           player.applyCellPostion();
                           return true;
                       }
                        result = gameplay.movePlayer(object, nextCell, dx, dy, field);
                        gameplay.isCollide = true;
                        if(result) {
                            nextCell.setAsGuest(player);
                            player.applyCellPostion();
                            return true;
                        } else {
                            return false;
                        }

                    break;
                case 'teleport':
                    var otherTP = gameplay.getOtherTP(object, field);
                    var tpCell = otherTP.cell;
                    player.isWaitForTeleport = true;
                    player.lastCell = player.cell;
                    result = gameplay.movePlayer(player, otherTP.cell, dx, dy, field);
                    GodStep.playSound('portal', 0, PS.SOUND);

                    if(result) {
                        var nextTPCell =  field.getCell(tpCell.xi + dx, tpCell.yi + dy);
                        field.addShadow(player, object);
                        nextTPCell.setAsGuest(player);
                        player.tpCell = tpCell;
                        player.applyCellPostion();
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'star':
                    break;
                case 'arrow':
                    player.nextRotation = object.rotateAngle;
                    player.applyRotation();
                    break;
            }
        }
            nextCell.setAsGuest(player);
            player.applyCellPostion();
            return true;
    } else {
        return false;
    }
    return false;
};
pro.h_buttons = function(e)  {
    var t = e.content.t;
    var p = t.parent;
    var s = p.soul;
    switch (t) {
        case p.b_stepBack:
            GodStep.playSound('button', 0, PS.SOUND);

            if(!p.isFinished) {
                p.backHistory();
            }
            break;
        case p.b_back:
            GodStep.playSound('button', 0, PS.SOUND);
            p.pause.init();
          //  s.screenTo([s.levelselect], p);
            break;
        case p.b_restart:
            if(PS.SOFT_GAMES) {
                if(SG_Hooks) {
                    SG_Hooks.gameOver(PS.LAST_LEVEL_SELECTED, null);
                }
            }
            GodStep.playSound('button', 0, PS.SOUND);
            s.screenTo([s.intro], p);
            break;
    }
};



Object.defineProperty(pro, 'Scale', {
    get: function() {
        return this.scale.x;
    },
    set: function(value) {
        this.scale.x = this.scale.y = value;
        this.header.y = this.headerLabel.y = this.b_restart.y =  this.b_stepBack.y = this.b_back.y = -(this.soul.OH - this.soul.H) * .5 / value + this.soul.H * .1 / value;
        this.headerLabel.y -=  this.soul.H * .04 / value;
        this.back.rescale(value);
        this.pause.Scale = value;
      //  this.pause.y = -(this.soul.OH - this.soul.H)/2;
        this.tutorback.rescale(value);
      // this.hMask.y = this.header.y - this.header.texture.height/2 * this.startS;
       // this.hMask.x = this.soul.W - this.header.texture.width * this.startS;
    }
});
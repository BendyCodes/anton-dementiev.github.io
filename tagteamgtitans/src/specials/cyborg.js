function cyborg_special(){
	if(!fire_wait){
		energy_for_special = 5;
		energy_for_charge = 0.75;
		cyborg_fire();
		fire_wait = true;

		titan.createEmptyMovieClip = function(name) {
			titan[name] = {};
		}
		titan.createEmptyMovieClip('fire_wait',6);
		titan.fire_wait.onEnterFrame = function(){
			if (titan.fire_wait.wait == undefined) titan.fire_wait.wait = 0;
			titan.fire_wait.wait++;
			if(titan.fire_wait.wait == 20){
				fire_wait = false;
				removeCustomEfFunc('cyborg_fire_wait');
			}
		}
		addCustomEfFunc('cyborg_fire_wait', titan.fire_wait.onEnterFrame);
	}
}

var rock_lev = 0;
function cyborg_fire(){
	play_fx('tt_cyborg_cannon_fires',0,50);
	special = true;
	energy -= energy_for_special;

	pieces_lev++;
	rock_lev++;
	all.pieces.attachMovie = function(name, piece) {
	    all_pieces_attachMovie(name, piece);
	}
	all.pieces.attachMovie('little_rock','little_rock'+rock_lev,pieces_lev+5000);
	var rock = all.pieces['little_rock'+rock_lev];
	rock.direct = (titan_direction == 'right')-(titan_direction == 'left');
	rock._xscale = 100*rock.direct;
	rock._x = titan._x+(rock.direct*44);
	rock._y = titan._y-38;
	rock.x_adj = -x_speed;
	rock.ind = pieces_lev;
	rock.mc.play();
	if (rock._xscale < 0) rock.mc.width = -rock.mc.width;
	
	if((titan_animation == 'right' && rock.x_adj < 0) || (titan_animation == 'left' && rock.x_adj > 0)){
		rock.x_adj = 0;
	}
	rock.dir = titan_animation;
	detect_missile(rock,1,0);

	rock.onEnterFrame = function(){
		rock_ai(rock,15);
		detect_missile(rock,1,0);
	}
	addCustomEfFunc('pieces_lev'+rock.ind, rock.onEnterFrame);

	rock.mc.x = rock._x;
	rock.mc.y = rock._y;
	allContainer.addChild(rock.mc);
}

function rock_ai(trg,ms){
	if (trg.x_speed == undefined) trg.x_speed = 0;
	if (trg.distance == undefined) trg.distance = 0;
	
	trg.x_potential = ms*trg.direct;
	trg.x_speed += 5*(trg.x_potential>trg.x_speed);
	trg.x_speed -= 5*(trg.x_potential<trg.x_speed);
	
	trg._x += trg.x_speed;
	trg._x += trg.x_adj;
	
	trg.distance += Math.abs(trg.x_speed);	
	
	if(trg.distance > 600){
		allContainer.removeChild(trg.mc);
		removeCustomEfFunc('pieces_lev'+trg.ind)
	}
	
	if(trg.distance > 100 && !trg.reg){
		trg.reg = true;
	}
	
	if(trg.x_speed > 0){
		trg.dir = 'right';
	}else{
		trg.dir = 'left';
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function cyborg_charge_fire(){
	play_fx('tt_cyborg_cannon_fires',0,100);
	special = true;

	if (titan.all == undefined) titan.all = {};
	titan.all.createEmptyMovieClip = function(name) {
		titan.all[name] = {};
	}
	titan.all.createEmptyMovieClip('special_wait',9);
	titan.all.special_wait.onEnterFrame = function(){
		if (titan.all.special_wait.timer == undefined) titan.all.special_wait.timer = 0;
		titan.all.special_wait.timer++;
		if(titan.all.special_wait.timer >= 20) {
			special = false;
			titan.all.special_wait.timer = 0;
			removeCustomEfFunc('special_wait_timer');
		}
	}
	addCustomEfFunc('special_wait_timer', titan.all.special_wait.onEnterFrame);
	
	energy -= energy_for_special;
	
	pieces_lev++;
	rock_lev++;
	
	all.pieces.attachMovie = function(name, piece) {
	    all_pieces_attachMovie(name, piece);
	}
	all.pieces.attachMovie('big_rock','big_rock'+rock_lev,pieces_lev+5000);
	var rock = all.pieces['big_rock'+rock_lev];
	rock.direct = (titan_direction == 'right')-(titan_direction == 'left');
	rock._xscale = 100*rock.direct;
	if (rock._xscale < 0) rock.mc.width = -rock.mc.width;
	rock._x = titan._x-(rock.direct*22);
	rock._y = titan._y-38;
	rock.x_adj = -x_speed;
	
	if((titan_animation == 'right' && rock.x_adj < 0) || (titan_animation == 'left' && rock.x_adj > 0)){
		rock.x_adj = 0;
	}
	
	rock.dir = titan_animation;
	rock.ind = pieces_lev;
	rock.mc.x = rock._x;
	rock.mc.y = rock._y;
	rock.mc.play();
	
	rock.onEnterFrame = function(){
		rock_ai(rock,30);
		detect_missile(rock,7,15);
	}
	addCustomEfFunc('pieces_lev'+rock.ind, rock.onEnterFrame);
}
function starfire_special(){
	if(!fire_wait){
		energy_for_special = 4;
		star_fire();
		fire_wait = true;

		titan.createEmptyMovieClip = function(name) {
			titan[name] = {};
		}
		titan.createEmptyMovieClip('fire_wait',6);
		titan.fire_wait.onEnterFrame = function(){
			if (titan.fire_wait.wait == undefined) titan.fire_wait.wait = 0;
			titan.fire_wait.wait++;
			if(titan.fire_wait.wait == 5){
				fire_wait = false;
				removeCustomEfFunc('starfire_fire_wait');
			}
		}
		addCustomEfFunc('starfire_fire_wait', titan.fire_wait.onEnterFrame);
	}
}

var eye_lev = 0;

function star_fire(){
	play_fx('tt_starfire_eyebeams',0,100);
	
	special = true;
	//energy -= energy_for_special;
	pieces_lev++;
	eye_lev++;

	all.pieces.attachMovie = function(name, piece) {
	    all_pieces_attachMovie(name, piece);
	}
	all.pieces.attachMovie('eye_laser','eye_laser'+eye_lev,pieces_lev+5000);
	var eye_laser = all.pieces['eye_laser'+eye_lev];
	eye_laser.direct = (titan_direction == 'right')-(titan_direction == 'left');
	eye_laser._xscale = 100*eye_laser.direct;
	eye_laser._x = titan._x+(eye_laser.direct*16);
	eye_laser._y = titan._y-46;
	eye_laser.x_adj = -x_speed;
	eye_laser.always_hit = true;
	
	if((titan_animation == 'right' && eye_laser.x_adj < 0) || (titan_animation == 'left' && eye_laser.x_adj > 0)){
		eye_laser.x_adj = 0;
	}
	
	eye_laser.dir = titan_animation;

	eye_laser.mc.x = eye_laser._x;
	eye_laser.mc.y = eye_laser._y;

	eye_laser.ind = pieces_lev;
	eye_laser.mc.play();

	if (eye_laser._xscale < 0) eye_laser.mc.width = -eye_laser.mc.width;
	
	eye_laser.onEnterFrame = function(){
		eye_laser_ai(eye_laser);
		detect_missile(eye_laser,0.5,0);
	}
	addCustomEfFunc('pieces_lev'+eye_laser.ind, eye_laser.onEnterFrame);
}

function eye_laser_ai(trg){
	if (trg.x_speed == undefined) trg.x_speed = 0;
	if (trg.distance == undefined) trg.distance = 0;

	trg.x_potential = 20*trg.direct;
	trg.x_speed += 10*(trg.x_potential>trg.x_speed);
	trg.x_speed -= 10*(trg.x_potential<trg.x_speed);
	
	trg._x += trg.x_speed;
	trg._x += trg.x_adj;
	
	trg.distance += Math.abs(trg.x_speed);	
	
	if(trg.distance > 600){
		allContainer.removeChild(trg.mc);
		removeCustomEfFunc('pieces_lev'+trg.ind);
	}
	
	if(trg.x_speed > 0){
		trg.dir = 'right';
	}else{
		trg.dir = 'left';
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}
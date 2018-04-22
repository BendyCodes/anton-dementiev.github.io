function tentacle_path(trg){
	if(!trg.attacking && !trg.waiting){
		trg.state = 'path';
	}

	if(titan._x >= trg.limits[0] && titan._x <= trg.limits[1] && !trg.no_attacking && !trg.waiting && titan._y-trg._y < 140 && trg._y-titan._y >= 0 && !trg.attacking && ((titan._x - trg._x >-300 && titan._x - trg._x <-0) || (titan._x - trg._x < 300 && titan._x - trg._x > 0)) && !trg.no_attacking && !trg.waiting){
		// make sure facing the right direction before chase
		if((trg.ani_direction == 'left' && titan._x < trg._x) || (trg.ani_direction == 'right' && titan._x > trg._x)){
			trg.state = 'chase';
		}
	};
	
	if(trg.state == 'chase' && !trg.no_attacking && !trg.waiting && ((titan._x - trg._x > 0 && trg.ani_direction == 'right') || (titan._x - trg._x < 0  && trg.ani_direction == 'left')) && Math.abs(titan._x-trg._x) <= 60 && Math.abs(trg._y-titan._y) <= 50 && !dead){
		trg.state = 'attack';
	}
	
	// chase mode dir
	if(trg.state == 'chase' && !trg.hit && !trg.dead){
		trg.pose = 'run';
		trg.max_speed = 10;
		trg.x_potential = trg.max_speed*((titan._x>trg._x)-(titan._x<trg._x));
		trg.x_speed += 2*(trg.x_potential>trg.x_speed);
		trg.x_speed -= 2*(trg.x_potential<trg.x_speed);
	}
	
	// path mode dir
	if(trg.state == 'path' && !trg.hit && !trg.dead){
		trg.pose = 'run';
		trg.max_speed = 2;
		trg.x_potential =  trg.max_speed*((trg.path[trg.path_dir]>trg._x)-(trg.path[trg.path_dir]<trg._x));
		trg.x_speed += 1*(trg.x_potential>trg.x_speed);
		trg.x_speed -= 1*(trg.x_potential<trg.x_speed);
		
		// get max speed before path end
		if(trg._x >= trg.path[trg.path_dir]){
			trg.x_speed = Math.min(Math.max(trg.path[trg.path_dir]-trg._x,trg.x_speed),0);
		}
		if(trg._x <= trg.path[trg.path_dir]){
			trg.x_speed = Math.max(Math.min(trg.path[trg.path_dir]-trg._x,trg.x_speed),0);
		}
		
		trg.just_changed = false;
		// back to other path
		if(trg.path[trg.path_dir] == trg._x){
			trg.x_speed = 0;
			trg.path_dir++;
			trg.path_dir%=2;
			trg.just_changed = true;
		};
	}
	
	// attack mode
	if(trg.state == 'attack' && !trg.no_attacking && !trg.dead && !trg.hit && !invincible){
		trg.pose = 'smash';
		play_fx('tt_miss',0,100);
		
		trg.x_potential = 0;
		trg.x_speed = 0;		
		
		trg.attacking = true;
		trg.no_attacking = true;
		
		// no_attacking means a waiting time between attacks
		
		hit_person(titan,trg.ani_direction,'n/a',trg.damage);

		//attack_wait
		trg.createEmptyMovieClip = function(name) {
			trg[name] = {};
		}
		trg.createEmptyMovieClip('attack_wait',1);
		trg.attack_wait.onEnterFrame = function(){
			if (trg.attack_wait.wait == undefined) trg.attack_wait.wait = 0;
			trg.attack_wait.wait++;
			if(trg.attack_wait.wait == 40){
				trg.attacking = false;
			}
			if(trg.attack_wait.wait == 100){
				trg.no_attacking = false;
				trg.attack_wait.wait = 0;
				removeCustomEfFunc('trg.attack_wait'+trg.ind);
			}
		}
		addCustomEfFunc('trg.attack_wait'+trg.ind, trg.attack_wait.onEnterFrame);
	}
	
	if(trg.state == 'waiting'){
		trg.pose = 'ready';
		
		if(!trg.look_wait){
			trg.createEmptyMovieClip = function(name) {
				trg[name] = {};
			}
			trg.createEmptyMovieClip('look_wait',1);
			trg.look_wait.onEnterFrame = function(){
				if (trg.look_wait.wait == undefined) trg.look_wait.wait = 0;
				trg.look_wait.wait++;
				if(trg.look_wait.wait == 50){
					if(trg.ani_direction == 'left'){
						trg.ani_direction = 'right';
					}else{
						trg.ani_direction = 'left';
					}
					trg.look_wait.wait = 0;
				}
			}
			addCustomEfFunc('trg.look_wait'+trg.ind, trg.look_wait.onEnterFrame);
		}
		
		if((trg.my_right == 1 && trg.my_right_double == 1 && !trg.right_obstruction && trg.ani_direction == 'right') || (trg.my_left == 1 && trg.my_left_double == 1 && !trg.left_obstruction &&  trg.my_left == 1 && trg.ani_direction == 'left')){
			trg.waiting = false;
		}
	}
}

function tentacle_movement_ai(trg){
	// centres
	trg.centre_x = trg._x;
	trg.centre_x %= tile_size;
	
	// the tiles
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile)/tile_size);
	
	trg.my_left = legal[trg.tile_v][trg.tile_h-1];
	trg.my_right = legal[trg.tile_v][trg.tile_h+1];
	trg.my_left_double = legal[trg.tile_v][trg.tile_h-2];
	trg.my_right_double = legal[trg.tile_v][trg.tile_h+2];
	
	trg.my_floor = legal[trg.tile_v+1][trg.tile_h];
	trg.my_floor_left = legal[trg.tile_v+1][trg.tile_h-1];
	trg.my_floor_right = legal[trg.tile_v+1][trg.tile_h+1];
	
	trg.my_shelf_left = shelf[trg.tile_v][trg.tile_h-1];
	trg.my_shelf_right = shelf[trg.tile_v][trg.tile_h+1];	
	
	trg.my_shelf_floor = shelf[trg.tile_v+1][trg.tile_h];
	trg.my_shelf_floor_left = shelf[trg.tile_v+1][trg.tile_h-1];
	trg.my_shelf_floor_right = shelf[trg.tile_v+1][trg.tile_h+1];
	
	// blockers
	trg.left_block = trg.my_left == 0;
	trg.right_block = trg.my_right == 0;
	
	// blockers for walls etc
	if(trg.right_block && trg.x_speed > 0){
		trg.x_speed = Math.max(Math.min(35-trg.centre_x,trg.x_speed),0);
	}
	if(trg.left_block && trg.x_speed < 0){
		trg.x_speed = Math.min(Math.max(35-trg.centre_x,trg.x_speed),0);
	}
	
	// are you on a platform
	trg.on_floor_left = trg.my_floor_left == 0 && trg.centre_x < left_adjustment;
	trg.on_floor_right = trg.my_floor_right == 0 && trg.centre_x > right_adjustment;
	trg.on_floor_middle = trg.my_floor == 0;
	trg.on_floor = (trg.on_floor_middle || trg.on_floor_left || trg.on_floor_right);
	
	// are you on a shelf
	trg.on_shelf_left = trg.my_shelf_floor_left == 1 && trg.centre_x < left_adjustment;
	trg.on_shelf_right = trg.my_shelf_floor_right == 1 && trg.centre_x > right_adjustment;
	trg.on_shelf_middle = trg.my_shelf_floor == 1;
	trg.on_shelf = (trg.on_shelf_middle || trg.on_shelf_left || trg.on_shelf_right);
	
	// blocked by crate that is floating
	if(((trg.right_obstruction && trg.ani_direction == 'right') || (trg.left_obstruction && trg.ani_direction == 'left')) && (trg.on_floor || trg.on_shelf) && !trg.just_changed && (crate_on != undefined && Math.abs(crate_on._x - trg._x) == 65) && !trg.waiting){
		trg.path_blocked = true;
	}
	
	// blocked by landed crate
	if(((trg.right_block && trg.ani_direction == 'right') || (trg.left_block && trg.ani_direction == 'left')) && trg.x_speed == 0 && !trg.just_changed && !trg.waiting){
		trg.path_blocked = true;
	}
	
	// force path return
	if(trg.path_blocked){
		trg.path_dir++;
		trg.path_dir%=2;
		trg.path_blocked = false;
		trg.x_speed = 0;
		trg.x_potential = 0;		
		
		switch(trg.ani_direction){
			case'left':
				// if you are blocked and there is no 2 tile legal the other way you wait
				if(trg.my_right_double == 0 || trg.my_right == 0){
					trg.state = 'waiting';
					trg.waiting = true;
				}
				trg.ani_direction = 'right';
			break;
			
			case'right':
				// if you are blocked and there is no 2 tile legal the other way you wait
				if(trg.my_left_double == 0 || trg.my_left == 0){
					trg.state = 'waiting';
					trg.waiting = true;
				}
				trg.ani_direction = 'left';
			break;
		}
	}
	
	// if a crate is floating do this function
	if(crate_on != undefined){
		detect_crate(trg);
	}
	
	trg._x += trg.x_speed;
}

function tentacle_animation(trg){
	if (trg.body == undefined) trg.body = {};
	if (trg.body.w == undefined) trg.body.w = 0;
	if (trg.body.wa == undefined) trg.body.wa = 0;
	if (trg.body._y == undefined) trg.body._y = 0;

	trg.body.w++;
	trg.body.wa = parseInt(Math.cos(trg.body.w*0.1)*10);
	trg.body._y += trg.body.wa*0.05;
	
	if(trg.x_speed < 0 && !trg.hit){
		trg.ani_direction = 'left';
	}
	if(trg.x_speed > 0 && !trg.hit){
		trg.ani_direction = 'right';
	}
	
	if(!trg.hit){
		trg.gotoAndStop = function(vals) {
			if (trg.mc.get_currentSequence() != vals)
			trg.mc.setSequence(vals);
		}
		trg.gotoAndStop(trg.pose+' '+trg.ani_direction);
	}
	
	trg.on_crate = false;
}
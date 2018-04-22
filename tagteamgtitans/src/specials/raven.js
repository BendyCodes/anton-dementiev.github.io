function raven_special() {
	energy_for_special = 0.25;
	
	switch (the_crate) {
		case undefined :
			if (titan_direction == "left") {
				titan.raven_blackswirl_left.mc.visible = true;
				titan.raven_blackswirl_left.mc.gotoAndPlay(1);
				titan.raven_blackswirl_right.mc.gotoAndPlay(1);
			}
			if (titan_direction == "right") {
				titan.raven_blackswirl_right.mc.visible = true;
				titan.raven_blackswirl_right.mc.gotoAndPlay(1);
				titan.raven_blackswirl_left.mc.gotoAndPlay(1);
			}
			if (titan.focus == undefined && follow == 'ready' && !raven_fix) {
				raven_fix = true;
				pick_crate();			
			}
			break;
		default :
			drop_crate(the_crate);
			play_fx('tt_raven_object_drop',0,100);
			break;
	}
}

function pick_crate(){
	old_crate_distance = 1000000;
	
	play_fx('tt_raven_diamond',0,100);
	
	for(a in crate_positions){
		temp_crate = crate_positions[a];
		temp_crate.no_good = false;
		
		// crate distance
		crate_distance_x = (temp_crate._x)-all.pieces.titan._x;
		crate_distance_y = (temp_crate._y)-all.pieces.titan._y;
		crate_distance = Math.abs(crate_distance_x)+Math.abs(crate_distance_y);
		
		// check for non on top
		for(b in crate_positions){
			// make sure they are on the same x cos if not the on top does not matter
			if((crate_positions[b]._x == temp_crate._x && crate_positions[b]._y+70 == temp_crate._y)){
				temp_crate.no_good = true;
			}
		}
		
		// make sure player is not standing on it
		if(Math.abs(titan._x-temp_crate._x) < 65 && temp_crate._y-70-titan._y <= 70 && temp_crate._y-70-titan._y >= 0){
			temp_crate.no_good = true;
		}
		
		// make sure they are still
		if(temp_crate.onEnterFrame != undefined){
			temp_crate.no_good = true;
		}
	
		// see if not no_good, close enough to player, and player is looking the right way
		if(!temp_crate.no_good && Math.abs(crate_distance_x) <= 350 && Math.abs(crate_distance_y) <= 140 && ((camera_ref == 1 && crate_distance_x <= -55) || (camera_ref == -1 && crate_distance_x >= 55))){
			// if the next check is closer than last check thats the new one
			if(crate_distance < old_crate_distance){
				the_crate = crate_positions[a];
				old_crate_distance = crate_distance;
			}
		}
	}
	
	fake_pose = true;
	// after the loop use the closest 
	if(the_crate != undefined){
		energy_drain = energy_for_special;
		crate_on = the_crate;
		clear_crate_values(the_crate);
		no_player_input = true;
		no_gravity = true;
		distance_fix = true;
		wait_to_focus_crate(the_crate);
		legal[Math.floor((the_crate._y-half_tile)/tile_size)][Math.floor((the_crate._x)/tile_size)] = 1;
		special = true;
		play_fx('tt_raven_object_lift',0,100);
		play_fx('tt_raven_hum_whistle',100,100);
		
		the_crate.mc[wobbleStage].gotoAndStop(2);
		
		the_crate.onEnterFrame = function(){
			crate_loc(the_crate);
			crate_obstruction(the_crate);
			crate_blocker(the_crate);
			crate_magic_mover(the_crate);
			crate_mover(the_crate);
		}
		addCustomEfFunc('the_crate.onEnterFrame', the_crate.onEnterFrame);
	}else{
		special = true;
		no_player_input = true;
		no_gravity = true;
		titan.createEmptyMovieClip = function(name) {
			titan[name] = {};
		}
		titan.createEmptyMovieClip('pose_wait',5);
		titan.pose_wait.onEnterFrame = function(){
			if (titan.pose_wait.wait == undefined) titan.pose_wait.wait = 0;
			titan.pose_wait.wait++;
			if(titan.pose_wait.wait >= 30){
				special = false;
				no_player_input = false;
				no_gravity = false;
				fake_pose = false;
				raven_fix = false;

				titan.raven_blackswirl_right.mc.visible = false;
				titan.raven_blackswirl_left.mc.visible = false;
				titan.raven_blackswirl_right.mc.stop(0);
				titan.raven_blackswirl_left.mc.stop(0);

				removeCustomEfFunc('titan.pose_wait.onEnterFrame');

				titan.focus = undefined;
			}
		}
		addCustomEfFunc('titan.pose_wait.onEnterFrame', titan.pose_wait.onEnterFrame);
	}
}

function drop_crate(trg){
	stop_fx('tt_raven_hum_whistle');
	the_crate = undefined;
	clear_crate_values(trg);
	trg.fell = trg._y;

	trg.onEnterFrame = function(){
		crate_loc(trg);
		crate_obstruction(trg); // ?
		crate_fall(trg);
	}
	addCustomEfFunc('the_crate.onEnterFrame', trg.onEnterFrame);
}

function throw_crate(trg,xs,ys){
	the_crate = trg;
	clear_crate_values(trg);
	
	trg.x_vel = xs*16;
	trg.y_vel = ys*16;
	trg.onEnterFrame = function(){
		crate_loc(trg);
		crate_blocker(trg);
		crate_obstruction(trg); // ?
		crate_inflight(trg);
	}
	addCustomEfFunc('the_crate.onEnterFrame', trg.onEnterFrame);
}

function crate_loc(trg){
	// so titan faces right direction
	if(trg._x > titan._x){
		titan_direction = 'right';
	}
	if(trg._x < titan._x){
		titan_direction = 'left';
	}
	
	// turn to coords for array
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile)/tile_size);
	trg.my_tile = legal[trg.tile_v][trg.tile_h];
	
	// look at legal / blocked = 0  air = 1
	trg.my_head = legal[trg.tile_v-1][trg.tile_h] == 1 && shelf[trg.tile_v-1][trg.tile_h] == 0;
	trg.my_head_left = legal[trg.tile_v-1][trg.tile_h-1] == 1 && shelf[trg.tile_v-1][trg.tile_h-1] == 0;
	trg.my_head_right = legal[trg.tile_v-1][trg.tile_h+1] == 1 && shelf[trg.tile_v-1][trg.tile_h+1] == 0;
	
	trg.my_left = legal[trg.tile_v][trg.tile_h-1] == 1 && shelf[trg.tile_v][trg.tile_h-1] == 0;
	trg.my_right = legal[trg.tile_v][trg.tile_h+1] == 1 &&  shelf[trg.tile_v][trg.tile_h+1] == 0;
	
	trg.my_floor = legal[trg.tile_v+1][trg.tile_h] == 1 && shelf[trg.tile_v+1][trg.tile_h] == 0;
	trg.my_floor_left = legal[trg.tile_v+1][trg.tile_h-1] == 1 && shelf[trg.tile_v+1][trg.tile_h-1] == 0;
	trg.my_floor_right = legal[trg.tile_v+1][trg.tile_h+1] == 1 && shelf[trg.tile_v+1][trg.tile_h+1] == 0;	
	
	trg.centre_x = (trg._x)%+tile_size;
	trg.centre_y = (trg._y-half_tile)%+tile_size;
	
	trg.head_block = trg.my_head == 0 || (trg.my_head_left == 0 && trg.centre_x < 35) || (trg.my_head_right == 0 && trg.centre_x > 35);
	trg.floor_block = trg.my_floor == 0 || (trg.my_floor_left == 0 && trg.centre_x < 35) || (trg.my_floor_right == 0 && trg.centre_x > 35);
	trg.left_block = trg.my_left == 0 || (trg.my_head_left == 0 && trg.centre_y < 35) || (trg.my_floor_left == 0 && trg.centre_y > 35);	
	trg.right_block = trg.my_right == 0 || (trg.my_head_right == 0 && trg.centre_y < 35) || (trg.my_floor_right == 0 && trg.centre_y > 35);
}

function crate_magic_mover(trg){
	trg.magic_up1 = trg.my_left && trg.centre_y <= 69 && trg.centre_y > 35 && trg.left_block && trg.centre_x == 35 && left;
	trg.magic_up2 = trg.my_right && trg.centre_y <= 69 && trg.centre_y > 35 && trg.right_block && trg.centre_x == 35 && right;
	trg.magic_up = trg.magic_up1 || trg.magic_up2;	
	
	trg.magic_down1 = trg.my_left && trg.centre_y >= 0 && trg.centre_y < 35 && trg.left_block && trg.centre_x == 35 && left;
	trg.magic_down2 = trg.my_right && trg.centre_y >= 0 && trg.centre_y < 35 && trg.right_block && trg.centre_x == 35 && right;
	trg.magic_down = trg.magic_down1 || trg.magic_down2;
	
	trg.magic_left1 = trg.my_head && trg.centre_x <= 69 && trg.centre_x > 35 && trg.head_block && trg.centre_y == 35 && up;
	trg.magic_left2 = trg.my_floor && trg.centre_x <= 69 && trg.centre_x > 35 && trg.floor_block && trg.centre_y == 35 && down;
	trg.magic_left = trg.magic_left1 || trg.magic_left2;
	
	trg.magic_right1 = trg.my_head && trg.centre_x >= 0 && trg.centre_x < 35 && trg.head_block && trg.centre_y == 35 && up;
	trg.magic_right2 = trg.my_floor && trg.centre_x >= 0 && trg.centre_x < 35 && trg.floor_block && trg.centre_y == 35 && down;
	trg.magic_right = trg.magic_right1 || trg.magic_right2;
}

function crate_obstruction(trg){
	trg.stop_left = false;
	trg.stop_right = false;
	trg.stop_up = false;
	trg.stop_down = false;
	trg.victim = '';
	
	for(a in all.pieces){
		if(all.pieces[a].id == 'titan' || all.pieces[a].id == 'enemy'){
			// up and down block
			if(Math.abs((all.pieces[a]._x-trg.x_speed)-trg._x) < 55){
				// block up
				if(all.pieces[a]._y-trg.y_speed-trg._y >= -70 && all.pieces[a]._y-trg.y_speed-trg._y <= 0 && (trg.y_speed < 0 || up)){
					trg.stop_up = true;
					trg.adj_y = all.pieces[a]._y-trg._y;
					trg.victim = all.pieces[a];
				}
				// block down
				if(all.pieces[a]._y-trg.y_speed-trg._y <= 70 && all.pieces[a]._y-trg.y_speed-trg._y >= 0 && (trg.y_speed > 0 || down)){
					trg.stop_down = true;
					trg.adj_y = all.pieces[a]._y-trg._y;
					trg.victim = all.pieces[a];
				}
			}
			
			// left and right block		
			if(Math.abs(all.pieces[a]._y-trg._y) < 70){
				// block left
				if(all.pieces[a]._x-trg.x_speed-trg._x >= -55 && all.pieces[a]._x-trg.x_speed-trg._x <= 0 && (trg.x_speed < 0 || left)){
					trg.stop_left = true;
					trg.adj_x = (all.pieces[a]._x)-trg._x;
					trg.victim = all.pieces[a];
				}
				
				// block right
				if(all.pieces[a]._x-trg.x_speed-trg._x <= 55 && all.pieces[a]._x-trg.x_speed-trg._x >= 0 && (trg.x_speed > 0 || right)){
					trg.stop_right = true;
					trg.adj_x = (all.pieces[a]._x)-trg._x;
					trg.victim = all.pieces[a];
				}
			}
		}
	}
}

function crate_blocker(trg){
	// blocker
	if(trg.head_block){
		trg.hold_block = true;
		trg.y_speed = Math.max((35-trg.centre_y),trg.y_speed);
		//trace('BH>  '+trg.y_speed);
	}
	if(trg.floor_block){
		trg.hold_block = true;
		trg.y_speed = Math.min((35-trg.centre_y),trg.y_speed);
		//trace('BF>  '+trg.y_speed);
	}
	if(trg.left_block){
		trg.hold_block = true;
		trg.x_speed = Math.max((35-trg.centre_x),trg.x_speed);
		//trace('BL>  '+trg.x_speed);
	}
	if(trg.right_block){
		trg.hold_block = true;
		trg.x_speed = Math.min((35-trg.centre_x),trg.x_speed);
		//trace('BR>  '+trg.x_speed);
	}	
	
	// magic
	if(trg.magic_up){	
		trg.y_speed = Math.max(35-trg.centre_y,trg.y_speed);
	}
	if(trg.magic_down){
		trg.y_speed = Math.min(35-trg.centre_y,trg.y_speed);
	}
	if(trg.magic_left){
		trg.x_speed = Math.max(35-trg.centre_x,trg.x_speed);
	}
	if(trg.magic_right){	
		trg.x_speed = Math.min(35-trg.centre_x,trg.x_speed);
	}

	// this stops from going over players
	if(trg.stop_left){
		trg.x_speed = 0;
		trg.x_potential = 0;
		if(trg.victim.id == 'titan'){
			//trg._x += trg.adj_x+55;
		}
	}
	if(trg.stop_right){
		trg.x_speed = 0;
		trg.x_potential = 0;
		if(trg.victim.id == 'titan'){
			//trg._x += trg.adj_x-55;
		}
	}
	
	
	if(trg.stop_up){
		trg.y_speed = 0;
		trg.y_potential = 0;
		if(trg.victim.id == 'titan'){
			//trg._y += trg.adj_y+70;
		}
	}
	if(trg.stop_down){
		trg.y_speed = 0;
		trg.y_potential = 0;
		if(trg.victim.id == 'titan'){
			//trg._y += trg.adj_y-70;
		}
	}
	
	if(!trg.in_flight){
		trg.x_speed = Math.max(Math.min(trg.x_speed,8),-8);
		trg.y_speed = Math.max(Math.min(trg.y_speed,8),-8);
	}
	
	trg._x += trg.x_speed;
	trg._y += trg.y_speed;
	
	distance_x += trg.x_speed;
	distance_y += trg.y_speed;
}

function crate_mover(trg){
	trg.x_potential = 8*((right || trg.magic_right)-(left || trg.magic_left));	
	trg.y_potential = 8*((down || trg.magic_down)-(up || trg.magic_up));
	
	trg.x_speed += 0.5*(trg.x_speed<trg.x_potential);
	trg.x_speed -= 0.5*(trg.x_speed>trg.x_potential);
	trg.y_speed += 0.5*(trg.y_speed<trg.y_potential);
	trg.y_speed -= 0.5*(trg.y_speed>trg.y_potential);
	
	// throw_left
	left_timer++;
	if(left && !left_pressed){
		if(left_timer <= 6){
			throw_crate(trg,-1,0);
		}
		left_timer = 0;
		left_pressed = true;
	}
	
	if(!left && left_pressed){
		left_pressed = false;
	}
	
	
	// right throw
	right_timer++;
	if(right && !right_pressed){
		if(right_timer <= 6){
			throw_crate(trg,1,0);
		}
		right_timer = 0;
		right_pressed = true;
	}
	
	if(!right && right_pressed){
		right_pressed = false;
	}
	
	// throw_up
	up_timer++;
	if(up && !up_pressed){
		if(up_timer <= 6){
			throw_crate(trg,0,-1);
		}
		up_timer = 0;
		up_pressed = true;
	}
	
	if(!up && up_pressed){
		up_pressed = false;
	}
	
	// throw_down
	down_timer++;
	if(down && !down_pressed){
		if(down_timer <= 6){
			throw_crate(trg,0,1);
		}
		down_timer = 0;
		down_pressed = true;
	}
	
	if(!down && down_pressed){
		down_pressed = false;
	}
	
	if (trg.w == undefined) trg.w = 0;
	if (trg.wa == undefined) trg.wa = 0;
	if (trg.mc[wobbleStage]._y == undefined) trg.mc[wobbleStage]._y = 0;
	
	// wobble
	trg.w++;
	trg.wa = Math.cos(trg.w*0.1)*0.5;
	trg.mc[wobbleStage]._y += trg.wa;
	trg.mc[wobbleStage].y = trg.mc[wobbleStage]._y + 1;
	
	if(energy <= 0){
		drop_crate(trg);
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function crate_inflight(trg){
	energy_drain = 0;
	
	if(trg.x_vel != 0){
		trg.x_speed = trg.x_vel;
	}
	if(trg.y_vel != 0){
		trg.y_speed = trg.y_vel;
	}
	
	trg.y_speed = trg.y_speed*crate_drag+(crate_gravity*0.25);
	trg.y_speed = Math.min(trg.y_speed,35);
	
	if(trg.head_block){
		trg.y_speed = Math.max((35-trg.centre_y),trg.y_speed);
	}
	if(trg.floor_block){
		trg.y_speed = Math.min((35-trg.centre_y),trg.y_speed);
	}
	
	trg._x += trg.x_speed;
	trg._y += trg.y_speed;
	
	distance_x += trg.x_speed;
	distance_y += trg.y_speed;
	
	// if your hit a person
	if(trg.stop_up || trg.stop_down || trg.stop_left || trg.stop_right){
		//console.log('crate hit '+trg.victim);
		if(trg.x_speed > 0){
			trg.dir = 'right';
		}
		if(trg.x_speed < 0){
			trg.dir = 'left';
		}
		
		hit_person(trg.victim,trg.dir,true,5,'yellow');
		crate_smash(trg);
	}
	
	// if you go to bottomless pit
	if(legal[trg.tile_v+1][trg.tile_h] == undefined){
		crate_smash(trg);
	}
	
	
	// if you hit walls
	if((trg.left_block && trg.x_speed < 0) || (trg.right_block && trg.x_speed > 0) || (trg.head_block && trg.y_vel < 0) || (trg.floor_block && trg.y_vel > 0)){
		crate_smash(trg);
	}
}

crate_gravity = 4;
crate_drag = 0.94;
crate_bounce = 0.86;

function crate_fall(trg){
	energy_drain = 0;
	crate_on_state = 'fall';

	trg.y_speed = trg.y_speed*crate_drag+crate_gravity;
	trg.y_speed = Math.min(trg.y_speed,35);
	trg._y += trg.y_speed;
	
	distance_x += trg.x_speed;
	distance_y += trg.y_speed;
	
	trg.drop_y = (trg._y-half_tile)%+tile_size;
	
	// find the max distance before hitting the floor, or speed
	if(trg.floor_block){
		trg.max_y_speed = Math.min((35-trg.drop_y),trg.y_speed);
	}

	// make the bounce
	if (trg.y_speed>trg.max_y_speed && trg.floor_block && trg.y_speed >= 0) {
		trg._y += trg.max_y_speed;
		trg.y_speed = -trg.y_speed*crate_bounce;
		trg.bounce_amount++;
		// smash if fell far
		if(trg._y-trg.fell > 105){
			crate_smash(trg);
		}
		trg.fell = trg._y;
	}
	
	// if your hit a person
	if(trg.stop_up || trg.stop_down || trg.stop_left || trg.stop_right){
		//console.log('crate hit '+trg.victim);
		hit_person(trg.victim,'n/a',true,5,'yellow');
		crate_smash(trg);
	}
	
	// if you go to bottomless pit
	if(legal[trg.tile_v+1][trg.tile_h] == undefined){
		crate_smash(trg);
	}

	// adjust your x after bounce 1	
	if(!trg.x_dest){
		if((trg.tile_h*70)-(titan._x-35) < 55 && (trg.tile_h*70)-(titan._x-35) > 0){
			trg.pusher = 70;
		}
		if((trg.tile_h*70)-(titan._x-35) > -55 && (trg.tile_h*70)-(titan._x-35) < 0){
			trg.pusher = -70;
		}
		if(trg.tile_v != tile_v){
			trg.pusher = 0;
		}
		
		trg.x_dest = trg._x+(35-trg.centre_x)+trg.pusher;
		trg.pusher = 0;
		
		play_fx('tt_raven_object_setdown',0,100);
	}
	
	if(trg.centre_x != 35){
		trg._x += (trg.x_dest-trg._x)*0.2;
		
		if(Math.abs(trg.x_dest-trg._x)<1){
			trg._x += (trg.x_dest-trg._x);
			trg.x_dest = 0;
		}
	}

	// if you come to stop make sure you have not gone onto a grid place with no floor
	if(35-trg.centre_x == 0 && trg.bounce_amount >= 6){
		if(trg.my_floor == 1){
			trg.bounce_amount = 0;
		}else{
			trg.x_dest = 0;
			crate_landed(trg);
		}
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function crate_landed(trg){
	trg.mc[wobbleStage].gotoAndStop(1);
	energy_drain = 0;
	legal[trg.tile_v][trg.tile_h] = 0;
	wait_to_focus_player(trg);
	trg.onEnterFrame = undefined;
	crate_on_state = undefined;
	crate_on = undefined;
	removeCustomEfFunc('the_crate.onEnterFrame');
}

function clear_crate_values(trg){
	trg.x_potential = 0;
	trg.y_potential = 0;
	trg.x_speed = 0;
	trg.y_speed = 0;
	trg.bounce_amount = 0;
	left_pressed = true;
	right_pressed = true;
	up_pressed = true;
	down_pressed = true;
	left_timer = 99;
	right_timer = 99;
	up_timer = 99;
	down_timer = 99;

	removeCustomEfFunc('titan.wait.onEnterFrame');

	trg.w = 0;
	trg.wa = 0;
	trg.mc[wobbleStage]._y = 0;
	trg.mc[wobbleStage].y = trg.mc[wobbleStage]._y;
}

function crate_smash(trg){
	scored(20);
	play_fx('tt_raven_object_smash',0,100);
	stop_fx('tt_raven_hum_whistle');
	energy_drain = 0;
	for(a in crate_positions){
		if(crate_positions[a] == trg){
			crate_positions.splice(a,1);
		}
	}
	pieces_lev++;
	smash_lev++;
	
	if(wobbleStage == "wobble2"){
		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece, true);
		}
		all.pieces.attachMovie('steel_smash','wood_smash'+smash_lev,pieces_lev+4000);
	}else{
		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece, true);
		}
		all.pieces.attachMovie('wood_smash','wood_smash'+smash_lev,pieces_lev+4000);
	}
	
	var smash_trg = all.pieces['wood_smash'+smash_lev];
	smash_trg._x = trg._x;
	smash_trg._y = trg._y;
	
	smash_trg.onEnterFrame = function(){
		smash_trg.mc.gotoAndStop(smash_trg.mc.currentFrame+1);
		if(smash_trg.mc.currentFrame == smash_trg.mc.totalFrames-1+1){ //fix it
			wait_to_focus_player(trg);
			allContainer.removeChild(smash_trg.mc);
			removeCustomEfFunc('smash_trg.onEnterFrame');
		}
	}
	addCustomEfFunc('smash_trg.onEnterFrame', smash_trg.onEnterFrame);

	smash_trg.mc.x = smash_trg._x;
	smash_trg.mc.y = smash_trg._y;

	allContainer.removeChild(trg.mc);
	removeCustomEfFunc('the_crate.onEnterFrame');

	crate_on_state = undefined;
	crate_on = undefined;
}

var follow = 'ready';

function wait_to_focus_crate(trg){
	trg.createEmptyMovieClip = function(name) {
		trg[name] = {};
	}
	trg.createEmptyMovieClip('wait',2);
	trg.wait.onEnterFrame = function(){
		if(follow == 'ready'){
			old_distance_x = distance_x;
			old_distance_y = distance_y;
			focus_to_crate(trg);
			removeCustomEfFunc('trg.wait.onEnterFrame');
			
		}
	}
	addCustomEfFunc('trg.wait.onEnterFrame', trg.wait.onEnterFrame);
}

function wait_to_focus_player(trg){
	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('wait',2);
	titan.wait.onEnterFrame = function(){
		//if(follow != 'ready' && trg.focus == undefined){
		if(follow != 'ready'){
			focus_to_player(trg);
			removeCustomEfFunc('titan.wait.onEnterFrame');
		}
	}
	addCustomEfFunc('titan.wait.onEnterFrame', titan.wait.onEnterFrame);
}

follow_div = 0.25;
follow_min = 2;
follow_max = 30

function focus_to_crate(trg){
	follow = "";
	camera_off = true;

	trg.createEmptyMovieClip = function(name) {
		trg[name] = {};
	}
	trg.createEmptyMovieClip('focus',1);
	
	trg.focus.onEnterFrame = function(){
		trg.focus.distance_x = (trg._x)-distance_x-300;
		trg.focus.distance_y = (trg._y-35)-distance_y-200;

		// follow to left
		if(trg.focus.distance_x < 0){
			trg.focus.gap_x = trg.focus.distance_x*follow_div;
			trg.focus.gap_x = Math.min(Math.max(trg.focus.gap_x,-follow_max),-follow_min);
			distance_x += parseInt(trg.focus.gap_x);
			
			if(trg.focus.distance_x >= -follow_min){
				distance_x += (trg._x)-distance_x-300;
			}
			
			if(trg.focus.distance_x >= -follow_min && Math.abs(trg.focus.distance_y) <= follow_min){
				removeCustomEfFunc('trg.focus.onEnterFrame');
			}
		}
		
		// follow to right
		if(trg.focus.distance_x > 0){
			trg.focus.gap_x = trg.focus.distance_x*follow_div;
			trg.focus.gap_x = Math.max(Math.min(trg.focus.gap_x,follow_max),follow_min);
			distance_x += parseInt(trg.focus.gap_x);
			
			if(trg.focus.distance_x <= follow_min){
				distance_x += (trg._x)-distance_x-300;
			}
			
			if(trg.focus.distance_x <= follow_min && Math.abs(trg.focus.distance_y) <= follow_min){
				removeCustomEfFunc('trg.focus.onEnterFrame');
			}
		}
		
		// follow to up
		if(trg.focus.distance_y < 0){
			trg.focus.gap_y = trg.focus.distance_y*follow_div;
			trg.focus.gap_y = Math.min(Math.max(trg.focus.gap_y,-follow_max),-follow_min);
			distance_y += parseInt(trg.focus.gap_y);
			
			if(trg.focus.distance_y >= -follow_min){
				distance_y += (trg._y-35)-distance_y-200;
			}
			
			if(trg.focus.distance_y >= -follow_min && Math.abs(trg.focus.distance_x) <= follow_min){
				removeCustomEfFunc('trg.focus.onEnterFrame');
			}
		}
		
		// follow to down
		if(trg.focus.distance_y > 0){
			trg.focus.gap_y = trg.focus.distance_y*follow_div;
			trg.focus.gap_y = Math.max(Math.min(trg.focus.gap_y,follow_max),follow_min);
			distance_y += parseInt(trg.focus.gap_y);
			
			if(trg.focus.distance_y <= follow_min){
				distance_y += (trg._y-35)-distance_y-200;
			}
			
			if(trg.focus.distance_y <= follow_min && Math.abs(trg.focus.distance_x) <= follow_min){
				removeCustomEfFunc('trg.focus.onEnterFrame');
			}
		}
	}
	addCustomEfFunc('trg.focus.onEnterFrame', trg.focus.onEnterFrame);
}

function titan_focus_onUnload()
{
	distance_fix = false;
	distance_x = old_distance_x;
	distance_y = old_distance_y;
	no_player_input = false;
	no_gravity = false;
	next_press_player_camera = true;
	follow = 'ready';
	special = false;
	fake_pose = false;
	raven_fix = false;

	titan.raven_blackswirl_right.mc.visible = false;
	titan.raven_blackswirl_left.mc.visible = false;
	titan.raven_blackswirl_right.mc.stop(0);
	titan.raven_blackswirl_left.mc.stop(0);
}

function focus_to_player(trg){
	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('focus',1);
	titan.focus.onEnterFrame = function(){
		titan.focus.distance_x = titan._x-distance_x-300;
		titan.focus.distance_y = titan._y-35-distance_y-200;
		
		// follow to left
		if (titan.focus != undefined)
		if(titan.focus.distance_x <= 0){
			titan.focus.gap_x = titan.focus.distance_x*follow_div;
			titan.focus.gap_x = Math.min(Math.max(titan.focus.gap_x,-follow_max),-follow_min);
			distance_x += parseInt(titan.focus.gap_x);
			if(titan.focus.distance_x >= -follow_min){
				distance_x += titan._x-distance_x-300;
			}
			
			if(titan.focus.distance_x >= -follow_min && Math.abs(titan.focus.distance_y) <= follow_min){
				removeCustomEfFunc('titan.focus.onEnterFrame');
				titan.focus = undefined;
				titan_focus_onUnload();
			}
		}
		
		// follow to right
		if (titan.focus != undefined)
		if(titan.focus.distance_x > 0){
			titan.focus.gap_x = titan.focus.distance_x*follow_div;
			titan.focus.gap_x = Math.max(Math.min(titan.focus.gap_x,follow_max),follow_min);
			distance_x += parseInt(titan.focus.gap_x);
			
			if(titan.focus.distance_x <= follow_min){
				distance_x += titan._x-distance_x-300;
			}
			
			if(titan.focus.distance_x <= follow_min && Math.abs(titan.focus.distance_y) <= follow_min){
				removeCustomEfFunc('titan.focus.onEnterFrame');
				titan.focus = undefined;
				titan_focus_onUnload();
			}
		}
		
		// follow to up
		if (titan.focus != undefined)
		if(titan.focus.distance_y <= 0){
			titan.focus.gap_y = titan.focus.distance_y*follow_div;
			titan.focus.gap_y = Math.min(Math.max(titan.focus.gap_y,-follow_max),-follow_min);
			distance_y += parseInt(titan.focus.gap_y);
			
			if(titan.focus.distance_y >= -follow_min){
				distance_y += titan._y-35-distance_y-200;
			}
			
			if(titan.focus.distance_y >= -follow_min && Math.abs(titan.focus.distance_x) <= follow_min){
				removeCustomEfFunc('titan.focus.onEnterFrame');
				titan.focus = undefined;
				titan_focus_onUnload();
			}
		}
		
		// follow to down
		if (titan.focus != undefined)
		if(titan.focus.distance_y > 0){
			titan.focus.gap_y = titan.focus.distance_y*follow_div;
			titan.focus.gap_y = Math.max(Math.min(titan.focus.gap_y,follow_max),follow_min);
			distance_y += parseInt(titan.focus.gap_y);
			
			if(titan.focus.distance_y <= follow_min){
				distance_y += titan._y-35-distance_y-200;
			}
			if(titan.focus.distance_y <= follow_min && Math.abs(titan.focus.distance_x) <= follow_min){
				removeCustomEfFunc('titan.focus.onEnterFrame');
				titan.focus = undefined;
				titan_focus_onUnload();
			}
		}
	}
	addCustomEfFunc('titan.focus.onEnterFrame', titan.focus.onEnterFrame);
}
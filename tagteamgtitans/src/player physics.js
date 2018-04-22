function player_physics()
{	
	// makes a loop coord so you can work out which part of the tile titan is on
	titan_x = distance_x+titan_centre_x+((old_distance_x-distance_x)*distance_fix);
	titan_y = distance_y+titan_centre_y-half_tile+((old_distance_y-distance_y)*distance_fix);
	centre_x = titan_x%+tile_size;
	centre_y = titan_y%+tile_size;

	//console.log(distance_x,distance_y, distance_fix);
	
	// turn to coords for array
	tile_h = Math.floor((titan_x)/tile_size);
	tile_v = Math.floor((titan_y)/tile_size);

	if (legal[tile_v] != undefined)
	{
		my_tile = legal[tile_v][tile_h];
		my_left = legal[tile_v][tile_h-1];
		my_right = legal[tile_v][tile_h+1];

		// find below me floor and shelf
		// look at legal / blocked = 0  air = 1
		my_head = legal[tile_v-1][tile_h];
		my_head_left = legal[tile_v-1][tile_h-1];
		my_head_right = legal[tile_v-1][tile_h+1];
	}
	
	if (legal[tile_v+1] != undefined)
	{
		my_floor = legal[tile_v+1][tile_h];
		my_floor_left = legal[tile_v+1][tile_h-1];
		my_floor_right = legal[tile_v+1][tile_h+1];

		// look at shelf / shelf = 1
		my_shelf_head = shelf[tile_v-1][tile_h];
		my_shelf_head_left = shelf[tile_v-1][tile_h-1];
		my_shelf_head_right = shelf[tile_v-1][tile_h+1];
		
		my_shelf_left = shelf[tile_v][tile_h-1];
		my_shelf_right = shelf[tile_v][tile_h+1];	
		
		my_shelf_floor = shelf[tile_v+1][tile_h];
		my_shelf_floor_left = shelf[tile_v+1][tile_h-1];
		my_shelf_floor_right = shelf[tile_v+1][tile_h+1];
		
		// look for damage tile below
		my_floor_damage = floor_damage[tile_v+1][tile_h];
		my_floor_damage_left = floor_damage[tile_v+1][tile_h-1];
		my_floor_damage_right = floor_damage[tile_v+1][tile_h+1];	
	}
	
	//if (false)
	if((my_floor_damage || (((my_floor_damage_left && centre_x < left_adjustment) || (my_floor_damage_right && centre_x > right_adjustment)) && my_floor)) && centre_y >= 35 && !dead){
		reset_invincible();
		no_gravity = false;
		special = false;
		beastboy_state = '';
		hit_person(titan,titan_direction,'n/a',200);
	}
	
	// bottom less pit
	if(tile_v >= parseInt(map_height)+1 && !fall_waiting){
		no_player_input = true;
		freeze_controls = true;
		energy_drain = 0;
		fall_waiting = true;
		
		fade_fx('tt_music_bg'+music);
		
		if(lives >= 1){
			play_fx('tt_lives_lost',0,50);
		}else{
			play_fx('tt_music_defeat',0,100);
		}
		
		dead = true;
		
		titan.createEmptyMovieClip = function(name) {
			titan[name] = {};
		}
		titan.createEmptyMovieClip('hit_wait',3);
		titan.hit_wait.onEnterFrame = function(){
			if (titan.hit_wait.wait == undefined) titan.hit_wait.wait = 0;
			titan.hit_wait.wait++;
			if(titan.hit_wait.wait >= 100){
				beastboy_state = '';
				fall_waiting = false;
				no_player_input = false;
				freeze_controls = false;
				no_gravity = false;
				special = false;
				removeCustomEfFunc('titan.hit_wait.onEnterFrame');
				level_lost();
			}
		}
		addCustomEfFunc('titan.hit_wait.onEnterFrame', titan.hit_wait.onEnterFrame);
	}
	
	// are you on a platform
	on_floor_left = my_floor_left == 0 && centre_x < left_adjustment;
	on_floor_right = my_floor_right == 0 && centre_x > right_adjustment;
	on_floor_middle = my_floor == 0;
	on_floor = centre_y == 35 && (on_floor_middle || on_floor_left || on_floor_right);
	
	// are you on a shelf
	on_shelf_left = my_shelf_floor_left == 1 && centre_x < left_adjustment;
	on_shelf_right = my_shelf_floor_right == 1 && centre_x > right_adjustment;
	on_shelf_middle = my_shelf_floor == 1;
	on_shelf = centre_y == 35 && (on_shelf_middle || on_shelf_left || on_shelf_right) && !dropping;
	
	// jumping up or on legal/air
	if(!(on_floor || on_shelf || on_mover || no_gravity) || bash_head_on_lift || dropping){
		vel -= 2-(0.5*(beastboy_state == 'ram'));
	}
	
	// check for moving shelves
	if(next_time_on){
		the_shelf = mem_shelf;
		titan._y = the_shelf._y;
		vel = 0;
		next_time_on = false;
	}
	
	on_mover = false;
	//delete mem_shelf;
	for(a in all.pieces) {
		item = all.pieces[a];
		if(item.id == 'shelf' && !on_mover){
			if(item._x-titan._x < 10 && item._x-titan._x > -(10+item.dimension)){
				
				// if you are above a shelf / gets ready for next time round to place
				if(vel <=0 && titan._y<item._y){
					if(vel <= titan._y-item.y){
						next_time_on = true;
						mem_shelf = item;
					}
					max_fall = Math.max(titan._y-item.y,vel);
					vel = max_fall;
				}
				
				if(titan._y == item._y){
					on_mover = true;
					the_shelf = item;
					bash_head_on_lift = (my_head == 0 || (my_head_left == 0 && centre_x < left_adjustment) || (my_head_right == 0 && centre_x > right_adjustment)) && centre_y < 35;
				}else{
					//delete the_shelf;
				}
			}
		}
		
		// if you walk through an enemy
		if(item.id == 'enemy' && !hit && !dead && !item.dead && beastboy_state != 'ram' && beastboy_state != 'dino'){
			if(item._y-titan._y <= 50 && item._y-titan._y >= -50){
				if(item._x-titan._x < 10 && item._x-titan._x >= 0){
					hit_person(titan,'left','n/a',15);
				}
				if(item._x-titan._x > -10 && item._x-titan._x < 0){
					hit_person(titan,'right','n/a',15);
				}
			}
		}
	};
	
	// if blocked on mover shelf
	shelf_blocked_x = (right_block && on_mover && the_shelf.x_speed >= 0 && centre_x >= right_adjustment-2) || (left_block && on_mover && the_shelf.x_speed <= 0 && centre_x <= left_adjustment+2);

	// moves you with shelf
	if(on_mover){
		distance_y += the_shelf.y_speed;
		distance_x += the_shelf.x_speed*!shelf_blocked_x;
	}

	// finds the amount to go before you hit floor, if you tile below is floor
	if(((on_floor_middle || on_floor_left || on_floor_right) || ((on_shelf_middle || on_shelf_left || on_shelf_right) && !dropping)    ) && centre_y <= 35 && vel < 0){
		max_fall = (centre_y-half_tile);
		
		if(max_fall == 0 && (vel != -1 && vel != -2)){
			play_fx('tt_fall',0,50);
		}
		
		max_fall = Math.min(max_fall,0);
		vel = Math.max(max_fall,vel);
	}
	
	// if dropping
	if(dropping && !on_shelf){
		dropping = false;
	}
	
	head_block = (my_head == 0 || (my_head_right == 0 && centre_x > right_adjustment && centre_y >= 35) || (my_head_left == 0 && centre_x < left_adjustment && centre_y >= 35)) && vel > 0;
	
	if(head_block){
		vel = Math.min(vel,centre_y-35);
	}
	
	// stop you going through the floor if you travel too fast
	vel = Math.max(vel,-35);
	
	if(beastboy_state != 'bat'){
		y_speed = vel*!no_gravity;
	}
	
	if(beastboy_state == 'bat'){
		y_potential = max_speed*((up || magic_up)-(down || magic_down))*!no_player_input;
		x_speed += acceleration*(x_speed<x_potential);
		x_speed -= acceleration*(x_speed>x_potential);
		y_speed += acceleration*(y_speed<y_potential);
		y_speed -= acceleration*(y_speed>y_potential);
	}
	
	if(beastboy_state == 'bat'){
		if(magic_up){	
			y_speed = Math.min(centre_y-35,y_speed);
		}
		if(magic_down){
			y_speed = Math.max(centre_y-35,y_speed);
		}
		if(magic_left){	
			x_speed = Math.min(centre_x-35,x_speed);
		}
		if(magic_right){	
			x_speed = Math.max(centre_x-35,x_speed);
		}
		
		// do this bit next
		
		magic_up1 = my_left && centre_y <= 69 && centre_y > 35 && left_block && centre_x == left_adjustment && left;
		magic_up2 = my_right && centre_y <= 69 && centre_y > 35 && right_block && centre_x == right_adjustment && right;
		magic_up = magic_up1 || magic_up2;	
		
		magic_down1 = my_left && centre_y >= 0 && centre_y < 35 && left_block && centre_x == left_adjustment && left;
		magic_down2 = my_right && centre_y >= 0 && centre_y < 35 && right_block && centre_x == right_adjustment && right;
		magic_down = magic_down1 || magic_down2;
		
		magic_left1 = my_head && centre_x <= 69 && centre_x > left_adjustment && up_block && centre_y == 35 && up;
		magic_left2 = my_floor && centre_x <= 69 && centre_x > left_adjustment && down_block && centre_y == 35 && down;
		magic_left = magic_left1 || magic_left2;
		
		magic_right1 = my_head && centre_x >= 0 && centre_x < right_adjustment && up_block && centre_y == 35 && up;
		magic_right2 = my_floor && centre_x >= 0 && centre_x < right_adjustment && down_block && centre_y == 35 && down;
		magic_right = magic_right1 || magic_right2;
		
		up_block_condition_1 = my_head == 0;
		up_block_condition_2 = my_head_right == 0 && centre_x > right_adjustment;
		up_block_condition_3 = my_head_left == 0 && centre_x < left_adjustment;
		up_block = up_block_condition_1 || up_block_condition_2 || up_block_condition_3;
		
		down_block_condition_1 = my_floor == 0;
		down_block_condition_2 = my_floor_right == 0 && centre_x > right_adjustment;
		down_block_condition_3 = my_floor_left == 0 && centre_x < left_adjustment;
		down_block = down_block_condition_1 || down_block_condition_2 || down_block_condition_3;
	}
	
	// make true if blocked left or right
	left_block_condition_1 = my_left == 0;
	left_block_condition_2 = my_floor_left == 0 && centre_y > 35;
	left_block_condition_3 = my_head_left == 0 && centre_y < 35;
	left_block_condition_4 = (my_floor == 1 || my_shelf_floor == 0) && my_floor_left == 0 && vel < 0 && centre_y == 35;
	left_block = left_block_condition_1 || left_block_condition_2 || left_block_condition_3 || left_block_condition_4;
	
	right_block_condition_1 = my_right == 0;
	right_block_condition_2 = my_floor_right == 0 && centre_y > 35;
	right_block_condition_3 = my_head_right == 0 && centre_y < 35;
	right_block_condition_4 = (my_floor == 1 || my_shelf_floor == 0) && my_floor_right == 0 && vel < 0 && centre_y == 35;
	right_block = right_block_condition_1 || right_block_condition_2 || right_block_condition_3 || right_block_condition_4;
	
	// 4th = run across gap of one and you get stuck fix;
	
	if(Math.abs(x_speed)<acceleration && !left && !right && !left_block && !right_block){
		x_speed = 0;
	}

	// move titan before caps
	if(beastboy_state != 'bat'){
		x_speed += acceleration*(x_speed<x_potential);
		x_speed -= acceleration*(x_speed>x_potential);
	}
	
	// water push
	if(in_water && !victory){
		x_speed = -water_speed;
	}
	
	// if blocked make a cap for the x_speed
	if(left_block && (x_speed > 0 || left || magic_left)){
		x_speed = Math.max(Math.min(x_speed,centre_x-left_adjustment),0);
	}

	if(right_block && (x_speed < 0 || right || magic_right)){
		x_speed = Math.min(Math.max(x_speed,centre_x-right_adjustment),0);
	}
	
	if(left_block && centre_x < left_adjustment && !hit){
		//trace('bug fix: landing in the wall LEFT');
		distance_x += left_adjustment-centre_x;
	}
	
	if(right_block && centre_x > right_adjustment && !hit){
		//trace('bug fix: landing in the wall RIGHT');
		distance_x += left_adjustment-centre_x;
	}

	if(beastboy_state == 'bat'){		
		if(up_block && (y_speed > 0 || up || magic_up)){
			y_speed = Math.min(y_speed,centre_y-35);
			y_speed = Math.max(y_speed,0);
		}
		
		if(down_block && (y_speed < 0 || down || magic_down)){
			y_speed = Math.max(y_speed,centre_y-35);
			y_speed = Math.min(y_speed,0);
		}
	}

	// found the end square
	if(((end_pos[0] == tile_h || parseInt(end_pos[0])+1 == tile_h) && (end_pos[1] == tile_v || parseInt(end_pos[1]-1) == tile_v)) && end_pos[0] != undefined && !exit_level && !exit_to_next_area && !exit_to_previous_area && !dead){
		beastboy_end_fix();
		freeze_controls = true;

		if(on_floor || !on_shelf){
			titan.createEmptyMovieClip = function(name) {
				titan[name] = {};
			}
			titan.createEmptyMovieClip('exit_wait',12);
			titan.exit_wait.onEnterFrame = function(){
				x_potential = 0;
				x_speed *= 0.9;
				if(on_floor || on_shelf){
					freeze_controls = false;
					level_finish_wait();				
					removeCustomEfFunc('titan.exit_wait.onEnterFrame');
				}
			}
			addCustomEfFunc('titan.exit_wait.onEnterFrame', titan.exit_wait.onEnterFrame);
		}
		exit_level = true;
	}
	
	// found exit to next area
	if((next_pos[0] == tile_h && (next_pos[1] == tile_v || next_pos[1]-1 == tile_v || next_pos[1]-2 == tile_v)) && next_pos[0] != undefined && !exit_to_next_area && !dead){
		temp_x_speed = x_speed;
		temp_tile_v_adj = tile_v-next_pos[1];
		exit_to_next_area = true;
		load_new_area(1);
	}
	
	// found exit to previous area
	if((previous_pos[0] == tile_h && (previous_pos[1] == tile_v || previous_pos[1]-1 == tile_v || previous_pos[1]-2 == tile_v)) && previous_pos[0] != undefined && !exit_to_previous_area && !dead){
		temp_x_speed = x_speed;
		temp_tile_v_adj = tile_v-previous_pos[1];
		exit_to_previous_area = true;
		load_new_area(-1);
	}
	
	// found out to menu
	if((out_pos[0] == tile_h && (out_pos[1] == tile_v || out_pos[1]-1 == tile_v)) && out_pos[0] != undefined && !exit_out && !dead){
		look_fix = false; //?????
		exit_out = true;
		leave_level();
	}
	
	// knocked thourgh when hit fix
	left_out = out_pos[0] == tile_h-1 && (out_pos[1] == tile_v || out_pos[1]-1 == tile_v);
	right_out = out_pos[0] == tile_h+1 && (out_pos[1] == tile_v || out_pos[1]-1 == tile_v);
	
	left_prev = previous_pos[0] == tile_h-1 && (previous_pos[1] == tile_v || previous_pos[1]-1 == tile_v || previous_pos[1]-2 == tile_v);
	right_prev = previous_pos[0] == tile_h+1 && (previous_pos[1] == tile_v || previous_pos[1]-1 == tile_v || previous_pos[1]-2 == tile_v);
	
	left_next = next_pos[0] == tile_h-1 && (next_pos[1] == tile_v || next_pos[1]-1 == tile_v || next_pos[1]-2 == tile_v);
	right_next = next_pos[0] == tile_h+1 && (next_pos[1] == tile_v || next_pos[1]-1 == tile_v || next_pos[1]-2 == tile_v);
	
	hit_left_fix = (left_out || left_prev || left_next) && centre_x <= left_adjustment;
	hit_right_fix = (right_out || right_prev || right_next) && centre_x >= right_adjustment;
	
	// if beastboy is the ram check for enemies cos it's an attack
	if(beastboy_state == 'ram' && x_speed != 0){
		look_for_enemies(1,'green');
	}
	
	// energy drain
	energy -= energy_drain*!dead;
	energy += 0.2*(energy_drain <= 0 && energy < 200 && !cyborg_charge > 0 && !dead);

	energy = Math.max(Math.min(energy,200),0);

	find_power_ups();

	if (interface_ == undefined) return;

	interface_.energy_bar.width = parseInt(138*(energy)/100/2)+1;
	interface_.energy_bar.x = 15;
	interface_.energy_bar.y = 50;

	interface_.health_bar.x = 15;
	interface_.health_bar.y = 23;
}
function prepare_bosses(num){
	switch(num){
		case 1 :	
			boss_num = 0;
			bosses = ['jinx','gismo','mammoth'];
			//bosses = ['gismo'];
			boss_on = bosses[boss_num];
			
			respawn_x = 16;
			respawn_y = 0;
			
			boss1_health = parseInt(vars.boss1_health);
			if(!boss1_start_health){
				boss1_start_health = boss1_health;
				boss1_per = 200/boss1_start_health;
			}

			interface_.boss_bar.health_bar.x = 6;
			interface_.boss_bar.health_bar.y = 6;
			interface_.boss_bar.health_bar.width = parseInt(178*(boss1_health*boss1_per)/100/2)+1;

			pieces_lev = 0;

			all.createEmptyMovieClip = function(val) {
				all[val] = {};
				all[val].timer = 0;
			}
			all.createEmptyMovieClip('boss_timer',400);
			all.boss_timer.onEnterFrame = function(){
				if (all.boss_timer.timer == undefined) all.boss_timer.timer = 0;
				all.boss_timer.timer++;
				if(all.boss_timer.timer == 1000){
					boss_num++;
					boss_num%=bosses.length;
					boss_on = bosses[boss_num];

					all.boss_timer.createEmptyMovieClip = function(val) {
						all.boss_timer[val] = {};
					}
					all.boss_timer.createEmptyMovieClip('boss_wait',1);
					all.boss_timer.boss_wait.onEnterFrame = function(){
						if(!boss_enemy_trg.hit && !boss_enemy_trg.dead && boss_enemy_trg.state == 'levels' && boss_enemy_trg.on_shelf && (boss_enemy_trg.tile_h == 3 || boss_enemy_trg.tile_h == 16)){
							respawn_x = boss_enemy_trg.tile_h;
							respawn_y = boss_enemy_trg.tile_v;
							boss1_health = boss_enemy_trg.health;

							var _gafMovieClip_boss_swap = addGAFMovieClip('boss_swap');
							_gafMovieClip_boss_swap.x = respawn_x*tile_size+half_tile;
							_gafMovieClip_boss_swap.y = respawn_y*tile_size+tile_size;
							allContainer.addChild(_gafMovieClip_boss_swap);
							_gafMovieClip_boss_swap.play();

							all.pieces.boss_swap = {};
							all.pieces.boss_swap.onEnterFrame = function(){
								if (_gafMovieClip_boss_swap.currentFrame == _gafMovieClip_boss_swap.totalFrames) {
									allContainer.removeChild(_gafMovieClip_boss_swap);
									removeCustomEfFunc('all.pieces.boss_swap.onEnterFrame');
								}
							}
							addCustomEfFunc('all.pieces.boss_swap.onEnterFrame', all.pieces.boss_swap.onEnterFrame);

							allContainer.removeChild(boss_enemy_trg.mc);
							all.pieces['enemy'+boss_enemy_trg.ind] = {};
							removeCustomEfFunc('boss.enemy_trg.onEnterFrame');
							removeCustomEfFunc('all.boss_timer.boss_wait.onEnterFrame');
							
							all.boss_timer.timer = 0;
							window['place_'+boss_on]();
						}
					}
					addCustomEfFunc('all.boss_timer.boss_wait.onEnterFrame', all.boss_timer.boss_wait.onEnterFrame);
				}
			}
			addCustomEfFunc('all.boss_timer.onEnterFrame', all.boss_timer.onEnterFrame);
			
			window['place_'+boss_on]();
		break;
		
		case 2 :		
			pieces_lev = 0;			
			boss_num = 0;
			bosses = ['aqualad','speedy','bumble_bee','masy_menos'];
			boss_on = bosses[boss_num];
		
			respawn_x = 16;
			respawn_y = 0;
			
			boss2_health = parseInt(vars.boss2_health);

			
			if(!boss2_start_health){
				boss2_start_health = boss2_health;
				boss2_per = 200/boss2_start_health;
			}
			
			interface_.boss_bar.health_bar.x = 6;
			interface_.boss_bar.health_bar.y = 6;
			interface_.boss_bar.health_bar.width = parseInt(178*(boss2_health*boss2_per)/100/2)+1;

			all.createEmptyMovieClip = function(val) {
				all[val] = {};
			}
			all.createEmptyMovieClip('boss_timer',400);
			all.boss_timer.onEnterFrame = function(){
				if (all.boss_timer.timer == undefined) all.boss_timer.timer = 0;
				all.boss_timer.timer++;
				if(all.boss_timer.timer == 1000){
					boss_num++;
					boss_num%=bosses.length;
					boss_on = bosses[boss_num];

					all.boss_timer.createEmptyMovieClip = function(val) {
						all.boss_timer[val] = {};
					}
					all.boss_timer.createEmptyMovieClip('boss_wait',1);
					all.boss_timer.boss_wait.onEnterFrame = function(){
						if(!boss_enemy_trg.hit && !boss_enemy_trg.dead && boss_enemy_trg.state == 'levels' && boss_enemy_trg.on_shelf && (boss_enemy_trg.tile_h == 3 || boss_enemy_trg.tile_h == 16)){
							
							boss2_health = boss_enemy_trg.health;
							respawn_x = boss_enemy_trg.tile_h;
							respawn_y = boss_enemy_trg.tile_v;
							
							var _gafMovieClip_boss_swap = addGAFMovieClip('boss_swap');
							_gafMovieClip_boss_swap.x = respawn_x*tile_size+half_tile;
							_gafMovieClip_boss_swap.y = respawn_y*tile_size+tile_size;
							allContainer.addChild(_gafMovieClip_boss_swap);
							_gafMovieClip_boss_swap.play();
							
							all.pieces.boss_swap = {};
							all.pieces.boss_swap.onEnterFrame = function(){
								if (_gafMovieClip_boss_swap.currentFrame == _gafMovieClip_boss_swap.totalFrames) {
									allContainer.removeChild(_gafMovieClip_boss_swap);
									removeCustomEfFunc('all.pieces.boss_swap.onEnterFrame');
								}
							}
							addCustomEfFunc('all.pieces.boss_swap.onEnterFrame', all.pieces.boss_swap.onEnterFrame);

							allContainer.removeChild(boss_enemy_trg.mc);
							all.pieces['enemy'+boss_enemy_trg.ind] = {};
							removeCustomEfFunc('boss.enemy_trg.onEnterFrame');
							removeCustomEfFunc('all.boss_timer.boss_wait.onEnterFrame');
						
							all.boss_timer.timer = 0;
							window['place_'+boss_on]();
						}
					}
					addCustomEfFunc('all.boss_timer.boss_wait.onEnterFrame', all.boss_timer.boss_wait.onEnterFrame);
				}
			}
			addCustomEfFunc('all.boss_timer.onEnterFrame', all.boss_timer.onEnterFrame);

			window['place_'+boss_on]();
		break;
		
		case 3 :
			pieces_lev = 0;	
			respawn_x = 16;
			respawn_y = 0;
			
			boss3_health = parseInt(vars.boss3_health);
			
			if(!boss3_start_health){
				boss3_start_health = boss3_health;
				boss3_per = 200/boss3_start_health;
			}

			removeCustomEfFunc('boss.enemy_trg.onEnterFrame');
			
			interface_.boss_bar.health_bar.x = 6;
			interface_.boss_bar.health_bar.y = 6;
			interface_.boss_bar.health_bar.width = parseInt(178*(boss3_health*boss3_per)/100/2)+1;
			
			place_brother_blood();
		break;
	}
}

function pick_level(trg,amount){
	trg.old_level = trg.target_level;
	while(trg.old_level == trg.target_level){
		trg.target_level = parseInt(Math.random()*amount)+1;
	}
};

function boss_dodge_object(trg){
	// jump down if blocked above
	if(trg.my_look_up_legal == 0 && !trg.on_floor && trg.on_shelf){
		if(!trg.drop){
			trg.drop = true;
		}
	}
	
	// jump if not blocked above
	if(trg.my_look_up_legal == 1 && (trg.on_shelf || trg.on_floor)){
		if(!trg.jump_up){
			trg.jump_up = true;
			trg.vel = - 25;
		}
	}
}

function boss1_movement_ai(trg){
	// run stuff
	if(!trg.dead && !trg.hit){
		trg.potential_x = trg.max_speed*((trg._x<trg.dest_x)-(trg._x>trg.dest_x));
		trg.x_speed += trg.acc*(trg.potential_x>trg.x_speed);
		trg.x_speed -= trg.acc*(trg.potential_x<trg.x_speed);
	
		if(trg.x_speed < 0){
			trg.x_speed = Math.min(Math.max(trg.x_speed,(trg.dest_x-trg._x)),0);
		}
		if(trg.x_speed > 0){
			trg.x_speed = Math.max(Math.min(trg.x_speed,(trg.dest_x-trg._x)),0);
		}
	}
	
	// run stop
	if(trg.state == 'run' && trg._x == trg.dest_x){
		trg.running = false;
		trg.state = 'levels';
		trg.level_wait = 40;
	}
	
	// centres
	trg.centre_x = trg._x;
	trg.centre_x %= tile_size;
	trg.centre_y = trg._y+half_tile;
	trg.centre_y %= tile_size;
	
	// the tiles
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile)/tile_size);
	
	trg.my_left = legal[trg.tile_v][trg.tile_h-1];
	trg.my_right = legal[trg.tile_v][trg.tile_h+1];
	
	trg.my_floor = legal[trg.tile_v+1][trg.tile_h];
	trg.my_floor_left = legal[trg.tile_v+1][trg.tile_h-1];
	trg.my_floor_right = legal[trg.tile_v+1][trg.tile_h+1];
	
	trg.my_shelf_left = shelf[trg.tile_v][trg.tile_h-1];
	trg.my_shelf_right = shelf[trg.tile_v][trg.tile_h+1];	
	
	trg.my_shelf_floor = shelf[trg.tile_v+1][trg.tile_h];
	trg.my_shelf_floor_left = shelf[trg.tile_v+1][trg.tile_h-1];
	trg.my_shelf_floor_right = shelf[trg.tile_v+1][trg.tile_h+1];
	
	if (trg.tile_v-1 >= 0)
	{
		trg.my_look_up_shelf = shelf[trg.tile_v-1][trg.tile_h];
		trg.my_look_up_legal = legal[trg.tile_v-1][trg.tile_h];
	}

	// no shelf == 0
	
	// blockers
	trg.left_block = trg.my_left == 0;
	trg.right_block = trg.my_right == 0;
	
	// if a crate is floating do this function
	if(crate_on != undefined){
		detect_crate(trg);
	}
	
	// blockers for walls etc GOOD FOR STATIONARY CRATE
	if(trg.my_left == 0 && trg.x_speed < 0){
		trg.x_speed = Math.min(Math.max(35-trg.centre_x,trg.x_speed),0);
		boss_dodge_object(trg);
	}
	if(trg.my_right == 0 && trg.x_speed > 0){
		trg.x_speed = Math.max(Math.min(35-trg.centre_x,trg.x_speed),0);
		boss_dodge_object(trg);
	}
	
	// smash crate if crushed
	if((trg.left_block && trg.right_obstruction && trg.centre_x < 35) || (trg.right_block && trg.left_obstruction && trg.centre_x > 35)){
		crate_smash(crate_on);
	} 
	
	// are you on a platform
	trg.on_floor_left = trg.my_floor_left == 0 && trg.centre_x < left_adjustment;
	trg.on_floor_right = trg.my_floor_right == 0 && trg.centre_x > right_adjustment;
	trg.on_floor_middle = trg.my_floor == 0;
	trg.on_floor = trg.centre_y == 35 && (trg.on_floor_middle || trg.on_floor_left || trg.on_floor_right);
	
	// are you on a shelf
	trg.on_shelf_left = trg.my_shelf_floor_left == 1 && trg.centre_x < left_adjustment;
	trg.on_shelf_right = trg.my_shelf_floor_right == 1 && trg.centre_x > right_adjustment;
	trg.on_shelf_middle = trg.my_shelf_floor == 1;
	trg.on_shelf = trg.centre_y == 35 && (trg.on_shelf_middle || trg.on_shelf_left || trg.on_shelf_right) && !trg.drop;
	
	// fall
	if(!(trg.on_shelf || trg.on_floor) || trg.drop){
		trg.vel += 2;
	}
	
	// find floor
	if(((trg.on_floor_middle || trg.on_floor_left || trg.on_floor_right) || ((trg.on_shelf_middle || trg.on_shelf_left || trg.on_shelf_right))&& !trg.drop) && trg.centre_y <= 35 && trg.vel > 0 ){
	
		trg.max_fall = (half_tile-trg.centre_y);
		trg.max_fall = Math.max(trg.max_fall,0);
		trg.vel = Math.min(trg.max_fall,trg.vel);
	}
	
	// if drop
	if(trg.drop && !trg.on_shelf && trg.centre_y == 35){
		trg.drop = false;
	}
	
	// if jump_up
	if(trg.jump_up && (trg.on_shelf || trg.on_floor) && trg.centre_y == 35){
		trg.jump_up = false;
	}
	
	trg.vel = Math.min(trg.vel,35);
	trg.y_speed = trg.vel;
	trg._y += trg.y_speed;
	trg._x += trg.x_speed;

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function boss1_animation(trg){
	if(trg.state == 'levels' && !trg.hit && !trg.dead){
		if(titan._x > trg._x){
			trg.ani_direction = 'right';
		}
		
		if(titan._x < trg._x){
			trg.ani_direction = 'left';
		}
	}
	
	if(trg.state == 'run' && !trg.hit && !trg.dead){
		if(trg.x_speed > 0){
			trg.ani_direction = 'right';
		}
		
		if(trg.x_speed < 0){
			trg.ani_direction = 'left';
		}
	}
	
	if(trg.x_speed == 0){
		trg.pose = 'ready';
	}
	
	if(trg.x_speed != 0){
		trg.pose = 'run';
	}
	
	if(trg.vel != 0){
		trg.pose = 'jump';
	}
	
	if(trg.hit){
		trg.pose = 'hit';
	}
	
	if(trg.attacking){
		trg.pose = 'smash';
	}else{
		bb_attack = '';
	}
	
	if(!trg.dead){
		if (trg.mc.get_currentSequence() != trg.pose+bb_attack+' '+trg.ani_direction)
		trg.mc.setSequence(trg.pose+bb_attack+' '+trg.ani_direction);
	}
}

function seeker_ai(trg,damage,p_width){
	if (trg.hm == undefined) trg.hm = 0;
	if (trg.vm == undefined) trg.vm = 0;

	trg._x += trg.hm/trg.weight;
	trg._y += trg.vm/trg.weight; 
	trg.hm = Math.min(Math.max(trg.hm,-20),20);
	trg.vm = Math.min(Math.max(trg.vm,-20),20);
	trg.hm = trg.hm * .98;
	trg.vm = trg.vm * .98;
	trg.hm = trg.hm + (trg._x < titan._x) - (trg._x > titan._x);
	trg.vm = trg.vm + (trg._y < titan._y-35) - (trg._y > titan._y-35);
	
	trg.old_x = trg.new_x;
	trg.old_y = trg.new_y;
	trg.new_x = trg._x;
	trg.new_y = trg._y;
	
	trg.adj = trg.new_x-trg.old_x;
	trg.opp = trg.new_y-trg.old_y;
	trg.ae = (trg.opp*trg.opp)+(trg.adj*trg.adj);
	trg.angle = parseInt((Math.atan(trg.opp/trg.adj)/0.0174)-(180*(trg.adj<0)));
	trg.mc.rotation = Math.radians(trg.angle-180);
	
	if (trg.dist == undefined) trg.dist = 0;
	trg.dist++;
	
	trg.adj = trg.new_x-titan._x;
	trg.opp = trg.new_y-titan._y+35;
	trg.ae = (trg.opp*trg.opp)+(trg.adj*trg.adj);
	trg.distance = Math.abs(Math.sqrt(trg.ae));
	
	if(trg.old_x < trg.new_x){
		trg.ani_direction = 'right';
	}else{
		trg.ani_direction = 'left';
	}
	
	if(trg.distance<25){
		hit_person(titan,trg.ani_direction,'n/a',damage);
		
		//place explosion effect
		pieces_lev++;
		explosion_lev++;
		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
		all.pieces.attachMovie('gizmo_rocketblast','explosion'+explosion_lev,pieces_lev+5000);
		var exp_trg = all.pieces['explosion'+explosion_lev];
		exp_trg._x = trg._x;
		exp_trg._y = trg._y;

		exp_trg.mc.x = exp_trg._x;
		exp_trg.mc.y = exp_trg._y;
		exp_trg.mc.play();
		
		exp_trg.onEnterFrame = function(){
			if(exp_trg.mc.currentFrame == exp_trg.mc.totalFrames){
				allContainer.removeChild(exp_trg.mc);
				remove_onTickEvent_rocket_boom();
			}
		}
		PIXI.ticker.shared.add(add_onTickEvent_rocket_boom);
		function add_onTickEvent_rocket_boom(detla) {
			exp_trg.onEnterFrame();
		}
		function remove_onTickEvent_rocket_boom() {
			PIXI.ticker.shared.remove(add_onTickEvent_rocket_boom);
		}
		
		allContainer.removeChild(trg.mc);
		remove_fire_bullet_ef(trg.ind);
	}
	
	// the tiles
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile)/tile_size);
	trg.my_tile = legal[trg.tile_v][trg.tile_h];

	if(trg.my_tile == undefined || trg.dist > 200){
		//place explosion effect
		pieces_lev++;
		explosion_lev++;

		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
		all.pieces.attachMovie('gizmo_rocketblast','explosion'+explosion_lev,pieces_lev+5000);
		var exp_trg = all.pieces['explosion'+explosion_lev];
		exp_trg._x = trg._x;
		exp_trg._y = trg._y;

		exp_trg.mc.x = exp_trg._x;
		exp_trg.mc.y = exp_trg._y;
		exp_trg.mc.play();
		exp_trg.ind = explosion_lev;

		exp_trg.onEnterFrame = function(){
			if(exp_trg.mc.currentFrame == exp_trg.mc.totalFrames){
				allContainer.removeChild(exp_trg.mc);
				remove_onTickEvent_rocket_boom();
			}
		}
		PIXI.ticker.shared.add(add_onTickEvent_rocket_boom);
		function add_onTickEvent_rocket_boom(detla) {
			exp_trg.onEnterFrame();
		}
		function remove_onTickEvent_rocket_boom() {
			PIXI.ticker.shared.remove(add_onTickEvent_rocket_boom);
		}

		allContainer.removeChild(trg.mc);
		remove_fire_bullet_ef(trg.ind);

		all.pieces['bullet'+trg.ind] = {};
	}
	
	if(crate_on){
		if(Math.abs(crate_on._x-trg._x) < 35 && Math.abs(crate_on._y-trg._y) < 35){
			allContainer.removeChild(trg.mc);
			remove_fire_bullet_ef(trg.ind);
		}
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function stomp_ai(trg,damage,p_width){
	trg._x += trg.dir*trg.speed;
	
	// the tiles
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile)/tile_size);
	trg.my_tile = legal[trg.tile_v][trg.tile_h];
	
	if(trg.mc.currentFrame == trg.mc.totalFrames){
		allContainer.removeChild(trg.mc);
	}
	
	if(Math.abs(trg._x-titan._x) <= p_width && trg._y-titan._y >= 0 && trg._y-titan._y <= 50 && !hit && !dead && !invincible){
		if(trg.dir == -1){
			trg.ani_direction = 'left';
		}else{
			trg.ani_direction = 'right';
		}
		hit_person(titan,trg.ani_direction,'n/a',damage);
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function water_ai(trg,damage,p_width){
	trg._x += trg.dir*trg.speed;
	
	// the tiles
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile)/tile_size);
	trg.my_tile = legal[trg.tile_v][trg.tile_h];
	
	if(Math.abs(trg._x-titan._x) <= p_width && Math.abs(trg._y-titan._y+30) <= 40 && !hit && !dead && !invincible){
		if(trg.dir == -1){
			trg.ani_direction = 'left';
		}else{
			trg.ani_direction = 'right';
		}
		hit_person(titan,trg.ani_direction,'n/a',damage);
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}
function place_aqualad(){
	pieces_lev++;
	enemy_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('aqualad','enemy'+enemy_lev,pieces_lev+2000);
	var enemy_trg = all.pieces['enemy'+enemy_lev];
	enemy_trg.vel = 0;
	enemy_trg.x_speed = 0;
	enemy_trg._x = respawn_x*tile_size+half_tile;
	enemy_trg._y = respawn_y*tile_size+tile_size;
	enemy_trg.dest_x = enemy_trg._x;
	enemy_trg.block_crate = true;
	enemy_trg.id = 'enemy';
	enemy_trg.type = 'aqualad';
	enemy_trg.state = 'levels';
	enemy_trg.health = boss2_health;
	enemy_trg.damage = Number(vars.aqualad_damage);
	enemy_trg.score = Number(vars.boss2_score);
	enemy_trg.per = boss2_per;
	pick_level(enemy_trg,7);
	enemy_trg.max_speed = 9;
	enemy_trg.acc = 3;
	enemy_trg.ind = enemy_lev;
	boss_enemy_trg = enemy_trg;
	allContainer.addChild(enemy_trg.mc);
	
	enemy_trg.onEnterFrame = function(){
		aqualad_move(enemy_trg);
		boss1_movement_ai(enemy_trg);
		boss1_animation(enemy_trg);
	}
	addCustomEfFunc('boss.enemy_trg.onEnterFrame', enemy_trg.onEnterFrame);
}

function aqualad_move(trg){
	trg.my_level = Math.ceil((map_height-1-trg.tile_v)*0.5);
	
	// jump or drop to find target level
	if(trg.vel == 0 && trg.centre_y == 35 && !trg.hit && !trg.dead && !trg.attack_hold){
		// when to fire
		if(!trg.no_attacking && trg.state == 'levels' && trg.old_level_fire != trg.my_level){
			trg.old_level_fire = trg.my_level;
			trg.attack_hold = true;
			fix(40,['aqualad_fire_bullet',[trg]]);
		}

		if(trg.target_level < trg.my_level && !trg.drop){
			trg.drop = true;
		}
		
		if(trg.target_level > trg.my_level && !trg.jump_up && trg.my_look_up_shelf == 1){
			trg.jump_up = true;
			trg.vel = - 25;
		}
		
		// buggy fix for short shelf
		if(trg.target_level > trg.my_level && !trg.jump_up && trg.my_look_up_shelf == 0 && trg.state == 'levels'){
			trg.state = 'run';
		}
		
		if(trg.target_level == trg.my_level){
			trg.on_level = true;
		}
	}	
	
	// if you are on level we will wait for a while then change level
	if(trg.state == 'levels' && !trg.hit && !trg.dead && !trg.attack_hold){
		if(trg.on_level){
			if (trg.level_wait == undefined) trg.level_wait = 0;
			if (trg.turn_count == undefined) trg.turn_count = 0;
			trg.level_wait += trg.vel == 0;
			
			if(trg.level_wait > 25){
				trg.turn_count++;
				trg.turn_count%=3;
				if(!trg.turn_count){
					trg.state = 'run';
				}
				
				if(trg.turn_count){
					pick_level(trg,7);
				}
				
				trg.level_wait = 0;
			}
		}
	}
	
	// run
	if(trg.state == 'run' && !trg.running && !trg.dead && !trg.hit && !trg.attack_hold){
		if(trg.tile_h == 16){
			trg.dest_x = 3*tile_size+half_tile;
		}
		if(trg.tile_h == 3){
			trg.dest_x = 16*tile_size+half_tile;
		}
		trg.running = true;
	}
	
	// check to see if titan is in water
	in_water = false;
	camera_off = false;
	for(a in all.pieces){
		trg.piece = all.pieces[a];
		if(Math.abs(trg.piece._x-titan._x) <= 100 && Math.abs(trg.piece._y-titan._y+30) <= 40 && trg.piece.id == 'water'){
			camera_off = true;
			in_water = true;
			water_speed = trg.piece.dir*trg.piece.speed
		}
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function aqualad_fire_bullet(trg){
	play_fx('tt_aqualad_waterattack',0,100);
	
	trg.attacking = true;
	trg.no_attacking = true;
	//attack_wait
	trg.createEmptyMovieClip = function(val) {
		trg[val] = {};
	}
	trg.createEmptyMovieClip('attack_wait',1);
	trg.attack_wait.onEnterFrame = function(){
		if (trg.attack_wait.wait == undefined) trg.attack_wait.wait = 0;
		trg.attack_wait.wait++;
		if(trg.attack_wait.wait == 10){
			trg.attack_hold = false;
			trg.attacking = false;
		}
		if(trg.attack_wait.wait == 20){
			trg.no_attacking = false;
			remove_onTickEvent_aqualad();
		}
	}

	PIXI.ticker.shared.add(add_onTickEvent_aqualad, trg.attack_wait.onEnterFrame);
	function add_onTickEvent_aqualad(detla) {
		if (trg.attack_wait.onEnterFrame != undefined)
		trg.attack_wait.onEnterFrame();
	}
	function remove_onTickEvent_aqualad() {
		PIXI.ticker.shared.remove(add_onTickEvent_aqualad, trg.attack_wait.onEnterFrame);
	}
	
	pieces_lev++;
	bullet_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('water','bullet'+bullet_lev,pieces_lev+5000);
	var bullet_trg = all.pieces['bullet'+bullet_lev];
	bullet_trg.dir = (trg.ani_direction == 'right')-(trg.ani_direction == 'left');
	bullet_trg.id = 'water';
	bullet_trg._xscale = (100*-bullet_trg.dir)-100;
	bullet_trg._x = trg._x+(bullet_trg.dir*36);
	bullet_trg._y = trg._y-30;
	bullet_trg.speed = 10;

	if (bullet_trg._xscale < 0) bullet_trg.mc.width = -bullet_trg.mc.width;
	allContainer.addChild(bullet_trg.mc);
	bullet_trg.mc.play();

	bullet_trg.onEnterFrame = function(){
		if (bullet_trg.mc.currentFrame == bullet_trg.mc.totalFrames) {
			bullet_trg.mc.setSequence("water_strike_loop");
		}
		water_ai(bullet_trg,trg.damage,100);
	}

	function fire_bullet_ef(val0, val1)
	{
		bullet_trg.onEnterFrame();
	}
	all.BulletFunc['bullet'+bullet_lev] = fire_bullet_ef.bind(trg.damage, bullet_trg);
	PIXI.ticker.shared.add(all.BulletFunc['bullet'+bullet_lev], 'bullet'+bullet_lev);
}
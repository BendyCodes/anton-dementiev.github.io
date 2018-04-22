var dup_lev = 0;

function place_masy_menos(){
	pieces_lev++;
	enemy_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('masy_menos','enemy'+enemy_lev,pieces_lev+2000);
	var enemy_trg = all.pieces['enemy'+enemy_lev];
	enemy_trg.vel = 0;
	enemy_trg.x_speed = 0;
	enemy_trg._x = respawn_x*tile_size+half_tile;
	enemy_trg._y = respawn_y*tile_size+tile_size;
	enemy_trg.dest_x = enemy_trg._x;
	enemy_trg.block_crate = true;
	enemy_trg.id = 'enemy';
	enemy_trg.type = 'masy_menos';
	enemy_trg.state = 'levels';
	enemy_trg.health = boss2_health;
	enemy_trg.damage = Number(vars.masy_menos_damage);
	enemy_trg.score = Number(vars.boss2_score);
	enemy_trg.per = boss2_per;
	pick_level(enemy_trg,7);
	enemy_trg.max_speed = 25;
	enemy_trg.acc = 5;
	enemy_trg.ind = enemy_lev;
	boss_enemy_trg = enemy_trg;
	allContainer.addChild(enemy_trg.mc);

	enemy_trg.onEnterFrame = function(){
		masy_menos_move(enemy_trg);
		boss1_movement_ai(enemy_trg);
		boss1_animation(enemy_trg);
	}
	addCustomEfFunc('boss.enemy_trg.onEnterFrame', enemy_trg.onEnterFrame);
}

function masy_menos_move(trg){
	trg.my_level = Math.ceil((map_height-1-trg.tile_v)*0.5);

	// jump or drop to find target level
	if(trg.vel == 0 && trg.centre_y == 35 && !trg.hit && !trg.dead && !trg.attack_hold){
		
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
				trg.turn_count%=2;
				if(!trg.turn_count){
					trg.state = 'run';
				}
				
				if(trg.turn_count){
					trg.titan_level = Math.ceil((map_height-1-tile_v)*0.5);
					trg.target_level = trg.titan_level;
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
		play_fx('tt_masymenos_rocktogether',0,100);
	}
	
	// if running
	if(trg.running){
		if(trg._y-titan._y <= 50 && trg._y-titan._y >= -50 && !trg.attacking){
			if(trg._x-titan._x < 50 && trg._x-titan._x > -50){
				trg.attacking = true;
				
				trg.createEmptyMovieClip = function(val) {
					trg[val] = {};
				}
				trg.createEmptyMovieClip('mm_wait',4);
				trg.mm_wait.onEnterFrame = function(){
					if (trg.mm_wait.timer == undefined) trg.mm_wait.timer = 0;
					trg.mm_wait.timer++;
					if(trg.mm_wait.timer == 20){
						trg.attacking = false;
						removeCustomEfFunc('trg.mm_wait.onEnterFrame');
					}
				}
				addCustomEfFunc('trg.mm_wait.onEnterFrame', trg.mm_wait.onEnterFrame);
			}
		}

		if (trg.dup == undefined) trg.dup = 0;
		
		trg.dup++;
		trg.dup%=3;
		if(!trg.dup){
			dup_lev++;
			dup_lev%=20;

			all.pieces.attachMovie = function(name, arg) {
				all.pieces[arg] = {};
				all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
			}
			all.pieces.attachMovie('masy_menos','dup'+dup_lev,dup_lev+2500);

			var dup_trg = all.pieces['dup'+dup_lev];
			dup_trg._x = trg._x;
			dup_trg._y = trg._y;
			dup_trg.mc.gotoAndStop(trg.mc.currentFrame);

			dup_trg.mc.x = dup_trg._x;
			dup_trg.mc.y = dup_trg._y;

			allContainer.addChild(dup_trg.mc);

			dup_trg.onEnterFrame = function(){
				dup_trg.mc.alpha -= .05;
				if(dup_trg.mc.alpha <= 0){
					allContainer.removeChild(dup_trg.mc);
					remove_onTickEvent_masy_menos_alpha();
				}
			}

			PIXI.ticker.shared.add(onTickEvent_masy_menos_alpha, dup_trg.onEnterFrame);
			function onTickEvent_masy_menos_alpha(detla) {
				if (dup_trg.onEnterFrame != undefined)
				dup_trg.onEnterFrame();
			}
			function remove_onTickEvent_masy_menos_alpha() {
				PIXI.ticker.shared.remove(onTickEvent_masy_menos_alpha, dup_trg.onEnterFrame);
			}
		}
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}
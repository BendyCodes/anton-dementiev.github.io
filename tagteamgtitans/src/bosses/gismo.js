function place_gismo(){
	pieces_lev++;
	enemy_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('gismo','enemy'+enemy_lev,pieces_lev+2000);
	var enemy_trg = all.pieces['enemy'+enemy_lev];
	enemy_trg.vel = 0;
	enemy_trg.x_speed = 0;
	enemy_trg._x = respawn_x*tile_size+half_tile;
	enemy_trg._y = respawn_y*tile_size+tile_size;
	enemy_trg.dest_x = enemy_trg._x;
	enemy_trg.block_crate = true;
	enemy_trg.id = 'enemy';
	enemy_trg.type = 'gismo';
	enemy_trg.state = 'levels';
	enemy_trg.health = boss1_health;
	enemy_trg.damage = Number(vars.gismo_damage);
	enemy_trg.score = Number(vars.boss1_score);
	enemy_trg.per = boss1_per;
	pick_level(enemy_trg,7);
	enemy_trg.max_speed = 9;
	enemy_trg.acc = 3;
	enemy_trg.ind = enemy_lev;
	boss_enemy_trg = enemy_trg;
	allContainer.addChild(enemy_trg.mc);

	enemy_trg.onEnterFrame = function(){
		gismo_move(enemy_trg);
		boss1_movement_ai(enemy_trg);
		boss1_animation(enemy_trg);
	}
	addCustomEfFunc('boss.enemy_trg.onEnterFrame', enemy_trg.onEnterFrame);
}

var bmb = 0;

function gismo_move(trg){
	trg.my_level = Math.ceil((map_height-1-trg.tile_v)*0.5);
	
	// jump or drop to find target level
	if(trg.vel == 0 && trg.centre_y == 35 && !trg.hit && !trg.dead && !trg.attack_hold){		
	
		// when to fire
		if(!trg.no_attacking && trg.state == 'levels' && trg.old_level_fire != trg.my_level){
			trg.old_level_fire = trg.my_level;

			if (trg.fire_skip == undefined) trg.fire_skip = 0;
			trg.fire_skip++;
			trg.fire_skip%=2;
			if(!trg.fire_skip){
				trg.attack_hold = true;

				if (bmb < 1)
				{
					fix(40,['gismo_fire_bullet',[trg]]);
					//bmb++;
				}
			}
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

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function gismo_fire_bullet(trg){
	play_fx('tt_gizmo_bomb_explosion',0,100);
	
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
		if(trg.attack_wait.wait == 20){
			trg.attack_hold = false;
			trg.attacking = false;
		}
		if(trg.attack_wait.wait == 40){
			trg.no_attacking = false;
			remove_onTickEvent_gismo();
		}
	}

	PIXI.ticker.shared.add(add_onTickEvent_gismo, trg.attack_wait.onEnterFrame);
	function add_onTickEvent_gismo(detla) {
		if (trg.attack_wait.onEnterFrame != undefined)
		trg.attack_wait.onEnterFrame();
	}
	function remove_onTickEvent_gismo() {
		PIXI.ticker.shared.remove(add_onTickEvent_gismo, trg.attack_wait.onEnterFrame);
	}

	pieces_lev++;
	bullet_lev++;
	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('gismo_rocket','bullet'+bullet_lev,pieces_lev+5000);
	var bullet_trg = all.pieces['bullet'+bullet_lev];
	bullet_trg.dir = (trg.ani_direction == 'right')-(trg.ani_direction == 'left');
	bullet_trg._x = trg._x;
	bullet_trg._y = trg._y-50;
	bullet_trg.weight = 5.0;
	bullet_trg.id = 'seeker';
	bullet_trg.ind = bullet_lev;

	allContainer.addChild(bullet_trg.mc);
	bullet_trg.mc.play();

	bullet_trg.onEnterFrame = function(){
		seeker_ai(bullet_trg,trg.damage);
	}

	function fire_bullet_ef(val0, val1)
	{
		bullet_trg.onEnterFrame();
	}
	all.BulletFunc['bullet_'+bullet_lev] = fire_bullet_ef.bind(trg.damage, bullet_trg);
	PIXI.ticker.shared.add(all.BulletFunc['bullet_'+bullet_lev], 'bullet_'+bullet_lev);
}
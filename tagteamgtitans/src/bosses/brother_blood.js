function place_brother_blood(){
	pieces_lev++;
	enemy_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('brother_blood','enemy'+enemy_lev,pieces_lev+2000);
	var enemy_trg = all.pieces['enemy'+enemy_lev];
	enemy_trg.vel = 0;
	enemy_trg.x_speed = 0;
	enemy_trg._x = respawn_x*tile_size+half_tile;
	enemy_trg._y = respawn_y*tile_size+tile_size;
	enemy_trg.dest_x = enemy_trg._x;
	enemy_trg.block_crate = true;
	enemy_trg.id = 'enemy';
	enemy_trg.type = 'brotherblood';
	enemy_trg.state = 'levels';
	enemy_trg.health = boss3_health;
	enemy_trg.damage = Number(vars.brother_blood_damage);
	enemy_trg.score = Number(vars.boss3_score);
	enemy_trg.per = boss3_per;
	pick_level(enemy_trg,7);
	enemy_trg.max_speed = 9;
	enemy_trg.acc = 3;
	enemy_trg.ind = enemy_lev;
	boss_enemy_trg = enemy_trg;
	allContainer.addChild(enemy_trg.mc);

	enemy_trg.onEnterFrame = function(){
		brother_blood_move(enemy_trg);
		boss1_movement_ai(enemy_trg);
		boss1_animation(enemy_trg);
	}
	addCustomEfFunc('boss.enemy_trg.onEnterFrame', enemy_trg.onEnterFrame);
}

function brother_blood_move(trg){
	trg.my_level = Math.ceil((map_height-1-trg.tile_v)*0.5);

	// jump or drop to find target level
	if(trg.vel == 0 && trg.centre_y == 35 && !trg.hit && !trg.dead && !trg.attack_hold){
		
		// when to fire
		if(!trg.no_attacking && trg.state == 'levels' && trg.old_level_fire != trg.my_level){
			trg.old_level_fire = trg.my_level;

			if (trg.fire_type == undefined) trg.fire_type = 0;

			trg.fire_type++;
			trg.fire_type%=3;
			if(!trg.fire_type){
				fix(40,['brother_blood_fire2',[trg]]);
			}else{
				brother_blood_fire1(trg);
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

function brother_blood_fire1(trg){
	play_fx('tt_brotherblood_groundpound',0,100);
	
	//attack_wait
	bb_attack = 1;
	
	trg.attacking = true;
	trg.no_attacking = true;
	trg.attack_hold = true;
	
	trg.createEmptyMovieClip = function(val) {
		trg[val] = {};
	}
	trg.createEmptyMovieClip('attack_wait',1);
	trg.attack_wait.onEnterFrame = function(){
		if (trg.attack_wait.wait == undefined) trg.attack_wait.wait = 0;
		trg.attack_wait.wait++;
		if(trg.attack_wait.wait == 20){
			trg.attacking = false;
			trg.attack_hold = false;
			bb_attack = '';
		}
		if(trg.attack_wait.wait == 100){
			trg.no_attacking = false;
			remove_onTickEvent_brother_blood_fire1();
		}
	}

	PIXI.ticker.shared.add(add_onTickEvent_brother_blood_fire1, trg.attack_wait.onEnterFrame);
	function add_onTickEvent_brother_blood_fire1(detla) {
		if (trg.attack_wait.onEnterFrame != undefined)
		trg.attack_wait.onEnterFrame();
	}
	function remove_onTickEvent_brother_blood_fire1() {
		PIXI.ticker.shared.remove(add_onTickEvent_brother_blood_fire1, trg.attack_wait.onEnterFrame);
	}
	
	pieces_lev++;
	bullet_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('blood_stomp','bullet'+bullet_lev,pieces_lev+5000);
	var bullet_trg = all.pieces['bullet'+bullet_lev];
	bullet_trg.dir = (trg.ani_direction == 'right')-(trg.ani_direction == 'left');
	bullet_trg._xscale = (100*-bullet_trg.dir)-100;
	bullet_trg._x = trg._x + (150*bullet_trg.dir);
	bullet_trg._y = parseInt(trg._y/70)*70;
	bullet_trg.speed = 8;

	if (bullet_trg._xscale < 0) bullet_trg.mc.width = -bullet_trg.mc.width;
	allContainer.addChild(bullet_trg.mc);
	bullet_trg.mc.play();
	
	bullet_trg.onEnterFrame = function(){
		stomp_ai(bullet_trg,trg.damage,80);
	}

	function brother_blood_fire1_bullet_ef(val0, val1)
	{
		bullet_trg.onEnterFrame();
	}
	
	all.BulletFunc['bullet'+bullet_lev] = brother_blood_fire1_bullet_ef.bind(trg.damage, bullet_trg);
	PIXI.ticker.shared.add(all.BulletFunc['bullet'+bullet_lev], 'bullet'+bullet_lev);
}

function brother_blood_fire2(trg){
	play_fx('tt_brotherblood_electronicpush',0,100);
	
	bb_attack = 2;
	
	trg.attacking = true;
	trg.no_attacking = true;
	trg.attack_hold = true;
	
	//attack_wait
	trg.createEmptyMovieClip = function(val) {
		trg[val] = {};
	}
	trg.createEmptyMovieClip('attack_wait',1);
	trg.attack_wait.onEnterFrame = function(){
		if (this.wait == undefined) this.wait = 0;
		this.wait++;
		if(this.wait == 10){
			trg.attack_hold = false;
			trg.attacking = false;
			bb_attack = '';
		}
		if(this.wait == 20){
			trg.no_attacking = false;
			remove_onTickEvent_brother_blood_fire2();
		}
	}

	PIXI.ticker.shared.add(add_onTickEvent_brother_blood_fire2, trg.attack_wait.onEnterFrame);
	function add_onTickEvent_brother_blood_fire2(detla) {
		trg.attack_wait.onEnterFrame();
	}
	function remove_onTickEvent_brother_blood_fire2() {
		PIXI.ticker.shared.remove(add_onTickEvent_brother_blood_fire2, trg.attack_wait.onEnterFrame);
	}
	
	pieces_lev++;
	bullet_lev++;

	all.pieces.attachMovie = function(name, arg) {
		all.pieces[arg] = {};
		all.pieces[arg].mc = new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
	}
	all.pieces.attachMovie('blood','bullet'+bullet_lev,pieces_lev+500);

	var bullet_trg = all.pieces['bullet'+bullet_lev];
	bullet_trg.dir = (trg.ani_direction == 'right')-(trg.ani_direction == 'left');
	bullet_trg._xscale = (100*-bullet_trg.dir)-100;
	bullet_trg._x = trg._x+(bullet_trg.dir*32);
	bullet_trg._y = trg._y-30;
	bullet_trg.speed = 20;

	if (bullet_trg._xscale < 0) bullet_trg.mc.width = -bullet_trg.mc.width;
	allContainer.addChild(bullet_trg.mc);
	bullet_trg.mc.play();
	
	bullet_trg.onEnterFrame = function(){
		bullet_ai(bullet_trg,trg.damage*0.5,60);
	}

	function brother_blood_fire2_bullet_ef(val0, val1)
	{
		bullet_trg.onEnterFrame();
	}
	all.BulletFunc['bullet'+bullet_lev] = brother_blood_fire2_bullet_ef.bind(trg.damage, bullet_trg);
	PIXI.ticker.shared.add(all.BulletFunc['bullet'+bullet_lev], 'bullet'+bullet_lev);
}
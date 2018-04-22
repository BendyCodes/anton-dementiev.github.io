var menu_ref = ['new_game','continue','boss_mode'];

var start_energy = 200;
var start_health = 200;
var start_lives = 3;
var total_levels = 15;

var tile_size = 70;
var half_tile = 35;
var max_speed  = 12;
var acceleration = 4;

var tile_overlap_x = 2;
var tile_overlap_y = 0;
var titan_centre_x = 300;
var titan_centre_y = 235;

var titan_direction = 'right';
var player_on = 'robin';
//player_on = 'cyborg';
//player_on = 'starfire';
//player_on = 'raven';
//player_on = 'beastboy';

var to_sub = false;
var cxdiff = 0;
var camera_glide = 0.1;
var screens;
var beastboy_state = '';
var camera_ref = 1;
var camera_val = 0;
var power_up_ref = ['extra_life','health_up','health_full','energy_full'];

var players_str = ["robin", "cyborg", "starfire", "raven", "beastboy"];

var wobbleStage = "";
var old_p;

var distance_x = 0;
var distance_y = 0;
var old_distance_x = 0;
var old_distance_y = 0;
var distance_fix = false;
var fall_waiting = false;
var exit_out = false;

var say_start = false;

var titan_pos = [];

var x_push = 0;
var temp_x_speed = 0;

var titan_animation = undefined;

var y_potential = 0;


var left_adjustment = 20;
var right_adjustment = 50;

var attacking = false;
var bash_head_on_lift = false;
var exit_to_next_area = false;
var exit_level = false;
var exit_to_previous_area = false;

var boss_mode = false;
var score = 0;

var titan = {};
titan.all = {};

var all = {};
all.BulletFunc = {};
all.PiecesEfFunc = {};
all.customEfFunc = {};

var crate_on;
var energy_drain = undefined;


var moving_shelf_data = [];
var crate_positions = [];
var crate_lev = 0;

var enemy_lev = 0;
var pieces_lev = 0;

var boss_room = false;
var boss_match = undefined;

var fire_wait = false;

var magic_up1 = false;
var magic_up2 = false;
var magic_up = false;
var magic_down1 = false;
var magic_down2 = false;
var magic_down = false;
var magic_left1 = false;
var magic_left2 = false;
var magic_left = false;
var magic_right1 = false;
var magic_right2 = false;
var magic_right = false;

var left_block = false;
var right_block = false;
var up_block = false;
var down_block = false;

var energy_for_special = 0;
var energy_drain = 0;

var inv_cheat = 0;
var invincible_time = 0;
var beastboy_animal_fix = false;

var introsInc = 0;

var gafBundle_instance;

var music = "";

var levels_complete = 0;
var un_lock = false;
var the_stage = 1;
var look_fix  = false;
var old_show_area = undefined;
var no_menu_keys = false;
var sub_move = false;
var old_show_area_fix = undefined;
var sub_flight = false;

var interface_;
var fade = {};

var beastboy_re_ani = undefined;
var get_ready = false;

var boss1_start_health = false;
var boss2_start_health = false;
var boss3_start_health = false;

var boss_enemy_trg;
var explosion_lev = 0;


var levelData_tiles = [];
var levelData_legal = [];
var levelData_shelf = [];
var levelData_map_width = [];
var levelData_map_height = [];
var levelData_tile_set = [];
var levelData_floor_damage = [];
var levelData_pulse_damage = [];
var levelData_moving_shelf = [];
var levelData_crate = [];
var levelData_titan_pos = [];
var levelData_next_pos = [];
var levelData_previous_pos = [];
var levelData_end_pos = [];
var levelData_out_pos = [];
var levelData_power_ups = [];
var levelData_patrol = [];
var levelData_bee = [];
var levelData_white_robot = [];
var levelData_cyborg_clone = [];
var levelData_tentacle = [];
var levelData_fish = [];
var levelData_hoody = [];


var tilemap;

var patrol;



var end_pos;
var next_pos;
var previous_pos;
var out_pos;

var titan = {};

var legal;
var shelf;
var floor_damage;
var map_height;
var moving_shelf;
var tile_set;


//player phys
var on_mover = false;
var no_gravity = false;
var vel = 0;
var next_time_on = false;
var right_block = false;
var left_block = false;
var dropping = false;
var x_speed = 0;
var y_speed = 0;
var max_x = 100;
var max_y = 100;
var titan_x = 0;
var titan_y = 0;
var raven_fix = false;
var player_loaded = false;
var energy;
var energy_drain;
var dead = false;
var hit = false;
var invincible = false;

var pieces_lev = 0;
var shelf_lev = 0;
var bullet_lev = 0;
var smash_lev = 0;

var x_potential = 0;
var in_water = false;

var saved_locally;


function all_pieces_attachMovie(name, piece, nest) {
    all.pieces[piece] = {};
    all.pieces[piece].mc = addGAFMovieClip(name, nest);
    allContainer.addChild(all.pieces[piece].mc);
}

function removeCustomEfFunc(name)
{
	//console.log("remove CustomEfFunc", name, all.customEfFunc[name]);

	PIXI.ticker.shared.remove(all.customEfFunc[name], name);
	all.customEfFunc[name] = undefined;
}

function addCustomEfFunc(name, func)
{
	if (name != undefined && func != undefined)
	{
		removeCustomEfFunc(name);

		all.customEfFunc[name] = func;
		PIXI.ticker.shared.add(all.customEfFunc[name], name);

		//console.log("add CustomEfFunc", name, all.customEfFunc[name]);
	}
	else console.log("custom func error: func is null", name, func);
}

function start_game(){
	removeCustomEfFunc('select_level.onEnterFrame');

	guiContainer.removeChild(interface_);
 	interface_ = addGAFMovieClip("interface", true);
	guiContainer.addChild(interface_);

	addMobileKeys();

	if (boss_match == undefined)
	interface_.boss_bar.visible = false;
	else interface_.boss_bar.visible = true;

 	if (fade.mc == undefined)
 	{
 		fade.mc = addGAFMovieClip("fade", true);
	 	fade.mc.alpha = 0;
	 	fade.mc.visible = false;
		guiContainer.addChild(fade.mc);
 	}

	fade.mc.alpha = 1;
	fade.onEnterFrame = function(){
		fade.mc.alpha -= 0.03;
		if(fade.mc.alpha <= 0){
			no_player_input = false;
			fade.mc.alpha = 0;
			fade.mc.visible = false;
			removeCustomEfFunc('fade.onEnterFrame');
		}
	}
	addCustomEfFunc('fade.onEnterFrame', fade.onEnterFrame);
	
	raven_fix = false;
	
	b=0;
	boss_match = undefined;
	boss_room = false;

	var b=0;
	for (var a=0; a <boss_maps.length; a++) {
        b++;
        if (boss_maps[a] == level) {
            boss_match = b;
        }
    }
	
	key_attack_pressed = true;
	
	y_speed = 0;
	x_speed = 0;
	
	rock_lev = 0;
	smash_lev = 0;
	explosion_lev = 0;
	eye_lev = 0;
	bullet_lev = 0;
	inv_cheat = 0;
	
	
	stop_fx('tt_robin_boomerang_flying');
	stop_fx('tt_raven_hum_whistle');
	
	fade_fx('tt_music_defeat');
	fade_fx('tt_music_maintheme');
	
	
	old_pose = 'blank';
	
	bb_attack = '';
	exit_level = false;
	exit_out = false;
	dead = false;
	hit = false;
	in_water = false;
	boomer_on = false;
	special = false;
	fire_wait = false;
	victory = false;
	victory_waiting = false;
	attacking = false;
	fake_pose = false;
	
	key_special = false;
	key_special_pressed = true;
	
	
	if(player_on == 'raven'){
		no_gravity = false;
	}

	
	guiContainer.removeChild(screens);

	if (debugScale)
	{
		interface_.width = realW;
		interface_.height = realH;
	}


	if (boss_match == undefined)
		interface_.boss_bar.visible = false;
		else interface_.boss_bar.visible = true;

	//interface_.lives.gotoAndStop(lives+1);
	numbers(2,'l',lives,interface_);
	
	
	interface_.health_bar.width = parseInt(178*(health)/100/2)+1;
	interface_.energy_bar.width = parseInt(138*(energy)/100/2)+1;

	
	if(!boss_match && say_start){
		say_start = false;
		play_fx(player_on+'_start',0,100);
	}
	if(boss_match){
		say_start = false;
		play_fx(player_on+'_boss'+boss_match,0,100);
		interface_.boss_bar.gotoAndStop(2);
	}
	
	
	if(boss_mode){
		interface_.clock.gotoAndStop(2);
		stop_clock = false;
		tick_tock();		
	}else{
		interface_.clock.gotoAndStop(1);
	}
	
	legal = maps['map'+level].legal;
	tiles = maps['map'+level].tiles;
	shelf = maps['map'+level].shelf;
	floor_damage = maps['map'+level].floor_damage;
	tile_set = maps['map'+level].tile_set;
	map_width = maps['map'+level].map_width;
	map_height = maps['map'+level].map_height;

	titan_pos = [];
	titan_pos[0] = maps['map'+level].titan_pos[0];
	titan_pos[1] = maps['map'+level].titan_pos[1];
	
	next_pos = maps['map'+level].next_pos;
	previous_pos = maps['map'+level].previous_pos;
	end_pos = maps['map'+level].end_pos;
	out_pos = maps['map'+level].out_pos;
	moving_shelf = maps['map'+level].moving_shelf;
	crate = maps['map'+level].crate;
	power_ups = maps['map'+level].power_ups;
	patrol = maps['map'+level].patrol;
	cyborg_clone = maps['map'+level].cyborg_clone;
	white_robot = maps['map'+level].white_robot;
	bee = maps['map'+level].bee;
	fish = maps['map'+level].fish;
	tentacle = maps['map'+level].tentacle;
	hoody = maps['map'+level].hoody;
	
	draw_map(map_list.indexOf(level));
	place_pieces(map_list.indexOf(level));
	
	if(boss_match){
		boss_room = true;
		prepare_bosses(boss_match);
	
		if(boss_match == 1){
			music = 1;
		}
		if(boss_match == 2){
			music = 2;
		}
		if(boss_match == 3){
			music = 4;
		}
		
		play_fx('tt_music_bg'+music,1000,100);
	}
	
	scored(0);
};

function new_game(){
	score = 0;
	show_win = true;
	lives = start_lives;
	vel = 0;
	titan_direction = 'right';
	exit_to_next_area = false;
	exit_to_previous_area = false;
	saved_locally.data.stats.levels_complete = 0;
	saved_locally.data.stats.lives = start_lives;
	saved_locally.data.stats.score = 0;
	levels_complete = saved_locally.data.stats.levels_complete;
	saveGameProcess();

	lives = saved_locally.data.stats.lives;
	the_stage = levels_complete;
}

function start_level(num){
	remove_all();
	
	say_start = true;
	
	energy = start_energy;
	health = start_health;
	vel = 0;
	titan_direction = 'right';
	exit_to_next_area = false;
	exit_to_previous_area = false;
	beastboy_ani = '';
	
	the_stage = num-1;
	level = num*10-10;

	guiContainer.removeChild(screens);
	
	if(num < 15){
		music = 3;
	}
	if(num <= 10){
		music = 2;
	}
	if(num <= 5){
		music = 1;
	}
	if(num == 15){
		music = 4;
	}
	
	if(num != 5 && num != 10 && num != 15){
		play_fx('tt_music_bg'+music,1000,100);
	}
	
	get_ready = true;
	start_game();
}

function retry_level(){
	get_ready = true;
	energy = start_energy;
	health = start_health;
	vel = 0;
	titan_direction = 'right';
	play_fx('tt_music_bg'+music,1000,100);
	start_game();
}

function sort_level_locks(trg){
	look_at = levels_complete+1;

	if(!un_lock){
		look_at = the_stage+(exit_out+look_fix);
	}
	look_fix = false;
	
	hex_state = [];
	for(a=1;a<=total_levels;a++){
		if(a <= levels_complete+1){
			hex_state[a-1] = 'unlocked';
		}
		if(a == levels_complete+1 && un_lock){
			hex_state[a-1] = 'just_unlocked';
		}
		if(a > levels_complete+1){
			hex_state[a-1] = 'locked';

		}
	}
	
	pre_switch_area(0,trg);

	screens.area["fog"+show_area].play();
    screens.area["barpress"+show_area].play();
    screens.area["tower"+show_area].gotoAndPlay(1);
	
	trg.onEnterFrame = function(){
		key_space = key_attack;
		
		if(key_left && !pressed_left && !un_lock && !no_menu_keys && !sub_move){
			pressed_left = true;
			
			if(hex_state[look_at-2] != 'locked'){
				pre_switch_area(-1,trg);
				play_fx('tt_gen_mouserollover',0,100);
			}else{
				play_fx('tt_gen_mouseneg',0,100);
			}
		}
		
		if(!key_left){
			pressed_left = false;
		}
		
		if(key_right && !pressed_right && !un_lock && !no_menu_keys && !sub_move){
			pressed_right = true;
			
			if(hex_state[look_at] != 'locked'){
				pre_switch_area(1,trg);
				play_fx('tt_gen_mouserollover',0,100);
			}else{
				play_fx('tt_gen_mouseneg',0,100);
			}
		}
		
		
		if(!key_right){
			pressed_right = false;
		}
		
		
		if(key_space && !pressed_space && !un_lock && !no_menu_keys && !sub_move){
			pressed_space = true;
			check_to_play();
			removeCustomEfFunc('select_level.onEnterFrame');
		}
		if(!key_space){
			pressed_space = false;
		}
	}
	addCustomEfFunc('select_level.onEnterFrame', trg.onEnterFrame);
}

function pre_switch_area(amt,trg){
	
	look_at += amt;
	look_at = Math.min(Math.max(look_at,1),15);
	
	if(look_at <= 15){
		show_area = 3;
	}
	if(look_at <= 10){
		show_area = 2;
	}
	if(look_at <= 5){
		show_area = 1;
	}
	
	start_look = 5*(show_area-1)+1;

	if(old_show_area == undefined){
		old_show_area = show_area;
	}
	
	old_start_look = 5*(old_show_area-1)+1;
	
	
	if(show_area != old_show_area){	
		// no unlocking to next area
		if(!un_lock){
			
			if(show_area < old_show_area){
				sub = 'down';
			}
			if(show_area > old_show_area){
				sub = 'up';
			}
			
			no_menu_keys = true;

			old_show_area_fix = old_show_area;
			
			trg.area['sub_'+sub+old_show_area_fix].sub_main.gotoAndPlay(2);
			sub_move = true;
				
			sub_flight = true;
			trg.createEmptyMovieClip = function(name) {
				trg[name] = {};
			}
			trg.createEmptyMovieClip('subby',1);
			trg.subby.onEnterFrame = function(){
				if(trg.area['sub_'+sub+old_show_area_fix].sub_main.currentFrame == trg.area['sub_'+sub+old_show_area_fix].sub_main.totalFrames){
					for(a in trg.area){
						//trg.area[a].removeMovieClip();
					}
					no_menu_keys = false;
					switch_area(amt,trg);
					sub_flight = false;

					screens.area["fog"+show_area].play();
				    screens.area["barpress"+show_area].play();
				    screens.area["tower"+show_area].gotoAndPlay(1);

					removeCustomEfFunc('trg.subby.onEnterFrame');
				}
			}
			addCustomEfFunc('trg.subby.onEnterFrame', trg.subby.onEnterFrame);
			
			for(a=old_start_look;a<old_start_look+5;a++){
				//trg.area['hex'+a].org_depth = hex_depth[a-old_start_look];
				//trg.area['hex'+a].swapDepths(trg.area['hex'+a].org_depth);
				trg.area['hex'+a].gotoAndStop(hex_state[a-1]);
			}
			
			trg.area['heads'+old_show_area]["player"+head_to]["head_"+player_on].sized.gotoAndStop(2);
			//trg.area['heads'+old_show_area].gotoAndStop(6);

			old_show_area = show_area;
		}
		
		// if unlocking to next area
		
		if(un_lock && (look_at == 6 || look_at == 11)){
			to_sub = true;
			no_menu_keys = true;
			
			trg.area.gotoAndStop(old_show_area);

			if (old_show_area == 1 || old_show_area == 2)
			trg.area["sub_up"+old_show_area].sub_main.sub.gotoAndStop('just_unlocked');

			if (old_show_area == 2 || old_show_area == 3)
			trg.area["sub_down"+old_show_area].sub_main.sub.gotoAndStop('unlocked');
			
			for(a=old_start_look;a<old_start_look+5;a++){
				//trg.area['hex'+a].org_depth = hex_depth[a-old_start_look];
				//trg.area['hex'+a].swapDepths(trg.area['hex'+a].org_depth);
				trg.area['hex'+a].gotoAndStop('unlocked');
			}
			
			
			// make it top
			//trg.area['heads'+old_show_area].swapDepths(200);
			// sends it to the right frame
			trg.area['heads'+old_show_area].gotoAndStop(5);
			trg.area['heads'+old_show_area]["player"+head_to].gotoAndStop(player_on);
			trg.area['heads'+old_show_area]["player"+head_to]["head_"+player_on].gotoAndStop(2);
			trg.area['heads'+old_show_area]["player"+head_to]["head_"+player_on].bounce.gotoAndPlay(1);

			trg.onEnterFrame = function(){
				var clip = trg.area['heads'+old_show_area]["player"+head_to]["head_"+player_on].bounce;

				if(clip.currentFrame == clip.totalFrames){
					clip.stop();
					removeCustomEfFunc("head.onEnterFrame");
					goto_sub();
				}
			}
			addCustomEfFunc("head.onEnterFrame", trg.onEnterFrame);
		}
	}else{
		switch_area(amt,trg);
	}
}

function goto_sub(){
	if (old_show_area == 1 || old_show_area == 2)
	{
		//screens.area["sub_up"+old_show_area].sub_main.gotoAndStop(1);
		screens.area["sub_up"+old_show_area].sub_main.sub.gotoAndStop(2);
		screens.area["sub_up"+old_show_area].sub_main.sub.sub_unlock_anim.gotoAndPlay(1);
		//screens.area["sub_up"+old_show_area].sub_main.sub.sub_unlock_anim.play();
	}
	else return;


	screens.createEmptyMovieClip = function(name) {
		screens[name] = {};
	}
	screens.createEmptyMovieClip('subby1',1);
	screens.subby1.onEnterFrame = function(){
		var ssub1 = screens.area["sub_up"+old_show_area].sub_main.sub.sub_unlock_anim;
		if(ssub1.currentFrame == ssub1.totalFrames){
			removeCustomEfFunc('screens.subby1.onEnterFrame');
			screens.area["sub_up"+old_show_area].sub_main.gotoAndPlay(2);
			screens.area['heads'+old_show_area]["player"+head_to]["head_"+player_on].gotoAndStop(1);
			screens.area['heads'+old_show_area]["player"+head_to]["head_"+player_on].sized.gotoAndStop(2);
			
			screens.createEmptyMovieClip = function(name) {
				screens[name] = {};
			}
			screens.createEmptyMovieClip('subby',1);
			screens.subby.onEnterFrame = function(){
				var ssub2 = screens.area["sub_up"+old_show_area].sub_main;

				if(ssub2.currentFrame == ssub2.totalFrames){
					hex_state[old_start_look+4] = 'unlocked';
					un_lock = false;
					old_show_area = show_area;
					un_lock = false;
					switch_area(1,screens);
					no_menu_keys = false;
					to_sub = false;
					removeCustomEfFunc('screens.subby.onEnterFrame');
				}
			}
			addCustomEfFunc('screens.subby.onEnterFrame', screens.subby.onEnterFrame);
		}
	}
	addCustomEfFunc('screens.subby1.onEnterFrame', screens.subby1.onEnterFrame);
}

function switch_area(amt,trg){
	
	trg.area.gotoAndStop(show_area);
	
	trg.max_head = 0;
	
	bounce_head = false;
	for(a=start_look;a<start_look+5;a++){
		//trg.area['hex'+a].org_depth = hex_depth[a-start_look];
		//trg.area['hex'+a].swapDepths(trg.area['hex'+a].org_depth);
		trg.area['hex'+a].gotoAndStop(hex_state[a-1]);

		if(hex_state[a-1] != 'locked'){
			trg.max_head = a-start_look+1;
		}
		if(hex_state[a-1] == 'just_unlocked'){
			if (trg.area['hex'+a].unlock_anim != undefined)
			trg.area['hex'+a].unlock_anim.gotoAndPlay(1);
			bounce_head = true;
		}
	}

	if (hex_state[look_at-1] != "just_unlocked")
	{
		trg.area['hex'+look_at].gotoAndStop(hex_state[look_at-1]+'_over');

		if (trg.area['hex'+look_at].hex_glow != undefined)
			trg.area['hex'+look_at].hex_glow.gotoAndPlay(1);
	}
	else trg.area['hex'+look_at].gotoAndStop(hex_state[look_at-1]);

	if(hex_state[look_at-1] != 'locked' && !bounce_head){
		trg.area['hex'+look_at].parent.addChild(trg.area['hex'+look_at]);
	}
	
	
	// make it top
	//trg.area['heads'+show_area].swapDepths(200);
	trg.area['heads'+show_area].parent.addChild(trg.area['heads'+show_area]);

	// sends it to the right frame
	head_to = Math.min(look_at-start_look+1-(un_lock),trg.max_head);
	trg.area['heads'+show_area].gotoAndStop(head_to);
	
	// if no head should be on map
	if(head_to == 0){
		trg.area['heads'+show_area].gotoAndStop(6);
	}
	
	// to the right player
	trg.area['heads'+show_area]["player"+head_to].gotoAndStop(player_on);
	// if bounce
	if(bounce_head){
		trg.area['heads'+show_area]["player"+head_to]["head_"+player_on].gotoAndStop(2);
		trg.area['heads'+show_area]["player"+head_to]["head_"+player_on].bounce.gotoAndPlay(1);

		trg.onEnterFrame = function(){
			var clip = trg.area['heads'+show_area]["player"+head_to]["head_"+player_on].bounce;

			if(clip.currentFrame == clip.totalFrames){
				removeCustomEfFunc("head.onEnterFrame");
				move_head_along();
			}
		}
		addCustomEfFunc("head.onEnterFrame", trg.onEnterFrame);
	}else{
		trg.area['heads'+show_area]["player"+head_to]["head_"+player_on].gotoAndStop(1);
	}
	// to the right size
	trg.area['heads'+show_area]["player"+head_to]["head_"+player_on].sized.gotoAndStop(1+(hex_state[look_at-1] == 'locked' || hex_state[look_at-1] == 'locked_over'));

	// locked the up sub
	if(hex_state[start_look+4] == 'unlocked'){
		if (show_area == 1 || show_area == 2)
		trg.area["sub_up"+show_area].sub_main.sub.gotoAndStop('unlocked');
	}
	
	// locked the down sub
	if(hex_state[start_look-2] != 'locked'){
		if (show_area == 2 || show_area == 3)
		trg.area["sub_down"+show_area].sub_main.sub.gotoAndStop('unlocked');
	}
	
	
	// fix lock thing
	trg.createEmptyMovieClip = function(name) {
		trg[name] = {};
	}
	trg.createEmptyMovieClip('fix',101);
	trg.fix.onEnterFrame = function (){
		if (show_area == 2 || show_area == 3)
		if(trg.area["sub_down"+show_area].sub_main.sub != undefined){
			trg.area["sub_down"+show_area].sub_main.sub.gotoAndStop('unlocked');
			removeCustomEfFunc('trg.fix.onEnterFrame');
		}
	}
	addCustomEfFunc('trg.fix.onEnterFrame', trg.fix.onEnterFrame);
	
	
	// the head gets stuck if you bash keys whiel in sub
	trg.createEmptyMovieClip = function(name) {
		trg[name] = {};
	}
	trg.createEmptyMovieClip('sub_fix',102);	
	trg.sub_fix.onEnterFrame = function (){
		if(!sub_flight){
			sub_move = false; 
		}
	}
	addCustomEfFunc('trg.sub_fix.onEnterFrame', trg.sub_fix.onEnterFrame);
}

function move_head_along(){
	un_lock = false;
	hex_state[levels_complete] = 'unlocked';
	switch_area(0,screens);
}

function check_to_play(){
	if(hex_state[look_at-1] != 'locked'){
		play_fx('tt_gen_mousedown',0,100);
		
		if(look_at == 1 || look_at == 6 || look_at == 11){
			show_screen('intro'+look_at);
			playIntros('intro'+look_at);
		}else{
			start_level(look_at);
		}
	}else{
		play_fx('tt_gen_mouseneg',0,100);
	}
}

function draw_map(val){
	console.log("generate Level", val);

	if (tilemap != null) tilemap.clear();
	tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [], false);
    allContainer.addChild(tilemap);

	var levelTileInd = 0;
 	for (var levelY = 0; levelY < levelData_map_height[val]; levelY++)
 	for (var levelX = 0; levelX < levelData_map_width[val]; levelX++)
 	{
 		var fn0 = "";
 		for (var fn = 0; fn < 4-levelData_tiles[val][levelTileInd].toString().length; fn++) fn0 += "0".toString();

		var tileMapBmp = pixiGetSprite("tiles" + levelData_tile_set[val] + fn0 + levelData_tiles[val][levelTileInd]);
		tilemap.addFrame(tileMapBmp.texture, (tile_size)*levelX, (tile_size)*levelY);

	 	levelTileInd++;
 	}
	
	pieces_lev = 0;
	
	// moving shelves
	shelf_lev = 0;
	var moving_shelf = levelData_moving_shelf[val];
 	for (var a = 0; a < levelData_moving_shelf[val].length; a++)
 	{
		pieces_lev++;
		shelf_lev++;

		var shelf_trg = {};

		all.pieces["moving_shelf" + shelf_lev] = shelf_trg;

		shelf_trg.mc = addGAFMovieClip("moving_shelf");
		shelf_trg._x = moving_shelf[a][0]*tile_size;
		shelf_trg._y = moving_shelf[a][1]*tile_size;
		
      
        shelf_trg.mc.x = shelf_trg._x;
        shelf_trg.mc.y = shelf_trg._y;
        shelf_trg.coords = [[moving_shelf[a][0], moving_shelf[a][1]], [moving_shelf[a][2], moving_shelf[a][3]]];
        shelf_trg.mc.gotoAndStop(levelData_tile_set[val] * 10 + parseInt(moving_shelf[a][4]));
        shelf_trg.dimension = parseInt(shelf_trg.mc.width / 70) * tile_size;
        shelf_trg.dest = 1;
        shelf_trg.dest_x = shelf_trg.coords[shelf_trg.dest][0] * tile_size;
        shelf_trg.dest_y = shelf_trg.coords[shelf_trg.dest][1] * tile_size;
        shelf_trg.id = "shelf";
        shelf_trg.mem_y = [];
        shelf_trg.mem_x = [];
        shelf_trg.mem_ys = [];
        shelf_trg.mem_xs = [];

        shelf_trg.x_speed = 0;
        shelf_trg.y_speed = 0;
        shelf_trg.x = shelf_trg._x;
        shelf_trg.y = shelf_trg._y;

        moving_shelf_data[a] = shelf_trg;

        allContainer.addChild(shelf_trg.mc);
 	}
	
	power_up_positions = [];
	// power_ups
	power_up_lev = 0;
	for (a in levelData_power_ups[val])
 	{
 		power_ups = levelData_power_ups[val];

 		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}

		pieces_lev++;
		power_up_lev++;
        var temp_power_up = power_up_ref[parseInt(power_ups[a][2]) - 1];


        all.pieces.attachMovie(temp_power_up, "power_up" + power_up_lev, pieces_lev + 3000);
        var power_up_trg = all.pieces["power_up" + power_up_lev];

        power_up_trg._x = power_ups[a][0] * tile_size + half_tile;
        power_up_trg._y = power_ups[a][1] * tile_size + half_tile;
        power_up_trg.mc.stop();
        power_up_trg.id = temp_power_up;
        power_up_trg.ind = power_up_lev;
        power_up_positions.push(power_up_trg);

        power_up_trg.wobble = {};
        power_up_trg.wobble.onEnterFrame = function (_this)
        {
            _this.w = _this.w + 0.150000;
            _this.wa = Math.cos(_this.w) * 6;
            _this._y = _this.sy + _this.wa;

            _this.mc.x = _this._x;
        	_this.mc.y = _this._y;
        };

        power_up_trg.mc.x = power_up_trg._x;
        power_up_trg.mc.y = power_up_trg._y;

        power_up_trg.w = power_up_trg._y;
        power_up_trg.wa = power_up_trg._y;
        power_up_trg.sy = power_up_trg._y;

        all.customEfFunc['power_up'+power_up_lev] = power_up_trg.wobble.onEnterFrame.bind(null, power_up_trg);
		PIXI.ticker.shared.add(all.customEfFunc['power_up'+power_up_lev], 'power_up'+power_up_lev);
    }


	if (levelData_tile_set[val] < 3 || levelData_tile_set[val] > 3) wobbleStage = "wobble1";
	else wobbleStage = "wobble2";

	crate_positions = [];
	crate_lev = 0;	
	var crate = levelData_crate[val];
    for (var a = 0; a < crate.length; a++)
    {
		pieces_lev++;
		shelf_lev++;
		all.pieces.attachMovie = function(name, piece) {
			all_pieces_attachMovie(name, piece, true);
		}
		all.pieces.attachMovie('crate','crate'+crate_lev,pieces_lev+4000);
        var crate_trg = all.pieces["crate" + crate_lev];
        crate_trg._x = crate[a][0] * tile_size + half_tile;
        crate_trg._y = crate[a][1] * tile_size + tile_size;
     	
     	if (wobbleStage == "wobble1")
        crate_trg.mc.gotoAndStop(1);
    	else crate_trg.mc.gotoAndStop(3);

        crate_trg.id = "crate";
        legal[crate[a][1]][crate[a][0]] = 0;
        crate_positions.push(crate_trg);

        crate_trg.mc.x = crate_trg._x;
        crate_trg.mc.y = crate_trg._y;
        crate_trg.mc.y = crate_trg._y;

        //crate_trg.x_speed = 0;
		//crate_trg.y_speed = 0;
    }
}

function place_pieces(val){
	
	// place patrol
	enemy_lev = 0;

	var patrol = levelData_patrol[val];
 	for (var a = 0; a < patrol.length; a++)
 	{
		pieces_lev++;
		enemy_lev++;
		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
		all.pieces.attachMovie('patrol','enemy'+enemy_lev,pieces_lev+2000);
		var enemy_trg = all.pieces['enemy'+enemy_lev];
		enemy_trg._x = patrol[a][0]*tile_size+half_tile;
		enemy_trg._y = patrol[a][1]*tile_size+tile_size;
		enemy_trg.path = [patrol[a][2]*tile_size+35, patrol[a][4]*tile_size+35];
		enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
		enemy_trg.mc.gotoAndPlay(1);
		enemy_trg.path_dir = 0;
		enemy_trg.block_crate = true;
		enemy_trg.id = 'enemy';
		enemy_trg.type = 'patrol';
		enemy_trg.bullet_id = enemy_trg.type+pieces_lev;
		enemy_trg.health = parseInt(vars.patrol_health);
		enemy_trg.damage = parseInt(vars.patrol_damage);
		enemy_trg.score = parseInt(vars.patrol_score);

		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
 	}
	
	// place cyborg_clone
	var cyborg_clone = levelData_cyborg_clone[val];
	for (var a = 0; a < cyborg_clone.length; a++)
 	{
        pieces_lev++;
        enemy_lev++;
        all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
        all.pieces.attachMovie("cyborg_clone", "enemy" + enemy_lev, pieces_lev + 2000);
        var enemy_trg = all.pieces["enemy" + enemy_lev];
        enemy_trg._x = cyborg_clone[a][0] * tile_size + half_tile;
        enemy_trg._y = cyborg_clone[a][1] * tile_size + tile_size;
        enemy_trg.path = [cyborg_clone[a][2] * tile_size + 35, cyborg_clone[a][4] * tile_size + 35];
        enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
        enemy_trg.mc.gotoAndPlay(1);
        enemy_trg.path_dir = 0;
        enemy_trg.block_crate = true;
        enemy_trg.id = "enemy";
        enemy_trg.type = "cyborg_clone";
        enemy_trg.bullet_id = enemy_trg.type + pieces_lev;
        enemy_trg.health = parseInt(vars.cyborg_clone_health);
        enemy_trg.damage = parseInt(vars.cyborg_clone_damage);
        enemy_trg.score = parseInt(vars.cyborg_clone_score);
     	
		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
	}
	
	// place white_robot
	var white_robot = levelData_white_robot[val];
 	for (var a = 0; a < white_robot.length; a++)
 	{
		pieces_lev++;
		enemy_lev++;
		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
		all.pieces.attachMovie("white_robot", "enemy" + enemy_lev, pieces_lev + 2000);
		var enemy_trg = all.pieces["enemy" + enemy_lev];
		enemy_trg._x = white_robot[a][0]*tile_size+half_tile;
		enemy_trg._y = white_robot[a][1]*tile_size+tile_size;
		enemy_trg.path = [white_robot[a][2]*tile_size+35,white_robot[a][4]*tile_size+35];
		enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
		enemy_trg.mc.gotoAndPlay(1);
		enemy_trg.path_dir = 0;
		enemy_trg.block_crate = true;
		enemy_trg.id = 'enemy';
		enemy_trg.type = 'white_robot';
		enemy_trg.bullet_id = enemy_trg.type+pieces_lev;
		enemy_trg.health = parseInt(vars.white_robot_health);
		enemy_trg.damage = parseInt(vars.white_robot_damage);
		enemy_trg.score = parseInt(vars.white_robot_score);

		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
 	}
	
	// place bee
	var bee = levelData_bee[val];
 	for (var a = 0; a < bee.length; a++)
 	{
		pieces_lev++;
		enemy_lev++;
		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
		all.pieces.attachMovie("bee", "enemy" + enemy_lev, pieces_lev + 2000);
		var enemy_trg = all.pieces["enemy" + enemy_lev];
		enemy_trg._x = bee[a][0]*tile_size+half_tile;
		enemy_trg._y = bee[a][1]*tile_size+tile_size;
		enemy_trg.path = [bee[a][2]*tile_size+35,bee[a][4]*tile_size+35];
		enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
		enemy_trg.mc.gotoAndPlay(1);
		enemy_trg.path_dir = 0;
		enemy_trg.block_crate = true;
		enemy_trg.id = 'enemy';
		enemy_trg.type = 'bee';
		enemy_trg.bullet_id = enemy_trg.type+pieces_lev;
		enemy_trg.health = parseInt(vars.bee_health);
		enemy_trg.damage = parseInt(vars.bee_damage);
		enemy_trg.score = parseInt(vars.bee_score);

		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
 	}
	
	// place fish
	var fish = levelData_fish[val];
	for (var a = 0; a < levelData_fish[val].length; a++)
 	{
		pieces_lev++;
        enemy_lev++;
        all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
        all.pieces.attachMovie("fish", "enemy" + enemy_lev, pieces_lev + 2000);
        var enemy_trg = enemy_trg = all.pieces["enemy" + enemy_lev];
        enemy_trg._x = fish[a][0] * tile_size + half_tile;
        enemy_trg._y = fish[a][1] * tile_size + tile_size;
        enemy_trg.path = [fish[a][2] * tile_size + 35, fish[a][4] * tile_size + 35];
        enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
        enemy_trg.mc.gotoAndPlay(1);
        enemy_trg.path_dir = 0;
        enemy_trg.block_crate = true;
        enemy_trg.id = "enemy";
        enemy_trg.type = "fish";
        enemy_trg.bullet_id = enemy_trg.type + pieces_lev;
        enemy_trg.health = parseInt(vars.fish_health);
        enemy_trg.damage = parseInt(vars.fish_damage);
        enemy_trg.score = parseInt(vars.fish_score);

		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
	}
	
	// place tentacle
	var tentacle = levelData_tentacle[val];
	for (var a = 0; a < tentacle.length; a++)
 	{
        pieces_lev++;
        enemy_lev++;
        all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
        all.pieces.attachMovie("tentacle", "enemy" + enemy_lev, pieces_lev + 2000);
        var enemy_trg = all.pieces["enemy" + enemy_lev];
        enemy_trg._x = tentacle[a][0] * tile_size + half_tile;
        enemy_trg._y = tentacle[a][1] * tile_size + tile_size;
        enemy_trg.path = [tentacle[a][2] * tile_size + 35, tentacle[a][4] * tile_size + 35];
        enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
        enemy_trg.mc.gotoAndPlay(1);
        enemy_trg.path_dir = 0;
        enemy_trg.block_crate = true;
        enemy_trg.id = "enemy";
        enemy_trg.type = "tentacle";
        enemy_trg.bullet_id = enemy_trg.type + pieces_lev;
        enemy_trg.health = parseInt(vars.tentacle_health);
        enemy_trg.damage = parseInt(vars.tentacle_damage);
        enemy_trg.score = parseInt(vars.tentacle_score);
		
		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
	}
	
	// place hoody
	var hoody = levelData_hoody[val];
 	for (var a = 0; a < hoody.length; a++)
 	{
		pieces_lev++;
        enemy_lev++;
        all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}
        all.pieces.attachMovie("hoody", "enemy" + enemy_lev, pieces_lev + 2000);
        var enemy_trg = all.pieces["enemy" + enemy_lev];
        enemy_trg._x = hoody[a][0] * tile_size + half_tile;
        enemy_trg._y = hoody[a][1] * tile_size + tile_size;
        enemy_trg.path = [hoody[a][2] * tile_size + 35, hoody[a][4] * tile_size + 35];
        enemy_trg.limits = enemy_trg.path.sort(function(a,b){return a>b});
        enemy_trg.mc.gotoAndPlay(1);
        enemy_trg.path_dir = 0;
        enemy_trg.block_crate = true;
        enemy_trg.id = "enemy";
        enemy_trg.type = "hoody";
        enemy_trg.bullet_id = enemy_trg.type + pieces_lev;
        enemy_trg.health = parseInt(vars.hoody_health);
        enemy_trg.damage = parseInt(vars.hoody_damage);
        enemy_trg.score = parseInt(vars.hoody_score);

		enemy_trg.x_speed = 0;
		enemy_trg.ind = enemy_lev;
	}
	
	titan.mc = addGAFMovieClip(player_on);

	pieces_lev++;
	all.pieces.titan = titan;
	
	titan.id = 'titan';
	titan.block_crate = true;


	titan.raven_blackswirl_left = {};
	titan.raven_blackswirl_left.attachMovie = function(name) {
		titan.raven_blackswirl_left.mc = addGAFMovieClip(name, true);
		titan.raven_blackswirl_left.mc.stop();
		allContainer.addChild(titan.raven_blackswirl_left.mc);
		titan.raven_blackswirl_left.mc.width = -titan.raven_blackswirl_left.mc.width;
		titan.raven_blackswirl_left.mc.visible = false;
	}
	titan.raven_blackswirl_left.attachMovie('raven_blackswirl','raven_blackswirl_left',0);

	titan.raven_blackswirl_right = {};
	titan.raven_blackswirl_right.attachMovie = function(name) {
		titan.raven_blackswirl_right.mc = addGAFMovieClip(name, true);
		titan.raven_blackswirl_right.mc.stop();
		allContainer.addChild(titan.raven_blackswirl_right.mc);
		
		titan.raven_blackswirl_right.mc.visible = false;
	}
	titan.raven_blackswirl_right.attachMovie('raven_blackswirl','raven_blackswirl_right',0);


	allContainer.addChild(titan.mc);
	
	
	if(beastboy_ani != ''){
		energy_drain = temp_energy_drain;
		temp_energy_drain = 0;
		beastboy_energy_loop();
	}
	
	// if beastboy was mid transform
	if(beastboy_re_ani){
		
		if(beastboy_re_ani.f == true){
			beastboy_ani = '';
			beastboy_state = '';
		}
		
		if(beastboy_re_ani.f == false || beastboy_re_ani.f == undefined){
			if(beastboy_ani == 'to ram' || beastboy_ani == 'to dino' || beastboy_ani == 'to bat'){
				beastboy_ani = beastboy_re_ani.sw;
				beastboy_state = beastboy_re_ani.sw;
				energy_drain = beastboy_re_ani.e;
			}
			if(beastboy_ani == 'from ram' || beastboy_ani == 'from dino' || beastboy_ani == 'from bat'){
				beastboy_ani = '';
				beastboy_state = '';
			}
		}
		
		transforming = false;
		beastboy_from = false;
		removeCustomEfFunc('titan.ani_wait.onEnterFrame');
	}

	// if there is no previous point you are at the start of the level so use titan_pos     > starting
	// if there is a previous point, and exit_to_next_area = true, place titan x+1 from previous_pos    >   going ahead
	// if there is a next point, and exit_to_previous_area = true, place titan x-1 from next_pos    >   going back

	
	if(temp_x_speed > 0){
		x_push = -1;
	}
	if(temp_x_speed < 0){
		x_push = 1;
	}
	
	if(temp_x_speed == 0){
		if(titan_direction == 'right'){
			x_push = 1;
		}
		if(titan_direction == 'left'){
			x_push = -1;			
		}
	}
	
	
	if(exit_to_next_area || titan_pos[0] == ''){
		titan_pos[0] = parseInt(previous_pos[0])+x_push;
		titan_pos[1] = previous_pos[1];
		if(temp_tile_v_adj){
			titan_pos[1] = parseInt(titan_pos[1]);
			titan_pos[1] += temp_tile_v_adj;
		}
		exit_to_next_area = false;
	}
	
	
	if(exit_to_previous_area){
		titan_pos[0] = parseInt(next_pos[0])+x_push;
		titan_pos[1] = next_pos[1];
		if(temp_tile_v_adj){
			titan_pos[1] = parseInt(titan_pos[1]);
			titan_pos[1] += temp_tile_v_adj;
		}
		//delete temp_tile_v_adj;
		exit_to_previous_area = false;
	}
	
	

	distance_x = (titan_pos[0]-4)*tile_size+14;
	distance_y = (titan_pos[1]-3)*tile_size+45;


	//debug
	if (end_pos[0] != undefined)
	{
		//distance_x = (end_pos[0] - 4) * tile_size + 14;
	    //distance_y = (end_pos[1] - 3) * tile_size + 45;
	}
    //console.log(titan_pos, end_pos);

	interface_.players[player_on].gotoAndPlay(2);
	
	if(get_ready){
		titan._x = titan_centre_x+distance_x;
		titan._y = titan_centre_y+distance_y;
		
		no_player_input = true;
		freeze_controls = true;
		
		interface_.txt.gotoAndStop('ready');
		interface_.txt.ready_clip.gotoAndPlay(1);
		interface_.txt.onEnterFrame = function(){
			x_speed = 0;
			x_potential = 0;
			if(interface_.txt.ready_clip.currentFrame == interface_.txt.ready_clip.totalFrames){
				no_player_input = false;
				freeze_controls = false;
				interface_.txt.gotoAndStop(1);
				removeCustomEfFunc("interface_.txt.onEnterFrame");
			}
		}
		addCustomEfFunc("interface_.txt.onEnterFrame", interface_.txt.onEnterFrame);

		get_ready = false;
	}

	player_loaded = true;
}

function hit_person(trg,dir,no_effect,damage,colour){
	if(trg.id == 'enemy'){
		
		if(boss_match){
			trg.attack_hold = false;
		}
		
		// incase it was waiting for the attack
		trg.attacking = false;
		trg.no_attacking = false;

		removeCustomEfFunc('enemy_lev'+trg.ind);

		if(beastboy_state == 'ram'){
			play_fx('ram_hit',0,100);	
		}else{
			play_fx('tt_enemy_hit'+(parseInt(Math.random()*2)+1),0,100);		
		}

		//damage = 100;

		
		trg.health -= damage;
		trg.health = Math.max(trg.health,0);
		
		if(boss_match){
			interface_.boss_bar.health_bar.x = 6;
			interface_.boss_bar.health_bar.y = 6;
			interface_.boss_bar.health_bar.width = parseInt(178*(trg.health*trg.per)/100/2)+1;
		}
		
		
		if(dir == 'right'){
			trg.ani_direction = 'left';
		}
		
		if(dir == 'left'){
			trg.ani_direction = 'right';
		}
		
		trg.temp_x_speed = (-20*(trg.ani_direction == 'right'))+(20*(trg.ani_direction == 'left'));
		
		if((player_on == 'raven' && !crate_on) || beastboy_ani == 'ram'){
			trg.temp_x_speed *= 2;
		}
		
		
		trg.hit = true;
		
		trg.x_potential = 0;
		
		//place explosion effect
		pieces_lev++;
		explosion_lev++;

		all.pieces.attachMovie = function(name, piece) {
		    all_pieces_attachMovie(name, piece);
		}

		all.pieces.attachMovie(colour+'_explosion','explosion'+explosion_lev,pieces_lev+5000);
		var exp_trg = all.pieces['explosion'+explosion_lev];

		exp_trg._x = trg._x;
		exp_trg._y = trg._y-35;

		exp_trg.ind = pieces_lev;
		exp_trg.mc.play();

		exp_trg.onEnterFrame = function(){
			if(exp_trg.mc.currentFrame == exp_trg.mc.totalFrames){
				exp_trg.removeMovieClip = function() {
					allContainer.removeChild(exp_trg.mc);
					PIXI.ticker.shared.remove(all.PiecesEfFunc['pieces_lev'+exp_trg.ind], 'pieces_lev'+exp_trg.ind);
					all.PiecesEfFunc['pieces_lev'+exp_trg.ind] = undefined;
				}
				exp_trg.removeMovieClip();
			}
		}

		all.PiecesEfFunc['pieces_lev'+exp_trg.ind] = exp_trg.onEnterFrame;
		PIXI.ticker.shared.add(all.PiecesEfFunc['pieces_lev'+exp_trg.ind], 'pieces_lev'+exp_trg.ind);

		exp_trg.mc.x = exp_trg._x;
		exp_trg.mc.y = exp_trg._y;
		
		// hit
		if(trg.health > 0){
			trg.hit = true;

			trg.createEmptyMovieClip = function(name) {
				trg[name] = {};
			}
			trg.createEmptyMovieClip('hit_wait',2);
			trg.hit_wait.onEnterFrame = function(){
				trg.temp_x_speed *= 0.8;
				if (Math.abs(trg.temp_x_speed) < 0.001) trg.temp_x_speed = 0;
				trg.x_speed = parseInt(trg.temp_x_speed);
				//trg.body.play();
				if (trg.hit_wait.wait == undefined) trg.hit_wait.wait = 0;
				trg.hit_wait.wait++;
				if(trg.hit_wait.wait >= 20*1){
					trg.hit = false;
					trg.hit_wait.wait = 0;
					removeCustomEfFunc('enemy_hit_wait'+trg.ind, trg.hit_wait.onEnterFrame);
				}
			}
			addCustomEfFunc('enemy_hit_wait'+trg.ind, trg.hit_wait.onEnterFrame);
		
			trg.mc.setSequence('hit '+trg.ani_direction);
		}
		
		// dead
		if(trg.health <= 0){
			// clear bullets
			for(a in all.pieces){
				if(all.pieces[a].id != undefined){
					if(all.pieces[a].id == 'bullet_'+trg.bullet_id){
						allContainer.removeChild(all.pieces[a].mc);
						//all.pieces[a] = {};
						remove_fire_bullet_ef(all.pieces[a].ind);
					}
				}
			}
			
			
			if(!boss_room){
				play_fx('dead_enemy'+(parseInt(Math.random()*2)+1),0,100);
			}
			
			
			if(boss_room && !victory_waiting){
				


				//trg.attachMovie('boss_beat','boss_beat',7);
				
				if(boss_match != 3){
					play_fx('boss_die',0,100);
				}else{
					play_fx('blood_die',0,100);
				}
				
				play_fx(player_on+'_victory',0,100);
				
				fade_fx('tt_music_bg'+music);
				
				
				if(trg.type == 'brotherblood'){
					play_fx('tt_brotherblood_defeat',0,100);
				}
				
				
				victory_waiting = true;
				
				
				if(beastboy_state != ''){
					beastboy_special();
				}
				
				// not boss mode
				if(!boss_mode){
					victory = true;

					titan.createEmptyMovieClip = function(name) {
						titan[name] = {};
					}
					titan.createEmptyMovieClip('victory_wait',7);
					titan.victory_wait.onEnterFrame = function(){
						no_player_input = true;
						freeze_controls = true;
						x_speed = 0;
						if (titan.victory_wait.wait == undefined) titan.victory_wait.wait = 0;
						titan.victory_wait.wait++;
						if(titan.victory_wait.wait == 100){
							freeze_controls = false;
							level_finish_wait();
							removeCustomEfFunc('titan.victory_wait.onEnterFrame');
						}
					}
					addCustomEfFunc('titan.victory_wait.onEnterFrame', titan.victory_wait.onEnterFrame);
				}
				
				// if boss mode
				if(boss_mode){
					titan.createEmptyMovieClip = function(name) {
						titan[name] = {};
					}
					titan.createEmptyMovieClip('victory_wait',7);
					titan.victory_wait.onEnterFrame = function(){
						if(vel == 0 && (on_floor || on_shelf || on_mover)){
							freeze_controls = true;
							no_player_input = true;
							x_speed = 0;
							victory = true;
							if (titan.victory_wait.wait == undefined) titan.victory_wait.wait = 0;
							titan.victory_wait.wait++;
							stop_clock = true;
							removeCustomEfFunc('interface_.clock.onEnterFrame');
							if(titan.victory_wait.wait >= 160){
								if(boss_match < 3){
									next_boss_match();
								}else{
									//all.removeMovieClip();
									//interface_.removeMovieClip();
									show_screen('boss_won');
									screens.boss_back.stars1.gotoAndPlay(1);
									screens.boss_back.stars2.gotoAndPlay(1);
									screens.boss_back.stars3.gotoAndPlay(1);
									screens.boss_back.stars4.gotoAndPlay(1);
									screens.boss_back.boss_clouds.gotoAndPlay(1);
									screens.boss_back.boss_head1.gotoAndPlay(1);
									screens.boss_back.boss_head2.gotoAndPlay(1);

									remove_all();

									boss_results();

								
									var boss_won = {};
									boss_won.onEnterFrame = function(){
										key_space = key_attack;
										
										if(key_space && !pressed_space){
											pressed_space = true;
											menu_works();
											play_fx('tt_music_maintheme',1000,50);
											removeCustomEfFunc('boss_won.onEnterFrame');
											removeCustomEfFunc('screens.best_time_ef.onEnterFrame');
										}
										if(!key_space){
											pressed_space = false;
										}
									}
									addCustomEfFunc('boss_won.onEnterFrame', boss_won.onEnterFrame);


									play_fx('tt_music_victory',1000,100);

									
								}
								freeze_controls = false;
								removeCustomEfFunc('titan.victory_wait.onEnterFrame');
							}
						}
					}
					addCustomEfFunc('titan.victory_wait.onEnterFrame', titan.victory_wait.onEnterFrame);
				}
			}
			
			scored(parseInt(trg.score));
			trg.dead = true;
			

			trg.createEmptyMovieClip = function(name) {
				trg[name] = {};
			}
			trg.createEmptyMovieClip('hit_wait',2);
			trg.hit_wait.onEnterFrame = function(){
				trg.temp_x_speed *= 0.8;
				if (Math.abs(trg.temp_x_speed) < 0.001) trg.temp_x_speed = 0;
				trg.x_speed = parseInt(trg.temp_x_speed);
				//trg.body.play();
				
				if (trg.hit_wait.wait == undefined) trg.hit_wait.wait = 0;
				trg.hit_wait.wait++;
				
				if(trg.hit_wait.wait >= 20 && !boss_room){
					if (trg.inv == undefined) trg.inv = 0;
					trg.inv+=0.3;
					trg.inv%=2;
					trg.mc.visible = Math.floor(trg.inv);
				}
				
				if(trg.hit_wait.wait >= 60 && !boss_room){
					removeCustomEfFunc('enemy_lev'+trg.ind);
					removeCustomEfFunc('enemy_hit_wait'+trg.ind, trg.hit_wait.onEnterFrame);
				}
			}
			addCustomEfFunc('enemy_hit_wait'+trg.ind, trg.hit_wait.onEnterFrame);

			trg.mc.setSequence('defeat '+trg.ani_direction);
		}
	}
	
	
	
	// titan hits
	if(trg.id == 'titan' && (!no_effect || no_effect == "n/a") && !victory && !invincible){
		play_fx('tt_contact_hit_human',0,100);
		stop_fx('tt_cyborg_cannon_charge_loop');
		cyborg_charge = 0;
		
		
		if(player_on == 'raven'){
			removeCustomEfFunc('titan.pose_wait.onEnterFrame');
		}
		
		if(beastboy_state != 'ram' && beastboy_state != 'dino'){
			x_potential = 0;	
			vel = 0;	
			if(dir == 'right'){
				titan_direction = 'left';
			}
			if(dir == 'left'){
				titan_direction = 'right';
			}
			temp_x_speed = (-20*(dir == 'right'))+(20*(dir == 'left'));
			 
			if(crate_on){
				drop_crate(the_crate);
			}
		}
		
		// health drain
		
		//debug
		//damage = 0;
		health -= damage-((damage*0.5)*(beastboy_state == 'dino'));
		health = Math.max(health,0);

		if (health < 1) 
		{
			//health = 200;
			console.log("its dead, regeneration!");
		}
		
		interface_.health_bar.width = parseInt(178*(health)/100/2)+1;

		
		// hit
		if(health > 0){
			
			
			titan_invincible();
			
			play_fx(player_on+'_hit',0,100);
			
			
			if(beastboy_state != 'ram' && beastboy_state != 'dino'){
				hit = true;
			}
			
			if(beastboy_state == 'dino' || beastboy_state == 'ram'){
				beastboy_animal_fix = true;
			}
			
			titan.createEmptyMovieClip = function(name) {
				titan[name] = {};
			}
			titan.createEmptyMovieClip('hit_wait',3);
			titan.hit_wait.onEnterFrame = function(){
				//titan.all.body.play();
				if (titan.hit_wait.wait == undefined) titan.hit_wait.wait = 0;
				titan.hit_wait.wait++;
				temp_x_speed *= 0.8;
				if (Math.abs(trg.temp_x_speed) < 0.001) trg.temp_x_speed = 0;
				//knocks you back, but not if you are in water, on not if you are animal
				if(!in_water && beastboy_state != 'dino' && beastboy_state != 'ram'){
					x_speed = parseInt(temp_x_speed);
				}
				
				
				// stop from being hit through wall
				if((left_block || hit_left_fix) && x_speed > 0){
					x_speed = Math.max(Math.min(x_speed,centre_x-left_adjustment),0);
				}
				if((right_block || hit_right_fix) && x_speed < 0){
					x_speed = Math.min(Math.max(x_speed,centre_x-right_adjustment),0);
				}
				
				if(((hit && x_speed == 0 && vel == 0) || beastboy_animal_fix) && titan.hit_wait.wait >= 20 && !in_water){
					beastboy_animal_fix = false;
					hit = false;
					x_speed = 0;
					removeCustomEfFunc('titan.hit_wait.onEnterFrame');
				}
				if(in_water && titan.hit_wait.wait >= 20){
					hit = false;
					removeCustomEfFunc('titan.hit_wait.onEnterFrame');
				}
			}
			addCustomEfFunc('titan.hit_wait.onEnterFrame', titan.hit_wait.onEnterFrame);
		}
		
		
		// dead
		if(health <= 0){
			trg.attachMovie = function(name) {
				titan.dead_fx = {};
			    titan.dead_fx.mc = addGAFMovieClip("boss_beat");
				titan.dead_fx.mc.play();
				allContainer.addChild(titan.dead_fx.mc);
			}
			trg.attachMovie('boss_beat','boss_beat',11);
			
			fade_fx('tt_music_bg'+music);
			
			if(lives >= 1){
				play_fx('tt_lives_lost',0,50);
			}else{
				play_fx('tt_music_defeat',0,100);
			}

			
			// if beastboy was an animal
			beastboy_ani = '';
			beastboy_state = '';
			transforming = false;
			beastboy_from = false;
			//delete beastboy_re_ani;
			beastboy_re_ani = {};
			removeCustomEfFunc('titan.ani_wait.onEnterFrame');
			
			
			dead = true;

			titan.createEmptyMovieClip = function(name) {
				titan[name] = {};
			}
			titan.createEmptyMovieClip('hit_wait',3);
			titan.hit_wait.onEnterFrame = function(){
				//titan.all.body.play();
				if (titan.hit_wait.wait == undefined) titan.hit_wait.wait = 0;
				titan.hit_wait.wait++;

				temp_x_speed *= 0.8;
				if (Math.abs(temp_x_speed) < 0.001) temp_x_speed = 0;
				x_speed = parseInt(temp_x_speed);
				
				// stop from being hit through wall
				if((left_block || hit_left_fix) && x_speed > 0){
					x_speed = Math.max(Math.min(x_speed,centre_x-left_adjustment),0);
				}
				if((right_block || hit_right_fix) && x_speed < 0){
					x_speed = Math.min(Math.max(x_speed,centre_x-right_adjustment),0);
				}
				
				if(titan.hit_wait.wait == 50){
					play_fx(player_on+'_defeat',0,100);
				}
				
				if(titan.hit_wait.wait == 150 && lives >= 1){
					//attachMovie('fade','fade',1100);
					fade.mc.visible = true;
					fade.mc.alpha = 0;
					fade.onEnterFrame = function(){
						fade.mc.alpha += 0.03;
					}
					addCustomEfFunc('fade.onEnterFrame', fade.onEnterFrame);
				}
				
				if(titan.hit_wait.wait == 130 && lives < 1){
					interface_.txt.gotoAndStop('game_over');
					interface_.txt.gameover_clip.gotoAndPlay(1);

					interface_.txt.onEnterFrame = function(){
						if(interface_.txt.gameover_clip.currentFrame == interface_.txt.gameover_clip.totalFrames){
							//interface_.txt.gotoAndStop(1);
						}

						if(titan.hit_wait.wait == 210){
							fade.mc.visible = true;
							fade.mc.alpha = 0;
							fade.onEnterFrame = function(){
								fade.mc.alpha += 0.03;
							}
							x_speed = 0;
							vel = 0;
							removeCustomEfFunc("interface_.txt.onEnterFrame");
							//removeCustomEfFunc('titan.hit_wait.onEnterFrame');
							addCustomEfFunc('fade.onEnterFrame', fade.onEnterFrame);



						}
					}
					addCustomEfFunc("interface_.txt.onEnterFrame", interface_.txt.onEnterFrame);
				}
				
				if(dead && x_speed == 0 && (vel == 0 || my_tile == undefined) && fade.mc.alpha >= 1){
					dead = false;
					x_speed = 0;

					titan.hit_wait.wait = undefined;

					removeCustomEfFunc('titan.hit_wait.onEnterFrame');
					removeCustomEfFunc('fade.onEnterFrame');
					level_lost();
				}
			}
			addCustomEfFunc('titan.hit_wait.onEnterFrame', titan.hit_wait.onEnterFrame);
		}
	}
}

function titan_invincible(){
	invincible = true;

	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('invincible',4);
	titan.invincible.onEnterFrame = function(){
		if (titan.invincible.inv == undefined) titan.invincible.inv = 0;
		titan.invincible.inv+=0.3;
		titan.invincible.inv%=2;

		if(!inv_cheat){
			invincible_time++;
		}

		titan.mc.visible = Math.floor(titan.invincible.inv);
		if(invincible_time >= 60){
			titan.mc.visible = 1;
			invincible_time = 0;
			invincible = false;

			removeCustomEfFunc('titan_invincible_onEnterFrame');
		}
	}
	addCustomEfFunc('titan_invincible_onEnterFrame', titan.invincible.onEnterFrame);
}

function reset_invincible(){
	removeCustomEfFunc('titan_invincible_onEnterFrame');
	invincible_time = 0;
	invincible = false;

	if (titan != undefined && titan.mc != undefined)
	titan.mc.visible = 1;
}

function level_lost(){
	continue_locked = false;
	saved_locally.data.stats.score = score;
	saveGameProcess();
	transforming = '';
	beastboy_ani = '';
	energy_drain = 0;
	
	
	lives--;
	
	
	reset_invincible();	
	
	no_player_input = false;
	freeze_controls = false;
	
	if(lives < 0){
		lives = saved_locally.data.stats.lives;

		console.log("level_lost menu_works", saved_locally);

		remove_all();
		//fade.removeMovieClip();
		//all.removeMovieClip();
		//interface_.removeMovieClip();
		menu_works();
		stop_fx('tt_music_defeat');
		play_fx('tt_music_maintheme',1000,50);
	}else{

		console.log("retry_level");

		remove_all();
		retry_level();
	}
}

function level_won(){
	remove_all();

	the_stage++;
	reset_invincible();	
	
	saved_locally.data.stats.lives = lives;
	
	if(the_stage > levels_complete){
		saved_locally.data.stats.levels_complete = the_stage;
		
		levels_complete = the_stage;
		if(levels_complete < 15){
			un_lock = true;
		}		
	}

	
	if(the_stage < total_levels || !show_win){
		play_fx('tt_music_maintheme',1000,50);
		show_screen('level_select');
	}
	
	if(the_stage == total_levels && show_win){
		console.log('unlock info to shared');
		saved_locally.data.stats.bosses_unlocked = true;
		show_screen('game_won');
		show_win = false;
		numbers(6,'p',score,screens);
		play_fx('tt_music_victory',1000,100);
		continue_locked = false;

		var game_won_ef = {};
		game_won_ef.onEnterFrame = function(){
			key_space = key_attack;
			
			if(key_space && !pressed_space){
				pressed_space = true;
				menu_works();
				play_fx('tt_music_maintheme',1000,50);
				removeCustomEfFunc('game_won_ef.onEnterFrame');
			}
			if(!key_space){
				pressed_space = false;
			}
		}
		addCustomEfFunc('game_won_ef.onEnterFrame', game_won_ef.onEnterFrame);
	}
	
	//attachMovie('fade','fade',1100);
	fade.mc.alpha = 1;
	fade.onEnterFrame = function(){
		fade.mc.alpha -= 0.03;
		if(fade.mc.alpha <= 0){
			removeCustomEfFunc('fade.onEnterFrame');
		}
	}
	addCustomEfFunc('fade.onEnterFrame', fade.onEnterFrame);
	
	//all.removeMovieClip();
	//interface_.removeMovieClip();
	saved_locally.data.stats.score = score;
	saveGameProcess();
}

function addSubFly()
{
	function clickLeft()
	{
		key_left = true;
		pressed_left = false;
	}

	function clickRight()
	{
		key_right = true;
		pressed_right = false;
	}

	function clickBar()
	{
		key_attack = true;
		pressed_space = false;
	}

	function upkeys()
	{
		key_left = false;
		pressed_left = true;

		key_right = false;
		pressed_right = true;

		key_attack = false;
		pressed_space = true;
	}

	if (screens.area.barpress1 != undefined) {
		screens.area.barpress1.interactive = true;
		screens.area.barpress1.on("pointerdown", clickBar);
		screens.area.barpress1.on("pointerup", upkeys);
	}
	if (screens.area.barpress2 != undefined) {
		screens.area.barpress2.interactive = true;
		screens.area.barpress2.on("pointerdown", clickBar);
		screens.area.barpress2.on("pointerup", upkeys);
	}
	if (screens.area.barpress3 != undefined) {
		screens.area.barpress3.interactive = true;
		screens.area.barpress3.on("pointerdown", clickBar);
		screens.area.barpress3.on("pointerup", upkeys);
	}


	if (screens.area.sub_up1 != undefined) {
		screens.area.sub_up1.interactive = true;
		screens.area.sub_up1.on("pointerdown", clickRight);
		screens.area.sub_up1.on("pointerup", upkeys);
	}
	if (screens.area.sub_up2 != undefined) {
		screens.area.sub_up1.interactive = true;
		screens.area.sub_up1.on("pointerdown", clickRight);
		screens.area.sub_up1.on("pointerup", upkeys);
	}
	if (screens.area.sub_down2 != undefined) {
		screens.area.sub_down2.interactive = true;
		screens.area.sub_down2.on("pointerdown", clickLeft);
		screens.area.sub_down2.on("pointerup", upkeys);
	}
	if (screens.area.sub_down3 != undefined) {
		screens.area.sub_down3.interactive = true;
		screens.area.sub_down3.on("pointerdown", clickLeft);
		screens.area.sub_down3.on("pointerup", upkeys);
	}
}

function show_screen(frame){

	console.log("show_screen", frame);

	if (screens == undefined){
		screens = addGAFMovieClip("screens", true);
	}
	guiContainer.addChild(screens);

	screens.gotoAndStop(frame);

	if (frame == "level_select")
	{
		remove_all(true);
		sort_level_locks(screens);
		playIntros("level_select");

		addSubFly();
	}

	if (screens.space_btn != undefined)
	{
		screens.space_btn.gotoAndPlay();

		if (screens.space_btn != undefined) {
			function clickBar1() {
				key_attack = true;
				pressed_space = false;
			}

			function upkeys1() {
				key_attack = false;
				pressed_space = true;
			}

			screens.space_btn.interactive = true;
			screens.space_btn.on("pointerdown", clickBar1);
			screens.space_btn.on("pointerup", upkeys1);
		}
	}
}

function playIntros(frame, num)
{
	screens.onEnterFrame = function(){
		key_space = key_attack;
		
		if(key_space && !pressed_space){
			removeCustomEfFunc('intro_works_clip.onEnterFrame');
			pressed_space = true;
			start_level(look_at);
		}
		if(!key_space){
			pressed_space = false;
		}
	}


	switch (frame)
    {
    	case "intro":
    	{
    		switch (num)
    		{
    			case 1:
					screens.intros.gotoAndStop("start intro 1");
					screens.intros.clip1.play();
					introsInc++;
				break;

				case 2:
					screens.intros.gotoAndStop("start intro 2");
					screens.intros.clip2.play();
				break;

				case 3:
					screens.intros.gotoAndStop("start intro 3");
					screens.intros.clip3.play();
				break;
    		}
			break;
    	}

    	case "intro1":
        {
			screens.movie1.jinx_clip.play();
			screens.movie1.gizmo_clip.play();
			screens.movie1.mammoth_clip.play();
			addCustomEfFunc('intro_works_clip.onEnterFrame', screens.onEnterFrame);
        	break;
        }

    	case "intro6":
        {
			screens.movie2.back_play.play();
			screens.movie2.mymMovie.play();
			screens.movie2.bubbleMovie.play();
			screens.movie2.aqualadMovie.play();
			screens.movie2.speedyMovie.play();
			addCustomEfFunc('intro_works_clip.onEnterFrame', screens.onEnterFrame);
        	break;
        }

        case "intro11":
        {
			screens.movie3.play();
			addCustomEfFunc('intro_works_clip.onEnterFrame', screens.onEnterFrame);
        	break;
        }
    }
}

function load_new_area(inc){
	no_player_input = true;
	fade.mc.alpha = 0;
	fade.mc.visible = true;

	fade.onEnterFrame = function(){
		fade.mc.alpha += 0.03;
		if(fade.mc.alpha >= 1){
			fade.mc.alpha = 1;
			
			remove_all(true);
			
			// beastboy mid transform
			if(transforming){
				beastboy_re_ani = {sw:switch_to, f:beastboy_from, e:energy_drain};
			}
			
			if(beastboy_state != ''){
				temp_energy_drain = energy_drain;
			}else{
				energy_drain = 0;
			}
			
			//no_player_input = false;
			level += inc;
			//level = map_list.indexOf(level);

			removeCustomEfFunc('fade.onEnterFrame');
			
			start_game();
		}
	}
	addCustomEfFunc('fade.onEnterFrame', fade.onEnterFrame);
}

function remove_all(noStopMusic){
	console.log("remove_all");

	if (tilemap != null) tilemap.clear();

	if(noStopMusic == undefined) allSoundsStop();

	all.pieces = {};
	all.pieces.enemy = {};
	all.pieces.enemy.patrol = [];
	all.pieces.enemy.bee = [];
	all.pieces.enemy.white_robot = [];
	all.pieces.enemy.hoody = [];
	all.pieces.enemy.fish = [];
	all.pieces.enemy.cyborg_clone = [];
	all.pieces.enemy.tentacle = [];


	guiContainer.removeChild(interface_);
	interface_ = undefined;


	while (allContainer.children[0])
		allContainer.removeChild(allContainer.children[0]);
	


	for (var b=0; b <Object.keys(all.BulletFunc).length; b++)
	{
		var kkey = Object.keys(all.BulletFunc)[b];

		//console.log("BulletFunc remove key", kkey);

		PIXI.ticker.shared.remove(all.BulletFunc[kkey], kkey);
		all.BulletFunc[kkey] = undefined;
	}

	for (var p=0; p <Object.keys(all.PiecesEfFunc).length; p++)
	{
		var kkey = Object.keys(all.PiecesEfFunc)[p];

		//console.log("PiecesEfFunc remove key", kkey);

		PIXI.ticker.shared.remove(all.PiecesEfFunc[kkey], kkey);
		all.PiecesEfFunc[kkey] = undefined;
	}

	for (var e=1; e <Object.keys(all.customEfFunc).length+1; e++)
	{
		var kkey = Object.keys(all.customEfFunc)[e];

		//console.log("customEfFunc remove key", kkey);

		if (kkey == undefined) continue;
		if (kkey.indexOf("select_level") > -1) continue;

		PIXI.ticker.shared.remove(all.customEfFunc[kkey], kkey);
		all.customEfFunc[kkey] = undefined;
	}

	if (boss_enemy_trg != undefined)
	{
		all.pieces['enemy'+boss_enemy_trg.ind] = {};

		removeCustomEfFunc('boss.enemy_trg.onEnterFrame');
		removeCustomEfFunc('all.boss_timer.boss_wait.onEnterFrame');

		allContainer.removeChild(boss_enemy_trg.mc);
	}
};

function drop(){
	dropping = true;
};

var powerups_lev = 0;
var lives = 0;
var health = 0;

function find_power_ups(){
	for(a=0;a<power_up_positions.length;a++){
		var power_piece = power_up_positions[a]; 
		if(Math.abs(titan._x-power_piece._x)< 30 && Math.abs(titan._y-power_piece._y-35) < 30 && power_piece.state != 'used'&& !no_player_input){
			power_piece.state = 'used';
			power_piece.mc.play();

			power_piece.onEnterFrame = function(inst){
				if(inst.mc.currentFrame == inst.mc.totalFrames){
					allContainer.removeChild(inst.mc);
					
					PIXI.ticker.shared.remove(all.customEfFunc['power_up'+inst.ind], 'power_up'+inst.ind);
					all.customEfFunc['power_up'+inst.ind] = undefined;

					PIXI.ticker.shared.remove(all.customEfFunc['powerups_end'+inst.ind], 'powerups_end'+inst.ind);
					all.customEfFunc['powerups_end'+inst.ind] = undefined;
				}
			}

			all.customEfFunc['powerups_end'+power_piece.ind] = power_piece.onEnterFrame.bind(null, power_piece);
			PIXI.ticker.shared.add(all.customEfFunc['powerups_end'+power_piece.ind], 'powerups_end'+power_piece.ind);

			
			power_up_positions.splice(a,1);
			
			play_fx('tt_points_collection',0,100);
			
			
			switch(power_piece.id){
				case'extra_life':
					lives++;
					lives = Math.min(lives,99);
					numbers(2,'l',lives,interface_);
					play_fx('tt_player_1up',0,100);
				break;
				case'health_up':
					health += 20;
					health = Math.min(health,start_health);
					interface_.health_bar.width = parseInt(178*(health)/100/2)+1;
				break;
				case'health_full':
					health = start_health;
					interface_.health_bar.width = parseInt(178*(health)/100/2)+1;
				break;
				case'energy_full':
					energy = start_energy;
					interface_.energy_bar.width = parseInt(138*(energy)/100/2)+1;
				break;
			}		
		}
	}
}

function boss_mode_game(){
	
	lives = 0;
	
	boss_mode = true;
	boss_level = 0;
	
	energy = start_energy;
	health = start_health;
	vel = 0;
	titan_direction = 'right';
	exit_to_next_area = false;
	exit_to_previous_area = false;
	freeze_controls = false;
	//the_stage = num-1;
	level = 40;
	
	
	reset_invincible();	
	//all.removeMovieClip();
	//interface_.removeMovieClip();

	remove_all();


	guiContainer.removeChild(screens);
	//screens = undefined;

	
	start_game();
}

function next_boss_match(){
	boss_level++;
	level = 40+(50*boss_level);
	
	
	vel = 0;
	titan_direction = 'right';
	exit_to_next_area = false;
	exit_to_previous_area = false;
	
	
	reset_invincible();	
	//all.removeMovieClip();
	//interface_.removeMovieClip();
	//screens.removeMovieClip();

	remove_all();

	guiContainer.removeChild(screens);
	//screens = undefined;

	energy = start_energy;
	health = start_health;
	
	
	start_game();
}

function menu_works(){
	
	stop_fx('tt_music_victory');
	
	menu_num = 0;
	
	if(continue_locked){
		show_screen('first_game');
	}else{
		show_screen('new_or_saved');
	}

	screens.ttt_title.blesk.gotoAndPlay(1);
	
	
	if(saved_locally.data.stats.bosses_unlocked){
	//if(true){
		screens.boss_mode.gotoAndStop('off');
	}else{
		screens.boss_mode.locked = true;
	}
	
	if(!continue_locked){
		screens.resume.gotoAndStop('off');
	}else{
		screens.resume.locked = true;
	}
	
	screens.onEnterFrame = function(){		
		for(a in screens){
			if(!screens[a].locked){
				screens[a].gotoAndStop('off');					
			}
		}
		on_butt = false;
		for(a in screens){
			if(a == 'new_game' || a == 'resume' || a == 'boss_mode'){

				if(screens[a].hit.hitTest(_xmouse,_ymouse,true) && !screens[a].locked){
					on_butt = true;
					screens[a].gotoAndStop('over');
					if(a != mouse_on){
						play_fx('tt_gen_mouserollover',0,100);
					}
					mouse_on = a;
				}
			}
		}
		if(!on_butt){
			mouse_on = '';
		}
	}

	function offAllButtonsListeners()
	{
		screens.new_game.off("pointerdown", new_game_onMouseDown);
	    screens.resume.off("pointerdown", resume_onMouseDown);
	    screens.boss_mode.off("pointerdown", boss_mode_onMouseDown);
	}
	
	function new_game_onMouseDown(){

		offAllButtonsListeners();

		play_fx('tt_gen_mousedown',0,100);
		if(continue_locked){
			new_game();
			screens.gotoAndStop('intro');
			playIntros('intro', 1);
			intro_works();			
		}else{
			screens.gotoAndStop('confirm');
			confirm_works();
		}
	}

	function resume_onMouseDown(){
		offAllButtonsListeners();

		show_screen('level_select');

		play_fx('tt_gen_mousedown',0,100);
		look_fix = true;
	}

	function boss_mode_onMouseDown(){
		offAllButtonsListeners();

		play_fx('tt_gen_mousedown',0,100);
		temp_timer = 0;
		c_timer = 0;
		t_timer = 0;
		m_timer = 0;
		boss_mode_game();
	}

	screens.new_game.interactive = true;
	screens.resume.interactive = true;
	screens.boss_mode.interactive = true;
	screens.new_game.on("pointerdown", new_game_onMouseDown);
    screens.resume.on("pointerdown", resume_onMouseDown);

    if (screens.boss_mode.currentFrame != 1)
    screens.boss_mode.on("pointerdown", boss_mode_onMouseDown);
}

function menu_select(inc,focus_on){	
	menu_look = menu_ref[menu_num+inc];
	
	if(menu_look == 'new_game'){
		play_fx('tt_gen_mouserollover',0,100);
		screens.resume.gotoAndStop('off');
		screens.new_game.gotoAndStop('over');
		menu_num+=inc;
	}
	
	if(menu_look == 'continue' && !continue_locked){
		play_fx('tt_gen_mouserollover',0,100);
		screens.new_game.gotoAndStop('off');
		screens.resume.gotoAndStop('over');
		if(saved_locally.data.stats.bosses_unlocked){
			screens.boss_mode.gotoAndStop('off');
		}else{
			screens.boss_mode.gotoAndStop('locked');
		}
		menu_num+=inc;
	}
	
	//if(menu_look == 'boss_mode' && levels_complete >= 15){
	if(menu_look == 'boss_mode' && saved_locally.data.stats.bosses_unlocked){
		play_fx('tt_gen_mouserollover',0,100);
		screens.resume.gotoAndStop('off');
		screens.boss_mode.gotoAndStop('over');
		menu_num+=inc;
	}
}

function menu_go(){
	//delete screens.onEnterFrame;
	play_fx('tt_gen_mousedown',0,100);
	
	menu_look = menu_ref[menu_num];
	
	
	if(menu_look == 'new_game'){
		screens.gotoAndStop('confirm');		
		confirm_works();
	}
	if(menu_look == 'continue'){
		show_screen('level_select');
	}
	if(menu_look == 'boss_mode'){
		temp_timer = 0;
		c_timer = 0;
		t_timer = 0;
		m_timer = 0;
		boss_mode_game();
	}
}

function tick_tock(){
	interface_.clock.onEnterFrame = function(){
		if (temp_timer == undefined) temp_timer = 0;
		temp_timer+=(1/60)*!stop_clock;
		
		if(parseInt(temp_timer*100) == 60){
			temp_timer = 0;
			t_timer ++;
		}
		
		c_timer = parseInt(temp_timer*100);
		
		if(t_timer == 60){
			t_timer = 0;
			m_timer++;
		}
		
		numbers(2,'m',m_timer,interface_.clock);
		numbers(2,'s',t_timer,interface_.clock);
		numbers(2,'c',c_timer,interface_.clock);
	}
	addCustomEfFunc('interface_.clock.onEnterFrame', interface_.clock.onEnterFrame);
}

function titan_attack(){
	if(beastboy_state != 'dino'){
		play_fx('tt_'+player_on+'_melee',0,100);
	}else{
		play_fx('tt_beastboy_trex',0,100);
	}
		
	if(beastboy_state != ''){
		the_colour = 'green';
	}else{
		the_colour = 'yellow';
		if(!attacking){
			play_fx(player_on+'_attack',0,100);
		}
	}

	attacking = true;
	
	look_for_enemies(2+(4*(beastboy_state == 'dino'))+(1*(player_on == 'cyborg')),the_colour);
	

	if (all.customEfFunc['titan_attack_wait'] != undefined)
	{
		PIXI.ticker.shared.remove(all.customEfFunc['titan_attack_wait'], 'attack');
		all.customEfFunc['titan_attack_wait'] = undefined;
		all.customEfFunc['titan_attack_wait_ef_end'] = undefined;
	}

	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('attack_wait',2);
	titan.attack_wait.onEnterFrame = function(){
		if(titan.mc.currentFrame == all.customEfFunc['titan_attack_wait_ef_end'][0] ||
		   titan.mc.currentFrame == all.customEfFunc['titan_attack_wait_ef_end'][1]){
			attacking = false;

			PIXI.ticker.shared.remove(all.customEfFunc['titan_attack_wait'], 'attack');
			all.customEfFunc['titan_attack_wait'] = undefined;
			all.customEfFunc['titan_attack_wait_ef_end'] = undefined;
		}
	}

	for (var sa = 0; sa < titan.mc._gafTimeline._config._animationSequences._sequences.length; sa++)
	{

		if (titan.mc._gafTimeline._config._animationSequences._sequences[sa]._id == beastboy_state+"attack "+"left") {
			all.customEfFunc['titan_attack_wait_ef_end'] = {};
			all.customEfFunc['titan_attack_wait_ef_end'][0] = titan.mc._gafTimeline._config._animationSequences._sequences[sa]._endFrameNo;
		}

		if (titan.mc._gafTimeline._config._animationSequences._sequences[sa]._id == beastboy_state+"attack "+"right") {
			all.customEfFunc['titan_attack_wait_ef_end'][1] = titan.mc._gafTimeline._config._animationSequences._sequences[sa]._endFrameNo;
		}
	}

	all.customEfFunc['titan_attack_wait'] = titan.attack_wait.onEnterFrame;
	//all.customEfFunc['titan_attack_wait_titan_direction'] = titan_direction;
	PIXI.ticker.shared.add(all.customEfFunc['titan_attack_wait'], 'attack');
}

function look_for_enemies(damage,colour){
	for(a in all.pieces){
		if(all.pieces[a].id == 'enemy' && !all.pieces[a].hit && !all.pieces[a].dead){
			e_trg = all.pieces[a];
			// am i in the x range
			if((titan._x-e_trg._x <95 &&titan._x-e_trg._x > 0 && titan_direction == 'left') || (titan._x-e_trg._x >-95 &&titan._x-e_trg._x < 0 && titan_direction == 'right')){
				// am i in y range
				if(titan._y-e_trg._y >= -60 && titan._y-e_trg._y <= 60){
					hit_person(e_trg,titan_direction,'n/a',damage,colour);
				}
				
			}
		}
	}
}

function level_finish_wait(){
	play_fx('tt_complete_level',0,100);
	stop_fx('tt_music_bg'+music);
	
	no_player_input = true;
	key_special = false;
	key_special_pressed = true;
	special = false;
	victory = true;

	console.log("level_finish_wait");
	
	interface_.txt.gotoAndPlay('level_clear');

	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('hit_wait',3);
	titan.hit_wait.onEnterFrame = function(){
		if (titan.hit_wait.timer == undefined) titan.hit_wait.timer = 0;
		x_speed = 0;
		x_potential = 0;
		titan.hit_wait.timer++;
		if(titan.hit_wait.timer == 100){
			fade.mc.alpha = 0;
			fade.mc.visible = true;
			fade.onEnterFrame = function(){
				fade.mc.alpha += 0.03;
				if(fade.mc.alpha >= 1){
					level_won();
					removeCustomEfFunc('fade.onEnterFrame');
				}
			}
			addCustomEfFunc('fade.onEnterFrame', fade.onEnterFrame);
			removeCustomEfFunc('titan.hit_wait.onEnterFrame');
		}
	}
	addCustomEfFunc('titan.hit_wait.onEnterFrame', titan.hit_wait.onEnterFrame);
}

function say_special(){
	if(player_on != old_p){
		old_p = player_on;
		play_fx(player_on+'_special',0,100);
	}
}

function confirm_works(){
	screens.onEnterFrame = function(){
		for(a in screens){
			screens[a].gotoAndStop('off');					
		}
		on_butt = false;
		for(a in screens){
			if(a == 'no' || a == 'yes'){
				if(screens[a].hitTest(_xmouse,_ymouse,true)){
					on_butt = true;
					screens[a].gotoAndStop('over');
					if(a != mouse_on){
						play_fx('tt_gen_mouserollover',0,100);
					}
					mouse_on = a;
				}
			}
		}
		if(!on_butt){
			mouse_on = '';
		}
	}
	
	function confirm_works_yes_onMouseDown(){
		screens.yes.off("pointerdown", confirm_works_yes_onMouseDown);
    	screens.no.off("pointerdown", confirm_works_no_onMouseDown);
		play_fx('tt_gen_mousedown',0,100);
		new_game();
		screens.gotoAndStop('intro');
		playIntros('intro', 1);
		intro_works();
	}

	function confirm_works_no_onMouseDown(){
		screens.yes.off("pointerdown", confirm_works_yes_onMouseDown);
    	screens.no.off("pointerdown", confirm_works_no_onMouseDown);
		play_fx('tt_gen_mousedown',0,100);
		menu_works();
		screens.gotoAndStop('new_or_saved');
	}
	screens.yes.interactive = true;
	screens.no.interactive = true;
	screens.yes.on("pointerdown", confirm_works_yes_onMouseDown);
    screens.no.on("pointerdown", confirm_works_no_onMouseDown);
}

function allSoundsStop()
{
	for (var s in soundData) {
    	if (soundData[s] != undefined)
        	soundData[s].stop();
    }
}

function intro_works(){
	allSoundsStop();
	
	fade_fx('tt_music_maintheme');
	play_fx('tt_music_cutscene_bg',1000,100);

	screens.onEnterFrame = function(){
		key_space = key_attack;
		
		if(key_space && !pressed_space){
			play_fx('tt_gen_mousedown',0,100);
			if(introsInc < 3){
				introsInc++;
				screens.intros.gotoAndStop(introsInc)
				playIntros('intro', introsInc);
			}else{
				removeCustomEfFunc('intro_works.onEnterFrame');
				introsInc = 0;
				allSoundsStop();
				show_screen('level_select');
				fade_fx('tt_music_cutscene_bg');
				play_fx('tt_music_maintheme',1000,50);
				
			}
			pressed_space = true;
		}
		if(!key_space){
			pressed_space = false;
		}
	}
	addCustomEfFunc('intro_works.onEnterFrame', screens.onEnterFrame);
}

function numbers(n_len,n_id,n_amount,n_path){
	n_broken = n_amount.toString()
	temp_zero = '';
	for(a=n_len;a>n_broken.length;a--){
		temp_zero+='0';
	}
	n_broken = temp_zero+n_broken;
	for(a=0;a<n_len;a++){
		n_path[n_id+(a+1)].gotoAndStop(parseInt(n_broken.substr(a,1))+1);
	}
	n_path.d1;
}

function scored(amt){
	if(!boss_mode){
		score+= parseInt(amt);
		numbers(6,'p',score,interface_.clock);
	}
}

function boss_results(){
	best_time = parseInt(saved_locally.data.stats.best_time);
	
	current_time = (m_timer*10000)+(t_timer*100)+(c_timer);

	if(parseInt(current_time) < best_time || best_time == 0){
		//trace('you got the best time');
		saved_locally.data.stats.best_time = parseInt(current_time);
		saveGameProcess();
		best_time = parseInt(current_time);
	}
	
	rank = 1;
	
	if(parseInt(current_time) <= parseInt(vars.star2)){
		rank = 2;
	}
	if(parseInt(current_time) <= parseInt(vars.star3)){
		rank = 3;
	}
	if(parseInt(current_time) <= parseInt(vars.star4)){
		rank = 4;
	}
	
	screens.all_stars.gotoAndStop(rank);
	screens.all_stars['rank'+rank].gotoAndPlay(1);

	boss_mode = false;
	lives = saved_locally.data.stats.lives;

	screens.best_time_mc.gotoAndPlay(1);
	screens.best_time_ef = {};
	screens.best_time_ef.onEnterFrame = function(){
		if(screens.best_time_mc.currentFrame < 55)
		numbers(6,'c',current_time,screens);
		else numbers(6,'c',best_time,screens);
	}
	addCustomEfFunc('screens.best_time_ef.onEnterFrame', screens.best_time_ef.onEnterFrame);
}

function leave_level(){
	show_screen('level_select');

	stop_fx('tt_music_bg'+music);
	stop_fx('tt_robin_boomerang_flying');
	stop_fx('tt_raven_hum_whistle');
	play_fx('tt_music_maintheme',1000,50);
	
	transforming = '';
	beastboy_ani = '';
	beastboy_state = '';
	energy_drain = 0;
	no_gravity = false;
	titan_direction = 'right';
	x_speed = 0;
	x_potential = 0;
	no_player_input = true;
	pressed_left = true;
	pressed_right = true;
	
	reset_invincible();	
	
	saved_locally.data.stats.lives = lives;
	saved_locally.data.stats.score = score;
	saveGameProcess();
	
	remove_all(true);
}

function addMobileKeys()
{
	var md = new MobileDetect(window.navigator.userAgent);
   	if (md.mobile() == null) return;

    interface_.players.robin.interactive = true;
   	interface_.players.cyborg.interactive = true;
   	interface_.players.starfire.interactive = true;
   	interface_.players.raven.interactive = true;
   	interface_.players.beastboy.interactive = true;

	interface_.players.robin.on('pointerdown', function(pEvent) { key_1 = true; });
   	interface_.players.cyborg.on('pointerdown', function(pEvent) { key_2 = true; });
   	interface_.players.starfire.on('pointerdown', function(pEvent) { key_3 = true; });
   	interface_.players.raven.on('pointerdown', function(pEvent) { key_4 = true; });
   	interface_.players.beastboy.on('pointerdown', function(pEvent) { key_5 = true; });

	var _gafMovieClip = addGAFMovieClip("keys");
	_gafMovieClip.gotoAndStop(1);
	_gafMovieClip.x = 50;
	_gafMovieClip.y = 350;
	_gafMovieClip.scale.set(0.5,0.5);
	_gafMovieClip.alpha = 0.3;
	guiContainer.addChild(_gafMovieClip);

	_gafMovieClip.interactive = true;
	_gafMovieClip.on('pointerup', function(pEvent) { key_left = false; });
	_gafMovieClip.on('pointerdown', function(pEvent) { key_left = true; });

	_gafMovieClip = addGAFMovieClip("keys");
	_gafMovieClip.gotoAndStop(2);
	_gafMovieClip.x = 150;
	_gafMovieClip.y = 350;
	_gafMovieClip.scale.set(0.5,0.5);
	_gafMovieClip.alpha = 0.3;
	guiContainer.addChild(_gafMovieClip);

	_gafMovieClip.interactive = true;
	_gafMovieClip.on('pointerup', function(pEvent) { key_right = false; });
	_gafMovieClip.on('pointerdown', function(pEvent) { key_right = true; });



	_gafMovieClip = addGAFMovieClip("keys");
	_gafMovieClip.gotoAndStop(3);
	_gafMovieClip.x = 550;
	_gafMovieClip.y = 350;
	_gafMovieClip.scale.set(0.5,0.5);
	_gafMovieClip.alpha = 0.3;
	guiContainer.addChild(_gafMovieClip);

	_gafMovieClip.interactive = true;
	_gafMovieClip.on('pointerup', function(pEvent) { key_up = false; });
	_gafMovieClip.on('pointerdown', function(pEvent) { key_up = true; });



	_gafMovieClip = addGAFMovieClip("keys");
	_gafMovieClip.gotoAndStop(4);
	_gafMovieClip.x = 450;
	_gafMovieClip.y = 350;
	_gafMovieClip.scale.set(0.5,0.5);
	_gafMovieClip.alpha = 0.3;
	guiContainer.addChild(_gafMovieClip);

	_gafMovieClip.interactive = true;
	_gafMovieClip.on('pointerup', function(pEvent) { key_down = false; });
	_gafMovieClip.on('pointerdown', function(pEvent) { key_down = true; });



	_gafMovieClip = addGAFMovieClip("keys");
	_gafMovieClip.gotoAndStop(5);
	_gafMovieClip.x = 450;
	_gafMovieClip.y = 275;
	_gafMovieClip.scale.set(0.5,0.5);
	_gafMovieClip.alpha = 0.3;
	guiContainer.addChild(_gafMovieClip);

	_gafMovieClip.interactive = true;
	_gafMovieClip.on('pointerup', function(pEvent) { key_special = false; });
	_gafMovieClip.on('pointerdown', function(pEvent) { key_special = true; });

	_gafMovieClip = addGAFMovieClip("keys");
	_gafMovieClip.gotoAndStop(6);
	_gafMovieClip.x = 550;
	_gafMovieClip.y = 275;
	_gafMovieClip.scale.set(0.5,0.5);
	_gafMovieClip.alpha = 0.3;
	guiContainer.addChild(_gafMovieClip);

	_gafMovieClip.interactive = true;
	_gafMovieClip.on('pointerup', function(pEvent) { key_attack = false; });
	_gafMovieClip.on('pointerdown', function(pEvent) { key_attack = true; });
}
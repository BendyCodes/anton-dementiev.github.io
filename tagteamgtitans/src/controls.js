var left = false;
var right = false;
var up = false;
var down = false;
var freeze_controls = false;
var key_invincible = false;
var key_1 = false;
var key_2 = false;
var key_3 = false;
var key_4 = false;
var key_5 = false;
var key_left = false;
var key_right = false;
var key_up = false;
var key_down = false;
var key_space = false;
var key_special = false;
var key_attack = false;
var key_special = false;
var key_attack = false;
var key_special_pressed = false;
var key_attack_pressed = false;
var next_press_player_camera = false;
var magic_left = false;
var magic_right = false;
var no_player_input = false;
var jump_count = 0;
var special = false;
var victory = false;
var transforming = false;
var beastboy_ani = "";
var old_pose = "blank";

var the_crate;
var boomer_on = false;
var beastboy_state = "";
var fake_pose = false;
var cyborg_charge = 0;
var cyborg_charge_value = Math.floor(49/38*60);

var energy = 200;
var cyborg_special_gun_effect;
var cyborg_special_gun_effect_direction;
var cyborg_special_gun_effect_playing;

var fire_burst = 0;

var cyborg_diff_pos = {
	"special right": [342.5, -24.5],
	"special left": [-271.5, -24.5],
	"special run left": [-272.5, -19.5],
	"special run right": [338.5, -19.5],
	"special jump left": [-274.5, -27.5],
	"special jump right": [342.5, -26.5]
};

function onKeyUp(key)
{
	if (key.keyCode === 88) key_special = false;
	if (key.keyCode === 32) key_attack = false;

	if (key.keyCode === 49) key_1 = false;
	if (key.keyCode === 50) key_2 = false;
	if (key.keyCode === 51) key_3 = false;
	if (key.keyCode === 52) key_4 = false;
	if (key.keyCode === 53) key_5 = false;

	if (key.keyCode === 65 || key.keyCode === 37) key_left = false;
    if (key.keyCode === 68 || key.keyCode === 39) key_right = false;

    if (key.keyCode === 87 || key.keyCode === 38) key_up = false;
    if (key.keyCode === 83 || key.keyCode === 40) key_down = false;

}

function onKeyDown(key)
{
	if(!freeze_controls)
	{
		if (key.keyCode === 88) key_special = true;
		if (key.keyCode === 32) key_attack = true;

		if (key.keyCode === 49) key_1 = true;
		if (key.keyCode === 50) key_2 = true;
		if (key.keyCode === 51) key_3 = true;
		if (key.keyCode === 52) key_4 = true;
		if (key.keyCode === 53) key_5 = true;

	    if (key.keyCode === 65 || key.keyCode === 37) key_left = true;
	    if (key.keyCode === 68 || key.keyCode === 39) key_right = true;

	    if (key.keyCode === 87 || key.keyCode === 38) key_up = true;
	    if (key.keyCode === 83 || key.keyCode === 40) key_down = true;
	}

    //if (key.keyCode === 188) load_new_area(-1);
    //if (key.keyCode === 190) load_new_area(1);
}

function controls(){
	if(key_1 && !the_crate && !boomer_on && beastboy_state == '' && !hit && !dead && !changing && !fake_pose && !freeze_controls && !special){
		swap_titan('robin');
		changing = true;
		key_1 = false;
	}
	
	if(key_2 && !the_crate && !boomer_on && beastboy_state == '' && !hit && !dead && !changing && !fake_pose && !freeze_controls && !special){
		swap_titan('cyborg');
		changing = true;
		key_2 = false;
	}
	
	if(key_3 && !the_crate && !boomer_on && beastboy_state == '' && !hit && !dead && !changing && !fake_pose && !freeze_controls && !special){
		swap_titan('starfire');
		changing = true;
		key_3 = false;
	}
	
	if(key_4 && !the_crate && !boomer_on && beastboy_state == '' && !hit && !dead && !changing && !freeze_controls && !special){
		swap_titan('raven');
		changing = true;
		key_4 = false;
	}
	
	if(key_5 && !the_crate && !boomer_on && beastboy_state == '' && !hit && !dead && !changing && !fake_pose && !freeze_controls && !special){
		swap_titan('beastboy');
		changing = true;
		key_5 = false;
	}
	
	if(!key_1 && !key_2 && !key_3 && !key_4 && !key_5){
		changing = false;
	}
	
	// special press
	if(key_special && !key_special_pressed && !hit && (energy > 20 || beastboy_ani != '' || the_crate != null) && !victory && !dead && !attacking){

		window[player_on + '_special']();
		say_special();
		key_special_pressed = true;
	}
	
	if(!key_special && key_special_pressed){
		key_special_pressed = false;
		
		if(player_on == 'cyborg'){
			stop_fx('tt_cyborg_cannon_charge_loop');
			if(cyborg_charge == cyborg_charge_value){//49
				cyborg_charge_fire();
			}else{
				special = false;
			}
			cyborg_charge = 0;
			energy_drain = 0;
		}
	}
	
	// cyborg charge
	if(player_on == 'cyborg' && key_special && !hit && !victory && !dead && !attacking){
		
		// determine charge
		okay_to_hold = (energy > 20 || (cyborg_charge > 0 && energy > 0));
										
		
		if(okay_to_hold){
			cyborg_charge++;
			cyborg_charge = Math.min(cyborg_charge_value,cyborg_charge); //49
			//titan.all.body.cyborg_build.gotoAndStop(cyborg_charge);
		
			if(cyborg_charge == 10){
				play_fx('tt_cyborg_cannon_align',0,100);		
			}
			
			if(cyborg_charge == 20){
				play_fx('tt_cyborg_cannon_charge_loop',100,100);			
			}
			
			
			if(cyborg_charge > 20){
				special = true;
				energy_drain = energy_for_charge;
			}
			
			
			if(cyborg_charge == cyborg_charge_value){
				energy_drain = 0;
			}
		}
		
		if(!okay_to_hold){
			stop_fx('tt_cyborg_cannon_charge_loop');			
			energy_drain = 0;
			cyborg_charge = 0;
			special = false;
		}
	}
	
	// for rapid fire so you don't need to release the key
	if(key_special && player_on == 'starfire' && energy > 20 && !victory && !dead && !attacking){
		fire_burst++;
		fire_burst%=5;
		if(!fire_burst){
			key_special_pressed = false;
		}
	}
	if(player_on == 'starfire' && !key_special){
		energy_drain = 0;
		special = false;
	}
	
	// attack press
	if(key_attack && !key_attack_pressed && !hit && !the_crate && beastboy_state != 'ram' && beastboy_state != 'bat' && !attacking && !victory && !dead && (!special || player_on == 'beasyboy')){		
		titan_attack();
		key_attack_pressed = true;
	}
	if(!key_attack && key_attack_pressed){
		key_attack_pressed = false;
	}
	
	
	// return camera after crate focus
	if(next_press_player_camera && (left || right)){
		camera_off = false;
		next_press_player_camera = false;
	}
	
	// so you can't move move in air if hitting
	no_x_speed_change = (vel != 0 && attacking);
	
	left = key_left && !right && !down && !up && !hit && !attacking && !dead;
	right = key_right && !left && !down && !up && !hit && !attacking && !dead;
	up = key_up && !down && !key_left && !key_right && !hit && !attacking && !dead;
	down = key_down && !up && !key_left && !key_right && !hit && !attacking && !dead;

	//console.log(left, right, no_x_speed_change, x_potential);
	
	if(!no_x_speed_change){
		x_potential = (max_speed+(8*(beastboy_state == 'ram')))*((left || magic_left)-(right || magic_right))*!no_player_input;
	}
	
	// jump                                                  vel == 0
	if(key_up && !up_pressed && beastboy_state != 'dino' && (vel != 0.999 || (jump_count < 2 && player_on == 'robin' && energy > 20)) && !no_player_input && !hit && !dead && !victory){
		vel = 25-(12*(beastboy_state == 'ram'));
		on_mover = false;
		up_pressed = true;
		
		jump_count++;
		if(jump_count == 2){
			energy -= 20;
		}
		
		if(beastboy_state != 'ram'){
			play_fx('tt_jump',0,80-(50*(jump_count == 2)));
		}else{
			play_fx('tt_beastboy_ram',0,100);
		}
	}

	if(!key_up && (on_floor || on_shelf || on_mover || jump_count < 2) && ((centre_y == 35 || on_mover) || player_on == 'robin')){
		up_pressed = false;
		if(on_floor || on_shelf || on_mover){
			jump_count = 0;
		}
	}

	// drop
	if(key_down && !down_pressed && vel == 0 && (on_shelf || on_mover) && !no_player_input && !hit && !dead && !victory){
		//drop();
		dropping = true;
		down_pressed = true;
	}

	if(!key_down){
		down_pressed = false;
	}
	
	// starfire floaty
	if(key_up && player_on == 'starfire' && vel < 0 && energy > 20 && !hit && !dead &&!((on_floor_middle || on_floor_left || on_floor_right) && on_floor_right > 30) && !victory){
		vel = -1;
		up_pressed = true;
		energy -= 0.5;
	}
	
	
	if(vel != 0 && beastboy_state != 'bat'){
		pose = 'jump';
	}
	
	
	if(x_speed == 0 && vel == 0 && (on_floor || on_shelf || on_mover)){
		pose = 'ready';
	}
	

	if((x_speed != 0 && vel == 0 && (on_floor || on_mover || on_shelf)) || beastboy_state == 'bat'){
		pose = 'run';
	}
	
	
	if(attacking){
		pose = 'attack';
	}
	
	
	if(special){
		if(player_on == 'cyborg'){
			switch(pose){
				case 'ready':
					pose = 'special';
				break;
				
				case 'run':
					pose = 'special run';
				break;
				
				case 'jump':
					pose = 'special jump';
				break;
			}
		}else{
			pose = 'special';
		}
	}


	//console.log("pose", pose, special);
	
	
	if(hit){
		pose = 'hit';
	}
	
	
	if(dead){
		pose = 'defeat';
	}
	
	
	if(dead && y_speed == 0){
		pose = 'defeat';
	}
	
	
	if(victory){
		pose = 'victory';
	}
	
	
	if(x_speed > 0 && !hit && !dead){
		titan_direction = 'left';
	}
	
	
	if(x_speed < 0 && !hit && !dead){
		titan_direction = 'right';
	}
	
	if(titan_direction == 'right'){
		camera_ref = -1;
	}
	
	
	if(titan_direction == 'left'){
		camera_ref = 1;
	}
	
	if(transforming){
		pose = '';
	}
	
	if(beastboy_state == 'ram'){
		if(pose == 'run' && !ram_fx){
			ram_fx = true;
			play_fx('ram_run',100,100);
		}
		if(pose != 'run'){
			stop_fx('ram_run');	
			ram_fx = false;
		}
	}

	if (titan != undefined && titan.mc != undefined)
	{
		if (titan.mc.get_currentSequence() != beastboy_ani+pose+' '+titan_direction)
		{
			titan.mc.setSequence(beastboy_ani+pose+' '+titan_direction);

			if (pose.indexOf("special") > -1 && player_on == "cyborg")
			{
				if (cyborg_special_gun_effect == undefined)
				{
					cyborg_special_gun_effect = addGAFMovieClip("cyborg_warmup"); //49 loop
					cyborg_special_gun_effect_direction = "left";
					allContainer.addChild(cyborg_special_gun_effect);
					cyborg_special_gun_effect.play();
					cyborg_special_gun_effect_playing = true;

					PIXI.ticker.shared.add(cyborg_special_gun_effect_ef, 'cyborg_special_gun_effect_ef');
					
					function cyborg_special_gun_effect_ef()
					{
						if (cyborg_special_gun_effect.currentFrame == cyborg_special_gun_effect.totalFrames) {
							cyborg_special_gun_effect.gotoAndPlay(49);
						}
					};
				}
				else {
					if (!cyborg_special_gun_effect_playing) {
							cyborg_special_gun_effect.gotoAndPlay(0);
							cyborg_special_gun_effect_playing = true;
						}
				}


				if (cyborg_special_gun_effect != undefined)
				{
					if (cyborg_special_gun_effect_direction != titan_direction)
					{
						cyborg_special_gun_effect.width = -cyborg_special_gun_effect.width;
						cyborg_special_gun_effect_direction = titan_direction;
					}
				}
			}

			if (player_on == "cyborg" && pose.indexOf("special") == -1)
			{
				if (cyborg_special_gun_effect != undefined)
				{
					cyborg_special_gun_effect.gotoAndStop(0);
					cyborg_special_gun_effect_playing = false;
				}

			}

			if (player_on == "raven" && pose.indexOf("special") > -1)
			{
				if (titan_direction == "left") {
					titan.raven_blackswirl_right.mc.visible = false;
					titan.raven_blackswirl_left.mc.visible = true;
					
				}

				if (titan_direction == "right") {
					titan.raven_blackswirl_right.mc.visible = true;
					titan.raven_blackswirl_left.mc.visible = false;
					
				}
			}
		}
	}
	
	if(player_on == 'starfire' && !hit && !dead){
		
		// finds her start _y of her body so you can wobble it
		new_pose = pose+' '+titan_direction;
		if(old_pose != new_pose){
			//star_x = titan.all.body._y;
			//old_pose = new_pose;
		}

		if (titan.all == undefined) titan.all = {};
		if (titan.all.w == undefined) titan.all.w = 0;
		if (titan.all.wa == undefined) titan.all.wa = 0;
		if (titan.all._y == undefined) titan.all._y = 0;
		
		// wobble
		titan.all.w+=0.1;
		titan.all.wa = Math.cos(titan.all.w)*4;
	}
}

function swap_titan(titan_called){
	if(player_on != titan_called){
		old_pose = 'blank';
		play_fx('tt_titan_swap_whoosh',0,100);
		player_on = titan_called;

		titan.attachMovie = function(name) {
			var _gafMovieClip = addGAFMovieClip(name);
			var titanTmpX = titan.mc.x;
			var titanTmpY = titan.mc.y;
			allContainer.removeChild(titan.mc);
			titan.mc = _gafMovieClip;
			titan.mc.x = titanTmpX;
			titan.mc.y = titanTmpY;
			allContainer.addChild(_gafMovieClip);
		}
		titan.attachMovie(titan_called,'all',100);

		if (titan.swap_fx == undefined) titan.swap_fx = {};
		titan.swap_fx.attachMovie = function(name) {
			if (titan.swap_fx.mc != undefined){
				removeCustomEfFunc('titan.swap_fx.onEnterFrame');
				allContainer.removeChild(titan.swap_fx.mc);
			}

			titan.swap_fx.mc = addGAFMovieClip(name);
			titan.swap_fx.mc.play();
			allContainer.addChild(titan.swap_fx.mc);
		}
		titan.swap_fx.attachMovie('swap_fx','swap_fx',200);

		titan.swap_fx.onEnterFrame = function(){
			if(titan.swap_fx.mc.currentFrame == titan.swap_fx.mc.totalFrames){
				allContainer.removeChild(titan.swap_fx.mc);
				removeCustomEfFunc('titan.swap_fx.onEnterFrame');
			}
		}
		addCustomEfFunc('titan.swap_fx.onEnterFrame', titan.swap_fx.onEnterFrame);
		
		for(a in players_str){
			interface_.players[players_str[a]].gotoAndStop(1);
		}

		interface_.players[player_on].gotoAndPlay(2);
	}
}
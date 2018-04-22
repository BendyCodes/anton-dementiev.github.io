function robin_special() {
	energy_for_special = 1;
	
	if(!boomer_on){
		boomer_out = false;
		boomer_on = true;
		energy_drain = energy_for_special;
		fire_boomer();
		play_fx('tt_robin_boomerang',0,100);
		play_fx('tt_robin_boomerang_flying',100,50);
	}
}

function fire_boomer(){
	special = true;
	if(vel == 0){
		no_player_input = true;
	}
	pieces_lev++;

	all.pieces.attachMovie = function(name) {
		all.pieces.boomer = {};
		all.pieces.boomer.mc = addGAFMovieClip(name);
	}
	all.pieces.attachMovie('boomer','boomer',pieces_lev+5000);
	boomer = all.pieces.boomer;
	boomer.direct = (titan_direction == 'right')-(titan_direction == 'left');
	
	boomer._x = titan._x;
	boomer._y = titan._y-30;
	boomer.x_adj = -x_speed*0.5;
	boomer.ind = pieces_lev;
	
	if((titan_animation == 'right' && boomer.x_adj < 0) || (titan_animation == 'left' && boomer.x_adj > 0)){
		boomer.x_adj = 0;
	}

	all.pieces.boomer.mc.x = boomer._x;
	all.pieces.boomer.mc.y = boomer._y;
	allContainer.addChild(all.pieces.boomer.mc);
	
	boomer.onEnterFrame = function(){
		boomer_ai(boomer);
		detect_missile(boomer,1,0);
	}
	addCustomEfFunc('boomer'+boomer.ind, boomer.onEnterFrame);
}

function boomer_ai(trg){
	if (trg._x == undefined) trg._x = 0;
	if (trg.x_speed == undefined) trg.x_speed = 0;
	if (trg.distance == undefined) trg.distance = 0;

	trg.x_potential = 16*trg.direct*(trg.distance<300);
	trg.x_speed += 2*(trg.x_potential>trg.x_speed);
	trg.x_speed -= 2*(trg.x_potential<trg.x_speed);
	trg._x += trg.x_speed;
	trg._x += trg.x_adj;
	trg.distance += Math.abs(trg.x_speed);
	
	if(Math.abs(trg._x-titan._x) > 100){
		trg.x_adj *= 0.8;
	}
	
	if(trg.distance >= 200){
		special = false;
		no_player_input = false;
	}
	
	boomer_out = true;
	if(trg.distance >= 300 || energy <= 0){
		if (trg.wait == undefined) trg.wait = 0;

		trg.wait++;
		if(trg.wait>10){
			energy_drain = 0;
			trg.wait = 0;

			boomer.onEnterFrame = function(){
				boomer_return(boomer);
				detect_missile(boomer,1,0);
			}
			addCustomEfFunc('boomer'+trg.ind, boomer.onEnterFrame);
		}
	}	
	
	if(trg.x_speed > 0){
		trg.dir = 'right';
	}else{
		trg.dir = 'left';
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}

function boomer_return(trg){
	if(trg.old_x < trg._x){
		trg.dir = 'right';
	}else{
		trg.dir = 'left';
	}
	
	trg.old_x = trg._x;
	
	trg.x_speed += 2*(trg.x_speed < 16);
	trg.x_speed = Math.min(trg.x_speed,trg.distance);
	
	trg.adj = trg._x-titan._x;
	trg.opp = trg._y-titan._y+30;
	trg.ae = (trg.opp*trg.opp)+(trg.adj*trg.adj);
	trg.distance = Math.abs(Math.sqrt(trg.ae));
	trg.angle = parseInt((Math.atan(trg.opp/trg.adj)/(Math.PI/180))-(180*(trg.adj<0)));
	trg._x -= Math.cos(trg.angle*(Math.PI/180))*trg.x_speed;
	trg._y -= Math.sin(trg.angle*(Math.PI/180))*trg.x_speed;
	
	if(trg.distance < 20){
		special = false;
		no_player_input = false;
		boomer_on = false;
		stop_fx('tt_robin_boomerang_flying');
		allContainer.removeChild(trg.mc);
		removeCustomEfFunc('boomer'+trg.ind, boomer.onEnterFrame);
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}
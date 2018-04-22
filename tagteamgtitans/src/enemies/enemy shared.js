function detect_crate(trg){
	trg.left_obstruction = crate_on._x - trg._x >= -100 && crate_on._x - trg._x < 0 && Math.abs(crate_on._y - trg._y) < 70;
	trg.right_obstruction = crate_on._x - trg._x <= 100 && crate_on._x - trg._x > 0 && Math.abs(crate_on._y - trg._y) < 70;	
	
	if(trg.left_obstruction){
		trg.x_speed = Math.max(Math.min(crate_on._x+55-trg._x,trg.max_speed),trg.x_speed);
	}
	
	if(trg.right_obstruction){
		trg.x_speed = Math.min(Math.max(crate_on._x-55-trg._x,-trg.max_speed),trg.x_speed);
	}
	
	// smash crate if it goes inside
	if(Math.abs(crate_on._x - trg._x) < 35 && Math.abs(crate_on._y - trg._y) < 70){
		crate_smash(crate_on);
	}
}

function remove_fire_bullet_ef(val)
{
	PIXI.ticker.shared.remove(all.BulletFunc['bullet_'+val], 'bullet_'+val);
	all.BulletFunc['bullet_'+val] = undefined;
}

function bullet_ai(trg,damage,p_width,bullet_y_adj){
	if (bullet_y_adj == undefined) bullet_y_adj = 0;
	
	trg._x += trg.dir*trg.speed;

	// the tiles
	trg.tile_h = Math.floor((trg._x)/tile_size);
	trg.tile_v = Math.floor((trg._y-half_tile+bullet_y_adj)/tile_size);

	if (legal[trg.tile_v] != undefined)
	trg.my_tile = legal[trg.tile_v][trg.tile_h];
	
	if(trg.my_tile == 0 || trg.my_tile == undefined){
		remove_fire_bullet_ef(trg.ind);
		allContainer.removeChild(trg.mc);
	}
	
	if(crate_on){
		if(Math.abs(crate_on._x-trg._x) < 35 && Math.abs(crate_on._y-trg._y) < 35){
			remove_fire_bullet_ef(trg.ind);
			allContainer.removeChild(trg.mc);
		}
	}

	if(Math.abs(trg._x-titan._x) <= p_width && Math.abs(trg._y-titan._y+30) <= 40 && !hit && !dead && !invincible){
		if(trg.dir == -1){
			trg.ani_direction = 'left';
		}else{
			trg.ani_direction = 'right';
		}
		hit_person(titan,trg.ani_direction,'n/a',damage);
		remove_fire_bullet_ef(trg.ind);
		allContainer.removeChild(trg.mc);
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}
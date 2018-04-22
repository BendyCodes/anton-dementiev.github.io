function shelf_mover(trg){
	trg.x_potential = 3*((trg.dest_x>trg.x)-(trg.dest_x<trg.x));
	trg.x_speed += (trg.x_potential>trg.x_speed);
	trg.x_speed -= (trg.x_potential<trg.x_speed);
	
	trg.y_potential = 3*((trg.dest_y>trg.y)-(trg.dest_y<trg.y));
	trg.y_speed += (trg.y_potential>trg.y_speed);
	trg.y_speed -= (trg.y_potential<trg.y_speed);
	
	if(trg.x_speed < 0){
		trg.x_speed = Math.max(trg.dest_x-trg.x,trg.x_speed);
	}
	if(trg.x_speed > 0){
		trg.x_speed = Math.min(trg.dest_x-trg.x,trg.x_speed);
	}
	if(trg.y_speed < 0){
		trg.y_speed = Math.max(trg.dest_y-trg.y,trg.y_speed);
	}
	if(trg.y_speed > 0){
		trg.y_speed = Math.min(trg.dest_y-trg.y,trg.y_speed);
	}
	
	if(trg.x == trg.dest_x && trg.y == trg.dest_y){
		trg.dest++;
		trg.dest%=2;
		trg.dest_x = trg.coords[trg.dest][0]*tile_size;
		trg.dest_y = trg.coords[trg.dest][1]*tile_size;
	}
	
	trg.x += trg.x_speed;
	trg.y += trg.y_speed;
	
	// make array so that [1] = mem position  [0] = new entry       this is so we can predict the next position of the shelf
	
	trg.mem_x.splice(0,0,trg.x);
	trg.mem_x.splice(2,1);
	
	trg.mem_y.splice(0,0,trg.y);
	trg.mem_y.splice(2,1);
	
	if(trg.mem_x != undefined && trg.mem_y != undefined){
		trg._x = trg.mem_x[1];
		trg._y = trg.mem_y[1];
	}

	trg.mc.x = trg._x;
	trg.mc.y = trg._y;
}
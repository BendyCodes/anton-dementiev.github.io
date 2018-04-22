
function update_camera(){
	
	// x
	if(camera_off){
		camera_dir = 0;
	}else{
		camera_dir = (!on_mover*camera_ref*16);
	}
	
	//max_x = tile_size * (map_width - map_horizontal + tile_overlap_x * 2) + off_screen_clip_x;
    //max_y = tile_size * (map_height + 1 - map_vertical + tile_overlap_y * 2) + off_screen_clip_y;
	
	object_x = camera_dir*5;
	object_adjx = int(object_x-all._x)*camera_glide;
	
	
	// limit camera so you don't see over screen no-tiles
	if(distance_x-all._x >= max_x){
		all._x = Math.min(distance_x-max_x,0);
		object_adjx = 0;
	}
	
	if(distance_x-all._x <= 0){
		all._x = Math.max(distance_x-0,0);
		object_adjx = 0;
	}
	
	
	if(all._x<object_x){
		all._x += Math.abs(object_adjx);
	}
	
	if(all._x>object_x){
		all._x -= Math.abs(object_adjx);
	}
}
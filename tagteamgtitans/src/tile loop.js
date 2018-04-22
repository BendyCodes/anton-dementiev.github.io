var map_horizontal = 13;
var map_vertical = 7;
var off_screen_clip_x = 30;
var off_screen_clip_y = 20;

function tile_mover(){

	//fix
	if (player_on == "raven" && the_crate != undefined) x_speed = 0;

	// distance always chages
	distance_x -= x_speed;
	distance_y -= y_speed;
	
	// inc or dec after for tiles swap
	tile_x = Math.floor(distance_x/tile_size);
	tile_y = Math.floor(distance_y/tile_size);
	
	// this loops a size so tiles clip flips back
	map_x = -distance_x%-tile_size;
	map_y = -distance_y%-tile_size;	
	
	// this is so the map stops when at edges
	if (distance_x<=0) {
		tile_x = 0;
		map_x = 0;
	}
	if (distance_y<=0) {
		tile_y = 0;
		map_y = 0;
	}
	if (distance_x>=max_x) {
		tile_x = map_width-map_horizontal+tile_overlap_x*2;
		map_x = -off_screen_clip_x;
	}
	if (distance_y>=max_y) {
		tile_y = (map_height+1)-map_vertical+tile_overlap_y*2;
		map_y = -off_screen_clip_y;
	}
	
	// move just titan
	if((!no_player_input) || (no_player_input && special && player_on == 'robin')){
		titan._x = titan_centre_x+distance_x;
		titan._y = titan_centre_y+distance_y;
	}
}
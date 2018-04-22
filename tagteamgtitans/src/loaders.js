function load_all(){
	load_maps();
	
	// check to see if saved game is true
	saved_locally = loadGameProcess();

	//console.log(saved_locally);

	if(saved_locally == undefined){
		show_win = true;
		vel = 0;
		titan_direction = 'right';
		exit_to_next_area = false;
		exit_to_previous_area = false;
		
		saved_locally = {};
		saved_locally.data = {};
		saved_locally.data.stats = {levels_complete:0, lives:start_lives, bosses_unlocked:false, best_time:0, score:0};
		levels_complete = saved_locally.data.stats.levels_complete;
		lives = saved_locally.data.stats.lives;
		score = saved_locally.data.stats.score;
		the_stage = levels_complete;
		saveGameProcess();
		continue_locked = true;
		menu_works();
		play_fx('tt_music_maintheme',1000,50);
	}else{
		continue_locked = false;
		levels_complete = saved_locally.data.stats.levels_complete;
		lives = saved_locally.data.stats.lives;
		score = saved_locally.data.stats.score;

		//levels_complete = 10;
		//lives = 0;

		the_stage = levels_complete;
		if(levels_complete == total_levels){
			show_win = false;
		}else{
			show_win = true;
		}
		look_fix = true;
		menu_works();
		play_fx('tt_music_maintheme',1000,50);
	}
}

function loadVariables(textData, type)
{
    var pos = 0;
    var num = -1;
    var lvi = -1;
    var strRes = [];
    while (pos != -1) {
        pos = textData.indexOf("&", lvi + 1);
        num += 1;
        lvi = pos;
        if (pos > -1) strRes.push(pos);
    }
    for (var s = 0; s < strRes.length; s++)
    {
        if (s == 0) {
            if (type != undefined) {
                if (textData.substring(0, strRes[s]).indexOf(type) > -1) {
                    return textData.substring(0+type.length+1, strRes[s]);
                }
                if (textData.substring(strRes[s]+1, strRes[s+1]).indexOf(type) > -1) {
                    return textData.substring(strRes[s]+1+type.length+1, strRes[s+1]);
                }
            }
        }
        else {
            if (type != undefined) {
                if (textData.substring(strRes[s]+1, strRes[s+1]).indexOf(type) > -1) {
                    if (textData.substring(strRes[s]+1+type.length+1, strRes[s+1]) == ",") return null;
                    else return textData.substring(strRes[s]+1+type.length+1, strRes[s+1]);
                }
            }
        }
    }
    return null;
}

function load_maps(){
	maps = {};
	
	for (var ml = 0; ml < map_list.length; ml++)
    {
        function getLoadVarNames(jsonn, thisName)
        {
            //console.log("getLoadVarNames", ml, thisName, loadVariables(loader.resources["maps/map" + map_list[ml].toString() + ".txt"].data, thisName));
            if (jsonn) return JSON.parse("[" + loadVariables(loader.resources["maps/map" + map_list[ml].toString() + ".txt"].data, thisName) + "]")
            else return loadVariables(loader.resources["maps/map" + map_list[ml].toString() + ".txt"].data, thisName);
        }

        levelData_map_width.push(getLoadVarNames(false, "map_width"));
        levelData_map_height.push(getLoadVarNames(false, "map_height"));
        levelData_tile_set.push(getLoadVarNames(false, "tile_set"));
        levelData_tiles.push(getLoadVarNames(true, "tiles"));
        levelData_legal.push(getLoadVarNames(true, "legal"));
        levelData_shelf.push(getLoadVarNames(true, "shelf"));
        levelData_floor_damage.push(getLoadVarNames(true, "floor_damage"));
        levelData_pulse_damage.push(getLoadVarNames(true, "pulse_damage"));
        levelData_moving_shelf.push(getLoadVarNames(true, "moving_shelf"));
        levelData_crate.push(getLoadVarNames(true, "crate"));
        levelData_patrol.push(getLoadVarNames(true, "patrol"));
        levelData_titan_pos.push(getLoadVarNames(true, "titan_pos"));
        levelData_bee.push(getLoadVarNames(true, "bee"));
        levelData_power_ups.push(getLoadVarNames(true, "power_ups"));
        levelData_white_robot.push(getLoadVarNames(true, "white_robot"));
        levelData_cyborg_clone.push(getLoadVarNames(true, "cyborg_clone"));
        levelData_tentacle.push(getLoadVarNames(true, "tentacle"));
        levelData_fish.push(getLoadVarNames(true, "fish"));
        levelData_hoody.push(getLoadVarNames(true, "hoody"));

        levelData_next_pos.push(getLoadVarNames(true, "next_pos"));
        levelData_previous_pos.push(getLoadVarNames(true, "previous_pos"));
        levelData_end_pos.push(getLoadVarNames(true, "end_pos"));
        levelData_out_pos.push(getLoadVarNames(true, "out_pos"));

        function splitArraysFunc(num, arr)
        {
            var msres = [];
            var mstemp = [];
            var msint = 0;
            for (var ms = 0; ms < arr.length; ms++)
            {
                msint++;
                if (msint == num)
                {
                    msint = 0;
                    if (mstemp.length > 0)
                    {
                        mstemp.push(arr[ms]);
                        msres.push(mstemp);
                        mstemp = [];
                    }
                }
                else mstemp.push(arr[ms]);
            }
            return msres;
        }

        levelData_legal[ml] = splitArraysFunc(levelData_map_width[ml], levelData_legal[ml]);
        levelData_floor_damage[ml] = splitArraysFunc(levelData_map_width[ml], levelData_floor_damage[ml]);
        levelData_shelf[ml] = splitArraysFunc(levelData_map_width[ml], levelData_shelf[ml]);
        levelData_moving_shelf[ml] = splitArraysFunc(5, levelData_moving_shelf[ml]);
        levelData_crate[ml] = splitArraysFunc(3, levelData_crate[ml]);

        levelData_patrol[ml] = splitArraysFunc(7, levelData_patrol[ml]);
        levelData_bee[ml] = splitArraysFunc(7, levelData_bee[ml]);
        levelData_white_robot[ml] = splitArraysFunc(7, levelData_white_robot[ml]);
        levelData_cyborg_clone[ml] = splitArraysFunc(7, levelData_cyborg_clone[ml]);
        levelData_tentacle[ml] = splitArraysFunc(7, levelData_tentacle[ml]);
        levelData_fish[ml] = splitArraysFunc(7, levelData_fish[ml]);
        levelData_hoody[ml] = splitArraysFunc(7, levelData_hoody[ml]);
        
        levelData_power_ups[ml] = splitArraysFunc(3, levelData_power_ups[ml]);


		var level = map_list[ml].toString();
	    maps["map"+level] = {};
	    maps["map"+level].tiles = levelData_tiles[ml];
		maps['map'+level].shelf = levelData_shelf[ml];
		maps['map'+level].legal = levelData_legal[ml];
		maps['map'+level].floor_damage = levelData_floor_damage[ml];
		maps['map'+level].tile_set = levelData_tile_set[ml];
		maps['map'+level].map_width = levelData_map_width[ml];
		maps['map'+level].map_height = levelData_map_height[ml];
		maps['map'+level].titan_pos = levelData_titan_pos[ml];
		maps['map'+level].next_pos = levelData_next_pos[ml];
		maps['map'+level].previous_pos = levelData_previous_pos[ml];
		maps['map'+level].end_pos = levelData_end_pos[ml];
		maps['map'+level].out_pos = levelData_out_pos[ml];
		maps['map'+level].moving_shelf = levelData_moving_shelf[ml];
		maps['map'+level].crate = levelData_crate[ml];
		maps['map'+level].power_ups = levelData_power_ups[ml];
		maps['map'+level].patrol = levelData_patrol[ml];
		maps['map'+level].cyborg_clone = levelData_cyborg_clone[ml];
		maps['map'+level].white_robot = levelData_white_robot[ml];
		maps['map'+level].bee = levelData_bee[ml];
		maps['map'+level].fish = levelData_fish[ml];
		maps['map'+level].tentacle = levelData_tentacle[ml];
		maps['map'+level].hoody = levelData_hoody[ml];
    }

    //console.log(maps);

    var vars_id = ["patrol_health","cyborg_clone_health","white_robot_health","fish_health","bee_health","tentacle_health","hoody_health","boss1_health",
                "boss2_health","boss3_health","patrol_damage","cyborg_clone_damage","white_robot_damage","fish_damage","bee_damage","tentacle_damage",
                "hoody_damage","jinx_damage","gismo_damage","mammoth_damage","aqualad_damage","speedy_damage","masy_menos_damage","bumble_bee_damage",
                "brother_blood_damage","patrol_score","cyborg_clone_score","white_robot_score","fish_score","bee_score","tentacle_score","hoody_score",
                "patrol_score","cyborg_clone_score","white_robot_score","fish_score","bee_score","tentacle_score","hoody_score","boss1_score","boss2_score",
                "boss3_score","star2","star3","star4","extra_life_score","health_up_score","health_full_score","energy_full_score"];

    for (var ml = 0; ml < vars_id.length; ml++)
    {
        vars[vars_id[ml]] = loadVariables(enemies_list[0], vars_id[ml]);
    }
}
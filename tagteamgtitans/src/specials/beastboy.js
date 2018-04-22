function beastboy_special() {	
	if(beastboy_state == ''){
		if(!on_floor && !on_shelf && !on_mover){
			switch_to = 'bat';
			energy_for_special = 1.5;
		}
		if((on_floor || on_shelf || on_mover) && x_speed == 0){
			switch_to = 'dino';
			energy_for_special = 0.5;
		}
		if((on_floor || on_shelf || on_mover) && x_speed != 0){
			switch_to = 'ram';
			energy_for_special = 1;
		}
		transform(switch_to);
	}else{
		play_fx('tt_beastboy_transform_back',0,50);
		stop_fx('ram_run');
		ram_fx = false;
		
		transforming = true;
		beastboy_ani = 'from '+switch_to;
		beastboy_from = true;
		
		titan.createEmptyMovieClip = function(name) {
			titan[name] = {};
		}
		titan.createEmptyMovieClip('ani_wait',5);
		titan.ani_wait.onEnterFrame = function() {
			if (titan.ani_wait.wait == undefined) titan.ani_wait.wait = 0;

			for (var sa = 0; sa < titan.mc._gafTimeline._config._animationSequences._sequences.length; sa++)
			{
				if (titan.mc._gafTimeline._config._animationSequences._sequences[sa]._id == beastboy_ani+' '+titan_direction) {
					if (titan.mc.currentFrame == titan.mc._gafTimeline._config._animationSequences._sequences[sa]._endFrameNo && titan.ani_wait.wait > 1 && !dead)
					{
						transforming = false;
						beastboy_ani = '';
						beastboy_state = '';
						beastboy_from = false;

						removeCustomEfFunc('titan.ani_wait.onEnterFrame');
					}
				}
			}
			titan.ani_wait.wait++;
		}
		addCustomEfFunc('titan.ani_wait.onEnterFrame', titan.ani_wait.onEnterFrame);
		
		vel = 0;
		energy_drain = 0;
		no_gravity = false;
	}
}

function beastboy_end_fix(){
	if(beastboy_state != ''){
		beastboy_special();
	}
}

function transform(switch_to){
	play_fx('tt_beastboy_transform',0,100);
	
	transforming = true;
	beastboy_ani = 'to '+switch_to;

	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('ani_wait',5);
	titan.ani_wait.onEnterFrame = function(){
		if (titan.ani_wait.wait == undefined) titan.ani_wait.wait = 0;

		for (var sa = 0; sa < titan.mc._gafTimeline._config._animationSequences._sequences.length; sa++) {
			if (titan.mc._gafTimeline._config._animationSequences._sequences[sa]._id == beastboy_ani+' '+titan_direction) {
				if (titan.mc.currentFrame == titan.mc._gafTimeline._config._animationSequences._sequences[sa]._endFrameNo && titan.ani_wait.wait > 1)
				{
					beastboy_ani = switch_to;
					transforming = false;
					removeCustomEfFunc('titan.ani_wait.onEnterFrame');
				}
			}
		}
		titan.ani_wait.wait++;
	}
	addCustomEfFunc('titan.ani_wait.onEnterFrame', titan.ani_wait.onEnterFrame);

	beastboy_state = switch_to;
	window[beastboy_state]();
	beastboy_energy_loop();
}

function beastboy_energy_loop(){
	titan.createEmptyMovieClip = function(name) {
		titan[name] = {};
	}
	titan.createEmptyMovieClip('beastboy_loop',6);
	titan.beastboy_loop.onEnterFrame = function(){
		if(energy <= 0){
			transforming = true;
			beastboy_ani = 'from '+switch_to;

			titan.createEmptyMovieClip = function(name) {
				titan[name] = {};
			}
			titan.createEmptyMovieClip('ani_wait',5);
			titan.ani_wait.onEnterFrame = function(){
				if (titan.ani_wait.wait == undefined) titan.ani_wait.wait = 0;

				for (var sa = 0; sa < titan.mc._gafTimeline._config._animationSequences._sequences.length; sa++) {

					if (titan.mc._gafTimeline._config._animationSequences._sequences[sa]._id == beastboy_ani+' '+titan_direction) {
						if (titan.mc.currentFrame == titan.mc._gafTimeline._config._animationSequences._sequences[sa]._endFrameNo && titan.ani_wait.wait > 1)
						{
							transforming = false;
							beastboy_ani = '';
							beastboy_state = '';
							removeCustomEfFunc('titan.ani_wait.onEnterFrame');
						}
					}
				}
				titan.ani_wait.wait++;
			}
			addCustomEfFunc('titan.ani_wait.onEnterFrame', titan.ani_wait.onEnterFrame);
			
			vel = 0;
			no_gravity = false;
			energy_drain = 0;

			removeCustomEfFunc('titan.beastboy_loop.onEnterFrame');
		}
	}
	addCustomEfFunc('titan.beastboy_loop.onEnterFrame', titan.beastboy_loop.onEnterFrame);
}

function bat(){
	y_speed = 0;
	vel = 0;
	no_gravity = true;
	energy_drain = energy_for_special;
}

function ram(){
	energy_drain = energy_for_special;
}

function dino(){
	energy_drain = energy_for_special;
}
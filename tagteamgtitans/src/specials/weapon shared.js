function detect_missile(trg,damage,y_adj){
	for(a in all.pieces){
		trg.temp_trg = all.pieces[a];
		
		if(trg.temp_trg.id == 'enemy' && !trg.temp_trg.dead && (!trg.temp_trg.hit || trg.always_hit)){
			if(Math.abs(trg.temp_trg._y-trg._y-30) < 30+y_adj){
				if(Math.abs(trg.temp_trg._x-trg._x) < 30){
					hit_person(trg.temp_trg,trg.dir,'n/a',damage,'yellow');
					if(player_on != 'robin'){
						allContainer.removeChild(trg.mc);
						PIXI.ticker.shared.remove(all.PiecesEfFunc['pieces_lev'+trg.ind], 'pieces_lev'+trg.ind);
						all.PiecesEfFunc['pieces_lev'+trg.ind] = undefined;
						removeCustomEfFunc('pieces_lev'+trg.ind);
					}
				}
			}
		}

		if(trg.temp_trg.id == 'seeker' && boss_match){
			if(Math.abs(trg.temp_trg._y-trg._y-30) < 30+y_adj){
				if(Math.abs(trg.temp_trg._x-trg._x) < 30){
					//place explosion effect
					pieces_lev++;
					explosion_lev++;
					all.pieces.attachMovie = function(name, piece) {
					    all_pieces_attachMovie(name, piece);
					}
					all.pieces.attachMovie('gizmo_rocketblast','explosion'+explosion_lev,pieces_lev+5000);
					var exp_trg = all.pieces['explosion'+explosion_lev];
					exp_trg._x = trg.temp_trg._x;
					exp_trg._y = trg.temp_trg._y;

					exp_trg.mc.x = exp_trg._x;
					exp_trg.mc.y = exp_trg._y;
					exp_trg.mc.play();

					exp_trg.onEnterFrame = function(){
						if(exp_trg.mc.currentFrame == exp_trg.mc.totalFrames){
							allContainer.removeChild(exp_trg.mc);
							remove_onTickEvent_rocket_boom();
						}
					}
					PIXI.ticker.shared.add(onTickEvent_rocket_boom);
					function onTickEvent_rocket_boom() {
						exp_trg.onEnterFrame();
					}
					function remove_onTickEvent_rocket_boom() {
						PIXI.ticker.shared.remove(onTickEvent_rocket_boom);
					}
					
					allContainer.removeChild(trg.temp_trg.mc);

					remove_fire_bullet_ef(trg.temp_trg.ind);
					removeCustomEfFunc('pieces_lev'+trg.temp_trg.ind);

					all.pieces['bullet'+trg.temp_trg.ind] = {};
					
					if(player_on != 'robin'){
						allContainer.removeChild(trg.mc);
						remove_fire_bullet_ef(trg.ind);
						removeCustomEfFunc('pieces_lev'+trg.ind);
					}
				}
			}
		}		
	}
}
module com.ussgames.teenTitansBattleQuest {
	
	export class BlackHoleResidualEffect extends ResidualEffect {
		
		public static BLACKHOLEDAMAGE:number = 2;
		public static unitsAffected:any[] = [];
		
		constructor() {
			super();
		}
		
		/*override*/ public init(map:BTMap, originatingUnit:UnitInPlay, mapX:number, mapY:number):void {
			super.init(map, originatingUnit, mapX, mapY);
			
			this.effectClip = Main.addGAFMovieClip("BlackholeEffect");
			this.effectClip.x = (mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
			this.effectClip.y = (mapY * Config.GRIDSIZEY) + (Config.GRIDSIZEY / 2);
			
			map.objectsContainerClip.addChild(this.effectClip);
			this.effectCountDown = RavenBlackHole.BLACKHOLETIME;
			
			this.reduceHPOfUnits(map);
		}
		
		/*override*/ public update(map:BTMap):void {
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (map.unitsInPlay[i].state == UnitInPlay.IDLE && Math.abs(this.mapX - map.unitsInPlay[i].mapX) <= 1 && Math.abs(this.mapY - map.unitsInPlay[i].mapY) <= 1) {
					
					if (map.unitsInPlay[i].currentHP <= 0) {
						map.unitsInPlay[i].currentHP = 0;
						
						// suck it in!
						map.unitsInPlay[i].actioned = true;
						map.unitsInPlay[i].externalForcesActing = true;
						map.unitsInPlay[i].clip.x += (this.effectClip.x - map.unitsInPlay[i].clip.x) / 3;
						map.unitsInPlay[i].clip.y += (this.effectClip.y - map.unitsInPlay[i].clip.y) / 3;
						map.unitsInPlay[i].clip.scale.x *= 0.9;
						map.unitsInPlay[i].clip.scale.x *= 0.9;
						
						if ((Math.abs(this.effectClip.x - map.unitsInPlay[i].clip.x) <= 2 && Math.abs(this.effectClip.y - map.unitsInPlay[i].clip.y) <= 2) || (Math.abs(map.unitsInPlay[i].clip.scale.x) < 0.1)) {
							map.removeDeadUnits();
						}
					}
				}
			}
			
		}
		
		/*override*/ public endTeamTurn(team:number, map:BTMap):void {
			BlackHoleResidualEffect.unitsAffected = [];
			
			this.effectCountDown--;
			if (this.effectCountDown <= 0) {
				this.effectLive = false;
				this.effectClip.gotoAndPlay("vanish");
			} else {
				this.reduceHPOfUnits(map, team);
			}
		}
		
		public reduceHPOfUnits(map:BTMap, team:number = 0) {
			for (var i:number = 0; i < map.unitsInPlay.length; i++) {
				if (BlackHoleResidualEffect.unitsAffected.indexOf(map.unitsInPlay[i])<0 && (team == 0 || map.unitsInPlay[i].team == team) && map.unitsInPlay[i].state == UnitInPlay.IDLE && Math.abs(this.mapX - map.unitsInPlay[i].mapX) <= 1 && Math.abs(this.mapY - map.unitsInPlay[i].mapY) <= 1) {
					var damage:number = BlackHoleResidualEffect.BLACKHOLEDAMAGE;
					if (damage > map.unitsInPlay[i].currentHP) {
						damage = Math.floor(map.unitsInPlay[i].currentHP);
					}

					map.unitsInPlay[i].currentHP -= damage;
					BattleController.showDamageRiser(damage, map.unitsInPlay[i]);
					if (map.unitsInPlay[i].currentHP <= 0) {
						map.unitsInPlay[i].currentHP = 0;
						map.unitsInPlay[i].actioned = true;
						map.unitsInPlay[i].externalForcesActing = true;
						BlackHoleResidualEffect.unitsAffected.push(map.unitsInPlay[i]);
					}
				}
			}
		}
		
	}

}
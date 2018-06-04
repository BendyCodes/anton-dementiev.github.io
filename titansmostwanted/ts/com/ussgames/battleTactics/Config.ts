module com.ussgames.battleTactics {
	
	export class Config {
		
		public static GRIDSIZEX:number = 64;
		public static GRIDSIZEY:number = 64;
		public static MAPWIDTH:number = 10;
		public static MAPHEIGHT:number = 5;
		
		public static unitConfigs:any = [Robin, Cyborg, BeastBoy, Raven, Starfire, BankRobber, OldMotherMaeEye, Plasmus, DrLightBeam, BillyNumerous, Trigon, Jinx, Mammoth, Gizmo, SeeMore, BankRobberLongRange, KamikazePie, DrLightBeamHolo, Demon, RobotArmy];
		
		public static mapSquareConfig:any[] = [
		{ type:MapSquare.OPEN, height:0, clipClassName:null, label:"Flat Ground" },
		{ type:MapSquare.HIGHGROUND, height:32, clipClassName:"HighgroundPlaceholder", label:"Crate" },
		{ type:MapSquare.NOACCESS, height:0, clipClassName:"BarrierPlaceholder", label:"Deep Hole" },
		{ type:MapSquare.NOACCESS, height:0, clipClassName:"PotHole1", label:"Pothole" },
		{ type:MapSquare.NOACCESS, height:0, clipClassName:"PotHole2", label:"Pothole" },
		{ type:MapSquare.NOACCESS, height:0, clipClassName:"PotHole3", label:"Pothole" },
		{ type:MapSquare.NOACCESS, height:0, clipClassName:"PotHole4", label:"Pothole" },
		{ type:MapSquare.HIGHGROUND, height:32, clipClassName:"PapersHG", label:"Papers" },
		{ type:MapSquare.HIGHGROUND, height:32, clipClassName:"TreeTrunkHG", label:"Stump" },
		{ type:MapSquare.HIGHGROUND, height:32, clipClassName:"TiresHG", label:"Tires" },
		{ type:MapSquare.HIGHGROUND, height:32, clipClassName:"RockHG", label:"Rock" },
		{ type:MapSquare.HIGHGROUND, height:32, clipClassName:"TableHG", label:"Table" } ];
		
		
		public static COVERDEFENCEBONUS:number = 0.5;
		public static HIGHGROUNDATTACKBONUS:number = 0.5;
		
		public static TEAMNAMES:any[] = ["Teen Titan's Turn", "Villain's Turn"];
		
		public static XPTOLEVELUP:any[] = [10, 25, 50, 75, 100, 125, 150, 200, 250];
		public static MAXLEVEL:number = 10;
		
		public static KOXP:number = 3;
		public static SURVIVEXP:number = 5;
		public static DIEXP:number = -3;
		
		public static tutorialIntroLevels:any[] = [false, true, false, false, false, false, false, false, false, false, false, false];
		public static tutorialInteractiveLevels:any[] = [true, true, true, false, false, false, false, false, false, false, false, false];
		
		constructor() {
			
		}
		
	}

}

import Config = com.ussgames.battleTactics.Config;
module com.ussgames {
	
	export class MapSquare {
		
		public terrainID:number = 0;
		
		public static OPEN:number = 0;
		public static COVER:number = 1;
		public static WATER:number = 2;
		public static HIGHGROUND:number = 3;
		public static NOACCESS:number = 4;
		
		public static TERRAINTYPELABELS:any[] = ["Open Space", "Cover", "Water", "High Ground", "Blocked"];
		
		public type:number;
		public height:number;
		
		public objectClip:any;
		
		public mapX:number;
		public mapY:number;
		
		constructor() {
			
		}
		
		public init(type:number, height:number, mapX:number, mapY:number, clip:any = null, id:number = 0):void {
			this.type = type;
			this.height = height;
			this.mapX = mapX;
			this.mapY = mapY;
			this.objectClip = clip;
			this.terrainID = id;
		}
		
		public updateClipPosition():void {
			this.objectClip.x = (this.mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
			this.objectClip.y = (this.mapY * Config.GRIDSIZEY) + Config.GRIDSIZEY;
		}
		
	}

}

import MapSquare = com.ussgames.MapSquare;
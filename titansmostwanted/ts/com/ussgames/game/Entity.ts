module com.ussgames.game {
	
	export class Entity {
		public x:number;
		public y:number;
		public gx:number;
		public gy:number;
		public gyt:number;
		public topBuffer:number = 0;
		public vx:number;
		public vy:number;
		public clip:any;
		public container:Sprite;
		public live:boolean = false;
		public doUpdate:boolean = true;
		
		constructor() {
			
		}
		
		public init(x:number, y:number, clip:any, topBuffer:number = 0):void {
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;
			this.clip = clip;
			this.topBuffer = topBuffer;
			
			this.live = true;
		}
		
		public update():void {
			this.updateClipPosition();
			this.updateClipState();
		}
		
		public updateClipPosition():void {
			this.clip.x = this.x;
			this.clip.y = this.y;
		}
		
		public updateClipState():void {
		}
		
		public removeClip():void {
			if (this.clip && this.clip.parent) {
				this.clip.parent.removeChild(this.clip);
			}
			this.clip = null;
		}
		
		public teleportFromX:number = 0;
		public teleportTo(gx:number, gy:number, x:number, y:number):void {
		}
		
	}

}

import Entity = com.ussgames.game.Entity;
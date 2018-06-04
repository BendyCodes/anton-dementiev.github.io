module com.yyztom.pathfinding.astar
{
	export class AStarNodeVO
	{
		public h : number;
		public f : number;
		public g : number;
		public visited : boolean;
		public closed : boolean;
		public isWall : boolean;
		public position : Point;
		public debug : string;
		public parent : AStarNodeVO;
		public next : AStarNodeVO;
		
		constructor( )
		{
			
		}
	}
}

import AStarNodeVO = com.yyztom.pathfinding.astar.AStarNodeVO;
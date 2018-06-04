module com.yyztom.pathfinding.astar
{
	export class AStar
	{
		private _openHeap : BinaryHeap;
		private _touched : AStarNodeVO[];
		private _grid : any[];
		
		constructor( grid : any[] ){
			this._touched = new Array<AStarNodeVO>();
			this._grid = grid;
		}
		
		public get evaluatedTiles () : AStarNodeVO[] {
			return this._touched;
		}
		
		public search(  start : AStarNodeVO, end:AStarNodeVO) : AStarNodeVO[] {
			
			if ( this._openHeap ){
				var k : number = this._touched.length-1;
				while ( k > -1 ){
					this._touched[k].f=0;
					this._touched[k].g=0;
					this._touched[k].h=0;
					this._touched[k].closed = false;
					this._touched[k].visited = false;
					this._touched[k].debug = "";
					this._touched[k].parent = null;
					k--;
				}
				
				this._touched = new Array<AStarNodeVO>();
				this._openHeap.reset();
			}
			else{
				this._openHeap = new BinaryHeap( function(node:AStarNodeVO):number{return node.f;} );
			}
			
			this._openHeap.push(start);
			
			while( this._openHeap.size > 0 ){
				var currentNode : AStarNodeVO = this._openHeap.pop();
				
				if(currentNode.position.x == end.position.x && currentNode.position.y == end.position.y) {
					var curr : AStarNodeVO = currentNode;
					var ret : AStarNodeVO[] = new Array<AStarNodeVO>();
					while(curr.parent) {
						ret.push(curr);
						curr = curr.parent;
						
					}
					return ret.reverse();
				}
				
				currentNode.closed = true;
				this._touched.push(currentNode);
				
				var neighbors : AStarNodeVO[] = this.neighborsFunc(this._grid, currentNode);
				var il : number = neighbors.length;
				
				for(var i: number =0; i < il; i++) {
					
					var neighbor : AStarNodeVO = neighbors[i];
					
					if (neighbor == undefined) continue;

					if(neighbor.closed || neighbor.isWall) {
						continue;
					}
					
					var gScore : number = currentNode.g + 1;
					var beenVisited : boolean = neighbor.visited;
					if ( !beenVisited ){
						this._touched.push(neighbor);
					}
					if( beenVisited == false || gScore < neighbor.g) {
						neighbor.visited = true;
						neighbor.parent = currentNode;
						neighbor.h = neighbor.h || this.manhattan(neighbor.position, end.position);
						neighbor.g = gScore;
						neighbor.f = neighbor.g + neighbor.h;
						
						if (!beenVisited) {
							this._openHeap.push(neighbor);
						}
						else {
							this._openHeap.rescoreElement(neighbor);
						}
					}
				}
			}

			return new Array<AStarNodeVO>();
		}
		
		private neighborsFunc( grid : any[] , node : AStarNodeVO, allowDiagonal : boolean = true ) : AStarNodeVO[] {
			var ret : AStarNodeVO[] = new Array<AStarNodeVO>();
			var x : number = node.position.x;
			var y : number = node.position.y;
			
			try{
				if( grid[x-1] && grid[x-1][y]) {
					ret.push(grid[x-1][y]);
				}
			}catch(e){}
			try{
				if(grid[x+1] && grid[x+1][y]) {
					ret.push(grid[x+1][y]);
				}
			}catch(e){}
			try{
				if(grid[x] && grid[x][y-1]) {
					ret.push(grid[x][y-1]);
				}
			}catch(e){}
			try{
				if(grid[x] && grid[x][y+1]) {
					ret.push(grid[x][y+1]);
				}
			}catch(e){}
			
            if ( allowDiagonal ){
				try{
					if ( !grid[x][y-1].isWall || !grid[x+1][y].isWall ){		
						ret.push(grid[x+1][y-1]);
					}
				}catch(e){}
				try{
					if ( !grid[x+1][y].isWall || !grid[x][y+1].isWall ){
						ret.push(grid[x+1][y+1]);
					}
				}catch(e){}
				try{
					if ( !grid[x-1][y].isWall || !grid[x][y+1].isWall ){
						ret.push( grid[x-1][y+1]  );
					}

				}catch(e){}
				try{
					if ( !grid[x-1][y].isWall || !grid[x][y-1].isWall ){
							ret.push( grid[x-1][y-1] );
					}
				}catch(e){}
			}
			return ret;
		}
		
		private manhattan( pos0 : Point, pos1 : Point ) : number{
			var d1 : number = Math.abs( pos1.x - pos0.x );
			var d2 : number = Math.abs( pos1.y - pos0.y );
			return d1 + d2;
		}
		
	}
}

import AStar = com.yyztom.pathfinding.astar.AStar;
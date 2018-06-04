module com.yyztom.pathfinding.astar
{
	export class BinaryHeap
	{
		private _content : AStarNodeVO[];
		private _scoreFunction : Function;
		
		constructor(scoreFunction : Function)
		{
			this._content = new Array<AStarNodeVO>();
			this._scoreFunction = scoreFunction;
		}
		
		public reset() : void {
			this._content = new Array<AStarNodeVO>();
		}
		
		public get content():AStarNodeVO[]{
			return this._content;
		}
		
		public push( element : AStarNodeVO ) : void {
			this._content.push(element);
			this.sinkDown( this._content.length - 1 );
		}
		
		public pop() : AStarNodeVO {
			var result : AStarNodeVO = this._content[0];
			var end : AStarNodeVO = this._content.pop();
			if (this._content.length > 0) {
				this._content[0] = end;
				this.bubbleUp(0);
			}
			return result;
		}
		
		public remove( node : AStarNodeVO ) : void {
			var i : number = this._content.indexOf(node);
			var end : AStarNodeVO = this._content.pop();
			if (i != this._content.length - 1) {
				this._content[i] = end;
				if (this._scoreFunction(end) < this._scoreFunction(node))
				{
					this.sinkDown(i);
				}
				else
				{
					this.bubbleUp(i);
				}
			}
		}
		
		public get size() : number {
			return this._content.length;
		}
		
		public rescoreElement( node : AStarNodeVO ) : void {
			
			this.sinkDown( this._content.indexOf(node) );
		}
		
		private sinkDown( n : number ) : void {
			var element : AStarNodeVO = this._content[n];
			while (n > 0) {
				var parentN : number = this._content.indexOf(element.parent);
				if (parentN == -1 ){
					parentN = 0;
				}
				
				var	parent : AStarNodeVO = this._content[parentN];
				if (this._scoreFunction(element) < this._scoreFunction(parent)) {
					this._content[parentN] = element;
					this._content[n] = parent;
					n = parentN;
				}
				else {
					break;
				}
			}
		}
		
		private bubbleUp( n : number ) : void {
			var length : number = this._content.length;
			var	element : AStarNodeVO = this._content[n];
			var	elemScore : number = this._scoreFunction(element);
			
			while(true) {
				var child2N : number = (n + 1) << 1;
				var	child1N : number = child2N - 1;
				
				var swap : any = null;
				
				if (child1N < length) {
					var child1 : AStarNodeVO = this._content[child1N];
					var	child1Score : number = this._scoreFunction(child1);
					if (child1Score < elemScore)
						swap = child1N;
				}
				if (child2N < length) {
					var child2 : AStarNodeVO = this._content[child2N];
					var	child2Score : number = this._scoreFunction(child2);
					if (child2Score < (swap == null ? elemScore : child1Score)){
						swap = child2N;
					}
				}
				
				if (swap != null) {
					this._content[n] = this._content[swap];
					this._content[swap] = element;
					n = swap;
				}
				else {
					break;
				}
			}
		}
	}
}
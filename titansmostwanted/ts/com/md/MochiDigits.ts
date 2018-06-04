module com.md
{
    export class MochiDigits
    {
        private Fragment:number;
        private Sibling:MochiDigits;
        private Encoder:number;

        constructor(digit:number = 0, index:number = 0)
        {
            this.Encoder = 0;
            this.setValue( digit, index );
        }

        public get value():number
        {
            return Number(this.toString());
        }

        public set value(v:number)
        {
            this.setValue( v );
        }

        public addValue(inc:number):void
        {
            this.value += inc;
        }

        public setValue( digit:number = 0, index:number = 0 ):void
        {
            var s:string = digit.toString();
            this.Fragment = s.charCodeAt(index++) ^ this.Encoder;

            if( index < s.length )
                this.Sibling = new MochiDigits(digit,index);
            else
                this.Sibling = null;
        }

        public toString():string
        {
            var s:string = String.fromCharCode(this.Fragment ^ this.Encoder);

            if( this.Sibling != null)
                s += this.Sibling.toString();

            return s;
        }
    }
}

import MochiDigits = com.md.MochiDigits;
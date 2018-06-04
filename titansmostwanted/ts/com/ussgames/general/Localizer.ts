module com.ussgames.general {

	export class Localizer {
		public static localisedXML:any;
		public static inited:boolean = false;
		public static lang:string = "en";
		
		constructor() {
			
		}
		
		public static startLocalizer() {
			var xmlFileName:string = "localisedtext.xml";
			this.localisedXML = xml2js(PIXI.loader.resources[xmlFileName].xhr.response, {compact: true, spaces: 4});

			console.log("xml", this.localisedXML);

			this.lang = this.localisedXML.data.use_language._attributes.code;

			this.localisedXML = this.localisedXML.data.text;
			
			Localizer.inited = true;
		}
		
		public static getlocalisedText(originalText:string):Array<string> {
			//return [originalText.replace(new RegExp(/\|/,'g'), "\n")];

			var resLocalisedText:Array<string> = [];
			resLocalisedText[0] = originalText;

			if (Localizer.inited) {
				for (var str = 0; str < this.localisedXML.length; str++)
				{
					//console.log("str", this.localisedXML[str].original_text._text);

					var prepareOrigText = originalText.replace(new RegExp(/\|/,'g'), "").replace(new RegExp(/ /,'g'), "").replace(new RegExp(/\./,'g'), "").replace(new RegExp(/\,/,'g'), "").replace(/(\r\n|\n|\r)/gm,"");
					var prepareLocalText = this.localisedXML[str].original_text._text.replace(new RegExp(/\|/,'g'), "").replace(new RegExp(/ /,'g'), "").replace(new RegExp(/\./,'g'), "").replace(new RegExp(/\,/,'g'), "").replace(/(\r\n|\n|\r)/gm,"");
					
					//console.log("local check", prepareOrigText, prepareLocalText, prepareOrigText==prepareLocalText);

					if (prepareOrigText.toLowerCase() == prepareLocalText.toLowerCase())
					{
						//console.log("text >>>>", this.localisedXML[str][this.lang]._text, this.localisedXML[str][this.lang], this.localisedXML[str]);

						if (this.localisedXML[str][this.lang]._text != undefined)
						{
							resLocalisedText[0] = this.localisedXML[str][this.lang]._text.replace(new RegExp(/\|/,'g'), "\n");

							if (this.localisedXML[str].changeTextSize != undefined) {
								resLocalisedText[1] = this.localisedXML[str].changeTextSize._text;
							}
							break;
						}
					}
				}
			}

			if (resLocalisedText[0] == "") {
				resLocalisedText[0] = originalText;
			}

			return resLocalisedText;
		}
	}

}

import Localizer = com.ussgames.general.Localizer;
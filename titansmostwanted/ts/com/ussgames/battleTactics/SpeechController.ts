module com.ussgames.battleTactics {
	
	export class SpeechController {
		public static running:boolean = false;
		public static runningCinematic:boolean = false;
		
		public static speechQueue:any[] = [];
		public static currentSpeechBubble:any;
		public static speechBubbleContainer:any;
		
		public static SPEECHDELAY:number = 100*2*1.0;
		public static speechDelayCount:number = 0;
		
		constructor() {
			
		}
		
		public static init() {
			SpeechController.running = true;
			SpeechController.runningCinematic = false;
			SpeechController.speechQueue = [];
			SpeechController.speechBubbleContainer = BattleController.currentMap.mapView;
			SpeechController.speechDelayCount = 0;
		}
		
		public static addSpeech(speechText:string, speakingClip:any) {
			var newSpeechBubble:SpeechBubbleData = new SpeechBubbleData;
			newSpeechBubble.speech = speechText;
			newSpeechBubble.speakerClip = speakingClip;
			SpeechController.speechQueue.push(newSpeechBubble);
		}
		
		public static update() {
			if (SpeechController.speechDelayCount <= 0) {
				var cinematicOver:boolean = true;
				
				if (!SpeechController.runningCinematic) {
					SpeechController.runningCinematic = true;
					Cinematics.triggerCinematic(BattleController.currentMap);
					if (SpeechController.currentSpeechBubble) {
						SpeechController.currentSpeechBubble.visible = false;
					}
				}
				
				if (SpeechController.runningCinematic) {
					cinematicOver = Cinematics.update(BattleController.currentMap);
				}
				
				if (cinematicOver) {
					if (SpeechController.speechQueue.length >= 1) {
						var nextSpeech:SpeechBubbleData = SpeechController.speechQueue[0];
						SpeechController.speechQueue.splice(0, 1);
						SpeechController.showSpeechBubble(nextSpeech);
						
						SpeechController.speechDelayCount = SpeechController.SPEECHDELAY;
						
						if (SpeechController.speechQueue.length == 0 && Controller.root.batman.currentFrame > 1) {
							Controller.root.batman.gotoAndPlay(22);
						}
					} else {
						SpeechController.endSpeech();
					}
					
					SpeechController.runningCinematic = false;
				}
				
			} else {
				SpeechController.speechDelayCount--;
			}
		}
		
		public static showSpeechBubble(speech:SpeechBubbleData) {
			if (SpeechController.currentSpeechBubble && SpeechController.currentSpeechBubble.parent) {
				SpeechController.currentSpeechBubble.parent.removeChild(SpeechController.currentSpeechBubble);
			}
			
			SpeechController.currentSpeechBubble = Main.addGAFMovieClip("SpeechBubble");

			Main.changeText(SpeechController.currentSpeechBubble.speech.speechText, Localizer.getlocalisedText(speech.speech), "speech");

			SpeechController.currentSpeechBubble.speech.speechText.x = -(SpeechController.currentSpeechBubble.speech.speechText.width / 2)-35;
			SpeechController.currentSpeechBubble.speech.speechText.y = -(SpeechController.currentSpeechBubble.speech.speechText.height / 2);

			var speechBubbleXOff:number = 0;
			var speechBubblePointerXOff:number = 0;
			var speechBubblePointerXScale:number = 1;
			if (speech.speakerClip.x < 320) {
				speechBubbleXOff = 30;
				speechBubblePointerXOff = 0;
				speechBubblePointerXScale = -1;
			} else {
				speechBubbleXOff = -30;
				speechBubblePointerXOff = 0;
				speechBubblePointerXScale = 1;
			}

			SpeechController.currentSpeechBubble.bubbleSizer.width = Math.round(SpeechController.currentSpeechBubble.speech.speechText.textField.width + 2);
			SpeechController.currentSpeechBubble.bubbleSizer.height = Math.round(SpeechController.currentSpeechBubble.speech.speechText.textField.height + 4);
			
			SpeechController.currentSpeechBubble.bubbleSizer.visible = false;

			if (SpeechController.currentSpeechBubble.bubbleSizer.scale.x>=1) {
				SpeechController.currentSpeechBubble.bubble.scale.x = SpeechController.currentSpeechBubble.bubbleSizer.scale.x;
			} else {
				SpeechController.currentSpeechBubble.bubble.scale.x = 1;
			}
			if (SpeechController.currentSpeechBubble.bubbleSizer.scale.y>=1) {
				SpeechController.currentSpeechBubble.bubble.scale.y = SpeechController.currentSpeechBubble.bubbleSizer.scale.y;
			} else {
				SpeechController.currentSpeechBubble.bubble.scale.y = 1;
			}
			
			SpeechController.currentSpeechBubble.pointer.x = 0;
			SpeechController.currentSpeechBubble.pointer.y = SpeechController.currentSpeechBubble.bubble.height/2;
			SpeechController.currentSpeechBubble.pointer.scale.x = speechBubblePointerXScale;
			
			SpeechController.currentSpeechBubble.x = Math.floor((speech.speakerClip.x + speechBubbleXOff));
			SpeechController.currentSpeechBubble.y = speech.speakerClip.y - speech.speakerClip.height - 30;
			
			if (SpeechController.currentSpeechBubble.parent != SpeechController.speechBubbleContainer) {
				SpeechController.speechBubbleContainer.addChild(SpeechController.currentSpeechBubble);
			}
			
			var speechBubbleBounds:Rectangle = SpeechController.currentSpeechBubble.getBounds(Controller.root);
			if (speechBubbleBounds.left < 0) {
				SpeechController.currentSpeechBubble.x -= speechBubbleBounds.left;
			} else
			if (speechBubbleBounds.right > 640) {
				var shift:number = speechBubbleBounds.right - 640;
				SpeechController.currentSpeechBubble.x -= shift;
			}

			SpeechController.currentSpeechBubble.bubble.x -= SpeechController.currentSpeechBubble.bubble.width/2;
			SpeechController.currentSpeechBubble.bubble.y -= SpeechController.currentSpeechBubble.bubble.height/2;
		}
		
		public static speedUp() {
			SpeechController.speechDelayCount = 0;
		}
		
		public static endSpeech() {
			SpeechController.running = false;
			if (SpeechController.currentSpeechBubble.parent) {
				SpeechController.currentSpeechBubble.parent.removeChild(SpeechController.currentSpeechBubble);
			}
		}
	}
}

import SpeechController = com.ussgames.battleTactics.SpeechController;
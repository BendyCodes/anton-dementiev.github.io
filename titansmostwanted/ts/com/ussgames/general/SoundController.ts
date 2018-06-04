module com.ussgames.general
{
	export class SoundController
	{
		public static soundOn:boolean = true;
		public static musicOn:boolean = true;
		
		public static currentMusicID:string;
		
		public static soundButton:any;
		public static musicButton:any;
		
		public static updateSoundButtons():void {
			if (SoundController.soundButton) {
				SoundController.soundButton.update();
			}
			if (SoundController.musicButton) {
				SoundController.musicButton.update();
			}
		}
		
		public static toggleSound():void {
			SoundController.soundOn = !SoundController.soundOn;
			SoundController.updateSoundButtons();
			Controller.saveSoundSettings();
		}
		
		public static toggleMusic():void {
			SoundController.musicOn = !SoundController.musicOn;

			if (!SoundController.musicOn) {
				SoundController.stopMusic(true);
			} else {
				if (SoundController.currentMusicID != "" && SoundController.currentMusicID != undefined) {
					var musicToPlay:string = SoundController.currentMusicID;
					SoundController.currentMusicID = "";
					SoundController.playMusic(musicToPlay);
				}
			}
			SoundController.updateSoundButtons();
			Controller.saveSoundSettings();
		}
		
		public static playSound(soundID:string):void {
			soundID = soundID.toLowerCase();

			if (SoundController.soundOn && Main.visibilityState && Main.soundData[soundID] && soundID != "") {
				Main.soundData[soundID].play();
			}
		}
		
		public static playMusic(musicID:string):void {
			if (SoundController.musicOn && musicID != "" && (musicID != SoundController.currentMusicID)) {
				SoundController.stopMusic(true);
				Main.soundMusic = Main.soundData[musicID];
				Main.soundMusic.play();
				//Main.soundMusic.unmute();
			}

			SoundController.currentMusicID = musicID;
		}
		
		public static stopMusic(toggle:boolean = false):void {
			if (!toggle) {
				SoundController.currentMusicID = "";
			}

			if (Main.soundMusic) {
				Main.soundMusic.stop();
				//Main.soundMusic.mute();
			}
		}
	}
}

import SoundController = com.ussgames.general.SoundController;
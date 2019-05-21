/**
 * Created by Jura on 30.11.2015.
 */
GodStep.TagTrack = function(url, isLoad) {
    PIXI.EventTarget.call(this);
    var audio = this.audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    audio.volume = .7;
    audio.preloader = this;
    audio.onprogress = this.h_progress;
    audio.onloadeddata = this.h_loaded;
    this.isPlaying = false;
    if(isLoad) {
        audio.load();
        this.isLoading = true;
    }
}; extend(GodStep.TagTrack, Object);

GodStep.TagTrack.PROGRESS = 'progress_load';
GodStep.TagTrack.LOADED = 'loaded';
GodStep.TagTrack.ENDED = 'ended';

pro.stop = function() {
    this.audio.pause();
};
pro.play = function(p) {
    this.isPlaying = true;
    if(p != null) {
        this.audio.currentTime = p;
    }
    this.audio.play();
};

pro.h_progress = function(e) {
    if(this.buffered.length) {
        dispatch(this.preloader, GodStep.TagTrack.PROGRESS,  this);
    }
};
pro.h_loaded = function() {
    this.preloader.isLoading = false;
    this.addEventListener('ended', this.preloader.h_ended, false);
    dispatch(this.preloader, GodStep.TagTrack.LOADED);
    trace('TagTrack: Loaded //' + this.preloader.audio.src);
};
pro.h_ended = function() {
    dispatch(this.preloader, GodStep.TagTrack.ENDED);
};
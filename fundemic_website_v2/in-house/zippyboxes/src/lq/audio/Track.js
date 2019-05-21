
            GodStep.Track = function (url) {
                this.context = GodStep.Mejdu.audio.context;
                this.source = this.context.createBufferSource();
                this.destination = this.context.destination;
                this.source.connect(this.destination);
                this.load(url);
            };


            pro = GodStep.Track.prototype = Object.create( Object.prototype );

                pro.load = function(url) {
                    var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'arraybuffer';
                        xhr.onload = this.h_loaded;
                        xhr.track = this;
                        xhr.send();
                };


                pro.play = function() {
                    this.source.start(0);
                };
                // listeners
                pro.h_loaded = function(e) {
                    trace(GodStep.TRACK_LOADED);
                    var track = e.currentTarget.track;
                        track.context.decodeAudioData(this.response, function(buffer, a) {
                        track.source.buffer = buffer;
                        trace(GodStep.TRACK_DECODED);
                            track.play();

                        },  track.h_error);
                };
                pro.h_error = function(e) {
                    trace(GodStep.ERR_AUDIO_DECODE + e);
                };
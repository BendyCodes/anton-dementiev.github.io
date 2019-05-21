// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##   #  #  ###   #   ##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~####  #  #  #  #  #  #  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#  #   ##   ###   #   ##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
include('lq/audio/Track');
                                             GodStep.Audio = function () {
                                                 GodStep.Mejdu.audio = this;

                                                 GodStep.Audio.lastError = 'OK';
                                                   // var context = new webkitOfflineAudioContext(2, 7*48000, 48000);

                                                     try { window.AudioContext = window.AudioContext||window.webkitAudioContext;
                                                            GodStep.Audio.context = this.context = new AudioContext();  }
                                                     catch(e) { GodStep.Audio.lastError =  GodStep.ERR_AUDIO_SUPPORT;
                                                         trace(GodStep.ERR_AUDIO_SUPPORT);
                                                     }

                                                     this.tracks = [];

                                             };




                     pro = GodStep.Audio.prototype = Object.create( Object.prototype );
                     pro.update = function() {

                     };
                     pro.loadTrack = function(url) {
                          var track = this.tracks[url] = new GodStep.Track(url);
                          this.tracks.push(track);
                          return track;
                     };



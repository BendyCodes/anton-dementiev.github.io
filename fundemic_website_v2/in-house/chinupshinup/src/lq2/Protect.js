/* Uploader */
GodStep.Protect = function (){
    this.files = [];
    this.isLoading = false;
};
var pro =  GodStep.Protect.prototype = Object.create( Object.prototype );

pro.loadJS = function(path, includeText) {
    this.isLoading = true;
    var oReq = new XMLHttpRequest();
    oReq.path = path;
    oReq.includeText = includeText;
    oReq.protect = this;
    oReq.onload = this.h_loaded;
    oReq.open("get", this.parentFolder + path + '.js', true);
   // oReq.overrideMimeType('text/plain; charset=UTF-8');
    //trace('~~~~~~~~~~~~~ ' + path + '.js');
    try {
        oReq.send();
    } catch (e) {
        trace(e);
    }

};

pro.saveJS = function() {
   // trace(this.text);
    var mintext = jsmin('//Mejdu FrameWork powered by PIXI', this.text, this.power);
    var textFileAsBlob = new Blob([(this.power == 0) ?  this.text : mintext ], {type:'text/plain'});
    var fileNameToSaveAs = this.name + '.min.js';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();

};
pro.h_loaded = function(e) {
    var protect = e.currentTarget.protect;
    var isFinished = false;
    if(!protect.text) {
        protect.text = this.response;
    } else
    {
        protect.text = protect.text.replace("include('" + e.currentTarget.path + "');", '\n' + this.response + '\n');
    }
    protect.isLoading = false;

    trace('>>>>>>>>>>>>> ' + e.currentTarget.path + '.js' + " SCRIPT:" +  protect.text.length);
    if(protect.files.length > 0) {
        protect.loadJS(protect.files[0]);
        protect.files.splice(0, 1);
    } else {
        protect.isFinished = true;
    }

    var str = this.response;
    var regex = /include/gi, result, resultBKT;
    while ( (result = regex.exec(str)) ) {
        var s = str.substr(result.index + 9, 45);
        var commentString = str.substr(result.index-3, 3);

            var regex2 = /\)/gi;
            resultBKT = regex2.exec(s);
            if(str[result.index+8] == "'" ) {
                if(resultBKT) {
                    var res = str.substr(result.index + 9, resultBKT.index-1);
                    var includeText = str.substr(result.index, resultBKT.index+11);

                    if(!protect.isLoading) {
                       protect.isFinished = false;
                       if(!(commentString.search('/') >= 0)) {
                           protect.loadJS(res, includeText);
                       }
                    }
                    else protect.files.push(res);

                    protect.lastIncludeText = includeText

                }
            }

    }
    if(protect.isFinished) {
        protect.saveJS();
        trace('Finished');
    }
};



function startProtect(path, power, parentFolder) {
    var protect = new GodStep.Protect();
    var arr = path.split('/');
    protect.power = power;
    protect.parentFolder = parentFolder || '';
    protect.name = arr[arr.length-1];
    protect.loadJS(path);
}


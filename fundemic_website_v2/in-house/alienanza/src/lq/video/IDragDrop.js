GodStep.IDragDrop = function () {
    this.div.ondragover =  this.h_dragOver = function(e) {
        e.stopPropagation();  if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        var rect = this.getBoundingClientRect();
        for(var j = 0, frame; frame = this.mejdu.frames[j]; j++) {
            if (frame instanceof GodStep.DDFrame) {
                frame.dropOver(e.clientX - rect.left, e.clientY - rect.top);
            }
        }
    };

    this.div.ondrop =  this.h_dragDrop = function(e) {
        e.stopPropagation();  if (e.preventDefault) e.preventDefault();
        var rect = this.getBoundingClientRect();
        var files = e.target.files || e.dataTransfer.files;
        for(var j = 0, frame; frame = this.mejdu.frames[j]; j++) {
            if(frame instanceof GodStep.DDFrame) {
                frame.dropFiles(files, e.clientX - rect.left, e.clientY - rect.top);
            }
        }
    };

};

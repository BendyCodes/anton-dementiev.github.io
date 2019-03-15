SS.Pattern = function(cells, isCut) {
    if(isCut) {
        this.cells = [];
        var isFirst = false;
        var lastEmptyLine = 0;
        var lastEmptyLine = 0;
        for(var i = 0; i<cells.length; i+=2) {
            if(cells[i] == 0 && cells[i+1] == 0 && !isFirst) {

            } else {
                if(!isFirst) {
                    isFirst = true;
                    this.cells.push(cells[i]);
                    this.cells.push(cells[i+1]);
                } else {
                    if(cells[i] == 0 && cells[i+1] == 0) {
                        if(lastEmptyLine == null) {
                            lastEmptyLine = this.cells.length;
                        }
                    } else {
                        lastEmptyLine = null;
                    }
                    this.cells.push(cells[i]);
                    this.cells.push(cells[i+1]);
                }
            }
        }
        if(lastEmptyLine != null) {
            this.cells.splice(lastEmptyLine, cells.length - lastEmptyLine);
        }
    } else {
        this.cells = cells || SS.PatternView.EMPTY.cells.slice(0);
    }
};
 extend(SS.Pattern, Object);
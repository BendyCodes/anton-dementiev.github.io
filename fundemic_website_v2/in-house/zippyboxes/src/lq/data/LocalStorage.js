GodStep.LocalStorage = function() {
    GodStep.LocalStorage.instance = this;
    try {
        if('localStorage' in window && window['localStorage'] !== null){
            this.storage = window['localStorage'];
            window.addEventListener("storage", this.h_storage, false);
            this.isAvailable = true;

        }
    } catch (e) {
        GodStep.LocalStorage.instance.isAvailable = false;
        alert('LocalStorage CATCH');
       // alert('Local Storage not available');
    }
};

extend(GodStep.LocalStorage, Object);


pro.getData = function(slot) {
    if(!this.isAvailable) {
        return null;
    }
    var data = this.storage.getItem(slot || "data");
    if(data != null) return JSON.parse(data);
    else {
        trace('no data');
        return null;
    }
};
pro.setData = function(data, slot) {
    var d = JSON.stringify(data);
    trace('local storage [' + (slot || 'data') + ']');
    trace(d);
    try {
        this.storage.setItem(slot || "data", d);
    } catch(e) {
        trace('LOCAL STORAGE ERROR');
    }
};

GodStep.Clear = function(slot) {
    GodStep.LocalStorage.instance.setData(null, slot);
};
GodStep.SaveLocal = function(data, slot) {
    GodStep.LocalStorage.instance.setData(data, slot);
};
GodStep.LoadText = function(text) {
    return JSON.parse(text);
};
GodStep.LoadLocal = function(slot) {
    return GodStep.LocalStorage.instance.getData(slot);
};


pro.h_storage = function(e) {
    trace('storage' + e);
};

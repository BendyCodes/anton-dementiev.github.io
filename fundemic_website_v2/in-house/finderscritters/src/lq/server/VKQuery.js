
GodStep.VKQuery = function(query, cf, fields, target) {
    this.query = query;
    this.fields = fields;
    this.callbackFunc = cf;
    this.target = target;
};

GodStep.VKQuery.prototype = Object.create( Object.prototype );

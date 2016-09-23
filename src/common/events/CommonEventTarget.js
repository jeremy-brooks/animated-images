var CommonEventTarget = function() {
    this.listeners = {};
};

CommonEventTarget.prototype.listeners = null;
CommonEventTarget.prototype.addEventListener = function(type, callback) {
    if(!(type in this.listeners)) {
        this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
};

CommonEventTarget.prototype.removeEventListener = function(type, callback) {
    if(!(type in this.listeners)) {
        return;
    }
    var stack = this.listeners[type];
    for(var i = 0, l = stack.length; i < l; i++) {
        if(stack[i] === callback){
            stack.splice(i, 1);
            return this.removeEventListener(type, callback);
        }
    }
};

CommonEventTarget.prototype.dispatchEvent = function(event) {
    if(!(event.type in this.listeners)) {
        return;
    }
    var stack = this.listeners[event.type];
    event.target = this;
    for(var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
    }
};

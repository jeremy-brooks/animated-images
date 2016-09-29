var ImageModel = function (uri, date) {
    this.uri;
    this.date;
    (function (scope) {
        scope.uri = uri;
        scope.date = date;
    })(this);
};
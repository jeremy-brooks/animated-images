var Images = function () {
    (function (scope) {
        scope.data = {};
    })(this);

    this.addYear = function (year) {
        this.years[String(year)] = {
            months: {}
        }
    };

    this.addMonthToYear = function (year, month) {
        var yearToAddTo = this.years[String(year)];
        if (yearToAddTo){
            var monthToAdd = yearToAddTo[String(month)];
            if (monthToAdd && !yearToAddTo[monthToAdd]){
                yearToAddTo[monthToAdd] = {};
            }
        }
    };

    this.addImage = function (image) {
        this.data[image.id] = image;
    };

    this.removeImage = function (image) {
        if (this.data[image.id]){
            delete this.data[image.id];
        }
    };

    this.clear = function () {
        this.data = null;
        this.data = {};
    }
};
var DateRange = function () {
    var startDate;
    var endDate;

    (function (scope) {
        addEventListener(ai.observable.NEW_START_DATE_SELECTED_EVENT, scope.setStartDate);
        addEventListener(ai.observable.NEW_END_DATE_SELECTED_EVENT, scope.setEndDate);
    })(this);
    
    function notify() {
        dispatchEvent(new CustomEvent(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, {
            'detail': this.valueOf()
        }));
    }
    
    this.setStartDate = function (value) {
        startDate = value;
        notify();
    };

    this.setEndDate = function (value) {
        endDate = value;
        notify();
    };

    this.getStartDate = function () {
        return startDate;
    };

    this.getEndDate = function () {
        return endDate;
    };

    this.valueOf = function () {
        return {
            "startDate": this.getStartDate(),
            "endDate": this.getEndDate()
        }
    }
};

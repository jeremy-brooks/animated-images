var DateRange = function () {
    var startDate;
    var endDate;

    this.setStartDate = function (value) {
        startDate = value;
        dispatchEvent(new CustomEvent(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, {
            'detail': this.valueOf()
        }))
        ;
    };

    this.setEndDate = function (value) {
        endDate = value;
        dispatchEvent(new CustomEvent(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, {
            'detail': this.valueOf()
        }));
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

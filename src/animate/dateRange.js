var DateRange = function () {
    var startDate;
    var endDate;

    this.START_DATE_CHANGED_EVENT = "startDateChangedEvent";
    this.END_DATE_CHANGED_EVENT = "endDateChnagedEvent";

    this.setStartDate = function (value) {
        startDate = value;
        this.dispatchEvent(new CustomEvent(this.START_DATE_CHANGED_EVENT, {
            startDate: this.getStartDate()
        }));
    };

    this.setEndDate = function (value) {
        endDate = value;
        this.dispatchEvent(new CustomEvent(this.END_DATE_CHANGED_EVENT, {
            startDate: this.getEndDate()
        }));
    };

    this.getStartDate = function () {
        return startDate;
    };

    this.getEndDate = function () {
        return endDate;
    };
};

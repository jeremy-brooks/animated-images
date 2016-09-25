var AnimationController = function (view) {
    
    var animationView = $(view);
    var startDate;
    var endDate;

    this.handleDateRangeChangeEvent = function (event) {
        startDate = event.detail.startDate;
        endDate = event.detail.endDate;
        console.log(startDate, endDate);
    }
};

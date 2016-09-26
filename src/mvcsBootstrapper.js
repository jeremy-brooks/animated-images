var MvcsBootstrapper = function (model, viewController, service) {
    (function () {
        addEventListener(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, service.handleDateRangeChangeEvent);
    })();
};
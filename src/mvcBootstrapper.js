var MvcBootstrapper = function (viewController) {
    (function () {
        addEventListener(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, viewController.handleDateRangeChangeEvent);
    })();
};
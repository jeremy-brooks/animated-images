var DateRangeController = function (startDatePicker, endDatePicker) {
    startDatePicker.datepicker({
        onClose: function (startDate) {
            dispatchEvent(new CustomEvent(ai.observable.NEW_START_DATE_SELECTED_EVENT, {
                "detail": startDate
            }));
        }
    });
    endDatePicker.datepicker({
        onClose: function (endDate) {
            dispatchEvent(new CustomEvent(ai.observable.NEW_END_DATE_SELECTED_EVENT, {
                "detail": endDate
            }));
        }
    });
};

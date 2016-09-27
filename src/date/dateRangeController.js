var DateRangeController = function (startDatePicker, endDatePicker) {

    addEventListener(ai.observable.DATE_RANGE_MAX_MIN_CHANGED, function (event) {
        var min = event.detail.min.toDate();
        var max = event.detail.max.toDate();
        startDatePicker.datepicker("option", "minDate", min);
        setStartDatePickerMax(max);
        setEndDatePickerMin(min);
        endDatePicker.datepicker("option", "maxDate", max);
    });

    startDatePicker.datepicker({
        onClose: function (startDate) {
            setEndDatePickerMin(startDate);
            dispatchEvent(new CustomEvent(ai.observable.NEW_START_DATE_SELECTED_EVENT, {
                "detail": startDate
            }));
        }
    });

    endDatePicker.datepicker({
        onClose: function (endDate) {
            setStartDatePickerMax(endDate);
            dispatchEvent(new CustomEvent(ai.observable.NEW_END_DATE_SELECTED_EVENT, {
                "detail": endDate
            }));
        }
    });

    function setStartDatePickerMax(endDate) {
        if (endDate){
            startDatePicker.datepicker("option", "maxDate", endDate);
        }
    }

    function setEndDatePickerMin(startDate) {
        if (startDate){
            endDatePicker.datepicker("option", "minDate", startDate);
        }
    }
};

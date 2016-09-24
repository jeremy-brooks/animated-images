var DateRangeController = function (startDatePicker, endDatePicker) {

    function onCloseHandler(data, target) {
        if (target.id === startDatePicker.attr("id")){
            ai.model.dateRange.setStartDate(data);
        } else {
            ai.model.dateRange.setEndDate(data);
        }
    }
    
    startDatePicker.datepicker({
        onClose: onCloseHandler
    });
    endDatePicker.datepicker({
        onClose: onCloseHandler
    });
};

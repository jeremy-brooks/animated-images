var AnimationController = function (view, model) {
    
    var animationView = $(view);
    var dateRange = model;

    animationView.on("slid.bs.carousel", function (event) {
        animationView[0].dispatchEvent(new CustomEvent(dateRange.START_DATE_CHANGED_EVENT, {
            detail: "blah"
        }));
    });

    animationView.on(dateRange.START_DATE_CHANGED_EVENT, function (data) {
        console.log(data);
    });
};

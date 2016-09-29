var ImageService = function (imagesModel) {
    var startDate;
    var endDate;
    var images = new Images();
    var nextImages = new Images();
    var prevImages = new Images();
    var imageMetaData;

    addEventListener(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, function (event) {
        startDate = event.detail.startDate;
        endDate = event.detail.endDate;
        getImagesByDateRange(startDate, endDate);
    });

    function getImagesByDateRange(startDate, endDate){
        // get the first 10 images
        
        // and get the next 10 images
        // and get the previous 10 images
        console.log("now get some images!!");
    }
};

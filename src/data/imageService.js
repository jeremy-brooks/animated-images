var ImageService = function (imagesModel) {
    var startDate;
    var endDate;
    var currentImages = [];
    var nextImages = [];
    var prevImages = [];
    var imageMetaData;
    
    addEventListener(ai.observable.DATE_RANGE_DATA_CHANGED_EVENT, function (event) {
        startDate = event.detail.startDate;
        endDate = event.detail.endDate;
        getImagesByDateRange(startDate, endDate);
    });

    (function () {
        imageMetaData = [];
        $.ajax({
            type: "GET",
            url: "data/dataIndex.txt",
            dataType: "text",
            success: function (data) {
                var imageFileNames = data.split("\n");
                if (imageFileNames.length > 0) {
                    imageFileNames.length = imageFileNames.length - 1;
                }
                for (var imageNameIndex = 0, imageName = ""; imageName = imageFileNames[imageNameIndex]; imageNameIndex++) {
                    var imageNameAsDate = moment(imageName.substring(0, 8), "YYYYMMDD");
                    var image = new ImageModel("data/" + imageName, imageNameAsDate);
                    imageMetaData.push(image);
                }
                dispatchEvent(new CustomEvent(ai.observable.DATE_RANGE_MAX_MIN_CHANGED, {
                    "detail": {
                        "min": imageMetaData[0].date,
                        "max": imageMetaData[imageMetaData.length-1].date
                    }
                }));
            }
        });
    })();

    function getImagesByDateRange(startDate, endDate){
        currentImages.length = 0;
        nextImages.length = 0;
        prevImages.length = 0;
        var settingCurrentImages = false;
        var settingNextImages = false;
        if (startDate && endDate){
            for (var imageIndex = 0, image; image = imageMetaData[imageIndex]; imageIndex++){
                var imageDateAsString = image.date.format("MM/DD/YYYY");
                if (startDate == imageDateAsString){
                    settingCurrentImages = true;
                }
                if (settingCurrentImages){
                    currentImages.push(image);
                    if (currentImages.length == 10){
                        settingCurrentImages = false;
                        settingNextImages = true;
                    }
                } else if (settingNextImages) {
                    nextImages.push(image);
                    if (nextImages.length == 10){
                        settingNextImages = false;
                        break;
                    }
                }
                if (endDate == imageDateAsString){
                    break;
                }
            }
        }
        dispatchEvent(new CustomEvent(ai.observable.IMAGE_SET_CHANGED, {
            "detail": {
                "currentImages": currentImages,
                "nextImages": nextImages
            }
        }));
    }
};

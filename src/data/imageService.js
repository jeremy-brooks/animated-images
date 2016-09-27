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
                    var image = {
                        "fileName": imageName,
                        "date": imageNameAsDate
                    };
                    imageMetaData.push(image);
                }
            }
        });
    })();

    function getImagesByDateRange(startDate, endDate){
        // get the first 10 images
        // and get the next 10 images
        // and get the previous 10 images
        console.log(imageMetaData);
    }
};

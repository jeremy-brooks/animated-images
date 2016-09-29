var ImageMetaDataService = function () {
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
                        "uri": "data/" + imageName,
                        "date": imageNameAsDate
                    };
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
};

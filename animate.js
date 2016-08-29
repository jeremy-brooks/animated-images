/**
 * Created by Jeremy on 27/08/2016.
 */
var AnimationController = function() {

    (function (localScope) {
        localScope.images = null;
        localScope.framesPerSecond = 1;
        localScope.loopRepeat = false;
        localScope.currentImageIndex = 0;
        localScope.startImageIndex = 0;
        localScope.animationTimer = NaN;
        localScope.imageLocationBase = "data/";
        localScope.startYear = "";
        localScope.startMonth = "";
        localScope.endYear = "";
        localScope.endMonth = "";
        localScope.years = [];
        localScope.months = [];
    })(this);

    // set images
    this.getImageIndex = function () {
        var localScope = this;
        $.ajax({
            type: "GET",
            url: "data/dataIndex.txt",
            dataType: "text",
            success: function (data) {
                localScope.images = data.split("\n");
                localScope.years.length = 0;
                localScope.months.length = 0;
                if (localScope.images.length > 0) {
                    localScope.images.length = localScope.images.length - 1;
                }
                for (var imageNameIndex = 0, imageName = ""; imageName = localScope.images[imageNameIndex]; imageNameIndex++) {
                    localScope.images[imageNameIndex] = localScope.imageLocationBase + imageName;
                    localScope.addOptionToSelector(imageName, "setStartImageSelector");
                    var year = imageName.substring(0,4);
                    if (localScope.years.indexOf(year) == -1) {
                        localScope.years.push(year);
                        localScope.addOptionToSelector(year, "startYearSelector");
                        localScope.addOptionToSelector(year, "endYearSelector");
                    }
                    var month = imageName.substring(4,6);
                    if (localScope.months.indexOf(month) == -1) {
                        localScope.months.push(month);
                        localScope.addOptionToSelector(month, "startMonthSelector");
                        localScope.addOptionToSelector(month, "endMonthSelector");
                    }
                    if (imageNameIndex == 0){
                        document.getElementById("imageToAnimate").src = localScope.images[localScope.currentImageIndex];
                    }
                }
            }
        });
    };

    this.addOptionToSelector = function (option, selectorId) {
        var newOption = new Option(option, option);
        document.getElementById(selectorId).appendChild(newOption);
    };
    
    // pause animation
    this.pauseAnimation = function () {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }
    };

    // stop animation
    this.stopAnimation = function () {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.currentImageIndex = 0;
            document.getElementById("imageToAnimate").src = this.images[this.currentImageIndex];
        }
    };

    // start animation
    this.startAnimation = function () {
        // set image engine
        var localScope = this;
        localScope.animationTimer = setInterval(function () {
            document.getElementById("imageToAnimate").src = localScope.images[localScope.currentImageIndex];
            localScope.currentImageIndex++;
            if (localScope.currentImageIndex == localScope.images.length) {
                if (localScope.loopRepeat) {
                    localScope.currentImageIndex = 0;
                    return;
                }
                localScope.stopAnimation();
            }
        }, localScope.framesPerSecond * 1000);
    };
    
    this.setPlaySpeed = function (speed) {
        this.pauseAnimation();
        this.framesPerSecond = speed;
        this.startAnimation();
    };
    
    this.setStartImage = function (value) {
        this.stopAnimation();
        this.startImageIndex = this.images.indexOf(this.imageLocationBase + value);
        this.currentImageIndex = this.startImageIndex;
        this.startAnimation();
    };

    this.setStartYear = function (value) {
        this.startYear = value;
    };

    this.setStartMonth = function (value) {
        this.startMonth = value;
    };

    this.setEndYear = function (value) {
        this.endYear = value;
    };

    this.setEndMonth = function (value) {
        this.endMonth = value;
    };
};
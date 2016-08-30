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
        localScope.startDay = "";
        localScope.years = [];
        localScope.months = [];
        localScope.days = [];
        localScope.startImage = "";
        localScope.isPaused = false;
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
                    localScope.images[imageNameIndex] = imageName;
                    var year = imageName.substring(0,4);
                    if (localScope.years.indexOf(year) == -1) {
                        localScope.years.push(year);
                        localScope.addOptionToSelector(year, "startYearSelector");
                    }
                    var month = imageName.substring(4,6);
                    if (localScope.months.indexOf(month) == -1) {
                        localScope.months.push(month);
                        localScope.addOptionToSelector(month, "startMonthSelector");
                    }
                    var day = imageName.substring(6,8);
                    if (localScope.days.indexOf(day) == -1){
                        localScope.days.push(day);
                        localScope.addOptionToSelector(day, "startDaySelector");
                    }
                    if (imageNameIndex == 0){
                        localScope.startImage = localScope.images[localScope.currentImageIndex];
                        localScope.setCurrentImage(localScope.startImage);
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
            this.isPaused = true;
        }
    };

    // stop animation
    this.stopAndResetAnimation = function () {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.currentImageIndex = 0;
            this.startImage = this.images[this.currentImageIndex];
            this.setCurrentImage(this.startImage);
        }
    };

    // start animation
    this.startAnimation = function () {
        // set image engine
        var localScope = this;
        if (localScope.isPaused){
            localScope.isPaused = false;
        }
        else if (localScope.startImage){
            localScope.currentImageIndex = localScope.images.indexOf(localScope.startImage);
        }
        localScope.animationTimer = setInterval(function () {
            localScope.setCurrentImage(localScope.images[localScope.currentImageIndex]);
            localScope.currentImageIndex++;
            if (localScope.currentImageIndex == localScope.images.length) {
                if (localScope.loopRepeat) {
                    localScope.currentImageIndex = 0;
                    return;
                }
                localScope.pauseAnimation();
            }
        }, localScope.framesPerSecond * 1000);
    };

    this.setCurrentImage = function (imageName) {
        this.currentImageIndex = this.images.indexOf(imageName);
        document.getElementById("imageToAnimate").src = this.imageLocationBase + imageName;
    };
    
    this.setPlaySpeed = function (speed) {
        this.pauseAnimation();
        this.framesPerSecond = speed;
        this.startAnimation();
    };
    
    this.setStartImage = function (value) {
        this.stopAndResetAnimation();
        this.startImage = value;
        this.setCurrentImage(value);
    };

    this.setStartYear = function (value) {
        this.startYear = value;
        for (var index = 0, image = ""; image = this.images[index]; index++){
            if (image.substring(0,4) === this.startYear){
                this.setStartImage(image);
                document.getElementById("startMonthSelector").disabled = "";
                return;
            }
        }
        document.getElementById("startMonthSelector").disabled = "disabled";
    };

    this.setStartMonth = function (value) {
        this.startMonth = value;
        for (var index = 0, image = ""; image = this.images[index]; index++){
            if (image.substring(0,4) === this.startYear){
                if (image.substring(4,6) === this.startMonth){
                    this.setStartImage(image);
                    document.getElementById("startDaySelector").disabled = "";
                    return;
                }
            }
        }
        document.getElementById("startDaySelector").disabled = "disabled";
    };

    this.setStartDay = function (value) {
        this.startDay = value;
        for (var index = 0, image = ""; image = this.images[index]; index++){
            if (image.substring(0,4) === this.startYear){
                if (image.substring(4,6) === this.startMonth){
                    if (image.substring(6,8) === this.startDay){
                        this.setStartImage(image);
                        return;
                    }
                }
            }
        }
    };
};
/**
 * Created by Jeremy on 27/08/2016.
 */
var AnimationController = function() {
    // store images
    this.images = null;

    // set frames per second
    this.framesPerSecond = 1;

    // set loop repeat
    this.loopRepeat = true;

    // record current image
    this.currentImageIndex = 0;

    // set animation engine
    this.animationTimer = NaN;

    // set images
    this.getImageIndex = function () {
        var localScope = this;
        $.ajax({
            type: "GET",
            url: "data/dataIndex.txt",
            dataType: "text",
            success: function (data) {
                localScope.images = data.split("\n");
                if (localScope.images.length > 0) {
                    localScope.images.length = localScope.images.length - 1;
                }
                for (var imageNameIndex = 0, imageName = ""; imageName = localScope.images[imageNameIndex]; imageNameIndex++) {
                    localScope.images[imageNameIndex] = "data/" + imageName;
                }
            }
        });
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
    }
};
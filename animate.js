/**
 * Created by Jeremy on 27/08/2016.
 */
// store images
var images = null;

// set frames per second
var framesPerSecond = 1;

// set loop repeat
var loopRepeat = true;

// record current image
var currentImageIndex = 0;

// set animation engine
var animationTimer = null;

// set paused state
isAnimationPaused = false;

// set images
getImageIndex = function () {
    $.ajax({
        type: "GET",
        url: "data/dataIndex.txt",
        dataType: "text",
        success: function(data) {
            images = data.split("\n");
            if (images.length > 0){
                images.length = images.length-1;
            }
            for (var imageNameIndex = 0, imageName = ""; imageName = images[imageNameIndex]; imageNameIndex++){
                images[imageNameIndex] = "data/" + imageName;
            }
        }
    });
};

// pause animation
pauseAnimation = function(){
    if (animationTimer){
        clearInterval(animationTimer);
        isAnimationPaused = true;
    }
};

// stop animation
stopAnimation = function () {
    if (animationTimer){
        clearInterval(animationTimer);
        currentImageIndex = 0;
        document.getElementById("imageToAnimate").src = images[currentImageIndex];
        document.getElementById("frameName").innerHTML = "Current image: " + images[currentImageIndex];
    }
};

// start animation
startAnimation = function () {
    // set image engine
    animationTimer = setInterval(function () {
        document.getElementById("imageToAnimate").src = images[currentImageIndex];
        document.getElementById("frameName").innerHTML = "Current image: " + images[currentImageIndex];
        currentImageIndex++;
        if (currentImageIndex == images.length){
            if (loopRepeat){
                currentImageIndex = 0;
                return;
            }
            stopAnimation();
        }
    }, framesPerSecond * 1000);
};

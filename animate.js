/**
 * Created by Jeremy on 27/08/2016.
 */
// store images
var images = [
    "data/1.png",
    "data/2.png",
    "data/3.png",
    "data/4.png",
    "data/5.png"
];

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
        document.getElementById("imageToAnimate").src = "data/play-button-icon-png-0.png";
        document.getElementById("frameName").innerHTML = "";
    }
};

// start animation
startAnimation = function () {
    // set image engine
    animationTimer = setInterval(function (a, b) {
        document.getElementById("imageToAnimate").src = images[currentImageIndex];
        document.getElementById("frameName").innerHTML = "Playing: " + images[currentImageIndex];
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

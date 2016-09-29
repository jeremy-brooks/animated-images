var AnimationController = function (view) {
    
    var animationView = $(view);

    addEventListener(ai.observable.IMAGE_SET_CHANGED, function (event) {
        console.log(event.detail);
    });
    
};

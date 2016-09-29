var AnimationController = function (view) {
    
    this.animationView = $(view);
    this.viewId = this.animationView.attr("id");
    this.images = $("#" + this.viewId + " .item img");

    this.setImagesInCarousel = function (currentImages, nextImages) {
        this.clearALlImages(this.images);
        for (var imageIndex = 0, image; image = currentImages[imageIndex]; imageIndex++){
            $(this.images[imageIndex]).attr("src", image.uri);
        }
    };

    this.clearALlImages = function (images) {
        for (var imageIndex = 0, image; image = images[imageIndex]; imageIndex++){
            $(image).attr("src", "");
        }
    };

    (function(scope){
        scope.clearALlImages(scope.images);
        addEventListener(ai.observable.IMAGE_SET_CHANGED, function (event) {
            scope.setImagesInCarousel(event.detail.currentImages, event.detail.nextImages);
        });
    })(this);
    
};

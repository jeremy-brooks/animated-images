var AnimationController = function (view) {
    
    this.animationView = $(view);
    this.viewId = this.animationView.attr("id");
    this.images = $("#" + this.viewId + " .item img");
    this.imageContainer = $("#carouselItems");
    this.itemTemplate =
        '<div class="item">' +
            '<img class="img-responsive center-block" src="{imageSrc}" alt="{altText}">' +
        '</div>';

    this.setImagesInCarousel = function (currentImages, nextImages) {
        this.animationView.carousel("pause");
        this.clearImages();
        for (var imageIndex = 0, image; image = currentImages[imageIndex]; imageIndex++){
            var newItem = this.itemTemplate.replace("{imageSrc}", image.uri).replace("{altText}", image.date);
            if (imageIndex === 0){
                newItem = $(newItem).addClass("active");
            }
            $(this.imageContainer).append($(newItem));
        }
        this.animationView.carousel("cycle");
    };

    this.clearImages = function (images) {
        $(this.imageContainer).empty();
    };

    (function(scope){
        scope.clearImages();
        addEventListener(ai.observable.IMAGE_SET_CHANGED, function (event) {
            scope.setImagesInCarousel(event.detail.currentImages, event.detail.nextImages);
        });
    })(this);
    
};

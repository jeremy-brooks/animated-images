var AnimationController = function (viewToBootstrap) {
    var animationView = $(viewToBootstrap);

    animationView.on("slid.bs.carousel", function (event) {
        console.log(event);
    });
};

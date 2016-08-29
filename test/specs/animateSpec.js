describe("AnimationController", function () {

    var animationController;

    beforeEach(function () {
        animationController = new AnimationController();
    });

    afterEach(function () {
        animationController = null;
    });

    it("will not repeat by default", function () {
        expect(animationController.loopRepeat).toBe(false);
    })

});

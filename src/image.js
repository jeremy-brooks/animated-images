var Image = function (imageName, year, month, day) {
    
    this.id = imageName;
    this.imageName = imageName;
    this.year = year;
    this.month = month;
    this.day = day;
    
    this.createMeFromImageName = function (imageName) {
        this.id = imageName;
        this.imageName = imageName;
        this.year = imageName.substring(0,4);
        this.month = imageName.substring(4,6);
        this.day = imageName.substring(6,8);
    }
};

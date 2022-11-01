const ImageModel = require("../models/image-model");

class ImageService {
    async uploadImage (image) {
        const savedImage = await ImageModel.create(image)
        return savedImage
    }
    async getImages(heroId) {
        const images = await ImageModel.find({superhero: heroId}).exec();
        return images
    }
}
module.exports = new ImageService ()
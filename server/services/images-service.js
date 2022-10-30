const ImageModel = require("../models/image-model");

class ImageService {
    async uploadImage (image) {
        const savedImage = await ImageModel.create(image)
        return savedImage
    }
    async getImages(heroId) {
        const image = await ImageModel.find({superhero: heroId}).exec();
        return image
    }
}
module.exports = new ImageService ()
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
    async deleteImage(id) {
        const image = ImageModel.findByIdAndDelete(id)
        return image
    }
    async deleteImages(heroId) {
        const i = ImageModel.deleteMany({superhero: heroId})
        return i
    }
}
module.exports = new ImageService ()
import GalleryService from "../services/GalleryService"

export const getImagesAsync = async (id) => {
    return await GalleryService.getImages(id)
}
export const uploadImageAsync = async (id, formData) => {
    return await GalleryService.uploadImage(id, formData)
}
export const deleteImageAsync = async (imageId) => {
    return await GalleryService.deleteImage(imageId)
}
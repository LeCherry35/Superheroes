import axios from 'axios'
const API_URL ='http://localhost:5000/api'

export default class GalleryService {
    static async getImages(heroId) {
        return axios.get(API_URL + `/getImages?heroId=${heroId}`)
    }
    static async uploadImage(heroId, formData) {
        return axios.post(API_URL + `/uploadImage?heroId=${heroId}`, formData)
    }
}
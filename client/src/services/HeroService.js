import axios from 'axios'
const API_URL ='http://localhost:5000/api'

export default class HeroService {
    static async addHero(nickname, name, origin, superpowers, phrase) {
        return axios.post(API_URL + '/addHero',{nickname, real_name: name, origin_description: origin, superpowers, catch_phrase: phrase})
    }

    static async getHeroes(q, page) {
        const url = API_URL + `/getHeroes?q=${q}&page=${page}`
        return axios.get(url)
    }
    static async editHero(nickname, name, origin, superpowers, phrase, id) {
        return axios.put(API_URL + `/editHero?id=${id}`,{nickname, real_name: name, origin_description: origin, superpowers, catch_phrase: phrase})
    }
    static async getHero(id) {
        return axios.get(API_URL + `/getHero/${id}`)
    }
    static async getImages(heroId) {
        return axios.get(API_URL + `/getImages?heroId=${heroId}`)
    }
    static async uploadImage(heroId, formData) {
        return axios.post(API_URL + `/uploadImages?heroId=${heroId}`, formData)
    }
    static async deleteHero(id) {
        return axios.delete(API_URL + `/deleteHero?id=${id}`)
    }
}
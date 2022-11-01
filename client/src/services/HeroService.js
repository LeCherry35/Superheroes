import axios from 'axios'
const API_URL ='http://localhost:5000/api'

export default class HeroService {
    static async addHero(formData) {
        return axios.post(API_URL + '/addHero',formData)
    }

    static async getHeroes(q, page) {
        const url = API_URL + `/getHeroes?q=${q}&page=${page}`
        return axios.get(url)
    }
    static async editHero(id, formData) {
        return axios.put(API_URL + `/editHero?id=${id}`,formData)
    }
    static async getHero(id) {
        
        console.log('a', await axios.get(API_URL + `/getHero/${id}`));
        return axios.get(API_URL + `/getHero/${id}`)
    }
    static async deleteHero(id) {
        return axios.delete(API_URL + `/deleteHero?id=${id}`)
    }
    static async getHeroesNumber() {
        return axios.get(API_URL +'/heroesNumber')
    }
}
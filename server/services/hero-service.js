const ApiError = require('../exceptions/api-error')
const HeroModel = require('../models/superhero-model') 

class HeroService {
    async addHero (hero) {
        if (!hero.nickname) {
            throw ApiError.BadRequest(`Nickname is not defined`)
        }
        if (!hero.superpowers) {
            throw ApiError.BadRequest(`${hero.nickname} requires superpowers`)
        }
        const existing = await HeroModel.findOne({nickname: hero.nickname})
        if (existing) {
            throw ApiError.BadRequest(`Hero with nickname ${hero.nickname} already exists`)
        }
        
        const createdHero = await HeroModel.create(hero)
        return createdHero 
    }
    async editHero (id, hero) {
        const editedHero = await HeroModel.findByIdAndUpdate({_id: id}, {$set: {nickname: hero.nickname, real_name: hero.real_name, origin_description: hero.origin_description,  superpowers: hero.superpowers,catch_phrase: hero.catch_phrase, image: hero.image}})
        return editedHero
    }
    async deleteHero (id) {
        const hero = await HeroModel.findByIdAndDelete({_id: id})
        return hero
    }
    async getHeroes (q, page) {
        const heroes = await HeroModel.find().skip(page * q).limit(q)
        return heroes
    }
    async getHero (id) {
        const hero = await HeroModel.findById(id)
        return hero
    }
    async getHeroesNumber () {
        const n = await HeroModel.find().count()
        return n
    }
}
module.exports= new HeroService()
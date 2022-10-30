const ApiError = require('../exceptions/api-error')
const HeroModel = require('../models/superhero-model') 

class HeroService {
    async addHero (nickname, real_name, origin_description, superpowers, catch_phrase) {
        if (!nickname) {
            throw ApiError.BadRequest(`Nickname is not defined`)
        }
        if (!superpowers) {
            throw ApiError.BadRequest(`${nickname} requires superpowers`)
        }
        const existing = await HeroModel.findOne({nickname})
        if (existing) {
            throw ApiError.BadRequest(`Hero with nickname ${nickname} already exists`)
        }
        
        const hero = await HeroModel.create({nickname: nickname, real_name: real_name, origin_description: origin_description, superpowers: superpowers, catch_phrase: catch_phrase})
        return hero 
    }
    async editHero (id, nickname, real_name, origin_description, superpowers, catch_phrase) {
        const existing = await HeroModel.find({nickname})
        // console.log('e', existing);
        // if (existing) {
        //     throw ApiError.BadRequest(`Hero with nickname ${nickname} already exists`)
        // }
        const hero = await HeroModel.findByIdAndUpdate({_id: id}, {$set: {nickname: nickname, real_name: real_name, origin_description: origin_description,  superpowers: superpowers,catch_phrase: catch_phrase}})
        return hero
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
}
module.exports= new HeroService()
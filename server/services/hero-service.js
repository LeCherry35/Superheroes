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
    //     if ( hero.image) {
    //         const editedHero = await HeroModel.findByIdAndUpdate({_id: id}, {$set: {image:hero.image}})
    //     return editedHero
    // }
        
        // const existing = await HeroModel.find({nickname: hero.nickname})
        // console.log(existing[1])
        // console.log(existing[0]._id)

        // console.log(id);
        // if(existing[1] && (existing[0]._id !== id || existing[1]._id !== id)){
        //     throw ApiError.BadRequest(`Hero with nickname ${hero.nickname} already exists`)
        // }
        const editedHero = await HeroModel.findByIdAndUpdate({_id: id}, {$set: {nickname: hero.nickname, real_name: hero.real_name, origin_description: hero.origin_description,  superpowers: hero.superpowers,catch_phrase: hero.catch_phrase}})
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
    
    async setImage (id, image) {
        const newImage = await HeroModel.findByIdAndUpdate({_id: id},{$set: {image: image}})
        console.log('2',newImage);
        return newImage
    }
    async getHeroesNumber () {
        const n = await HeroModel.find().count()
        return n
    }
}
module.exports= new HeroService()
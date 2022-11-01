const HeroService = require('../services/hero-service')
const ImageService = require('../services/images-service');

class Controller {
    async addHero (req, res, next) {
        try {
            const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
            const newHero = { 
                nickname, 
                superpowers,
                real_name, 
                origin_description,
                catch_phrase,
                image: req.file 
                ? {
                    data: new Buffer.from(req.file.buffer, 'base64'), 
                    contentType: req.file.mimetype 
                }
                : {}
            }
            const hero = await HeroService.addHero(newHero)
            if (req.file) {
            
            const newImage = { 
                superhero: hero._id,
                image: {
                    data: new Buffer.from(req.file.buffer, 'base64'), 
                    contentType: req.file.mimetype 
                }
            }
            await ImageService.uploadImage(newImage)
        }
            (`${nickname} added to database`);
            return res.json(hero)
        } catch (e) {
            next(e)
        } 
    }
    async editHero (req, res, next) {
        try {
            const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
            const editedHero = { 
                nickname, 
                superpowers,
                real_name, 
                origin_description,
                catch_phrase
            }
            const { id } = req.query
            const hero = await HeroService.editHero(id, editedHero)
            if (req.file) {
                const image = {
                        data: new Buffer.from(req.file.buffer, 'base64'), 
                        contentType: req.file.mimetype 
                    }
                    await HeroService.setImage(id, image)
                }
            return res.json(hero)
        } catch (e) {
            next(e)
        }
    }
    async deleteHero (req, res, next) {
        try {
            const { id } = req.query
            const hero = await HeroService.deleteHero(id)
            const i = await ImageService.deleteImages(id)
            return res.json(hero)
        } catch (e) {
            next(e)
        }
    }
    async getHeroes (req, res, next) {
        try {
            const {q, page} = req.query
            const heroes = await HeroService.getHeroes(q, page)
            
            return res.json(heroes)
        } catch (e) {
            next(e)
        }
    }
    async getHeroesNumber (req, res, next) {
        try {
            const n = await HeroService.getHeroesNumber()
            return res.json(n)
        } catch (e) {
            next(e)
        }
    }
    async getHero (req, res, next) {
        try {
            const id = req.params.heroId
            const hero = await HeroService.getHero(id)
            return res.json(hero)
        } catch (e) {
            next(e)
        }
    }
    async uploadImage (req, res, next) {
        try {
            const { heroId } = req.query
            const newImage = { 
                    superhero: heroId,
                    image: {
                        data: new Buffer.from(req.file.buffer, 'base64'), 
                        contentType: req.file.mimetype 
                    }
                }
            const image = await ImageService.uploadImage(newImage)
            return res.json(image)
        } catch (e) {
            next(e)
        }
    }
    async getImages (req, res, next) {
        try {
            const { heroId } = req.query
            const images = await ImageService.getImages(heroId)
            return res.json(images)
        } catch(e) {
            next(e)
        }
    }
    async deleteImage (req, res, next) {
        try {
            const { id } = req.query
            const image = await ImageService.deleteImage(id)
            return res.json(image)
        } catch (e) {
            next(e)
        }
    }
}
module.exports= new Controller ()
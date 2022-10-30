const HeroService = require('../services/hero-service')
const ImageModel = require('../models/image-model');
const ImagesService = require('../services/images-service');

class HeroController {
    async addHero (req, res, next) {
        try {
            const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
            const hero = await HeroService.addHero(nickname, real_name, origin_description, superpowers, catch_phrase)
            console.log(`${nickname} added to database`);
            return res.json(hero)
        } catch (e) {
            next(e)
        } 
    }
    async editHero (req, res, next) {
        try {
            const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
            const { id } = req.query
            const hero = await HeroService.editHero(id, nickname, real_name, origin_description, superpowers, catch_phrase)
            return res.json(hero)
        } catch (e) {
            next(e)
        }
    }
    async deleteHero (req, res, next) {
        try {
            const { id } = req.query
            const hero = await HeroService.deleteHero(id)
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
                    main: false, 
                    image: {
                        data: new Buffer.from(req.file.buffer, 'base64'), 
                        contentType: req.file.mimetype 
                    }
                }
            const image = await ImagesService.uploadImage(newImage)
            return res.json(image)
        } catch (e) {
            next(e)
        }
    }
    async getImage (req,res,next) {
        try {
            const { heroId } = req.query
            const image = await ImagesService.getImages(heroId)
            // console.log('f', res.json(image));
            return res.json(image)
        } catch(e) {
            next(e)
        }
    }
}
module.exports= new HeroController ()
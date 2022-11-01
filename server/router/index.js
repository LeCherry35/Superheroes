const controller = require('../controllers/controller')
// const upload = require('../middleware/upload')
const multer = require('multer');

const Router = require('express').Router

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const router = new Router()

router.post('/addHero', upload.single('image'), controller.addHero)
router.put('/editHero', upload.single('image'), controller.editHero)
router.delete('/deleteHero', controller.deleteHero)
router.get('/getHeroes', controller.getHeroes)
router.get('/getHero/:heroId', controller.getHero)
router.get('/heroesNumber',controller.getHeroesNumber)

router.post('/uploadImage',upload.single('image') ,controller.uploadImage)
router.get('/getImages',controller.getImages)
router.delete('/deleteImage',controller.deleteImage)
module.exports = router
const heroController = require('../controllers/hero-controller')
// const upload = require('../middleware/upload')
const multer = require('multer');

const Router = require('express').Router

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, });

const router = new Router()

router.post('/addHero', heroController.addHero)
router.put('/editHero', heroController.editHero)
router.delete('/deleteHero', heroController.deleteHero)
router.get('/getHeroes', heroController.getHeroes)
router.get('/getHero/:heroId', heroController.getHero)

router.post('/uploadImages',upload.single('image') ,heroController.uploadImage)
router.get('/getImages',heroController.getImage)
module.exports = router
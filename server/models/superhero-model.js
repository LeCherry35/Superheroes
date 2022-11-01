const {Schema, model} = require('mongoose')

const HeroSchema = new Schema({
    nickname:{type: String, required: true, unique: true},
    real_name: {type: String},
    origin_description: {type: String},
    superpowers: {type: String, required: true},
    catch_phrase: {type: String},
    image: {data: Buffer, contentType: String},
    // images: {data: Buffer, contentType: String}
})

module.exports = model('Superhero', HeroSchema)
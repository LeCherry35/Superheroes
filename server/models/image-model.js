const {Schema, model} = require('mongoose')

const ImageSchema = new Schema({
    superhero: {type: Schema.Types.ObjectId, ref: 'Superhero', required: true},
    image: {data: Buffer, contentType: String},
    main: {type: Boolean, required: true}
})

module.exports = model('Image', ImageSchema)
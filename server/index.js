const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const router = require('./router/index')
const cors = require('cors')

var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use(cors())
app.use('/api', router)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server has started on PORT ', PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start()
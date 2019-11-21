const mongoose = require('mongoose')
// process.env.MONGO_URI
module.exports = () => {
    mongoose.connect('mongodb://localhost/hacktivoverflow'
        , { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            console.log('connected to database')
        })
}
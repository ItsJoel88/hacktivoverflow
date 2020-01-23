const mongoose = require('mongoose')
// process.env.MONGO_URI
module.exports = () => {
    mongoose.connect(process.env.MONGO_URI
        , { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
		if(err) console.log(err)
            else console.log('connected to database')
        })
}

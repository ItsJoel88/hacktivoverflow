const { Schema, model } = require('mongoose')
const { hash } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input your name']
    },
    password: {
        type: String,
        required: [true, 'Please input your password'],
        minlength: [5, 'Minimum password length is 5']
    },
    email: {
        type: String,
        required: [true, 'Please input your email'],
        unique: [true, 'Oops! looks like someone already use your email address'],
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    }
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User
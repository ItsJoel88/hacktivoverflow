const { compare } = require('../helpers/bcryptjs')
const { sign, verify } = require('../helpers/jsonwebtoken')
const User = require('../models/user')

class UserController {
    static findUser(req, res, next) {
        req.decode = verify(req.params.id)
        User.findById(req.decode.id)
            .then(user => {
                if (!user) throw { status: 404, message: 'User not found' }
                res.status(200).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    throw { status: 404, message: 'User not found' }
                } else {
                    let valid = compare(req.body.password, user.password)
                    if (valid) {
                        let payload = {
                            id: user._id,
                            name: user.name
                        }
                        let token = sign(payload)
                        res.status(200).json({ token })
                    } else {
                        throw { status: 400, message: 'Wrong username/password' }
                    }
                }
            })
            .catch(next)
    }

    static register(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                res.status(201).json({ user })
            })
            .catch(next)
    }
}

module.exports = UserController
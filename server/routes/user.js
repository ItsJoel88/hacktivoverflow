const router = require('express').Router()
const UserController = require('../controllers/user')


router.get('/:id', UserController.findUser)

router.post('/login', UserController.login)

router.post('/register', UserController.register)


module.exports = router
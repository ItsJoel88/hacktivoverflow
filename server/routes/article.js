const router = require('express').Router()
const ArticleController = require('../controllers/article')
const Authenticate = require('../middlewares/authentication')
const Authorize = require('../middlewares/authorization')


router.get('/', ArticleController.getAll)

router.get('/:id', ArticleController.getOne)

router.post('/users', ArticleController.getUser)

router.use(Authenticate)

router.post('/', ArticleController.create)

router.put('/:id', Authorize, ArticleController.updateArticle)

router.patch('/upvote/:id', ArticleController.upVote)

router.patch('/downvote/:id', ArticleController.downVote)

router.patch('/answer/:id', Authorize, ArticleController.answered)

router.delete('/:id', Authorize, ArticleController.deleteArticle)


module.exports = router
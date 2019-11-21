const router = require('express').Router()
const CommentController = require('../controllers/comment')
const Authen = require('../middlewares/authentication')
const AuthorComment = require('../middlewares/AuthorComment')


router.get('/:article', CommentController.getAllComment)

router.use(Authen)
router.post('/', CommentController.create)

router.put('/:id', AuthorComment, CommentController.updateComment)

router.delete('/:id', AuthorComment, CommentController.deleteComment)


module.exports = router
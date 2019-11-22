const router = require('express').Router()
const UserRouter = require('./user')
const ArticleRouter = require('./article')
const CommentRouter = require('./comment')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello' })
})

router.use('/articles', ArticleRouter)

router.use('/users', UserRouter)

router.use('/comments', CommentRouter)



module.exports = router
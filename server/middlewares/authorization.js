const Article = require('../models/article')

module.exports = (req, res, next) => {
    Article.findById(req.params.id)
        .then(article => {
            if (!article) throw { status: 404, message: 'Article not found' }
            else {
                if (article.user == req.decode.id) {
                    next()
                } else {
                    throw { status: 403, message: 'This site is forbidden for you' }
                }
            }
        })
        .catch(next)
}
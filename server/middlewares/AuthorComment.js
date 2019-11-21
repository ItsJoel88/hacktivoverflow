const Comment = require('../models/comment')

module.exports = (req, res, next) => {
    Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) throw { status: 404, message: 'Comment not found' }
            else {
                if (comment.user == req.decode.id) {
                    next()
                } else {
                    throw { status: 403, message: 'Sorry this site is forbidden for you' }
                }
            }
        })
        .catch(next)
}
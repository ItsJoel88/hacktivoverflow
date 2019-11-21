const Comment = require('../models/comment')

class CommentController {
    static create(req, res, next) {
        Comment.create({
            article: req.body.article,
            user: req.decode.id,
            description: req.body.description
        })
            .then(comment => {
                res.status(201).json({ comment })
            })
            .catch(next)
    }

    static updateComment(req, res, next) {
        let objUpdate = {
            description: req.body.description
        }
        Comment.findByIdAndUpdate(req.params.id, objUpdate)
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(next)
    }

    static getAllComment(req, res, next) {
        Comment.find({ article: req.params.article })
            .populate('user', '_id name')
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(next)
    }

    static deleteComment(req, res, next) {
        Comment.findByIdAndRemove(req.params.id)
            .then(comment => {
                res.status(200).json({ comment })
            })
            .catch(next)
    }
}


module.exports = CommentController
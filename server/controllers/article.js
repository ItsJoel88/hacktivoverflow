const Article = require('../models/article')
const Comment = require('../models/comment')
const { verify } = require('../helpers/jsonwebtoken')
const nodemailer = require('nodemailer')
const kue = require('kue')
let jobs = kue.createQueue()

class ArticleController {
    static getUser(req, res, next) {
        req.user = verify(req.headers.token)
        Article.find({ user: req.user.id })
            .populate('user')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static getAll(req, res, next) {
        let sortObj = {}
        if (req.query.date === 'newest') {
            sortObj.createdAt = 'desc'
        }
        Article.find({})
            .sort(sortObj)
            .populate('user', 'name')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Article.findById(req.params.id)
            .populate('user')
            .then(article => {
                let point = article.upVote.length - article.downVote.length
                if (!article) throw { status: 404, message: 'Article not found' }
                else res.status(200).json({ article, point })
            })
            .catch(next)
    }

    static create(req, res, next) {
        Article.create({
            user: req.decode.id,
            title: req.body.title,
            description: req.body.description
        })
            .then(article => {
                res.status(201).json({ article })
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        let updateObj = {
            title: req.body.title,
            description: req.body.description
        }
        Article.findByIdAndUpdate(req.params.id, updateObj)
            .then(article => {
                if (!article) throw { status: 404, message: 'Article not found' }
                else res.status(200).json({ article })
            })
            .catch(next)
    }

    static answered(req, res, next) {
        Article.findByIdAndUpdate(req.params.id, { answered: true })
            .then(article => {
                if (!article) throw { status: 404, message: 'Article not found' }
                else return Comment.findByIdAndUpdate(req.body.id, { answer: true })
            })
            .then(comment => {
                if (!comment) throw { status: 404, message: 'Comment not found' }
                else res.status(200).json({ comment })
            })
            .catch(next)
    }

    static upVote(req, res, next) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'newljodi@gmail.com',
                pass: process.env.PASSWORD_GMAIL
            }
        });

        let mail = {
            subject: 'Someone upvote your question !',
            to: req.body.to,
            from: 'newljodi@gmail.com',
            html: '<p>Your question is rising up,seems like you getting closer to the answer </p>'
        }

        let job = jobs.create('email', mail).save()

        Article.findById(req.params.id)
            .then(article => {
                if (article.downVote.length < 1) {
                    if (article.upVote.length < 1) {
                        return Article.update({ _id: req.params.id }, { $push: { upVote: req.decode.id } })
                    } else {
                        let check = article.upVote.filter(item => {
                            return item == req.decode.id
                        })
                        if (check.length > 0) {
                            return Article.update({ _id: req.params.id }, { $pull: { upVote: req.decode.id } })
                        } else {
                            return Article.update({ _id: req.params.id }, { $push: { upVote: req.decode.id } })
                        }
                    }
                } else {
                    let checkDown = article.downVote.filter(item => {
                        return item == req.decode.id
                    })
                    if (checkDown.length < 0) {
                        if (article.upVote.length < 1) {
                            return Article.update({ _id: req.params.id }, { $push: { upVote: req.decode.id } })
                        } else {
                            let check = article.upVote.filter(item => {
                                return item == req.decode.id
                            })
                            if (check.length > 0) {
                                return Article.update({ _id: req.params.id }, { $pull: { upVote: req.decode.id } })
                            } else {
                                return Article.update({ _id: req.params.id }, { $push: { upVote: req.decode.id } })
                            }
                        }
                    } else {
                        if (article.upVote.length < 1) {
                            return Article.update({ _id: req.params.id }, { $pull: { downVote: req.decode.id }, $push: { upVote: req.decode.id } })
                        } else {
                            let check = article.upVote.filter(item => {
                                return item == req.decode.id
                            })
                            if (check.length > 0) {
                                return Article.update({ _id: req.params.id }, { $pull: { upVote: req.decode.id, downVote: req.decode.id } })
                            } else {
                                return Article.update({ _id: req.params.id }, { $pull: { downVote: req.decode.id }, $push: { upVote: req.decode.id } })
                            }
                        }
                    }
                }
            })
            .then(article => {
                jobs.process('email', function (job, done) {
                    transporter.sendMail(mail, function (err, info) {
                        if (err) {
                            return console.log('Error : ' + err);
                        }
                        console.log('Mail sent: ' + info.response);
                    })
                    done()
                })
                res.status(200).json({ article })
            })
            .catch(next)
    }

    static downVote(req, res, next) {
        Article.findById(req.params.id)
            .then(article => {
                if (article.upVote.length < 1) {
                    if (article.downVote.length < 1) {
                        return Article.update({ _id: req.params.id }, { $push: { downVote: req.decode.id } })
                    } else {
                        let check = article.downVote.filter(item => {
                            return item == req.decode.id
                        })
                        if (check.length > 0) {
                            return Article.update({ _id: req.params.id }, { $pull: { downVote: req.decode.id } })
                        } else {
                            return Article.update({ _id: req.params.id }, { $push: { downVote: req.decode.id } })
                        }
                    }
                } else {
                    let checkDown = article.upVote.filter(item => {
                        return item == req.decode.id
                    })
                    if (checkDown.length < 0) {
                        if (article.downVote.length < 1) {
                            return Article.update({ _id: req.params.id }, { $push: { downVote: req.decode.id } })
                        } else {
                            let check = article.downVote.filter(item => {
                                return item == req.decode.id
                            })
                            if (check.length > 0) {
                                return Article.update({ _id: req.params.id }, { $pull: { downVote: req.decode.id } })
                            } else {
                                return Article.update({ _id: req.params.id }, { $push: { downVote: req.decode.id } })
                            }
                        }
                    } else {
                        if (article.downVote.length < 1) {
                            return Article.update({ _id: req.params.id }, { $pull: { upVote: req.decode.id }, $push: { downVote: req.decode.id } })
                        } else {
                            let check = article.downVote.filter(item => {
                                return item == req.decode.id
                            })
                            if (check.length > 0) {
                                return Article.update({ _id: req.params.id }, { $pull: { downVote: req.decode.id, upVote: req.decode.id } })
                            } else {
                                return Article.update({ _id: req.params.id }, { $pull: { upVote: req.decode.id }, $push: { downVote: req.decode.id } })
                            }
                        }
                    }
                }
            })
            .then(article => {
                res.status(200).json({ article })
            })
            .catch(next)
    }

    static deleteArticle(req, res, next) {
        Article.findByIdAndRemove(req.params.id)
            .then(article => {
                res.status(200).json({ article })
            })
            .catch(next)
    }
}


module.exports = ArticleController
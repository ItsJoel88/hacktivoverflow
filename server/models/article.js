const { Schema, model } = require('mongoose')


const articleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'We need your description about the article']
    },
    answered: {
        type: Boolean,
        default: false
    },
    upVote: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    },
    downVote: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    }
}, { timestamps: true })

const Article = model('Article', articleSchema)

module.exports = Article
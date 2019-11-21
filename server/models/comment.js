const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: [true, 'You can not leave blank comment']
    },
    answer: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Comment = model('Comment', commentSchema)


module.exports = Comment
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blog'
    },
}, { timestamps: true })

const BlogLike = mongoose.model('blogLike', likeSchema, 'bloglikes')
export default BlogLike 
import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { Comment, CommentDoc } from './comment'

interface PostAttrs {
    id: string
    title: string
    description: string
    alert: number
    userId: string
}

interface PostDoc extends mongoose.Document {
    title: string
    description: string
    alert: number
    userId: string
    version: number 
    comments?: {
        id: string
        comment: string
    }
}
 
interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    alert: {
        type: Number,
        required: false
    },
    
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    },
},{
    toJSON: {
        transform(doc, ret){
            ret.id  = ret._id
            delete ret._id
        }
    }
})

postSchema.set('versionKey', 'version')
postSchema.plugin(updateIfCurrentPlugin)

postSchema.statics.build = (attrs: PostAttrs) => {
    return new Post(attrs)
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema)

export { Post }


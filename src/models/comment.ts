import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'


interface CommentAttrs {
    id: string
    text: string
}

export interface CommentDoc extends mongoose.Document {
    id: string
    text: string
}
 
interface CommentModel extends mongoose.Model<CommentDoc> {
    build(attrs: CommentAttrs): CommentDoc
}

const commentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id  = ret._id
            delete ret._id
        }
    }
})

commentSchema.set('versionKey', 'version')
commentSchema.plugin(updateIfCurrentPlugin)

commentSchema.statics.build = (attrs: CommentAttrs) => {
    return new Comment(attrs)
}

const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema)

export { Comment }


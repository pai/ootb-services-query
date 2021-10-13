import { Message } from 'node-nats-streaming';
import { Listener, CommentCreatedEvent, Subjects } from '@ootb/common'
import { queueGroupName } from './queue-group-name'
import { Post } from '../../models/post'
import { Comment } from '../../models/comment'
import { PostUpdatedPublisher } from '../publishers/post-updated-publisher';


export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
    subject: Subjects.CommentCreated = Subjects.CommentCreated
    queueGroupName = queueGroupName
  
    async onMessage(data: CommentCreatedEvent['data'], msg: Message) {
        // Find the post that the comment is being added to
        const post = await Post.findById(data.post.id)
  
        console.log(data.post.id)

        // If no post, throw error 
        if (!post){
            throw new Error('Post not found')
        }
        // Build the comment
        const comment = Comment.build({
            text: data.text,
            id: data.id
        })

        // Add the comment to the post
        const comms = {...post.comments, comment}
        console.log(comms)

        post.set({ comments: comms })

        // Save the post
         
        await post.save() 
        
        console.log(post)
        //TODO: Comments in Posts should have shown up here.

        
        
        //console.log(comment)

        //TODO: Publish post updated, needs to be refined as "Post updated with Comment"
        
        await new PostUpdatedPublisher(this.client).publish({
          id: post.id,
          title: post.title,
          userId: post.userId,
          alert: post.alert,
          version: post.version,
        })
        // ack the message
        msg.ack()
    }
  }
  
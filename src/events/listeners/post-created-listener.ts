import { Message } from 'node-nats-streaming'
import { Subjects, Listener, PostCreatedEvent } from '@ootb/common'
import { Post } from '../../models/post'
import { queueGroupName } from './queue-group-name'

export class PostCreatedListener extends Listener<PostCreatedEvent>{
    subject: Subjects.PostCreated = Subjects.PostCreated

    queueGroupName = queueGroupName

    async onMessage(data: PostCreatedEvent['data'], msg: Message) {
        const { id, title, description, alert, userId } = data
        const post = Post.build({
            id, title, description, alert, userId
        })

        await post.save()

        msg.ack()
    }
}
import { Publisher, Subjects, PostUpdatedEvent } from '@ootb/common'

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    readonly subject = Subjects.PostUpdated

}
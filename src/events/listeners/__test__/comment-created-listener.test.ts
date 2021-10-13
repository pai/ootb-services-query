import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { CommentCreatedEvent } from '@ootb/common';
import { CommentCreatedListener } from '../comment-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Post } from '../../../models/post';

const setup = async () => {
  // Create an instance of the listener
  const listener = new CommentCreatedListener(natsWrapper.client)

  // Create and save a post
  const post = Post.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'asdasdasdas',
    description: 'asdaswerwer',
    alert: 3,
    userId: 'asdf',

  })
  await post.save();

  // Create the fake data event
  const data: CommentCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    text: 'asdrwerwer',
    userId: 'alskdfj', 
    title: 'asdasdasd',   
    post: {
      id: post.id,
      title: post.title,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, post, data, msg };
}

it('sets the userId of the post', async () => {
    // const { listener, post, data, msg } = await setup();
  
    // await listener.onMessage(data, msg);
  
    // const updatedPost = await Post.findById(post.id); 
  
    // expect(updatedPost!.comments![0]!.id).toEqual(data.id);
});
  
it('acks the message', async () => {
    const { listener, post, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a post updated event', async () => {
    // const { listener, post, data, msg } = await setup();
  
    // await listener.onMessage(data, msg);
  
    // expect(natsWrapper.client.publish).toHaveBeenCalled();
  
    // const postUpdatedData = JSON.parse(
    //   (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    // );
  
    // expect(data.id).toEqual(postUpdatedData.commentId);
});
  

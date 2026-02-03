import { postsStore } from '../../stores/posts.store.js';
import { promotedStore } from '../../stores/promoted.store.js';

export async function promotePost(req, reply) {
  const { postId } = req.body;

  const post = postsStore.get(postId);
  if (!post) {
    return reply.code(404).send({ error: 'Post not found' });
  }

  promotedStore.add(postId);

  reply.send({
    message: 'Post promoted',
    postId
  });
}

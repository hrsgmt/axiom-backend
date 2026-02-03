import { postsStore } from '../../stores/posts.store.js';

export async function publishPost(req, reply) {
  const { postId } = req.body;

  const post = postsStore.get(postId);
  if (!post) {
    return reply.code(404).send({ error: 'Post not found' });
  }

  post.status = 'published';
  post.visibility = 'public';
  post.publishedAt = new Date().toISOString();

  postsStore.update(postId, post);

  return {
    message: 'Post published',
    post
  };
}

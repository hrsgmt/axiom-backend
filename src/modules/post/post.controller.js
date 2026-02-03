import {
  createPost,
  publishPost,
  getPostById
} from '../../stores/posts.store.js';

/**
 * Create post (draft)
 */
export async function createPostHandler(req, reply) {
  const { rawText, metadata = {} } = req.body;
  const mode = req.headers['x-axiom-mode'] || 'think';

  const post = createPost({
    mode,
    type: metadata.listingType === 'product' ? 'product' : 'text',
    content: rawText,
    metadata,
    author: { role: mode === 'store' ? 'merchant' : 'thinker' }
  });

  reply.send({
    message: 'Draft saved',
    post
  });
}

/**
 * Publish post
 */
export async function publishPostHandler(req, reply) {
  const { postId } = req.body;
  const post = publishPost(postId);

  if (!post) {
    reply.code(404).send({ error: 'Post not found' });
    return;
  }

  reply.send({
    message: 'Post published',
    post
  });
}

/**
 * Read single post
 */
export async function getPostHandler(req, reply) {
  const { id } = req.params;
  const post = getPostById(id);

  if (!post) {
    reply.code(404).send({ error: 'Post not found' });
    return;
  }

  reply.send(post);
}

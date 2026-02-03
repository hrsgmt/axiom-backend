import { recordEngagement } from './engagement.service.js';

export async function engage(req, reply) {
  const { postId, type } = req.body;

  const post = recordEngagement({ postId, type });
  if (!post) {
    return reply.code(404).send({ error: 'Post not found' });
  }

  return reply.send({
    message: 'Engagement recorded',
    engagement: post.engagement
  });
}

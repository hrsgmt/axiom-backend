import { engagePost } from './engage.service.js';

export async function engageRoutes(app) {
  app.post('/engage', async (req, reply) => {
    const { postId, type } = req.body;

    const engagement = engagePost(postId, type);

    if (!engagement) {
      reply.code(404).send({ error: 'Post not found' });
      return;
    }

    reply.send({
      message: 'Engagement recorded',
      engagement
    });
  });
}

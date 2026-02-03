import { remixPost } from '../../stores/posts.store.js';

export async function remixRoutes(app) {
  app.post('/posts/:id/remix', async (req, reply) => {
    const { id } = req.params;
    const { ai = {} } = req.body || {};

    const remix = remixPost(id, ai);
    if (!remix) {
      return reply.code(404).send({ error: 'Source post not found' });
    }

    return reply.send(remix);
  });
}

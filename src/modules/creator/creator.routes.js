import { getCreatorStats } from '../../stores/posts.store.js';

export async function creatorRoutes(app) {
  app.get('/creator/:name/stats', async (req, reply) => {
    const { name } = req.params;
    const stats = getCreatorStats(name);
    return reply.send(stats);
  });
}

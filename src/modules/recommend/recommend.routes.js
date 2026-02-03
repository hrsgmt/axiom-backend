import { getRankedFeedByMode } from '../../stores/posts.store.js';

export async function recommendRoutes(app) {
  app.get('/recommend/:mode', async (req, reply) => {
    const { mode } = req.params;
    const limit = Number(req.query.limit || 10);

    const ranked = getRankedFeedByMode(mode).slice(0, limit);

    return reply.send({
      mode,
      count: ranked.length,
      items: ranked
    });
  });
}

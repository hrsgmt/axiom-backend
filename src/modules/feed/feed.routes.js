import { buildFeed } from './feed.service.js';

export async function feedRoutes(app) {

  app.get('/feed/:mode', async (req, reply) => {
    const { mode } = req.params;

    const items = buildFeed(mode);

    return reply.send({
      feedType: mode,
      count: items.length,
      items
    });
  });

}

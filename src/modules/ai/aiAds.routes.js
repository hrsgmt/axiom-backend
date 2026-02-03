import { generateAdForPost, getAdsForPost } from './aiAds.service.js';

export async function aiAdRoutes(app) {

  app.post('/ai/ads/generate', async (req, reply) => {
    const { postId, goal = 'sales' } = req.body;

    const ad = generateAdForPost(postId, goal);
    if (!ad) {
      return reply.code(404).send({ error: 'Post not found' });
    }

    return reply.send({
      message: 'AI Ad generated (mock)',
      ad
    });
  });

  app.get('/ai/ads/:postId', async (req, reply) => {
    const ads = getAdsForPost(req.params.postId);

    return reply.send({
      postId: req.params.postId,
      count: ads.length,
      ads
    });
  });

}

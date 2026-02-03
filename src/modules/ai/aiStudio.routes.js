export async function aiStudioRoutes(app) {

  // Studio disabled (stub)
  app.post('/ai/studio/generate', async (req, reply) => {
    return reply.code(403).send({
      error: 'AI Studio disabled (stub)'
    });
  });

}

export async function studioRoutes(app) {

  // List available studio fields (stub)
  app.get('/studio/fields', async () => {
    return {
      fields: [
        'social',
        'image',
        'video',
        'audio',
        'web',
        'data',
        'document',
        'code'
      ]
    };
  });

  // Generate asset (stub)
  app.post('/studio/generate', async (req, reply) => {
    return reply.send({
      status: 'stub',
      message: 'Studio generation pipeline not implemented yet'
    });
  });

}

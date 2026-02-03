export async function vaultRoutes(app) {

  // List user assets (stub)
  app.get('/vault/assets', async () => {
    return {
      assets: []
    };
  });

  // Get single asset (stub)
  app.get('/vault/assets/:id', async (req, reply) => {
    return reply.send({
      status: 'stub',
      message: 'Asset retrieval not implemented yet'
    });
  });

}

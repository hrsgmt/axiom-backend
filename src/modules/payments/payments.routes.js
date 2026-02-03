export async function paymentsRoutes(app) {

  app.post('/payments/create-intent', async (req, reply) => {
    const { amount = 0, currency = "INR", productId = null } = req.body || {};

    return reply.send({
      provider: "stripe",
      mode: "mock",
      productId,
      amount,
      currency,
      clientSecret: "pi_mock_client_secret"
    });
  });

  app.post('/payments/webhook', async (req, reply) => {
    return reply.send({ status: "received" });
  });

}

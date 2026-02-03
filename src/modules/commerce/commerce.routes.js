import { getPostById } from '../../stores/posts.store.js';

const products = [];

export async function commerceRoutes(app) {

  app.post('/posts/:id/product', async (req, reply) => {
    const { id } = req.params;
    const { price = 0, title = "Untitled", description = "" } = req.body || {};

    const post = getPostById(id);
    if (!post) {
      return reply.code(404).send({ error: "Post not found" });
    }

    const product = {
      id: `${id}-product`,
      postId: id,
      title,
      description,
      price,
      createdAt: new Date().toISOString()
    };

    products.push(product);

    return reply.send(product);
  });

  app.get('/products', async () => products);
}

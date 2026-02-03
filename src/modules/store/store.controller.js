import { createPost } from '../../stores/posts.store.js';

/**
 * Create store product (draft)
 */
export async function createStoreListing(req, reply) {
  const { title, price, currency, source, link } = req.body;

  const post = createPost({
    mode: 'store',
    type: 'product',
    content: title,
    metadata: {
      listingType: 'product',
      price,
      currency,
      source,
      link,
      dropship: true
    },
    author: { role: 'merchant' }
  });

  reply.send({
    message: 'Store listing created',
    post
  });
}

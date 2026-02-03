import { createPost, publishPost } from '../../stores/posts.store.js';

export async function aiPostRoutes(app) {
  app.post('/ai/create-post', async (req, reply) => {
    const {
      mode = "global",
      content = "",
      author = { name: "Guest" },
      ai = {}
    } = req.body || {};

    const post = createPost({
      mode,
      type: "text",
      content,
      author,
      ai
    });

    publishPost(post.id);

    return reply.send(post);
  });
}

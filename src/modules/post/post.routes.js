import {
  createPostHandler,
  publishPostHandler,
  getPostHandler
} from './post.controller.js';

export async function postRoutes(app) {
  app.post('/posts', createPostHandler);
  app.post('/posts/publish', publishPostHandler);
  app.get('/posts/:id', getPostHandler);
}

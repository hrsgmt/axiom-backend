import { promotePost } from './promote.controller.js';

export async function promoteRoutes(app) {
  app.post('/posts/promote', promotePost);
}

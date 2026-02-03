import { engage } from './engagement.controller.js';

export async function engagementRoutes(app) {
  app.post('/engage', engage);
}

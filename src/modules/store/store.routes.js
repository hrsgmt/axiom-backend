import { createStoreListing } from './store.controller.js';

export async function storeRoutes(app) {
  app.post('/store/list', createStoreListing);
}

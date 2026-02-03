import { studioRoutes } from './modules/studio/studio.routes.js';
import { vaultRoutes } from './modules/vault/vault.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { paymentsRoutes } from './modules/payments/payments.routes.js';
import { recommendRoutes } from './modules/recommend/recommend.routes.js';
import { commerceRoutes } from './modules/commerce/commerce.routes.js';
import { aiPostRoutes } from './modules/ai/aiPost.routes.js';
import { aiStudioRoutes } from './modules/ai/aiStudio.routes.js';
import { remixRoutes } from './modules/remix/remix.routes.js';
import { creatorRoutes } from './modules/creator/creator.routes.js';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

import { postRoutes } from './modules/post/post.routes.js';
import { feedRoutes } from './modules/feed/feed.routes.js';
import { storeRoutes } from './modules/store/store.routes.js';
import { engageRoutes } from './modules/engage/engage.routes.js';
import { aiAdRoutes } from './modules/ai/aiAds.routes.js';

import { createPost, publishPost } from './stores/posts.store.js'; // ✅ NEW

dotenv.config();

const app = Fastify({ logger: true });

// Enable CORS
await app.register(cors, { origin: true });

// Core routes
await postRoutes(app);
await feedRoutes(app);
await storeRoutes(app);
await engageRoutes(app);
await aiAdRoutes(app);
await studioRoutes(app);
await vaultRoutes(app);
await creatorRoutes(app);
await remixRoutes(app);
await aiStudioRoutes(app);
await aiPostRoutes(app);
await commerceRoutes(app);
await recommendRoutes(app);
await paymentsRoutes(app);
await authRoutes(app);

// Health check
app.get('/health', async () => ({
  status: 'AXIOM backend healthy'
}));

/* ==============================
   🔹 MOCK POSTS (DEV ONLY)
================================ */
function seedMockPosts() {
  const posts = [
    {
      mode: 'global',
      type: 'text',
      content: 'Welcome to AΞIOM — a platform for meaningful signals.',
      author: { name: 'Axiom Core' }
    },
    {
      mode: 'learn',
      type: 'text',
      content: 'Learning is not consuming information, it is restructuring thought.',
      author: { name: 'Knowledge Node' }
    },
    {
      mode: 'ideas',
      type: 'text',
      content: 'What if social feeds were based on intent, not addiction?',
      author: { name: 'Idea Seed' }
    },
    {
      mode: 'build',
      type: 'text',
      content: 'Build systems, not just apps.',
      author: { name: 'Builder' }
    },
    {
      mode: 'market',
      type: 'text',
      content: 'Value exchange should be transparent and human.',
      author: { name: 'Market Signal' }
    }
  ];

  posts.forEach(p => {
    const post = createPost(p);
    publishPost(post.id);
  });

  console.log('✅ Mock posts seeded');
}

// Seed once on startup
seedMockPosts();

// Start server
await app.listen({ port: 4000, host: '0.0.0.0' });

console.log('AXIOM backend running on port 4000');

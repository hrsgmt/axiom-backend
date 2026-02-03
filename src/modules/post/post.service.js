import { randomUUID } from 'crypto';

const POSTS = [];

export function createPost({ mode, content, metadata, author }) {
  const type =
    mode === 'store'
      ? metadata?.listingType || 'product'
      : 'text';

  const post = {
    id: randomUUID(),
    mode,
    type, // text | product | ad
    content,
    metadata: metadata || {},
    author: author || {},
    status: 'draft',
    visibility: 'public',
    engagement: {
      likes: 0,
      shares: 0,
      saves: 0
    },
    createdAt: new Date().toISOString(),
    publishedAt: null
  };

  POSTS.unshift(post);
  return post;
}

export function publishPost(postId) {
  const post = POSTS.find(p => p.id === postId);
  if (!post) return null;

  post.status = 'published';
  post.publishedAt = new Date().toISOString();
  return post;
}

export function getPostById(id) {
  return POSTS.find(p => p.id === id);
}

export function getPostsByMode(mode) {
  return POSTS.filter(
    p => p.mode === mode && p.status === 'published'
  );
}

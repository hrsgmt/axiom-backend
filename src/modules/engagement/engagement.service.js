import { postsStore } from '../../stores/posts.store.js';

export function recordEngagement({ postId, type }) {
  const post = postsStore.get(postId);
  if (!post) return null;

  post.engagement ||= { likes: 0, shares: 0, saves: 0, clicks: 0 };

  if (type === 'like' || type === 'likes') post.engagement.likes++;
  if (type === 'share' || type === 'shares') post.engagement.shares++;
  if (type === 'save' || type === 'saves') post.engagement.saves++;
  if (type === 'click') post.engagement.clicks++;

  // Sponsored analytics
  if (post.promotion?.isSponsored && type === 'click') {
    post.promotion.stats ||= { clicks: 0 };
    post.promotion.stats.clicks++;
  }

  postsStore.set(postId, post);
  return post;
}

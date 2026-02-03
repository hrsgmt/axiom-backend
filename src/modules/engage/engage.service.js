import { recordEngagement } from '../../stores/posts.store.js';

export function engagePost(postId, type) {
  const engagement = recordEngagement(postId, type);
  if (!engagement) return null;
  return engagement;
}

import { getRankedFeedByMode } from '../../stores/posts.store.js';

export function buildFeed(mode) {
  return getRankedFeedByMode(mode);
}

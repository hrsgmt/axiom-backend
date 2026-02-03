import { randomUUID } from 'crypto';

const posts = [];
const engagementEvents = [];

/**
 * Create a new post (draft)
 */
export function createPost({
  mode,
  type,
  content,
  metadata = {},
  author = {},
  ai = null
}) {
  const post = {
    id: randomUUID(),
    mode,
    type,
    intent: "inspire",
    content,
    metadata,
    author,
    ai: ai ? {
      used: true,
      tool: ai.tool || null,
      prompt: ai.prompt || null,
      model: ai.model || null
    } : {
      used: false,
      tool: null,
      prompt: null,
      model: null
    },
    origin: {
      type: "original",
      sourcePostId: null
    },
    status: "draft",
    visibility: "public",
    engagement: {
      likes: 0,
      shares: 0,
      saves: 0
    },
    createdAt: new Date().toISOString(),
    publishedAt: null
  };

  posts.push(post);
  return post;
}

/**
 * Publish a post
 */
export function publishPost(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return null;

  post.status = "published";
  post.publishedAt = new Date().toISOString();
  return post;
}

/**
 * Get a post by id
 */
export function getPostById(postId) {
  return posts.find(p => p.id === postId) || null;
}

/**
 * Ranked feed
 */
function scorePost(post) {
  const likes = post.engagement.likes || 0;
  const saves = post.engagement.saves || 0;
  const ageHours = (Date.now() - new Date(post.publishedAt).getTime()) / 36e5;
  return (likes * 2 + saves * 3) - ageHours * 0.1;
}

export function getRankedFeedByMode(mode) {
  return posts
    .filter(p => p.mode === mode && p.status === "published")
    .map(p => ({ ...p, _score: scorePost(p) }))
    .sort((a, b) => b._score - a._score);
}

/**
 * Engagement signal engine
 */
export function recordEngagement(postId, type, userId = "guest") {
  const post = posts.find(p => p.id === postId);
  if (!post) return null;

  if (!post.engagement[type]) {
    post.engagement[type] = 0;
  }

  post.engagement[type] += 1;

  engagementEvents.push({
    postId,
    type,
    userId,
    timestamp: new Date().toISOString()
  });

  return post.engagement;
}

/**
 * Engagement events reader
 */
export function getEngagementEvents(postId) {
  return engagementEvents.filter(e => e.postId === postId);
}

/**
 * Creator OS stats
 */
export function getCreatorStats(authorName = "Guest") {
  const myPosts = posts.filter(p => p.author?.name === authorName);

  const stats = {
    totalPosts: myPosts.length,
    totalLikes: 0,
    totalSaves: 0,
    intentBreakdown: {}
  };

  for (const post of myPosts) {
    stats.totalLikes += post.engagement.likes || 0;
    stats.totalSaves += post.engagement.saves || 0;

    const intent = post.intent || "unknown";
    stats.intentBreakdown[intent] =
      (stats.intentBreakdown[intent] || 0) + 1;
  }

  return stats;
}

export function remixPost(sourcePostId, overrides = {}) {
  const source = posts.find(p => p.id === sourcePostId);
  if (!source) return null;

  const remix = {
    ...source,
    id: randomUUID(),
    origin: {
      type: "remix",
      sourcePostId
    },
    ai: {
      ...source.ai,
      ...overrides,
      used: true
    },
    status: "draft",
    createdAt: new Date().toISOString(),
    publishedAt: null
  };

  posts.push(remix);
  return remix;
}

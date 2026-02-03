import { randomUUID } from 'crypto';
import { getPostById } from '../post/post.service.js';

const AI_ADS = [];

export function generateAdForPost(postId, goal = 'sales') {
  const post = getPostById(postId);
  if (!post) return null;

  const ad = {
    id: randomUUID(),
    postId,
    mode: post.mode,
    goal,
    type: 'ad',
    provider: 'mock-ai',
    output: {
      headline: `Buy ${post.content} today`,
      hook: `People love ${post.content} — here’s why`,
      caption: `Upgrade your life with ${post.content}. Limited stock available.`,
      reelIdea: `Show problem → introduce ${post.content} → show transformation`
    },
    createdAt: new Date().toISOString()
  };

  AI_ADS.push(ad);
  return ad;
}

export function getAdsForPost(postId) {
  return AI_ADS.filter(ad => ad.postId === postId);
}

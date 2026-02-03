export const promotedStore = {
  items: [],

  add(postId) {
    if (!this.items.includes(postId)) {
      this.items.push(postId);
    }
  },

  list() {
    return this.items;
  }
};

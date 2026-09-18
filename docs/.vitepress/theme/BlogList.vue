<script setup lang="ts">
import { data as posts } from './posts.data'
</script>

<template>
  <div class="post-list">
    <a v-for="post in posts" :key="post.url" :href="post.url" class="post-item">
      <h2 class="post-title">{{ post.title }}</h2>
      <div class="post-meta">
        <span v-if="post.date" class="post-date">📅 {{ post.date }}</span>
        <span v-if="post.tags.length" class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag"># {{ tag }}</span>
        </span>
      </div>
      <p v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt" />
    </a>
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-item {
  display: block;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.post-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.post-title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.post-tags {
  display: inline-flex;
  gap: 8px;
}

.tag {
  color: var(--vp-c-brand);
}

.post-excerpt {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>

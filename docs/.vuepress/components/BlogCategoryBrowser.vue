<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vuepress/client'
import { usePostsCategory } from 'vuepress-theme-plume/client'

type CategoryNode = {
  type: 'category'
  title: string
  id: string
  sort: number
  items: Array<CategoryNode | PostNode>
}

type PostNode = {
  type: 'post'
  title: string
  path: string
}

const LABEL_MAP: Record<string, string> = {
  Html: 'HTML',
  css: 'CSS',
  JavaScript: 'JavaScript',
  TS: 'TypeScript',
  Vue: 'Vue',
  React: 'React',
  arith: '算法',
  realize: '手写实现',
  interview: '面试真题',
  xian: '西安面经',
  network: '网络',
  browser: '浏览器',
  safe: '安全',
  animation: '动画',
  engine: '工程化',
  miniapp: '小程序',
  git: 'Git',
  nginx: 'Nginx',
  node: 'Node.js',
  web: 'Web',
}

const { categories } = usePostsCategory()
const route = useRoute()
const router = useRouter()

function labelOf(title: string) {
  return LABEL_MAP[title] || title
}

function countPosts(item: CategoryNode | PostNode): number {
  if (item.type === 'post')
    return 1
  return item.items.reduce((sum, child) => sum + countPosts(child), 0)
}

function findPath(
  items: Array<CategoryNode | PostNode>,
  id: string,
  trail: CategoryNode[] = [],
): CategoryNode[] | null {
  for (const item of items) {
    if (item.type !== 'category')
      continue
    const next = [...trail, item]
    if (item.id === id)
      return next
    const found = findPath(item.items, id, next)
    if (found)
      return found
  }
  return null
}

const currentId = computed(() => {
  const id = route.query.id
  return typeof id === 'string' ? id : ''
})

const trail = computed(() => {
  if (!currentId.value)
    return [] as CategoryNode[]
  return findPath(categories.value as CategoryNode[], currentId.value) || []
})

const current = computed(() => trail.value[trail.value.length - 1] || null)

const viewItems = computed(() => {
  if (current.value)
    return current.value.items
  return (categories.value as Array<CategoryNode | PostNode>).filter(
    item => item.type === 'category',
  )
})

const categoriesInView = computed(() =>
  viewItems.value.filter((item): item is CategoryNode => item.type === 'category'),
)

const postsInView = computed(() =>
  viewItems.value.filter((item): item is PostNode => item.type === 'post'),
)

function openCategory(id: string) {
  router.push({ path: route.path, query: { id } })
}

function goRoot() {
  router.push({ path: route.path })
}

function goTrail(index: number) {
  const target = trail.value[index]
  if (!target) {
    goRoot()
    return
  }
  openCategory(target.id)
}
</script>

<template>
  <div class="blog-category-browser">
    <header class="browser-header">
      <h2 class="browser-title">
        {{ current ? labelOf(current.title) : '博客分类' }}
      </h2>
      <p class="browser-desc">
        <template v-if="!current">
          共 {{ categoriesInView.length }} 个分类，点击进入查看文章
        </template>
        <template v-else>
          {{ countPosts(current) }} 篇文章
        </template>
      </p>

      <nav v-if="trail.length" class="browser-crumb" aria-label="面包屑">
        <button type="button" class="crumb-link" @click="goRoot">
          全部分类
        </button>
        <template v-for="(item, index) in trail" :key="item.id">
          <span class="crumb-sep">/</span>
          <button
            type="button"
            class="crumb-link"
            :class="{ current: index === trail.length - 1 }"
            :disabled="index === trail.length - 1"
            @click="goTrail(index)"
          >
            {{ labelOf(item.title) }}
          </button>
        </template>
      </nav>
    </header>

    <section v-if="categoriesInView.length" class="category-grid">
      <button
        v-for="item in categoriesInView"
        :key="item.id"
        type="button"
        class="category-card"
        @click="openCategory(item.id)"
      >
        <span class="card-name">{{ labelOf(item.title) }}</span>
        <span class="card-meta">{{ countPosts(item) }} 篇</span>
      </button>
    </section>

    <section v-if="postsInView.length" class="post-list">
      <h3 v-if="categoriesInView.length" class="section-title">文章</h3>
      <ul>
        <li v-for="post in postsInView" :key="post.path">
          <a class="post-link" :href="post.path">{{ post.title }}</a>
        </li>
      </ul>
    </section>

    <p v-if="!categoriesInView.length && !postsInView.length" class="empty">
      该分类下暂无内容
    </p>
  </div>
</template>

<style scoped>
.blog-category-browser {
  width: 100%;
}

.browser-header {
  margin-bottom: 1.25rem;
}

.browser-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.browser-desc {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.browser-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.85rem;
  font-size: 0.875rem;
}

.crumb-link {
  padding: 0;
  color: var(--vp-c-brand-1);
  background: none;
  border: 0;
  cursor: pointer;
}

.crumb-link.current,
.crumb-link:disabled {
  color: var(--vp-c-text-2);
  cursor: default;
}

.crumb-sep {
  color: var(--vp-c-text-3);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 0.9rem;
  text-align: left;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-1);
  transform: translateY(-1px);
}

.card-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-meta {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.section-title {
  margin: 1.5rem 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.post-list ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.post-list li {
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-link {
  display: block;
  padding: 0.7rem 0.15rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.15s;
}

.post-link:hover {
  color: var(--vp-c-brand-1);
}

.empty {
  margin: 1rem 0 0;
  color: var(--vp-c-text-3);
}
</style>

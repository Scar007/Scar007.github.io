<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  friends?: Array<{ name: string; description?: string; avatar?: string; link?: string }>
}>(), {
  title: '𝐹𝓇𝒾𝑒𝓃𝒹𝓁𝓈',
  subtitle: '我的好朋友',
  friends: () => [],
})
</script>

<template>
  <section class="es-section">
    <div class="es-inner">
      <div class="es-head">
        <h2 class="es-title">{{ title }}</h2>
        <span class="es-subtitle">{{ subtitle }}</span>
      </div>

      <div v-if="friends.length" class="friends-grid">
        <a
          v-for="f in friends"
          :key="f.name"
          class="friend-card"
          :href="f.link || 'javascript:void(0)'"
          :target="f.link ? '_blank' : undefined"
          rel="noopener noreferrer"
        >
          <img v-if="f.avatar" class="friend-avatar" :src="f.avatar" :alt="f.name">
          <div class="friend-info">
            <div class="friend-name">{{ f.name }}</div>
            <div v-if="f.description" class="friend-desc">{{ f.description }}</div>
          </div>
        </a>
      </div>

      <div v-else class="friend-empty">
        <p>这里还空着，欢迎来和我交换友链 👋</p>
        <p class="friend-empty-hint">在 index.md 的 HomeFriends 里补充好友即可。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.es-section {
  padding: 72px 24px;
}

.es-inner {
  max-width: 1080px;
  margin: 0 auto;
}

.es-head {
  text-align: center;
  margin-bottom: 44px;
}

.es-title {
  margin: 0;
  font-size: 2.4rem;
  line-height: 1.2;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.es-subtitle {
  display: block;
  margin-top: 10px;
  font-size: 0.92rem;
  letter-spacing: 0.25em;
  color: var(--vp-c-text-2);
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border, var(--vp-c-divider));
  text-decoration: none;
  color: inherit;
  transition: all 0.25s;
}

.friend-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.friend-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.friend-info {
  min-width: 0;
}

.friend-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.friend-desc {
  margin-top: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.friend-empty {
  text-align: center;
  color: var(--vp-c-text-2);
}

.friend-empty-hint {
  margin-top: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}
</style>

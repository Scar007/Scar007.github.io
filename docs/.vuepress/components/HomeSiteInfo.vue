<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  startDate?: string
  articles?: number
  tags?: number
  categories?: number
  words?: number
  comments?: number
}>(), {
  title: '𝓈𝒾𝓉𝑒 𝒾𝓃𝒻𝑜',
  subtitle: '站点信息',
  startDate: '2021-03-07',
  articles: 0,
  tags: 0,
  categories: 0,
  words: 0,
  comments: 0,
})

const stats = computed(() => [
  { label: '文章', value: props.articles },
  { label: '标签', value: props.tags },
  { label: '分类', value: props.categories },
  { label: '字数', value: props.words },
  { label: '评论', value: props.comments },
])

const now = ref(0)
const mounted = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const running = computed(() => {
  if (!mounted.value)
    return '——'
  const start = new Date(props.startDate).getTime()
  if (Number.isNaN(start))
    return '——'
  let diff = Math.max(0, Math.floor((now.value - start) / 1000))
  const years = Math.floor(diff / (365 * 24 * 3600))
  diff -= years * 365 * 24 * 3600
  const days = Math.floor(diff / (24 * 3600))
  diff -= days * 24 * 3600
  const hours = Math.floor(diff / 3600)
  diff -= hours * 3600
  const minutes = Math.floor(diff / 60)
  const seconds = diff - minutes * 60
  const parts = [years ? `${years} 年` : '', days ? `${days} 天` : '', `${hours} 时`, `${minutes} 分`, `${seconds} 秒`]
  return parts.filter(Boolean).join(' ')
})

onMounted(() => {
  now.value = Date.now()
  mounted.value = true
  timer = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="es-section">
    <div class="es-inner">
      <div class="es-head">
        <h2 class="es-title">{{ title }}</h2>
        <span class="es-subtitle">{{ subtitle }}</span>
      </div>

      <div class="stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>

      <div class="runtime">🎉 本站已运行：{{ running }}</div>
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

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.stat {
  flex: 1 1 120px;
  max-width: 190px;
  padding: 26px 12px;
  text-align: center;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border, var(--vp-c-divider));
}

.stat-value {
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.runtime {
  margin-top: 28px;
  text-align: center;
  padding: 14px 20px;
  border-radius: 12px;
  background: var(--vp-c-brand-soft, rgba(131, 208, 218, 0.2));
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
</style>

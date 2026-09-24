<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  name?: string
  intro?: string
  avatar?: string
}>(), {
  name: 'Yolo',
  intro: '记录学习，持续成长',
  avatar: '',
})

// Esyka 同款问候语（Unicode 数学花体）
const GREETING = '𝐻𝑒𝓁𝓁𝑜, 𝓃𝒾𝒸𝑒 𝓉𝑜 𝓂𝑒𝑒𝓉 𝓎𝑜𝓊 !👋'

const quote = ref('')
const loading = ref(true)
const copied = ref(false)
const avatarErr = ref(false)

let copyTimer: ReturnType<typeof setTimeout> | undefined

async function loadHitokoto() {
  try {
    const res = await fetch('https://v1.hitokoto.cn/?encode=json')
    const data = await res.json()
    quote.value = `${data.hitokoto} —— ${data.from || '一言'}`
  }
  catch {
    quote.value = '路漫漫其修远兮，吾将上下而求索。 —— 屈原《离骚》'
  }
  finally {
    loading.value = false
  }
}

async function copyQuote() {
  if (!quote.value)
    return
  try {
    await navigator.clipboard.writeText(quote.value)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1500)
  }
  catch {}
}

const initial = (props.name || 'S').charAt(0).toUpperCase()

onMounted(loadHitokoto)
onUnmounted(() => clearTimeout(copyTimer))
</script>

<template>
  <section class="home-about">
    <div class="home-about-inner">
      <div class="avatar-wrap">
        <img
          v-if="avatar && !avatarErr"
          class="avatar"
          :src="avatar"
          alt="avatar"
          @error="avatarErr = true"
        >
        <div v-else class="avatar avatar-letter">
          {{ initial }}
        </div>
      </div>

      <h1 class="greeting">{{ GREETING }}</h1>
      <p class="name-line">
        你可以叫我 <span class="name">{{ name }}</span> 
      </p>
      <p class="intro">{{ intro }}</p>

      <div class="hitokoto" title="单击句子以复制" @click="copyQuote">
        <span class="hitokoto-label">𝒫𝓇𝑜𝓋𝑒𝓇𝒷 · 单击句子以复制{{ copied ? ' ✓ 已复制' : '' }}</span>
        <p class="hitokoto-text">{{ loading ? '正在加载一言...' : quote }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-about {
  padding: 96px 24px 80px;
  text-align: center;
}

.home-about-inner {
  max-width: 1080px;
  margin: 0 auto;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--vp-c-brand-soft, rgba(131, 208, 218, 0.3));
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.avatar-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
}

.greeting {
  margin: 24px 0 0;
  font-size: clamp(1.7rem, 5vw, 3rem);
  line-height: 1.3;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.name-line {
  margin: 18px 0 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
}

.name {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--vp-c-brand-1);
}

.intro {
  margin: 10px 0 0;
  color: var(--vp-c-text-3);
}

.hitokoto {
  max-width: 560px;
  margin: 36px auto 0;
  padding: 16px 20px;
  border: 1px dashed var(--vp-c-border, var(--vp-c-divider));
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;
}

.hitokoto:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft, var(--vp-c-bg-alt));
}

.hitokoto-label {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.hitokoto-text {
  margin: 8px 0 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}
</style>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  skills?: string[]
}>(), {
  title: '𝒮𝓀𝒾𝓁𝓁',
  subtitle: '我的能力',
  skills: () => [],
})
</script>

<template>
  <section class="es-section">
    <div class="es-inner">
      <div class="es-head">
        <h2 class="es-title">{{ title }}</h2>
        <span class="es-subtitle">{{ subtitle }}</span>
      </div>

      <div v-if="skills.length" class="skill-grid">
        <div v-for="skill in skills" :key="skill" class="skill-card">
          {{ skill }}
        </div>
      </div>
      <p v-else class="es-empty">还没有填写技能，去 index.md 的 HomeSkill 里补充吧。</p>
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

.es-empty {
  text-align: center;
  color: var(--vp-c-text-3);
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.skill-card {
  padding: 22px 12px;
  text-align: center;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border, var(--vp-c-divider));
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: all 0.25s;
}

.skill-card:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}
</style>

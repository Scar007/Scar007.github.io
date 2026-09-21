<script setup lang="ts">
import BlogCategoryBrowser from '../components/BlogCategoryBrowser.vue'
import { Layout } from 'vuepress-theme-plume/client'
</script>

<template>
  <Layout>
    <template #posts-categories-content-before>
      <BlogCategoryBrowser />
    </template>
  </Layout>
</template>

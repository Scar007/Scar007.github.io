import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt?: string
}

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      // 排除 blog/index.md 列表页本身
      .filter((page) => page.url !== '/blog/')
      .map((page) => ({
        title: page.frontmatter.title || '',
        url: page.url,
        date: page.frontmatter.date ? String(page.frontmatter.date) : '',
        tags: Array.isArray(page.frontmatter.tags) ? (page.frontmatter.tags as string[]) : [],
        excerpt: page.excerpt,
      }))
      // 按日期倒序（新的在前）
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  },
})

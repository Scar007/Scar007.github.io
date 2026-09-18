import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '学习笔记 / Notes',
  description: 'Scar007 的个人博客与学习资料库',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '学习资料', link: '/notes/' },
    ],

    sidebar: {
      '/notes/': [
        {
          text: '前端',
          collapsed: false,
          items: [
            { text: '前端总览', link: '/notes/前端/' },
            {
              text: 'JavaScript',
              collapsed: true,
              items: [
                { text: 'JavaScript 基础', link: '/notes/前端/JavaScript/' },
              ],
            },
          ],
        },
        {
          text: '后端',
          collapsed: false,
          items: [
            { text: '后端总览', link: '/notes/后端/' },
          ],
        },
        {
          text: '算法与数据结构',
          collapsed: false,
          items: [
            { text: '算法总览', link: '/notes/算法与数据结构/' },
          ],
        },
        {
          text: '工具与效率',
          collapsed: false,
          items: [
            { text: '工具总览', link: '/notes/工具与效率/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Scar007' },
    ],

    outline: { level: [2, 3] },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdatedText: '最后更新于',
  },
})

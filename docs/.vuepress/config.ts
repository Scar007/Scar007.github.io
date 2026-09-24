import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '学习笔记',
  description: 'Scar007 的个人博客与学习资料库',

  head: [
    // Esyka 同款字体：霞鹜文楷屏幕阅读版（LXGW WenKai Screen）
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.7.0/lxgw-wenkaiscreen.css',
      },
    ],
  ],

  bundler: viteBundler(),

  // 让代码块 / 行内代码里的 {{ }} 等模板语法按字面显示，避免被 Vue 当作插值编译而报错
  markdown: {
    vPre: {
      block: true,
      inline: true,
    },
  },

  // Shiki 高亮后仍可能留下连续的 {{ }}（如 JSX style={{...}}），会被 Vue 模板编译器当成插值。
  // 在最终 HTML 中转义，保证按字面展示。
  extendsMarkdown: (md) => {
    const rawRender = md.render.bind(md)
    md.render = (src, env) =>
      rawRender(src, env)
        .replace(/\{\{/g, '&#123;&#123;')
        .replace(/\}\}/g, '&#125;&#125;')
  },

  theme: plumeTheme({
    // 部署域名，用于生成 sitemap、SEO 等
    hostname: 'https://scar007.github.io',

    // 首页博主信息卡（对应 Esyka 首页右侧的个人资料）
    profile: {
      name: 'Scar007',
      description: '记录学习，持续成长',
      // avatar: '/images/logo.png', // 有 logo 后放到 docs/.vuepress/public/images/ 下并取消注释
      circle: true,
      location: '西安，中国',
    },

    navbar: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '学习资料', link: '/notes/' },
      { text: '业软导航', link: '/links/' },
    ],

    social: [{ icon: 'github', link: 'https://github.com/Scar007' }],

    // 三块内容对应三个「集合」
    // post：分类/归档按 docs/blog 目录结构自动映射
    // /blog/ 直接进入分类页（20 个文件夹），点进分类再看文章
    collections: [
      {
        type: 'post',
        dir: 'blog',
        link: '/blog/',
        title: '博客',
        postList: false,
        categories: true,
        categoriesLink: '/blog/',
        categoriesText: '分类',
        categoriesExpand: 0,
        archives: true,
        archivesText: '归档',
        tags: true,
        tagsText: '标签',
      },
      {
        type: 'doc',
        dir: 'notes',
        link: '/notes/',
        title: '学习资料',
        sidebar: 'auto',
      },
      {
        type: 'doc',
        dir: 'link',
        link: '/links/',
        title: '业软导航',
        sidebar: 'auto',
      },
    ],

    search: { provider: 'local' },
  }),
})

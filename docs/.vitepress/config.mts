import { defineConfig } from 'vitepress'
import { getThemeConfig } from '@sugarat/theme/node'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// docs/.vitepress/config.mts → docs 目录
const docsRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const interviewRoot = join(docsRoot, 'interview')

// 分类顺序（对应原站导航分组）与中文标签
const categoryOrder = [
  'Html', 'css', 'JavaScript',
  'network', 'browser', 'safe', 'web', 'animation',
  'Vue', 'React', 'miniapp', 'TS',
  'realize', 'arith', 'node',
  'engine', 'git', 'nginx',
  'interview', 'xian',
]
const categoryLabels: Record<string, string> = {
  Html: 'HTML',
  css: 'CSS',
  JavaScript: 'JavaScript',
  network: '网络协议',
  browser: '浏览器',
  safe: '安全',
  web: 'WEB',
  animation: '动画',
  Vue: 'Vue',
  React: 'React',
  miniapp: '小程序',
  TS: 'TypeScript',
  realize: '手写实现',
  arith: '算法',
  node: 'Node',
  engine: '工程化',
  git: 'Git',
  nginx: 'Nginx',
  interview: '各公司面经',
  xian: '西安面经',
}

// 从 md 中提取标题：优先 frontmatter title，其次首个 # / ## 标题，最后用文件名
function extractTitle(filePath: string, fallback: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (fm) {
      const t = fm[1].match(/^title:\s*(.+)$/m)
      if (t) return t[1].trim().replace(/^['"]|['"]$/g, '')
    }
    const h1 = content.match(/^#\s+(.+)$/m)
    if (h1) return h1[1].trim()
    const h2 = content.match(/^##\s+(.+)$/m)
    if (h2) return h2[1].trim()
  } catch {}
  return fallback
}

// 自动生成 /interview/ 侧边栏：按子目录分组，标题取自各 md 的标题
function buildInterviewSidebar() {
  const dirs = readdirSync(interviewRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort((a, b) => {
      const ai = categoryOrder.indexOf(a)
      const bi = categoryOrder.indexOf(b)
      if (ai === -1 && bi === -1) return a.localeCompare(b)
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    })

  return dirs.map((dir) => {
    const dirPath = join(interviewRoot, dir)
    const label = categoryLabels[dir] || dir
    const files = readdirSync(dirPath)
      .filter((f) => f.endsWith('.md') && f !== 'index.md' && f !== 'README.md')
      .sort((a, b) => a.localeCompare(b, 'zh-CN'))
    const items = files.map((f) => {
      const name = f.replace(/\.md$/, '')
      return { text: extractTitle(join(dirPath, f), name), link: `/interview/${dir}/${name}` }
    })
    if (existsSync(join(dirPath, 'index.md'))) {
      items.unshift({ text: `${label}总览`, link: `/interview/${dir}/` })
    }
    return { text: label, collapsed: true, items }
  })
}

// @sugarat/theme 博客主题配置（首页博客信息 + 内置插件等）
const blogTheme = getThemeConfig({
  themeColor: 'vp-default',
  home: {
    name: '学习笔记',
    motto: 'Scar007 的个人博客与学习资料库',
    inspiring: ['记录学习，持续成长', 'Stay hungry, stay foolish', '好记性不如烂笔头'],
    inspiringTimeout: 5000,
  },
})

export default defineConfig({
  lang: 'zh-CN',
  title: '学习笔记 / Notes',
  description: 'Scar007 的个人博客与学习资料库',
  cleanUrls: true,
  lastUpdated: true,

  ...blogTheme,

  // @sugarat/theme 依赖的 vitepress-plugin-product-card 在 SSR 时携带 .vue 源码，
  // 需加入 ssr.noExternal 让其被 Vite 内联打包，否则 Node 无法加载 .vue 文件
  vite: {
    ...(blogTheme.vite || {}),
    ssr: {
      ...(blogTheme.vite?.ssr || {}),
      noExternal: [
        ...(Array.isArray(blogTheme.vite?.ssr?.noExternal)
          ? blogTheme.vite.ssr.noExternal
          : []),
        'vitepress-plugin-product-card',
      ],
    },
  },

  themeConfig: {
    ...blogTheme.themeConfig,

    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '学习资料', link: '/notes/' },
      { text: '面试', link: '/interview/' },
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
      '/interview/': buildInterviewSidebar(),
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

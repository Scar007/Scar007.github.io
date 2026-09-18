# Scar007 的学习笔记 / Notes

个人博客与学习资料库，基于 [VitePress](https://vitepress.dev/) 构建，部署在 GitHub Pages：<https://scar007.github.io/>

## 本地开发

```bash
npm install
npm run docs:dev        # 启动本地预览（默认 http://localhost:5173）
```

## 目录结构

```
docs/
├── index.md            # 首页
├── blog/               # 博客文章（自动生成列表）
└── notes/              # 学习资料（按分类分文件夹）
    ├── 前端/
    ├── 后端/
    ├── 算法与数据结构/
    └── 工具与效率/
```

## 写一篇博客

1. 在 `docs/blog/` 下新建 `YYYY-MM-DD-标题.md`，文件头加上：

   ```md
   ---
   title: 文章标题
   date: 2026-09-18
   tags: [随笔, 前端]
   ---
   ```

2. `git push` 到 `main`，GitHub Actions 会自动构建并发布，稍后访问网站即可看到。

## 添加学习资料

1. 在 `docs/notes/<分类>/` 下新建 `.md` 文件
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 里补上对应链接

## 构建 & 预览

```bash
npm run docs:build     # 构建静态站点到 docs/.vitepress/dist
npm run docs:preview   # 预览构建产物
```

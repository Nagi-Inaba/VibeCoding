import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';

const base = process.env.BASE_PATH ?? '/VibeCoding';

export default defineConfig({
  site: process.env.SITE ?? 'https://nagi-inaba.github.io',
  base,
  integrations: [
    starlight({
      title: 'Vibe Coding Guide',
      description: '短い指示でAIが動ける環境を作る、バイブコーディング初心者向けガイド。',
      disable404Route: true,
      locales: {
        root: {
          label: '日本語',
          lang: 'ja',
        },
      },
      logo: {
        src: './src/assets/logo.svg',
        alt: '',
      },
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'script',
          attrs: {
            src: `${base.endsWith('/') ? base.slice(0, -1) : base}/copy-blocks.js`,
            defer: true,
          },
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'はじめる',
          items: [
            { label: 'はじめに', link: '/' },
            { label: 'バイブコーディングとは', slug: 'what-is-vibe-coding' },
            { label: '用語集', slug: 'glossary' },
          ],
        },
        {
          label: '最初の一周',
          items: [
            { label: 'はじめの一歩', slug: 'start' },
            { label: '小さな実践例', slug: 'practice' },
          ],
        },
        {
          label: 'AIへの頼み方',
          items: [
            { label: '短い指示が効く理由', slug: 'short-prompts' },
            { label: '場面別の頼み方', slug: 'asking' },
            { label: '依頼テンプレート', slug: 'templates' },
          ],
        },
        {
          label: '作業を続ける土台',
          items: [
            { label: 'AIが迷わないフォルダ構成', slug: 'folder-structure' },
            { label: '作業記録の残し方', slug: 'work-log' },
          ],
        },
        {
          label: '失敗を減らす',
          items: [
            { label: 'チェックリスト', slug: 'checklists' },
            { label: '人に使ってもらう前に', slug: 'publish-check' },
            { label: 'よくある失敗', slug: 'common-mistakes' },
            { label: 'うまく動かなくなったときの戻し方', slug: 'recover' },
          ],
        },
        {
          label: '発展編',
          items: [
            { label: '大きく近道する考え方', slug: 'my-vibe-coding' },
            { label: 'よく使うツール', slug: 'tools' },
            { label: 'Typeless', link: '/tools/#typeless' },
            { label: '既存の道具から始める', link: '/my-vibe-coding/#既存の道具から始める' },
            { label: '自分の見方をAIに伝える', link: '/my-vibe-coding/#自分の見方をaiに伝える' },
            { label: 'プロの進め方に乗せる', link: '/my-vibe-coding/#いきなりコードを書かせない' },
            { label: 'AIが考える余地を減らす', link: '/my-vibe-coding/#aiが考える余地を減らす' },
            { label: '公式ドキュメントを使う', link: '/my-vibe-coding/#公式ドキュメントを吸収する' },
            { label: 'MarkItDown', link: '/tools/#markitdown' },
            { label: 'Playwright', link: '/tools/#playwright' },
            { label: 'Product Starter', link: '/tools/#product-starter' },
            { label: 'アクセシビリティ検査', link: '/tools/#情報アクセシビリティの検査サブエージェント' },
          ],
        },
      ],
    }),
    mdx(),
  ],
});

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
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub Pages公式',
          href: 'https://docs.github.com/ja/pages',
        },
      ],
      sidebar: [
        {
          label: 'はじめる',
          items: [
            { label: 'はじめに', link: '/' },
            { label: 'バイブコーディングとは', slug: 'what-is-vibe-coding' },
            { label: 'はじめの一歩', slug: 'start' },
          ],
        },
        {
          label: '頼み方を学ぶ',
          items: [
            { label: '短い指示が効く理由', slug: 'short-prompts' },
            { label: '場面別の頼み方', slug: 'asking' },
            { label: '依頼テンプレート', slug: 'templates' },
          ],
        },
        {
          label: 'AIが迷わない環境',
          items: [
            { label: 'フォルダ構成', slug: 'folder-structure' },
            { label: '作業記録', slug: 'work-log' },
            { label: 'よくある失敗', slug: 'common-mistakes' },
          ],
        },
        {
          label: '実践補助',
          items: [
            { label: '小さな実践例', slug: 'practice' },
            { label: 'チェックリスト', slug: 'checklists' },
            { label: '用語集', slug: 'glossary' },
          ],
        },
      ],
    }),
    mdx(),
  ],
});

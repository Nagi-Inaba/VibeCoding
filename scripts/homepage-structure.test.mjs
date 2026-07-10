import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('homepage header uses a mobile menu without the publish-check GitHub affordance', () => {
  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const header = html.match(/<header class="landing-topbar">[\s\S]*?<\/header>/)?.[0] ?? '';
  const menu = header.match(/<details class="landing-menu">[\s\S]*?<\/details>/)?.[0] ?? '';
  const normalizedBase = String(process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '');
  const basePath = normalizedBase ? `/${normalizedBase}` : '';
  const heroActions = html.match(/<div class="hero-actions"[\s\S]*?<\/div>/)?.[0] ?? '';
  const publishHref = `${basePath}/publish-check/`;
  const publishLinkCount = html.split(`href="${publishHref}"`).length - 1;

  assert.doesNotMatch(header, /公開前チェックを開く|github-button/);
  assert.match(menu, /<summary>メニュー<\/summary>/);
  assert.doesNotMatch(heroActions, /publish-check|公開する前/);
  assert.equal((heroActions.match(/<a\b/g) ?? []).length, 2);
  assert.equal(publishLinkCount, 1);
  assert.match(html, /他の人に使ってもらうなら/);
  assert.doesNotMatch(html, /公開前に確かめる/);

  for (const route of [
    'start/', 'what-is-vibe-coding/', 'short-prompts/', 'asking/',
    'folder-structure/', 'recover/', 'work-log/', 'common-mistakes/',
    'my-vibe-coding/', 'tools/',
  ]) {
    assert.equal(menu.includes(`${basePath}/${route}`), true);
  }
});

test('sidebar names the route for the person using the artifact', () => {
  const config = fs.readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  assert.match(config, /label:\s*['"]人に使ってもらう前に['"],\s*slug:\s*['"]publish-check['"]/);
  assert.doesNotMatch(config, /label:\s*['"]公開する前に['"],\s*slug:\s*['"]publish-check['"]/);
});

test('mobile header resets the desktop content-box minimum height', () => {
  const css = fs.readFileSync(new URL('../src/styles/custom.css', import.meta.url), 'utf8');
  const mobileHeader = css.match(/@media \(max-width: 760px\)\s*{\s*\.landing-topbar\s*{([^}]*)}/)?.[1] ?? '';

  assert.match(mobileHeader, /min-height:\s*0\s*;/);
});

test('mobile menu explicitly supports Enter and Space activation', () => {
  const source = fs.readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.match(source, /addEventListener\(['"]keydown['"]/);
  assert.match(source, /event\.key === ['"]Enter['"]/);
  assert.match(source, /event\.key === ['"] ['"]/);
  assert.match(source, /event\.preventDefault\(\)/);
});

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('Vercel is the default production target at the domain root', () => {
  const astro = read('astro.config.mjs');
  const homepage = read('src/pages/index.astro');
  const siteCheck = read('scripts/check-built-site.mjs');
  const homepageTest = read('scripts/homepage-structure.test.mjs');

  assert.match(astro, /process\.env\.SITE \?\? 'https:\/\/vibecoding-jp\.vercel\.app'/);
  assert.match(astro, /process\.env\.BASE_PATH \?\? '\/'/);
  assert.match(siteCheck, /process\.env\.BASE_PATH \?\? '\/'/);
  assert.match(homepageTest, /process\.env\.BASE_PATH \?\? '\/'/);
  assert.match(homepage, /rel="canonical" href=\{canonicalUrl\}/);
  assert.match(homepage, /property="og:url" content=\{canonicalUrl\}/);
});

test('Vercel runs the full QA gate and deploys dist', () => {
  assert.ok(existsSync(new URL('../vercel.json', import.meta.url)), 'vercel.json must exist');
  const config = JSON.parse(read('vercel.json'));

  assert.equal(config.framework, 'astro');
  assert.equal(config.buildCommand, 'npm run qa');
  assert.equal(config.outputDirectory, 'dist');
});

test('GitHub Pages auto-deploy is retired after the Vercel migration', () => {
  assert.ok(!existsSync(new URL('../.github/workflows/deploy.yml', import.meta.url)));
  assert.match(read('README.md'), /https:\/\/vibecoding-jp\.vercel\.app/);

  const pkg = JSON.parse(read('package.json'));
  assert.ok(pkg.keywords.includes('vercel'));
  assert.ok(!pkg.keywords.includes('github-pages'));
});

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test, { afterEach } from 'node:test';
import { inspectBuiltSite } from './check-built-site.mjs';

const fixtureRoots = new Set();

function fixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vibecoding-site-'));
  fixtureRoots.add(root);
  const dist = path.join(root, 'dist');
  fs.mkdirSync(dist, { recursive: true });
  for (const [relativePath, contents] of Object.entries(files)) {
    const filePath = path.join(dist, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents, 'utf8');
  }
  return { root, dist };
}

afterEach(() => {
  for (const root of fixtureRoots) {
    fs.rmSync(root, { recursive: true, force: true });
  }
  fixtureRoots.clear();
});

test('rejects a same-origin reference that escapes BASE_PATH', () => {
  const { root, dist } = fixture({
    '404.html': '<a href="/start/">戻る</a>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'escaped-base'), true);
});

test('accepts a valid unicode fragment inside BASE_PATH', () => {
  const { root, dist } = fixture({
    'index.html': '<a href="/VibeCoding/start/#確認">確認</a>',
    'start/index.html': '<h2 id="確認">確認</h2>',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.deepEqual(report.errors, []);
  assert.equal(report.checkedFragments, 1);
});

test('rejects a missing fragment', () => {
  const { root, dist } = fixture({
    'index.html': '<a href="/VibeCoding/start/#missing">確認</a>',
    'start/index.html': '<h2 id="確認">確認</h2>',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'missing-fragment'), true);
});

test('rejects a link to a missing local route', () => {
  const { root, dist } = fixture({
    'index.html': '<a href="/VibeCoding/missing-route/">存在しないページ</a>',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(
    report.errors.some(
      (error) => error.type === 'missing-target' && error.ref === '/VibeCoding/missing-route/',
    ),
    true,
  );
});

test('rejects a reference to a missing local asset', () => {
  const { root, dist } = fixture({
    'index.html': '<img src="/VibeCoding/assets/missing.png" alt="" />',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(
    report.errors.some(
      (error) => error.type === 'missing-target' && error.ref === '/VibeCoding/assets/missing.png',
    ),
    true,
  );
});

test('rejects the Starlight draft warning in 404', () => {
  const { root, dist } = fixture({
    '404.html': '<p>このコンテンツは下書きです。プロダクションビルドには含まれません。</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'draft-warning'), true);
});

test('requires dist/404.html even when route fixtures are otherwise valid', () => {
  const { root, dist } = fixture({
    'index.html': '<p>トップ</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(
    report.errors.some((error) => error.type === 'missing-target' && error.ref === '/404.html'),
    true,
  );
});

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const basePath = process.env.BASE_PATH ?? '/VibeCoding';

const requiredRoutes = [
  '/',
  '/start/',
  '/what-is-vibe-coding/',
  '/voice-input/',
  '/short-prompts/',
  '/asking/',
  '/templates/',
  '/folder-structure/',
  '/work-log/',
  '/recover/',
  '/common-mistakes/',
  '/practice/',
  '/checklists/',
  '/glossary/',
  '/my-vibe-coding/',
  '/tools/',
];

function assertFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} is missing: ${path.relative(root, filePath)}`);
  }
}

function walk(dir, predicate, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, predicate, output);
    } else if (predicate(fullPath)) {
      output.push(fullPath);
    }
  }
  return output;
}

function routeToFile(route) {
  const cleanRoute = route === '/' ? '/' : route.replace(/\/$/, '');
  return cleanRoute === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, cleanRoute.slice(1), 'index.html');
}

function assetToFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const withoutBase = cleanPath.startsWith(basePath)
    ? cleanPath.slice(basePath.length)
    : cleanPath;
  if (withoutBase === '/' || withoutBase.endsWith('/')) {
    return routeToFile(withoutBase);
  }
  return path.join(dist, withoutBase.replace(/^\//, ''));
}

function collectLocalReferences(html) {
  const references = [];
  for (const attr of ['href', 'src']) {
    const pattern = new RegExp(`${attr}="([^"]+)"`, 'g');
    for (const match of html.matchAll(pattern)) {
      const value = match[1];
      if (
        value.startsWith(`${basePath}/`) &&
        !value.includes('#') &&
        !value.startsWith(`${basePath}/pagefind/`)
      ) {
        references.push(value);
      }
    }
  }
  return references;
}

assertFile(dist, 'Build directory');
for (const route of requiredRoutes) {
  assertFile(routeToFile(route), `Route ${route}`);
}
assertFile(path.join(dist, 'copy-blocks.js'), 'Copy script');
assertFile(path.join(dist, 'sitemap-index.xml'), 'Sitemap index');

const htmlFiles = walk(dist, (filePath) => filePath.endsWith('.html'));
const brokenReferences = [];

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  for (const ref of collectLocalReferences(html)) {
    const filePath = assetToFile(ref);
    if (!fs.existsSync(filePath)) {
      brokenReferences.push({
        page: path.relative(dist, htmlFile),
        ref,
        expected: path.relative(root, filePath),
      });
    }
  }
}

if (brokenReferences.length > 0) {
  console.error(JSON.stringify({ brokenReferences }, null, 2));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      checkedRoutes: requiredRoutes.length,
      checkedHtmlFiles: htmlFiles.length,
      status: 'ok',
    },
    null,
    2,
  ),
);

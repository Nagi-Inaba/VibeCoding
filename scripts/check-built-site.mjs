import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MODULE_PATH = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = path.resolve(path.dirname(MODULE_PATH), '..');
const DRAFT_WARNING = 'このコンテンツは下書きです。プロダクションビルドには含まれません。';

const REQUIRED_ROUTES = [
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
  '/publish-check/',
  '/glossary/',
  '/my-vibe-coding/',
  '/tools/',
];

function walk(dir, predicate, output = []) {
  if (!fs.existsSync(dir)) return output;

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

function normalizeBasePath(basePath) {
  const withLeadingSlash = `/${String(basePath || '/').replace(/^\/+/, '')}`;
  return withLeadingSlash === '/' ? '/' : withLeadingSlash.replace(/\/+$/, '');
}

function routeToFile(dist, route) {
  const cleanRoute = route === '/' ? '' : route.replace(/^\/+|\/+$/g, '');
  return cleanRoute ? path.join(dist, cleanRoute, 'index.html') : path.join(dist, 'index.html');
}

function collectReferences(html) {
  const references = [];
  const pattern = /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
  for (const match of html.matchAll(pattern)) {
    references.push(match[2]);
  }
  return references;
}

function pageUrl(htmlFile, dist, basePath, siteOrigin) {
  const relative = path.relative(dist, htmlFile).split(path.sep).join('/');
  const suffix = relative === 'index.html'
    ? '/'
    : relative.endsWith('/index.html')
      ? `/${relative.slice(0, -'index.html'.length)}`
      : `/${relative}`;
  const pathname = basePath === '/' ? suffix : `${basePath}${suffix}`;
  return new URL(pathname, siteOrigin);
}

function isInsideBase(pathname, basePath) {
  return basePath === '/' || pathname === basePath || pathname.startsWith(`${basePath}/`);
}

function targetForUrl(url, dist, basePath) {
  const encodedRelative = basePath === '/' ? url.pathname : url.pathname.slice(basePath.length);
  let relativePath;
  try {
    relativePath = decodeURIComponent(encodedRelative).replace(/^\/+/, '');
  } catch {
    relativePath = encodedRelative.replace(/^\/+/, '');
  }

  if (relativePath === '' || relativePath.endsWith('/')) {
    relativePath = path.join(relativePath, 'index.html');
  }

  const target = path.resolve(dist, relativePath);
  const relativeTarget = path.relative(dist, target);
  const escapedDist = relativeTarget === '..' || relativeTarget.startsWith(`..${path.sep}`) || path.isAbsolute(relativeTarget);
  return { target, escapedDist };
}

function decodeFragment(hash) {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
}

function containsFragment(filePath, fragment) {
  if (!fs.statSync(filePath).isFile()) return false;
  const html = fs.readFileSync(filePath, 'utf8');
  const ids = new Set();
  const pattern = /\bid\s*=\s*(["'])(.*?)\1/gi;
  for (const match of html.matchAll(pattern)) {
    ids.add(match[2]);
  }
  return ids.has(fragment);
}

function relativePath(from, target) {
  return path.relative(from, target).split(path.sep).join('/');
}

export function inspectBuiltSite({
  root,
  dist,
  basePath,
  requiredRoutes = REQUIRED_ROUTES,
  siteOrigin = 'https://example.test',
}) {
  const resolvedRoot = path.resolve(root);
  const resolvedDist = path.resolve(dist);
  const normalizedBasePath = normalizeBasePath(basePath);
  const origin = new URL(siteOrigin).origin;
  const errors = [];

  const notFoundFile = path.join(resolvedDist, '404.html');
  if (!fs.existsSync(notFoundFile) || !fs.statSync(notFoundFile).isFile()) {
    errors.push({
      type: 'missing-target',
      page: '[required-files]',
      ref: '/404.html',
      expected: relativePath(resolvedRoot, notFoundFile),
    });
  }

  for (const route of requiredRoutes) {
    const filePath = routeToFile(resolvedDist, route);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      errors.push({
        type: 'missing-target',
        page: '[required-routes]',
        ref: route,
        expected: relativePath(resolvedRoot, filePath),
      });
    }
  }

  const htmlFiles = walk(resolvedDist, (filePath) => filePath.endsWith('.html'));
  let checkedLocalReferences = 0;
  let checkedFragments = 0;

  for (const htmlFile of htmlFiles) {
    const page = relativePath(resolvedDist, htmlFile);
    const html = fs.readFileSync(htmlFile, 'utf8');

    if (path.basename(htmlFile) === '404.html' && html.includes(DRAFT_WARNING)) {
      errors.push({
        type: 'draft-warning',
        page,
        ref: DRAFT_WARNING,
      });
    }

    const baseUrl = pageUrl(htmlFile, resolvedDist, normalizedBasePath, origin);
    for (const ref of collectReferences(html)) {
      let url;
      try {
        url = new URL(ref, baseUrl);
      } catch {
        continue;
      }
      if (url.origin !== origin) continue;

      checkedLocalReferences += 1;
      if (!isInsideBase(url.pathname, normalizedBasePath)) {
        errors.push({
          type: 'escaped-base',
          page,
          ref,
          expected: normalizedBasePath === '/' ? '/' : `${normalizedBasePath}/`,
        });
        continue;
      }

      const { target, escapedDist } = targetForUrl(url, resolvedDist, normalizedBasePath);
      if (escapedDist) {
        errors.push({
          type: 'escaped-base',
          page,
          ref,
          expected: normalizedBasePath === '/' ? '/' : `${normalizedBasePath}/`,
        });
        continue;
      }

      if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
        errors.push({
          type: 'missing-target',
          page,
          ref,
          expected: relativePath(resolvedRoot, target),
        });
        continue;
      }

      if (url.hash) {
        const fragment = decodeFragment(url.hash);
        checkedFragments += 1;
        if (!containsFragment(target, fragment)) {
          errors.push({
            type: 'missing-fragment',
            page,
            ref,
            fragment,
          });
        }
      }
    }
  }

  return {
    checkedRoutes: requiredRoutes.length,
    checkedHtmlFiles: htmlFiles.length,
    checkedLocalReferences,
    checkedFragments,
    errors,
    status: errors.length === 0 ? 'ok' : 'error',
  };
}

export function assertBuiltSite(report) {
  if (report.errors.length > 0) {
    throw new Error(JSON.stringify(report, null, 2));
  }
}

function runCli() {
  const report = inspectBuiltSite({
    root: DEFAULT_ROOT,
    dist: path.join(DEFAULT_ROOT, 'dist'),
    basePath: process.env.BASE_PATH ?? '/',
  });

  console.log(JSON.stringify(report, null, 2));
  try {
    assertBuiltSite(report);
  } catch {
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(MODULE_PATH)) {
  runCli();
}

// One-time migration: archive externally hosted image files before updating links.
// Run from the repository root: node scripts/migrate-hostinger-images.mjs
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const sourceRoot = join(root, 'astro', 'src');
const imageRoot = join(root, 'astro', 'public', 'assets', 'images', 'hostinger');
const urlPattern = /https:\/\/assets\.zyrosite\.com\/[^\s"'<>`)]+/g;

async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else if (/\.(md|mdx|astro|css)$/i.test(path)) result.push(path);
  }
  return result;
}
function format(bytes) {
  if (bytes.length >= 3 && bytes.subarray(0, 3).equals(Buffer.from([0xff,0xd8,0xff]))) return '.jpg';
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return '.png';
  if (bytes.length >= 6 && ['GIF87a','GIF89a'].includes(bytes.toString('ascii', 0, 6))) return '.gif';
  if (bytes.length >= 12 && bytes.toString('ascii', 0, 4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP') return '.webp';
  throw new Error('Unrecognized image data (download may be HTML)');
}
const files = await walk(sourceRoot);
const sources = new Map();
const urls = new Set();
for (const path of files) {
  const source = await readFile(path, 'utf8');
  const found = [...source.matchAll(urlPattern)].map(match => match[0]);
  if (!found.length) continue;
  sources.set(path, source);
  for (const url of found) {
    if (new URL(url).hostname !== 'assets.zyrosite.com') throw new Error('Unexpected source: ' + url);
    urls.add(url);
  }
}
console.log('External Hostinger images: ' + urls.size + ' across ' + sources.size + ' source files');
if (urls.size === 0) process.exit(0);
const staged = [];
const replacements = new Map();
for (const [i,url] of [...urls].entries()) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(url, {signal:controller.signal, headers: {'User-Agent':'VirtualViking-ImageMigration/1.0'}});
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const len = Number(response.headers.get('content-length') || 0);
    if (len > 20_000_000) throw new Error('Image is over 20 MB');
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > 20_000_000) throw new Error('Image is over 20 MB');
    const ext = format(bytes);
    const name = createHash('sha256').update(url).digest('hex').slice(0,16) + ext;
    staged.push({name,bytes});
    replacements.set(url, '/assets/images/hostinger/' + name);
    console.log('[' + (i+1) + '/' + urls.size + '] ' + name + ' ' + bytes.length + ' bytes');
  } catch(error) {
    throw new Error('Unable to download ' + url + ': ' + error.message);
  } finally {clearTimeout(timeout);}
}
// Only write source changes once every remote image has been downloaded and checked.
await mkdir(imageRoot, {recursive:true});
for(const {name,bytes} of staged) await writeFile(join(imageRoot,name),bytes);
for(const [path,source] of sources) {
  let updated = source;
  for(const [url,local] of replacements) updated=updated.split(url).join(local);
  await writeFile(path,updated);
  console.log('Updated ' + relative(root,path));
}
console.log('Done. Migrated ' + staged.length + ' images in ' + sources.size + ' files.');

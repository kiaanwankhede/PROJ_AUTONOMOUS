// Builds the GitHub Pages site from the research report.
//
//   cd site && npm install && npm run build
//
// Inputs:  site/template.html  (page design; the part above <!-- /head --> is head material)
//          reports/Autonomous enterprise concepts and roadmap.md  (the research report)
// Outputs: docs/index.html     (complete HTML document served by GitHub Pages)
//          --fragment <path>   (optional: the same page without the document skeleton,
//                               for publishing as a claude.ai Artifact)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const REPORT = resolve(root, opt('--report') ?? 'reports/Autonomous enterprise concepts and roadmap.md');
const TEMPLATE = resolve(here, 'template.html');
const OUT = resolve(root, opt('--out') ?? 'docs/index.html');
const FRAGMENT = opt('--fragment');

const template = readFileSync(TEMPLATE, 'utf8');
let reportMd = readFileSync(REPORT, 'utf8').replace(/\r\n/g, '\n');

// The page has its own <h1>; drop the report's leading "# Title" line.
reportMd = reportMd.replace(/^\s*#\s+[^\n]*\n/, '');

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');
const decodeEntities = (s) =>
  String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

// Unique, stable heading ids. Ids already used by the template are reserved first.
const used = new Map();
for (const m of template.matchAll(/\sid="([^"]+)"/g)) used.set(m[1], 1);
function slugify(text) {
  let s = decodeEntities(stripTags(text))
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 64)
    .replace(/-$/, '');
  if (!s) s = 'section';
  const n = used.get(s) ?? 0;
  used.set(s, n + 1);
  return n ? `${s}-${n + 1}` : s;
}

const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const id = slugify(html);
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//i.test(href);
      const t = title ? ` title="${escapeAttr(title)}"` : '';
      const ext = external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${escapeAttr(href)}"${t}${ext}>${text}</a>`;
    },
  },
});

let reportHtml = marked.parse(reportMd);
// Wide tables scroll inside their own container, never the page.
reportHtml = reportHtml
  .replace(/<table>/g, '<div class="table-wrap" tabindex="0"><table>')
  .replace(/<\/table>/g, '</table></div>');

const words = stripTags(reportHtml).split(/\s+/).filter(Boolean).length;
const minutes = Math.max(1, Math.round(words / 230));

let page = template
  .replace('{{REPORT}}', reportHtml)
  .replace(/{{REPORT_MINUTES}}/g, String(minutes))
  .replace(/{{REPORT_WORDS}}/g, words.toLocaleString('en-US'));

// Contents rail: every <h2> inside a <section class="part" data-part="…">, grouped by part.
function buildToc(html) {
  const parts = [];
  const partRe = /<section class="part"[^>]*data-part="([^"]+)"[^>]*>([\s\S]*?)<!-- \/part -->/g;
  for (const pm of html.matchAll(partRe)) {
    const items = [];
    for (const hm of pm[2].matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)) {
      items.push({ id: hm[1], label: stripTags(hm[2]).trim() });
    }
    parts.push({ title: pm[1], items });
  }
  return parts
    .map(
      (p) =>
        `<p class="toc-part">${p.title}</p>\n<ol>\n` +
        p.items.map((i) => `  <li><a href="#${i.id}">${i.label}</a></li>`).join('\n') +
        `\n</ol>`,
    )
    .join('\n');
}
page = page.replace('{{TOC}}', buildToc(page));

const leftovers = page.match(/{{[A-Z_]+}}/g);
if (leftovers) throw new Error(`Unfilled placeholders: ${leftovers.join(', ')}`);

const [headPart, bodyPart] = page.split('<!-- /head -->');
if (bodyPart === undefined) throw new Error('template.html must contain a <!-- /head --> marker');

// Same baseline the Artifact skeleton provides, so both outputs render alike.
const reset = `:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
img{max-width:100%}[hidden]{display:none!important}`;
const description =
  'Research briefing and implementation plan for the Gen AI team: what the autonomous enterprise really is, the concepts to learn, and a phased roadmap.';

const full = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${description}">
<meta property="og:title" content="Autonomous Enterprise Playbook">
<meta property="og:description" content="${description}">
<meta property="og:type" content="article">
<style>${reset}</style>
${headPart.trim()}
</head>
<body>
${bodyPart.trim()}
</body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, full);
console.log(`wrote ${OUT} (${(full.length / 1024).toFixed(0)} KB, report ${words} words, ~${minutes} min)`);

if (FRAGMENT) {
  const fragPath = resolve(process.cwd(), FRAGMENT);
  mkdirSync(dirname(fragPath), { recursive: true });
  writeFileSync(fragPath, page);
  console.log(`wrote ${fragPath} (artifact fragment)`);
}

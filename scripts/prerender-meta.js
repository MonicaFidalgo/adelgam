// Passo pos-build: um HTML inicial por rota publica, com titulo, descricao,
// Open Graph e canonical proprios (em PT), para o Google, o Bing e as
// partilhas, que leem o HTML antes de o JavaScript correr.
//
// Para cada rota de src/data/seoRoutes.json escreve build/<rota>.html a
// partir de build/index.html. A Cloudflare Pages serve build/sobre.html em
// /sobre (sem barra final) e redirecciona /sobre/ e /sobre.html para /sobre,
// que e o endereco do canonical. O resto do HTML (scripts, estilos, dados
// estruturados) fica igual: o React arranca como antes e o hook
// useDocumentLanguage (App.js) troca os textos para EN quando e preciso.
//
// Nao se gera 404.html: sem ele a Cloudflare Pages serve o index.html em
// qualquer endereco desconhecido e o React Router decide (fallback SPA).
//
// Falha (exit 1) se o HTML base nao tiver exactamente uma vez cada etiqueta
// que substitui: e preferivel o build parar a publicar textos errados.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const seo = require(path.join(ROOT, "src", "data", "seoRoutes.json"));
const pt = require(path.join(ROOT, "src", "i18n", "locales", "pt", "translation.json"));

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fail(message) {
  console.error(`prerender-meta: ERRO: ${message}`);
  process.exit(1);
}

// Substitui a unica ocorrencia de `pattern`; falha se houver zero ou varias.
function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, "g")) || [];
  if (matches.length !== 1) {
    fail(`esperava 1 ${label} em build/index.html, encontrei ${matches.length}`);
  }
  return html.replace(pattern, replacement);
}

function metaTag(attr, name) {
  return new RegExp(`<meta\\s+${attr}="${name}"\\s+content="[^"]*"\\s*/?>`);
}

function textsFor(route) {
  const node = route.key ? pt.meta.pages && pt.meta.pages[route.key] : pt.meta;
  if (!node || !node.title || !node.description) {
    fail(`faltam meta.pages.${route.key}.title/description na traducao PT`);
  }
  if (node.title.length > MAX_TITLE) {
    fail(`titulo de ${route.path} com ${node.title.length} caracteres (max ${MAX_TITLE})`);
  }
  if (node.description.length > MAX_DESCRIPTION) {
    fail(`descricao de ${route.path} com ${node.description.length} caracteres (max ${MAX_DESCRIPTION})`);
  }
  return node;
}

function render(template, route) {
  const { title, description } = textsFor(route);
  const url = seo.siteUrl + route.path;
  const isHome = route.path === "/";
  let html = template;

  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`, "<title>");
  html = replaceOnce(
    html,
    metaTag("name", "description"),
    `<meta name="description" content="${escapeAttr(description)}"/>`,
    "meta description",
  );
  // A pagina inicial guarda o Open Graph do public/index.html (texto proprio
  // para partilhas); as outras rotas usam o titulo e a descricao da rota.
  if (!isHome) {
    html = replaceOnce(
      html,
      metaTag("property", "og:title"),
      `<meta property="og:title" content="${escapeAttr(title)}"/>`,
      "og:title",
    );
    html = replaceOnce(
      html,
      metaTag("property", "og:description"),
      `<meta property="og:description" content="${escapeAttr(description)}"/>`,
      "og:description",
    );
  }
  html = replaceOnce(
    html,
    metaTag("name", "robots"),
    `<meta name="robots" content="${escapeAttr(route.noindex ? seo.robotsNoindex : seo.robots)}"/>`,
    "meta robots",
  );

  // Paginas com noindex (fichas antigas de apartamentos vendidos) ficam sem
  // canonical: os dois sinais juntos contradizem-se.
  const extra = [`<meta property="og:url" content="${escapeAttr(url)}"/>`];
  if (!route.noindex) extra.unshift(`<link rel="canonical" href="${escapeAttr(url)}"/>`);
  html = replaceOnce(html, /<\/title>/, `</title>${extra.join("")}`, "</title>");
  return html;
}

function main() {
  const indexPath = path.join(BUILD, "index.html");
  if (!fs.existsSync(indexPath)) fail("build/index.html nao existe (correr depois do react-scripts build)");
  const template = fs.readFileSync(indexPath, "utf8");

  if (/rel="canonical"/.test(template)) fail("build/index.html ja tem canonical (o passo correu duas vezes?)");
  const robots = template.match(metaTag("name", "robots"));
  if (!robots || !robots[0].includes(`content="${seo.robots}"`)) {
    fail("o meta robots do public/index.html difere de seoRoutes.json (robots)");
  }

  const seen = new Set();
  for (const route of seo.routes) {
    if (seen.has(route.path)) fail(`rota repetida: ${route.path}`);
    seen.add(route.path);
    if (route.path !== "/" && (!route.path.startsWith("/") || route.path.endsWith("/"))) {
      fail(`rota invalida: ${route.path}`);
    }
    const out = route.path === "/" ? indexPath : path.join(BUILD, `${route.path.slice(1)}.html`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render(template, route));
    console.log(`prerender-meta: ${path.relative(BUILD, out).replace(/\\/g, "/")} -> ${route.path}`);
  }
}

main();

#!/usr/bin/env bun
/**
 * Generates a standalone HTML index of all Mutant Standard emoji in
 * public/emoji/, written to emoji-index.html at project root.
 *
 * Groups variant emoji (skin shades, body types) under a single base tile
 * that can be expanded to show all variants. Mutant Standard variant
 * suffixes match /_[a-z]{1,2}\d+$/ (e.g. _b1, _h4, _fe1, _fk1, _ft1).
 *
 * The output is a single self-contained file. Open it directly in a
 * browser (file:// works). It is gitignored and excluded from the
 * Astro build.
 *
 * Run: bun scripts/build-emoji-index.mjs
 */

import { readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const emojiDir = join(root, "public", "emoji");
const outFile = join(root, "emoji-index.html");

const VARIANT_RE = /_[a-z]{1,2}\d+$/;

const files = (await readdir(emojiDir))
  .filter((f) => f.endsWith(".svg"))
  .sort();

const names = files.map((f) => f.replace(/\.svg$/, ""));

/** @type {Map<string, { base: string|null, variants: string[] }>} */
const groups = new Map();
for (const name of names) {
  const stripped = name.replace(VARIANT_RE, "");
  if (!groups.has(stripped)) groups.set(stripped, { base: null, variants: [] });
  const g = groups.get(stripped);
  if (stripped === name) g.base = name;
  else g.variants.push(name);
}

const groupList = [...groups.entries()]
  .map(([baseName, g]) => {
    const preview = g.base ?? g.variants[0];
    const all = g.base ? [g.base, ...g.variants] : g.variants;
    return { baseName, preview, all };
  })
  .sort((a, b) => a.baseName.localeCompare(b.baseName));

const totalFiles = names.length;
const totalGroups = groupList.length;

const renderTile = ({ baseName, preview, all }) => {
  const variantCount = all.length - 1;
  const badge =
    variantCount > 0 ? `<span class="badge">+${variantCount}</span>` : "";
  const variantsData =
    variantCount > 0 ? ` data-variants='${JSON.stringify(all)}'` : "";
  return `  <div class="group" data-base="${baseName}"${variantsData}>
    <button class="tile" data-name="${preview}" title=":${preview}:">
      <img src="public/emoji/${preview}.svg" alt=":${preview}:" loading="lazy">
      <span class="label">${baseName}</span>
      ${badge}
    </button>
  </div>`;
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mutant Standard — emoji index</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #f4f1eb;
    --fg: #1a1816;
    --muted: #6e6a62;
    --border: #d4d0c8;
    --accent: #8b3a3a;
    --tile-bg: #ffffff;
    --badge-bg: #8b3a3a;
    --badge-fg: #ffffff;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #131210;
      --fg: #d8d4cc;
      --muted: #8a8680;
      --border: #2c2a26;
      --accent: #c27272;
      --tile-bg: #1c1b18;
      --badge-bg: #c27272;
      --badge-fg: #131210;
    }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--fg);
    line-height: 1.5;
  }
  header {
    max-width: 70rem;
    margin: 0 auto 2rem;
  }
  h1 { margin: 0 0 0.5rem; font-size: 1.5rem; }
  .meta { color: var(--muted); font-size: 0.9rem; margin-bottom: 1rem; }
  #search {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    background: var(--tile-bg);
    border: 1px solid var(--border);
    color: var(--fg);
    border-radius: 6px;
    font-family: ui-monospace, monospace;
  }
  #search:focus { outline: 2px solid var(--accent); outline-offset: 2px; }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--muted);
    font-size: 0.85rem;
    cursor: pointer;
    user-select: none;
  }
  #count {
    color: var(--muted);
    font-size: 0.85rem;
    font-family: ui-monospace, monospace;
  }
  main {
    max-width: 70rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 0.5rem;
  }
  .group { position: relative; display: contents; }
  .tile {
    background: var(--tile-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.75rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: border-color 120ms ease, transform 120ms ease;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: var(--muted);
    word-break: break-all;
    text-align: center;
    position: relative;
    font: inherit;
  }
  .tile:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .tile img {
    width: 3rem;
    height: 3rem;
    image-rendering: -webkit-optimize-contrast;
  }
  .label {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: var(--muted);
    word-break: break-all;
    line-height: 1.3;
  }
  .badge {
    position: absolute;
    top: 4px;
    right: 4px;
    background: var(--badge-bg);
    color: var(--badge-fg);
    font-size: 0.65rem;
    font-family: ui-monospace, monospace;
    padding: 1px 6px;
    border-radius: 999px;
    line-height: 1.4;
  }
  .copied { border-color: var(--accent) !important; color: var(--accent) !important; }
  .hidden { display: none !important; }
  .variants {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
    gap: 0.35rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: var(--tile-bg);
    border: 1px dashed var(--border);
    border-radius: 6px;
  }
  .variant {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.35rem;
    border-radius: 4px;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    color: var(--muted);
    word-break: break-all;
    text-align: center;
    line-height: 1.2;
  }
  .variant:hover { border-color: var(--accent); color: var(--fg); }
  .variant img { width: 2rem; height: 2rem; }
  /* Flat mode: hide badges and disable expansion (styling via body class) */
  body.flat .badge { display: none; }
  footer {
    max-width: 70rem;
    margin: 3rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 0.85rem;
    text-align: center;
  }
  footer a { color: var(--accent); }
</style>
</head>
<body>
<header>
  <h1>Mutant Standard — emoji index</h1>
  <p class="meta">${totalGroups} groups, ${totalFiles} files total. Click a tile to copy <code>:shortcode:</code>, or the <span style="color:var(--accent)">+N</span> badge to see variants.</p>
  <input id="search" type="search" placeholder="filter by name…" autofocus>
  <div class="controls">
    <label class="toggle">
      <input type="checkbox" id="flat">
      flat view — show every variant as its own tile
    </label>
    <div id="count"></div>
  </div>
</header>
<main id="grid">
${groupList.map(renderTile).join("\n")}
</main>
<footer>
  Emoji by <a href="https://mutant.tech" target="_blank" rel="noopener">Mutant Standard</a>, CC BY-NC-SA 4.0.
</footer>
<script>
  const grid = document.getElementById("grid");
  const search = document.getElementById("search");
  const count = document.getElementById("count");
  const flat = document.getElementById("flat");
  const body = document.body;

  const groupEls = Array.from(grid.querySelectorAll(".group"));
  const groupData = groupEls.map((el) => ({
    el,
    base: el.dataset.base,
    variants: el.dataset.variants ? JSON.parse(el.dataset.variants) : [el.querySelector(".tile").dataset.name],
  }));
  const totalGroups = groupData.length;

  function currentFiltered() {
    const q = search.value.trim().toLowerCase();
    if (!q) return null;
    return q;
  }

  function render() {
    const q = currentFiltered();
    const isFlat = flat.checked;
    let visibleUnits = 0;

    for (const { el, base, variants } of groupData) {
      // Remove any prior expansion panel
      const panel = el.querySelector(".variants");
      if (panel) panel.remove();

      if (isFlat) {
        // In flat mode, each group expands into inline sibling tiles
        const matching = variants.filter((n) => !q || n.toLowerCase().includes(q) || base.toLowerCase().includes(q));
        if (matching.length === 0) {
          el.classList.add("hidden");
          continue;
        }
        el.classList.remove("hidden");
        // Replace the .group contents with one tile per variant
        el.innerHTML = matching.map((n) =>
          '<button class="tile" data-name="' + n + '" title=":' + n + ':">' +
            '<img src="public/emoji/' + n + '.svg" alt=":' + n + ':" loading="lazy">' +
            '<span class="label">' + n + '</span>' +
          '</button>'
        ).join("");
        visibleUnits += matching.length;
      } else {
        // Grouped mode: show preview tile only. Match if base OR any variant matches.
        const matches = !q || base.toLowerCase().includes(q) || variants.some((n) => n.toLowerCase().includes(q));
        el.classList.toggle("hidden", !matches);
        if (matches) visibleUnits++;
      }
    }

    if (!q) {
      count.textContent = isFlat ? visibleUnits + " tiles" : totalGroups + " groups";
    } else {
      count.textContent = visibleUnits + " match" + (visibleUnits === 1 ? "" : "es");
    }
  }

  // Restore tiles to grouped state (used when exiting flat mode)
  function restoreGroupedTiles() {
    for (const { el, base, variants } of groupData) {
      const preview = variants[0].replace(/_[a-z]{1,2}\\d+$/, "") === base && variants.includes(base) ? base : variants[0];
      const count = variants.length - (variants.includes(base) ? 1 : 0);
      const badge = count > 0 ? '<span class="badge">+' + count + '</span>' : '';
      el.innerHTML =
        '<button class="tile" data-name="' + preview + '" title=":' + preview + ':">' +
          '<img src="public/emoji/' + preview + '.svg" alt=":' + preview + ':" loading="lazy">' +
          '<span class="label">' + base + '</span>' +
          badge +
        '</button>';
    }
  }

  search.addEventListener("input", render);
  flat.addEventListener("change", () => {
    body.classList.toggle("flat", flat.checked);
    if (!flat.checked) restoreGroupedTiles();
    render();
  });

  grid.addEventListener("click", async (e) => {
    // Badge click → expand variants inline
    const badge = e.target.closest(".badge");
    if (badge && !flat.checked) {
      e.preventDefault();
      e.stopPropagation();
      const group = badge.closest(".group");
      const existing = group.querySelector(".variants");
      if (existing) { existing.remove(); return; }
      const variants = JSON.parse(group.dataset.variants);
      const panel = document.createElement("div");
      panel.className = "variants";
      panel.innerHTML = variants.map((n) =>
        '<button class="variant" data-name="' + n + '" title=":' + n + ':">' +
          '<img src="public/emoji/' + n + '.svg" alt=":' + n + ':" loading="lazy">' +
          '<span>' + n + '</span>' +
        '</button>'
      ).join("");
      group.after(panel);
      return;
    }

    const tile = e.target.closest(".tile, .variant");
    if (!tile) return;
    const code = ":" + tile.dataset.name + ":";
    try {
      await navigator.clipboard.writeText(code);
      tile.classList.add("copied");
      const label = tile.querySelector(".label, span");
      const old = label.textContent;
      label.textContent = "copied!";
      setTimeout(() => {
        tile.classList.remove("copied");
        label.textContent = old;
      }, 900);
    } catch {
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(tile);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  render();
</script>
</body>
</html>
`;

await writeFile(outFile, html, "utf8");
console.log(
  `Wrote ${outFile} — ${totalGroups} groups, ${totalFiles} files total`,
);

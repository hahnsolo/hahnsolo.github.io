#!/usr/bin/env node
/**
 * sync-tokens.js
 * Reads tokens.json and syncs design tokens into:
 *   - index.html  (CSS :root variables)
 *   - resume-figma-plugin/code.js  (COLOR constant block)
 *
 * Usage: node scripts/sync-tokens.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const TOKENS     = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
const INDEX_PATH = path.join(ROOT, 'index.html');
const PLUGIN_PATH= path.join(ROOT, 'resume-figma-plugin', 'code.js');

const c = TOKENS.colors;

// ── 1. Sync index.html CSS :root block ───────────────────────────────────────

const newRoot = `:root {
      --bg:          ${c.bg};
      --bg-dark:     ${c.bgDark};
      --text-prim:   ${c.textPrim};
      --text-sec:    ${c.textSec};
      --teal:        ${c.teal};
      --teal-light:  ${c.tealLight};
      --gold:        ${c.gold};
      --gold-light:  ${c.goldLight};
      --cyan:        ${c.cyan};
      --emerald:     ${c.emerald};
      --border:      ${c.border};
      --card-bg:     ${c.cardBg};
      --max-w:       1280px;
      --pad-x:       80px;
    }`;

let html = fs.readFileSync(INDEX_PATH, 'utf8');
html = html.replace(/:root \{[^}]+\}/, newRoot);
fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log('✓ index.html :root updated');

// ── 2. Sync code.js COLOR block ──────────────────────────────────────────────

const newColor = `const COLOR = {
    bg:        '${c.bg}',
    bgDark:    '${c.bgDark}',
    textPrim:  '${c.textPrim}',
    textSec:   '${c.textSec}',
    accent:    '${c.teal}',
    gold:      '${c.gold}',
    cyan:      '${c.cyan}',
    emerald:   '${c.emerald}',
    border:    '${c.border}',
    chipBg:    '${c.tealLight}',
    contactBg: '${c.bgDark}',
  }`;

let plugin = fs.readFileSync(PLUGIN_PATH, 'utf8');
plugin = plugin.replace(/const COLOR = \{[^}]+\}/, newColor);
fs.writeFileSync(PLUGIN_PATH, plugin, 'utf8');
console.log('✓ code.js COLOR block updated');

console.log('\nAll tokens synced. Run the Figma plugin to update the design.');

# hahnsolo.ca

Personal portfolio site for Christopher Romanyk.

## Design Token Workflow

`tokens.json` is the **single source of truth** for all design tokens (colors, typography, spacing).

### How to change the design

1. Edit `tokens.json` with your new values
2. Open a PR — on merge to `main`, the GitHub Action auto-syncs:
   - `index.html` CSS variables
   - `resume-figma-plugin/code.js` COLOR block
3. Run the Figma plugin manually in Figma to update the design file

### Running the sync locally

```bash
node scripts/sync-tokens.js
```

### File structure

```
tokens.json                        ← edit this to change design tokens
scripts/sync-tokens.js             ← syncs tokens into index.html and code.js
.github/workflows/sync-tokens.yml  ← runs sync automatically on merge
resume-figma-plugin/code.js        ← Figma plugin (auto-updated, do not edit directly)
index.html                         ← website (CSS vars auto-updated, do not edit directly)
```

### Figma

File: `https://www.figma.com/design/0NDaDe296e8UNZwsf14jbb/Chris-Site`

After merging a tokens change, open the file in Figma and run the plugin (`resume-figma-plugin`) to regenerate the design frames.

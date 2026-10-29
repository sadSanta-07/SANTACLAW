# SantaClaw showcase

A standalone, dependency-free product showcase for [SantaClaw](https://github.com/sadSanta-07/SANTACLAW).

## Preview locally

Open `index.html` directly in a browser, or serve this directory:

```bash
cd showcase
python -m http.server 4173
```

Then visit http://localhost:4173.

## Contents

- `index.html` — product story, workflow preview, modes and installation instructions
- `styles.css` — responsive dark terminal-inspired design
- `script.js` — mobile navigation, installation tabs, copy buttons and illustrative demo states
- `favicon.svg` — standalone mark

## Notes

The terminal and diff in the hero are illustrative UI—not a live SantaClaw session. The approve/reject buttons only change the demo's displayed state; they do not access a filesystem or modify code. Installation commands link to the existing project README. This site does not require API keys or a backend.

Design inspiration: [HatchZip](https://hatchzip.dev/). The visual identity, copy, layout, and demo are authored for SantaClaw rather than copied from the reference website.

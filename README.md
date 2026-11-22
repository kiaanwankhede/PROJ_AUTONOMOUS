# The Autonomous Enterprise

Research briefing and team plan for the Gen AI engineering team: what the "autonomous enterprise" really means as of November 2026, the concepts the team needs, and a phased 24-month implementation roadmap.

**Live site:** https://kiaanwankhede.github.io/PROJ_AUTONOMOUS/

## What's in this repository

| Path | Contents |
|---|---|
| `reports/Autonomous enterprise concepts and roadmap.md` | The full research report: about 14,650 words with 223 linked sources |
| `research_notes/Autonomous enterprise concepts and roadmap/` | Notes from the six research streams: definitions and market, agent architecture and protocols, data/evals/AgentOps, governance/security/regulation, adoption evidence, and implementation and team skills |
| `site/` | Page template (`template.html`), build script (`build.mjs`) and deploy script (`deploy.sh`) |
| `docs/index.html` | The built page |

## Updating the site

GitHub Pages serves the `gh-pages` branch. After editing the report or `site/template.html`, run:

```bash
site/deploy.sh
```

It rebuilds `docs/index.html` from the report and publishes it to `gh-pages`. Commit your source changes on your working branch as usual.

To preview without publishing, build the page and open `docs/index.html` in a browser:

```bash
cd site && npm install && npm run build
```
